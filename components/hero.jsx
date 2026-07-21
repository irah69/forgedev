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

export default function Hero({ scrollY, scrollYProgress }) {
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
  className="absolute left-0 right-0 overflow-hidden"
  style={{
    top: "65vh",
    bottom: 0,
    zIndex: 0,
  }}
>
    <Hero2
      scrollY={scrollY}
      scrollYProgress={scrollYProgress}
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
  <MistBackground />
</motion.div>

  {/* Menu */}
  <MenuOverlay open={open} setOpen={setOpen} />

  {/* UI */}
  <AnimatePresence mode="wait">
  {!open && (
    <motion.div
      key="hero-ui"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      className="absolute inset-0 z-50"
    >
      {/* Logo */}
      <Container
        src="/logo.png"
        width="clamp(70px,8vw,120px)"
        height="clamp(70px,8vw,120px)"
        top="25%"
        left="5%"
        className="-translate-y-1/2"
        z={50}
      />

      {/* IRAH */}
      <Container
        text="IRAH"
        width="250px"
        height="80px"
        top="25%"
        left="10%"
        className="-translate-y-1/2"
        z={50}
        textClassName="flex items-center h-full font-[Cinzel] text-white text-[clamp(1.75rem,3vw,3rem)] tracking-[0.45em] font-semibold"
      />

      {/* Indian Time */}
      <>
      <div className="absolute top-[45%] left-[5%] sm:left-[7%] md:left-[8%] lg:left-[10%]"> 
        <IndianTime /> 
        </div>
  {/* Normal content (first 120vh) */}
<div className="h-[120vh]" />

{/* Hero image */}
<div className="relative flex justify-center lg:absolute lg:bottom-[10%] lg:left-[5%]">
  <div className="relative h-[360px] w-[221px] sm:h-[420px] sm:w-[300px] md:h-[460px] md:w-[340px] lg:h-[clamp(400px,60vw,600px)] lg:w-[clamp(240px,40vw,560px)]">
    <Image
      src="/hero.png"
      alt="Hero"
      fill
      className="object-cover"
    />
  </div>
</div>

{/* Secondary hero image */}
<div className="hidden md:flex relative justify-center lg:absolute lg:bottom-[7%] lg:left-[25%]">
  <div className="relative h-[176px] w-[90px] lg:h-[clamp(192px,29vw,288px)] lg:w-[clamp(96px,16vw,224px)]">
    <Image
      src="/hero3.png"
      alt="Hero"
      fill
      className="object-cover"
    />
  </div>
</div>

{/* Text */}
<div className="mt-8 flex justify-center px-6 lg:mt-0 lg:absolute lg:bottom-[10%] lg:right-[15%]">
  <ScrollRevealText />
</div>
</>
    </motion.div>
  )}
</AnimatePresence>

</section>
  );
}