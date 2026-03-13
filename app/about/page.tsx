"use client";

import { useState, ReactNode } from "react";

/* ─── TYPES ──────────────────────────────────────────────────────────────── */
interface Star {
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

interface Stat {
  val: string;
  label: string;
}

interface Value {
  icon: ReactNode;
  title: string;
  desc: string;
}

interface TeamMember {
  name: string;
  role: string;
  accent: string;
}

interface TimelineItem {
  year: string;
  label: string;
}

/* ─── SEEDED RANDOM (no hydration mismatch) ──────────────────────────────── */
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const rand = seededRand(55);
const STARS: Star[] = Array.from({ length: 50 }, (_, i) => ({
  left: rand() * 100,
  top: rand() * 100,
  size: rand() * 2 + 1,
  opacity: rand() * 0.5 + 0.1,
  duration: 3 + rand() * 5,
  delay: rand() * 5,
  color: i % 3 === 0 ? "#7B6EF6" : i % 3 === 1 ? "#4FC3F7" : "#ffffff",
}));

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const STATS: Stat[] = [
  { val: "8+",   label: "Years Experience" },
  { val: "200+", label: "Projects Delivered" },
  { val: "50+",  label: "Happy Clients" },
  { val: "15",   label: "Team Members" },
];

const VALUES: Value[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <polygon points="11,2 14,8 21,9 16,14 17,21 11,18 5,21 6,14 1,9 8,8"/>
      </svg>
    ),
    title: "Excellence",
    desc: "We pursue the highest standard in every pixel, every line of code, every interaction.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="11" cy="11" r="9"/>
        <path d="M11 7v4l3 3"/>
      </svg>
    ),
    title: "Speed",
    desc: "We ship fast without cutting corners — velocity and quality are never in conflict here.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"/>
        <circle cx="11" cy="7" r="4"/>
      </svg>
    ),
    title: "People First",
    desc: "Behind every project is a person. We build with empathy for the humans who use what we create.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
      </svg>
    ),
    title: "Data Driven",
    desc: "Gut instinct meets hard data. Every decision is backed by research, testing and iteration.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="12" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="12" width="7" height="7" rx="1"/>
        <rect x="12" y="12" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: "Modular",
    desc: "Systems thinking drives our architecture — scalable, composable, future-proof by design.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Secure",
    desc: "Security is not an afterthought. We bake it into every layer from day one.",
  },
];

const TEAM: TeamMember[] = [
  { name: "Ram",   role: "Founder & CEO",accent: "#7B6EF6" },
  { name: "Harika",   role: "Machine Learning Engineer", accent: "#7B6EF6" },
  { name: "Jashwanth",   role: "Frontend Developer",accent: "#7B6EF6" },
  { name: "Surya",  role: "Engineering Lead",accent: "#8B5CF6" },
  { name: "Anil",   role: "Frontend Developer",accent: "#7B6EF6" },
  { name: "Gayathri",   role: "Frontend Developer",accent: "#7B6EF6" },
];

const TIMELINE: TimelineItem[] = [
  { year: "2016", label: "Founded" },
  { year: "2018", label: "First 50 Clients" },
  { year: "2021", label: "Team of 15" },
  { year: "2024", label: "200+ Projects" },
];

const STORY: string[] = [
  "It started with a simple belief: that great digital work should be accessible to every kind of organisation — not just the ones with enterprise budgets and Fortune 500 retainers.",
  "A small group of designers and engineers came together in 2016 with that conviction, and what began as late-night freelance projects quickly grew into something more deliberate. We built a culture around craft — one that treats every brief, regardless of size, with the same rigour and creative investment.",
  "Today we are a fully distributed team spanning three continents, united by shared tools, shared standards, and a shared obsession with making things that work beautifully. We have delivered over 200 projects across industries — from fintech to e-commerce, from cultural institutions to early-stage startups.",
  "We are not an agency. We are not a studio. We are a collective of specialists who choose the work we take on, because we believe the best output comes from genuine alignment between client ambition and team passion.",
];

/* ─── VALUE CARD ─────────────────────────────────────────────────────────── */
function ValueCard({ item }: { item: Value }) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0D1128" : "#080B1A",
        border: `1px solid ${hovered ? "rgba(79,195,247,0.4)" : "rgba(123,110,246,0.15)"}`,
        borderRadius: "12px",
        padding: "32px 28px",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 60px rgba(3,4,15,0.7), 0 0 30px rgba(123,110,246,0.12)"
          : "0 4px 20px rgba(3,4,15,0.5)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: hovered
          ? "linear-gradient(90deg,transparent,#4FC3F7,#7B6EF6,transparent)"
          : "linear-gradient(90deg,transparent,rgba(123,110,246,0.3),transparent)",
        transition: "all 0.4s",
      }} />

      <div style={{ color: hovered ? "#4FC3F7" : "#7B6EF6", marginBottom: "16px", transition: "color 0.3s" }}>
        {item.icon}
      </div>

      <h3 style={{
        margin: "0 0 10px",
        fontSize: "15px",
        fontWeight: "800",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontFamily: "'Syne', sans-serif",
        background: hovered ? "linear-gradient(90deg,#7B6EF6,#4FC3F7)" : "none",
        WebkitBackgroundClip: hovered ? "text" : "unset",
        WebkitTextFillColor: hovered ? "transparent" : "#fff",
        transition: "all 0.3s",
      }}>
        {item.title}
      </h3>

      <p style={{ margin: 0, fontSize: "13px", color: "#8892B0", lineHeight: 1.7 }}>
        {item.desc}
      </p>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg,transparent,#7B6EF6,#4FC3F7,transparent)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />
    </div>
  );
}

/* ─── TEAM CARD ──────────────────────────────────────────────────────────── */
function TeamCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0D1128" : "#080B1A",
        border: `1px solid ${hovered ? member.accent + "66" : "rgba(123,110,246,0.15)"}`,
        borderRadius: "12px",
        padding: "36px 28px",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 60px rgba(3,4,15,0.7), 0 0 30px ${member.accent}22`
          : "0 4px 20px rgba(3,4,15,0.5)",
        textAlign: "center",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        width: "72px", height: "72px",
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${member.accent}33, ${member.accent}11)`,
        border: `2px solid ${member.accent}55`,
        margin: "0 auto 20px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px", fontWeight: "900",
        fontFamily: "'Syne', sans-serif",
        color: member.accent,
        transition: "all 0.3s",
        boxShadow: hovered ? `0 0 24px ${member.accent}44` : "none",
      }}>
        {member.name.charAt(0)}
      </div>

      <h4 style={{
        margin: "0 0 6px",
        fontSize: "15px", fontWeight: "800",
        letterSpacing: "0.06em",
        fontFamily: "'Syne', sans-serif",
        color: hovered ? "#fff" : "#e0e0e0",
        transition: "color 0.3s",
      }}>
        {member.name}
      </h4>

      <p style={{
        margin: 0,
        fontSize: "10px", letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: member.accent,
        fontFamily: "monospace",
        opacity: 0.85,
      }}>
        {member.role}
      </p>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap');

        @keyframes floatStar {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes orbPulse {
          0%,100% { opacity: 0.3; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.06); }
        }
        @keyframes scanLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes badgePulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.5; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .about-grad-text {
          background: linear-gradient(90deg, #7B6EF6 0%, #4FC3F7 50%, #8B5CF6 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 5s ease infinite;
        }
        .about-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(123,110,246,0.4), rgba(79,195,247,0.3), transparent);
        }
        .about-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(123,110,246,0.1);
          border: 1px solid rgba(123,110,246,0.3);
          border-radius: 100px;
          padding: 7px 18px;
          font-size: 10px; letter-spacing: 0.28em;
          text-transform: uppercase; color: #4FC3F7;
          font-family: monospace;
        }
        .about-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #7B6EF6;
          animation: badgePulse 2s ease-in-out infinite;
        }
      `}</style>

      <main style={{
        background: "#03040F",
        minHeight: "100vh",
        fontFamily: "'Syne', sans-serif",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* ── STARFIELD ─────────────────────────────────────────────── */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          {STARS.map((s, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${s.left}%`, top: `${s.top}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              borderRadius: "50%",
              background: s.color, opacity: s.opacity,
              animation: `floatStar ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }} />
          ))}
        </div>

        {/* ── RADIAL ORBS ───────────────────────────────────────────── */}
        <div style={{
          position: "fixed", top: "20%", right: "-10%",
          width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(123,110,246,0.1) 0%, rgba(79,195,247,0.04) 45%, transparent 70%)",
          animation: "orbPulse 8s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "fixed", bottom: "10%", left: "-8%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)",
          animation: "orbPulse 10s ease-in-out infinite 2s",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── SCAN LINE ─────────────────────────────────────────────── */}
        <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
          <div style={{
            position: "absolute", left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg,transparent,rgba(79,195,247,0.04),transparent)",
            animation: "scanLine 10s linear infinite",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ══════════════════════════════════════════════════════════
              HERO
          ══════════════════════════════════════════════════════════ */}
          <section style={{
            padding: "clamp(80px,12vh,140px) clamp(24px,6vw,100px) 80px",
            maxWidth: "1200px", margin: "0 auto",
          }}>
            <div style={{ animation: "fadeUp 0.7s ease both 0.1s", marginBottom: "28px" }}>
              <span className="about-badge">
                <span className="about-badge-dot" />
                About Us
              </span>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px, 6vw, 100px)",
              alignItems: "center",
            }}>
              {/* Headline */}
              <div style={{ animation: "fadeUp 0.8s ease both 0.2s" }}>
                <h1 style={{
                  margin: "0 0 24px",
                  fontSize: "clamp(38px, 5.5vw, 76px)",
                  fontWeight: "900",
                  lineHeight: 0.92,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                }}>
                  <span style={{ color: "#fff" }}>We Build</span>
                  <br />
                  <span className="about-grad-text">Digital</span>
                  <br />
                  <span className="about-grad-text">Futures</span>
                </h1>
                <div style={{
                  height: "2px", width: "90px",
                  background: "linear-gradient(90deg,#7B6EF6,#4FC3F7,transparent)",
                  borderRadius: "2px", marginBottom: "28px",
                }} />
                <p style={{
                  margin: 0,
                  fontSize: "clamp(14px,1.4vw,16px)",
                  color: "#8892B0", lineHeight: 1.8, maxWidth: "420px",
                }}>
                  We are a freelancing collective of designers, engineers and strategists
                  who care deeply about the work we put into the world. No fluff — just
                  craft, clarity and real results.
                </p>
              </div>

              {/* Mission card */}
              <div style={{
                animation: "fadeUp 0.8s ease both 0.35s",
                background: "linear-gradient(135deg,#080B1A 0%,#0D1128 100%)",
                border: "1px solid rgba(123,110,246,0.2)",
                borderRadius: "16px",
                padding: "40px 36px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: "200px", height: "200px",
                  background: "radial-gradient(ellipse at top right,rgba(79,195,247,0.1) 0%,transparent 70%)",
                  pointerEvents: "none",
                }} />
                <p style={{
                  margin: "0 0 8px", fontSize: "9px",
                  letterSpacing: "0.3em", textTransform: "uppercase",
                  color: "#4FC3F7", fontFamily: "monospace",
                }}>Our Mission</p>
                <h2 style={{
                  margin: "0 0 20px",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: "900", lineHeight: 1.2,
                  letterSpacing: "0.02em", color: "#fff",
                }}>
                  Empower organisations through first-rate creative & digital solutions.
                </h2>
                <p style={{ margin: 0, fontSize: "13px", color: "#8892B0", lineHeight: 1.75 }}>
                  From startups finding their footing to enterprises scaling new heights —
                  we partner with ambitious teams to turn bold ideas into polished digital
                  realities that make a measurable difference.
                </p>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                  background: "linear-gradient(90deg,transparent,#7B6EF6,#4FC3F7,transparent)",
                }} />
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              STATS BAR
          ══════════════════════════════════════════════════════════ */}
          <section style={{
            padding: "0 clamp(24px,6vw,100px) 80px",
            maxWidth: "1200px", margin: "0 auto",
            animation: "fadeUp 0.8s ease both 0.5s",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "rgba(123,110,246,0.12)",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid rgba(123,110,246,0.18)",
            }}>
              {STATS.map((stat, i) => (
                <div key={stat.label} style={{
                  background: "#080B1A",
                  padding: "36px 24px",
                  textAlign: "center",
                  animation: `countUp 0.7s ease both ${0.5 + i * 0.12}s`,
                }}>
                  <div style={{
                    fontSize: "clamp(28px, 4vw, 46px)",
                    fontWeight: "900", lineHeight: 1,
                    background: "linear-gradient(90deg,#fff 30%,#7B6EF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "8px",
                  }}>{stat.val}</div>
                  <div style={{
                    fontSize: "9px", letterSpacing: "0.22em",
                    color: "#8892B0", textTransform: "uppercase",
                    fontFamily: "monospace",
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="about-divider" style={{ margin: "0 clamp(24px,6vw,100px)" }} />

          {/* ══════════════════════════════════════════════════════════
              CORE VALUES
          ══════════════════════════════════════════════════════════ */}
          <section style={{
            padding: "80px clamp(24px,6vw,100px)",
            maxWidth: "1200px", margin: "0 auto",
          }}>
            <div style={{ marginBottom: "56px", animation: "fadeUp 0.7s ease both 0.1s" }}>
              <p style={{
                margin: "0 0 12px", fontSize: "10px",
                letterSpacing: "0.3em", color: "#4FC3F7",
                textTransform: "uppercase", fontFamily: "monospace",
              }}>What We Stand For</p>
              <h2 style={{
                margin: 0,
                fontSize: "clamp(32px, 4vw, 54px)",
                fontWeight: "900", lineHeight: 0.92,
                textTransform: "uppercase", letterSpacing: "0.02em",
              }}>
                <span style={{ color: "#fff" }}>Our </span>
                <span className="about-grad-text">Core Values</span>
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}>
              {VALUES.map((item, i) => (
                <div key={item.title} style={{ animation: `fadeUp 0.7s ease both ${0.2 + i * 0.08}s` }}>
                  <ValueCard item={item} />
                </div>
              ))}
            </div>
          </section>

          <div className="about-divider" style={{ margin: "0 clamp(24px,6vw,100px)" }} />

          {/* ══════════════════════════════════════════════════════════
              OUR STORY
          ══════════════════════════════════════════════════════════ */}
          <section style={{
            padding: "80px clamp(24px,6vw,100px)",
            maxWidth: "1200px", margin: "0 auto",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "clamp(40px,6vw,100px)",
              alignItems: "start",
            }}>
              {/* Left — timeline */}
              <div style={{ animation: "fadeUp 0.7s ease both 0.1s" }}>
                <p style={{
                  margin: "0 0 12px", fontSize: "10px",
                  letterSpacing: "0.3em", color: "#4FC3F7",
                  textTransform: "uppercase", fontFamily: "monospace",
                }}>Our Story</p>
                <h2 style={{
                  margin: "0 0 20px",
                  fontSize: "clamp(30px,4vw,50px)",
                  fontWeight: "900", lineHeight: 0.94,
                  textTransform: "uppercase",
                }}>
                  <span style={{ color: "#fff" }}>How It</span>
                  <br />
                  <span className="about-grad-text">All Began</span>
                </h2>
                <div style={{
                  height: "2px", width: "70px",
                  background: "linear-gradient(90deg,#7B6EF6,transparent)",
                  borderRadius: "2px",
                }} />

                <div style={{ marginTop: "48px", display: "flex", flexDirection: "column" }}>
                  {TIMELINE.map((item, i) => (
                    <div key={item.year} style={{
                      display: "flex", alignItems: "center", gap: "16px",
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(123,110,246,0.1)",
                    }}>
                      <span style={{
                        fontSize: "11px", fontFamily: "monospace",
                        color: "#7B6EF6", letterSpacing: "0.1em", minWidth: "36px",
                      }}>{item.year}</span>
                      <div style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        background: i % 2 === 0 ? "#7B6EF6" : "#4FC3F7",
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: "13px", color: "#8892B0", letterSpacing: "0.06em" }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — paragraphs */}
              <div style={{ animation: "fadeUp 0.8s ease both 0.25s" }}>
                {STORY.map((para, i) => (
                  <p key={i} style={{
                    margin: "0 0 22px",
                    fontSize: "clamp(13px,1.3vw,15px)",
                    color: i === 0 ? "#c8cfe0" : "#8892B0",
                    lineHeight: 1.85,
                    fontWeight: i === 0 ? 500 : 400,
                    borderLeft: i === 0 ? "2px solid #7B6EF6" : "none",
                    paddingLeft: i === 0 ? "20px" : "0",
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <div className="about-divider" style={{ margin: "0 clamp(24px,6vw,100px)" }} />

          {/* ══════════════════════════════════════════════════════════
              TEAM
          ══════════════════════════════════════════════════════════ */}
          <section style={{
            padding: "80px clamp(24px,6vw,100px) 120px",
            maxWidth: "1200px", margin: "0 auto",
          }}>
            <div style={{ marginBottom: "56px", animation: "fadeUp 0.7s ease both 0.1s" }}>
              <p style={{
                margin: "0 0 12px", fontSize: "10px",
                letterSpacing: "0.3em", color: "#4FC3F7",
                textTransform: "uppercase", fontFamily: "monospace",
              }}>The People</p>
              <h2 style={{
                margin: 0,
                fontSize: "clamp(32px,4vw,54px)",
                fontWeight: "900", lineHeight: 0.92,
                textTransform: "uppercase", letterSpacing: "0.02em",
              }}>
                <span style={{ color: "#fff" }}>Meet The </span>
                <span className="about-grad-text">Team</span>
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}>
              {TEAM.map((member, i) => (
                <div key={member.name} style={{ animation: `fadeUp 0.7s ease both ${0.2 + i * 0.1}s` }}>
                  <TeamCard member={member} />
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}