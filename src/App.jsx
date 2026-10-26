import { useState } from 'react';

function css(str) {
  const style = {};
  str.split(';').forEach((rule) => {
    const idx = rule.indexOf(':');
    if (idx === -1) return;
    const prop = rule
      .slice(0, idx)
      .trim()
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const value = rule.slice(idx + 1).trim();
    if (prop && value) style[prop] = value;
  });
  return style;
}

// Where "ابدأ الآن" sends visitors — point this at the Mivo AI app once it has a public link.
const MIVO_URL = '#mivo';
const CONTACT_EMAIL = 'partners@rico-go.com';

// Ad images rendered by scripts/generate-ads.js into public/ads/.
const ADS = [
  { name: 'assistant', title: 'مساعدك الذكي لإنجاز المزيد' },
  { name: 'one-chat', title: 'محادثة واحدة لاحتياجات متعددة' },
  { name: 'you-decide', title: 'أنت تحدد ما تحتاجه' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .rico-go, .rico-go * { box-sizing: border-box; }
        .rico-go {
          margin: 0;
          font-family: 'IBM Plex Sans Arabic', 'IBM Plex Sans', sans-serif;
          color: #E6E9EF;
        }
        .rico-go a { color: #2EE57C; text-decoration: none; }
        .rico-go a:hover { color: #6BF3A5; }
        .rico-go ::selection { background: rgba(34,197,94,0.3); }
        @keyframes ricoFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes ricoPulse { 0%,100% { opacity:0.5; transform:scale(1); } 50% { opacity:0.9; transform:scale(1.06); } }

        /* ---------- Responsive ---------- */
        .rg-nav-toggle { display: none; }

        @media (max-width: 1279px) {
          .rico-go section, .rico-go > nav, .rico-go footer > div {
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
        }

        @media (max-width: 1023px) {
          .rg-nav-links { display: none !important; }
          .rg-nav-toggle {
            display: flex; align-items: center; justify-content: center;
            width: 44px; height: 44px; border-radius: 10px;
            background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
            color: #E6E9EF; cursor: pointer; flex-shrink: 0;
          }
          .rg-nav-links.rg-open {
            display: flex !important;
            position: absolute; top: 100%; left: 0; right: 0;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 2px !important;
            background: #0B111C;
            padding: 10px 24px 18px !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 16px 30px rgba(0,0,0,0.35);
          }
          .rg-nav-links.rg-open a { padding: 12px 4px !important; font-size: 16px !important; }

          .rg-hero-grid, .rg-demo-grid, .rg-about-grid, .rg-mivo-grid {
            grid-template-columns: 1fr !important;
          }
          .rg-capabilities-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .rg-how-grid, .rg-values-grid, .rg-solutions-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .rg-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .rg-hero-visual { min-height: 0 !important; margin-top: 8px; }
          .rg-showcase-phones { flex-wrap: wrap !important; }
          .rg-ads-grid { gap: 16px !important; }
          .rg-showcase-item { margin-top: 0 !important; }
        }

        @media (max-width: 767px) {
          .rico-go section, .rico-go > nav, .rico-go footer > div {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .rg-hero-h1 { font-size: 34px !important; line-height: 1.25 !important; }
          .rg-section-h2 { font-size: 25px !important; line-height: 1.3 !important; }
          .rg-capabilities-grid { grid-template-columns: 1fr 1fr !important; }
          .rg-stats-grid, .rg-vm-grid { grid-template-columns: 1fr !important; }
          .rg-ads-grid { grid-template-columns: 1fr !important; max-width: 440px; margin-left: auto; margin-right: auto; }
          .rg-footer-grid { grid-template-columns: 1fr !important; }

          .rg-showcase-phones { flex-direction: column !important; align-items: center !important; }
          .rg-showcase-item { width: 100%; max-width: 260px; }
          .rg-showcase-phone {
            width: 100% !important;
            height: auto !important; aspect-ratio: 230 / 470 !important;
          }
          .rg-demo-phone {
            width: 100% !important; max-width: 300px !important;
            height: auto !important; aspect-ratio: 300 / 600 !important;
          }
          .rg-hero-visual-inner {
            width: 100% !important; max-width: 300px !important;
            height: auto !important; aspect-ratio: 330 / 400 !important;
          }
          .rg-cta-box { padding: 40px 24px !important; }
          .rg-cta-row { flex-direction: column !important; align-items: stretch !important; }
          .rg-cta-row a { text-align: center; }
          .rg-partners { flex-direction: column !important; align-items: flex-start !important; }
          .rg-partners a { width: 100%; text-align: center; }
        }

        @media (max-width: 479px) {
          .rg-how-grid, .rg-capabilities-grid, .rg-values-grid, .rg-solutions-grid { grid-template-columns: 1fr !important; }
          .rg-hero-h1 { font-size: 28px !important; }
        }
      ` }} />

      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="rmark" viewBox="0 0 200 240">
          <path d="M 47 36 L 47 206" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round"></path>
          <path d="M 47 44 C 104 20 160 46 160 92 C 160 130 122 140 86 121" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round"></path>
          <path d="M 96 120 L 154 200" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round"></path>
          <circle cx="176" cy="192" r="16" fill="#C9A24A"></circle>
        </symbol>
        <linearGradient id="mivoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2EE57C"></stop>
          <stop offset="1" stopColor="#0E9F8E"></stop>
        </linearGradient>
        <symbol id="mivomark" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="30" fill="url(#mivoGrad)"></circle>
          <path d="M32 14 C34 26 38 30 50 32 C38 34 34 38 32 50 C30 38 26 34 14 32 C26 30 30 26 32 14 Z" fill="#FFFFFF"></path>
          <circle cx="47" cy="17" r="4.5" fill="#C9A24A"></circle>
        </symbol>
      </svg>

      <main className="rico-go" dir="rtl" style={css("width:100%; overflow-x:hidden; background:radial-gradient(1200px 600px at 80% -5%, rgba(34,197,94,0.10), transparent 60%), radial-gradient(900px 500px at 5% 10%, rgba(201,162,74,0.06), transparent 55%), #070B14;")}>

        {/* NAV */}
        <nav className="rg-nav" style={css("position:sticky; top:0; z-index:50; display:flex; align-items:center; justify-content:space-between; gap:24px; padding:16px 40px; background:rgba(7,11,20,0.82); border-bottom:1px solid rgba(255,255,255,0.06); backdrop-filter:blur(12px);")}>
          <a href="#" style={css("display:flex; align-items:center; gap:12px; flex-shrink:0;")}>
            <svg viewBox="0 0 200 240" style={css("color:#FFFFFF; width:34px; height:41px; flex-shrink:0;")}><use href="#rmark"></use></svg>
            <span style={css("font-size:19px; font-weight:700; color:#FFFFFF; letter-spacing:-0.01em;")}>RICO</span>
          </a>
          <div className={`rg-nav-links${menuOpen ? ' rg-open' : ''}`} style={css("display:flex; align-items:center; gap:32px; font-size:15px; color:#AEB6C4;")}>
            <a href="#" onClick={() => setMenuOpen(false)} style={css("color:#E6E9EF;")}>الرئيسية</a>
            <a href="#about" onClick={() => setMenuOpen(false)} style={css("color:#AEB6C4;")}>من نحن</a>
            <a href="#mivo" onClick={() => setMenuOpen(false)} style={css("color:#AEB6C4;")}>Mivo AI</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} style={css("color:#AEB6C4;")}>كيف يعمل</a>
            <a href="#solutions" onClick={() => setMenuOpen(false)} style={css("color:#AEB6C4;")}>حلولنا</a>
          </div>
          <div style={css("display:flex; align-items:center; gap:12px; flex-shrink:0;")}>
            <a href="#contact" style={css("background:#22C55E; color:#04140A; font-weight:600; padding:11px 22px; border-radius:11px; font-size:15px; box-shadow:0 8px 24px rgba(34,197,94,0.25); flex-shrink:0;")}>تواصل معنا</a>
            <button
              type="button"
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="rg-nav-toggle"
              style={css("background:transparent; border:none; padding:0;")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? (
                  <path d="M6 6 L18 18 M18 6 L6 18"></path>
                ) : (
                  <path d="M4 7h16 M4 12h16 M4 17h16"></path>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="rg-hero-grid" style={css("max-width:1200px; margin:0 auto; padding:72px 40px 40px; display:grid; grid-template-columns:1.1fr 0.9fr; gap:48px; align-items:center;")}>
          <div>
            <div style={css("display:inline-flex; align-items:center; gap:8px; padding:7px 14px; border:1px solid rgba(46,229,124,0.3); border-radius:999px; background:rgba(34,197,94,0.08); font-size:13px; color:#6BF3A5; margin-bottom:24px;")}>
              <span style={css("width:7px; height:7px; border-radius:50%; background:#2EE57C; box-shadow:0 0 10px #2EE57C;")}></span>
              RICO — الذكاء الاصطناعي وتقنية المعلومات
            </div>
            <h1 className="rg-hero-h1" style={css("font-size:52px; line-height:1.18; font-weight:700; color:#FFFFFF; margin:0 0 18px; letter-spacing:-0.01em;")}>نحو مستقبل <span style={css("color:#2EE57C;")}>أكثر ذكاءً</span></h1>
            <p style={css("font-size:18px; line-height:1.8; color:#AEB6C4; margin:0 0 16px; max-width:560px;")}>نؤمن في RICO بأن التقنية يجب أن تجعل الحياة أسهل، والأعمال أكثر كفاءة، والفرص أقرب إلى الجميع. لذلك نعمل على تطوير حلول تقنية مبتكرة توظّف الذكاء الاصطناعي لتبسيط المهام اليومية والتجارية، وتحويل الأفكار إلى تجارب عملية ذات قيمة حقيقية.</p>
            <p style={css("font-size:18px; line-height:1.8; color:#AEB6C4; margin:0 0 22px; max-width:560px;")}>بخبرة تمتد إلى 14 عامًا في السوق السعودي وخارجه، نواصل تطوير حلول تواكب تطلعات الأفراد والأعمال، وتفتح آفاقًا جديدة للاستفادة من الإمكانات التي تقدمها التقنيات الحديثة.</p>
            <p style={css("font-size:17px; font-weight:600; color:#E6E9EF; margin:0 0 30px;")}>RICO — <span style={css("color:#C9A24A;")}>تقنية تفهم احتياجك، وابتكار يصنع الفرق.</span></p>
            <div style={css("display:flex; gap:14px; flex-wrap:wrap;")}>
              <a href="#mivo" style={css("background:#22C55E; color:#04140A; font-weight:600; padding:15px 30px; border-radius:12px; font-size:16px; box-shadow:0 12px 30px rgba(34,197,94,0.3);")}>تعرّف على Mivo AI</a>
              <a href="#contact" style={css("border:1px solid rgba(255,255,255,0.18); color:#E6E9EF; padding:15px 28px; border-radius:12px; font-size:16px;")}>تواصل معنا</a>
            </div>
          </div>

          <div className="rg-hero-visual" style={css("position:relative; display:flex; align-items:center; justify-content:center; min-height:440px;")}>
            <div style={css("position:absolute; width:340px; height:340px; border-radius:50%; background:radial-gradient(circle, rgba(34,197,94,0.22), transparent 70%); filter:blur(10px); animation:ricoPulse 4s ease-in-out infinite;")}></div>
            <div className="rg-hero-visual-inner" style={css("position:relative; width:330px; height:400px; animation:ricoFloat 6s ease-in-out infinite;")}>
              <div style={css("position:absolute; inset:0; border:1px solid rgba(255,255,255,0.08); border-radius:24px; overflow:hidden; background:#0C131E;")}>
                <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20420%20560%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20role%3D%22img%22%20aria-label%3D%22Rico%20robot%20mascot%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22body%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23FFFFFF%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220.55%22%20stop-color%3D%22%23EEF2F7%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23C9D2DE%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bodyEdge%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%220%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23AEB9C7%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220.12%22%20stop-color%3D%22%23FFFFFF%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220.88%22%20stop-color%3D%22%23FFFFFF%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23AEB9C7%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22visor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23141d2a%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2305090f%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22eyeGlow%22%20cx%3D%220.5%22%20cy%3D%220.45%22%20r%3D%220.7%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%238BFFC0%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220.5%22%20stop-color%3D%22%232EE57C%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232EE57C%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22floor%22%20cx%3D%220.5%22%20cy%3D%220.5%22%20r%3D%220.5%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%232EE57C%22%20stop-opacity%3D%220.28%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232EE57C%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-60%25%22%20y%3D%22-60%25%22%20width%3D%22220%25%22%20height%3D%22220%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%226%22%20result%3D%22b%22%3E%3C%2FfeGaussianBlur%3E%0A%20%20%20%20%20%20%3CfeMerge%3E%3CfeMergeNode%20in%3D%22b%22%3E%3C%2FfeMergeNode%3E%3CfeMergeNode%20in%3D%22SourceGraphic%22%3E%3C%2FfeMergeNode%3E%3C%2FfeMerge%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22chest%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23101a27%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23060b12%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%0A%20%20%3Cellipse%20cx%3D%22210%22%20cy%3D%22530%22%20rx%3D%22150%22%20ry%3D%2226%22%20fill%3D%22url(%23floor)%22%3E%3C%2Fellipse%3E%0A%0A%20%20%0A%20%20%3Crect%20x%3D%22205%22%20y%3D%2240%22%20width%3D%2210%22%20height%3D%2246%22%20rx%3D%225%22%20fill%3D%22%23C9D2DE%22%3E%3C%2Frect%3E%0A%20%20%3Ccircle%20cx%3D%22210%22%20cy%3D%2240%22%20r%3D%2213%22%20fill%3D%22%232EE57C%22%20filter%3D%22url(%23glow)%22%3E%3C%2Fcircle%3E%0A%20%20%3Ccircle%20cx%3D%22210%22%20cy%3D%2240%22%20r%3D%226%22%20fill%3D%22%23C6FFDD%22%3E%3C%2Fcircle%3E%0A%0A%20%20%0A%20%20%0A%20%20%3Cg%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22330%22%20width%3D%2246%22%20height%3D%22150%22%20rx%3D%2223%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2293%22%20cy%3D%22486%22%20r%3D%2230%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Fcircle%3E%0A%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%3Cg%3E%0A%20%20%20%20%3Crect%20x%3D%22300%22%20y%3D%22250%22%20width%3D%2244%22%20height%3D%22120%22%20rx%3D%2222%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%20transform%3D%22rotate(18%20322%20310)%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22356%22%20cy%3D%22238%22%20r%3D%2234%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Fcircle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22356%22%20cy%3D%22238%22%20r%3D%2220%22%20fill%3D%22%23EAEFF5%22%3E%3C%2Fcircle%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%0A%20%20%3Cpath%20d%3D%22M120%20470%20C120%20360%20150%20300%20210%20300%20C270%20300%20300%20360%20300%20470%20C300%20500%20280%20512%20250%20512%20L170%20512%20C140%20512%20120%20500%20120%20470%20Z%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Fpath%3E%0A%20%20%0A%20%20%3Ccircle%20cx%3D%22132%22%20cy%3D%22330%22%20r%3D%2234%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Fcircle%3E%0A%20%20%3Ccircle%20cx%3D%22288%22%20cy%3D%22330%22%20r%3D%2234%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Fcircle%3E%0A%0A%20%20%0A%20%20%3Ccircle%20cx%3D%22210%22%20cy%3D%22392%22%20r%3D%2246%22%20fill%3D%22url(%23chest)%22%20stroke%3D%22rgba(46%2C229%2C124%2C0.35)%22%20stroke-width%3D%222%22%3E%3C%2Fcircle%3E%0A%20%20%3Cg%20transform%3D%22translate(210%20392)%20scale(0.34)%20translate(-100%20-120)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M%2047%2036%20L%2047%20206%22%20fill%3D%22none%22%20stroke%3D%22%232EE57C%22%20stroke-width%3D%2230%22%20stroke-linecap%3D%22round%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Cpath%20d%3D%22M%2047%2044%20C%20104%2020%20160%2046%20160%2092%20C%20160%20130%20122%20140%2086%20121%22%20fill%3D%22none%22%20stroke%3D%22%232EE57C%22%20stroke-width%3D%2230%22%20stroke-linecap%3D%22round%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Cpath%20d%3D%22M%2096%20120%20L%20154%20200%22%20fill%3D%22none%22%20stroke%3D%22%232EE57C%22%20stroke-width%3D%2230%22%20stroke-linecap%3D%22round%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22176%22%20cy%3D%22192%22%20r%3D%2216%22%20fill%3D%22%23C9A24A%22%3E%3C%2Fcircle%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%0A%20%20%3Crect%20x%3D%22182%22%20y%3D%22238%22%20width%3D%2256%22%20height%3D%2234%22%20rx%3D%2212%22%20fill%3D%22%23DCE3EB%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Frect%3E%0A%0A%20%20%0A%20%20%0A%20%20%3Crect%20x%3D%2286%22%20y%3D%22128%22%20width%3D%2226%22%20height%3D%2260%22%20rx%3D%2213%22%20fill%3D%22%23161d29%22%3E%3C%2Frect%3E%0A%20%20%3Ccircle%20cx%3D%2299%22%20cy%3D%22158%22%20r%3D%227%22%20fill%3D%22%232EE57C%22%3E%3C%2Fcircle%3E%0A%20%20%3Crect%20x%3D%22308%22%20y%3D%22128%22%20width%3D%2226%22%20height%3D%2260%22%20rx%3D%2213%22%20fill%3D%22%23161d29%22%3E%3C%2Frect%3E%0A%20%20%3Ccircle%20cx%3D%22321%22%20cy%3D%22158%22%20r%3D%227%22%20fill%3D%22%232EE57C%22%3E%3C%2Fcircle%3E%0A%0A%20%20%3Crect%20x%3D%22104%22%20y%3D%2284%22%20width%3D%22212%22%20height%3D%22176%22%20rx%3D%2252%22%20fill%3D%22url(%23bodyEdge)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Frect%3E%0A%20%20%0A%20%20%3Crect%20x%3D%22126%22%20y%3D%2298%22%20width%3D%22168%22%20height%3D%2240%22%20rx%3D%2220%22%20fill%3D%22%23FFFFFF%22%20opacity%3D%220.7%22%3E%3C%2Frect%3E%0A%0A%20%20%0A%20%20%3Crect%20x%3D%22126%22%20y%3D%22112%22%20width%3D%22168%22%20height%3D%22118%22%20rx%3D%2244%22%20fill%3D%22url(%23visor)%22%3E%3C%2Frect%3E%0A%20%20%3Crect%20x%3D%22126%22%20y%3D%22112%22%20width%3D%22168%22%20height%3D%2260%22%20rx%3D%2244%22%20fill%3D%22%231c2735%22%20opacity%3D%220.5%22%3E%3C%2Frect%3E%0A%0A%20%20%0A%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%3Crect%20x%3D%22158%22%20y%3D%22150%22%20width%3D%2234%22%20height%3D%2248%22%20rx%3D%2217%22%20fill%3D%22%232EE57C%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Crect%20x%3D%22228%22%20y%3D%22150%22%20width%3D%2234%22%20height%3D%2248%22%20rx%3D%2217%22%20fill%3D%22%232EE57C%22%3E%3C%2Frect%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Crect%20x%3D%22164%22%20y%3D%22156%22%20width%3D%2214%22%20height%3D%2220%22%20rx%3D%227%22%20fill%3D%22%23CFFFE3%22%20opacity%3D%220.9%22%3E%3C%2Frect%3E%0A%20%20%3Crect%20x%3D%22234%22%20y%3D%22156%22%20width%3D%2214%22%20height%3D%2220%22%20rx%3D%227%22%20fill%3D%22%23CFFFE3%22%20opacity%3D%220.9%22%3E%3C%2Frect%3E%0A%3C%2Fsvg%3E" alt="روبوت RICO" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
            </div>
            {/* floating chat bubble */}
            <div style={css("position:absolute; bottom:24px; right:-8px; background:#0F1B27; border:1px solid rgba(46,229,124,0.28); border-radius:16px 16px 4px 16px; padding:14px 16px; max-width:230px; box-shadow:0 16px 40px rgba(0,0,0,0.4);")}>
              <div style={css("font-size:14px; color:#E6E9EF; line-height:1.6;")}>أبحث عن مطعم مناسب للعائلة</div>
            </div>
            <div style={css("position:absolute; top:34px; left:-10px; display:flex; align-items:center; gap:8px; background:#0F1B27; border:1px solid rgba(255,255,255,0.1); border-radius:14px; padding:10px 14px; box-shadow:0 16px 40px rgba(0,0,0,0.4);")}>
              <span style={css("width:9px; height:9px; border-radius:50%; background:#2EE57C; box-shadow:0 0 8px #2EE57C;")}></span>
              <span style={css("font-size:13px; color:#AEB6C4;")}>Mivo AI يستكشف الخيارات…</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={css("max-width:1120px; margin:24px auto 0; padding:0 40px;")}>
          <div className="rg-stats-grid" style={css("display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.07); border-radius:18px; overflow:hidden;")}>
            <div style={css("background:#0B1320; padding:30px; text-align:center;")}>
              <div style={css("font-size:38px; font-weight:700; color:#2EE57C;")}>14 عامًا</div>
              <div style={css("font-size:15px; color:#AEB6C4; margin-top:6px;")}>خبرة في السوق السعودي وخارجه</div>
            </div>
            <div style={css("background:#0B1320; padding:30px; text-align:center;")}>
              <div style={css("font-size:30px; font-weight:700; color:#2EE57C; line-height:1.5;")}>الذكاء الاصطناعي</div>
              <div style={css("font-size:15px; color:#AEB6C4; margin-top:6px;")}>في قلب حلولنا التقنية</div>
            </div>
            <div style={css("background:#0B1320; padding:30px; text-align:center;")}>
              <div style={css("font-size:30px; font-weight:700; color:#2EE57C; line-height:1.5;")}>محادثة واحدة</div>
              <div style={css("font-size:15px; color:#AEB6C4; margin-top:6px;")}>لاحتياجات متعددة مع Mivo AI</div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={css("max-width:1200px; margin:0 auto; padding:88px 40px 56px;")}>
          <div className="rg-about-grid" style={css("display:grid; grid-template-columns:1.1fr 0.9fr; gap:48px; align-items:center; margin-bottom:48px;")}>
            <div>
              <div style={css("font-size:13px; letter-spacing:0.28em; color:#2EE57C; text-transform:uppercase; margin-bottom:12px;")}>About</div>
              <h2 className="rg-section-h2" style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 16px;")}>من نحن</h2>
              <p style={css("font-size:17px; color:#AEB6C4; line-height:1.8; margin:0 0 16px;")}>RICO شركة متخصصة في تقنيات الذكاء الاصطناعي وتقنية المعلومات، تسعى إلى تقديم حلول تجمع بين الابتكار وسهولة الاستخدام، وتساعد على معالجة التحديات اليومية بطرق أكثر ذكاءً وفاعلية.</p>
              <p style={css("font-size:17px; color:#AEB6C4; line-height:1.8; margin:0 0 16px;")}>نركز على تطوير تجارب تقنية تجعل الوصول إلى المعلومات والخدمات أكثر سهولة، وتمنح المستخدمين طرقًا جديدة للتفاعل مع التقنية، بعيدًا عن التعقيد وتعدد الخطوات.</p>
              <p style={css("font-size:17px; color:#AEB6C4; line-height:1.8; margin:0;")}>ومن هذا التوجه، يأتي <b style={css("color:#E6E9EF;")}>Mivo AI</b> بوصفه أحد منتجات RICO، ليقدم تجربة مختلفة في كيفية البحث عن الاحتياجات اليومية والتجارية والتفاعل معها من خلال محادثة واحدة.</p>
            </div>
            <div className="rg-vm-grid" style={css("display:grid; grid-template-columns:1fr; gap:16px;")}>
              <div style={css("background:#0C1420; border:1px solid rgba(46,229,124,0.2); border-radius:18px; padding:28px;")}>
                <div style={css("font-size:13px; color:#2EE57C; font-weight:600; margin-bottom:10px;")}>رؤيتنا</div>
                <p style={css("font-size:16px; color:#D6DBE4; line-height:1.8; margin:0;")}>أن نساهم في بناء مستقبل رقمي أكثر ذكاءً، تصبح فيه التقنية أقرب إلى الإنسان، وأكثر قدرة على فهم احتياجاته ومساعدته في تحقيق أهدافه.</p>
              </div>
              <div style={css("background:#0C1420; border:1px solid rgba(201,162,74,0.25); border-radius:18px; padding:28px;")}>
                <div style={css("font-size:13px; color:#C9A24A; font-weight:600; margin-bottom:10px;")}>رسالتنا</div>
                <p style={css("font-size:16px; color:#D6DBE4; line-height:1.8; margin:0;")}>تطوير حلول تقنية مبتكرة توظّف الذكاء الاصطناعي لتسهيل الحياة اليومية، ورفع كفاءة الأعمال، وتقديم تجارب رقمية أكثر بساطة ووضوحًا وقيمة.</p>
              </div>
            </div>
          </div>

          <h3 style={css("font-size:22px; font-weight:600; color:#FFFFFF; margin:0 0 20px;")}>ما الذي يميز توجهنا؟</h3>
          <div className="rg-values-grid" style={css("display:grid; grid-template-columns:repeat(4,1fr); gap:16px;")}>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M5.5 21a6.5 6.5 0 0 1 13 0"></path></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>الذكاء في خدمة الإنسان</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>نركز على احتياجات المستخدم الفعلية، ونجعل التقنية وسيلة لتحقيق نتائج مفيدة.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>البساطة في التجربة</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>نسعى إلى تقليل التعقيد والخطوات غير الضرورية.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z"></path></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>الابتكار المستمر</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>نواكب تطور التقنيات ونستكشف طرقًا جديدة لتقديم الخدمات.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>القيمة العملية</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>نهتم بأن تنعكس التقنية على تجربة المستخدم وجودة إنجازه، لا أن تكون مجرد ميزة إضافية.</div>
            </div>
          </div>
        </section>

        {/* MIVO AI */}
        <section id="mivo" style={css("max-width:1200px; margin:0 auto; padding:56px 40px;")}>
          <div className="rg-mivo-grid" style={css("background:linear-gradient(180deg, #0C1622, #0A121C); border:1px solid rgba(255,255,255,0.07); border-radius:24px; padding:48px; display:grid; grid-template-columns:1.2fr 0.8fr; gap:48px; align-items:center;")}>
            <div>
              <div style={css("font-size:13px; letter-spacing:0.28em; color:#C9A24A; text-transform:uppercase; margin-bottom:12px;")}>Mivo AI</div>
              <h2 className="rg-section-h2" style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 8px;")}>تعرف على Mivo AI</h2>
              <div style={css("font-size:19px; font-weight:600; color:#2EE57C; margin:0 0 20px;")}>مساعدك الذكي لإنجاز المزيد</div>
              <p style={css("font-size:17px; color:#AEB6C4; line-height:1.8; margin:0 0 16px;")}>تخيّل أن بإمكانك التعبير عمّا تحتاجه بكلماتك، والحصول على المساعدة في استكشاف الخيارات المناسبة، دون الحاجة إلى التنقل بين مواقع وتطبيقات متعددة في كل مرة. هذا هو التوجه الذي يقدمه Mivo AI.</p>
              <p style={css("font-size:17px; color:#AEB6C4; line-height:1.8; margin:0 0 16px;")}>Mivo AI مساعد ذكي طوّرته RICO ليجعل التفاعل مع الخدمات والمعلومات أكثر سهولة وطبيعية. فمن خلال محادثة واحدة، يمكنك طرح طلبك بلغتك المعتادة، واستكشاف الخيارات المتاحة، والحصول على نتائج منظمة تساعدك على اتخاذ الخطوة التالية بثقة ووضوح.</p>
              <p style={css("font-size:17px; color:#AEB6C4; line-height:1.8; margin:0;")}>بدلًا من أن تبدأ رحلتك بمعرفة التطبيق المناسب أو الموقع الذي يجب أن تبحث فيه، تبدأ ببساطة بما تريد إنجازه، وتدع Mivo AI يساعدك في الوصول إلى الخيارات الملائمة.</p>
            </div>
            <div style={css("position:relative; background:#0C1420; border:1px solid rgba(46,229,124,0.3); border-radius:20px; padding:32px; box-shadow:0 20px 50px rgba(34,197,94,0.1);")}>
              <div style={css("display:flex; align-items:center; gap:12px; margin-bottom:20px;")}>
                <svg viewBox="0 0 64 64" aria-hidden="true" style={css("width:52px; height:52px; filter:drop-shadow(0 8px 20px rgba(46,229,124,0.35));")}><use href="#mivomark"></use></svg>
                <span style={css("font-size:20px; font-weight:700; color:#FFFFFF;")}>Mivo AI</span>
              </div>
              <p style={css("font-size:21px; font-weight:600; color:#FFFFFF; line-height:1.7; margin:0;")}>أنت تحدد ما تحتاجه، وMivo AI يساعدك على الوصول إليه بطريقة أكثر سهولة.</p>
            </div>
          </div>
        </section>

        {/* MIVO SHOWCASE */}
        <section style={css("position:relative; max-width:1200px; margin:0 auto; padding:56px 40px;")}>
          <div style={css("position:absolute; inset:80px 10% auto; height:420px; border-radius:50%; background:radial-gradient(closest-side, rgba(14,159,142,0.16), transparent); filter:blur(20px); pointer-events:none;")}></div>
          <div style={css("position:relative; text-align:center; margin-bottom:48px;")}>
            <div style={css("font-size:13px; letter-spacing:0.28em; color:#2EE57C; text-transform:uppercase; margin-bottom:12px;")}>Inside Mivo AI</div>
            <h2 className="rg-section-h2" style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 10px;")}>تجربة Mivo AI</h2>
            <p style={css("font-size:16px; color:#AEB6C4; margin:0;")}>من السؤال إلى الاختيار، في محادثة واحدة.</p>
          </div>

          <div className="rg-showcase-phones" style={css("position:relative; display:flex; gap:28px; justify-content:center; align-items:flex-start;")}>

            {/* screen 1: welcome */}
            <div className="rg-showcase-item" style={css("margin-top:40px;")}>
              <div className="rg-showcase-phone" style={css("width:230px; height:470px; border:8px solid #161d29; border-radius:38px; overflow:hidden; background:linear-gradient(180deg, #0B1A1C, #0A0F18 55%); box-shadow:0 24px 60px rgba(0,0,0,0.5); display:flex; flex-direction:column;")}>
                <div style={css("height:34px; display:flex; align-items:center; justify-content:space-between; padding:0 18px; font-size:10px; color:#8A93A5; flex-shrink:0;")}><span>9:41</span><span>Mivo AI</span></div>
                <div style={css("flex:1; padding:10px 14px 14px; display:flex; flex-direction:column; align-items:center; text-align:center;")}>
                  <div style={css("position:relative; width:86px; height:86px; margin:18px 0 18px;")}>
                    <div style={css("position:absolute; inset:-18px; border-radius:50%; background:radial-gradient(circle, rgba(46,229,124,0.35), transparent 70%); animation:ricoPulse 4s ease-in-out infinite;")}></div>
                    <svg viewBox="0 0 64 64" aria-hidden="true" style={css("position:relative; width:86px; height:86px;")}><use href="#mivomark"></use></svg>
                  </div>
                  <div style={css("font-size:17px; font-weight:700; color:#FFFFFF; margin-bottom:4px;")}>مرحبًا 👋</div>
                  <div style={css("font-size:12px; color:#94A0B3; margin-bottom:20px;")}>بماذا أساعدك اليوم؟</div>
                  <div style={css("display:grid; grid-template-columns:1fr 1fr; gap:8px; width:100%;")}>
                    <div style={css("background:#121C28; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:10px 8px; font-size:10.5px; color:#E6E9EF; line-height:1.5;")}>🍽️<br/>مطعم للعائلة</div>
                    <div style={css("background:#121C28; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:10px 8px; font-size:10.5px; color:#E6E9EF; line-height:1.5;")}>☕<br/>مقهى هادئ</div>
                    <div style={css("background:#121C28; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:10px 8px; font-size:10.5px; color:#E6E9EF; line-height:1.5;")}>🛠️<br/>خدمة قريبة</div>
                    <div style={css("background:#121C28; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:10px 8px; font-size:10.5px; color:#E6E9EF; line-height:1.5;")}>🎁<br/>فكرة هدية</div>
                  </div>
                  <div style={css("margin-top:auto; width:100%; display:flex; align-items:center; gap:8px; background:#121a26; border:1px solid rgba(46,229,124,0.25); border-radius:999px; padding:6px 6px 6px 12px;")}>
                    <span style={css("flex:1; text-align:right; color:#6C7688; font-size:11px;")}>اكتب ما تحتاجه…</span>
                    <span style={css("width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg, #2EE57C, #0E9F8E); display:flex; align-items:center; justify-content:center; flex-shrink:0;")}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04140A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path></svg>
                    </span>
                  </div>
                </div>
              </div>
              <div style={css("text-align:center; margin-top:18px;")}>
                <span style={css("display:inline-block; width:7px; height:7px; border-radius:50%; background:#2EE57C; box-shadow:0 0 8px #2EE57C; vertical-align:middle;")}></span>
                <span style={css("font-size:15px; font-weight:600; color:#E6E9EF; margin-right:8px;")}>أخبره بما تحتاجه</span>
              </div>
            </div>

            {/* screen 2: results */}
            <div className="rg-showcase-item">
              <div className="rg-showcase-phone" style={css("width:230px; height:470px; border:8px solid #161d29; border-radius:38px; overflow:hidden; background:#0A0F18; box-shadow:0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(46,229,124,0.15); display:flex; flex-direction:column;")}>
                <div style={css("height:34px; display:flex; align-items:center; justify-content:space-between; padding:0 18px; font-size:10px; color:#8A93A5; flex-shrink:0;")}><span>9:42</span><span>Mivo AI</span></div>
                <div style={css("flex:1; padding:10px 12px 14px; display:flex; flex-direction:column; gap:10px;")}>
                  <div style={css("align-self:flex-end; background:linear-gradient(135deg, #1c8f4e, #127a6c); color:#EAFBF0; padding:9px 12px; border-radius:14px 14px 4px 14px; font-size:11.5px; line-height:1.6; max-width:85%;")}>أبحث عن مطعم مناسب للعائلة</div>
                  <div style={css("display:flex; align-items:center; gap:6px;")}>
                    <svg viewBox="0 0 64 64" aria-hidden="true" style={css("width:20px; height:20px; flex-shrink:0;")}><use href="#mivomark"></use></svg>
                    <span style={css("font-size:11.5px; color:#E6E9EF;")}>إليك خيارات مناسبة قريبة منك:</span>
                  </div>
                  <div style={css("display:flex; gap:10px; align-items:center; background:#121C28; border:1px solid rgba(46,229,124,0.3); border-radius:14px; padding:8px;")}>
                    <div style={css("width:48px; height:48px; border-radius:10px; background:linear-gradient(135deg, #1F6F46, #0F2A1F); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;")}>🍽️</div>
                    <div style={css("flex:1; min-width:0;")}>
                      <div style={css("font-size:11.5px; font-weight:600; color:#FFFFFF; margin-bottom:4px;")}>الخيار الأول</div>
                      <div style={css("display:flex; gap:4px; flex-wrap:wrap;")}>
                        <span style={css("font-size:9px; color:#6BF3A5; background:rgba(34,197,94,0.12); border-radius:999px; padding:2px 7px;")}>جلسات عائلية</span>
                        <span style={css("font-size:9px; color:#AEB6C4; background:rgba(255,255,255,0.06); border-radius:999px; padding:2px 7px;")}>قريب</span>
                      </div>
                    </div>
                  </div>
                  <div style={css("display:flex; gap:10px; align-items:center; background:#121C28; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:8px;")}>
                    <div style={css("width:48px; height:48px; border-radius:10px; background:linear-gradient(135deg, #7A5B1E, #2A2010); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;")}>🥘</div>
                    <div style={css("flex:1; min-width:0;")}>
                      <div style={css("font-size:11.5px; font-weight:600; color:#FFFFFF; margin-bottom:4px;")}>الخيار الثاني</div>
                      <div style={css("display:flex; gap:4px; flex-wrap:wrap;")}>
                        <span style={css("font-size:9px; color:#E8C765; background:rgba(201,162,74,0.14); border-radius:999px; padding:2px 7px;")}>أطباق شعبية</span>
                        <span style={css("font-size:9px; color:#AEB6C4; background:rgba(255,255,255,0.06); border-radius:999px; padding:2px 7px;")}>مواقف</span>
                      </div>
                    </div>
                  </div>
                  <div style={css("display:flex; gap:10px; align-items:center; background:#121C28; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:8px;")}>
                    <div style={css("width:48px; height:48px; border-radius:10px; background:linear-gradient(135deg, #1D4E6B, #0F1E2A); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;")}>🍕</div>
                    <div style={css("flex:1; min-width:0;")}>
                      <div style={css("font-size:11.5px; font-weight:600; color:#FFFFFF; margin-bottom:4px;")}>الخيار الثالث</div>
                      <div style={css("display:flex; gap:4px; flex-wrap:wrap;")}>
                        <span style={css("font-size:9px; color:#8CC8F0; background:rgba(75,158,248,0.14); border-radius:999px; padding:2px 7px;")}>ركن للأطفال</span>
                        <span style={css("font-size:9px; color:#AEB6C4; background:rgba(255,255,255,0.06); border-radius:999px; padding:2px 7px;")}>هادئ</span>
                      </div>
                    </div>
                  </div>
                  <div style={css("display:flex; gap:6px; flex-wrap:wrap; margin-top:auto;")}>
                    <span style={css("font-size:10px; color:#E6E9EF; border:1px solid rgba(46,229,124,0.35); border-radius:999px; padding:5px 10px;")}>قارن بينها</span>
                    <span style={css("font-size:10px; color:#E6E9EF; border:1px solid rgba(255,255,255,0.12); border-radius:999px; padding:5px 10px;")}>خيارات أكثر</span>
                  </div>
                </div>
              </div>
              <div style={css("text-align:center; margin-top:18px;")}>
                <span style={css("display:inline-block; width:7px; height:7px; border-radius:50%; background:#2EE57C; box-shadow:0 0 8px #2EE57C; vertical-align:middle;")}></span>
                <span style={css("font-size:15px; font-weight:600; color:#E6E9EF; margin-right:8px;")}>اطّلع على النتائج</span>
              </div>
            </div>

            {/* screen 3: compare & choose */}
            <div className="rg-showcase-item" style={css("margin-top:40px;")}>
              <div className="rg-showcase-phone" style={css("width:230px; height:470px; border:8px solid #161d29; border-radius:38px; overflow:hidden; background:#0A0F18; box-shadow:0 24px 60px rgba(0,0,0,0.5); display:flex; flex-direction:column;")}>
                <div style={css("height:34px; display:flex; align-items:center; justify-content:space-between; padding:0 18px; font-size:10px; color:#8A93A5; flex-shrink:0;")}><span>9:43</span><span>Mivo AI</span></div>
                <div style={css("flex:1; padding:10px 12px 14px; display:flex; flex-direction:column; gap:10px;")}>
                  <div style={css("font-size:14px; font-weight:700; color:#FFFFFF;")}>مقارنة الخيارات</div>
                  <div style={css("background:linear-gradient(180deg, rgba(46,229,124,0.14), rgba(14,159,142,0.06)); border:1px solid rgba(46,229,124,0.4); border-radius:14px; padding:10px;")}>
                    <div style={css("display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;")}>
                      <span style={css("font-size:12px; font-weight:600; color:#FFFFFF;")}>الخيار الأول</span>
                      <span style={css("font-size:9px; font-weight:700; color:#04140A; background:#2EE57C; border-radius:999px; padding:2px 8px;")}>الأنسب لك</span>
                    </div>
                    <div style={css("display:flex; flex-direction:column; gap:5px; font-size:10.5px; color:#D6DBE4;")}>
                      <div style={css("display:flex; justify-content:space-between;")}><span>مناسب للعائلة</span><span style={css("color:#2EE57C;")}>✓</span></div>
                      <div style={css("display:flex; justify-content:space-between;")}><span>القرب منك</span><span style={css("color:#2EE57C;")}>●●●</span></div>
                      <div style={css("display:flex; justify-content:space-between;")}><span>الأجواء</span><span style={css("color:#2EE57C;")}>●●○</span></div>
                    </div>
                  </div>
                  <div style={css("background:#121C28; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:10px;")}>
                    <div style={css("font-size:12px; font-weight:600; color:#FFFFFF; margin-bottom:8px;")}>الخيار الثاني</div>
                    <div style={css("display:flex; flex-direction:column; gap:5px; font-size:10.5px; color:#AEB6C4;")}>
                      <div style={css("display:flex; justify-content:space-between;")}><span>مناسب للعائلة</span><span style={css("color:#2EE57C;")}>✓</span></div>
                      <div style={css("display:flex; justify-content:space-between;")}><span>القرب منك</span><span style={css("color:#C9A24A;")}>●●○</span></div>
                      <div style={css("display:flex; justify-content:space-between;")}><span>الأجواء</span><span style={css("color:#C9A24A;")}>●●●</span></div>
                    </div>
                  </div>
                  <div style={css("display:flex; align-items:flex-start; gap:6px; background:#0F1722; border-radius:12px; padding:9px 10px;")}>
                    <svg viewBox="0 0 64 64" aria-hidden="true" style={css("width:18px; height:18px; flex-shrink:0; margin-top:1px;")}><use href="#mivomark"></use></svg>
                    <span style={css("font-size:10.5px; color:#AEB6C4; line-height:1.6;")}>الخيار الأول هو الأقرب ويناسب العائلات.</span>
                  </div>
                  <div style={css("margin-top:auto; text-align:center; background:linear-gradient(135deg, #2EE57C, #0E9F8E); color:#04140A; font-weight:700; font-size:12px; border-radius:12px; padding:11px;")}>اختر هذا الخيار</div>
                </div>
              </div>
              <div style={css("text-align:center; margin-top:18px;")}>
                <span style={css("display:inline-block; width:7px; height:7px; border-radius:50%; background:#2EE57C; box-shadow:0 0 8px #2EE57C; vertical-align:middle;")}></span>
                <span style={css("font-size:15px; font-weight:600; color:#E6E9EF; margin-right:8px;")}>اختر ما يناسبك</span>
              </div>
            </div>

          </div>
        </section>

        {/* MIVO VALUE */}
        <section style={css("max-width:1200px; margin:0 auto; padding:56px 40px;")}>
          <div style={css("text-align:center; margin-bottom:44px;")}>
            <h2 className="rg-section-h2" style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0;")}>ما القيمة التي يقدمها Mivo AI؟</h2>
          </div>
          <div className="rg-capabilities-grid" style={css("display:grid; grid-template-columns:repeat(5,1fr); gap:16px;")}>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>محادثة واحدة لاحتياجات متعددة</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>لا تحتاج إلى التعامل مع كل طلب بطريقة مختلفة. ابدأ محادثة مع Mivo AI، واشرح ما تبحث عنه بأسلوبك الطبيعي، لتحصل على تجربة تركز على احتياجك بدلًا من تعقيدات البحث التقليدي.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>بحث أسهل عن الخدمات والأماكن</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>سواء كنت تبحث عن مطعم، أو تستكشف خدمة معينة، أو ترغب في مقارنة الخيارات المتاحة، يساعدك Mivo AI على الوصول إلى النتائج ذات الصلة بطريقة واضحة ومنظمة، بحسب الإمكانات والخدمات المتاحة.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>نتائج واضحة تساعدك على الاختيار</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>لا تقتصر أهمية البحث على العثور على النتائج؛ بل تمتد إلى سهولة فهمها ومقارنتها. لذلك تقوم تجربة Mivo AI على تقديم المعلومات والخيارات بأسلوب منظم يساعدك على استكشاف البدائل وتحديد ما يناسب احتياجك.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="12" x2="4" y2="12"></line><line x1="8" y1="8" x2="8" y2="16"></line><line x1="12" y1="4" x2="12" y2="20"></line><line x1="16" y1="9" x2="16" y2="15"></line><line x1="20" y1="11" x2="20" y2="13"></line></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>تجربة طبيعية أقرب إلى أسلوبك</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>لا تحتاج إلى صياغة كلمات بحث معقدة أو معرفة المصطلحات التقنية. يمكنك أن تبدأ بسؤال أو طلب واضح، وتتفاعل مع المساعد من خلال المحادثة، لتصبح التقنية أكثر قربًا من طريقة تواصلك اليومية.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15 14"></polyline></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>وقت أقل في البحث، وتركيز أكبر على ما يهمك</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>تعدد التطبيقات والمواقع قد يجعل الوصول إلى الخيار المناسب رحلة طويلة. يهدف Mivo AI إلى تبسيط هذه الرحلة، وتقليل الجهد المبذول في البحث والتنقل، حتى تتمكن من التركيز على اختيار ما يلبي احتياجك.</div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" style={css("max-width:1200px; margin:0 auto; padding:56px 40px 40px;")}>
          <div style={css("text-align:center; margin-bottom:48px;")}>
            <div style={css("font-size:13px; letter-spacing:0.28em; color:#2EE57C; text-transform:uppercase; margin-bottom:12px;")}>How It Works</div>
            <h2 className="rg-section-h2" style={css("font-size:36px; font-weight:700; color:#FFFFFF; margin:0;")}>كيف يعمل Mivo AI؟</h2>
          </div>
          <div className="rg-how-grid" style={css("display:grid; grid-template-columns:repeat(4,1fr); gap:16px;")}>
            <div style={css("background:#0C1420; border:1px solid rgba(46,229,124,0.16); border-radius:16px; padding:26px 22px;")}>
              <div style={css("width:44px; height:44px; margin-bottom:16px; border-radius:12px; background:rgba(34,197,94,0.12); color:#2EE57C; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px;")}>01</div>
              <div style={css("font-size:17px; font-weight:600; color:#FFFFFF; margin-bottom:8px;")}>أخبره بما تحتاجه</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>ابدأ بكتابة طلبك أو التعبير عنه بالطريقة التي تناسبك. لا تحتاج إلى خطوات معقدة للبدء.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(46,229,124,0.16); border-radius:16px; padding:26px 22px;")}>
              <div style={css("width:44px; height:44px; margin-bottom:16px; border-radius:12px; background:rgba(34,197,94,0.12); color:#2EE57C; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px;")}>02</div>
              <div style={css("font-size:17px; font-weight:600; color:#FFFFFF; margin-bottom:8px;")}>استكشف الخيارات</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>يساعدك Mivo AI في البحث عن الخيارات والخدمات ذات الصلة بطلبك، وفقًا للخدمات المتاحة.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(46,229,124,0.16); border-radius:16px; padding:26px 22px;")}>
              <div style={css("width:44px; height:44px; margin-bottom:16px; border-radius:12px; background:rgba(34,197,94,0.12); color:#2EE57C; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px;")}>03</div>
              <div style={css("font-size:17px; font-weight:600; color:#FFFFFF; margin-bottom:8px;")}>اطّلع على النتائج</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>تظهر النتائج داخل تجربة المحادثة بصورة واضحة ومنظمة، لتسهيل استعراض الخيارات وفهم المعلومات المتاحة.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(46,229,124,0.16); border-radius:16px; padding:26px 22px;")}>
              <div style={css("width:44px; height:44px; margin-bottom:16px; border-radius:12px; background:rgba(34,197,94,0.12); color:#2EE57C; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px;")}>04</div>
              <div style={css("font-size:17px; font-weight:600; color:#FFFFFF; margin-bottom:8px;")}>اختر ما يناسبك</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>انتقل من السؤال إلى استكشاف الخيارات، ثم حدد ما يلائم احتياجك بناءً على المعلومات المعروضة.</div>
            </div>
          </div>
        </section>

        {/* EVERYDAY USE */}
        <section className="rg-demo-grid" style={css("max-width:1200px; margin:0 auto; padding:56px 40px; display:grid; grid-template-columns:0.85fr 1.15fr; gap:48px; align-items:center;")}>
          {/* phone chat mock */}
          <div className="rg-demo-phone" style={css("justify-self:center; width:300px; height:600px; background:#0A0F18; border:10px solid #161d29; border-radius:44px; box-shadow:0 30px 70px rgba(0,0,0,0.5); overflow:hidden; position:relative;")}>
            <div style={css("height:44px; display:flex; align-items:center; justify-content:space-between; padding:0 22px; font-size:12px; color:#8A93A5;")}><span>9:41</span><span>Mivo AI</span></div>
            <div style={css("padding:14px 16px; display:flex; flex-direction:column; gap:14px;")}>
              <div style={css("align-self:flex-start; background:#141d2a; color:#E6E9EF; padding:12px 14px; border-radius:14px 14px 14px 4px; font-size:14px; line-height:1.6; max-width:82%;")}>أهلاً! أنا Mivo 👋 أخبرني بما تحتاجه.</div>
              <div style={css("align-self:flex-end; background:#1c8f4e; color:#EAFBF0; padding:12px 14px; border-radius:14px 14px 4px 14px; font-size:14px; line-height:1.6; max-width:82%;")}>أبحث عن مطعم مناسب للعائلة</div>
              <div style={css("align-self:flex-start; background:#141d2a; color:#E6E9EF; padding:12px 14px; border-radius:14px; font-size:14px; line-height:1.7; width:88%;")}>
                إليك بعض الخيارات ذات الصلة:
                <div style={css("display:flex; flex-direction:column; gap:8px; margin-top:10px;")}>
                  <div style={css("display:flex; align-items:center; gap:8px; background:#0F1722; border:1px solid rgba(46,229,124,0.2); border-radius:10px; padding:8px 10px; font-size:12.5px;")}><span style={css("color:#2EE57C;")}>●</span> جلسات عائلية</div>
                  <div style={css("display:flex; align-items:center; gap:8px; background:#0F1722; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:8px 10px; font-size:12.5px;")}><span style={css("color:#C9A24A;")}>●</span> قريب من موقعك</div>
                  <div style={css("display:flex; align-items:center; gap:8px; background:#0F1722; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:8px 10px; font-size:12.5px;")}><span style={css("color:#94A0B3;")}>●</span> تقييمات مرتفعة</div>
                </div>
              </div>
              <div style={css("align-self:flex-start; display:flex; align-items:center; gap:8px; color:#94A0B3; font-size:13px;")}><span style={css("width:8px;height:8px;border-radius:50%;background:#2EE57C;box-shadow:0 0 8px #2EE57C;")}></span> اختر ما يناسبك</div>
            </div>
            <div style={css("position:absolute; bottom:16px; left:16px; right:16px; display:flex; align-items:center; gap:10px; background:#121a26; border:1px solid rgba(255,255,255,0.08); border-radius:999px; padding:8px 8px 8px 16px;")}>
              <span style={css("flex:1; color:#6C7688; font-size:13px;")}>اكتب طلبك…</span>
              <span style={css("width:38px; height:38px; border-radius:50%; background:#22C55E; display:flex; align-items:center; justify-content:center;")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#04140A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"></path><path d="M22 2 15 22l-4-9-9-4 20-7z"></path></svg>
              </span>
            </div>
          </div>

          <div>
            <div style={css("font-size:13px; letter-spacing:0.28em; color:#C9A24A; text-transform:uppercase; margin-bottom:12px;")}>Everyday</div>
            <h2 className="rg-section-h2" style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 26px;")}>Mivo AI في حياتك اليومية</h2>
            <div style={css("display:flex; flex-direction:column; gap:12px;")}>
              <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:18px 20px;")}>
                <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>عندما تبحث عن مكان مناسب</div>
                <div style={css("font-size:14.5px; color:#AEB6C4; line-height:1.7;")}>بدلًا من البحث في عدة مصادر، يمكنك أن تبدأ بسؤال مثل: <span style={css("color:#2EE57C;")}>«أبحث عن مطعم مناسب للعائلة»</span>. يساعدك Mivo AI على استكشاف الخيارات ذات الصلة وعرض النتائج بطريقة تسهّل عليك المقارنة.</div>
              </div>
              <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:18px 20px;")}>
                <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>عندما تريد اكتشاف خدمة</div>
                <div style={css("font-size:14.5px; color:#AEB6C4; line-height:1.7;")}>اشرح الخدمة التي تبحث عنها، ودع Mivo AI يساعدك على استكشاف الخيارات المتاحة، بدلًا من البدء من الصفر في كل مرة.</div>
              </div>
              <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:18px 20px;")}>
                <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>عندما تحتار بين عدة خيارات</div>
                <div style={css("font-size:14.5px; color:#AEB6C4; line-height:1.7;")}>اطلب عرض الخيارات ذات الصلة، واستفد من المعلومات المتاحة لتحديد ما يناسب أولوياتك واحتياجك.</div>
              </div>
            </div>
            <p style={css("font-size:13px; color:#7D8799; line-height:1.7; margin:16px 0 0;")}>هذه أمثلة توضيحية لطبيعة التجربة، وتعتمد النتائج الفعلية على الخدمات والتكاملات المتاحة في Mivo AI.</p>
          </div>
        </section>

        {/* WHY MIVO + CTA */}
        <section style={css("max-width:1000px; margin:0 auto; padding:56px 40px;")}>
          <div style={css("text-align:center; margin-bottom:40px;")}>
            <h2 className="rg-section-h2" style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 18px;")}>لماذا Mivo AI؟</h2>
            <p style={css("font-size:17px; color:#AEB6C4; line-height:1.8; margin:0 0 14px;")}>لأننا نرى أن مستقبل التقنية لا يتعلق فقط بزيادة عدد التطبيقات، بل بجعل الوصول إلى ما تحتاجه أسهل وأكثر وضوحًا.</p>
            <p style={css("font-size:17px; color:#AEB6C4; line-height:1.8; margin:0 0 14px;")}>Mivo AI يمثل توجهًا نحو تجربة تبدأ من احتياجك أنت؛ لا من التطبيق الذي يجب أن تستخدمه، ولا من الموقع الذي عليك أن تبحث فيه، بل من سؤال بسيط: <b style={css("color:#FFFFFF;")}>ماذا تريد أن تنجز؟</b></p>
            <p style={css("font-size:17px; color:#AEB6C4; line-height:1.8; margin:0;")}>ومن هنا تأتي قيمة Mivo AI: تجربة محادثة تساعدك على البحث والاستكشاف والوصول إلى الخيارات، في مكان واحد وبأسلوب طبيعي.</p>
          </div>

          <div className="rg-cta-box" style={css("position:relative; overflow:hidden; background:linear-gradient(135deg, #0d2a1c, #0A141F); border:1px solid rgba(46,229,124,0.25); border-radius:24px; padding:52px 48px; text-align:center;")}>
            <div style={css("position:absolute; width:400px;height:400px; border-radius:50%; background:radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%); top:-180px; right:-80px;")}></div>
            <div style={css("position:relative;")}>
              <h2 className="rg-section-h2" style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 12px;")}>ابدأ محادثتك مع Mivo AI</h2>
              <p style={css("font-size:17px; color:#B9C2D0; line-height:1.8; margin:0 0 8px;")}>احتياجاتك تبدأ بسؤال، والخيارات تصبح أقرب عندما تجد طريقة أسهل لاستكشافها.</p>
              <p style={css("font-size:17px; color:#B9C2D0; line-height:1.8; margin:0 0 28px;")}>تعرّف على Mivo AI، واكتشف كيف يمكن للمحادثة الذكية أن تجعل تجربتك اليومية أكثر سهولة.</p>
              <div className="rg-cta-row" style={css("display:flex; gap:14px; justify-content:center; flex-wrap:wrap;")}>
                <a href={MIVO_URL} style={css("background:#22C55E; color:#04140A; font-weight:600; padding:15px 34px; border-radius:12px; font-size:16px; box-shadow:0 12px 30px rgba(34,197,94,0.3);")}>ابدأ الآن</a>
                <a href="#mivo" style={css("border:1px solid rgba(255,255,255,0.18); color:#E6E9EF; padding:15px 28px; border-radius:12px; font-size:16px;")}>تعرّف على Mivo AI</a>
              </div>
            </div>
          </div>
        </section>

        {/* ADS GALLERY */}
        <section id="campaigns" style={css("max-width:1200px; margin:0 auto; padding:56px 40px;")}>
          <div style={css("text-align:center; margin-bottom:44px;")}>
            <div style={css("font-size:13px; letter-spacing:0.28em; color:#C9A24A; text-transform:uppercase; margin-bottom:12px;")}>Campaigns</div>
            <h2 className="rg-section-h2" style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 10px;")}>حملات Mivo AI</h2>
            <p style={css("font-size:16px; color:#AEB6C4; margin:0;")}>تصاميم جاهزة للنشر بمقاس المنشور والستوري.</p>
          </div>
          <div className="rg-ads-grid" style={css("display:grid; grid-template-columns:repeat(3,1fr); gap:24px;")}>
            {ADS.map((ad) => (
              <div key={ad.name} style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:14px; display:flex; flex-direction:column; gap:14px;")}>
                <a href={`/ads/mivo-${ad.name}-post.png`} target="_blank" rel="noopener" style={css("display:block; border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,0.06);")}>
                  <img src={`/ads/mivo-${ad.name}-post.png`} alt={`إعلان Mivo AI: ${ad.title}`} width="1080" height="1080" loading="lazy" style={css("display:block; width:100%; height:auto;")} />
                </a>
                <div style={css("display:flex; flex-direction:column; align-items:flex-start; gap:12px; padding:0 4px 4px;")}>
                  <span style={css("font-size:15px; font-weight:600; color:#FFFFFF;")}>{ad.title}</span>
                  <div style={css("display:flex; gap:8px; flex-shrink:0;")}>
                    <a href={`/ads/mivo-${ad.name}-post.png`} download style={css("font-size:12.5px; color:#E6E9EF; border:1px solid rgba(46,229,124,0.35); border-radius:999px; padding:6px 12px;")}>منشور</a>
                    <a href={`/ads/mivo-${ad.name}-story.png`} download style={css("font-size:12.5px; color:#E6E9EF; border:1px solid rgba(255,255,255,0.14); border-radius:999px; padding:6px 12px;")}>ستوري</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SOLUTIONS */}
        <section id="solutions" style={css("max-width:1200px; margin:0 auto; padding:56px 40px;")}>
          <div style={css("text-align:center; margin-bottom:44px;")}>
            <div style={css("font-size:13px; letter-spacing:0.28em; color:#2EE57C; text-transform:uppercase; margin-bottom:12px;")}>Solutions</div>
            <h2 className="rg-section-h2" style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 12px;")}>حلول RICO التقنية</h2>
            <p style={css("font-size:16px; color:#AEB6C4; line-height:1.8; margin:0 auto; max-width:680px;")}>إلى جانب تطوير منتجاتنا، تعمل RICO في مجال تقنيات الذكاء الاصطناعي وتقنية المعلومات، مع التركيز على بناء حلول تستجيب لاحتياجات الأفراد والأعمال.</p>
          </div>
          <div style={css("font-size:15px; font-weight:600; color:#E6E9EF; margin-bottom:16px;")}>تشمل مجالات عملنا:</div>
          <div className="rg-solutions-grid" style={css("display:grid; grid-template-columns:repeat(4,1fr); gap:16px;")}>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"></path></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>الذكاء الاصطناعي</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>توظيف التقنيات الذكية لتطوير تجارب وخدمات أكثر فاعلية.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>تطوير البرمجيات والتطبيقات</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>بناء حلول رقمية تخدم أهداف المستخدمين والأعمال.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="6" rx="1.5"></rect><rect x="3" y="14" width="18" height="6" rx="1.5"></rect><line x1="7" y1="7" x2="7.01" y2="7"></line><line x1="7" y1="17" x2="7.01" y2="17"></line></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>تقنية المعلومات</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>تقديم حلول تقنية تدعم التطور الرقمي.</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>الابتكار والتحول الرقمي</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.7;")}>استكشاف فرص استخدام التقنية لتبسيط الإجراءات وتحسين تجربة المستفيد.</div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={css("max-width:1200px; margin:0 auto; padding:40px 40px 80px;")}>
          <div className="rg-partners" style={css("background:linear-gradient(135deg, #0C1420, #0A121C); border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:40px; display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap;")}>
            <div style={css("max-width:640px;")}>
              <h2 className="rg-section-h2" style={css("font-size:30px; font-weight:700; color:#FFFFFF; margin:0 0 14px;")}>لنبنِ المستقبل معًا</h2>
              <p style={css("font-size:16px; color:#AEB6C4; line-height:1.8; margin:0 0 10px;")}>في RICO، نؤمن بأن أفضل الحلول التقنية تبدأ بفهم المشكلة الحقيقية، وتُقاس بقيمتها في حياة الناس وأعمالهم.</p>
              <p style={css("font-size:16px; color:#AEB6C4; line-height:1.8; margin:0 0 16px;")}>سواء كنت تبحث عن حل تقني لعملك، أو ترغب في التعرف على منتجاتنا، يسعدنا أن نتواصل معك لاستكشاف فرص التعاون.</p>
              <p style={css("font-size:16px; font-weight:600; color:#E6E9EF; margin:0;")}>RICO — <span style={css("color:#C9A24A;")}>حلول ذكية لاحتياجات حقيقية.</span></p>
            </div>
            <a href={`mailto:${CONTACT_EMAIL}`} style={css("background:#22C55E; color:#04140A; font-weight:600; padding:15px 32px; border-radius:12px; font-size:16px; white-space:nowrap; box-shadow:0 12px 30px rgba(34,197,94,0.25);")}>تواصل معنا</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={css("border-top:1px solid rgba(255,255,255,0.06); background:#060A11;")}>
          <div className="rg-footer-grid" style={css("max-width:1200px; margin:0 auto; padding:48px 40px 28px; display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:32px;")}>
            <div>
              <div style={css("display:flex; align-items:center; gap:12px; margin-bottom:16px;")}>
                <svg viewBox="0 0 200 240" style={css("color:#FFFFFF; width:32px; height:38px;")}><use href="#rmark"></use></svg>
                <span style={css("font-size:18px; font-weight:700; color:#FFFFFF; letter-spacing:-0.01em;")}>RICO</span>
              </div>
              <p style={css("color:#8A93A5; font-size:14px; line-height:1.7; margin:0; max-width:260px;")}>تقنية تفهم احتياجك، وابتكار يصنع الفرق. حلول ذكية لاحتياجات حقيقية.</p>
            </div>
            <div>
              <div style={css("color:#FFFFFF; font-weight:600; font-size:15px; margin-bottom:14px;")}>Mivo AI</div>
              <div style={css("display:flex; flex-direction:column; gap:10px; font-size:14px;")}>
                <a href="#mivo" style={css("color:#9AA4B4;")}>تعرف على Mivo AI</a>
                <a href="#how-it-works" style={css("color:#9AA4B4;")}>كيف يعمل</a>
                <a href="#campaigns" style={css("color:#9AA4B4;")}>حملات Mivo AI</a>
              </div>
            </div>
            <div>
              <div style={css("color:#FFFFFF; font-weight:600; font-size:15px; margin-bottom:14px;")}>الشركة</div>
              <div style={css("display:flex; flex-direction:column; gap:10px; font-size:14px;")}>
                <a href="#about" style={css("color:#9AA4B4;")}>من نحن</a>
                <a href="#solutions" style={css("color:#9AA4B4;")}>حلول RICO التقنية</a>
              </div>
            </div>
            <div>
              <div style={css("color:#FFFFFF; font-weight:600; font-size:15px; margin-bottom:14px;")}>تواصل معنا</div>
              <div style={css("display:flex; flex-direction:column; gap:10px; font-size:14px;")}>
                <a href={`mailto:${CONTACT_EMAIL}`} style={css("color:#9AA4B4;")} dir="ltr">{CONTACT_EMAIL}</a>
                <a href="tel:+966501212622" style={css("color:#9AA4B4;")} dir="ltr">+966 50 121 2622</a>
                <span style={css("color:#9AA4B4;")}>المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
          <div style={css("max-width:1200px; margin:0 auto; padding:0 40px 28px; border-top:1px solid rgba(255,255,255,0.05); padding-top:20px; color:#5C6678; font-size:13px;")} suppressHydrationWarning>© {year} RICO — جميع الحقوق محفوظة.</div>
        </footer>

      </main>
    </>
  );
}
