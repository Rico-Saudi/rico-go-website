// Regenerates the PNG icons and social share image in public/.
// Run manually after brand changes: node scripts/generate-images.js
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from 'playwright';

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');
const mark = (await readFile(path.join(publicDir, 'favicon.svg'), 'utf8'))
  .replace(/<rect[^>]*\/>/, ''); // drop the rounded background; each image sets its own

const icon = (size) => `
  <body style="margin:0; width:${size}px; height:${size}px; background:#070B14; display:flex; align-items:center; justify-content:center;">
    <div style="width:${size * 0.5}px; height:${size * 0.6}px;">${mark.replace('<svg ', '<svg width="100%" height="100%" ')}</div>
  </body>`;

const ogImage = `
  <head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@500;700&display=swap"></head>
  <body dir="rtl" style="margin:0; width:1200px; height:630px; font-family:'IBM Plex Sans Arabic', sans-serif;
    background:radial-gradient(900px 500px at 85% -10%, rgba(34,197,94,0.22), transparent 60%), radial-gradient(700px 400px at 0% 100%, rgba(201,162,74,0.12), transparent 60%), #070B14;
    display:flex; flex-direction:column; justify-content:center; padding:0 96px; box-sizing:border-box; color:#fff;">
    <div style="display:flex; align-items:center; gap:20px; margin-bottom:44px;">
      <div style="width:64px; height:77px;">${mark.replace('<svg ', '<svg width="100%" height="100%" ')}</div>
      <span style="font-size:40px; font-weight:700; letter-spacing:-0.01em;">RICO</span>
    </div>
    <div style="font-size:76px; font-weight:700; line-height:1.2;">نحو مستقبل<br/><span style="color:#2EE57C;">أكثر ذكاءً</span></div>
    <div style="font-size:30px; color:#AEB6C4; margin-top:28px; font-weight:500;">تقنية تفهم احتياجك، وابتكار يصنع الفرق — ومعها Mivo AI</div>
  </body>`;

const shots = [
  { file: 'og-image.png', width: 1200, height: 630, html: ogImage },
  { file: 'icon-512.png', width: 512, height: 512, html: icon(512) },
  { file: 'icon-192.png', width: 192, height: 192, html: icon(192) },
  { file: 'apple-touch-icon.png', width: 180, height: 180, html: icon(180) },
  { file: 'favicon-32.png', width: 32, height: 32, html: icon(32) },
];

const browser = await chromium.launch();
for (const { file, width, height, html } of shots) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(publicDir, file) });
  await page.close();
  console.log(`wrote public/${file}`);
}
await browser.close();
