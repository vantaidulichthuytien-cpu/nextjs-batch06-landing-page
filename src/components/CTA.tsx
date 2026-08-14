import { Phone, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="lien-he" className="relative overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-teal-600 via-sky-600 to-cyan-600 px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-white/10 blur-3xl" />

          <h2 className="relative text-3xl font-extrabold text-white sm:text-4xl">
            Sẵn sàng cho chuyến đi tiếp theo?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-teal-100">
            Liên hệ ngay để nhận báo giá miễn phí trong vòng 5 phút. Đội ngũ
            tư vấn luôn sẵn sàng hỗ trợ bạn.
          </p>

          <div className="relative mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="tel:0908049489"
              className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-teal-700 shadow-lg transition-transform hover:scale-105"
            >
              <Phone className="size-4" />
              Gọi ngay 0908 049 489
            </a>
            <a
              href="https://zalo.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="size-4" />
              Chat Zalo tư vấn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
