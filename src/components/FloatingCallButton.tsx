import { Phone } from "lucide-react";
import { SITE_PHONE } from "@/lib/site";

export default function FloatingCallButton() {
  return (
    <a
      href={`tel:${SITE_PHONE}`}
      className="animate__animated animate__pulse animate__infinite fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/40"
      aria-label="Gọi ngay"
    >
      <Phone className="size-6" />
    </a>
  );
}
