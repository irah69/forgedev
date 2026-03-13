'use client';

import React from 'react';
import Link from 'next/link';

export default function CollectionsGrid() {
  const collections = [
    {
      name: 'Casual Wear',
      image: 'https://images.unsplash.com/photo-1574298788406-1f1ecfb5a1cf?w=600&h=600&fit=crop',
      link: '/products?category=casual'
    },
    {
      name: 'Formal Dresses',
      image: 'https://images.unsplash.com/photo-1595777707802-21b080748568?w=600&h=600&fit=crop',
      link: '/products?category=formal'
    },
    {
      name: 'Summer Collection',
      image: 'https://images.unsplash.com/photo-1548690312-e3e17b50cfe1?w=600&h=600&fit=crop',
      link: '/products?category=summer'
    },
    {
      name: 'Party Dresses',
      image: 'https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=600&h=600&fit=crop',
      link: '/products?category=party'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#e8e8e8]">
      <div className="container-custom">
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-light mb-2">Collections</h2>
          <p className="text-gray-600 text-xs md:text-sm font-light tracking-wide">EXPLORE OUR CURATED COLLECTIONS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {collections.map((collection, index) => (
            <Link key={index} href={collection.link} className="group block">
              <div className="relative h-64 md:h-72 overflow-hidden bg-gray-200 border border-[#e8e8e8]">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="text-white text-base md:text-lg font-light tracking-wide">{collection.name}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
