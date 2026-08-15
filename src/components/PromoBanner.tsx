import { Check } from "lucide-react";
import Reveal from "./Reveal";

const deals = [
  {
    name: "Xe 4 - 7 chỗ",
    price: "900.000đ",
    features: ["Tài xế chuyên nghiệp", "Bảo hiểm đầy đủ", "Không phụ phí ẩn"],
  },
  {
    name: "Xe 16 - 29 chỗ",
    price: "1.800.000đ",
    features: ["Tài xế chuyên nghiệp", "Bảo hiểm đầy đủ", "Không phụ phí ẩn"],
  },
  {
    name: "Xe 35 - 45 chỗ",
    price: "3.200.000đ",
    features: ["Tài xế chuyên nghiệp", "Bảo hiểm đầy đủ", "Không phụ phí ẩn"],
  },
];

export default function PromoBanner() {
  return (
    <section className="bg-blue-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
          <Reveal animation="animate__fadeInLeft">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Ưu đãi trực tuyến
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Đi Nhiều Hơn.
              <br />
              Giá Tốt Hơn.
            </h2>
            <p className="mt-4 text-slate-600">
              Đặt xe trực tiếp với chúng tôi để nhận mức giá tốt nhất, minh
              bạch, không qua trung gian.
            </p>
            <a
              href="/#bang-gia"
              className="mt-6 inline-flex w-fit items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-blue-500"
            >
              Xem ưu đãi
            </a>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {deals.map((deal, index) => (
              <Reveal
                key={deal.name}
                delay={index * 100}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {deal.name}
                </span>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">
                  {deal.price}
                  <span className="text-sm font-medium text-slate-500">/ngày</span>
                </p>
                <ul className="mt-3 space-y-1.5">
                  {deal.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-1.5 text-xs text-slate-600"
                    >
                      <Check className="size-3.5 shrink-0 text-blue-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
