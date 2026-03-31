import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PollBar from "./PollBar";

const CAT_COLORS = {
  Career: "brand", Education: "emerald", Finance: "amber",
  Skills: "cyan", Life: "pink",
};

export default function DecisionCard({ question, showPoll = false, delay = 0 }) {
  const navigate  = useNavigate();
  const { userVotes, voteOnQuestion } = useApp();
  const voted = userVotes[question.id];
  const [justVoted, setJustVoted] = useState(null);

  const handleVote = (e, option) => {
    e.stopPropagation();
    if (voted) return;
    voteOnQuestion(question.id, option);
    setJustVoted(option);
  };

  const totalVotes = question.votesA + question.votesB;
  const pctA = totalVotes ? Math.round((question.votesA / totalVotes) * 100) : 50;
  const pctB = 100 - pctA;
  const catTheme = CAT_COLORS[question.category] || "brand";

  return (
    <article
      id={`decision-card-${question.id}`}
      className="card card-hover"
      onClick={() => navigate(`/decision/${question.id}`)}
      style={{
        padding: "24px", cursor: "pointer", marginBottom: 20,
        animation: `fadeUp 0.5s var(--ease-out) ${delay}s both`,
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <span className={`badge badge-${catTheme} text-xs uppercase`} style={{ letterSpacing: "0.06em", padding: "4px 12px" }}>
          {question.category}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {question.trending && (
            <span className="badge badge-amber" style={{ animation: "pulse 2s infinite" }}>🔥 Trending</span>
          )}
          <span style={{ fontSize: "0.8rem", color: "var(--text-sub)", fontWeight: 500 }}>{question.timeAgo}</span>
        </div>
      </div>

      {/* Question Text */}
      <h3 style={{
        fontFamily: "var(--font-head)", fontSize: "1.15rem", fontWeight: 700,
        color: "var(--text-h)", lineHeight: 1.4, marginBottom: 22,
      }}>
        {question.text}
      </h3>

      {/* Voting buttons or poll results */}
      {voted || showPoll ? (
        <PollBar
          optionA={question.optionA}
          optionB={question.optionB}
          pctA={pctA}
          pctB={pctB}
          totalVotes={totalVotes}
          voted={voted}
          compact
        />
      ) : (
        <div style={{ display: "flex", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
          <button className="btn btn-ghost" style={{ flex: "1 1 calc(50% - 6px)", minWidth: 140, padding: "12px", border: "1.5px solid var(--border)" }}
            onClick={e => handleVote(e, "A")}>
            {question.optionA}
          </button>
          <button className="btn btn-ghost" style={{ flex: "1 1 calc(50% - 6px)", minWidth: 140, padding: "12px", border: "1.5px solid var(--border)" }}
            onClick={e => handleVote(e, "B")}>
            {question.optionB}
          </button>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: "1px dashed rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: "0.82rem", color: "var(--text-sub)", display: "flex", alignItems: "center", gap: 6 }}>
            💬 <span className="font-semi text-body">{question.answers?.length || 0}</span> answers
          </span>
          <span style={{ fontSize: "0.82rem", color: "var(--text-sub)", display: "flex", alignItems: "center", gap: 6 }}>
            🗳️ <span className="font-semi text-body">{totalVotes.toLocaleString()}</span> votes
          </span>
        </div>
        <span className="text-brand font-semi text-sm" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          Insights <span style={{ fontSize: "1.2em", lineHeight: 1 }}>→</span>
        </span>
      </div>
    </article>
  );
}
