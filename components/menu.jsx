"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Tech", href: "/Tech" },
  { name: "About", href: "/Aboutus" },
  { name: "Contact", href: "/contact" },
];

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    let observer;

    const observeFooter = () => {
      const footer = document.getElementById("footer");

      if (!footer) {
        requestAnimationFrame(observeFooter);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setHideMenu(entry.isIntersecting);
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(footer);
    };

    observeFooter();

    return () => observer?.disconnect();
  }, []);

  const toggleMenu = () => {
    if (!open) {
      setOpen(true);

      // Wait until overlay animation completes
      setTimeout(() => {
        setShowClose(true);
      }, 800);
    } else {
      setShowClose(false);
      setOpen(false);
    }
  };

  if (hideMenu) return null;

  return (
    <>
      {/* Menu Button */}
      <button
  onClick={toggleMenu}
  className="fixed top-13 right-[clamp(20px,10vw,120px)] z-[101] overflow-hidden"
>
  <div className="relative h-6 w-24 overflow-hidden">
    <motion.div
      animate={{ y: showClose ? "-24px" : "0px" }}
      transition={{
        duration: 0.35,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="absolute left-0 top-0 flex flex-col font-[Cinzel] text-white uppercase tracking-[0.4em]"
    >
      <span className="h-6 leading-6">MENU</span>
      <span className="h-6 leading-6">CLOSE</span>
    </motion.div>
  </div>
</button>

      <AnimatePresence
        onExitComplete={() => {
          setShowClose(false);
        }}
      >
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-[99] bg-black text-white"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
              {links.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.08,
                    duration: 0.5,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setShowClose(false);
                      setOpen(false);
                    }}
                    className="font-[Cinzel] text-4xl font-light uppercase tracking-[0.15em] transition-colors hover:text-neutral-400 md:text-7xl"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}