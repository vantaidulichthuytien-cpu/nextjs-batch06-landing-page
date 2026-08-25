"use client";

import { useMemo, useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Car,
  User,
  Phone,
  MessageCircle,
  Copy,
  Check,
  ArrowLeft,
} from "lucide-react";
import { SITE_PHONE, SITE_PHONE_DISPLAY, SITE_ZALO_URL } from "@/lib/site";
import { vehicles } from "@/lib/vehicles";
import { trackGuiYeuCau, trackChatZalo, trackGoiDien } from "@/lib/analytics";

const LocationPickerModal = dynamic(() => import("./LocationPickerModal"), {
  ssr: false,
});

const tabs = ["Thuê theo ngày", "Một chiều", "Thuê dài hạn"] as const;

/** Đổi "2026-08-20" thành "20/08/2026" cho dễ đọc trong tin nhắn. */
function formatDate(value: string) {
  if (!value) return "";
  const [y, m, d] = value.split("-");
  return d && m && y ? `${d}/${m}/${y}` : value;
}

interface FieldProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  type?: "date" | "time" | "number" | "tel" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: string;
  required?: boolean;
}

function Field({
  icon: Icon,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  required,
}: FieldProps) {
  return (
    <label className="flex flex-1 items-center gap-3 px-4 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-slate-500">
          {label}
          {required && <span className="ml-0.5 text-blue-600">*</span>}
        </span>
        <input
          type={type}
          value={value}
          min={min}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
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

function LocationField({
  label,
  value,
  placeholder,
  onOpen,
}: LocationFieldProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-1 items-center gap-3 px-4 py-3 text-left"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <MapPin className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-slate-500">
          {label}
          <span className="ml-0.5 text-blue-600">*</span>
        </span>
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
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [passengers, setPassengers] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [activeModal, setActiveModal] = useState<"pickup" | "dropoff" | null>(
    null
  );
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const isOneWay = activeTab === 1;
  const today = new Date().toISOString().slice(0, 10);

  const message = useMemo(() => {
    const lines = [
      "YÊU CẦU THUÊ XE",
      "",
      `Hình thức: ${tabs[activeTab]}`,
      `Điểm đón: ${pickup}`,
      `Điểm đến: ${dropoff}`,
      `Bắt đầu: ${formatDate(startDate)}${startTime ? ` lúc ${startTime}` : ""}`,
    ];

    if (!isOneWay && endDate) {
      lines.push(
        `Kết thúc: ${formatDate(endDate)}${endTime ? ` lúc ${endTime}` : ""}`
      );
    }
    if (vehicle) lines.push(`Loại xe: ${vehicle}`);
    if (passengers) lines.push(`Số khách: ${passengers}`);
    if (name) lines.push(`Họ tên: ${name}`);
    lines.push(`Điện thoại: ${phone}`);
    lines.push("", "Anh/chị báo giúp em giá cho lộ trình này với ạ.");

    return lines.join("\n");
  }, [
    activeTab,
    pickup,
    dropoff,
    startDate,
    startTime,
    endDate,
    endTime,
    vehicle,
    passengers,
    name,
    phone,
    isOneWay,
  ]);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      return true;
    } catch {
      return false;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!pickup || !dropoff) {
      setError("Vui lòng chọn điểm đón và điểm đến.");
      return;
    }
    if (!startDate) {
      setError("Vui lòng chọn ngày khởi hành.");
      return;
    }
    if (!/^0\d{9}$/.test(phone.replace(/\s/g, ""))) {
      setError("Vui lòng nhập số điện thoại 10 số để nhà xe gọi lại báo giá.");
      return;
    }

    setError("");

    // Chuyển đổi chính của website. Đây là sự kiện cần chọn khi đổi mục tiêu
    // chiến dịch quảng cáo sang "Chuyển đổi".
    trackGuiYeuCau({
      loai_xe: vehicle,
      so_khach: passengers,
      hinh_thuc: tabs[activeTab],
    });

    await copyMessage();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Check className="size-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Đã soạn xong yêu cầu của bạn
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Nội dung dưới đây đã được sao chép. Bấm nút Zalo rồi dán vào khung
              chat và gửi — nhà xe báo giá lại trong 5 phút.
            </p>
          </div>
        </div>

        <pre className="mt-5 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          {message}
        </pre>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={SITE_ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackChatZalo("sau-khi-gui-form")}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-400"
          >
            <MessageCircle className="size-4" />
            Mở Zalo và dán yêu cầu
          </a>
          <a
            href={`tel:${SITE_PHONE}`}
            onClick={() => trackGoiDien("sau-khi-gui-form")}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
          >
            <Phone className="size-4" />
            Gọi {SITE_PHONE_DISPLAY}
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={copyMessage}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            {copied ? (
              <>
                <Check className="size-4 text-blue-600" />
                Đã sao chép
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Sao chép lại nội dung
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="size-4" />
            Sửa lại thông tin
          </button>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Gửi ngoài giờ vẫn được — nhà xe sẽ phản hồi vào sáng hôm sau.
        </p>
      </div>
    );
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

        <div
          className={`grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x ${
            isOneWay ? "" : "lg:grid-cols-4"
          }`}
        >
          <Field
            icon={Calendar}
            label="Ngày bắt đầu"
            type="date"
            min={today}
            value={startDate}
            onChange={setStartDate}
            required
          />
          <Field
            icon={Clock}
            label="Giờ bắt đầu"
            type="time"
            value={startTime}
            onChange={setStartTime}
          />
          {!isOneWay && (
            <>
              <Field
                icon={Calendar}
                label="Ngày kết thúc"
                type="date"
                min={startDate || today}
                value={endDate}
                onChange={setEndDate}
              />
              <Field
                icon={Clock}
                label="Giờ kết thúc"
                type="time"
                value={endTime}
                onChange={setEndTime}
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <label className="flex flex-1 items-center gap-3 px-4 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Car className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-slate-500">
                Loại xe
              </span>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
              >
                <option value="">Chưa rõ, nhờ nhà xe tư vấn</option>
                {vehicles.map((v) => (
                  <option key={v.slug} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <Field
            icon={Users}
            label="Số khách"
            type="number"
            value={passengers}
            onChange={setPassengers}
            placeholder="VD: 14"
          />
        </div>

        <div className="grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <Field
            icon={User}
            label="Họ tên"
            value={name}
            onChange={setName}
            placeholder="Tên của bạn"
          />
          <Field
            icon={Phone}
            label="Số điện thoại"
            type="tel"
            value={phone}
            onChange={setPhone}
            placeholder="Để nhà xe gọi lại báo giá"
            required
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-500 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-400"
          >
            <MessageCircle className="size-4" />
            Nhận báo giá trong 5 phút
          </button>
          <p className="text-xs text-slate-500">
            Miễn phí, không ràng buộc. Giá phụ thuộc lộ trình và số ngày nên nhà
            xe báo riêng cho từng chuyến.
          </p>
        </div>
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
