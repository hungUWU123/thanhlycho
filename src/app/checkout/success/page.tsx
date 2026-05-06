import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="animate-fade" style={{ 
      textAlign: "center", 
      padding: "5rem 1rem", 
      maxWidth: "600px", 
      margin: "0 auto" 
    }}>
      <div style={{ fontSize: "5rem", marginBottom: "2rem" }}>🎉</div>
      <h1 style={{ color: "var(--success)", fontSize: "2.5rem" }}>Đặt Hàng Thành Công!</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "2rem" }}>
        Cảm ơn bạn đã ủng hộ shop. Chúng tôi đã nhận được đơn hàng và sẽ liên hệ xác nhận trong thời gian sớm nhất.
      </p>
      <div className="card" style={{ padding: "1.5rem", textAlign: "left", marginBottom: "2rem" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>💡 Lưu ý tiếp theo:</h4>
        <ul style={{ paddingLeft: "1.2rem", color: "var(--text-muted)" }}>
          <li>Shop sẽ gọi điện cho bạn để chốt đơn.</li>
          <li>Bạn có thể dùng Số điện thoại để tra cứu đơn hàng ở trang chủ.</li>
          <li>Thời gian giao hàng dự kiến từ 2-4 ngày.</li>
        </ul>
      </div>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary">Tiếp tục mua sắm</Link>
        <Link href="/track" className="btn btn-outline">Tra cứu đơn hàng</Link>
      </div>
    </div>
  );
}
