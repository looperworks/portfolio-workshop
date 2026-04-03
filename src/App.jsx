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
  sans: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  serif: "'Inter', 'Helvetica Neue', Arial, sans-serif",
};

/* ─── Part groupings ─── */
const PARTS = {
  part1: {
    title: "Narrative",
    modules: [1, 2, 3, 4, 5, 6],
  },
  part2: {
    title: "Grid",
    modules: [7, 8, 9, 10, 11],
  },
  part3: {
    title: "Production",
    modules: [12, 13],
  },
};

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

function DiagramAudienceMatrix() {
  const rows = [
    { audience: "Undergrad Admissions", focus: "Creative potential", criteria: "Curiosity, visual sensitivity" },
    { audience: "Graduate School", focus: "Research agenda", criteria: "Process depth, methodology" },
    { audience: "Boutique Firms", focus: "Design sensibility", criteria: "Philosophy alignment" },
    { audience: "Corporate Firms", focus: "Technical proficiency", criteria: "BIM expertise, specialization" },
  ];
  return (
    <svg viewBox="0 0 420 110" style={{ width: "100%", height: "auto" }}>
      {["AUDIENCE", "PRIMARY FOCUS", "EVALUATIVE CRITERIA"].map((h, i) => (
        <text key={i} x={[70, 210, 350][i]} y="14" textAnchor="middle" fontSize="6.5" fontFamily={T.sans} fontWeight="600" fill={T.navy} letterSpacing="0.08em">{h}</text>
      ))}
      <line x1="8" y1="20" x2="412" y2="20" stroke={T.navy} strokeWidth="1" />
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="8" y={24 + i * 20} width="404" height="19" fill={i % 2 === 0 ? "#f8f8f6" : "transparent"} />
          <text x="70" y={37 + i * 20} textAnchor="middle" fontSize="7" fontFamily={T.sans} fontWeight="500" fill={T.text}>{r.audience}</text>
          <text x="210" y={37 + i * 20} textAnchor="middle" fontSize="7" fontFamily={T.sans} fill={T.textLight}>{r.focus}</text>
          <text x="350" y={37 + i * 20} textAnchor="middle" fontSize="7" fontFamily={T.sans} fill={T.textLight}>{r.criteria}</text>
        </g>
      ))}
    </svg>
  );
}

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

/* ─── Diagram map: moduleId → [{component, title}] ─── */
const DIAGRAM_MAP = {
  1: [
    { component: DiagramTwoTrack, title: "Two-Track Reading System" },
    { component: DiagramAudienceMatrix, title: "Audience Matrix" },
    { image: "diagram-audience-mapping.svg", title: "Audience Evaluation Priorities", alt: "Audience evaluation priorities across four reviewer types" },
    { image: "diagram-skill-matrix.svg", title: "Project–Skill Coverage Matrix", alt: "Project–skill coverage matrix showing how projects map to different competencies" },
  ],
  2: [
    { component: DiagramNarrativeArc, title: "Three-Act Narrative Arc" },
    { component: DiagramChronVsNarrative, title: "Chronological vs. Narrative" },
    { image: "example-narrative-sequence.jpg", title: "Narrative Sequence Example", alt: "Portfolio spread showing sequential facade analysis diagrams" },
  ],
  3: [
    { component: DiagramFourImageTypes, title: "Four Image Types" },
    { component: DiagramImageMapping, title: "Image Type Mapping Across Spreads" },
  ],
  4: [
    { component: DiagramNarrativeFailures, title: "Diagnosing Narrative Failure" },
    { component: DiagramInitialsAndFinals, title: "Initials-and-Finals Sequence" },
  ],
  5: [
    { component: DiagramCompression, title: "The Compression Exercise" },
  ],
  6: [
    { component: DiagramWeakVsStrong, title: "Weak vs. Strong Statements" },
  ],
  7: [
    { component: DiagramSequenceStructures, title: "Sequence Structures" },
    { component: DiagramTwoTrack, title: "Two-Track Reading System" },
    { image: "diagram-storyboard-patterns.svg", title: "Storyboard Sequencing Patterns", alt: "Three portfolio sequencing patterns: Strong Open, Process Arc, Scale Shift" },
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
    { image: "06-consistency-across-spreads.svg", title: "Consistency Across Spreads", alt: "Same grid applied across three different spread types" },
  ],
  9: [
    { component: Diagram12Point, title: "Document Setup — 12-Point System" },
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
  ],
  casestudy: [
    { component: DiagramImageMapping, title: "Image Type Mapping Across Spreads" },
    { component: DiagramCompression, title: "The Compression Exercise" },
  ],
};

/* ─── Module content ─── */
const MODULES = [
  {
    id: 1,
    title: "The Portfolio as Critical Argument",
    part: "Narrative",
    overview: `A portfolio is not a binder of coursework or a personal design journal. It is a curatorial act and a communication tool. Every decision you make about what to include, how to sequence it, and where to place it on the page is an act of design. The portfolio is not separate from your work. It is your work, reframed for an audience.

A portfolio operates on two tracks simultaneously. At skim speed — thirty seconds — the image hierarchy, cover, and sequencing must tell a story. At read speed — two to five minutes — the project statements, captions, and visual details must deepen that story without contradicting it.

Portfolio content should shift based on audience type. An academic reviewer prioritizes sketches, diagrams, and dead ends that reveal process depth. A professional reviewer at a large firm leads with resolved, publication-quality work and technical proficiency. A boutique firm values design sensibility and philosophical alignment. Knowing these roles is the difference between a page that documents and a page that argues.

Before you walk into a review, an interview, or a scholarship committee, your portfolio has already made its case. Reviewers often spend thirty seconds on an initial scan. In that window, the sequencing of images, the hierarchy of information, and the clarity of layout have either earned deeper attention or lost it. The best portfolios tell a story about how you design, not just what you designed.`,
    keyInsight: `"A portfolio is not an archive. It is an argument."`,
  },
  {
    id: 2,
    title: "Narrative Structure & the Three-Act Framework",
    part: "Narrative",
    overview: `Film and theatre have long understood that audiences process information through structure. The three-act framework — setup, confrontation, synthesis — is not a formula. It is a pattern of expectations that audiences already carry. Portfolios that follow this pattern feel clear. Portfolios that ignore it feel scattered, regardless of the quality of the work.

Setup: The opening spread establishes context — who you are as a designer, what territory your work occupies, and what questions drive it. This is the overture. A strong setup creates a lens through which a reviewer reads everything that follows.

Confrontation: The middle projects develop your case. Each one should introduce a new dimension of your thinking, not simply repeat the same strength. Repetition without development signals a limited range.

Synthesis: The closing projects demonstrate convergence. Technical resolution, professional awareness, and design maturity come together. A reviewer should leave the final spread with a sense of direction, not just skill.`,
    keyInsight: `"The narrative arc determines what a viewer encounters. The grid determines how each encounter is constructed on the page."`,
  },
  {
    id: 3,
    title: "A Taxonomy of Architectural Images",
    part: "Narrative",
    overview: `Every image in a portfolio performs one of four roles. Knowing these roles is the difference between a page that documents and a page that argues.

Concept: The diagram, collage, or sketch that captures the governing idea. It tells a reviewer what you were thinking before you started drawing plans. Concept images belong early in a project sequence.

Process: Iterations, massing studies, model photographs. Process images are evidence of thinking — tested, reconsidered, and refined.

Outcome: The final rendering, the technical drawing, the detail section. Outcome images prove feasibility and demonstrate professional fluency.

Context: The site photograph, the street elevation, the existing condition. Context images ground the work in real-world constraints and opportunities. Without context, even the most elegant proposal reads as autonomous fancy.

The sequence matters. Concept first. Context second. Process and Outcome weave together based on the project's narrative logic. A portfolio that leads with Outcome is a catalog. A portfolio that sequences concept → context → process → outcome is an argument.`,
    keyInsight: `"Every image should earn its place. If you cannot articulate what it communicates, remove it."`,
  },
  {
    id: 4,
    title: "The Initials-and-Finals Principle",
    part: "Narrative",
    overview: `The strongest work goes first. The most resonant work goes last. The middle builds complexity.

This violates chronological thinking, which is why so many portfolios fail. Chronological portfolios place the earliest, weakest studio exercise first and bury the thesis project at page twenty. That arrangement is a buried lede — a journalism term for burying the most newsworthy information below the fold.

The Initials-and-Finals principle reorders work to maximize impact. The opening project should be the strongest single demonstration of your design thinking. Not your most technically accomplished work, but the work that most clearly telegraphs your position. This is the initial statement.

The middle projects build case through evidence, complexity, and range. Each advances the argument without repeating it.

The closing project should be the most resonant — the piece that makes viewers feel that the entire portfolio was leading to that moment. This is the final statement. A reviewer should exit the portfolio thinking "I understand what this designer cares about," not "That was a nice project."`,
    keyInsight: `"The first impression sets the frame. The last impression sets the memory."`,
  },
  {
    id: 5,
    title: "The Red Thread: From Description to Position",
    part: "Narrative",
    overview: `The Red Thread is the single organizing idea that connects all your projects into one argument. It is not a style. It is not a medium. It is a design position — a recurring question, preoccupation, or methodology that surfaces across different projects, scales, and contexts.

The Compression Exercise uses progressive compression to move from description to position:

Step 1 — One Paragraph: Write a project statement of four to six sentences covering what you explored, what problem you responded to, what method you used, and what you discovered.

Step 2 — One Sentence: Compress that paragraph. What survives? A weak sentence describes. A strong sentence declares.

Step 3 — One Word: Threshold. Tension. Porosity. Absence. Erosion. The word is not a label — it is a lens. It describes the design position that recurs across projects.

Step 4 — The Thread Test: Repeat for every project. When the same word keeps surfacing, you have found your Red Thread.`,
    keyInsight: `"If the word is the same across three or more projects, the portfolio has a position. If it scatters, it needs one."`,
  },
  {
    id: 6,
    title: "Writing the Architectural Project Statement",
    part: "Narrative",
    overview: `The project statement is not a description of what you built. It is a declaration of what you investigated and why it matters. Weak statements describe — "This project explores light." Strong statements declare — "This project tests whether a single aperture can structure an entire domestic sequence."

Two-paragraph format: Paragraph one covers context, intent, and thesis in four to six sentences. Paragraph two covers development and outcome with evidence. Tone should be clear, active voice. Present tense for design intent, past tense for process.

The concept sentence is the compressed version: one line a reviewer reads in five seconds. This sentence should distill the position you are testing and make it specific and testable. It becomes the key insight for this project — the single claim that ties all images to one idea.

Once written, check your statement against the Red Thread. Does this project address the same fundamental question as your other work? Does it extend the argument into new territory? If a statement describes a one-off experiment with no connection to the larger portfolio position, ask whether the project belongs in the portfolio at all.`,
    keyInsight: `"Strong statements are specific. They make a testable claim. They are worth arguing about."`,
  },
  {
    id: 7,
    title: "Storyboarding & Spread Sequencing",
    part: "Grid",
    overview: `Now that narrative decisions are made — argument, structure, image taxonomy, and red thread — the work shifts from idea to page. Storyboarding translates project-level sequencing decisions into page-level compositions. Each spread must show what the previous one established and prepare for what comes next.

Each image must introduce a new dimension of the project without repeating what the opening already established. Three project-level sequence structures govern how images unfold:

Linear Narrative: Site → concept → development → resolution. The most common structure, following design process chronologically but with editorial selection.

Comparative Narrative: Before and after, existing and proposed. This structure works when the transformation is the argument.

Thematic Narrative: Organized around a design principle rather than chronology. Best for projects where the governing idea matters more than the timeline.

Storyboarding Method: Print all project images as small thumbnails (3×5 or 4×6 inch prints). Arrange them on a large table or bulletin board. Move them around physically, testing different sequence orders. This kinesthetic approach reveals rhythm and pacing before any page layout is drafted.

The Two-Track Reading System ensures the portfolio works at both speeds. Track 1 — Skim (30–90 seconds): Large images, clear hierarchy, minimal text. Track 2 — Study (5–15 minutes): Captions, process, analytical detail. Text and image should complete each other rather than duplicate. The image shows what cannot be said. The text says what cannot be shown.`,
    keyInsight: `"A sequence is not a collection. Each image should advance, not repeat."`,
  },
  {
    id: 8,
    title: "Grid Systems: From Structure to Page",
    part: "Grid",
    overview: `A building's structural grid organizes load and space. A page grid organizes information and attention. The logic is the same.

Four grid types, one decision: Manuscript Grid — single text block, simplest structure. Column Grid — two to four columns, standard for print portfolios. Modular Grid — columns plus horizontal flowlines, the most versatile for mixed content. Hierarchical Grid — intuitive arrangement customized to content, sacrifices regularity for responsiveness.

The choice is not aesthetic preference — it is a structural decision that determines how the reader navigates the page. A modular grid ensures consistency while allowing flexibility. Every page should derive from the same grid logic, creating visual coherence across the portfolio.

The grid should be invisible. If a reviewer stops to analyze the grid structure, you have failed. The grid should support the argument without announcing itself. It is the skeleton that gives the portfolio posture and clarity.

Intentional grid breaks are a legitimate design tool when they serve the narrative. A break should signal emphasis — not confusion. If you break the grid, do so for a reason that a reviewer can understand immediately. The grid is the baseline; breaks are the exception that proves the rule.`,
    keyInsight: `"A portfolio without a grid is like a building without a structural system."`,
  },
  {
    id: 9,
    title: "The 12-Point Modular System",
    part: "Grid",
    overview: `A grid is only as coherent as its underlying mathematics. Every measurement derives from a single value: 12 points. Margins, gutters, column widths, row heights, and baseline increments are all multiples of 12. Nothing on the page is arbitrary.

Document Setup: Page size 600 × 840 pt (a 5:7 proportion — proportionally similar to standard printed portfolios at larger scale, offering enough horizontal space for two-column layouts while maintaining vertical legibility). Margins at 48/60/48/36 pt (top, bottom, inside, outside). Six columns with 12 pt gutters. Eight rows with 12 pt gutters. Baseline grid at 12 pt increments.

Setup in InDesign: Create a new document at 600 × 840 pt. Set margins and create guides at 12 pt intervals. Activate the baseline grid in Type > Show Hidden Characters, then View > Grids and Guides > Show Baseline Grid. In Figma: Create a frame at 600 × 840 px. Use the grid settings to establish 12 px columns and rows, then enable the baseline grid for text alignment.

The modular grid and baseline grid operate as complementary systems. The modular grid governs placement and proportion. The baseline grid governs the internal rhythm of text. Together, they achieve precision and clarity. Six columns and eight rows produce 48 modules per page — limitless layout possibilities from a single structural foundation.

This system is not restrictive. It is generative. The more tightly constrained the grid, the more creative the solutions within it. Designers working on a 12-point system find endless variation through careful composition.`,
    keyInsight: `"Every measurement is a multiple of 12. Nothing on the page is arbitrary."`,
  },
  {
    id: 10,
    title: "Typographic Systems & Architectural Voice",
    part: "Grid",
    overview: `Typography is how your portfolio speaks when you are not in the room. Limit to two to three complementary fonts. Establish clear size relationships and use weight and style strategically.

Font Pairing Principles: Choose one serif font paired with one sans-serif font, or use two weights of the same family. This creates contrast without chaos. Avoid mixing multiple serif families or multiple sans-serif families without a clear hierarchy reason.

Modernist Workhorses: Helvetica, Futura, DIN, Univers — proven, neutral, versatile. Humanist and Contemporary: Avenir, Söhne, Gill Sans, Circular — warmer, more approachable. Editorial and Stylistic: Neue Montreal, GT Alpina, Minion Pro — personality with restraint.

Size standards for print: Titles at 24–48 pt, subheadings at 14–20 pt, body text at 9–11 pt, captions at 7–8 pt. These map to the hierarchy of information on the page, ensuring the reader encounters content in the correct order. The visual hierarchy should feel intuitive, not arbitrary.

Line spacing (leading) matters for readability. Set body text leading at 130–150% of the font size. For 10 pt body text, use 13–15 pt leading. Tighter leading (100–120%) works for captions and headlines; looser leading (150%+) works for display text. Proper line spacing creates visual breathing room and prevents the portfolio from feeling dense.

Typography reinforces the portfolio argument. Choose typefaces that align with the design position. A minimalist architect should choose typography that feels restrained. A designer interested in craft should choose typefaces with history and detail.`,
    keyInsight: `"Typography is how your portfolio speaks when you are not in the room."`,
  },
  {
    id: 11,
    title: "The Cover Page & Information Architecture",
    part: "Grid",
    overview: `The cover is the first design decision a reviewer encounters. Seven cover typologies range from Pure Minimal (whitespace as primary element, text under 8% of page area) to Abstract Line compositions with freeform curves and stroke weight hierarchy.

Each typology suits a different portfolio personality. Pure Minimal signals restraint and focus — appropriate for portfolios where the work speaks without ornament. Dark Ground provides a frame and controls the viewer's entry. Hero Image leads with a single defining moment. Bleed + Band creates motion through layering. Collage suggests complexity and multiplicity. Grid Pattern implies systems thinking. Abstract Line conveys refinement and gesture.

The choice of cover should reinforce the same design position that runs through the entire portfolio — another expression of the Red Thread. A minimalist architect's cover should feel architectural. A designer interested in systems should choose a cover that demonstrates systematic thinking.

The Table of Contents should match the cover in visual language. The TOC is not decorative — it is informational architecture. How you organize and present the contents signals to a reviewer what you value and how you think.

TOC Format Options: Thumbnail TOC uses small images of each project spread alongside project titles, showing the viewer what to expect. Text-Only TOC lists project titles and page numbers without images, maintaining a clean, legible format. Hybrid TOC combines a select set of key project images with supporting text. Choose based on portfolio scope — if the portfolio is under 30 pages, thumbnails work well. If larger, text-only TOC prevents overwhelming the viewer.

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

Industrial Neutrals: Deep grays, charcoals, blacks. The most common choice — it disappears and lets the work speak.

Tonal unity across spreads matters. When images from different projects sit side by side, their differences can distract. A consistent color treatment — whether desaturation, unified white balance, or limited tonal palette — binds disparate images into a single visual language. Studio work photographed under different lighting conditions (warm tungsten, cool fluorescent, variable daylight) creates visual discord. Desaturation as a unifying device helps. Alternatively, apply a consistent color cast that equalizes temperature variation.

Use color when it advances the argument. Suppress it when it distracts. Choose color systems that feel intentional, not accidental. Update images in post-production to ensure consistent color families across projects.

Diagnostic Test: Print your portfolio in grayscale. If the visual hierarchy — emphasis, rhythm, sequencing — still reads clearly without color, then your color is supporting rather than supplanting structure. If the portfolio falls apart in grayscale, the color is doing too much work and structure needs strengthening.`,
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

Final Production: Separate optimized PDFs — print (300 DPI, CMYK) and digital (150 DPI, RGB, under 10 MB) · All fonts embedded · Website portfolio live and updated · File naming: Lastname_Portfolio_Year.pdf (e.g., DiLeo_Portfolio_2025.pdf).

Peer Review: Before finalizing, have two to three trusted colleagues or mentors review the portfolio. Ask them to spend thirty seconds on an initial scan, then take five minutes for deeper reading. Ask: "What story do you think this designer cares about?" Their answer should match your intended position. If not, the portfolio is not yet communicating clearly. Revise and test again.`,
    keyInsight: `"Every image should earn its place. If you cannot articulate what it communicates, remove it."`,
  },
];
// Case study content
const CASE_STUDY = {
  id: "casestudy",
  title: "Case Study — Erosion",
  part: "Between Parts I & II",
  overview: `Stefan DiLeo's portfolio for Toshiko Mori's Advanced Studios at Harvard GSD demonstrates every principle in this guide applied to a single project: Apres Ski, a proposal to convert a decommissioned military bunker at Col du Pillon into an Alpine Museum in Les Diablerets, Switzerland.

The compression exercise applied to this project revealed a single word that unified all images into one argument:

Paragraph: "This project investigated how existing alpine infrastructure can be repurposed to make the effects of climate change visible and publicly accessible. Situated between Gstaad and Les Diablerets in the Swiss Alps, the design converts a decommissioned military bunker at Col du Pillon into an Alpine Museum. The building embeds into the mountainside, using ramped circulation and carved ground planes to create a continuous path between the landscape above and gallery spaces below."

Sentence: "The Alpine Museum embeds into eroding terrain to make the invisible trajectory of climate change a spatial experience visitors move through."

Word: Erosion.

Five spreads map the narrative arc across image types. Each image returns to the single word. That is the Red Thread.

Spread 1 (Setup): Terrain model — Concept image. Landscape as raw material.
Spread 2: Site map + detail — Context image. Alpine erosion at macro scale.
Spread 3 (Confrontation): Section drawing — Process image. Building carves into ground. Winter site photo (Context) + night rendering of ramped entrance (Outcome).
Spread 4: Full-width building section embedded into mountainside — Process. Erosion made accessible.
Spread 5 (Synthesis): Interior gallery rendering (Outcome) + floor plans (Process). Erosion made inhabitable.

Every image in this portfolio — terrain models, carved sections, embedded galleries — returns to this single word. That is the Red Thread. Every design decision, from the site section to the material palette to the graphic hierarchy, reinforces the same idea. That is how a portfolio argues.`,
  keyInsight: `"Every image should return to the single word. That is the Red Thread."`,
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
  "Portfolio as Narrative is a workshop resource for architecture and design students learning to construct portfolios that argue rather than archive.",
  "The guide covers thirteen modules across three parts — from finding your Red Thread and writing project statements (Narrative), to building grid systems and selecting typography (Grid), to finalizing visual systems and completing self-editing audits (Production). Each module pairs pedagogical text with reference diagrams drawn from real student portfolios and professional practice.",
  "A special case study explores Stefan DiLeo's portfolio for Toshiko Mori's Advanced Studios at Harvard GSD, demonstrating how every principle applies to a single project.",
  "The material originates from the Portfolio Workshop at Kent State University's College of Architecture and Environmental Design, taught by Seth Looper. It synthesizes principles from the Threshold Architecture Career Toolkit with methods developed through years of portfolio pedagogy, admissions consulting, and design education.",
  "Whether you are preparing for graduate school applications, professional interviews, or scholarship reviews, the framework here applies. A portfolio is not a binder. It is an argument — and this guide shows you how to build one.",
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
          {moduleLabel} — {total} diagrams
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
              {/* Title on hover */}
              <div style={{
                marginTop: 12, fontSize: 10, color: T.textLight, letterSpacing: "0.01em",
                textAlign: "center", whiteSpace: "nowrap",
                opacity: isHovered ? 1 : 0, transition: "opacity 0.2s ease",
              }}>
                {diagram.title}
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
    diagramModuleId = rawId === "casestudy" ? "casestudy" : parseInt(rawId, 10);
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
                        {String(mod.id).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: 12, color: T.text, fontWeight: 400, letterSpacing: "0.01em" }}>
                        {mod.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Case Study */}
            <div style={{ marginTop: 28, paddingTop: 28, borderTop: `1px solid ${T.border}` }}>
              <div
                onClick={() => navigate("#/casestudy")}
                style={{
                  display: "flex", alignItems: "baseline", gap: 14,
                  padding: "9px 0", cursor: "pointer", transition: "opacity 0.2s ease",
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
              <p style={{ fontSize: 10, color: T.textLight, margin: 0, lineHeight: 1.7, letterSpacing: "0.01em" }}>
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
              <p style={{ fontSize: 11, lineHeight: 1.7, color: T.text, fontStyle: "italic", margin: 0, letterSpacing: "0.01em" }}>{CASE_STUDY.keyInsight}</p>
            </div>
          )}

          {/* Diagram hyperlinks */}
          {diagrams.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <span
                onClick={() => navigate("#/diagrams/casestudy")}
                style={{
                  fontSize: 11, color: T.textMid, cursor: "pointer",
                  borderBottom: `1px solid ${T.border}`, paddingBottom: 1,
                  transition: "color 0.15s ease, border-color 0.15s ease",
                  fontFamily: T.sans, letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = T.text; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = T.textMid; e.currentTarget.style.borderColor = T.border; }}
              >
                Diagrams — {diagrams.map((d, i) => d.title).join(", ")}
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
    const backHash = isCaseStudyDiagrams ? "#/casestudy" : `#/module/${diagramModuleId}`;
    const moduleLabel = isCaseStudyDiagrams ? "Case Study" : `Module ${String(diagramModuleId).padStart(2, "0")}`;

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
          Module {String(mod.id).padStart(2, "0")}
        </div>
        <h1 style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4, color: T.text, margin: "0 0 20px", letterSpacing: "0.01em" }}>
          {mod.title}
        </h1>
        <div style={{ width: 24, height: 1, background: T.text, marginBottom: 32 }} />

        {paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: 13, lineHeight: 1.8, color: T.textMid, margin: "0 0 16px", letterSpacing: "0.01em" }}>{p}</p>
        ))}

        {mod.keyInsight && (
          <div style={{ borderLeft: `2px solid ${T.text}`, paddingLeft: 16, marginBottom: 40, marginTop: 28 }}>
            <p style={{ fontSize: 11, lineHeight: 1.7, color: T.text, fontStyle: "italic", margin: 0, letterSpacing: "0.01em" }}>{mod.keyInsight}</p>
          </div>
        )}

        {/* Diagram hyperlinks */}
        {diagrams.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <span
              onClick={() => navigate(`#/diagrams/${mod.id}`)}
              style={{
                fontSize: 11, color: T.textMid, cursor: "pointer",
                borderBottom: `1px solid ${T.border}`, paddingBottom: 1,
                transition: "color 0.15s ease, border-color 0.15s ease",
                fontFamily: T.sans, letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = T.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = T.textMid; e.currentTarget.style.borderColor = T.border; }}
            >
              Diagrams {String(mod.id).padStart(2, "0")} — {diagrams.map((d) => d.title).join(", ")}
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