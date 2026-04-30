'use client';

import { useEffect, useRef, useState } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const BIG_TEXTS = ["EXPLORE", "WEBSITES", "UI/UX", "SEO", "PERFORMANCE", "GROWTH"];

const SERVICES = [
  {
    title: "WEB DEV",    tag: "FULL STACK",
    desc:  "End-to-end web development with modern frameworks. React, Next.js, Node.js.",
    stat1: "STACK: NEXT.JS",    stat2: "DEPLOY: VERCEL",
  },
  {
    title: "SEO",        tag: "SEARCH OPT",
    desc:  "Data-driven SEO strategies. Technical audits, on-page and off-page optimization.",
    stat1: "RANK: TOP 3",       stat2: "TRAFFIC: +200%",
  },
  {
    title: "E-COMMERCE", tag: "ONLINE STORE",
    desc:  "High-converting stores on Shopify, WooCommerce or custom-built platforms.",
    stat1: "PLATFORM: SHOPIFY", stat2: "CVR: +35%",
  },
  {
    title: "WEB MAINT",  tag: "UPTIME GUARD",
    desc:  "24/7 monitoring, updates, backups, security patches and performance tuning.",
    stat1: "UPTIME: 99.9%",     stat2: "SLA: ASSURED",
  },
];

// Sequence: [text, card, card, card] × 5 + text  →  21 items total
// item[0]  = EXPLORE  (baseZ = 0)
// item[20] = GROWTH   (baseZ = -20 × Z_GAP)
const Z_GAP      = 800;   // same as original
const CAM_SPEED  = 2.5;   // same as original
const STAR_COUNT = 150;
const LERP       = 0.08;  // ← ORIGINAL lerp value restored

interface Item {
  el:    HTMLElement;
  type:  "card" | "text" | "star";
  x:     number;
  y:     number;
  rot:   number;
  baseZ: number;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function HyperScroll() {
  const worldRef    = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // scroll state (no Lenis — direct clamped wheel)
  const rawScroll    = useRef(0);   // clamped target
  const smoothScroll = useRef(0);   // lerped value  ← drives rendering
  const velocity     = useRef(0);   // for chromatic / warp fx

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const items  = useRef<Item[]>([]);
  const rafId  = useRef<number>(0);
  const lastT  = useRef(0);
  const maxScroll = useRef(0);

  const [fps,   setFps]   = useState(60);
  const [vel,   setVel]   = useState("0.00");
  const [coord, setCoord] = useState("000.000");

  // ── build scene ─────────────────────────────────────────────────────────
  useEffect(() => {
    const world    = worldRef.current!;
    const viewport = viewportRef.current!;

    const list: Item[] = [];

    // ── sequence ──
    const seq: Array<{ kind: "text"; ti: number } | { kind: "card"; si: number }> = [];
    for (let g = 0; g < BIG_TEXTS.length; g++) {
      seq.push({ kind: "text", ti: g });
      if (g < BIG_TEXTS.length - 1)
        for (let c = 0; c < 3; c++)
          seq.push({ kind: "card", si: (g * 3 + c) % SERVICES.length });
    }
    const total = seq.length; // 21

    // clamped scroll bounds
    maxScroll.current = ((total - 1) * Z_GAP) / CAM_SPEED;

    seq.forEach((s, i) => {
      const wrapper = document.createElement("div");
      wrapper.style.cssText =
        "position:absolute;left:0;top:0;backface-visibility:hidden;" +
        "transform-origin:center center;display:flex;align-items:center;justify-content:center;";

      const baseZ = -i * Z_GAP;

      if (s.kind === "text") {
        const txt = document.createElement("div");
        txt.style.cssText = [
          "font-size:15vw",
          "font-weight:800",
          "color:transparent",
          "-webkit-text-stroke:2px rgba(255,255,255,0.15)",
          "text-transform:uppercase",
          "white-space:nowrap",
          "transform:translate(-50%,-50%)",
          "pointer-events:none",
          "letter-spacing:-0.5rem",
          "mix-blend-mode:overlay",
          "font-family:'Syncopate',sans-serif",
        ].join(";");
        txt.innerText = BIG_TEXTS[s.ti];
        wrapper.appendChild(txt);
        list.push({ el: wrapper, type: "text", x: 0, y: 0, rot: 0, baseZ });

      } else {
        const svc    = SERVICES[s.si];
        const randId = Math.floor(Math.random() * 9999);
        const card   = document.createElement("div");

        const angle = (i / total) * Math.PI * 6;
        const x     = Math.cos(angle) * (window.innerWidth  * 0.3);
        const y     = Math.sin(angle) * (window.innerHeight * 0.3);
        const rot   = (Math.random() - 0.5) * 30;

        // ── CARD STYLES: same geometry as original, more opaque bg ──
        card.style.cssText = [
          "width:320px",
          "height:460px",
          "background:rgba(14,14,14,0.88)",          // ← more opaque
          "border:1px solid rgba(255,255,255,0.12)",
          "position:relative",
          "padding:2rem",
          "display:flex",
          "flex-direction:column",
          "justify-content:space-between",
          "backdrop-filter:blur(12px)",
          "-webkit-backdrop-filter:blur(12px)",
          "box-shadow:0 0 0 1px rgba(0,0,0,0.6),0 24px 60px rgba(0,0,0,0.75),inset 0 1px 0 rgba(255,255,255,0.05)",
          "transition:all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
          "transform:translate(-50%,-50%)",
          "font-family:'Syncopate',sans-serif",
          "cursor:crosshair",
        ].join(";");

        card.innerHTML = `
          <div style="border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:1rem;margin-bottom:1rem;
                      display:flex;justify-content:space-between;align-items:center;">
            <span style="font-family:'JetBrains Mono',monospace;color:#ff003c;font-size:.8rem;letter-spacing:.1em;">
              ID-${randId}
            </span>
            <div style="width:10px;height:10px;background:#ff003c;box-shadow:0 0 8px rgba(255,0,60,.7);"></div>
          </div>

          <div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#00f3ff;
                        text-transform:uppercase;letter-spacing:.25em;margin-bottom:.5rem;">
              ${svc.tag}
            </div>
            <h2 style="font-size:2.5rem;line-height:.9;margin:0;text-transform:uppercase;
                       font-weight:700;color:#fff;mix-blend-mode:hard-light;">
              ${svc.title}
            </h2>
            <p style="font-family:'JetBrains Mono',monospace;font-size:.65rem;
                      color:rgba(255,255,255,0.58);margin-top:1rem;line-height:1.7;">
              ${svc.desc}
            </p>
          </div>

          <div style="margin-top:auto;font-family:'JetBrains Mono',monospace;font-size:.7rem;
                      color:rgba(255,255,255,0.42);display:flex;justify-content:space-between;">
            <span>${svc.stat1}</span>
            <span>${svc.stat2}</span>
          </div>

          <div style="position:absolute;bottom:2rem;right:2rem;font-size:4rem;
                      opacity:.08;font-weight:900;font-family:'Syncopate',sans-serif;">
            0${i}
          </div>`;

        // corner-bracket hover (CSS cannot do this in inline, use JS events)
        card.addEventListener("mouseenter", () => {
          card.style.borderColor = "#ff003c";
          card.style.boxShadow   = "0 0 35px rgba(255,0,60,.25),0 24px 60px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.05)";
          card.style.background  = "rgba(26,8,8,.94)";
          card.style.zIndex      = "100";
        });
        card.addEventListener("mouseleave", () => {
          card.style.borderColor = "rgba(255,255,255,0.12)";
          card.style.boxShadow   = "0 0 0 1px rgba(0,0,0,.6),0 24px 60px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.05)";
          card.style.background  = "rgba(14,14,14,0.88)";
          card.style.zIndex      = "";
        });

        wrapper.appendChild(card);
        list.push({ el: wrapper, type: "card", x, y, rot, baseZ });
      }

      world.appendChild(wrapper);
    });

    // ── stars ──
    for (let i = 0; i < STAR_COUNT; i++) {
      const el = document.createElement("div");
      el.style.cssText = "position:absolute;width:2px;height:2px;background:#fff;transform:translate(-50%,-50%);";
      world.appendChild(el);
      list.push({
        el, type: "star",
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        rot: 0,
        baseZ: -Math.random() * total * Z_GAP,
      });
    }

    items.current = list;

    // ── events ──
    const onMouse = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const prev = rawScroll.current;
      rawScroll.current = Math.max(0, Math.min(maxScroll.current, rawScroll.current + e.deltaY * 0.65));
      velocity.current  = (rawScroll.current - prev) * 0.05;
    };

    let ty = 0;
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      e.preventDefault();
      const dy = ty - e.touches[0].clientY;
      ty = e.touches[0].clientY;
      const prev = rawScroll.current;
      rawScroll.current = Math.max(0, Math.min(maxScroll.current, rawScroll.current + dy * 2));
      velocity.current  = (rawScroll.current - prev) * 0.05;
    };

    window.addEventListener("mousemove",  onMouse);
    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });

    // ── RAF loop ─────────────────────────────────────────────────────────
    function loop(time: number) {
      const delta = time - lastT.current;
      lastT.current = time;
      if (delta > 0 && time % 12 < 1) setFps(Math.round(1000 / delta));

      // ORIGINAL lerp (0.08) — smooth, not sluggish
      smoothScroll.current += (rawScroll.current - smoothScroll.current) * LERP;
      velocity.current     *= 0.9;  // original decay

      setVel(Math.abs(velocity.current).toFixed(2));
      setCoord(smoothScroll.current.toFixed(0));

      // ── camera tilt (original formula) ──
      const tiltX = mouseY.current * 5 - velocity.current * 0.5;
      const tiltY = mouseX.current * 5;
      world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      // ── dynamic FOV (original formula) ──
      const fov = 1000 - Math.min(Math.abs(velocity.current) * 10, 600);
      viewport.style.perspective = `${fov}px`;

      const cameraZ = smoothScroll.current * CAM_SPEED;

      items.current.forEach((item) => {
        const vizZ = item.baseZ + cameraZ;

        // ── ORIGINAL opacity logic ──
        let alpha = 1;
        if (vizZ < -3000) alpha = 0;
        else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;
        if (vizZ > 100 && item.type !== "star") alpha = 1 - (vizZ - 100) / 400;
        if (alpha < 0) alpha = 0;

        item.el.style.opacity = String(alpha);

        if (alpha > 0) {
          let t = `translate3d(${item.x}px,${item.y}px,${vizZ}px)`;

          if (item.type === "star") {
            // ORIGINAL star warp
            const stretch = Math.max(1, Math.min(1 + Math.abs(velocity.current) * 0.1, 10));
            t += ` scale3d(1,1,${stretch})`;

          } else if (item.type === "text") {
            t += ` rotateZ(${item.rot}deg)`;
            // ORIGINAL chromatic aberration
            if (Math.abs(velocity.current) > 1) {
              const off = velocity.current * 2;
              (item.el.firstChild as HTMLElement).style.textShadow =
                `${off}px 0 red, ${-off}px 0 cyan`;
            } else {
              (item.el.firstChild as HTMLElement).style.textShadow = "none";
            }

          } else {
            // ORIGINAL card float
            const sec   = time * 0.001;
            const float = Math.sin(sec + item.x) * 10;
            t += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
          }

          item.el.style.transform = t;
        }
      });

      rafId.current = requestAnimationFrame(loop);
    }
    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove",  onMouse);
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      while (world.firstChild) world.removeChild(world.firstChild);
      items.current = [];
    };
  }, []);

  // ── JSX ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-[#030303] cursor-crosshair"
      style={{ fontFamily: "'Syncopate', sans-serif" }}
    >
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&family=Syncopate:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ── Post-processing overlays ── */}
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background:     "linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,0) 50%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.2))",
          backgroundSize: "100% 4px",
        }}
      />
      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[11]"
        style={{ background: "radial-gradient(circle,transparent 40%,#000 120%)" }}
      />
      {/* Noise */}
      <div
        className="fixed inset-0 pointer-events-none z-[12] opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── HUD ── */}
      <div
        className="fixed inset-8 z-20 pointer-events-none flex flex-col justify-between uppercase"
        style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "rgba(255,255,255,0.5)" }}
      >
        {/* top row */}
        <div className="flex justify-between items-center">
          <span>SYS.READY</span>
          <div className="flex-1 mx-4 relative" style={{ height: "1px", background: "rgba(255,255,255,0.2)" }}>
            <div className="absolute right-0 -top-[2px]" style={{ width: 5, height: 5, background: "#ff003c" }} />
          </div>
          <span>FPS:&nbsp;<strong style={{ color: "#00f3ff" }}>{fps}</strong></span>
        </div>

        {/* side velocity */}
        <div
          className="self-start mt-auto mb-auto"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          SCROLL VELOCITY //&nbsp;<strong style={{ color: "#00f3ff" }}>{vel}</strong>
        </div>

        {/* bottom row */}
        <div className="flex justify-between items-center">
          <span>COORD:&nbsp;<strong style={{ color: "#00f3ff" }}>{coord}</strong></span>
          <div className="flex-1 mx-4 relative" style={{ height: "1px", background: "rgba(255,255,255,0.2)" }}>
            <div className="absolute right-0 -top-[2px]" style={{ width: 5, height: 5, background: "#ff003c" }} />
          </div>
          <span>VER 2.0.4 [BETA]</span>
        </div>
      </div>

      {/* ── 3-D viewport ── */}
      <div
        ref={viewportRef}
        className="fixed inset-0 overflow-hidden z-[1]"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={worldRef}
          className="absolute top-1/2 left-1/2"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        />
      </div>
    </div>
  );
}