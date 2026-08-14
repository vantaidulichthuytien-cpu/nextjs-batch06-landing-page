import { ShieldCheck, Clock, Ban } from "lucide-react";
import BookingForm from "./BookingForm";

const badges = [
  {
    icon: Ban,
    title: "Không phụ phí ẩn",
    desc: "Giá minh bạch từ đầu",
  },
  {
    icon: ShieldCheck,
    title: "Bảo hiểm toàn diện",
    desc: "An tâm mọi chuyến đi",
  },
  {
    icon: Clock,
    title: "Hỗ trợ 24/7",
    desc: "Luôn sẵn sàng phục vụ",
  },
];

export default function Hero() {
  return (
    <section id="hero" className="relative bg-slate-900 pt-16">
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/xe16cho.jpg"
          alt="Xe du lịch Nhà Xe Thủy Tiên"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-16 sm:pt-20 lg:px-8">
        <div className="max-w-xl">
          <h1 className="animate__animated animate__fadeInUp text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Đồng Hành Cùng{" "}
            <span className="text-amber-400">Chuyến Đi Của Bạn</span>
          </h1>
          <p className="animate__animated animate__fadeInUp animate__delay-1s mt-5 text-lg text-slate-200">
            Cho thuê xe du lịch từ 4 đến 45 chỗ. Xe đời mới, tài xế chuyên
            nghiệp, giá minh bạch — sẵn sàng phục vụ mọi hành trình.
          </p>

          <div className="animate__animated animate__fadeInUp animate__delay-1s mt-8 flex flex-wrap gap-x-8 gap-y-5">
            {badges.map((badge) => (
              <div key={badge.title} className="flex items-start gap-2.5">
                <badge.icon className="mt-0.5 size-5 shrink-0 text-amber-400" />
                <div>
                  <p className="text-sm font-semibold text-white">{badge.title}</p>
                  <p className="text-xs text-slate-300">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mb-16 max-w-5xl px-6 sm:-mb-20 lg:px-8">
        <BookingForm />
      </div>
    </section>
  );
}
