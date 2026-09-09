# Context Capsule: CelestiaVR

> Re-hydration file for future agents. Read this INSTEAD of re-crawling the repo.
> Resume numbers are not gated by this file.

## 1. Meta
- **id:** `celestiavr` · **name:** CelestiaVR — Immersive VR Stargazing Engine
- **crawl date:** 2026-06-25 (author-verified same day)
- **author filter:** `156324870+RDX-Rajat-Savdekar@users.noreply.github.com` (Rajat Savdekar)
- **team:** 5 people (USC AR/VR course, Spring 2026 + **RealityShift 2026** hackathon). Rajat = 14–16 / 43 commits (mostly sky-rendering engine). Hackathon teammates named publicly: **Pavan Kumar Ramesh**, **Gurpreet Kukkar** (+ others on course team).
- **skipped:** `Library/`, `Logs/`, `.apk`, backup/Burst folders, all vendor asset packs (SGT, VRTemplate, TextMesh Pro, Vefects), all binaries (`*.unity/png/fbx/glb/mat/prefab`), `.meta`, generated `*.csproj`. Read: `Assets/CelestiaVR/Scripts/**`, `StarBillboard.shader`, manifest, `.tex`, `Week12_Report.txt`, git.
- **repo:** https://github.com/RDX-Rajat-Savdekar/CelestiaVR
- **demo:** https://www.youtube.com/watch?v=QzRTp0EtUsQ
- **presentation (solo):** https://rdx-rajat-savdekar.github.io/Celestia_Presentation/ — GitHub Pages HTML deck + Manim clips

## 2. Identity + problem
Meta Quest 3 VR stargazing app: user stands on a night tropical island and explores a real,
time-accurate sky (~9k stars, planets, 88 constellations, deep-sky objects, Milky Way) via
gaze/controller. Course deliverable inspired by Star Walk 2; goal = first-time user selects &
inspects celestial objects with no tutorial. Rajat owned the **real-time sky/star-rendering engine**.

## 3. Directory map (author-owned unless noted)
| Path | What | Why it matters |
|---|---|---|
| `Assets/CelestiaVR/Scripts/Core/` | SkyManager, SkySphere, CelestialCoordinates, CelestialBody | Sky sim brain + astronomy math |
| `Assets/CelestiaVR/Scripts/Stars/` | StarCatalogParser, StarRenderer, NamedStarSpawner, DeepSkyObjectSpawner | Catalog ingest + GPU-instanced field |
| `Assets/CelestiaVR/Scripts/Constellations/` | StellariumLoader, ConstellationHIPData, StellariumArtData | Affine art alignment + stick figures |
| `Assets/CelestiaVR/Scripts/Planets/` | PlanetController, PlanetEphemerisParser | Planet positions |
| `Assets/CelestiaVR/Scripts/Interaction/` | DwellSelector, InspectionController, SelectionManager, BillboardStarDwellDetector | Gaze-dwell + inspection loop |
| `Assets/CelestiaVR/Scripts/Environment/` | SunController, DayNightController, IslandLightingFixer | Day/night |
| `Assets/CelestiaVR/Scripts/UI/` | InspectionPanel, SkyLabelManager, TimeScrollController, DirectionalArrow | Panels, labels, time scrub |
| `Assets/CelestiaVR/Shaders/StarBillboard.shader` | URP additive billboard | Star glow, GPU instanced |
| `Assets/Data/hyg_v42.csv` | HYG v4.2 catalog (119,627 rows) | Star data source |
| `Assets/Resources/ConstellationArt/` | 85 Stellarium PNGs | Constellation art quads |
| `Scripts/Audio,UI/Search,Island/Fire*` | **TEAMMATES** (see §6) | NOT Rajat's work |

## 4. Entry points
- `SkyManager.cs` — root MonoBehaviour singleton; `Start()` wires sub-systems, drives time/rotation.
- `StargazingSceneBootstrap.cs` — runtime scene setup: auto-wiring, legacy-disable, comfort lockdown.
- `StarCatalogParser.Start()` → async load → fires `OnCatalogLoaded` → renderers/constellations build.

## 5. Architecture decisions (decision / why / rejected / evidence)
- **GPU instancing star field** — `DrawMeshInstanced` 1023/batch + additive billboard shader; *why:* per-star GameObject hit ~9k draw calls < 72 Hz; *rejected:* 1 GameObject/star (kept only for named stars < mag 3.0 needing colliders). `StarRenderer.cs:57,238`, `StarBillboard.shader:24`.
- **Polar-axis sidereal rotation (bug fix)** — rotate sky about true celestial pole from latitude; *why:* world-Y/zenith only correct at N pole (caused "carousel"); *rejected:* world-Y rotation. `SkyManager.cs:116-136`.
- **Affine pixel→sky transform** — 3 HIP anchor stars → place/scale/roll art quads; *why:* art must stay aligned under sky rotation; *rejected:* legacy renderers, force-disabled at runtime. `StellariumLoader.cs:254-296,63-71`.
- **Magnitude-limited ingestion** — filter HYG to mag ≤ 6.5 (119k→~9k), async + event sequencing. `StarCatalogParser.cs:24,29,87-91`.
- **Decoupled day/night fade** — `StarRenderer.GlobalBrightnessFade` hook set by DayNightController vs internal access. `StarRenderer.cs:54`.

## 6. Author scope
- **Rajat built:** all Core/Stars/Constellations/Planets, the shader, most Interaction/inspection, day-night, several UI panels, scene bootstrap integration. (MEASURED via git per-file authorship)
- **Teammates (DO NOT credit Rajat):** Gurpreet = audio + search panel + ControlPanel + input mgr; Fardeen = island boundaries + onboarding + fog/constraints; Namratha = fireplace mini-game.
- **Libraries did:** XR rig/hands/interactors (XRIT 3.3.1), URP rendering, glTF import, SGT vendor assets, HYG data, Stellarium art, StarNet v2 (offline).
- **Companion presentation repo = 100% solo Rajat** (separate; see §10).

## 7. Tech stack (exact strings + proof)
- Unity 6 (`6000.3.11f1` per `.tex` — verify ProjectVersion.txt) · C# (~11,391 LOC, 53 scripts) · HLSL
- URP `17.3.0`, XRIT `3.3.1`, OpenXR `1.16.1`, xr.hands `1.7.3`, arfoundation `6.3.3`, inputsystem `1.19.0`, gltfast `6.18.0` — all `Packages/manifest.json:3-17`
- Target: Meta Quest 3 (Android XR/OpenXR). Data: HYG Stellar DB v4.2.

## 8. Hard parts
- Single-call instanced render w/ per-star color/brightness/twinkle via MaterialPropertyBlock arrays; re-batch only on rotation change. `StarRenderer.cs:145-249`
- Astronomy math from scratch: Julian Date, GMST/LST, Meeus solar position, altitude, B-V→RGB. `CelestialCoordinates.cs:43-186`
- Affine solver: determinant guard, angular size, roll comp for image y-down. `StellariumLoader.cs:254-296`
- Runtime comfort hardening: disable stray lights, tunneling vignette, snap/continuous turn, teleport. `StargazingSceneBootstrap.cs:86-192`
- Time scrubbing w/ momentum + 24× grip multiplier, single time source. `SkyManager.cs:168-179`

## 9. Metrics (compact)
| Metric | Value | Status | Conf |
|---|---|---|---|
| HYG catalog rows | 119,627 | MEASURED | high |
| Naked-eye stars rendered (mag≤6.5) | 8,921 (~9k) | MEASURED | high |
| Instancing batch size | 1023/call | MEASURED | high |
| Constellation art quads / IAU figures | 85 / 88 | MEASURED | high/med |
| Dwell time | 3.0 s | MEASURED | high |
| Custom C# LOC / scripts | ~11,391 / 53 | MEASURED | high |
| Duration | Apr 6–May 11 2026 (~5 wk) | MEASURED | high |
| **Frame rate on Quest 3** | **72–90 Hz** | MEASURED (author on-device) | med |
| Pre-opt frame rate (per-star GO) | below 72 Hz comfort threshold | MEASURED (Unity Profiler) | med |
| **Real users** | **~10 at RealityShift 2026** | MEASURED (author-reported) | med |
| Course usability playtest | ran (results not quantified here) | QUALITATIVE | med |
| Time-scroll grip multiplier | 24× | MEASURED | high |
| Presentation URL | rdx-rajat-savdekar.github.io/Celestia_Presentation | MEASURED | high |
| Unity version | Unity 6 | MEASURED | high |

## 10. Top candidate bullets (archetype)
1. Real-time astro rendering pipeline: HYG 119k → ~8.9k naked-eye stars, GPU-instanced (1023/batch) custom URP shader; **72–90 Hz on Quest 3**. [mobile-xr/graphics, MEASURED]
2. Sidereal-accurate sky sim (RA/Dec→Cartesian, LST, Meeus sun) + polar-axis rotation bug fix. [mobile-xr/generalist, MEASURED]
3. Constellation overlay: 85 art quads + 88 stick figures via 3-point affine pixel→sky transform. [graphics, MEASURED]
4. 3s gaze-dwell + hologram inspection loop w/ comfort-locked locomotion. [mobile-xr, MEASURED]
5. Solo 6-scene Manim explainer + custom vanilla-JS HTML video deck (18 clips). [frontend/tech-comm, MEASURED]
6. Integrated multi-author Unity project: auto-wiring, legacy-disable, decoupled fade hook. [platform-infra, MEASURED]

## 11. Interview hooks
- *Why GPU instancing?* → per-star GameObjects = ~9k draw calls under 72 Hz; one DrawMeshInstanced call per 1023-star batch fixed it.
- *Hardest astronomy bug?* → sky rotated about zenith (only right at N pole); fixed to true celestial-pole axis from latitude.
- *How does constellation art stay aligned?* → solve affine map from 3 HIP anchor stars' pixels → unit-sphere directions for position/scale/roll.
- *Octree?* → I designed & animated an octree spatial-partition in the *presentation*; shipped app uses an O(1) HIP hash-map (be precise here).
- *Twinkle?* → single sine `1+sin(t+φ)*A` per star with random phase (NOT two sines — code is truth).

## 13. NEEDS HUMAN INPUT
- [x] Pre-opt testing — **Unity Profiler** confirmed per-star GameObject approach broke 72 Hz comfort budget (no saved % delta).
- [x] Hackathon — **RealityShift 2026** (USC); ~10 users shown; no placement claim in author post.
- [x] Presentation — GitHub Pages: https://rdx-rajat-savdekar.github.io/Celestia_Presentation/
- [x] Unity — **Unity 6** (exact patch not required on resume).
- [x] 24× time-scroll — confirmed.
- [x] Course playtest — **ran**; specific ≥80% metrics not provided.
- [x] StarNet v2 offline — **author (Rajat)**.
- [x] Commits — **14–16 / 43**, mostly sky-rendering engine.

## 13b. Author Q&A log (2026-06-29)
RealityShift 2026 context from author LinkedIn: USC Marshall/Viterbi-sponsored hackathon; collaborated with Pavan Kumar Ramesh, Gurpreet Kukkar.

## 14. Re-crawl triggers
- Telescope interaction re-added / inspection pipeline rewritten.
- Star rendering moved off `DrawMeshInstanced` (e.g. to BRG/compute).
- Constellation lookup actually switched to an octree/BVH in shipped code.
- Team/authorship changes, or `Assets/CelestiaVR/Scripts/` materially restructured.
- New measured metrics (capture files for FPS, study results).
