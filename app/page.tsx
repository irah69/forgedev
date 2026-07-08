"use client";

import HomeNavbar from "../components/Homenavbar";
import Hero from "../version1/hero";
import MyFavourite from "../components/Myfavourite";
import TechStackGrid from "../components/TechStackGrid";
import HorizontalTransition from "../components/HorizontalTransition";
import ProcessSection from "../components/ProcessSection";


export default function Home() {
  return (
    <main className="bg-black">

      <HomeNavbar />

      <Hero />
<ProcessSection/>
     
      {/*   <MyFavourite /> */}
        <TechStackGrid />
        <MyFavourite /> 
      {/*  <TechStackGrid /> */}
     
       
    </main>
  );
}