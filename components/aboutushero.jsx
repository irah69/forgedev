"use client";
import Hero2 from "@/components/hero2";
import { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

import MistBackground from "@/components/smoke";
import Container from "@/components/container";
import MenuOverlay from "@/components/menu";
import IndianTime from "@/components/IndianTime";
import ScrollRevealText from "@/components/ScrollRevealText";
const MotionImage = motion.create(Image);

export default function HeroAbout({ scrollY, scrollYProgress }) {
  const [open, setOpen] = useState(false);

  // Vertical reveal
  const fadeStart = useTransform(scrollYProgress, [0, 0.35], [100, 45]);
  const fadeEnd = useTransform(scrollYProgress, [0, 0.35], [100, 82]);

  // Width of opening
  const holeWidth = useTransform(scrollYProgress, [0, 0.35], [0, 65]);

  // Height of opening
  const holeHeight = useTransform(scrollYProgress, [0, 0.35], [0, 45]);
const heroOpacity = useTransform(
  scrollYProgress,
  [0.75, 0.95, 1],
  [1, 1, 0]
);

const heroScale = useTransform(
  scrollYProgress,
  [0.8, 1],
  [1, 0.92]
);

const heroY = useTransform(
  scrollYProgress,
  [0.8, 1],
  [0, -40]
);
  const imageMask = useMotionTemplate`
    radial-gradient(
      ellipse ${holeWidth}% ${holeHeight}% at 50% 100%,
      transparent 0%,
      transparent 45%,
      black 75%
    ),
    linear-gradient(
      to bottom,
      black 0%,
      black ${fadeStart}%,
      transparent ${fadeEnd}%,
      transparent 100%
    )
  `;

  return (
   <section className="relative overflow-hidden h-[200vh]">

  {/* Hero2 (starts at 70vh and fills the rest) */}
<div
  className="absolute left-0 right-0 overflow-hidden bg-black"
  style={{
    top: "60vh",
    bottom: 0,
    zIndex: 0,
  }}
>
  <Image
    src="/map1.png"
    alt="Map"
    fill
    priority
    className="object-contain"
  />
  <Container
        src="/logo.png"
        width="clamp(70px,8vw,120px)"
        height="clamp(70px,8vw,120px)"
        top="25%"
        right="5%"
        className="-translate-y-1/2"
        z={50}
      />
<Container
        text="IRAH"
        width="250px"
        height="80px"
        top="25%"
        right="10%"
        className="-translate-y-1/2"
        z={50}
        textClassName="flex items-center h-full font-[Cinzel] text-white text-[clamp(1.75rem,3vw,3rem)] tracking-[0.45em] font-semibold"
      />
      <div className="absolute bottom-10 left-10 flex items-center font-[Cinzel] text-white text-[clamp(1.2rem,2vw,2rem)] tracking-[0.35em] font-semibold uppercase">
  <p>Operating from India • Building for the World</p>
</div>
  <div
    className="absolute inset-x-0 top-0 h-48 z-10 pointer-events-none"
    style={{
      background:
        "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.5) 55%, transparent 100%)",
    }}
  />
</div>
  {/* Hero Image (only first 100vh) */}
  <div className="absolute top-0 left-0 w-full h-screen z-20">
    <MotionImage
      src="/hero.png"
      alt="Hero"
      fill
      priority
      className="object-cover"
      style={{
        WebkitMaskImage: imageMask,
        maskImage: imageMask,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    />
  </div>

  {/* Smoke only over Hero */}
  <motion.div
  className="absolute top-0 left-0 w-full h-screen z-30 pointer-events-none"
  style={{
    WebkitMaskImage: imageMask,
    maskImage: imageMask,
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect",
  }}
>
</motion.div>

  {/* Menu */}


</section>
  );
}