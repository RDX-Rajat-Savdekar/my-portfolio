# Context Capsule: Aura (visionOS)

> Token-cheap re-hydration for future agents. Read this INSTEAD of re-crawling the repo.
> Resume numbers are not gated by this file.

## 1. Meta
- **Project id:** `aura-visionos`
- **Name:** Aura — visionOS On-Device Captioning & Sound Awareness
- **repo:** https://github.com/RDX-Rajat-Savdekar/Aura-Vision-Pro
- **demo:** https://www.youtube.com/watch?v=HbW9F2zjmLQ&t=65s
- **Capsule last updated:** 2026-06-25
- **Crawl date:** 2026-06-25
- **Author filter:** requested `rajatsavdekar@gmail.com` → 0 commits; real identity `Rajat Savdekar <…RDX-Rajat-Savdekar@users.noreply.github.com>` (author-confirmed = them).
- **Full report:** `report.md` (repo root). Author's interview notes: `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt`.
- **Paths skipped in crawl:** `Packages/RealityKitContent/` (RCP assets/USD), `Aura/Assets.xcassets/` (icon PNGs), Xcode user data, `.DS_Store`. All `Aura/*.swift` read in full.
- **Team:** 3 people; **all code is solo (Rajat)** — teammates (Fardeen Khan, Namratha V Patil) only edited the Readme (git). Teammates presented the demo.

## 2. Identity + problem
Apple Vision Pro (visionOS) accessibility app: captures mic audio and runs **two on-device Apple Core ML pipelines** — live speech transcription (Speech) + environmental sound classification (SoundAnalysis) — surfacing captions and sound alerts. Built for deaf/hard-of-hearing situational awareness; **privacy-first, zero cloud, zero external dependencies.** Won **2nd place** at a hackathon (LA Tech Week / USC ISI / Lovable, Oct 2025).

## 3. Directory map
| Path | What lives there | Why it matters |
|---|---|---|
| `Aura/AuraApp.swift` | `@main` App entry; `WindowGroup { ContentView() }` | Entry point. **Note: no `ImmersiveSpace` scene wired here.** |
| `Aura/MicrophoneMonitor.swift` (504 LOC) | Audio engine, dual ML observers, utterance segmenter, locale swap | **Core of the app** — most important file |
| `Aura/ContentView.swift` (445 LOC) | 2D SwiftUI HUD, sentence splitter, language picker | The demoed 2D captioning UI |
| `Aura/ImmersiveView.swift` (343 LOC) | RealityKit spatial HUD, texture baking, billboard math | Spatial panel; demoed (footage) but unwired in committed HEAD |
| `Aura/Utterance.swift` | `struct Utterance` (UUID, text, start/end TimeInterval) | Value type for temporal speech segments |
| `Aura/AppModel.swift` | Immersive-space state enum | **Apple visionOS template** (not novel) |
| `Aura/ToggleImmersiveSpaceButton.swift` | Open/close immersive space button | **Apple template; unreferenced** anywhere |
| `Aura/AVPlayerView*.swift` | AVKit video scaffold | **Template; non-functional** (`videoURL = nil`) |
| `Aura/Untitled.swift` | empty | ignore |
| `Aura/Info.plist` | Scene manifest | mic/speech usage strings are in build settings, not here |
| `Aura.xcodeproj/project.pbxproj` | Build config | platform/target/permission proof |
| `Packages/RealityKitContent/` | Reality Composer Pro package | asset bundle (skipped) |

## 4. Entry points
- App launch: `Aura/AuraApp.swift:3-16` → `ContentView` in a `WindowGroup`. `MicrophoneMonitor` is `@StateObject` created here, injected via `.environmentObject`.
- Audio/ML start: `MicrophoneMonitor.init` → permission requests → `startMonitoring()` (`MicrophoneMonitor.swift:65-71`, `:119-218`).
- Spatial view (when wired): `ImmersiveView.body` `RealityView { … } update: { … }` (`ImmersiveView.swift:144-251`).

## 5. Architecture decisions
| Decision | Why | Rejected alt | Evidence |
|---|---|---|---|
| Strict on-device ASR, no cloud fallback | privacy + latency determinism | network-fallback `SFSpeechAudioBufferRecognitionRequest` | `MicrophoneMonitor.swift:240`, `:263-264` |
| Reuse Apple's on-device Core ML models vs train | recently-released models good enough; zero training/MLOps | training custom sound/speech models | `MicrophoneMonitor.swift:148`, `:89-90` (author-confirmed) |
| Texture-baked SwiftUI for spatial panel | rich layout, decouple from 90Hz loop via cached texture | `ViewAttachmentEntity`; `generateText` | `ImmersiveView.swift:311-342`, `:223-228` |
| Two-layer segmentation (temporal + grammatical) | raw `formattedString` has no sentence structure/timing | use `bestTranscription.formattedString` directly | `MicrophoneMonitor.swift:373-471`; `ContentView.swift:258-342` |
| Hysteresis + throttle on classifier | stop label flapping; cap UI churn | emit any top result > threshold | `MicrophoneMonitor.swift:342-356` |
| Gram-Schmidt billboard + NaN guards | `look(at:)`/`from:to:` → NaN when camera overhead | `Entity.look(at:)` | `ImmersiveView.swift:256-282`, `:201-205` |
| Locale hot-swap w/o engine restart | avoid restart latency on language switch | full engine restart | `MicrophoneMonitor.swift:299-333` |

## 6. Author scope
- **Author built:** the whole pipeline — audio capture + dual-ML wiring off one tap, `vDSP` RMS + stereo→azimuth DSP, utterance segmenter, abbreviation-aware sentence splitter, classifier hysteresis/throttle, locale hot-swap, RealityKit texture-baking HUD, billboard math + NaN guards, debouncing, MainActor concurrency bridging.
- **Libraries did:** the actual ML models — `SFSpeechRecognizer` (ASR) and `SNClassifySoundRequest(.version1)` (sound classes, ~hundreds). Author **did not train any model.** RealityKit did rendering/texture upload; Accelerate did SIMD RMS.
- **Template (not novel):** `AppModel`, `ToggleImmersiveSpaceButton` (Apple visionOS template), `AVPlayerView`/`AVPlayerViewModel` (non-functional scaffold), `Untitled.swift` (empty).

## 7. Tech stack (exact strings)
visionOS (`SUPPORTED_PLATFORMS = "xros xrsimulator"`, `project.pbxproj:182`) · Swift 5.0 (`:187`) · SwiftUI · RealityKit (`ImmersiveView.swift:1-2`) · AVFoundation `AVAudioEngine` (`MicrophoneMonitor.swift:2`) · Speech `SFSpeechRecognizer` (`:6`) · SoundAnalysis `SNClassifySoundRequest` (`:5,148`) · Accelerate `vDSP` (`:3,174`) · Swift Concurrency `@MainActor`/`nonisolated` (`:482-495`) · Combine/`@Published`. **External deps: none** (`Readme.md:63`). Mic/Speech permissions in build settings (`project.pbxproj:172-173`).

## 8. Hard parts
- Off-MainActor → MainActor bridging for `@Published` mutation from background ML delegates: `MicrophoneMonitor.swift:482-495`.
- Real-time audio-tap discipline: RMS in-callback + `SNAudioStreamAnalyzer.analyze` dispatched to serial `com.aura.AnalysisQueue` so classification never blocks the tap: `MicrophoneMonitor.swift:35`, `:165-209`.
- Trailing-edge debounce decoupling signal rate from render: `ImmersiveView.swift:284-300`; `ContentView.swift:248-255`.
- Off-screen UIKit rasterization needs `drawHierarchy(afterScreenUpdates: true)` or blank image: `ImmersiveView.swift:324`.
- NaN-propagation guards in spatial math (`simd_length < 0.001` fallbacks): `ImmersiveView.swift:201-205`, `:259-272`.
- Abbreviation-aware splitter (25-entry set, grouped punctuation "?!", "..."): `ContentView.swift:262-330`.
- visionOS audio session must be `.playAndRecord` + zero-channel guard for simulator: `MicrophoneMonitor.swift:125`, `:135`.

## 9. Metrics (compact)
| Claim | Value | Status | Conf | Source |
|---|---|---|---|---|
| App Swift LOC | ~1,475 (9 files) | MEASURED | high | `wc -l Aura/*.swift` |
| Largest file | MicrophoneMonitor 504 | MEASURED | high | `wc -l` |
| Languages in UI picker | 7 | MEASURED | high | `ContentView.swift:28-36` |
| Languages verified live | ≥2 (EN + JA) | DEMO-CONFIRMED | high | demo video |
| Sound classes confirmed live | ≥3 (emergency vehicle, clapping, whispering) | DEMO-CONFIRMED | high | demo video |
| Multi-speaker transcription | yes | DEMO-CONFIRMED | high | demo video |
| Pause threshold | 1.1 s | MEASURED | high | `MicrophoneMonitor.swift:59` |
| Min confidence / throttle | 0.6 / 0.25 s | MEASURED | high | `:52`, `:51` |
| Texture/text debounce | 0.1 s / 0.15 s | MEASURED | high | `ImmersiveView.swift:24`; `ContentView.swift:22` |
| Buffer size / duration | 1024 / ~23 ms @44.1kHz | MEASURED/ESTIMATED | high/med | `:43` |
| External deps | 0 | MEASURED | high | `Readme.md:63` |
| Hackathon result | 2nd place | AUTHOR-CONFIRMED | high | author/demo |
| Latency/CPU/speedup % | — | **DROPPED** | — | no benchmark; never claim |
| Production users | — | NEEDS-INPUT | — | not in repo |

## 10. Golden bullets (B1/B2/B3 — pick one variant per slot)

Resume ships **3 bullets** when Aura is included (swap in for mobile-xr / ml-ai / accessibility JDs).

| ID | Slot | Angle | Validated |
|---|---|---|---|
| `aura-b1-v1` | B1 | Product intro — dual on-device pipeline, zero cloud, 2nd place | pending |
| `aura-b1-v2` | B1 | Keyword-dense — Swift/SwiftUI/visionOS/Core ML/AVFoundation, 7 locales | **yes (ship)** |
| `aura-b2-v2` | B2 | RealityKit texture-baked spatial HUD | **yes (ship)** |
| `aura-b3-v1` | B3 | Dual pipeline + 7 locales + MainActor bridging | **yes (ship)** |

**Shipped set:** B1 v2 + B2 v2 + B3 v1

## 11. Interview hooks
- *Why on-device only?* → privacy (no audio leaves device) + deterministic latency; accepted cost = per-locale models must be pre-installed (handled via `kAFAssistantErrorDomain` messaging).
- *Why bake SwiftUI to a texture instead of RealityKit text?* → rich layout + cache decouples UI cost from the 90Hz frame loop; `ViewAttachmentEntity` re-lays-out per frame.
- *Why custom billboard math?* → `look(at:)`/`simd_quatf(from:to:)` produce NaN quaternions when the camera is directly overhead; Gram-Schmidt + zero-vector fallback avoids it.
- *Did you train the ML?* → No — integrated Apple's on-device models after evaluating training; my work is the pipeline + segmentation + integration.
- *Why rebuild the utterance array every callback?* → simplicity + stable UUIDs make SwiftUI treat it as whole-list replace, avoiding bogus row animations on ASR mid-corrections.

## 13. NEEDS HUMAN INPUT
- Device audio sample rate (to defend the ~23ms buffer figure; code reads `inputNode.outputFormat`).
- Beyond EN+JA, how many of the other 5 picker locales were verified transcribing on-device?
- Where is the immersive-space wiring (which build/branch wired `ImmersiveView`)? Worth committing so the repo matches the demo.
- Any usage beyond the hackathon (testers, downloads, follow-on)?

## 14. Re-crawl triggers
- If `ImmersiveView` gets wired into `AuraApp` (an `ImmersiveSpace` scene appears) — author scope/claims change.
- After the planned "Emergency Awareness Mode" or directional-audio UI ships (`Readme.md:68-86`).
- If any model is actually trained/bundled (changes the author-vs-library boundary).
- If a benchmark/Instruments artifact is added (would let the dropped perf metrics become MEASURED).

---
_Future sessions: `@`-mention `data/project-context/aura-visionos.md` (+ your fact schema) to work on this project without re-crawling. Source of truth for evidence: `report.md`._
