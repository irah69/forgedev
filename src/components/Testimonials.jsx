'use client';

import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      text: 'Amazing products and great customer service! Highly recommended.',
      rating: 5,
      role: 'Verified Buyer'
    },
    {
      id: 2,
      name: 'Mike Chen',
      text: 'Fast shipping and excellent quality. Will definitely shop again!',
      rating: 5,
      role: 'Verified Buyer'
    },
    {
      id: 3,
      name: 'Emma Davis',
      text: 'Best prices I found online. The product arrived in perfect condition.',
      rating: 4.5,
      role: 'Verified Buyer'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="card-custom">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star text-sm ${
                      i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  ></i>
                ))}
              </div>
              <p className="text-gray-600 italic">&ldquo;{testimonial.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
