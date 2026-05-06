import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/products" style={{ color: "var(--text-muted)" }}>
          &larr; Quay lại danh sách
        </Link>
      </div>

      <div className="card" style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
        <div style={{ flex: "1 1 400px", minWidth: "300px", borderRight: "1px solid var(--border)" }}>
          {product.image ? (
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "1" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", aspectRatio: "1", backgroundColor: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
              Chưa có hình ảnh
            </div>
          )}
        </div>

        <div style={{ flex: "1 1 400px", padding: "2rem", display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "var(--primary)" }}>
            {product.name}
          </h1>
          
          <div style={{ marginBottom: "1rem", color: "var(--text-muted)" }}>
            Danh mục: <strong>{product!.category.name}</strong> | Tình trạng: <strong>{product!.condition}</strong>
          </div>

          <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary)", marginBottom: "1rem" }}>
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product!.price)}
            {product!.originalPrice && (
              <span style={{ fontSize: "1.1rem", color: "var(--text-muted)", textDecoration: "line-through", marginLeft: "1rem", fontWeight: "normal" }}>
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product!.originalPrice)}
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span style={{
              padding: "0.3rem 0.9rem",
              borderRadius: "999px",
              fontSize: "0.9rem",
              fontWeight: "bold",
              backgroundColor: product!.inStock ? "#dcfce7" : "#fee2e2",
              color: product!.inStock ? "#166534" : "#991b1b",
            }}>
              {product!.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}
            </span>
            {product!.inStock && (
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Còn lại: <strong>{product!.stock}</strong> sản phẩm
              </span>
            )}
          </div>

          <div style={{ marginBottom: "2rem", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Mô tả sản phẩm:</h3>
            <p>{product.description}</p>
          </div>

          <div style={{ marginTop: "auto", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
