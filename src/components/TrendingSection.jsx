import { useNavigate } from "react-router-dom";
import { trendingTopics } from "../data/mockData";

export default function TrendingSection() {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ padding: "24px", marginBottom: 32, background: "var(--bg-surface)" }}>
      <div className="section-title text-head" style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 22 }}>🔥</span> 
        <span style={{ fontSize: "1.1rem" }}>Trending Topics</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {trendingTopics.map((t, i) => (
          <button key={t.id} id={`trending-${t.id}`}
            onClick={() => navigate("/ask")}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 16px", borderRadius: "var(--r-sm)",
              background: "var(--bg-glass)", border: "1px solid var(--border)",
              cursor: "pointer", transition: "all .2s ease", textAlign: "left",
              animation: `slideIn 0.4s var(--ease-out) ${i * 0.08}s both`,
              position: "relative", overflow: "hidden"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--bg-active)";
              e.currentTarget.style.borderColor = "var(--border-brand)";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--bg-glass)";
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            {/* Index number subtle bg */}
            <div style={{ position: "absolute", left: -6, top: "50%", transform: "translateY(-50%)", fontSize: "3rem", fontWeight: 900, color: "rgba(255,255,255,0.02)", zIndex: 0, pointerEvents: "none" }}>
              #{i+1}
            </div>

            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              <span className="font-semi text-head" style={{ fontSize: "0.95rem" }}>
                {t.label.split(" ").slice(1).join(" ")}
              </span>
            </div>
            
            <span className="badge badge-brand text-xs" style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
