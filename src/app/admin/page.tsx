import { PrismaClient } from "@prisma/client";
import styles from "./layout.module.css";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const [productCount, categoryCount, orderCount, totalRevenue] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: "COMPLETED" }
    })
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { orderItems: { include: { product: true } } }
  });

  return (
    <div className="animate-fade">
      <div className={styles.header}>
        <h1>Tổng Quan Kinh Doanh</h1>
        <p style={{ color: "var(--text-muted)" }}>Chào mừng bạn quay lại trang quản trị.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>TỔNG DOANH THU (ĐÃ GIAO)</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--primary)" }}>
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalRevenue._sum.total || 0)}
          </div>
        </div>
        <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid #10b981" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>ĐƠN HÀNG</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#10b981" }}>{orderCount}</div>
        </div>
        <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid #f59e0b" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>SẢN PHẨM</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#f59e0b" }}>{productCount}</div>
        </div>
        <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid #6366f1" }}>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>DANH MỤC</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#6366f1" }}>{categoryCount}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        {/* Recent Orders */}
        <div className="card">
          <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Đơn hàng mới nhất</h3>
            <Link href="/admin/orders" style={{ color: "var(--primary)", fontSize: "0.9rem" }}>Xem tất cả</Link>
          </div>
          <div style={{ padding: "1rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <th style={{ padding: "1rem" }}>KHÁCH HÀNG</th>
                  <th style={{ padding: "1rem" }}>TỔNG TIỀN</th>
                  <th style={{ padding: "1rem" }}>TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: "bold" }}>{order.customerName}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{order.phone}</div>
                    </td>
                    <td style={{ padding: "1rem", fontWeight: "bold" }}>
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ 
                        fontSize: "0.75rem", 
                        padding: "0.25rem 0.5rem", 
                        borderRadius: "999px",
                        backgroundColor: order.status === "PENDING" ? "#fef3c7" : "#dcfce7",
                        color: order.status === "PENDING" ? "#92400e" : "#166534"
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Thao tác nhanh</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link href="/admin/products/new" className="btn btn-primary" style={{ width: "100%" }}>+ Thêm sản phẩm</Link>
            <Link href="/admin/categories/new" className="btn btn-outline" style={{ width: "100%" }}>+ Thêm danh mục</Link>
            <hr style={{ border: "0", borderTop: "1px solid var(--border)" }} />
            <Link href="/" className="btn btn-outline" style={{ width: "100%" }}>🏠 Xem Website</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
