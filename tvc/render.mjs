/**
 * Render TVC: chụp từng frame của scene HTML bằng Chromium rồi ghép thành MP4.
 *
 *   node tvc/render.mjs [--scene tvc/scene-16x9.html] [--out tvc/out/ten.mp4]
 *                       [--fps 30] [--audio tvc/out/tvc-music-30s.wav]
 *                       [--preview 8.0]   # chỉ xuất 1 ảnh PNG tại giây 8.0
 *
 * Cần: playwright-core (dùng Chromium có sẵn) và ffmpeg-static.
 *   npm i -D playwright-core ffmpeg-static
 *
 * Trang được phục vụ qua HTTP nội bộ thay vì file:// để ảnh và font tải bình
 * thường. Mỗi frame gọi window.seek(t) — timeline tất định nên render lại lần
 * nào cũng ra đúng từng khung hình.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function arg(name, dflt) {
  const i = process.argv.indexOf('--' + name);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}
const scenePath = arg('scene', 'tvc/scene-16x9.html');
const outPath   = resolve(ROOT, arg('out', 'tvc/out/tvc-thuytien-16x9-30s.mp4'));
const fpsArg    = Number(arg('fps', 0));
const audio     = arg('audio', 'tvc/out/tvc-music-30s.wav');
const preview   = arg('preview', null);

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

const server = createServer(async (req, res) => {
  try {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
    const file = resolve(ROOT, rel);
    if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404).end('not found'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

const { chromium } = await import('playwright-core');
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium/chrome-linux/chrome',
  args: ['--force-color-profile=srgb', '--disable-lcd-text', '--hide-scrollbars',
         '--font-render-hinting=none', '--disable-gpu'],
});

const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto(base + scenePath, { waitUntil: 'networkidle' });

const meta = await page.evaluate(() => window.TVC);
const FPS = fpsArg || meta.fps;
await page.setViewportSize({ width: meta.width, height: meta.height });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => Promise.all(
  [...document.images].map(img => img.complete ? null : new Promise(r => { img.onload = img.onerror = r; }))
));

mkdirSync(dirname(outPath), { recursive: true });

if (preview !== null) {                       // chế độ xem thử: xuất 1 khung hình
  const shots = String(preview).split(',').map(Number);
  for (const t of shots) {
    await page.evaluate(tt => window.seek(tt), t);
    const p = join(dirname(outPath), `preview-${String(t).replace('.', '_')}s.png`);
    await page.screenshot({ path: p, type: 'png' });
    console.log('ảnh xem thử ->', p);
  }
  await browser.close(); server.close();
  process.exit(0);
}

const ffmpeg = (await import('ffmpeg-static')).default;
const audioAbs = resolve(ROOT, audio);
const hasAudio = existsSync(audioAbs);
const ff = spawn(ffmpeg, [
  '-y', '-hide_banner', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
  ...(hasAudio ? ['-i', audioAbs] : []),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p',
  '-profile:v', 'high', '-level', '4.1', '-g', String(FPS * 2),
  ...(hasAudio ? ['-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest'] : ['-an']),
  '-movflags', '+faststart', outPath,
]);
ff.stderr.on('data', d => process.stderr.write(d));

const total = Math.round(meta.duration * FPS);
const t0 = Date.now();
for (let f = 0; f < total; f++) {
  const t = f / FPS;
  await page.evaluate(tt => window.seek(tt), t);
  const buf = await page.screenshot({ type: 'jpeg', quality: 96 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (f % 60 === 0 || f === total - 1) {
    const pct = ((f + 1) / total * 100).toFixed(0);
    const el = (Date.now() - t0) / 1000;
    process.stdout.write(`\r  frame ${f + 1}/${total} (${pct}%)  ${el.toFixed(0)}s trôi qua   `);
  }
}
ff.stdin.end();
await new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg thoát mã ' + c))));
await browser.close();
server.close();
console.log(`\nxong -> ${outPath}`);
