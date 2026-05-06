import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import HeaderNav from "@/components/HeaderNav";
import WelcomePopup from "@/components/WelcomePopup";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vựa Đồ Thanh Lý",
  description: "Mua bán đồ thanh lý chất lượng, giá rẻ",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>
          <div className="app-container">
            <header className="header">
              <div className="header-content">
                <Link href="/" className="logo">Vựa Đồ Thanh Lý</Link>
                <HeaderNav categories={categories} />
              </div>
            </header>
            <main className="content">{children}</main>
            <footer className="footer">
              <div className="footer-links">
                <Link href="/about">Giới thiệu</Link>
                <Link href="/support">Hỗ trợ khách hàng</Link>
                <Link href="/products">Sản phẩm</Link>
                <Link href="/track">Tra cứu đơn</Link>
              </div>
              <p>&copy; {new Date().getFullYear()} Vựa Đồ Thanh Lý. Đơn giản & Tiện lợi.</p>
            </footer>
          </div>
          <WelcomePopup />
        </CartProvider>
      </body>
    </html>
  );
}
