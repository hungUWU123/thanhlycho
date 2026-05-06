"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import pageStyles from "../page.module.css";
import styles from "../admin/products/products.module.css"; // Reuse table styles

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className={pageStyles.emptyState}>
        <h2 style={{ marginBottom: "1rem" }}>Giỏ hàng của bạn đang trống</h2>
        <p style={{ marginBottom: "2rem" }}>Hãy tìm thêm các sản phẩm thanh lý tuyệt vời nhé!</p>
        <Link href="/products" className="btn btn-primary">
          Tiếp Tục Mua Sắm
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className={pageStyles.sectionTitle}>Giỏ Hàng Của Bạn</h1>
      
      <div className="card" style={{ marginBottom: "2rem" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} width="60" height="60" style={{ objectFit: "cover", borderRadius: "4px" }} />
                  ) : (
                    <div style={{ width: 60, height: 60, backgroundColor: "#eee", borderRadius: "4px" }} />
                  )}
                  <span style={{ fontWeight: 500 }}>{item.name}</span>
                </td>
                <td>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{ padding: "0.25rem 0.5rem", cursor: "pointer" }}
                    >-</button>
                    <span style={{ width: "20px", textAlign: "center" }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{ padding: "0.25rem 0.5rem", cursor: "pointer" }}
                    >+</button>
                  </div>
                </td>
                <td style={{ fontWeight: "bold", color: "var(--primary)" }}>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price * item.quantity)}
                </td>
                <td>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ color: "red", border: "none", background: "none", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>
        <div>
          <Link href="/products" className="btn btn-outline">
            &larr; Tiếp tục mua sắm
          </Link>
        </div>
        <div className="card" style={{ padding: "2rem", minWidth: "300px" }}>
          <h3 style={{ marginBottom: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>Tổng Cộng</h3>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "2rem" }}>
            <span>Thành tiền:</span>
            <span style={{ color: "var(--primary)" }}>
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total)}
            </span>
          </div>
          <Link href="/checkout" className="btn btn-primary" style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}>
            Tiến Hành Đặt Hàng (COD)
          </Link>
        </div>
      </div>
    </div>
  );
}
