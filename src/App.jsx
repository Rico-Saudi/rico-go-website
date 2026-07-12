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

export default function App() {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const year = new Date().getFullYear();

  const onPhone = (e) => setPhone(e.target.value);
  const submit = () => {
    if (phone.trim().length >= 6) setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');

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
      `}</style>

      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="rmark" viewBox="0 0 200 240">
          <path d="M 47 36 L 47 206" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round"></path>
          <path d="M 47 44 C 104 20 160 46 160 92 C 160 130 122 140 86 121" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round"></path>
          <path d="M 96 120 L 154 200" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round"></path>
          <circle cx="176" cy="192" r="16" fill="#C9A24A"></circle>
        </symbol>
      </svg>

      <main className="rico-go" dir="rtl" style={css("width:100%; overflow-x:hidden; background:radial-gradient(1200px 600px at 80% -5%, rgba(34,197,94,0.10), transparent 60%), radial-gradient(900px 500px at 5% 10%, rgba(201,162,74,0.06), transparent 55%), #070B14;")}>

        {/* NAV */}
        <nav style={css("position:sticky; top:0; z-index:50; display:flex; align-items:center; justify-content:space-between; gap:24px; padding:16px 40px; background:rgba(7,11,20,0.82); border-bottom:1px solid rgba(255,255,255,0.06); backdrop-filter:blur(12px);")}>
          <a href="#" style={css("display:flex; align-items:center; gap:12px; flex-shrink:0;")}>
            <svg viewBox="0 0 200 240" style={css("color:#FFFFFF; width:34px; height:41px; flex-shrink:0;")}><use href="#rmark"></use></svg>
          </a>
          <div style={css("display:flex; align-items:center; gap:32px; font-size:15px; color:#AEB6C4;")}>
            <a href="#" style={css("color:#E6E9EF;")}>الرئيسية</a>
            <a href="#how-it-works" style={css("color:#AEB6C4;")}>كيف يعمل</a>
            <a href="#" style={css("color:#AEB6C4;")}>الأسعار</a>
            <a href="#" style={css("color:#AEB6C4;")}>عن ريكو</a>
          </div>
          <a href="#waitlist" style={css("background:#22C55E; color:#04140A; font-weight:600; padding:11px 22px; border-radius:11px; font-size:15px; box-shadow:0 8px 24px rgba(34,197,94,0.25);")}>جرّب ريكو الآن</a>
        </nav>

        {/* HERO */}
        <section style={css("max-width:1200px; margin:0 auto; padding:72px 40px 40px; display:grid; grid-template-columns:1.1fr 0.9fr; gap:48px; align-items:center;")}>
          <div>
            <div style={css("display:inline-flex; align-items:center; gap:8px; padding:7px 14px; border:1px solid rgba(46,229,124,0.3); border-radius:999px; background:rgba(34,197,94,0.08); font-size:13px; color:#6BF3A5; margin-bottom:24px;")}>
              <span style={css("width:7px; height:7px; border-radius:50%; background:#2EE57C; box-shadow:0 0 10px #2EE57C;")}></span>
              مساعد ذكي للتجارة في السعودية
            </div>
            <h1 style={css("font-size:52px; line-height:1.18; font-weight:700; color:#FFFFFF; margin:0 0 18px; letter-spacing:-0.01em;")}>اطلب من ريكو..<br/>وهو <span style={css("color:#2EE57C;")}>ينفّذ</span> عنك</h1>
            <p style={css("font-size:19px; line-height:1.7; color:#AEB6C4; margin:0 0 28px; max-width:520px;")}>قل له ما تريد… وريكو يفهم ويبحث ويقارن ويطلب ويدفع ويتابع — كل شيء عنك، بدون أي ضغط منك.</p>
            <div style={css("display:flex; gap:20px; flex-wrap:wrap; margin-bottom:30px;")}>
              <div style={css("display:flex; align-items:center; gap:8px; color:#D6DBE4; font-size:15px;")}><span style={css("color:#2EE57C;")}>✓</span> بدون ضغط</div>
              <div style={css("display:flex; align-items:center; gap:8px; color:#D6DBE4; font-size:15px;")}><span style={css("color:#2EE57C;")}>✓</span> بدون بحث</div>
              <div style={css("display:flex; align-items:center; gap:8px; color:#D6DBE4; font-size:15px;")}><span style={css("color:#2EE57C;")}>✓</span> بدون انتظار</div>
            </div>
            <div style={css("display:flex; gap:14px; flex-wrap:wrap;")}>
              <a href="#waitlist" style={css("background:#22C55E; color:#04140A; font-weight:600; padding:15px 30px; border-radius:12px; font-size:16px; box-shadow:0 12px 30px rgba(34,197,94,0.3);")}>جرّب ريكو الآن</a>
              <a href="#download" style={css("border:1px solid rgba(255,255,255,0.18); color:#E6E9EF; padding:15px 28px; border-radius:12px; font-size:16px;")}>حمّل التطبيق</a>
            </div>
          </div>

          <div style={css("position:relative; display:flex; align-items:center; justify-content:center; min-height:440px;")}>
            <div style={css("position:absolute; width:340px; height:340px; border-radius:50%; background:radial-gradient(circle, rgba(34,197,94,0.22), transparent 70%); filter:blur(10px); animation:ricoPulse 4s ease-in-out infinite;")}></div>
            <div style={css("position:relative; width:330px; height:400px; animation:ricoFloat 6s ease-in-out infinite;")}>
              <div style={css("position:absolute; inset:0; border:1px solid rgba(255,255,255,0.08); border-radius:24px; overflow:hidden; background:#0C131E;")}>
                <img src="data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20420%20560%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20role%3D%22img%22%20aria-label%3D%22Rico%20robot%20mascot%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22body%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23FFFFFF%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220.55%22%20stop-color%3D%22%23EEF2F7%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23C9D2DE%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bodyEdge%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%220%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23AEB9C7%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220.12%22%20stop-color%3D%22%23FFFFFF%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220.88%22%20stop-color%3D%22%23FFFFFF%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23AEB9C7%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22visor%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23141d2a%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2305090f%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22eyeGlow%22%20cx%3D%220.5%22%20cy%3D%220.45%22%20r%3D%220.7%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%238BFFC0%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220.5%22%20stop-color%3D%22%232EE57C%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232EE57C%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22floor%22%20cx%3D%220.5%22%20cy%3D%220.5%22%20r%3D%220.5%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%232EE57C%22%20stop-opacity%3D%220.28%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232EE57C%22%20stop-opacity%3D%220%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-60%25%22%20y%3D%22-60%25%22%20width%3D%22220%25%22%20height%3D%22220%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%226%22%20result%3D%22b%22%3E%3C%2FfeGaussianBlur%3E%0A%20%20%20%20%20%20%3CfeMerge%3E%3CfeMergeNode%20in%3D%22b%22%3E%3C%2FfeMergeNode%3E%3CfeMergeNode%20in%3D%22SourceGraphic%22%3E%3C%2FfeMergeNode%3E%3C%2FfeMerge%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22chest%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23101a27%22%3E%3C%2Fstop%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23060b12%22%3E%3C%2Fstop%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%0A%20%20%3Cellipse%20cx%3D%22210%22%20cy%3D%22530%22%20rx%3D%22150%22%20ry%3D%2226%22%20fill%3D%22url(%23floor)%22%3E%3C%2Fellipse%3E%0A%0A%20%20%0A%20%20%3Crect%20x%3D%22205%22%20y%3D%2240%22%20width%3D%2210%22%20height%3D%2246%22%20rx%3D%225%22%20fill%3D%22%23C9D2DE%22%3E%3C%2Frect%3E%0A%20%20%3Ccircle%20cx%3D%22210%22%20cy%3D%2240%22%20r%3D%2213%22%20fill%3D%22%232EE57C%22%20filter%3D%22url(%23glow)%22%3E%3C%2Fcircle%3E%0A%20%20%3Ccircle%20cx%3D%22210%22%20cy%3D%2240%22%20r%3D%226%22%20fill%3D%22%23C6FFDD%22%3E%3C%2Fcircle%3E%0A%0A%20%20%0A%20%20%0A%20%20%3Cg%3E%0A%20%20%20%20%3Crect%20x%3D%2270%22%20y%3D%22330%22%20width%3D%2246%22%20height%3D%22150%22%20rx%3D%2223%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2293%22%20cy%3D%22486%22%20r%3D%2230%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Fcircle%3E%0A%20%20%3C%2Fg%3E%0A%20%20%0A%20%20%3Cg%3E%0A%20%20%20%20%3Crect%20x%3D%22300%22%20y%3D%22250%22%20width%3D%2244%22%20height%3D%22120%22%20rx%3D%2222%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%20transform%3D%22rotate(18%20322%20310)%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22356%22%20cy%3D%22238%22%20r%3D%2234%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Fcircle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22356%22%20cy%3D%22238%22%20r%3D%2220%22%20fill%3D%22%23EAEFF5%22%3E%3C%2Fcircle%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%0A%20%20%3Cpath%20d%3D%22M120%20470%20C120%20360%20150%20300%20210%20300%20C270%20300%20300%20360%20300%20470%20C300%20500%20280%20512%20250%20512%20L170%20512%20C140%20512%20120%20500%20120%20470%20Z%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Fpath%3E%0A%20%20%0A%20%20%3Ccircle%20cx%3D%22132%22%20cy%3D%22330%22%20r%3D%2234%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Fcircle%3E%0A%20%20%3Ccircle%20cx%3D%22288%22%20cy%3D%22330%22%20r%3D%2234%22%20fill%3D%22url(%23body)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Fcircle%3E%0A%0A%20%20%0A%20%20%3Ccircle%20cx%3D%22210%22%20cy%3D%22392%22%20r%3D%2246%22%20fill%3D%22url(%23chest)%22%20stroke%3D%22rgba(46%2C229%2C124%2C0.35)%22%20stroke-width%3D%222%22%3E%3C%2Fcircle%3E%0A%20%20%3Cg%20transform%3D%22translate(210%20392)%20scale(0.34)%20translate(-100%20-120)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M%2047%2036%20L%2047%20206%22%20fill%3D%22none%22%20stroke%3D%22%232EE57C%22%20stroke-width%3D%2230%22%20stroke-linecap%3D%22round%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Cpath%20d%3D%22M%2047%2044%20C%20104%2020%20160%2046%20160%2092%20C%20160%20130%20122%20140%2086%20121%22%20fill%3D%22none%22%20stroke%3D%22%232EE57C%22%20stroke-width%3D%2230%22%20stroke-linecap%3D%22round%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Cpath%20d%3D%22M%2096%20120%20L%20154%20200%22%20fill%3D%22none%22%20stroke%3D%22%232EE57C%22%20stroke-width%3D%2230%22%20stroke-linecap%3D%22round%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22176%22%20cy%3D%22192%22%20r%3D%2216%22%20fill%3D%22%23C9A24A%22%3E%3C%2Fcircle%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%0A%20%20%3Crect%20x%3D%22182%22%20y%3D%22238%22%20width%3D%2256%22%20height%3D%2234%22%20rx%3D%2212%22%20fill%3D%22%23DCE3EB%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Frect%3E%0A%0A%20%20%0A%20%20%0A%20%20%3Crect%20x%3D%2286%22%20y%3D%22128%22%20width%3D%2226%22%20height%3D%2260%22%20rx%3D%2213%22%20fill%3D%22%23161d29%22%3E%3C%2Frect%3E%0A%20%20%3Ccircle%20cx%3D%2299%22%20cy%3D%22158%22%20r%3D%227%22%20fill%3D%22%232EE57C%22%3E%3C%2Fcircle%3E%0A%20%20%3Crect%20x%3D%22308%22%20y%3D%22128%22%20width%3D%2226%22%20height%3D%2260%22%20rx%3D%2213%22%20fill%3D%22%23161d29%22%3E%3C%2Frect%3E%0A%20%20%3Ccircle%20cx%3D%22321%22%20cy%3D%22158%22%20r%3D%227%22%20fill%3D%22%232EE57C%22%3E%3C%2Fcircle%3E%0A%0A%20%20%3Crect%20x%3D%22104%22%20y%3D%2284%22%20width%3D%22212%22%20height%3D%22176%22%20rx%3D%2252%22%20fill%3D%22url(%23bodyEdge)%22%20stroke%3D%22%23B7C1CE%22%20stroke-width%3D%222%22%3E%3C%2Frect%3E%0A%20%20%0A%20%20%3Crect%20x%3D%22126%22%20y%3D%2298%22%20width%3D%22168%22%20height%3D%2240%22%20rx%3D%2220%22%20fill%3D%22%23FFFFFF%22%20opacity%3D%220.7%22%3E%3C%2Frect%3E%0A%0A%20%20%0A%20%20%3Crect%20x%3D%22126%22%20y%3D%22112%22%20width%3D%22168%22%20height%3D%22118%22%20rx%3D%2244%22%20fill%3D%22url(%23visor)%22%3E%3C%2Frect%3E%0A%20%20%3Crect%20x%3D%22126%22%20y%3D%22112%22%20width%3D%22168%22%20height%3D%2260%22%20rx%3D%2244%22%20fill%3D%22%231c2735%22%20opacity%3D%220.5%22%3E%3C%2Frect%3E%0A%0A%20%20%0A%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%3Crect%20x%3D%22158%22%20y%3D%22150%22%20width%3D%2234%22%20height%3D%2248%22%20rx%3D%2217%22%20fill%3D%22%232EE57C%22%3E%3C%2Frect%3E%0A%20%20%20%20%3Crect%20x%3D%22228%22%20y%3D%22150%22%20width%3D%2234%22%20height%3D%2248%22%20rx%3D%2217%22%20fill%3D%22%232EE57C%22%3E%3C%2Frect%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Crect%20x%3D%22164%22%20y%3D%22156%22%20width%3D%2214%22%20height%3D%2220%22%20rx%3D%227%22%20fill%3D%22%23CFFFE3%22%20opacity%3D%220.9%22%3E%3C%2Frect%3E%0A%20%20%3Crect%20x%3D%22234%22%20y%3D%22156%22%20width%3D%2214%22%20height%3D%2220%22%20rx%3D%227%22%20fill%3D%22%23CFFFE3%22%20opacity%3D%220.9%22%3E%3C%2Frect%3E%0A%3C%2Fsvg%3E" alt="روبوت ريكو" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
            </div>
            {/* floating chat bubble */}
            <div style={css("position:absolute; bottom:24px; right:-8px; background:#0F1B27; border:1px solid rgba(46,229,124,0.28); border-radius:16px 16px 4px 16px; padding:14px 16px; max-width:230px; box-shadow:0 16px 40px rgba(0,0,0,0.4);")}>
              <div style={css("font-size:14px; color:#E6E9EF; line-height:1.6;")}>ريكو اطلب لي كبسة حبة ونص من أقرب مطعم ممتاز</div>
            </div>
            <div style={css("position:absolute; top:34px; left:-10px; display:flex; align-items:center; gap:8px; background:#0F1B27; border:1px solid rgba(255,255,255,0.1); border-radius:14px; padding:10px 14px; box-shadow:0 16px 40px rgba(0,0,0,0.4);")}>
              <span style={css("width:9px; height:9px; border-radius:50%; background:#2EE57C; box-shadow:0 0 8px #2EE57C;")}></span>
              <span style={css("font-size:13px; color:#AEB6C4;")}>جاري تنفيذ الطلب…</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={css("max-width:1120px; margin:24px auto 0; padding:0 40px;")}>
          <div style={css("display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.07); border-radius:18px; overflow:hidden;")}>
            <div style={css("background:#0B1320; padding:30px; text-align:center;")}>
              <div style={css("font-size:38px; font-weight:700; color:#2EE57C;")}>+50,000</div>
              <div style={css("font-size:15px; color:#AEB6C4; margin-top:6px;")}>طلب تم تنفيذه</div>
            </div>
            <div style={css("background:#0B1320; padding:30px; text-align:center;")}>
              <div style={css("font-size:38px; font-weight:700; color:#2EE57C;")}>+1,200</div>
              <div style={css("font-size:15px; color:#AEB6C4; margin-top:6px;")}>متجر ومطعم متاح</div>
            </div>
            <div style={css("background:#0B1320; padding:30px; text-align:center;")}>
              <div style={css("font-size:38px; font-weight:700; color:#2EE57C;")}>+20</div>
              <div style={css("font-size:15px; color:#AEB6C4; margin-top:6px;")}>مدينة في السعودية</div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" style={css("max-width:1200px; margin:0 auto; padding:88px 40px 40px;")}>
          <div style={css("text-align:center; margin-bottom:48px;")}>
            <div style={css("font-size:13px; letter-spacing:0.28em; color:#2EE57C; text-transform:uppercase; margin-bottom:12px;")}>How It Works</div>
            <h2 style={css("font-size:36px; font-weight:700; color:#FFFFFF; margin:0;")}>كيف يعمل ريكو قو؟</h2>
          </div>
          <div style={css("display:grid; grid-template-columns:repeat(5,1fr); gap:16px;")}>
            <div style={css("background:#0C1420; border:1px solid rgba(46,229,124,0.16); border-radius:16px; padding:24px 18px; text-align:center;")}>
              <div style={css("width:40px; height:40px; margin:0 auto 16px; border-radius:12px; background:rgba(34,197,94,0.12); color:#2EE57C; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:17px;")}>1</div>
              <div style={css("font-size:17px; font-weight:600; color:#FFFFFF; margin-bottom:8px;")}>يفهم طلبك</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.6;")}>يفهم طلبك بلغة طبيعية كما تتكلم</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(46,229,124,0.16); border-radius:16px; padding:24px 18px; text-align:center;")}>
              <div style={css("width:40px; height:40px; margin:0 auto 16px; border-radius:12px; background:rgba(34,197,94,0.12); color:#2EE57C; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:17px;")}>2</div>
              <div style={css("font-size:17px; font-weight:600; color:#FFFFFF; margin-bottom:8px;")}>يختار الأفضل لك</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.6;")}>يبحث ويقارن ويختار أفضل خيار قريب</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(46,229,124,0.16); border-radius:16px; padding:24px 18px; text-align:center;")}>
              <div style={css("width:40px; height:40px; margin:0 auto 16px; border-radius:12px; background:rgba(34,197,94,0.12); color:#2EE57C; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:17px;")}>3</div>
              <div style={css("font-size:17px; font-weight:600; color:#FFFFFF; margin-bottom:8px;")}>ينفّذ الطلب</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.6;")}>يدخل نظام المتجر ويضع الطلب تلقائيًا</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(46,229,124,0.16); border-radius:16px; padding:24px 18px; text-align:center;")}>
              <div style={css("width:40px; height:40px; margin:0 auto 16px; border-radius:12px; background:rgba(34,197,94,0.12); color:#2EE57C; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:17px;")}>4</div>
              <div style={css("font-size:17px; font-weight:600; color:#FFFFFF; margin-bottom:8px;")}>يتابع الطلب</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.6;")}>يتابع حالة الطلب حتى يصل إليك</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(46,229,124,0.16); border-radius:16px; padding:24px 18px; text-align:center;")}>
              <div style={css("width:40px; height:40px; margin:0 auto 16px; border-radius:12px; background:rgba(34,197,94,0.12); color:#2EE57C; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:17px;")}>5</div>
              <div style={css("font-size:17px; font-weight:600; color:#FFFFFF; margin-bottom:8px;")}>يصلك طلبك</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.6;")}>يصل الطلب لموقعك وأنت مرتاح</div>
            </div>
          </div>
        </section>

        {/* DEMO + PROMPTS */}
        <section style={css("max-width:1200px; margin:0 auto; padding:56px 40px; display:grid; grid-template-columns:0.85fr 1.15fr; gap:48px; align-items:center;")}>
          {/* phone chat mock */}
          <div style={css("justify-self:center; width:300px; height:600px; background:#0A0F18; border:10px solid #161d29; border-radius:44px; box-shadow:0 30px 70px rgba(0,0,0,0.5); overflow:hidden; position:relative;")}>
            <div style={css("height:44px; display:flex; align-items:center; justify-content:space-between; padding:0 22px; font-size:12px; color:#8A93A5;")}><span>9:41</span><span>ريكو</span></div>
            <div style={css("padding:14px 16px; display:flex; flex-direction:column; gap:14px;")}>
              <div style={css("align-self:flex-start; background:#141d2a; color:#E6E9EF; padding:12px 14px; border-radius:14px 14px 14px 4px; font-size:14px; line-height:1.6; max-width:82%;")}>أهلاً! أنا ريكو 👋 قل لي وش تبي وأنا أنفّذه لك.</div>
              <div style={css("align-self:flex-end; background:#1c8f4e; color:#EAFBF0; padding:12px 14px; border-radius:14px 14px 4px 14px; font-size:14px; line-height:1.6; max-width:82%;")}>اطلب لي كبسة حبة ونص من أقرب مطعم ممتاز</div>
              <div style={css("align-self:flex-start; background:#141d2a; color:#E6E9EF; padding:12px 14px; border-radius:14px; font-size:14px; line-height:1.7; max-width:88%;")}>
                تمام ✓ لقيت لك <b style={css("color:#2EE57C;")}>مطعم بيت الكبسة</b> · 4.8★ · يبعد 1.2 كم
                <div style={css("margin-top:8px; color:#94A0B3; font-size:13px;")}>الكمية 1.5 · 38 ريال · يوصل خلال 25 دقيقة</div>
              </div>
              <div style={css("align-self:flex-start; display:flex; align-items:center; gap:8px; color:#94A0B3; font-size:13px;")}><span style={css("width:8px;height:8px;border-radius:50%;background:#2EE57C;box-shadow:0 0 8px #2EE57C;")}></span> جاري تنفيذ الطلب…</div>
            </div>
            <div style={css("position:absolute; bottom:16px; left:16px; right:16px; display:flex; align-items:center; gap:10px; background:#121a26; border:1px solid rgba(255,255,255,0.08); border-radius:999px; padding:8px 8px 8px 16px;")}>
              <span style={css("flex:1; color:#6C7688; font-size:13px;")}>اضغط للتحدث…</span>
              <span style={css("width:38px; height:38px; border-radius:50%; background:#22C55E; display:flex; align-items:center; justify-content:center;")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#04140A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
              </span>
            </div>
          </div>

          <div>
            <div style={css("font-size:13px; letter-spacing:0.28em; color:#C9A24A; text-transform:uppercase; margin-bottom:12px;")}>Just Ask</div>
            <h2 style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 14px;")}>أمثلة طلبات تقولها لريكو</h2>
            <p style={css("font-size:17px; color:#AEB6C4; line-height:1.7; margin:0 0 26px; max-width:520px;")}>اكتبها أو قلها صوتيًا — ريكو يفهمك ويكمّل الباقي بنفسه.</p>
            <div style={css("display:flex; flex-direction:column; gap:12px;")}>
              <div style={css("display:flex; align-items:center; gap:14px; background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:15px 18px;")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="12" x2="4" y2="12"></line><line x1="8" y1="8" x2="8" y2="16"></line><line x1="12" y1="4" x2="12" y2="20"></line><line x1="16" y1="9" x2="16" y2="15"></line><line x1="20" y1="11" x2="20" y2="13"></line></svg>
                <span style={css("font-size:15.5px; color:#E6E9EF;")}>«ريكو اطلب لي بيتزا كبيرة من دومينوز»</span>
              </div>
              <div style={css("display:flex; align-items:center; gap:14px; background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:15px 18px;")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="12" x2="4" y2="12"></line><line x1="8" y1="8" x2="8" y2="16"></line><line x1="12" y1="4" x2="12" y2="20"></line><line x1="16" y1="9" x2="16" y2="15"></line><line x1="20" y1="11" x2="20" y2="13"></line></svg>
                <span style={css("font-size:15.5px; color:#E6E9EF;")}>«ريكو اطلب لي سلة البيت الشهرية من أرخص متجر»</span>
              </div>
              <div style={css("display:flex; align-items:center; gap:14px; background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:15px 18px;")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="12" x2="4" y2="12"></line><line x1="8" y1="8" x2="8" y2="16"></line><line x1="12" y1="4" x2="12" y2="20"></line><line x1="16" y1="9" x2="16" y2="15"></line><line x1="20" y1="11" x2="20" y2="13"></line></svg>
                <span style={css("font-size:15.5px; color:#E6E9EF;")}>«ريكو الطلب لي قهوة لاتيه باردة وحلا»</span>
              </div>
              <div style={css("display:flex; align-items:center; gap:14px; background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:15px 18px;")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="12" x2="4" y2="12"></line><line x1="8" y1="8" x2="8" y2="16"></line><line x1="12" y1="4" x2="12" y2="20"></line><line x1="16" y1="9" x2="16" y2="15"></line><line x1="20" y1="11" x2="20" y2="13"></line></svg>
                <span style={css("font-size:15.5px; color:#E6E9EF;")}>«ريكو ابغى أفضل عرض جوال أيفون قريب مني»</span>
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section style={css("max-width:1200px; margin:0 auto; padding:56px 40px;")}>
          <div style={css("text-align:center; margin-bottom:44px;")}>
            <h2 style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 10px;")}>ريكو ينفّذ الطلب بالكامل — بدون أي ضغط منك</h2>
            <p style={css("font-size:16px; color:#AEB6C4; margin:0;")}>من فهم الطلب حتى وصوله، ريكو يتكفّل بكل خطوة.</p>
          </div>
          <div style={css("display:grid; grid-template-columns:repeat(5,1fr); gap:16px;")}>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>تحديد الموقع تلقائيًا</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.6;")}>يحدد موقعك بدقة دون خطوات إضافية</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h12l-1 7H7L6 2z"></path><path d="M5 9h14l-1 12H6L5 9z"></path></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>اختيار المتجر الأفضل</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.6;")}>حسب التقييم والوقت والسعر</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>تخصيص الطلب</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.6;")}>الكمية والإضافات والملاحظات</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>اختيار طريقة الدفع</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.6;")}>المحفظة، مدى، Apple Pay</div>
            </div>
            <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:22px;")}>
              <div style={css("width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"></path><path d="M22 2 15 22l-4-9-9-4 20-7z"></path></svg></div>
              <div style={css("font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:6px;")}>الإرسال والتتبع</div>
              <div style={css("font-size:13.5px; color:#94A0B3; line-height:1.6;")}>يرسل الطلب ويتابعه حتى يصلك</div>
            </div>
          </div>
        </section>

        {/* APP SHOWCASE */}
        <section id="download" style={css("max-width:1200px; margin:0 auto; padding:56px 40px;")}>
          <div style={css("background:linear-gradient(180deg, #0C1622, #0A121C); border:1px solid rgba(255,255,255,0.07); border-radius:24px; padding:48px; display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center;")}>
            <div>
              <div style={css("font-size:13px; letter-spacing:0.28em; color:#2EE57C; text-transform:uppercase; margin-bottom:12px;")}>The App</div>
              <h2 style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 16px;")}>تطبيق واحد يطلب لك كل شيء</h2>
              <p style={css("font-size:17px; color:#AEB6C4; line-height:1.7; margin:0 0 26px;")}>طعام، بقالة، خدمات — قارن الأسعار، وفّر وقتك، وخلّي ريكو ينفّذ. متوفر قريبًا على iOS و Android.</p>
              <div style={css("display:flex; gap:14px; flex-wrap:wrap;")}>
                <a href="#waitlist" style={css("display:flex; align-items:center; gap:10px; background:#111a26; border:1px solid rgba(255,255,255,0.14); border-radius:12px; padding:12px 20px; color:#E6E9EF;")}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#E6E9EF"><path d="M16.5 1.6c0 1.1-.4 2.1-1.2 3-.9 1-2 1.5-3 1.4-.1-1.1.4-2.2 1.1-3 .8-.9 2.1-1.5 3.1-1.4zM20 17.2c-.5 1.2-.8 1.7-1.4 2.8-1 1.6-2.3 3.6-4 3.6-1.5 0-1.9-1-3.9-1-2 0-2.4 1-3.9 1-1.7 0-3-1.8-4-3.4C.4 15.7 0 12.2 1.7 9.9c1-1.3 2.5-2.1 4-2.1 1.6 0 2.6 1 3.9 1 1.3 0 2.1-1 3.9-1 1.4 0 2.9.8 3.9 2.1-3.4 1.9-2.9 6.8.7 8.3z"></path></svg>
                  <span style={css("font-size:15px; white-space:nowrap;")}>App Store</span>
                </a>
                <a href="#waitlist" style={css("display:flex; align-items:center; gap:10px; background:#111a26; border:1px solid rgba(255,255,255,0.14); border-radius:12px; padding:12px 20px; color:#E6E9EF;")}>
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M3 3.5v17l9.5-8.5L3 3.5z" fill="#2EE57C"></path><path d="M14 11 5 3l11.5 6.5L14 11z" fill="#C9A24A"></path><path d="M14 13l2.5 1.5L5 21l9-8z" fill="#4B9EF8"></path><path d="M16.5 9.5 20 11.5c1 .6 1 1.8 0 2.4l-3.5 2L14 13l2.5-3.5z" fill="#F7C94A"></path></svg>
                  <span style={css("font-size:15px; white-space:nowrap;")}>Google Play</span>
                </a>
              </div>
            </div>
            <div style={css("display:flex; gap:18px; justify-content:center;")}>
              <div style={css("width:210px; height:430px; border:8px solid #161d29; border-radius:36px; overflow:hidden; background:#0A0F18; box-shadow:0 24px 60px rgba(0,0,0,0.5);")}>
                <div style={css("width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#5C6678; font-size:13px; text-align:center; padding:12px;")}>لقطة الشاشة ١</div>
              </div>
              <div style={css("width:210px; height:430px; border:8px solid #161d29; border-radius:36px; overflow:hidden; background:#0A0F18; box-shadow:0 24px 60px rgba(0,0,0,0.5); margin-top:26px;")}>
                <div style={css("width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#5C6678; font-size:13px; text-align:center; padding:12px;")}>لقطة الشاشة ٢</div>
              </div>
            </div>
          </div>
        </section>

        {/* PAYMENTS + SAFETY */}
        <section style={css("max-width:1200px; margin:0 auto; padding:40px 40px 56px; display:grid; grid-template-columns:1fr 1fr; gap:24px;")}>
          <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:32px;")}>
            <h3 style={css("font-size:22px; font-weight:600; color:#FFFFFF; margin:0 0 22px;")}>طرق الدفع المتاحة</h3>
            <div style={css("display:grid; grid-template-columns:1fr 1fr; gap:14px;")}>
              <div style={css("display:flex; align-items:center; gap:12px; background:#0A111B; border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:16px;")}><span style={css("width:36px;height:36px;border-radius:10px;background:rgba(34,197,94,0.12);display:flex;align-items:center;justify-content:center;")}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="2"><rect x="2" y="6" width="20" height="13" rx="2"></rect><path d="M16 12h.01"></path></svg></span><span style={css("color:#E6E9EF; font-size:15px;")}>محفظة ريكو</span></div>
              <div style={css("display:flex; align-items:center; gap:12px; background:#0A111B; border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:16px;")}><span style={css("width:36px;height:36px;border-radius:10px;background:rgba(34,197,94,0.12);display:flex;align-items:center;justify-content:center;font-weight:700;color:#2EE57C;font-size:13px;")}>مدى</span><span style={css("color:#E6E9EF; font-size:15px;")}>مدى</span></div>
              <div style={css("display:flex; align-items:center; gap:12px; background:#0A111B; border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:16px;")}><span style={css("width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;")}><svg width="18" height="18" viewBox="0 0 24 24" fill="#E6E9EF"><path d="M16.5 1.6c0 1.1-.4 2.1-1.2 3-.9 1-2 1.5-3 1.4-.1-1.1.4-2.2 1.1-3 .8-.9 2.1-1.5 3.1-1.4zM20 17.2c-.5 1.2-.8 1.7-1.4 2.8-1 1.6-2.3 3.6-4 3.6-1.5 0-1.9-1-3.9-1-2 0-2.4 1-3.9 1-1.7 0-3-1.8-4-3.4C.4 15.7 0 12.2 1.7 9.9c1-1.3 2.5-2.1 4-2.1 1.6 0 2.6 1 3.9 1 1.3 0 2.1-1 3.9-1 1.4 0 2.9.8 3.9 2.1-3.4 1.9-2.9 6.8.7 8.3z"></path></svg></span><span style={css("color:#E6E9EF; font-size:15px;")}>Apple Pay</span></div>
              <div style={css("display:flex; align-items:center; gap:12px; background:#0A111B; border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:16px;")}><span style={css("width:36px;height:36px;border-radius:10px;background:rgba(140,90,220,0.18);display:flex;align-items:center;justify-content:center;font-weight:700;color:#B79BF0;font-size:11px;")}>stc</span><span style={css("color:#E6E9EF; font-size:15px;")}>STC Pay</span></div>
            </div>
          </div>
          <div style={css("background:#0C1420; border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:32px;")}>
            <h3 style={css("font-size:22px; font-weight:600; color:#FFFFFF; margin:0 0 22px;")}>أمان وخصوصية</h3>
            <div style={css("display:flex; flex-direction:column; gap:16px;")}>
              <div style={css("display:flex; align-items:center; gap:12px;")}><span style={css("width:24px;height:24px;border-radius:50%;background:rgba(34,197,94,0.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;")}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span style={css("color:#D6DBE4; font-size:15.5px;")}>بياناتك آمنة ومشفّرة 100%</span></div>
              <div style={css("display:flex; align-items:center; gap:12px;")}><span style={css("width:24px;height:24px;border-radius:50%;background:rgba(34,197,94,0.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;")}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span style={css("color:#D6DBE4; font-size:15.5px;")}>تأكيد منك قبل الطلب والدفع</span></div>
              <div style={css("display:flex; align-items:center; gap:12px;")}><span style={css("width:24px;height:24px;border-radius:50%;background:rgba(34,197,94,0.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;")}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span style={css("color:#D6DBE4; font-size:15.5px;")}>يمكنك إلغاء الطلب في أي وقت</span></div>
              <div style={css("display:flex; align-items:center; gap:12px;")}><span style={css("width:24px;height:24px;border-radius:50%;background:rgba(34,197,94,0.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;")}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2EE57C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span style={css("color:#D6DBE4; font-size:15.5px;")}>لا نحفظ بيانات بطاقتك البنكية</span></div>
            </div>
          </div>
        </section>

        {/* WAITLIST CTA */}
        <section id="waitlist" style={css("max-width:1000px; margin:0 auto; padding:40px 40px 80px;")}>
          <div style={css("position:relative; overflow:hidden; background:linear-gradient(135deg, #0d2a1c, #0A141F); border:1px solid rgba(46,229,124,0.25); border-radius:24px; padding:52px 48px; text-align:center;")}>
            <div style={css("position:absolute; width:400px;height:400px; border-radius:50%; background:radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%); top:-180px; right:-80px;")}></div>
            <div style={css("position:relative;")}>
              <h2 style={css("font-size:34px; font-weight:700; color:#FFFFFF; margin:0 0 12px;")}>جرّب ريكو — قل ما تريد، وسيهتم بالباقي</h2>
              <p style={css("font-size:17px; color:#B9C2D0; margin:0 0 28px;")}>انضم للوصول المبكر واحصل على أولوية التجربة عند الإطلاق.</p>
              {submitted && (
                <div style={css("display:inline-flex; align-items:center; gap:12px; background:rgba(34,197,94,0.12); border:1px solid rgba(46,229,124,0.4); border-radius:14px; padding:18px 28px;")}>
                  <span style={css("width:26px;height:26px;border-radius:50%;background:#22C55E;display:flex;align-items:center;justify-content:center;")}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#04140A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                  <span style={css("color:#EAFBF0; font-size:16px; font-weight:600;")}>تم تسجيلك! بنكلّمك على {phone} قريب.</span>
                </div>
              )}
              {!submitted && (
                <div style={css("display:flex; gap:12px; max-width:520px; margin:0 auto; flex-wrap:wrap; justify-content:center;")}>
                  <input value={phone} onChange={onPhone} placeholder="جوالك (مثال: 05xxxxxxxx)" style={css("flex:1; min-width:240px; background:#0A121C; border:1px solid rgba(255,255,255,0.14); border-radius:12px; padding:15px 18px; color:#FFFFFF; font-size:16px; font-family:inherit; outline:none;")} />
                  <button onClick={submit} style={css("background:#22C55E; color:#04140A; font-weight:600; padding:15px 34px; border-radius:12px; font-size:16px; border:none; cursor:pointer; box-shadow:0 12px 30px rgba(34,197,94,0.3); font-family:inherit;")}>انضم الآن</button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={css("border-top:1px solid rgba(255,255,255,0.06); background:#060A11;")}>
          <div style={css("max-width:1200px; margin:0 auto; padding:48px 40px 28px; display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:32px;")}>
            <div>
              <div style={css("display:flex; align-items:center; gap:12px; margin-bottom:16px;")}>
                <svg viewBox="0 0 200 240" style={css("color:#FFFFFF; width:32px; height:38px;")}><use href="#rmark"></use></svg>
              </div>
              <p style={css("color:#8A93A5; font-size:14px; line-height:1.7; margin:0; max-width:260px;")}>ذكاء ينفّذ طلبك بالكامل. اطلب من ريكو وهو ينفّذ عنك — في كل مدن السعودية.</p>
            </div>
            <div>
              <div style={css("color:#FFFFFF; font-weight:600; font-size:15px; margin-bottom:14px;")}>المنتج</div>
              <div style={css("display:flex; flex-direction:column; gap:10px; font-size:14px;")}>
                <a href="#how-it-works" style={css("color:#9AA4B4;")}>كيف يعمل</a>
                <a href="#" style={css("color:#9AA4B4;")}>الأسعار</a>
                <a href="#download" style={css("color:#9AA4B4;")}>حمّل التطبيق</a>
              </div>
            </div>
            <div>
              <div style={css("color:#FFFFFF; font-weight:600; font-size:15px; margin-bottom:14px;")}>الشركة</div>
              <div style={css("display:flex; flex-direction:column; gap:10px; font-size:14px;")}>
                <a href="#" style={css("color:#9AA4B4;")}>عن ريكو</a>
                <a href="#" style={css("color:#9AA4B4;")}>شراكات واستثمار</a>
              </div>
            </div>
            <div>
              <div style={css("color:#FFFFFF; font-weight:600; font-size:15px; margin-bottom:14px;")}>تواصل معنا</div>
              <div style={css("display:flex; flex-direction:column; gap:10px; font-size:14px;")}>
                <a href="tel:+966501212622" style={css("color:#9AA4B4;")} dir="ltr">+966 50 121 2622</a>
                <span style={css("color:#9AA4B4;")}>المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
          <div style={css("max-width:1200px; margin:0 auto; padding:0 40px 28px; border-top:1px solid rgba(255,255,255,0.05); padding-top:20px; color:#5C6678; font-size:13px;")}>© {year} RICO GO — جميع الحقوق محفوظة.</div>
        </footer>

      </main>
    </>
  );
}
