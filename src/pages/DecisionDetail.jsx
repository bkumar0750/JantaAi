import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getAIResponse } from "../utils/aiEngine";
import AIAnswerBox from "../components/AIAnswerBox";
import PollBar from "../components/PollBar";
import AnswerCard from "../components/AnswerCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function DecisionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { questions, userProfile, userVotes, voteOnQuestion } = useApp();
  const question = questions.find(q => q.id === id);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult,  setAiResult]  = useState(null);
  const [activeTab, setActiveTab] = useState("ai"); // "ai" | "community"
  const [newAnswer, setNewAnswer] = useState("");
  const [localAnswers, setLocalAnswers] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!question) return;
    setAiLoading(true);
    getAIResponse(question.text, userProfile || {}).then(result => {
      setAiResult(result);
      setAiLoading(false);
    });
  }, [id, question?.text, userProfile]);

  if (!question) {
    return (
      <div className="container" style={{ padding: "100px 0", textAlign: "center" }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🧭</div>
        <h2 className="font-head font-black text-3xl text-head" style={{ marginBottom: 16 }}>
          Decision Lost in Space
        </h2>
        <button className="btn btn-brand btn-lg" onClick={() => navigate("/")}>Return to Base →</button>
      </div>
    );
  }

  const voted     = userVotes[question.id];
  const totalVotes = question.votesA + question.votesB;
  const pctA = totalVotes ? Math.round((question.votesA / totalVotes) * 100) : 50;
  const pctB = 100 - pctA;
  const allAnswers = [...(question.answers || []), ...localAnswers];

  const handleVote = (option) => { if (!voted) voteOnQuestion(question.id, option); };

  const handleAddAnswer = () => {
    if (!newAnswer.trim() || newAnswer.trim().length < 10) return;
    setLocalAnswers(prev => [{
      id: `local-${Date.now()}`,
      author: userProfile?.name || "You",
      avatar: (userProfile?.name || "U")[0].toUpperCase(),
      color: "var(--pink)",
      text: newAnswer,
      upvotes: 0, downvotes: 0, timeAgo: "Just now", verified: false,
    }, ...prev]);
    setNewAnswer("");
  };

  return (
    <div style={{ padding: "32px 0 80px" }}>
      <div className="container-sm">
        
        {/* Breadcrumb nav */}
        <button className="btn btn-ghost btn-xs" onClick={() => navigate(-1)} style={{ marginBottom: 24, padding: "8px 16px" }}>
          ← Back to Feed
        </button>

        {/* Master Context Card */}
        <div className="card" style={{ padding: "32px", marginBottom: 32, background: "var(--bg-card)", borderTop: "4px solid var(--brand)" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
            <span className="badge badge-brand">{question.category}</span>
            <span className="text-sub text-sm font-semi">{question.timeAgo}</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              {question.trending && <span className="badge badge-amber">🔥 Hot Topic</span>}
            </div>
          </div>
          
          <h1 className="font-head font-black text-3xl text-head" style={{ lineHeight: 1.3, marginBottom: 32, letterSpacing: "-0.01em" }}>
            {question.text}
          </h1>

          {/* Core Interaction Area */}
          {!voted ? (
            <div style={{ background: "var(--bg-glass)", padding: "24px", borderRadius: "var(--r-md)", border: "1px dashed rgba(139,92,246,0.3)" }}>
              <p className="font-semi text-brand" style={{ marginBottom: 16, textAlign: "center" }}>
                Cast your vote to unlock the data
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <button className="btn btn-outline btn-lg" style={{ width: "100%", whiteSpace: "normal", minHeight: 60 }} onClick={() => handleVote("A")}>
                  {question.optionA}
                </button>
                <button className="btn btn-outline btn-lg" style={{ width: "100%", whiteSpace: "normal", minHeight: 60 }} onClick={() => handleVote("B")}>
                  {question.optionB}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 16 }}>
                <span className="text-sm font-bold text-sub uppercase" style={{ letterSpacing: "0.05em" }}>Community Pulse</span>
              </div>
              <PollBar optionA={question.optionA} optionB={question.optionB}
                pctA={pctA} pctB={pctB} totalVotes={totalVotes} voted={voted} />
            </div>
          )}
        </div>

        {/* Intelligence Split View */}
        <div style={{ 
          display: "flex", background: "var(--bg-glass)", padding: 6, 
          borderRadius: "var(--r-lg)", marginBottom: 32, border: "1px solid var(--border)"
        }}>
          {[
            { key: "ai", label: "🤖 AI Verdict" },
            { key: "community", label: `💬 Discourse (${allAnswers.length})` },
          ].map(tab => (
            <button key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1, padding: "12px", borderRadius: "16px",
                border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.95rem",
                transition: "all .3s var(--ease-out)",
                background: activeTab === tab.key ? "var(--brand)" : "transparent",
                color: activeTab === tab.key ? "#fff" : "var(--text-sub)",
                boxShadow: activeTab === tab.key ? "0 4px 16px rgba(139,92,246,0.5)" : "none",
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content: AI */}
        {activeTab === "ai" && (
          <div style={{ animation: "fadeUp .4s ease both" }}>
            {aiLoading ? (
              <div className="card" style={{ padding: "40px" }}><LoadingSpinner /></div>
            ) : aiResult ? (
              <>
                <AIAnswerBox answer={aiResult.answer} confidence={aiResult.confidence} />

                {/* Micro-insight: Peer Group */}
                {question.peopleLikeYou && voted && (
                  <div className="card" style={{
                    marginTop: 24, padding: "24px 32px",
                    background: "var(--grad-emerald)",
                    border: "none", display: "flex", alignItems: "center", gap: 24,
                    flexWrap: "wrap", color: "#fff"
                  }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: `conic-gradient(#fff ${question.peopleLikeYou.percent}%, rgba(0,0,0,0.2) 0)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
                    }}>
                      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--emerald-light)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.2rem", color: "#fff" }}>
                        {question.peopleLikeYou.percent}%
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <h3 className="font-head font-bold text-xl" style={{ marginBottom: 4 }}>Peer Group Analysis</h3>
                      <p style={{ fontSize: "0.95rem", opacity: 0.9, lineHeight: 1.5 }}>
                        <strong>{question.peopleLikeYou.percent}%</strong> of <em>{question.peopleLikeYou.insight}</em> matching your profile ultimately selected <strong style={{ textDecoration: "underline" }}>{question.peopleLikeYou.choice}</strong>.
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        )}

        {/* Tab Content: Community */}
        {activeTab === "community" && (
          <div style={{ animation: "slideIn .4s ease both" }}>
            
            {/* Thread Composer */}
            <div className="card" style={{ padding: "24px", marginBottom: 32, background: "rgba(14,16,32,0.9)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="avatar avatar-md" style={{ background: "var(--grad-brand)" }}>{(userProfile?.name||"U")[0].toUpperCase()}</div>
                <div className="font-semi text-head">Add to the discourse</div>
              </div>
              <textarea className="input"
                placeholder="Share your lived experience regarding this exact scenario..."
                value={newAnswer} onChange={e => setNewAnswer(e.target.value)}
                rows={3} style={{ marginBottom: 16, background: "var(--bg-glass)" }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-brand"
                  onClick={handleAddAnswer} disabled={newAnswer.trim().length < 10}>
                  Post Insight →
                </button>
              </div>
            </div>

            {/* Answer Feed */}
            {allAnswers.length === 0 ? (
              <div style={{ textAlign: "center", padding: "64px 20px" }}>
                <span style={{ fontSize: 48 }}>🦗</span>
                <p className="text-sub font-semi mt-4">No community insights yet. You can be the first to share.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {allAnswers.map((a, i) => <AnswerCard key={a.id} answer={a} delay={i * 0.1} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
