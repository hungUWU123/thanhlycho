import styles from "./about.module.css";

export const metadata = {
  title: "Giới Thiệu | Vựa Đồ Thanh Lý",
  description: "Câu chuyện hành trình và giá trị cốt lõi của Vựa Đồ Thanh Lý",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Hành Trình Kiến Tạo Giá Trị</h1>
        <p className={styles.heroSub}>Vựa Đồ Thanh Lý</p>
      </section>

      {/* Welcome */}
      <section className={`card ${styles.section}`}>
        <h2>Chào mừng bạn đến với Vựa Đồ Thanh Lý!</h2>
        <p>
          Tại <strong>Vựa Đồ Thanh Lý</strong>, chúng tôi tin rằng mỗi khách hàng đều xứng đáng
          nhận được những trải nghiệm tuyệt vời nhất. Bắt đầu từ niềm đam mê với đồ dùng chất
          lượng cao, chúng tôi đã không ngừng nỗ lực để mang đến những sản phẩm thanh lý tốt
          nhất — giá thật hời, tình trạng thật chuẩn.
        </p>
        <p style={{ marginTop: "1rem" }}>
          Chúng tôi hiểu rằng việc mua đồ thanh lý cần sự tin tưởng. Vì vậy, mọi sản phẩm tại
          đây đều được kiểm tra kỹ lưỡng và mô tả trung thực về tình trạng thực tế trước khi
          đăng bán.
        </p>
      </section>

      {/* Core Values */}
      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>Giá Trị Cốt Lõi Của Chúng Tôi</h2>
        <div className={styles.valuesGrid}>
          <div className={`card ${styles.valueCard}`}>
            <div className={styles.valueIcon}>✅</div>
            <h3>Chất Lượng</h3>
            <p>
              Luôn đặt tiêu chuẩn cao nhất cho mọi sản phẩm bán ra. Mô tả trung thực, tình
              trạng rõ ràng, không bán hàng lỗi che giấu.
            </p>
          </div>
          <div className={`card ${styles.valueCard}`}>
            <div className={styles.valueIcon}>🤝</div>
            <h3>Tận Tâm</h3>
            <p>
              Lắng nghe và thấu hiểu nhu cầu của khách hàng như người thân. Hỗ trợ nhiệt tình
              từ lúc hỏi hàng đến khi nhận được đồ.
            </p>
          </div>
          <div className={`card ${styles.valueCard}`}>
            <div className={styles.valueIcon}>💡</div>
            <h3>Sáng Tạo</h3>
            <p>
              Không ngừng cập nhật hàng hóa đa dạng và cải tiến dịch vụ để bạn luôn tìm được
              món đồ ưng ý với giá tốt nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Quote */}
      <section className={styles.quoteSection}>
        <blockquote className={styles.quote}>
          "Sứ mệnh của chúng tôi không chỉ là bán hàng, mà là trở thành người đồng hành
          đáng tin cậy — giúp bạn tiết kiệm chi phí mà vẫn có những món đồ chất lượng."
        </blockquote>
        <p className={styles.quoteAuthor}>— Đội ngũ Vựa Đồ Thanh Lý</p>
      </section>
    </div>
  );
}
