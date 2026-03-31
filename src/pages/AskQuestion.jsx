import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getAIResponse } from "../utils/aiEngine";
import { aiSuggestions } from "../data/mockData";
import LoadingSpinner from "../components/LoadingSpinner";
import AIAnswerBox from "../components/AIAnswerBox";

let qCounter = 200;

export default function AskQuestion() {
  const { userProfile, addQuestion } = useApp();
  const navigate = useNavigate();
  const [input,       setInput]       = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [aiResult,    setAiResult]    = useState(null);
  const [newQId,      setNewQId]      = useState(null);

  // Live filtering of suggestions based on input
  useEffect(() => {
    if (input.trim().length < 3) { setSuggestions([]); return; }
    const match = aiSuggestions.filter(s => s.toLowerCase().includes(input.toLowerCase()) && s !== input).slice(0, 3);
    setSuggestions(match);
  }, [input]);

  const handleSubmit = useCallback(async () => {
    const text = input.trim();
    if (text.length < 10) return;
    
    setLoading(true); setAiResult(null); setSuggestions([]);
    
    // Simulate API call
    const res = await getAIResponse(text, userProfile || {});
    setAiResult(res);
    setLoading(false);

    // Persist as new question
    const id = `q-new-${++qCounter}`;
    addQuestion({
      id, text,
      category: res.topic.charAt(0).toUpperCase() + res.topic.slice(1),
      optionA: res.optionA, optionB: res.optionB,
      votesA: 0, votesB: 0, totalVotes: 0,
      trending: false, timeAgo: "Just now", tags: [res.topic],
      answers: [], peopleLikeYou: null,
    });
    setNewQId(id);
  }, [input, userProfile, addQuestion]);

  const handleShare = () => {
    const msg = `🤖 I asked Janta AI: "${input}"\n\nSee the AI answer and cast your vote: https://jantaai.in`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{ padding: "48px 0 80px" }}>
      <div className="container-sm">
        
        {/* Intro */}
        <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp .5s ease both" }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16, padding: "6px 14px" }}>
            <span style={{ fontSize: "1.1rem", marginRight: 6 }}>🤖</span> Brain Engine v2 Live
          </div>
          <h1 className="text-4xl font-black font-head text-head" style={{ marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Ask Janta AI Anything
          </h1>
          <p className="text-body font-semi" style={{ fontSize: "1.1rem" }}>
            Type your dilemma below. Get an instant, data-backed recommendation.
          </p>
        </div>

        {/* Input Card */}
        <div className="card" style={{ padding: "32px", marginBottom: 32, animation: "fadeUp .5s ease .1s both" }}>
          <div style={{ position: "relative" }}>
            <textarea
              className="input input-lg"
              placeholder="e.g. Should I leave my 20LPA job to build a startup in 2026?"
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={4}
              style={{ fontSize: "1.1rem", fontWeight: 500, paddingBottom: 40 }}
              onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(); }}
            />
            <div style={{ position: "absolute", bottom: 14, right: 16, color: input.length > 250 ? "var(--pink)" : "var(--text-mute)", fontSize: "0.8rem", fontWeight: 700 }}>
              {input.length}/300
            </div>
          </div>

          {/* Autocomplete bubbles */}
          {suggestions.length > 0 && (
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {suggestions.map((s, i) => (
                <button key={i} className="tag" onClick={() => { setInput(s); setSuggestions([]); }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 16, marginTop: 24, alignItems: "center" }}>
            <button
              className="btn btn-brand btn-xl"
              style={{ flex: 1 }}
              onClick={handleSubmit}
              disabled={loading || input.trim().length < 10}
            >
              {loading ? "Analyzing..." : "Generate AI Verdict ✨"}
            </button>
            {aiResult && (
              <button className="btn btn-emerald btn-icon" onClick={handleShare} title="Share via WhatsApp" style={{ width: 56, height: 56 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </button>
            )}
          </div>
          
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <span className="text-xs font-semi text-sub">Press <kbd style={{ background:"var(--bg-glass)", border:"1px solid var(--border)", padding:"2px 6px", borderRadius:4}}>⌘ + Enter</kbd> to submit</span>
          </div>
        </div>

        {/* Dynamic Display Area */}
        {loading && (
          <div className="card" style={{ padding: "16px" }}>
            <LoadingSpinner message="Consulting the Hive Mind..." />
          </div>
        )}

        {aiResult && !loading && (
          <>
            <AIAnswerBox answer={aiResult.answer} confidence={aiResult.confidence} />
            <div style={{ display: "flex", gap: 16, marginTop: 24, animation: "fadeUp .5s ease .4s both" }}>
              <button className="btn btn-outline btn-lg" style={{ flex: 1 }} onClick={() => navigate(`/decision/${newQId}`)}>
                Open Community Poll →
              </button>
            </div>
          </>
        )}

        {/* Pre-fill prompts */}
        {!aiResult && !loading && (
          <div style={{ marginTop: 48, animation: "fadeUp .5s ease .2s both" }}>
            <div className="section-title text-sub" style={{ marginBottom: 20 }}>
              <span>💡</span> Prompt Library
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {aiSuggestions.slice(0, 4).map((q, i) => (
                <button key={i}
                  className="card card-hover"
                  onClick={() => setInput(q)}
                  style={{ padding: "18px 20px", textAlign: "left", cursor: "pointer", background: "var(--bg-glass)", animation: `slideIn .3s ease ${i*.1}s both` }}>
                  <span className="text-body font-semi">"{q}"</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
