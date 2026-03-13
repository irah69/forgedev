"use client";
import { useState, useEffect, useRef } from "react";

const services = [
  {
    icon: "◈",
    title: "Web Development",
    desc: "High-performance, scalable web apps",
    color: "#7c6fff",
  },
/*   {
    icon: "◎",
    title: "UI/UX Design",
    desc: "Interfaces users love to interact with",
    color: "#60c8ff",
  }, */
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

const workCategories = [
 /*  { label: "SaaS Products", count: "08" }, */
  { label: "E-Commerce", count: "12" },
  { label: "Branding & Web", count: "06" },
  { label: "Mobile Apps", count: "04" },
];

type DropdownType = "services" | "work" | null;
export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && e.target instanceof Node && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (name: DropdownType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

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
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(124, 111, 255, 0.18);
          transition: background 0.3s, box-shadow 0.3s;
        }

        .nb-bar.scrolled {
          background: rgba(4, 6, 20, 0.92);
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(124,111,255,0.2);
        }

        /* LOGO */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nb-logo-mark {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #7c6fff 0%, #60c8ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          letter-spacing: -1px;
          box-shadow: 0 0 18px rgba(124,111,255,0.5);
        }

        .nb-logo-text {
          font-size: 17px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .nb-logo-text span {
          background: linear-gradient(90deg, #7c6fff, #60c8ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* NAV LINKS */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }

        .nb-link-item {
          position: relative;
        }

        .nb-link {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 14px;
          color: rgba(220, 230, 255, 0.75);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.3px;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          cursor: pointer;
          border: none;
          background: transparent;
          font-family: 'Syne', sans-serif;
          white-space: nowrap;
        }

        .nb-link:hover, .nb-link.active {
          color: #fff;
          background: rgba(124, 111, 255, 0.12);
        }

        .nb-link svg {
          width: 10px;
          height: 10px;
          opacity: 0.6;
          transition: transform 0.2s, opacity 0.2s;
          flex-shrink: 0;
        }

        .nb-link.active svg {
          transform: rotate(180deg);
          opacity: 1;
        }

        /* DROPDOWN PANEL */
        .nb-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(7, 9, 28, 0.97);
          border: 1px solid rgba(124, 111, 255, 0.2);
          border-radius: 16px;
          padding: 20px;
          opacity: 0;
          pointer-events: none;
          transform: translateX(-50%) translateY(-8px);
          transition: opacity 0.2s, transform 0.2s;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .nb-dropdown.open {
          opacity: 1;
          pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }

        /* SERVICES DROPDOWN */
        .nb-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          width: 540px;
        }

        .nb-service-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          text-decoration: none;
        }

        .nb-service-card:hover {
          background: rgba(124, 111, 255, 0.1);
          border-color: rgba(124, 111, 255, 0.3);
          transform: translateY(-1px);
        }

        .nb-service-icon {
          font-size: 18px;
          line-height: 1;
          margin-top: 1px;
          flex-shrink: 0;
        }

        .nb-service-info h4 {
          font-size: 12.5px;
          font-weight: 700;
          color: #e0e8ff;
          letter-spacing: 0.1px;
          margin-bottom: 2px;
        }

        .nb-service-info p {
          font-size: 11px;
          color: rgba(180, 195, 230, 0.6);
          font-weight: 400;
          line-height: 1.4;
        }

        /* WORK DROPDOWN */
        .nb-work-panel {
          display: flex;
          gap: 20px;
          width: 460px;
        }

        .nb-work-categories {
          flex: 1;
        }

        .nb-work-categories h3 {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: rgba(124, 111, 255, 0.8);
          text-transform: uppercase;
          margin-bottom: 10px;
          font-family: 'Space Mono', monospace;
        }

        .nb-work-cat-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
          text-decoration: none;
          margin-bottom: 3px;
        }

        .nb-work-cat-item:hover {
          background: rgba(124, 111, 255, 0.1);
        }

        .nb-work-cat-item span:first-child {
          font-size: 13px;
          font-weight: 600;
          color: rgba(210, 220, 255, 0.85);
        }

        .nb-work-badge {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(124, 111, 255, 0.7);
          background: rgba(124, 111, 255, 0.1);
          border: 1px solid rgba(124, 111, 255, 0.2);
          border-radius: 4px;
          padding: 2px 6px;
        }

        .nb-work-featured {
          width: 180px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(124,111,255,0.15), rgba(96,200,255,0.08));
          border: 1px solid rgba(124, 111, 255, 0.2);
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 8px;
        }

        .nb-featured-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(96, 200, 255, 0.7);
          font-family: 'Space Mono', monospace;
        }

        .nb-featured-title {
          font-size: 14px;
          font-weight: 800;
          color: #fff;
          line-height: 1.3;
        }

        .nb-featured-cta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: rgba(124, 111, 255, 0.9);
          text-decoration: none;
          transition: gap 0.2s;
        }

        .nb-featured-cta:hover { gap: 10px; }

        /* DIVIDER */
        .nb-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.1);
          margin: 0 6px;
        }

        /* CTA BUTTON */
        .nb-cta-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .nb-cta-ring {
          position: absolute;
          inset: -6px;
          border-radius: 16px;
          border: 1.5px solid rgba(124, 111, 255, 0.5);
          animation: pulse-ring 2.2s ease-in-out infinite;
          pointer-events: none;
        }

        .nb-cta-ring-2 {
          position: absolute;
          inset: -12px;
          border-radius: 20px;
          border: 1px solid rgba(96, 200, 255, 0.25);
          animation: pulse-ring 2.2s ease-in-out infinite 0.6s;
          pointer-events: none;
        }

        @keyframes pulse-ring {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.04); }
        }

        .nb-cta {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #7c6fff 0%, #60c8ff 100%);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 0 24px rgba(124, 111, 255, 0.4);
        }

        .nb-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 36px rgba(124, 111, 255, 0.6), 0 8px 24px rgba(0,0,0,0.3);
        }

        .nb-cta-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.8);
          animation: blink 1.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* DROPDOWN ARROW */
        .nb-dropdown::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: rgba(7, 9, 28, 0.97);
          border-left: 1px solid rgba(124, 111, 255, 0.2);
          border-top: 1px solid rgba(124, 111, 255, 0.2);
          rotate: 45deg;
        }

        /* MOBILE HAMBURGER */
        .nb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 8px;
          background: transparent;
          border: none;
        }

        .nb-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: rgba(220, 230, 255, 0.8);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }

        .nb-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nb-hamburger.open span:nth-child(2) { opacity: 0; }
        .nb-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* MOBILE MENU */
        .nb-mobile {
          display: none;
          flex-direction: column;
          padding: 16px 20px 24px;
          background: rgba(4, 6, 20, 0.98);
          border-top: 1px solid rgba(124, 111, 255, 0.15);
          gap: 4px;
          max-height: calc(100vh - 68px);
          overflow-y: auto;
        }

        .nb-mobile.open { display: flex; }

        .nb-mobile-link {
          padding: 12px 14px;
          color: rgba(220, 230, 255, 0.8);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 10px;
          transition: background 0.2s, color 0.2s;
          font-family: 'Syne', sans-serif;
        }

        .nb-mobile-link:hover {
          background: rgba(124, 111, 255, 0.1);
          color: #fff;
        }

        .nb-mobile-cta {
          margin-top: 12px;
          padding: 13px 20px;
          background: linear-gradient(135deg, #7c6fff, #60c8ff);
          border-radius: 10px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          box-shadow: 0 0 24px rgba(124, 111, 255, 0.4);
          font-family: 'Syne', sans-serif;
        }

        @media (max-width: 960px) {
          .nb-links, .nb-divider, .nb-cta-wrapper { display: none !important; }
          .nb-hamburger { display: flex; }
        }
      `}</style>

      <nav className="nb-root" ref={dropdownRef}>
        <div className={`nb-bar ${scrolled ? "scrolled" : ""}`}>
          {/* LOGO */}
          <a href="/" className="nb-logo">
            <div className="nb-logo-mark">N</div>
            <span className="nb-logo-text">
              IRAH
            </span>
          </a>

          {/* NAV LINKS */}
          <ul className="nb-links">
            {/* Services */}
            <li
              className="nb-link-item"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`nb-link ${activeDropdown === "services" ? "active" : ""}`}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "services" ? null : "services"
                  )
                }
              >
                Services
                <svg viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={`nb-dropdown ${activeDropdown === "services" ? "open" : ""}`}>
                <div className="nb-services-grid">
                  {services.map((s) => (
                    <a href="#" className="nb-service-card" key={s.title}>
                      <span className="nb-service-icon" style={{ color: s.color }}>
                        {s.icon}
                      </span>
                      <div className="nb-service-info">
                        <h4>{s.title}</h4>
                        <p>{s.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </li>

            {/* Work */}
            <li
              className="nb-link-item"
              onMouseEnter={() => handleMouseEnter("work")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`nb-link ${activeDropdown === "work" ? "active" : ""}`}
                onClick={() =>
                  setActiveDropdown(activeDropdown === "work" ? null : "work")
                }
              >
                Work
                <svg viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={`nb-dropdown ${activeDropdown === "work" ? "open" : ""}`}>
                <div className="nb-work-panel">
                  <div className="nb-work-categories">
                    <h3>Categories</h3>
                    {workCategories.map((cat) => (
                      <a href="#" className="nb-work-cat-item" key={cat.label}>
                        <span>{cat.label}</span>
                        <span className="nb-work-badge">{cat.count}</span>
                      </a>
                    ))}
                  </div>
                  <div className="nb-work-featured">
                    <span className="nb-featured-label">Featured</span>
                    <p className="nb-featured-title">SaaS Dashboard Rebuild</p>
                    <a href="#" className="nb-featured-cta">
                      View Case Study →
                    </a>
                  </div>
                </div>
              </div>
            </li>

            <li><a href="/about" className="nb-link">About Us</a></li>
            <li><a href="/process" className="nb-link">Process</a></li>
            <li><a href="/blog" className="nb-link">Blog</a></li>
            <li><a href="/contact" className="nb-link">Contact</a></li>
          </ul>

          {/* DIVIDER + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
            <div className="nb-divider" />
            <div className="nb-cta-wrapper">
              <div className="nb-cta-ring" />
              <div className="nb-cta-ring-2" />
              <a href="/contact" className="nb-cta">
                <span className="nb-cta-dot" />
                Start a Project
              </a>
            </div>
          </div>

          {/* HAMBURGER */}
          <button
            className={`nb-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`nb-mobile ${mobileOpen ? "open" : ""}`}>
          <a href="/services" className="nb-mobile-link">Services</a>
          <a href="/work" className="nb-mobile-link">Work</a>
          <a href="/about" className="nb-mobile-link">About Us</a>
          <a href="/process" className="nb-mobile-link">Process</a>
          <a href="/blog" className="nb-mobile-link">Blog</a>
          <a href="/contact" className="nb-mobile-link">Contact</a>
          <a href="/contact" className="nb-mobile-cta">Start a Project ✦</a>
        </div>
      </nav>
    </>
  );
}