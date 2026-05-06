import prisma from "@/lib/prisma";
import { createCategory, deleteCategory } from "@/actions/adminActions";
import styles from "../layout.module.css";
import tableStyles from "../products/products.module.css";
import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: "asc" }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản lý Danh mục</h1>
          <p className={styles.subtitle}>Tạo và quản lý các nhóm sản phẩm của bạn</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", marginTop: "2rem" }}>
        {/* Form thêm mới */}
        <div className="card" style={{ height: "fit-content" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Thêm danh mục mới</h3>
          <form action={createCategory}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Tên danh mục *</label>
              <input 
                name="name" 
                className="input" 
                placeholder="VD: Đồ điện tử, Nội thất..." 
                required 
                style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0" }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Mô tả</label>
              <textarea 
                name="description" 
                className="input" 
                placeholder="Mô tả ngắn về danh mục này" 
                style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0", minHeight: "100px" }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "1rem" }}>
              ➕ Thêm danh mục
            </button>
          </form>
        </div>

        {/* Danh sách danh mục */}
        <div className="card" style={{ overflow: "hidden", padding: 0 }}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Tên danh mục</th>
                <th>Số sản phẩm</th>
                <th>Mô tả</th>
                <th style={{ textAlign: "right" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                    Chưa có danh mục nào.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id}>
                    <td style={{ fontWeight: "600" }}>{cat.name}</td>
                    <td>
                      <span style={{ backgroundColor: "#f1f5f9", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.85rem" }}>
                        {cat._count.products} sản phẩm
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {cat.description || "—"}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <DeleteButton 
                        action={deleteCategory} 
                        id={cat.id} 
                        name={cat.name} 
                        idFieldName="categoryId"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
