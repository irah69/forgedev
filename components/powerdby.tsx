"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Tech stack shown around the globe.
 * `pos` is a percentage-based anchor point used for the DESKTOP floating
 * layout (mirrors the reference: staggered corners around the sphere).
 * On mobile these collapse into a simple row below the globe instead —
 * absolute corner positioning doesn't survive small viewports.
 */
const STACK = [
  {
    name: "React",
    color: "#38bdf8", // cyan
    pos: { top: "18%", left: "8%" },
  },
  {
    name: "Spring Boot",
    color: "#8b5cf6", // violet
    pos: { top: "58%", left: "4%" },
  },
  {
    name: "Tailwind CSS",
    color: "#22d3ee",
    pos: { top: "72%", left: "72%" },
  },
];

function InteractiveGlobe() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ---- Scene / camera / renderer -----------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // ---- Core wireframe sphere ("the planet") -------------------------
    const coreGeo = new THREE.IcosahedronGeometry(2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x2a2a4a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Faint solid fill behind the wireframe so it reads as a volume,
    // not a flat wire cage.
    const fillGeo = new THREE.SphereGeometry(1.97, 32, 32);
    const fillMat = new THREE.MeshBasicMaterial({
      color: 0x0b0b1e,
      transparent: true,
      opacity: 0.55,
    });
    scene.add(new THREE.Mesh(fillGeo, fillMat));

    // ---- Orbiting data nodes + radiating spokes -----------------------
    const NODE_COUNT = 14;
    const nodeGroup = new THREE.Group();
    const spokeGroup = new THREE.Group();
    const palette = [0x38bdf8, 0x8b5cf6, 0x22d3ee, 0x6366f1];

    const nodePositions = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // Even-ish distribution on a sphere (fibonacci sphere)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = 2.9;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      nodePositions.push(new THREE.Vector3(x, y, z));

      const color = palette[i % palette.length];
      const nodeMat = new THREE.MeshBasicMaterial({ color });
      const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(nodePositions[i]);
      nodeGroup.add(node);

      // Faint glow halo
      const haloGeo = new THREE.SphereGeometry(0.14, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.18,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(nodePositions[i]);
      nodeGroup.add(halo);

      // Spoke from center to node
      const spokeGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        nodePositions[i],
      ]);
      const spokeMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.22,
      });
      spokeGroup.add(new THREE.Line(spokeGeo, spokeMat));
    }

    // A handful of cross-links between nearby nodes for the "network" feel
    const crossGeo = new THREE.BufferGeometry();
    const crossPts = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const next = nodePositions[(i + 3) % NODE_COUNT];
      crossPts.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
      crossPts.push(next.x, next.y, next.z);
    }
    crossGeo.setAttribute("position", new THREE.Float32BufferAttribute(crossPts, 3));
    const crossMat = new THREE.LineBasicMaterial({
      color: 0x4c4c7a,
      transparent: true,
      opacity: 0.15,
    });
    const crossLines = new THREE.LineSegments(crossGeo, crossMat);

    scene.add(spokeGroup, nodeGroup, crossLines);

    // ---- Controls (drag to rotate, gentle auto-spin) -------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.rotateSpeed = 0.5;

    // ---- Resize handling -------------------------------------------------
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        if (width === 0 || height === 0) continue;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(mount);

    // ---- Render loop -------------------------------------------------
    const animate = () => {
      controls.update();
      scene.rotation.y += 0.0002; // ultra-subtle ambient drift
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // ---- Cleanup -------------------------------------------------
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      controls.dispose();
      [coreGeo, fillGeo, crossGeo].forEach((g) => g.dispose());
      [coreMat, fillMat, crossMat].forEach((m) => m.dispose());
      nodeGroup.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      spokeGroup.children.forEach((child) => {
        const line = child as THREE.Line;
        line.geometry.dispose();
        if (Array.isArray(line.material)) {
          line.material.forEach((material) => material.dispose());
        } else {
          line.material.dispose();
        }
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D globe representing our technology network"
      role="img"
    />
  );
}

export default function PoweredByStack() {
  const [ready, setReady] = useState(false);

  // Avoids a flash of an empty canvas box before Three.js mounts.
  useEffect(() => setReady(true), []);

  return (
    <section
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "#080818", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .badge-float { animation: badgeFloat 4.5s ease-in-out infinite; }
      `}</style>

      {/* Ambient backdrop glow, consistent with the rest of the IRAH site */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99,60,180,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Heading */}
      <div className="relative z-10 text-center mb-4">
        <h2
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="text-white">Powered by </span>
          <span
            style={{
              background: "linear-gradient(90deg, #a78bfa, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Precision
          </span>
        </h2>
        <p
          className="mt-3 text-sm md:text-base max-w-md mx-auto"
          style={{ color: "rgba(180,185,210,0.65)" }}
        >
          A modern stack chosen for speed, reliability, and clean scale — drag the globe to look around.
        </p>
      </div>

      {/* Globe + floating badges (desktop) */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-xl aspect-square">
        {ready && <InteractiveGlobe />}

        {/* Desktop / tablet: badges float around the globe */}
        <div className="hidden sm:block">
          {STACK.map((item, i) => (
            <div
              key={item.name}
              className="badge-float absolute flex items-center gap-2 px-4 py-2 rounded-full pointer-events-none select-none"
              style={{
                top: item.pos.top,
                left: item.pos.left,
                background: "rgba(15,15,35,0.75)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(6px)",
                animationDelay: `${i * 400}ms`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
              />
              <span className="text-xs font-medium tracking-wide text-white/80 whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: badges as a simple row beneath the globe */}
      <div className="relative z-10 flex sm:hidden flex-wrap justify-center gap-3 mt-8">
        {STACK.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(15,15,35,0.75)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
            />
            <span className="text-xs font-medium tracking-wide text-white/80">{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}