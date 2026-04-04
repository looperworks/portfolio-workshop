import { useState, useRef, useEffect } from "react";

/* ─── Design tokens ─── */
const T = {
  navy: "#222",
  navyLight: "#444",
  bg: "#fff",
  bgAlt: "#f7f7f7",
  border: "#e8e8e8",
  text: "#222",
  textMid: "#555",
  textLight: "#888",
  textMuted: "#aaa",
  textFaint: "#ccc",
  accent: "#222",
  accentLight: "#f4f4f4",
  coral: "#888",
  gold: "#888",
  steel: "#5a7a8a",
  steelLight: "#6d8d9d",
  sans: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  serif: "'Inter', 'Helvetica Neue', Arial, sans-serif",
};

/* ─── Part groupings ─── */
const PARTS = {
  part1: {
    title: "Narrative",
    modules: [1, 2, 3, 4, 5, 7],
  },
  part2: {
    title: "Grid",
    modules: [8, 9, 10, 11],
  },
  part3: {
    title: "Production",
    modules: [12, 13],
  },
};

/* ─── Sequential position map: mod.id → display number ─── */
const MODULE_POSITION = {};
let _pos = 1;
Object.values(PARTS).forEach(part => {
  part.modules.forEach(modId => { MODULE_POSITION[modId] = _pos++; });
});

/* ─── Inline Diagram Components ─── */

function DiagramNarrativeArc() {
  const acts = [
    { label: "ACT I", sub: "Setup", x: 60, y: 140, color: T.accent },
    { label: "ACT II", sub: "Confrontation", x: 200, y: 50, color: T.navy },
    { label: "ACT III", sub: "Synthesis", x: 340, y: 110, color: T.coral },
  ];
  return (
    <svg viewBox="0 0 420 180" style={{ width: "100%", height: "auto" }}>
      <path d="M 40 150 Q 120 140 200 50 Q 280 -20 380 120" fill="none" stroke={T.border} strokeWidth="2" />
      <path d="M 40 150 Q 120 140 200 50" fill="none" stroke={T.accent} strokeWidth="2.5" />
      <path d="M 200 50 Q 250 10 290 40" fill="none" stroke={T.navy} strokeWidth="2.5" />
      <path d="M 290 40 Q 340 70 380 120" fill="none" stroke={T.coral} strokeWidth="2.5" />
      {acts.map((a, i) => (
        <g key={i}>
          <circle cx={a.x} cy={a.y} r="5" fill={a.color} />
          <text x={a.x} y={a.y + 22} textAnchor="middle" fontSize="9" fontFamily={T.sans} fontWeight="600" fill={a.color} letterSpacing="0.08em">{a.label}</text>
          <text x={a.x} y={a.y + 34} textAnchor="middle" fontSize="8" fontFamily={T.sans} fill={T.textLight}>{a.sub}</text>
        </g>
      ))}
      <text x="200" y="16" textAnchor="middle" fontSize="7" fontFamily={T.sans} fill={T.textMuted} letterSpacing="0.1em">PEAK COMPLEXITY</text>
    </svg>
  );
}

function DiagramChronVsNarrative() {
  const boxStyle = (bg) => ({ fill: bg, rx: 3 });
  return (
    <svg viewBox="0 0 420 140" style={{ width: "100%", height: "auto" }}>
      {/* Chronological */}
      <text x="105" y="14" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.08em">CHRONOLOGICAL</text>
      {["Studio 1", "Studio 2", "Studio 3", "Studio 4"].map((s, i) => (
        <g key={i}>
          <rect x={20 + i * 48} y={22} width="40" height="28" {...boxStyle("#e8e8e6")} />
          <text x={40 + i * 48} y={40} textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>{s}</text>
        </g>
      ))}
      <text x="105" y="68" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted}>No throughline · Generic descriptions</text>
      {/* Narrative */}
      <text x="315" y="14" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={T.navy} letterSpacing="0.08em">NARRATIVE</text>
      {["Strongest", "Context", "Develop", "Resolve"].map((s, i) => (
        <g key={i}>
          <rect x={230 + i * 48} y={22} width="40" height="28" {...boxStyle(i === 0 ? T.accentLight : "#f5f5f3")} stroke={i === 0 ? T.accent : T.border} strokeWidth="1" />
          <text x={250 + i * 48} y={40} textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={i === 0 ? T.accent : T.textLight}>{s}</text>
        </g>
      ))}
      <line x1="230" y1="56" x2="418" y2="56" stroke={T.coral} strokeWidth="1.5" strokeDasharray="3,3" />
      <text x="324" y="64" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.coral} fontWeight="500">RED THREAD</text>
      <text x="315" y="78" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted}>Position-driven · Argument-ordered</text>
      {/* VS */}
      <text x="210" y="42" textAnchor="middle" fontSize="9" fontFamily={T.sans} fontWeight="600" fill={T.textFaint}>vs.</text>
    </svg>
  );
}

function DiagramFourImageTypes() {
  const types = [
    { name: "CONCEPT", desc: "Anchors idea", color: T.accent, icon: "◇" },
    { name: "PROCESS", desc: "Shows refinement", color: T.navy, icon: "↻" },
    { name: "OUTCOME", desc: "Proves resolution", color: T.coral, icon: "■" },
    { name: "CONTEXT", desc: "Grounds work", color: T.gold, icon: "◎" },
  ];
  return (
    <svg viewBox="0 0 420 90" style={{ width: "100%", height: "auto" }}>
      {types.map((t, i) => (
        <g key={i}>
          <rect x={8 + i * 103} y="8" width="95" height="60" rx="3" fill="#fff" stroke={t.color} strokeWidth="1.5" />
          <text x={55 + i * 103} y="30" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={t.color} letterSpacing="0.1em">{t.name}</text>
          <text x={55 + i * 103} y="44" textAnchor="middle" fontSize="7" fontFamily={T.sans} fill={T.textLight}>{t.desc}</text>
          <text x={55 + i * 103} y="58" textAnchor="middle" fontSize="10" fill={t.color}>{t.icon}</text>
        </g>
      ))}
      <text x="210" y="84" textAnchor="middle" fontSize="7" fontFamily={T.sans} fill={T.textMuted} fontStyle="italic">Sequence: Concept first → Outcome last</text>
    </svg>
  );
}

function DiagramImageMapping() {
  const rows = [
    { spread: "1 (Setup)", image: "Terrain model", type: "Concept", thread: "Landscape as raw material" },
    { spread: "2", image: "Site map + detail", type: "Context", thread: "Alpine erosion at macro scale" },
    { spread: "3 (Confront.)", image: "Section drawing", type: "Process", thread: "Building carves into ground" },
    { spread: "4", image: "Ramp + snow", type: "Outcome", thread: "Erosion made accessible" },
    { spread: "5 (Synthesis)", image: "Gallery interior", type: "Outcome", thread: "Erosion made inhabitable" },
  ];
  const typeColor = { Concept: T.accent, Process: T.navy, Outcome: T.coral, Context: T.gold };
  return (
    <svg viewBox="0 0 420 130" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="12" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">IMAGE TYPE MAPPING ACROSS SPREADS</text>
      {["SPREAD", "IMAGE", "TYPE", "RED THREAD"].map((h, i) => (
        <text key={i} x={[30, 130, 240, 350][i]} y="30" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fontWeight="600" fill={T.navy} letterSpacing="0.08em">{h}</text>
      ))}
      <line x1="8" y1="34" x2="412" y2="34" stroke={T.navy} strokeWidth="1" />
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="8" y={38 + i * 17} width="404" height="16" fill={i % 2 === 0 ? "#f8f8f6" : "transparent"} />
          <text x="30" y={49 + i * 17} textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMid}>{r.spread}</text>
          <text x="130" y={49 + i * 17} textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>{r.image}</text>
          <text x="240" y={49 + i * 17} textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fontWeight="500" fill={typeColor[r.type]}>{r.type}</text>
          <text x="350" y={49 + i * 17} textAnchor="middle" fontSize="6.5" fontFamily={T.serif} fontStyle="italic" fill={T.textLight}>{r.thread}</text>
        </g>
      ))}
    </svg>
  );
}

function DiagramNarrativeFailures() {
  const fails = [
    { name: "The Beautiful Mute", symptom: "Beauty without argument", fix: "Find the position", icon: "✕", color: T.coral },
    { name: "The Buried Lede", symptom: "Strong work hidden at back", fix: "Lead with strength", icon: "↕", color: T.gold },
    { name: "The Greatest Hits", symptom: "Strong parts, no throughline", fix: "Find the Red Thread", icon: "≡", color: T.navy },
  ];
  return (
    <svg viewBox="0 0 420 110" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">DIAGNOSING NARRATIVE FAILURE</text>
      {fails.map((f, i) => (
        <g key={i}>
          <rect x={8 + i * 138} y="24" width="130" height="72" rx="3" fill="#fff" stroke={f.color} strokeWidth="1.5" />
          <text x={73 + i * 138} y="42" textAnchor="middle" fontSize="14" fill={f.color}>{f.icon}</text>
          <text x={73 + i * 138} y="56" textAnchor="middle" fontSize="7.5" fontFamily={T.sans} fontWeight="600" fill={T.text}>{f.name}</text>
          <text x={73 + i * 138} y="68" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>{f.symptom}</text>
          <line x1={28 + i * 138} y1="74" x2={118 + i * 138} y2="74" stroke={T.border} strokeWidth="0.5" />
          <text x={73 + i * 138} y="86" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fontWeight="500" fill={f.color}>FIX: {f.fix}</text>
        </g>
      ))}
    </svg>
  );
}

function DiagramCompression() {
  const steps = [
    { label: "Paragraph", sub: "4–6 sentences", w: 100 },
    { label: "Sentence", sub: "1 sentence", w: 80 },
    { label: "Word", sub: "1 word", w: 60 },
    { label: "Red Thread", sub: "Unifying idea", w: 80 },
  ];
  let x = 30;
  return (
    <svg viewBox="0 0 420 100" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">THE COMPRESSION EXERCISE</text>
      {steps.map((s, i) => {
        const cx = x + s.w / 2;
        const el = (
          <g key={i}>
            <rect x={x} y="28" width={s.w} height="36" rx="3" fill={i === 3 ? T.navy : "#fff"} stroke={i === 3 ? T.navy : T.border} strokeWidth="1.5" />
            <text x={cx} y="48" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={i === 3 ? "#fff" : T.text}>{s.label}</text>
            <text x={cx} y="58" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={i === 3 ? "rgba(255,255,255,0.7)" : T.textLight}>{s.sub}</text>
            {i < 3 && <text x={x + s.w + 14} y="50" textAnchor="middle" fontSize="12" fill={T.textFaint}>→</text>}
          </g>
        );
        x += s.w + 28;
        return el;
      })}
      <text x="30" y="84" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted} fontStyle="italic">Progressive compression: from descriptive paragraph to irreducible position</text>
      <line x1="30" y1="90" x2="390" y2="90" stroke={T.coral} strokeWidth="1" strokeDasharray="2,4" />
      <text x="390" y="98" textAnchor="end" fontSize="6" fontFamily={T.sans} fontWeight="500" fill={T.coral}>COMPRESSION →</text>
    </svg>
  );
}

function DiagramCompressionWorked() {
  /* All boxes share the same left edge; widths decrease to show compression.
     viewBox matches other diagrams at 420 wide. */
  const L = 30;            /* shared left edge */
  const p = 12;            /* inner padding */
  const labelY = 12;       /* box top → label baseline */
  const bodyY = 24;        /* box top → first body baseline */
  const lh = 11;           /* body line height */
  const bot = 10;          /* last baseline → box bottom */
  const gap = 18;          /* box bottom → next box top */
  const aw = 4;            /* arrow half-width */
  const acx = 210;         /* arrow center x */

  const s1y = 38; const s1w = 360; const s1h = bodyY + lh * 3 + bot;
  const s2y = s1y + s1h + gap; const s2w = 300; const s2h = bodyY + lh + bot;
  const s3y = s2y + s2h + gap; const s3w = 200; const s3h = 42;
  const s4y = s3y + s3h + gap; const s4w = 240; const s4h = bodyY + lh + bot;
  const totalH = s4y + s4h + 26;

  const Arrow = ({ from, cx: arrowX }) => (<g>
    <line x1={arrowX} y1={from + 3} x2={arrowX} y2={from + gap - 4} stroke={T.border} strokeWidth="0.75" />
    <polygon points={`${arrowX - aw},${from + gap - 6} ${arrowX + aw},${from + gap - 6} ${arrowX},${from + gap - 2}`} fill={T.border} />
  </g>);

  return (
    <svg viewBox={`0 0 420 ${totalH}`} style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.1em">WORKED EXAMPLE: COMPRESSION EXERCISE</text>
      <text x="210" y="26" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.textLight} fontStyle="italic">Harvard GSD — Advanced Studio — Alpine Museum</text>

      {/* Step 1: Paragraph — full width */}
      <rect x={L} y={s1y} width={s1w} height={s1h} rx="3" fill="#fff" stroke={T.border} strokeWidth="0.75" />
      <text x={L + p} y={s1y + labelY} fontSize="5.5" fontFamily={T.sans} fontWeight="700" fill={T.textLight} letterSpacing="0.06em">STEP 1 — ONE PARAGRAPH</text>
      <text x={L + p} y={s1y + bodyY} fontSize="7" fontFamily={T.sans} fill={T.text}>The design converts a decommissioned Cold War bunker</text>
      <text x={L + p} y={s1y + bodyY + lh} fontSize="7" fontFamily={T.sans} fill={T.text}>into an Alpine museum by cutting into eroding mountainside</text>
      <text x={L + p} y={s1y + bodyY + lh * 2} fontSize="7" fontFamily={T.sans} fill={T.text}>terrain, creating a continuous path that makes geological</text>
      <text x={L + p} y={s1y + bodyY + lh * 3} fontSize="7" fontFamily={T.sans} fill={T.text}>time visible as visitors move between landscape and gallery.</text>
      <Arrow from={s1y + s1h} cx={L + s1w / 2} />

      {/* Step 2: Sentence — narrower */}
      <rect x={L} y={s2y} width={s2w} height={s2h} rx="3" fill="#fff" stroke={T.border} strokeWidth="0.75" />
      <text x={L + p} y={s2y + labelY} fontSize="5.5" fontFamily={T.sans} fontWeight="700" fill={T.textLight} letterSpacing="0.06em">STEP 2 — ONE SENTENCE</text>
      <text x={L + p} y={s2y + bodyY} fontSize="7" fontFamily={T.sans} fill={T.text}>An Alpine museum embeds into eroding terrain to</text>
      <text x={L + p} y={s2y + bodyY + lh} fontSize="7" fontFamily={T.sans} fill={T.text}>make climate change a spatial experience.</text>
      <Arrow from={s2y + s2h} cx={L + s2w / 2} />

      {/* Step 3: One Word — narrow, centered text, bold border */}
      <rect x={L} y={s3y} width={s3w} height={s3h} rx="3" fill="#fff" stroke={T.text} strokeWidth="1.25" />
      <text x={L + s3w / 2} y={s3y + 14} textAnchor="middle" fontSize="5.5" fontFamily={T.sans} fontWeight="700" fill={T.textLight} letterSpacing="0.06em">STEP 3 — ONE WORD</text>
      <text x={L + s3w / 2} y={s3y + 32} textAnchor="middle" fontSize="15" fontFamily={T.sans} fontWeight="700" fill={T.text} letterSpacing="0.04em">Erosion</text>
      <Arrow from={s3y + s3h} cx={L + s3w / 2} />

      {/* Step 4: Thread Test — navy */}
      <rect x={L} y={s4y} width={s4w} height={s4h} rx="3" fill={T.navy} />
      <text x={L + s4w / 2} y={s4y + labelY} textAnchor="middle" fontSize="5.5" fontFamily={T.sans} fontWeight="700" fill="rgba(255,255,255,0.5)" letterSpacing="0.06em">STEP 4 — THREAD TEST</text>
      <text x={L + s4w / 2} y={s4y + bodyY} textAnchor="middle" fontSize="7.5" fontFamily={T.sans} fontWeight="600" fill="#fff">Erosion → landscape · structure</text>
      <text x={L + s4w / 2} y={s4y + bodyY + lh} textAnchor="middle" fontSize="7.5" fontFamily={T.sans} fontWeight="600" fill="#fff">materiality · visitor path</text>

      {/* Compression line */}
      <line x1={L} y1={s4y + s4h + 14} x2={L + s1w} y2={s4y + s4h + 14} stroke={T.coral} strokeWidth="0.75" strokeDasharray="2,4" />
      <text x={L + s1w} y={s4y + s4h + 24} textAnchor="end" fontSize="5.5" fontFamily={T.sans} fontWeight="500" fill={T.coral}>COMPRESSION →</text>
    </svg>
  );
}

function DiagramWeakVsStrong() {
  return (
    <svg viewBox="0 0 420 100" style={{ width: "100%", height: "auto" }}>
      <text x="105" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.coral} letterSpacing="0.08em">WEAK</text>
      <text x="315" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.accent} letterSpacing="0.08em">STRONG</text>
      <rect x="10" y="22" width="190" height="60" rx="3" fill="#fff" stroke={T.coral} strokeWidth="1" />
      <rect x="220" y="22" width="190" height="60" rx="3" fill="#fff" stroke={T.accent} strokeWidth="1" />
      <text x="105" y="42" textAnchor="middle" fontSize="7" fontFamily={T.serif} fontStyle="italic" fill={T.textLight}>"This project explores light."</text>
      <text x="105" y="56" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.textMuted}>Describes topic, not position</text>
      <text x="105" y="68" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.textMuted}>No argument, no stakes</text>
      <text x="315" y="38" textAnchor="middle" fontSize="7" fontFamily={T.serif} fontStyle="italic" fill={T.textMid}>"This project tests whether a</text>
      <text x="315" y="49" textAnchor="middle" fontSize="7" fontFamily={T.serif} fontStyle="italic" fill={T.textMid}>single aperture can structure an</text>
      <text x="315" y="60" textAnchor="middle" fontSize="7" fontFamily={T.serif} fontStyle="italic" fill={T.textMid}>entire domestic sequence."</text>
      <text x="315" y="72" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.accent}>Specific, testable, declares position</text>
    </svg>
  );
}

function DiagramPortfolioAnatomy() {
  /* Page dimensions — portrait proportion, consistent with architecture portfolio format */
  const pw = 32; const ph = 44; const gap = 4; const spreadGap = 1;
  const bg = "#1a1a1a"; const page = "#fff"; const img = "#c8d5dc"; const txt = "#d0d0d0";
  /* Row 1 items */
  const row1 = [
    { type: "single", label: "Cover", fill: img },
    { type: "spread", label: "Inside Front Cover / TOC", leftFill: page, rightFill: page, rightContent: "toc" },
    { type: "spread", label: "Section Divider", leftFill: img, rightFill: img },
    { type: "spread", label: "Introduction Pages", leftFill: page, rightFill: page, rightContent: "intro" },
  ];
  /* Row 2 items */
  const row2 = [
    { type: "spread", label: "Project Pages (Multiple)", leftFill: page, rightFill: page, leftContent: "multi" },
    { type: "spread", label: "Project Pages (Full Bleed)", leftFill: img, rightFill: img },
    { type: "spread", label: "Resume / Inside Back", leftFill: page, rightFill: page, leftContent: "resume" },
    { type: "single", label: "Back Cover", fill: img },
  ];

  function renderPage(x, y, fill, content) {
    return (
      <g>
        <rect x={x} y={y} width={pw} height={ph} fill={fill} />
        {content === "toc" && <>
          <rect x={x+6} y={y+6} width={20} height={1.5} fill="#999" rx="0.5" />
          {[0,1,2,3,4,5].map(j => <rect key={j} x={x+6} y={y+11+j*4.5} width={16} height={0.8} fill="#ccc" rx="0.3" />)}
        </>}
        {content === "intro" && <>
          <rect x={x+4} y={y+4} width={24} height={14} fill={img} />
          <rect x={x+4} y={y+22} width={20} height={1.5} fill="#999" rx="0.5" />
          {[0,1,2,3].map(j => <rect key={j} x={x+4} y={y+26+j*3.5} width={18} height={0.7} fill="#ccc" rx="0.3" />)}
        </>}
        {content === "multi" && <>
          <rect x={x+3} y={y+3} width={26} height={16} fill={img} />
          <rect x={x+3} y={y+21} width={12} height={10} fill={img} />
          <rect x={x+17} y={y+21} width={12} height={10} fill={img} />
        </>}
        {content === "resume" && <>
          <rect x={x+6} y={y+5} width={16} height={1.5} fill="#999" rx="0.5" />
          {[0,1,2,3,4,5,6,7].map(j => <rect key={j} x={x+4} y={y+10+j*3.8} width={j%2===0 ? 22 : 18} height={0.7} fill="#ccc" rx="0.3" />)}
        </>}
      </g>
    );
  }

  function renderRow(items, yBase, yLabel) {
    let x = 16;
    return items.map((item, i) => {
      const el = (
        <g key={i}>
          {item.type === "single" && <>
            {renderPage(x, yBase, item.fill)}
            <text x={x + pw/2} y={yLabel} textAnchor="middle" fontSize="5" fontFamily={T.sans} fill={txt} letterSpacing="0.02em">{item.label}</text>
          </>}
          {item.type === "spread" && <>
            {renderPage(x, yBase, item.leftFill, item.leftContent)}
            <line x1={x + pw} y1={yBase} x2={x + pw} y2={yBase + ph} stroke={bg} strokeWidth="0.5" />
            {renderPage(x + pw + spreadGap, yBase, item.rightFill, item.rightContent)}
            <text x={x + pw + spreadGap/2} y={yLabel} textAnchor="middle" fontSize="5" fontFamily={T.sans} fill={txt} letterSpacing="0.02em">{item.label}</text>
          </>}
        </g>
      );
      x += (item.type === "spread" ? pw * 2 + spreadGap : pw) + gap + 8;
      return el;
    });
  }

  return (
    <svg viewBox="0 0 420 162" style={{ width: "100%", height: "auto", borderRadius: "3px" }}>
      <rect x="0" y="0" width="420" height="162" fill={bg} rx="3" />
      {renderRow(row1, 12, 62)}
      {renderRow(row2, 72, 122)}
      <text x="210" y="140" textAnchor="middle" fontSize="5.5" fontFamily={T.sans} fill="#666" letterSpacing="0.08em">PORTFOLIO ANATOMY</text>
      {/* Bracket spanning project pages */}
      <line x1="16" y1="150" x2="172" y2="150" stroke="#444" strokeWidth="0.5" />
      <text x="94" y="157" textAnchor="middle" fontSize="4.5" fontFamily={T.sans} fill="#555" letterSpacing="0.06em">FRONT MATTER</text>
      <line x1="182" y1="150" x2="340" y2="150" stroke="#444" strokeWidth="0.5" />
      <text x="261" y="157" textAnchor="middle" fontSize="4.5" fontFamily={T.sans} fill="#555" letterSpacing="0.06em">THE ARGUMENT</text>
      <line x1="350" y1="150" x2="406" y2="150" stroke="#444" strokeWidth="0.5" />
      <text x="378" y="157" textAnchor="middle" fontSize="4.5" fontFamily={T.sans} fill="#555" letterSpacing="0.06em">CLOSE</text>
    </svg>
  );
}

function DiagramTwoSpeed() {
  const bg = "#1a1a1a"; const page = "#fff"; const img = "#c8d5dc"; const txt = "#d0d0d0";
  const pw = 86; const ph = 118;
  return (
    <svg viewBox="0 0 540 210" style={{ width: "100%", height: "auto", borderRadius: "3px" }}>
      <rect x="0" y="0" width="540" height="210" fill={bg} rx="3" />
      {/* Left: Skim */}
      <text x="120" y="22" textAnchor="middle" fontSize="8" fontFamily={T.sans} fill="#888" letterSpacing="0.12em">SKIM</text>
      <text x="120" y="34" textAnchor="middle" fontSize="9" fontFamily={T.sans} fontWeight="500" fill={txt}>30 seconds</text>
      {/* Page spread — image dominant */}
      <rect x="38" y="46" width={pw} height={ph} fill={page} />
      <rect x={38 + pw + 2} y="46" width={pw} height={ph} fill={page} />
      <line x1={38 + pw + 1} y1="46" x2={38 + pw + 1} y2={46 + ph} stroke={bg} strokeWidth="1.5" />
      {/* Large hero image spanning left page */}
      <rect x="44" y="52" width={pw - 12} height={ph * 0.55} fill={img} />
      {/* Small title + text on left */}
      <rect x="44" y={52 + ph * 0.55 + 8} width="30" height="2.5" fill="#999" rx="0.5" />
      <rect x="44" y={52 + ph * 0.55 + 14} width="50" height="1.5" fill="#ccc" rx="0.5" />
      {/* Right page — one big image */}
      <rect x={38 + pw + 8} y="52" width={pw - 12} height={ph - 12} fill={img} />
      {/* Label */}
      <text x="120" y={46 + ph + 18} textAnchor="middle" fontSize="7" fontFamily={T.sans} fill="#666">Large images · Clear hierarchy · Minimal text</text>

      {/* Divider */}
      <line x1="270" y1="40" x2="270" y2="190" stroke="#333" strokeWidth="0.5" strokeDasharray="3,4" />

      {/* Right: Study */}
      <text x="408" y="22" textAnchor="middle" fontSize="8" fontFamily={T.sans} fill="#888" letterSpacing="0.12em">STUDY</text>
      <text x="408" y="34" textAnchor="middle" fontSize="9" fontFamily={T.sans} fontWeight="500" fill={txt}>5 minutes</text>
      {/* Page spread — text + multi-image */}
      <rect x="326" y="46" width={pw} height={ph} fill={page} />
      <rect x={326 + pw + 2} y="46" width={pw} height={ph} fill={page} />
      <line x1={326 + pw + 1} y1="46" x2={326 + pw + 1} y2={46 + ph} stroke={bg} strokeWidth="1.5" />
      {/* Left page — two images + caption */}
      <rect x="332" y="52" width={pw - 12} height="36" fill={img} />
      <rect x="332" y="92" width="34" height="28" fill={img} />
      <rect x="370" y="92" width="34" height="28" fill={img} />
      <rect x="332" y="126" width="30" height="1.5" fill="#ccc" rx="0.5" />
      <rect x="332" y="130" width="24" height="1" fill="#ddd" rx="0.5" />
      {/* Right page — text-heavy */}
      <rect x={326 + pw + 8} y="52" width="50" height="2.5" fill="#999" rx="0.5" />
      {[0,1,2,3,4,5,6,7,8,9,10].map(j => (
        <rect key={j} x={326 + pw + 8} y={60 + j * 7} width={j % 3 === 0 ? 60 : 52} height="1.5" fill={j < 3 ? "#bbb" : "#ddd"} rx="0.5" />
      ))}
      <text x="408" y={46 + ph + 18} textAnchor="middle" fontSize="7" fontFamily={T.sans} fill="#666">Captions · Process detail · Analytical depth</text>
    </svg>
  );
}

function DiagramAudienceLens() {
  const bg = "#1a1a1a"; const txt = "#d0d0d0";
  const audiences = [
    { label: "Academic", signal: "Process depth", sub: "Sketches, iterations, dead ends" },
    { label: "Large Firm", signal: "Technical fluency", sub: "Resolved drawings, BIM, detail" },
    { label: "Boutique", signal: "Design sensibility", sub: "Philosophy, position, craft" },
    { label: "Fellowship", signal: "Research agenda", sub: "Questions, methodology, rigor" },
  ];
  const colW = 135;
  return (
    <svg viewBox="0 0 540 130" style={{ width: "100%", height: "auto", borderRadius: "3px" }}>
      <rect x="0" y="0" width="540" height="130" fill={bg} rx="3" />
      {/* Vertical dividers */}
      {[1,2,3].map(i => (
        <line key={i} x1={i * colW} y1="14" x2={i * colW} y2="100" stroke="#333" strokeWidth="0.5" />
      ))}
      {audiences.map((a, i) => {
        const cx = i * colW + colW / 2;
        return (
          <g key={i}>
            <text x={cx} y="30" textAnchor="middle" fontSize="9" fontFamily={T.sans} fontWeight="500" fill={txt} letterSpacing="0.04em">{a.label}</text>
            <line x1={cx - 20} y1="38" x2={cx + 20} y2="38" stroke="#555" strokeWidth="0.5" />
            <text x={cx} y="58" textAnchor="middle" fontSize="8" fontFamily={T.sans} fill="#999">{a.signal}</text>
            <text x={cx} y="76" textAnchor="middle" fontSize="7" fontFamily={T.sans} fill="#666">{a.sub}</text>
          </g>
        );
      })}
      <text x="270" y="116" textAnchor="middle" fontSize="7" fontFamily={T.sans} fill="#555" fontStyle="italic">Same portfolio, different emphasis — know the reviewer before you sequence.</text>
    </svg>
  );
}

/* ─── Shared diagrams (used across multiple modules) ─── */

function DiagramTwoTrack() {
  return (
    <svg viewBox="0 0 420 100" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">TWO-TRACK READING SYSTEM</text>
      <rect x="10" y="24" width="195" height="60" rx="3" fill="#fff" stroke={T.navy} strokeWidth="1.5" />
      <rect x="215" y="24" width="195" height="60" rx="3" fill="#fff" stroke={T.accent} strokeWidth="1.5" />
      <text x="107" y="40" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={T.navy}>Track 1: Skim</text>
      <text x="107" y="52" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>30–90 seconds</text>
      <text x="107" y="64" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>Large images · Clear hierarchy</text>
      <text x="107" y="74" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>Minimal text</text>
      <text x="312" y="40" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={T.accent}>Track 2: Study</text>
      <text x="312" y="52" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>5–15 minutes</text>
      <text x="312" y="64" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>Captions · Process detail</text>
      <text x="312" y="74" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>Analytical depth</text>
    </svg>
  );
}

function DiagramSequenceStructures() {
  const structures = [
    { name: "Linear", desc: "Site → Concept → Dev → Resolution", color: T.navy },
    { name: "Comparative", desc: "Before/After · Existing/Proposed", color: T.accent },
    { name: "Thematic", desc: "Organized around a design principle", color: T.coral },
  ];
  return (
    <svg viewBox="0 0 440 94" style={{ width: "100%", height: "auto" }}>
      {structures.map((s, i) => (
        <g key={i}>
          <rect x={6 + i * 145} y="8" width="138" height="56" rx="3" fill="#fff" stroke={s.color} strokeWidth="1.5" />
          <text x={75 + i * 145} y="30" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={s.color}>{s.name}</text>
          <text x={75 + i * 145} y="44" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>{s.desc}</text>
        </g>
      ))}
      <text x="220" y="84" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted} fontStyle="italic">Text and image should complete each other rather than duplicate.</text>
    </svg>
  );
}

function DiagramTypography() {
  const categories = [
    { cat: "Modernist", fonts: "Helvetica · Futura · DIN · Univers", use: "Neutral, versatile" },
    { cat: "Humanist", fonts: "Avenir · Söhne · Gill Sans · Circular", use: "Warmer, approachable" },
    { cat: "Editorial", fonts: "Neue Montreal · GT Alpina · Minion Pro", use: "Personality with restraint" },
  ];
  return (
    <svg viewBox="0 0 420 100" style={{ width: "100%", height: "auto" }}>
      {categories.map((c, i) => (
        <g key={i}>
          <rect x={8 + i * 138} y="8" width="130" height="68" rx="3" fill="#fff" stroke={T.border} strokeWidth="1" />
          <rect x={8 + i * 138} y="8" width="130" height="20" rx="3" fill={T.navy} />
          <text x={73 + i * 138} y="22" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill="#fff" letterSpacing="0.06em">{c.cat}</text>
          <text x={73 + i * 138} y="44" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMid}>{c.fonts}</text>
          <text x={73 + i * 138} y="60" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted} fontStyle="italic">{c.use}</text>
        </g>
      ))}
      <text x="210" y="94" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted}>Titles: 24–48pt · Subheadings: 14–20pt · Body: 9–11pt · Captions: 7–8pt</text>
    </svg>
  );
}

function DiagramSizeHierarchy() {
  const sizes = [
    { level: "Title", pt: "24–48pt", h: 18, color: T.navy },
    { level: "Subheading", pt: "14–20pt", h: 14, color: T.navyLight },
    { level: "Body text", pt: "9–11pt", h: 10, color: T.textMid },
    { level: "Caption", pt: "7–8pt", h: 7, color: T.textLight },
  ];
  return (
    <svg viewBox="0 0 420 100" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">TYPOGRAPHIC HIERARCHY</text>
      {sizes.map((s, i) => {
        const y = 30 + i * 18;
        return (
          <g key={i}>
            <rect x="100" y={y} width={s.h * 12} height={s.h} rx="2" fill={s.color} opacity="0.15" />
            <text x="95" y={y + s.h - 2} textAnchor="end" fontSize="7" fontFamily={T.sans} fill={T.textMid}>{s.level}</text>
            <text x={110 + s.h * 12} y={y + s.h - 2} fontSize="7" fontFamily={T.sans} fontWeight="500" fill={s.color}>{s.pt}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DiagramGridAnatomy() {
  return (
    <svg viewBox="0 0 420 180" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">GRID ANATOMY OVERVIEW</text>
      {/* Page outline */}
      <rect x="110" y="24" width="200" height="140" fill="none" stroke={T.textFaint} strokeWidth="1" />
      {/* Margins */}
      <rect x="126" y="40" width="168" height="108" fill="none" stroke={T.accent} strokeWidth="0.5" strokeDasharray="3,3" />
      {/* Columns */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <rect key={i} x={126 + i * 28} y="40" width="24" height="108" fill={T.navy} opacity="0.06" />
      ))}
      {/* Labels */}
      <line x1="110" y1="170" x2="126" y2="170" stroke={T.coral} strokeWidth="1" />
      <text x="118" y="178" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.coral}>Margin</text>
      <line x1="126" y1="152" x2="150" y2="152" stroke={T.navy} strokeWidth="1" />
      <text x="138" y="160" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.navy}>Column</text>
      <line x1="150" y1="152" x2="154" y2="152" stroke={T.accent} strokeWidth="1.5" />
      <text x="164" y="160" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.accent}>Gutter</text>
      {/* Module highlight */}
      <rect x="126" y="40" width="24" height="26" fill={T.accent} opacity="0.15" stroke={T.accent} strokeWidth="0.5" />
      <text x="138" y="56" textAnchor="middle" fontSize="5" fontFamily={T.sans} fill={T.accent}>Module</text>
      {/* Row guides */}
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="126" y1={40 + i * 27} x2="294" y2={40 + i * 27} stroke={T.border} strokeWidth="0.5" strokeDasharray="2,3" />
      ))}
      <text x="40" y="56" fontSize="6" fontFamily={T.sans} fill={T.textMuted}>6 columns</text>
      <text x="40" y="68" fontSize="6" fontFamily={T.sans} fill={T.textMuted}>12pt gutters</text>
      <text x="40" y="80" fontSize="6" fontFamily={T.sans} fill={T.textMuted}>8 rows</text>
      <text x="40" y="92" fontSize="6" fontFamily={T.sans} fill={T.textMuted}>12pt baseline</text>
      <text x="350" y="56" fontSize="6" fontFamily={T.sans} fill={T.textMuted}>600 × 840 pt</text>
      <text x="350" y="68" fontSize="6" fontFamily={T.sans} fill={T.textMuted}>48 modules</text>
    </svg>
  );
}

function DiagramFourGridTypes() {
  const grids = [
    { name: "Manuscript", desc: "Single text block", lines: [[30, 10, 30, 50], [80, 10, 80, 50], [30, 10, 80, 10], [30, 50, 80, 50]] },
    { name: "Column", desc: "2–4 vertical divisions" },
    { name: "Modular", desc: "Columns + flowlines" },
    { name: "Hierarchical", desc: "Content-driven" },
  ];
  return (
    <svg viewBox="0 0 420 90" style={{ width: "100%", height: "auto" }}>
      {grids.map((g, i) => {
        const ox = 8 + i * 103;
        return (
          <g key={i}>
            <rect x={ox} y="8" width="95" height="55" rx="3" fill="#fff" stroke={T.border} strokeWidth="1" />
            {/* Mini grid illustrations */}
            {i === 0 && <rect x={ox + 15} y="16" width="65" height="30" fill={T.navy} opacity="0.08" />}
            {i === 1 && [0, 1, 2].map(c => <rect key={c} x={ox + 12 + c * 25} y="16" width="20" height="30" fill={T.navy} opacity="0.08" />)}
            {i === 2 && [0, 1, 2].map(c => [0, 1].map(r => <rect key={`${c}-${r}`} x={ox + 12 + c * 25} y={16 + r * 17} width="20" height="13" fill={T.navy} opacity="0.08" />))}
            {i === 3 && (
              <>
                <rect x={ox + 12} y="16" width="35" height="30" fill={T.navy} opacity="0.08" />
                <rect x={ox + 52} y="16" width="30" height="13" fill={T.navy} opacity="0.08" />
                <rect x={ox + 52} y="33" width="30" height="13" fill={T.navy} opacity="0.05" />
              </>
            )}
            <text x={ox + 47} y="56" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.text}>{g.name}</text>
            <text x={ox + 47} y="66" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.textLight}>{g.desc}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Diagram12Point() {
  return (
    <svg viewBox="0 0 420 100" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">DOCUMENT SETUP — 12-POINT SYSTEM</text>
      {[
        { param: "Page Size", value: "600 × 840 pt" },
        { param: "Margins (T/B/I/O)", value: "48 / 60 / 48 / 36 pt" },
        { param: "Columns", value: "6" },
        { param: "Column Gutter", value: "12 pt" },
        { param: "Rows", value: "8" },
        { param: "Baseline", value: "12 pt" },
      ].map((r, i) => (
        <g key={i}>
          <rect x="80" y={22 + i * 13} width="260" height="12" fill={i % 2 === 0 ? "#f8f8f6" : "transparent"} />
          <text x="150" y={31 + i * 13} textAnchor="end" fontSize="7" fontFamily={T.sans} fontWeight="500" fill={T.text}>{r.param}</text>
          <text x="160" y={31 + i * 13} fontSize="7" fontFamily={T.sans} fill={T.textLight}>{r.value}</text>
        </g>
      ))}
    </svg>
  );
}

function DiagramColorPalettes() {
  const palettes = [
    { name: "Nature-Grounded", colors: ["#c17a5a", "#8ba888", "#d4c5a0", "#9e9a92"], desc: "Materiality, warmth" },
    { name: "Muted Contemporary", colors: ["#a8d8d0", "#b8a9d4", "#e8a090", "#c8c4c0"], desc: "Soft visual interest" },
    { name: "Industrial Neutrals", colors: ["#444444", "#666666", "#888888", "#111111"], desc: "Work speaks" },
  ];
  return (
    <svg viewBox="0 0 420 90" style={{ width: "100%", height: "auto" }}>
      {palettes.map((p, i) => {
        const ox = 8 + i * 140;
        return (
          <g key={i}>
            <text x={ox + 65} y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.text}>{p.name}</text>
            {p.colors.map((c, ci) => (
              <rect key={ci} x={ox + ci * 32} y="20" width="28" height="28" rx="3" fill={c} />
            ))}
            <text x={ox + 65} y="62" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted} fontStyle="italic">{p.desc}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DiagramCoverTypes() {
  const types = [
    { num: "01", name: "Pure Minimal" },
    { num: "02", name: "Dark Ground" },
    { num: "03", name: "Hero Image" },
    { num: "04", name: "Bleed + Band" },
    { num: "05", name: "Collage" },
    { num: "06", name: "Grid Pattern" },
    { num: "07", name: "Abstract Line" },
  ];
  return (
    <svg viewBox="0 0 420 80" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="12" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">SEVEN COVER TYPOLOGIES</text>
      {types.map((t, i) => {
        const ox = 8 + i * 59;
        return (
          <g key={i}>
            <rect x={ox} y="20" width="53" height="36" rx="2" fill={i === 1 ? T.navy : "#fff"} stroke={T.border} strokeWidth="1" />
            <text x={ox + 26} y="36" textAnchor="middle" fontSize="11" fontFamily={T.sans} fontWeight="600" fill={i === 1 ? "#fff" : T.textFaint}>{t.num}</text>
            <text x={ox + 26} y="46" textAnchor="middle" fontSize="5" fontFamily={T.sans} fill={i === 1 ? "rgba(255,255,255,0.6)" : T.textMuted}>{t.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DiagramChecklist() {
  const levels = [
    { name: "Project-Level", items: "Statement · Sequencing · Image function · Captions", color: T.accent },
    { name: "Portfolio-Level", items: "Range · Logic · Transitions · Skim + Study", color: T.navy },
    { name: "Visual / Production", items: "300 DPI · Typography · Color · Proofread", color: T.coral },
    { name: "Narrative / Content", items: "Context · Concept · Development · Resolution", color: T.gold },
  ];
  return (
    <svg viewBox="0 0 420 110" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">FOUR-LEVEL AUDIT FRAMEWORK</text>
      {levels.map((l, i) => (
        <g key={i}>
          <rect x={8 + i * 103} y="24" width="95" height="62" rx="3" fill="#fff" stroke={l.color} strokeWidth="1.5" />
          <rect x={8 + i * 103} y="24" width="95" height="18" rx="3" fill={l.color} opacity="0.1" />
          <text x={55 + i * 103} y="37" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={l.color}>{l.name}</text>
          {l.items.split(" · ").map((item, j) => (
            <text key={j} x={55 + i * 103} y={52 + j * 10} textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.textLight}>{item}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

function DiagramExportStandards() {
  const specs = [
    { target: "Print", dpi: "300 DPI", color: "CMYK", size: "Unlimited", barW: 200, c: T.navy },
    { target: "Digital", dpi: "150 DPI", color: "RGB", size: "< 10 MB", barW: 130, c: T.accent },
    { target: "Web", dpi: "72 DPI", color: "RGB", size: "2–5 MB", barW: 70, c: T.coral },
  ];
  return (
    <svg viewBox="0 0 420 90" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">FILE EXPORT STANDARDS</text>
      {specs.map((s, i) => (
        <g key={i}>
          <text x="60" y={36 + i * 24} textAnchor="end" fontSize="7.5" fontFamily={T.sans} fontWeight="500" fill={T.text}>{s.target}</text>
          <rect x="70" y={26 + i * 24} width={s.barW} height="14" rx="2" fill={s.c} opacity="0.2" />
          <rect x="70" y={26 + i * 24} width={s.barW} height="14" rx="2" fill="none" stroke={s.c} strokeWidth="1" />
          <text x="78" y={36 + i * 24} fontSize="6.5" fontFamily={T.sans} fill={s.c} fontWeight="500">{s.dpi} · {s.color} · {s.size}</text>
        </g>
      ))}
    </svg>
  );
}

function DiagramInitialsAndFinals() {
  return (
    <svg viewBox="0 0 420 70" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">THE INITIALS-AND-FINALS SEQUENCE</text>
      {/* Timeline */}
      <line x1="40" y1="40" x2="380" y2="40" stroke={T.border} strokeWidth="1.5" />
      <circle cx="40" cy="40" r="8" fill={T.accent} />
      <text x="40" y="43" textAnchor="middle" fontSize="6" fontFamily={T.sans} fontWeight="600" fill="#fff">1</text>
      <text x="40" y="58" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.accent} fontWeight="500">Strongest</text>
      <circle cx="210" cy="40" r="5" fill={T.border} />
      <text x="210" y="58" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.textMuted}>Builds complexity</text>
      <circle cx="380" cy="40" r="8" fill={T.coral} />
      <text x="380" y="43" textAnchor="middle" fontSize="6" fontFamily={T.sans} fontWeight="600" fill="#fff">N</text>
      <text x="380" y="58" textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.coral} fontWeight="500">Most resonant</text>
      {/* Arrows */}
      <polygon points="370,40 365,37 365,43" fill={T.coral} />
    </svg>
  );
}

function DiagramFiveNarrativeElements() {
  const elements = [
    { label: "Focus", subtitle: "One idea, not many", color: T.navy },
    { label: "Structure", subtitle: "Intentional order", color: T.accent },
    { label: "Curation", subtitle: "Every image earns its place", color: T.coral },
    { label: "Lens", subtitle: "A point of view, not a summary", color: T.gold },
    { label: "Closure", subtitle: "Resolution, not just ending", color: T.textMid },
  ];
  return (
    <svg viewBox="0 0 420 120" style={{ width: "100%", height: "auto" }}>
      {elements.map((e, i) => {
        const x = 8 + i * 82;
        return (
          <g key={i}>
            <rect x={x} y="8" width="78" height="78" rx="3" fill="#fff" stroke={e.color} strokeWidth="1.5" />
            <text x={x + 39} y="35" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={e.color} letterSpacing="0.08em">{e.label}</text>
            <text x={x + 39} y="55" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>{e.subtitle}</text>
          </g>
        );
      })}
      <text x="210" y="108" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted} fontStyle="italic">Narrative is a design problem — not a writing task</text>
    </svg>
  );
}

function DiagramNarrativeConstruction() {
  const steps = [
    { num: "1", label: "Statement", desc: "Write your design position in one sentence" },
    { num: "2", label: "Outline", desc: "Map projects to narrative arc" },
    { num: "3", label: "Organize", desc: "Sequence images to support argument" },
  ];
  let x = 30;
  return (
    <svg viewBox="0 0 420 120" style={{ width: "100%", height: "auto" }}>
      {steps.map((s, i) => {
        const cx = x + 70;
        const el = (
          <g key={i}>
            <rect x={x} y="20" width="140" height="60" rx="3" fill="#fff" stroke={T.navy} strokeWidth="1.5" />
            <circle cx={x + 20} cy="32" r="8" fill={T.navy} />
            <text x={x + 20} y="37" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill="#fff">{s.num}</text>
            <text x={cx} y="42" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={T.navy}>{s.label}</text>
            <text x={cx} y="60" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>{s.desc}</text>
            {i < 2 && <text x={x + 150} y="52" textAnchor="middle" fontSize="14" fill={T.textFaint}>→</text>}
          </g>
        );
        x += 170;
        return el;
      })}
      <text x="30" y="102" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted} fontStyle="italic">From intuition to intentional structure</text>
    </svg>
  );
}

function DiagramLayerArchitecture() {
  const layers = [
    { num: "01_Text", desc: "Titles, descriptions, page #s", color: T.navy, y: 20 },
    { num: "02_Images", desc: "Drawings, renders, photos", color: T.coral, y: 58 },
    { num: "03_Guides", desc: "Non-printing, locked", color: T.textLight, y: 96 },
  ];
  return (
    <svg viewBox="0 0 420 140" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">INDESIGN LAYER STACKING</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="20" y={l.y} width="340" height="30" rx="3" fill="#fff" stroke={l.color} strokeWidth="1.5" />
          <circle cx="32" cy={l.y + 15} r="4" fill={l.color} />
          <text x="48" y={l.y + 10} fontSize="7" fontFamily={T.sans} fontWeight="600" fill={l.color} letterSpacing="0.08em">{l.num}</text>
          <text x="48" y={l.y + 22} fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>{l.desc}</text>
          <text x="380" y={l.y + 18} textAnchor="middle" fontSize="6" fontFamily={T.sans} fill={T.textMuted} fontWeight="500">{i === 0 ? "TOP" : i === 1 ? "MIDDLE" : "BOTTOM"}</text>
        </g>
      ))}
      <text x="210" y="138" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted} fontStyle="italic">Text above images · Guides hidden in export</text>
    </svg>
  );
}

function DiagramParentPages() {
  return (
    <svg viewBox="0 0 420 130" style={{ width: "100%", height: "auto" }}>
      <text x="210" y="14" textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="600" fill={T.textMid} letterSpacing="0.12em">PARENT PAGE ARCHITECTURE</text>
      {/* A-Intro box */}
      <rect x="20" y="28" width="170" height="70" rx="3" fill="#fff" stroke={T.navy} strokeWidth="1.5" />
      <text x="105" y="48" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={T.navy}>A-Intro (Splash)</text>
      <text x="105" y="63" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>Title area, date/location,</text>
      <text x="105" y="73" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>page #</text>
      {/* Arrow */}
      <text x="210" y="68" textAnchor="middle" fontSize="14" fill={T.textFaint}>→</text>
      {/* B-Project box */}
      <rect x="230" y="28" width="170" height="70" rx="3" fill="#fff" stroke={T.accent} strokeWidth="1.5" />
      <text x="315" y="48" textAnchor="middle" fontSize="8" fontFamily={T.sans} fontWeight="600" fill={T.accent}>B-Project (Content)</text>
      <text x="315" y="63" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>Header, grid guides,</text>
      <text x="315" y="73" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textLight}>project title, page #</text>
      {/* Child pages indicator */}
      <g>
        <line x1="105" y1="106" x2="105" y2="118" stroke={T.border} strokeWidth="1" />
        <rect x="95" y="118" width="20" height="8" rx="1" fill={T.accentLight} stroke={T.textFaint} strokeWidth="0.5" />
        <text x="105" y="123" textAnchor="middle" fontSize="5" fontFamily={T.sans} fill={T.textMuted}>child</text>
      </g>
      <g>
        <line x1="315" y1="106" x2="315" y2="118" stroke={T.border} strokeWidth="1" />
        <rect x="305" y="118" width="20" height="8" rx="1" fill={T.accentLight} stroke={T.textFaint} strokeWidth="0.5" />
        <text x="315" y="123" textAnchor="middle" fontSize="5" fontFamily={T.sans} fill={T.textMuted}>child</text>
      </g>
      <text x="210" y="110" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fill={T.textMuted} fontStyle="italic">Change parent once → all child pages update</text>
    </svg>
  );
}

/* ─── Diagram map: moduleId → [{component, title}] ─── */
const DIAGRAM_MAP = {
  1: [
    { image: "class-pdf/academic-portfolio-example.png", title: "Academic Portfolio Example", alt: "Jiayao Li — Conceptual Box Model spread showing process diagrams, artifact scans, and analytical drawings" },
    { image: "class-pdf/professional-portfolio-example.png", title: "Professional Portfolio Example", alt: "Nick McIntosh — Generative Housing spread showing rendering, floor plan, and building section" },
    { image: "class-pdf/class1-portfolio-anatomy.png", title: "Portfolio Anatomy", alt: "Portfolio document structure — Cover, Inside Front Cover, TOC, Section Divider, Introduction Pages, Project Pages, Resume, Back Cover" },
  ],
  "1spreads": [
    { image: "class-pdf/casestudy-spread-1.jpg", title: "Spread 1", alt: "Terrain model and project abstract" },
    { image: "class-pdf/casestudy-spread-2.jpg", title: "Spread 2", alt: "Aerial site photo and detail terrain model" },
    { image: "class-pdf/casestudy-spread-3.jpg", title: "Spread 3", alt: "Winter renderings and building section" },
    { image: "class-pdf/casestudy-spread-4.jpg", title: "Spread 4", alt: "Model photo, approach rendering, and section" },
    { image: "class-pdf/casestudy-spread-5.jpg", title: "Spread 5", alt: "Gallery interiors and floor plans" },
  ],
  2: [
    { component: DiagramCompression, title: "The Compression Exercise" },
    { component: DiagramCompressionWorked, title: "Worked Example: Alpine Museum → Erosion" },
    { component: DiagramWeakVsStrong, title: "Weak vs. Strong Statements" },
  ],
  3: [
    { image: "class-pdf/casestudy-spread-1.jpg", title: "Spread 1 — Statement Keywords Mapped", alt: "Terrain model and project abstract", caption: "The concept sentence: 'An Alpine museum embeds into eroding terrain to make climate change a spatial experience.' The terrain model proves 'eroding terrain.' The statement anchors every image that follows." },
    { image: "class-pdf/casestudy-spread-2.jpg", title: "Spread 2 — Context Keywords", alt: "Aerial site photo and detail terrain model", caption: "Keywords: 'Alpine,' 'terrain.' The aerial photograph proves the Alpine context at scale. The detail model proves the terrain the building must negotiate. Context keywords demand site evidence." },
    { image: "class-pdf/casestudy-spread-3.jpg", title: "Spread 3 — Intervention Keywords", alt: "Winter renderings and building section", caption: "Keywords: 'embeds into,' 'eroding terrain.' The section proves the embedding — architecture cut into slope. The rendering proves the building survives its environment. Intervention keywords demand design evidence." },
    { image: "class-pdf/casestudy-spread-4.jpg", title: "Spread 4 — Method Keywords", alt: "Model photo, approach rendering, and section", caption: "Keywords: 'embeds,' 'spatial experience.' Physical model proves the massing strategy. Approach rendering proves the spatial sequence. Section proves the structural response. Each keyword accounted for." },
    { image: "class-pdf/casestudy-spread-5.jpg", title: "Spread 5 — Outcome Keywords", alt: "Gallery interiors and floor plans", caption: "Keywords: 'museum,' 'spatial experience.' Interior views prove inhabitation. Floor plans prove program. The graphic outline is complete — every claim in the concept sentence has been drawn." },
  ],
  4: [
    { image: "class-pdf/casestudy-spread-1.jpg", title: "Spread 1 — Act I: Exposition", alt: "Terrain model and project abstract", caption: "The protagonist is the site. The terrain model introduces the world the project inhabits; the statement declares what is at stake. A reviewer knows where we are and why it matters." },
    { image: "class-pdf/casestudy-spread-2.jpg", title: "Spread 2 — Act II: Rising Action", alt: "Aerial site photo and detail terrain model", caption: "Tension builds. The aerial view shows scale and remoteness; the detail model reveals the eroding terrain that demands intervention. These pages answer: why does this project need to exist?" },
    { image: "class-pdf/casestudy-spread-3.jpg", title: "Spread 3 — Act III: Climax", alt: "Winter renderings and building section", caption: "The difficulty is visible inside the solution. The section reveals the extreme slope the building must negotiate — the obstacle is embedded in the drawing. The winter rendering shows the environmental severity the design must survive." },
    { image: "class-pdf/casestudy-spread-4.jpg", title: "Spread 4 — Act IV: Falling Action", alt: "Model photo, approach rendering, and section", caption: "Tension releases as the design response unfolds. The physical model shows massing resolution; the approach rendering shows arrival sequence; the section shows structural logic responding directly to the slope." },
    { image: "class-pdf/casestudy-spread-5.jpg", title: "Spread 5 — Act V: Resolution", alt: "Gallery interiors and floor plans", caption: "The transformed state. Interior views prove the spatial experience works. Floor plans demonstrate professional resolution. The conflict has been addressed; the thesis has been proven." },
  ],
  5: [
    { image: "class-pdf/casestudy-spread-1.jpg", title: "Spread 1 — Concept", alt: "Terrain model and project abstract", caption: "Concept: the terrain model captures the governing idea — erosion as design method. It is the visual form of the project statement, the claim made visible. The written abstract supports but is not itself an image type." },
    { image: "class-pdf/casestudy-spread-2.jpg", title: "Spread 2 — Context + Process", alt: "Aerial site photo and detail terrain model", caption: "Context: the aerial photograph establishes real-world conditions. Process: the detail terrain model shows how the site was studied and remodeled. Evidence of thinking, not just outcome." },
    { image: "class-pdf/casestudy-spread-3.jpg", title: "Spread 3 — Outcome + Process", alt: "Winter renderings and building section", caption: "Outcome: the rendering proves the building works in its landscape. Process: the section reveals how the design was developed through cutting and embedding. The two types complete each other." },
    { image: "class-pdf/casestudy-spread-4.jpg", title: "Spread 4 — Process + Outcome", alt: "Model photo, approach rendering, and section", caption: "Three images, two types. The physical model is process — evidence of how the massing was resolved. The approach rendering is outcome — the spatial experience proven. The section is process — showing the design decision where building meets slope." },
    { image: "class-pdf/casestudy-spread-5.jpg", title: "Spread 5 — Outcome", alt: "Gallery interiors and floor plans", caption: "Pure outcome. Interior views and floor plans demonstrate professional fluency — the work is resolved, buildable, inhabitable. No concept or process images needed; the argument has already been made." },
  ],

  7: [
    { image: "class-pdf/casestudy-spread-1.jpg", title: "Spread 1 — Opening: Concept + Statement", alt: "Terrain model and project abstract", caption: "The storyboard opens with the hero image and project statement. At skim speed (30 seconds), the terrain model carries the argument alone. At study speed, the text deepens it. Both tracks work." },
    { image: "class-pdf/casestudy-spread-2.jpg", title: "Spread 2 — Development: Context", alt: "Aerial site photo and detail terrain model", caption: "The second spread introduces what the first did not: site scale and analytical method. The skim track reads the aerial photograph; the study track reads the model's erosion logic. No repetition." },
    { image: "class-pdf/casestudy-spread-3.jpg", title: "Spread 3 — Development: Atmosphere + Logic", alt: "Winter renderings and building section", caption: "Complexity builds. The rendering shows atmosphere; the section shows tectonic logic. Text and image complete each other — the image shows what cannot be said, the text says what cannot be shown." },
    { image: "class-pdf/casestudy-spread-4.jpg", title: "Spread 4 — Development: Materiality + Sequence", alt: "Model photo, approach rendering, and section", caption: "Each spread advances without repeating. Physical materiality (model), experiential sequence (rendering), and structural response (section) — three new dimensions on one spread." },
    { image: "class-pdf/casestudy-spread-5.jpg", title: "Spread 5 — Closing: Resolution", alt: "Gallery interiors and floor plans", caption: "The storyboard resolves. Interior views prove inhabitation; plans prove professional fluency. If these five spreads tell the story without the statement, the storyboard is finished." },
  ],
  10: [
    { component: DiagramTypography, title: "Typography Categories" },
    { component: DiagramSizeHierarchy, title: "Typographic Hierarchy" },
    { image: "diagram-typeface-categories.svg", title: "Typeface Categories for Architecture", alt: "Typeface categories — Modernist, Humanist, Editorial, Functional" },
    { image: "diagram-typeface-selection.svg", title: "Typeface Selection Decision Flow", alt: "Typeface selection decision flow — match project tone to category" },
    { image: "diagram-typeface-pairings.svg", title: "Recommended Typeface Pairings", alt: "Recommended typeface pairings and size standards" },
  ],
  8: [
    { component: DiagramGridAnatomy, title: "Grid Anatomy Overview" },
    { component: DiagramFourGridTypes, title: "Four Grid Types" },
    { image: "01-grid-anatomy-overview.svg", title: "Grid Anatomy — Columns, Gutters, Modules", alt: "Grid anatomy showing columns, gutters, modules, margins, and baselines" },
    { image: "02-historical-grid-comparison.svg", title: "Historical Grid Comparison", alt: "Greek urban grid, Japanese Ken module, modern page grid" },
    { image: "03-structural-vs-page-grid.svg", title: "Structural vs. Page Grid", alt: "Building structural grid vs page modular grid — same logic" },
    { image: "class-pdf/class4-p7-img1.jpeg", title: "Building Plan vs. Page Layout", alt: "Structural column grid compared to modular page grid — same logic of rhythm, structure, and zones" },
    { image: "class-pdf/class4-p8-img1.jpeg", title: "The Design Analogy: Facade & Structure", alt: "Concrete facade split to reveal underlying grid — primary frame, secondary alignment, content containers, baseline, margins" },
    { image: "06-consistency-across-spreads.svg", title: "Consistency Across Spreads", alt: "Same grid applied across three different spread types" },
  ],
  9: [
    { component: Diagram12Point, title: "Document Setup — 12-Point System" },
    { component: DiagramLayerArchitecture, title: "InDesign Layer Architecture" },
    { component: DiagramParentPages, title: "Parent Page Architecture" },
    { image: "class-pdf/class4-p11-img1.jpeg", title: "Two Systems, One Goal", alt: "Baseline grid for text precision and modular grid for content organization — combined for rigorous alignment within flexible structure" },
    { image: "class-pdf/class4-p17-img1.png", title: "Technical Execution: The Atomic Unit", alt: "Four-step InDesign setup — document, baseline grid, margins and columns, modular grid rows — with dialog box reference" },
    { image: "07-modular-baseline-overlay.svg", title: "Modular + Baseline Overlay", alt: "Modular grid overlaid with baseline grid" },
    { image: "12-baseline-math.svg", title: "Baseline Math", alt: "840pt page divided by 12pt gives 70 baseline lines" },
    { image: "13-module-anatomy.svg", title: "Module Anatomy", alt: "Module anatomy showing content lines, gutter zone, and 12pt increments" },
    { image: "09-indesign-workspace.svg", title: "InDesign Workspace Layout", alt: "InDesign workspace layout with panel positions" },
    { image: "10-panel-closeups.svg", title: "InDesign Panel Closeups", alt: "Paragraph Styles and Align panel closeups" },
    { image: "14-indesign-setup-steps.svg", title: "InDesign Setup Steps", alt: "InDesign setup: Preferences, Create Guides, final result" },
  ],
  11: [
    { component: DiagramCoverTypes, title: "Seven Cover Typologies" },
    { image: "type01-pure-minimal.jpeg", title: "Cover Type 01 — Pure Minimal", alt: "Text-only composition with asymmetric placement and generous whitespace" },
    { image: "type02-dark-ground.jpeg", title: "Cover Type 02 — Dark Ground", alt: "Light typography on dark textured surface" },
    { image: "type03-hero-image.jpeg", title: "Cover Type 03 — Hero Image", alt: "Central architectural rendering with supporting typography" },
    { image: "type04-bleed-image.jpeg", title: "Cover Type 04 — Bleed + Band", alt: "Rendering bleeding to edges with bold typographic band" },
    { image: "type05-scattered-collage.jpeg", title: "Cover Type 05 — Collage", alt: "Multiple project thumbnails at varying scales" },
    { image: "type06-grid-pattern.jpeg", title: "Cover Type 06 — Grid Pattern", alt: "Repeating motif across the page with integrated typography" },
    { image: "type07-abstract-line.jpeg", title: "Cover Type 07 — Abstract Line", alt: "Sweeping curves and geometric squares with text in quiet zone" },
    { image: "toc01-illustrated-section-grid.png", title: "TOC — Illustrated Section Grid", alt: "Two-page spread with vignette columns and project metadata" },
    { image: "toc02-multi-column-text-index.png", title: "TOC — Multi-Column Text Index", alt: "Three-column typographic layout with cascading metadata" },
    { image: "toc03-thumbnail-gallery-row.png", title: "TOC — Thumbnail Gallery Row", alt: "Horizontal row of equally-sized project thumbnails" },
    { image: "toc04-literary-chapter-index.png", title: "TOC — Literary Chapter Index", alt: "Oversized serif numerals with letterspaced headings" },
    { image: "toc05-bold-number-column-cards.png", title: "TOC — Bold Number Column Cards", alt: "Vertical card columns with oversized numbers and thumbnails" },
    { image: "toc06-narrative-list-hybrid.png", title: "TOC — Narrative + List Hybrid", alt: "Essay spread with drawing paired with structured contents list" },
  ],
  12: [
    { component: DiagramColorPalettes, title: "Three Palette Families" },
    { image: "diagram-color-strategy.svg", title: "Color Palette Strategies", alt: "Three strategies: Monochrome, Accent, and Project-coded" },
  ],
  13: [
    { component: DiagramChecklist, title: "Four-Level Audit Framework" },
    { component: DiagramExportStandards, title: "File Export Standards" },
    { image: "diagram-skill-matrix.svg", title: "Project–Skill Coverage Matrix", alt: "Project–skill coverage matrix showing how projects map to different competencies" },
  ],
  casestudy: [
    { image: "class-pdf/casestudy-spread-1.jpg", title: "Spread 1 — Exposition", alt: "Terrain model and project abstract", caption: "Keyword: 'eroding terrain.' Act I: exposition. Image type: concept. The terrain model opens the storyboard — at skim speed, a reviewer knows this project is about ground shaped by force." },
    { image: "class-pdf/casestudy-spread-2.jpg", title: "Spread 2 — Rising Action", alt: "Aerial site photo and detail terrain model", caption: "Keywords: 'Alpine,' 'terrain.' Act II: rising action. Image types: context + process. The aerial photograph establishes scale; the detail model introduces the method of working with erosion." },
    { image: "class-pdf/casestudy-spread-3.jpg", title: "Spread 3 — Climax", alt: "Winter renderings and building section", caption: "Keywords: 'embeds into,' 'eroding terrain.' Act III: climax. Image types: outcome + process. The section reveals the extreme slope; the rendering shows the environment the design must survive." },
    { image: "class-pdf/casestudy-spread-4.jpg", title: "Spread 4 — Falling Action", alt: "Model photo, approach rendering, and section", caption: "Keywords: 'embeds,' 'spatial experience.' Act IV: falling action. Image types: process + outcome. Massing, sequence, and structure — each drawing answers a question the portfolio already asked." },
    { image: "class-pdf/casestudy-spread-5.jpg", title: "Spread 5 — Resolution", alt: "Gallery interiors and floor plans", caption: "Keywords: 'museum,' 'spatial experience.' Act V: resolution. Image type: outcome. Interior views prove inhabitation; plans prove program. Every claim in the statement has been drawn." },
  ],
};

/* ─── Module content ─── */
const MODULES = [
  {
    id: 1,
    title: "The Portfolio as Constructed Argument",
    part: "Narrative",
    overview: `A portfolio is not a collection of coursework. It is a constructed argument. Every decision about what to include, how to sequence it, and where to place it on the page is an act of design. The portfolio is not separate from your work; it is your work, reframed for an audience. It speaks before you do: before you enter a review, an interview, or a committee, the layout has already made your case or lost it. Reviewers typically spend thirty seconds on an initial scan. In that window, you have either earned a closer reading or you have not.

A portfolio is read at two speeds. At skim speed, the cover, image hierarchy, and project sequence must communicate a clear direction. At study speed (two to five minutes per spread), the written statements, captions, and visual details must deepen that direction without contradicting it.

Different audiences read for different evidence. An academic reviewer looks for process: sketches, diagrams, and failed iterations that reveal how you think through a problem. A large firm looks for resolution: polished deliverables and technical range that demonstrate you can produce at a professional standard. A boutique studio looks for alignment: a design sensibility and point of view that signal you would be a collaborator, not just a pair of hands. Knowing what each audience evaluates for is the difference between a page that documents and a page that argues.

Every architecture portfolio shares a common anatomy: cover, table of contents, project spreads, and supplemental material. Within each project spread, four image types perform distinct roles: concept, context, process, and outcome. Later modules develop these categories and their sequencing in detail. Throughout Part I, we return to a single portfolio (an Alpine Museum project from Harvard GSD) to show how each principle operates in practice. The full case study appears at the end of Part I. Design the reading, not just the work.`,
    keyInsight: `A portfolio is not an archive of everything you have produced. It is an argument.`,
  },
  {
    id: 2,
    title: "Position and Statement",
    part: "Narrative",
    overview: `The Red Thread is the single organizing idea that connects all your projects into one argument. It is not a style. It is not a medium. It is a design position: a recurring question, preoccupation, or methodology that surfaces across different projects, scales, and contexts. Most second-year students can talk about their projects at length. They cannot yet say, in one sentence, what their work is about. The Compression Exercise uses progressive reduction to move from description to position.

**One Paragraph:** Write a project statement of four to six sentences covering what you explored, what problem you responded to, what method you used, and what you discovered. Do not describe the building. Describe the thinking.

**One Sentence:** Compress that paragraph into a single claim. What survives? A weak sentence describes ("I designed an Alpine museum"). A strong sentence declares ("An Alpine museum embeds into eroding terrain to make climate change a spatial experience"). The difference is between reporting and arguing.

**One Word:** Threshold. Tension. Porosity. Absence. Erosion. The word is not a label; it is a lens. It names the design position that recurs across your projects. If you cannot find it, the project may not yet have a clear position.

**The Thread Test:** Repeat the exercise for every project in the portfolio. Write the core words side by side. When the same word keeps surfacing, you have found your Red Thread. When the words scatter, the portfolio lacks a unifying position and needs one.

When you can name your lens, you can use it to curate, sequence, and edit with precision. The exercise turns a vague sense of what your work is about into a single word you can test against every project. See Diagram 02 for a worked example applying this exercise to the Alpine Museum portfolio analyzed in the Case Study at the end of Part I.

**Writing the Project Statement:** Once the compression exercise has produced your position, write it up in two paragraphs. Paragraph one covers context, intent, and thesis in four to six sentences. Paragraph two covers development and outcome with evidence. Tone should be clear, active voice. Present tense for design intent, past tense for process. The concept sentence is the compressed version: one line a reviewer reads in five seconds. It should distill the position you are testing and make it specific and testable. Weak statements describe ("This project explores light"). Strong statements declare ("This project tests whether a single aperture can structure an entire domestic sequence"). The concept sentence becomes the key insight for this project — the single claim that ties all images to one idea.`,
    keyInsight: `A position without a statement is intuition. A statement without a position is description.`,
  },
  {
    id: 3,
    title: "From Statement to Outline",
    part: "Narrative",
    overview: `A project statement is not just text on a page. It is a generative engine. Every operative keyword in a well-written statement points to a specific drawing the portfolio must include. If the statement claims "eroding terrain," the portfolio must show terrain. If it promises "climate change as spatial experience," the portfolio must prove that promise with images of spatial sequence, material weathering, or environmental data. A statement without visual evidence is an empty claim. A portfolio without a statement is a collection without a thesis.

The mapping process works by extraction. Underline the operative keywords in the statement, then sort them into four categories. Context keywords (site, location, existing condition) demand site plans, aerial photographs, and historical mappings. Conflict keywords (problem, tension, constraint) demand analytical diagrams, data overlays, or documentation of existing failure. Intervention keywords (design move, strategy, method) demand massing studies, structural logic, and process diagrams. Outcome keywords (result, transformation, experience) demand renderings, sections, and detail drawings. Each keyword generates a requirement. Each requirement names a drawing.

Arrange those drawings in the order the keywords appear in the statement. The statement already contains a narrative logic — it moves from context to problem to response to result. That sequence becomes the graphic outline: a list of images organized not by when they were produced but by what they argue. The outline is the bridge between writing and layout. Without it, the jump from statement to InDesign fills pages with whatever images happen to be closest at hand.

Test the outline by reading it without the statement. If a reviewer could reconstruct the argument from images alone, the outline works. If the images feel like a random assortment, return to the statement and find the claims that still lack visual proof.`,
    keyInsight: `The statement writes the outline. The outline demands the drawings.`,
  },
  {
    id: 4,
    title: "Sequencing the Arc",
    part: "Narrative",
    overview: `A graphic outline is a list. A narrative arc turns that list into a story. The difference is pacing, tension, and resolution — the same principles that make a film hold attention or a building sequence feel inevitable. Architects already understand this: a building reveals itself through a sequence of spatial experiences, from threshold to compression to release. A portfolio must do the same through a sequence of pages.

The five-act structure provides the scaffold. Act I (Exposition) introduces the protagonist — in architecture, often the site, the user, or a governing concept. The opening spread places the project statement alongside a hero image that establishes the world the project inhabits. Act II (Rising Action) builds tension by introducing the problem: what condition requires intervention, and what is at stake if nothing changes? Visual evidence shifts from neutral documentation to analytical intensity — site overlays, environmental data, documentation of existing failure. Act III (Climax) presents the measurable obstacle that makes the solution difficult: structural constraints, environmental extremes, regulatory barriers. This is the most intense part of the argument, proving the architect's problem-solving capacity by making the difficulty undeniable before showing any resolution.

Act IV (Falling Action) releases tension as the design response unfolds. Massing evolution, structural logic, environmental systems — each drawing responds directly to a barrier identified in the climax. A structural detail is not just a detail; it is the answer to a span problem raised two spreads earlier. Every image earns its place by resolving a question the portfolio has already asked. Act V (Resolution) shows the transformed state: high-quality renderings, perspective sections, and detail studies that let the viewer inhabit the finished project. The conflict has been addressed, the thesis proven, and the reviewer exits with a clear sense of the designer's position.

The arc is not a formula to be followed mechanically. It is a pattern of expectations that audiences already carry. Working with that pattern makes the portfolio persuasive. Ignoring it makes the portfolio feel scattered, regardless of the quality of the work inside.`,
    keyInsight: `A narrative arc is not decoration. It is the structure that makes evidence persuasive.`,
  },
  {
    id: 5,
    title: "Image Types as Evidence",
    part: "Narrative",
    overview: `Every image in a portfolio performs one of four evidentiary roles. Knowing these roles is the difference between a page that documents and a page that argues. It also prevents two common failures: spreads that repeat the same type of proof, and spreads that accumulate images without advancing the argument.

Concept images capture the governing idea — the parti diagram, the conceptual collage, the governing geometry. They answer the question a reviewer asks first: what were you thinking before you drew any plans? Concept images are the visual form of the project statement, the claim made visible, and they belong early in the sequence. Context images ground the project in reality: site photographs, aerial mappings, historical overlays, existing conditions. Without context, even the most elegant proposal reads as autonomous fantasy. Context typically appears in the opening acts of the narrative arc, setting the stage and defining what is at stake.

Process images are evidence of thinking — iterations, massing studies, model photographs, analytical diagrams. They show how problems were solved, not just what was produced. This is where academic reviewers and boutique studios spend the most time; process reveals the designer's intelligence, not just skill. Outcome images prove feasibility and demonstrate professional fluency: the final rendering, the technical drawing, the detail section, the interior view. Outcome belongs in the closing acts, where the design responds to conflict and resolves it.

Return to the graphic outline and label each drawing with its image type. A spread heavy on Outcome but missing Concept has skipped the argument. A spread full of Context but lacking Process has set the stage without performing. The ideal sequence within a project moves from Concept to Context to Process to Outcome, but the narrative arc determines exactly where each type lands across the full spread sequence.`,
    keyInsight: `A portfolio that leads with Outcome is a catalog. One that sequences Concept to Outcome is an argument.`,
  },
  {
    id: 7,
    title: "Storyboarding the Spreads",
    part: "Narrative",
    overview: `The statement generated an outline. The narrative arc gave it structure. The image types classified the evidence. Now the work shifts from planning to page. Storyboarding is the physical act of translating a sequence that exists on paper into a sequence that holds when printed, scrolled, or projected. It is where pacing becomes visible and where problems that looked fine in a list reveal themselves as monotonous, front-loaded, or incomplete.

Print every project image as a small thumbnail — three-by-five or four-by-six inches. Arrange them on a large table or bulletin board. Move them physically, testing different orderings. This kinesthetic approach reveals rhythm problems that are invisible on screen. A sequence that reads logically in a list often feels flat when you see the images at actual relative scale. Look for variety in image size, density, and register across adjacent spreads. If three consecutive spreads show the same type of content at the same scale, the pacing has stalled.

Every spread must work at two speeds simultaneously. At skim speed (thirty to ninety seconds), large images and clear hierarchy carry the argument alone — a reviewer scanning quickly should understand the project's arc from images without reading a word. At study speed (five to fifteen minutes), captions, process documentation, and analytical detail deepen the argument without contradicting what the skim track communicated. Text and image complete each other rather than duplicate. The image shows what cannot be said. The text says what cannot be shown.

Three sequence structures govern how images unfold across spreads: linear narrative (site to concept to development to resolution), comparative narrative (before and after, existing and proposed), and thematic narrative (organized around a design principle rather than chronology). Choose based on what the project argues, not on when the work was produced. The seven-spread exercise tests the storyboard: arrange your strongest project as a complete visual sequence in InDesign — opening spread with concept image and statement, development spreads with process and context, closing spread with outcome. If those seven spreads do not tell a complete story, the problem is in the outline, not the layout.`,
    keyInsight: `If the spreads do not tell the story without the statement, the storyboard is not finished.`,
  },
  {
    id: 8,
    title: "Grid Systems: From Structure to Page",
    part: "Grid",
    overview: `A portfolio grid is not a graphic style or decorative choice. It is the skeletal structure beneath every page (organizing content, establishing hierarchy, and giving meaning room to read clearly). For architects, the grid is a familiar language (one of the oldest organizing principles in human civilization, from the Hippodamian plan of Alexandria to the Ken module of Japanese architecture to Le Corbusier's Modulor).

The logic connecting a building's structural grid to a page grid is direct. A structural column defines rhythm and load-bearing zones. A page column defines rhythm and content zones. Bays correspond to modules. Beam lines correspond to baselines. A building without a grid is a pile of materials; a portfolio without a grid is a collection of images.

Four grid types, one decision: Manuscript Grid (single text column, simplest structure, suited for books and theses), Column Grid (vertical divisions, standard for magazines and editorial layouts), Modular Grid (columns plus horizontal flowlines, the most versatile for mixed architectural content, recommended for portfolios), and Hierarchical Grid (content-driven arrangement, suited for websites and experimental posters).

The choice is not aesthetic preference; it is a structural decision that determines how the reader navigates the page. A modular grid ensures consistency while allowing flexibility. Every page should derive from the same grid logic, creating visual coherence across the portfolio.

The grid should be invisible. If a reviewer stops to analyze the grid structure, you have failed. The grid does not decorate a page; it structures meaning. When the grid works, a reviewer reads the argument, not the layout.

Intentional grid breaks are a legitimate design tool when they serve the narrative. A break should signal emphasis, not confusion. If you break the grid, do so for a reason that a reviewer can understand immediately. The grid is the baseline; breaks are the exception that proves the rule.`,
    keyInsight: `"A portfolio without a grid is like a building without a structural system."`,
  },
  {
    id: 9,
    title: "The 12-Point Modular System",
    part: "Grid",
    overview: `A portfolio without a configured grid is a construction site without foundations. Building the grid is a construction phase (if the previous module was concept, analysis, and precedent, this module is execution). By the end, your InDesign file should function as a prepared construction site (cleared, measured, and structurally framed) ready to receive your architectural content.

Every measurement derives from a single value: 12 points. Margins, gutters, column widths, row heights, and baseline increments are all multiples of 12. Nothing on the page is arbitrary.

The construction sequence follows four phases. Phase 1 - Workspace Setup: Reset InDesign to Essentials, activate core panels (Pages, Layers, Links, Align, Paragraph Styles, Properties), organize the dock, and save as a custom workspace. Phase 2 - Layer Architecture: Create three layers (01_Text for titles, descriptions, page numbers; 02_Images for drawings, renders, photos; 03_Guides for non-printing, locked). Text sits above images; guides are hidden in export. Phase 3 - Parent Pages: Build two parent page templates (A-Intro for splash page with title area and date/location; B-Project for content page with header, grid guides, and project title). Change a parent once and all child pages update automatically. Phase 4 - The Structural Grid: Document at 600 × 840 pt (5:7 proportion). Baseline grid starting at 0 pt, relative to top margin, incrementing every 12 pt. Margins at 36/48/36/36 pt (top/bottom/inside/outside). Six columns with 12 pt gutters. Eight rows with 12 pt gutters via Layout > Create Guides.

The modular grid and baseline grid operate as complementary systems. The modular grid governs placement and proportion. The baseline grid governs the internal rhythm of text. Together, they achieve precision and clarity. Six columns and eight rows produce 48 modules per page (enough variation for any spread from a single structural foundation).

This system is not restrictive. It is generative. The more tightly constrained the grid, the more creative the solutions within it.`,
    keyInsight: `"Every measurement is a multiple of 12. Nothing on the page is arbitrary."`,
  },
  {
    id: 10,
    title: "Typographic Systems & Architectural Voice",
    part: "Grid",
    overview: `Typography is how your portfolio speaks when you are not in the room. Limit to two to three complementary fonts. Establish clear size relationships and use weight and style strategically.

Font Pairing Principles: Choose one serif font paired with one sans-serif font, or use two weights of the same family. This creates contrast without chaos. Avoid mixing multiple serif families or multiple sans-serif families without a clear hierarchy reason.

Modernist Workhorses: Helvetica, Futura, DIN, Univers (proven, neutral, versatile). Humanist and Contemporary: Avenir, Söhne, Gill Sans, Circular (warmer, more approachable). Editorial and Stylistic: Neue Montreal, GT Alpina, Minion Pro (personality with restraint).

Size standards for print: Titles at 24/30 pt (size/leading), subtitles at 14/18 pt, body text at 10/12 pt, captions at 8/10 pt. These map to the hierarchy of information on the page, ensuring the reader encounters content in the correct order. The visual hierarchy should feel intuitive, not arbitrary.

In InDesign, define these as Paragraph Styles (Window > Styles > Paragraph Styles). The critical setting is Indents and Spacing > Align to Grid: All Lines. This locks every line of text to the 12-point baseline grid, ensuring lines align across columns (the hallmark of professional typographic control). Without baseline alignment, text drifts between grid increments and the portfolio loses structural precision.

Line spacing (leading) matters for readability. Body text leading at 12 pt matches the baseline grid increment exactly. Tighter leading (100–120%) works for captions and headlines; looser leading (150%+) works for display text. Proper line spacing creates visual breathing room and prevents the portfolio from feeling dense.

Typography reinforces the portfolio argument. Choose typefaces that align with the design position. A minimalist architect should choose typography that feels restrained. A designer interested in craft should choose typefaces with history and detail.`,
    keyInsight: `"Typography is how your portfolio speaks when you are not in the room."`,
  },
  {
    id: 11,
    title: "The Cover Page & Information Architecture",
    part: "Grid",
    overview: `The cover is the first design decision a reviewer encounters. Seven cover typologies range from Pure Minimal (whitespace as primary element, text under 8% of page area) to Abstract Line compositions with freeform curves and stroke weight hierarchy.

Each typology suits a different portfolio personality. Pure Minimal signals restraint and focus (appropriate for portfolios where the work speaks without ornament). Dark Ground provides a frame and controls the viewer's entry. Hero Image leads with a single defining moment. Bleed + Band creates motion through layering. Collage suggests complexity and multiplicity. Grid Pattern implies systems thinking. Abstract Line conveys refinement and gesture.

The choice of cover should reinforce the same design position that runs through the entire portfolio (another expression of the Red Thread). A minimalist architect's cover should feel architectural. A designer interested in systems should choose a cover that demonstrates systematic thinking.

The Table of Contents should match the cover in visual language. The TOC is not decorative; it is informational architecture. How you organize and present the contents signals to a reviewer what you value and how you think.

TOC Format Options: Thumbnail TOC uses small images of each project spread alongside project titles, showing the viewer what to expect. Text-Only TOC lists project titles and page numbers without images, maintaining a clean, legible format. Hybrid TOC combines a select set of key project images with supporting text. Choose based on portfolio scope (if the portfolio is under 30 pages, thumbnails work well; if larger, text-only TOC prevents overwhelming the viewer).

Page Numbering: Number pages from the cover onward (cover is page 1) for academic portfolios, or begin numbering after the cover and TOC for professional portfolios. Consistency matters more than the choice itself. Roman numerals (i, ii, iii) are traditional for front matter; Arabic numerals (1, 2, 3) for project pages.`,
    keyInsight: `"The cover is the first design decision a reviewer encounters."`,
  },
  {
    id: 12,
    title: "Color Systems & Tonal Unity",
    part: "Production",
    overview: `Color in a portfolio is a system, not an accent. Three palette families serve architectural portfolios well:

Nature-Grounded: Terracotta, sage, sand, warm gray. These palettes ground the work in materiality and suggest craft.

Muted Contemporary: Pale cyan, lavender, coral. Softer palettes that create visual interest without competing with project images.

Industrial Neutrals: Deep grays, charcoals, blacks. The most common choice (it disappears and lets the work speak).

Tonal unity across spreads matters. When images from different projects sit side by side, their differences can distract. A consistent color treatment (whether desaturation, unified white balance, or limited tonal palette) binds disparate images into a single visual language. Studio work photographed under different lighting conditions (warm tungsten, cool fluorescent, variable daylight) creates visual discord. Desaturation as a unifying device helps. Alternatively, apply a consistent color cast that equalizes temperature variation.

Use color when it advances the argument. Suppress it when it distracts. Every color choice should be deliberate; if you cannot explain why a color is there, remove it. Update images in post-production to ensure consistent color families across projects.

Diagnostic Test: Print your portfolio in grayscale. If the visual hierarchy (emphasis, rhythm, sequencing) still reads clearly without color, then your color is supporting rather than supplanting structure. If the portfolio falls apart in grayscale, the color is doing too much work and structure needs strengthening.`,
    keyInsight: `"Tonal consistency provides chromatic unity across the grid."`,
  },
  {
    id: 13,
    title: "The Final Audit: Self-Editing Protocol",
    part: "Production",
    overview: `Before submission, audit your portfolio at four levels. Use this checklist to catch oversights and strengthen weak areas.

Project-Level: Clear project statement · Narrative-driven sequencing · Each image serves a communicative function · Captions provide non-visual information.

Portfolio-Level: Demonstrates range without losing coherence · Clear logic governing project order · Functions at both skim and study speeds · Red Thread visible across projects.

Visual and Production Quality: 300 DPI minimum for print · Typography consistency · Cohesive color palette · Spelling and proofreading complete.

Final Production: Separate optimized PDFs (print at 300 DPI, CMYK and digital at 150 DPI, RGB, under 10 MB) · All fonts embedded · Website portfolio live and updated · File naming: Lastname_Portfolio_Year.pdf (e.g., Lastname_Portfolio_2025.pdf).

Peer Review: Before finalizing, have two to three trusted colleagues or mentors review the portfolio. Ask them to spend thirty seconds on an initial scan, then take five minutes for deeper reading. Ask: "What story do you think this designer cares about?" Their answer should match your intended position. If not, the portfolio is not yet communicating clearly. Revise and test again.`,
    keyInsight: `"The audit is not the last step. It is the first honest reading of your own work."`,
  },
];
// Case study content
const CASE_STUDY = {
  id: "casestudy",
  title: "Case Study: Erosion",
  part: "Part I Conclusion",
  overview: `This portfolio, from an Advanced Studio at Harvard GSD, proposes converting a decommissioned Cold War bunker at Col du Pillon into an Alpine Museum in Les Diablerets, Switzerland. Five spreads present the project. What follows is a reading of those spreads through the six modules of Part I, showing how each principle operates in practice.

**The Portfolio as Constructed Argument.** This is not documentation of a studio assignment. Every spread advances a single claim: that architecture can make an invisible environmental process — glacial retreat, alpine erosion — into a spatial experience a visitor moves through. Spread 1 opens with a terrain model and the project abstract; Spread 5 closes with inhabited gallery interiors and floor plans. The sequence is not chronological. It is argumentative: ground first, then intervention, then inhabitation. The portfolio builds a case.

**Position and Statement.** The compression exercise applied to this project. Paragraph: "The design converts a decommissioned Cold War bunker into an Alpine museum by cutting into eroding mountainside terrain, creating a continuous path that makes geological time visible as visitors move between landscape and gallery." Sentence: "An Alpine museum embeds into eroding terrain to make climate change a spatial experience." Word: Erosion. Thread test: erosion recurs across every spread — terrain models shaped by geological force, sections carved into slope, galleries embedded in eroded ground, visitor paths that descend into the earth. The word is not a label. It is the lens that governs every image. The original abstract begins with description: it credits the instructor, uses passive voice, and offers no position. The compressed version declares a testable claim. Every image in the portfolio can be measured against it.

**From Statement to Outline.** The concept sentence contains five operative keywords: Alpine, museum, embeds, eroding terrain, spatial experience. Each keyword demands specific visual evidence. "Alpine" demands the aerial site photograph (Spread 2). "Embeds" and "eroding terrain" demand the terrain model (Spread 1), the detail model (Spread 2), and the building sections (Spreads 3 and 4). "Spatial experience" demands the interior gallery renderings (Spread 5). "Museum" demands the floor plans (Spread 5). The graphic outline writes itself: every claim in the statement has a corresponding drawing. Nothing is included without a reason.

**Sequencing the Arc.** The five spreads follow a five-act structure. Act I — Exposition (Spread 1): the terrain model, photographed in dramatic raking light, introduces the protagonist — ground shaped by erosive force. Act II — Rising Action (Spread 2): the aerial site photograph and detail model establish the alpine context and reveal what is at stake — a landscape undergoing visible erosion. Act III — Climax (Spread 3): winter renderings and a building section make the difficulty undeniable — how does architecture embed into an actively eroding slope in an extreme alpine environment? Act IV — Falling Action (Spread 4): the physical model, approach rendering, and section show the design response — massing resolved, arrival sequence established, structural logic responding directly to slope. Act V — Resolution (Spread 5): interior gallery renderings and floor plans prove the spatial experience works. The conflict has been addressed. The thesis has been proven.

**Image Types as Evidence.** Concept: the terrain model (Spread 1), establishing erosion as the governing idea before any building appears. Context: the aerial site photograph (Spread 2), grounding the project in the glaciated alpine landscape between Gstaad and Les Diablerets. Process: the detail terrain model (Spread 2) showing the architectural incision, the building sections (Spreads 3 and 4) showing ramped circulation descending into slope, and the physical model (Spread 4) with the roof emerging as a geometric cut in the snow. Outcome: the interior gallery renderings and floor plans (Spread 5), demonstrating the resolved spatial experience of inhabiting eroded ground. Each type appears where it belongs in the narrative arc.

**Storyboarding the Spreads.** Each of the five spreads advances the argument without repeating the previous one. Spread 1 establishes the thesis through terrain. Spread 2 grounds it in site and shows the first incision. Spreads 3 and 4 develop the architecture through renderings and sections at increasing resolution. Spread 5 resolves with inhabited space. The two-track reading works: at skim speed, the terrain-to-gallery arc is legible from images alone; at study speed, the sections and plans reveal the spatial logic of embedding into eroded ground. If the five spreads tell the story without the statement, the storyboard is finished.`,
  keyInsight: null,
};

/* ─── Hash routing ─── */
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function navigate(hash) {
  window.location.hash = hash;
  window.scrollTo(0, 0);
}

/* ─── About content ─── */
const ABOUT_TEXT = [
  "Portfolio as Narrative is the companion resource for ARCH 66995: Portfolio, a studio-style course at Kent State University's College of Architecture and Environmental Design. The course guides architecture students in developing academic portfolios that synthesize design concepts and communicate architectural thinking to faculty and professional audiences.",
  "The guide covers thirteen modules across three parts: content curation, visual storytelling, and narrative structure (Narrative); grid systems, typography, and composition strategies (Grid); and color systems, technical production, and self-editing protocols (Production). Each module pairs pedagogical text with reference diagrams drawn from real student portfolios and professional practice.",
  "The course follows a fifteen-week cumulative structure, from portfolio foundations and audience analysis through storyboarding, grid application, and typographic systems, to final production, peer critique, and portfolio presentation. Assignments build progressively toward a fully resolved academic portfolio.",
  "Whether you are preparing for graduate school applications, professional interviews, or scholarship reviews, the framework here applies. A portfolio is not a binder. It is an argument, and this guide shows you how to build one.",
];

/* ─── Interactive Checklist ─── */
function InteractiveChecklist({ moduleId }) {
  const checklistData = [
    {
      level: "Project-Level",
      color: T.accent,
      items: ["Clear project statement with a testable claim", "Narrative-driven image sequencing", "Each image serves a named function (concept, process, outcome, context)", "Captions provide information the image cannot show"]
    },
    {
      level: "Portfolio-Level",
      color: T.navy,
      items: ["Demonstrates range without losing coherence", "Clear logic governing project order", "Functions at both skim and study speeds", "Red Thread visible across projects"]
    },
    {
      level: "Visual / Production",
      color: T.coral,
      items: ["300 DPI minimum for print", "Consistent typography across all spreads", "Cohesive color palette with normalized white balance", "Spelling and proofreading complete"]
    },
    {
      level: "Final Production",
      color: T.gold,
      items: ["Each project contains all four image types", "File named clearly (Lastname_Portfolio_Year.pdf)", "Separate PDFs for print (CMYK) and digital (RGB)", "All fonts embedded"]
    },
  ];

  const [checked, setChecked] = useState({});
  const totalItems = checklistData.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const handleToggle = (key) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: T.text, margin: 0 }}>Self-Editing Audit</h3>
        <span style={{ fontSize: 11, color: T.textLight }}>{checkedCount} of {totalItems} checked</span>
      </div>

      {checklistData.map((cat, catIdx) => (
        <div key={catIdx} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: cat.color, marginBottom: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {cat.level}
          </div>
          <div>
            {cat.items.map((item, itemIdx) => {
              const key = `${catIdx}-${itemIdx}`;
              const isChecked = checked[key] || false;
              return (
                <label key={key} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 0", cursor: "pointer",
                  opacity: isChecked ? 0.5 : 1,
                  transition: "opacity 0.2s ease",
                }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggle(key)}
                    style={{
                      width: 14, height: 14, cursor: "pointer",
                      accentColor: cat.color,
                    }}
                  />
                  <span style={{
                    fontSize: 12, color: T.textMid,
                    textDecoration: isChecked ? "line-through" : "none",
                  }}>
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Diagram Gallery Item with hover title ─── */
function DiagramSlideshow({ diagrams, moduleLabel, backHash }) {
  const scrollRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const basePath = import.meta.env.BASE_URL || "/";
  const total = diagrams.length;

  // Remap vertical scroll → horizontal scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 4;
      }
    };
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  // Keyboard: left/right arrows scroll, Escape exits
  useEffect(() => {
    const onKey = (e) => {
      const container = scrollRef.current;
      if (!container) return;
      if (e.key === "ArrowRight") { e.preventDefault(); container.scrollLeft += 400; }
      if (e.key === "ArrowLeft") { e.preventDefault(); container.scrollLeft -= 400; }
      if (e.key === "Escape") navigate(backHash);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [backHash]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, fontFamily: T.sans, background: T.bg }}>
      {/* Fixed top bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 101,
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        padding: "20px 40px",
      }}>
        <button onClick={() => navigate(backHash)} style={{
          background: "none", border: "none", fontSize: 10, color: T.textMuted, cursor: "pointer",
          fontFamily: T.sans, letterSpacing: "0.06em", textTransform: "uppercase", padding: 0,
        }}>← {moduleLabel}</button>
        <span style={{ fontSize: 9, color: T.textFaint, letterSpacing: "0.06em" }}>
          {moduleLabel} — {total} diagram{total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Horizontal free-scroll gallery */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute", inset: 0,
          overflowX: "auto", overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          display: "flex", alignItems: "center",
          gap: 60,
          padding: "0 calc(50vw - 240px)",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          cursor: "grab",
        }}
      >
        {diagrams.map((diagram, i) => {
          const DiagramComp = diagram.component;
          const isImage = !!diagram.image;
          const isHovered = hovered === i;
          return (
            <div
              key={i}
              style={{
                flexShrink: 0, position: "relative",
                display: "flex", flexDirection: "column", alignItems: "center",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Uniform grey card */}
              <div style={{
                width: "85vh", height: "65vh",
                background: T.bgAlt,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: 24, boxSizing: "border-box",
                overflow: "hidden",
              }}>
                {isImage ? (
                  <img
                    src={`${basePath}images/${diagram.image}`}
                    alt={diagram.alt || diagram.title}
                    draggable={false}
                    style={{
                      maxWidth: "100%", maxHeight: "100%",
                      display: "block", objectFit: "contain",
                      userSelect: "none",
                    }}
                  />
                ) : DiagramComp ? (
                  <div style={{ width: "100%", maxWidth: "90%" }}>
                    <DiagramComp />
                  </div>
                ) : null}
              </div>
              {/* Title + caption */}
              <div style={{
                marginTop: 12, maxWidth: "85vh", textAlign: "center",
              }}>
                <div style={{
                  fontSize: 10, color: T.textLight, letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                  opacity: isHovered || diagram.caption ? 1 : 0, transition: "opacity 0.2s ease",
                }}>
                  {diagram.title}
                </div>
                {diagram.caption && (
                  <div style={{
                    marginTop: 6, fontSize: 11, lineHeight: 1.6, color: T.textMid,
                    letterSpacing: "0.01em", whiteSpace: "normal",
                    maxWidth: 480, margin: "6px auto 0",
                  }}>
                    {diagram.caption}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {/* End spacer */}
        <div style={{ flexShrink: 0, width: "calc(50vw - 240px)" }} />
      </div>

      {/* Fixed bottom bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 101,
        display: "flex", justifyContent: "center", padding: "20px 40px",
      }}>
        <span style={{ fontSize: 9, color: T.textFaint, letterSpacing: "0.04em" }}>
          Scroll to browse
        </span>
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function PortfolioGuide() {
  const route = useHashRoute();
  const [visible, setVisible] = useState(true);
  const prevRoute = useRef(route);

  // Determine view from hash
  let view = "landing";
  let activeModule = null;
  let isCaseStudy = false;
  let diagramModuleId = null;

  if (route === "#/about") {
    view = "about";
  } else if (route === "#/casestudy") {
    view = "casestudy";
    isCaseStudy = true;
  } else if (route.startsWith("#/diagrams/")) {
    const rawId = route.split("/")[2];
    diagramModuleId = /^\d+$/.test(rawId) ? parseInt(rawId, 10) : rawId;
    view = "diagrams";
  } else if (route.startsWith("#/module/")) {
    const id = parseInt(route.split("/")[2], 10);
    activeModule = MODULES.find(m => m.id === id) || null;
    if (activeModule) view = "module";
  }

  // Fade transition on route change
  useEffect(() => {
    if (prevRoute.current !== route) {
      setVisible(false);
      const t = setTimeout(() => setVisible(true), 220);
      prevRoute.current = route;
      return () => clearTimeout(t);
    }
  }, [route]);

  const handleModuleClick = (mod) => navigate(`#/module/${mod.id}`);
  const handleBack = () => navigate("#/");
  const handleNavClick = (mod) => {
    navigate(`#/module/${mod.id}`);
  };

  // ─── Landing ───
  if (view === "landing") {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.sans, display: "flex", flexDirection: "column" }}>
        <header style={{ padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: T.textMuted, fontWeight: 400 }}>
            Portfolio Workshop
          </div>
          <button onClick={() => navigate("#/about")} style={{
            background: "none", border: "none", fontSize: 10, color: T.textMuted,
            cursor: "pointer", fontFamily: T.sans, letterSpacing: "0.04em", padding: 0,
          }}>About</button>
        </header>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 40px" }}>
          <div style={{ width: "100%", maxWidth: 400, opacity: visible ? 1 : 0, transition: "opacity 0.22s ease" }}>
            {Object.entries(PARTS).map(([partKey, part]) => (
              <div key={partKey}>
                <div style={{
                  fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: T.textFaint, fontWeight: 500, marginTop: partKey === "part1" ? 0 : 28,
                  marginBottom: 10,
                }}>
                  Part {partKey === "part1" ? "I" : partKey === "part2" ? "II" : "III"}: {part.title}
                </div>
                {part.modules.map((modId) => {
                  const mod = MODULES.find(m => m.id === modId);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => handleModuleClick(mod)}
                      style={{
                        display: "flex", alignItems: "baseline", gap: 14,
                        padding: "9px 0", borderBottom: `1px solid ${T.border}`,
                        cursor: "pointer", transition: "opacity 0.2s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                    >
                      <span style={{ fontSize: 10, color: T.textFaint, fontVariantNumeric: "tabular-nums", minWidth: 20, fontWeight: 400, letterSpacing: "0.02em" }}>
                        {String(MODULE_POSITION[mod.id]).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: 12, color: T.text, fontWeight: 400, letterSpacing: "0.01em" }}>
                        {mod.title}
                      </span>
                    </div>
                  );
                })}
                {/* Case Study after Part I */}
                {partKey === "part1" && (
                  <div
                    onClick={() => navigate("#/casestudy")}
                    style={{
                      display: "flex", alignItems: "baseline", gap: 14,
                      padding: "9px 0", borderBottom: `1px solid ${T.border}`,
                      cursor: "pointer", transition: "opacity 0.2s ease",
                      fontStyle: "italic",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    <span style={{ fontSize: 10, color: T.textFaint, minWidth: 20, fontWeight: 400, letterSpacing: "0.02em" }}></span>
                    <span style={{ fontSize: 12, color: T.text, fontWeight: 400, letterSpacing: "0.01em" }}>
                      {CASE_STUDY.title}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer style={{ padding: "28px 40px", display: "flex", justifyContent: "space-between", fontSize: 9, color: T.textFaint, fontFamily: T.sans, letterSpacing: "0.04em" }}>
          <span>Kent State University · CAED</span>
          <a href="https://thresholdarch.com" target="_blank" rel="noopener noreferrer" style={{ color: T.textFaint, textDecoration: "none" }}>thresholdarch.com</a>
        </footer>
      </div>
    );
  }

  // ─── About ───
  if (view === "about") {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.sans, display: "flex", flexDirection: "column" }}>
        <header style={{ padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <button onClick={handleBack} style={{
            background: "none", border: "none", fontSize: 10, color: T.textMuted,
            cursor: "pointer", fontFamily: T.sans, letterSpacing: "0.06em", textTransform: "uppercase", padding: 0,
          }}>← Portfolio Workshop</button>
          <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: "0.04em" }}>About</div>
        </header>

        <div style={{
          flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          padding: "0 40px", opacity: visible ? 1 : 0, transition: "opacity 0.22s ease",
        }}>
          <div style={{ width: "100%", maxWidth: 440 }}>
            <h1 style={{ fontSize: 16, fontWeight: 500, color: T.text, margin: "0 0 8px", letterSpacing: "0.01em" }}>
              Portfolio as Narrative
            </h1>
            <p style={{ fontSize: 11, color: T.textLight, margin: "0 0 28px", letterSpacing: "0.02em" }}>
              From the Red Thread to the Grid
            </p>
            <div style={{ width: 24, height: 1, background: T.text, marginBottom: 28 }} />
            {ABOUT_TEXT.map((p, i) => (
              <p key={i} style={{ fontSize: 12, lineHeight: 1.8, color: T.textMid, margin: "0 0 14px", letterSpacing: "0.01em" }}>{p}</p>
            ))}
            <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${T.border}` }}>
              <p style={{ fontSize: 12, color: T.textLight, margin: 0, lineHeight: 1.8, letterSpacing: "0.01em" }}>
                Seth Looper<br />
                Kent State University · College of Architecture and Environmental Design<br />
                <a href="mailto:slooper@kent.edu" style={{ color: T.textMuted, textDecoration: "none" }}>slooper@kent.edu</a>
              </p>
            </div>
          </div>
        </div>

        <footer style={{ padding: "28px 40px", display: "flex", justifyContent: "space-between", fontSize: 9, color: T.textFaint, fontFamily: T.sans, letterSpacing: "0.04em" }}>
          <span>Kent State University · CAED</span>
          <a href="https://thresholdarch.com" target="_blank" rel="noopener noreferrer" style={{ color: T.textFaint, textDecoration: "none" }}>thresholdarch.com</a>
        </footer>
      </div>
    );
  }

  // ─── Case Study View ───
  if (isCaseStudy) {
    const paragraphs = CASE_STUDY.overview.split("\n\n");
    const diagrams = DIAGRAM_MAP.casestudy || [];

    return (
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.sans, display: "flex", flexDirection: "column" }}>
        <header style={{
          padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, background: T.bg, zIndex: 50,
        }}>
          <button onClick={handleBack} style={{
            background: "none", border: "none", fontSize: 10, color: T.textMuted, cursor: "pointer",
            fontFamily: T.sans, letterSpacing: "0.06em", textTransform: "uppercase", padding: 0,
          }}>← Portfolio Workshop</button>
          <div style={{ display: "flex", gap: 2, flexWrap: "nowrap", overflowX: "auto", justifyContent: "flex-end" }}>
            {MODULES.map((m) => (
              <button key={m.id} onClick={() => handleNavClick(m)} style={{
                width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", color: T.textFaint, border: "none", fontSize: 9, fontFamily: T.sans,
                fontWeight: 400, cursor: "pointer", borderRadius: 1, transition: "all 0.15s ease", fontVariantNumeric: "tabular-nums",
                letterSpacing: "0.02em", flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = T.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = T.textFaint; }}
              >{String(m.id).padStart(2, "0")}</button>
            ))}
          </div>
        </header>

        <div style={{
          flex: 1, padding: "56px 40px 80px",
          maxWidth: 520, width: "100%", margin: "0 auto",
          opacity: visible ? 1 : 0, transition: "opacity 0.22s ease",
        }}>
          <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textFaint, fontWeight: 400, marginBottom: 10 }}>
            Case Study
          </div>
          <h1 style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4, color: T.text, margin: "0 0 20px", letterSpacing: "0.01em" }}>
            {CASE_STUDY.title}
          </h1>
          <div style={{ width: 24, height: 1, background: T.text, marginBottom: 32 }} />

          {paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 13, lineHeight: 1.8, color: T.textMid, margin: "0 0 16px", letterSpacing: "0.01em" }}>{p}</p>
          ))}

          {CASE_STUDY.keyInsight && (
            <div style={{ borderLeft: `2px solid ${T.text}`, paddingLeft: 16, marginBottom: 40, marginTop: 28 }}>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: T.text, fontStyle: "italic", margin: 0, letterSpacing: "0.01em" }}>{CASE_STUDY.keyInsight}</p>
            </div>
          )}

          {/* Diagram hyperlinks */}
          {diagrams.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <span
                onClick={() => navigate("#/diagrams/casestudy")}
                style={{
                  fontSize: 12, color: T.steel, cursor: "pointer",
                  borderBottom: `1px solid ${T.steel}40`, paddingBottom: 2,
                  transition: "color 0.15s ease, border-color 0.15s ease",
                  fontFamily: T.sans, letterSpacing: "0.01em", lineHeight: 1.8,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = T.steelLight; e.currentTarget.style.borderColor = `${T.steelLight}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = T.steel; e.currentTarget.style.borderColor = `${T.steel}40`; }}
              >
                Diagram — {diagrams.map((d, i) => d.title).join(", ")}
              </span>
            </div>
          )}

          {/* Prev / Next */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48, paddingTop: 20, borderTop: `1px solid ${T.border}` }}>
            <button onClick={() => handleNavClick(MODULES[MODULES.length - 1])} style={{
              background: "none", border: "none", fontSize: 10, color: T.textMuted, cursor: "pointer", fontFamily: T.sans, padding: 0, textAlign: "left", letterSpacing: "0.02em",
            }}>
              <span style={{ display: "block", fontSize: 8, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3, color: T.textFaint }}>Previous</span>
              {String(MODULES[MODULES.length - 1].id).padStart(2, "0")} — {MODULES[MODULES.length - 1].title}
            </button>
            <button onClick={() => handleNavClick(MODULES[0])} style={{
              background: "none", border: "none", fontSize: 10, color: T.textMuted, cursor: "pointer", fontFamily: T.sans, padding: 0, textAlign: "right", letterSpacing: "0.02em",
            }}>
              <span style={{ display: "block", fontSize: 8, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3, color: T.textFaint }}>Next</span>
              {String(MODULES[0].id).padStart(2, "0")} — {MODULES[0].title}
            </button>
          </div>
        </div>

      <footer style={{ padding: "28px 40px", display: "flex", justifyContent: "space-between", fontSize: 9, color: T.textFaint, fontFamily: T.sans, letterSpacing: "0.04em" }}>
        <span>Kent State University · CAED</span>
        <a href="https://thresholdarch.com" target="_blank" rel="noopener noreferrer" style={{ color: T.textFaint, textDecoration: "none" }}>thresholdarch.com</a>
      </footer>

      </div>
    );
  }

  // ─── Diagram Gallery View ───
  if (view === "diagrams" && diagramModuleId !== null) {
    const diagrams = DIAGRAM_MAP[diagramModuleId] || [];
    const isCaseStudyDiagrams = diagramModuleId === "casestudy";
    const isSpreads = diagramModuleId === "1spreads";
    const backHash = isCaseStudyDiagrams ? "#/casestudy" : isSpreads ? "#/module/1" : `#/module/${diagramModuleId}`;
    const moduleLabel = isCaseStudyDiagrams ? "Case Study" : isSpreads ? "Case Study Spreads" : `Module ${String(MODULE_POSITION[diagramModuleId] || diagramModuleId).padStart(2, "0")}`;

    return (
      <DiagramSlideshow
        diagrams={diagrams}
        moduleLabel={moduleLabel}
        backHash={backHash}
      />
    );
  }

  // ─── Detail View ───
  const mod = activeModule;
  const paragraphs = mod.overview.split("\n\n");
  const diagrams = DIAGRAM_MAP[mod.id] || [];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.sans, display: "flex", flexDirection: "column" }}>
      <header style={{
        padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, background: T.bg, zIndex: 50,
      }}>
        <button onClick={handleBack} style={{
          background: "none", border: "none", fontSize: 10, color: T.textMuted, cursor: "pointer",
          fontFamily: T.sans, letterSpacing: "0.06em", textTransform: "uppercase", padding: 0,
        }}>← Portfolio Workshop</button>
        <div style={{ display: "flex", gap: 2, flexWrap: "nowrap", overflowX: "auto", justifyContent: "flex-end" }}>
          {MODULES.map((m) => (
            <button key={m.id} onClick={() => handleNavClick(m)} style={{
              width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
              background: m.id === mod.id ? T.text : "transparent",
              color: m.id === mod.id ? "#fff" : T.textFaint,
              border: "none", fontSize: 9, fontFamily: T.sans,
              fontWeight: m.id === mod.id ? 500 : 400, cursor: "pointer",
              borderRadius: 1, transition: "all 0.15s ease", fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.02em", flexShrink: 0,
            }}
            onMouseEnter={(e) => { if (m.id !== mod.id) e.currentTarget.style.color = T.text; }}
            onMouseLeave={(e) => { if (m.id !== mod.id) e.currentTarget.style.color = T.textFaint; }}
            >{String(m.id).padStart(2, "0")}</button>
          ))}
        </div>
      </header>

      <div style={{
        flex: 1, padding: "56px 40px 80px",
        maxWidth: 520, width: "100%", margin: "0 auto",
        opacity: visible ? 1 : 0, transition: "opacity 0.22s ease",
      }}>
        <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textFaint, fontWeight: 400, marginBottom: 10 }}>
          Module {String(MODULE_POSITION[mod.id]).padStart(2, "0")}
        </div>
        <h1 style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4, color: T.text, margin: "0 0 20px", letterSpacing: "0.01em" }}>
          {mod.title}
        </h1>
        <div style={{ width: 24, height: 1, background: T.text, marginBottom: 32 }} />

        {paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: 13, lineHeight: 1.8, color: T.textMid, margin: "0 0 16px", letterSpacing: "0.01em" }}>
            {p.split(/(\*\*[^*]+\*\*)/).map((seg, j) =>
              seg.startsWith("**") && seg.endsWith("**")
                ? <strong key={j} style={{ color: T.text, fontWeight: 600 }}>{seg.slice(2, -2)}</strong>
                : seg
            )}
          </p>
        ))}

        {mod.keyInsight && (
          <div style={{ borderLeft: `2px solid ${T.text}`, paddingLeft: 16, marginBottom: 40, marginTop: 28 }}>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: T.text, fontStyle: "italic", margin: 0, letterSpacing: "0.01em" }}>{mod.keyInsight}</p>
          </div>
        )}

        {/* Diagram hyperlinks */}
        {diagrams.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <span
              onClick={() => navigate(`#/diagrams/${mod.id}`)}
              style={{
                fontSize: 12, color: T.steel, cursor: "pointer",
                borderBottom: `1px solid ${T.steel}40`, paddingBottom: 2,
                transition: "color 0.15s ease, border-color 0.15s ease",
                fontFamily: T.sans, letterSpacing: "0.01em", lineHeight: 1.8,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = T.steelLight; e.currentTarget.style.borderColor = `${T.steelLight}`; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = T.steel; e.currentTarget.style.borderColor = `${T.steel}40`; }}
            >
              Diagram {String(mod.id).padStart(2, "0")} — {diagrams.map((d) => d.title).join(", ")}
            </span>
          </div>
        )}
        {/* Case Study Spreads link — shows on modules 1 and 2 */}
        {(mod.id === 1) && DIAGRAM_MAP["1spreads"] && (
          <div style={{ marginTop: diagrams.length > 0 ? 10 : 32 }}>
            <span
              onClick={() => navigate("#/diagrams/1spreads")}
              style={{
                fontSize: 12, color: T.steel, cursor: "pointer",
                borderBottom: `1px solid ${T.steel}40`, paddingBottom: 2,
                transition: "color 0.15s ease, border-color 0.15s ease",
                fontFamily: T.sans, letterSpacing: "0.01em", lineHeight: 1.8,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = T.steelLight; e.currentTarget.style.borderColor = `${T.steelLight}`; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = T.steel; e.currentTarget.style.borderColor = `${T.steel}40`; }}
            >
              Case Study — Erosion Portfolio (5 Spreads)
            </span>
          </div>
        )}

        {/* Interactive Checklist for module 13 */}
        {mod.id === 13 && <InteractiveChecklist moduleId={mod.id} />}

        {/* Prev / Next (wraps at boundaries) */}
        {(() => {
          const curIdx = MODULES.findIndex(m => m.id === mod.id);
          const prevMod = MODULES[(curIdx - 1 + MODULES.length) % MODULES.length];
          const nextMod = MODULES[(curIdx + 1) % MODULES.length];
          return (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48, paddingTop: 20, borderTop: `1px solid ${T.border}` }}>
              <button onClick={() => handleNavClick(prevMod)} style={{
                background: "none", border: "none", fontSize: 10, color: T.textMuted, cursor: "pointer", fontFamily: T.sans, padding: 0, textAlign: "left", letterSpacing: "0.02em",
              }}>
                <span style={{ display: "block", fontSize: 8, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3, color: T.textFaint }}>Previous</span>
                {String(prevMod.id).padStart(2, "0")} — {prevMod.title}
              </button>
              <button onClick={() => handleNavClick(nextMod)} style={{
                background: "none", border: "none", fontSize: 10, color: T.textMuted, cursor: "pointer", fontFamily: T.sans, padding: 0, textAlign: "right", letterSpacing: "0.02em",
              }}>
                <span style={{ display: "block", fontSize: 8, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3, color: T.textFaint }}>Next</span>
                {String(nextMod.id).padStart(2, "0")} — {nextMod.title}
              </button>
            </div>
          );
        })()}
      </div>

      <footer style={{ padding: "28px 40px", display: "flex", justifyContent: "space-between", fontSize: 9, color: T.textFaint, fontFamily: T.sans, letterSpacing: "0.04em" }}>
        <span>Kent State University · CAED</span>
        <a href="https://thresholdarch.com" target="_blank" rel="noopener noreferrer" style={{ color: T.textFaint, textDecoration: "none" }}>thresholdarch.com</a>
      </footer>

    </div>
  );
}