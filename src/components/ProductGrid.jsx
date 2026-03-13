'use client';

import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductGrid.css';

export default function ProductGrid({ products, loading = false }) {
  const displayProducts = useMemo(() => {
    if (loading) return [];
    return products || [];
  }, [products, loading]);

  if (loading) {
    return (
      <div className="pg-product-grid" style={{ padding: '32px 24px' }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-96 animate-pulse border border-[#e8e8e8] rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg font-light">No products found</p>
      </div>
    );
  }

  return (
    <div className="pg-product-grid">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
