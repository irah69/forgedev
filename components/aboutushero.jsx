"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutHero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Mountain parallax
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const mountainScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  // Text reveal
  const textY = useTransform(scrollYProgress, [0, 0.22], [140, 0]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 1],
    [0, 1, 1]
  );

  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0.7em", "0.45em"]
  );

  return (
    <section
      ref={ref}
      className="relative h-[220vh] overflow-hidden bg-[#05070B]"
    >
      {/* Sticky Hero */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,#182843 0%,#101B30 40%,#070F1A 75%,#000000 100%)",
          }}
        />

        {/* Mountain */}
        <motion.div
          style={{
            y: mountainY,
            scale: mountainScale,
          }}
          className="absolute inset-0 z-20"
        >
          <Image
            src="/hero9.png"
            alt="Mountain"
            fill
            priority
            className="object-cover object-bottom"
          />

          {/* Cinematic Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  to bottom,
                  rgba(0,0,0,.25) 0%,
                  rgba(0,0,0,.15) 35%,
                  rgba(0,0,0,.45) 70%,
                  rgba(0,0,0,.85) 100%
                )
              `,
            }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
          }}
          className="absolute inset-0 z-30 flex items-center justify-center"
        >
          <motion.h1
            style={{
              letterSpacing,
            }}
            className="
              font-[Cinzel]
              font-semibold
              uppercase
              text-white
              leading-none
              text-center
              text-[clamp(4rem,14vw,13rem)]
              drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]
            "
          >
            IRAH
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}