"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ShoppingBagSymbol from "@/components/ShoppingBagSymbol";
import CodeBracketsSymbol from "@/components/CodeBracketsSymbol";
import MagnifierSymbol from "@/components/MagnifierSymbol";
import Globe from "@/components/globe";

/* ─────────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────────── */
const SERVICES = [
  {
    id: "webdev",
    index: "01",
    title: "Web",
    subtitle: "Development",
    symbol: "webdev" as const,
    accent: "#22D3EE",
    accentAlt: "#67E8F9",
    description:
      "We build blazing-fast, scalable web applications using cutting-edge stacks. Next.js, React, TypeScript — fused into experiences that perform and endure.",
    bullets: ["Full-Stack Next.js Applications", "API Design & Microservices", "Performance & Core Web Vitals", "Scalable Cloud Deployment"],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <polygon points="60,10 110,85 10,85" stroke="#22D3EE" strokeWidth="1.5" fill="none" opacity="0.3" />
        <rect x="30" y="35" width="60" height="45" rx="3" stroke="#22D3EE" strokeWidth="1.5" fill="none" />
        <path d="M30 45h60" stroke="#22D3EE" strokeWidth="1" />
        <circle cx="37" cy="40" r="2" fill="#22D3EE" opacity="0.8" />
        <circle cx="44" cy="40" r="2" fill="#67E8F9" opacity="0.6" />
        <circle cx="51" cy="40" r="2" fill="#22D3EE" opacity="0.4" />
        <path d="M40 58 L46 64 L40 70" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M80 58 L74 64 L80 70" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M62 55 L58 73" stroke="#67E8F9" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="60" cy="100" r="6" stroke="#22D3EE" strokeWidth="1.5" fill="none" />
        <path d="M55 106 L65 106" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "seo",
    index: "02",
    title: "SEO",
    subtitle: "Strategy",
    symbol: "seo" as const,
    accent: "#34D399",
    accentAlt: "#6EE7B7",
    description:
      "Data-driven SEO that compounds. We engineer topical authority, technical health, and link equity to place your brand at the top of every search that matters.",
    bullets: ["Technical SEO Audits & Fixes", "Content & Topical Authority", "Keyword Mapping & Architecture", "Backlink Acquisition Campaigns"],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <circle cx="52" cy="52" r="28" stroke="#34D399" strokeWidth="1.5" fill="none" opacity="0.4" />
        <circle cx="52" cy="52" r="18" stroke="#34D399" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M72 72 L95 95" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M38 52 Q52 34 66 52 Q52 70 38 52Z" stroke="#6EE7B7" strokeWidth="1" fill="#34D399" fillOpacity="0.1" />
        <path d="M30 90 L50 75 L65 82 L90 62" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="90" r="2.5" fill="#34D399" />
        <circle cx="50" cy="75" r="2.5" fill="#34D399" />
        <circle cx="65" cy="82" r="2.5" fill="#34D399" />
        <circle cx="90" cy="62" r="2.5" fill="#6EE7B7" />
      </svg>
    ),
  },
  {
    id: "maintenance",
    index: "03",
    title: "Web",
    subtitle: "Maintenance",
    symbol: "maintenance" as const,
    accent: "#F472B6",
    accentAlt: "#F9A8D4",
    description:
      "Your digital presence never sleeps — neither do we. Proactive monitoring, security patches, and iterative improvements to keep your platform running at peak.",
    bullets: ["24/7 Uptime Monitoring", "Security & Dependency Updates", "Performance Optimization Sprints", "Monthly Reporting & Insights"],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <circle cx="60" cy="60" r="30" stroke="#F472B6" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d="M60 30 L60 60 L78 60" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="60" cy="60" r="4" fill="#F472B6" />
        <path d="M60 18 L60 24" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M60 96 L60 102" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M18 60 L24 60" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M96 60 L102 60" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M82 20 L85 32 L73 28 Z" fill="#F9A8D4" opacity="0.6" />
        <rect x="26" y="85" width="68" height="16" rx="3" stroke="#F472B6" strokeWidth="1" fill="none" opacity="0.4" />
        <rect x="30" y="89" width="20" height="8" rx="1.5" fill="#F472B6" fillOpacity="0.3" />
        <rect x="54" y="89" width="12" height="8" rx="1.5" fill="#F9A8D4" fillOpacity="0.2" />
        <rect x="70" y="89" width="20" height="8" rx="1.5" fill="#F472B6" fillOpacity="0.15" />
      </svg>
    ),
  },
  {
    id: "ecommerce",
    index: "04",
    title: "E-Commerce",
    subtitle: "Solutions",
    symbol: "ecommerce" as const,
    accent: "#7C6FFF",
    accentAlt: "#A78BFA",
    description:
      "We architect high-converting storefronts that turn browsers into buyers. From headless commerce to checkout optimization — every pixel is revenue-engineered.",
    bullets: ["Custom Storefront Architecture", "Headless Commerce (Next.js + Shopify)", "Payment & Checkout Optimization", "Inventory & CMS Integration"],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <rect x="28" y="42" width="64" height="44" rx="4" stroke="#7C6FFF" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.4" />
        <path d="M28 54h64" stroke="#7C6FFF" strokeWidth="1.5" />
        <circle cx="40" cy="48" r="3" fill="#7C6FFF" opacity="0.7" />
        <circle cx="52" cy="48" r="3" fill="#A78BFA" opacity="0.7" />
        <rect x="36" y="62" width="20" height="14" rx="2" fill="#7C6FFF" opacity="0.2" stroke="#7C6FFF" strokeWidth="1" />
        <rect x="64" y="62" width="20" height="14" rx="2" fill="#A78BFA" opacity="0.1" stroke="#A78BFA" strokeWidth="1" />
        <path d="M46 34 L46 44M52 30 L52 44" stroke="#7C6FFF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M60 34 L64 30 L68 34" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="88" cy="36" r="8" fill="#7C6FFF" opacity="0.15" stroke="#7C6FFF" strokeWidth="1" />
        <path d="M85 36 L87 38 L92 33" stroke="#7C6FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   SYMBOL COMPONENT SELECTOR
───────────────────────────────────────────── */
type SymbolType = "ecommerce" | "webdev" | "seo" | "maintenance";

interface SymbolProps {
  color: string;
  symbol: SymbolType;
}

function ParticleSymbol({ color, symbol }: SymbolProps) {
  switch (symbol) {
    case "ecommerce":
      return <ShoppingBagSymbol color={color} />;
    case "webdev":
      return <CodeBracketsSymbol color={color} />;
    case "seo":
      return <MagnifierSymbol color={color} />;
    case "maintenance":
      return <Globe />;
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────
   BACKGROUND STAR FIELD
───────────────────────────────────────────── */
function StarField() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(1);
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    (el as HTMLDivElement).appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 1;

    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 80;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(geo, mat));

    let animId: number = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      scene.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if ((el as HTMLDivElement).contains(renderer.domElement))
        (el as HTMLDivElement).removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

/* ─────────────────────────────────────────────
   SERVICE SECTION  ← FIXED DESKTOP LAYOUT
───────────────────────────────────────────── */
interface ServiceSectionProps {
  service: (typeof SERVICES)[number];
  index: number;
}
function ServiceSection({ service, index }: ServiceSectionProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 70% 50%, ${service.accent}11 0%, transparent 65%)`,
      }}
    >
      {/* Divider line */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${service.accent}40, transparent)` }}
      />

      {/*
        ── KEY FIX ──────────────────────────────────────────────────────────────
        Old:  px-8 md:px-16 lg:px-32  →  over-shrinks the container on desktop,
              pushing the left column off-screen on narrower desktop viewports.
        New:  Use a responsive clamp via inline style so padding scales smoothly
              from 24px (mobile) up to 80px (wide desktop) without ever cutting
              into the text column. max-w-6xl + mx-auto keeps it centred on
              ultra-wide screens.
        ─────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{
          padding: "5rem clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        {/* TEXT SIDE */}
        <div
          className="flex flex-col gap-7 w-full lg:order-1"
          style={{
            maxWidth: 520,
            marginLeft: 0,
          }}
        >
          {/* Index badge */}
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-xs tracking-[0.35em] uppercase px-3 py-1 rounded-full border"
              style={{
                color: service.accent,
                borderColor: `${service.accent}40`,
                background: `${service.accent}10`,
              }}
            >
              {service.index}
            </span>
            <div className="h-px w-12" style={{ background: `${service.accent}40` }} />
          </div>

          {/* Heading */}
          <div className="leading-none">
            <h2
              className="font-black uppercase text-white block"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
              }}
            >
              {service.title}
            </h2>
            <h2
              className="font-black uppercase italic block"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                background: `linear-gradient(135deg, ${service.accent}, ${service.accentAlt})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {service.subtitle}
            </h2>
          </div>

          {/* SVG Icon */}


          {/* Description */}
          <p
            className="text-white/60 leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
            }}
          >
            {service.description}
          </p>

          {/* Bullets */}
          <ul className="flex flex-col gap-3">
            {service.bullets.map((b: string, i: number) => (
              <li
                key={i}
                className="flex items-center gap-3 text-white/75 text-sm tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: 6,
                    height: 6,
                    background: service.accent,
                    boxShadow: `0 0 8px ${service.accent}`,
                  }}
                />
                {b}
              </li>
            ))}
          </ul>


        </div>

        {/* PARTICLE SYMBOL SIDE */}
        <div
          className="relative flex items-center justify-center lg:order-2"
          style={{ height: 460 }}
        >
          {/* Subtle radial glow behind symbol */}
          <div
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ inset: "20%", background: service.accent, opacity: 0.10 }}
          />
          <div style={{ width: "100%", height: "100%", maxWidth: 420 }}>
            <ParticleSymbol color={service.accent} symbol={service.symbol} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HERO HEADER
───────────────────────────────────────────── */
function ServicesHero() {
  return (
    <section className="relative z-10 w-full pt-56 pb-24 flex flex-col items-center text-center px-6 overflow-hidden">
      <h1
        className="font-black uppercase text-white leading-none mb-6"
        style={{
          fontSize: "clamp(3.5rem, 9vw, 8rem)",
          letterSpacing: "-0.03em",
        }}
      >
        Our{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #7C6FFF 0%, #22D3EE 50%, #34D399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Services
        </span>
      </h1>

      {/* Decorative line */}
      <div className="flex items-center gap-4 mt-12">
        {SERVICES.map((s) => (
          <div
            key={s.id}
            className="h-1 w-12 rounded-full transition-all duration-500"
            style={{ background: s.accent }}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Services() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,600;1,400&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060610; }
        h1, h2, h3, button { font-family: 'Bebas Neue', sans-serif; }
        p, li, span { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div
        className="relative min-h-screen"
        style={{ background: "linear-gradient(180deg, #060610 0%, #080818 100%)" }}
      >
        {/* Starfield BG */}
        <StarField />

        {/* Nav */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
          style={{
            background: "rgba(6,6,16,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "#7C6FFF", color: "#fff", fontFamily: "serif", fontWeight: 900, fontSize: 14 }}
            >
              I
            </div>
            <span
              className="text-white font-black tracking-[0.2em] text-sm"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.3em" }}
            >
              IRAH
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {["Services", "Work", "About Us", "Process", "Tech", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
          <button
            className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #7C6FFF, #22D3EE)",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            • Start a Project
          </button>
        </nav>

        {/* Spacer for fixed nav */}
        <div style={{ height: 88 }} />

        {/* Hero */}
        <ServicesHero />

        {/* Service Sections */}
        {SERVICES.map((service, i) => (
          <ServiceSection key={service.id} service={service} index={i} />
        ))}
      </div>
    </>
  );
}