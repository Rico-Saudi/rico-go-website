// Renders the Mivo AI social media ads into public/ads/ (shown in the site's ads gallery).
// Run manually after copy or brand changes: node scripts/generate-ads.js
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from 'playwright';

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/ads');

const FORMATS = {
  post: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
};

let gradId = 0;
const mark = (size) => {
  const id = `mg${gradId++}`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2EE57C"/><stop offset="1" stop-color="#0E9F8E"/></linearGradient></defs>
    <circle cx="32" cy="32" r="30" fill="url(#${id})"/>
    <path d="M32 14 C34 26 38 30 50 32 C38 34 34 38 32 50 C30 38 26 34 14 32 C26 30 30 26 32 14 Z" fill="#fff"/>
    <circle cx="47" cy="17" r="4.5" fill="#C9A24A"/>
  </svg>`;
};

const styles = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  .ad {
    position: relative; overflow: hidden; display: flex; flex-direction: column;
    font-family: 'IBM Plex Sans Arabic', sans-serif; color: #E6E9EF;
    background:
      radial-gradient(900px 700px at 85% -10%, rgba(46,229,124,0.20), transparent 60%),
      radial-gradient(800px 600px at 0% 105%, rgba(14,159,142,0.18), transparent 60%),
      radial-gradient(500px 400px at 10% 10%, rgba(201,162,74,0.08), transparent 60%),
      #070B14;
  }
  .grid-bg { position: absolute; inset: 0; opacity: 0.5;
    background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 54px 54px; }
  .lockup { position: relative; display: flex; align-items: center; gap: 16px; }
  .lockup .name { font-size: 40px; font-weight: 700; color: #fff; }
  .lockup .by { margin-right: auto; font-size: 22px; color: #AEB6C4; border: 1px solid rgba(255,255,255,0.14); border-radius: 999px; padding: 8px 20px; }
  .eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: 24px; color: #6BF3A5; border: 1px solid rgba(46,229,124,0.35); background: rgba(34,197,94,0.08); border-radius: 999px; padding: 8px 20px; }
  .eyebrow i { width: 10px; height: 10px; border-radius: 50%; background: #2EE57C; box-shadow: 0 0 12px #2EE57C; }
  h1 { margin: 0; font-weight: 700; color: #fff; line-height: 1.25; }
  h1 em { font-style: normal; background: linear-gradient(90deg, #2EE57C, #19C2A8); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .sub { color: #AEB6C4; line-height: 1.6; margin: 0; }
  .cta-row { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .cta { display: inline-flex; align-items: center; gap: 14px; background: linear-gradient(135deg, #2EE57C, #0E9F8E); color: #04140A; font-weight: 700; border-radius: 18px; padding: 22px 36px; font-size: 28px; box-shadow: 0 20px 50px rgba(46,229,124,0.3); }
  .domain { font-size: 24px; color: #8A93A5; direction: ltr; }
  .glow { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(46,229,124,0.35), transparent 70%); filter: blur(10px); }

  /* phone mock (base size 230x470, scaled with zoom) */
  .phone { position: relative; width: 230px; height: 470px; border: 8px solid #161d29; border-radius: 38px; overflow: hidden; background: linear-gradient(180deg, #0B1A1C, #0A0F18 55%); box-shadow: 0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(46,229,124,0.18); display: flex; flex-direction: column; }
  .phone .bar { height: 34px; display: flex; align-items: center; justify-content: space-between; padding: 0 18px; font-size: 10px; color: #8A93A5; flex-shrink: 0; }
  .phone .body { flex: 1; padding: 10px 12px 14px; display: flex; flex-direction: column; gap: 10px; }
  .chips { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; }
  .chip { background: #121C28; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 10px 8px; font-size: 10.5px; color: #E6E9EF; line-height: 1.5; text-align: center; }
  .input { margin-top: auto; width: 100%; display: flex; align-items: center; gap: 8px; background: #121a26; border: 1px solid rgba(46,229,124,0.25); border-radius: 999px; padding: 6px 6px 6px 12px; }
  .input span { flex: 1; color: #6C7688; font-size: 11px; }
  .input b { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #2EE57C, #0E9F8E); flex-shrink: 0; }
  .me { align-self: flex-end; background: linear-gradient(135deg, #1c8f4e, #127a6c); color: #EAFBF0; padding: 9px 12px; border-radius: 14px 14px 4px 14px; font-size: 11.5px; line-height: 1.6; max-width: 85%; }
  .bot { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: #E6E9EF; }
  .result { display: flex; gap: 10px; align-items: center; background: #121C28; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 8px; }
  .result.top { border-color: rgba(46,229,124,0.4); }
  .thumb { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .result .t { font-size: 11.5px; font-weight: 600; color: #fff; margin-bottom: 4px; }
  .tag { display: inline-block; font-size: 9px; border-radius: 999px; padding: 2px 7px; margin-left: 4px; }
`;

const welcomeScreen = () => `
  <div class="phone">
    <div class="bar"><span>9:41</span><span>Mivo AI</span></div>
    <div class="body" style="align-items:center; text-align:center;">
      <div style="position:relative; margin:22px 0 18px;">
        <div class="glow" style="inset:-22px;"></div>
        <div style="position:relative;">${mark(86)}</div>
      </div>
      <div style="font-size:17px; font-weight:700; color:#fff;">مرحبًا 👋</div>
      <div style="font-size:12px; color:#94A0B3; margin-bottom:12px;">بماذا أساعدك اليوم؟</div>
      <div class="chips">
        <div class="chip">🍽️<br/>مطعم للعائلة</div><div class="chip">☕<br/>مقهى هادئ</div>
        <div class="chip">🛠️<br/>خدمة قريبة</div><div class="chip">🎁<br/>فكرة هدية</div>
      </div>
      <div class="input"><span style="text-align:right;">اكتب ما تحتاجه…</span><b></b></div>
    </div>
  </div>`;

const resultsScreen = () => `
  <div class="phone" style="background:#0A0F18;">
    <div class="bar"><span>9:42</span><span>Mivo AI</span></div>
    <div class="body">
      <div class="me">أبحث عن مطعم مناسب للعائلة</div>
      <div class="bot">${mark(20)}<span>إليك خيارات مناسبة قريبة منك:</span></div>
      <div class="result top">
        <div class="thumb" style="background:linear-gradient(135deg,#1F6F46,#0F2A1F);">🍽️</div>
        <div><div class="t">الخيار الأول</div>
          <span class="tag" style="color:#6BF3A5; background:rgba(34,197,94,0.12);">جلسات عائلية</span><span class="tag" style="color:#AEB6C4; background:rgba(255,255,255,0.06);">قريب</span></div>
      </div>
      <div class="result">
        <div class="thumb" style="background:linear-gradient(135deg,#7A5B1E,#2A2010);">🥘</div>
        <div><div class="t">الخيار الثاني</div>
          <span class="tag" style="color:#E8C765; background:rgba(201,162,74,0.14);">أطباق شعبية</span><span class="tag" style="color:#AEB6C4; background:rgba(255,255,255,0.06);">مواقف</span></div>
      </div>
      <div class="result">
        <div class="thumb" style="background:linear-gradient(135deg,#1D4E6B,#0F1E2A);">🍕</div>
        <div><div class="t">الخيار الثالث</div>
          <span class="tag" style="color:#8CC8F0; background:rgba(75,158,248,0.14);">ركن للأطفال</span><span class="tag" style="color:#AEB6C4; background:rgba(255,255,255,0.06);">هادئ</span></div>
      </div>
      <div class="input"><span style="text-align:right;">اكتب ما تحتاجه…</span><b></b></div>
    </div>
  </div>`;

const lockup = () => `
  <div class="lockup">${mark(64)}<span class="name">Mivo AI</span><span class="by">من RICO</span></div>`;

const ctaRow = (label) => `
  <div class="cta-row"><span class="cta">${label} ←</span><span class="domain">rico-go.com</span></div>`;

// Each ad lays out a text block and a visual; the post puts them side by side, the story stacks them.
const ads = [
  {
    name: 'assistant',
    eyebrow: 'تعرّف على Mivo AI',
    headline: 'مساعدك الذكي<br/><em>لإنجاز المزيد</em>',
    sub: 'عبّر عمّا تحتاجه بكلماتك، ودع Mivo AI يساعدك في استكشاف الخيارات المناسبة.',
    cta: 'ابدأ محادثتك',
    visual: welcomeScreen,
  },
  {
    name: 'one-chat',
    eyebrow: 'بحث أسهل عن الخدمات والأماكن',
    headline: 'محادثة واحدة<br/><em>لاحتياجات متعددة</em>',
    sub: 'بدون التنقل بين مواقع وتطبيقات متعددة — نتائج واضحة ومنظمة تساعدك على الاختيار.',
    cta: 'جرّب Mivo AI',
    visual: resultsScreen,
  },
  {
    name: 'you-decide',
    eyebrow: 'ماذا تريد أن تنجز؟',
    headline: 'أنت تحدد ما تحتاجه،<br/><em>و Mivo AI يساعدك</em><br/>على الوصول إليه.',
    sub: 'تجربة محادثة تساعدك على البحث والاستكشاف والوصول إلى الخيارات، في مكان واحد وبأسلوب طبيعي.',
    cta: 'ابدأ الآن',
    visual: null,
  },
];

const valueChips = (size) => `
  <div style="display:flex; flex-wrap:wrap; gap:14px; justify-content:center; max-width:${size}px;">
    ${['💬 محادثة واحدة', '🧭 نتائج واضحة', '✨ تجربة طبيعية', '⏱️ وقت أقل في البحث']
      .map((t) => `<span style="font-size:26px; color:#E6E9EF; background:rgba(18,28,40,0.85); border:1px solid rgba(255,255,255,0.1); border-radius:999px; padding:12px 24px;">${t}</span>`)
      .join('')}
  </div>`;

const markHero = (size) => `
  <div style="position:relative; display:flex; align-items:center; justify-content:center;">
    <div class="glow" style="width:${size * 1.8}px; height:${size * 1.8}px;"></div>
    <div style="position:absolute; width:${size * 1.45}px; height:${size * 1.45}px; border-radius:50%; border:1px solid rgba(46,229,124,0.25);"></div>
    <div style="position:absolute; width:${size * 1.9}px; height:${size * 1.9}px; border-radius:50%; border:1px dashed rgba(255,255,255,0.08);"></div>
    <div style="position:relative; filter:drop-shadow(0 20px 50px rgba(46,229,124,0.45));">${mark(size)}</div>
  </div>`;

const render = (ad, format) => {
  const { width, height } = FORMATS[format];
  const story = format === 'story';
  const text = `
    <div style="display:flex; flex-direction:column; gap:${story ? 30 : 26}px; ${story ? 'align-items:center; text-align:center;' : ''}">
      <span class="eyebrow" style="align-self:${story ? 'center' : 'flex-start'};"><i></i>${ad.eyebrow}</span>
      <h1 style="font-size:${story ? 92 : ad.visual ? 72 : 76}px;">${ad.headline}</h1>
      <p class="sub" style="font-size:${story ? 36 : 30}px; max-width:${story ? 860 : ad.visual ? 520 : 860}px;">${ad.sub}</p>
    </div>`;

  let main;
  if (!ad.visual) {
    main = story
      ? `<div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:90px;">${markHero(230)}${text}${valueChips(900)}</div>`
      : `<div style="flex:1; display:flex; align-items:center; gap:56px;">${text}<div style="flex-shrink:0; margin-left:40px;">${markHero(170)}</div></div>`;
  } else if (story) {
    main = `<div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:70px;">${text}<div style="zoom:2.05;">${ad.visual()}</div></div>`;
  } else {
    main = `<div style="flex:1; display:grid; grid-template-columns:1fr auto; gap:40px; align-items:center;">${text}<div style="zoom:1.45;">${ad.visual()}</div></div>`;
  }

  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap">
    <style>${styles}</style></head>
    <body><div class="ad" style="width:${width}px; height:${height}px; padding:${story ? '110px 90px' : '72px 76px'}; gap:${story ? 40 : 28}px;">
      <div class="grid-bg"></div>
      ${lockup()}
      <div style="position:relative; flex:1; display:flex;">${main}</div>
      ${ctaRow(ad.cta)}
    </div></body></html>`;
};

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
for (const ad of ads) {
  for (const format of Object.keys(FORMATS)) {
    const { width, height } = FORMATS[format];
    const page = await browser.newPage({ viewport: { width, height } });
    await page.setContent(render(ad, format), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const file = `mivo-${ad.name}-${format}.png`;
    await page.screenshot({ path: path.join(outDir, file) });
    await page.close();
    console.log(`wrote public/ads/${file}`);
  }
}
await browser.close();
