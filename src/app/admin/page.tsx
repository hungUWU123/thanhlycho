import { PrismaClient } from "@prisma/client";
import styles from "./layout.module.css";
import pageStyles from "../page.module.css"; // Reuse some styles

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const totalProducts = await prisma.product.count();
  const totalCategories = await prisma.category.count();
  const totalOrders = await prisma.order.count();

  return (
    <div>
      <div className={styles.header}>
        <h1>Tổng Quan</h1>
      </div>

      <div className={pageStyles.productGrid}>
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3>Tổng Sản Phẩm</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary)" }}>
            {totalProducts}
          </p>
        </div>
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3>Danh Mục</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary)" }}>
            {totalCategories}
          </p>
        </div>
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3>Đơn Hàng</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary)" }}>
            {totalOrders}
          </p>
        </div>
      </div>
    </div>
  );
}
