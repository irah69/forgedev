"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "./globe";
import HeroText from "./text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

/* ── StarField ─────────────────────────────────────────────── */
function StarField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const draw = () => {
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      for (let i = 0; i < 260; i++) {
        const x = Math.random() * c.width;
        const y = Math.random() * c.height;
        const r = Math.random() * 1.1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.1 + Math.random() * 0.55})`;
        ctx.fill();
      }
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ── Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  const [visible, setVisible]   = useState(false);
  const sectionRef               = useRef(null);
  const globeLayerRef            = useRef(null);
  const textLayerRef             = useRef(null);
  const starsLayerRef            = useRef(null);
  const glowLayerRef             = useRef(null);
  const lenisRef                 = useRef(null);

  /* fade-in on mount */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  /* parallax scroll setup */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* smooth scroll */
    const lenis = new Lenis();
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    const section = sectionRef.current;
    if (!section) return;

    /*
      Parallax layers — each moves at a different rate as hero scrolls out.
      Stars move slowest (subtle depth), globe moves mid, text moves fastest
      (feels closest to the viewer), glow moves with globe.
    */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start:   "top top",
        end:     "bottom top",
        scrub:   true,
      },
    });

    // stars — barely drift
    tl.to(starsLayerRef.current, { yPercent: 15,  ease: "none" }, 0);

    // glow blob — mid-drift with globe
    tl.to(glowLayerRef.current,  { yPercent: 30,  ease: "none" }, 0);

    // globe canvas — moves moderately
    tl.to(globeLayerRef.current, { yPercent: 40,  ease: "none" }, 0);

    // text — moves fastest (foreground feel)
    tl.to(textLayerRef.current,  { yPercent: 60,  ease: "none" }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* sticky wrapper — 200vh gives scroll room inside the section */}
      <div
        ref={sectionRef}
        style={{ height: "200vh", background: "#03040f" }}
      >
        {/* sticky viewport */}
        <div
          className="sticky top-0 w-full h-screen overflow-hidden"
          style={{ background: "#03040f" }}
        >
          {/* ── layer 0: stars (slowest) */}
          <div
            ref={starsLayerRef}
            className="absolute inset-0 will-change-transform"
          >
            <StarField />
          </div>

          {/* ── layer 1: radial glow */}
          <div
            ref={glowLayerRef}
            className="absolute inset-0 pointer-events-none will-change-transform"
            style={{
              background:
                "radial-gradient(ellipse 58% 58% at 50% 50%, rgba(40,80,255,0.13) 0%, transparent 70%)",
            }}
          />

          {/* ── layer 2: interactive globe (mid) */}
          <div
            ref={globeLayerRef}
            className="absolute inset-0 will-change-transform"
          >
            <Globe />
          </div>

          {/* ── layer 3: headline text (fastest / foreground) */}
          <div
            ref={textLayerRef}
            className="absolute inset-0 will-change-transform"
          >
            <HeroText visible={visible} />
          </div>

          {/* ── bottom fade into rest of page */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "220px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(3,4,15,0.6) 55%, #03040f 100%)",
              zIndex: 20,
            }}
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap');
      `}</style>
    </>
  );
}