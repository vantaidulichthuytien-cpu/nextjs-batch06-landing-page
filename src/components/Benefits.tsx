import {
  Wallet,
  ShieldCheck,
  Clock3,
  Users,
  MapPinned,
  Headset,
} from "lucide-react";
import Reveal from "./Reveal";

const benefits = [
  {
    icon: Wallet,
    title: "Tiết kiệm chi phí",
    description: "Giá cạnh tranh, nhiều ưu đãi cho thuê dài hạn và theo tháng.",
  },
  {
    icon: ShieldCheck,
    title: "An toàn tuyệt đối",
    description: "Xe kiểm định định kỳ, bảo hiểm đầy đủ cho hành khách.",
  },
  {
    icon: Clock3,
    title: "Đúng giờ, đúng hẹn",
    description: "Cam kết đón trả khách đúng lịch trình đã thỏa thuận.",
  },
  {
    icon: Users,
    title: "Phù hợp mọi đoàn khách",
    description:
      "Từ nhóm gia đình nhỏ đến đoàn công ty, hội nghị hàng trăm người.",
  },
  {
    icon: MapPinned,
    title: "Phủ sóng toàn quốc",
    description: "Phục vụ mọi tuyến đường, từ nội thành đến liên tỉnh.",
  },
  {
    icon: Headset,
    title: "Hỗ trợ 24/7",
    description: "Tổng đài luôn sẵn sàng tư vấn và xử lý sự cố kịp thời.",
  },
];

export default function Benefits() {
  return (
    <section id="loi-ich" className="relative bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Lợi ích vượt trội
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Vì sao nên chọn chúng tôi?
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 80}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 transition-colors hover:border-teal-400/30"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 transition-transform group-hover:scale-110">
                <item.icon className="size-6 text-white" />
              </div>
              <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
