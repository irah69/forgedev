"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll } from "framer-motion";

import Hero from "@/components/hero";
import Home2 from "@/components/home2";
import AnimatedText from "@/components/home3";
export default function Home() {
  const pageRef = useRef(null);

  const { scrollY, scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={pageRef} className="relative min-h-screen">
      {/* Background */}
      

      {/* Optional overlay */}
      <div className="fixed inset-0 -z-10 bg-black/30" />

      <Hero
        scrollY={scrollY}
        scrollYProgress={scrollYProgress}
      />

      <Home2 />
      <AnimatedText />
    </main>
  );
}