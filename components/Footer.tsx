"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

type FooterLink = { label: string; href: string; badge?: string };
const footerLinks: Record<string, FooterLink[]> = {
  Services: [
    { label: "Web Development", href: "/services/web-dev" },
    { label: "E-Commerce", href: "/services/ecommerce" },
    { label: "SEO Strategy", href: "/services/seo" },
    { label: "API Integration", href: "/services/api" },
    { label: "Maintenance", href: "/services/maintenance" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Case Studies", href: "/work" },

  
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
  
    { label: "Style Guide", href: "/style-guide" },
    { label: "Tech Stack", href: "/stack" }
  ],
};

const socials = [
  {
    name: "Twitter / X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Dribbble",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.048 6.39 1.73 1.358 3.92 2.166 6.298 2.166 1.42 0 2.77-.29 4.006-.806zm-9.88-2.65c.25-.438 3.288-5.403 8.594-7.445.02-.008.038-.013.06-.02-.22-.507-.456-1.01-.707-1.51C9.94 10.233 5.64 10.177 5.28 10.17l-.008.006v.024c0 2.44.87 4.68 2.3 6.42zm-2.134-7.618c.37.01 4.078.094 8.02-1.628-1.44-2.558-2.987-4.7-3.23-5.043A9.98 9.98 0 002.12 8.99l-.13.002zm5.8-7.516c.255.354 1.82 2.49 3.24 5.103 3.08-1.154 4.38-2.905 4.536-3.127A9.956 9.956 0 0012 2.166c-1.264 0-2.47.24-3.578.67zm8.507 4.026c-.18.245-1.62 2.112-4.83 3.43.202.413.396.835.58 1.26.063.153.124.307.184.46 3.394-.427 6.77.257 7.1.33-.03-2.058-.663-3.967-1.734-5.48z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "150+", label: "Projects Shipped" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "6yr", label: "In Business" },
  { value: "40+", label: "Happy Clients" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  // Hide CTA banner on /contact page using Next.js router
  const pathname = usePathname ? usePathname() : '';
  const isContactPage = pathname === '/contact';
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .ft-root * { box-sizing: border-box; margin: 0; padding: 0; }

        .ft-root {
          font-family: 'Syne', sans-serif;
          background: #030510;
          position: relative;
          overflow: hidden;
        }

        /* BACKGROUND GLOWS */
        .ft-glow-left {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,111,255,0.08) 0%, transparent 70%);
          top: 0;
          left: -100px;
          pointer-events: none;
        }

        .ft-glow-right {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(96,200,255,0.06) 0%, transparent 70%);
          top: 100px;
          right: -80px;
          pointer-events: none;
        }

        .ft-glow-bottom {
          position: absolute;
          width: 600px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(124,111,255,0.05) 0%, transparent 70%);
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        /* GRID LINES */
        .ft-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(124,111,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,111,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, transparent, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, transparent);
        }

        /* CTA BANNER */
        .ft-cta-banner {
          position: relative;
          border-top: 1px solid rgba(124,111,255,0.15);
          border-bottom: 1px solid rgba(124,111,255,0.15);
          padding: 64px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          background: linear-gradient(135deg, rgba(124,111,255,0.06) 0%, rgba(96,200,255,0.03) 100%);
        }

        .ft-cta-left h2 {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }

        .ft-cta-left h2 em {
          font-style: italic;
          background: linear-gradient(90deg, #7c6fff, #60c8ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ft-cta-left p {
          font-size: 15px;
          color: rgba(180,195,230,0.6);
          font-weight: 400;
          max-width: 420px;
        }

        .ft-cta-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .ft-btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          background: linear-gradient(135deg, #7c6fff, #60c8ff);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 0 28px rgba(124,111,255,0.4);
          white-space: nowrap;
        }

        .ft-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(124,111,255,0.6), 0 10px 30px rgba(0,0,0,0.4);
        }

        .ft-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          background: transparent;
          border: 1px solid rgba(124,111,255,0.3);
          border-radius: 10px;
          color: rgba(200,210,255,0.8);
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          white-space: nowrap;
        }

        .ft-btn-secondary:hover {
          border-color: rgba(124,111,255,0.6);
          color: #fff;
          background: rgba(124,111,255,0.08);
        }

        /* STATS ROW */
        .ft-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 32px 60px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .ft-stat {
          flex: 1;
          text-align: center;
          padding: 0 24px;
          position: relative;
        }

        .ft-stat + .ft-stat::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 36px;
          width: 1px;
          background: rgba(255,255,255,0.07);
        }

        .ft-stat-value {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(90deg, #7c6fff, #60c8ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Space Mono', monospace;
          line-height: 1;
          margin-bottom: 4px;
        }

        .ft-stat-label {
          font-size: 11.5px;
          color: rgba(180,195,230,0.5);
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        /* MAIN FOOTER CONTENT */
        .ft-main {
          padding: 56px 60px 40px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          position: relative;
        }

        /* BRAND COLUMN */
        .ft-brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 18px;
        }

        .ft-brand-mark {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: linear-gradient(135deg, #7c6fff, #60c8ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          box-shadow: 0 0 18px rgba(124,111,255,0.45);
          flex-shrink: 0;
        }

        .ft-brand-name {
          font-size: 17px;
          font-weight: 800;
          color: #fff;
        }

        .ft-brand-name span {
          background: linear-gradient(90deg, #7c6fff, #60c8ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ft-brand-desc {
          font-size: 13.5px;
          color: rgba(180,195,230,0.55);
          line-height: 1.7;
          margin-bottom: 24px;
          max-width: 280px;
        }

        /* NEWSLETTER */
        .ft-newsletter-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(124,111,255,0.8);
          font-family: 'Space Mono', monospace;
          margin-bottom: 10px;
        }

        .ft-newsletter-form {
          display: flex;
          gap: 0;
          margin-bottom: 20px;
          max-width: 300px;
        }

        .ft-newsletter-input {
          flex: 1;
          padding: 10px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(124,111,255,0.2);
          border-right: none;
          border-radius: 8px 0 0 8px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
        }

        .ft-newsletter-input::placeholder { color: rgba(180,195,230,0.35); }
        .ft-newsletter-input:focus { border-color: rgba(124,111,255,0.5); }

        .ft-newsletter-btn {
          padding: 10px 16px;
          background: linear-gradient(135deg, #7c6fff, #60c8ff);
          border: none;
          border-radius: 0 8px 8px 0;
          color: #fff;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
          white-space: nowrap;
        }

        .ft-newsletter-btn:hover { opacity: 0.85; }

        .ft-subscribed {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(96,200,255,0.9);
          font-weight: 600;
          margin-bottom: 20px;
          height: 40px;
        }

        /* SOCIALS */
        .ft-socials {
          display: flex;
          gap: 8px;
        }

        .ft-social {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(200,215,255,0.6);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
        }

        .ft-social:hover {
          background: rgba(124,111,255,0.15);
          border-color: rgba(124,111,255,0.35);
          color: #fff;
          transform: translateY(-2px);
        }

        /* LINK COLUMNS */
        .ft-col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(124,111,255,0.8);
          font-family: 'Space Mono', monospace;
          margin-bottom: 18px;
        }

        .ft-col-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ft-col-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: rgba(180,200,240,0.6);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .ft-col-link:hover { color: #fff; }

        .ft-link-badge {
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          background: linear-gradient(135deg, rgba(124,111,255,0.25), rgba(96,200,255,0.15));
          border: 1px solid rgba(124,111,255,0.3);
          color: rgba(96,200,255,0.9);
          letter-spacing: 0.5px;
          font-family: 'Space Mono', monospace;
          text-transform: uppercase;
          animation: badge-pulse 2s ease-in-out infinite;
        }

        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,111,255,0.4); }
          50% { box-shadow: 0 0 0 4px rgba(124,111,255,0); }
        }

        /* BOTTOM BAR */
        .ft-bottom {
          padding: 20px 60px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          position: relative;
        }

        .ft-bottom-left {
          font-size: 12.5px;
          color: rgba(180,195,230,0.4);
          font-weight: 400;
        }

        .ft-bottom-left strong {
          color: rgba(180,195,230,0.65);
          font-weight: 600;
        }

        .ft-bottom-links {
          display: flex;
          align-items: center;
          gap: 20px;
          list-style: none;
        }

        .ft-bottom-link {
          font-size: 12px;
          color: rgba(180,195,230,0.4);
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 500;
        }

        .ft-bottom-link:hover { color: rgba(180,195,230,0.8); }

        .ft-bottom-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
        }

        .ft-bottom-right {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(180,195,230,0.35);
        }

        .ft-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22d3a5;
          box-shadow: 0 0 8px rgba(34,211,165,0.6);
          animation: status-blink 2.5s ease-in-out infinite;
        }

        @keyframes status-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .ft-main { grid-template-columns: 1fr 1fr; gap: 36px; }
          .ft-cta-banner { flex-direction: column; align-items: flex-start; padding: 48px 40px; }
          .ft-stats { padding: 28px 40px; }
        }

        @media (max-width: 768px) {
          .ft-main { grid-template-columns: 1fr; padding: 40px 24px 32px; }
          .ft-cta-banner { padding: 40px 24px; }
          .ft-cta-actions { flex-direction: column; width: 100%; }
          .ft-btn-primary, .ft-btn-secondary { width: 100%; justify-content: center; }
          .ft-stats { padding: 24px; flex-wrap: wrap; }
          .ft-stat { flex: 0 0 50%; padding: 16px 0; }
          .ft-stat + .ft-stat::before { display: none; }
          .ft-bottom { flex-direction: column; align-items: flex-start; padding: 20px 24px; gap: 12px; }
          .ft-bottom-links { flex-wrap: wrap; gap: 12px; }
        }
      `}</style>

      <footer className="ft-root">
        <div className="ft-grid" />
        <div className="ft-glow-left" />
        <div className="ft-glow-right" />
        <div className="ft-glow-bottom" />

        {/* CTA BANNER */}
        {!isContactPage && (
          <div className="ft-cta-banner">
            <div className="ft-cta-left">
              <h2>
                Ready to build something <em>remarkable?</em>
              </h2>
              <p>
                Let's turn your idea into a high-performing digital product. No fluff — just clean code, sharp design, and results.
              </p>
            </div>
            <div className="ft-cta-actions">
              <a href="/contact" className="ft-btn-primary">
                ✦ Start a Project
              </a>
              <a href="/work" className="ft-btn-secondary">
                View Our Work →
              </a>
            </div>
          </div>
        )}

        {/* STATS */}
{/*         <div className="ft-stats">
          {stats.map((s) => (
            <div className="ft-stat" key={s.label}>
              <div className="ft-stat-value">{s.value}</div>
              <div className="ft-stat-label">{s.label}</div>
            </div>
          ))}
        </div> */}

        {/* MAIN CONTENT */}
        <div className="ft-main">
          {/* BRAND COLUMN */}
          <div>
            <a href="/" className="ft-brand-logo">
              <div className="ft-brand-mark">N</div>
              <span className="ft-brand-name">
                IRAH
              </span>
            </a>
            <p className="ft-brand-desc">
              We craft digital solutions that are fast, scalable, and built to grow with your business. From idea to launch — and beyond.
            </p>

            {/* <p className="ft-newsletter-label">Stay in the loop</p> */}
            {/* {!subscribed ? (
              <form className="ft-newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="ft-newsletter-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="ft-newsletter-btn">
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="ft-subscribed">
                <span>✓</span>
                <span>You're on the list — welcome!</span>
              </div>
            )} */}

            <div className="ft-socials">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="ft-social"
                  aria-label={s.name}
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* LINK COLUMNS */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="ft-col-title">{title}</h3>
              <ul className="ft-col-links">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="ft-col-link">
                      {link.label}
                      {link.badge && (
                        <span className="ft-link-badge">{link.badge}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="ft-bottom">
          <p className="ft-bottom-left">
            © {new Date().getFullYear()} <strong>NexusLabs</strong>. All rights reserved. Built with precision, shipped with care.
          </p>

          <ul className="ft-bottom-links">
            <li><a href="/privacy" className="ft-bottom-link">Privacy Policy</a></li>
            <div className="ft-bottom-dot" />
            <li><a href="/terms" className="ft-bottom-link">Terms of Service</a></li>
            <div className="ft-bottom-dot" />
            <li><a href="/cookies" className="ft-bottom-link">Cookie Settings</a></li>
          </ul>

          <div className="ft-bottom-right">
            <div className="ft-status-dot" />
            All systems operational
          </div>
        </div>
      </footer>
    </>
  );
}