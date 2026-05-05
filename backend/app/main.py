"""
main.py — FastAPI app
"""
import os
import hmac
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import Base, engine, get_db
from app.models import (
    Response,
    SubmitRequest,
    SubmitResponse,
    AdminResultsResponse,
    QuestionStat,
    OptionStat,
)

load_dotenv()

app = FastAPI(title="Survey API", version="1.0.0")

# ---------------- CORS ----------------

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in ALLOWED_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Init DB ----------------

@app.on_event("startup")
def init():
    Base.metadata.create_all(bind=engine)

# ---------------- Questions ----------------

QUESTIONS = [
    {"number": i + 1, "text": f"Question {i+1}", "options": {"A": "Option A", "B": "Option B", "C": "Option C", "D": "Option D"}}
    for i in range(10)
]



# ---------------- Admin Auth ----------------

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")

def verify_admin(x_admin_password: Annotated[str | None, Header()] = None):
    if not ADMIN_PASSWORD:
        raise HTTPException(500, "Admin password not set")

    if not x_admin_password or not hmac.compare_digest(x_admin_password, ADMIN_PASSWORD):
        raise HTTPException(401, "Unauthorized")


# ---------------- Routes ----------------

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/submit", response_model=SubmitResponse, status_code=201)
def submit(body: SubmitRequest, db: Session = Depends(get_db)):
    data = body.model_dump()
    record = Response(**data)

    db.add(record)
    try:
        db.commit()
        db.refresh(record)
    except Exception:
        db.rollback()
        raise HTTPException(500, "Database error")

    return SubmitResponse(
        success=True,
        message="Submitted",
        id=str(record.id),
    )


@app.get("/admin/results",
         response_model=AdminResultsResponse,
         dependencies=[Depends(verify_admin)])
def results(db: Session = Depends(get_db)):

    total = db.query(func.count(Response.id)).scalar()

    output = []

    for q in QUESTIONS:
        key = f"q{q['number']}"

        rows = (
            db.query(getattr(Response, key), func.count())
            .group_by(getattr(Response, key))
            .all()
        )

        counts = dict(rows)

        options = {}
        for letter, label in q["options"].items():
            count = counts.get(letter, 0)
            pct = round((count / total * 100), 1) if total else 0.0

            options[letter] = OptionStat(
                label=label,
                count=count,
                percentage=pct
            )

        output.append(
            QuestionStat(
                question_number=q["number"],
                question_text=q["text"],
                options=options
            )
        )

    return AdminResultsResponse(
        total_responses=total,
        questions=output
    )