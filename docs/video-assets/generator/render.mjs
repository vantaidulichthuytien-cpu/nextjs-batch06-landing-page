import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const dir = path.resolve(new URL('.', import.meta.url).pathname);
const out = path.resolve(new URL('../png', import.meta.url).pathname);
fs.mkdirSync(out, { recursive: true });

// Dùng Chromium có sẵn nếu máy đã cài (CHROMIUM_PATH), ngược lại dùng bản của Playwright.
const executablePath = process.env.CHROMIUM_PATH || undefined;
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(dir, 'frames.html'));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);

const names = await page.$$eval('[data-frame]', els => els.map(e => e.dataset.frame));
for (const name of names) {
  const el = page.locator(`[data-frame="${name}"]`);
  const alpha = await el.getAttribute('data-alpha');
  await el.screenshot({ path: path.join(out, name + '.png'), omitBackground: alpha === '1' });
  console.log('✓', name + '.png', alpha === '1' ? '(nền trong suốt)' : '');
}
await browser.close();
