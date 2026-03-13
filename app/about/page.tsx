"use client";

import { useState } from "react";

/* ─── TYPES ─────────────────────────────────────────────────────────────── */
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

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface TeamMember {
  name: string;
  role: string;
  accent: string;
}

/* ─── SEEDED RANDOM ─────────────────────────────────────────────────────── */
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
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

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const STATS: Stat[] = [
  { val: "8+", label: "Years Experience" },
  { val: "200+", label: "Projects Delivered" },
  { val: "50+", label: "Happy Clients" },
  { val: "15", label: "Team Members" },
];

const VALUES: ValueItem[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <polygon points="11,2 14,8 21,9 16,14 17,21 11,18 5,21 6,14 1,9 8,8" />
      </svg>
    ),
    title: "Excellence",
    desc: "We pursue the highest standard in every pixel, every line of code, every interaction.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="11" cy="11" r="9" />
        <path d="M11 7v4l3 3" />
      </svg>
    ),
    title: "Speed",
    desc: "We ship fast without cutting corners — velocity and quality are never in conflict here.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
        <circle cx="11" cy="7" r="4" />
      </svg>
    ),
    title: "People First",
    desc: "Behind every project is a person. We build with empathy for the humans who use what we create.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
      </svg>
    ),
    title: "Data Driven",
    desc: "Gut instinct meets hard data. Every decision is backed by research, testing and iteration.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="12" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="12" width="7" height="7" rx="1" />
        <rect x="12" y="12" width="7" height="7" rx="1" />
      </svg>
    ),
    title: "Modular",
    desc: "Systems thinking drives our architecture — scalable, composable, future-proof by design.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Secure",
    desc: "Security is not an afterthought. We bake it into every layer from day one.",
  },
];

const TEAM: TeamMember[] = [
  { name: "Alex Reyes", role: "Founder & CEO", accent: "#7B6EF6" },
  { name: "Mia Tanaka", role: "Lead Designer", accent: "#4FC3F7" },
  { name: "Jordan Cole", role: "Engineering Lead", accent: "#8B5CF6" },
  { name: "Priya Nair", role: "Product Strategist", accent: "#7B6EF6" },
];

/* ─── VALUE CARD ────────────────────────────────────────────────────────── */
function ValueCard({ item }: { item: ValueItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0D1128" : "#080B1A",
        border: `1px solid ${
          hovered ? "rgba(79,195,247,0.4)" : "rgba(123,110,246,0.15)"
        }`,
        borderRadius: "12px",
        padding: "32px 28px",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <div
        style={{
          color: hovered ? "#4FC3F7" : "#7B6EF6",
          marginBottom: "16px",
        }}
      >
        {item.icon}
      </div>

      <h3
        style={{
          margin: "0 0 10px",
          fontSize: "15px",
          fontWeight: "800",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "#8892B0",
          lineHeight: 1.7,
        }}
      >
        {item.desc}
      </p>
    </div>
  );
}

/* ─── TEAM CARD ─────────────────────────────────────────────────────────── */
function TeamCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0D1128" : "#080B1A",
        border: `1px solid ${
          hovered ? member.accent + "66" : "rgba(123,110,246,0.15)"
        }`,
        borderRadius: "12px",
        padding: "36px 28px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: `${member.accent}22`,
          margin: "0 auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: "22px",
          color: member.accent,
        }}
      >
        {member.name.charAt(0)}
      </div>

      <h4 style={{ margin: "0 0 6px", fontSize: "15px" }}>{member.name}</h4>

      <p
        style={{
          margin: 0,
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: member.accent,
        }}
      >
        {member.role}
      </p>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <main
      style={{
        background: "#03040F",
        minHeight: "100vh",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* STARFIELD */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {STARS.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "50%",
              background: s.color,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      <section style={{ padding: "100px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "56px", fontWeight: 900 }}>About Us</h1>
        <p style={{ color: "#8892B0", maxWidth: 500 }}>
          We are a freelancing collective of designers, engineers and strategists
          building high-quality digital experiences.
        </p>
      </section>

      <section style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <h2>{s.val}</h2>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px" }}>
          {VALUES.map((v) => (
            <ValueCard key={v.title} item={v} />
          ))}
        </div>
      </section>

      <section style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px" }}>
          {TEAM.map((t) => (
            <TeamCard key={t.name} member={t} />
          ))}
        </div>
      </section>
    </main>
  );
}