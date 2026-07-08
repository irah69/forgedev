"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProcessSection({
  category = "Development",
  step = "Discovery",
  title = "Understanding Your Vision",
  description =
    "Every successful digital product begins with understanding the client's goals, audience and business requirements. We transform ideas into a clear execution strategy before writing a single line of code.",
  image = "/logo.png",
  href = "/process",
}) {
  return (
    <section className="w-full bg-[#1f1f1f] text-white py-24 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Header */}

        <motion.div variants={fadeUp} className="mb-16">
          <p className="uppercase tracking-[0.45em] text-sm text-neutral-400">
            {category}
          </p>

          <h2 className="text-[clamp(70px,13vw,180px)] leading-[0.85] font-light">
            PROCESS
          </h2>
        </motion.div>

        <div className="border-t border-neutral-700 pt-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Image */}

            <motion.div
              variants={fadeUp}
              className="lg:col-span-4"
            >
              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="relative aspect-[4/5] overflow-hidden rounded-xl"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Content */}

            <motion.div
              variants={fadeRight}
              className="lg:col-span-5 flex flex-col justify-between h-full"
            >
              <div>
                <p className="uppercase tracking-[0.35em] text-xs text-neutral-400">
                  {step}
                </p>

                <h3 className="mt-4 text-4xl md:text-5xl font-light leading-tight">
                  {title}
                </h3>

                <p className="mt-8 text-neutral-300 leading-8 text-lg">
                  {description}
                </p>
              </div>
            </motion.div>

            {/* CTA */}

            <motion.div
              variants={fadeUp}
              className="lg:col-span-3 flex lg:justify-end"
            >
              <Link href={href} className="group mt-6 lg:mt-0">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="border border-neutral-500 rounded-full px-8 py-5 flex items-center gap-4 hover:bg-white hover:text-black transition-colors"
                >
                  <span className="uppercase tracking-[0.3em] text-sm">
                    Know More
                  </span>

                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}