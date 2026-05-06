"use client";

import { useState, useEffect } from "react";
import styles from "./WelcomePopup.module.css";
import Link from "next/link";

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    const shown = sessionStorage.getItem("welcomePopupShown");
    if (!shown) {
      const timer = setTimeout(() => {
        setVisible(true);
        sessionStorage.setItem("welcomePopupShown", "true");
      }, 1000); // slight delay for better UX
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={() => setVisible(false)}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={() => setVisible(false)} aria-label="Đóng">
          ✕
        </button>
        <div className={styles.icon}>🎉</div>
        <h2 className={styles.title}>Chào mừng bạn đến với</h2>
        <p className={styles.brand}>Vựa Đồ Thanh Lý</p>
        <p className={styles.message}>
          Chúc bạn có một trải nghiệm mua sắm thú vị! Nếu cần bất kỳ sự trợ giúp nào, chúng
          tôi luôn ở đây để lắng nghe.
        </p>
        <div className={styles.actions}>
          <Link href="/products" className="btn btn-primary" onClick={() => setVisible(false)}>
            Khám Phá Ngay
          </Link>
          <Link href="/support" className="btn btn-outline" onClick={() => setVisible(false)}>
            Liên hệ hỗ trợ
          </Link>
        </div>
      </div>
    </div>
  );
}
