// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function FeaturedCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const slides = [
//     {
//       title: 'Elegant Collection',
//       subtitle: 'Premium quality dresses for every occasion',
//       image: 'https://images.unsplash.com/photo-1595777707802-21b080748568?w=1400&h=700&fit=crop',
//       link: '/products'
//     },
//     {
//       title: 'Summer Dresses',
//       subtitle: 'Stay cool and stylish this season',
//       image: 'https://images.unsplash.com/photo-1595528867694-c60f8f30a5b6?w=1400&h=700&fit=crop',
//       link: '/products'
//     },
//     {
//       title: 'Formal Attire',
//       subtitle: 'Perfect for special events and celebrations',
//       image: 'https://images.unsplash.com/photo-1567050901200-52d0a5a18c00?w=1400&h=700&fit=crop',
//       link: '/products'
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsTransitioning(true);
//       setTimeout(() => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//         setIsTransitioning(false);
//       }, 300);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   const handlePrev = () => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//       setIsTransitioning(false);
//     }, 300);
//   };

//   const handleNext = () => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//       setIsTransitioning(false);
//     }, 300);
//   };

//   return (
//     <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gray-900">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-700 ${
//             index === currentSlide ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img 
//             src={slide.image} 
//             alt={slide.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/25"></div>
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-8">
//             <h1 className="text-3xl md:text-5xl font-light text-center mb-4 max-w-3xl">{slide.title}</h1>
//             <p className="text-sm md:text-base mb-8 text-center font-light max-w-2xl leading-relaxed">{slide.subtitle}</p>
//             <Link href={slide.link} className="btn-primary-pedestal">
//               Explore Collection
//             </Link>
//           </div>
//         </div>
//       ))}

//       {/* Navigation Controls */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
//         <button 
//           onClick={handlePrev}
//           className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-black flex items-center justify-center transition font-light text-sm md:text-base"
//           aria-label="Previous slide"
//         >
//           ←
//         </button>
//         <div className="bg-white/70 px-3 py-1 rounded-full text-black text-xs md:text-sm font-light">
//           {currentSlide + 1} / {slides.length}
//         </div>
//         <button 
//           onClick={handleNext}
//           className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-black flex items-center justify-center transition font-light text-sm md:text-base"
//           aria-label="Next slide"
//         >
//           →
//         </button>
//       </div>

//       {/* Slide Indicators */}
//       <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               setIsTransitioning(true);
//               setTimeout(() => {
//                 setCurrentSlide(index);
//                 setIsTransitioning(false);
//               }, 300);
//             }}
//             className={`h-1 transition-all ${
//               index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl font-semibold">
          Elegant Collection
        </h1>

        <p className="mt-4 text-lg max-w-xl">
          Premium quality dresses for every occasion
        </p>

        <button className="mt-6 px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition">
          Explore Collection
        </button>
      </div>

    </section>
  );
}