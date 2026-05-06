export const dynamic = "force-dynamic";
import prisma from "../../lib/prisma";
import Link from "next/link";
import styles from "../layout.module.css";
import tableStyles from "./products.module.css";
import { deleteProduct } from "@/actions/adminActions";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-fade">
      <div className={styles.header}>
        <h1>Quản Lý Kho Hàng</h1>
        <Link href="/admin/products/new" className="btn btn-primary">
          + Thêm Sản Phẩm Mới
        </Link>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá thanh lý</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                  Kho hàng đang trống. Hãy thêm sản phẩm đầu tiên!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} width="48" height="48" style={{ objectFit: "cover", borderRadius: "8px" }} />
                    ) : (
                      <div style={{ width: 48, height: 48, backgroundColor: "#f1f5f9", borderRadius: "8px" }} />
                    )}
                    <div>
                      <div style={{ fontWeight: "600" }}>{product.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{product.condition}</div>
                    </div>
                  </td>
                  <td>{product.category.name}</td>
                  <td style={{ fontWeight: "700", color: "#ef4444" }}>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "600" }}>{product.stock}</td>
                  <td>
                    <span style={{
                      padding: "0.25rem 0.6rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      backgroundColor: product.inStock ? "#dcfce7" : "#fee2e2",
                      color: product.inStock ? "#166534" : "#991b1b",
                    }}>
                      {product.inStock ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/products/${product.id}/edit`} className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}>
                        Sửa
                      </Link>
                      <form action={deleteProduct} onSubmit={(e) => !confirm("Bạn có chắc muốn xóa sản phẩm này?") && e.preventDefault()}>
                        <input type="hidden" name="productId" value={product.id} />
                        <button type="submit" className="btn" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem", backgroundColor: "#fee2e2", color: "#ef4444" }}>
                          Xóa
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
