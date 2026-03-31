import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const STEPS = [
  {
    id: "name", title: "What's your name?",
    sub: "Let's personalize your Janta AI experience",
    type: "text", placeholder: "e.g. Rahul, Priya...", field: "name", icon: "👋"
  },
  {
    id: "age", title: "Your age matters",
    sub: "We'll show you decisions from peers exactly your age",
    type: "number", placeholder: "e.g. 22", field: "age", icon: "🎂"
  },
  {
    id: "stage", title: "Where are you currently?",
    sub: "This helps the AI understand your context",
    type: "choice", field: "stage", icon: "🧭",
    choices: [
      { value: "student", label: "Student", desc: "Currently studying or preparing" },
      { value: "fresher", label: "Fresher", desc: "Just started working (0-2 yrs)" },
      { value: "working", label: "Professional", desc: "Experienced in the workforce" },
      { value: "entrepreneur", label: "Founder", desc: "Running my own venture" },
    ],
  },
  {
    id: "goals", title: "What are your top priorities?",
    sub: "Select all that apply. We'll curate your feed.",
    type: "multi", field: "goals", icon: "🎯",
    choices: [
      { value: "career", label: "Career Growth" }, { value: "finance", label: "Financial Freedom" },
      { value: "skills", label: "Skill Building" }, { value: "education", label: "Higher Education" },
      { value: "health", label: "Health & Fitness" }, { value: "life", label: "Life Changes" },
    ],
  },
];

export default function Onboarding() {
  const { saveProfile } = useApp();
  const navigate = useNavigate();
  const [step, setStep]   = useState(0);
  const [data, setData]   = useState({ name: "", age: "", stage: "", goals: [] });
  const [error, setError] = useState("");

  const current = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;

  const setValue = (field, value) => { setData(d => ({ ...d, [field]: value })); setError(""); };
  const toggleGoal = (value) => {
    setData(d => ({ ...d, goals: d.goals.includes(value) ? d.goals.filter(g => g !== value) : [...d.goals, value] }));
    setError("");
  };

  const isValid = () => {
    const v = data[current.field];
    if (current.type === "text")   return v.trim().length >= 2;
    if (current.type === "number") return v >= 13 && v <= 80;
    if (current.type === "choice") return !!v;
    if (current.type === "multi")  return v.length >= 1;
    return true;
  };

  const handleNext = () => {
    if (!isValid()) { setError(`Please provide a valid ${current.field}`); return; }
    if (step < STEPS.length - 1) { setStep(s => s + 1); }
    else { saveProfile(data); navigate("/"); }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
      background: "var(--bg-base)"
    }}>
      <div style={{ width: "100%", maxWidth: 540 }}>
        
        {/* Branding header */}
        <div style={{ textAlign: "center", marginBottom: 40, animation: "fadeIn .6s ease both" }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20, margin: "0 auto 16px",
            background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32, fontWeight: 800, fontFamily: "var(--font-head)", color: "#fff",
            boxShadow: "0 12px 36px rgba(139,92,246,0.35)",
            animation: "glow-pulse 3s infinite",
          }}>J</div>
          <h1 className="text-3xl font-black font-head text-head" style={{ marginBottom: 6, letterSpacing: "-0.02em" }}>
            Welcome to <span className="grad-text">Janta AI</span>
          </h1>
          <p className="text-sub font-semi">Set up your profile to start deciding</p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 32, animation: "fadeUp .5s ease .1s both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span className="text-xs font-bold text-sub uppercase" style={{ letterSpacing: "0.05em" }}>Step {step + 1} of {STEPS.length}</span>
            <span className="text-xs font-black text-brand">{Math.round(progress + 25)}%</span>
          </div>
          <div className="progress-track" style={{ height: 6 }}>
            <div className="progress-fill" style={{ width: `${progress + 25}%`, background: "var(--grad-brand)", boxShadow: "0 0 10px rgba(139,92,246,0.5)" }} />
          </div>
        </div>

        {/* Form Card */}
        <div className="card" style={{ padding: "36px", animation: "fadeUp .5s ease .2s both" }} key={step}>
          
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>{current.icon}</span>
            <h2 className="text-2xl font-black font-head text-head">{current.title}</h2>
          </div>
          <p className="text-sub text-base" style={{ marginBottom: 32 }}>{current.sub}</p>

          {/* Inputs */}
          {(current.type === "text" || current.type === "number") && (
            <input
              className="input input-lg"
              type={current.type}
              value={data[current.field]}
              placeholder={current.placeholder}
              onChange={e => setValue(current.field, e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleNext()}
              autoFocus
              min={current.type === "number" ? 13 : undefined}
              max={current.type === "number" ? 80 : undefined}
            />
          )}

          {current.type === "choice" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {current.choices.map((c, i) => (
                <button key={c.value} 
                  onClick={() => setValue(current.field, c.value)}
                  style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
                    borderRadius: "var(--r-md)", border: "2px solid",
                    borderColor: data[current.field] === c.value ? "var(--brand)" : "var(--border)",
                    background: data[current.field] === c.value ? "var(--bg-active)" : "var(--bg-glass)",
                    cursor: "pointer", transition: "all .2s var(--ease-out)",
                    textAlign: "left", animation: `slideIn .3s ease ${i*.05}s both`
                  }}>
                  <div style={{ flex: 1 }}>
                    <div className={data[current.field] === c.value ? "text-head font-bold" : "text-body font-semi"} style={{ fontSize: "1.05rem" }}>
                      {c.label}
                    </div>
                    <div className="text-sub text-sm" style={{ marginTop: 2 }}>{c.desc}</div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${data[current.field] === c.value ? "var(--brand)" : "var(--text-mute)"}`, padding: 2 }}>
                    {data[current.field] === c.value && <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "var(--brand)" }} />}
                  </div>
                </button>
              ))}
            </div>
          )}

          {current.type === "multi" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {current.choices.map((c, i) => (
                <button key={c.value}
                  className={`tag ${data.goals.includes(c.value) ? "active" : ""}`}
                  onClick={() => toggleGoal(c.value)}
                  style={{ fontSize: "0.95rem", padding: "12px 20px", animation: `slideIn .3s ease ${i*.05}s both` }}>
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {/* Validation Error */}
          {error && <p className="text-amber text-sm font-semi" style={{ marginTop: 16, display: "flex", gap: 6 }}><span>⚠️</span> {error}</p>}

          {/* Controls */}
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {step > 0 && (
              <button className="btn btn-ghost" style={{ flex: "0 0 auto", padding: "0 24px" }} onClick={() => setStep(s => s - 1)}>
                Back
              </button>
            )}
            <button className="btn btn-brand btn-xl" style={{ flex: 1 }} onClick={handleNext}>
              {step === STEPS.length - 1 ? "Start Deciding 🚀" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
