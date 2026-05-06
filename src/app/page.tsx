import Link from "next/link";
import styles from "./page.module.css";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <section className={styles.hero}>
        <h1>Mua Bán Đồ Thanh Lý</h1>
        <p>
          Tìm kiếm những món đồ chất lượng với giá cực hời. Tiết kiệm chi phí,
          bảo vệ môi trường.
        </p>
        <Link href="/products" className="btn btn-primary">
          Xem Tất Cả Sản Phẩm
        </Link>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Sản Phẩm Mới Nhất</h2>
        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Chưa có sản phẩm nào. Vui lòng quay lại sau!</p>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={`card ${styles.productCard}`}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                ) : (
                  <div className={styles.productImage} /> // Placeholder
                )}
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <div className={styles.productPrice}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </div>
                  <span style={{
                    display: "inline-block",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    fontSize: "0.78rem",
                    fontWeight: "bold",
                    marginBottom: "0.75rem",
                    backgroundColor: product.inStock ? "#dcfce7" : "#fee2e2",
                    color: product.inStock ? "#166534" : "#991b1b",
                  }}>
                    {product.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}
                  </span>
                  <Link
                    href={`/products/${product.id}`}
                    className={`btn btn-outline ${!product.inStock ? "disabled" : ""}`}
                    style={{ 
                      marginTop: "auto",
                      pointerEvents: !product.inStock ? "none" : "auto",
                      opacity: !product.inStock ? 0.5 : 1
                    }}
                  >
                    Xem Chi Tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
