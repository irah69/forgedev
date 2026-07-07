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
  color: i % 4 === 0 ? "#C9A227" : i % 4 === 1 ? "#E8C766" : "#ffffff",
}));

const orbRand = seededRand(99);
const ORB_DOTS = Array.from({ length: 200 }, (_, i) => {
  const angle = (i / 200) * Math.PI * 2;
  const r = 200 + Math.sin(i * 0.8) * 40;
  return {
    cx: 300 + Math.cos(angle) * r,
    cy: 300 + Math.sin(angle) * r,
    opacity: 0.2 + orbRand() * 0.5,
    color: i % 3 === 0 ? "#C9A227" : i % 3 === 1 ? "#E8C766" : "#8A6D3B",
  };
});

/* ─── THEME ───────────────────────────────────────────────────────────────── */
const T = {
  // Backgrounds
  bg: "rgb(255, 255, 255)",          // Platinum
  bgCard: "#ffffff",
  bgCardHover: "#f7fafa", // Platinum 800

  // Primary Accent
  accent1: "#2b2d42",     // Space Indigo
  accent2: "#8d99ae",     // Lavender Grey
  accent3: "#ef233c",     // Punch Red

  // Typography
  text: "#2b2d42",
  textMuted: "#8d99ae",

  // Borders
  border: "#d2d6df",
  borderHover: "#2b2d42",

  // Shadows
  shadow: "rgba(43,45,66,0.08)",
  shadowHover: "rgba(43,45,66,0.15)",

  // Buttons
  button: "#2b2d42",
  buttonHover: "#ef233c",
};
/* ─── DATA ────────────────────────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "AABHARNAM JWELLS",
    tag: "E-Commerce Website",
    description: "A modern online clothing store with product browsing, cart, and secure checkout features.",
    price: "Starting from €19,99",
    category: "Fashion & Clothing",
    technology: "React, Node.js, MongoDB",
    badge: "Featured Project",
    rating: 5,
    gradient: "linear-gradient(135deg,#1a1440 0%,#0D1128 100%)",
    image: "/aabharnam.png",
    url: "https://murgan-ui.vercel.app/",
  },
{
  id: 2,
  name: "SLV Banquet Halls",
  tag: "Weddings & Events Venue",
  description: "A modern banquet hall website showcasing premium wedding venues, event spaces, catering services, and custom event experiences with a strong focus on local SEO and lead generation.",
  price: "Informational Website",
  category: "Hospitality & Events",
  technology: "Next.js, Tailwind CSS",
  badge: "Hospitality",
  rating: 5,
  gradient: "linear-gradient(135deg,#f0f9ff 0%,#e0e7ff 100%)",
  image: "/slv.png",
  url: "https://slvbanquethalls.com/",
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
            stroke={i < count ? T.accent1 : "#3a3428"}
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

/* ─── COSMIC ORB ──────────────────────────────────────────────────────────── */


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
          ? `0 30px 70px rgba(0,0,0,0.55), 0 0 40px rgba(201,162,39,0.18), inset 0 1px 0 rgba(232,199,102,0.12)`
          : `0 4px 24px rgba(0,0,0,0.4)`,
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      tabIndex={0}
      role={product.url ? "link" : undefined}
      aria-label={product.name}
    >


      {/* Image area */}
{/* Image */}
<div
  style={{
    width: "100%",
    aspectRatio: "3 / 4",
    overflow: "hidden",
    position: "relative",
    background: "#111",
    flexShrink: 0,
  }}
>
  <img
    src={product.image}
    alt={product.name}
    loading="lazy"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: "transform .7s cubic-bezier(.22,.61,.36,1)",
      transform: hovered ? "scale(1.04)" : "scale(1)",
    }}
  />

  {/* Dark gradient for readability */}
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "35%",
      background:
        "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.45), transparent)",
    }}
  />

  {/* Bottom Text */}
  <div
    style={{
      position: "absolute",
      left: "20px",
      right: "20px",
      bottom: "20px",
      color: "#fff",
      zIndex: 2,
    }}
  >
    <h3
      style={{
        margin: 0,
        fontSize: "28px",
        fontWeight: 700,
        lineHeight: 1.1,
      }}
    >
      {product.name}
    </h3>

    <p
      style={{
        marginTop: "6px",
        fontSize: "16px",
        opacity: 0.85,
      }}
    >
      {product.tag}
    </p>
  </div>
</div>


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
          background: rgba(201,162,39,0.08);
          border: 1px solid rgba(201,162,39,0.3);
          color: #C9A227;
          font-size: 20px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .fav-nav-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(201,162,39,0.28), rgba(232,199,102,0.16));
          border-color: #E8C766;
          color: #0B0B0B;
          box-shadow: 0 0 20px rgba(201,162,39,0.3);
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
          color: rgba(201,162,39,0.8);
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
        .fav-dot-btn:focus { outline: 2px solid #C9A227; outline-offset: 3px; }
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

        

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>



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
              background: `linear-gradient(90deg, #0B0B0B 40%, ${T.accent1} 70%, ${T.accent2} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Syne', sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: showNavButtons ? "calc(100% - 120px)" : "100%",
            }}>
              Handpicked
            </h2>

            <div style={{
              marginTop: "12px",
              height: "2px",
              width: bp === "xs" ? "80px" : "120px",
              background: `linear-gradient(90deg, ${T.accent1}, ${T.accent3}, transparent)`,
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


          {/* Swipe hint — mobile only, shown always as subtle text */}
          {isMobile && (
            <p style={{
              textAlign: "center",
              marginTop: "14px",
              fontSize: "9px",
              color: "rgba(138,109,59,0.4)",
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