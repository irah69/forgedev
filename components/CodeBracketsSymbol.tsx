"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CodeBracketsSymbolProps {
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

/* Code brackets: < / > symbols for web dev */
function genCodeBrackets(count: number): [number,number,number][] {
  const pts: [number,number,number][] = [];

  const thickness = 0.072;

  // LEFT bracket <
  const lTop:    [number,number][] = [[-0.10, -0.64], [-0.72,  0.00]];
  const lBottom: [number,number][] = [[-0.72,  0.00], [-0.10,  0.64]];
  for (let t = -thickness; t <= thickness; t += thickness/2) {
    pts.push(...samplePolyline(lTop.map(([x,y]) => [x, y+t] as [number,number]), Math.floor(count * 0.055)));
    pts.push(...samplePolyline(lBottom.map(([x,y]) => [x, y+t] as [number,number]), Math.floor(count * 0.055)));
  }

  // RIGHT bracket >
  const rTop:    [number,number][] = [[ 0.10, -0.64], [ 0.72,  0.00]];
  const rBottom: [number,number][] = [[ 0.72,  0.00], [ 0.10,  0.64]];
  for (let t = -thickness; t <= thickness; t += thickness/2) {
    pts.push(...samplePolyline(rTop.map(([x,y]) => [x, y+t] as [number,number]), Math.floor(count * 0.055)));
    pts.push(...samplePolyline(rBottom.map(([x,y]) => [x, y+t] as [number,number]), Math.floor(count * 0.055)));
  }

  // SLASH /
  const slashLine: [number,number][] = [[ 0.22, -0.70], [-0.22,  0.70]];
  for (let t = -thickness; t <= thickness; t += thickness/2) {
    pts.push(...samplePolyline(slashLine.map(([x,y]) => [x+t, y] as [number,number]), Math.floor(count * 0.075)));
  }

  return pts.slice(0, count);
}

export default function CodeBracketsSymbol({ color }: CodeBracketsSymbolProps) {
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
    const originPts = genCodeBrackets(COUNT);

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
