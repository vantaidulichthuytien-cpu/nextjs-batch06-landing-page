"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { X, Search, Loader2, MapPin, Check } from "lucide-react";

const DEFAULT_CENTER: [number, number] = [10.9447, 106.8243]; // Biên Hòa, Đồng Nai
const DEFAULT_ZOOM = 13;

const pinIcon = L.divIcon({
  className: "",
  html: `<svg width="32" height="32" viewBox="0 0 24 24" fill="#f59e0b" stroke="#0f172a" stroke-width="1"><path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationPickerModalProps {
  title: string;
  initialAddress?: string;
  onClose: () => void;
  onSelect: (address: string) => void;
}

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function FlyTo({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 0.8 });
    }
  }, [position, map]);
  return null;
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=vi`
  );
  const data = await res.json();
  return data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

export default function LocationPickerModal({
  title,
  initialAddress,
  onClose,
  onSelect,
}: LocationPickerModalProps) {
  const [query, setQuery] = useState(initialAddress ?? "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState(initialAddress ?? "");
  const [resolving, setResolving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
            query
          )}&limit=5&countrycodes=vn&accept-language=vi`
        );
        const data = await res.json();
        setSuggestions(data);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function handlePickSuggestion(s: Suggestion) {
    const lat = parseFloat(s.lat);
    const lon = parseFloat(s.lon);
    setPosition([lat, lon]);
    setAddress(s.display_name);
    setQuery(s.display_name);
    setSuggestions([]);
  }

  async function handleMapClick(lat: number, lng: number) {
    setPosition([lat, lng]);
    setResolving(true);
    try {
      const result = await reverseGeocode(lat, lng);
      setAddress(result);
      setQuery(result);
    } finally {
      setResolving(false);
    }
  }

  function handleConfirm() {
    if (!address) return;
    onSelect(address);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4">
      <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="relative px-5 pt-4">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
            <Search className="size-4 shrink-0 text-slate-400" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nhập tên địa điểm, đường, khu vực..."
              className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {searching && <Loader2 className="size-4 shrink-0 animate-spin text-slate-400" />}
          </div>

          {suggestions.length > 0 && (
            <div className="absolute inset-x-5 top-[calc(100%-4px)] z-10 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
              {suggestions.map((s) => (
                <button
                  key={`${s.lat}-${s.lon}`}
                  type="button"
                  onClick={() => handlePickSuggestion(s)}
                  className="flex w-full items-start gap-2 px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-amber-50"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-amber-500" />
                  <span className="line-clamp-2">{s.display_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 h-80 w-full sm:h-96">
          <MapContainer
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler onPick={handleMapClick} />
            <FlyTo position={position} />
            {position && <Marker position={position} icon={pinIcon} />}
          </MapContainer>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-5 py-4">
          <p className="min-w-0 flex-1 truncate text-sm text-slate-600">
            {resolving ? (
              <span className="flex items-center gap-2 text-slate-400">
                <Loader2 className="size-4 animate-spin" />
                Đang xác định địa chỉ...
              </span>
            ) : address ? (
              address
            ) : (
              "Nhấp vào bản đồ hoặc tìm kiếm để chọn vị trí"
            )}
          </p>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!address || resolving}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            <Check className="size-4" />
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
