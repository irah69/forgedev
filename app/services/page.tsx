"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────────── */
const SERVICES = [
  {
    id: "ecommerce",
    index: "01",
    title: "E-Commerce",
    subtitle: "Solutions",
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
  {
    id: "webdev",
    index: "02",
    title: "Web",
    subtitle: "Development",
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
    index: "03",
    title: "SEO",
    subtitle: "Strategy",
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
        <path d="M42 44 Q52 42 62 44" stroke="#34D399" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <path d="M40 60 Q52 62 64 60" stroke="#34D399" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
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
    index: "04",
    title: "Web",
    subtitle: "Maintenance",
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
];

/* ─────────────────────────────────────────────
   THREE.JS PARTICLE ORB (per service)
───────────────────────────────────────────── */
interface ThreeOrbProps {
  color: string;
  active: boolean;
}
function ThreeOrb({ color, active }: ThreeOrbProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<{ renderer?: THREE.WebGLRenderer; animId?: number }>({});

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = (el as HTMLDivElement).clientWidth || 300;
    const h = (el as HTMLDivElement).clientHeight || 300;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    (el as HTMLDivElement).appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 2.8;

    // Particles on sphere
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 1 + (Math.random() - 0.5) * 0.12;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 2 + 1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const c = new THREE.Color(color);
    const mat = new THREE.PointsMaterial({
      color: c,
      size: 0.025,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Inner glow sphere
    const glowGeo = new THREE.SphereGeometry(0.88, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: c,
      transparent: true,
      opacity: 0.04,
      wireframe: false,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // Wireframe ring
    const ringGeo = new THREE.TorusGeometry(1.15, 0.003, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.3 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    let animId: number = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.18;
      points.rotation.x = Math.sin(t * 0.1) * 0.2;
      ring.rotation.z = t * 0.12;
      mat.opacity = active ? 0.85 : 0.45;
      glow.material.opacity = active ? 0.09 : 0.03;
      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { renderer, animId };

    const onResize = () => {
      const nw = (el as HTMLDivElement).clientWidth;
      const nh = (el as HTMLDivElement).clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if ((el as HTMLDivElement).contains(renderer.domElement)) (el as HTMLDivElement).removeChild(renderer.domElement);
    };
  }, [color]);

  // Pulse opacity on active
  useEffect(() => {
    if (sceneRef.current?.renderer) {
      // handled inside animate loop via active ref — we re-trigger via key if needed
    }
  }, [active]);

  return <div ref={mountRef} className="w-full h-full" style={{ minHeight: 280 }} />;
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
      if ((el as HTMLDivElement).contains(renderer.domElement)) (el as HTMLDivElement).removeChild(renderer.domElement);
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
   SERVICE SECTION
───────────────────────────────────────────── */
interface ServiceSectionProps {
  service: (typeof SERVICES)[number];
  index: number;
}
function ServiceSection({ service, index }: ServiceSectionProps) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at ${isEven ? "70%" : "30%"} 50%, ${service.accent}11 0%, transparent 65%)`,
      }}
    >
      {/* Divider line */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${service.accent}40, transparent)` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-8 md:px-16 lg:px-32 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* TEXT SIDE */}
        <div className={`flex flex-col gap-7 max-w-lg ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          {/* Index badge */}
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-xs tracking-[0.35em] uppercase px-3 py-1 rounded-full border"
              style={{ color: service.accent, borderColor: `${service.accent}40`, background: `${service.accent}10` }}
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
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
              }}
            >
              {service.title}
            </h2>
            <h2
              className="font-black uppercase italic block"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
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

          {/* SVG Icon — fixed size box so SVG doesn't overflow */}
          <div
            style={{
              width: 64,
              height: 64,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 14,
              border: `1px solid ${service.accent}30`,
              background: `${service.accent}08`,
              boxShadow: `0 0 24px ${service.accent}18`,
              overflow: "hidden",
            }}
          >
            <div style={{ width: 40, height: 40, flexShrink: 0 }}>
              {service.svg}
            </div>
          </div>

          {/* Description */}
          <p
            className="text-white/60 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", maxWidth: 440 }}
          >
            {service.description}
          </p>

          {/* Bullets */}
          <ul className="flex flex-col gap-3">
            {service.bullets.map((b: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-white/75 text-sm tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span
                  className="rounded-full flex-shrink-0"
                  style={{ width: 6, height: 6, background: service.accent, boxShadow: `0 0 8px ${service.accent}` }}
                />
                {b}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="pt-1">
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="group inline-flex items-center gap-3 rounded-full font-semibold tracking-wide transition-all duration-300"
              style={{
                padding: "12px 28px",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                background: hovered ? service.accent : "transparent",
                color: hovered ? "#0a0a12" : service.accent,
                border: `1.5px solid ${service.accent}`,
                boxShadow: hovered ? `0 0 36px ${service.accent}50` : "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span>Explore Service</span>
              <svg
                style={{ width: 14, height: 14, transition: "transform 0.3s", transform: hovered ? "translateX(4px)" : "translateX(0)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* THREE.JS ORB SIDE */}
        <div
          className={`relative flex items-center justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
          style={{ height: 420 }}
        >
          {/* Glow behind orb */}
          <div
            className="absolute rounded-full blur-3xl"
            style={{ inset: "15%", background: service.accent, opacity: 0.12 }}
          />
          <div style={{ width: "100%", height: "100%", maxWidth: 380 }}>
            <ThreeOrb color={service.accent} active={false} />
          </div>

          {/* Floating stat badge — anchored inside orb column, not overflowing */}
          <div
            style={{
              position: "absolute",
              top: 24,
              ...(isEven ? { right: 0 } : { left: 0 }),
              padding: "10px 16px",
              borderRadius: 12,
              border: `1px solid ${service.accent}30`,
              background: "#0a0a1a",
              fontFamily: "monospace",
              minWidth: 120,
            }}
          >
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 2 }}>Impact</div>
            <div style={{ color: service.accent, fontSize: 22, fontWeight: 700, lineHeight: 1 }}>
              {["3.2×", "99ms", "+180%", "99.9%"][index]}
            </div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, marginTop: 2 }}>
              {["avg revenue lift", "load time", "organic traffic", "uptime SLA"][index]}
            </div>
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
{/*       <span
        className="inline-block font-mono text-xs tracking-[0.5em] uppercase mb-6 px-4 py-1.5 rounded-full"
        style={{
          color: "#7C6FFF",
          background: "#7C6FFF15",
          border: "1px solid #7C6FFF30",
        }}
      >
        What We Do
      </span> */}

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

{/*       <p className="text-white/50 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        End-to-end digital solutions crafted for scale, speed, and results that compound over time.
      </p> */}

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

        {/* Nav placeholder bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5" style={{ background: "rgba(6,6,16,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "#7C6FFF", color: "#fff", fontFamily: "serif", fontWeight: 900, fontSize: 14 }}>I</div>
            <span className="text-white font-black tracking-[0.2em] text-sm" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.3em" }}>IRAH</span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {["Services", "Work", "About Us", "Process", "Tech", "Contact"].map((item) => (
              <a key={item} href="#" className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {item}
              </a>
            ))}
          </div>
          <button
            className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #7C6FFF, #22D3EE)", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
          >
            • Start a Project
          </button>
        </nav>

        {/* Hero */}
        <div style={{ height: 88 }} />
        <ServicesHero />

        {/* Service Sections */}
        {SERVICES.map((service, i) => (
          <ServiceSection key={service.id} service={service} index={i} />
        ))}

        {/* Footer CTA */}
        <section
          className="relative z-10 w-full py-32 flex flex-col items-center text-center px-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">Ready to begin?</p>
          <h2
            className="text-white font-black uppercase mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
          >
            Let&apos;s Build{" "}
            <span style={{ background: "linear-gradient(135deg, #7C6FFF, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Together
            </span>
          </h2>
          <button
            className="px-10 py-4 rounded-full font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #7C6FFF, #22D3EE)",
              color: "#060610",
              boxShadow: "0 0 60px #7C6FFF40",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Start a Project →
          </button>
        </section>
      </div>
    </>
  );
}