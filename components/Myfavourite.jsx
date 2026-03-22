"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ─── PRE-COMPUTED STATIC RANDOMS ─────────────────────────────────────────── */
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

/* ─── THEME ───────────────────────────────────────────────────────────────── */
const T = {
  bg: "#03040F",
  bgCard: "#080B1A",
  bgCardHover: "#0D1128",
  accent1: "#7B6EF6",
  accent2: "#4FC3F7",
  accent3: "#8B5CF6",
  text: "#FFFFFF",
  textMuted: "#8892B0",
  border: "rgba(123,110,246,0.18)",
  borderHover: "rgba(79,195,247,0.45)",
};

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "Murgan Collections",
    tag: "E-Commerce Website",
    description: "A modern online clothing store with product browsing, cart, and secure checkout features.",
    price: "Starting from €19,99",
    category: "Fashion & Clothing",
    technology: "React, Node.js, MongoDB",
    badge: "Featured Project",
    rating: 5,
    gradient: "linear-gradient(135deg,#1a1440 0%,#0D1128 100%)",
    image: "/murgan.png",
    url: "https://murgan-ui.vercel.app/",
  },
{
  id: 2,
  name: "Little Berries",
  tag: "Playschool & Daycare                .",
  description: "A joyful early learning playschool website featuring programs for Play Group to Senior KG, activity classes like Chess, Dance & Taekwondo, admissions info, photo gallery, and a parent portal.",
  price: "Informational Website",
  category: "Education & Childcare",
  technology: "Next.js, Tailwind CSS",
  badge: "Education",
  rating: 5,
  gradient: "linear-gradient(135deg,#fff7ed 0%,#fde68a 100%)",
  image: "/littleberries.png",
  url: "https://little-berries.vercel.app/",
}
];

/* ─── STAR RATING ─────────────────────────────────────────────────────────── */
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

/* ─── COSMIC ORB ──────────────────────────────────────────────────────────── */
function CosmicOrb({ size = 600 }) {
  const half = size / 2;
  const scaledDots = ORB_DOTS.map((dot) => ({
    ...dot,
    cx: (dot.cx / 600) * size,
    cy: (dot.cy / 600) * size,
  }));

  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: `${size}px`,
      height: `${size}px`,
      pointerEvents: "none",
      zIndex: 0,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "50%",
        background: `radial-gradient(ellipse, rgba(123,110,246,0.12) 0%, rgba(79,195,247,0.06) 40%, transparent 70%)`,
        animation: "cosmicPulse 6s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", inset: `${size * 0.1}px`,
        borderRadius: "50%",
        background: `radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)`,
        animation: "cosmicPulse 6s ease-in-out infinite 1s",
      }} />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", inset: 0 }}>
        {scaledDots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx.toFixed(2)}
            cy={dot.cy.toFixed(2)}
            r="1.5"
            fill={dot.color}
            opacity={dot.opacity.toFixed(3)}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── PRODUCT CARD ────────────────────────────────────────────────────────── */
function ProductCard({ product, isMobile, bp = "desktop" }) {
  const [hovered, setHovered] = useState(false);

  // Redirect to product.url on click
  const handleClick = () => {
    if (product.url) {
      window.open(product.url, "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        background: hovered ? T.bgCardHover : T.bgCard,
        border: `1px solid ${hovered ? T.borderHover : T.border}`,
        borderRadius: "12px",
        overflow: "hidden",
        cursor: product.url ? "pointer" : "default",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 30px 70px rgba(3,4,15,0.8), 0 0 40px rgba(123,110,246,0.15), inset 0 1px 0 rgba(79,195,247,0.1)`
          : `0 4px 24px rgba(3,4,15,0.6)`,
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      tabIndex={0}
      role={product.url ? "link" : undefined}
      aria-label={product.name}
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
      <div style={{ padding: bp === "xs" ? "10px 10px 6px" : "14px 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {product.lumen && (
            <span style={{ fontSize: bp === "xs" ? "7.5px" : "9px", color: T.textMuted, letterSpacing: "0.08em", fontFamily: "monospace" }}>
              ✦ {bp === "xs" ? product.lumen : `LUMEN: ${product.lumen}`}
            </span>
          )}
          {product.distance && (
            <span style={{ fontSize: bp === "xs" ? "7.5px" : "9px", color: T.textMuted, letterSpacing: "0.08em", fontFamily: "monospace" }}>
              ▼ {bp === "xs" ? product.distance : `DISTANCE: ${product.distance}`}
            </span>
          )}
          {product.tag && (
            <span style={{ fontSize: bp === "xs" ? "7.5px" : "9px", color: T.textMuted, letterSpacing: "0.08em", fontFamily: "monospace" }}>
              ◈ {bp === "xs" ? "STVZO" : "STVZO APPROVAL"}
            </span>
          )}
        </div>
        <div style={{
          background: product.badge === "CREE+" ? "rgba(79,195,247,0.12)" : "rgba(123,110,246,0.15)",
          border: `1px solid ${product.badge === "CREE+" ? T.accent2 + "55" : T.accent1 + "55"}`,
          padding: bp === "xs" ? "2px 5px" : "3px 9px",
          borderRadius: "4px",
          fontSize: bp === "xs" ? "7.5px" : "9px",
          fontWeight: "700",
          letterSpacing: "0.08em",
          color: product.badge === "CREE+" ? T.accent2 : T.accent1,
          flexShrink: 0,
        }}>
          {product.badge}
        </div>
      </div>

      {/* Image area */}
      <div style={{
        height: bp === "xs" ? "82px" : bp === "mobile" ? "105px" : "180px",
        background: product.gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at center, ${T.accent1}12 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s",
        }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`} stroke={T.accent1} strokeWidth="0.5" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v${i}`} x1={`${(i + 1) * 12.5}%`} y1="0" x2={`${(i + 1) * 12.5}%`} y2="100%" stroke={T.accent1} strokeWidth="0.5" />
          ))}
        </svg>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              border: `1px solid ${T.accent1}22`,
              background: "rgba(123,110,246,0.03)",
              zIndex: 1,
            }}
            loading="lazy"
          />
        ) : (
          <div style={{
            width: isMobile ? "80px" : "140px",
            height: isMobile ? "52px" : "100px",
            border: `1px solid ${T.accent1}22`,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.accent1 + "40",
            fontSize: isMobile ? "7px" : "10px",
            letterSpacing: "0.15em",
            fontFamily: "monospace",
            background: "rgba(123,110,246,0.03)",
          }}>
            {isMobile ? "IMG" : "PRODUCT IMAGE"}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: bp === "xs" ? "10px 10px 14px" : "14px 16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <StarRating count={product.rating} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
          <h3 style={{
            margin: 0,
            fontSize: "clamp(11px, 2.5vw, 16px)",
            fontWeight: "900",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontFamily: "'Syne', sans-serif",
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
              flexShrink: 0,
            }}>
              {product.tag}
            </span>
          )}
        </div>

        <p style={{ fontSize: "12px", color: T.textMuted, margin: "5px 0 0", fontStyle: "italic", flex: 1 }}>
          {product.description}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px" }}>

          <button style={{
            background: hovered
              ? `linear-gradient(135deg, ${T.accent1}, ${T.accent3})`
              : "transparent",
            border: `1px solid ${hovered ? "transparent" : T.accent1 + "55"}`,
            color: hovered ? "#fff" : T.accent1,
            padding: "7px 16px",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s",
            borderRadius: "4px",
            fontWeight: "700",
            boxShadow: hovered ? `0 0 20px ${T.accent1}44` : "none",
            flexShrink: 0,
          }}>
            View
          </button>
        </div>
      </div>

      {/* Bottom glow */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${T.accent1}, ${T.accent2}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />
    </div>
  );
}

/* ─── HOOK: RESPONSIVE BREAKPOINT ────────────────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState("desktop");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setBp("xs");
      else if (w < 768) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else if (w < 1280) setBp("laptop");
      else setBp("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function Favourites() {
  const bp = useBreakpoint();
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  // Touch / swipe state
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Cards visible per breakpoint — mobile shows 2
  const visibleCount =
    bp === "xs" ? 2 :
    bp === "mobile" ? 2 :
    bp === "tablet" ? 2 :
    bp === "laptop" ? 3 : 3;

  const maxIndex = Math.max(0, products.length - visibleCount);
  const isMobile = bp === "xs" || bp === "mobile";
  const showNavButtons = !isMobile; // arrows only on tablet+

  // Clamp scrollIndex when visible count changes
  useEffect(() => {
    setScrollIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  // Animate track
  useEffect(() => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[0];
    if (!card) return;
    const gap = isMobile ? 10 : bp === "tablet" ? 20 : 27;
    const cardWidth = card.offsetWidth + gap;
    trackRef.current.style.transform = `translateX(-${scrollIndex * cardWidth}px)`;
  }, [scrollIndex, bp, isMobile]);

  const handlePrev = useCallback(() => setScrollIndex((i) => Math.max(0, i - 1)), []);
  const handleNext = useCallback(() => setScrollIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  // Touch handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      dx > 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
  };

  // Responsive orb size
  const orbSize =
    bp === "xs" ? 280 :
    bp === "mobile" ? 360 :
    bp === "tablet" ? 460 : 600;

  // Section padding
  const sectionPadding =
    bp === "xs" ? "50px 12px 60px" :
    bp === "mobile" ? "60px 16px 70px" :
    bp === "tablet" ? "80px 36px" :
    bp === "laptop" ? "90px 48px" : "90px 60px";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap');

        .fav-root *, .fav-root *::before, .fav-root *::after { box-sizing: border-box; }

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
          width: 40px; height: 40px;
          background: rgba(123,110,246,0.08);
          border: 1px solid rgba(123,110,246,0.25);
          color: #7B6EF6;
          font-size: 20px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .fav-nav-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(123,110,246,0.25), rgba(79,195,247,0.15));
          border-color: #4FC3F7;
          color: #4FC3F7;
          box-shadow: 0 0 20px rgba(123,110,246,0.25);
        }
        .fav-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }

        .fav-card-wrapper {
          flex: 0 0 calc(33.333% - 18px);
          min-width: 0;
        }

        /* Responsive card widths — 2 cards on mobile, 2 on tablet, 3 on desktop */
        @media (max-width: 767px) {
          .fav-card-wrapper { flex: 0 0 calc(50% - 5px); }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .fav-card-wrapper { flex: 0 0 calc(50% - 10px); }
        }
        @media (min-width: 1024px) {
          .fav-card-wrapper { flex: 0 0 calc(33.333% - 18px); }
        }

        /* Header layout — now handled inline, arrows are absolute */

        .fav-nav-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Progress indicator for mobile */
        .fav-progress-text {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: rgba(123,110,246,0.7);
          letter-spacing: 0.1em;
        }

        /* Dots */
        .fav-dot-btn {
          border: none;
          cursor: pointer;
          transition: all 0.35s ease;
          border-radius: 3px;
          padding: 0;
          height: 3px;
        }
        .fav-dot-btn:focus { outline: 2px solid #7B6EF6; outline-offset: 3px; }
      `}</style>

      <section
        ref={sectionRef}
        className="fav-root"
        style={{
          background: T.bg,
          padding: sectionPadding,
          minHeight: "100vh",
          fontFamily: "'Syne', sans-serif",
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
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

        <CosmicOrb size={orbSize} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

          {/* Label */}
          <p style={{
            textAlign: "center",
            fontSize: bp === "xs" ? "9px" : "11px",
            letterSpacing: "0.4em",
            color: T.accent2,
            marginBottom: "14px",
            opacity: 0.8,
            animation: "fadeSlideUp 0.6s ease both",
          }}>
            DIGITAL · INNOVATION · GROWTH
          </p>

          {/* Header — title flush-left with cards, arrows absolute top-right */}
          <div style={{
            position: "relative",
            marginBottom: bp === "xs" ? "24px" : "40px",
            animation: "fadeSlideUp 0.7s ease both 0.1s",
          }}>
            {/* Nav arrows — desktop/tablet only, hidden on mobile */}
            {showNavButtons && (
              <div className="fav-nav-group" style={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
              }}>
                <button className="fav-nav-btn" onClick={handlePrev} disabled={scrollIndex === 0} aria-label="Previous">‹</button>
                <button className="fav-nav-btn" onClick={handleNext} disabled={scrollIndex === maxIndex} aria-label="Next">›</button>
              </div>
            )}

            {/* Title — strictly left-aligned, margin: 0 */}


            <h2 style={{
              margin: 0,
              padding: 0,
              textAlign: "left",
              fontSize: isMobile ? "clamp(22px, 7.5vw, 30px)" : "clamp(44px, 6vw, 82px)",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: isMobile ? "0.01em" : "0.02em",
              lineHeight: 1,
              background: `linear-gradient(90deg, ${T.text} 40%, ${T.accent1} 70%, ${T.accent2} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Syne', sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: showNavButtons ? "calc(100% - 120px)" : "100%",
            }}>
              FAVOURITES
            </h2>

            <div style={{
              marginTop: "12px",
              height: "2px",
              width: bp === "xs" ? "80px" : "120px",
              background: `linear-gradient(90deg, ${T.accent1}, ${T.accent2}, transparent)`,
              borderRadius: "2px",
              marginLeft: 0,
            }} />
          </div>

          {/* Cards track */}
          <div
            style={{ overflow: "hidden", borderRadius: "4px", width: "100%" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={trackRef}
              style={{
                display: "flex",
                gap: isMobile ? "10px" : bp === "tablet" ? "20px" : "27px",
                transition: "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
                alignItems: "stretch",
              }}
            >
              {products.map((product, i) => (
                <div
                  key={product.id}
                  className="fav-card-wrapper"
                  style={{ animation: `fadeSlideUp 0.6s ease both ${0.15 + i * 0.1}s` }}
                >
                  <ProductCard product={product} isMobile={isMobile} bp={bp} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: bp === "xs" ? "28px" : "44px" }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className="fav-dot-btn"
                onClick={() => setScrollIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === scrollIndex ? "32px" : "8px",
                  background: i === scrollIndex
                    ? `linear-gradient(90deg, ${T.accent1}, ${T.accent2})`
                    : "rgba(123,110,246,0.2)",
                }}
              />
            ))}
          </div>

          {/* Swipe hint — mobile only, shown always as subtle text */}
          {isMobile && (
            <p style={{
              textAlign: "center",
              marginTop: "14px",
              fontSize: "9px",
              color: "rgba(136,146,176,0.3)",
              letterSpacing: "0.25em",
              fontFamily: "monospace",
            }}>
              ← SWIPE →
            </p>
          )}

        </div>
      </section>
    </>
  );
}