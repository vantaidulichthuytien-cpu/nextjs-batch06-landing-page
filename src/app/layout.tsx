import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_PHONE,
  SITE_EMAIL,
  SITE_FACEBOOK_URL,
} from "@/lib/site";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const title = "Nhà Xe Thủy Tiên - Cho Thuê Xe Du Lịch Từ 4 Đến 47 Chỗ";
const description =
  "Nhà Xe Thủy Tiên - Cho thuê xe du lịch 4 đến 47 chỗ kèm tài xế tại Đồng Nai. Gửi lộ trình, nhận báo giá trọn gói trong 5 phút, chốt giá vào hợp đồng. Hỗ trợ 24/7.";

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
    "thuê xe 47 chỗ",
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
  // AutoRental sát nghĩa hơn LocalBusiness chung chung cho dịch vụ thuê xe.
  "@type": ["LocalBusiness", "AutoRental"],
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description,
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: `+84${SITE_PHONE.slice(1)}`,
  email: SITE_EMAIL,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1023/34 Khu Phố 13, Phường Tam Hiệp",
    addressLocality: "TP. Đồng Nai",
    addressRegion: "Đồng Nai",
    addressCountry: "VN",
  },
  // Khai cụ thể thay vì "VN": khai toàn quốc làm loãng tín hiệu SEO địa phương.
  areaServed: [
    { "@type": "City", name: "Biên Hòa" },
    { "@type": "AdministrativeArea", name: "Đồng Nai" },
    { "@type": "City", name: "TP. Hồ Chí Minh" },
    { "@type": "City", name: "Vũng Tàu" },
    { "@type": "City", name: "Đà Lạt" },
    { "@type": "City", name: "Phan Thiết" },
    { "@type": "City", name: "Nha Trang" },
  ],
  // Trang tuyên bố hỗ trợ 24/7 — khai đúng như vậy để Google biết.
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: [SITE_FACEBOOK_URL],
  serviceType: "Cho thuê xe du lịch kèm tài xế",
  // TODO: bổ sung "geo" (vĩ độ/kinh độ) sau khi tạo Google Business Profile,
  // và "aggregateRating" khi đã có review thật trên Google Maps.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} h-full antialiased`}
    >
      <head>
        {/*
          Đã bỏ animate.css tải từ cdnjs: nó là stylesheet chặn render trong
          <head>, trang phải chờ tải xong từ máy chủ bên ngoài mới vẽ được.
          Các hiệu ứng tương đương giờ nằm trong globals.css.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white font-sans">
        {children}
        {/*
          Đo lường. Cả hai đều tự tắt nếu chưa cấu hình ID trong .env.local,
          nên để đây an toàn kể cả trước khi anh dán mã vào.
        */}
        <MetaPixel />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
