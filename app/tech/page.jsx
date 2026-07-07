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

const DOTS = (() => {
  const rand = seededRandom(42);
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    width: rand() * 2 + 1,
    height: rand() * 2 + 1,
    top: rand() * 100,
    left: rand() * 100,
    opacity: rand() * 0.25 + 0.06,
    duration: rand() * 3 + 2,
    delay: rand() * 4,
  }));
})();

const techCategories = [
  {
    id: "frontend",
    label: "Frontend",
    glyph: "◈",
    accent: "#7C3AED",
    glow: "rgba(124,58,237,0.18)",
    techs: [
      { name: "React.js", icon: "⚛", desc: "Component-driven UIs" },
      { name: "Next.js", icon: "▲", desc: "Full-stack React framework" },
      { name: "Tailwind CSS", icon: "✦", desc: "Utility-first styling" },
      { name: "Bootstrap", icon: "⬡", desc: "Rapid UI scaffolding" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    glyph: "◉",
    accent: "#0EA5E9",
    glow: "rgba(14,165,233,0.18)",
    techs: [
      { name: "Spring Boot", icon: "☘", desc: "Enterprise Java APIs" },
      { name: "Node.js", icon: "◎", desc: "Scalable JS runtime" },
    ],
  },
  {
    id: "database",
    label: "Database",
    glyph: "◫",
    accent: "#10B981",
    glow: "rgba(16,185,129,0.18)",
    techs: [
      { name: "MongoDB", icon: "◐", desc: "Flexible NoSQL storage" },
      { name: "PostgreSQL", icon: "◑", desc: "Relational power & reliability" },
    ],
  },
  {
    id: "deployment",
    label: "Deployment",
    glyph: "◆",
    accent: "#D97706",
    glow: "rgba(217,119,6,0.18)",
    techs: [
      { name: "Render", icon: "▶", desc: "Zero-config cloud hosting" },
      { name: "Vercel", icon: "▲", desc: "Edge-first Next.js deploys" },
      { name: "AWS", icon: "☁", desc: "Enterprise-grade cloud infra" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const chipVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.09, duration: 0.45, ease: "easeOut" },
  }),
};

function CategoryCard({ cat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative rounded-2xl overflow-hidden border border-black/[0.07] bg-white p-7 flex flex-col gap-5 group"
      style={{
        boxShadow: `0 0 0 1px rgba(15,23,42,0.03), 0 4px 40px ${cat.glow}, 0 2px 10px rgba(15,23,42,0.05)`,
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity duration-700"
        style={{ background: cat.accent }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 z-10">
        <span
          className="text-3xl font-black leading-none"
          style={{ color: cat.accent }}
        >
          {cat.glyph}
        </span>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">
            Category {String(index + 1).padStart(2, "0")}
          </p>
          <h3
            className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {cat.label}
          </h3>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full rounded-full"
        style={{
          background: `linear-gradient(to right, ${cat.accent}50, transparent)`,
        }}
      />

      {/* Tech chips */}
      <div className="flex flex-col gap-3 z-10">
        {cat.techs.map((tech, i) => (
          <motion.div
            key={tech.name}
            custom={i}
            variants={chipVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex items-center gap-3 rounded-xl px-4 py-3 bg-slate-50 border border-black/[0.05] hover:border-black/[0.12] hover:bg-slate-100 transition-all duration-300 cursor-default group/chip"
          >
            <span
              className="text-lg w-7 text-center flex-shrink-0"
              style={{ color: cat.accent }}
            >
              {tech.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 leading-none mb-0.5">
                {tech.name}
              </p>
              <p className="text-xs text-slate-500 truncate">{tech.desc}</p>
            </div>
            <motion.div
              className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: cat.accent }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            />
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
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <section
        className="relative min-h-screen py-28 px-5 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at top, #ffffff 0%, #fafaf9 35%, #f4f4f5 70%, #eef0f3 100%)",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {/* Ambient dot field — values are deterministic to avoid SSR/client mismatch */}
        {DOTS.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-slate-400"
            style={{
              width: dot.width,
              height: dot.height,
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              opacity: dot.opacity,
            }}
            animate={{ opacity: [dot.opacity * 0.4, dot.opacity, dot.opacity * 0.4] }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
            }}
          />
        ))}

        {/* Decorative purple orb top-left */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-[0.07] pointer-events-none"
          style={{ background: "#7C3AED" }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >


            <h2
              className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter text-slate-900 mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Tech{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #0EA5E9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                That Ships
              </span>
            </h2>

            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Every layer of the stack, handled. From pixel-perfect frontends to
              battle-tested backends and cloud deployments.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {techCategories.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} index={i} />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 text-center"
          >
            
          </motion.div>
        </div>
      </section>
    </>
  );
}