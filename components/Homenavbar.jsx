"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

const links = [
  { href: "/work", label: "Work" },
   { href: "/tech", label: "Tech" },
     { href: "/process", label: "Process" },

  { href: "/contact", label: "Contact" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },

];

// Parent controls stagger timing, logo fires first then links one by one
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeNavbar() {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, margin: "-10% 0px" });
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

        .hnb-root {
          font-family: 'Syne', sans-serif;

          position: absolute;
          top: 0;
          left: 0;

          z-index: 9999;

          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 48px;

          padding: 32px 0 32px 40px;
          pointer-events: none;
        }

        .hnb-logo {
          display: flex;
          align-items: center;
          gap: 5px;
          text-decoration: none;
          pointer-events: auto;
          width: fit-content;
        }

        .hnb-logo-text {
          font-size: 72px;
          font-weight: 800;
          background: linear-gradient(90deg, #7c6fff, #60c8ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hnb-links {
          display: flex;
          flex-direction: column;
          gap: 22px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .hnb-link {
          pointer-events: auto;
          width: fit-content;
          background: linear-gradient(to right, #7c6fff, #5f8bff, #60c8ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
          text-decoration: none;
          font-size: 25px;
          font-weight: 1000;
          letter-spacing: 0.2px;
          position: relative;
          padding-bottom: 2px;
        }

        .hnb-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #7c6fff, #60c8ff);
          transition: width 0.3s ease;
        }

        .hnb-link:hover::after {
          width: 100%;
        }

        /* ── MOBILE BAR ── */
        .hnb-mobile-bar {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          font-family: 'Syne', sans-serif;
        }

        .hnb-mobile-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .hnb-mobile-logo-text {
          font-size: 18px;
          font-weight: 800;
          background: linear-gradient(90deg, #7c6fff, #60c8ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* ── HAMBURGER ── */
        .hnb-hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          z-index: 10000;
        }

        .hnb-hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .hnb-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hnb-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hnb-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ── MOBILE MENU OVERLAY ── */
        .hnb-mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 26px;
          padding: 40px;
        }

        .hnb-mobile-link {
          color: #fff;
          text-decoration: none;
          font-size: 28px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
        }

        .hnb-mobile-link:hover,
        .hnb-mobile-link:active {
          background: linear-gradient(90deg, #7c6fff, #60c8ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (max-width: 760px) {
          .hnb-root { display: none; }
          .hnb-mobile-bar { display: flex; }
        }
      `}</style>

      {/* ── DESKTOP NAV ── */}
      <motion.nav
        ref={rootRef}
        className="hnb-root"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}>
          <Link href="/" className="hnb-logo">
            <Image src="/logo1.png" alt="IRAH Logo" width={150} height={150} />
            <span className="hnb-logo-text">IRAH</span>
          </Link>
        </motion.div>

        <ul className="hnb-links">
          {links.map((link) => (
            <motion.li key={link.href} variants={itemVariants}>
              <Link href={link.href} className="hnb-link">
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* ── MOBILE BAR ── */}
      <div className="hnb-mobile-bar">
        <Link href="/" className="hnb-mobile-logo" onClick={closeMobile}>
          <Image src="/logo1.png" alt="IRAH Logo" width={30} height={30} />
          <span className="hnb-mobile-logo-text">IRAH</span>
        </Link>

        <button
          className={`hnb-hamburger ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="hnb-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "26px" }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {links.map((link) => (
                <motion.li key={link.href} variants={mobileLinkVariants}>
                  <Link href={link.href} className="hnb-mobile-link" onClick={closeMobile}>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}