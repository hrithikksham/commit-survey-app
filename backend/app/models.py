"""
models.py — ORM table + Pydantic schemas.
"""
import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator
from sqlalchemy import Column, DateTime, String, func
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base

VALID_OPTIONS = {"A", "B", "C", "D"}


# ---------------- ORM ----------------

class Response(Base):
    __tablename__ = "responses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    q1 = Column(String(1), nullable=False)
    q2 = Column(String(1), nullable=False)
    q3 = Column(String(1), nullable=False)
    q4 = Column(String(1), nullable=False)
    q5 = Column(String(1), nullable=False)
    q6 = Column(String(1), nullable=False)
    q7 = Column(String(1), nullable=False)
    q8 = Column(String(1), nullable=False)
    q9 = Column(String(1), nullable=False)
    q10 = Column(String(1), nullable=False)


# ---------------- Schemas ----------------

def _validate_option(v: str) -> str:
    v = v.strip().upper()
    if v not in VALID_OPTIONS:
        raise ValueError(f"Invalid option '{v}'")
    return v


class BaseSchema(BaseModel):
    class Config:
        from_attributes = True


class SubmitRequest(BaseModel):
    q1: str
    q2: str
    q3: str
    q4: str
    q5: str
    q6: str
    q7: str
    q8: str
    q9: str
    q10: str

    @field_validator("*")
    @classmethod
    def validate_all(cls, v: str):
        return _validate_option(v)


class SubmitResponse(BaseSchema):
    success: bool
    message: str
    id: Optional[str] = None


class OptionStat(BaseModel):
    label: str
    count: int
    percentage: float


class QuestionStat(BaseSchema):
    question_number: int
    question_text: str
    options: dict[str, OptionStat]


class AdminResultsResponse(BaseSchema):
    total_responses: int
    questions: list[QuestionStat]