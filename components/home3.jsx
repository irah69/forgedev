"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

export default function AnimatedText() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Raw values tied to scroll
  const rawOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.9, 1],
    [0, 1, 1]
  );

  const rawY = useTransform(
    scrollYProgress,
    [0.55, 0.9, 1],
    [250, 0, 0]
  );

  // Smooth spring animation
  const opacity = useSpring(rawOpacity, {
    stiffness: 45,
    damping: 22,
    mass: 1,
  });

  const y = useSpring(rawY, {
    stiffness: 45,
    damping: 22,
    mass: 1,
  });

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <Image
          src="/hero.png"
          alt="Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Logo */}
            <Image
              src="/logo.png"
              alt="IRAH"
              width={180}
              height={180}
              priority
              className="mb-8"
            />

            {/* Title */}
            <h1 className="font-[Syne] text-5xl font-bold tracking-tight text-white md:text-7xl">
              IRAH
            </h1>

            {/* Paragraph */}
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              IRAH began with a simple belief—great digital products should be
              built with purpose, not just technology. What started as a
              personal journey of learning, experimenting, and building
              projects gradually evolved into a creative development studio
              focused on crafting modern websites, intelligent web
              applications, and meaningful digital experiences. Every project
              reflects a commitment to thoughtful design, scalable engineering,
              and continuous innovation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}