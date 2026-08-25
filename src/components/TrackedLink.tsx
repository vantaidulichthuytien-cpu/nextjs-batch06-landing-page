"use client";

import { trackGoiDien, trackChatZalo } from "@/lib/analytics";

interface TrackedLinkProps {
  /** "goi" = nút gọi điện · "zalo" = nút chat Zalo */
  loai: "goi" | "zalo";
  /** Nút này nằm ở đâu — để biết vị trí nào hiệu quả nhất */
  viTri: string;
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

/**
 * Thẻ liên kết có ghi nhận sự kiện.
 *
 * Dùng cho các nút gọi và nút Zalo nằm trong server component — chúng cần một
 * lớp client mỏng để bắt onClick mà không phải biến cả trang thành client.
 */
export default function TrackedLink({
  loai,
  viTri,
  href,
  className,
  children,
  ariaLabel,
}: TrackedLinkProps) {
  const laZalo = loai === "zalo";

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={laZalo ? "_blank" : undefined}
      rel={laZalo ? "noopener noreferrer" : undefined}
      onClick={() => (laZalo ? trackChatZalo(viTri) : trackGoiDien(viTri))}
      className={className}
    >
      {children}
    </a>
  );
}
