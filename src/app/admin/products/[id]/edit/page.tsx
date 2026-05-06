export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { updateProduct } from "@/actions/adminActions";
import styles from "../../layout.module.css";
import formStyles from "../products.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();

  const categories = await prisma.category.findMany();

  return (
    <div className="animate-fade">
      <div className={styles.header}>
        <h1>Chỉnh Sửa Sản Phẩm</h1>
        <Link href="/admin/products" className="btn btn-outline">Quay lại</Link>
      </div>

      <div className="card" style={{ padding: "2rem" }}>
        <form action={updateProduct} className={formStyles.form}>
          <input type="hidden" name="id" value={product.id} />
          
          <div className={formStyles.formGroup}>
            <label htmlFor="name">Tên sản phẩm *</label>
            <input type="text" id="name" name="name" className={formStyles.input} defaultValue={product.name} required />
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="categoryId">Danh mục *</label>
            <select id="categoryId" name="categoryId" className={formStyles.input} defaultValue={product.categoryId} required>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="price">Giá thanh lý (VNĐ) *</label>
            <input type="number" id="price" name="price" className={formStyles.input} defaultValue={product.price} required />
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="image">Link hình ảnh (URL)</label>
            <input type="text" id="image" name="image" className={formStyles.input} defaultValue={product.image || ""} />
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="stock">Số lượng tồn kho *</label>
            <input type="number" id="stock" name="stock" className={formStyles.input} defaultValue={product.stock} required />
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="inStock">Trạng thái</label>
            <select id="inStock" name="inStock" className={formStyles.input} defaultValue={String(product.inStock)}>
              <option value="true">✅ Còn hàng</option>
              <option value="false">❌ Hết hàng</option>
            </select>
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="description">Mô tả</label>
            <textarea id="description" name="description" className={formStyles.input} defaultValue={product.description} required></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%" }}>
            Cập Nhật Sản Phẩm
          </button>
        </form>
      </div>
    </div>
  );
}
