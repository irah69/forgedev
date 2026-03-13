import Hero from "../components/hero";
import Myfavourite from "../components/Myfavourite";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Hero />
      <Myfavourite />
    </section>
  );
}
