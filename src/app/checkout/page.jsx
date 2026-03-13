"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();
  const { cartItems, checkout, isMutating, getTotalPrice } = useCart();

  const [shippingAddress, setShippingAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  if (!isHydrated) return null;

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-12">
        <h1 className="text-3xl font-light mb-4">Checkout</h1>
        <p className="text-gray-600 mb-6">Please sign in to checkout.</p>
        <Link className="underline" href="/signin?next=/checkout">
          Sign in
        </Link>
      </div>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await checkout(shippingAddress);
      setSuccess(res || { ok: true });
    } catch (err) {
      setError(err?.message || "Checkout failed.");
    }
  };

  if (success) {
    return (
      <div className="container-custom py-12 max-w-2xl">
        <h1 className="text-3xl font-light mb-4">Order confirmed</h1>
        <p className="text-gray-700 mb-6">
          Your order was placed successfully. You can view your order history on the orders page.
        </p>
        <div className="flex gap-4">
          <button onClick={() => router.replace("/orders")} className="px-5 py-3 bg-black text-white rounded-lg">
            View orders
          </button>
          <button onClick={() => router.replace("/products")} className="px-5 py-3 border border-gray-300 rounded-lg">
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12 max-w-2xl">
      <h1 className="text-3xl font-light mb-2">Checkout</h1>
      <p className="text-gray-600 text-sm mb-8">
        Items: <span className="font-semibold">{cartItems.length}</span> · Total:{" "}
        <span className="font-semibold">₹{getTotalPrice()}</span>
      </p>

      {error && (
        <div className="mb-4 p-3 border border-red-200 bg-red-50 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Shipping address</label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="House no, street, city, state, pincode..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isMutating || cartItems.length === 0}
          className="w-full py-3 bg-black text-white rounded-lg disabled:opacity-60"
        >
          {isMutating ? "Placing order..." : `Place order (₹${getTotalPrice()})`}
        </button>

        <Link className="inline-block underline text-sm text-gray-700" href="/cart">
          Back to cart
        </Link>
      </form>
    </div>
  );
}

