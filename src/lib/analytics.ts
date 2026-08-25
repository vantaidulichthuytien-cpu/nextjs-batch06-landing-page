/**
 * Đo lường chuyển đổi — gửi đồng thời tới Google Analytics 4 và Meta Pixel.
 *
 * Vì sao cần: trước 19/8/2026 nhà xe chi 3–10 triệu/tháng cho Facebook Ads mà
 * website không có Pixel. Meta không nhận được tín hiệu chuyển đổi nào nên chỉ
 * tối ưu theo lượt bấm — tức tìm người hay bấm quảng cáo, không phải người hay
 * thuê xe.
 *
 * Sau khi các sự kiện dưới đây chạy được 3–5 ngày, vào Trình quản lý quảng cáo
 * đổi mục tiêu chiến dịch sang "Chuyển đổi" và chọn sự kiện `Lead`.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Tên sự kiện chuẩn của Meta, để Meta hiểu và tối ưu được. */
const META_EVENT: Record<string, string> = {
  goi_dien: "Contact",
  chat_zalo: "Contact",
  gui_yeu_cau_bao_gia: "Lead",
  xem_chi_tiet_xe: "ViewContent",
};

/**
 * Gửi một sự kiện tới cả GA4 lẫn Meta Pixel.
 *
 * Không làm gì nếu chạy trên máy chủ, hoặc nếu chưa cấu hình ID — nên gọi hàm
 * này ở bất cứ đâu cũng an toàn kể cả khi chưa dán ID vào .env.local
 */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  window.gtag?.("event", name, params);

  // Meta Pixel — dùng tên sự kiện chuẩn nếu có, không thì gửi dạng tuỳ chỉnh
  const metaName = META_EVENT[name];
  if (metaName) {
    window.fbq?.("track", metaName, params);
  } else {
    window.fbq?.("trackCustom", name, params);
  }
}

/** Khách bấm nút gọi. `vi_tri` giúp biết nút nào ở đâu hiệu quả nhất. */
export function trackGoiDien(vi_tri: string) {
  trackEvent("goi_dien", { vi_tri });
}

/** Khách bấm nút Zalo. */
export function trackChatZalo(vi_tri: string) {
  trackEvent("chat_zalo", { vi_tri });
}

/**
 * Khách gửi yêu cầu báo giá — đây là chuyển đổi chính.
 * Đây là sự kiện cần chọn khi đổi mục tiêu chiến dịch quảng cáo.
 */
export function trackGuiYeuCau(chi_tiet: {
  loai_xe?: string;
  so_khach?: string;
  hinh_thuc?: string;
}) {
  trackEvent("gui_yeu_cau_bao_gia", {
    loai_xe: chi_tiet.loai_xe || "chua_chon",
    so_khach: chi_tiet.so_khach || "chua_dien",
    hinh_thuc: chi_tiet.hinh_thuc,
  });
}

/** Khách xem trang chi tiết một dòng xe. */
export function trackXemXe(ten_xe: string) {
  trackEvent("xem_chi_tiet_xe", { ten_xe });
}
