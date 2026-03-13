"use client";

import { useEffect, useRef, useState } from "react";

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const projects = [
  {
    id: "01",
    title: "AURA FINANCE",
    category: "Web App · UI/UX",
    tags: ["React", "Node.js", "Stripe"],
    desc: "Next-gen personal finance dashboard with real-time portfolio tracking and AI-driven insights.",
    year: "2024",
    color: "#7B6EF6",
    accent: "#4FC3F7",
    size: "large",
  },
  {
    id: "02",
    title: "VELO COMMERCE",
    category: "E-Commerce · SEO",
    tags: ["Next.js", "Shopify", "Tailwind"],
    desc: "High-conversion storefront scaling from 0 to 2M ARR in eight months.",
    year: "2024",
    color: "#4FC3F7",
    accent: "#7B6EF6",
    size: "small",
  },
  {
    id: "03",
    title: "NEXUS API",
    category: "API · Backend",
    tags: ["GraphQL", "PostgreSQL", "AWS"],
    desc: "Unified data layer connecting 14 microservices with sub-20ms response times.",
    year: "2023",
    color: "#8B5CF6",
    accent: "#60efff",
    size: "small",
  },
  {
    id: "04",
    title: "DRIFT STUDIO",
    category: "Branding · Web Dev",
    tags: ["Three.js", "GSAP", "Webflow"],
    desc: "Award-winning creative agency site with WebGL scenes and magnetic cursor interactions.",
    year: "2023",
    color: "#60efff",
    accent: "#8B5CF6",
    size: "large",
  },
  {
    id: "05",
    title: "PULSE HEALTH",
    category: "SaaS · Maintenance",
    tags: ["React Native", "Firebase", "HIPAA"],
    desc: "Patient-facing health monitoring platform trusted by 40,000+ active users.",
    year: "2023",
    color: "#a78bfa",
    accent: "#4FC3F7",
    size: "small",
  },
  {
    id: "06",
    title: "ORION MAPS",
    category: "Web App · API",
    tags: ["MapboxGL", "Python", "Redis"],
    desc: "Real-time logistics visualisation platform processing 1M+ events per day.",
    year: "2022",
    color: "#38bdf8",
    accent: "#7B6EF6",
    size: "small",
  },
];

const stats = [
  { value: "150+", label: "Projects Shipped" },
  { value: "98%",  label: "Client Satisfaction" },
  { value: "12M+", label: "Revenue Generated" },
  { value: "6yr",  label: "In Business" },
];

const filters = ["All", "Web App", "E-Commerce", "Branding", "API"];

/* ─── HOOKS ───────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = () => {
      const rect = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      setProgress(p);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return [ref, progress];
}

/* ─── PROJECT CARD ────────────────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const [cardRef, inView] = useInView(0.08);
  const [hovered, setHovered] = useState(false);
  const isLarge = project.size === "large";
  const delay = (index % 3) * 110;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: isLarge ? "span 8" : "span 4",
        position: "relative",
        cursor: "pointer",
        borderRadius: "14px",
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(56px) scale(0.97)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
      }}
    >
      {/* gradient border */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "14px",
        padding: "1px",
        background: hovered
          ? `linear-gradient(135deg, ${project.color}, ${project.accent})`
          : "linear-gradient(135deg, rgba(123,110,246,0.22), rgba(79,195,247,0.08))",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        transition: "background 0.4s ease",
        pointerEvents: "none",
        zIndex: 2,
      }} />

      {/* card body */}
      <div style={{
        background: hovered ? "#0D1128" : "#080B1A",
        borderRadius: "14px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "background 0.4s ease",
      }}>

        {/* image area */}
        <div style={{
          position: "relative",
          height: isLarge ? "300px" : "220px",
          background: `linear-gradient(135deg, ${project.color}16 0%, #080B1A 100%)`,
          overflow: "hidden",
          flexShrink: 0,
        }}>
          {/* grid lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${(i+1)*12.5}%`} x2="100%" y2={`${(i+1)*12.5}%`}
                stroke={project.color} strokeWidth="0.5" strokeOpacity="0.1" />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`v${i}`} x1={`${(i+1)*12.5}%`} y1="0" x2={`${(i+1)*12.5}%`} y2="100%"
                stroke={project.color} strokeWidth="0.5" strokeOpacity="0.1" />
            ))}
          </svg>

          {/* radial glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at center, ${project.color}20 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.4s",
          }} />

          {/* big ID watermark */}
          <span style={{
            position: "absolute", bottom: "-16px", right: "14px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "110px", fontWeight: 700,
            color: project.color, opacity: 0.05,
            lineHeight: 1, pointerEvents: "none", userSelect: "none",
          }}>{project.id}</span>

          {/* year tag */}
          <span style={{
            position: "absolute", top: "14px", left: "16px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px", letterSpacing: "0.2em",
            color: "rgba(180,200,240,0.4)",
            background: "rgba(3,4,15,0.55)",
            padding: "3px 8px", borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>{project.year}</span>

          {/* hover arrow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "52px", height: "52px",
            borderRadius: "50%",
            border: `1.5px solid ${project.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", color: project.color,
            background: "rgba(3,4,15,0.5)",
            backdropFilter: "blur(8px)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0.6)",
            transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
          }}>↗</div>

          {/* scan line on hover */}
          <div style={{
            position: "absolute", left: 0, right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${project.color}88, transparent)`,
            top: hovered ? "100%" : "-2px",
            transition: hovered ? "top 0.6s ease" : "none",
          }} />
        </div>

        {/* info */}
        <div style={{ padding: "20px 20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9.5px", letterSpacing: "0.2em",
            textTransform: "uppercase", fontWeight: 700,
            color: project.color,
          }}>{project.category}</p>

          <h3 style={{
            fontSize: "clamp(15px, 1.8vw, 21px)",
            fontWeight: 900, textTransform: "uppercase",
            letterSpacing: "0.04em", lineHeight: 1.1,
            fontFamily: "'Syne', sans-serif",
            background: hovered ? `linear-gradient(90deg, ${project.color}, ${project.accent})` : "none",
            WebkitBackgroundClip: hovered ? "text" : "unset",
            WebkitTextFillColor: hovered ? "transparent" : "#fff",
            transition: "all 0.3s",
          }}>{project.title}</h3>

          <p style={{
            fontSize: "12px", color: "rgba(180,200,240,0.48)",
            lineHeight: 1.65, fontWeight: 400, flex: 1, marginTop: "2px",
          }}>{project.desc}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px", letterSpacing: "0.1em",
                padding: "3px 9px", borderRadius: "4px",
                border: `1px solid ${hovered ? project.color + "55" : "rgba(255,255,255,0.08)"}`,
                color: hovered ? project.color : "rgba(180,200,240,0.45)",
                transition: "all 0.3s",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${project.color}, ${project.accent}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
        zIndex: 3,
      }} />
    </div>
  );
}

/* ─── MARQUEE ─────────────────────────────────────────────────────────────── */
function Marquee() {
  const items = ["Web Development","UI/UX Design","E-Commerce","SEO","API Integration","Branding","SaaS Products","Mobile Apps"];
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(123,110,246,0.1)",
      borderBottom: "1px solid rgba(123,110,246,0.1)",
      padding: "16px 0",
      marginBottom: "80px",
    }}>
      <div style={{
        display: "flex",
        animation: "owMarquee 26s linear infinite",
        width: "max-content",
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: "flex", alignItems: "center", gap: "14px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px", letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(180,200,240,0.35)",
            padding: "0 28px", whiteSpace: "nowrap",
          }}>
            <span style={{ color: "#7B6EF6", fontSize: "9px" }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── STAT ────────────────────────────────────────────────────────────────── */
function Stat({ stat, index }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: "8px",
      padding: "36px 24px",
      position: "relative",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${index * 90}ms, transform 0.6s ease ${index * 90}ms`,
    }}>
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700,
        background: "linear-gradient(90deg, #7B6EF6, #4FC3F7)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", lineHeight: 1,
      }}>{stat.value}</span>
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "10.5px", color: "rgba(180,200,240,0.4)",
        letterSpacing: "0.18em", textTransform: "uppercase",
      }}>{stat.label}</span>
    </div>
  );
}

/* ─── MAIN ────────────────────────────────────────────────────────────────── */
export default function OurWork() {
  const [sectionRef, progress] = useScrollProgress();
  const [headerRef, headerInView] = useInView(0.15);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  const parallaxY = progress * -50;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');

        .ow-wrap *, .ow-wrap *::before, .ow-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes owMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @keyframes owFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* grid responsive */
        .ow-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto 80px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 1024px) {
          .ow-grid { grid-template-columns: repeat(6, 1fr); }
        }
        @media (max-width: 768px) {
          .ow-grid { grid-template-columns: 1fr; gap: 14px; }
        }

        /* card responsive spans */
        @media (max-width: 1024px) {
          .ow-card-large { grid-column: span 6 !important; }
          .ow-card-small { grid-column: span 3 !important; }
        }
        @media (max-width: 768px) {
          .ow-card-large, .ow-card-small { grid-column: span 1 !important; }
        }

        /* stats responsive */
        .ow-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          max-width: 1400px;
          margin: 0 auto 80px;
          background: rgba(8,11,26,0.7);
          border: 1px solid rgba(123,110,246,0.12);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(16px);
          position: relative;
          z-index: 1;
        }

        .ow-stat-divider {
          border-left: 1px solid rgba(123,110,246,0.1);
        }

        @media (max-width: 768px) {
          .ow-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .ow-stat-divider:nth-child(3) { border-left: none; }
        }
        @media (max-width: 480px) {
          .ow-stats-grid { grid-template-columns: 1fr 1fr; }
        }

        .ow-filter-btn {
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.1em;
          cursor: pointer;
          border: 1px solid rgba(123,110,246,0.22);
          background: transparent;
          color: rgba(180,200,240,0.55);
          transition: all 0.22s ease;
        }
        .ow-filter-btn:hover {
          border-color: rgba(123,110,246,0.5);
          color: #fff;
          background: rgba(123,110,246,0.08);
        }
        .ow-filter-btn--on {
          background: linear-gradient(135deg, #7B6EF6, #4FC3F7);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 0 22px rgba(123,110,246,0.38);
        }

        .ow-cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 30px;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700;
          background: linear-gradient(135deg, #7B6EF6, #4FC3F7);
          color: #fff; border: none; cursor: pointer;
          text-decoration: none;
          box-shadow: 0 0 30px rgba(123,110,246,0.38);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ow-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 44px rgba(123,110,246,0.55), 0 12px 28px rgba(0,0,0,0.4);
        }

        .ow-cta-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 28px;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 600;
          background: transparent;
          color: rgba(200,210,255,0.75);
          border: 1px solid rgba(123,110,246,0.28);
          cursor: pointer; text-decoration: none;
          transition: all 0.22s ease;
        }
        .ow-cta-secondary:hover {
          border-color: rgba(123,110,246,0.55);
          color: #fff;
          background: rgba(123,110,246,0.07);
          transform: translateY(-2px);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="ow-wrap"
        style={{
          background: "#03040F",
          fontFamily: "'Syne', sans-serif",
          position: "relative",
          overflow: "hidden",
          padding: "100px 60px 120px",
          width: "100%",
        }}
      >
        {/* bg grid with parallax */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(123,110,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(123,110,246,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: `translateY(${parallaxY}px)`,
          pointerEvents: "none",
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.4) 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.4) 90%, transparent 100%)",
        }} />

        {/* ambient glows */}
        <div style={{
          position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,110,246,0.07) 0%, transparent 70%)",
          top: "-100px", left: "-200px", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,195,247,0.05) 0%, transparent 70%)",
          bottom: "80px", right: "-80px", pointerEvents: "none",
        }} />

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          style={{
            position: "relative", zIndex: 1,
            maxWidth: "1400px", margin: "0 auto 56px",
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          {/* label */}
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10.5px", letterSpacing: "0.42em",
            color: "rgba(79,195,247,0.75)", textTransform: "uppercase",
            marginBottom: "14px",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <span style={{ flex: "0 0 28px", height: "1px", background: "rgba(79,195,247,0.4)" }} />
            Selected Work
            <span style={{ flex: "0 0 28px", height: "1px", background: "rgba(79,195,247,0.4)" }} />
          </p>

          {/* title row */}
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", gap: "24px",
            flexWrap: "wrap", marginBottom: "36px",
          }}>
            <div>
              <h2 style={{
                fontSize: "clamp(52px, 7.5vw, 100px)",
                fontWeight: 900, textTransform: "uppercase",
                letterSpacing: "-0.02em", lineHeight: 0.88,
                fontFamily: "'Syne', sans-serif", color: "#fff",
                margin: 0,
              }}>
                Our{" "}
                <em style={{
                  fontStyle: "italic",
                  background: "linear-gradient(90deg, #7B6EF6, #4FC3F7 55%, #60efff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Work</em>
              </h2>
              <div style={{
                marginTop: "14px", height: "2px", width: "90px",
                background: "linear-gradient(90deg, #7B6EF6, #4FC3F7, transparent)",
                borderRadius: "2px",
              }} />
            </div>
            <p style={{
              maxWidth: "320px", fontSize: "13.5px",
              color: "rgba(180,195,230,0.5)", lineHeight: 1.72,
              fontWeight: 400, paddingBottom: "8px", flexShrink: 0,
            }}>
              A curated selection of projects where strategy, design, and engineering collide to create real-world impact.
            </p>
          </div>

          {/* filters */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {filters.map(f => (
              <button
                key={f}
                className={`ow-filter-btn ${activeFilter === f ? "ow-filter-btn--on" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── GRID ───────────────────────────────────────────────── */}
        <div className="ow-grid">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={project.size === "large" ? "ow-card-large" : "ow-card-small"}
              style={{ gridColumn: project.size === "large" ? "span 8" : "span 4" }}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* ── MARQUEE ────────────────────────────────────────────── */}
        <Marquee />

        {/* ── STATS ──────────────────────────────────────────────── */}
        <div className="ow-stats-grid">
          {stats.map((s, i) => (
            <div key={s.label} className={i > 0 ? "ow-stat-divider" : ""}>
              <Stat stat={s} index={i} />
            </div>
          ))}
        </div>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "16px", flexWrap: "wrap", position: "relative", zIndex: 1,
        }}>
          <a href="/work" className="ow-cta-primary">✦ View All Projects</a>
          <a href="/contact" className="ow-cta-secondary">Start a Project →</a>
        </div>

      </section>
    </>
  );
}