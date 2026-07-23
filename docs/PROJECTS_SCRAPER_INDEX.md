# Project Scraper → Portfolio Index

> Maps `zprojects scraper and report/` capsules to live portfolio routes.
> Updated: 2026-07-22. Source of truth for links: `src/data/content.js`.

## Live mapping

| Project | Scraper folder | Case study route | GitHub | YouTube | Other links |
|---------|----------------|------------------|--------|---------|-------------|
| **CelestiaVR** | `celestia/` | `/writing/celestia-vr` | [CelestiaVR](https://github.com/RDX-Rajat-Savdekar/CelestiaVR) | [Demo](https://www.youtube.com/watch?v=QzRTp0EtUsQ) | [Presentation](https://rdx-rajat-savdekar.github.io/Celestia_Presentation/) |
| **Aura** | `aura-visionos/` | `/writing/aura` | [Aura-Vision-Pro](https://github.com/RDX-Rajat-Savdekar/Aura-Vision-Pro) | [Demo](https://www.youtube.com/watch?v=HbW9F2zjmLQ&t=65s) | — |
| **MockPad** | `mock-pad/` | `/writing/mockpad` | [mockpad](https://github.com/RDX-Rajat-Savdekar/mockpad) | — | [Live](https://mockpad-kappa.vercel.app/) |
| **AfterImage** | `main-gamesmiths/` | `/writing/after-image` | [main-gamesmiths](https://github.com/CSCI-526/main-gamesmiths) | — | [Play (WebGL)](https://csci-526.github.io/main-gamesmiths/gold/) |
| **SplitIt** | `splitit/` | `/writing/splitit` | [frontend](https://github.com/RDX-Rajat-Savdekar/splitit-frontend-vite) · [backend](https://github.com/RDX-Rajat-Savdekar/splitit-backend) | — | [Live](https://splitit-frontend-vite.vercel.app/login) |
| **Creator Lab** | `rdx-dev-creator-lab/` | `/writing/creator-lab` | [rdx-dev-creator-lab](https://github.com/RDX-Rajat-Savdekar/rdx-dev-creator-lab) | — | — |
| **Research Papers** | — | `/writing/research-papers` | [Research-Papers](https://github.com/RDX-Rajat-Savdekar/Research-Papers) | — | [Google Scholar](https://scholar.google.com/citations?user=ynyXTd8AAAAJ&hl=en) · 4 papers |
| **Trojanmind** | — | `/writing/trojanmind` | — | [Demo](https://www.youtube.com/watch?v=QOkA36npHNo) | stub case study |

## Scraper files (reference)

```
zprojects scraper and report/
├── celestia/celestiavr.md + celestia_report.md
├── aura-visionos/aura-visionos.md + aura-report.md
├── mock-pad/mockpad.md + mockpad_report.md
├── splitit/splitit.md + splitit-report.md
├── main-gamesmiths/main-gamesmiths.md + main-gamesmiths-report.md
└── rdx-dev-creator-lab/rdx_dev_creator_lab.md + rdx_dev_creator_lab_report.md
```

## Next agent tasks

1. **Enrich articles** — pull full decision tables + metrics from capsules into each case study (Phase 2 in `REHAUL_PLAN.md`).
2. **AfterImage** — add public GitHub if `main-gamesmiths` is published, or itch.io WebGL link.
3. **Trojanmind** — expand stub once repo/capsule exists.
4. **Embedded demos** — YouTube thumbnails or iframes on featured project cards (Phase 3).

## Edit links in one place

All project URLs live in **`src/data/content.js`** (`github`, `githubSecondary`, `youtube`, `live`, `presentation`, `paper`). Articles use `projectSlug` on `ArticleLayout` to render link chips automatically.
