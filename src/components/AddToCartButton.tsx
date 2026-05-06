"use client";

import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();

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
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`, {
      icon: "🛒",
      position: "top-right",
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="btn btn-primary"
      style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
    >
      🛒 Thêm vào giỏ hàng
    </button>
  );
}
