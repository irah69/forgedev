'use client';

import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription here
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="bg-blue-600 text-white py-12 px-4">
      <div className="container-custom max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-center text-blue-100 mb-8">
          Get the latest deals and exclusive offers delivered to your inbox!
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="btn btn-light font-semibold hover:shadow-lg transition"
          >
            Subscribe
          </button>
        </form>

        {submitted && (
          <div className="alert alert-success mt-4 text-center text-white bg-blue-500 border border-blue-400">
            <i className="fas fa-check-circle mr-2"></i>
            Thank you for subscribing! Check your email for exclusive offers.
          </div>
        )}
      </div>
    </section>
  );
}
