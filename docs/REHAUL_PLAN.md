# Portfolio Rehaul Plan (Phase 2+)

> **For the next agent:** Read this + `docs/PORTFOLIO_RESEARCH.md` + `docs/TOOLS_LEARNING_GUIDE.md`.
> Phase 1 (structural fixes) was completed 2026-06-27. Start here for remaining work.

---

## What Phase 1 already fixed

These were done in the first cleanup pass:

- [x] **Single source of truth** — `src/data/content.js` for projects, case studies, experience, education, site meta
- [x] **Shared styles** — `src/styles/shared.js` (page layout, section labels, tags)
- [x] **Removed decorative particles** — deleted `Background.jsx`, removed from `App.jsx`
- [x] **Removed journey timeline** from Home (deleted `JourneyTimeline.jsx`)
- [x] **Removed skills laundry list** from Work page
- [x] **Home refocused** — 3 featured projects (CelestiaVR, Aura, MockPad) + recent case studies with correct links
- [x] **Project ↔ case study linking** — Work + Home link to `/writing/*` when `articlePath` exists
- [x] **Fixed broken Home article links** — removed fake “React Performance Optimization” entry; titles match Writing page
- [x] **Fixed SplitIt live URL** — was `#`, now real Vercel link
- [x] **Unified “Writing”** — nav + page title both say Writing
- [x] **Nav improvements** — CSS classes, flex-wrap for mobile, active state on article routes, CSS vars instead of hardcoded colors
- [x] **Removed dead pages/components** — DevLog, Resume, Articles, StickySectionHeader, SectionBlock
- [x] **Favicon + meta** — custom `public/favicon.svg`, improved description/title
- [x] **Contact footer** — pulls from `site` in content.js

---

## North star (unchanged)

The portfolio should be an **argument**, not a gallery:

> *I define real problems, make decisions under constraints, ship working systems, and can explain the why.*

**Spine:** 2–4 flagship systems → each with live demo + case study + (eventually) interactive explainer.

Reference: `docs/PORTFOLIO_RESEARCH.md` TL;DR.

---

## Phase 2 — Content & trust (do next)

### 2.1 Per-project GitHub URLs
**Problem:** Most projects still link to the generic GitHub profile, not repo-specific URLs.

**Task:**
- Audit `src/data/content.js` and set accurate `github` per project (MockPad, CelestiaVR, Aura, AfterImage, SplitIt, Trojanmind).
- If a project has no public repo, use `github: null` and hide the link in UI (don’t link to profile as a fake repo link).

### 2.2 Enrich case study articles
**Problem:** Articles are text-only prose. They don’t yet deliver the “decision + tradeoff + interactive” differentiator.

**Task for each existing article** (`CelestiaVRArticle`, `AuraArticle`, `AfterImageArticle`):
- Add sections: **Constraints**, **What broke**, **What I’d do differently** (see skeleton in PORTFOLIO_RESEARCH.md).
- Add at least one **code block** with syntax highlighting (pick a lightweight highlighter: `shiki`, `prism-react-renderer`, or similar).
- Add one **static diagram** or screenshot per article (images in `public/writing/<slug>/`).

**Files:** `src/pages/articles/*.jsx`, `src/components/ArticleLayout.jsx`

### 2.3 MockPad case study
**Problem:** MockPad is featured but has no `articlePath`.

**Task:** Write `/writing/mockpad` case study OR remove from `featured: true` until article exists. Don’t leave featured projects without depth.

### 2.4 Human writing tab
**Problem:** Two “coming soon” posts with no dates erode trust.

**Task:** Either publish one Human post, remove placeholders, or replace with a single “More on Medium →” block until ready.

---

## Phase 3 — Visual identity & media

### 3.1 Project media on Home / Work
**Problem:** Strong YouTube demos exist but the site is text-only.

**Task:**
- Add optional `thumbnail` or `demoVideo` field to projects in `content.js`.
- Show embedded YouTube thumbnail or lazy iframe on featured cards (CelestiaVR, Aura minimum).
- Keep embeds lightweight — thumbnail + click-to-play, not autoplay.

### 3.2 Distinct visual identity
**Problem:** Zinc + Inter + sky accent is correct but interchangeable.

**Task (pick one direction, don’t do all):**
- Subtle **spatial motif** (star chart line art, horizon grid) as section divider — not particles.
- Or **engineering log** aesthetic for articles (mono timestamps, decision callout blocks).
- Define 2–3 reusable components: `<DecisionBlock rejected chosen tradeoff />`, `<Metric value label />`.

**Files:** new `src/components/article/*`, extend `ArticleLayout.jsx`

### 3.3 Community page IA
**Problem:** Community is equal nav weight to Work/Writing; photo-heavy, low SDE signal on main path.

**Task (optional):**
- Move Community to footer link or “About” subsection, OR
- Keep nav but add one line of engineering relevance per event (what you built/organized technically).

---

## Phase 4 — Interactive articles (the big bet)

### 4.1 Article widget infrastructure
**Goal:** Gemini-style embedded tools in case studies.

**Task:**
1. Create `src/components/viz/VizFrame.jsx` — registry mapping string IDs → React components.
2. Create `src/components/viz/` folder with first widget (start simple: e.g. quaternion vs euler toggle for CelestiaVR article).
3. Extend `ArticleLayout` or article MDX pipeline to render `<Viz id="..." />`.

**Stack (from TOOLS_LEARNING_GUIDE):** D3 for 2D, R3F only if 3D needed. React owns state; canvas owns render loop.

**Reference project:** open-calc VizFrame pattern (see TOOLS_LEARNING_GUIDE).

### 4.2 One interactive per flagship case study
Priority order:
1. CelestiaVR — coordinate transform or sidereal rotation demo
2. Aura — on-device vs cloud latency comparison widget
3. AfterImage — replay buffer / memory tradeoff visualizer

---

## Phase 5 — Engineering cleanup

### 5.1 Remove unused dependencies
After Phase 1, these may be unused — verify with `npm run build` + grep:
- `react-tsparticles`, `tsparticles`
- `react-vertical-timeline-component`

Remove from `package.json` if confirmed unused.

### 5.2 Tailwind vs inline styles
**Problem:** Tailwind is imported in `index.css` but almost all styling is inline JS objects.

**Task (pick one):**
- **A)** Migrate shared patterns to Tailwind utility classes (nav, tags, cards), OR
- **B)** Remove Tailwind dependency and stay CSS-vars + inline/CSS modules.

Don’t leave both half-used.

### 5.3 ArticleLayout enhancements
- Related project link at bottom (read `projectSlug` from content.js via article metadata).
- Table of contents for long articles.
- Open Graph tags per article (`react-helmet-async` or vite SSR meta).

---

## Phase 6 — SEO & discoverability

- Per-route `<title>` and `og:*` meta (Home, Work, each case study).
- `sitemap.xml` + `robots.txt` in `public/`.
- Structured data (`Person`, `Article`) JSON-LD on case studies.

---

## File map (post Phase 1)

```
src/
  data/content.js          ← EDIT projects/articles here only
  styles/shared.js         ← shared layout tokens
  pages/
    Home.jsx               ← featured projects + recent case studies
    Work.jsx               ← all projects + experience + education
    Writing.jsx            ← case study index + tabs
    Community.jsx          ← unchanged (Phase 3 optional)
    articles/*.jsx         ← case study content (Phase 2 enrich)
  components/
    ArticleLayout.jsx      ← article shell (Phase 4 extend)
    ContactMeComponent.jsx
    viz/                   ← CREATE in Phase 4
docs/
  PORTFOLIO_RESEARCH.md    ← strategy / hiring research
  TOOLS_LEARNING_GUIDE.md  ← interactive + video tooling primer
  REHAUL_PLAN.md           ← this file
```

---

## Suggested agent prompt to start Phase 2

```
Read docs/REHAUL_PLAN.md, docs/PORTFOLIO_RESEARCH.md, and src/data/content.js.

Execute Phase 2.1 and 2.2:
- Fix per-project GitHub URLs in content.js (hide link when null).
- Enrich CelestiaVRArticle with Constraints / What broke / What I'd do differently sections,
  one code block with syntax highlighting, and placeholder for a diagram image.

Do not start Phase 4 interactives yet unless Phase 2.2 is done.
Run npm run build and npm run lint when finished.
```

---

## Out of scope (for now)

- Full visual redesign / new color system
- MDX migration (unless articles grow large)
- YouTube channel integration
- Removing Community page entirely
- Writing new projects from scratch

---

## Success criteria (when rehaul is “done enough”)

1. A recruiter can land on Home, understand the thesis in 6 seconds, click one featured project → case study → demo in under 3 clicks.
2. Every featured project has a published case study OR is removed from featured.
3. At least one case study has an interactive widget.
4. No broken links, no duplicate data across files, no decorative-only GPU work.
5. Site loads fast on mobile (no particle lib, lazy media).
