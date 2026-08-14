import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Thủy Tiên - Cho Thuê Xe Du Lịch Từ 4 Đến 45 Chỗ",
  description:
    "Thủy Tiên - Dịch vụ cho thuê xe du lịch từ 4 đến 45 chỗ, giá minh bạch, tài xế chuyên nghiệp, hỗ trợ 24/7 trên toàn quốc.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 font-sans">
        {children}
      </body>
    </html>
  );
}
