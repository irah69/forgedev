"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Deterministic pseudo-random using a seeded LCG — same output on server & client
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// Soft drifting fog motes instead of neon "stars" — quieter, atmospheric
const MOTES = (() => {
  const rand = seededRandom(42);
  return Array.from({ length: 22 }, (_, i) => ({
    id: i,
    size: rand() * 90 + 40,
    top: rand() * 100,
    left: rand() * 100,
    opacity: rand() * 0.06 + 0.03,
    duration: rand() * 14 + 16,
    delay: rand() * 6,
    drift: rand() * 40 - 20,
  }));
})();

const techCategories = [
  {
    id: "frontend",
    label: "Frontend",
    kanji: "見",
    accent: "#8DA290",
    techs: [
      { name: "React.js", desc: "Component-driven UIs" },
      { name: "Next.js", desc: "Full-stack React framework" },
      { name: "Tailwind CSS", desc: "Utility-first styling" },
      { name: "Bootstrap", desc: "Rapid UI scaffolding" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    kanji: "構",
    accent: "#8C9AA6",
    techs: [
      { name: "Spring Boot", desc: "Enterprise Java APIs" },
      { name: "Node.js", desc: "Scalable JS runtime" },
    ],
  },
  {
    id: "database",
    label: "Database",
    kanji: "蔵",
    accent: "#B4996B",
    techs: [
      { name: "MongoDB", desc: "Flexible NoSQL storage" },
      { name: "PostgreSQL", desc: "Relational power & reliability" },
    ],
  },
  {
    id: "deployment",
    label: "Deployment",
    kanji: "運",
    accent: "#A67C68",
    techs: [
      { name: "Render", desc: "Zero-config cloud hosting" },
      { name: "Vercel", desc: "Edge-first Next.js deploys" },
      { name: "AWS", desc: "Enterprise-grade cloud infra" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const chipVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.09, duration: 0.5, ease: "easeOut" },
  }),
};

// The IRAH mark — a simple diamond formed by two facing arrows, reused
// throughout as the section's recurring signature glyph.
function IrahMark({ size = 22, color = "#EDEAE0" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 4 L28 20 L20 36 L20 24 L12 20 L20 20 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M20 4 L12 20 L20 36 L20 24 L28 20 L20 20 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Faint layered pine silhouette, echoing the misty forest photography
function ForestSilhouette() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 w-full opacity-[0.10]"
      viewBox="0 0 1600 220"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="#000000">
        <polygon points="0,220 0,140 60,60 120,140 140,100 200,160 260,90 320,150 380,120 440,170 500,110 560,160 620,100 680,150 740,130 800,170 800,220" />
        <polygon points="800,220 800,160 860,110 920,160 980,120 1040,170 1100,110 1160,150 1220,100 1280,150 1340,120 1400,160 1460,100 1520,150 1600,120 1600,220" />
      </g>
    </svg>
  );
}

function CategoryCard({ cat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative overflow-hidden border border-[#EDEAE0]/[0.09] bg-[#0c0f0d]/40 backdrop-blur-md p-8 flex flex-col gap-6"
    >
      {/* hairline corner accents, architectural rather than glowing */}
      <span
        className="absolute left-0 top-0 h-6 w-px"
        style={{ background: cat.accent, opacity: 0.5 }}
      />
      <span
        className="absolute left-0 top-0 h-px w-6"
        style={{ background: cat.accent, opacity: 0.5 }}
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 z-10">
        <div>
          <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-[#EDEAE0]/35 mb-2">
            {String(index + 1).padStart(2, "0")} — Layer
          </p>
          <h3
            className="text-2xl font-medium tracking-tight text-[#F1EFE7] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {cat.label}
          </h3>
        </div>
        <span
          className="text-3xl leading-none select-none"
          style={{
            color: cat.accent,
            fontFamily: "'Noto Serif JP', serif",
            opacity: 0.55,
          }}
        >
          {cat.kanji}
        </span>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(to right, ${cat.accent}55, transparent)`,
        }}
      />

      {/* Tech list */}
      <div className="flex flex-col gap-1 z-10">
        {cat.techs.map((tech, i) => (
          <motion.div
            key={tech.name}
            custom={i}
            variants={chipVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex items-center gap-4 px-1 py-3 border-b border-[#EDEAE0]/[0.06] last:border-b-0 group/chip"
          >
            <span
              className="h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ background: cat.accent, opacity: 0.7 }}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#F1EFE7]/90 leading-none mb-1 tracking-wide">
                {tech.name}
              </p>
              <p className="text-xs text-[#EDEAE0]/40 truncate">{tech.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Noto+Serif+JP:wght@400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <section
        className="relative min-h-screen py-28 px-5 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, #16201a 0%, #0a0f0c 50%, #06090a 100%)",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {/* film grain texture, matching the photographic mist in the reference images */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* drifting fog motes */}
        {MOTES.map((m) => (
          <motion.div
            key={m.id}
            className="absolute rounded-full bg-[#EDEAE0] blur-2xl"
            style={{
              width: m.size,
              height: m.size,
              top: `${m.top}%`,
              left: `${m.left}%`,
              opacity: m.opacity,
            }}
            animate={{ x: [0, m.drift, 0], opacity: [m.opacity * 0.6, m.opacity, m.opacity * 0.6] }}
            transition={{ duration: m.duration, repeat: Infinity, delay: m.delay, ease: "easeInOut" }}
          />
        ))}

        {/* faint sage glow, like light through the treeline */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px] opacity-[0.12] pointer-events-none"
          style={{ background: "#4F6A56" }}
        />

        <ForestSilhouette />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-24"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <IrahMark size={18} color="#8DA290" />
              <p className="text-[11px] font-medium uppercase text-[#8DA290] tracking-[0.35em]">
                Full-Stack Arsenal
              </p>
              <IrahMark size={18} color="#8DA290" />
            </div>

            <h2
              className="text-5xl md:text-7xl font-medium leading-[1.02] tracking-tight text-[#F1EFE7] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Tech <span className="italic text-[#C9C2AE]">That Ships</span>
            </h2>

            <p className="text-sm text-[#EDEAE0]/45 max-w-md mx-auto leading-relaxed tracking-wide">
              Every layer of the stack, handled — from considered frontends to
              dependable backends and quietly reliable deployments.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {techCategories.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} index={i} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}