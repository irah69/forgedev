"use client";

import { useState, useRef, useEffect, useMemo } from "react";

/* ─── PRE-COMPUTED STATIC RANDOMS (avoids SSR hydration mismatch) ────────── */
// Seeded pseudo-random so server & client always produce the same values
function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRand(42);
const STARS = Array.from({ length: 80 }, (_, i) => ({
  left: rand() * 100,
  top: rand() * 100,
  width: rand() * 2 + 1,
  height: rand() * 2 + 1,
  opacity: rand() * 0.5 + 0.1,
  duration: 3 + rand() * 4,
  delay: rand() * 4,
  color: i % 4 === 0 ? "#7B6EF6" : i % 4 === 1 ? "#4FC3F7" : "#ffffff",
}));

const orbRand = seededRand(99);
const ORB_DOTS = Array.from({ length: 200 }, (_, i) => {
  const angle = (i / 200) * Math.PI * 2;
  const r = 200 + Math.sin(i * 0.8) * 40;
  return {
    cx: 300 + Math.cos(angle) * r,
    cy: 300 + Math.sin(angle) * r,
    opacity: 0.2 + orbRand() * 0.5,
    color: i % 3 === 0 ? "#7B6EF6" : i % 3 === 1 ? "#4FC3F7" : "#8B5CF6",
  };
});

/* ─── THEME ─────────────────────────────────────────────────────────────── */
const T = {
  bg: "#03040F",           // midnight navy
  bgCard: "#080B1A",       // card bg
  bgCardHover: "#0D1128",  // card hover bg
  accent1: "#7B6EF6",      // purple
  accent2: "#4FC3F7",      // cyan-blue
  accent3: "#8B5CF6",      // violet
  text: "#FFFFFF",
  textMuted: "#8892B0",
  border: "rgba(123,110,246,0.18)",
  borderHover: "rgba(79,195,247,0.45)",
  star: "#7B6EF6",
};

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "SL GRANO",
    tag: "STVZO",
    description: "Front light for bicycles",
    price: "€229,00",
    lumen: "900 lm",
    distance: "230 m",
    badge: "OSRAM",
    rating: 5,
    image: null,
    gradient: "linear-gradient(135deg,#1a1440 0%,#0D1128 100%)",
  },
  {
    id: 2,
    name: "ROTLICHT PRO",
    tag: "STVZO",
    description: "Taillight for bicycles",
    price: "€189,00",
    lumen: "128 lm",
    distance: null,
    badge: "OSRAM",
    rating: 5,
    image: null,
    gradient: "linear-gradient(135deg,#0e1a2e 0%,#0D1128 100%)",
  },
  {
    id: 3,
    name: "PENTA PRO HEADLAMP 5700K",
    tag: null,
    description: "Headlamp with external battery",
    price: "€289,00",
    lumen: "1400 lm",
    distance: "140 m",
    badge: "CREE+",
    rating: 0,
    image: null,
    gradient: "linear-gradient(135deg,#131033 0%,#0D1128 100%)",
  },
  {
    id: 4,
    name: "ALPHA EDGE 2800",
    tag: "STVZO",
    description: "High-performance trail light",
    price: "€349,00",
    lumen: "2800 lm",
    distance: "300 m",
    badge: "OSRAM",
    rating: 5,
    image: null,
    gradient: "linear-gradient(135deg,#0a1a30 0%,#0D1128 100%)",
  },
];

/* ─── STAR RATING ────────────────────────────────────────────────────────── */
function StarRating({ count, max = 5 }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 12 12">
          <defs>
            <linearGradient id={`sg${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={T.accent1} />
              <stop offset="100%" stopColor={T.accent2} />
            </linearGradient>
          </defs>
          <polygon
            points="6,1 7.5,4.5 11,4.8 8.5,7 9.2,10.5 6,8.8 2.8,10.5 3.5,7 1,4.8 4.5,4.5"
            fill={i < count ? `url(#sg${i})` : "none"}
            stroke={i < count ? T.accent1 : "#2a2a4a"}
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

/* ─── DOT GRID (cosmic background orb) ──────────────────────────────────── */
function CosmicOrb() {
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "600px",
      pointerEvents: "none",
      zIndex: 0,
    }}>
      {/* Glow layers */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "50%",
        background: `radial-gradient(ellipse, rgba(123,110,246,0.12) 0%, rgba(79,195,247,0.06) 40%, transparent 70%)`,
        animation: "cosmicPulse 6s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", inset: "60px",
        borderRadius: "50%",
        background: `radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)`,
        animation: "cosmicPulse 6s ease-in-out infinite 1s",
      }} />
      {/* Dot ring */}
      <svg width="600" height="600" viewBox="0 0 600 600" style={{ position: "absolute", inset: 0 }}>
        {ORB_DOTS.map((dot, i) => (
  <circle
    key={i}
    cx={dot.cx.toFixed(3)}
    cy={dot.cy.toFixed(3)}
    r="1.5"
    fill={dot.color}
    opacity={dot.opacity.toFixed(3)}
  />
))}
      </svg>
    </div>
  );
}

/* ─── PRODUCT CARD ───────────────────────────────────────────────────────── */
function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "0 0 calc(33.333% - 18px)",
        minWidth: "280px",
        background: hovered ? T.bgCardHover : T.bgCard,
        border: `1px solid ${hovered ? T.borderHover : T.border}`,
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 30px 70px rgba(3,4,15,0.8), 0 0 40px rgba(123,110,246,0.15), inset 0 1px 0 rgba(79,195,247,0.1)`
          : `0 4px 24px rgba(3,4,15,0.6)`,
        position: "relative",
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: hovered
          ? `linear-gradient(90deg, transparent, ${T.accent2}, ${T.accent1}, transparent)`
          : `linear-gradient(90deg, transparent, ${T.accent1}44, transparent)`,
        transition: "all 0.4s ease",
      }} />

      {/* Meta bar */}
      <div style={{ padding: "16px 18px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {product.lumen && (
            <span style={{ fontSize: "9px", color: T.textMuted, letterSpacing: "0.12em", fontFamily: "monospace" }}>
              ✦ LUMEN: {product.lumen}
            </span>
          )}
          {product.distance && (
            <span style={{ fontSize: "9px", color: T.textMuted, letterSpacing: "0.12em", fontFamily: "monospace" }}>
              ▼ DISTANCE: {product.distance}
            </span>
          )}
          {product.tag && (
            <span style={{ fontSize: "9px", color: T.textMuted, letterSpacing: "0.12em", fontFamily: "monospace" }}>
              ◈ STVZO APPROVAL
            </span>
          )}
        </div>
        {/* Badge */}
        <div style={{
          background: product.badge === "CREE+"
            ? "rgba(79,195,247,0.12)"
            : "rgba(123,110,246,0.15)",
          border: `1px solid ${product.badge === "CREE+" ? T.accent2 + "55" : T.accent1 + "55"}`,
          padding: "3px 9px",
          borderRadius: "4px",
          fontSize: "9px",
          fontWeight: "700",
          letterSpacing: "0.12em",
          color: product.badge === "CREE+" ? T.accent2 : T.accent1,
        }}>
          {product.badge}
        </div>
      </div>

      {/* Image area */}
      <div style={{
        height: "220px",
        background: product.gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at center, ${T.accent1}12 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s",
        }} />
        {/* Grid lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`} stroke={T.accent1} strokeWidth="0.5" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v${i}`} x1={`${(i + 1) * 12.5}%`} y1="0" x2={`${(i + 1) * 12.5}%`} y2="100%" stroke={T.accent1} strokeWidth="0.5" />
          ))}
        </svg>

        {/* Placeholder — replace with <img src={product.image} alt={product.name} style={{ objectFit: "contain", width: "70%", height: "70%" }} /> */}
        <div style={{
          width: "160px", height: "120px",
          border: `1px solid ${T.accent1}22`,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: T.accent1 + "40",
          fontSize: "10px",
          letterSpacing: "0.15em",
          fontFamily: "monospace",
          background: "rgba(123,110,246,0.03)",
        }}>
          PRODUCT IMAGE
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "16px 18px 20px" }}>
        <StarRating count={product.rating} />

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
          <h3 style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "900",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontFamily: "'Syne', 'Bebas Neue', Impact, sans-serif",
            background: hovered
              ? `linear-gradient(90deg, ${T.accent1}, ${T.accent2})`
              : "none",
            WebkitBackgroundClip: hovered ? "text" : "unset",
            WebkitTextFillColor: hovered ? "transparent" : T.text,
            transition: "all 0.3s",
          }}>
            {product.name}
          </h3>
          {product.tag && (
            <span style={{
              background: `linear-gradient(135deg, ${T.accent1}22, ${T.accent2}22)`,
              border: `1px solid ${T.accent1}44`,
              color: T.accent1,
              fontSize: "8px",
              fontWeight: "800",
              padding: "2px 7px",
              borderRadius: "3px",
              letterSpacing: "0.14em",
            }}>
              {product.tag}
            </span>
          )}
        </div>

        <p style={{ fontSize: "12px", color: T.textMuted, margin: "5px 0 14px", fontStyle: "italic" }}>
          {product.description}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontSize: "16px",
            fontWeight: "800",
            background: `linear-gradient(90deg, ${T.accent1}, ${T.accent2})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {product.price}
          </span>

          <button style={{
            background: hovered
              ? `linear-gradient(135deg, ${T.accent1}, ${T.accent3})`
              : "transparent",
            border: `1px solid ${hovered ? "transparent" : T.accent1 + "55"}`,
            color: hovered ? "#fff" : T.accent1,
            padding: "7px 18px",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s",
            borderRadius: "4px",
            fontWeight: "700",
            boxShadow: hovered ? `0 0 20px ${T.accent1}44` : "none",
          }}>
            View
          </button>
        </div>
      </div>

      {/* Bottom glow on hover */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${T.accent1}, ${T.accent2}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function Favourites() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const trackRef = useRef(null);
  const visibleCount = 3;
  const maxIndex = products.length - visibleCount;

  const handlePrev = () => setScrollIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setScrollIndex((i) => Math.min(maxIndex, i + 1));

  useEffect(() => {
    if (!trackRef.current) return;
    const cardWidth = (trackRef.current.children[0]?.offsetWidth || 0) + 27;
    trackRef.current.style.transform = `translateX(-${scrollIndex * cardWidth}px)`;
  }, [scrollIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap');

        @keyframes cosmicPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }

        .fav-nav-btn {
          width: 44px; height: 44px;
          background: rgba(123,110,246,0.08);
          border: 1px solid rgba(123,110,246,0.25);
          color: #7B6EF6;
          font-size: 20px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .fav-nav-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(123,110,246,0.25), rgba(79,195,247,0.15));
          border-color: #4FC3F7;
          color: #4FC3F7;
          box-shadow: 0 0 20px rgba(123,110,246,0.25);
        }
        .fav-nav-btn:disabled {
          opacity: 0.25; cursor: not-allowed;
        }
      `}</style>

      <section style={{
        background: T.bg,
        padding: "90px 60px",
        minHeight: "100vh",
        fontFamily: "'Syne', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Starfield */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          {STARS.map((star, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.width}px`,
              height: `${star.height}px`,
              borderRadius: "50%",
              background: star.color,
              opacity: star.opacity,
              animation: `floatDot ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }} />
          ))}
        </div>

        {/* Cosmic orb behind header */}
        <CosmicOrb />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Top label */}
          <p style={{
            textAlign: "center",
            fontSize: "11px",
            letterSpacing: "0.4em",
            color: T.accent2,
            marginBottom: "16px",
            opacity: 0.8,
            animation: "fadeSlideUp 0.6s ease both",
          }}>
            DIGITAL · INNOVATION · GROWTH
          </p>

          {/* Header row */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "56px",
            animation: "fadeSlideUp 0.7s ease both 0.1s",
          }}>
            <div>
              <div style={{ display: "flex", gap: "12px", alignItems: "baseline" }}>
                <span style={{
                  fontSize: "clamp(13px,1.5vw,17px)",
                  fontWeight: "700",
                  color: T.accent1,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}>MOST</span>
              </div>
              <h2 style={{
                margin: 0,
                fontSize: "clamp(44px, 6vw, 82px)",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                lineHeight: 0.88,
                background: `linear-gradient(90deg, ${T.text} 40%, ${T.accent1} 70%, ${T.accent2} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Syne', sans-serif",
              }}>
                FAVOURITES
              </h2>
              {/* Animated underline */}
              <div style={{
                marginTop: "14px",
                height: "2px",
                width: "120px",
                background: `linear-gradient(90deg, ${T.accent1}, ${T.accent2}, transparent)`,
                borderRadius: "2px",
              }} />
            </div>

            {/* Nav */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="fav-nav-btn" onClick={handlePrev} disabled={scrollIndex === 0}>‹</button>
              <button className="fav-nav-btn" onClick={handleNext} disabled={scrollIndex === maxIndex}>›</button>
            </div>
          </div>

          {/* Cards */}
          <div style={{ overflow: "hidden" }}>
            <div
              ref={trackRef}
              style={{
                display: "flex",
                gap: "27px",
                transition: "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              {products.map((product, i) => (
                <div key={product.id} style={{
                  animation: `fadeSlideUp 0.6s ease both ${0.15 + i * 0.1}s`,
                  flex: "0 0 calc(33.333% - 18px)",
                  minWidth: "280px",
                }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "44px" }}>
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setScrollIndex(Math.min(i, maxIndex))}
                style={{
                  width: i === scrollIndex ? "32px" : "8px",
                  height: "3px",
                  background: i === scrollIndex
                    ? `linear-gradient(90deg, ${T.accent1}, ${T.accent2})`
                    : "rgba(123,110,246,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  borderRadius: "3px",
                  padding: 0,
                }}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}