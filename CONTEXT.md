# Portfolio Workshop — Session Context

> **Last updated:** 2026-04-04
> **Repo:** https://github.com/looperworks/portfolio-workshop
> **Local path:** /Users/lobestory/Projects/portfolio-guide/
> **Live site:** https://thresholdarch.com/portfolio-workshop
> **Deploy:** GitHub Actions → GitHub Pages (auto-deploy on push to main)

---

## What This Is

A React (Vite) single-page app for an architecture portfolio course at Kent State University. All content lives in one file: `src/App.jsx` (~2041 lines). No backend, no CMS — modules, diagrams, case studies, and components are all inline.

---

## Architecture

### PARTS → Module Ordering

```jsx
const PARTS = {
  part1: { title: "Narrative", modules: [1, 2, 3, 4, 5, 7] },
  part2: { title: "Grid", modules: [8, 9, 16, 14, 15] },
  part3: { title: "Production", modules: [11, 10, 12, 13] },
};
```

`MODULE_POSITION` is computed dynamically from PARTS order, so display numbers (01–15) differ from internal IDs.

### Module ID → Display Position → Title

| ID | Display | Title |
|----|---------|-------|
| 1 | 01 | Portfolio as Argument |
| 2 | 02 | Position and Statement |
| 3 | 03 | Statement to Outline |
| 4 | 04 | The Narrative Arc |
| 5 | 05 | Image Types as Evidence |
| 7 | 06 | Storyboarding the Spreads |
| 8 | 07 | Grid Systems |
| 9 | 08 | Building the Grid: Concepts |
| 16 | 09 | Building the Grid: Setup |
| 14 | 10 | Spread Composition |
| 15 | 11 | Variation and Pacing |
| 11 | 12 | Cover and Table of Contents |
| 10 | 13 | Typographic Systems |
| 12 | 14 | Color and Tonal Unity |
| 13 | 15 | The Self-Editing Audit |

### Case Studies

Case studies use string IDs (`"casestudy"`, `"casestudy2"`) — NOT in the PARTS array. They appear as italic nav items after their respective parts.

- **Case Study 1: Erosion** — after Part I. Harvard GSD Alpine Museum portfolio (5 spreads).
- **Case Study 2: Grid Systems in Practice** — after Part II. Two-project portfolio: Generative Housing + Flexible Framework (12 spreads).

Routes: `#/casestudy`, `#/casestudy2`

### Key Data Structures

- **`MODULES[]`** — Array of `{ id, title, part, overview (prose), keyInsight }`.
- **`CASE_STUDY`** / **`CASE_STUDY_2`** — Same shape but with string IDs.
- **`DIAGRAM_MAP{}`** — Keyed by module ID (number or string). Each entry is an array of `{ image?, component?, title, alt?, caption? }`.
- **`DiagramSlideshow`** component handles both `{ image: "path" }` and `{ component: FunctionRef }` formats.
- **`InteractiveChecklist`** — Renders 5-category, 32-item checkbox widget on Module 13's page.

### Design Tokens

```jsx
const T = {
  navy: "#222", sans: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  border: "#e8e8e8", accent: "#222", coral: "#888", gold: "#888",
  steel: "#5a7a8a", // ... etc
};
```

Monochrome palette — navy/gray/white. No color decoration.

---

## Image Assets

- **`public/images/class-pdf/`** — 34 files. Case Study 1 spreads (5 JPGs), Case Study 2 spreads (12 JPGs), class slides (PNGs).
- **`public/images/*.svg`** — 23 SVGs. Grid diagrams, setup steps, glossary, workspace, shortcuts.
- **`public/images/*.png`** — 8 PNGs. Facade grid, column grid, portfolio example.
- **Cover/TOC type images** — `type01-pure-minimal.jpeg` through `type07-abstract-line.jpeg`, `toc01-*.png` through `toc06-*.png`.

### Known Issue: Black Spine Lines

All 12 Case Study 2 spread JPGs have a ~3-5px black line on the left edge from PDF export. Not CSS — baked into the images. Two fix options discussed but not yet executed:
1. Re-export from InDesign without facing pages
2. Programmatic crop (ImageMagick or Python PIL)

---

## Inline SVG Diagram Components

These are React components defined in App.jsx that render as SVGs:

- `DiagramNarrativeArc` — Three-act arc for Module 1
- `DiagramChronVsNarrative` — Chronological vs narrative comparison
- `DiagramCompression` — The compression exercise (Module 2)
- `DiagramCompressionWorked` — Worked example: Alpine Museum → Erosion
- `DiagramWeakVsStrong` — Weak vs strong statement comparison
- `DiagramTypography` — Typography categories (Module 10)
- `DiagramSizeHierarchy` — Type size hierarchy
- `DiagramColorPalettes` — Three palette families (Module 12)
- `DiagramCoverTypes` — Seven cover typologies (Module 11)
- `DiagramChecklist` — Four-level audit framework (Module 13)
- `DiagramExportStandards` — File export standards (Module 13)
- `Diagram12Point` — Document setup: 12-point system (Module 16)
- `DiagramLayerArchitecture` — InDesign layer architecture (Module 16)
- `DiagramParentPages` — Parent page architecture (Module 16)

---

## Completed Work (Chronological)

### Session 1 (Early)
- Split "Building the Grid" into two modules: Concepts (ID 9) + Setup (ID 16)
- Created SVG diagrams for grid modules (01–20 series)
- Replaced student name with "Case Study 2" across Part 2

### Session 2
- Added all 12 Case Study 2 spread images to Module 8
- Created Case Study 2 page with full grid-systems analysis prose
- Renamed case studies: "Case Study 1: Erosion" / "Case Study 2: Grid Systems in Practice"
- Updated Module 14 (Spread Composition): 4 diagrams mapped 1:1 to four composition decisions
- Rewrote Module 15 (Variation and Pacing): fixed AI language, matched diagrams to prose
- Full audit of Part 3 modules (11, 10, 12, 13): captions, prose quality, diagram alignment
- Updated Module 13 checklist to match Class 9 Self-Assessment PDF (5 categories, 32 items)
- Renamed Module 11: "Cover and Information Architecture" → "Cover and Table of Contents"
- Reordered Part 3: `[11, 10, 12, 13]` (Cover/TOC before Typography)

### Session 3 (Current)
- AI language sweep across Part 1 (Modules 1–5, 7): writing is clean; only fix was Module 3's "generative engine" → "blueprint for the images the portfolio must include"

---

## Writing Standards

- **Voice:** Direct instructor addressing second-year architecture students. "You" is implicit.
- **AI language to avoid:** "generative engine," "transformative," "delve," "crucial," "tapestry," "multifaceted," "nuanced," "seamlessly," "it's important to note," "moreover/furthermore."
- **Preferred patterns:** Active voice. Concrete references to specific spreads/images. Short declarative sentences. Bold section headers within prose for scannability.
- **Each module's prose should:** Reference case study spreads by number. Tie diagrams to specific claims. End with actionable instruction.
- **Key insight:** One sentence. Tight. Memorable. Not a summary — a provocation.

---

## Pending / Future Work

1. **Black spine line fix** on 12 Case Study 2 spread images (decision needed: re-export vs programmatic crop)
2. **Any new modules or content** the course needs
3. **Accessibility audit** of the React app (alt text is in place for all diagrams)
4. **Mobile responsiveness** refinements if needed

---

## Git Workflow

All edits happen on the local repo at `/Users/lobestory/Projects/portfolio-guide/`. Use Desktop Commander (MCP) for file reads/edits. Push to `main` triggers GitHub Actions deploy to GitHub Pages.

**Important:** The Cowork sandbox filesystem (`/sessions/...`) is separate from the local repo. Always read/edit via Desktop Commander on the actual path, never rely on sandbox copies.

Latest commit: `1419c1f` (Part 1 AI language sweep)
