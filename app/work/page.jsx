"use client";

import { useEffect, useRef, useState } from "react";

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const projects = [
  {
    id: "01",
    title: "MURGAN COLLECTIONS",
    category: "E-Commerce · Web Dev",
    tags: ["Next.js", "Tailwind", "Commerce"],
    desc: "Handpicked collection of exquisite sarees — from timeless silks to vibrant Banarasi weaves. Crafted to celebrate the elegance and grace of every woman.",
    year: "2025",
    color: "#C9A84C",
    accent: "#e8c96a",
    size: "large",
    link: "https://murgan-ui.vercel.app/",
    image: "/murgan.png",
  },
  {
    id: "02",
    title: "Little Berries",
    category: "Education & Childcare",
    tags: ["Next.js", "Tailwind CSS"],
    desc: "A joyful early learning playschool website featuring programs for Play Group to Senior KG, activity classes like Chess, Dance & Taekwondo, admissions info, photo gallery, and a parent portal.",
    year: "2026",
    color: "#fde68a",
    accent: "#fff7ed",
    size: "small",
    link: "https://littleberries.co.in/",
    image: "/littleberries.png",
    badge: "Education",
    rating: 5,
    gradient: "linear-gradient(135deg,#fff7ed 0%,#fde68a 100%)",
    price: "Informational Website",
    tag: "Playschool & Daycare                .",
  },
  {
    id: "03",
    title: "VELO COMMERCE",
    category: "E-Commerce · SEO",
    tags: ["Next.js", "Shopify", "Tailwind"],
    desc: "High-conversion storefront scaling from 0 to 2M ARR in eight months.",
    year: "2024",
    color: "#4FC3F7",
    accent: "#7B6EF6",
    size: "small",
    link: null,
    image: null,
  },
  {
    id: "04",
    title: "NEXUS API",
    category: "API · Backend",
    tags: ["GraphQL", "PostgreSQL", "AWS"],
    desc: "Unified data layer connecting 14 microservices with sub-20ms response times.",
    year: "2023",
    color: "#8B5CF6",
    accent: "#60efff",
    size: "small",
    link: null,
    image: null,
  },
  {
    id: "05",
    title: "DRIFT STUDIO",
    category: "Branding · Web Dev",
    tags: ["Three.js", "GSAP", "Webflow"],
    desc: "Award-winning creative agency site with WebGL scenes and magnetic cursor interactions.",
    year: "2023",
    color: "#60efff",
    accent: "#8B5CF6",
    size: "large",
    link: null,
    image: null,
  },
  {
    id: "06",
    title: "PULSE HEALTH",
    category: "SaaS · Maintenance",
    tags: ["React Native", "Firebase", "HIPAA"],
    desc: "Patient-facing health monitoring platform trusted by 40,000+ active users.",
    year: "2023",
    color: "#a78bfa",
    accent: "#4FC3F7",
    size: "small",
    link: null,
    image: null,
  },
  {
    id: "07",
    title: "ORION MAPS",
    category: "Web App · API",
    tags: ["MapboxGL", "Python", "Redis"],
    desc: "Real-time logistics visualisation platform processing 1M+ events per day.",
    year: "2022",
    color: "#38bdf8",
    accent: "#7B6EF6",
    size: "small",
    link: null,
    image: null,
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
  const isMurgan = project.id === "01";
  const isLittleBerries = project.id === "02";
  const delay = (index % 3) * 110;

  const cardContent = (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: project.link ? "pointer" : "default",
        borderRadius: "14px",
        overflow: "hidden",
        height: "100%",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(56px) scale(0.97)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
      }}
    >
      {/* gradient border */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "14px", padding: "1px",
        background: hovered
          ? `linear-gradient(135deg, ${project.color}, ${project.accent})`
          : isMurgan
            ? `linear-gradient(135deg, rgba(201,168,76,0.5), rgba(232,201,106,0.15))`
            : "linear-gradient(135deg, rgba(123,110,246,0.22), rgba(79,195,247,0.08))",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        transition: "background 0.4s ease",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* card body */}
      <div style={{
        background: hovered
          ? isMurgan ? "#1A1408" : "#0D1128"
          : isMurgan ? "#110E05" : "#080B1A",
        borderRadius: "14px",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        height: "100%",
        transition: "background 0.4s ease",
      }}>

        {/* ── IMAGE / VISUAL AREA ── */}
        <div style={{
          position: "relative",
          height: isLarge ? "300px" : "220px",
          overflow: "hidden", flexShrink: 0,
          background: isMurgan
            ? "linear-gradient(135deg, #1a1408 0%, #2a1f08 50%, #1a1408 100%)"
            : `linear-gradient(135deg, ${project.color}16 0%, #080B1A 100%)`,
        }}>

          {/* Murgan & Little Berries: real screenshot image */}
          {(isMurgan || isLittleBerries) && project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "top center",
                  opacity: hovered ? 0.75 : 0.6,
                  transition: "opacity 0.4s ease, transform 0.6s ease",
                  transform: hovered ? "scale(1.04)" : "scale(1)",
                }}
              />
              {/* overlay tint */}
              <div style={{
                position: "absolute", inset: 0,
                background: isMurgan
                  ? (hovered
                      ? "linear-gradient(to bottom, rgba(201,168,76,0.08) 0%, rgba(0,0,0,0.5) 100%)"
                      : "linear-gradient(to bottom, rgba(201,168,76,0.12) 0%, rgba(0,0,0,0.65) 100%)")
                  : (hovered
                      ? "linear-gradient(to bottom, rgba(253,230,138,0.08) 0%, rgba(0,0,0,0.5) 100%)"
                      : "linear-gradient(to bottom, rgba(253,230,138,0.12) 0%, rgba(0,0,0,0.65) 100%)"),
                transition: "background 0.4s",
              }} />
            </>
          ) : (
            <>
              {/* grid lines for non-image cards */}
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
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse at center, ${project.color}20 0%, transparent 65%)`,
                opacity: hovered ? 1 : 0.4, transition: "opacity 0.4s",
              }} />
              <span style={{
                position: "absolute", bottom: "-16px", right: "14px",
                fontFamily: "'Space Mono', monospace",
                fontSize: "110px", fontWeight: 700,
                color: project.color, opacity: 0.05,
                lineHeight: 1, pointerEvents: "none", userSelect: "none",
              }}>{project.id}</span>
            </>
          )}

          {/* year tag */}
          <span style={{
            position: "absolute", top: "14px", left: "16px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px", letterSpacing: "0.2em",
            color: isMurgan ? "rgba(201,168,76,0.9)" : "rgba(180,200,240,0.4)",
            background: "rgba(3,4,15,0.65)",
            padding: "3px 8px", borderRadius: "4px",
            border: `1px solid ${isMurgan ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.06)"}`,
            zIndex: 2,
          }}>{project.year}</span>

          {/* LIVE badge for Murgan */}
          {isMurgan && (
            <span style={{
              position: "absolute", top: "14px", right: "16px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px", letterSpacing: "0.18em",
              color: "#C9A84C",
              background: "rgba(201,168,76,0.12)",
              padding: "3px 10px", borderRadius: "4px",
              border: "1px solid rgba(201,168,76,0.35)",
              display: "flex", alignItems: "center", gap: "5px",
              zIndex: 2,
            }}>
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "#C9A84C", display: "inline-block",
                animation: "owPulse 2s ease-in-out infinite",
              }} />
              LIVE
            </span>
          )}

          {/* hover arrow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "52px", height: "52px", borderRadius: "50%",
            border: `1.5px solid ${project.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", color: project.color,
            background: "rgba(3,4,15,0.6)", backdropFilter: "blur(8px)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0.6)",
            transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
            zIndex: 3,
          }}>↗</div>

          {/* scan line */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: "1px",
            background: `linear-gradient(90deg, transparent, ${project.color}88, transparent)`,
            top: hovered ? "100%" : "-2px",
            transition: hovered ? "top 0.6s ease" : "none",
            zIndex: 2,
          }} />
        </div>

        {/* ── INFO ── */}
        <div style={{
          padding: "20px 20px 22px", flex: 1,
          display: "flex", flexDirection: "column", gap: "5px",
          borderTop: isMurgan ? "1px solid rgba(201,168,76,0.1)" : "none",
        }}>
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

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
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

            {/* visit link for Murgan */}
            {isMurgan && project.link && (
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9.5px", letterSpacing: "0.1em",
                color: hovered ? "#C9A84C" : "rgba(201,168,76,0.5)",
                transition: "color 0.3s",
                whiteSpace: "nowrap",
              }}>
                murgan-ui.vercel.app ↗
              </span>
            )}
          </div>
        </div>
      </div>

      {/* bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${project.color}, ${project.accent}, transparent)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.4s", zIndex: 3,
      }} />
    </div>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block", height: "100%" }}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
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
      padding: "16px 0", marginBottom: "80px",
    }}>
      <div style={{ display: "flex", animation: "owMarquee 26s linear infinite", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: "flex", alignItems: "center", gap: "14px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px", letterSpacing: "0.28em",
            textTransform: "uppercase", color: "rgba(180,200,240,0.35)",
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
      alignItems: "center", gap: "8px", padding: "36px 24px",
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

        .ow-wrap *, .ow-wrap *::before, .ow-wrap *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        @keyframes owMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes owPulse   { 0%,100%{opacity:1} 50%{opacity:.3} }

        /* ── DESKTOP ── */
        .ow-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto 80px;
          padding: 0;
        }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .ow-grid {
            grid-template-columns: repeat(6, 1fr);
          }
          .ow-card-large { grid-column: span 6 !important; }
          .ow-card-small { grid-column: span 3 !important; }
        }

        /* ── MOBILE — ASYMMETRIC EDITORIAL LAYOUT ──
           Pattern per 6 cards:
             #1  → full width  (16:9)  — hero banner
             #2  → left col   (3:4)
             #3  → right col  (3:4)  + nudge down
             #4  → left col   (4:5)  + nudge up
             #5  → right col  (4:5)
             #6  → full width  (21:9) — cinematic
        */
        @media (max-width: 768px) {
          .ow-section {
            padding: 70px 0 100px !important;
          }

          .ow-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            width: 100%;
            max-width: 100%;
            padding: 0 14px;
            margin: 0 0 60px;
          }

          /* hard reset everything first */
          .ow-grid > *,
          .ow-card-large,
          .ow-card-small {
            grid-column: span 1 !important;
          }

          /* 1st of every 6 → full-width hero */
          .ow-grid > *:nth-child(6n + 1) {
            grid-column: 1 / -1 !important;
          }
          .ow-grid > *:nth-child(6n + 1) > *,
          .ow-grid > *:nth-child(6n + 1) > a > * {
            min-height: 200px;
          }

          /* 2nd → left half */
          .ow-grid > *:nth-child(6n + 2) {
            grid-column: span 1 !important;
            margin-top: 0;
          }

          /* 3rd → right half, stagger down */
          .ow-grid > *:nth-child(6n + 3) {
            grid-column: span 1 !important;
            margin-top: 18px;
          }

          /* 4th → left half, pull up */
          .ow-grid > *:nth-child(6n + 4) {
            grid-column: span 1 !important;
            margin-top: -10px;
          }

          /* 5th → right half */
          .ow-grid > *:nth-child(6n + 5) {
            grid-column: span 1 !important;
            margin-top: 0;
          }

          /* 6th → full-width cinematic */
          .ow-grid > *:nth-child(6n + 0) {
            grid-column: 1 / -1 !important;
          }
          .ow-grid > *:nth-child(6n + 0) > *,
          .ow-grid > *:nth-child(6n + 0) > a > * {
            min-height: 160px;
          }

          /* all cards: overflow safe */
          .ow-grid > * {
            overflow: hidden;
            min-width: 0;
          }
        }

        /* ── STATS ── */
        .ow-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1400px;
          margin: 0 auto 80px;
          background: rgba(8,11,26,0.7);
          border-radius: 16px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .ow-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            margin: 0 14px 60px;
          }
        }

        /* ── FILTER BUTTONS ── */
        .ow-filter-btn {
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 11px;
          cursor: pointer;
          border: 1px solid rgba(123,110,246,0.22);
          background: transparent;
          color: rgba(180,200,240,0.55);
          font-family: 'Space Mono', monospace;
          transition: all 0.2s ease;
        }
        .ow-filter-btn:hover {
          border-color: rgba(123,110,246,0.5);
          color: rgba(180,200,240,0.85);
        }
        .ow-filter-btn--on {
          background: linear-gradient(135deg, #7B6EF6, #4FC3F7);
          color: #fff;
          border-color: transparent;
        }

        /* ── CTA BUTTONS ── */
        .ow-cta-primary {
          padding: 13px 30px;
          border-radius: 10px;
          background: linear-gradient(135deg, #7B6EF6, #4FC3F7);
          color: #fff;
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.04em;
          transition: opacity 0.2s;
        }
        .ow-cta-primary:hover { opacity: 0.88; }

        .ow-cta-secondary {
          padding: 13px 28px;
          border-radius: 10px;
          border: 1px solid rgba(123,110,246,0.28);
          color: rgba(200,210,255,0.75);
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 14px;
          transition: border-color 0.2s, color 0.2s;
        }
        .ow-cta-secondary:hover {
          border-color: rgba(123,110,246,0.6);
          color: #fff;
        }

        /* ── HEADER RESPONSIVE ── */
        @media (max-width: 768px) {
          .ow-header-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .ow-header-desc {
            max-width: 100% !important;
            padding-bottom: 0 !important;
          }
          .ow-filters-row {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="ow-wrap ow-section"
        style={{
          background: "#03040F",
          fontFamily: "'Syne', sans-serif",
          position: "relative", overflow: "hidden",
          padding: "100px 60px 120px", width: "100%",
        }}
      >
        {/* bg grid */}
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
        <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(123,110,246,0.07) 0%, transparent 70%)", top: "-100px", left: "-200px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(79,195,247,0.05) 0%, transparent 70%)", bottom: "80px", right: "-80px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", top: "60px", right: "10%", pointerEvents: "none" }} />

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{
          position: "relative", zIndex: 1,
          maxWidth: "1400px", margin: "0 auto 56px",
          padding: "0 0",
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.23,1,0.32,1)",
        }}>
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

          <div
            className="ow-header-inner"
            style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between", gap: "24px",
              flexWrap: "wrap", marginBottom: "36px",
            }}
          >
            <div>
              <h2 style={{
                fontSize: "clamp(52px, 7.5vw, 100px)",
                fontWeight: 900, textTransform: "uppercase",
                letterSpacing: "-0.02em", lineHeight: 0.88,
                fontFamily: "'Syne', sans-serif", color: "#fff", margin: 0,
              }}>
                Our{" "}
                <em style={{
                  fontStyle: "italic",
                  background: "linear-gradient(90deg, #7B6EF6, #4FC3F7 55%, #60efff)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>Work</em>
              </h2>
              <div style={{ marginTop: "14px", height: "2px", width: "90px", background: "linear-gradient(90deg, #7B6EF6, #4FC3F7, transparent)", borderRadius: "2px" }} />
            </div>
            <p
              className="ow-header-desc"
              style={{ maxWidth: "320px", fontSize: "13.5px", color: "rgba(180,195,230,0.5)", lineHeight: 1.72, fontWeight: 400, paddingBottom: "8px", flexShrink: 0 }}
            >
              A curated selection of projects where strategy, design, and engineering collide to create real-world impact.
            </p>
          </div>

          <div className="ow-filters-row" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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

        {/* ── GRID ── */}
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

        <Marquee />

        {/* ── STATS ── */}
{/*         <div className="ow-stats-grid">
          {stats.map((s, i) => (
            <div key={s.label} style={i > 0 ? { borderLeft: "1px solid rgba(123,110,246,0.1)" } : {}}>
              <Stat stat={s} index={i} />
            </div>
          ))}
        </div> */}

        {/* ── CTA ── */}
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