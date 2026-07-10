import Hero from "../version1/hero";
import Showcase from "../version1/agency";
import Myfavourite from "../components/Myfavourite";
import PoweredByStack from "../components/powerdby";
export default function Home() {
  return (
    <main className="bg-black overflow-hidden">
      <Hero />
     
      <Myfavourite />
      <Showcase />
      <PoweredByStack />
    
    {/*    <PoweredByStack /> */}
    </main>
  );
}