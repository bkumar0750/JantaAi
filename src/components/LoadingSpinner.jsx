export default function LoadingSpinner({ message = "Janta AI is thinking…" }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 24, padding: "48px 20px",
      minHeight: 240,
    }}>
      {/* Abstract AI core animation */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        {/* Outer dashed ring */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px dashed rgba(139,92,246,0.3)",
          animation: "spin 12s linear infinite",
        }} />
        
        {/* Middle gradient ring */}
        <div style={{
          position: "absolute", inset: 8, borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "var(--brand)",
          borderRightColor: "var(--pink)",
          animation: "spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite",
        }} />
        
        {/* Inner solid ring */}
        <div style={{
          position: "absolute", inset: 18, borderRadius: "50%",
          border: "3px solid transparent",
          borderLeftColor: "var(--cyan)",
          borderBottomColor: "var(--emerald)",
          animation: "spinRev 1s linear infinite",
        }} />
        
        {/* Center icon / glow */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 24,
          animation: "pulse 2s ease-in-out infinite",
          filter: "drop-shadow(0 0 10px rgba(139,92,246,0.8))"
        }}>🧠</div>
      </div>

      {/* Text area */}
      <div style={{ textAlign: "center" }}>
        <p className="grad-text font-black text-lg" style={{ marginBottom: 6, letterSpacing: "0.02em" }}>
          {message}
        </p>
        <p style={{ color: "var(--text-sub)", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--emerald-light)", animation: "pulse 1s infinite" }}></span>
          Analyzing millions of Indian decisions
        </p>
      </div>
    </div>
  );
}
