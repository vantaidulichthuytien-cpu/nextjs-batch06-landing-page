import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks: Record<string, string[]> = {
  "Dịch vụ": ["Xe 4 - 7 chỗ", "Xe 16 chỗ", "Xe 29 chỗ", "Xe 45 chỗ", "Thuê xe theo tháng"],
  "Công ty": ["Về chúng tôi", "Tuyển dụng", "Điều khoản dịch vụ", "Chính sách bảo mật"],
};

const socialIcons = [
  {
    label: "Facebook",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12",
  },
  {
    label: "Instagram",
    path: "M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47a4.9 4.9 0 0 0-1.77 1.15A4.9 4.9 0 0 0 2.53 5.45c-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43a4.9 4.9 0 0 0 1.15 1.77 4.9 4.9 0 0 0 1.77 1.15c.64.25 1.37.42 2.43.47C8.94 21.99 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47a4.9 4.9 0 0 0 1.77-1.15 4.9 4.9 0 0 0 1.15-1.77c.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77A4.9 4.9 0 0 0 18.55 2.53c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2m0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.21 1.86.34.47.18.8.4 1.15.75s.57.68.75 1.15c.13.36.3.88.34 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.5-.34 1.86-.18.47-.4.8-.75 1.15s-.68.57-1.15.75c-.36.13-.88.3-1.86.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.21-1.86-.34a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.13-.36-.3-.88-.34-1.86C3.81 14.99 3.8 14.67 3.8 12s.01-2.99.06-4.04c.04-.98.21-1.5.34-1.86.18-.47.4-.8.75-1.15s.68-.57 1.15-.75c.36-.13.88-.3 1.86-.34C9.01 3.81 9.33 3.8 12 3.8m0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3m0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7m5.35-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0",
  },
  {
    label: "Youtube",
    path: "M23.5 6.75a3.02 3.02 0 0 0-2.12-2.14C19.55 4.1 12 4.1 12 4.1s-7.55 0-9.38.51A3.02 3.02 0 0 0 .5 6.75 31.6 31.6 0 0 0 0 12.5a31.6 31.6 0 0 0 .5 5.75 3.02 3.02 0 0 0 2.12 2.14c1.83.51 9.38.51 9.38.51s7.55 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14 31.6 31.6 0 0 0 .5-5.75 31.6 31.6 0 0 0-.5-5.75M9.6 16.02V8.98l6.27 3.52z",
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-zinc-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo.png"
              alt="Nhà Xe Thủy Tiên"
              width={220}
              height={116}
              className="h-16 w-auto"
            />
            <p className="mt-4 text-sm text-zinc-400">
              Dịch vụ cho thuê xe du lịch từ 4 đến 45 chỗ, đồng hành cùng mọi
              hành trình của bạn.
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  aria-label={icon.label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-teal-400/40 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-white">Liên hệ</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-teal-400" />
                1023/34 Khu Phố 13, Phường Tam Hiệp, TP. Đồng Nai
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-teal-400" />
                0908 049 489
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-teal-400" />
                vantai.dulichthuytien@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-500">© 2026 Nhà Xe Thủy Tiên. Bảo lưu mọi quyền.</p>
          <p className="text-sm text-zinc-500">Thiết kế với 💚 tại Việt Nam</p>
        </div>
      </div>
    </footer>
  );
}
