import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const COLORS = ["--brand", "--pink", "--emerald", "--amber", "--cyan"];
const EMOJIS = ["💼", "📚", "💰", "🚀", "🌱"];

const MOCK_OUTCOMES = [
  { label: "Core thesis validated", status: "Tracking", emoji: "🧠", color: "var(--brand)" },
  { label: "Upskill trajectory 2026", status: "In Progress", emoji: "🚀", color: "var(--cyan)" },
  { label: "Initial capital allocation", status: "Locked", emoji: "💰", color: "var(--emerald)" },
];

export default function Profile() {
  const { userProfile, questions, userVotes, saveProfile } = useApp();
  const navigate = useNavigate();

  if (!userProfile) {
    return (
      <div className="container" style={{ padding: "120px 0", textAlign: "center" }}>
        <div style={{ fontSize: 80, marginBottom: 24, animation: "float 4s ease-in-out infinite" }}>👤</div>
        <h2 className="font-head font-black text-4xl text-head" style={{ marginBottom: 16 }}>
          Identity Required
        </h2>
        <p className="text-sub text-lg" style={{ marginBottom: 40, maxWidth: 400, margin: "0 auto 40px" }}>
          The Engine requires context to generate valid insights.
        </p>
        <button className="btn btn-brand btn-xl" onClick={() => navigate("/onboarding")}>
          Build Identity Matrix →
        </button>
      </div>
    );
  }

  const votedIds = Object.keys(userVotes);
  const pastDecisions = questions.filter(q => votedIds.includes(q.id));
  const stages = { student:"Student", fresher:"Fresher", working:"Professional", entrepreneur:"Founder" };

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container-sm">
        
        {/* Head-Up Display (Profile Hero) */}
        <div className="card" style={{
          padding: "48px 32px", marginBottom: 32,
          background: "linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-card) 100%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          borderTop: "1px solid var(--border-brand)",
          boxShadow: "var(--shadow-lg), 0 -20px 40px rgba(139,92,246,0.1)",
          position: "relative", overflow: "hidden"
        }}>
          {/* subtle mesh bg */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 160, background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="avatar" style={{
            width: 96, height: 96, marginBottom: 20, zIndex: 1,
            background: "var(--grad-hero)",
            fontSize: "2.5rem", color: "#fff",
            boxShadow: "0 0 40px rgba(236,72,153,0.4), inset 0 2px 10px rgba(255,255,255,0.4)",
          }}>
            {userProfile.name[0].toUpperCase()}
          </div>

          <h1 className="font-head font-black text-3xl text-head" style={{ marginBottom: 4, zIndex: 1 }}>
            {userProfile.name}
          </h1>
          <p className="text-sub font-semi text-base" style={{ marginBottom: 24, zIndex: 1, letterSpacing: "0.02em" }}>
            Lvl {userProfile.age} · {stages[userProfile.stage] || "User"}
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", zIndex: 1 }}>
            {(userProfile.goals || []).map((g, i) => (
              <span key={g} className="badge badge-brand text-xs" style={{ padding: "6px 14px", border: "1px solid rgba(139,92,246,0.5)", background: "rgba(139,92,246,0.2)" }}>
                {EMOJIS[i%EMOJIS.length]} {g.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Telemetry (Stats) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { v: pastDecisions.length, l: "Decisions", i: "🎯" },
            { v: votedIds.length, l: "Data Points", i: "📊" },
            { v: "Top 5%", l: "Consensus", i: "🌐" },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: "20px 16px", textAlign: "center", background: "var(--bg-glass)" }}>
              <div style={{ fontSize: 28, marginBottom: 8, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>{s.i}</div>
              <div className="font-head font-black text-2xl grad-text">{s.v}</div>
              <div className="text-xs font-bold text-sub uppercase" style={{ marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Objectives (Outcome tracker) */}
        <div className="card" style={{ padding: "32px", marginBottom: 32 }}>
          <div className="section-title" style={{ marginBottom: 24 }}>
            <span>🏁</span> Vector Objectives
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {MOCK_OUTCOMES.map((o, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "16px",
                background: "var(--bg-active)", borderRadius: "var(--r-md)",
                borderLeft: `4px solid ${o.color}`
              }}>
                <span style={{ fontSize: 24 }}>{o.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div className="font-semi text-head" style={{ fontSize: "1rem", marginBottom: 2 }}>{o.label}</div>
                  <div className="text-xs text-sub font-mono">{new Date().toISOString().split('T')[0]}</div>
                </div>
                <span className="badge font-semi" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-body)", border: "1px solid var(--border)" }}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log (Past Decisions) */}
        <div className="section-title" style={{ marginBottom: 20 }}>
          <span>📜</span> Interaction Ledger
        </div>

        {pastDecisions.length === 0 ? (
          <div className="card" style={{ padding: "48px 24px", textAlign: "center", borderStyle: "dashed", borderColor: "var(--border-brand)" }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>🗄️</div>
            <p className="text-sub font-semi">No data recorded yet.</p>
            <button className="btn btn-outline mt-4" onClick={() => navigate("/")}>Enter the Matrix</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pastDecisions.map((q, i) => {
              const voted = userVotes[q.id];
              const tVotes = q.votesA + q.votesB;
              const lbl = voted === "A" ? q.optionA : q.optionB;
              const pct = tVotes ? Math.round(((voted === "A" ? q.votesA : q.votesB) / tVotes) * 100) : 50;

              return (
                <div key={q.id} className="card card-hover"
                  style={{ padding: "20px 24px", cursor: "pointer", animation: `slideIn .3s ease ${i*.1}s both` }}
                  onClick={() => navigate(`/decision/${q.id}`)}>
                  <p className="font-semi text-head" style={{ marginBottom: 12, lineHeight: 1.4 }}>{q.text}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span className="badge badge-emerald" style={{ padding: "4px 10px" }}>✓ Selected: {lbl}</span>
                    <span className="text-xs font-semi text-sub">
                      Matches <strong className="text-emerald">{pct}%</strong> of the swarm
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Sysadmin */}
        <div style={{ marginTop: 48, textAlign: "center", borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <button className="btn btn-ghost text-xs" style={{ color: "var(--pink)" }} onClick={() => {
            if (window.confirm("Purge local identity and restart?")) {
              localStorage.removeItem("jantaai_profile");
              saveProfile(null);
              navigate("/onboarding");
            }
          }}>⚠️ FACTORY RESET</button>
        </div>

      </div>
    </div>
  );
}
