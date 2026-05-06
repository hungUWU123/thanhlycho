import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import styles from "../../layout.module.css";
import formStyles from "../products.module.css";
import Link from "next/link";
import { updateProduct } from "@/actions/productActions";

const prisma = new PrismaClient();

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <div>
      <div className={styles.header}>
        <h1>Chỉnh Sửa Sản Phẩm</h1>
        <Link href="/admin/products" className="btn btn-outline">
          Hủy
        </Link>
      </div>

      <div className="card" style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "var(--background)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>{product.name}</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Giá: {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
            {" | "}Tình trạng: {product.condition}
          </p>
        </div>

        <form action={updateProduct} className={formStyles.form} style={{ maxWidth: "400px" }}>
          <input type="hidden" name="id" value={product.id} />

          <div className={formStyles.formGroup}>
            <label htmlFor="stock">Số lượng tồn kho</label>
            <input
              type="number"
              id="stock"
              name="stock"
              className={formStyles.input}
              defaultValue={product.stock}
              min="0"
              required
            />
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="inStock">Trạng thái</label>
            <select
              id="inStock"
              name="inStock"
              className={formStyles.input}
              defaultValue={product.inStock ? "true" : "false"}
            >
              <option value="true">✅ Còn hàng</option>
              <option value="false">❌ Hết hàng</option>
            </select>
            <small style={{ color: "var(--text-muted)" }}>
              * Khi số lượng = 0, nên chuyển sang "Hết hàng"
            </small>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
            Cập Nhật Tồn Kho
          </button>
        </form>
      </div>
    </div>
  );
}
