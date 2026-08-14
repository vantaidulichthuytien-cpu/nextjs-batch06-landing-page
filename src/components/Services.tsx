import { Users, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const services = [
  {
    name: "Xe 4 - 7 chỗ",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
    seats: "4 - 7 chỗ",
    desc: "Lý tưởng cho gia đình, cặp đôi hoặc công tác ngắn ngày.",
    price: "Từ 900.000đ/ngày",
  },
  {
    name: "Xe 16 chỗ",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    seats: "16 chỗ",
    desc: "Phù hợp nhóm bạn, gia đình đông người đi du lịch.",
    price: "Từ 1.800.000đ/ngày",
  },
  {
    name: "Xe 29 chỗ",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80",
    seats: "29 chỗ",
    desc: "Giải pháp tối ưu cho đoàn công ty, team building.",
    price: "Từ 2.800.000đ/ngày",
  },
  {
    name: "Xe 45 chỗ",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80",
    seats: "45 chỗ",
    desc: "Dành cho hội nghị, sự kiện, đoàn khách quy mô lớn.",
    price: "Từ 3.800.000đ/ngày",
  },
];

export default function Services() {
  return (
    <section id="dich-vu" className="relative bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-teal-400">
            Dịch vụ nổi bật
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Đội xe đa dạng cho mọi hành trình
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal
              key={service.name}
              delay={index * 100}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  <Users className="size-3.5" />
                  {service.seats}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white">{service.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{service.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-cyan-400">
                    {service.price}
                  </span>
                  <a
                    href="#bang-gia"
                    className="flex items-center gap-1 text-sm font-medium text-teal-300 hover:text-teal-200"
                  >
                    Xem giá
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
