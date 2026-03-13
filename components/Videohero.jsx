"use client";

import { useRef, useEffect, useState } from "react";

/* ─── THEME ──────────────────────────────────────────────────────────────── */
const T = {
  bg: "#03040F",
  accent1: "#7B6EF6",
  accent2: "#4FC3F7",
  accent3: "#8B5CF6",
  text: "#FFFFFF",
  textMuted: "#8892B0",
};

/* ─── SEEDED RANDOM (no hydration mismatch) ──────────────────────────────── */
function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const rand = seededRand(77);
const STARS = Array.from({ length: 60 }, (_, i) => ({
  left: rand() * 100,
  top: rand() * 100,
  size: rand() * 2 + 1,
  opacity: rand() * 0.6 + 0.1,
  duration: 3 + rand() * 5,
  delay: rand() * 5,
  color: i % 3 === 0 ? "#7B6EF6" : i % 3 === 1 ? "#4FC3F7" : "#ffffff",
}));

export default function VideoHero() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted((m) => !m);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap');

        @keyframes floatStar {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-8px) scale(1.2); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes orbPulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.35; }
          50%       { transform: translate(-50%,-50%) scale(1.1); opacity: 0.5; }
        }
        @keyframes scanLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(6px); opacity: 0.4; }
        }

        .vh-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(123,110,246,0.1);
          border: 1px solid rgba(123,110,246,0.3);
          border-radius: 100px;
          padding: 7px 18px;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #4FC3F7;
          font-family: monospace;
          animation: heroFadeIn 1s ease both 0.2s;
        }
        .vh-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #7B6EF6;
          animation: badgePulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .vh-title {
          margin: 0;
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(42px, 7vw, 96px);
          line-height: 0.92;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }
        .vh-title-plain { color: #fff; }
        .vh-title-grad {
          background: linear-gradient(90deg, #7B6EF6 0%, #4FC3F7 50%, #8B5CF6 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }

        .vh-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #7B6EF6, #8B5CF6);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 14px 32px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .vh-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(123,110,246,0.5);
        }

        .vh-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #8892B0;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 14px 24px;
          border: 1px solid rgba(123,110,246,0.25);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .vh-cta-secondary:hover {
          border-color: #4FC3F7;
          color: #4FC3F7;
          transform: translateY(-3px);
        }

        .vh-ctrl-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(123,110,246,0.3);
          background: rgba(3,4,15,0.7);
          color: #8892B0;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }
        .vh-ctrl-btn:hover {
          border-color: #4FC3F7;
          color: #4FC3F7;
          box-shadow: 0 0 16px rgba(79,195,247,0.3);
        }

        .vh-stat-val {
          font-family: 'Syne', sans-serif;
          font-size: clamp(22px, 3vw, 34px);
          font-weight: 900;
          background: linear-gradient(90deg, #fff 30%, #7B6EF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .vh-stat-label {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #8892B0;
          text-transform: uppercase;
          margin-top: 5px;
          font-family: monospace;
        }

        .vh-scroll-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #7B6EF6;
          animation: scrollBounce 1.6s ease-in-out infinite;
        }
      `}</style>

      <section style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        background: T.bg,
        fontFamily: "'Syne', sans-serif",
      }}>

        {/* ── VIDEO ───────────────────────────────────────────────────── */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          autoPlay
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.4,
          }}
        >
          {/*
            Replace with your actual video:
            <source src="/public/Videohero.mp4" type="video/mp4" />
          */}
          <source src="/Videohero.mp4" type="video/mp4" />
        </video>

        {/* ── GRADIENT OVERLAY ────────────────────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: `
            linear-gradient(to bottom,
              rgba(3,4,15,0.5) 0%,
              rgba(3,4,15,0.2) 35%,
              rgba(3,4,15,0.5) 70%,
              rgba(3,4,15,0.95) 100%
            ),
            linear-gradient(to right,
              rgba(3,4,15,0.75) 0%,
              rgba(3,4,15,0.1) 55%,
              transparent 100%
            )
          `,
        }} />

        {/* ── PURPLE RADIAL ORB ────────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          top: "45%", left: "58%",
          width: "750px", height: "750px",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(123,110,246,0.16) 0%, rgba(79,195,247,0.05) 45%, transparent 70%)`,
          zIndex: 2,
          animation: "orbPulse 7s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* ── SCAN LINE ───────────────────────────────────────────────── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{
            position: "absolute", left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.05), transparent)",
            animation: "scanLine 9s linear infinite",
          }} />
        </div>

        {/* ── STARFIELD ───────────────────────────────────────────────── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
          {STARS.map((star, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: star.color,
              opacity: star.opacity,
              animation: `floatStar ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }} />
          ))}
        </div>

        {/* ── VIGNETTE ────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(3,4,15,0.65) 100%)",
        }} />

        {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
        <div style={{
          position: "relative", zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(24px, 6vw, 100px)",
          maxWidth: "860px",
        }}>



          {/* Headline */}
          <h1 className="vh-title" style={{ marginBottom: "24px", animation: "heroFadeUp 0.9s ease both 0.3s" }}>
            <span className="vh-title-plain">Building </span>
            <span className="vh-title-grad">Digital</span>
            <br />
            <span className="vh-title-grad">Solutions</span>
            <br />
            <span className="vh-title-plain">That Matter</span>
          </h1>

          {/* Subtext */}
          <p style={{
            margin: "0 0 40px",
            fontSize: "clamp(13px, 1.5vw, 16px)",
            color: T.textMuted,
            lineHeight: 1.75,
            maxWidth: "460px",
            animation: "heroFadeUp 0.9s ease both 0.5s",
          }}>“Building fast, scalable websites that turn ideas into powerful digital experiences.”
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: "16px", flexWrap: "wrap",
            animation: "heroFadeUp 0.9s ease both 0.7s",
          }}>
           
            
          </div>

          {/* Stats */}

        </div>

        {/* ── VIDEO CONTROLS (bottom-right) ───────────────────────────── */}
        <div style={{
          position: "absolute", bottom: "32px", right: "40px",
          zIndex: 20,
          display: "flex", alignItems: "center", gap: "10px",
          animation: "heroFadeIn 1s ease both 1.2s",
        }}>
          <button className="vh-ctrl-btn" onClick={togglePlay} title={playing ? "Pause" : "Play"}>
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <rect x="1" y="1" width="3.5" height="10" rx="1"/>
                <rect x="7.5" y="1" width="3.5" height="10" rx="1"/>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M2 1.5l9 4.5-9 4.5V1.5z"/>
              </svg>
            )}
          </button>

          <button className="vh-ctrl-btn" onClick={toggleMute} title={muted ? "Unmute" : "Mute"}>
            {muted ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                <path d="M1 4.5h2l4-3v11l-4-3H1V4.5z"/>
                <path d="M10.5 4.5l-3 5M7.5 4.5l3 5"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                <path d="M1 4.5h2l4-3v11l-4-3H1V4.5z"/>
                <path d="M9.5 4.5a3 3 0 010 5"/>
                <path d="M11.5 2.5a6 6 0 010 9"/>
              </svg>
            )}
          </button>

          {/* Loop badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "5px",
            fontSize: "9px", letterSpacing: "0.18em",
            color: "rgba(136,146,176,0.5)", fontFamily: "monospace",
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
              stroke="rgba(123,110,246,0.5)" strokeWidth="1.2" strokeLinecap="round">
              <path d="M1 3a4 4 0 017 0"/>
              <path d="M9 7a4 4 0 01-7 0"/>
              <path d="M7.5 1.5L8.5 3l-1.5.5"/>
              <path d="M2.5 8.5L1.5 7l1.5-.5"/>
            </svg>
            LOOP
          </div>
        </div>

        {/* ── SCROLL INDICATOR (bottom-center) ────────────────────────── */}
        <div style={{
          position: "absolute", bottom: "28px", left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          animation: "heroFadeIn 1.2s ease both 1.4s",
        }}>
          <span style={{
            fontSize: "8px", letterSpacing: "0.3em",
            color: "rgba(136,146,176,0.4)", textTransform: "uppercase", fontFamily: "monospace",
          }}>Scroll</span>
          <div className="vh-scroll-dot" />
          <div style={{
            width: "1px", height: "32px",
            background: "linear-gradient(to bottom, rgba(123,110,246,0.5), transparent)",
          }} />
        </div>

        {/* ── TOP-RIGHT HINT ───────────────────────────────────────────── */}
        <div style={{
          position: "absolute", top: "28px", right: "40px",
          zIndex: 20,
          fontSize: "9px", letterSpacing: "0.18em",
          color: "rgba(136,146,176,0.3)", fontFamily: "monospace",
          animation: "heroFadeIn 1s ease both 1s",
        }}>
          drag to rotate · hover to displace
        </div>

      </section>
    </>
  );
}