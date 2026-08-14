"use client";

import { useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import { MapPin, Calendar, Clock, Search } from "lucide-react";

const LocationPickerModal = dynamic(() => import("./LocationPickerModal"), {
  ssr: false,
});

const tabs = ["Thuê theo ngày", "Một chiều", "Thuê dài hạn"];

interface FieldProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  type?: "date" | "time";
}

function Field({ icon: Icon, label, type }: FieldProps) {
  return (
    <label className="flex flex-1 items-center gap-3 px-4 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-slate-500">{label}</span>
        <input
          type={type}
          className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
        />
      </span>
    </label>
  );
}

interface LocationFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onOpen: () => void;
}

function LocationField({ label, value, placeholder, onOpen }: LocationFieldProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-1 items-center gap-3 px-4 py-3 text-left"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
        <MapPin className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-slate-500">{label}</span>
        <span
          className={`block truncate text-sm font-medium ${
            value ? "text-slate-900" : "font-normal text-slate-400"
          }`}
        >
          {value || placeholder}
        </span>
      </span>
    </button>
  );
}

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [activeModal, setActiveModal] = useState<"pickup" | "dropoff" | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    document.getElementById("lien-he")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-6">
      <div className="inline-flex rounded-lg bg-slate-100 p-1">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(index)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === index
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div className="grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <LocationField
            label="Điểm đón"
            value={pickup}
            placeholder="Chọn điểm đón trên bản đồ"
            onOpen={() => setActiveModal("pickup")}
          />
          <LocationField
            label="Điểm đến"
            value={dropoff}
            placeholder="Chọn điểm đến trên bản đồ"
            onOpen={() => setActiveModal("dropoff")}
          />
        </div>

        <div className="grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          <Field icon={Calendar} label="Ngày bắt đầu" type="date" />
          <Field icon={Clock} label="Giờ bắt đầu" type="time" />
          <Field icon={Calendar} label="Ngày kết thúc" type="date" />
          <Field icon={Clock} label="Giờ kết thúc" type="time" />
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition-transform hover:scale-[1.01] hover:bg-amber-400 sm:w-auto sm:px-8"
        >
          <Search className="size-4" />
          Tìm xe
        </button>
      </form>

      {activeModal && (
        <LocationPickerModal
          title={activeModal === "pickup" ? "Chọn điểm đón" : "Chọn điểm đến"}
          initialAddress={activeModal === "pickup" ? pickup : dropoff}
          onClose={() => setActiveModal(null)}
          onSelect={(address) => {
            if (activeModal === "pickup") setPickup(address);
            else setDropoff(address);
          }}
        />
      )}
    </div>
  );
}
