"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ------------------------------------------------------------------
   IRAH TECH — About
   Same visual language as TechStack.jsx: misty forest / glass-house
   photography, Cinzel display type, a recurring script glyph as
   signature per idea, hairline card borders, quiet accent colors.
   Swap BG_IMAGE for your actual asset path if it differs.

   Mobile-responsiveness pass:
   - section padding scales down at the base breakpoint instead of
     being fixed at desktop sizes (py-20 sm:py-28 md:py-36 etc.)
   - Hero uses min-h-[100svh] with a min-h-screen fallback so mobile
     browser chrome (address bar) doesn't create dead space / cut
     content off
   - letter-spacing (tracking-[...]) is reduced on small screens —
     wide tracking on an 11px eyebrow at 320px width was pushing text
     into two cramped lines
   - every section that can host an edge-bleeding decorative element
     (the Hanko seal) now has overflow-x-hidden so it can't create a
     horizontal scrollbar on narrow viewports
   - card/grid gaps and paddings shrink one step on mobile so cards
     don't feel oversized on a phone screen
------------------------------------------------------------------- */

const BG_IMAGE = "/image.png";

const ACCENTS = {
  sage: "#8DA290",
  slate: "#8C9AA6",
  gold: "#B4996B",
  rust: "#A67C68",
};

const storySteps = [
  {
    index: "01",
    symbol: "ॐ",
    title: "Where it began",
    body: "IRAH TECH started as one developer's personal practice — learning by shipping, not by watching tutorials. Every early project was a small, real problem solved for a real client, one line of code at a time.",
  },
  {
    index: "02",
    symbol: "ध",
    title: "Building the practice",
    body: "As the work repeated, patterns emerged: a stack worth trusting, a process worth repeating, a standard worth holding. What began as freelance jobs became a studio with an actual point of view on how software should be built.",
  },
  {
    index: "03",
    symbol: "श",
    title: "Where we are now",
    body: "Today IRAH TECH builds full-stack products — storefronts, dashboards, portfolios, internal tools — for businesses that want their software to feel as considered as their brand. Still small by design, still hands-on with every build.",
  },
];

const values = [
  {
    kanji: "सू",
    title: "Precision",
    desc: "Every layout, query, and interaction is considered before it ships — not patched after.",
    accent: ACCENTS.sage,
  },
  {
    kanji: "शि",
    title: "Craft",
    desc: "We treat interfaces the way a carpenter treats joinery — the parts you never notice are the ones that took the longest.",
    accent: ACCENTS.slate,
  },
  {
    kanji: "श्र",
    title: "Trust",
    desc: "Clear timelines, honest scoping, no disappearing between milestones. Trust is the actual deliverable.",
    accent: ACCENTS.gold,
  },
  {
    kanji: "सं",
    title: "Partnership",
    desc: "We build for the version of your business that exists a year from now, not just the launch date.",
    accent: ACCENTS.rust,
  },
];

// Replace name / role copy with real people as the studio grows.
const team = [
  {
    initial: "R",
    kanji: "अ",
    name: "Ram",
    role: "Founder & CEO",
    desc: "Leads IRAH TECH with a focus on full-stack engineering, product architecture, and delivering premium digital experiences.",
    accent: ACCENTS.slate,
  },
  {
    initial: "H",
    kanji: "श",
    name: "Harika",
    role: "Co-Founder",
    desc: "Oversees operations, client relationships, and helps shape the long-term vision of IRAH TECH.",
    accent: ACCENTS.sage,
  },
  {
    initial: "S",
    kanji: "क",
    name: "Surya",
    role: "Senior Developer",
    desc: "Builds scalable applications, mentors the team, and maintains engineering quality across projects.",
    accent: ACCENTS.rust,
  },
  {
    initial: "J",
    kanji: "ज्ञ",
    name: "Jashwanth",
    role: "Frontend Developer",
    desc: "Creates responsive, accessible, and interactive user interfaces with modern frontend technologies.",
    accent: ACCENTS.gold,
  },
  {
    initial: "A",
    kanji: "ध",
    name: "Anil",
    role: "Junior Developer",
    desc: "Supports frontend and backend development while continuously improving through real-world projects.",
    accent: ACCENTS.slate,
  },
  {
    initial: "G",
    kanji: "स",
    name: "Gayathri",
    role: "Frontend Developer",
    desc: "Transforms designs into polished, performant, and mobile-first web experiences.",
    accent: ACCENTS.sage,
  },
  {
    initial: "P",
    kanji: "श्री",
    name: "Praneeth Kumar",
    role: "Marketing",
    desc: "Leads branding, digital campaigns, and marketing initiatives that strengthen IRAH TECH's presence.",
    accent: ACCENTS.rust,
  },
  {
    initial: "B",
    kanji: "व",
    name: "Biju Harika",
    role: "Marketing",
    desc: "Focuses on partnerships, outreach, and building lasting relationships with clients and collaborators.",
    accent: ACCENTS.gold,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const riseVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ---------------------------- Shared bits --------------------------- */

function IrahMark({ size = 26, color = "#EDEAE0" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 4 L28 20 L20 36 L20 24 L12 20 L20 20 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M20 4 L12 20 L20 36 L20 24 L28 20 L20 20 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ForestSilhouette({ opacity = 0.1, flip = false }) {
  return (
    <svg
      className={`pointer-events-none absolute left-0 w-full ${flip ? "top-0 rotate-180" : "bottom-0"}`}
      style={{ opacity }}
      viewBox="0 0 1600 220"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="#000000">
        <polygon points="0,220 0,140 60,60 120,140 140,100 200,160 260,90 320,150 380,120 440,170 500,110 560,160 620,100 680,150 740,130 800,170 800,220" />
        <polygon points="800,220 800,160 860,110 920,160 980,120 1040,170 1100,110 1160,150 1220,100 1280,150 1340,120 1400,160 1460,100 1520,150 1600,120 1600,220" />
      </g>
    </svg>
  );
}

// Hanko-style seal — a small rotated ink-stamp mark, used as each card's
// personal signature instead of a photo/headshot. Sized down on mobile
// and pulled slightly inward so it can't push the card past the
// viewport edge and force a horizontal scrollbar.
function Hanko({ letter, accent }) {
  return (
    <div
      className="absolute -top-3 -right-3 flex h-11 w-11 rotate-[7deg] items-center justify-center rounded-[3px] border sm:-top-4 sm:-right-4 sm:h-14 sm:w-14"
      style={{ borderColor: `${accent}88`, background: "#0c0f0dcc" }}
      aria-hidden="true"
    >
      <span
        className="text-base tracking-tight sm:text-lg"
        style={{ fontFamily: "'Cinzel', serif", color: accent }}
      >
        {letter}
      </span>
    </div>
  );
}

function SectionEyebrow({ children, color = "#EDEAE0" }) {
  return (
    <p
      className="mb-4 text-[10px] uppercase tracking-[0.22em] sm:mb-5 sm:text-[11px] sm:tracking-[0.4em]"
      style={{ fontFamily: "'Cinzel', serif", color, opacity: 0.55 }}
    >
      {children}
    </p>
  );
}

/* ------------------------------ Sections ----------------------------- */

function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section
      ref={ref}
      className="relative flex min-h-screen min-h-[100svh] items-center overflow-x-hidden overflow-y-hidden bg-cover bg-center px-5 py-24 sm:px-6 sm:py-28 md:py-32"
      style={{ backgroundImage: `url('${BG_IMAGE}')`, fontFamily: "'Cinzel', serif" }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <SectionEyebrow>About US</SectionEyebrow>
        <h1
          className="mb-5 text-[2.5rem] leading-[1.08] tracking-tight text-[#F1EFE7] sm:mb-6 sm:text-5xl md:text-7xl"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Built quietly.
          <br />
          Shipped deliberately.
        </h1>
        <p className="mx-auto max-w-lg text-[13px] leading-relaxed tracking-wide text-white/50 sm:text-sm">
          IRAH TECH is a small development studio for businesses who want
          their software to feel as considered as everything else they make.
        </p>
      </motion.div>
    </section>
  );
}

function Story() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      ref={ref}
      className="relative overflow-x-hidden bg-cover bg-center px-5 py-20 sm:px-6 sm:py-28 md:py-36"
      style={{ backgroundImage: `url('${BG_IMAGE}')` }}
    >
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center sm:mb-16"
        >
          <SectionEyebrow>Our story</SectionEyebrow>
          <h2
            className="text-3xl tracking-tight text-[#F1EFE7] sm:text-4xl md:text-6xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            A studio built one project at a time
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative flex flex-col gap-0 md:gap-2"
        >
          {/* vertical spine — desktop/tablet only */}
          <div className="absolute left-[27px] top-2 hidden h-[calc(100%-16px)] w-px bg-[#EDEAE0]/[0.12] md:block" />

          {storySteps.map((step) => (
            <motion.div
              key={step.index}
              variants={riseVariants}
              className="relative flex flex-col gap-3 border-b border-[#EDEAE0]/[0.08] py-6 last:border-b-0 sm:gap-4 sm:py-8 md:flex-row md:items-start md:gap-10 md:py-10"
            >
              <div className="flex items-center gap-3 sm:gap-4 md:w-14 md:flex-col md:items-start md:gap-2">
                <span
                  className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#EDEAE0]/20 bg-[#0c0f0d] sm:h-14 sm:w-14"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <span className="text-lg text-[#F1EFE7] sm:text-xl">{step.symbol}</span>
                </span>
                <span
                  className="text-[10px] tracking-[0.25em] text-[#EDEAE0]/35 sm:text-[11px] sm:tracking-[0.3em]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {step.index}
                </span>
              </div>
              <div className="flex-1">
                <h3
                  className="mb-2 text-xl text-[#F1EFE7] sm:text-2xl"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {step.title}
                </h3>
                <p className="max-w-xl text-[13px] leading-relaxed tracking-wide text-[#EDEAE0]/50 sm:text-sm">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ValueCard({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={riseVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative flex flex-col gap-4 border border-[#EDEAE0]/[0.09] bg-[#0c0f0d]/40 p-6 backdrop-blur-md sm:gap-5 sm:p-8"
    >
      <span className="absolute left-0 top-0 h-6 w-px" style={{ background: value.accent, opacity: 0.5 }} />
      <span className="absolute left-0 top-0 h-px w-6" style={{ background: value.accent, opacity: 0.5 }} />
      <span
        className="text-2xl sm:text-3xl"
        style={{ fontFamily: "'Cinzel', serif", color: value.accent }}
      >
        {value.kanji}
      </span>
      <div>
        <h3
          className="mb-2 text-lg text-[#F1EFE7] sm:text-xl"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {value.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-[#EDEAE0]/45 sm:text-sm">{value.desc}</p>
      </div>
    </motion.div>
  );
}

function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="relative overflow-x-hidden bg-[#0a0c0b] px-5 py-20 sm:px-6 sm:py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center sm:mb-16"
        >
          <SectionEyebrow>How we work</SectionEyebrow>
          <h2
            className="text-3xl tracking-tight text-[#F1EFE7] sm:text-4xl md:text-6xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Four things we don't compromise on
          </h2>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {values.map((v) => (
            <ValueCard key={v.title} value={v} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TeamCard({ person }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={riseVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative flex flex-col gap-5 border border-[#EDEAE0]/[0.09] bg-[#0c0f0d]/40 p-6 pt-9 backdrop-blur-md sm:gap-6 sm:p-8 sm:pt-10"
    >
      <Hanko letter={person.initial} accent={person.accent} />

      <div
        className="flex h-14 w-14 items-center justify-center rounded-full border sm:h-16 sm:w-16"
        style={{ borderColor: `${person.accent}55` }}
      >
        <span
          className="text-xl sm:text-2xl"
          style={{
            fontFamily: "'Cinzel', serif",
            color: person.accent,
          }}
        >
          {person.kanji}
        </span>
      </div>

      <div>
        <h3
          className="text-xl text-[#F1EFE7] sm:text-2xl"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {person.name}
        </h3>

        <p
          className="mt-1 text-[10px] uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.35em]"
          style={{ color: person.accent, fontFamily: "'Cinzel', serif" }}
        >
          {person.role}
        </p>

        <p className="mt-3 text-[13px] leading-relaxed text-[#EDEAE0]/45 sm:mt-4 sm:text-sm">
          {person.desc}
        </p>
      </div>
    </motion.div>
  );
}

function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="relative overflow-x-hidden bg-[#0d100e] px-5 py-20 sm:px-6 sm:py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center sm:mb-16"
        >
          <SectionEyebrow>Meet the studio</SectionEyebrow>
          <h2
            className="text-3xl tracking-tight text-[#F1EFE7] sm:text-4xl md:text-6xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Small on purpose
          </h2>
          <p
            className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed tracking-wide text-white/45 sm:mt-5 sm:text-sm"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Every project is touched by the same small set of hands — no
            handoffs, no account managers, no dilution.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {team.map((member) => (
            <TeamCard key={member.name} person={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section
      ref={ref}
      className="relative overflow-x-hidden bg-cover bg-center px-5 py-20 sm:px-6 sm:py-28 md:py-32"
      style={{ backgroundImage: `url('${BG_IMAGE}')` }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <h2
          className="mb-5 text-3xl tracking-tight text-[#F1EFE7] sm:mb-6 sm:text-4xl md:text-6xl"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Let's build something quiet and strong
        </h2>
        <p
          className="mx-auto mb-8 max-w-md text-[13px] leading-relaxed tracking-wide text-white/50 sm:mb-10 sm:text-sm"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Tell us what you're building. We'll tell you honestly whether we're
          the right studio for it.
        </p>
        <a
          href="/contact"
          className="inline-block border border-[#EDEAE0]/30 px-7 py-3 text-[10px] uppercase tracking-[0.22em] text-[#F1EFE7] transition-colors duration-300 hover:border-[#EDEAE0]/70 hover:bg-[#EDEAE0]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EDEAE0]/60 sm:px-9 sm:text-[11px] sm:tracking-[0.35em]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Start a project
        </a>
      </motion.div>
    </section>
  );
}

/* -------------------------------- Page -------------------------------- */

export default function AboutUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        html { overflow-x: hidden; }
      `}</style>
      <main className="overflow-x-hidden bg-[#0a0c0b]">
        <Hero />
        <Story />
        <Philosophy />
        <Team />
        <ClosingCTA />
      </main>
    </>
  );
}