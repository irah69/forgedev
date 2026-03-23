"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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
    accent: "#22D3EE",
    accentAlt: "#67E8F9",
    description:
      "We build blazing-fast, scalable web applications using cutting-edge stacks. Next.js, React, TypeScript — fused into experiences that perform and endure.",
    bullets: ["Full-Stack Next.js Applications", "API Design & Microservices", "Performance & Core Web Vitals", "Scalable Cloud Deployment"],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <polygon points="60,10 110,85 10,85" stroke="#22D3EE" strokeWidth="1.5" fill="none" opacity="0.3" />
        <rect x="30" y="35" width="60" height="45" rx="3" stroke="#22D3EE" strokeWidth="1.5" fill="none" />
        <path d="M30 45h60" stroke="#22D3EE" strokeWidth="1" />
        <circle cx="37" cy="40" r="2" fill="#22D3EE" opacity="0.8" />
        <circle cx="44" cy="40" r="2" fill="#67E8F9" opacity="0.6" />
        <circle cx="51" cy="40" r="2" fill="#22D3EE" opacity="0.4" />
        <path d="M40 58 L46 64 L40 70" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M80 58 L74 64 L80 70" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M62 55 L58 73" stroke="#67E8F9" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="60" cy="100" r="6" stroke="#22D3EE" strokeWidth="1.5" fill="none" />
        <path d="M55 106 L65 106" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "seo",
    index: "02",
    title: "SEO",
    subtitle: "Strategy",
    symbol: "seo" as const,
    accent: "#34D399",
    accentAlt: "#6EE7B7",
    description:
      "Data-driven SEO that compounds. We engineer topical authority, technical health, and link equity to place your brand at the top of every search that matters.",
    bullets: ["Technical SEO Audits & Fixes", "Content & Topical Authority", "Keyword Mapping & Architecture", "Backlink Acquisition Campaigns"],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <circle cx="52" cy="52" r="28" stroke="#34D399" strokeWidth="1.5" fill="none" opacity="0.4" />
        <circle cx="52" cy="52" r="18" stroke="#34D399" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M72 72 L95 95" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M38 52 Q52 34 66 52 Q52 70 38 52Z" stroke="#6EE7B7" strokeWidth="1" fill="#34D399" fillOpacity="0.1" />
        <path d="M30 90 L50 75 L65 82 L90 62" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="90" r="2.5" fill="#34D399" />
        <circle cx="50" cy="75" r="2.5" fill="#34D399" />
        <circle cx="65" cy="82" r="2.5" fill="#34D399" />
        <circle cx="90" cy="62" r="2.5" fill="#6EE7B7" />
      </svg>
    ),
  },
  {
    id: "maintenance",
    index: "03",
    title: "Web",
    subtitle: "Maintenance",
    symbol: "maintenance" as const,
    accent: "#F472B6",
    accentAlt: "#F9A8D4",
    description:
      "Your digital presence never sleeps — neither do we. Proactive monitoring, security patches, and iterative improvements to keep your platform running at peak.",
    bullets: ["24/7 Uptime Monitoring", "Security & Dependency Updates", "Performance Optimization Sprints", "Monthly Reporting & Insights"],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <circle cx="60" cy="60" r="30" stroke="#F472B6" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d="M60 30 L60 60 L78 60" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="60" cy="60" r="4" fill="#F472B6" />
        <path d="M60 18 L60 24" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M60 96 L60 102" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M18 60 L24 60" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M96 60 L102 60" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M82 20 L85 32 L73 28 Z" fill="#F9A8D4" opacity="0.6" />
        <rect x="26" y="85" width="68" height="16" rx="3" stroke="#F472B6" strokeWidth="1" fill="none" opacity="0.4" />
        <rect x="30" y="89" width="20" height="8" rx="1.5" fill="#F472B6" fillOpacity="0.3" />
        <rect x="54" y="89" width="12" height="8" rx="1.5" fill="#F9A8D4" fillOpacity="0.2" />
        <rect x="70" y="89" width="20" height="8" rx="1.5" fill="#F472B6" fillOpacity="0.15" />
      </svg>
    ),
  },
  {
    id: "ecommerce",
    index: "04",
    title: "E-Commerce",
    subtitle: "Solutions",
    symbol: "ecommerce" as const,
    accent: "#7C6FFF",
    accentAlt: "#A78BFA",
    description:
      "We architect high-converting storefronts that turn browsers into buyers. From headless commerce to checkout optimization — every pixel is revenue-engineered.",
    bullets: ["Custom Storefront Architecture", "Headless Commerce (Next.js + Shopify)", "Payment & Checkout Optimization", "Inventory & CMS Integration"],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <rect x="28" y="42" width="64" height="44" rx="4" stroke="#7C6FFF" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.4" />
        <path d="M28 54h64" stroke="#7C6FFF" strokeWidth="1.5" />
        <circle cx="40" cy="48" r="3" fill="#7C6FFF" opacity="0.7" />
        <circle cx="52" cy="48" r="3" fill="#A78BFA" opacity="0.7" />
        <rect x="36" y="62" width="20" height="14" rx="2" fill="#7C6FFF" opacity="0.2" stroke="#7C6FFF" strokeWidth="1" />
        <rect x="64" y="62" width="20" height="14" rx="2" fill="#A78BFA" opacity="0.1" stroke="#A78BFA" strokeWidth="1" />
        <path d="M46 34 L46 44M52 30 L52 44" stroke="#7C6FFF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M60 34 L64 30 L68 34" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="88" cy="36" r="8" fill="#7C6FFF" opacity="0.15" stroke="#7C6FFF" strokeWidth="1" />
        <path d="M85 36 L87 38 L92 33" stroke="#7C6FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   SHAPE POINT GENERATORS
   Precise outlines matching reference images.
   All shapes are flat (z≈0), no orbits/rings.
───────────────────────────────────────────── */

/** Evenly distribute `n` points along a polyline */
function samplePolyline(pts: [number, number][], n: number): [number, number, number][] {
  if (pts.length < 2 || n < 2) return [];
  const segs: { p0: [number,number]; p1: [number,number]; len: number }[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i+1][0]-pts[i][0], dy = pts[i+1][1]-pts[i][1];
    const len = Math.sqrt(dx*dx+dy*dy);
    if (len > 0) { segs.push({ p0: pts[i], p1: pts[i+1], len }); total += len; }
  }
  const result: [number,number,number][] = [];
  for (let k = 0; k < n; k++) {
    let t = (k / (n-1)) * total;
    for (const seg of segs) {
      if (t <= seg.len + 1e-9) {
        const u = Math.min(t / seg.len, 1);
        result.push([
          seg.p0[0] + u*(seg.p1[0]-seg.p0[0]),
          seg.p0[1] + u*(seg.p1[1]-seg.p0[1]),
          (Math.random()-0.5)*0.018,
        ]);
        break;
      }
      t -= seg.len;
    }
  }
  return result;
}

/** Evenly distribute `n` points on a circle arc */
function sampleArc(cx: number, cy: number, r: number, a0: number, a1: number, n: number): [number,number,number][] {
  const pts: [number,number,number][] = [];
  for (let i = 0; i < n; i++) {
    const a = a0 + (a1-a0) * (i / Math.max(n-1,1));
    pts.push([cx + Math.cos(a)*r, cy + Math.sin(a)*r, (Math.random()-0.5)*0.018]);
  }
  return pts;
}

/** Evenly distribute `n` points on an ellipse arc */
function sampleEllipseArc(cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n: number): [number,number,number][] {
  const pts: [number,number,number][] = [];
  for (let i = 0; i < n; i++) {
    const a = a0 + (a1-a0) * (i / Math.max(n-1,1));
    pts.push([cx + Math.cos(a)*rx, cy + Math.sin(a)*ry, (Math.random()-0.5)*0.018]);
  }
  return pts;
}

/* ── 01 E-COMMERCE: Shopping CART (matches reference image exactly)
   - Trapezoid cart body (wider at top, narrows at bottom)
   - 3 horizontal shelf lines inside body
   - 2 vertical divider lines inside body
   - Handle bar: diagonal going top-left with grip end
   - Bottom axle bar
   - Two wheels (circles) at bottom
───────────────────────────────────────────── */
function genShoppingBag(count: number): [number,number,number][] {
  const pts: [number,number,number][] = [];
  const PI2 = Math.PI * 2;

  // ── Cart body outline (trapezoid, wider top, narrower bottom) ──
  // Top-left, top-right, bottom-right, bottom-left (perspective tilt like reference)
  const body: [number,number][] = [
    [-0.62,  0.52],  // top-left
    [ 0.68,  0.52],  // top-right
    [ 0.52, -0.24],  // bottom-right (narrows)
    [-0.44, -0.24],  // bottom-left
    [-0.62,  0.52],  // close
  ];
  pts.push(...samplePolyline(body, Math.floor(count * 0.22)));

  // ── 3 horizontal shelf lines inside body ──
  // Evenly spaced between top and bottom of body, same taper as body walls
  const shelves = [0.22, -0.02, -0.22] as const;
  const shelfRatios = [0.065, 0.065, 0.065] as const;
  shelves.forEach((sy, idx) => {
    // Interpolate left/right x at this y based on body trapezoid
    const t = (sy - (-0.24)) / (0.52 - (-0.24)); // 0=bottom, 1=top
    const lx = -0.44 + t * (-0.62 - (-0.44));
    const rx =  0.52 + t * (0.68 -  0.52);
    pts.push(...samplePolyline([[lx + 0.02, sy], [rx - 0.02, sy]], Math.floor(count * shelfRatios[idx])));
  });

  // ── 2 vertical divider lines inside body ──
  const divX = [-0.08, 0.24] as const;
  divX.forEach(dx => {
    // Vertical line from top of body down to bottom edge
    pts.push(...samplePolyline([[dx, 0.50], [dx + 0.04, -0.22]], Math.floor(count * 0.05)));
  });

  // ── Handle: diagonal bar going upper-left, with small grip rectangle ──
  // Main diagonal shaft
  pts.push(...samplePolyline([[-0.62, 0.52], [-0.86, 0.74]], Math.floor(count * 0.06)));
  // Grip bar (short horizontal bar at top of handle)
  pts.push(...samplePolyline([[-1.02, 0.66], [-0.78, 0.82]], Math.floor(count * 0.05)));
  // Connect grip to shaft
  pts.push(...samplePolyline([[-0.86, 0.74], [-0.92, 0.70]], Math.floor(count * 0.02)));

  // ── Bottom axle bar (horizontal bar below cart body) ──
  pts.push(...samplePolyline([[-0.50, -0.38], [ 0.58, -0.38]], Math.floor(count * 0.09)));
  // Short vertical connectors from body bottom to axle
  pts.push(...samplePolyline([[-0.44, -0.24], [-0.46, -0.38]], Math.floor(count * 0.02)));
  pts.push(...samplePolyline([[ 0.52, -0.24], [ 0.54, -0.38]], Math.floor(count * 0.02)));

  // ── Two wheels (circles) ──
  const wheelR = 0.11;
  // Left wheel
  pts.push(...sampleArc(-0.30, -0.56, wheelR,       0, PI2, Math.floor(count * 0.07)));
  pts.push(...sampleArc(-0.30, -0.56, wheelR * 0.5, 0, PI2, Math.floor(count * 0.03)));
  // Right wheel
  pts.push(...sampleArc( 0.38, -0.56, wheelR,       0, PI2, Math.floor(count * 0.07)));
  pts.push(...sampleArc( 0.38, -0.56, wheelR * 0.5, 0, PI2, Math.floor(count * 0.03)));

  return pts.slice(0, count);
}

/* ── 02 WEB DEV: </> code symbol
   Exact shape from reference: chunky rounded < / > strokes,
   each made of two diagonal lines meeting at a point.
───────────────────────────────────────────── */
function genCodeBrackets(count: number): [number,number,number][] {
  const pts: [number,number,number][] = [];

  // Stroke thickness simulation: offset lines to give fat stroke look
  const thickness = 0.072;

  // LEFT bracket  <  — two lines meeting at left vertex
  // Top arm: top-right → left-center
  // Bottom arm: left-center → bottom-right
  const lTop:    [number,number][] = [[-0.10, -0.64], [-0.72,  0.00]];
  const lBottom: [number,number][] = [[-0.72,  0.00], [-0.10,  0.64]];
  for (let t = -thickness; t <= thickness; t += thickness/2) {
    pts.push(...samplePolyline(lTop.map(([x,y]) => [x, y+t] as [number,number]), Math.floor(count * 0.055)));
    pts.push(...samplePolyline(lBottom.map(([x,y]) => [x, y+t] as [number,number]), Math.floor(count * 0.055)));
  }

  // RIGHT bracket  >  — mirror of left
  const rTop:    [number,number][] = [[ 0.10, -0.64], [ 0.72,  0.00]];
  const rBottom: [number,number][] = [[ 0.72,  0.00], [ 0.10,  0.64]];
  for (let t = -thickness; t <= thickness; t += thickness/2) {
    pts.push(...samplePolyline(rTop.map(([x,y]) => [x, y+t] as [number,number]), Math.floor(count * 0.055)));
    pts.push(...samplePolyline(rBottom.map(([x,y]) => [x, y+t] as [number,number]), Math.floor(count * 0.055)));
  }

  // SLASH  /  — diagonal line center, also fattened
  const slashLine: [number,number][] = [[ 0.22, -0.70], [-0.22,  0.70]];
  for (let t = -thickness; t <= thickness; t += thickness/2) {
    pts.push(...samplePolyline(slashLine.map(([x,y]) => [x+t, y] as [number,number]), Math.floor(count * 0.075)));
  }

  return pts.slice(0, count);
}

/* ── 03 SEO: Magnifying glass with upward trend arrow inside
   - Lens centered at (-0.15, 0.12) — upper-left area
   - Thick ring (3 concentric arcs for weight)
   - Handle: diagonal going toward bottom-right
   - Inside lens: trend arrow rising left→right (upward in screen = positive Y in Three.js)
   - Arrowhead pointing upper-right
───────────────────────────────────────────── */
function genMagnifier(count: number): [number,number,number][] {
  const pts: [number,number,number][] = [];
  const PI2 = Math.PI * 2;

  // Lens center & radius
  const lx = -0.14, ly = 0.14, lr = 0.54;

  // Thick ring — 3 circles close together to look like a chunky stroke
  pts.push(...sampleArc(lx, ly, lr,        0, PI2, Math.floor(count * 0.22)));
  pts.push(...sampleArc(lx, ly, lr - 0.06, 0, PI2, Math.floor(count * 0.18)));
  pts.push(...sampleArc(lx, ly, lr - 0.03, 0, PI2, Math.floor(count * 0.10)));

  // Handle: exits the lens at ~315° (bottom-right), goes diagonally down-right
  // In Three.js: bottom-right = positive X, negative Y
  const handleAngle = -Math.PI * 0.28; // ~315 degrees = bottom-right
  const hStartX = lx + Math.cos(handleAngle) * lr;
  const hStartY = ly + Math.sin(handleAngle) * lr;
  const hEndX   = hStartX + 0.48;
  const hEndY   = hStartY - 0.48;
  // Fat handle — 5 offset lines
  for (let t = -0.04; t <= 0.04; t += 0.02) {
    pts.push(...samplePolyline(
      [[hStartX + t, hStartY + t], [hEndX + t, hEndY + t]],
      Math.floor(count * 0.038)
    ));
  }

  // Trend arrow INSIDE lens — going from bottom-left to upper-right
  // In Three.js Y-axis: positive = UP on screen
  // Arrow starts bottom-left of lens interior, ends upper-right
  const ax0 = lx - 0.30, ay0 = ly - 0.22; // start: lower-left inside lens
  const ax1 = lx - 0.08, ay1 = ly + 0.02; // mid-low
  const ax2 = lx + 0.10, ay2 = ly - 0.06; // mid bump
  const ax3 = lx + 0.28, ay3 = ly + 0.22; // end: upper-right inside lens

  const arrowLine: [number,number][] = [[ax0,ay0],[ax1,ay1],[ax2,ay2],[ax3,ay3]];
  pts.push(...samplePolyline(arrowLine, Math.floor(count * 0.12)));

  // Arrowhead at upper-right tip — two lines pointing toward upper-right
  // Head points: one going down from tip, one going left from tip
  pts.push(...samplePolyline([[ax3, ay3], [ax3 - 0.14, ay3]], Math.floor(count * 0.04))); // left
  pts.push(...samplePolyline([[ax3, ay3], [ax3, ay3 - 0.14]], Math.floor(count * 0.04))); // down

  return pts.slice(0, count);
}

/* ── 04 WEB MAINTENANCE: Globe (left) + Gear with tools (right)
   Reference image exactly: grid globe on left half,
   gear with wrench+hammer crossed inside on right half.
───────────────────────────────────────────── */
function genGlobeAndGear(count: number): [number,number,number][] {
  const pts: [number,number,number][] = [];
  const PI2 = Math.PI * 2;

  /* ── GLOBE (left, centered at -0.42, 0) ── */
  const gx = -0.38, gy = 0.04, gr = 0.52;

  // Outer circle of globe
  pts.push(...sampleArc(gx, gy, gr, 0, PI2, Math.floor(count * 0.10)));

  // Horizontal latitude lines (3 of them)
  const latitudes = [-0.22, 0.04, 0.30];
  for (const lat of latitudes) {
    const absLat = Math.abs(lat - gy);
    const latR = Math.sqrt(Math.max(0, gr*gr - absLat*absLat));
    if (latR > 0.05) pts.push(...sampleArc(gx, lat, latR, 0, PI2, Math.floor(count * 0.035)));
  }

  // Vertical longitude lines (3 of them — as ellipses projected)
  const longOffsets = [-0.28, 0.0, 0.28];
  for (const loff of longOffsets) {
    const ellRx = Math.sqrt(Math.max(0, gr*gr - loff*loff)) * 0.55;
    if (ellRx > 0.04) pts.push(...sampleEllipseArc(gx + loff*0.52, gy, ellRx, gr, 0, PI2, Math.floor(count * 0.038)));
  }

  // Equator (bold middle horizontal line)
  pts.push(...sampleArc(gx, gy, gr, -Math.PI*0.55, Math.PI*0.55, Math.floor(count * 0.03)));

  /* ── GEAR (right, centered at 0.38, -0.10) ── */
  const cx = 0.38, cy = -0.10;
  const gearR = 0.44;
  const innerR = 0.30;
  const teeth = 10;

  // Gear teeth — alternating outer/inner radius points
  const gearOutline: [number,number][] = [];
  const steps = teeth * 8;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * PI2;
    const inTooth = Math.sin(i / steps * PI2 * teeth) > 0.4;
    const r = inTooth ? gearR : gearR - 0.10;
    gearOutline.push([cx + Math.cos(a)*r, cy + Math.sin(a)*r]);
  }
  pts.push(...samplePolyline(gearOutline, Math.floor(count * 0.16)));

  // Inner hub circle
  pts.push(...sampleArc(cx, cy, innerR, 0, PI2, Math.floor(count * 0.06)));
  pts.push(...sampleArc(cx, cy, 0.09,   0, PI2, Math.floor(count * 0.03)));

  // Wrench shape inside gear (diagonal bar with bulge at one end)
  const wrenchAngle = -Math.PI * 0.20;
  const wLen = 0.24;
  const wx0 = cx + Math.cos(wrenchAngle + Math.PI) * wLen;
  const wy0 = cy + Math.sin(wrenchAngle + Math.PI) * wLen;
  const wx1 = cx + Math.cos(wrenchAngle) * wLen;
  const wy1 = cy + Math.sin(wrenchAngle) * wLen;
  pts.push(...samplePolyline([[wx0, wy0],[wx1, wy1]], Math.floor(count * 0.04)));
  // Wrench head circle
  pts.push(...sampleArc(wx1, wy1, 0.07, 0, PI2, Math.floor(count * 0.03)));

  // Hammer/screwdriver (cross diagonal)
  const hammAngle = wrenchAngle + Math.PI/2;
  const hx0 = cx + Math.cos(hammAngle + Math.PI) * 0.20;
  const hy0 = cy + Math.sin(hammAngle + Math.PI) * 0.20;
  const hx1 = cx + Math.cos(hammAngle) * 0.20;
  const hy1 = cy + Math.sin(hammAngle) * 0.20;
  pts.push(...samplePolyline([[hx0, hy0],[hx1, hy1]], Math.floor(count * 0.04)));
  // Hammer head (small rect-ish cluster)
  pts.push(...sampleArc(hx1, hy1, 0.055, 0, PI2, Math.floor(count * 0.025)));

  return pts.slice(0, count);
}

/* ─────────────────────────────────────────────
   PARTICLE SYMBOL COMPONENT
   Pure flat particle display — no rotation,
   no orbits. Mouse/touch repulsion only.
───────────────────────────────────────────── */
type SymbolType = "ecommerce" | "webdev" | "seo" | "maintenance";

interface ParticleSymbolProps {
  color: string;
  symbol: SymbolType;
}

function ParticleSymbol({ color, symbol }: ParticleSymbolProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth || 380;
    const h = el.clientHeight || 380;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Orthographic-ish: use PerspectiveCamera far back so it looks flat
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.z = 3.8;

    const c = new THREE.Color(color);

    // Generate shape
    const COUNT = 2800;
    let originPts: [number,number,number][];
    if      (symbol === "ecommerce")   originPts = genShoppingBag(COUNT);
    else if (symbol === "webdev")      originPts = genCodeBrackets(COUNT);
    else if (symbol === "seo")         originPts = genMagnifier(COUNT);
    else                               originPts = genGlobeAndGear(COUNT);

    const origins    = new Float32Array(COUNT * 3);
    const positions  = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const pSizes     = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const [ox, oy, oz] = originPts[i] ?? [0,0,0];
      origins[i*3]   = ox; origins[i*3+1]   = oy; origins[i*3+2]   = oz;
      positions[i*3] = ox; positions[i*3+1] = oy; positions[i*3+2] = oz;
      pSizes[i] = Math.random() * 1.6 + 1.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size",     new THREE.BufferAttribute(pSizes, 1));

    const mat = new THREE.PointsMaterial({
      color: c,
      size: 0.028,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.88,
    });

    const pointsMesh = new THREE.Points(geo, mat);
    scene.add(pointsMesh);



    // ── Mouse / touch repulsion ───────────────
    const mouse = { x: 99999, y: 99999 };
    const REPEL_RADIUS = 0.42;
    const REPEL_FORCE  = 0.012;
    const RETURN_FORCE = 0.018;
    const DAMPING      = 0.92;

    function screenToWorld(clientX: number, clientY: number) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ndcX =  ((clientX - rect.left)  / rect.width)  * 2 - 1;
      const ndcY = -((clientY - rect.top)   / rect.height) * 2 + 1;
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const d = -camera.position.z / vec.z;
      const world = camera.position.clone().addScaledVector(vec, d);
      mouse.x = world.x;
      mouse.y = world.y;
    }

    const onMouseMove  = (e: MouseEvent)      => screenToWorld(e.clientX, e.clientY);
    const onTouchMove  = (e: TouchEvent)      => { if (e.touches[0]) screenToWorld(e.touches[0].clientX, e.touches[0].clientY); };
    const onLeave      = ()                   => { mouse.x = 99999; mouse.y = 99999; };

    el.addEventListener("mousemove",  onMouseMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchmove",  onTouchMove, { passive: true });
    el.addEventListener("touchend",   onLeave);

    // ── Animation loop (no rotation, pure physics) ──
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const posArr = geo.attributes.position.array as Float32Array;

      for (let i = 0; i < COUNT; i++) {
        const ix = i*3, iy = i*3+1, iz = i*3+2;
        const px = posArr[ix], py = posArr[iy];

        // Repulsion from cursor
        const dx = px - mouse.x, dy = py - mouse.y;
        const distSq = dx*dx + dy*dy;
        if (distSq < REPEL_RADIUS*REPEL_RADIUS && distSq > 1e-6) {
          const d = Math.sqrt(distSq);
          const force = ((REPEL_RADIUS - d) / REPEL_RADIUS) * REPEL_FORCE;
          velocities[ix] += (dx/d) * force;
          velocities[iy] += (dy/d) * force;
        }

        // Spring back to origin
        velocities[ix] += (origins[ix] - px) * RETURN_FORCE;
        velocities[iy] += (origins[iy] - py) * RETURN_FORCE;
        velocities[iz] += (origins[iz] - posArr[iz]) * RETURN_FORCE;

        // Damp
        velocities[ix] *= DAMPING;
        velocities[iy] *= DAMPING;
        velocities[iz] *= DAMPING;

        // Integrate
        posArr[ix] += velocities[ix];
        posArr[iy] += velocities[iy];
        posArr[iz] += velocities[iz];
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
      el.removeEventListener("mousemove",  onMouseMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchmove",  onTouchMove);
      el.removeEventListener("touchend",   onLeave);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [color, symbol]);

  return <div ref={mountRef} className="w-full h-full" style={{ minHeight: 340 }} />;
}

/* ─────────────────────────────────────────────
   BACKGROUND STAR FIELD
───────────────────────────────────────────── */
function StarField() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(1);
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    (el as HTMLDivElement).appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 1;

    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 80;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(geo, mat));

    let animId: number = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      scene.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if ((el as HTMLDivElement).contains(renderer.domElement))
        (el as HTMLDivElement).removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

/* ─────────────────────────────────────────────
   SERVICE SECTION  ← FIXED DESKTOP LAYOUT
───────────────────────────────────────────── */
interface ServiceSectionProps {
  service: (typeof SERVICES)[number];
  index: number;
}
function ServiceSection({ service, index }: ServiceSectionProps) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at ${isEven ? "70%" : "30%"} 50%, ${service.accent}11 0%, transparent 65%)`,
      }}
    >
      {/* Divider line */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${service.accent}40, transparent)` }}
      />

      {/*
        ── KEY FIX ──────────────────────────────────────────────────────────────
        Old:  px-8 md:px-16 lg:px-32  →  over-shrinks the container on desktop,
              pushing the left column off-screen on narrower desktop viewports.
        New:  Use a responsive clamp via inline style so padding scales smoothly
              from 24px (mobile) up to 80px (wide desktop) without ever cutting
              into the text column. max-w-6xl + mx-auto keeps it centred on
              ultra-wide screens.
        ─────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{
          padding: "5rem clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        {/* TEXT SIDE */}
        <div
          className={`flex flex-col gap-7 w-full ${isEven ? "lg:order-1" : "lg:order-2"}`}
          style={{
            maxWidth: 520,
            marginLeft: isEven ? 0 : "auto",
          }}
        >
          {/* Index badge */}
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-xs tracking-[0.35em] uppercase px-3 py-1 rounded-full border"
              style={{
                color: service.accent,
                borderColor: `${service.accent}40`,
                background: `${service.accent}10`,
              }}
            >
              {service.index}
            </span>
            <div className="h-px w-12" style={{ background: `${service.accent}40` }} />
          </div>

          {/* Heading */}
          <div className="leading-none">
            <h2
              className="font-black uppercase text-white block"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
              }}
            >
              {service.title}
            </h2>
            <h2
              className="font-black uppercase italic block"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                background: `linear-gradient(135deg, ${service.accent}, ${service.accentAlt})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {service.subtitle}
            </h2>
          </div>

          {/* SVG Icon */}
          <div
            style={{
              width: 64,
              height: 64,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 14,
              border: `1px solid ${service.accent}30`,
              background: `${service.accent}08`,
              boxShadow: `0 0 24px ${service.accent}18`,
              overflow: "hidden",
            }}
          >
            <div style={{ width: 40, height: 40, flexShrink: 0 }}>
              {service.svg}
            </div>
          </div>

          {/* Description */}
          <p
            className="text-white/60 leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
            }}
          >
            {service.description}
          </p>

          {/* Bullets */}
          <ul className="flex flex-col gap-3">
            {service.bullets.map((b: string, i: number) => (
              <li
                key={i}
                className="flex items-center gap-3 text-white/75 text-sm tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: 6,
                    height: 6,
                    background: service.accent,
                    boxShadow: `0 0 8px ${service.accent}`,
                  }}
                />
                {b}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="pt-1">
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="group inline-flex items-center gap-3 rounded-full font-semibold tracking-wide transition-all duration-300"
              style={{
                padding: "12px 28px",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                background: hovered ? service.accent : "transparent",
                color: hovered ? "#0a0a12" : service.accent,
                border: `1.5px solid ${service.accent}`,
                boxShadow: hovered ? `0 0 36px ${service.accent}50` : "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span>Explore Service</span>
              <svg
                style={{
                  width: 14,
                  height: 14,
                  transition: "transform 0.3s",
                  transform: hovered ? "translateX(4px)" : "translateX(0)",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* PARTICLE SYMBOL SIDE */}
        <div
          className={`relative flex items-center justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
          style={{ height: 460 }}
        >
          {/* Subtle radial glow behind symbol */}
          <div
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ inset: "20%", background: service.accent, opacity: 0.10 }}
          />
          <div style={{ width: "100%", height: "100%", maxWidth: 420 }}>
            <ParticleSymbol color={service.accent} symbol={service.symbol} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HERO HEADER
───────────────────────────────────────────── */
function ServicesHero() {
  return (
    <section className="relative z-10 w-full pt-56 pb-24 flex flex-col items-center text-center px-6 overflow-hidden">
      <h1
        className="font-black uppercase text-white leading-none mb-6"
        style={{
          fontSize: "clamp(3.5rem, 9vw, 8rem)",
          letterSpacing: "-0.03em",
        }}
      >
        Our{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #7C6FFF 0%, #22D3EE 50%, #34D399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Services
        </span>
      </h1>

      {/* Decorative line */}
      <div className="flex items-center gap-4 mt-12">
        {SERVICES.map((s) => (
          <div
            key={s.id}
            className="h-1 w-12 rounded-full transition-all duration-500"
            style={{ background: s.accent }}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Services() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,600;1,400&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060610; }
        h1, h2, h3, button { font-family: 'Bebas Neue', sans-serif; }
        p, li, span { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div
        className="relative min-h-screen"
        style={{ background: "linear-gradient(180deg, #060610 0%, #080818 100%)" }}
      >
        {/* Starfield BG */}
        <StarField />

        {/* Nav */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
          style={{
            background: "rgba(6,6,16,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "#7C6FFF", color: "#fff", fontFamily: "serif", fontWeight: 900, fontSize: 14 }}
            >
              I
            </div>
            <span
              className="text-white font-black tracking-[0.2em] text-sm"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.3em" }}
            >
              IRAH
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {["Services", "Work", "About Us", "Process", "Tech", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
          <button
            className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #7C6FFF, #22D3EE)",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            • Start a Project
          </button>
        </nav>

        {/* Spacer for fixed nav */}
        <div style={{ height: 88 }} />

        {/* Hero */}
        <ServicesHero />

        {/* Service Sections */}
        {SERVICES.map((service, i) => (
          <ServiceSection key={service.id} service={service} index={i} />
        ))}
      </div>
    </>
  );
}