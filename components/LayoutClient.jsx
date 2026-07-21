"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";

export default function LayoutClient({ children }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && (
          <Loader
            onComplete={() => setLoaded(true)}
          />
        )}
      </AnimatePresence>


      <motion.main
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: loaded ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: loaded ? 0.2 : 0,
        }}
        className="min-h-screen"
      >
        {children}
      </motion.main>
    </>
  );
}