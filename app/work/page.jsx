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
    <section
      ref={ref}
      className="relative h-[350vh]"
    >
      {/* Sticky Background */}
      <div className="sticky top-0 h-screen overflow-hidden">

        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0"
        >
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
      <div className="absolute inset-0 z-10">

        <div className="mx-auto max-w-7xl px-8 pt-40">

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-[Cinzel] text-5xl text-white tracking-[0.45em] md:text-8xl"
          >
            SELECTED WORK
          </motion.h1>

          {/* Projects */}

          <div className="mt-40 space-y-48">

            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{
                  opacity: 0,
                  y: 100,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <Link href={project.href}>

                  <div className="group grid gap-12 lg:grid-cols-[220px_1fr]">

                    {/* Number */}

                    <div className="relative">

                      <span className="font-[Cinzel] text-[8rem] leading-none text-white/10 transition-all duration-700 group-hover:text-orange-500/20">
                        {project.number}
                      </span>

                    </div>

                    {/* Right Side */}

                    <div>

                      {/* Image */}

                      <div className="overflow-hidden rounded-2xl">

                        <motion.div
                          whileHover={{
                            scale: 1.05,
                          }}
                          transition={{
                            duration: 1,
                          }}
                          className="relative aspect-[16/9]"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>

                      </div>

                      {/* Bottom */}

                      <div className="mt-10 flex items-end justify-between">

                        <div>

                          <h2 className="font-[Cinzel] text-5xl tracking-[0.12em] text-white">
                            {project.title}
                          </h2>

                          <p className="mt-5 uppercase tracking-[0.35em] text-white/60">
                            {project.category}
                          </p>

                        </div>

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          whileHover={{
                            width: 160,
                          }}
                          className="h-[2px] bg-orange-500"
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