import { useEffect, useRef } from "react";

export default function ThankYouPage() {
  const circleRef = useRef(null);

  // Draw animated checkmark SVG path
  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;
    const len = circle.getTotalLength();
    circle.style.strokeDasharray = len;
    circle.style.strokeDashoffset = len;
    // trigger animation
    requestAnimationFrame(() => {
      circle.style.transition = "stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1)";
      circle.style.strokeDashoffset = "0";
    });
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{ background: "#000" }}
    >
      <div className="flex flex-col items-center gap-8 animate-scale-in">

        {/* Animated check circle */}
        <div className="relative flex items-center justify-center" style={{ width: 90, height: 90 }}>
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              inset: -12,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(48,209,88,0.18) 0%, transparent 70%)",
              animation: "fadeIn 0.6s ease 0.5s both",
            }}
          />
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            {/* Background circle */}
            <circle cx="45" cy="45" r="42" fill="rgba(48,209,88,0.1)" />
            {/* Animated ring */}
            <circle
              ref={circleRef}
              cx="45"
              cy="45"
              r="38"
              stroke="#30d158"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
            {/* Static checkmark */}
            <path
              d="M30 45.5l10.5 10.5 19.5-22"
              stroke="#30d158"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: "fadeIn 0.3s ease 0.65s both", opacity: 0 }}
            />
          </svg>
        </div>

        {/* Text */}
        <div
          className="flex flex-col items-center gap-3 text-center"
          style={{ animation: "fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
        >
          <h1
            className="text-[26px] font-semibold tracking-tight"
            style={{ color: "#fff" }}
          >
            Thank you for your response.
          </h1>
          <p
            className="text-[15px] max-w-[260px] leading-relaxed"
            style={{ color: "rgba(235,235,245,0.45)" }}
          >
            Your answers have been recorded.
          </p>
        </div>

        {/* Subtle divider */}
        <div
          style={{
            width: 40,
            height: 1,
            background: "rgba(255,255,255,0.1)",
            animation: "fadeIn 0.5s ease 0.7s both",
            opacity: 0,
          }}
        />

        {/* Subtle back link */}
        <a
          href="/"
          style={{
            color: "rgba(235,235,245,0.3)",
            fontSize: 13,
            textDecoration: "none",
            animation: "fadeIn 0.5s ease 0.85s both",
            opacity: 0,
            transition: "color 200ms ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "rgba(235,235,245,0.6)")}
          onMouseLeave={(e) => (e.target.style.color = "rgba(235,235,245,0.3)")}
        >
          Take again
        </a>
      </div>
    </div>
  );
}