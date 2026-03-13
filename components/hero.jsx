"use client";

import { useEffect, useRef, useState } from "react";

/*
  PARTICLE GLOBE with DISPLACEMENT PHYSICS
  ─────────────────────────────────────────
  Each particle stores:
    • ox,oy,oz  — original unit-sphere position (never changes)
    • dx,dy,dz  — current displacement offset  (spring physics)
    • vx,vy,vz  — velocity for spring simulation

  On hover: particles inside a 3-D influence radius are pushed
            radially outward from the cursor's ray intersection
            point on the sphere surface.

  On leave: spring force pulls each particle back to (0,0,0)
            displacement with damping → smooth elastic return.
*/

function useGlobe(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    /* ── tunables ── */
    const COUNT          = 2800;
    const BASE_DOT       = 1.5;
    const INFLUENCE_R    = 0.32;   // sphere-surface radius of effect (0-1 units)
    const PUSH_STRENGTH  = 0.38;   // max outward displacement magnitude
    const SPRING_K       = 0.12;   // spring stiffness
    const DAMPING        = 0.72;   // velocity damping per frame
    const BASE_SPIN      = 0.0018; // auto-rotate speed

    /* ── build points ── */
    const pts = [];
    for (let i = 0; i < COUNT; i++) {
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push({
        // original unit-sphere coords
        ox: Math.sin(phi) * Math.cos(theta),
        oy: Math.cos(phi),
        oz: Math.sin(phi) * Math.sin(theta),
        // displacement (spring physics)
        dx: 0, dy: 0, dz: 0,
        vx: 0, vy: 0, vz: 0,
        // projected screen pos (computed each frame)
        sx: 0, sy: 0, sz: 0,
      });
    }

    /* ── rotation state ── */
    let rotX = 0.25, rotY = 0;
    let velX = 0,    velY = BASE_SPIN;
    let dragging = false;
    let prevMX = 0,  prevMY = 0;

    /* ── cursor state (canvas pixels) ── */
    let cursorX = -9999, cursorY = -9999;
    let onGlobe = false; // whether cursor is over the globe disc

    /* ── resize ── */
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── matrix rotation helpers ── */
    function rotY3(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    }
    function rotX3(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    }

    /* ── main loop ── */
    let raf;
    function draw() {
      raf = requestAnimationFrame(draw);
      const w  = canvas.offsetWidth;
      const h  = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const R  = Math.min(w, h) * 0.33; // globe radius in px

      ctx.clearRect(0, 0, w, h);

      /* auto-spin */
      if (!dragging) {
        rotY += velY;
        rotX += velX;
        velX *= 0.96;
        velY  = velY * 0.97 + BASE_SPIN * 0.03;
        rotX  = Math.max(-0.55, Math.min(0.55, rotX));
      }

      /* ── compute cursor's intersection point on the unit sphere ──
         We unproject the screen cursor back through the rotation
         to get a point in the sphere's local space.             */
      const csxN = (cursorX - cx) / R;  // cursor in sphere-local NDC
      const csyN = -(cursorY - cy) / R;
      const csLen2 = csxN * csxN + csyN * csyN;
      onGlobe = csLen2 <= 1.0;

      // unproject cursor to sphere-local coords (inverse rotation)
      let hitX = 0, hitY = 0, hitZ = 0;
      if (onGlobe) {
        const csZ = Math.sqrt(1 - csLen2); // front face z
        // apply inverse rotation (rotX then rotY, both negated)
        let h3 = rotX3({ x: csxN, y: csyN, z: csZ }, -rotX);
        h3 = rotY3(h3, -rotY);
        hitX = h3.x; hitY = h3.y; hitZ = h3.z;
      }

      /* ── physics: update each particle's displacement ── */
      for (const p of pts) {
        if (onGlobe) {
          // distance on unit sphere from cursor hit-point to particle origin
          const ddx  = p.ox - hitX;
          const ddy  = p.oy - hitY;
          const ddz  = p.oz - hitZ;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

          if (dist < INFLUENCE_R) {
            // push strength falls off smoothly toward edge of influence
            const falloff   = 1 - dist / INFLUENCE_R;
            const pushMag   = PUSH_STRENGTH * falloff * falloff;
            // target displacement = outward along the particle's surface normal
            const targetDx  = p.ox * pushMag;
            const targetDy  = p.oy * pushMag;
            const targetDz  = p.oz * pushMag;
            // spring toward target
            p.vx += (targetDx - p.dx) * SPRING_K;
            p.vy += (targetDy - p.dy) * SPRING_K;
            p.vz += (targetDz - p.dz) * SPRING_K;
          } else {
            // spring back to 0
            p.vx += (0 - p.dx) * SPRING_K;
            p.vy += (0 - p.dy) * SPRING_K;
            p.vz += (0 - p.dz) * SPRING_K;
          }
        } else {
          // cursor off globe → spring everything back
          p.vx += (0 - p.dx) * SPRING_K;
          p.vy += (0 - p.dy) * SPRING_K;
          p.vz += (0 - p.dz) * SPRING_K;
        }

        // integrate + damp
        p.vx *= DAMPING; p.vy *= DAMPING; p.vz *= DAMPING;
        p.dx += p.vx;    p.dy += p.vy;    p.dz += p.vz;
      }

      /* ── project all pts (original + displacement) ── */
      for (const p of pts) {
        const nx = p.ox + p.dx;
        const ny = p.oy + p.dy;
        const nz = p.oz + p.dz;
        let r  = rotY3({ x: nx, y: ny, z: nz }, rotY);
        r      = rotX3(r, rotX);
        p.sx   = cx + r.x * R;
        p.sy   = cy - r.y * R;
        p.sz   = r.z; // depth
      }

      /* painter's sort */
      pts.sort((a, b) => a.sz - b.sz);

      /* ── render ── */
      for (const p of pts) {
        const depth   = (p.sz + 1) / 2;            // 0 back → 1 front
        const dispMag = Math.sqrt(p.dx*p.dx + p.dy*p.dy + p.dz*p.dz);
        const excited = Math.min(dispMag / PUSH_STRENGTH, 1); // 0…1

        const size  = BASE_DOT * (0.35 + 0.65 * depth) * (1 + excited * 1.8);
        const hue   = 210 + depth * 60 - excited * 20;   // blue→violet, excited→cyan
        const sat   = 75  + excited * 25;
        const lit   = 40  + depth * 30 + excited * 35;
        const alpha = 0.2  + depth * 0.6 + excited * 0.2;

        if (excited > 0.05) {
          // glow halo for displaced particles
          const g = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, size * 5);
          g.addColorStop(0,   `hsla(${hue},${sat}%,${lit+25}%,${alpha})`);
          g.addColorStop(0.3, `hsla(${hue},${sat}%,${lit}%,${alpha * 0.5})`);
          g.addColorStop(1,   `hsla(${hue},${sat}%,${lit}%,0)`);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        // core dot
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},${sat}%,${lit}%,${alpha})`;
        ctx.fill();
      }
    }
    draw();

    /* ── events ── */
    function getCursorInCanvas(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      cursorX = clientX - rect.left;
      cursorY = clientY - rect.top;
    }

    function onMouseMove(e) {
      getCursorInCanvas(e.clientX, e.clientY);
      if (!dragging) return;
      const dx = e.clientX - prevMX;
      const dy = e.clientY - prevMY;
      velY = dx * 0.006;
      velX = dy * 0.006;
      rotY += velY;
      rotX += velX;
      prevMX = e.clientX;
      prevMY = e.clientY;
    }
    function onMouseDown(e) {
      dragging = true;
      prevMX = e.clientX; prevMY = e.clientY;
    }
    function onMouseUp()    { dragging = false; }
    function onMouseLeave() {
      dragging = false;
      cursorX = -9999; cursorY = -9999;
    }

    function onTouchStart(e) {
      dragging = true;
      prevMX = e.touches[0].clientX;
      prevMY = e.touches[0].clientY;
      getCursorInCanvas(e.touches[0].clientX, e.touches[0].clientY);
    }
    function onTouchMove(e) {
      getCursorInCanvas(e.touches[0].clientX, e.touches[0].clientY);
      if (!dragging) return;
      const dx = e.touches[0].clientX - prevMX;
      const dy = e.touches[0].clientY - prevMY;
      velY = dx * 0.006; velX = dy * 0.006;
      rotY += velY; rotX += velX;
      prevMX = e.touches[0].clientX;
      prevMY = e.touches[0].clientY;
    }
    function onTouchEnd() { dragging = false; cursorX = -9999; cursorY = -9999; }

    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: true });
    canvas.addEventListener("touchend",   onTouchEnd);
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseup",    onMouseUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousedown",  onMouseDown);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseup",    onMouseUp);
    };
  }, []);
}

/* ══════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════ */
export default function VideoHero() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useGlobe(canvasRef);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#03040f" }}
    >
      <StarField />

      {/* ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 58% 58% at 50% 50%, rgba(40,80,255,0.13) 0%, transparent 70%)",
        }}
      />

      {/* globe canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      />

      {/* content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 1.2s ease" }}
      >
        <div className="flex items-center gap-3 mb-5" style={{ fontFamily: "'DM Mono', monospace" }}>
          <span className="h-px w-8 bg-blue-500/50" />
          <span className="text-blue-400/80 text-xs uppercase tracking-[0.3em]">
            Digital · Innovation · Growth
          </span>
          <span className="h-px w-8 bg-blue-500/50" />
        </div>

        <h1
          className="leading-tight mb-5 text-white"
          style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      "clamp(2.4rem, 7vw, 6.5rem)",
            fontWeight:    800,
            letterSpacing: "-0.02em",
            textShadow:    "0 0 80px rgba(80,130,255,0.35)",
          }}
        >
          Building{" "}
          <em
            style={{
              fontStyle:            "italic",
              background:           "linear-gradient(120deg,#60a5fa,#a78bfa 55%,#60efff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
            }}
          >
            Digital
            <br />
            Solutions
          </em>{" "}
          That&nbsp;Matter
        </h1>

{/*         <p
          className="text-white/45 max-w-md mb-10 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.88rem,1.8vw,1.05rem)" }}
        >
          We empower organisations with first-rate creative challenges
          and real-world digital success.
        </p>
 */}
        <div
          className="flex flex-wrap gap-4 justify-center pointer-events-auto"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
{/*           <button
            className="px-8 py-3 text-sm font-medium uppercase text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              letterSpacing: "0.14em",
              background:    "linear-gradient(135deg,#3b82f6,#7c3aed)",
              boxShadow:     "0 0 36px rgba(99,102,241,0.55)",
            }}
          >
            Get Started
          </button> */}
{/*           <button
            className="px-8 py-3 text-sm font-medium uppercase text-white/65 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/60 hover:text-white hover:scale-105 active:scale-95"
            style={{ letterSpacing: "0.14em" }}
          >
            Our Work
          </button> */}
        </div>
      </div>

      {/* stats */}
{/*       <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-10 pointer-events-none"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1.6s ease 0.5s",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {[
          { v: "50+",  l: "Projects"     },
          { v: "100%", l: "Satisfaction" },
          { v: "24/7", l: "Support"      },
        ].map(({ v, l }) => (
          <div key={l} className="flex flex-col items-center gap-1">
            <span className="font-bold text-white" style={{ fontSize: "clamp(1rem,2.5vw,1.35rem)", textShadow: "0 0 20px rgba(100,150,255,0.6)" }}>
              {v}
            </span>
            <span className="text-white/35 text-xs uppercase tracking-widest">{l}</span>
          </div>
        ))}
      </div> */}

      <p className="absolute top-5 right-6 text-white/25 text-xs pointer-events-none" style={{ fontFamily: "'DM Mono', monospace" }}>
        drag to rotate · hover to displace
      </p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}

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
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}