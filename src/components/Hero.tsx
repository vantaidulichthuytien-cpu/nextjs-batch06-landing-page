import { ShieldCheck, Star, Clock, ArrowRight, Phone } from "lucide-react";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 size-96 rounded-full bg-teal-600/30 blur-3xl" />
        <div className="absolute top-20 -right-32 size-96 rounded-full bg-cyan-600/30 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="animate__animated animate__fadeInDown inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-300">
            <Star className="size-4 fill-teal-300 text-teal-300" />
            Được hơn 10.000 khách hàng tin chọn
          </div>

          <h1 className="animate__animated animate__fadeInUp mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Cho Thuê Xe Du Lịch{" "}
            <span className="bg-gradient-to-r from-teal-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Từ 4 Đến 45 Chỗ
            </span>
          </h1>

          <p className="animate__animated animate__fadeInUp animate__delay-1s mt-6 max-w-xl text-lg text-zinc-400">
            Đồng hành cùng mọi chuyến đi của bạn — du lịch gia đình, công tác,
            cưới hỏi hay đoàn team building. Xe đời mới, tài xế chuyên
            nghiệp, giá minh bạch.
          </p>

          <div className="animate__animated animate__fadeInUp animate__delay-1s mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#lien-he"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-transform hover:scale-105"
            >
              Nhận báo giá miễn phí
              <ArrowRight className="size-4" />
            </a>
            <a
              href="tel:0908049489"
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              <Phone className="size-4" />
              Gọi ngay: 0908 049 489
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-teal-400" />
              Bảo hiểm toàn diện
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-teal-400" />
              Hỗ trợ 24/7
            </div>
            <div className="flex items-center gap-2">
              <Star className="size-5 text-teal-400" />
              4.9/5 đánh giá
            </div>
          </div>
        </div>

        <Reveal animation="animate__fadeInRight" className="relative">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-teal-950/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80"
              alt="Xe du lịch đời mới"
              className="h-[420px] w-full rounded-2xl object-cover"
            />
          </div>

          <div className="animate__animated animate__fadeInUp animate__delay-2s absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/90 p-4 shadow-xl backdrop-blur">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500">
              <ShieldCheck className="size-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">An toàn 100%</p>
              <p className="text-xs text-zinc-400">
                Bảo hiểm đầy đủ mọi chuyến đi
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
