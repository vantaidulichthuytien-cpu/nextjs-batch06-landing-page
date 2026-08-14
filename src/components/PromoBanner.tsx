import Reveal from "./Reveal";

export default function PromoBanner() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 lg:grid-cols-2 lg:px-8">
        <Reveal
          animation="animate__fadeInLeft"
          className="relative overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/xe4cho.jpg"
            alt="Ưu đãi cuối tuần"
            className="h-64 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 p-8">
            <span className="text-sm font-semibold text-amber-400">Ưu đãi cuối tuần</span>
            <p className="text-2xl font-extrabold text-white sm:text-3xl">
              Giảm <span className="text-amber-400">10%</span> khi đặt xe Thứ 7 &amp; Chủ nhật
            </p>
            <a
              href="#lien-he"
              className="mt-3 inline-flex w-fit items-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-transform hover:scale-105 hover:bg-amber-400"
            >
              Đặt ngay
            </a>
          </div>
        </Reveal>

        <Reveal
          animation="animate__fadeInRight"
          className="relative overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/xe29cho.jpg"
            alt="Thuê xe dài hạn"
            className="h-64 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 p-8">
            <span className="text-sm font-semibold text-amber-400">Thuê xe dài hạn</span>
            <p className="text-2xl font-extrabold text-white sm:text-3xl">
              Tiết kiệm đến <span className="text-amber-400">20%</span> khi thuê theo tháng
            </p>
            <a
              href="#bang-gia"
              className="mt-3 inline-flex w-fit items-center rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
