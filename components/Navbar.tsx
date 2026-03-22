"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const services = [
  {
    icon: "◈",
    title: "Web Development",
    desc: "High-performance, scalable web apps",
    color: "#7c6fff",
  },
  {
    icon: "⬡",
    title: "E-Commerce",
    desc: "Conversion-optimized storefronts",
    color: "#a78bfa",
  },
  {
    icon: "◉",
    title: "SEO Strategy",
    desc: "Visibility that drives organic growth",
    color: "#38bdf8",
  },
  {
    icon: "⬢",
    title: "API Integration",
    desc: "Connect anything, automate everything",
    color: "#818cf8",
  },
  {
    icon: "◆",
    title: "Maintenance",
    desc: "Always-on support & iteration",
    color: "#67e8f9",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .nb-root * { box-sizing: border-box; margin: 0; padding: 0; }

        .nb-root {
          font-family: 'Syne', sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
        }

        .nb-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: 68px;
          background: rgba(6, 8, 24, 0.75);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(124, 111, 255, 0.18);
          transition: 0.3s;
        }

        .nb-bar.scrolled {
          background: rgba(4, 6, 20, 0.92);
          box-shadow: 0 8px 40px rgba(0,0,0,0.5);
        }

        .nb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .nb-logo-text {
          font-size: 17px;
          font-weight: 800;
          color: #fff;
        }

        .nb-links {
          display: flex;
          gap: 4px;
          list-style: none;
        }

        .nb-link {
          padding: 8px 14px;
          color: rgba(220, 230, 255, 0.75);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          border-radius: 8px;
          transition: 0.2s;
        }

        .nb-link:hover {
          color: #fff;
          background: rgba(124, 111, 255, 0.12);
        }

        .nb-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.1);
        }

        .nb-cta {
          padding: 10px 20px;
          background: linear-gradient(135deg, #7c6fff, #60c8ff);
          border-radius: 10px;
          color: #fff;
          font-weight: 700;
          text-decoration: none;
        }

        .nb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
        }

        .nb-hamburger span {
          width: 22px;
          height: 2px;
          background: white;
        }

        .nb-mobile {
          display: none;
          flex-direction: column;
          padding: 16px;
          background: #050720;
        }

        .nb-mobile.open { display: flex; }

        .nb-mobile-link {
          padding: 12px;
          color: white;
          text-decoration: none;
        }

        @media (max-width: 960px) {
          .nb-links, .nb-divider, .nb-cta { display: none; }
          .nb-hamburger { display: flex; }
        }
      `}</style>

      <nav className="nb-root" ref={dropdownRef}>
        <div className={`nb-bar ${scrolled ? "scrolled" : ""}`}>

          {/* LOGO */}
          <Link href="/" className="nb-logo">
            <img src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="nb-logo-text">IRAH</span>
          </Link>

          {/* NAV LINKS */}
          <ul className="nb-links">
            <li><Link href="/services" className="nb-link">Services</Link></li>

            {/* ✅ UPDATED WORK LINK */}
            <li>
              <Link href="/work" className="nb-link">
                Work
              </Link>
            </li>

            <li><Link href="/about" className="nb-link">About Us</Link></li>
            <li><Link href="/process" className="nb-link">Process</Link></li>
            <li><Link href="/tech" className="nb-link">Tech</Link></li>
            <li><Link href="/contact" className="nb-link">Contact</Link></li>
          </ul>

          {/* CTA */}
          <div style={{ display: "flex", gap: "16px" }}>
            <div className="nb-divider" />
            <Link href="/contact" className="nb-cta">
              Start a Project
            </Link>
          </div>

          {/* MOBILE */}
          <button
            className="nb-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`nb-mobile ${mobileOpen ? "open" : ""}`}>
          <Link href="/services" className="nb-mobile-link">Services</Link>
          <Link href="/work?category=All" className="nb-mobile-link">Work</Link>
          <Link href="/about" className="nb-mobile-link">About Us</Link>
          <Link href="/process" className="nb-mobile-link">Process</Link>
          <Link href="/tech" className="nb-mobile-link">Tech</Link>
          <Link href="/contact" className="nb-mobile-link">Contact</Link>
        </div>
      </nav>
    </>
  );
}