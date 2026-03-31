import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AnswerCard({ answer, delay = 0 }) {
  const { userUpvotes, upvoteAnswer } = useApp();
  const voted = userUpvotes[answer.id];
  const [bump, setBump] = useState(false);

  const handleUpvote = () => {
    if (voted) return;
    upvoteAnswer(answer.id);
    setBump(true);
    setTimeout(() => setBump(false), 400);
  };

  // Assign a color based on avatar letter if none provided
  const getAvatarColor = (letter) => {
    const colors = ["#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#06B6D4"];
    return colors[letter.charCodeAt(0) % colors.length];
  };
  
  const bgColor = answer.color || getAvatarColor(answer.avatar[0]);

  return (
    <div style={{
      padding: "20px 24px",
      background: "var(--bg-glass)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-md)",
      marginBottom: 16,
      animation: `fadeUp 0.5s var(--ease-out) ${delay}s both`,
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden"
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "var(--border-brand)";
      e.currentTarget.style.background = "var(--bg-hover)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.background = "var(--bg-glass)";
    }}
    >
      {/* Voted subtle highlight */}
      {voted && (
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: 4,
          background: "var(--brand)",
          boxShadow: "0 0 12px var(--brand)",
        }} />
      )}

      {/* Author row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
        <div className="avatar avatar-md" style={{
          background: bgColor,
          color: "#fff",
          boxShadow: `0 2px 10px ${bgColor}40`
        }}>
          {answer.avatar}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-h)" }}>
              {answer.author}
            </span>
            {answer.verified && (
              <span title="Verified Expert" style={{ fontSize: "0.85rem", background: "rgba(16,185,129,0.15)", borderRadius: "50%", padding: 2 }}>✅</span>
            )}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-sub)", fontWeight: 500 }}>
            {answer.timeAgo}
          </span>
        </div>
        
        {/* Upvote button */}
        <button id={`upvote-${answer.id}`} className={`upvote-btn ${voted ? "voted" : ""}`}
            onClick={handleUpvote}
            style={{ 
              transform: bump ? "scale(1.2) translateY(-2px)" : "scale(1)", 
              marginLeft: "auto",
              padding: "6px 14px"
            }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={voted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "all 0.2s" }}>
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            <span style={{ marginLeft: 4 }}>{answer.upvotes}</span>
          </button>
      </div>

      {/* Answer text */}
      <p style={{
        fontSize: "0.95rem", lineHeight: 1.7,
        color: "var(--text-b)", margin: 0,
      }}>
        {answer.text}
      </p>
    </div>
  );
}
