"use client";

import { motion } from "framer-motion";
import Link from "next/link";
export default function TechStackGrid() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1f1f1f] text-white">
      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{
    once: false,
    amount: 0.5,
  }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }}
  className="text-center max-w-5xl"
>
          <h1
            className="
              font-bold
              tracking-tight
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              xl:text-9xl
              leading-[0.95]
            "
          >
            Our Digital 
            <br />
            Expertise
          </h1>

          <p
            className="
              mt-6
              mx-auto
              max-w-2xl
              text-base
              sm:text-lg
              md:text-xl
              text-white/70
              leading-relaxed
            "
          >
           We design and develop high-performance websites, applications, and digital solutions that transform ideas into impactful experiences.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        

<Link
  href="/contact"
  className="
    rounded-full
    bg-white
    px-8
    py-3
    text-black
    font-medium
    transition
    hover:scale-105
    inline-block
  "
>
  Get Started
</Link>

            <Link
  href="/work"
  className="
    rounded-full
    border
    border-white/30
    px-8
    py-3
    text-white
    font-medium
    transition
    hover:bg-white/10
    inline-block
  "
>
  View Work
</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}