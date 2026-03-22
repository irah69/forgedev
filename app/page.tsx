import Hero from "../components/hero";
import Myfavourite from "../components/Myfavourite";
import VideoHero from "../components/Videohero";

export default function Home() {
  return (
    /*
      KEY FIX: overflow-x-hidden has been moved OFF <main> and onto an
      inner wrapper div. When overflow-x-hidden sits on <main> (or any
      ancestor that wraps the whole page height), browsers treat that
      element as the scroll container instead of window — which means
      window.scroll events never fire and sticky + parallax both break.

      Putting it on a zero-height wrapper div that only contains the
      content which actually needs clipping keeps the visual effect
      without hijacking the scroll container.
    */
    <main
      className="w-full"
      style={{ backgroundColor: "#03040F" }}
    >
      {/* ── Hero (needs window scroll for parallax) ──────── */}
      <Hero />

      {/* ── overflow wrapper starts here — below the hero ── */}
      <div className="w-full overflow-x-hidden">

        {/* ── Favourites ─────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 2, backgroundColor: "#03040F" }}>
          <Myfavourite />
        </div>

        {/* ── VideoHero ──────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 1, marginTop: "-2px" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "300px",
              background:
                "linear-gradient(to bottom, #03040F 0%, #03040F 15%, rgba(3,4,15,0.85) 50%, rgba(3,4,15,0) 100%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          <VideoHero />
        </div>

      </div>
    </main>
  );
}