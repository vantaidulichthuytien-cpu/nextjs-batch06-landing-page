import { Phone, Car, FileCheck, Navigation, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    icon: Phone,
    title: "Liên hệ tư vấn",
    desc: "Gọi điện hoặc nhắn Zalo cho chúng tôi",
  },
  {
    icon: Car,
    title: "Chọn xe & báo giá",
    desc: "Chọn loại xe phù hợp, nhận báo giá minh bạch",
  },
  {
    icon: FileCheck,
    title: "Ký hợp đồng",
    desc: "Xác nhận lịch trình và ký hợp đồng thuê xe",
  },
  {
    icon: Navigation,
    title: "Khởi hành",
    desc: "Xe đón đúng giờ, tài xế đồng hành suốt chuyến đi",
  },
  {
    icon: CheckCircle2,
    title: "Hoàn tất chuyến đi",
    desc: "Kết thúc hành trình an toàn, trả xe đúng hẹn",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-600">
            Quy trình đơn giản
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Thuê xe chỉ trong 5 bước
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-5">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 100}
              className="relative flex flex-col items-center text-center"
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <step.icon className="size-7" />
              </div>
              <p className="mt-4 text-xs font-semibold text-amber-600">
                Bước {index + 1}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
