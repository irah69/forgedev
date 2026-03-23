"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "01",
    phase: "Discovery",
    title: "Understanding Your Vision",
    summary: "We start by listening — deeply.",
    description:
      "Before writing a single line of code, we dive into your goals, audience, and pain points. A structured brief, competitor analysis, and scope definition set the foundation for everything that follows.",
    icon: "◎",
    accent: "#7C3AED",
    glow: "rgba(124,58,237,0.4)",
    tags: ["Brief", "Research", "Scope"],
    duration: "1–2 days",
  },
  {
    id: "02",
    phase: "Planning",
    title: "Architecture & Roadmap",
    summary: "Structure before speed.",
    description:
      "We map out the technical architecture, choose the right stack, and break the project into milestones. You get a clear timeline with deliverables so there are zero surprises.",
    icon: "◈",
    accent: "#0EA5E9",
    glow: "rgba(14,165,233,0.4)",
    tags: ["Tech Stack", "Timeline", "Milestones"],
    duration: "1–3 days",
  },
  {
    id: "03",
    phase: "Design",
    title: "UI/UX Prototyping",
    summary: "Pixels with purpose.",
    description:
      "Wireframes evolve into high-fidelity designs. Every screen is crafted with your brand, user flows, and accessibility in mind. You review and approve before any dev begins.",
    icon: "✦",
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.4)",
    tags: ["Wireframes", "Figma", "Approval"],
    duration: "3–5 days",
  },
  {
    id: "04",
    phase: "Development",
    title: "Building the Product",
    summary: "Clean code. Real results.",
    description:
      "We build frontend and backend in parallel — responsive UIs, robust APIs, database schemas, and auth flows. Progress updates keep you in the loop throughout the sprint.",
    icon: "◉",
    accent: "#10B981",
    glow: "rgba(16,185,129,0.4)",
    tags: ["Frontend", "Backend", "API", "DB"],
    duration: "1–4 weeks",
  },
  {
    id: "05",
    phase: "Testing",
    title: "QA & Bug Crushing",
    summary: "Shipped means polished.",
    description:
      "Every feature is tested across devices and browsers. We catch edge cases, fix performance bottlenecks, and run security checks before anything goes live.",
    icon: "◬",
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.4)",
    tags: ["QA", "Cross-browser", "Performance"],
    duration: "2–4 days",
  },
  {
    id: "06",
    phase: "Deployment",
    title: "Launch & Go Live",
    summary: "Your product, live and fast.",
    description:
      "We deploy to your preferred platform — Vercel, Render, or AWS — configure domains, SSL, and CI/CD pipelines. Launch day is smooth because we prepared for it.",
    icon: "◆",
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.4)",
    tags: ["Vercel", "AWS", "CI/CD", "SSL"],
    duration: "1–2 days",
  },
  {
    id: "07",
    phase: "Support",
    title: "Handoff & Aftercare",
    summary: "We don't disappear post-launch.",
    description:
      "You receive full documentation, source code, and a walkthrough session. Post-launch support window ensures any issues are handled fast. Your success is our reputation.",
    icon: "◑",
    accent: "#14B8A6",
    glow: "rgba(20,184,166,0.4)",
    tags: ["Docs", "Handoff", "Support"],
    duration: "Ongoing",
  },
];

function StepCard({ step, index, isActive, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5 cursor-pointer group"
      onClick={() => onClick(step.id)}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Node */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-black z-10 transition-all duration-300"
          style={{
            borderColor: isActive ? step.accent : "rgba(255,255,255,0.15)",
            background: isActive
              ? `radial-gradient(circle, ${step.glow}, transparent 70%)`
              : "rgba(255,255,255,0.03)",
            color: isActive ? step.accent : "rgba(255,255,255,0.4)",
            boxShadow: isActive ? `0 0 20px ${step.glow}` : "none",
          }}
        >
          <span>{step.icon}</span>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${step.accent}` }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            />
          )}
        </motion.button>

        {/* Connector line */}
        {index < steps.length - 1 && (
          <motion.div
            className="w-px flex-1 mt-2 min-h-[40px]"
            style={{
              background: isActive
                ? `linear-gradient(to bottom, ${step.accent}, transparent)`
                : "rgba(255,255,255,0.08)",
            }}
            animate={isActive ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </div>

      {/* Card content */}
      <motion.div
        className="flex-1 mb-8 rounded-2xl border p-5 transition-all duration-300 overflow-hidden"
        style={{
          borderColor: isActive ? `${step.accent}50` : "rgba(255,255,255,0.07)",
          background: isActive
            ? `linear-gradient(135deg, ${step.glow.replace("0.4", "0.08")}, rgba(255,255,255,0.02))`
            : "rgba(255,255,255,0.02)",
          boxShadow: isActive ? `0 4px 40px ${step.glow.replace("0.4", "0.15")}` : "none",
        }}
        whileHover={{ y: -2 }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
                style={{
                  color: step.accent,
                  background: `${step.glow.replace("0.4", "0.15")}`,
                }}
              >
                {step.phase}
              </span>
              <span className="text-[10px] text-white/25 font-mono">{step.id}</span>
            </div>
            <h3
              className="text-base font-extrabold text-white leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {step.title}
            </h3>
            <p className="text-xs text-white/40 mt-0.5 italic">{step.summary}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="text-[10px] text-white/30 font-mono block">duration</span>
            <span className="text-xs font-bold" style={{ color: step.accent }}>
              {step.duration}
            </span>
          </div>
        </div>

        {/* Expandable description */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="h-px w-full mb-3 rounded-full"
                style={{ background: `linear-gradient(to right, ${step.accent}40, transparent)` }}
              />
              <p className="text-sm text-white/60 leading-relaxed mb-3">{step.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md border"
                    style={{
                      color: step.accent,
                      borderColor: `${step.accent}30`,
                      background: `${step.glow.replace("0.4", "0.08")}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click hint */}
        {!isActive && (
          <p className="text-[10px] text-white/20 mt-2 group-hover:text-white/40 transition-colors">
            Click to expand →
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Process() {
  const [activeStep, setActiveStep] = useState("01");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const handleClick = (id) => {
    setActiveStep((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <section
        className="relative min-h-screen py-28 px-5 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 20%, #0d0520 0%, #07091a 50%, #040610 100%)",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient orbs */}
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full blur-[140px] opacity-10 pointer-events-none"
          style={{ background: "#7C3AED" }} />
        <div className="absolute bottom-40 left-5 w-64 h-64 rounded-full blur-[120px] opacity-8 pointer-events-none"
          style={{ background: "#0EA5E9" }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xs font-bold tracking-[0.3em] uppercase text-purple-400 mb-3"
            >
              ◈ How We Work
            </motion.p>

            <h2
              className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              The{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #0EA5E9 60%, #10B981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Build Cycle
              </span>
            </h2>

            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              Every project follows a battle-tested lifecycle — from the first conversation
              to the day you go live and beyond.
            </p>

            {/* Step counter */}
            <div className="flex items-center gap-3 mt-6">
              <div className="h-px flex-1 max-w-[80px] bg-white/10 rounded-full" />
              <span className="text-xs text-white/30 font-mono">
                {steps.length} phases · click to explore
              </span>
            </div>
          </motion.div>

          {/* Timeline */}
          <div>
            {steps.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                isActive={activeStep === step.id}
                onClick={handleClick}
              />
            ))}
          </div>

          {/* Footer CTA */}

        </div>
      </section>
    </>
  );
}