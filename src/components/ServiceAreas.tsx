import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const areas = [
  {
    name: "Đà Lạt",
    sub: "Thành phố ngàn hoa",
    image: "https://images.unsplash.com/photo-1764624748576-d8b2c08b9eec?w=600&q=80",
  },
  {
    name: "TP. Hồ Chí Minh",
    sub: "Trung tâm kinh tế",
    image: "https://images.unsplash.com/photo-1774516793393-efedbb98efc8?w=600&q=80",
  },
  {
    name: "Nha Trang",
    sub: "Thành phố biển",
    image: "https://images.unsplash.com/photo-1570366290364-5e76a15ae408?w=600&q=80",
  },
  {
    name: "Mũi Né - Phan Thiết",
    sub: "Đồi cát bay",
    image: "https://images.unsplash.com/photo-1777500822241-9d90e64e77f3?w=600&q=80",
  },
  {
    name: "Vũng Tàu",
    sub: "Biển gần Sài Gòn",
    image: "https://images.unsplash.com/photo-1695615090894-b7f6ee2b13b5?w=600&q=80",
  },
];

export default function ServiceAreas() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Khu vực phục vụ
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Đưa bạn đến mọi điểm đến
            </h2>
          </Reveal>
          <a
            href="#lien-he"
            className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
          >
            Liên hệ đặt tuyến
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {areas.map((area, index) => (
            <Reveal
              key={area.name}
              delay={index * 80}
              className="group relative overflow-hidden rounded-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={area.image}
                alt={area.name}
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-sm font-semibold text-white">{area.name}</p>
                <p className="text-xs text-slate-200">{area.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
