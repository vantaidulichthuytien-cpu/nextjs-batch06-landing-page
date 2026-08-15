import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { destinations } from "@/lib/destinations";

export default function ServiceAreas() {
  return (
    <section id="khu-vuc-phuc-vu" className="bg-slate-50 py-20 sm:py-28">
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
            href="/#lien-he"
            className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
          >
            Liên hệ đặt tuyến
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {destinations.map((d, index) => (
            <Reveal key={d.slug} delay={index * 80}>
              <Link
                href={`/dia-diem/${d.slug}`}
                className="group relative block overflow-hidden rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.heroImage.replace("w=1600", "w=600")}
                  alt={d.name}
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-sm font-semibold text-white">{d.name}</p>
                  <p className="text-xs text-slate-200">{d.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
