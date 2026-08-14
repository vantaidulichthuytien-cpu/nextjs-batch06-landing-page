"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "#dich-vu", label: "Dịch vụ" },
  { href: "#loi-ich", label: "Lợi ích" },
  { href: "#bang-gia", label: "Bảng giá" },
  { href: "#danh-gia", label: "Đánh giá" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Thủy Tiên"
            width={220}
            height={116}
            priority
            className="h-16 w-auto sm:h-[70px]"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:0908049489"
            className="flex items-center gap-2 text-sm font-semibold text-zinc-200 hover:text-white"
          >
            <Phone className="size-4" />
            0908 049 489
          </a>
          <a
            href="#lien-he"
            className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-transform hover:scale-105"
          >
            Đặt xe ngay
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-zinc-200 lg:hidden"
          aria-label="Mở menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="animate__animated animate__fadeIn animate__faster border-t border-white/5 bg-zinc-950/95 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#lien-he"
              onClick={() => setOpen(false)}
              className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Đặt xe ngay
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
