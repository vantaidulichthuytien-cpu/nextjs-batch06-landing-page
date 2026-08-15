import { Star } from "lucide-react";
import Reveal from "./Reveal";

const stats = [
  { value: "10.000+", label: "Khách hàng tin dùng" },
  { value: "50.000+", label: "Chuyến đi an toàn" },
  { value: "8+", label: "Năm kinh nghiệm" },
  { value: "4.9/5", label: "Đánh giá trung bình" },
];

const testimonials = [
  {
    name: "Chị Minh Anh",
    role: "Khách du lịch gia đình",
    avatar:
      "https://images.unsplash.com/photo-1513097633097-329a3a64e0d4?w=800&q=80",
    quote:
      "Xe đời mới, tài xế thân thiện, đưa gia đình mình đi Đà Lạt rất an toàn và thoải mái. Chắc chắn sẽ quay lại.",
  },
  {
    name: "Anh Quốc Bảo",
    role: "Trưởng phòng nhân sự, công ty ABC",
    avatar:
      "https://images.unsplash.com/photo-1701980889802-55ff39e2e973?w=800&q=80",
    quote:
      "Công ty mình thuê xe 29 chỗ cho chuyến team building, giá minh bạch, hỗ trợ nhiệt tình từ lúc đặt đến khi kết thúc.",
  },
  {
    name: "Chị Thu Hà",
    role: "Tổ chức sự kiện cưới",
    avatar:
      "https://images.unsplash.com/photo-1758600587833-c07c5bda5c70?w=800&q=80",
    quote:
      "Đặt xe 16 chỗ đưa đón khách mời đám cưới rất đúng giờ, xe sạch đẹp, tài xế chuyên nghiệp.",
  },
];

export default function SocialProof() {
  return (
    <section id="danh-gia" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid grid-cols-2 gap-8 border-b border-slate-200 pb-16 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Khách hàng nói gì
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Được tin tưởng bởi hàng ngàn khách hàng
          </h2>
        </Reveal>

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
              <p className="mt-4 text-sm text-slate-600">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((t, index) => (
            <span
              key={t.name}
              className={`h-2 rounded-full transition-all ${
                index === 0 ? "w-6 bg-blue-600" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
