"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ------------------------------------------------------------------
   IRAH TECH — About
   Same visual language as TechStack.jsx: misty forest / glass-house
   photography, Cormorant Garamond display type, Cinzel eyebrow labels,
   a single recurring kanji-as-signature per idea, hairline card
   borders, quiet accent colors instead of glow/neon.
   Swap BG_IMAGE for your actual asset path if it differs.
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
    symbol: "ॐ", // Beginning
    title: "Where it began",
    body: "IRAH TECH started as one developer's personal practice — learning by shipping, not by watching tutorials. Every early project was a small, real problem solved for a real client, one line of code at a time.",
  },
  {
    index: "02",
    symbol: "ध"  , // Karma (Action)
    title: "Building the practice",
    body: "As the work repeated, patterns emerged: a stack worth trusting, a process worth repeating, a standard worth holding. What began as freelance jobs became a studio with an actual point of view on how software should be built.",
  },
  {
    index: "03",
    symbol: "श", // Knowledge
    title: "Where we are now",
    body: "Today IRAH TECH builds full-stack products — storefronts, dashboards, portfolios, internal tools — for businesses that want their software to feel as considered as their brand. Still small by design, still hands-on with every build.",
  },
];

const values = [
  {
    kanji: "सू", // Sutra (Foundation / Precision)
    title: "Precision",
    desc: "Every layout, query, and interaction is considered before it ships — not patched after.",
    accent: ACCENTS.sage,
  },
  {
    kanji: "शि", // Shilpa (Craftsmanship)
    title: "Craft",
    desc: "We treat interfaces the way a carpenter treats joinery — the parts you never notice are the ones that took the longest.",
    accent: ACCENTS.slate,
  },
  {
    kanji: "श्र", // Shraddha (Trust / Faith)
    title: "Trust",
    desc: "Clear timelines, honest scoping, no disappearing between milestones. Trust is the actual deliverable.",
    accent: ACCENTS.gold,
  },
  {
    kanji: "सं", // Sangha / Samvāda (Partnership / Togetherness)
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
// personal signature instead of a photo/headshot.
function Hanko({ letter, accent }) {
  return (
    <div
      className="absolute -top-4 -right-4 flex h-14 w-14 rotate-[7deg] items-center justify-center rounded-[3px] border"
      style={{ borderColor: `${accent}88`, background: "#0c0f0dcc" }}
      aria-hidden="true"
    >
      <span
        className="text-lg tracking-tight"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: accent }}
      >
        {letter}
      </span>
    </div>
  );
}

function SectionEyebrow({ children, color = "#EDEAE0" }) {
  return (
    <p
      className="mb-5 text-[11px] uppercase tracking-[0.4em]"
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
      className="relative flex min-h-[100vh] items-center overflow-hidden bg-cover bg-center px-6 py-32"
      style={{ backgroundImage: `url('${BG_IMAGE}')`, fontFamily: "'Cinzel', serif" }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <div className="mb-8 flex justify-center">
        </div>
        <SectionEyebrow>About US</SectionEyebrow>
        <h1
          className="mb-6 text-5xl leading-[1.05] tracking-tight text-[#F1EFE7] md:text-7xl"
          style={{ fontFamily: "'cinzel', serif" }}
        >
          Built quietly.
          <br />
          Shipped deliberately.
        </h1>
        <p className="mx-auto max-w-lg text-sm leading-relaxed tracking-wide text-white/50">
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
      className="relative overflow-hidden bg-cover bg-center px-6 py-28 md:py-36"
      style={{ backgroundImage: `url('${BG_IMAGE}')` }}
    >
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <SectionEyebrow>Our story</SectionEyebrow>
          <h2
            className="text-4xl tracking-tight text-[#F1EFE7] md:text-6xl"
            style={{ fontFamily: "'cinzel'" }}
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
          {/* vertical spine */}
          <div className="absolute left-[27px] top-2 hidden h-[calc(100%-16px)] w-px bg-[#EDEAE0]/[0.12] md:block" />

          {storySteps.map((step) => (
            <motion.div
              key={step.index}
              variants={riseVariants}
              className="relative flex flex-col gap-4 border-b border-[#EDEAE0]/[0.08] py-8 last:border-b-0 md:flex-row md:items-start md:gap-10 md:py-10"
            >
              <div className="flex items-center gap-4 md:w-14 md:flex-col md:items-start md:gap-2">
                <span
                  className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-[#EDEAE0]/20 bg-[#0c0f0d]"
                  style={{ fontFamily: "'cinzel', serif" }}
                >
                  <span className="text-xl text-[#F1EFE7]">{step.symbol}</span>
                </span>
                <span
                  className="text-[11px] tracking-[0.3em] text-[#EDEAE0]/35"
                  style={{ fontFamily: "'cinzel', serif" }}
                >
                  {step.index}
                </span>
              </div>
              <div className="flex-1">
                <h3
                  className="mb-2 text-2xl text-[#F1EFE7]"
                  style={{ fontFamily: "'cinzel', serif" }}
                >
                  {step.title}
                </h3>
                <p className="font-[cinzel] text-sm leading-relaxed tracking-wide text-[#EDEAE0]/50">
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
      className="relative flex flex-col gap-5 border border-[#EDEAE0]/[0.09] bg-[#0c0f0d]/40 p-8 backdrop-blur-md"
    >
      <span className="absolute left-0 top-0 h-6 w-px" style={{ background: value.accent, opacity: 0.5 }} />
      <span className="absolute left-0 top-0 h-px w-6" style={{ background: value.accent, opacity: 0.5 }} />
      <span
        className="text-3xl"
        style={{ fontFamily: "'Noto Serif JP', serif", color: value.accent }}
      >
        {value.kanji}
      </span>
      <div>
        <h3
          className="mb-2 text-xl text-[#F1EFE7]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {value.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#EDEAE0]/45">{value.desc}</p>
      </div>
    </motion.div>
  );
}

function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="relative bg-[#0a0c0b] px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <SectionEyebrow>How we work</SectionEyebrow>
          <h2
            className="text-4xl tracking-tight text-[#F1EFE7] md:text-6xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Four things we don't compromise on
          </h2>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 font-[cinzel] text-sm leading-relaxed tracking-wide text-[#EDEAE0]/45"
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
      className="relative flex flex-col gap-6 border border-[#EDEAE0]/[0.09] bg-[#0c0f0d]/40 p-8 pt-10 backdrop-blur-md"
    >
      <Hanko letter={person.initial} accent={person.accent} />

      <div
        className="flex h-16 w-16 items-center justify-center rounded-full border"
        style={{ borderColor: `${person.accent}55` }}
      >
        <span
          className="text-2xl"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            color: person.accent,
          }}
        >
          {person.kanji}
        </span>
      </div>

      <div>
        <h3
          className="font-[Cinzel] text-2xl text-[#F1EFE7]"
        >
          {person.name}
        </h3>

        <p
          className="mt-1 text-xs uppercase tracking-[0.35em]"
          style={{ color: person.accent }}
        >
          {person.role}
        </p>

        <p className="mt-4 font-[Cinzel] text-sm leading-relaxed text-[#EDEAE0]/45">
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
    <section ref={ref} className="relative bg-[#0d100e] px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <SectionEyebrow>Meet the studio</SectionEyebrow>
          <h2
            className="text-4xl tracking-tight text-[#F1EFE7] md:text-6xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Small on purpose
          </h2>
          <p className=" font-[Cinzel] mx-auto mt-5 max-w-md text-sm leading-relaxed tracking-wide text-white/45">
            Every project is touched by the same small set of hands — no
            handoffs, no account managers, no dilution.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-[Cinzel] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
         {team.map((member) => (
  <TeamCard
    key={member.name}
    person={member}
  />
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
      className="relative overflow-hidden bg-cover bg-center px-6 py-32"
      style={{ backgroundImage: `url('${BG_IMAGE}')` }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <div className="mb-8 flex justify-center">
        </div>
        <h2
          className="mb-6 text-4xl tracking-tight text-[#F1EFE7] md:text-6xl"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Let's build something quiet and strong
        </h2>
        <p className="font-[Cinzel] mx-auto mb-10 max-w-md text-sm leading-relaxed tracking-wide text-white/50">
          Tell us what you're building. We'll tell you honestly whether we're
          the right studio for it.
        </p>
        <a
          href="/contact"
          className="font-[Cinzel] inline-block border border-[#EDEAE0]/30 px-9 py-3 text-[11px] uppercase tracking-[0.35em] text-[#F1EFE7] transition-colors duration-300 hover:border-[#EDEAE0]/70 hover:bg-[#EDEAE0]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EDEAE0]/60"
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
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Noto+Serif+JP:wght@400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
      `}</style>
      <main className="bg-[#0a0c0b]">
        <Hero />
        <Story />
        <Philosophy />
        <Team />
        <ClosingCTA />
      </main>
    </>
  );
}