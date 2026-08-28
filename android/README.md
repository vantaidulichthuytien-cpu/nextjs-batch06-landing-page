# Máy Phát Nhạc — app Android

Ứng dụng Android nhỏ: mở lên là có **một nút bấm lớn giữa màn hình**, ấn vào là phát bài hát,
ấn lần nữa là tạm dừng. Kèm thanh tua (seek bar), thời gian đã phát / tổng thời lượng và nút
"Phát lại từ đầu".

Project này nằm tách biệt trong thư mục `android/`, không ảnh hưởng gì tới landing page Next.js
ở thư mục gốc.

## Chạy thử

1. Mở **Android Studio** → `File > Open…` → chọn thư mục `android/` (không phải thư mục gốc của repo).
2. Đợi Gradle sync xong (lần đầu sẽ tải Android Gradle Plugin, mất vài phút).
3. Cắm điện thoại (đã bật *USB debugging*) hoặc mở máy ảo, rồi bấm **Run ▶**.

Hoặc build bằng dòng lệnh (cần đặt biến môi trường `ANDROID_HOME` trỏ tới Android SDK):

```bash
cd android
./gradlew assembleDebug
# file APK: app/build/outputs/apk/debug/app-debug.apk
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

> Lưu ý: mình viết và kiểm tra mã nguồn ở đây, nhưng **chưa build được APK** trong môi trường này
> vì máy chạy không có Android SDK và không tải được (`dl.google.com` bị chặn bởi policy mạng).
> Lần build đầu tiên trên máy bạn sẽ do Android Studio / Gradle tự tải các thành phần còn thiếu.

## Đổi sang bài hát của bạn

Bài hát đi kèm (`app/src/main/res/raw/bai_hat_mau.wav`) là giai điệu mình tự tổng hợp bằng
`tools/gen_song.py`, **không dính bản quyền**, dài khoảng 20 giây.

Để dùng bài của bạn:

1. Chép file nhạc vào `app/src/main/res/raw/`. Tên file phải **viết thường, không dấu, không
   khoảng trắng**, chỉ gồm chữ - số - gạch dưới. Ví dụ: `bai_hat_cua_toi.mp3`.
2. Sửa `MainActivity.kt`, dòng `MediaPlayer.create(this, R.raw.bai_hat_mau)` thành tên file mới,
   ví dụ `R.raw.bai_hat_cua_toi`.
3. Sửa tên bài / ca sĩ hiển thị trong `app/src/main/res/values/strings.xml`
   (`song_title`, `song_artist`).

Định dạng hỗ trợ sẵn: MP3, M4A/AAC, OGG, WAV, FLAC. Nên dùng MP3 hoặc M4A cho nhẹ.

Muốn phát nhạc từ Internet thay vì file đóng gói sẵn? Đổi phần khởi tạo thành:

```kotlin
val mediaPlayer = MediaPlayer().apply {
    setDataSource("https://ten-mien-cua-ban/bai-hat.mp3")
    prepareAsync()
    setOnPreparedListener { /* bật nút Play tại đây */ }
}
```

và thêm quyền `<uses-permission android:name="android.permission.INTERNET" />` vào
`AndroidManifest.xml`.

## Cấu trúc

| Đường dẫn | Vai trò |
|---|---|
| `app/src/main/java/vn/thuytien/musicplayer/MainActivity.kt` | Toàn bộ logic phát nhạc (MediaPlayer, tua, audio focus) |
| `app/src/main/res/layout/activity_main.xml` | Giao diện: ảnh bìa, tên bài, seek bar, nút phát |
| `app/src/main/res/raw/bai_hat_mau.wav` | File nhạc được đóng gói trong app |
| `app/src/main/res/values/` | Chuỗi hiển thị, màu sắc, theme |
| `tools/gen_song.py` | Script Python tạo lại file nhạc mẫu (`python3 tools/gen_song.py out.wav`) |

## Vài chi tiết kỹ thuật

- `minSdk 24` (Android 7.0) → chạy được trên hầu hết máy đang dùng.
- Có xử lý **audio focus**: có cuộc gọi đến hoặc app khác phát nhạc thì tự tạm dừng, xong thì phát tiếp.
- `MediaPlayer` được `release()` trong `onDestroy()` để không rò rỉ bộ nhớ.
- Nhạc chỉ phát khi app đang mở. Nếu cần phát tiếp khi tắt màn hình / chuyển app, phải bổ sung
  một `foreground service` + notification — nói mình biết nếu bạn cần.
