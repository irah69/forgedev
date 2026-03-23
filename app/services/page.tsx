"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import Globe from "@/components/globe";

/* ─────────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────────── */
const SERVICES = [
  {
    id: "webdev",
    index: "01",
    title: "Web",
    subtitle: "Development",
    symbol: "webdev" as const,
    color: "#0B1120",        // slide bg
    accent: "#22D3EE",
    accentAlt: "#67E8F9",
    description:
      "We build blazing-fast, scalable web applications using cutting-edge stacks. Next.js, React, TypeScript — fused into experiences that perform and endure.",
    bullets: ["Full-Stack Next.js Applications", "API Design & Microservices", "Performance & Core Web Vitals", "Scalable Cloud Deployment"],
  },
  {
    id: "seo",
    index: "02",
    title: "SEO",
    subtitle: "Strategy",
    symbol: "seo" as const,
    color: "#0B1A12",
    accent: "#34D399",
    accentAlt: "#6EE7B7",
    description:
      "Data-driven SEO that compounds. We engineer topical authority, technical health, and link equity to place your brand at the top of every search that matters.",
    bullets: ["Technical SEO Audits & Fixes", "Content & Topical Authority", "Keyword Mapping & Architecture", "Backlink Acquisition Campaigns"],
  },
  {
    id: "maintenance",
    index: "03",
    title: "Web",
    subtitle: "Maintenance",
    symbol: "maintenance" as const,
    color: "#180B18",
    accent: "#F472B6",
    accentAlt: "#F9A8D4",
    description:
      "Your digital presence never sleeps — neither do we. Proactive monitoring, security patches, and iterative improvements to keep your platform running at peak.",
    bullets: ["24/7 Uptime Monitoring", "Security & Dependency Updates", "Performance Optimization Sprints", "Monthly Reporting & Insights"],
  },
  {
    id: "ecommerce",
    index: "04",
    title: "E-Commerce",
    subtitle: "Solutions",
    symbol: "ecommerce" as const,
    color: "#0E0B1F",
    accent: "#7C6FFF",
    accentAlt: "#A78BFA",
    description:
      "We architect high-converting storefronts that turn browsers into buyers. From headless commerce to checkout optimization — every pixel is revenue-engineered.",
    bullets: ["Custom Storefront Architecture", "Headless Commerce (Next.js + Shopify)", "Payment & Checkout Optimization", "Inventory & CMS Integration"],
  },
];

const AUTOPLAY_DELAY = 5000;

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */
const throttle = (callback: (...args: unknown[]) => void, limit: number) => {
  let waiting = false;
  return function (this: unknown, ...args: unknown[]) {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;
      setTimeout(() => { waiting = false; }, limit);
    }
  };
};

const debounce = (func: (...args: unknown[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/* ─────────────────────────────────────────────
   PARTICLE SHAPE GENERATORS
───────────────────────────────────────────── */
function samplePolyline(pts: [number, number][], n: number): [number, number, number][] {
  if (pts.length < 2 || n < 2) return [];
  const segs: { p0: [number, number]; p1: [number, number]; len: number }[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1][0] - pts[i][0], dy = pts[i + 1][1] - pts[i][1];
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len > 0) { segs.push({ p0: pts[i], p1: pts[i + 1], len }); total += len; }
  }
  const result: [number, number, number][] = [];
  for (let k = 0; k < n; k++) {
    let t = (k / (n - 1)) * total;
    for (const seg of segs) {
      if (t <= seg.len + 1e-9) {
        const u = Math.min(t / seg.len, 1);
        result.push([seg.p0[0] + u * (seg.p1[0] - seg.p0[0]), seg.p0[1] + u * (seg.p1[1] - seg.p0[1]), (Math.random() - 0.5) * 0.018]);
        break;
      }
      t -= seg.len;
    }
  }
  return result;
}

function sampleArc(cx: number, cy: number, r: number, a0: number, a1: number, n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = a0 + (a1 - a0) * (i / Math.max(n - 1, 1));
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r, (Math.random() - 0.5) * 0.018]);
  }
  return pts;
}

function sampleEllipseArc(cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = a0 + (a1 - a0) * (i / Math.max(n - 1, 1));
    pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, (Math.random() - 0.5) * 0.018]);
  }
  return pts;
}

function genShoppingBag(count: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const PI2 = Math.PI * 2;
  const body: [number, number][] = [[-0.62, 0.52], [0.68, 0.52], [0.52, -0.24], [-0.44, -0.24], [-0.62, 0.52]];
  pts.push(...samplePolyline(body, Math.floor(count * 0.22)));
  const shelves = [0.22, -0.02, -0.22] as const;
  shelves.forEach((sy) => {
    const t = (sy - -0.24) / (0.52 - -0.24);
    const lx = -0.44 + t * (-0.62 - -0.44);
    const rx = 0.52 + t * (0.68 - 0.52);
    pts.push(...samplePolyline([[lx + 0.02, sy], [rx - 0.02, sy]], Math.floor(count * 0.065)));
  });
  [-0.08, 0.24].forEach(dx => pts.push(...samplePolyline([[dx, 0.50], [dx + 0.04, -0.22]], Math.floor(count * 0.05))));
  pts.push(...samplePolyline([[-0.62, 0.52], [-0.86, 0.74]], Math.floor(count * 0.06)));
  pts.push(...samplePolyline([[-1.02, 0.66], [-0.78, 0.82]], Math.floor(count * 0.05)));
  pts.push(...samplePolyline([[-0.50, -0.38], [0.58, -0.38]], Math.floor(count * 0.09)));
  pts.push(...sampleArc(-0.30, -0.56, 0.11, 0, PI2, Math.floor(count * 0.07)));
  pts.push(...sampleArc(-0.30, -0.56, 0.055, 0, PI2, Math.floor(count * 0.03)));
  pts.push(...sampleArc(0.38, -0.56, 0.11, 0, PI2, Math.floor(count * 0.07)));
  pts.push(...sampleArc(0.38, -0.56, 0.055, 0, PI2, Math.floor(count * 0.03)));
  return pts.slice(0, count);
}

function genCodeBrackets(count: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const thickness = 0.072;
  const lTop: [number, number][] = [[-0.10, -0.64], [-0.72, 0.00]];
  const lBottom: [number, number][] = [[-0.72, 0.00], [-0.10, 0.64]];
  const rTop: [number, number][] = [[0.10, -0.64], [0.72, 0.00]];
  const rBottom: [number, number][] = [[0.72, 0.00], [0.10, 0.64]];
  const slashLine: [number, number][] = [[0.22, -0.70], [-0.22, 0.70]];
  for (let t = -thickness; t <= thickness; t += thickness / 2) {
    pts.push(...samplePolyline(lTop.map(([x, y]) => [x, y + t] as [number, number]), Math.floor(count * 0.055)));
    pts.push(...samplePolyline(lBottom.map(([x, y]) => [x, y + t] as [number, number]), Math.floor(count * 0.055)));
    pts.push(...samplePolyline(rTop.map(([x, y]) => [x, y + t] as [number, number]), Math.floor(count * 0.055)));
    pts.push(...samplePolyline(rBottom.map(([x, y]) => [x, y + t] as [number, number]), Math.floor(count * 0.055)));
    pts.push(...samplePolyline(slashLine.map(([x, y]) => [x + t, y] as [number, number]), Math.floor(count * 0.075)));
  }
  return pts.slice(0, count);
}

function genMagnifier(count: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const PI2 = Math.PI * 2;
  const lx = -0.14, ly = 0.14, lr = 0.54;
  pts.push(...sampleArc(lx, ly, lr, 0, PI2, Math.floor(count * 0.22)));
  pts.push(...sampleArc(lx, ly, lr - 0.06, 0, PI2, Math.floor(count * 0.18)));
  pts.push(...sampleArc(lx, ly, lr - 0.03, 0, PI2, Math.floor(count * 0.10)));
  const handleAngle = -Math.PI * 0.28;
  const hStartX = lx + Math.cos(handleAngle) * lr;
  const hStartY = ly + Math.sin(handleAngle) * lr;
  const hEndX = hStartX + 0.48, hEndY = hStartY - 0.48;
  for (let t = -0.04; t <= 0.04; t += 0.02) {
    pts.push(...samplePolyline([[hStartX + t, hStartY + t], [hEndX + t, hEndY + t]], Math.floor(count * 0.038)));
  }
  const ax0 = lx - 0.30, ay0 = ly - 0.22, ax1 = lx - 0.08, ay1 = ly + 0.02;
  const ax2 = lx + 0.10, ay2 = ly - 0.06, ax3 = lx + 0.28, ay3 = ly + 0.22;
  pts.push(...samplePolyline([[ax0, ay0], [ax1, ay1], [ax2, ay2], [ax3, ay3]], Math.floor(count * 0.12)));
  pts.push(...samplePolyline([[ax3, ay3], [ax3 - 0.14, ay3]], Math.floor(count * 0.04)));
  pts.push(...samplePolyline([[ax3, ay3], [ax3, ay3 - 0.14]], Math.floor(count * 0.04)));
  return pts.slice(0, count);
}

function genGlobeAndGear(count: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const PI2 = Math.PI * 2;
  const gx = -0.38, gy = 0.04, gr = 0.52;
  pts.push(...sampleArc(gx, gy, gr, 0, PI2, Math.floor(count * 0.10)));
  // Latitude lines: only draw where the circle is large enough to look like a proper band
  // Keep them in the middle third of the globe so no tiny pole circles appear
  [-0.16, 0.04, 0.24].forEach(lat => {
    const absLat = Math.abs(lat - gy);
    const latR = Math.sqrt(Math.max(0, gr * gr - absLat * absLat));
    // Only render if the latitude circle is at least 60% of the equatorial radius
    if (latR > gr * 0.60) pts.push(...sampleArc(gx, lat, latR, 0, PI2, Math.floor(count * 0.035)));
  });
  // Longitude ellipses: only the centre one and two moderate offsets, skip wide offsets that go near poles
  [-0.18, 0.0, 0.18].forEach(loff => {
    const ellRx = Math.sqrt(Math.max(0, gr * gr - loff * loff)) * 0.55;
    // Require ellRx to be at least 40% of gr so near-pole slivers are excluded
    if (ellRx > gr * 0.40) pts.push(...sampleEllipseArc(gx + loff * 0.52, gy, ellRx, gr, 0, PI2, Math.floor(count * 0.038)));
  });
  const cx = 0.38, cy = -0.10, gearR = 0.44, innerR = 0.30, teeth = 10;
  const gearOutline: [number, number][] = [];
  const steps = teeth * 8;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * PI2;
    const inTooth = Math.sin(i / steps * PI2 * teeth) > 0.4;
    const r = inTooth ? gearR : gearR - 0.10;
    gearOutline.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  pts.push(...samplePolyline(gearOutline, Math.floor(count * 0.16)));
  pts.push(...sampleArc(cx, cy, innerR, 0, PI2, Math.floor(count * 0.06)));
  pts.push(...sampleArc(cx, cy, 0.09, 0, PI2, Math.floor(count * 0.03)));
  const wrenchAngle = -Math.PI * 0.20;
  const wLen = 0.24;
  const wx0 = cx + Math.cos(wrenchAngle + Math.PI) * wLen, wy0 = cy + Math.sin(wrenchAngle + Math.PI) * wLen;
  const wx1 = cx + Math.cos(wrenchAngle) * wLen, wy1 = cy + Math.sin(wrenchAngle) * wLen;
  pts.push(...samplePolyline([[wx0, wy0], [wx1, wy1]], Math.floor(count * 0.04)));
  pts.push(...sampleArc(wx1, wy1, 0.07, 0, PI2, Math.floor(count * 0.03)));
  const hammAngle = wrenchAngle + Math.PI / 2;
  const hx0 = cx + Math.cos(hammAngle + Math.PI) * 0.20, hy0 = cy + Math.sin(hammAngle + Math.PI) * 0.20;
  const hx1 = cx + Math.cos(hammAngle) * 0.20, hy1 = cy + Math.sin(hammAngle) * 0.20;
  pts.push(...samplePolyline([[hx0, hy0], [hx1, hy1]], Math.floor(count * 0.04)));
  pts.push(...sampleArc(hx1, hy1, 0.055, 0, PI2, Math.floor(count * 0.025)));
  return pts.slice(0, count);
}

/* ─────────────────────────────────────────────
   PARTICLE SYMBOL (Three.js) — one instance
   kept alive for the active slide, rebuilt on change
───────────────────────────────────────────── */
type SymbolType = "ecommerce" | "webdev" | "seo" | "maintenance";

interface ParticleSymbolProps { color: string; symbol: SymbolType; }

function ParticleSymbol({ color, symbol }: ParticleSymbolProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const w = el.clientWidth || 400;
    const h = el.clientHeight || 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.z = 3.8;

    const COUNT = 2800;
    let originPts: [number, number, number][];
    if (symbol === "ecommerce")   originPts = genShoppingBag(COUNT);
    else if (symbol === "webdev") originPts = genCodeBrackets(COUNT);
    else if (symbol === "seo")    originPts = genMagnifier(COUNT);
    else                          originPts = genGlobeAndGear(COUNT);

    const origins = new Float32Array(COUNT * 3);
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const pSizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const [ox, oy, oz] = originPts[i] ?? [0, 0, 0];
      origins[i * 3] = ox; origins[i * 3 + 1] = oy; origins[i * 3 + 2] = oz;
      positions[i * 3] = ox; positions[i * 3 + 1] = oy; positions[i * 3 + 2] = oz;
      pSizes[i] = Math.random() * 1.6 + 1.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(pSizes, 1));

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.028,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.88,
    });

    scene.add(new THREE.Points(geo, mat));

    const mouse = { x: 99999, y: 99999 };
    const REPEL_RADIUS = 0.42, REPEL_FORCE = 0.012, RETURN_FORCE = 0.018, DAMPING = 0.92;

    function screenToWorld(clientX: number, clientY: number) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const d = -camera.position.z / vec.z;
      const world = camera.position.clone().addScaledVector(vec, d);
      mouse.x = world.x; mouse.y = world.y;
    }

    const onMouseMove = (e: MouseEvent) => screenToWorld(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => { if (e.touches[0]) screenToWorld(e.touches[0].clientX, e.touches[0].clientY); };
    const onLeave = () => { mouse.x = 99999; mouse.y = 99999; };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onLeave);

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const posArr = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
        const px = posArr[ix], py = posArr[iy];
        const dx = px - mouse.x, dy = py - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 1e-6) {
          const d = Math.sqrt(distSq);
          const force = ((REPEL_RADIUS - d) / REPEL_RADIUS) * REPEL_FORCE;
          velocities[ix] += (dx / d) * force;
          velocities[iy] += (dy / d) * force;
        }
        velocities[ix] += (origins[ix] - px) * RETURN_FORCE;
        velocities[iy] += (origins[iy] - py) * RETURN_FORCE;
        velocities[iz] += (origins[iz] - posArr[iz]) * RETURN_FORCE;
        velocities[ix] *= DAMPING; velocities[iy] *= DAMPING; velocities[iz] *= DAMPING;
        posArr[ix] += velocities[ix]; posArr[iy] += velocities[iy]; posArr[iz] += velocities[iz];
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = el.clientWidth, nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onLeave);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [color, symbol]);

  return <div ref={mountRef} className="w-full h-full" />;
}

/* ─────────────────────────────────────────────
   MAIN SLIDER PAGE
───────────────────────────────────────────── */
export default function ServicesSlider() {
  const sliderRef  = useRef<HTMLElement | null>(null);
  const titleRef   = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const indexRef   = useRef<HTMLDivElement | null>(null);
  const descRef    = useRef<HTMLDivElement | null>(null);
  const bulletsRef = useRef<HTMLUListElement | null>(null);
  const particleRef  = useRef<HTMLDivElement | null>(null);
  const globeWrapRef = useRef<HTMLDivElement | null>(null); // always in DOM, opacity toggled by GSAP

  const counterRef = useRef<HTMLSpanElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const accentLineRef = useRef<HTMLDivElement | null>(null);

  const MAINTENANCE_IDX = SERVICES.findIndex(s => s.id === "maintenance");

  const state = useRef({
    current: 0,
    animating: false,
    total: SERVICES.length,
    currentTitleLine: null as HTMLElement | null,
    currentSubtitleLine: null as HTMLElement | null,
    autoPlayId: null as ReturnType<typeof setInterval> | null,
    reducedMotion: false,
    particleKey: 0,
  });

  const goRef = useRef<((dir: "next" | "prev") => void) | null>(null);

  const mod = useCallback((n: number) => {
    const t = state.current.total;
    return ((n % t) + t) % t;
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (state.current.autoPlayId) { clearInterval(state.current.autoPlayId); state.current.autoPlayId = null; }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    state.current.autoPlayId = setInterval(() => {
      if (!state.current.animating) goRef.current?.("next");
    }, AUTOPLAY_DELAY);
  }, [stopAutoPlay]);

  /* ── Split-text line animator ── */
  const buildLine = useCallback((el: HTMLElement, text: string) => {
    // Ensure parent clips overflow so chars sliding in/out are hidden
    el.style.overflow = "hidden";
    el.style.position = "relative";
    el.innerHTML = "";
    const line = document.createElement("div");
    line.style.cssText = "display:block;white-space:nowrap;";
    [...text].forEach((ch) => {
      const span = document.createElement("span");
      span.textContent = ch === " " ? "\u00A0" : ch;
      span.style.cssText = "display:inline-block;will-change:transform;";
      line.appendChild(span);
    });
    el.appendChild(line);
    return line;
  }, []);

  const animateLine = useCallback(
    (el: HTMLElement, currentLine: HTMLElement | null, newText: string, direction: "next" | "prev", gradientStyle?: { bg: string; accent: string; accentAlt: string }) => {
      // Measure from computed font-size — reliable regardless of offsetHeight
      const computedFs = parseFloat(window.getComputedStyle(el).fontSize) || 80;
      const h = computedFs * 1.1;
      const dir = direction === "next" ? 1 : -1;
      const rm = state.current.reducedMotion;

      // Ensure clipping
      el.style.overflow = "hidden";
      el.style.position = "relative";
      el.style.display = "block";

      // If this is a gradient element, clear webkit fill so the gradient on spans shows
      if (gradientStyle) {
        el.style.background = "none";
        (el.style as unknown as Record<string, string>).webkitBackgroundClip = "unset";
        (el.style as unknown as Record<string, string>).webkitTextFillColor = "unset";
      }

      const oldLine = currentLine;
      const oldChars = oldLine ? [...oldLine.querySelectorAll<HTMLElement>("span")] : [];

      // Pin old line absolutely so it doesn't push layout
      if (oldLine) {
        oldLine.style.cssText = "position:absolute;top:0;left:0;display:block;white-space:nowrap;";
      }

      // Build new line offscreen
      const newLine = document.createElement("div");
      newLine.style.cssText = "position:absolute;top:0;left:0;display:block;white-space:nowrap;";
      [...newText].forEach((ch) => {
        const span = document.createElement("span");
        span.textContent = ch === " " ? "\u00A0" : ch;
        if (gradientStyle) {
          // Apply gradient per-character so it's visible even during y transform
          span.style.cssText = `display:inline-block;will-change:transform;background:linear-gradient(135deg,${gradientStyle.accent},${gradientStyle.accentAlt});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`;
        } else {
          span.style.cssText = "display:inline-block;will-change:transform;";
        }
        newLine.appendChild(span);
      });
      el.appendChild(newLine);
      const newChars = [...newLine.querySelectorAll<HTMLElement>("span")];

      // Start new chars outside clip
      gsap.set(newChars, { y: h * dir });

      const duration = rm ? 0.01 : 0.9;
      const stagger  = rm ? 0    : 0.03;

      const tl = gsap.timeline({
        onComplete: () => {
          oldLine?.remove();
          newLine.style.cssText = "display:block;white-space:nowrap;position:relative;";
          gsap.set(newChars, { clearProps: "transform" });
        },
      });

      if (oldChars.length) {
        tl.to(oldChars, { y: -h * dir, stagger, duration, ease: "expo.inOut" }, 0);
      }
      tl.to(newChars, { y: 0, stagger, duration, ease: "expo.inOut" }, 0);

      return { tl, newLine };
    },
    []
  );

  /* ── Update right panel: cross-fade Globe ↔ Particle via GSAP ── */
  const updateParticle = useCallback((idx: number) => {
    const pEl = particleRef.current;
    const gEl = globeWrapRef.current;
    const isGlobe = idx === MAINTENANCE_IDX;
    const dur = state.current.reducedMotion ? 0.01 : 0.35;

    if (isGlobe) {
      // Fade particle out, globe in
      if (pEl) gsap.to(pEl, { opacity: 0, duration: dur, onComplete: () => {
        pEl.innerHTML = "";
      }});
      if (gEl) gsap.fromTo(gEl, { opacity: 0 }, { opacity: 1, duration: dur * 1.5, delay: dur * 0.5 });
    } else {
      // Fade globe out, then swap+fadein particle
      if (gEl) gsap.to(gEl, { opacity: 0, duration: dur });
      if (pEl) {
        gsap.to(pEl, { opacity: 0, duration: dur, onComplete: () => {
          pEl.innerHTML = "";
          pEl.dispatchEvent(new CustomEvent("particle-update", {
            detail: { symbol: SERVICES[idx].symbol, color: SERVICES[idx].accent },
          }));
          gsap.to(pEl, { opacity: 1, duration: dur * 1.5 });
        }});
      }
    }
  }, [MAINTENANCE_IDX]);

  /* ── Update info panel (desc + bullets) ── */
  const updateInfo = useCallback((idx: number, direction: "next" | "prev") => {
    const svc = SERVICES[idx];
    const desc = descRef.current;
    const bullets = bulletsRef.current;
    const indexEl = indexRef.current;
    const accentLine = accentLineRef.current;
    const rm = state.current.reducedMotion;
    const dur = rm ? 0.01 : 0.5;

    if (accentLine) {
      gsap.to(accentLine, { scaleX: 0, duration: dur * 0.4, onComplete: () => {
        accentLine.style.background = `linear-gradient(to right, ${svc.accent}, ${svc.accentAlt})`;
        gsap.to(accentLine, { scaleX: 1, duration: dur });
      }});
    }

    if (indexEl) {
      gsap.to(indexEl, { y: direction === "next" ? -20 : 20, opacity: 0, duration: dur * 0.4, onComplete: () => {
        indexEl.textContent = svc.index;
        indexEl.style.color = svc.accent;
        indexEl.style.borderColor = `${svc.accent}40`;
        indexEl.style.background = `${svc.accent}14`;
        gsap.fromTo(indexEl, { y: direction === "next" ? 20 : -20, opacity: 0 }, { y: 0, opacity: 1, duration: dur });
      }});
    }

    if (desc) {
      gsap.to(desc, { y: 16, opacity: 0, duration: dur * 0.4, onComplete: () => {
        desc.textContent = svc.description;
        gsap.to(desc, { y: 0, opacity: 1, duration: dur });
      }});
    }

    if (bullets) {
      const items = [...bullets.querySelectorAll("li")];
      gsap.to(items, { y: 12, opacity: 0, duration: dur * 0.35, stagger: 0.04, onComplete: () => {
        bullets.innerHTML = svc.bullets.map(b => `
          <li style="display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.75);font-size:0.875rem;letter-spacing:0.04em;font-family:'DM Sans',sans-serif">
            <span style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${svc.accent};box-shadow:0 0 8px ${svc.accent}"></span>
            ${b}
          </li>`).join("");
        gsap.fromTo([...bullets.querySelectorAll("li")],
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: dur, stagger: 0.06 }
        );
      }});
    }
  }, []);

  /* ── go ── */
  const go = useCallback((direction: "next" | "prev") => {
    const s = state.current;
    if (s.animating) return;
    s.animating = true;
    startAutoPlay();

    const nextIdx = direction === "next" ? mod(s.current + 1) : mod(s.current - 1);
    const nextSvc = SERVICES[nextIdx];
    const rm = s.reducedMotion;

    const master = gsap.timeline({
      onComplete: () => {
        s.current = nextIdx;
        s.animating = false;
      },
    });

    /* Bg color */
    master.to(sliderRef.current, { backgroundColor: nextSvc.color, duration: rm ? 0.01 : 1.4, ease: "power2.inOut" }, 0);

    /* Title line */
    if (titleRef.current) {
      const { tl, newLine } = animateLine(titleRef.current, s.currentTitleLine, nextSvc.title, direction);
      s.currentTitleLine = newLine;
      master.add(tl, 0);
    }

    /* Subtitle line — update gradient to match incoming service */
    if (subtitleRef.current) {
      const subEl = subtitleRef.current;
      const gradStyle = { bg: `linear-gradient(135deg, ${nextSvc.accent}, ${nextSvc.accentAlt})`, accent: nextSvc.accent, accentAlt: nextSvc.accentAlt };
      const { tl, newLine } = animateLine(subEl, s.currentSubtitleLine, nextSvc.subtitle, direction, gradStyle);
      s.currentSubtitleLine = newLine;
      master.add(tl, 0);
    }

    /* Counter */
    if (counterRef.current) {
      const el = counterRef.current;
      master.to(el, { y: direction === "next" ? -16 : 16, opacity: 0, duration: rm ? 0.01 : 0.3, onComplete: () => {
        el.textContent = `${nextIdx + 1} / ${SERVICES.length}`;
        gsap.fromTo(el, { y: direction === "next" ? 16 : -16, opacity: 0 }, { y: 0, opacity: 1, duration: rm ? 0.01 : 0.3 });
      }}, 0);
    }

    /* Progress bar */
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: (nextIdx + 1) / SERVICES.length,
        duration: rm ? 0.01 : 0.8,
        ease: "power2.inOut",
        transformOrigin: "left center",
      });
    }

    /* Info panel */
    updateInfo(nextIdx, direction);

    /* Particle */
    updateParticle(nextIdx);
  }, [mod, startAutoPlay, animateLine, updateInfo, updateParticle]);

  useEffect(() => { goRef.current = go; }, [go]);

  /* ── INIT ── */
  useEffect(() => {
    const s = state.current;
    const slider = sliderRef.current;
    if (!slider) return;

    s.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const svc = SERVICES[0];

    /* Set bg */
    gsap.set(slider, { backgroundColor: svc.color });

    /* Build title */
    if (titleRef.current) s.currentTitleLine = buildLine(titleRef.current, svc.title);

    /* Build subtitle with gradient per span */
    if (subtitleRef.current) {
      const subEl = subtitleRef.current;
      // Clear wrapper gradient — we put gradient on each span instead
      subEl.style.background = "none";
      (subEl.style as unknown as Record<string, string>).webkitBackgroundClip = "unset";
      (subEl.style as unknown as Record<string, string>).webkitTextFillColor = "unset";
      subEl.style.overflow = "hidden";
      subEl.style.position = "relative";
      subEl.style.display = "block";
      subEl.innerHTML = "";
      const line = document.createElement("div");
      line.style.cssText = "display:block;white-space:nowrap;position:relative;";
      [...svc.subtitle].forEach((ch) => {
        const span = document.createElement("span");
        span.textContent = ch === " " ? "\u00A0" : ch;
        span.style.cssText = `display:inline-block;will-change:transform;background:linear-gradient(135deg,${svc.accent},${svc.accentAlt});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;`;
        line.appendChild(span);
      });
      subEl.appendChild(line);
      s.currentSubtitleLine = line;
    }

    /* Counter */
    if (counterRef.current) counterRef.current.textContent = `1 / ${SERVICES.length}`;

    /* Progress */
    if (progressRef.current) gsap.set(progressRef.current, { scaleX: 1 / SERVICES.length, transformOrigin: "left center" });

    /* Index badge */
    if (indexRef.current) {
      indexRef.current.textContent = svc.index;
      indexRef.current.style.color = svc.accent;
      indexRef.current.style.borderColor = `${svc.accent}40`;
      indexRef.current.style.background = `${svc.accent}14`;
    }

    /* Desc */
    if (descRef.current) descRef.current.textContent = svc.description;

    /* Bullets */
    if (bulletsRef.current) {
      bulletsRef.current.innerHTML = svc.bullets.map(b => `
        <li style="display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.75);font-size:0.875rem;letter-spacing:0.04em;font-family:'DM Sans',sans-serif">
          <span style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${svc.accent};box-shadow:0 0 8px ${svc.accent}"></span>
          ${b}
        </li>`).join("");
    }

    /* Accent line */
    if (accentLineRef.current) {
      accentLineRef.current.style.background = `linear-gradient(to right, ${svc.accent}, ${svc.accentAlt})`;
    }

    /* Globe starts hidden — only visible on the maintenance slide */
    if (globeWrapRef.current) gsap.set(globeWrapRef.current, { opacity: 0 });

    /* Entrance anim */
    const titleChars = titleRef.current ? [...titleRef.current.querySelectorAll<HTMLElement>("span")] : [];
    const subChars   = subtitleRef.current ? [...subtitleRef.current.querySelectorAll<HTMLElement>("span")] : [];
    gsap.from([...titleChars, ...subChars], { y: 60, opacity: 0, stagger: 0.03, duration: 1, ease: "expo.out", delay: 0.2 });

    startAutoPlay();

    /* Events */
    const onWheel = throttle((...args: unknown[]) => {
      const e = args[0] as WheelEvent;
      if (!state.current.animating && goRef.current) goRef.current(e.deltaY > 0 ? "next" : "prev");
    }, 1800);
    window.addEventListener("wheel", onWheel as EventListener, { passive: true });

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = throttle((...args: unknown[]) => {
      const e = args[0] as TouchEvent;
      if (state.current.animating) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      if (goRef.current) goRef.current(diff > 0 ? "next" : "prev");
    }, 1800);
    window.addEventListener("touchstart", onTouchStart as EventListener, { passive: true });
    window.addEventListener("touchend",   onTouchEnd as EventListener,   { passive: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (state.current.animating) return;
      if ((e.key === "ArrowDown"  || e.key === "ArrowRight") && goRef.current) goRef.current("next");
      if ((e.key === "ArrowUp"    || e.key === "ArrowLeft")  && goRef.current) goRef.current("prev");
    };
    window.addEventListener("keydown", onKeyDown);

    const onResize = debounce(() => {}, 300);
    window.addEventListener("resize", onResize as EventListener, { passive: true });

    const onVisibility = () => {
      if (document.visibilityState === "hidden") { state.current.animating = false; stopAutoPlay(); }
      else startAutoPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopAutoPlay();
      window.removeEventListener("wheel",            onWheel as EventListener);
      window.removeEventListener("touchstart",       onTouchStart as EventListener);
      window.removeEventListener("touchend",         onTouchEnd as EventListener);
      window.removeEventListener("keydown",          onKeyDown);
      window.removeEventListener("resize",           onResize as EventListener);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [buildLine, startAutoPlay, stopAutoPlay]);

  /* ── Particle DOM swap listener ── */
  useEffect(() => {
    const el = particleRef.current;
    if (!el) return;

    // We manage a separate mini-state for the active particle
    let currentRenderer: THREE.WebGLRenderer | null = null;
    let currentAnimId = 0;

    function mountParticle(symbol: SymbolType, color: string) {
      if (!el) return;
      if (currentRenderer) {
        cancelAnimationFrame(currentAnimId);
        currentRenderer.dispose();
        if (el.contains(currentRenderer.domElement)) el.removeChild(currentRenderer.domElement);
        currentRenderer = null;
      }

      const w = el.clientWidth || 400;
      const h = el.clientHeight || 400;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);
      currentRenderer = renderer;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
      camera.position.z = 3.8;

      const COUNT = 2800;
      let originPts: [number, number, number][];
      if (symbol === "ecommerce")   originPts = genShoppingBag(COUNT);
      else if (symbol === "webdev") originPts = genCodeBrackets(COUNT);
      else if (symbol === "seo")    originPts = genMagnifier(COUNT);
      else                          originPts = genGlobeAndGear(COUNT);

      const origins = new Float32Array(COUNT * 3);
      const positions = new Float32Array(COUNT * 3);
      const velocities = new Float32Array(COUNT * 3);

      for (let i = 0; i < COUNT; i++) {
        const [ox, oy, oz] = originPts[i] ?? [0, 0, 0];
        origins[i * 3] = ox; origins[i * 3 + 1] = oy; origins[i * 3 + 2] = oz;
        positions[i * 3] = ox; positions[i * 3 + 1] = oy; positions[i * 3 + 2] = oz;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({ color: new THREE.Color(color), size: 0.028, sizeAttenuation: true, transparent: true, opacity: 0.88 });
      scene.add(new THREE.Points(geo, mat));

      const mouse = { x: 99999, y: 99999 };
      const REPEL_RADIUS = 0.42, REPEL_FORCE = 0.012, RETURN_FORCE = 0.018, DAMPING = 0.92;

      function screenToWorld(clientX: number, clientY: number) {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
        const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
        vec.unproject(camera);
        vec.sub(camera.position).normalize();
        const d = -camera.position.z / vec.z;
        const world = camera.position.clone().addScaledVector(vec, d);
        mouse.x = world.x; mouse.y = world.y;
      }

      const onMM = (e: MouseEvent) => screenToWorld(e.clientX, e.clientY);
      const onTM = (e: TouchEvent) => { if (e.touches[0]) screenToWorld(e.touches[0].clientX, e.touches[0].clientY); };
      const onLeave = () => { mouse.x = 99999; mouse.y = 99999; };
      el.addEventListener("mousemove", onMM);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("touchmove", onTM, { passive: true });
      el.addEventListener("touchend", onLeave);

      const animate = () => {
        currentAnimId = requestAnimationFrame(animate);
        const posArr = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
          const px = posArr[ix], py = posArr[iy];
          const dx = px - mouse.x, dy = py - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 1e-6) {
            const d = Math.sqrt(distSq);
            const force = ((REPEL_RADIUS - d) / REPEL_RADIUS) * REPEL_FORCE;
            velocities[ix] += (dx / d) * force;
            velocities[iy] += (dy / d) * force;
          }
          velocities[ix] += (origins[ix] - px) * RETURN_FORCE;
          velocities[iy] += (origins[iy] - py) * RETURN_FORCE;
          velocities[iz] += (origins[iz] - posArr[iz]) * RETURN_FORCE;
          velocities[ix] *= DAMPING; velocities[iy] *= DAMPING; velocities[iz] *= DAMPING;
          posArr[ix] += velocities[ix]; posArr[iy] += velocities[iy]; posArr[iz] += velocities[iz];
        }
        geo.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };
      animate();
    }

    // Initial mount — service[0] is webdev, never maintenance
    mountParticle(SERVICES[0].symbol, SERVICES[0].accent);

    const onUpdate = (e: Event) => {
      const { symbol, color } = (e as CustomEvent).detail;
      mountParticle(symbol, color);
    };
    el.addEventListener("particle-update", onUpdate);

    return () => {
      el.removeEventListener("particle-update", onUpdate);
      if (currentRenderer) {
        cancelAnimationFrame(currentAnimId);
        currentRenderer.dispose();
        if (el.contains(currentRenderer.domElement)) el.removeChild(currentRenderer.domElement);
      }
    };
  }, []);

  /* ─── RENDER ─── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,700;1,700&family=DM+Sans:wght@300;400;600&display=swap');
        html, body { height: 100%; overflow: hidden; }
        body { font-family: 'Instrument Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>



      {/* Slider root */}
      <section
        ref={sliderRef}
        style={{
          width: "100%", height: "100vh", overflow: "hidden",
          display: "flex", flexDirection: "column",
          position: "relative",
        }}
      >
        {/* ── NAV ── */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 56px", flexShrink: 0 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "#7C6FFF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 14, fontFamily: "serif" }}>I</div>
            <span style={{ color: "#fff", fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, letterSpacing: "0.28em", fontSize: 13 }}>IRAH</span>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: 36 }}>
            {["Services", "Work", "About", "Process", "Contact"].map(item => (
              <a key={item} href="#" style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >{item}</a>
            ))}
          </div>

          {/* Counter */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span ref={counterRef} style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: "0.2em", fontFamily: "'Instrument Sans', sans-serif" }}>1 / 4</span>
            <button
              onClick={() => !state.current.animating && goRef.current?.("next")}
              style={{ width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", background: "transparent",  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}
            >
              {[0,1,2].map(i => <span key={i} style={{ width: 16, height: 1, background: "rgba(255,255,255,0.7)", display: "block" }} />)}
            </button>
          </div>
        </header>

        {/* ── BODY ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "row", padding: "0 56px 40px", minHeight: 0, gap: 48 }}>

          {/* ── LEFT: Text content ── */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: "0 0 46%", maxWidth: 520, gap: 0, position: "relative", zIndex: 4 }}>

            {/* Index + accent line */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <span
                ref={indexRef}
                style={{
                  fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, letterSpacing: "0.35em",
                  textTransform: "uppercase", padding: "4px 14px", borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.2)", display: "inline-block",
                }}
              />
              <div ref={accentLineRef} style={{ height: 1, width: 48, borderRadius: 1 }} />
            </div>

            {/* Title */}
            <div style={{ lineHeight: 1, marginBottom: 0, overflow: "hidden", position: "relative" }}>
              <div
                ref={titleRef}
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#fff",
                  fontSize: "clamp(52px, 7vw, 100px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 0.9,
                  position: "relative",
                  overflow: "hidden",
                }}
              />
              {/* Subtitle — italic, gradient applied per-span by JS */}
              <div
                ref={subtitleRef}
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 700,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                  fontSize: "clamp(52px, 7vw, 100px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 0.9,
                  position: "relative",
                  overflow: "hidden",
                  display: "block",
                }}
              />
            </div>

            {/* Description */}
            <p
              ref={descRef}
              style={{
                color: "rgba(255,255,255,0.55)", lineHeight: 1.65, fontSize: "0.95rem",
                fontFamily: "'DM Sans', sans-serif", marginTop: 28, maxWidth: 420,
              }}
            />

            {/* Bullets */}
            <ul ref={bulletsRef} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20, listStyle: "none", padding: 0 }} />

            {/* CTA */}
            <div style={{ marginTop: 32 }}>
              <button
                onClick={() => !state.current.animating && goRef.current?.("next")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "12px 28px", borderRadius: 999, border: `1.5px solid ${SERVICES[0].accent}`,
                  background: "transparent", color: SERVICES[0].accent, 
                  fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif",
                  textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600,
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => {
                  const svc = SERVICES[state.current.current];
                  (e.currentTarget as HTMLElement).style.background = svc.accent;
                  (e.currentTarget as HTMLElement).style.color = "#060610";
                }}
                onMouseLeave={e => {
                  const svc = SERVICES[state.current.current];
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = svc.accent;
                }}
              >
                <span>Explore Service</span>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* Nav arrows */}
            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              {(["prev", "next"] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => !state.current.animating && goRef.current?.(dir)}
                  aria-label={dir === "next" ? "Next service" : "Previous service"}
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)", background: "transparent",
                     display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.6)", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ transform: dir === "prev" ? "rotate(180deg)" : "none" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Particle + Globe (always in DOM, GSAP controls opacity) ── */}
          <div style={{ flex: 1, position: "relative", minHeight: 0 }}>

            {/* Radial glow */}
            <div style={{
              position: "absolute", inset: "15%", borderRadius: "50%",
              background: "#7C6FFF", opacity: 0.08, filter: "blur(80px)", pointerEvents: "none",
            }} />

            {/* Three.js particle layer */}
            <div
              ref={particleRef}
              style={{ position: "absolute", inset: 0 }}
            />

            {/* Globe layer — always mounted, GSAP fades in/out */}
            <div
              ref={globeWrapRef}
              style={{ position: "absolute", inset: 0, opacity: 0 }}
            >
              <Globe
                style={{
                  width: "100%", height: "100%",
                  filter: "hue-rotate(220deg) saturate(1.6) brightness(1.15)",
                }}
              />
            </div>

          </div>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.07)" }}>
          <div
            ref={progressRef}
            style={{ height: "100%", background: "rgba(255,255,255,0.45)", transformOrigin: "left center", transform: `scaleX(${1 / SERVICES.length})` }}
          />
        </div>

        {/* ── SCROLL HINT ── */}
        <div style={{ position: "absolute", bottom: 28, right: 56, display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Instrument Sans', sans-serif" }}>
          <span>Scroll</span>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* ── SERVICE INDEX DOTS ── */}
        <div style={{ position: "absolute", left: 56, bottom: 40, display: "flex", gap: 8, alignItems: "center" }}>
          {SERVICES.map((svc, i) => (
            <button
              key={svc.id}
              onClick={() => {
                if (state.current.animating || i === state.current.current) return;
                const dir = i > state.current.current ? "next" : "prev";
                // Multi-hop: animate step by step
                const hop = () => {
                  if (state.current.current === i) return;
                  const d = i > state.current.current ? "next" : "prev";
                  goRef.current?.(d);
                  setTimeout(hop, 700);
                };
                hop();
              }}
              aria-label={`Go to ${svc.title}`}
              style={{
                width: 6, height: 6, borderRadius: "50%", border: "none",
                background: "rgba(255,255,255,0.3)",  padding: 0, transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}