"use client";

export default function HeroText({ visible }) {
  return (
    <div
      data-parallax-layer="text"
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none will-change-transform"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 1.2s ease" }}
    >
      {/* Eyebrow label */}
      <p
        className="mb-4 tracking-[0.3em] uppercase text-xs font-medium"
        style={{
          fontFamily: "'DM Mono', monospace",
          color: "rgba(150,180,255,0.6)",
          letterSpacing: "0.25em",
        }}
      >
        Welcome
      </p>

      <h1
        className="leading-tight mb-6 text-white"
        style={{
          fontFamily:    "'Syne', sans-serif",
          fontSize:      "clamp(2.4rem, 7vw, 6.5rem)",
          fontWeight:    800,
          letterSpacing: "-0.02em",
          textShadow:    "0 0 80px rgba(80,130,255,0.35)",
        }}
      >
        Building{" "}
        <em
          style={{
            fontStyle:            "italic",
            background:           "linear-gradient(120deg,#60a5fa,#a78bfa 55%,#60efff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
          }}
        >
          Digital
          <br />
          Solutions
        </em>{" "}
        That&nbsp;Matter
      </h1>

      <p
        className="max-w-md text-sm leading-relaxed"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(180,200,255,0.5)",
        }}
      >
        Crafting experiences at the intersection of design and technology.
      </p>

      <div
        className="flex flex-wrap gap-4 justify-center mt-8 pointer-events-auto"
        style={{ fontFamily: "'DM Mono', monospace" }}
      />
    </div>
  );
}