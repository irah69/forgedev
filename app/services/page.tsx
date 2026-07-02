"use client";

import { useEffect, useRef, useState } from "react";

type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  accent: string;
  glowColor: string;
  borderGlow: string;
};

type ServiceCardProps = {
  service: Service;
  index: number;
};

const services: Service[] = [
  {
    id: "01",
    title: "Web Development",
    tagline: "Engineered for performance",
    description:
      "We craft blazing-fast, scalable web applications using cutting-edge frameworks. From single-page apps to complex enterprise systems — every pixel intentional, every line optimized.",
    features: ["React / Next.js", "Node.js & APIs", "Database Architecture", "CI/CD Pipelines"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M16 22l-6 4 6 4M32 22l6 4-6 4M22 32l4-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 40h40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="43" r="2" fill="currentColor" />
      </svg>
    ),
    accent: "from-violet-500 to-blue-500",
    glowColor: "rgba(139,92,246,0.15)",
    borderGlow: "rgba(139,92,246,0.4)",
  },
  {
    id: "02",
    title: "SEO Optimization",
    tagline: "Rank. Dominate. Convert.",
    description:
      "Data-driven SEO strategies that push your brand to the top of search results. Technical audits, content architecture, and backlink ecosystems that compound over time.",
    features: ["Technical SEO Audits", "Core Web Vitals", "Schema Markup", "Content Strategy"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="2" />
        <path d="M32 32l10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 22h12M22 16v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 8c-3 0-5.5 1-7.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    accent: "from-cyan-400 to-teal-500",
    glowColor: "rgba(34,211,238,0.15)",
    borderGlow: "rgba(34,211,238,0.4)",
  },
  {
    id: "03",
    title: "Web Maintenance",
    tagline: "Always on. Always updated.",
    description:
      "Proactive monitoring, security patches, and performance tuning so your site never sleeps. We handle the infrastructure so you can focus on growth.",
    features: ["24/7 Uptime Monitoring", "Security Patches", "Speed Optimization", "Monthly Reporting"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 6l3.5 10.5H38l-9 6.5 3.5 10.5L24 27l-8.5 6.5 3.5-10.5-9-6.5h10.5L24 6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 38c0 2.2 5.4 4 12 4s12-1.8 12-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 38v-4M36 38v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    accent: "from-purple-500 to-pink-500",
    glowColor: "rgba(168,85,247,0.15)",
    borderGlow: "rgba(168,85,247,0.4)",
  },
  {
    id: "04",
    title: "E-Commerce",
    tagline: "Stores that sell while you sleep",
    description:
      "End-to-end e-commerce solutions built to convert. From Shopify customizations to full custom storefronts — payment flows, inventory systems, and UX that drives revenue.",
    features: ["Custom Storefronts", "Payment Integration", "Inventory Systems", "Conversion Optimization"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M6 8h6l5 22h18l5-16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="38" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="34" cy="38" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M24 18v8M20 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    accent: "from-blue-400 to-cyan-500",
    glowColor: "rgba(96,165,250,0.15)",
    borderGlow: "rgba(96,165,250,0.4)",
  },
];

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const stars: Array<{ x: number; y: number; r: number; o: number; speed: number }> = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2,
        o: Math.random(),
        speed: 0.002 + Math.random() * 0.005,
      });
    }
    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.o += s.speed;
        const opacity = 0.2 + 0.6 * Math.abs(Math.sin(s.o));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,190,255,${opacity})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    // FIX 1: h-full added here so this wrapper actually fills the
    // grid row's stretched height instead of shrink-wrapping content.
    <div
      className="relative group cursor-default h-full"
      style={{ animationDelay: `${index * 120}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow backdrop */}
      <div
        className="absolute -inset-px rounded-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${service.borderGlow}, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl p-8 h-full flex flex-col gap-6 transition-transform duration-500"
        style={{
          background: hovered
            ? `linear-gradient(135deg, rgba(15,15,35,0.95) 0%, ${service.glowColor} 100%)`
            : "rgba(10,10,28,0.8)",
          border: `1px solid ${hovered ? service.borderGlow : "rgba(255,255,255,0.06)"}`,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Number + Icon row */}
        <div className="flex items-start justify-between">
          <span
            className="text-7xl font-black leading-none select-none"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.12))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.04em",
            }}
          >
            {service.id}
          </span>
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${service.accent} bg-opacity-10`}
            style={{
              background: `linear-gradient(135deg, ${service.glowColor}, rgba(255,255,255,0.05))`,
              border: `1px solid ${service.borderGlow}`,
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, #fff, rgba(255,255,255,0.7))`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {service.icon}
            </div>
          </div>
        </div>

        {/* Title + Tagline */}
        {/* FIX 2: fixed min-heights on title/tagline so a two-line
            title (e.g. "Web Development") and a one-line title
            (e.g. "E-Commerce") both reserve the same vertical space,
            keeping the description below them starting at the same y
            in every card. */}
        <div className="min-h-[76px]">
          <h3
            className="text-2xl font-extrabold mb-1 tracking-tight leading-snug min-h-[32px]"
            style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}
          >
            {service.title}
          </h3>
          <p className="text-sm font-semibold tracking-widest uppercase leading-tight">
            <span
              style={{
                background: `linear-gradient(90deg, rgba(139,92,246,1), rgba(34,211,238,1))`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {service.tagline}
            </span>
          </p>
        </div>

        {/* Description */}
        {/* FIX 3: flex-1 so this block grows/shrinks to absorb the
            leftover space, pushing the features grid to the same
            bottom edge in every card regardless of description length. */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "rgba(180,185,210,0.85)" }}
        >
          {service.description}
        </p>

        {/* Features */}
        <ul className="grid grid-cols-2 gap-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "rgba(200,205,230,0.7)" }}>
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${service.borderGlow}, rgba(255,255,255,0.5))` }}
              />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes orb-drift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(30px,-20px) scale(1.08); }
        }
      `}</style>

      <main
        className="relative min-h-screen overflow-hidden"
        style={{ background: "#080818", fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Starfield */}
        <div className="absolute inset-0 pointer-events-none">
          <StarField />
        </div>

        {/* Nav placeholder (matches IRAH nav style) */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 flex items-center justify-center"
              style={{ border: "2px solid rgba(255,255,255,0.6)", borderRadius: "4px", transform: "rotate(45deg)" }}
            >
              <div className="w-2 h-2 rounded-full bg-white" style={{ transform: "rotate(-45deg)" }} />
            </div>
            <span
              className="text-white font-extrabold tracking-widest text-sm"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              IRAH
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "rgba(180,185,210,0.7)" }}>
            {["Services", "Work", "About Us", "Process", "Tech", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors duration-200"
                style={item === "Services" ? { color: "#fff" } : {}}
              >
                {item}
              </a>
            ))}
          </div>
          <button
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
          >
            Start a Project
          </button>
        </nav>

        {/* Hero section */}
        <section className="relative z-10 text-center pt-24 pb-16 px-6">
          <h1
            className="fade-up text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              animationDelay: "80ms",
            }}
          >
            <span className="text-white">Our </span>
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa, #38bdf8, #6ee7b7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              WEB
            </span>
            <br />
            <span className="text-white">Services</span>
          </h1>

          <p
            className="fade-up max-w-xl mx-auto text-base leading-relaxed"
            style={{
              color: "rgba(180,185,210,0.7)",
              animationDelay: "160ms",
            }}
          >
            From concept to launch — we build, optimize, and maintain digital products
            that create real-world impact.
          </p>
        </section>

        {/* Services grid */}
        <section className="relative z-10 px-6 pb-24 max-w-7xl mx-auto">
          {/* FIX 4: items-stretch made explicit so every grid cell in a
              row is forced to the same height as the tallest card. */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {services.map((service, i) => (
              // FIX 1 (cont.): h-full added on this wrapper too — it's
              // the actual grid item, so it needs to pass the stretched
              // row height down to ServiceCard.
              <div key={service.id} className="fade-up h-full" style={{ animationDelay: `${200 + i * 100}ms` }}>
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}