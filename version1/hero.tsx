"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/ram.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text legibility — heavier on the right where copy sits */}

      {/* Hero copy — anchored bottom-right, clear of subject and nav on every screen size */}
      <div
        className="
          absolute inset-0 flex flex-col justify-end items-end text-right
          px-6 pb-14
          sm:px-10 sm:pb-16
          md:pr-16 md:pb-20
          lg:pr-24 lg:pb-24
        "
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="
            font-[Syne] font-extrabold text-white
            leading-[1.08] tracking-tight
            text-[clamp(1.9rem,4.2vw,3.4rem)]
            max-w-[18ch] ml-auto
            drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]
          "
        >
          Crafting the Future{" "}
          <span className="bg-gradient-to-r from-[#7c6fff] to-[#60c8ff] bg-clip-text text-transparent">
            One Pixel at a Time.
          </span>
        </motion.h1>

{/*         <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="
            mt-4 text-black
            text-[clamp(0.9rem,1.3vw,1.1rem)]
            max-w-[38ch] ml-auto
            leading-relaxed
          "
        >
          IRAH TECH crafts high-performance web apps, storefronts, and brand
          systems for businesses ready to grow.
        </motion.p> */}
      </div>
    </section>
  );
}