import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import DecisionCard from "../components/DecisionCard";
import TrendingSection from "../components/TrendingSection";

const FILTERS = [
  { id: "all", label: "Everything", icon: "✨" },
  { id: "career", label: "Career", icon: "💼" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "skills", label: "Skills", icon: "🚀" },
  { id: "life", label: "Life", icon: "🌱" },
];

export default function Home() {
  const { questions, userProfile } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return questions.filter(q => {
      const matchCat = activeTab === "all" || q.tags.includes(activeTab);
      const matchSearch = !search || q.text.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [questions, activeTab, search]);

  const displayTrending = filtered.filter(q => q.trending);
  const regular = filtered.filter(q => !q.trending);

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">
        
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          {userProfile && (
            <div className="badge badge-brand anim-fade-up" style={{ marginBottom: 16, padding: "6px 14px" }}>
              👋 Welcome back, {userProfile.name}
            </div>
          )}
          <h1 className="text-5xl font-black font-head" style={{ marginBottom: 20, letterSpacing: "-0.03em", lineHeight: 1.15, animation: "fadeUp .5s ease .1s both" }}>
            The Collective Brain <br />
            of <span className="grad-text-emerald">Modern India</span>
          </h1>
          <p className="text-lg text-sub font-semi" style={{ maxWidth: 640, margin: "0 auto 32px", animation: "fadeUp .5s ease .2s both" }}>
            Don't guess your next life move. Ask the AI and see real voting data from professionals, students, and founders like you.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp .5s ease .3s both" }}>
            <button className="btn btn-brand btn-xl" onClick={() => navigate("/ask")}>
              Ask a Life Question 🤖
            </button>
            <button className="btn btn-ghost btn-xl" onClick={() => document.getElementById("main-feed").scrollIntoView({ behavior: "smooth", block: "start" })}>
              Browse Feed ↓
            </button>
          </div>
        </div>

        {/* Global Stats Strip */}
        <div style={{ 
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, 
          marginBottom: 56, animation: "fadeUp .6s ease .4s both" 
        }}>
          {[
            { value: "10M+", label: "Decisions Processed", color: "var(--brand-light)" },
            { value: "94%", label: "AI Accuracy Rating", color: "var(--emerald-light)" },
            { value: "Zero", label: "Generic Advice", color: "var(--pink-light)" }
          ].map((s, i) => (
            <div key={i} className="card card-hover" style={{ padding: "24px", textAlign: "center" }}>
              <div className="font-head font-black text-3xl" style={{ color: s.color, marginBottom: 4 }}>
                {s.value}
              </div>
              <div className="text-sm font-bold text-sub uppercase" style={{ letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Main Feed area */}
        <div className="feed-grid" id="main-feed">
          
          {/* Left Column (Feed) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            
            {/* Search & Filters */}
            <div style={{ position: "relative", marginBottom: 12 }}>
              <div className="input-group">
                <span className="input-icon text-mute" style={{ fontSize: "1.2rem" }}>🔍</span>
                <input className="input input-lg"
                  placeholder="Search for UPSC, Stocks, MBA..."
                  value={search} onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
              {FILTERS.map(f => (
                <button key={f.id} className={`tag ${activeTab === f.id ? "active" : ""}`}
                  onClick={() => setActiveTab(f.id)}>
                  <span>{f.icon}</span> {f.label}
                </button>
              ))}
            </div>

            {/* Questions List */}
            {displayTrending.length > 0 && (
              <>
                <div className="section-title text-emerald" style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 24 }}>📈</span> Viral Decisions
                </div>
                {displayTrending.map((q, i) => <DecisionCard key={q.id} question={q} delay={i * 0.1} />)}
                
                {regular.length > 0 && (
                  <div className="section-title text-brand" style={{ marginBottom: 20, marginTop: 40 }}>
                    <span style={{ fontSize: 24 }}>✨</span> Recommended for You
                  </div>
                )}
              </>
            )}

            {regular.map((q, i) => <DecisionCard key={q.id} question={q} delay={i * 0.1} />)}

            {filtered.length === 0 && (
              <div className="card" style={{ padding: "64px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 24 }}>🤔</div>
                <h3 className="font-head font-bold text-2xl text-head" style={{ marginBottom: 12 }}>No questions found</h3>
                <p className="text-body" style={{ marginBottom: 32 }}>Be the first person in India to ask this question.</p>
                <button className="btn btn-brand btn-lg" onClick={() => navigate("/ask")}>Go Ask the AI →</button>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="feed-sidebar">
            <TrendingSection />
            
            {/* Call to action card */}
            <div className="card" style={{ 
              padding: "24px", textAlign: "center",
              background: "var(--grad-card)",
              border: "1px solid var(--border-brand)"
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔮</div>
              <h3 className="font-head font-bold text-lg text-head" style={{ marginBottom: 10 }}>Stuck on a crossroad?</h3>
              <p className="text-sm text-body" style={{ marginBottom: 20, lineHeight: 1.6 }}>
                Get a completely personalized roadmap based on your profile inputs.
              </p>
              <button className="btn btn-brand btn-full btn-lg" onClick={() => navigate("/ask")}>
                Generate AI Insight
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
