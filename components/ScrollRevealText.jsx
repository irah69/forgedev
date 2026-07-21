"use client";

import { motion } from "framer-motion";

export default function ScrollRevealText() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-[520px] font-[Cinzel] text-[clamp(1.6rem,2vw,2.3rem)] leading-relaxed text-white"
    >
      IRAH TECH builds modern digital experiences that help businesses grow online.
We create high-performance websites, web applications, and custom solutions tailored to your vision.
With creativity, technology, and strategy, we transform ideas into impactful digital products.
Partner with IRAH TECH to build, scale, and elevate your online presence.

    </motion.p>
  );
}