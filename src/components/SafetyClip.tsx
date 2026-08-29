"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { buildSafetyScenes } from "./SafetyClipScenes";
import { SITE_PHONE_DISPLAY } from "@/lib/site";

/*
  Trình phát clip hoạt hình. Không dùng file video: mỗi cảnh là SVG + CSS nên
  clip nhẹ, nét ở mọi kích thước màn hình và sửa nội dung chỉ bằng cách sửa
  chữ trong SafetyClipScenes.tsx.

  Đồng hồ đếm chạy bằng requestAnimationFrame và ghi thẳng vào style của
  thanh tiến độ (không setState mỗi khung hình) để tránh vẽ lại cả cảnh 60
  lần mỗi giây. Khi tạm dừng, animation CSS bên trong cũng dừng theo thuộc
  tính data-paused nên hai đồng hồ luôn khớp nhau.
*/

/* Theo dõi tuỳ chọn "giảm chuyển động" của hệ điều hành mà không cần setState. */
function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export default function SafetyClip() {
  const scenes = useMemo(() => buildSafetyScenes(SITE_PHONE_DISPLAY), []);
  const totalSeconds = Math.round(
    scenes.reduce((sum, s) => sum + s.duration, 0) / 1000
  );
  const reducedMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const [inView, setInView] = useState(false);
  /* Người chọn giảm chuyển động thì clip chỉ chạy khi họ tự bấm nút phát. */
  const [userStarted, setUserStarted] = useState(false);

  const elapsedRef = useRef(0);
  const barRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const scene = scenes[index];
  const playing =
    inView && !paused && !ended && (!reducedMotion || userStarted);

  /* Chỉ chạy khi clip nằm trong tầm nhìn, tránh clip hết veo lúc chưa ai xem. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";
  }, [index]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const duration = scenes[index].duration;

    const tick = (now: number) => {
      elapsedRef.current += now - last;
      last = now;

      if (elapsedRef.current >= duration) {
        elapsedRef.current = 0;
        if (index === scenes.length - 1) {
          if (barRef.current) barRef.current.style.transform = "scaleX(1)";
          setEnded(true);
          return;
        }
        setIndex(index + 1);
        return;
      }

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${elapsedRef.current / duration})`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, index, scenes]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, scenes.length - 1));
      elapsedRef.current = 0;
      setEnded(false);
      setIndex(clamped);
      setPaused(false);
      setUserStarted(true);
    },
    [scenes.length]
  );

  const toggle = useCallback(() => {
    if (ended) {
      goTo(0);
      return;
    }
    setUserStarted(true);
    setPaused((wasPaused) => !wasPaused);
  }, [ended, goTo]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " " || event.key === "k") {
      event.preventDefault();
      toggle();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const Illustration = scene.Illustration;

  return (
    <div className="w-full">
      <div
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-label="Clip hướng dẫn an toàn khi ngồi trên xe khách"
        onKeyDown={onKeyDown}
        className="clip-stage relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200 outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
        data-paused={!playing}
        style={{ ["--clip-scene" as string]: `${scene.duration}ms` }}
      >
        {/* Tranh vẽ. key ép remount để hiệu ứng chạy lại từ đầu mỗi cảnh. */}
        <div key={scene.id} className="absolute inset-0">
          <Illustration />
        </div>

        {/* Thanh tiến độ từng cảnh, bấm được để nhảy tới cảnh bất kỳ. */}
        <div className="absolute inset-x-0 top-0 flex gap-1.5 p-3">
          {scenes.map((item, i) => (
            <button
              key={item.id}
              onClick={() => goTo(i)}
              aria-label={`Tới cảnh ${i + 1}: ${item.title}`}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-900/20 transition-colors hover:bg-slate-900/35"
            >
              <span
                ref={i === index ? barRef : undefined}
                className="block h-full w-full origin-left rounded-full bg-white"
                style={{
                  transform:
                    i < index ? "scaleX(1)" : i > index ? "scaleX(0)" : undefined,
                }}
              />
            </button>
          ))}
        </div>

        {/*
          Tiêu đề cảnh nằm đè lên tranh như phụ đề video, còn câu diễn giải để
          xuống dưới khung hình — nhờ vậy tranh vẽ không bị che mất phần chân.
        */}
        <div className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent px-5 pt-12 pb-4 sm:block sm:px-7 sm:pb-5">
          <div key={scene.id} className="clip-fade-up flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-1">
            {scene.step && (
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                Điều {scene.step}
              </span>
            )}
            <h2 className="text-base leading-snug font-bold text-white sm:text-2xl">
              {scene.title}
            </h2>
          </div>
        </div>

        {ended && (
          /* Không gắn hiệu ứng cho lớp phủ này: lúc clip dừng, quy tắc
             data-paused đóng băng mọi animation trong sân khấu, hiệu ứng sẽ
             kẹt ở khung đầu và lớp phủ không bao giờ hiện ra. */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/70 backdrop-blur-sm">
            <button
              onClick={() => goTo(0)}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:scale-105"
            >
              <RotateCcw className="size-4" />
              Xem lại từ đầu
            </button>
            <p className="px-6 text-center text-sm text-slate-200">
              Chia sẻ clip này cho cả đoàn trước ngày khởi hành nhé.
            </p>
          </div>
        )}
      </div>

      {/* Bảng điều khiển */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Cảnh trước"
            className="flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            <SkipBack className="size-5" />
          </button>
          <button
            onClick={toggle}
            aria-label={ended ? "Xem lại" : playing ? "Tạm dừng" : "Phát clip"}
            className="flex size-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-105 hover:bg-blue-500"
          >
            {ended ? (
              <RotateCcw className="size-5" />
            ) : playing ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5" />
            )}
          </button>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === scenes.length - 1}
            aria-label="Cảnh tiếp theo"
            className="flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            <SkipForward className="size-5" />
          </button>
        </div>

        <p className="text-sm text-slate-500">
          Cảnh{" "}
          <span className="font-semibold text-slate-900">
            {index + 1}/{scenes.length}
          </span>{" "}
          · Thời lượng khoảng {totalSeconds} giây
        </p>
      </div>

      {/*
        Trên điện thoại khung hình quá nhỏ để vừa vẽ vừa đè tiêu đề, nên tiêu
        đề xuống đây cùng câu diễn giải. min-h giữ chỗ sẵn để trang không nhảy
        mỗi lần đổi cảnh.
      */}
      <div key={scene.id} className="clip-fade-up mt-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:hidden">
          {scene.step && (
            <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              Điều {scene.step}
            </span>
          )}
          <h2 className="text-base font-bold text-slate-900">{scene.title}</h2>
        </div>
        <p className="mt-1 min-h-[4.5rem] text-slate-600 sm:mt-0 sm:min-h-[3rem]">
          {scene.caption}
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {scene.title}. {scene.caption}
      </p>
    </div>
  );
}
