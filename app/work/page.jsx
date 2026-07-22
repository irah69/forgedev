"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    number: "01",
    title: "MURGAN COLLECTIONS",
    category: "E-Commerce · Web Development",
    image: "/projects/murgan.png",
    href: "https://murgan-ui.vercel.app/",
  },
  {
    number: "02",
    title: "Little Berries",
    category: "Education & Childcare",
    image: "/projects/littleberries.png",
    href: "https://littleberries.co.in/",
  },
  {
    number: "03",
    title: "SLV Banquet Halls",
    category: "Branding · Web Development",
    image: "/projects/slv.png",
    href: "https://slvbanquethalls.com/",
  },
];

export default function Work() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Slow parallax movement
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="relative h-[300vh] sm:h-[320vh] md:h-[350vh]">
      {/* Sticky Background */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <Image
            src="/image.png"
            alt=""
            fill
            priority
            className="object-cover scale-[1.3]"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-5 pt-20 sm:px-8 sm:pt-28 md:px-10 md:pt-36 lg:px-12 lg:pt-40">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-[Cinzel] text-3xl leading-tight tracking-[0.15em] text-white sm:text-5xl sm:tracking-[0.3em] md:text-7xl md:tracking-[0.4em] lg:text-8xl lg:tracking-[0.45em]"
          >
            SELECTED WORK
          </motion.h1>

          {/* Projects */}
          <div className="mt-16 space-y-20 pb-20 sm:mt-24 sm:space-y-28 sm:pb-28 md:mt-32 md:space-y-40 lg:mt-40 lg:space-y-48">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <Link href={project.href}>
                  <div className="group grid grid-cols-1 gap-4 sm:grid-cols-[64px_1fr] sm:gap-6 md:grid-cols-[110px_1fr] md:gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
                    {/* Number */}
                    <div className="relative">
                      <span className="font-[Cinzel] text-4xl leading-none text-white/10 transition-all duration-700 group-hover:text-orange-500/20 sm:text-6xl md:text-7xl lg:text-[8rem]">
                        {project.number}
                      </span>
                    </div>

                    {/* Right Side */}
                    <div className="min-w-0">
                      {/* Image */}
                      <div className="overflow-hidden rounded-xl sm:rounded-2xl">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.8 }}
                          className="relative aspect-[4/3] md:aspect-[16/9]"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
                            className="object-cover"
                          />
                        </motion.div>
                      </div>

                      {/* Bottom */}
                      <div className="mt-5 flex flex-col items-start justify-between gap-3 sm:mt-8 sm:flex-row sm:items-end sm:gap-4 md:mt-10">
                        <div className="min-w-0">
                          <h2 className="font-[Cinzel] text-2xl leading-tight tracking-[0.04em] text-white break-words sm:text-3xl sm:tracking-[0.08em] md:text-4xl lg:text-5xl lg:tracking-[0.12em]">
                            {project.title}
                          </h2>

                          <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/60 sm:mt-4 sm:text-xs sm:tracking-[0.3em] md:mt-5 md:tracking-[0.35em]">
                            {project.category}
                          </p>
                        </div>

                        <motion.div
                          initial={{ width: 0 }}
                          whileHover={{ width: 160 }}
                          className="h-[2px] max-w-full shrink-0 bg-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}