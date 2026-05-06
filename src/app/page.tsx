import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

const prisma = new PrismaClient();

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; query?: string }>;
}) {
  const { category, query } = await searchParams;

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  
  const products = await prisma.product.findMany({
    where: {
      AND: [
        category ? { categoryId: category } : {},
        query ? { name: { contains: query, mode: "insensitive" } } : {},
      ],
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section style={{ 
        textAlign: "center", 
        padding: "4rem 1rem", 
        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        borderRadius: "var(--radius)",
        marginBottom: "3rem",
        border: "1px solid var(--border)"
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#1e3a8a" }}>Vựa Đồ Thanh Lý Giá Rẻ</h1>
        <p style={{ fontSize: "1.2rem", color: "#3b82f6", maxWidth: "700px", margin: "0 auto" }}>
          Săn đồ cũ, giá cực yêu! Hàng chất lượng, tuyển chọn kỹ lưỡng mỗi ngày.
        </p>
      </section>

      <div style={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
        {/* Search & Filter Bar */}
        <div className="card" style={{ padding: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <form action="/" method="GET" style={{ flex: 1, display: "flex", gap: "0.5rem" }}>
            <input 
              type="text" 
              name="query" 
              placeholder="Bạn đang tìm gì? (Ví dụ: bàn ghế, tai nghe...)" 
              defaultValue={query}
              style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)" }}
            />
            <button type="submit" className="btn btn-primary">Tìm kiếm</button>
          </form>

          <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
            <Link href="/" className={`btn ${!category ? "btn-primary" : "btn-outline"}`} style={{ padding: "0.5rem 1rem" }}>Tất cả</Link>
            {categories.map(cat => (
              <Link 
                key={cat.id} 
                href={`/?category=${cat.id}`} 
                className={`btn ${category === cat.id ? "btn-primary" : "btn-outline"}`}
                style={{ padding: "0.5rem 1rem", whiteSpace: "nowrap" }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2>{category ? categories.find(c => c.id === category)?.name : "Sản phẩm mới nhất"}</h2>
            <span style={{ color: "var(--text-muted)" }}>{products.length} sản phẩm</span>
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
              <p style={{ fontSize: "1.2rem" }}>Chưa có sản phẩm nào phù hợp với yêu cầu của bạn.</p>
              <Link href="/" style={{ color: "var(--primary)", marginTop: "1rem", display: "inline-block" }}>Xem tất cả sản phẩm</Link>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <Link href={`/products/${product.id}`} style={{ position: "relative", display: "block", aspectRatio: "1", overflow: "hidden", borderTopLeftRadius: "var(--radius)", borderTopRightRadius: "var(--radius)" }}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>Không có ảnh</div>
                    )}
                    {!product.inStock && (
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "1.2rem" }}>
                        HẾT HÀNG
                      </div>
                    )}
                  </Link>
                  <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: "bold", marginBottom: "0.25rem" }}>{product.category.name}</div>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", height: "2.8rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      <Link href={`/products/${product.id}`}>{product.name}</Link>
                    </h3>
                    <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "#ef4444", marginBottom: "0.5rem" }}>
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                      Tình trạng: <strong>{product.condition}</strong>
                    </div>
                    <div style={{ marginTop: "auto" }}>
                      <AddToCartButton product={product} />
                    </div>
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
