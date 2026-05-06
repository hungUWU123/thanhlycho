import Link from "next/link";
import pageStyles from "../../page.module.css";

export default function CheckoutSuccessPage() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ fontSize: "4rem", color: "var(--primary)", marginBottom: "1rem" }}>
        ✓
      </div>
      <h1 className={pageStyles.sectionTitle} style={{ borderBottom: "none", paddingBottom: "0" }}>
        Đặt Hàng Thành Công!
      </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "var(--text-muted)" }}>
        Cảm ơn bạn đã mua hàng tại Vựa Đồ Thanh Lý. Đơn hàng của bạn đang được xử lý và sẽ được giao đến bạn trong thời gian sớm nhất.
      </p>
      <div className="card" style={{ padding: "2rem", marginBottom: "2rem", textAlign: "left" }}>
        <h3 style={{ marginBottom: "1rem" }}>Lưu ý:</h3>
        <ul style={{ paddingLeft: "1.5rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
          <li>Chúng tôi sẽ gọi điện xác nhận đơn hàng trước khi giao.</li>
          <li>Bạn chỉ cần thanh toán tiền mặt (COD) khi nhận được hàng.</li>
          <li>Vui lòng kiểm tra kỹ tình trạng sản phẩm khi nhận hàng.</li>
        </ul>
      </div>

      <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem", backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}>
        <h3 style={{ color: "var(--primary)", marginBottom: "0.75rem" }}>🔍 Theo dõi đơn hàng của bạn</h3>
        <p style={{ marginBottom: "1rem", color: "var(--text-muted)" }}>
          Nhập số điện thoại <strong>{`(số bạn vừa đặt hàng)`}</strong> vào trang tra cứu để xem tình trạng đơn hàng theo thời gian thực.
        </p>
        <Link href="/track" className="btn btn-primary" style={{ display: "inline-flex" }}>
          Tra Cứu Ngay
        </Link>
      </div>
      <Link href="/products" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
        Tiếp Tục Mua Sắm
      </Link>
    </div>
  );
}
