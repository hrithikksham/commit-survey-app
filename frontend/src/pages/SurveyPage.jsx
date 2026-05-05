import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTIONS } from "../data/questions.js";
import { submitSurvey } from "../api/survey.js";

// ── Option Card ────────────────────────────────────────────────────────────
function OptionCard({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.letter)}
      className={`option-card w-full text-left${selected ? " selected" : ""}`}
      aria-pressed={selected}
    >
      <span className="radio-dot" aria-hidden="true">
        <span className="radio-dot-inner" />
      </span>
      <span
        className="text-[15px] leading-snug"
        style={{ color: selected ? "#fff" : "rgba(235,235,245,0.72)" }}
      >
        <span
          className="font-semibold mr-2"
          style={{ color: selected ? "#30d158" : "rgba(235,235,245,0.38)" }}
        >
          {option.letter}.
        </span>
        {option.label}
      </span>
    </button>
  );
}

// ── Main Survey Page ───────────────────────────────────────────────────────
export default function SurveyPage() {
  const navigate = useNavigate();

  // answers[qId] = chosen letter | undefined
  const [answers, setAnswers] = useState({});
  // current question index (0-based)
  const [current, setCurrent] = useState(0);
  // track which "step" key to use for re-mount animation
  const [stepKey, setStepKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const question = QUESTIONS[current];
  const total = QUESTIONS.length;
  const isLast = current === total - 1;
  const selected = answers[question.id];
  const progress = ((current + (selected ? 1 : 0)) / total) * 100;

  const handleSelect = useCallback(
    (letter) => setAnswers((prev) => ({ ...prev, [question.id]: letter })),
    [question.id]
  );

  const handleNext = useCallback(() => {
    if (!selected) return;
    setStepKey((k) => k + 1);
    setCurrent((c) => c + 1);
  }, [selected]);

  const handleSubmit = useCallback(async () => {
    if (!selected || submitting) return;
    setSubmitting(true);
    setError(null);

    // Build payload
    const payload = {};
    QUESTIONS.forEach((q) => {
      payload[q.id] = answers[q.id] ?? "A"; // fallback safety
    });

    try {
      await submitSurvey(payload);
      navigate("/thank-you");
    } catch (err) {
      setError(err.message ?? "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }, [selected, submitting, answers, navigate]);

  // ── Keyboard support
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (isLast) handleSubmit();
        else handleNext();
      }
    },
    [isLast, handleSubmit, handleNext]
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-10"
      style={{ background: "#000" }}
      onKeyDown={handleKey}
    >
      {/* ── Container (max iPhone width) */}
      <div className="w-full max-w-[430px] flex flex-col gap-8">

        {/* ── Header */}
        <div className="flex flex-col gap-3">
          {/* Progress label */}
          <div className="flex items-center justify-between">
            <span
              className="text-[13px] font-medium tracking-widest uppercase"
              style={{ color: "rgba(235,235,245,0.38)", letterSpacing: "0.1em" }}
            >
              Question
            </span>
            <span
              className="text-[13px] font-semibold tabular-nums"
              style={{ color: "rgba(235,235,245,0.45)" }}
            >
              {current + 1}
              <span style={{ color: "rgba(235,235,245,0.22)" }}> / {total}</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* ── Question card */}
        <div
          key={stepKey}
          className="animate-fade-slide-up flex flex-col gap-6"
        >
          {/* Question text */}
          <h1
            className="text-[22px] font-semibold leading-[1.3] tracking-tight"
            style={{ color: "#fff" }}
          >
            {question.text}
          </h1>

          {/* Options */}
          <div className="flex flex-col gap-3" role="radiogroup" aria-label={question.text}>
            {question.options.map((opt) => (
              <OptionCard
                key={opt.letter}
                option={opt}
                selected={selected === opt.letter}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        {/* ── Error */}
        {error && (
          <p
            className="text-[14px] text-center animate-fade-in"
            style={{ color: "#ff453a" }}
          >
            {error}
          </p>
        )}

        {/* ── CTA */}
        <div className="animate-fade-slide-up" style={{ animationDelay: "0.1s" }}>
          {isLast ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selected || submitting}
              className="btn-primary green"
            >
              {submitting ? (
                <>
                  <Spinner />
                  Submitting…
                </>
              ) : (
                "Submit"
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!selected}
              className="btn-primary green"
            >
              Next
              <ArrowRight />
            </button>
          )}
        </div>

        {/* ── Dots navigation */}
        <div className="flex items-center justify-center gap-[6px]">
          {QUESTIONS.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === current ? 20 : 6,
                height: 6,
                background:
                  i < current
                    ? "#30d158"
                    : i === current
                    ? "#fff"
                    : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Micro icons ────────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{
        animation: "spin 0.7s linear infinite",
      }}
    >
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeDasharray="20 18"
        strokeLinecap="round"
      />
    </svg>
  );
}