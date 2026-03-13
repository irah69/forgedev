import Hero from "../components/hero";
import Myfavourite from "../components/Myfavourite";
import VideoHero from "../components/Videohero";

export default function Home() {
  return (
    <main
      className="w-full overflow-x-hidden"
      style={{ backgroundColor: "#03040F" }}
    >

      {/* ── Hero ─────────────────────────────────────────── */}
      <Hero />

      {/* ── Favourites ───────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 2, backgroundColor: "#03040F" }}>
        <Myfavourite />
      </div>

      {/* ── VideoHero — top masked with a real bg-color fade  */}
      <div style={{ position: "relative", zIndex: 1, marginTop: "-2px" }}>
        {/* This div sits ON TOP of the video and fades from solid #03040F to transparent */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "300px",
            background: "linear-gradient(to bottom, #03040F 0%, #03040F 15%, rgba(3,4,15,0.85) 50%, rgba(3,4,15,0) 100%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        <VideoHero />
      </div>

    </main>
  );
}