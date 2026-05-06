"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import formStyles from "../admin/products/products.module.css";
import pageStyles from "../page.module.css";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/cart");
    }
  }, [mounted, items.length, router]);

  if (!mounted || items.length === 0) {
    return null;
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      customerName: formData.get("customerName"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      items: items,
      total: total,
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        clearCart();
        router.push("/checkout/success");
      } else {
        alert("Có lỗi xảy ra khi đặt hàng.");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className={pageStyles.sectionTitle}>Thông Tin Đặt Hàng</h1>
      
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div className="card" style={{ flex: "1 1 500px", padding: "2rem" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Thông tin giao hàng</h3>
          <form onSubmit={handleSubmit} className={formStyles.form} style={{ maxWidth: "100%" }}>
            <div className={formStyles.formGroup}>
              <label htmlFor="customerName">Họ và tên *</label>
              <input type="text" id="customerName" name="customerName" className={formStyles.input} required />
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="phone">Số điện thoại *</label>
              <input type="tel" id="phone" name="phone" className={formStyles.input} required />
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="address">Địa chỉ giao hàng chi tiết *</label>
              <textarea id="address" name="address" className={formStyles.input} required style={{ minHeight: "80px" }}></textarea>
            </div>

            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "var(--background)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
              <strong>Phương thức thanh toán:</strong> Thanh toán khi nhận hàng (COD)
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem", padding: "1rem", fontSize: "1.1rem" }} disabled={isSubmitting}>
              {isSubmitting ? "Đang xử lý..." : "Xác Nhận Đặt Hàng"}
            </button>
          </form>
        </div>

        <div className="card" style={{ flex: "1 1 300px", padding: "2rem" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Tóm tắt đơn hàng</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
            {items.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{item.quantity}x {item.name}</span>
                <span style={{ fontWeight: 500 }}>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "bold" }}>
            <span>Tổng cộng:</span>
            <span style={{ color: "var(--primary)" }}>
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
