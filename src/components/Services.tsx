import { Users, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const services = [
  {
    name: "Xe 4 - 7 chỗ",
    image: "/xe4cho.jpg",
    seats: "4 - 7 chỗ",
    desc: "Lý tưởng cho gia đình, cặp đôi hoặc công tác ngắn ngày.",
    price: "Từ 900.000đ/ngày",
  },
  {
    name: "Xe 16 chỗ",
    image: "/xe16cho.jpg",
    seats: "16 chỗ",
    desc: "Phù hợp nhóm bạn, gia đình đông người đi du lịch.",
    price: "Từ 1.800.000đ/ngày",
  },
  {
    name: "Xe 29 chỗ",
    image: "/xe29cho.jpg",
    seats: "29 chỗ",
    desc: "Giải pháp tối ưu cho đoàn công ty, team building.",
    price: "Từ 2.800.000đ/ngày",
  },
  {
    name: "Xe 45 chỗ",
    image: "/xe45cho.jpg",
    seats: "45 chỗ",
    desc: "Dành cho hội nghị, sự kiện, đoàn khách quy mô lớn.",
    price: "Từ 3.800.000đ/ngày",
  },
];

export default function Services() {
  return (
    <section id="dich-vu" className="relative bg-white pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              Chọn loại xe phù hợp
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Đội xe đa dạng cho mọi hành trình
            </h2>
          </Reveal>
          <a
            href="#bang-gia"
            className="hidden items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 sm:flex"
          >
            Xem bảng giá
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal
              key={service.name}
              delay={index * 100}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  <Users className="size-3.5" />
                  {service.seats}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{service.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-amber-600">
                    {service.price}
                  </span>
                  <a
                    href="#bang-gia"
                    className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-amber-600"
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
