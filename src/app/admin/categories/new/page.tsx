import { createCategory } from "@/actions/adminActions";
import styles from "../../layout.module.css";
import formStyles from "../../products/products.module.css";
import Link from "next/link";

export default function NewCategory() {
  return (
    <div>
      <div className={styles.header}>
        <h1>Thêm Danh Mục Mới</h1>
        <Link href="/admin/categories" className="btn btn-outline">
          Hủy
        </Link>
      </div>

      <div className="card" style={{ padding: "2rem" }}>
        <form action={createCategory} className={formStyles.form}>
          <div className={formStyles.formGroup}>
            <label htmlFor="name">Tên danh mục *</label>
            <input type="text" id="name" name="name" className={formStyles.input} required />
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="description">Mô tả (Tùy chọn)</label>
            <textarea id="description" name="description" className={formStyles.input}></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Lưu Danh Mục
          </button>
        </form>
      </div>
    </div>
  );
}
