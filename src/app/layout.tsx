import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_PHONE,
  SITE_ADDRESS,
} from "@/lib/site";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const title = "Nhà Xe Thủy Tiên - Cho Thuê Xe Du Lịch Từ 4 Đến 45 Chỗ";
const description =
  "Nhà Xe Thủy Tiên - Dịch vụ cho thuê xe du lịch từ 4 đến 45 chỗ tại Đồng Nai và toàn quốc. Giá minh bạch, tài xế chuyên nghiệp, hỗ trợ đặt xe 24/7.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  keywords: [
    "cho thuê xe du lịch",
    "thuê xe 4 chỗ",
    "thuê xe 7 chỗ",
    "thuê xe 16 chỗ",
    "thuê xe 29 chỗ",
    "thuê xe 45 chỗ",
    "cho thuê xe Đồng Nai",
    "nhà xe Thủy Tiên",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title,
    description,
    images: [{ url: "/logo.png", alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: `+84${SITE_PHONE.slice(1)}`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_ADDRESS,
    addressRegion: "Đồng Nai",
    addressCountry: "VN",
  },
  areaServed: "VN",
  serviceType: "Cho thuê xe du lịch",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white font-sans">
        {children}
      </body>
    </html>
  );
}
