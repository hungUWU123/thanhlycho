import styles from "./support.module.css";
import Link from "next/link";

export const metadata = {
  title: "Hỗ Trợ Khách Hàng | Vựa Đồ Thanh Lý",
  description: "Liên hệ hỗ trợ và câu hỏi thường gặp tại Vựa Đồ Thanh Lý",
};

const faqs = [
  {
    q: "Làm sao để theo dõi đơn hàng?",
    a: "Hiện tại, sau khi đặt hàng thành công, đội ngũ của chúng tôi sẽ chủ động gọi điện xác nhận và thông báo thời gian giao hàng cụ thể. Bạn cũng có thể liên hệ hotline để hỏi tiến độ đơn hàng nhé!",
  },
  {
    q: "Chính sách đổi trả như thế nào?",
    a: "Chúng tôi hỗ trợ đổi trả miễn phí trong vòng 7 ngày nếu sản phẩm có lỗi không đúng mô tả ban đầu. Bạn chỉ cần liên hệ hotline kèm hình ảnh thực tế là được xử lý ngay.",
  },
  {
    q: "Sản phẩm có được bảo hành không?",
    a: "Đối với các sản phẩm điện tử thanh lý còn bảo hành từ hãng, chúng tôi sẽ ghi rõ thời hạn bảo hành trong mô tả sản phẩm. Các sản phẩm khác được đảm bảo đúng mô tả tình trạng.",
  },
  {
    q: "Có thể xem hàng trực tiếp trước khi mua không?",
    a: "Hoàn toàn được! Bạn có thể liên hệ hotline để đặt lịch xem hàng trực tiếp tại kho trước khi quyết định mua nhé.",
  },
  {
    q: "Thanh toán như thế nào?",
    a: "Chúng tôi chỉ hỗ trợ thanh toán tiền mặt khi nhận hàng (COD). Bạn hoàn toàn không cần trả trước bất kỳ khoản nào.",
  },
];

export default function SupportPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Chúng Tôi Có Thể Giúp Gì Cho Bạn?</h1>
        <p>
          Đội ngũ chăm sóc khách hàng của <strong>Vựa Đồ Thanh Lý</strong> luôn sẵn sàng hỗ
          trợ bạn. Đừng ngần ngại liên hệ!
        </p>
      </section>

      {/* Contact Channels */}
      <section>
        <h2 className={styles.sectionTitle}>Các Kênh Liên Hệ Nhanh</h2>
        <div className={styles.channelsGrid}>
          <div className={`card ${styles.channelCard}`}>
            <div className={styles.channelIcon}>📞</div>
            <h3>Zalo / Điện thoại</h3>
            <p className={styles.channelMain}>0348 999 763</p>
            <p className={styles.channelSub}>8:00 – 21:00 hàng ngày</p>
          </div>
          <div className={`card ${styles.channelCard}`}>
            <div className={styles.channelIcon}>✉️</div>
            <h3>Email</h3>
            <p className={styles.channelMain}>hungcute135@gmail.com</p>
            <p className={styles.channelSub}>Phản hồi trong vòng 24h</p>
          </div>
          <div className={`card ${styles.channelCard}`}>
            <div className={styles.channelIcon}>📍</div>
            <h3>Địa chỉ kho hàng</h3>
            <p className={styles.channelMain}>140/12/12B Lưu Chí Hiếu</p>
            <p className={styles.channelSub}>Phường Rạch Dừa, TP. Hồ Chí Minh</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className={styles.sectionTitle}>Câu Hỏi Thường Gặp (FAQ)</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} className={`card ${styles.faqItem}`}>
              <h3 className={styles.faqQ}>❓ {faq.q}</h3>
              <p className={styles.faqA}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Vẫn còn thắc mắc?</h2>
        <p>Hãy liên hệ trực tiếp với chúng tôi — chúng tôi rất vui được hỗ trợ!</p>
        <Link href="/products" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Xem Sản Phẩm Ngay
        </Link>
      </section>
    </div>
  );
}
