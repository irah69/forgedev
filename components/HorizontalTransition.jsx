"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HorizontalTransition({
  left,
  right,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Move from 0% to -50%
  // Since inner width is 200vw, -50% brings the second section fully into view
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        <motion.div
          style={{ x }}
          className="flex w-[200vw] h-full"
        >
          {/* LEFT PANEL */}
          <div className="w-screen h-full flex-shrink-0">
            {left}
          </div>

          {/* RIGHT PANEL */}
          <div className="w-screen h-full flex-shrink-0">
            {right}
          </div>

        </motion.div>

      </div>
    </section>
  );
}