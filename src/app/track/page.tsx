"use client";

import { useState } from "react";
import styles from "./track.module.css";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { name: string; image: string | null };
};

type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  total: number;
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
};

const STATUS_STEPS = ["PENDING", "SHIPPING", "COMPLETED"];

const STATUS_INFO: Record<string, { label: string; icon: string; color: string; desc: string }> = {
  PENDING:   { label: "Chờ xác nhận",  icon: "⏳", color: "#f59e0b", desc: "Đơn hàng đang chờ shop xác nhận" },
  SHIPPING:  { label: "Đang giao hàng", icon: "🚚", color: "#3b82f6", desc: "Đơn hàng đang trên đường giao đến bạn" },
  COMPLETED: { label: "Đã giao thành công", icon: "✅", color: "#10b981", desc: "Bạn đã nhận được hàng thành công!" },
  CANCELLED: { label: "Đơn hàng đã hủy", icon: "❌", color: "#ef4444", desc: "Đơn hàng này đã bị hủy" },
};

export default function TrackPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const res = await fetch(`/api/track?phone=${encodeURIComponent(phone.trim())}`);
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
        setSearched(true);
      } else {
        setError(data.error || "Có lỗi xảy ra.");
      }
    } catch {
      setError("Không thể kết nối. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>🔍 Tra Cứu Đơn Hàng</h1>
        <p>Nhập số điện thoại bạn đã dùng khi đặt hàng để xem tình trạng đơn</p>
      </div>

      <div className={styles.searchBox}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại..."
            className={styles.searchInput}
            required
          />
          <button type="submit" className={`btn btn-primary ${styles.searchBtn}`} disabled={loading}>
            {loading ? "Đang tìm..." : "Tra cứu"}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {searched && (
        <div className={styles.results}>
          {orders.length === 0 ? (
            <div className={styles.empty}>
              <p>Không tìm thấy đơn hàng nào với số điện thoại <strong>{phone}</strong>.</p>
              <p style={{ fontSize: "0.9rem" }}>Vui lòng kiểm tra lại số điện thoại hoặc liên hệ hỗ trợ.</p>
            </div>
          ) : (
            <>
              <h2 className={styles.resultsTitle}>Tìm thấy {orders.length} đơn hàng</h2>
              <div className={styles.orderList}>
                {orders.map((order) => {
                  const info = STATUS_INFO[order.status] ?? STATUS_INFO.PENDING;
                  const isCancelled = order.status === "CANCELLED";
                  const currentStep = STATUS_STEPS.indexOf(order.status);

                  return (
                    <div key={order.id} className={`card ${styles.orderCard}`}>
                      {/* Header */}
                      <div className={styles.orderHeader}>
                        <div>
                          <div className={styles.orderId}>
                            Đơn hàng #{order.id.slice(-8).toUpperCase()}
                          </div>
                          <div className={styles.orderDate}>
                            {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                              day: "2-digit", month: "2-digit", year: "numeric",
                              hour: "2-digit", minute: "2-digit"
                            })}
                          </div>
                        </div>
                        <span className={styles.statusBadge} style={{ backgroundColor: info.color + "22", color: info.color }}>
                          {info.icon} {info.label}
                        </span>
                      </div>

                      {/* Timeline */}
                      {!isCancelled ? (
                        <div className={styles.timeline}>
                          {STATUS_STEPS.map((step, i) => {
                            const s = STATUS_INFO[step];
                            const done = currentStep >= i;
                            const active = currentStep === i;
                            return (
                              <div key={step} className={styles.timelineStep}>
                                <div className={`${styles.timelineDot} ${done ? styles.done : ""} ${active ? styles.active : ""}`}>
                                  {done ? (active ? s.icon : "✓") : "○"}
                                </div>
                                <div className={styles.timelineLabel} style={{ color: done ? "var(--text-main)" : "var(--text-muted)", fontWeight: active ? 700 : 400 }}>
                                  {s.label}
                                </div>
                                {i < STATUS_STEPS.length - 1 && (
                                  <div className={`${styles.timelineLine} ${currentStep > i ? styles.lineDone : ""}`} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className={styles.cancelledBanner}>
                          ❌ Đơn hàng này đã bị hủy. Vui lòng liên hệ shop nếu có thắc mắc.
                        </div>
                      )}

                      {/* Status message */}
                      <div className={styles.statusMsg} style={{ borderColor: info.color, color: info.color }}>
                        {info.desc}
                      </div>

                      {/* Order items */}
                      <div className={styles.itemsSection}>
                        <h4>Sản phẩm đã đặt:</h4>
                        <ul className={styles.itemList}>
                          {order.orderItems.map((item) => (
                            <li key={item.id} className={styles.item}>
                              <span>{item.quantity}x {item.product.name}</span>
                              <span className={styles.itemPrice}>
                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price * item.quantity)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className={styles.totalRow}>
                          <span>Tổng cộng (COD):</span>
                          <strong style={{ color: "var(--primary)" }}>
                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                          </strong>
                        </div>
                      </div>

                      {/* Delivery address */}
                      <div className={styles.addressSection}>
                        <span>📍</span>
                        <span>Giao đến: {order.address}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
