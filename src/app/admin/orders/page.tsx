import { PrismaClient } from "@prisma/client";
import styles from "../layout.module.css";
import tableStyles from "../products/products.module.css";
import { updateOrderStatus } from "@/actions/adminActions";

const prisma = new PrismaClient();

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  PENDING:   { label: "⏳ Chờ duyệt",  bg: "#fef3c7", color: "#92400e" },
  SHIPPING:  { label: "🚚 Đang giao",   bg: "#dbeafe", color: "#1e40af" },
  COMPLETED: { label: "✅ Hoàn thành",  bg: "#dcfce7", color: "#166534" },
  CANCELLED: { label: "❌ Đã hủy",      bg: "#fee2e2", color: "#991b1b" },
};

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  const counts = {
    PENDING:   orders.filter(o => o.status === "PENDING").length,
    SHIPPING:  orders.filter(o => o.status === "SHIPPING").length,
    COMPLETED: orders.filter(o => o.status === "COMPLETED").length,
    CANCELLED: orders.filter(o => o.status === "CANCELLED").length,
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Quản Lý Đơn Hàng</h1>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <div key={key} className="card" style={{ padding: "1rem", borderLeft: `4px solid ${cfg.color}` }}>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: cfg.color }}>{counts[key as keyof typeof counts]}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{cfg.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Điện thoại</th>
              <th>Địa chỉ</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
                  Chưa có đơn hàng nào.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.PENDING;
                return (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 500 }}>{order.customerName}</td>
                    <td>{order.phone}</td>
                    <td style={{ maxWidth: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={order.address}>
                      {order.address}
                    </td>
                    <td>
                      <ul style={{ margin: 0, paddingLeft: "1rem", fontSize: "0.9rem" }}>
                        {order.orderItems.map(item => (
                          <li key={item.id}>{item.quantity}x {item.product.name}</li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ fontWeight: "bold", color: "var(--primary)" }}>
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                    </td>
                    <td>
                      <span style={{
                        padding: "0.25rem 0.6rem",
                        borderRadius: "999px",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        backgroundColor: cfg.bg,
                        color: cfg.color,
                        whiteSpace: "nowrap",
                      }}>
                        {cfg.label}
                      </span>
                    </td>
                    <td>
                      <form action={updateOrderStatus}>
                        <input type="hidden" name="orderId" value={order.id} />
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>

                          {/* PENDING → Bắt đầu giao */}
                          {order.status === "PENDING" && (
                            <button type="submit" name="status" value="SHIPPING"
                              className="btn"
                              style={{ backgroundColor: "#3b82f6", color: "white", padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>
                              🚚 Bắt đầu giao
                            </button>
                          )}

                          {/* SHIPPING → Hoàn thành */}
                          {order.status === "SHIPPING" && (
                            <button type="submit" name="status" value="COMPLETED"
                              className="btn"
                              style={{ backgroundColor: "#10b981", color: "white", padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>
                              ✅ Đã giao xong
                            </button>
                          )}

                          {/* PENDING hoặc SHIPPING → Hủy (bom hàng) → tự hoàn stock */}
                          {(order.status === "PENDING" || order.status === "SHIPPING") && (
                            <button
                              type="submit"
                              name="status"
                              value="CANCELLED"
                              className="btn btn-outline"
                              style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem", color: "#dc2626", borderColor: "#dc2626" }}
                            >
                              ❌ Hủy (bom hàng)
                            </button>
                          )}

                          {(order.status === "COMPLETED" || order.status === "CANCELLED") && (
                            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>—</span>
                          )}
                        </div>
                      </form>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
