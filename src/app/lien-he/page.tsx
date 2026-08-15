import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";
import {
  SITE_URL,
  SITE_NAME,
  SITE_PHONE,
  SITE_PHONE_DISPLAY,
  SITE_EMAIL,
  SITE_ADDRESS,
} from "@/lib/site";

const title = "Liên Hệ - Nhà Xe Thủy Tiên";
const description =
  "Liên hệ Nhà Xe Thủy Tiên để nhận báo giá thuê xe du lịch từ 4 đến 45 chỗ trong 5 phút. Gọi hotline, chat Zalo hoặc gửi yêu cầu đặt xe ngay.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/lien-he" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/lien-he`,
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
};

const contactInfo = [
  {
    icon: Phone,
    title: "Hotline 24/7",
    value: SITE_PHONE_DISPLAY,
    href: `tel:${SITE_PHONE}`,
  },
  {
    icon: Mail,
    title: "Email",
    value: SITE_EMAIL,
    href: `mailto:${SITE_EMAIL}`,
  },
  {
    icon: MapPin,
    title: "Địa chỉ",
    value: SITE_ADDRESS,
    href: `https://maps.google.com/?q=${encodeURIComponent(SITE_ADDRESS)}`,
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    value: "7:00 - 22:00 tất cả các ngày trong tuần",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <section className="pt-28 pb-4 sm:pt-36">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Liên hệ
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Gửi yêu cầu đặt xe hoặc liên hệ trực tiếp, đội ngũ {SITE_NAME}{" "}
              sẽ phản hồi và báo giá miễn phí trong vòng 5 phút.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-5 lg:px-8">
            <Reveal className="lg:col-span-3">
              <BookingForm />
            </Reveal>

            <Reveal delay={100} className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactInfo.map((info) => {
                  const content = (
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <info.icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          {info.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  );

                  return info.href ? (
                    <a
                      key={info.title}
                      href={info.href}
                      target={info.title === "Địa chỉ" ? "_blank" : undefined}
                      rel={
                        info.title === "Địa chỉ"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block transition-colors hover:border-blue-300"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={info.title}>{content}</div>
                  );
                })}

                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform hover:scale-[1.02] hover:bg-blue-500"
                >
                  <MessageCircle className="size-4" />
                  Chat Zalo tư vấn ngay
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <h2 className="text-xl font-bold text-slate-900">
                Bản đồ chỉ đường
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <iframe
                  title="Bản đồ Nhà Xe Thủy Tiên"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    SITE_ADDRESS
                  )}&output=embed`}
                  className="h-80 w-full sm:h-96"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  );
}
