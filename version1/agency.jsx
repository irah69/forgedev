"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import Link from "next/link";
const cards = [
  {
    title: "For Agencies",
    description:
      "Your agency a hand short? I'm here to slot in and ride along with your team. Reach out.",
    image:
      "/agency.png",
  },
  {
    title: "For Startups",
    description:
      "Building modern applications from MVP to production with scalable architecture.",
    image:
      "/startup.png",
  },
  {
    title: "For Businesses",
    description:
      "Helping businesses improve performance with fast, reliable digital products.",
    image:
      "/business.png",
  },
];

export default function Showcase() {
  const [active, setActive] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActive((prev) => (prev + 1) % cards.length);
  }, 5000); // Change every 5 seconds

  return () => clearInterval(interval);
}, []);

  const next = () => {
    setActive((prev) => (prev + 1) % cards.length);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-[#ffffff]">
      {/* Corners */}
      
      {/* Top Navigation */}
  
      {/* Main */}
      <div className="mx-auto grid h-full max-w-7xl grid-cols-2 items-center px-20">
        {/* LEFT */}
        <div className="relative flex justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={cards[active].image}
              alt=""
              initial={{
                opacity: 0,
                x: -120,
                rotate: -18,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: -12,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: 120,
                rotate: -8,
                scale: 0.8,
              }}
              transition={{
                duration: 0.7,
              }}
              className="w-[650px] rounded-3xl "
            />
          </AnimatePresence>
        </div>

        {/* RIGHT */}
        <div className="relative flex flex-col items-center justify-center text-center">
          {/* Decoration */}
{/*           <div className="absolute left-10 top-24 h-3 w-3 bg-black"></div>
          <div className="absolute right-10 top-24 h-3 w-3 bg-black"></div>

          <div className="absolute left-10 bottom-36 h-3 w-3 bg-black"></div>
          <div className="absolute right-10 bottom-36 h-3 w-3 bg-black"></div>
 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -40,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <h2 className="mb-10 text-6xl font-semibold">
                {cards[active].title}
              </h2>

              <p className="mx-auto mb-12 max-w-xl text-3xl leading-tight">
                {cards[active].description}
              </p>

              <Link href="/services">
  <button className="inline-flex items-center gap-3 bg-black px-8 py-4 text-lg text-white transition hover:scale-105">
    Read info
    <ArrowRight size={20} />
  </button>
</Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Tabs */}
  
    </section>
  );
}