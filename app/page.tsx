import Hero from "../components/hero";
import Myfavourite from "../components/Myfavourite";
import VideoHero from "../components/Videohero";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-[#03040F]">

      {/* ── Hero ─────────────────────────────────────────── */}
      <Hero />

      {/* ── Favourites ───────────────────────────────────── */}
      <Myfavourite />

      {/* ── VideoHero — top fades in from #03040F ────────── */}
      <div className="relative w-full" style={{ marginTop: "-2px" }}>
        {/* Fade IN — dark bg melts into the video top */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "260px",
            background: "linear-gradient(to bottom, #03040F 0%, transparent 100%)",
            zIndex: 10,
          }}
        />
        <VideoHero />
      </div>

    </main>
  );
}