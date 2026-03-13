
import React from "react";
import Header from "@/components/ui/header";
import Heading from "./Heading";
import { scale } from "framer-motion";

export default function ProductView({ product }) {
  if (!product) return <div>No product found.</div>;
  return (
    <div style={{ padding: 32, marginTop: 32 }}>
      {/* Use Heading component for the product title at the top */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 24, marginTop: 24 }}>
        <img src={product.image} alt={product.name} style={{ maxWidth: 400, width: '100%', height: 'auto' }} />
      </div>
      {/* Move product name below the image */}
      <Heading title={product.name} className="pt-19px"  />
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Rating:</strong> {product.rating} ({product.reviews} reviews)</p>
      <p><strong>Status:</strong> {product.stock === 0 ? 'Out of Stock' : 'In Stock'}</p>
    </div>
  );
}
