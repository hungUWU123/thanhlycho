export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import styles from "../layout.module.css";
import tableStyles from "./products.module.css";

const prisma = new PrismaClient();

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1>Quản Lý Sản Phẩm</h1>
        <Link href="/admin/products/new" className="btn btn-primary">
          + Thêm Sản Phẩm
        </Link>
      </div>

      <div className="card">
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tình trạng</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "2rem" }}>
                  Chưa có sản phẩm nào.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.image ? (
                      <img src={product.image} alt={product.name} width="50" height="50" style={{ objectFit: "cover", borderRadius: "4px" }} />
                    ) : (
                      <div style={{ width: 50, height: 50, backgroundColor: "#eee", borderRadius: "4px" }} />
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                  </td>
                  <td>{product.condition}</td>
                  <td style={{ fontWeight: 600, textAlign: "center" }}>{product.stock}</td>
                  <td>
                    <span style={{
                      padding: "0.2rem 0.6rem",
                      borderRadius: "999px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      backgroundColor: product.inStock ? "#dcfce7" : "#fee2e2",
                      color: product.inStock ? "#166534" : "#991b1b",
                    }}>
                      {product.inStock ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/products/${product.id}`} className="btn btn-outline" style={{ padding: "0.25rem 0.5rem", fontSize: "0.8rem" }}>
                      Sửa kho
                    </Link>
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
