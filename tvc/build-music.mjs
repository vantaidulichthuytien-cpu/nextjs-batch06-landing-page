/**
 * Nhạc nền cho TVC 30 giây — tự tổng hợp bằng JS, không dùng mẫu âm của bên
 * thứ ba nên không vướng bản quyền khi chạy quảng cáo.
 *
 *   node tvc/build-music.mjs [đường/dẫn/ra.wav]
 *
 * Nhịp 120 BPM (1 ô nhịp = 2.0s) trùng đúng các cú cắt cảnh trong
 * scene-16x9.html: 4.0 · 8.0 · 14.0 · 22.0 · 26.0 giây.
 */
import { writeFileSync } from 'node:fs';

const SR = 48000, DUR = 30.0, N = Math.round(SR * DUR);
const BEAT = 0.5, BAR = 2.0;

const dryL = new Float32Array(N), dryR = new Float32Array(N), send = new Float32Array(N);
const mid = m => 440 * Math.pow(2, (m - 69) / 12);

/* Nhiễu trắng tất định — cùng seed thì lần render nào cũng ra đúng bản nhạc đó. */
let seed = 0x2f6e2b1;
const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296 * 2 - 1;

function add(i, l, r, wet) {
  if (i < 0 || i >= N) return;
  dryL[i] += l; dryR[i] += r; send[i] += wet;
}

/** Giọng có hoà âm (pad, pluck, bass, chuông). */
function tone(t0, dur, freq, {
  gain = .2, parts = [1], detune = [0], atk = .01, dec = .1, sus = .8, rel = .3,
  pan = 0, wet = .25, exp: expDecay = 0,
} = {}) {
  const s0 = Math.round(t0 * SR), n = Math.round(dur * SR);
  const pl = Math.cos((pan + 1) * Math.PI / 4), pr = Math.sin((pan + 1) * Math.PI / 4);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let env;
    if (expDecay) env = Math.exp(-t / expDecay) * (t < atk ? t / atk : 1);
    else if (t < atk) env = t / atk;
    else if (t < atk + dec) env = 1 - (1 - sus) * (t - atk) / dec;
    else if (t < dur - rel) env = sus;
    else env = sus * Math.max(0, (dur - t) / rel);
    if (env <= 0) continue;
    let v = 0;
    for (const d of detune) {
      const f = freq * Math.pow(2, d / 1200);
      for (let h = 0; h < parts.length; h++) v += parts[h] * Math.sin(2 * Math.PI * f * (h + 1) * t);
    }
    v *= gain * env / (detune.length);
    add(s0 + i, v * pl, v * pr, v * wet);
  }
}

/** Nhiễu lọc — dùng cho trống, hi-hat, tiếng riser. */
function noise(t0, dur, { gain = .2, hp = .5, decay = .06, pan = 0, wet = .2, sweep = 0 } = {}) {
  const s0 = Math.round(t0 * SR), n = Math.round(dur * SR);
  const pl = Math.cos((pan + 1) * Math.PI / 4), pr = Math.sin((pan + 1) * Math.PI / 4);
  let prev = 0, lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR, p = t / dur;
    const x = rnd();
    const a = sweep ? hp + (sweep - hp) * p : hp;       // hệ số lọc thông cao chạy dần
    lp = lp + (1 - a) * (x - lp);
    const y = x - lp;                                    // thông cao đơn giản
    const env = sweep ? Math.pow(p, 1.6) : Math.exp(-t / decay);
    const v = y * gain * env;
    prev = y;
    add(s0 + i, v * pl, v * pr, v * wet);
  }
}

function kick(t0, gain = .95) {
  const n = Math.round(.4 * SR), s0 = Math.round(t0 * SR);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = 42 + 105 * Math.exp(-t / .028);
    ph += 2 * Math.PI * f / SR;
    const v = Math.sin(ph) * gain * Math.exp(-t / .155);
    add(s0 + i, v, v, v * .06);
  }
  noise(t0, .02, { gain: .25, hp: .55, decay: .008, wet: .05 });
}

function snare(t0, gain = .38) {
  noise(t0, .22, { gain: gain, hp: .32, decay: .075, wet: .3 });
  tone(t0, .12, 190, { gain: gain * .5, parts: [1, .3], exp: .05, wet: .2 });
}
const hat = (t0, g = .13) => noise(t0, .07, { gain: g, hp: .06, decay: .026, pan: .12, wet: .12 });

function impact(t0, gain = 1) {
  tone(t0, 1.1, 55, { gain: .55 * gain, parts: [1, .28], exp: .28, wet: .5 });
  noise(t0, .5, { gain: .3 * gain, hp: .4, decay: .12, wet: .6 });
}

/* ---------------------------------------------------------------- hoà thanh */
const CH = {
  D:  { bass: 38, pad: [62, 66, 69], arp: [62, 66, 69, 74] },
  A:  { bass: 45, pad: [61, 64, 69], arp: [61, 64, 69, 73] },
  Bm: { bass: 47, pad: [62, 66, 71], arp: [62, 66, 71, 74] },
  G:  { bass: 43, pad: [59, 62, 67], arp: [59, 62, 67, 71] },
};
/* 15 ô nhịp × 2.0s = 30s. Hai ô đầu để trống hoà thanh (đoạn nêu vấn đề). */
const BARS = [null, null, 'D', 'A', 'Bm', 'G', 'D', 'D', 'A', 'Bm', 'G', 'D', 'A', 'G', 'D'];

/* ===== Đoạn A (0–4s): căng thẳng, chỉ có drone và tiếng tích tắc ===== */
tone(0, 4.3, mid(38), { gain: .17, parts: [1, .45, .15], detune: [-6, 6], atk: .8, sus: 1, rel: 1.2, wet: .4 });
tone(0, 4.3, mid(50), { gain: .07, parts: [1, .3], detune: [-8, 8], atk: 1.2, sus: 1, rel: 1.2, wet: .5 });
tone(.4, 3.6, mid(74), { gain: .022, parts: [1, .5, .25], atk: 1.4, sus: 1, rel: 1.0, wet: .7, pan: .3 });
for (let b = 0; b < 8; b++) noise(b * BEAT, .05, { gain: b % 2 ? .05 : .085, hp: .1, decay: .012, pan: b % 2 ? .3 : -.3, wet: .18 });
noise(2.6, 1.4, { gain: .17, hp: .92, sweep: .05, wet: .45 });      // riser vào cú cắt 4.0

/* ===== Toàn bài: pad + bass theo ô nhịp ===== */
BARS.forEach((name, b) => {
  if (!name) return;
  const t = b * BAR, c = CH[name];
  const padGain = b < 4 ? .085 : b < 7 ? .10 : b < 13 ? .115 : .13;
  c.pad.forEach((m, k) => tone(t, BAR + .5, mid(m), {
    gain: padGain, parts: [1, .5, .28, .16, .09, .05], detune: [-9, 0, 9],
    atk: .22, dec: .3, sus: .85, rel: .55, pan: (k - 1) * .42, wet: .42,
  }));
  const bassGain = b < 4 ? .30 : b < 7 ? .36 : .44;
  tone(t, BEAT * 1.8, mid(c.bass), { gain: bassGain, parts: [1, .32, .12], atk: .006, exp: .34, wet: .06 });
  if (b >= 4) tone(t + BEAT * 2, BEAT * 1.8, mid(c.bass), { gain: bassGain * .9, parts: [1, .32, .12], atk: .006, exp: .32, wet: .06 });
  if (b >= 7) tone(t + BEAT * 3.5, BEAT * .7, mid(c.bass), { gain: bassGain * .55, parts: [1, .3], atk: .005, exp: .16, wet: .06 });
});

/* ===== Trống ===== */
for (let b = 2; b <= 14; b++) {
  const t = b * BAR;
  if (b <= 3) { kick(t, .78); kick(t + BEAT * 2, .6); }
  else if (b <= 6) { kick(t, .9); kick(t + BEAT * 2, .72); snare(t + BEAT, .27); snare(t + BEAT * 3, .3); }
  else if (b <= 12) {
    kick(t, 1); kick(t + BEAT * 1.5, .5); kick(t + BEAT * 2, .82);
    snare(t + BEAT, .38); snare(t + BEAT * 3, .4);
  } else if (b === 13) {                                   // ô nhịp dồn trước cú chốt
    kick(t, .95); snare(t + BEAT, .36); kick(t + BEAT * 2, .8);
    for (let i = 0; i < 4; i++) snare(t + BEAT * 3 + i * BEAT / 4, .18 + i * .07);
  } else { kick(t, 1); }                                   // ô nhịp cuối: chỉ một cú chốt
  if (b >= 4 && b <= 13) for (let i = 0; i < 8; i++) hat(t + i * BEAT / 2, i % 2 ? .07 : .12);
}

/* ===== Arpeggio (từ ô nhịp 4) ===== */
for (let b = 4; b <= 12; b++) {
  const c = CH[BARS[b]], t = b * BAR;
  for (let i = 0; i < 8; i++) {
    const seq = [0, 1, 2, 3, 2, 1, 2, 3][i];
    tone(t + i * BEAT / 2, .5, mid(c.arp[seq] + 12), {
      gain: b < 7 ? .055 : .075, parts: [1, .3, .12], atk: .004, exp: .17,
      pan: (i % 2 ? .35 : -.35), wet: .5,
    });
  }
}

/* ===== Giai điệu chuông (đoạn đội xe, cam kết và cú chốt) ===== */
const MEL = [
  [14.0, 1.0, 78], [15.0, 1.0, 81], [16.0, 1.0, 76], [17.0, 1.0, 73],
  [18.0, 1.0, 74], [19.0, 1.0, 78], [20.0, 1.0, 71], [21.0, 1.0, 74],
  [22.0, 2.0, 81], [24.0, 1.0, 78], [25.0, 1.0, 76],
  [26.0, 1.5, 74], [27.5, .5, 76], [28.0, 2.0, 81],
];
for (const [t, d, m] of MEL) {
  tone(t, d + .6, mid(m), { gain: .105, parts: [1, .0, .32, 0, .12], atk: .006, exp: d * .55, pan: .18, wet: .62 });
  tone(t, d + .4, mid(m - 12), { gain: .035, parts: [1, .25], atk: .01, exp: d * .5, pan: -.2, wet: .5 });
}

/* ===== Cú nhấn ở các điểm cắt cảnh ===== */
[4.0, 8.0, 14.0, 22.0].forEach(t => impact(t, t === 14 ? 1 : .8));
noise(12.8, 1.2, { gain: .13, hp: .92, sweep: .06, wet: .45 });
noise(24.9, 1.1, { gain: .15, hp: .92, sweep: .06, wet: .5 });
impact(26.0, .95);
impact(28.0, 1.05);
/* hợp âm Rê trưởng ngân dài khép lại quảng cáo */
[62, 66, 69, 74, 81].forEach((m, k) => tone(28.0, 2.0, mid(m), {
  gain: .085, parts: [1, .45, .24, .12, .06], detune: [-8, 8],
  atk: .02, dec: .4, sus: .7, rel: 1.4, pan: (k - 2) * .28, wet: .55,
}));
tone(28.0, 2.0, mid(38), { gain: .4, parts: [1, .3, .1], atk: .006, dec: .3, sus: .6, rel: 1.2, wet: .1 });

/* ---------------------------------------------------- vang (Schroeder gọn) */
function reverb(src) {
  const combs = [1687, 1759, 1861, 1949, 2053, 2137], gains = [.79, .78, .77, .76, .75, .74];
  const out = new Float32Array(N);
  for (let c = 0; c < combs.length; c++) {
    const d = combs[c], g = gains[c], buf = new Float32Array(d);
    let idx = 0, lp = 0;
    for (let i = 0; i < N; i++) {
      const y = buf[idx];
      out[i] += y * .3;
      lp = lp + .35 * (y - lp);                            // hút bớt tần số cao mỗi vòng
      buf[idx] = src[i] + lp * g;
      if (++idx === d) idx = 0;
    }
  }
  for (const d of [241, 557]) {                            // allpass làm mượt đuôi vang
    const buf = new Float32Array(d); let idx = 0;
    for (let i = 0; i < N; i++) {
      const y = buf[idx], x = out[i];
      buf[idx] = x + y * .5;
      out[i] = y - x * .5;
      if (++idx === d) idx = 0;
    }
  }
  return out;
}
const wetL = reverb(send);
const wetR = new Float32Array(N);
for (let i = 0; i < N; i++) wetR[i] = wetL[Math.max(0, i - 331)];   // lệch nhẹ để có bề rộng stereo

/* -------------------------------------------------------------- master mix */
const out = new Float32Array(N * 2);
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  let fade = 1;
  if (t < .03) fade = t / .03;
  if (t > 29.45) fade = Math.max(0, (30.0 - t) / .55);
  let l = (dryL[i] + wetL[i] * .34) * fade;
  let r = (dryR[i] + wetR[i] * .34) * fade;
  l = Math.tanh(l * 1.15) / 1.15;
  r = Math.tanh(r * 1.15) / 1.15;
  out[i * 2] = l; out[i * 2 + 1] = r;
  peak = Math.max(peak, Math.abs(l), Math.abs(r));
}
const norm = 0.89 / (peak || 1);

const bytes = Buffer.alloc(44 + N * 4);
bytes.write('RIFF', 0); bytes.writeUInt32LE(36 + N * 4, 4); bytes.write('WAVE', 8);
bytes.write('fmt ', 12); bytes.writeUInt32LE(16, 16); bytes.writeUInt16LE(1, 20);
bytes.writeUInt16LE(2, 22); bytes.writeUInt32LE(SR, 24); bytes.writeUInt32LE(SR * 4, 28);
bytes.writeUInt16LE(4, 32); bytes.writeUInt16LE(16, 34);
bytes.write('data', 36); bytes.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N * 2; i++) {
  bytes.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(out[i] * norm * 32767))), 44 + i * 2);
}

const dest = process.argv[2] || new URL('./out/tvc-music-30s.wav', import.meta.url).pathname;
writeFileSync(dest, bytes);
console.log('nhạc nền ->', dest, (bytes.length / 1048576).toFixed(2), 'MB · đỉnh trước chuẩn hoá', peak.toFixed(3));
