export default function AIAnswerBox({ answer, confidence, loading = false }) {
  if (loading) return null;

  // Parse **bold** markdown to accent color
  const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={i} className="text-brand font-bold">{part.slice(2,-2)}</strong>
        : <span key={i}>{part}</span>
    );
  };

  const isHigh = confidence === "High";
  const confBadge = isHigh ? "badge-emerald" : confidence === "Medium" ? "badge-amber" : "badge-red";
  const confIcon  = isHigh ? "✨" : confidence === "Medium" ? "⚖️" : "⚠️";

  return (
    <div className="card" style={{
      padding: "32px",
      position: "relative",
      overflow: "hidden",
      animation: "fadeUp 0.5s var(--ease-out) both",
      background: "linear-gradient(145deg, rgba(30,24,60,0.9) 0%, rgba(14,16,32,0.95) 100%)",
      borderColor: "var(--border-brand)",
      boxShadow: "var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.1)"
    }}>
      {/* Decorative blurred blobs */}
      <div style={{
        position: "absolute", top: -80, right: -40, width: 200, height: 200,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "absolute", bottom: -60, left: -20, width: 140, height: 140,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "var(--grad-brand)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, boxShadow: "0 0 20px rgba(139,92,246,0.4), inset 0 2px 4px rgba(255,255,255,0.3)",
          }}>🧠</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div className="font-head font-bold text-xl text-head" style={{ marginBottom: 2, letterSpacing: "-0.01em" }}>
              Janta AI <span className="grad-text">Insight</span>
            </div>
            <div className="text-sm text-sub">
              Personalized synthesis of 10M+ Indian decisions
            </div>
          </div>
          <span className={`badge ${confBadge} font-semi`} style={{ padding: "6px 14px" }}>
            {confIcon} {confidence} Confidence
          </span>
        </div>

        {/* Answer Content */}
        <div className="text-body" style={{
          fontSize: "1rem", lineHeight: 1.8,
        }}>
          {answer.split("\n\n").map((para, i) => {
            const isRec = para.includes("Janta AI Recommendation:");
            if (isRec) {
              return (
                <div key={i} style={{
                  marginTop: 28, padding: "20px", borderRadius: "var(--r-md)",
                  background: "var(--bg-active)", border: "1px solid var(--border-brand)",
                  position: "relative"
                }}>
                  <div style={{ position: "absolute", top: -14, left: 20, background: "var(--brand)", color: "#fff", padding: "4px 12px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", boxShadow: "0 2px 10px rgba(139,92,246,0.4)" }}>
                    Final Verdict
                  </div>
                  <strong className="text-head font-semi text-lg" style={{ display: "block", marginBottom: 6 }}>
                    The Recommendation
                  </strong>
                  {formatText(para.replace("**Janta AI Recommendation:**", "").trim())}
                </div>
              );
            }
            return (
              <p key={i} style={{ marginBottom: i < answer.split("\n\n").length - 1 ? 16 : 0 }}>
                {formatText(para)}
              </p>
            );
          })}
        </div>

        {/* Disclaimer row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 28, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg-hover)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🛡️</div>
          <p className="text-xs text-mute" style={{ flex: 1, lineHeight: 1.5 }}>
            This insight is generated using LLM pattern analysis on community votes. It does not constitute certified financial or career counseling.
          </p>
        </div>
      </div>
    </div>
  );
}
