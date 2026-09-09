# Context Capsule: rdx-dev-creator-lab
_Last Updated: 2026-07-17. Project ID: `rdx-dev-creator-lab`._
_Link to Full Audit Report:_ [rdx_dev_creator_lab_report.md](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/project-sources/projects/rdx-dev-creator-lab/rdx_dev_creator_lab_report.md)

---

## 1. What it is & why it exists
An open-source developer-creator lab combining Python (Manim CE), React (Remotion), Godot Engine, Motion Canvas, and React Three Fiber to build programmatic animations and interactive system design visualizers, transforming dry technical explainers into immersive, motion-driven resources.

---

## 2. Directory Map

| Path | What Lives There | Why It Matters |
|---|---|---|
| [`learning/manim-basics/`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/learning/manim-basics) | Python Manim script exercises | Base for rendering clean programmatic vector math and DSA visualizers. |
| [`learning/remotion-basics/`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/learning/remotion-basics) | Remotion React video playground | Environment to programmatically compile HTML/CSS/SVG video layouts with spring physics. |
| [`learning/godot-basics/`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/learning/godot-basics) | Godot Engine & GDScript scripts | Lightweight sandbox to export interactive, real-time game-loop system simulations to HTML5. |
| [`learning/motion-canvas-basics/`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/learning/motion-canvas-basics) | Generator-based JS visualizers | Frame-accurate, timeline-scrubbed explainers (BST traversal, Saga workflow) synced with voiceover cues. |
| [`learning/web-interactive-basics/`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/learning/web-interactive-basics) | React Three Fiber components | WebGL-based 3D browser graphics (database rings, grid networks) running at 60fps. |
| [`learning/web-reactflow-basics/`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/learning/web-reactflow-basics) | React Flow diagram layouts | Node-and-edge graphs displaying live interactive server architectures. |
| [`projects/astro-gsap-garage/`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/projects/astro-gsap-garage) | Astro × GSAP × Three.js showcase | Production-grade scroll-driven landings (F1 car aerorender, Mixamo-rigged Suit assembly stage). |
| [`projects/aura/design-video/tools/`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/projects/aura/design-video/tools) | Python script VO tools | Command-line scripts that automate audio parsing (Whisper) and frame alignment (FFmpeg). |

---

## 3. Entry Points
- Godot Main Menu: [`learning/godot-basics/scenes/main_menu.tscn`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/learning/godot-basics/scenes/main_menu.tscn)
- Remotion Root: [`learning/remotion-basics/hello-world-project/src/Root.tsx`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/learning/remotion-basics/hello-world-project/src/Root.tsx)
- Motion Canvas Project: [`learning/motion-canvas-basics/src/project.ts`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/learning/motion-canvas-basics/src/project.ts)
- Astro Showcase Entry: [`projects/astro-gsap-garage/src/pages/index.astro`](file:///Users/rajatsavdekar/Documents/GitHub/rdx-dev-creator-lab/projects/astro-gsap-garage/src/pages/index.astro)

---

## 4. Key Architectural Decisions

1. **Multi-Engine Visual Playground Architecture:** Decoupled the visualizers into specialized engines (Godot, Remotion, Manim, Motion Canvas) rather than writing a single monolithic raw WebGL canvas. This maintains high-performance game loops for real-time web simulators while using standard video rendering toolchains for offline assets.
2. **ES6 Generator Yields in Motion Canvas:** Used generator functions (`yield*`) to drive animations (like BST search steps). This guarantees frame-accurate transitions that lock perfectly with voiceover markers without drift.
3. **useFrame Lerp Interpolation in R3F:** Bypassed React state reconciliation by directly modifying WebGL mesh coordinates via Three.js references in the `useFrame` loop, keeping interactive animations rendering at a locked 60fps.

---

## 5. Author Scope (Honesty Boundary)
*   **Built by Author:** Custom GDScript packet flows, React springs (`DatabaseCluster`), Motion Canvas BST generator logic, Three.js mesh hover-bounds, Astro/GSAP hybrid scroll stages, and Python Whisper-to-FFmpeg automation scripts.
*   **Handled by Libraries:** Three.js/WebGL canvas rendering, Godot engine loops, Manim CE vector compilations, Mixamo bone physics, and Whisper speech-to-text transcriptions.

---

## 6. Tech Stack
*   `Python` (Manim CE vector rendering, FFmpeg pipelines)
*   `GDScript` (Godot Engine real-time interactive WASM builds)
*   `TypeScript` & `React` (Remotion video, React Three Fiber, React Flow, Motion Canvas)
*   `Astro` & `GSAP` (ScrollTrigger, Flip, MorphSVG)

---

## 7. Hard Parts
*   **Voiceover-to-Frame Sync:** Automating audio timing alignment by parsing Whisper transcript SRT timestamps and orchestrating complex FFmpeg slices/holds.
*   **Browser-Based Mixamo Rigging:** Retargeting standard Mixamo bones to run dynamic mesh animations in standard vanilla WebGL environments.
*   **State Decoupling in R3F:** Mitigating DOM bottleneck performance drops during WebGL interactions by updating mesh geometries directly on the ref buffer.

---

## 8. Metrics Table

| Metric | Value | Status | Source | Confidence |
|---|---|---|---|---|
| Total Custom LOC | ~46,870 | `MEASURED` | `wc -l` on python, gd, ts, tsx, js, astro files | High |
| Custom Source Files | 406 | `MEASURED` | `find` file count | High |
| Integrated Engines | 6 | `MEASURED` | Manim, Remotion, Godot, Motion Canvas, R3F, React Flow | High |
| Interactive Demos | 35+ | `MEASURED` | File count across learning sub-folders | High |
| Video Sync Time-Gains | ~70% savings | `NEEDS-INPUT` | Benchmark requested from author | Medium |

---

## 9. Top Candidate Bullets
*   Designed and built **rdx-dev-creator-lab**, an open-source visual lab combining Python (Manim), React (Remotion), and Godot to programmatically render algorithm visualizers and system architectures.
*   Developed a custom **Whisper & FFmpeg VO toolchain** in Python, parsing speech-to-text timings to automatically align and trim video frames, eliminating manual audio-video stitching.
*   Built an interactive **3D/2D hybrid product showcase** using Astro and GSAP ScrollTrigger, utilizing three.js custom shaders, Mixamo bone retargeting, and procedural aerodynamic ribbon particles.

---

## 10. Needs Human Input & Re-Crawl Triggers
*   **Questions:** Confirm exact video sync toolchain time-savings metric, and whether any Godot simulations have active users or public hosts.
*   **Never-Claim:** Never claim you authored the underlying rendering frameworks (Godot game engine, Manim CE vector math compiler, Whisper ML models).
*   **Re-Crawl Triggers:** After implementing a new animation playground system or releasing a major version update to the F1/IronMan showcases.
