import type { Metadata } from "next";
import { ShieldCheck, Clapperboard, Share2, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import SafetyClip from "@/components/SafetyClip";
import { buildSafetyScenes } from "@/components/SafetyClipScenes";
import { SITE_URL, SITE_NAME, SITE_PHONE_DISPLAY } from "@/lib/site";

const title = "Clip Hướng Dẫn An Toàn Khi Ngồi Trên Xe Khách";
const description =
  "Clip hoạt hình ngắn của Nhà Xe Thủy Tiên: 8 hướng dẫn an toàn khi ngồi trên xe khách - thắt dây an toàn, ngồi yên khi xe chạy, sắp xếp hành lý, trẻ em, thiết bị thoát hiểm và cách xuống xe an toàn.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/an-toan" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/an-toan`,
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

/* Cùng một kịch bản dùng cho clip và cho phần chữ bên dưới, khỏi lệch nội dung. */
const rules = buildSafetyScenes(SITE_PHONE_DISPLAY).filter((s) => s.step);

/*
  Khai báo HowTo cho phần hướng dẫn dạng chữ. Không khai VideoObject vì clip
  này là hoạt hình SVG chạy trong trình duyệt, không phải file video.
*/
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Hướng dẫn an toàn khi ngồi trên xe khách",
  description,
  totalTime: "PT1M",
  step: rules.map((rule, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: rule.title,
    text: rule.caption,
    url: `${SITE_URL}/an-toan#${rule.id}`,
  })),
};

const highlights = [
  {
    icon: Clapperboard,
    title: "Xem hết trong 1 phút",
    desc: "Tám điều cốt lõi, mỗi điều một cảnh, không cần đọc dài dòng.",
  },
  {
    icon: Users,
    title: "Hợp cho cả đoàn",
    desc: "Mở cho học sinh, công nhân hay đoàn du lịch xem trước giờ khởi hành.",
  },
  {
    icon: Share2,
    title: "Chia sẻ được ngay",
    desc: "Gửi đường dẫn trang này vào nhóm Zalo của đoàn là mọi người xem được.",
  },
];

export default function SafetyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Phần đầu trang + clip */}
        <section className="relative overflow-hidden bg-slate-50 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <Reveal className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-1.5 text-sm font-semibold text-blue-700">
                <ShieldCheck className="size-4" />
                An toàn hành trình
              </span>
              <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-5xl">
                Hướng dẫn an toàn khi ngồi trên xe khách
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                Clip hoạt hình ngắn của {SITE_NAME}, tóm gọn 8 điều quý khách
                nên nhớ từ lúc lên xe đến khi xuống xe. Clip tự chạy, quý khách
                có thể tạm dừng hoặc bấm vào từng vạch phía trên để xem lại một
                cảnh bất kỳ.
              </p>
            </Reveal>

            <Reveal className="mt-10" delay={120}>
              <SafetyClip />
            </Reveal>
          </div>
        </section>

        {/* Vì sao nên mở clip cho cả đoàn xem */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-3">
              {highlights.map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                    <item.icon className="size-7 text-blue-600" />
                    <h2 className="mt-4 font-bold text-slate-900">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Bản chữ đầy đủ: để đọc nhanh, để in dán trên xe và để Google hiểu trang */}
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Nội dung clip bằng chữ
              </h2>
              <p className="mt-3 text-slate-600">
                Quý khách có thể in phần này dán trên xe hoặc gửi cho trưởng
                đoàn phổ biến trước giờ xuất phát.
              </p>
            </Reveal>

            <ol className="mt-10 space-y-4">
              {rules.map((rule, i) => (
                <Reveal key={rule.id} delay={i * 60}>
                  <li
                    id={rule.id}
                    className="flex scroll-mt-24 gap-4 rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                      {rule.step}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900">{rule.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {rule.caption}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-8">
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
                <h3 className="font-bold text-slate-900">
                  Phía nhà xe làm gì?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Xe của {SITE_NAME} được bảo dưỡng định kỳ, kiểm tra dây an
                  toàn, bình cứu hoả và búa phá kính trước mỗi chuyến. Tài xế
                  phổ biến nhanh các nội dung trên khi đoàn vừa lên xe. Quý
                  khách cần hỗ trợ, gọi {SITE_PHONE_DISPLAY} bất kể giờ nào.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  );
}
