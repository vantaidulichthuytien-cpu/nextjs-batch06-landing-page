import { Check, X, Route, FileText, Clock4 } from "lucide-react";
import Reveal from "./Reveal";

/** Những gì đã nằm trong con số nhà xe báo. */
const included = [
  "Xăng dầu toàn hành trình",
  "Phí cầu đường, bến bãi",
  "Lương và chi phí ăn nghỉ của tài xế",
  "Bảo hiểm hành khách theo quy định",
];

/** Những gì khách tự lo — nói trước để không ai bất ngờ ở cuối chuyến. */
const excluded = [
  "Vé tham quan, ăn uống của đoàn",
  "Phí phát sinh do đổi lộ trình giữa chuyến",
];

const steps = [
  {
    icon: Route,
    title: "Bạn gửi lộ trình",
    desc: "Điểm đón, điểm đến, ngày đi, số khách. Mất khoảng một phút.",
  },
  {
    icon: Clock4,
    title: "Nhà xe báo giá trong 5 phút",
    desc: "Một con số trọn gói cho đúng chuyến của bạn, không phải giá chung chung.",
  },
  {
    icon: FileText,
    title: "Chốt giá vào hợp đồng",
    desc: "Con số đã báo được ghi vào hợp đồng. Cuối chuyến trả đúng số đó.",
  },
];

export default function Pricing() {
  return (
    <section id="bao-gia" className="relative bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Báo giá
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Mỗi chuyến một giá, và giá đó không đổi
          </h2>
          <p className="mt-4 text-slate-500">
            Thuê xe đi Vũng Tàu một ngày và đi Nha Trang bốn ngày không thể cùng
            một mức giá. Nên thay vì treo một con số chung chung rồi tính thêm
            sau, nhà xe báo giá riêng cho đúng lộ trình của bạn — và giữ nguyên
            con số đó tới cuối chuyến.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 100}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <step.icon className="size-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Bước {index + 1}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{step.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={150}
          className="mt-8 grid grid-cols-1 gap-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 lg:grid-cols-2"
        >
          <div>
            <h3 className="font-semibold text-slate-900">
              Giá nhà xe báo đã bao gồm
            </h3>
            <ul className="mt-4 space-y-3">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-600"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Chưa bao gồm</h3>
            <ul className="mt-4 space-y-3">
              {excluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-600"
                >
                  <X className="mt-0.5 size-4 shrink-0 text-slate-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-blue-50 px-4 py-3 text-sm text-slate-700">
              Ngoài hai khoản trên, không có chi phí nào khác phát sinh sau khi
              đã chốt hợp đồng.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-10 text-center">
          <a
            href="/#hero"
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-400"
          >
            Gửi lộ trình để nhận báo giá
          </a>
        </Reveal>
      </div>
    </section>
  );
}
