"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ─── THEME ───────────────────────────────────────────────────────────────── */
const T = {
  bg: "#ffffff",
  bgCard: "#000000",

  band: "#2b2d42",       // Space Indigo — reads as premium against a white theme
  bandDeep: "#181926",   // deep indigo for gradient depth

  accent1: "#2b2d42",
  text: "#2b2d42",
};

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "Business websites",
    tag: "LITTLE BERRIES",
    image: "/business.png",
    url: "https://littleberries.co.in/",
  },
  {
    id: 2,
    name: "BRANDING",
    tag: "SLV BANQUET HALLS",
    image: "/slv.png",
    url: "https://slvbanquethalls.com/",
  },
  {
    id: 3,
    name: "E-COMMERCE",
    tag: "AABHARNAM",
    image: "/aabharnam.png",
    url: "https://irah-dev.vercel.app/",
  },
];

/* ─── PARALLAX ENGINE ─────────────────────────────────────────────────────── */
const DEPTH_FACTORS = [0.12, 0.2, 0.08, 0.16];

function useParallax(frameRefs) {
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;

      frameRefs.current.forEach((frame, i) => {
        if (!frame) return;
        const img = frame.firstElementChild;
        if (!img) return;

        const rect = frame.getBoundingClientRect();
        const centerDelta = rect.top + rect.height / 2 - vh / 2;

        const factor = DEPTH_FACTORS[i % DEPTH_FACTORS.length];
        const maxShift = rect.height * 0.15;
        const raw = -centerDelta * factor;
        const clamped = Math.max(-maxShift, Math.min(maxShift, raw));

        img.style.transform = `translate3d(0, ${clamped.toFixed(2)}px, 0) scale(1.15)`;
      });

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [frameRefs]);
}

/* ─── PRODUCT CARD ────────────────────────────────────────────────────────── */
function ProductCard({ product, index, frameRef }) {
  return (
    <div
      onClick={() => product.url && window.open(product.url, "_blank")}
      className="fav-card"
      style={{ animationDelay: `${0.15 + index * 0.12}s` }}
      role={product.url ? "link" : undefined}
      aria-label={product.name}
    >
      <span className="fav-card-index">{String(index + 1).padStart(2, "0")}</span>

      <div className="fav-card-frame" ref={frameRef}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="fav-card-scrim" />

      <div className="fav-card-text">
        <h3>{product.name}</h3>
        <p>{product.tag}</p>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function Favourites() {
  const frameRefs = useRef([]);
  frameRefs.current = [];
  const addFrameRef = (el) => {
    if (el) frameRefs.current.push(el);
  };

  useParallax(frameRefs);

  return (
    <section className="fav-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');

        .fav-root, .fav-root *, .fav-root *::before, .fav-root *::after {
          box-sizing: border-box;
        }

        .fav-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(20px, 3.5vw, 40px);
          background: ${T.bg};
          font-family: 'Syne', sans-serif;
          padding: clamp(24px, 4vw, 48px) 0;
          width: 100%;
        }

        @keyframes favFadeIn {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes favCardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes favBandIn {
          from { opacity: 0; transform: scaleY(0.9); }
          to   { opacity: 1; transform: scaleY(1); }
        }

        .fav-header {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 0 clamp(16px, 5vw, 60px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          animation: favFadeIn 0.6s ease both;
        }

        .fav-heading {
          margin: 0;
          font-size: clamp(22px, 4.5vw, 46px);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          color: ${T.text};
        }

        .fav-view-more {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(12px, 1.6vw, 17px);
          color: ${T.accent1};
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          padding: 8px 14px;
          border-radius: 999px;
          border: 2px solid ${T.accent1};
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
        }
        .fav-view-more:hover {
          gap: 10px;
          color: #fff;
          background: ${T.band};
          border-color: ${T.band};
          box-shadow: 0 8px 22px rgba(43,45,66,0.35);
        }
        .fav-view-more svg { transition: transform 0.3s ease; }
        .fav-view-more:hover svg { transform: translateX(4px); }

        /* Full-bleed band — breaks out of any parent padding */
        .fav-band {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: linear-gradient(135deg, ${T.band} 0%, ${T.bandDeep} 100%);
          height: 520px;
          display: flex;
          align-items: stretch;
          animation: favBandIn 0.7s cubic-bezier(0.23,1,0.32,1) both 0.15s;
          transform-origin: center;
        }

        .fav-band-inner {
          width: 100%;
          height: 100%;
          padding: 8px;
        }

        .fav-grid {
          display: grid;
          grid-template-columns: 25fr 30fr 45fr;
          gap: 16px;
          height: 100%;
          width: 100%;
        }

        .fav-card {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          cursor: pointer;
          background: ${T.bgCard};
          box-shadow: 0 10px 24px rgba(0,0,0,.22);
          transition: transform .4s cubic-bezier(.23,1,.32,1), box-shadow .4s ease;
          animation: favCardIn 0.6s cubic-bezier(0.23,1,0.32,1) both;
        }
        .fav-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 24px 50px rgba(0,0,0,0.4);
        }

        .fav-card-index {
          position: absolute;
          top: 14px;
          left: 16px;
          z-index: 3;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #fff;
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(4px);
          padding: 4px 9px;
          border-radius: 999px;
        }

        /* Parallax frame — clips the oversized image so it can drift without gaps */
        .fav-card-frame {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .fav-card-frame img {
          position: absolute;
          top: -15%;
          left: 0;
          width: 100%;
          height: 130%;
          object-fit: cover;
          will-change: transform;
          transform: translate3d(0, 0, 0) scale(1.15);
        }
        .fav-card:hover .fav-card-frame img {
          filter: brightness(1.04);
        }

        .fav-card-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 35%, transparent 65%);
        }

        .fav-card-text {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 16px;
          color: #fff;
          z-index: 2;
        }
        .fav-card-text h3 {
          margin: 0;
          font-size: clamp(15px, 2.2vw, 22px);
          font-weight: 800;
          line-height: 1.15;
        }
        .fav-card-text p {
          margin: 4px 0 0;
          font-size: clamp(11px, 1.4vw, 13px);
          opacity: 0.85;
        }

       /* Tablet */
@media (max-width: 1023px) {
  .fav-band {
    height: auto;
    padding: clamp(24px, 4vw, 40px) 0;
  }

  .fav-band-inner {
    padding: 0 clamp(12px, 3vw, 20px);
  }

  .fav-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    height: auto;
  }

  /* First two cards = 50% each */
  .fav-grid .fav-card:nth-child(1),
  .fav-grid .fav-card:nth-child(2) {
    grid-column: span 1;
    aspect-ratio: 4 / 3;
  }

  /* Third card = full width */
  .fav-grid .fav-card:nth-child(3) {
    grid-column: 1 / -1;
    aspect-ratio: 16 / 7;
  }
}

/* Mobile */
@media (max-width: 599px) {
  .fav-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .fav-grid .fav-card:nth-child(1),
  .fav-grid .fav-card:nth-child(2) {
    aspect-ratio: 3 / 4;
  }

  .fav-grid .fav-card:nth-child(3) {
    grid-column: 1 / -1;
    aspect-ratio: 16 / 9;
  }

  .fav-card-text {
    left: 14px;
    right: 14px;
    bottom: 12px;
  }

  .fav-card-index {
    top: 10px;
    left: 12px;
    font-size: 11px;
  }
}
      `}</style>

      {/* Header */}
      <div className="fav-header">
        <h2 className="fav-heading">Handpicked</h2>
        <Link href="/work" className="fav-view-more">
          View more
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Full-bleed band */}
      <div className="fav-band">
        <div className="fav-band-inner">
          <div className="fav-grid">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} frameRef={addFrameRef} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}