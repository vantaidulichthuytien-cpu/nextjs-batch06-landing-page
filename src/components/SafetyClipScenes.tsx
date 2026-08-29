import type { ComponentType } from "react";

/*
  Kho hoạt cảnh cho clip "Hướng dẫn an toàn khi ngồi trên xe khách".

  Mỗi cảnh là một <svg> khung 800x450 (tỉ lệ 16:9) vẽ bằng SVG tĩnh, phần
  chuyển động do các lớp CSS "clip-*" trong globals.css đảm nhiệm. Trình phát
  (SafetyClip.tsx) chỉ gắn đúng một cảnh vào DOM tại một thời điểm nên các id
  trong <defs> không bị trùng, và mỗi lần đổi cảnh là một lần remount nên
  animation luôn chạy lại từ đầu — nhờ vậy đồng hồ CSS khớp với đồng hồ của
  trình phát.

  Hai quy ước khi vẽ thêm cảnh mới:
  - Dải chữ phụ đề che khoảng 80 đơn vị dưới cùng, nên mọi chi tiết quan
    trọng phải nằm trên y = 360.
  - Cảnh nào có hai trạng thái "sai rồi → làm đúng" thì dùng .clip-phase-a
    (nửa đầu) và .clip-phase-b (nửa sau).
*/

const SKIN = "#f2c6a0";
const SKIN_DARK = "#e0ac83";
const SHIRT = "#2563eb";
const SHIRT_DARK = "#1d4ed8";
const PANTS = "#334155";
const SEAT = "#64748b";
const SEAT_DARK = "#475569";
const FLOOR_Y = 348;

/* ---------------------------------------------------------------- nền xe */

function CabinBackdrop() {
  return (
    <g>
      <rect width="800" height="450" fill="#f1f5f9" />
      {/* trần xe và tay vịn chạy dọc khoang */}
      <path d="M0 0h800v44q-400 34-800 0z" fill="#e2e8f0" />
      <rect x="40" y="62" width="720" height="10" rx="5" fill="#cbd5e1" />
      {/* cửa sổ, cảnh vật chạy qua để thấy xe đang lăn bánh */}
      <g>
        <clipPath id="cabin-window">
          <rect x="56" y="92" width="320" height="132" rx="18" />
        </clipPath>
        <rect x="56" y="92" width="320" height="132" rx="18" fill="#cfe4fb" />
        <g clipPath="url(#cabin-window)">
          <rect x="56" y="186" width="320" height="38" fill="#a7d8a9" />
          <g className="clip-scroll">
            {[0, 165, 330, 495].map((x) => (
              <g key={x} transform={`translate(${x} 0)`}>
                <rect x="86" y="130" width="9" height="60" fill="#94a3b8" />
                <circle cx="146" cy="158" r="30" fill="#86c98a" />
                <rect x="141" y="172" width="10" height="22" fill="#8a6a4a" />
              </g>
            ))}
          </g>
        </g>
        <rect
          x="56"
          y="92"
          width="320"
          height="132"
          rx="18"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="8"
        />
        <rect x="52" y="228" width="328" height="12" rx="6" fill="#cbd5e1" />
      </g>
      {/* sàn xe */}
      <rect y={FLOOR_Y} width="800" height={450 - FLOOR_Y} fill="#cbd5e1" />
      <rect y={FLOOR_Y} width="800" height="7" fill="#94a3b8" opacity="0.6" />
    </g>
  );
}

/* --------------------------------------------------------- người ngồi ghế */

/* Gốc toạ độ (0,0) đặt tại mép trước của nệm ghế. Người quay mặt sang phải. */
function SeatSide() {
  return (
    <g>
      <rect x="-56" y="-190" width="54" height="200" rx="18" fill={SEAT} />
      <rect x="-58" y="-238" width="52" height="54" rx="18" fill={SEAT_DARK} />
      <rect x="-50" y="-176" width="34" height="170" rx="14" fill="#7c8ba1" />
      <rect x="-56" y="0" width="152" height="36" rx="16" fill={SEAT} />
      <rect x="-34" y="34" width="16" height="48" rx="7" fill={SEAT_DARK} />
      <rect x="58" y="34" width="16" height="48" rx="7" fill={SEAT_DARK} />
    </g>
  );
}

function PersonSide({ shirt = SHIRT }: { shirt?: string }) {
  return (
    <g>
      {/* đùi và cẳng chân */}
      <path d="M2 -8h92a14 14 0 0 1 14 14v6a14 14 0 0 1-14 14H2z" fill={PANTS} />
      <path
        d="M92 4l14 62"
        stroke={PANTS}
        strokeWidth="26"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="112" cy="76" rx="26" ry="12" fill="#0f172a" />
      {/* thân */}
      <path d="M0 -96q30 -14 60 0l8 92q-38 12 -76 0z" fill={shirt} />
      {/* tay */}
      <path
        d="M52 -76q30 18 26 54"
        stroke={SHIRT_DARK}
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="80" cy="-20" r="11" fill={SKIN} />
      {/* cổ và đầu */}
      <rect x="20" y="-116" width="24" height="24" rx="10" fill={SKIN_DARK} />
      <circle cx="36" cy="-136" r="32" fill={SKIN} />
      <path d="M6 -142a32 32 0 0 1 62 -8q-30 -14 -62 8z" fill="#1f2937" />
      <circle cx="52" cy="-138" r="3.4" fill="#0f172a" />
    </g>
  );
}

function Belt({ drawn = false }: { drawn?: boolean }) {
  const cls = drawn ? "clip-draw" : "";
  return (
    <g>
      <path
        d="M14 -104L58 -6"
        pathLength={1}
        className={cls}
        stroke="#e2e8f0"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M-2 -2L60 4"
        pathLength={1}
        className={cls}
        style={drawn ? { animationDelay: "0.9s" } : undefined}
        stroke="#e2e8f0"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      <g
        className={drawn ? "clip-pop" : ""}
        style={drawn ? { animationDelay: "1.7s" } : undefined}
      >
        <rect x="52" y="-14" width="30" height="24" rx="7" fill="#dc2626" />
        <rect x="60" y="-7" width="14" height="5" rx="2.5" fill="#fecaca" />
      </g>
    </g>
  );
}

/* Người đứng, gốc toạ độ đặt ở hông. */
function PersonStanding({ shirt = "#ef4444" }: { shirt?: string }) {
  return (
    <g>
      <path d="M-6 100l-10 116h26l8-116z" fill={PANTS} />
      <path d="M22 100l16 116h26l-16-116z" fill={PANTS} />
      <ellipse cx="4" cy="220" rx="24" ry="11" fill="#0f172a" />
      <ellipse cx="58" cy="220" rx="24" ry="11" fill="#0f172a" />
      <path d="M-10 0q30-14 60 0l12 108q-42 14-84 0z" fill={shirt} />
      <path
        d="M46 14q40 22 44-30"
        stroke={shirt}
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="92" cy="-20" r="11" fill={SKIN} />
      <rect x="12" y="-24" width="24" height="26" rx="10" fill={SKIN_DARK} />
      <circle cx="24" cy="-46" r="32" fill={SKIN} />
      <path d="M-6 -52a32 32 0 0 1 62-8q-30-14-62 8z" fill="#1f2937" />
      <circle cx="40" cy="-48" r="3.4" fill="#0f172a" />
    </g>
  );
}

/* ------------------------------------------------------------- huy hiệu */

function NoBadge({ x, y, size = 54, delay = 0 }: { x: number; y: number; size?: number; delay?: number }) {
  return (
    <g
      className="clip-pop"
      style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${delay}s` }}
    >
      <circle cx={x} cy={y} r={size / 2} fill="#dc2626" />
      <path
        d={`M${x - size / 5} ${y - size / 5}L${x + size / 5} ${y + size / 5}M${
          x + size / 5
        } ${y - size / 5}L${x - size / 5} ${y + size / 5}`}
        stroke="#fff"
        strokeWidth={size / 9}
        strokeLinecap="round"
      />
    </g>
  );
}

function OkBadge({ x, y, size = 54, delay = 0 }: { x: number; y: number; size?: number; delay?: number }) {
  return (
    <g
      className="clip-pop"
      style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${delay}s` }}
    >
      <circle cx={x} cy={y} r={size / 2} fill="#16a34a" />
      <path
        d={`M${x - size / 4.5} ${y}l${size / 7} ${size / 7} ${size / 3} -${size / 3.4}`}
        stroke="#fff"
        strokeWidth={size / 9}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

function Label({
  x,
  y,
  text,
  tone = "dark",
}: {
  x: number;
  y: number;
  text: string;
  tone?: "dark" | "red" | "green";
}) {
  const bg = tone === "red" ? "#dc2626" : tone === "green" ? "#16a34a" : "#0f172a";
  const w = text.length * 11 + 34;
  return (
    <g>
      <rect x={x - w / 2} y={y - 20} width={w} height="40" rx="20" fill={bg} />
      <text x={x} y={y + 7} textAnchor="middle" fill="#fff" fontSize="20" fontWeight="600">
        {text}
      </text>
    </g>
  );
}

/* ================================================================ CẢNH 1 */

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g className="clip-spin" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
      <circle cx={cx} cy={cy} r={r} fill="#0f172a" />
      <circle cx={cx} cy={cy} r={r * 0.52} fill="#cbd5e1" />
      <circle cx={cx} cy={cy} r={r * 0.18} fill="#64748b" />
      {[0, 60, 120].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const dx = Math.cos(rad) * r * 0.44;
        const dy = Math.sin(rad) * r * 0.44;
        return (
          <path
            key={angle}
            d={`M${cx - dx} ${cy - dy}L${cx + dx} ${cy + dy}`}
            stroke="#94a3b8"
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function SceneIntro() {
  return (
    <svg viewBox="0 0 800 450" className="h-full w-full" role="img" aria-label="Xe khách chạy trên đường quê">
      <defs>
        <linearGradient id="intro-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#intro-sky)" />
      <circle cx="672" cy="74" r="38" fill="#fcd34d" className="clip-glow" />
      <path d="M0 236q150-84 310 0t490-16v62H0z" fill="#bbf7d0" />
      <path d="M0 264q200-60 420 0t380-6v54H0z" fill="#86efac" />
      <rect y="288" width="800" height="162" fill="#334155" />
      <g className="clip-scroll-fast">
        {[-120, 0, 120, 240, 360, 480, 600, 720, 840].map((x) => (
          <rect key={x} x={x} y="330" width="64" height="10" rx="5" fill="#f8fafc" />
        ))}
      </g>

      {/* xe khách nhìn ngang */}
      <g className="clip-bob">
        <rect x="176" y="116" width="452" height="170" rx="30" fill="#2563eb" />
        <rect x="176" y="226" width="452" height="26" fill="#1d4ed8" />
        <rect x="196" y="140" width="112" height="66" rx="12" fill="#cfe4fb" />
        <rect x="320" y="140" width="96" height="66" rx="12" fill="#cfe4fb" />
        <rect x="428" y="140" width="96" height="66" rx="12" fill="#cfe4fb" />
        <path d="M536 140h72q20 0 20 22v44h-92z" fill="#cfe4fb" />
        <rect x="352" y="226" width="60" height="60" rx="8" fill="#1e40af" />
        <rect x="200" y="262" width="80" height="10" rx="5" fill="#93c5fd" />
        <Wheel cx={264} cy={292} r={40} />
        <Wheel cx={546} cy={292} r={40} />
      </g>

      <g className="clip-fade-in" style={{ animationDelay: "0.6s" }}>
        <path d="M96 190h48M84 222h60" stroke="#60a5fa" strokeWidth="12" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ================================================================ CẢNH 2 */

function SceneSeatBelt() {
  return (
    <svg viewBox="0 0 800 450" className="h-full w-full" role="img" aria-label="Hành khách thắt dây an toàn trên ghế">
      <CabinBackdrop />
      <g transform="translate(440 280) scale(0.82)">
        <SeatSide />
        <PersonSide />
        <Belt drawn />
      </g>
      <OkBadge x={660} y={140} delay={2.2} />
      <g className="clip-fade-in" style={{ animationDelay: "2.5s" }}>
        <Label x={620} y={220} text="Nghe tiếng tách" tone="green" />
      </g>
    </svg>
  );
}

/* ================================================================ CẢNH 3 */

function SceneStaySeated() {
  return (
    <svg viewBox="0 0 800 450" className="h-full w-full" role="img" aria-label="Không đứng dậy đi lại khi xe đang chạy">
      <CabinBackdrop />
      {/* quai nắm trên trần, chỗ bám của người đứng */}
      <g className="clip-phase-a">
        <path d="M292 72v52" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
        <rect x="274" y="122" width="36" height="30" rx="15" fill="none" stroke="#94a3b8" strokeWidth="7" />
        <g transform="translate(500 280) scale(0.82)">
          <SeatSide />
        </g>
        <g className="clip-wobble" style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}>
          <g transform="translate(214 172) scale(0.8)">
            <PersonStanding />
          </g>
        </g>
        <NoBadge x={140} y={276} />
        <Label x={620} y={110} text="Xe phanh gấp" tone="red" />
      </g>

      {/* nửa sau: ngồi yên tại ghế, cần gì thì gọi phụ xe */}
      <g className="clip-phase-b">
        <g transform="translate(440 280) scale(0.82)">
          <SeatSide />
          <PersonSide />
          <Belt />
        </g>
        <OkBadge x={660} y={140} delay={3.4} />
        <Label x={620} y={230} text="Ngồi yên tại chỗ" tone="green" />
      </g>
    </svg>
  );
}

/* ================================================================ CẢNH 4 */

function SceneNoHandsOut() {
  return (
    <svg viewBox="0 0 800 450" className="h-full w-full" role="img" aria-label="Không thò đầu, thò tay ra ngoài cửa sổ">
      <defs>
        <linearGradient id="out-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe4fb" />
          <stop offset="100%" stopColor="#eff6ff" />
        </linearGradient>
        <clipPath id="out-window">
          <rect x="40" y="96" width="360" height="150" rx="16" />
        </clipPath>
      </defs>
      <rect width="800" height="450" fill="url(#out-sky)" />
      <rect y="330" width="800" height="120" fill="#475569" />

      {/* cây ven đường vun vút lướt qua sát thành xe */}
      <g className="clip-swipe">
        {[0, 380].map((x) => (
          <g key={x} transform={`translate(${x} 0)`}>
            <rect x="596" y="120" width="24" height="210" rx="8" fill="#8a6a4a" />
            <circle cx="608" cy="118" r="56" fill="#4ade80" />
            <circle cx="574" cy="150" r="34" fill="#22c55e" />
          </g>
        ))}
      </g>

      {/* thành xe nhìn từ bên ngoài */}
      <g>
        <rect x="-40" y="46" width="480" height="290" rx="30" fill="#2563eb" />
        <rect x="-40" y="286" width="480" height="22" fill="#1d4ed8" />
        <rect x="40" y="96" width="360" height="150" rx="16" fill="#1e3a8a" />
        <g clipPath="url(#out-window)">
          <rect x="40" y="96" width="360" height="150" fill="#93c5fd" opacity="0.5" />
          {/* nửa người bên trong xe */}
          <g transform="translate(150 300) scale(0.9)">
            <PersonSide />
          </g>
        </g>
        <rect x="40" y="96" width="360" height="150" rx="16" fill="none" stroke="#bfdbfe" strokeWidth="9" />
      </g>

      {/* cánh tay thò hẳn ra ngoài khung cửa */}
      <g className="clip-phase-a">
        <path
          d="M206 214q160-64 338-2"
          stroke={SHIRT_DARK}
          strokeWidth="26"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="552" cy="222" r="18" fill={SKIN} />
        <NoBadge x={614} y={286} size={62} delay={0.9} />
        <Label x={600} y={82} text="Rất nguy hiểm" tone="red" />
      </g>

      <g className="clip-phase-b">
        <rect x="46" y="102" width="348" height="138" rx="14" fill="#bfdbfe" opacity="0.35" />
        <OkBadge x={614} y={286} size={62} delay={3.4} />
        <Label x={600} y={82} text="Giữ tay trong xe" tone="green" />
      </g>
    </svg>
  );
}

/* ================================================================ CẢNH 5 */

function SceneLuggage() {
  return (
    <svg viewBox="0 0 800 450" className="h-full w-full" role="img" aria-label="Sắp xếp hành lý gọn gàng, lối đi thông thoáng">
      <CabinBackdrop />
      {/* giá để đồ phía trên hàng ghế */}
      <rect x="430" y="168" width="350" height="16" rx="8" fill="#94a3b8" />
      <rect x="430" y="184" width="350" height="9" rx="4" fill="#cbd5e1" />

      <g className="clip-phase-a">
        {/* vali nặng để hờ trên giá, xe xóc là rơi */}
        <g className="clip-fall">
          <rect x="500" y="102" width="112" height="66" rx="12" fill="#f97316" />
          <rect x="536" y="90" width="40" height="16" rx="8" fill="#c2410c" />
          <rect x="500" y="128" width="112" height="10" fill="#c2410c" />
        </g>
        {/* túi chắn ngang lối đi */}
        <rect x="104" y="282" width="146" height="66" rx="18" fill="#a855f7" />
        <path d="M152 282v-12a26 16 0 0 1 50 0v12" stroke="#7e22ce" strokeWidth="10" fill="none" />
        <NoBadge x={120} y={268} />
        <Label x={620} y={276} text="Đồ chắn lối đi" tone="red" />
      </g>

      <g className="clip-phase-b">
        {/* đồ nhẹ cài chắc trên giá, lối đi trống trải */}
        <rect x="500" y="128" width="112" height="52" rx="12" fill="#38bdf8" />
        <rect x="500" y="146" width="112" height="9" fill="#0284c7" />
        <path d="M492 138h128" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
        <OkBadge x={666} y={122} delay={3.4} />
        <path
          d="M96 320h240"
          stroke="#16a34a"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="4 24"
        />
        <Label x={620} y={276} text="Lối đi thông thoáng" tone="green" />
      </g>
    </svg>
  );
}

/* ================================================================ CẢNH 6 */

function SceneChildren() {
  return (
    <svg viewBox="0 0 800 450" className="h-full w-full" role="img" aria-label="Trẻ em ngồi phía trong, luôn có người lớn đi kèm">
      <CabinBackdrop />
      {/* người lớn ngồi phía ngoài, sát lối đi */}
      <g transform="translate(560 280) scale(0.82)">
        <SeatSide />
        <PersonSide />
        <Belt />
      </g>
      {/* trẻ nhỏ ngồi phía trong, sát cửa sổ */}
      <g transform="translate(392 286) scale(0.62)">
        <SeatSide />
        <PersonSide shirt="#f59e0b" />
        <Belt />
      </g>
      {/* người lớn nắm tay trẻ */}
      <path
        d="M540 216q-40 22 -84 12"
        stroke={SKIN_DARK}
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="452" cy="226" r="10" fill={SKIN} />
      <g className="clip-fade-in" style={{ animationDelay: "0.6s" }}>
        <Label x={216} y={286} text="Ghế phía trong" tone="dark" />
        <path
          d="M320 276q40-4 54-24"
          stroke="#0f172a"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          markerEnd=""
        />
      </g>
      <OkBadge x={716} y={128} delay={1.6} />
    </svg>
  );
}

/* ================================================================ CẢNH 7 */

function SceneMotionSickness() {
  return (
    <svg viewBox="0 0 800 450" className="h-full w-full" role="img" aria-label="Cách hạn chế say xe: nhìn xa về phía trước">
      <CabinBackdrop />
      <g transform="translate(360 280) scale(0.82)">
        <SeatSide />
        <PersonSide />
      </g>

      {/* nửa đầu: cắm cúi vào điện thoại trong lúc xe rung lắc */}
      <g className="clip-phase-a">
        <g className="clip-wobble" style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}>
          <rect x="430" y="222" width="52" height="86" rx="12" fill="#0f172a" />
          <rect x="437" y="232" width="38" height="60" rx="5" fill="#e2e8f0" />
        </g>
        <NoBadge x={520} y={210} />
        <Label x={620} y={300} text="Hạn chế màn hình" tone="red" />
      </g>

      {/* nửa sau: nhìn xa về phía trước cho đỡ say */}
      <g className="clip-phase-b">
        <path
          d="M436 166q118-46 250-42"
          stroke="#16a34a"
          strokeWidth="8"
          strokeDasharray="14 14"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx="690"
          cy="126"
          r="30"
          fill="#16a34a"
          className="clip-pulse"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <circle cx="690" cy="126" r="14" fill="#16a34a" />
        <Label x={620} y={300} text="Nhìn xa phía trước" tone="green" />
      </g>
    </svg>
  );
}

/* ================================================================ CẢNH 8 */

function SceneEquipment() {
  const items = [
    { x: 150, label: "Búa phá kính" },
    { x: 400, label: "Bình cứu hoả" },
    { x: 650, label: "Cửa thoát hiểm" },
  ];
  return (
    <svg viewBox="0 0 800 450" className="h-full w-full" role="img" aria-label="Vị trí búa phá kính, bình cứu hoả và cửa thoát hiểm">
      <rect width="800" height="450" fill="#f1f5f9" />
      <path d="M0 0h800v44q-400 34-800 0z" fill="#e2e8f0" />
      <rect y={FLOOR_Y} width="800" height={450 - FLOOR_Y} fill="#cbd5e1" />

      {items.map((item, i) => (
        <g key={item.label} className="clip-fade-up" style={{ animationDelay: `${0.3 + i * 0.7}s` }}>
          <rect
            x={item.x - 96}
            y="76"
            width="192"
            height="184"
            rx="26"
            fill="#fff"
            stroke="#e2e8f0"
            strokeWidth="4"
          />
          {i === 0 && (
            <g transform={`translate(${item.x} 168)`}>
              <rect x="-9" y="-32" width="18" height="86" rx="9" fill="#dc2626" />
              <rect x="-32" y="-58" width="64" height="26" rx="8" fill="#475569" />
              <path d="M-32 -58l-22 13 22 13z" fill="#475569" />
              <path d="M32 -58l22 13-22 13z" fill="#475569" />
              <rect x="-9" y="20" width="18" height="34" rx="9" fill="#991b1b" />
            </g>
          )}
          {i === 1 && (
            <g transform={`translate(${item.x} 168)`}>
              <rect x="-30" y="-34" width="60" height="88" rx="18" fill="#dc2626" />
              <rect x="-11" y="-56" width="22" height="24" rx="8" fill="#334155" />
              <path d="M11 -50h32" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
              <rect x="-22" y="-10" width="44" height="28" rx="6" fill="#fecaca" />
            </g>
          )}
          {i === 2 && (
            <g transform={`translate(${item.x} 168)`}>
              <rect x="-44" y="-52" width="88" height="106" rx="12" fill="#16a34a" />
              <path d="M-14 -28l-16 30h16l-6 26 24-34h-16l14-22z" fill="#fff" className="clip-blink" />
              <rect x="8" y="-14" width="28" height="32" rx="6" fill="#bbf7d0" />
            </g>
          )}
          <Label x={item.x} y={306} text={item.label} tone="dark" />
        </g>
      ))}
    </svg>
  );
}

/* ================================================================ CẢNH 9 */

function SceneGetOff() {
  return (
    <svg viewBox="0 0 800 450" className="h-full w-full" role="img" aria-label="Chờ xe dừng hẳn rồi xuống phía lề đường">
      <defs>
        <linearGradient id="off-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#off-sky)" />
      <rect y="286" width="800" height="164" fill="#475569" />
      <rect y="286" width="800" height="7" fill="#94a3b8" />

      {/* thân xe đã đỗ sát lề, cửa mở, có bậc bước xuống */}
      <g>
        <rect x="-60" y="30" width="460" height="228" rx="26" fill="#2563eb" />
        <rect x="-60" y="214" width="460" height="20" fill="#1d4ed8" />
        <rect x="-30" y="66" width="170" height="74" rx="12" fill="#cfe4fb" />
        <rect x="170" y="66" width="120" height="184" rx="12" fill="#1e3a8a" />
        <g className="clip-door">
          <rect x="172" y="68" width="56" height="180" rx="10" fill="#93c5fd" opacity="0.9" />
        </g>
        <g className="clip-door" style={{ transformOrigin: "right center" }}>
          <rect x="232" y="68" width="56" height="180" rx="10" fill="#93c5fd" opacity="0.9" />
        </g>
        <rect x="186" y="250" width="118" height="14" rx="6" fill="#1e40af" />
        <circle cx="40" cy="272" r="34" fill="#0f172a" />
        <circle cx="40" cy="272" r="14" fill="#94a3b8" />
        <circle cx="332" cy="272" r="34" fill="#0f172a" />
        <circle cx="332" cy="272" r="14" fill="#94a3b8" />
      </g>

      {/* xe máy vượt lên phía sau — nhìn kỹ trước khi bước xuống */}
      <g className="clip-pass">
        <circle cx="60" cy="330" r="26" fill="#0f172a" />
        <circle cx="60" cy="330" r="10" fill="#94a3b8" />
        <circle cx="152" cy="330" r="26" fill="#0f172a" />
        <circle cx="152" cy="330" r="10" fill="#94a3b8" />
        <path d="M60 330l34-48h58l-24 48z" fill="#f59e0b" />
        <path d="M96 282h44" stroke="#b45309" strokeWidth="10" strokeLinecap="round" />
        <path d="M104 282l-6-46" stroke="#0f172a" strokeWidth="12" strokeLinecap="round" />
        <path d="M96 270q22-30 44-6" stroke="#1d4ed8" strokeWidth="24" strokeLinecap="round" fill="none" />
        <circle cx="126" cy="234" r="19" fill={SKIN} />
        <path d="M107 232a19 19 0 0 1 38-2z" fill="#dc2626" />
      </g>

      {/* hành khách vừa bước xuống, đứng phía trước xe máy nên vẽ sau */}
      <g className="clip-step">
        <g transform="translate(430 183) scale(0.8)">
          <PersonStanding shirt={SHIRT} />
        </g>
      </g>

      <g className="clip-fade-in" style={{ animationDelay: "1.8s" }}>
        <Label x={630} y={86} text="Quan sát rồi mới bước" tone="green" />
        <path d="M630 112v34" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
        <path d="M618 138l12 14 12-14" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

/* =============================================================== CẢNH 10 */

function SceneOutro({ phone }: { phone: string }) {
  return (
    <svg viewBox="0 0 800 450" className="h-full w-full" role="img" aria-label="Chúc quý khách thượng lộ bình an">
      <defs>
        <linearGradient id="outro-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#outro-bg)" />
      {/* fill-opacity chứ không phải opacity: lớp clip-glow có animate opacity */}
      {[110, 300, 520, 700].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={50 + i * 66}
          r={86 - i * 12}
          fill="#3b82f6"
          fillOpacity="0.16"
          className="clip-glow"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
      <g className="clip-pop" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d="M400 54l84 30v74c0 53-35 98-84 114-49-16-84-61-84-114V84z" fill="#22c55e" />
        <path
          d="M362 164l26 26 52-56"
          stroke="#fff"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      <g className="clip-fade-up" style={{ animationDelay: "0.7s" }}>
        <rect x="186" y="288" width="428" height="62" rx="31" fill="#fff" />
        <text x="400" y="330" textAnchor="middle" fill="#0f172a" fontSize="30" fontWeight="700">
          Hotline {phone}
        </text>
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- kịch bản */

export interface SafetyScene {
  id: string;
  /** Số thứ tự hiển thị; cảnh mở đầu và kết thúc không đánh số. */
  step?: number;
  title: string;
  caption: string;
  /** Thời lượng cảnh, tính bằng mili giây. */
  duration: number;
  Illustration: ComponentType;
}

export function buildSafetyScenes(phone: string): SafetyScene[] {
  return [
    {
      id: "mo-dau",
      title: "Hướng dẫn an toàn khi ngồi trên xe khách",
      caption:
        "8 thói quen nhỏ giúp cả đoàn đi tới nơi, về tới chốn. Xem hết chưa tới một phút.",
      duration: 5000,
      Illustration: SceneIntro,
    },
    {
      id: "day-an-toan",
      step: 1,
      title: "Thắt dây an toàn ngay khi vừa ngồi xuống",
      caption:
        "Mọi hàng ghế đều cần, kể cả ghế sau. Dây vắt qua vai và ôm ngang hông, không luồn dưới nách hay vòng ra sau lưng.",
      duration: 5800,
      Illustration: SceneSeatBelt,
    },
    {
      id: "ngoi-yen",
      step: 2,
      title: "Ngồi yên tại chỗ, không đi lại khi xe đang chạy",
      caption:
        "Một cú phanh gấp chỉ diễn ra trong tích tắc. Cần gì, quý khách báo phụ xe thay vì tự đứng dậy.",
      duration: 5800,
      Illustration: SceneStaySeated,
    },
    {
      id: "khong-tho-tay",
      step: 3,
      title: "Không thò đầu, thò tay ra ngoài cửa sổ",
      caption:
        "Xe ngược chiều và cây ven đường đi sát thành xe hơn quý khách tưởng rất nhiều.",
      duration: 5800,
      Illustration: SceneNoHandsOut,
    },
    {
      id: "hanh-ly",
      step: 4,
      title: "Hành lý gọn gàng, lối đi luôn thông thoáng",
      caption:
        "Đồ nặng gửi khoang hành lý, đồ nhẹ để trên giá và cài chắc. Không đặt túi chắn lối đi hay cửa thoát hiểm.",
      duration: 5800,
      Illustration: SceneLuggage,
    },
    {
      id: "tre-em",
      step: 5,
      title: "Trẻ em ngồi phía trong, luôn có người lớn đi kèm",
      caption:
        "Không để trẻ đứng trên ghế, chạy nhảy trong xe hay ngồi một mình sát cửa lên xuống.",
      duration: 5800,
      Illustration: SceneChildren,
    },
    {
      id: "say-xe",
      step: 6,
      title: "Say xe thì nhìn xa về phía trước",
      caption:
        "Chọn ghế phía trên, hạn chế nhìn màn hình điện thoại, hé cửa gió cho thoáng và hít thở đều.",
      duration: 5800,
      Illustration: SceneMotionSickness,
    },
    {
      id: "thiet-bi-an-toan",
      step: 7,
      title: "Nhớ chỗ để búa phá kính, bình cứu hoả và cửa thoát hiểm",
      caption:
        "Vừa lên xe, quý khách nhìn một lượt quanh khoang. Mười giây thôi là đủ nhớ.",
      duration: 6400,
      Illustration: SceneEquipment,
    },
    {
      id: "xuong-xe",
      step: 8,
      title: "Xe dừng hẳn mới đứng dậy và xuống xe",
      caption:
        "Xuống về phía lề đường, quan sát xe máy phía sau trước khi bước, rồi mới lấy hành lý.",
      duration: 5800,
      Illustration: SceneGetOff,
    },
    {
      id: "ket",
      title: "Thượng lộ bình an cùng Nhà Xe Thủy Tiên",
      caption:
        "Tài xế của chúng tôi phổ biến an toàn trước mỗi chuyến. Cần hỗ trợ, quý khách gọi ngay bất kể giờ nào.",
      duration: 6000,
      Illustration: () => <SceneOutro phone={phone} />,
    },
  ];
}
