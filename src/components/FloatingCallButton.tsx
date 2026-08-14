import { Phone } from "lucide-react";

export default function FloatingCallButton() {
  return (
    <a
      href="tel:0908049489"
      className="animate__animated animate__pulse animate__infinite fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/40"
      aria-label="Gọi ngay"
    >
      <Phone className="size-6" />
    </a>
  );
}
