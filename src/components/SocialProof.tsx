import { Star, MapPin, Phone, Globe } from "lucide-react";
import Reveal from "./Reveal";
import {
  SITE_ADDRESS,
  SITE_PHONE,
  SITE_PHONE_DISPLAY,
  SITE_FACEBOOK_URL,
} from "@/lib/site";

/**
 * ĐÁNH GIÁ KHÁCH HÀNG
 *
 * Mảng này đang để trống có chủ đích.
 *
 * Bản trước dùng 3 lời chứng thực với ảnh đại diện lấy từ Unsplash — ảnh
 * người thật không liên quan tới nhà xe — kèm các con số "10.000+ khách hàng"
 * và "50.000+ chuyến đi" không kiểm chứng được (50.000 chuyến / 8 năm tương
 * đương hơn 17 chuyến mỗi ngày, không nghỉ).
 *
 * Khách thuê xe đang sợ bị lừa. Một con số bị phát hiện phóng đại sẽ xác nhận
 * đúng nỗi sợ đó. Ba đánh giá thật có tên thật thuyết phục hơn nhiều.
 *
 * CÁCH ĐIỀN: mỗi khi có khách đồng ý cho trích dẫn, thêm một object vào đây.
 * Không cần ảnh — component tự sinh chữ cái đầu của tên.
 *
 *   { name: "Chị Minh Anh", role: "Đoàn 14 người đi Đà Lạt, 8/2026",
 *     quote: "..." }
 */
const testimonials: { name: string; role: string; quote: string }[] = [];

/** Những thông tin khách tự kiểm chứng được, dùng khi chưa có đánh giá thật. */
const verifiable = [
  {
    icon: MapPin,
    label: "Địa chỉ nhà xe",
    value: SITE_ADDRESS,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      SITE_ADDRESS
    )}`,
  },
  {
    icon: Phone,
    label: "Gọi trực tiếp",
    value: SITE_PHONE_DISPLAY,
    href: `tel:${SITE_PHONE}`,
  },
  {
    icon: Globe,
    label: "Fanpage chính thức",
    value: "Công Ty Du Lịch Thủy Tiên",
    href: SITE_FACEBOOK_URL,
  },
];

export default function SocialProof() {
  return (
    <section id="danh-gia" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            {testimonials.length > 0 ? "Khách hàng nói gì" : "Kiểm chứng nhà xe"}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            {testimonials.length > 0
              ? "Khách đã đi cùng chúng tôi"
              : "Nhà xe có địa chỉ, có người thật"}
          </h2>
          <p className="mt-4 text-slate-500">
            {testimonials.length > 0
              ? "Những đoàn khách đã đồng ý cho chúng tôi chia sẻ lại trải nghiệm."
              : "Trước khi đặt cọc cho bất kỳ nhà xe nào, bạn nên kiểm tra được họ ở đâu và gọi được cho ai. Đây là thông tin của chúng tôi."}
          </p>
        </Reveal>

        {testimonials.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((t, index) => (
              <Reveal
                key={t.name}
                delay={index * 100}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex gap-1 text-blue-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-blue-500" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    {t.name.trim().slice(-1).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {verifiable.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 100}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <item.icon className="size-5" />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-slate-900">
                    {item.value}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
