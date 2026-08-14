"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { SITE_PHONE, SITE_PHONE_DISPLAY } from "@/lib/site";

const services = [
  { href: "#dich-vu", label: "Xe 4 - 7 chỗ" },
  { href: "#dich-vu", label: "Xe 16 chỗ" },
  { href: "#dich-vu", label: "Xe 29 chỗ" },
  { href: "#dich-vu", label: "Xe 45 chỗ" },
];

const navLinks = [
  { href: "#hero", label: "Trang chủ" },
  { href: "#loi-ich", label: "Lợi ích" },
  { href: "#bang-gia", label: "Bảng giá" },
  { href: "#danh-gia", label: "Đánh giá" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Thủy Tiên"
            width={220}
            height={116}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <a
            href="#hero"
            className="text-sm font-semibold text-amber-400"
          >
            Trang chủ
          </a>

          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-slate-200 transition-colors hover:text-white">
              Dịch vụ
              <ChevronDown className="size-4" />
            </button>
            <div className="invisible absolute left-0 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
              {services.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-600"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${SITE_PHONE}`}
            className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            <Phone className="size-4" />
            {SITE_PHONE_DISPLAY}
          </a>
          <a
            href="#lien-he"
            className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition-transform hover:scale-105 hover:bg-amber-400"
          >
            Đặt xe ngay
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-slate-100 lg:hidden"
          aria-label="Mở menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="animate__animated animate__fadeIn animate__faster border-t border-white/10 bg-slate-900 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${SITE_PHONE}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white"
            >
              <Phone className="size-4" />
              {SITE_PHONE_DISPLAY}
            </a>
            <a
              href="#lien-he"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-amber-500 px-5 py-2.5 text-center text-sm font-semibold text-slate-900"
            >
              Đặt xe ngay
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
