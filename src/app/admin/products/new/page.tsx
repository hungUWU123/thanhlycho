export const dynamic = "force-dynamic";
import prisma from "../../../lib/prisma";
import { createProduct } from "@/actions/adminActions";
import styles from "../../layout.module.css";
import formStyles from "../products.module.css";
import Link from "next/link";

export default async function NewProduct() {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <div className={styles.header}>
        <h1>Thêm Sản Phẩm Mới</h1>
        <Link href="/admin/products" className="btn btn-outline">
          Hủy
        </Link>
      </div>

      <div className="card" style={{ padding: "2rem" }}>
        {categories.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p style={{ marginBottom: "1rem", color: "var(--text-muted)" }}>
              Bạn cần tạo ít nhất một danh mục trước khi thêm sản phẩm.
            </p>
            <Link href="/admin/categories/new" className="btn btn-primary">
              Tạo Danh Mục Đầu Tiên
            </Link>
          </div>
        ) : (
          <form action={createProduct} className={formStyles.form}>
            <div className={formStyles.formGroup}>
              <label htmlFor="name">Tên sản phẩm *</label>
              <input type="text" id="name" name="name" className={formStyles.input} required />
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="categoryId">Danh mục *</label>
              <select id="categoryId" name="categoryId" className={formStyles.input} required>
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="price">Giá thanh lý (VNĐ) *</label>
              <input type="number" id="price" name="price" className={formStyles.input} required min="0" />
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="originalPrice">Giá gốc (VNĐ) - Tùy chọn</label>
              <input type="number" id="originalPrice" name="originalPrice" className={formStyles.input} min="0" />
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="condition">Tình trạng *</label>
              <select id="condition" name="condition" className={formStyles.input} required defaultValue="Mới 90%">
                <option value="Mới 100%">Mới 100%</option>
                <option value="Mới 99%">Mới 99%</option>
                <option value="Mới 90%">Mới 90%</option>
                <option value="Mới 80%">Mới 80%</option>
                <option value="Đã sử dụng">Đã sử dụng</option>
              </select>
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="image">Link hình ảnh (từ Postimg, Imgur...)</label>
              <input type="text" id="image" name="image" className={formStyles.input} placeholder="Dán liên kết trực tiếp vào đây..." />
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="stock">Số lượng tồn kho *</label>
              <input type="number" id="stock" name="stock" className={formStyles.input} required min="0" defaultValue={0} />
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="inStock">Trạng thái tồn kho</label>
              <select id="inStock" name="inStock" className={formStyles.input}>
                <option value="true">✅ Còn hàng</option>
                <option value="false">❌ Hết hàng</option>
              </select>
            </div>

            <div className={formStyles.formGroup}>
              <label htmlFor="description">Mô tả chi tiết</label>
              <textarea id="description" name="description" className={formStyles.input} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem" }}>
              Lưu Sản Phẩm
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
