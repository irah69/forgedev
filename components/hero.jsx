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
      {/* -------------------------------- */}
      {/* Header (Shared) */}
      {/* -------------------------------- */}

      <div
  className="
    absolute
    top-[25%]
    left-[5%]
    -translate-y-1/2
    z-50
    flex
    items-center
    gap-2
    sm:gap-3
    md:gap-4
    lg:gap-5
  "
>
  <Image
    src="/logo.png"
    alt="IRAH Logo"
    width={120}
    height={120}
    className="h-[70px] w-[70px] sm:h-[80px] sm:w-[80px] md:h-[95px] md:w-[95px] lg:h-[120px] lg:w-[120px]"
  />

  <h1
    className="
      font-[Cinzel]
      font-semibold
      text-white
      tracking-[0.25em]
      sm:tracking-[0.3em]
      lg:tracking-[0.45em]
      text-[1.5rem]
      sm:text-[2rem]
      md:text-[2.5rem]
      lg:text-[3rem]
      whitespace-nowrap
    "
  >
    IRAH
  </h1>
</div>

      <div className="absolute top-[45%] left-[5%] sm:left-[7%] md:left-[8%] lg:left-[10%]">
        <IndianTime />
      </div>

      {/* ============================================= */}
      {/* MOBILE & TABLET */}
      {/* ============================================= */}

      <div className="lg:hidden pt-[120vh] px-6 pb-12">
        <div className="flex justify-center">
          <div className="relative h-[360px] w-[221px] sm:h-[420px] sm:w-[300px]">
            <Image
              src="/hero8.avif"
              alt="Hero"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <p className="max-w-md text-center font-[Cinzel] text-[clamp(1rem,4vw,1.25rem)] leading-8 tracking-[0.12em] text-white/80">
            We build modern digital experiences that combine thoughtful design,
            cutting-edge technology, and AI to help businesses create meaningful
            products and lasting impact.
          </p>
        </div>
      </div>

      {/* ============================================= */}
      {/* DESKTOP */}
      {/* ============================================= */}

      <div className="hidden lg:block">
        {/* Main Hero */}
        <div className="absolute bottom-[10%] left-[5%]">
          <div className="relative h-[clamp(400px,60vw,600px)] w-[clamp(240px,40vw,560px)]">
            <Image
              src="/hero8.avif"
              alt="Hero"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Secondary Image */}
        <div className="absolute bottom-[7%] left-[28%]">
          <div className="relative h-[clamp(192px,29vw,288px)] w-[clamp(96px,16vw,224px)]">
            <Image
              src="/hero3.png"
              alt="Hero"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Scroll Text */}
        <div className="absolute bottom-[10%] right-[8%] w-[42rem] max-w-[42vw]">
  <ScrollRevealText />
</div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

</section>
  );
}