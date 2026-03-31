import { useEffect, useRef, useState } from "react";

export default function PollBar({ optionA, optionB, pctA, pctB, totalVotes, voted, compact = false }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    // slightly longer delay for smoother entry
    const timeout = setTimeout(() => setAnimated(true), 120);
    return () => clearTimeout(timeout);
  }, []);

  const winnerA = pctA >= pctB;

  const renderBar = (option, pct, isA) => {
    const isVoted = voted === (isA ? "A" : "B");
    const isWinner = isA ? winnerA : !winnerA;
    
    // Gradient logic
    let fillStyle = "linear-gradient(90deg, #6D28D9, #4C1D95)"; // default muted purple
    if (isVoted) {
      fillStyle = "var(--grad-emerald)"; // highlight user choice in green/cyan
    } else if (isWinner) {
      fillStyle = "var(--grad-brand)"; // highlight winner in brand colors
    }

    return (
      <div style={{ marginBottom: compact ? 0 : 12, flex: 1, minWidth: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
          <span style={{
            fontSize: "0.85rem", fontWeight: isVoted ? 700 : 600,
            color: isVoted ? "var(--emerald-light)" : isWinner ? "var(--text-h)" : "var(--text-sub)",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            {isVoted && <span style={{ color: "var(--emerald-light)", fontSize: "1rem" }}>✓</span>}
            {option}
          </span>
          <span style={{
            fontSize: "1rem", fontWeight: 800, fontFamily: "var(--font-head)",
            color: isVoted ? "var(--emerald-light)" : isWinner ? "var(--brand-light)" : "var(--text-mute)",
          }}>{pct}%</span>
        </div>
        <div className="progress-track" style={{ height: 10, background: "rgba(0,0,0,0.3)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)" }}>
          <div className="progress-fill" style={{
            width: animated ? `${pct}%` : "0%",
            background: fillStyle,
            boxShadow: isVoted ? "0 0 12px rgba(16,185,129,0.4)" : "none",
          }} />
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: compact ? 12 : 0, marginBottom: compact ? 0 : 12 }}>
      {renderBar(optionA, pctA, true)}
      {renderBar(optionB, pctB, false)}

      {!compact && (
        <p style={{ fontSize: "0.8rem", color: "var(--text-sub)", marginTop: 16, display: "flex", gap: 6, alignItems: "center" }}>
          <span>🗳️</span> {totalVotes.toLocaleString()} total votes cast
        </p>
      )}
    </div>
  );
}
