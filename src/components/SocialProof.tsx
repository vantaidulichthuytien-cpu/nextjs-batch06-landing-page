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
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    quote:
      "Xe đời mới, tài xế thân thiện, đưa gia đình mình đi Đà Lạt rất an toàn và thoải mái. Chắc chắn sẽ quay lại.",
  },
  {
    name: "Anh Quốc Bảo",
    role: "Trưởng phòng nhân sự, công ty ABC",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    quote:
      "Công ty mình thuê xe 29 chỗ cho chuyến team building, giá minh bạch, hỗ trợ nhiệt tình từ lúc đặt đến khi kết thúc.",
  },
  {
    name: "Chị Thu Hà",
    role: "Tổ chức sự kiện cưới",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    quote:
      "Đặt xe 16 chỗ đưa đón khách mời đám cưới rất đúng giờ, xe sạch đẹp, tài xế chuyên nghiệp.",
  },
];

export default function SocialProof() {
  return (
    <section
      id="danh-gia"
      className="relative bg-gradient-to-b from-zinc-950 via-cyan-950/10 to-zinc-950 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="grid grid-cols-2 gap-8 border-b border-white/10 pb-16 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Khách hàng nói gì
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Được tin tưởng bởi hàng ngàn khách hàng
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <Reveal
              key={t.name}
              delay={index * 100}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex gap-1 text-cyan-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-cyan-400" />
                ))}
              </div>
              <p className="mt-4 text-sm text-zinc-300">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-zinc-400">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
