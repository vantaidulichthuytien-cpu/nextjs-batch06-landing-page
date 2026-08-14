"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock, Search } from "lucide-react";

const tabs = ["Thuê theo ngày", "Một chiều", "Thuê dài hạn"];

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    document.getElementById("lien-he")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(index)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === index
                ? "bg-slate-900 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end"
      >
        <label className="block">
          <span className="text-xs font-medium text-slate-500">Điểm đón</span>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
            <MapPin className="size-4 shrink-0 text-amber-500" />
            <input
              type="text"
              placeholder="Chọn điểm đón"
              className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-medium text-slate-500">Ngày nhận xe</span>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
            <Calendar className="size-4 shrink-0 text-amber-500" />
            <input
              type="date"
              className="w-full text-sm text-slate-900 focus:outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-medium text-slate-500">Giờ nhận xe</span>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
            <Clock className="size-4 shrink-0 text-amber-500" />
            <input
              type="time"
              className="w-full text-sm text-slate-900 focus:outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-medium text-slate-500">Ngày trả xe</span>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
            <Calendar className="size-4 shrink-0 text-amber-500" />
            <input
              type="date"
              className="w-full text-sm text-slate-900 focus:outline-none"
            />
          </div>
        </label>

        <button
          type="submit"
          className="flex h-[42px] items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition-transform hover:scale-105 hover:bg-amber-400"
        >
          <Search className="size-4" />
          Tìm xe
        </button>
      </form>
    </div>
  );
}
