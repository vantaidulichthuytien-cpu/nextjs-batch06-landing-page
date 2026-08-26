# TVC — Nhà Xe Thủy Tiên

Thư mục này chứa toàn bộ phần dựng video quảng cáo 30 giây cho dịch vụ cho thuê
xe du lịch. Video được dựng bằng chính HTML/CSS rồi chụp lại từng khung hình, nên
muốn sửa chữ hay bố cục thì chỉ cần sửa file HTML và render lại — không cần phần
mềm dựng phim.

| File | Nội dung |
|---|---|
| `KICH-BAN-TVC.md` | Kịch bản, phân cảnh theo giây, lời đọc, bản cắt 15s/6s, gợi ý quay bản thật |
| `scene-16x9.html` | Hình ảnh và chuyển động bản khung ngang. File cần sửa khi đổi nội dung |
| `scene-9x16.html` | Bản khung dọc cho TikTok / Reels / Story — cùng mốc thời gian, bố cục dựng lại theo chiều dọc |
| `build-music.mjs` | Sinh nhạc nền 30 giây (tự tổng hợp, không dùng mẫu âm bên thứ ba) |
| `render.mjs` | Chụp từng khung hình bằng Chromium rồi ghép thành MP4 |
| `assets/fonts/` | Font Be Vietnam Pro (giấy phép OFL, kèm trong `LICENSE-BeVietnamPro.txt`) |
| `out/tvc-thuytien-16x9-30s.mp4` | **Bản ngang** — 1920×1080, 30 fps, H.264 + AAC, 30.00 giây |
| `out/tvc-thuytien-9x16-30s.mp4` | **Bản dọc** — 1080×1920, cùng thông số |
| `out/poster-*.jpg` | Ảnh đại diện để gắn khi đăng quảng cáo |
| `out/storyboard-*.jpg` | Bảng 9 khung hình chính, xem nhanh toàn bộ TVC |

Ảnh xe và logo lấy trực tiếp từ `public/` của website nên video luôn khớp với
landing page.

## Dựng lại video

```bash
npm i -D playwright-core ffmpeg-static     # chỉ cần cài một lần
node tvc/build-music.mjs                   # -> tvc/out/tvc-music-30s.wav
node tvc/render.mjs                        # -> tvc/out/tvc-thuytien-16x9-30s.mp4
node tvc/render.mjs --scene tvc/scene-9x16.html \
     --out tvc/out/tvc-thuytien-9x16-30s.mp4   # bản dọc
```

Hai bản dùng chung một file nhạc vì mốc thời gian giống hệt nhau.

Render mất khoảng 90 giây cho 900 khung hình. Nếu Chromium không nằm ở đường dẫn
mặc định, đặt biến `CHROMIUM_PATH` trỏ tới file thực thi.

Xem thử một khung hình mà không phải render cả video:

```bash
node tvc/render.mjs --preview 12.9          # xuất PNG tại giây 12.9
node tvc/render.mjs --preview 2.6,15.4,28.2 # nhiều mốc một lượt
```

## Sửa nội dung

Mở `scene-16x9.html`:

* **Chữ trên màn hình** nằm trong phần `<body>`, mỗi cảnh là một `<section class="scene">`.
* **Thời điểm xuất hiện** nằm ở khối `TIMELINE` cuối file, mỗi dòng
  `anim(bộ-chọn, giây-bắt-đầu, thời-lượng, {trạng thái đầu}, {trạng thái cuối})`.
* **Màu sắc** khai báo ở biến CSS trong `:root`.

Chuyển động được tính bằng JavaScript theo mốc thời gian tuyệt đối chứ không dùng
CSS animation, nhờ vậy `window.seek(t)` cho ra đúng một khung hình xác định và
render lại lần nào cũng giống hệt lần nào.

**Lưu ý khi đổi thời lượng cảnh:** nhạc chạy 120 BPM, mỗi ô nhịp 2.0 giây. Giữ
các cú cắt ở bội số của 2.0 giây thì hình vẫn ăn khớp với nhạc; nếu buộc phải
đổi, sửa luôn mốc `impact()` trong `build-music.mjs` cho khớp lại.

## Quan hệ giữa hai bản

`scene-9x16.html` giữ nguyên toàn bộ mốc thời gian của bản ngang — cùng cú cắt,
cùng hiệu ứng, cùng nhạc — chỉ khác phần CSS bố cục và cách cắt ảnh:

* Cảnh đội xe ở bản dọc dựng theo kiểu **ảnh trên, bảng chữ dưới**: ảnh chiếm
  1180 px trên cùng, số chỗ và mô tả nằm trong dải nền đậm phía dưới.
* Ảnh xe 4–7 chỗ chụp dọc nên ở bản 9:16 lấp đầy khung rất đẹp; ngược lại ba ảnh
  xe khách chụp ngang bị cắt hẹp, đã chỉnh `object-position` để giữ đầu xe.
* Chữ ở bản dọc dừng trước mốc 1600 px vì giao diện TikTok/Reels che phần đáy.

**Khi sửa nội dung, nhớ sửa cả hai file** — chúng không dùng chung phần thân trang.
