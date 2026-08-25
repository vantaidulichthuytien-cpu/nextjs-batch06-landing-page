import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const points = [
  "Đội xe từ 4 đến 47 chỗ — đoàn to hay nhỏ cũng chỉ cần một đầu mối",
  "Báo giá trọn gói trong 5 phút, chốt xong ghi thẳng vào hợp đồng",
  "Tài xế chuyên nghiệp, thông thạo các cung đường liên tỉnh và đèo dốc",
  "Xe đời mới, bảo dưỡng định kỳ, bảo hiểm hành khách đầy đủ",
  "Nhận cả chuyến gấp trong ngày, trực máy 24/7",
];

export default function Solution() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <Reveal animation="left" className="order-2 lg:order-1">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Vì sao chọn Thủy Tiên
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Một điểm chạm, mọi nhu cầu di chuyển
          </h2>
          <p className="mt-4 text-slate-500">
            Dịch vụ cho thuê xe trọn gói kèm tài xế, từ lúc bạn gửi lộ trình đến
            khi đoàn về tới nhà.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-blue-500" />
                <span className="text-slate-700">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal animation="right" className="order-1 lg:order-2">
          <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/10">
            <Image
              src="/xe47cho.jpg"
              alt="Đội xe du lịch đa dạng"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
