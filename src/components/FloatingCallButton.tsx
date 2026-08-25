import { Phone } from "lucide-react";
import TrackedLink from "./TrackedLink";
import { SITE_PHONE } from "@/lib/site";

export default function FloatingCallButton() {
  return (
    <TrackedLink
      loai="goi"
      viTri="nut-goi-noi"
      href={`tel:${SITE_PHONE}`}
      ariaLabel="Gọi ngay"
      className="pulse-soft fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/40"
    >
      <Phone className="size-6" />
    </TrackedLink>
  );
}
