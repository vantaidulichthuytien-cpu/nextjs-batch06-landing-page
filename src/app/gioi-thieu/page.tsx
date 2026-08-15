import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Car, HeartHandshake, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { vehicles } from "@/lib/vehicles";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const title = "Giới Thiệu - Nhà Xe Thủy Tiên";
const description =
  "Tìm hiểu về Nhà Xe Thủy Tiên - đơn vị cho thuê xe du lịch từ 4 đến 45 chỗ tại Đồng Nai, với hơn 8 năm kinh nghiệm, đội xe đời mới và đội ngũ tài xế chuyên nghiệp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gioi-thieu" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/gioi-thieu`,
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

const stats = [
  { value: "8+", label: "Năm kinh nghiệm" },
  { value: "10.000+", label: "Khách hàng tin dùng" },
  { value: "50.000+", label: "Chuyến đi an toàn" },
  { value: "4.9/5", label: "Đánh giá trung bình" },
];

const values = [
  {
    icon: BadgeCheck,
    title: "Minh bạch",
    desc: "Báo giá rõ ràng, không phụ phí ẩn trong suốt hành trình.",
  },
  {
    icon: ShieldCheck,
    title: "An toàn",
    desc: "Xe được bảo dưỡng định kỳ, tài xế giàu kinh nghiệm.",
  },
  {
    icon: HeartHandshake,
    title: "Tận tâm",
    desc: "Đội ngũ tư vấn hỗ trợ khách hàng 24/7, mọi lúc mọi nơi.",
  },
  {
    icon: Car,
    title: "Đa dạng",
    desc: "Đội xe từ 4 đến 45 chỗ, đáp ứng mọi quy mô chuyến đi.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <section className="relative pt-16">
          <div className="relative h-[42vh] min-h-[300px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/xe29cho.jpg"
              alt={SITE_NAME}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-5xl px-6 pb-10 lg:px-8">
                <span className="text-sm font-semibold text-blue-300">
                  Về chúng tôi
                </span>
                <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                  {SITE_NAME}
                </h1>
                <p className="mt-2 max-w-xl text-sm text-slate-200">
                  Đồng hành cùng mọi hành trình với đội xe đời mới và dịch vụ
                  tận tâm.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Câu chuyện của chúng tôi
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
              <p>
                {SITE_NAME} bắt đầu hành trình phục vụ khách hàng tại Đồng Nai
                với mong muốn mang đến những chuyến đi an toàn, thoải mái và
                minh bạch về giá cả. Qua nhiều năm hoạt động, chúng tôi đã
                đồng hành cùng hàng ngàn gia đình, nhóm bạn và doanh nghiệp
                trên khắp các cung đường từ ngắn ngày đến dài ngày.
              </p>
              <p>
                Với đội xe đa dạng từ 4 đến 45 chỗ, đội ngũ tài xế giàu kinh
                nghiệm và bộ phận chăm sóc khách hàng luôn sẵn sàng hỗ trợ
                24/7, chúng tôi không ngừng nỗ lực để mỗi chuyến đi cùng{" "}
                {SITE_NAME} đều để lại trải nghiệm trọn vẹn nhất.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="border-y border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Giá trị cốt lõi
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Điều làm nên {SITE_NAME}
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, index) => (
              <Reveal
                key={v.title}
                delay={index * 80}
                className="rounded-2xl border border-slate-200 p-6 text-center"
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-blue-200 text-blue-600">
                  <v.icon className="size-5" />
                </span>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {v.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal className="mx-auto max-w-xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Đội xe
              </span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                Đa dạng loại xe cho mọi hành trình
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {vehicles.map((v, index) => (
                <Reveal key={v.slug} delay={index * 80}>
                  <Link
                    href={`/xe/${v.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <div className="relative h-40 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.image}
                        alt={v.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-slate-900">{v.name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {v.tagline}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  );
}
