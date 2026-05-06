import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import styles from "../layout.module.css";
import tableStyles from "../products/products.module.css";

const prisma = new PrismaClient();

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1>Quản Lý Danh Mục</h1>
        <Link href="/admin/categories/new" className="btn btn-primary">
          + Thêm Danh Mục
        </Link>
      </div>

      <div className="card">
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Mô tả</th>
              <th>Số sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "2rem" }}>
                  Chưa có danh mục nào.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td style={{ fontWeight: 500 }}>{category.name}</td>
                  <td style={{ color: "var(--text-muted)" }}>{category.description || "-"}</td>
                  <td>{category._count.products}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
