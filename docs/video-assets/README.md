# Bộ đồ họa chèn vào video clip

8 khung hình dọc **1080×1920** (đúng tỷ lệ 9:16 của TikTok / Reels / Shorts),
dùng kèm bộ kịch bản trong [`../video-marketing.md`](../video-marketing.md).

Tất cả đã chừa sẵn vùng an toàn: 15% trên và 20% dưới để trống, vì vùng đó bị
tên tài khoản, caption và các nút của app che mất.

## Danh sách file (`png/`)

| File | Dùng ở đâu | Loại |
|---|---|---|
| `01-hook-gia.png` | Kịch bản 1, giây 0–3 | **Nền trong suốt** — chèn đè lên video xe |
| `02-da-bao-gom.png` | Kịch bản 1, giây 10–20 | Khung đầy đủ |
| `03-huy-coc.png` | Kịch bản 3, giây 3–15 | Khung đầy đủ |
| `04-chon-xe.png` | Kịch bản 4, toàn clip | Khung đầy đủ |
| `05-kiem-chung.png` | Kịch bản 2, giây 8–20 | Khung đầy đủ |
| `06-ket-clip.png` | Kết mọi clip, 3 giây cuối | Khung đầy đủ |
| `07-overlay-cta.png` | Thanh CTA cuối clip | **Nền trong suốt** — chèn đè lên video |
| `08-hook-huy-coc.png` | Kịch bản 3, giây 0–3 | **Nền trong suốt** — chèn đè lên video |

**Khung đầy đủ** = dùng làm một cảnh riêng trong clip.
**Nền trong suốt** = kéo vào CapCut dưới dạng lớp phủ (Overlay), video xe vẫn chạy phía sau.

## Dùng trong CapCut

1. Mở CapCut → tạo dự án mới → chọn tỷ lệ **9:16**.
2. Kéo video quay bằng điện thoại vào dòng thời gian chính.
3. Với file nền trong suốt: **Overlay → Add overlay** → chọn file PNG → kéo dài
   đúng số giây trong kịch bản. CapCut giữ nguyên phần trong suốt.
4. Với khung đầy đủ: chèn thẳng vào dòng thời gian chính như một cảnh.
5. Muốn khung xuất hiện mềm hơn: chọn lớp PNG → **Animation → In → Fade / Slide up**,
   để khoảng 0.3–0.5 giây.

## Sửa nội dung chữ

Chữ nằm trong `generator/frames.html`, sửa trực tiếp bằng trình soạn thảo bất kỳ
rồi chạy lại để xuất PNG mới:

```bash
cd docs/video-assets/generator
npm i playwright          # chỉ cần chạy lần đầu
npx playwright install chromium
node render.mjs           # PNG mới ghi đè vào ../png/
```

Nếu máy đã có sẵn Chromium, chỉ ra đường dẫn để khỏi tải lại:

```bash
CHROMIUM_PATH=/đường/dẫn/tới/chrome node render.mjs
```

Thêm khung mới: sao chép một khối `<div class="frame ..." data-frame="tên-file">`
trong `frames.html`, đổi `data-frame` thành tên file mong muốn. Thêm
`data-alpha="1"` nếu muốn nền trong suốt. Script tự tìm và xuất hết.

## Ghi chú

- Font: **Be Vietnam Pro** (Google Fonts, giấy phép SIL Open Font License), đã
  tải sẵn vào `generator/fonts/` nên chạy được cả khi không có mạng.
- Màu chủ đạo lấy từ logo nhà xe (`public/logo.png`): xanh ngọc `#0AA5B5`.
- Mọi số liệu trên khung hình lấy đúng từ nội dung website. Nếu sau này đổi
  chính sách cọc hoặc số điện thoại trên web, nhớ sửa cả `frames.html` và
  xuất lại PNG, đừng để clip nói khác web.
