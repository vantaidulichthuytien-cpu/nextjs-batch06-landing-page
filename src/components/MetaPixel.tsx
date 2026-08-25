"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Meta Pixel.
 *
 * Không render gì nếu chưa cấu hình NEXT_PUBLIC_META_PIXEL_ID — nên để trong
 * layout luôn cũng an toàn khi chưa có ID.
 *
 * Lưu ý: Pixel chỉ là một nửa. Nửa còn lại là Conversions API (gửi sự kiện từ
 * máy chủ, không bị trình duyệt chặn). Cách bật CAPI nhanh nhất mà không cần
 * lập trình: dùng tính năng "Kết nối Conversions API" ngay trong Trình quản lý
 * sự kiện của Meta.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const daKhoiTao = useRef(false);

  // Ghi nhận lượt xem trang khi người dùng chuyển trang (Next.js không tải lại
  // trang nên Pixel không tự bắn PageView lần thứ hai).
  useEffect(() => {
    if (!PIXEL_ID) return;
    if (!daKhoiTao.current) {
      daKhoiTao.current = true;
      return; // lần đầu đã được script bên dưới bắn rồi
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
