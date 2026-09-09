# Crawl Report: CelestiaVR (VR_Celestia)
_Crawled: 2026-06-25 (updated 2026-06-25 with author answers + companion presentation repo). Author filter: `156324870+RDX-Rajat-Savdekar@users.noreply.github.com` (Rajat Savdekar). Team project — others' work present and separated in §2._
_Skipped / not crawled: `Library/`, `Logs/`, `Celetia_v1.apk` (204 MB build artifact), `Celetia_v1_BackUpThisFolder_*`, `VR_Celestia_BurstDebugInformation_*`, `Assets/Space Graphics Toolkit v4.1/` (vendor asset pack), `Assets/Plugins/CW/` (vendor — SGT), `Assets/VRTemplateAssets/`, `Assets/TextMesh Pro/`, `Assets/Vefects/` (VFX pack), `Assets/Samples/`, `Assets/XRI/`, all `*.unity` scene binaries, all `*.png/*.fbx/*.glb/*.mat/*.prefab` binaries, all `.meta` files, the 7 generated `*.csproj` files. Read in full: `Assets/CelestiaVR/Scripts/**` (custom code), `Assets/CelestiaVR/Shaders/StarBillboard.shader`, `Packages/manifest.json`, `contribution_statement_rajat.tex`, `Week12_Report.txt`, git history._
_Companion repos crawled (separate, both solo-authored by Rajat): (a) `~/Documents/GitHub/Celestia_Project_presentation/Celestia_Renders/` — render outputs + HTML video slide deck (`index.html`, 18 `.mp4` clips not opened). (b) `~/Documents/GitHub/Manim-DSA-SD-Concepts/` — the **source dev environment** for the Celestia presentation scenes (`scene0–5.py`), a proper `uv`/`pyproject.toml` Python project. NOTE: this dev repo ALSO contains a **separate** reusable Manim DSA toolkit (`manim_utils.py`, `scenes.py`) for a data-structures YouTube series — that toolkit is NOT part of CelestiaVR and should get its own fact record (see §2, §5a)._
_Author-verified updates applied: (1) **code is authoritative** over `contribution_statement_rajat.tex` where they disagree; (2) frame rate **72–90 Hz** measured on-device by author; (3) **~10 real users** at a hackathon showcase._

---

## 0. TL;DR
- **Identity:** A Meta Quest 3 VR stargazing app (CelestiaVR / "Project Celestia") that places the user on a night-time tropical island and renders a real, time-accurate sky — ~9k stars, planets, 88 constellations, deep-sky objects, Milky Way — with gaze/controller interaction. USC AR/VR course project, Spring 2026, ~5-person team. [Week12_Report.txt:18-23, contribution_statement_rajat.tex:22-23]
- Strongest themes (Rajat's owned work):
  1. **Real-time astronomical rendering pipeline** — HYG catalog → coordinate transform → GPU-instanced star field (single draw call per 1023-star batch); optimized to a measured 72–90 Hz on Quest 3. [StarCatalogParser.cs, CelestialCoordinates.cs, StarRenderer.cs, StarBillboard.shader; author on-device test]
  2. **Sidereal-correct sky simulation** — RA/Dec→Cartesian, local sidereal time, polar-axis rotation fix, Meeus solar position for day/night. [CelestialCoordinates.cs, SkyManager.cs:116-136]
  3. **Constellation overlay system** — affine pixel→sky transform anchoring 85 Stellarium art quads + 88 IAU stick-figure line renderers to HIP reference stars. [StellariumLoader.cs:254-296]
  4. **Gaze-dwell interaction + hologram inspection** — 3-second dwell selection driving a planet "pull-out" hologram and info panel. [DwellSelector.cs:28, InspectionController.cs]
  5. **Scene bootstrap / integration layer** — runtime auto-wiring, legacy-component disabling, locomotion/comfort config. [StargazingSceneBootstrap.cs]
  6. **Solo Manim + HTML presentation engine (companion repo)** — 6 animated scenes / 18 clips explaining the technical decisions, served via a hand-built vanilla-JS video deck. [Manim-code/scene0–5.py, index.html] (showcased to ~10 users at a hackathon)

---

## 1. What it is & why it exists
- **Identity (1 sentence):** CelestiaVR is a Unity 6 / OpenXR VR stargazing experience for Meta Quest 3 inspired by Star Walk 2. [Week12_Report.txt:18-23] (MEASURED — stated in report)
- **Problem / why built:** Course deliverable for a USC AR/VR class (Spring 2026); goal is an immersive, educational sky-exploration loop where a first-time VR user can select and inspect celestial objects without a tutorial. [Week12_Report.txt:88-93, contribution_statement_rajat.tex:23] (MEASURED — stated; real-world adoption/grade is NEEDS-INPUT)
- The team briefly considered pivoting to a "Rage Room" concept mid-course but kept CelestiaVR. [Week12_Report.txt:27-32] (MEASURED — documented decision)

## 2. Author scope
Detected via `git log` per file (dominant committer) + `contribution_statement_rajat.tex`.

**AUTHOR (Rajat) built / owns** (MEASURED via git authorship):
- Entire **sky engine**: `Core/` (SkyManager, SkySphere, CelestialCoordinates, CelestialBody), `Stars/` (StarCatalogParser, StarRenderer, NamedStarSpawner, DeepSkyObjectSpawner, StarData), `Constellations/` (StellariumLoader, ConstellationHIPData, StellariumArtData, legacy renderers), `Planets/` (PlanetController, PlanetEphemerisParser), `Shaders/StarBillboard.shader`. [git log: Rajat is sole/dominant author of all these]
- Most **interaction/inspection**: DwellSelector, InspectionController, SelectionManager, BillboardStarDwellDetector, HighlightEffect, ViewingModeManager, RealScaleComparison. [git log]
- **Integration**: StargazingSceneBootstrap (5 commits), Environment (SunController, DayNightController, IslandLightingFixer), several UI panels (InspectionPanel, SkyLabelManager, LabelManager, DirectionalArrow, ObjectLabel, TimeScrollController). [git log]
- Presentation media (Manim slides, demo video) — not in Unity build. [contribution_statement_rajat.tex:28,48] (INFERRED — `manim_presentation.txt` exists at root; not crawled in depth)

**TEAMMATES built (do NOT credit Rajat)** (MEASURED via git authorship):
- **Gurpreet Sanjay Kukkar** <kukkar@usc.edu>: Audio system (SoundManager, SoundEvent), search system (CelestialSearchPanel, SearchPanelTrigger, SearchItemCollider, SearchPanelDwellDetector), ControlPanel, StargazingInputManager.
- **Fardeen Khan / Fardeen16** <fardeenm@usc.edu>: Island boundaries (DoorPortal, IslandBoundaryWalls), FireCampGlowDimmer, OnboardingManager, fog/visibility, mountain constraints.
- **Namratha Venkanagouda Patil** <nvpatil@usc.edu>: Fireplace mini-game (FireplaceBootstrap, FireplaceSite, StickCollectible).
- Note: Rajat's *recent* commits (Jun 2026) also touched fireplace/island gameplay (tutorial, log physics, stone constraints, gaze-snap) — integration on top of teammates' systems. [git log 2127724, d62e4dc, 3f20887]

**LIBRARIES did (not author work):** XR rig/hand-tracking/interactors (Unity XR Interaction Toolkit 3.3.1), rendering (URP 17.3.0), glTF import (com.unity.cloud.gltfast 6.18.0), Space Graphics Toolkit v4.1 (vendor sky/terrain assets). HYG catalog data, Stellarium art (CC BY-SA 4.0), StarNet v2 (offline pre-processing). [Packages/manifest.json, contribution_statement_rajat.tex:60-70]

**Solo or team?** Team of 5 (git shortlog). Rajat = 14–16 commits of 43 total. [git shortlog -sne]

**Companion presentation repo = 100% Rajat (solo).** `Celestia_Project_presentation/Celestia_Renders` is a separate git repo with both commits authored by Rajat. [git shortlog -sne: only `Rajat Savdekar`]. Contains: 6 Manim scene scripts (`Manim-code/scene0–5.py`, ~64 KB Python total), an `adjacency_list.json` + `sirius_data.json`, 18 rendered `.mp4` clips, and a hand-written vanilla-JS/HTML video slide-deck player (`index.html`, keyboard nav + autoplay + progress bar). [index.html:80-212] Author confirms this was done entirely solo as a self-directed Manim learning project for the final presentation. (MEASURED authorship + author statement)

## 3. Tech stack (exact strings)
- **Engine:** Unity 6 (6000.x; `.tex` says `6000.3.11f1`). [contribution_statement_rajat.tex:68] (note: verify exact patch in `ProjectSettings/ProjectVersion.txt` — not crawled)
- **Language:** C# (53 custom scripts, ~11,391 LOC under `Assets/CelestiaVR/Scripts/`). [wc -l] + HLSL shader.
- **Render pipeline:** Universal Render Pipeline (URP) `com.unity.render-pipelines.universal: 17.3.0`. [Packages/manifest.json:9]
- **XR:** `com.unity.xr.interaction.toolkit: 3.3.1`, `com.unity.xr.openxr: 1.16.1`, `com.unity.xr.androidxr-openxr: 1.1.0`, `com.unity.xr.hands: 1.7.3`, `com.unity.xr.arfoundation: 6.3.3`. [Packages/manifest.json:11-17]
- **Input:** `com.unity.inputsystem: 1.19.0`. [Packages/manifest.json:6]
- **Asset import:** `com.unity.cloud.gltfast: 6.18.0` (island GLB). [Packages/manifest.json:3]
- **Target hardware:** Meta Quest 3 (Android XR / OpenXR). [Week12_Report.txt:19] Build artifact: `Celetia_v1.apk` (204 MB).
- **Data:** HYG Stellar Database v4.2 CSV (119,627 rows). [Assets/Data/hyg_v42.csv]
- **Offline tooling (not in build):** StarNet v2 (star removal), Python Manim CE. [contribution_statement_rajat.tex:64,66]

## 4. Architecture & decisions (interview gold)

**D1 — GPU instancing for the star field**
- Decision: render the bright-star catalog via `Graphics.DrawMeshInstanced` in batches of 1023 with a custom additive billboard shader. [StarRenderer.cs:57,238-248; StarBillboard.shader:24]
- Why: a per-star `GameObject` prototype hit ~9k draw calls and dropped below the 72 Hz Quest target. [contribution_statement_rajat.tex:38,53] (perf number is author-claimed — see §7)
- Rejected alternative: one GameObject per star (kept only for named stars < mag 3.0, which need `SphereCollider`s for gaze). [StarRenderer.cs:44-48,177-184]

**D2 — Polar-axis sidereal rotation (bug fix)**
- Decision: rotate the sky around the true celestial pole axis derived from observer latitude, not world-Y/zenith. [SkyManager.cs:116-136]
- Why: zenith rotation is only correct at the North Pole; produced a "carousel" instead of east→west star arcs. [SkyManager.cs:125-127, contribution_statement_rajat.tex:46]
- Rejected alternative: original world-Y rotation. [contribution_statement_rajat.tex:56]

**D3 — Affine pixel→sky transform for constellation art**
- Decision: solve a 2D affine map from 3 HIP anchor stars' pixel coords → unit-sphere directions to place/scale/roll each art quad. [StellariumLoader.cs:254-296]
- Why: art must stay aligned to actual stars under any sky rotation. [StellariumLoader.cs:14-20]
- Rejected alternative: legacy `ConstellationArtRenderer` / `ConstellationHIPRenderer`, force-disabled at runtime to avoid duplicate layers. [StellariumLoader.cs:63-71]

**D4 — Magnitude-limited catalog ingestion**
- Decision: filter HYG to apparent magnitude ≤ 6.5 (naked-eye limit), async coroutine + `OnCatalogLoaded` event to sequence renderers. [StarCatalogParser.cs:24,29,87-91]
- Why: 119k → ~9k stars keeps the draw set tractable and physically meaningful. [StarCatalogParser.cs]
- Rejected alternative: loading the full catalog (none documented beyond the magnitude gate).

**D5 — Decoupled day/night fade**
- Decision: `StarRenderer.GlobalBrightnessFade` public hook set by `DayNightController` instead of reaching into renderer internals. [StarRenderer.cs:54, contribution_statement_rajat.tex:76]
- Rejected alternative: direct internal access — avoided. [contribution_statement_rajat.tex:76]

## 5. Hard parts / notable engineering
- **Single-call instanced rendering with per-star color/brightness/twinkle** via `MaterialPropertyBlock` arrays, re-batched only when sky rotation changes. [StarRenderer.cs:145-249] (MEASURED — code present)
- **Astronomy math from scratch:** Julian Date, GMST/LST, Meeus low-precision solar position, altitude-above-horizon, B-V color-index→RGB ramp. [CelestialCoordinates.cs:43-186] (MEASURED)
- **Affine solver** with determinant guard, angular-size derivation, and roll compensation for image y-down. [StellariumLoader.cs:254-296] (MEASURED)
- **Runtime scene hardening:** disabling stray lights, tunneling vignette, snap/continuous-turn, teleportation for a comfort-locked stargazing mode. [StargazingSceneBootstrap.cs:86-192] (MEASURED)
- **Time scrubbing** with momentum/inertia and a 24× grip multiplier driving all sky systems via `SkyManager.OffsetSimulatedTime`. [Week12_Report.txt:54-59, SkyManager.cs:168-179, TimeScrollController.cs] (MEASURED code; "24×" from report)
- **Twinkle is a single sine wave** (`1 + sin(t+phase)*amount`) in code [StarRenderer.cs:232]. RESOLVED: author confirms **code is authoritative** — the `.tex`/presentation "product of two sine waves" is a narrative simplification; claim the single-sine version only.
- **Constellation lookup is an O(1) `Dictionary<int,Vector3>`** [StellariumLoader.cs:51,87], NOT an octree (grep: 0 octree matches in the Unity repo). RESOLVED: the octree was a *conceptual design Rajat animated in the presentation* (`scene5.py:178` class `S5_Clip3_Octree`, labeled "Complexity: O(N log N)" at line 185), not what shipped. Honest framing: he explored/presented an octree spatial-partition approach; the shipped app uses a hash-map HIP index. See §9.

### 5a. Companion artifact — Manim presentation engine (solo)
- **6-scene animated technical explainer** built in Manim (Python) covering: logo, sphere-projection of the sky (scene1), magnitude filtering (scene2), coordinate transform "Great Migration" (scene3), B-V color + twinkle (scene4), and constellation graph/3D/octree (scene5). [Manim-code/scene0–5.py; index.html:81-106] (MEASURED — files + clip list)
- **3D Manim work:** `ThreeDScene` with camera moves, generated 400-star field, `Cube` octant grid, wireframe search sphere, and bucket-highlight animation. [scene5.py:105-255] (MEASURED)
- **Custom HTML slide deck:** hand-written vanilla-JS player — sequences 18 clips, arrow-key nav, spacebar pause, autoplay toggle, scene/clip metadata labels, progress bar. No framework. [index.html:80-212] (MEASURED)
- **Real Python project, not throwaway scripts:** developed in `Manim-DSA-SD-Concepts` with `uv`/`pyproject.toml`, `manim.cfg`, pinned `uv.lock`, `.python-version`, and JSON data fixtures (`adjacency_list.json`, `sirius_data.json`). [Manim-DSA-SD-Concepts/pyproject.toml, manim.cfg] (MEASURED)
- Hosted as a static HTML site for easy access during the presentation. (author statement — hosting URL is NEEDS-INPUT)

**⚠ Boundary — separate project, do NOT fold into CelestiaVR:** the same dev repo contains a reusable Manim DSA/system-design toolkit — `manim_utils.py` (`LinkedListNode`, `LinkedList` smart Mobjects, `Base_DSA_Scene` 3-zone layout, `highlight_line`/`update_log_text`/`create_scrambled_title` helpers) plus a "Intro to Linked Lists" video (`scenes.py`). [README.md:1-50, manim_utils.py:7-385] The Celestia scenes (`scene0–5.py`) **do not import** this toolkit (grep: only `scenes.py` uses it), so it is a distinct side project that merits its own crawl/fact record — not a CelestiaVR claim.

## 6. Candidate bullets (forward direction)
1. **Built a real-time astronomical rendering pipeline in Unity/C# that ingests the 119k-star HYG v4.2 catalog, filters to ~8,900 naked-eye stars (mag ≤ 6.5), and renders them in batched GPU-instanced draw calls (1023/batch) via a custom URP additive billboard shader.** — Archetype: mobile-xr / graphics. Label: MEASURED (counts) + ESTIMATED (perf motivation). Evidence: StarCatalogParser.cs:24, StarRenderer.cs:57,238, StarBillboard.shader. Tier 1.
2. **Implemented sidereal-accurate sky simulation (RA/Dec→Cartesian, local sidereal time, Meeus solar position) and fixed an astronomically wrong zenith-axis rotation by rotating about the true celestial pole from observer latitude.** — Archetype: mobile-xr / generalist-sde. Label: MEASURED. Evidence: CelestialCoordinates.cs:43-186, SkyManager.cs:116-136. Tier 1.
3. **Designed a constellation overlay that anchors 85 Stellarium art quads + 88 IAU stick figures to the sky via a 3-point affine pixel→direction transform, keeping art aligned under arbitrary sky rotation.** — Archetype: graphics/mobile-xr. Label: MEASURED. Evidence: StellariumLoader.cs:254-296; 85 PNGs measured. Tier 1.
4. **Built a 3-second gaze-dwell selection + hologram inspection loop for VR celestial objects, with comfort-locked locomotion enforced at scene bootstrap.** — Archetype: mobile-xr. Label: MEASURED. Evidence: DwellSelector.cs:28, InspectionController.cs, StargazingSceneBootstrap.cs:170-192. Tier 1.
5. **Engineered a time-scrubbing controller (thumbstick + momentum, 24× grip multiplier) that drives stars, planets, Sun, and Milky Way through a single time source.** — Archetype: mobile-xr. Label: ESTIMATED (24× from report). Evidence: SkyManager.cs:168-179, Week12_Report.txt:54-59. Tier 2.
6. **Integrated a multi-author Unity VR project: runtime auto-wiring, force-disabling of duplicate legacy renderers, and a decoupled day/night brightness hook for teammates' systems.** — Archetype: platform-infra/generalist-sde. Label: MEASURED. Evidence: StargazingSceneBootstrap.cs, StellariumLoader.cs:63-71, StarRenderer.cs:54. Tier 2.
7. **Solo-built a 6-scene Manim (Python) animated explainer of the project's rendering/coordinate/optimization decisions and a custom vanilla-JS HTML video deck (18 clips, keyboard nav, autoplay) to present it.** — Archetype: generalist-sde / frontend / technical-communication. Label: MEASURED. Evidence: Manim-code/scene0–5.py, index.html:80-212. Tier 2.
8. **Optimized the VR star field from a per-GameObject prototype to GPU instancing, reaching a measured 72–90 Hz on Quest 3; showcased to ~10 users at a hackathon.** — Archetype: mobile-xr/graphics. Label: MEASURED (author-tested). Evidence: StarRenderer.cs:238 + author on-device test. Tier 1.

## 7. Metrics found vs metrics needed
| Claim | Value | Source (file:line / artifact) | Status | Basis / reasoning | Confidence |
|---|---|---|---|---|---|
| HYG catalog size | 119,627 rows (~119k stars) | Assets/Data/hyg_v42.csv (`wc -l`) | MEASURED | Direct line count | high |
| Naked-eye stars rendered | 8,921 (≈9,000) | hyg_v42.csv + mag≤6.5 (StarCatalogParser.cs:24) | MEASURED | `awk` count of mag col ≤ 6.5 | high |
| GPU instancing batch size | 1023 stars/call | StarRenderer.cs:57,238 | MEASURED | Unity DrawMeshInstanced limit in code | high |
| Star-field draw-call batches | ~9 batches | 8,921 / 1023 | ESTIMATED | math from batch size | high |
| Constellation art quads | 85 | Assets/Resources/ConstellationArt (85 PNGs) | MEASURED | file count; matches `.tex` | high |
| IAU stick-figure constellations | 88 | StellariumLoader.cs:15, ConstellationHIPData.All | MEASURED | code comment + data table | medium |
| Dwell selection time | 3.0 s | DwellSelector.cs:28 | MEASURED | default field value | high |
| Named-star sphere threshold | mag < 3.0 | StarRenderer.cs:47 | MEASURED | inspector default | high |
| Sky sphere radius | 500 units | SkyManager.cs:40 | MEASURED | field default | high |
| Time-scroll grip multiplier | 24× | Week12_Report.txt:58 | ESTIMATED | author report; verify in TimeScrollController | medium |
| Custom C# LOC (author + team) | ~11,391 | `wc -l Scripts/**` | MEASURED | line count, all 53 scripts | high |
| Custom scripts | 53 | Glob Scripts/**/*.cs | MEASURED | file count | high |
| Rajat commits / total | 14–16 / 43 | git shortlog / log --author | MEASURED | shortlog=16, email filter=14 | high |
| Project duration | ~5 wks (Apr 6 – May 11 2026) | git log dates | MEASURED | first/last commit | high |
| Final on-device frame rate | 72–90 Hz | author tested on Quest 3 (2026-06-25) | MEASURED | author-reported on-device measurement; no capture file in repo (keep range, not a single number) | medium |
| Pre-optimization (per-star GO) frame rate | < 72 Hz at ~9k draw calls | contribution_statement_rajat.tex:38 | ESTIMATED | author-claimed "before" state; no profiler artifact — pair with the 72–90 "after" | low |
| Real users / showcase | ~10 at a hackathon | author statement (2026-06-25) | MEASURED (author-reported) | showcased project; ~10 attendees tried it | medium |
| Deep-sky objects | 4 (M31,M42,M45,M13) | Week12_Report.txt:61-63 | MEASURED | enumerated in report | medium |
| Manim presentation scenes / clips | 6 scenes / 18 clips | index.html:81-106; scene0–5.py | MEASURED | clip list + scene files (companion repo) | high |
| Presentation Manim source | ~64 KB Python, 6 files | Manim-code/scene0–5.py (`ls -la`) | MEASURED | file sizes | high |
| Usability study results | — | Week12_Report.txt:113-133 (plan only) | NEEDS-INPUT | formal study was *planned*; no results in repo (distinct from the ~10 hackathon users) | — |

## 8. Evidence index (reverse direction)
| Claim ID | Evidence |
|---|---|
| Identity / Quest 3 / Star Walk 2 | Week12_Report.txt:18-23 |
| HYG v4.2, 119k, mag≤6.5, async event | StarCatalogParser.cs:10-29,87-91; Assets/Data/hyg_v42.csv |
| RA/Dec→Cartesian, LST, Julian, B-V, Sun, altitude | CelestialCoordinates.cs:16-186 |
| GPU instancing 1023 batches, twinkle, fade hook | StarRenderer.cs:54,57,232,238-248 |
| Billboard additive shader | StarBillboard.shader:1-109 |
| Polar-axis sidereal rotation fix | SkyManager.cs:116-136 |
| Time offset drives all systems | SkyManager.cs:168-179 |
| Affine constellation transform, legacy disable, 85/88 | StellariumLoader.cs:14-20,63-71,254-296 |
| 3s dwell, dwell filters | DwellSelector.cs:18-55 |
| Scene bootstrap hardening (lights, vignette, turn, teleport) | StargazingSceneBootstrap.cs:65-192 |
| Tech stack versions | Packages/manifest.json:3-17 |
| Authorship boundary | git log per file; git shortlog -sne |
| Twinkle single-sine (contradicts .tex) | StarRenderer.cs:232 |
| No octree (contradicts .tex) | grep `octree` = 0 matches; StellariumLoader.cs:51,87 |

## 9. NEEDS HUMAN INPUT (the handoff)
_Resolved by author (2026-06-25): twinkle = single-sine (code wins); octree was presentation-only concept, shipped app uses hash-map; frame rate 72–90 Hz measured on Quest 3; ~10 real users at a hackathon. These are reflected above._

Still open:
- **Pre-optimization "before" number:** the < 72 Hz / ~9k-draw-call "before" state is still author-claimed without a capture. If you have any before/after screenshot or note, it upgrades bullet #8 from "improved to 72–90 Hz" to a full before→after delta.
- **Hackathon specifics:** which hackathon, date, and was there any placement/award or just a showcase? "~10 users" — observed trying it, or surveyed? This determines whether you can say "tested with ~10 users" vs "demoed to ~10 attendees."
- **Presentation hosting:** the static HTML deck is "hosted" — confirm the URL (GitHub Pages?) if you want to link it as a portfolio artifact.
- **Exact Unity version:** confirm `6000.3.11f1` from `ProjectSettings/ProjectVersion.txt` (not crawled).
- **Time-scroll 24× / momentum:** verify constants in `TimeScrollController.cs` (only read via report, not line-cited).
- **Course usability study:** were the *planned* playtests (4–6 participants, ≥80% completion target) actually run, and results? [Week12_Report.txt:95-133] (separate from the ~10 hackathon users).
- **StarNet v2 pre-processing:** confirm this was author-performed offline (output texture in repo but tool not in build).
- **Scope of recent fireplace/island commits:** clarify what you *built* vs *integrated* on top of teammates' fireplace/onboarding/boundary systems.
- **Separate project to crawl later (not CelestiaVR):** `Manim-DSA-SD-Concepts` — the reusable `manim_utils.py` toolkit + DSA video series is its own portfolio item. Worth a dedicated `report.md`/fact record; confirm whether the YouTube playlist was published and how many videos.
