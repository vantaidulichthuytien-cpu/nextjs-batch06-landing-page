import { BadgeCheck, Car, Clock3, Headset } from "lucide-react";
import Reveal from "./Reveal";

const points = [
  {
    icon: BadgeCheck,
    title: "Giá tốt nhất",
    desc: "Cạnh tranh, không phụ phí ẩn",
  },
  {
    icon: Car,
    title: "Đội xe cao cấp",
    desc: "Xe mới, sạch, bảo dưỡng định kỳ",
  },
  {
    icon: Clock3,
    title: "Tiết kiệm thời gian",
    desc: "Đón nhanh, đặt xe dễ dàng",
  },
  {
    icon: Headset,
    title: "Hỗ trợ 24/7",
    desc: "Luôn sẵn sàng bất cứ khi nào",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-b border-slate-100 bg-white pb-16 pt-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Vì sao chọn Thủy Tiên
          </span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Hơn cả một chuyến xe
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 divide-slate-200 sm:grid-cols-4 sm:divide-x">
          {points.map((point, index) => (
            <Reveal
              key={point.title}
              delay={index * 80}
              className="flex flex-col items-center gap-2 px-4 py-4 text-center"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-blue-200 text-blue-600">
                <point.icon className="size-5" />
              </span>
              <p className="text-sm font-semibold text-slate-900">{point.title}</p>
              <p className="text-xs text-slate-500">{point.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
