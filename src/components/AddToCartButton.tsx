"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return (
      <button
        disabled
        className="btn"
        style={{
          width: "100%",
          padding: "1rem",
          fontSize: "1.1rem",
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          cursor: "not-allowed",
          opacity: 0.8,
        }}
      >
        ❌ Hết hàng
      </button>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className="btn btn-primary"
      style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
    >
      {added ? "✓ Đã thêm vào giỏ hàng" : "🛒 Thêm vào giỏ hàng"}
    </button>
  );
}

