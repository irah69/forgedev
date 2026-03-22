"use client";

import { useEffect, useRef } from "react";

function useGlobe(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const COUNT         = 2800;
    const BASE_DOT      = 1.5;
    const INFLUENCE_R   = 0.32;
    const PUSH_STRENGTH = 0.38;
    const SPRING_K      = 0.12;
    const DAMPING       = 0.72;
    const BASE_SPIN     = 0.0018;

    const pts = [];
    for (let i = 0; i < COUNT; i++) {
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push({
        ox: Math.sin(phi) * Math.cos(theta),
        oy: Math.cos(phi),
        oz: Math.sin(phi) * Math.sin(theta),
        dx: 0, dy: 0, dz: 0,
        vx: 0, vy: 0, vz: 0,
        sx: 0, sy: 0, sz: 0,
      });
    }

    let rotX = 0.25, rotY = 0;
    let velX = 0,    velY = BASE_SPIN;
    let dragging = false;
    let prevMX = 0,  prevMY = 0;
    let cursorX = -9999, cursorY = -9999;
    let onGlobe = false;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function rotY3(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    }
    function rotX3(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    }

    function isOnGlobe(cx_px, cy_px, R) {
      const w  = canvas.offsetWidth;
      const h  = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const nx = (cx_px - cx) / R;
      const ny = -(cy_px - cy) / R;
      return nx * nx + ny * ny <= 1.0;
    }

    function getGlobeRadius() {
      return Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.33;
    }

    function getCursorInCanvas(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      cursorX = clientX - rect.left;
      cursorY = clientY - rect.top;
    }

    let raf;
    function draw() {
      raf = requestAnimationFrame(draw);
      const w  = canvas.offsetWidth;
      const h  = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const R  = Math.min(w, h) * 0.33;

      ctx.clearRect(0, 0, w, h);

      if (!dragging) {
        rotY += velY;
        rotX += velX;
        velX *= 0.96;
        velY  = velY * 0.97 + BASE_SPIN * 0.03;
        rotX  = Math.max(-0.55, Math.min(0.55, rotX));
      }

      const csxN   = (cursorX - cx) / R;
      const csyN   = -(cursorY - cy) / R;
      const csLen2 = csxN * csxN + csyN * csyN;
      onGlobe = csLen2 <= 1.0;

      let hitX = 0, hitY = 0, hitZ = 0;
      if (onGlobe) {
        const csZ = Math.sqrt(1 - csLen2);
        let h3 = rotX3({ x: csxN, y: csyN, z: csZ }, -rotX);
        h3 = rotY3(h3, -rotY);
        hitX = h3.x; hitY = h3.y; hitZ = h3.z;
      }

      for (const p of pts) {
        if (onGlobe) {
          const ddx  = p.ox - hitX;
          const ddy  = p.oy - hitY;
          const ddz  = p.oz - hitZ;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);
          if (dist < INFLUENCE_R) {
            const falloff  = 1 - dist / INFLUENCE_R;
            const pushMag  = PUSH_STRENGTH * falloff * falloff;
            p.vx += (p.ox * pushMag - p.dx) * SPRING_K;
            p.vy += (p.oy * pushMag - p.dy) * SPRING_K;
            p.vz += (p.oz * pushMag - p.dz) * SPRING_K;
          } else {
            p.vx += (0 - p.dx) * SPRING_K;
            p.vy += (0 - p.dy) * SPRING_K;
            p.vz += (0 - p.dz) * SPRING_K;
          }
        } else {
          p.vx += (0 - p.dx) * SPRING_K;
          p.vy += (0 - p.dy) * SPRING_K;
          p.vz += (0 - p.dz) * SPRING_K;
        }
        p.vx *= DAMPING; p.vy *= DAMPING; p.vz *= DAMPING;
        p.dx += p.vx;    p.dy += p.vy;    p.dz += p.vz;
      }

      for (const p of pts) {
        const nx = p.ox + p.dx;
        const ny = p.oy + p.dy;
        const nz = p.oz + p.dz;
        let r  = rotY3({ x: nx, y: ny, z: nz }, rotY);
        r      = rotX3(r, rotX);
        p.sx   = cx + r.x * R;
        p.sy   = cy - r.y * R;
        p.sz   = r.z;
      }

      pts.sort((a, b) => a.sz - b.sz);

      for (const p of pts) {
        const depth   = (p.sz + 1) / 2;
        const dispMag = Math.sqrt(p.dx*p.dx + p.dy*p.dy + p.dz*p.dz);
        const excited = Math.min(dispMag / PUSH_STRENGTH, 1);
        const size    = BASE_DOT * (0.35 + 0.65 * depth) * (1 + excited * 1.8);
        const hue     = 210 + depth * 60 - excited * 20;
        const sat     = 75  + excited * 25;
        const lit     = 40  + depth * 30 + excited * 35;
        const alpha   = 0.2  + depth * 0.6 + excited * 0.2;

        if (excited > 0.05) {
          const g = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, size * 5);
          g.addColorStop(0,   `hsla(${hue},${sat}%,${lit+25}%,${alpha})`);
          g.addColorStop(0.3, `hsla(${hue},${sat}%,${lit}%,${alpha * 0.5})`);
          g.addColorStop(1,   `hsla(${hue},${sat}%,${lit}%,0)`);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue},${sat}%,${lit}%,${alpha})`;
        ctx.fill();
      }
    }
    draw();

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
    function onMouseDown(e) { dragging = true; prevMX = e.clientX; prevMY = e.clientY; }
    function onMouseUp()    { dragging = false; }
    function onMouseLeave() { dragging = false; cursorX = -9999; cursorY = -9999; }

    let touchOnGlobe = false;
    function onTouchStart(e) {
      const touch = e.touches[0];
      getCursorInCanvas(touch.clientX, touch.clientY);
      const R = getGlobeRadius();
      touchOnGlobe = isOnGlobe(cursorX, cursorY, R);
      if (touchOnGlobe) {
        e.preventDefault();
        dragging = true;
        prevMX = touch.clientX;
        prevMY = touch.clientY;
      } else {
        dragging = false;
        cursorX = -9999;
        cursorY = -9999;
      }
    }
    function onTouchMove(e) {
      if (!touchOnGlobe) return;
      const touch = e.touches[0];
      getCursorInCanvas(touch.clientX, touch.clientY);
      if (!dragging) return;
      e.preventDefault();
      const dx = touch.clientX - prevMX;
      const dy = touch.clientY - prevMY;
      velY = dx * 0.006;
      velX = dy * 0.006;
      rotY += velY;
      rotX += velX;
      prevMX = touch.clientX;
      prevMY = touch.clientY;
    }
    function onTouchEnd() {
      dragging = false;
      touchOnGlobe = false;
      cursorX = -9999;
      cursorY = -9999;
    }

    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: false });
    canvas.addEventListener("touchend",   onTouchEnd,   { passive: true  });
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

/**
 * Globe — the interactive dot-cloud sphere.
 * Accepts className / style / data-* props so Hero can mount it
 * as a named parallax layer (data-parallax-layer="2" etc.).
 */
export default function Globe({ className = "", style = {}, ...rest }) {
  const canvasRef = useRef(null);
  useGlobe(canvasRef);

  return (
    <div
      className={`absolute inset-0 w-full h-full ${className}`}
      style={style}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: "auto", display: "block" }}
      />
    </div>
  );
}