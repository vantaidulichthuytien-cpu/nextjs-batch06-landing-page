import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const points = [
  "Đa dạng dòng xe từ 4 đến 45 chỗ, đáp ứng mọi quy mô đoàn khách",
  "Bảng giá niêm yết rõ ràng, không phát sinh chi phí ẩn",
  "Đội ngũ tài xế chuyên nghiệp, thông thạo mọi cung đường",
  "Xe đời mới, bảo dưỡng định kỳ, đầy đủ bảo hiểm",
  "Hỗ trợ đặt xe nhanh 24/7, kể cả các chuyến gấp trong ngày",
];

export default function Solution() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-teal-950/20 to-zinc-950 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <Reveal animation="animate__fadeInLeft" className="order-2 lg:order-1">
          <span className="text-sm font-semibold uppercase tracking-wider text-teal-400">
            Giải pháp toàn diện
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Một điểm chạm, mọi nhu cầu di chuyển
          </h2>
          <p className="mt-4 text-zinc-400">
            Chúng tôi mang đến dịch vụ cho thuê xe trọn gói, giúp bạn an tâm
            tuyệt đối từ lúc đặt xe đến khi kết thúc hành trình.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-cyan-400" />
                <span className="text-zinc-300">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal animation="animate__fadeInRight" className="order-1 lg:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
            alt="Đội xe du lịch đa dạng"
            className="h-[420px] w-full rounded-3xl border border-white/10 object-cover shadow-2xl shadow-teal-950/50"
          />
        </Reveal>
      </div>
    </section>
  );
}
