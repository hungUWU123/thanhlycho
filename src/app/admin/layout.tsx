import Link from "next/link";
import styles from "./layout.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTitle}>Quản Lý Vựa Đồ</div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={styles.navItem}>
            Tổng quan
          </Link>
          <Link href="/admin/categories" className={styles.navItem}>
            Danh mục
          </Link>
          <Link href="/admin/products" className={styles.navItem}>
            Sản phẩm
          </Link>
          <Link href="/admin/orders" className={styles.navItem}>
            Đơn hàng
          </Link>
          <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
            <Link href="/" className={styles.navItem}>
              &larr; Xem Website
            </Link>
          </div>
        </nav>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
