"use client";

import { useState, ReactNode } from "react";

/* ─── TYPES ──────────────────────────────────────────────────────────────── */
interface Star { left: number; top: number; size: number; opacity: number; duration: number; delay: number; color: string; }
interface Stat { val: string; label: string; }
interface Value { icon: ReactNode; title: string; desc: string; }
interface TeamMember { name: string; role: string; accent: string; }
interface TimelineItem { year: string; label: string; }

/* ─── SEEDED RANDOM ───────────────────────────────────────────────────────── */
function seededRand(seed: number): () => number {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}
const rand = seededRand(55);
const STARS: Star[] = Array.from({ length: 50 }, (_, i) => ({
  left: rand() * 100, top: rand() * 100, size: rand() * 2 + 1,
  opacity: rand() * 0.5 + 0.1, duration: 3 + rand() * 5, delay: rand() * 5,
  color: i % 3 === 0 ? "#7B6EF6" : i % 3 === 1 ? "#4FC3F7" : "#ffffff",
}));

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const STATS: Stat[] = [
  { val: "2+", label: "Years Exp." }, { val: "10+", label: "Projects" },
  { val: "10+", label: "Clients" },  { val: "5",   label: "Team" },
];

const VALUES: Value[] = [
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><polygon points="11,2 14,8 21,9 16,14 17,21 11,18 5,21 6,14 1,9 8,8"/></svg>, title: "Excellence", desc: "We pursue the highest standard in every pixel, every line of code, every interaction." },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><circle cx="11" cy="11" r="9"/><path d="M11 7v4l3 3"/></svg>, title: "Speed", desc: "We ship fast without cutting corners — velocity and quality are never in conflict here." },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"/><circle cx="11" cy="7" r="4"/></svg>, title: "People First", desc: "Behind every project is a person. We build with empathy for the humans who use what we create." },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>, title: "Data Driven", desc: "Gut instinct meets hard data. Every decision is backed by research, testing and iteration." },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="12" y="3" width="7" height="7" rx="1"/><rect x="3" y="12" width="7" height="7" rx="1"/><rect x="12" y="12" width="7" height="7" rx="1"/></svg>, title: "Modular", desc: "Systems thinking drives our architecture — scalable, composable, future-proof by design." },
  { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Secure", desc: "Security is not an afterthought. We bake it into every layer from day one." },
];

const TEAM: TeamMember[] = [
  { name: "Ram",       role: "Founder & CEO",             accent: "#7B6EF6" },
  { name: "Harika", role: "ML Engineer",        accent: "#4FC3F7" },
  { name: "Surya",     role: "Co-Founder",          accent: "#8B5CF6" },
  { name: "Jashwanth", role: "Frontend Developer",        accent: "#4FC3F7" },
  { name: "Anil",      role: "Jr Developer",        accent: "#7B6EF6" },
  { name: "Gayathri",  role: "Frontend Developer",        accent: "#4FC3F7" },
  { name: "Praneeth kumar",  role: "Marketing",        accent: "#7B6EF6" },
  { name: "Bijju Harika",  role: "Marketing",        accent: "#4FC3F7" },
];



const STORY: string[] = [
  "It started with a simple belief: that great digital work should be accessible to every kind of organisation — not just the ones with enterprise budgets and Fortune 500 retainers.",
  "A small group of designers and engineers came together in 2016 with that conviction, and what began as late-night freelance projects quickly grew into something more deliberate. We built a culture around craft.",
  "Today we are a fully distributed team spanning three continents, united by shared tools, shared standards, and a shared obsession with making things that work beautifully.",
  "We are not an agency. We are not a studio. We are a collective of specialists who choose the work we take on, because the best output comes from genuine alignment between client ambition and team passion.",
];

/* ─── VALUE CARD ──────────────────────────────────────────────────────────── */
function ValueCard({ item }: { item: Value }) {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: hovered ? "#0D1128" : "#080B1A",
      border: `1px solid ${hovered ? "rgba(79,195,247,0.4)" : "rgba(123,110,246,0.15)"}`,
      borderRadius: "12px", padding: "24px 20px",
      transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
      transform: hovered ? "translateY(-4px)" : "translateY(0)",
      boxShadow: hovered ? "0 16px 40px rgba(3,4,15,0.7),0 0 20px rgba(123,110,246,0.1)" : "0 4px 20px rgba(3,4,15,0.5)",
      position: "relative", overflow: "hidden", cursor: "default",
    }}>
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: hovered ? "linear-gradient(90deg,transparent,#4FC3F7,#7B6EF6,transparent)" : "linear-gradient(90deg,transparent,rgba(123,110,246,0.3),transparent)", transition: "all 0.4s" }} />
      <div style={{ color: hovered ? "#4FC3F7" : "#7B6EF6", marginBottom: "14px", transition: "color 0.3s" }}>{item.icon}</div>
      <h3 style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Syne',sans-serif", background: hovered ? "linear-gradient(90deg,#7B6EF6,#4FC3F7)" : "none", WebkitBackgroundClip: hovered ? "text" : "unset", WebkitTextFillColor: hovered ? "transparent" : "#fff", transition: "all 0.3s" }}>{item.title}</h3>
      <p style={{ margin: 0, fontSize: "12px", color: "#8892B0", lineHeight: 1.65 }}>{item.desc}</p>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#7B6EF6,#4FC3F7,transparent)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />
    </div>
  );
}

/* ─── TEAM CARD ───────────────────────────────────────────────────────────── */
function TeamCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: hovered ? "#0D1128" : "#080B1A",
      border: `1px solid ${hovered ? member.accent + "66" : "rgba(123,110,246,0.15)"}`,
      borderRadius: "12px", padding: "28px 20px",
      transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
      transform: hovered ? "translateY(-4px)" : "translateY(0)",
      boxShadow: hovered ? `0 16px 40px rgba(3,4,15,0.7),0 0 20px ${member.accent}22` : "0 4px 20px rgba(3,4,15,0.5)",
      textAlign: "center", cursor: "default", position: "relative", overflow: "hidden",
    }}>
      <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: `linear-gradient(135deg,${member.accent}33,${member.accent}11)`, border: `2px solid ${member.accent}55`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 900, fontFamily: "'Syne',sans-serif", color: member.accent, transition: "all 0.3s", boxShadow: hovered ? `0 0 20px ${member.accent}44` : "none" }}>{member.name.charAt(0)}</div>
      <h4 style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: 800, letterSpacing: "0.06em", fontFamily: "'Syne',sans-serif", color: hovered ? "#fff" : "#e0e0e0", transition: "color 0.3s" }}>{member.name}</h4>
      <p style={{ margin: 0, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: member.accent, fontFamily: "monospace", opacity: 0.85 }}>{member.role}</p>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${member.accent},transparent)`, opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />
    </div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes floatStar  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-7px)} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradShift  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes orbPulse   { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.5;transform:scale(1.06)} }
        @keyframes scanLine   { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        @keyframes badgePulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes countUp    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

        .ap-root {
          background: #03040F;
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          font-family: 'Syne', sans-serif;
          color: #fff;
          position: relative;
        }

        .ap-wrap {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .ap-grad {
          background: linear-gradient(90deg,#7B6EF6 0%,#4FC3F7 50%,#8B5CF6 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift 5s ease infinite;
        }

        .ap-divider {
          height: 1px;
          background: linear-gradient(90deg,transparent,rgba(123,110,246,.4),rgba(79,195,247,.3),transparent);
          margin: 0 20px;
        }

        .ap-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(123,110,246,.1);
          border: 1px solid rgba(123,110,246,.3);
          border-radius: 100px; padding: 6px 16px;
          font-size: 9px; letter-spacing: .25em;
          text-transform: uppercase; color: #4FC3F7; font-family: monospace;
        }
        .ap-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #7B6EF6; flex-shrink: 0;
          animation: badgePulse 2s ease-in-out infinite;
        }

        /* section padding via CSS so it scales with viewport */
        .ap-sec { padding: clamp(40px,7vh,80px) 0; }
        .ap-sec-hero { padding: clamp(60px,10vh,130px) 0 clamp(32px,5vh,64px); }
        .ap-sec-team { padding: clamp(40px,7vh,80px) 0 clamp(60px,10vh,120px); }

        /* section headings */
        .ap-h1 {
          font-size: clamp(34px,9vw,76px);
          font-weight: 900; line-height: .92;
          letter-spacing: -.01em; text-transform: uppercase;
          margin-bottom: 20px;
        }
        .ap-h2-lg {
          font-size: clamp(26px,7vw,54px);
          font-weight: 900; line-height: .92;
          text-transform: uppercase; letter-spacing: .02em;
        }
        .ap-h2-md {
          font-size: clamp(24px,6vw,50px);
          font-weight: 900; line-height: .94;
          text-transform: uppercase; margin-bottom: 16px;
        }
        .ap-h2-mission {
          font-size: clamp(17px,4vw,28px);
          font-weight: 900; line-height: 1.2;
          letter-spacing: .02em; color: #fff; margin-bottom: 16px;
        }

        /* GRIDS */
        .ap-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px,5vw,60px);
          align-items: center;
        }
        @media(max-width:768px){
          .ap-hero-grid { grid-template-columns: 1fr; gap: 28px; }
        }

        .ap-stats-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 1px;
          background: rgba(123,110,246,.12);
          border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(123,110,246,.18);
        }
        @media(max-width:600px){
          .ap-stats-grid { grid-template-columns: repeat(2,1fr); }
        }

        .ap-values-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 14px;
        }
        @media(max-width:860px){ .ap-values-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:500px){ .ap-values-grid { grid-template-columns: 1fr; } }

        .ap-story-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: clamp(28px,5vw,60px);
          align-items: start;
        }
        @media(max-width:768px){ .ap-story-grid { grid-template-columns: 1fr; gap: 28px; } }

        .ap-team-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 14px;
        }
        @media(max-width:860px){ .ap-team-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:380px){ .ap-team-grid { grid-template-columns: 1fr; } }

        /* stat value */
        .ap-stat-val {
          font-size: clamp(22px,6vw,46px);
          font-weight: 900; line-height: 1;
          background: linear-gradient(90deg,#fff 30%,#7B6EF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
        }
      `}</style>

      <main className="ap-root">

        {/* STARS */}
        <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0 }}>
          {STARS.map((s,i) => (
            <div key={i} style={{ position:"absolute", left:`${s.left}%`, top:`${s.top}%`, width:`${s.size}px`, height:`${s.size}px`, borderRadius:"50%", background:s.color, opacity:s.opacity, animation:`floatStar ${s.duration}s ease-in-out ${s.delay}s infinite` }} />
          ))}
        </div>

        {/* ORBS */}
        <div style={{ position:"fixed",top:"20%",right:"-15%",width:"min(700px,80vw)",height:"min(700px,80vw)",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(123,110,246,.1) 0%,rgba(79,195,247,.04) 45%,transparent 70%)",animation:"orbPulse 8s ease-in-out infinite",pointerEvents:"none",zIndex:0 }} />
        <div style={{ position:"fixed",bottom:"10%",left:"-15%",width:"min(500px,70vw)",height:"min(500px,70vw)",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(139,92,246,.08) 0%,transparent 70%)",animation:"orbPulse 10s ease-in-out infinite 2s",pointerEvents:"none",zIndex:0 }} />

        {/* SCAN LINE */}
        <div style={{ position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0 }}>
          <div style={{ position:"absolute",left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent,rgba(79,195,247,.04),transparent)",animation:"scanLine 10s linear infinite" }} />
        </div>

        <div style={{ position:"relative",zIndex:1 }}>

          {/* ════ HERO ════ */}
          <section className="ap-sec-hero">
            <div className="ap-wrap">
              <div style={{ marginBottom:"22px",animation:"fadeUp .7s ease both .1s" }}>
                <span className="ap-badge"><span className="ap-badge-dot"/>About Us</span>
              </div>
              <div className="ap-hero-grid">
                {/* headline */}
                <div style={{ animation:"fadeUp .8s ease both .2s" }}>
                  <h1 className="ap-h1">
                    <span style={{ color:"#fff" }}>We Build</span><br/>
                    <span className="ap-grad">Digital</span><br/>
                    <span className="ap-grad">Futures</span>
                  </h1>
                  <div style={{ height:"2px",width:"80px",background:"linear-gradient(90deg,#7B6EF6,#4FC3F7,transparent)",borderRadius:"2px",marginBottom:"18px" }} />
                  <p style={{ fontSize:"clamp(13px,3.5vw,16px)",color:"#8892B0",lineHeight:1.8 }}>
                    We are a freelancing collective of designers, engineers and strategists who care deeply about the work we put into the world. No fluff — just craft, clarity and real results.
                  </p>
                </div>
                {/* mission card */}
                <div style={{ animation:"fadeUp .8s ease both .35s",background:"linear-gradient(135deg,#080B1A 0%,#0D1128 100%)",border:"1px solid rgba(123,110,246,.2)",borderRadius:"14px",padding:"clamp(22px,5vw,40px)",position:"relative",overflow:"hidden" }}>
                  <div style={{ position:"absolute",top:0,right:0,width:"160px",height:"160px",background:"radial-gradient(ellipse at top right,rgba(79,195,247,.1) 0%,transparent 70%)",pointerEvents:"none" }} />
                  <p style={{ fontSize:"9px",letterSpacing:".3em",textTransform:"uppercase",color:"#4FC3F7",fontFamily:"monospace",marginBottom:"8px" }}>Our Mission</p>
                  <h2 className="ap-h2-mission">Empower organisations through first-rate creative &amp; digital solutions.</h2>
                  <p style={{ fontSize:"13px",color:"#8892B0",lineHeight:1.75 }}>From startups finding their footing to enterprises scaling new heights — we partner with ambitious teams to turn bold ideas into polished digital realities that make a measurable difference.</p>
                  <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"2px",background:"linear-gradient(90deg,transparent,#7B6EF6,#4FC3F7,transparent)" }} />
                </div>
              </div>
            </div>
          </section>

          {/* ════ STATS ════ */}
          <section style={{ paddingBottom:"clamp(40px,6vh,80px)" }}>
            <div className="ap-wrap">
              <div className="ap-stats-grid">
                {STATS.map((stat,i) => (
                  <div key={stat.label} style={{ background:"#080B1A",padding:"clamp(18px,4vw,36px) 12px",textAlign:"center",animation:`countUp .7s ease both ${.5+i*.12}s` }}>
                    <div className="ap-stat-val">{stat.val}</div>
                    <div style={{ fontSize:"9px",letterSpacing:".2em",color:"#8892B0",textTransform:"uppercase",fontFamily:"monospace" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="ap-divider"/>

          {/* ════ VALUES ════ */}
          <section className="ap-sec">
            <div className="ap-wrap">
              <div style={{ marginBottom:"36px",animation:"fadeUp .7s ease both .1s" }}>
                <p style={{ fontSize:"9px",letterSpacing:".3em",color:"#4FC3F7",textTransform:"uppercase",fontFamily:"monospace",marginBottom:"10px" }}>What We Stand For</p>
                <h2 className="ap-h2-lg"><span style={{ color:"#fff" }}>Our </span><span className="ap-grad">Core Values</span></h2>
              </div>
              <div className="ap-values-grid">
                {VALUES.map((item,i) => (
                  <div key={item.title} style={{ animation:`fadeUp .7s ease both ${.2+i*.07}s` }}>
                    <ValueCard item={item}/>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="ap-divider"/>



          <div className="ap-divider"/>

          {/* ════ TEAM ════ */}
          <section className="ap-sec-team">
            <div className="ap-wrap">
              <div style={{ marginBottom:"36px",animation:"fadeUp .7s ease both .1s" }}>
                <p style={{ fontSize:"9px",letterSpacing:".3em",color:"#4FC3F7",textTransform:"uppercase",fontFamily:"monospace",marginBottom:"10px" }}>The People</p>
                <h2 className="ap-h2-lg"><span style={{ color:"#fff" }}>Meet The </span><span className="ap-grad">Team</span></h2>
              </div>
              <div className="ap-team-grid">
                {TEAM.map((member,i) => (
                  <div key={member.name} style={{ animation:`fadeUp .7s ease both ${.2+i*.08}s` }}>
                    <TeamCard member={member}/>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}