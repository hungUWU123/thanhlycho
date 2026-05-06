"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import styles from "./HeaderNav.module.css";

type Category = { id: string; name: string };

export default function HeaderNav({ categories }: { categories: Category[] }) {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.nav}>

      {/* Trang chủ */}
      <Link href="/" className={styles.navLink}>Trang chủ</Link>

      {/* Sản phẩm ▾ Dropdown */}
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>
          Sản phẩm <span className={styles.arrow}>▾</span>
        </button>
        <div className={styles.dropdownMenu}>
          <Link href="/products" className={styles.dropItem}>
            📦 Tất cả sản phẩm
          </Link>
          {categories.length > 0 && <div className={styles.divider} />}
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.id}`} className={styles.dropItem}>
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Hỗ trợ ▾ Dropdown */}
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>
          Hỗ trợ <span className={styles.arrow}>▾</span>
        </button>
        <div className={styles.dropdownMenu}>
          <Link href="/about" className={styles.dropItem}>🏪 Giới thiệu</Link>
          <Link href="/support" className={styles.dropItem}>💬 Liên hệ & FAQ</Link>
          <Link href="/track" className={styles.dropItem}>🔍 Tra cứu đơn hàng</Link>
        </div>
      </div>

      {/* Giỏ hàng */}
      <Link href="/cart" className={`${styles.navLink} ${styles.cartLink}`}>
        🛒 Giỏ hàng
        {mounted && itemCount > 0 && (
          <span className={styles.badge}>{itemCount}</span>
        )}
      </Link>
    </nav>
  );
}
