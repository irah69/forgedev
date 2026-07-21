"use client";

import ContainerImage from "./ContainerImage";
import { motion } from "framer-motion";

const content = [
  {
    image: "/webdev1.png",
    title: "Crafting Digital Experiences",
    description:
      "We design and develop fast, scalable, and visually striking websites that blend creativity with modern technology to deliver exceptional user experiences."
  },
  {
    image: "/webdev3.png",
    title: "Keeping Your Business Online",
    description:
      "From continuous maintenance and performance optimization to security updates and feature enhancements, we ensure your website remains reliable, secure, and ready for growth."
  },
];

export default function Home2() {
  return (
    <section className="bg-black text-white overflow-hidden">
      {content.map((item, index) => (
        <div
          key={index}
          className={`
            min-h-screen
            w-full
            flex
            items-center
            justify-center
            px-6
            sm:px-8
            md:px-12
            lg:px-20
            py-16
            sm:py-20
            gap-10
            sm:gap-12
            lg:gap-20
            border-b
            border-white/10
            ${index % 2 === 0 ? "flex-col lg:flex-row" : "flex-col lg:flex-row-reverse"}
          `}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="
              w-full
              max-w-[420px]
              sm:max-w-[480px]
              lg:max-w-[600px]
              lg:w-1/2
              mx-auto
            "
          >
            <ContainerImage
              src={item.image}
              // Container Size — responsive aspect instead of fixed px
              height="h-[420px] sm:h-[520px] md:h-[600px] lg:h-[700px]"
              width="w-full"
              // Image Fit
              objectFit="cover"
              // Bands
              bands={2}
              bandWidth="10%"
              bandGap="15%"
              // Animation
              direction={index % 2 === 0 ? "right" : "left"}
              movement="180%"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="
              w-full
              lg:w-1/2
              flex
              flex-col
              items-center
              lg:items-start
              text-center
              lg:text-left
              space-y-5
              sm:space-y-6
              px-2
              sm:px-0
            "
          >
            <h2
              className="
                font-[Cinzel]
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                font-bold
                tracking-tight
                leading-tight
              "
            >
              {item.title}
            </h2>

            <p
              className="
                font-[Cinzel]
                text-base
                sm:text-lg
                md:text-xl
                text-white/60
                max-w-xl
                leading-relaxed
              "
            >
              {item.description}
            </p>

            <div className="h-[2px] w-16 sm:w-24 bg-white/40" />
          </motion.div>
        </div>
      ))}
    </section>
  );
}