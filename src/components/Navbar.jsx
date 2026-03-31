import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const NAV = [
  { path: "/",        label: "Feed",    icon: "⚡" },
  { path: "/ask",     label: "Ask AI",  icon: "🤖" },
  { path: "/profile", label: "Profile", icon: "👤" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userProfile } = useApp();
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close drawer on navigate
  useEffect(() => { setDrawer(false); }, [pathname]);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 200,
        background: scrolled
          ? "rgba(8,9,15,0.92)"
          : "rgba(8,9,15,0.7)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.07)" : "transparent"}`,
        transition: "background .3s ease, border-color .3s ease",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", height: 62, gap: 12 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.1rem", color: "#fff",
              boxShadow: "0 0 24px rgba(139,92,246,0.55)",
              flexShrink: 0,
              animation: "glow-pulse 3s ease-in-out infinite",
            }}>J</div>
            <div className="hide-mobile">
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1rem", color: "var(--text-h)", lineHeight: 1.1 }}>
                Janta<span style={{ background: "linear-gradient(90deg,#8B5CF6,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
              </div>
              <div style={{ fontSize: "0.6rem", color: "var(--text-mute)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                India's Collective Brain
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: 16, flex: 1 }} className="hide-mobile">
            {NAV.map(n => {
              const active = pathname === n.path;
              return (
                <Link key={n.path} to={n.path} style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "8px 18px", borderRadius: "var(--r-sm)",
                  textDecoration: "none", fontSize: "0.875rem", fontWeight: 600,
                  transition: "all .2s ease",
                  background: active ? "rgba(139,92,246,0.18)" : "transparent",
                  color: active ? "#C4B5FD" : "var(--text-sub)",
                  border: `1.5px solid ${active ? "rgba(139,92,246,0.35)" : "transparent"}`,
                }}>
                  <span style={{ fontSize: "1rem" }}>{n.icon}</span>
                  {n.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
            <button
              className="btn btn-brand btn-sm hide-mobile"
              id="nav-ask-btn"
              onClick={() => navigate("/ask")}>
              + Ask Question
            </button>

            {/* Avatar */}
            {userProfile && (
              <button
                className="avatar avatar-sm"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                  color: "#fff", border: "none", cursor: "pointer",
                  boxShadow: "0 0 16px rgba(139,92,246,0.4)",
                }}
                onClick={() => navigate("/profile")}
                title={userProfile.name}>
                {userProfile.name[0].toUpperCase()}
              </button>
            )}

            {/* Hamburger */}
            <button
              id="nav-hamburger"
              aria-label="Menu"
              onClick={() => setDrawer(d => !d)}
              style={{
                display: "none", background: "var(--bg-glass)", border: "1px solid var(--border)",
                color: "var(--text-sub)", width: 38, height: 38, borderRadius: "var(--r-sm)",
                cursor: "pointer", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
              }}
              className="hide-desktop"
              >
              {drawer ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawer && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 190,
          background: "rgba(8,9,15,0.6)",
          backdropFilter: "blur(8px)",
          animation: "fadeIn .2s ease",
        }} onClick={() => setDrawer(false)}>
          <div style={{
            position: "absolute", top: 62, left: 0, right: 0,
            background: "rgba(14,16,32,0.98)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid var(--border)",
            padding: "12px 16px 20px",
            animation: "slideIn .2s var(--ease-out)",
          }} onClick={e => e.stopPropagation()}>
            {NAV.map((n, i) => {
              const active = pathname === n.path;
              return (
                <Link key={n.path} to={n.path}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: "var(--r-md)",
                    textDecoration: "none", fontSize: "0.95rem", fontWeight: 600,
                    marginBottom: 4, transition: "all .15s",
                    background: active ? "rgba(139,92,246,.18)" : "transparent",
                    color: active ? "#C4B5FD" : "var(--text-b)",
                    animation: `fadeUp .3s var(--ease-out) ${i * 0.06}s both`,
                  }}>
                  <span style={{ fontSize: "1.3rem" }}>{n.icon}</span>
                  {n.label}
                  {active && <span style={{ marginLeft: "auto", color: "var(--brand)", fontSize: "0.8rem" }}>●</span>}
                </Link>
              );
            })}
            <div style={{ padding: "12px 16px 0", borderTop: "1px solid var(--border)", marginTop: 8 }}>
              <button className="btn btn-brand btn-full" onClick={() => { navigate("/ask"); setDrawer(false); }}>
                🤖 Ask a Question
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
          #nav-hamburger { display: flex !important; }
        }
        @media (min-width: 641px) {
          .hide-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
