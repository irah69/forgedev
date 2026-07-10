"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { svgPathProperties } from "svg-path-properties";

interface ShoppingBagSymbolProps {
  color: string;
}

/** Generate points from SVG path (perfect precision) */
function genShoppingCartFromSVG(count: number): [number, number, number][] {
  const path = `
    M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44
    C7.16 16.37 7 16.68 7 17
    a1 1 0 001 1h12v-2H8.42
    c-.14 0-.25-.11-.25-.25l.03-.12
    L9.1 14h7.45c.75 0 1.41-.41 1.75-1.03
    L21 6H7z
  `;

  const props = new svgPathProperties(path);
  const length = props.getTotalLength();

  const pts: [number, number, number][] = [];

  for (let i = 0; i < count; i++) {
    const point = props.getPointAtLength((i / count) * length);

    pts.push([
      (point.x - 12) / 10, // center & scale
      -(point.y - 12) / 10,
      (Math.random() - 0.5) * 0.02,
    ]);
  }

  return pts;
}

export default function ShoppingBagSymbol({ color }: ShoppingBagSymbolProps) {
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

    // 🔥 Generate perfect cart shape
    const COUNT = 3000;
    const originPts = genShoppingCartFromSVG(COUNT);

    const origins = new Float32Array(COUNT * 3);
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const pSizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const [ox, oy, oz] = originPts[i] ?? [0, 0, 0];
      origins[i * 3] = ox;
      origins[i * 3 + 1] = oy;
      origins[i * 3 + 2] = oz;

      positions[i * 3] = ox;
      positions[i * 3 + 1] = oy;
      positions[i * 3 + 2] = oz;

      pSizes[i] = Math.random() * 1.6 + 1.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(pSizes, 1));

    const mat = new THREE.PointsMaterial({
      color: c,
      size: 0.028,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    });

    const pointsMesh = new THREE.Points(geo, mat);
    scene.add(pointsMesh);

    // 🖱 Mouse interaction
    const mouse = { x: 99999, y: 99999 };
    const REPEL_RADIUS = 0.42;
    const REPEL_FORCE = 0.012;
    const RETURN_FORCE = 0.02;
    const DAMPING = 0.92;

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

      mouse.x = world.x;
      mouse.y = world.y;
    }

    const onMouseMove = (e: MouseEvent) =>
      screenToWorld(e.clientX, e.clientY);

    const onLeave = () => {
      mouse.x = 99999;
      mouse.y = 99999;
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onLeave);

    // 🎬 Animation loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const posArr = geo.attributes.position.array as Float32Array;

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const px = posArr[ix];
        const py = posArr[iy];

        // Repulsion
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 1e-6) {
          const d = Math.sqrt(distSq);
          const force =
            ((REPEL_RADIUS - d) / REPEL_RADIUS) * REPEL_FORCE;

          velocities[ix] += (dx / d) * force;
          velocities[iy] += (dy / d) * force;
        }

        // Return to shape
        velocities[ix] += (origins[ix] - px) * RETURN_FORCE;
        velocities[iy] += (origins[iy] - py) * RETURN_FORCE;
        velocities[iz] += (origins[iz] - posArr[iz]) * RETURN_FORCE;

        // Damping
        velocities[ix] *= DAMPING;
        velocities[iy] *= DAMPING;
        velocities[iz] *= DAMPING;

        // Apply
        posArr[ix] += velocities[ix];
        posArr[iy] += velocities[iy];
        posArr[iz] += velocities[iz];
      }

      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (el.contains(renderer.domElement))
        el.removeChild(renderer.domElement);
    };
  }, [color]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: 340 }}
    />
  );
}