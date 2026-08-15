import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { vehicles } from "@/lib/vehicles";

export default function Services() {
  return (
    <section id="dich-vu" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Chọn loại xe phù hợp
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Đội xe đa dạng cho mọi hành trình
            </h2>
          </Reveal>
          <a
            href="/#bang-gia"
            className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
          >
            Xem bảng giá
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle, index) => (
            <Reveal
              key={vehicle.slug}
              delay={index * 100}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <Link href={`/xe/${vehicle.slug}`}>
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    <Users className="size-3.5" />
                    {vehicle.seats}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900">{vehicle.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{vehicle.tagline}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">
                      Từ {vehicle.price}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-slate-700 group-hover:text-blue-600">
                      Xem chi tiết
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
