"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface MagnifierSymbolProps {
  color: string;
}

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

/* Magnifying glass with trend arrow inside */
function genMagnifier(count: number): [number,number,number][] {
  const pts: [number,number,number][] = [];
  const PI2 = Math.PI * 2;

  // Lens center & radius
  const lx = -0.14, ly = 0.14, lr = 0.54;

  // Thick ring — 3 circles close together
  pts.push(...sampleArc(lx, ly, lr,        0, PI2, Math.floor(count * 0.22)));
  pts.push(...sampleArc(lx, ly, lr - 0.06, 0, PI2, Math.floor(count * 0.18)));
  pts.push(...sampleArc(lx, ly, lr - 0.03, 0, PI2, Math.floor(count * 0.10)));

  // Handle: diagonal bar going lower-right
  const handleAngle = -Math.PI * 0.28;
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

  // Trend arrow INSIDE lens
  const ax0 = lx - 0.30, ay0 = ly - 0.22;
  const ax1 = lx - 0.08, ay1 = ly + 0.02;
  const ax2 = lx + 0.10, ay2 = ly - 0.06;
  const ax3 = lx + 0.28, ay3 = ly + 0.22;

  const arrowLine: [number,number][] = [[ax0,ay0],[ax1,ay1],[ax2,ay2],[ax3,ay3]];
  pts.push(...samplePolyline(arrowLine, Math.floor(count * 0.12)));

  // Arrowhead at upper-right tip
  pts.push(...samplePolyline([[ax3, ay3], [ax3 - 0.14, ay3]], Math.floor(count * 0.04)));
  pts.push(...samplePolyline([[ax3, ay3], [ax3, ay3 - 0.14]], Math.floor(count * 0.04)));

  return pts.slice(0, count);
}

export default function MagnifierSymbol({ color }: MagnifierSymbolProps) {
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
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.z = 3.8;

    const c = new THREE.Color(color);

    // Generate shape
    const COUNT = 2800;
    const originPts = genMagnifier(COUNT);

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

    // Mouse / touch repulsion
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

    // Animation loop
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
  }, [color]);

  return <div ref={mountRef} className="w-full h-full" style={{ minHeight: 340 }} />;
}
