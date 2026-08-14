import { Check } from "lucide-react";
import Reveal from "./Reveal";

const plans = [
  {
    name: "Xe 4 - 7 chỗ",
    price: "900.000đ",
    unit: "/ngày",
    description: "Phù hợp gia đình, cặp đôi, công tác ngắn ngày",
    features: [
      "Xe đời mới dưới 3 năm",
      "Bảo hiểm hành khách",
      "Tài xế thông thạo địa hình",
      "Hỗ trợ đổi lịch linh hoạt",
    ],
    highlight: false,
  },
  {
    name: "Xe 16 - 29 chỗ",
    price: "1.800.000đ",
    unit: "/ngày",
    description: "Lựa chọn phổ biến nhất cho nhóm và công ty",
    features: [
      "Xe đời mới, ghế êm ái",
      "Bảo hiểm toàn diện",
      "Tài xế chuyên nghiệp trên 5 năm",
      "Hỗ trợ 24/7",
      "Miễn phí chờ 2 giờ",
    ],
    highlight: true,
  },
  {
    name: "Xe 35 - 45 chỗ",
    price: "3.200.000đ",
    unit: "/ngày",
    description: "Dành cho hội nghị, sự kiện, đoàn khách lớn",
    features: [
      "Xe cao cấp, điều hòa 2 chiều",
      "Bảo hiểm toàn diện",
      "Tài xế + phụ xe hỗ trợ",
      "Ưu tiên đặt xe theo mùa cao điểm",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="bang-gia" className="relative bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-teal-400">
            Bảng giá
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Giá thuê minh bạch, không phát sinh
          </h2>
          <p className="mt-4 text-zinc-400">
            Giá tham khảo, tùy chỉnh theo lộ trình và thời gian thuê thực tế.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal
              key={plan.name}
              delay={index * 100}
              className={`relative rounded-3xl border p-8 ${
                plan.highlight
                  ? "border-teal-400/40 bg-gradient-to-b from-teal-500/10 to-cyan-500/5 shadow-2xl shadow-teal-950/50"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-1 text-xs font-semibold text-white">
                  Phổ biến nhất
                </span>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-zinc-400">{plan.unit}</span>
              </p>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#lien-he"
                className={`mt-8 block rounded-full px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30"
                    : "border border-white/15 text-white hover:bg-white/5"
                }`}
              >
                Nhận báo giá
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
