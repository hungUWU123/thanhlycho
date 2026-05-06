import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import pageStyles from "../page.module.css";
import styles from "./products.module.css";

const prisma = new PrismaClient();

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  const categories = await prisma.category.findMany();

  return (
    <div>
      <h1 className={pageStyles.sectionTitle} style={{ marginBottom: "2rem" }}>
        Tất Cả Sản Phẩm Thanh Lý
      </h1>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h3>Danh Mục</h3>
          <ul className={styles.categoryList}>
            <li><Link href="/products" style={{ fontWeight: "bold" }}>Tất cả</Link></li>
            {categories.map(c => (
              <li key={c.id}>
                <Link href={`/products?category=${c.id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.main}>
          {products.length === 0 ? (
            <div className={pageStyles.emptyState}>
              <p>Chưa có sản phẩm nào.</p>
            </div>
          ) : (
            <div className={pageStyles.productGrid}>
              {products.map((product) => (
                <div key={product.id} className={`card ${pageStyles.productCard}`}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className={pageStyles.productImage}
                    />
                  ) : (
                    <div className={pageStyles.productImage} />
                  )}
                  <div className={pageStyles.productInfo}>
                    <h3 className={pageStyles.productTitle}>{product.name}</h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                      Tình trạng: {product.condition}
                    </p>
                    <div className={pageStyles.productPrice}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                      {product.originalPrice && (
                        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", textDecoration: "line-through", marginLeft: "0.5rem", fontWeight: "normal" }}>
                          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="btn btn-outline"
                      style={{ marginTop: "auto" }}
                    >
                      Xem Chi Tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
