import { AlertTriangle, Clock4, Wallet, Frown } from "lucide-react";
import Reveal from "./Reveal";

const problems = [
  {
    icon: Wallet,
    title: "Giá cả không minh bạch",
    description:
      "Báo giá một đằng, thanh toán một nẻo, phát sinh phụ phí không rõ ràng.",
  },
  {
    icon: AlertTriangle,
    title: "Xe không đảm bảo",
    description:
      "Xe cũ, xuống cấp, tài xế thiếu kinh nghiệm khiến chuyến đi bất an.",
  },
  {
    icon: Clock4,
    title: "Đặt xe gấp không kịp",
    description:
      "Cần xe trong ngày nhưng các nhà xe báo hết xe hoặc không phản hồi kịp.",
  },
  {
    icon: Frown,
    title: "Khó chọn loại xe phù hợp",
    description:
      "Không biết nên thuê xe bao nhiêu chỗ cho vừa số lượng khách và hành lý.",
  },
];

export default function ProblemStatement() {
  return (
    <section className="relative bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Vấn đề thường gặp
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Thuê xe du lịch chưa bao giờ dễ dàng?
          </h2>
          <p className="mt-4 text-slate-500">
            Rất nhiều khách hàng gặp phải những rắc rối này trước khi tìm đến
            chúng tôi.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 100}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50">
                <item.icon className="size-6 text-blue-600" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
