# Crawl Report: Aura (visionOS)

_Crawled: 2026-06-25. Author filter: requested `rajatsavdekar@gmail.com` → **0 commits match** that email. Actual code commits are authored as `Rajat Savdekar <156324870+RDX-Rajat-Savdekar@users.noreply.github.com>` — **author confirmed this `RDX-Rajat-Savdekar` identity is them (2026-06-25)**. This report filters to author "Rajat Savdekar" and verifies file-add commits._

_Skipped / not crawled: `.git/`, `Packages/RealityKitContent/` (Apple Reality Composer Pro scaffold + `.rkassets` binary/USD media, `.swiftpm` user data), `Aura/Assets.xcassets/` (app icon layers, color sets — binary PNGs), `.DS_Store` files, Xcode `xcuserdata`/`xcschemes`. All `Aura/*.swift` source files were read in full (10 files; 1 empty)._

---

## 0. TL;DR

- **Identity:** Aura is an Apple Vision Pro (visionOS) accessibility app that does **real-time, fully on-device** speech transcription + environmental sound classification and overlays the results as a 2D HUD and (built but see §2) a spatial RealityKit panel. (`Readme.md:3`, `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt:9-11`)
- **Strongest themes (headlines):**
  1. Dual concurrent on-device ML pipeline (Speech ASR + SoundAnalysis classifier) sharing one `AVAudioEngine` tap, with strict no-cloud enforcement. (`Aura/MicrophoneMonitor.swift:157-218`, `:240`)
  2. Custom two-layer utterance/sentence segmentation engine (temporal pause-gap + grammatical abbreviation-aware splitter). (`Aura/MicrophoneMonitor.swift:373-477`, `Aura/ContentView.swift:258-342`)
  3. SwiftUI→UIImage→RealityKit `TextureResource` "baked texture" HUD with debouncing + custom Gram-Schmidt billboard math and NaN guards. (`Aura/ImmersiveView.swift:310-342`, `:256-282`)
  4. Real-time audio DSP in the tap callback using Accelerate `vDSP` RMS + stereo→azimuth mapping. (`Aura/MicrophoneMonitor.swift:165-204`)
  5. Hot-swappable recognition locale (multi-language) without restarting the audio engine. (`Aura/MicrophoneMonitor.swift:299-333`)
- **Solo-authored code** (all `.swift` files added by Rajat Savdekar); teammates touched only the Readme. Hackathon project (LA Tech Week / USC ISI / Lovable). (`git log`, `Readme.md:96-102`)

---

## 1. What it is & why it exists

- **Identity (1 sentence):** A visionOS app that captures microphone audio and runs **on-device** live captioning (Apple Speech) and sound-event classification (Apple SoundAnalysis), surfacing them as floating captions + sound alerts. [MEASURED] `Readme.md:3-13`; entry point `Aura/AuraApp.swift:3-16`.
- **Problem it solves / why built:** Accessibility + situational awareness for users who are deaf/hard-of-hearing or otherwise want ambient-sound alerts, with privacy as a first principle ("All processing happens on-device"). Built at a hackathon. [MEASURED for stated intent] `Readme.md:3`, `:10-13`, `:96-102`; the `Readme.md:68-86` "Limitations and Future Scope" frames it as a safety/accessibility companion (Emergency Awareness Mode planned, not built).
- **Real-world outcome / adoption / awards:** **Won 2nd place** at the hackathon (LA Tech Week / USC ISI / Lovable, Oct 2025). [AUTHOR-CONFIRMED 2026-06-25] A demo video is published on YouTube (`Readme.md:91`) and was **demoed live** — see "demo-confirmed behavior" below. Production/real-user counts beyond the hackathon: still [NEEDS-INPUT].
- **Demo-confirmed behavior (from demo-video transcript, AUTHOR-PROVIDED 2026-06-25):** live transcription of the speaker's own audio; transcription of a *second* person speaking with multi-speaker/"whispering" detection; sound classification firing live for a **siren → "emergency vehicle detected"**, plus **clapping** and **whispering**; and **live language switching to Japanese** mid-session. Presented by teammates Namratha and Fardeen. This corroborates the ASR + SoundAnalysis + locale-hot-swap pipelines working end-to-end.

---

## 2. Author scope

**What the AUTHOR (Rajat) built — MEASURED via git file-add commits + code authorship:**
- Every Swift source file was added by Rajat Savdekar. `Aura/*.swift` files (except 3 noted below) were added in `commit f2dab11` (Initial Commit, 2025-10-16) and `commit 6f06b0e` ("Vision Pro first build Aura App", 2025-10-16). (verified: `git log --diff-filter=A -- <file>`)
- The audio capture + dual-ML wiring, RMS/azimuth DSP, utterance segmenter, sentence splitter, classifier hysteresis/throttle, locale hot-swap, the RealityKit texture-baking HUD, billboard math, and debouncing are all hand-written application logic (not template). `Aura/MicrophoneMonitor.swift` (504 LOC), `Aura/ImmersiveView.swift` (343 LOC), `Aura/ContentView.swift` (445 LOC). [MEASURED] (LOC via `wc -l`).

**What a LIBRARY / FRAMEWORK did (do NOT credit author):**
- The actual ASR model: Apple **Speech** framework `SFSpeechRecognizer` / `SFSpeechAudioBufferRecognitionRequest`. Author configures + consumes it; the recognition itself is Apple's. `Aura/MicrophoneMonitor.swift:38-39`, `:238-268`.
- The actual sound-classification model: Apple **SoundAnalysis** prebuilt classifier `SNClassifySoundRequest(classifierIdentifier: .version1)` — Apple's ~300-class model; **author did not train any model**. `Aura/MicrophoneMonitor.swift:148`.
- SIMD RMS: Apple **Accelerate** `vDSP.rootMeanSquare`. `Aura/MicrophoneMonitor.swift:174`.
- Rendering, texture upload, plane mesh, materials: **RealityKit** (`TextureResource.generate`, `UnlitMaterial`, `MeshResource.generatePlane`). `Aura/ImmersiveView.swift:153`, `:184-186`, `:337`.

**Apple visionOS template / scaffold code (NOT novel author work — do not over-claim):**
- `Aura/AppModel.swift` (immersive-space state enum) and `Aura/ToggleImmersiveSpaceButton.swift` are the standard Xcode visionOS app template (verbatim template comments at `:24-26`, `:32-44`). [INFERRED — matches Apple template idioms]
- `Aura/AVPlayerView.swift` + `Aura/AVPlayerViewModel.swift` are template AVKit scaffolding; `videoURL` is hard-coded `nil` so playback is a no-op. `Aura/AVPlayerViewModel.swift:16-20`, `:31`. [MEASURED — non-functional placeholder]
- `Aura/Untitled.swift` is empty. [MEASURED] (0 lines).

**⚠ Critical scope caveat (MEASURED):** The immersive/spatial UI is **built but not wired into the running app in this commit.** `Aura/AuraApp.swift:9-15` declares only a `WindowGroup { ContentView() }` — there is **no `ImmersiveSpace(id:) { ImmersiveView() }` scene** and `ToggleImmersiveSpaceButton` is **never referenced** anywhere (`grep` found only its own definition + `AppModel`). So `ImmersiveView.swift` (the RealityKit HUD) is unreachable from the committed entry point.

_Design intent (AUTHOR-CONFIRMED 2026-06-25):_ `ImmersiveView` was designed as a **head-locked spatial captioning panel** — the same transcript-tail + sound-history content as the 2D HUD, baked to a RealityKit texture on a rounded 3D plane that sits ~0.6 m in front of the user, lifts ~0.25 m above eye level (floor-clamped), smoothly lerps to follow head position, and billboards to always face the viewer. Code is complete (`ImmersiveView.swift:144-342`); it is simply not attached to an `ImmersiveSpace` scene in this commit.

_Demoed live (AUTHOR-CONFIRMED 2026-06-25, footage in demo video):_ the spatial RealityKit captioning panel **was shown working** in the demo, alongside the 2D captioning, live sound classification, and Japanese language switch. **Honesty caveat (MEASURED code discrepancy):** the committed HEAD (`AuraApp.swift:9-15`) does **not** wire `ImmersiveView` into an `ImmersiveSpace` scene, so the demo was run from a build/branch that wired it (or it was unwired after the demo). The spatial code itself is complete (`ImmersiveView.swift:144-342`). **Resume guidance:** safe to claim "designed, implemented, and demoed a head-locked spatial captioning HUD in RealityKit"; if anyone inspects this exact commit, be ready to explain that the spatial scene wiring lived in the demo build.

**Solo or team?** Code is **solo (Rajat)**; project is nominally a 3-person team. Detected via `git shortlog -sne`: Fardeen Khan (8 commits) and Namratha V Patil (1) — **all of their commits modify only `Readme`** (`git log --all --oneline`). [MEASURED]

---

## 3. Tech stack (exact strings)

| Category | Exact name | Evidence |
|---|---|---|
| Platform | visionOS (Apple Vision Pro); `SUPPORTED_PLATFORMS = "xros xrsimulator"` | `Aura.xcodeproj/project.pbxproj:182`, `:217` |
| Deployment target | `XROS_DEPLOYMENT_TARGET = 26.0` (also `1.3` in some configs) | `project.pbxproj:287`,`:343`,`:189`,`:224` |
| Language | Swift (`SWIFT_VERSION = 5.0`) | `project.pbxproj:187`, `:222` |
| UI | SwiftUI (declarative views, `@StateObject`, `@Observable`, `.sheet`) | `Aura/AuraApp.swift:1-15`, `Aura/ContentView.swift:7-9` |
| Spatial/3D | RealityKit (`RealityView`, `ModelEntity`, `TextureResource`, `UnlitMaterial`) | `Aura/ImmersiveView.swift:1-2`, `:145-228` |
| Audio capture | AVFoundation (`AVAudioEngine`, `AVAudioSession`, tap on `inputNode`) | `Aura/MicrophoneMonitor.swift:2`, `:119-218` |
| Speech ASR | Speech framework (`SFSpeechRecognizer`) | `Aura/MicrophoneMonitor.swift:6`, `:38-39` |
| Sound classification | SoundAnalysis (`SNAudioStreamAnalyzer`, `SNClassifySoundRequest`) | `Aura/MicrophoneMonitor.swift:5`, `:144-149` |
| DSP | Accelerate (`vDSP.rootMeanSquare`) | `Aura/MicrophoneMonitor.swift:3`, `:174` |
| Concurrency | Swift Concurrency (`@MainActor`, `Task`, `nonisolated`, `withCheckedContinuation`) | `Aura/MicrophoneMonitor.swift:8`, `:81-85`, `:482-495` |
| Reactivity | Combine import + `ObservableObject`/`@Published` | `Aura/MicrophoneMonitor.swift:4`, `:12-30` |
| Video (scaffold) | AVKit (`AVPlayerViewController`) — non-functional placeholder | `Aura/AVPlayerViewModel.swift:8`, `:16-20` |
| Bundled RK assets | `Packages/RealityKitContent` Swift package (Reality Composer Pro) — not crawled | dir listing |
| Dependencies | **None external** ("There are no external dependencies") | `Readme.md:63` |
| Permissions | `NSMicrophoneUsageDescription`, `NSSpeechRecognitionUsageDescription` via build settings | `project.pbxproj:172-173`, `:207-208` |

---

## 4. Architecture & decisions (interview gold)

> All five decisions below are corroborated by code AND by the author's own `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt`. Code citations are primary; the anchors doc is the author's framing (treat its uncited numbers as author claims → §7/§9).

**D1 — Strict on-device ASR, no cloud fallback.**
- Decision: force `req.requiresOnDeviceRecognition = true`. `Aura/MicrophoneMonitor.swift:240-241`.
- Why: privacy (no audio leaves device) + latency determinism. Code comment: "We enforce on-device only; do not fallback to network." `Aura/MicrophoneMonitor.swift:263-264`.
- Rejected alternative: default `SFSpeechAudioBufferRecognitionRequest` allowing network fallback / cloud ASR. Trade-off: requires per-locale on-device model pre-installed (handled via error messaging, D-edge below). `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt:124-133`.

**D2 — Texture-baked SwiftUI for the spatial panel (vs native RealityKit text/attachments).**
- Decision: render a SwiftUI view → `UIImage` → `TextureResource` and bind to an `UnlitMaterial` on a rounded plane. `Aura/ImmersiveView.swift:311-326`, `:330-342`, `:153`.
- Why: full SwiftUI layout richness (rounded panels, multi-section HUD) while decoupling UI cost from the 90 Hz frame loop via a cached texture. `Aura/ImmersiveView.swift:11`, `:223-228`.
- Rejected alternatives: (A) RealityKit `ViewAttachmentEntity` (re-lays-out per frame); (B) `MeshResource.generateText` / TextEntity (no rich layout). `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt:142-154`.

**D3 — Custom two-layer segmentation (vs raw `formattedString`).**
- Decision: Layer 1 temporal pause-gap segmentation into `Utterance[]` (`pauseThreshold = 1.1s`, using `SFTranscriptionSegment.timestamp + duration`) `Aura/MicrophoneMonitor.swift:59`, `:373-471`; Layer 2 grammatical sentence splitter with abbreviation guard. `Aura/ContentView.swift:258-342`.
- Why: a single ever-growing transcript blob has no sentence structure / no temporal metadata for future directional/timeline features. `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt:160-172`.
- Rejected alternative: use `result.bestTranscription.formattedString` directly. `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt:160-161`.

**D4 — Hysteresis + throttle on sound classifier (vs naive top-label).**
- Decision: `shouldUpdateClassification` gates on `minConfidence = 0.6`, `hysteresisDrop = 0.1` (same-label floor 0.5), `classificationUpdateInterval = 0.25s`. `Aura/MicrophoneMonitor.swift:51-55`, `:342-356`.
- Why: suppress label flapping at classification boundaries; cap UI churn (~max 4 label updates/sec). `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt:185-192`.
- Rejected alternative: emit any top result above threshold straight to UI. `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt:182-183`.

**D5 — Custom Gram-Schmidt billboard rotation (vs `look(at:)`/`simd_quatf(from:to:)`).**
- Decision: explicit orthogonalization with degenerate-axis fallback + zero-vector guards. `Aura/ImmersiveView.swift:256-282`, `:201-205`.
- Why: `look(at:)`/`from:to:` produce NaN quaternions when camera is directly above/below the panel (cross-product with worldUp → 0). `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt:198-213`.
- Rejected alternative: `Entity.look(at:up:from:)` / `simd_quatf(from:to:)`. `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt:198-199`.

**D6 (edge decision) — Hot locale swap without engine restart.**
- Decision: `setRecognitionLocale` tears down only the recognition task/request (3-step nil-out) and keeps `AVAudioEngine`/tap alive. `Aura/MicrophoneMonitor.swift:299-333`, `:234-236`.
- Why: avoid full engine restart latency on language switch. `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt:341-349`.

**D7 — Reuse Apple's on-device Core ML models vs. train custom models.** [AUTHOR-CONFIRMED 2026-06-25]
- Decision: use Apple's prebuilt on-device models — `SFSpeechRecognizer` for ASR and `SNClassifySoundRequest(.version1)` for sound classification — rather than training/bundling custom models. `Aura/MicrophoneMonitor.swift:89-90`, `:148`.
- Why: the team evaluated training custom models but Apple had recently shipped capable on-device Core ML models, so direct reuse gave better accuracy/latency for hackathon scope with zero training/MLOps cost (and kept everything on-device). [author-confirmed]
- Rejected alternative: training custom Core ML / sound-event models — rejected as unnecessary given the recently-released Apple models. (Honesty: this means the ML *models* are Apple's; the author's work is the pipeline, segmentation, and integration — see §2.)

---

## 5. Hard parts / notable engineering

1. **Off-MainActor → MainActor bridging for `@Observable`/`@Published` mutation.** SoundAnalysis delegate (`SNResultsObserving`) fires on the background `analysisQueue`; both it and the AVKit delegate use `nonisolated func … { Task { @MainActor in … } }`. `Aura/MicrophoneMonitor.swift:482-495`, `Aura/AVPlayerViewModel.swift:48-52`. [MEASURED]
2. **Real-time audio-tap discipline.** RMS via Accelerate, azimuth O(1), and `soundAnalyzer.analyze` dispatched to a dedicated serial queue (`com.aura.AnalysisQueue`) so classification never blocks the tap. `Aura/MicrophoneMonitor.swift:35`, `:165-209`. [MEASURED]
3. **Trailing-edge debounce decoupling signal rate from render/UI rate.** `refreshTask?.cancel()` + `Task.sleep` pattern; 0.1s in ImmersiveView, 0.15s in ContentView. `Aura/ImmersiveView.swift:284-300`, `Aura/ContentView.swift:248-255`. [MEASURED]
4. **Off-screen UIKit rasterization correctness:** `drawHierarchy(in:afterScreenUpdates: true)` required because the `UIHostingController` view is never on screen (false → blank image). `Aura/ImmersiveView.swift:324`. [MEASURED — code; rationale per author `ANCHORS.txt:407-420`]
5. **NaN-propagation guards** in the spatial math (`simd_length(...) < 0.001` fallbacks in both the update closure and billboard helper). `Aura/ImmersiveView.swift:201-205`, `:259-265`, `:268-272`. [MEASURED]
6. **Abbreviation-aware sentence splitter** with grouped-punctuation handling ("?!", "...") and an abbreviation Set to avoid false splits on "Dr.", "U.S.". `Aura/ContentView.swift:262-330`. [MEASURED]
7. **`Utterance` stable-UUID identity** so SwiftUI `ForEach` treats stateless rebuilds as whole-list replacement, avoiding bogus per-row animations on ASR mid-correction. `Aura/Utterance.swift:3-14`; rationale `ANCHORS.txt:448-462`. [INFERRED]
8. **visionOS audio-session quirk:** uses `.playAndRecord` (not `.record`) + `guard recordingFormat.channelCount > 0` to survive the simulator's zero-channel input. `Aura/MicrophoneMonitor.swift:125`, `:135`. [MEASURED — code; quirk rationale per author]

---

## 6. Candidate bullets (forward direction)

Each = candidate the human edits; not final copy.

- **B1 (Tier 1, mobile-xr / ml-ai):** "Built a visionOS app that runs two on-device Apple ML pipelines (Speech ASR + SoundAnalysis classification) off a single shared `AVAudioEngine` tap, enforcing zero-cloud recognition for privacy." — Label: MEASURED (architecture). Evidence: `Aura/MicrophoneMonitor.swift:119-218`, `:240`.
- **B2 (Tier 1, mobile-xr):** "Designed a SwiftUI→`UIImage`→RealityKit `TextureResource` 'baked-texture' spatial HUD with a cached texture + 100 ms trailing-edge debounce to decouple UI updates from the 90 Hz render loop." — Label: MEASURED (mechanism); the "66% CPU"/Hz numbers are ESTIMATED/NEEDS-INPUT (§7). Evidence: `Aura/ImmersiveView.swift:284-342`, `:223-228`. *(Caveat: panel not wired into app scene — see §2/§9.)*
- **B3 (Tier 1, generalist-sde):** "Implemented a two-layer transcript segmenter — temporal pause-gap (1.1 s) utterance detection plus an abbreviation-aware grammatical sentence splitter — to turn raw streaming ASR into clean readable lines." — Label: MEASURED. Evidence: `Aura/MicrophoneMonitor.swift:373-471`, `Aura/ContentView.swift:258-342`.
- **B4 (Tier 2, mobile-xr):** "Wrote numerically-stable Gram-Schmidt billboard rotation with zero-vector/NaN guards to keep a head-locked panel oriented even when the camera is directly overhead." — Label: MEASURED (code). Evidence: `Aura/ImmersiveView.swift:256-282`.
- **B5 (Tier 2, generalist-sde):** "Added classifier hysteresis + 0.25 s throttle to stop sound-label flapping, and Accelerate `vDSP` RMS + stereo-balance azimuth math in the real-time audio callback." — Label: MEASURED. Evidence: `Aura/MicrophoneMonitor.swift:342-356`, `:165-204`.
- **B6 (Tier 2, mobile-xr):** "Enabled live recognition-language hot-swapping across 7 locales without restarting the audio engine." — Label: MEASURED (7 in picker). Evidence: `Aura/ContentView.swift:28-36`, `Aura/MicrophoneMonitor.swift:299-333`.
- **B7 (Tier 1, ml-ai / generalist-sde):** "Evaluated training custom sound/speech models and instead integrated Apple's newly-released on-device Core ML models (Speech + SoundAnalysis), shipping accurate real-time inference with zero training/MLOps cost — a deliberate build-vs-reuse trade-off." — Label: AUTHOR-CONFIRMED (decision). Evidence: `Aura/MicrophoneMonitor.swift:89-90`, `:148`; §4 D7.
- **B8 (Tier 3, do not headline):** AVKit video player scaffold — non-functional (`videoURL = nil`); template code, exclude. `Aura/AVPlayerViewModel.swift:16-20`.

---

## 7. Metrics found vs metrics needed

| Claim | Value | Source (file:line / artifact) | Status | Basis / reasoning | Confidence |
|---|---|---|---|---|---|
| Total Swift LOC (app) | ~1,475 lines, 9 non-empty files | `wc -l Aura/*.swift` | MEASURED | 20+53+21+16+445+343+504+58+0+15 | high |
| Largest source file | `MicrophoneMonitor.swift` = 504 LOC | `wc -l` | MEASURED | direct count | high |
| Supported recognition languages (UI) | 7 | `Aura/ContentView.swift:28-36` | MEASURED | count of `languageChoices` entries (en_US, en_GB, hi_IN, es_ES, fr_FR, de_DE, ja_JP) | high |
| Languages claimed in README | "English, Spanish, Hindi, and more" | `Readme.md:20-23` | MEASURED (claim) | README text; actual recognizer availability depends on installed on-device models | medium |
| Languages verified live in demo | ≥2 (English + Japanese switch shown) | demo-video transcript | DEMO-CONFIRMED | English default + live switch to Japanese shown on video | high |
| Sound classes confirmed live | ≥3 (emergency vehicle/siren, clapping, whispering) | demo-video transcript | DEMO-CONFIRMED | named + shown firing on video; Apple's classifier supports many more | high |
| Multi-speaker transcription | yes (2nd speaker transcribed live) | demo-video transcript | DEMO-CONFIRMED | second person spoke; captured + "whispering" detected | high |
| Abbreviation guard set size | 25 entries | `Aura/ContentView.swift:262-266` | MEASURED | counted (anchors doc says 26 — off by one) | high |
| Audio buffer size | 1024 frames | `Aura/MicrophoneMonitor.swift:43` | MEASURED | `bufferSize` constant | high |
| Buffer duration | ~23 ms | `:43` + assumed 44.1 kHz | ESTIMATED | 1024/44100 = 23.2 ms; sample rate not pinned in code (uses `inputNode.outputFormat`) | medium |
| Pause threshold (sentence break) | 1.1 s | `Aura/MicrophoneMonitor.swift:59` | MEASURED | `pauseThreshold` constant | high |
| Min classification confidence | 0.6 | `:52` | MEASURED | `minConfidence` constant | high |
| Hysteresis drop | 0.1 (→0.5 same-label floor) | `:53`, `:343` | MEASURED | constants | high |
| Classification throttle | 0.25 s (≤4 updates/s) | `:51`, `:346` | MEASURED | constant; per-second derived | high |
| Texture debounce (immersive) | 0.1 s (~10 Hz) | `Aura/ImmersiveView.swift:24` | MEASURED | `refreshDebounceSeconds` | high |
| Text debounce (2D) | 0.15 s (~6.7 Hz) | `Aura/ContentView.swift:22` | MEASURED | constant | high |
| HUD smoothing (lerp) | 0.35 per frame | `Aura/ImmersiveView.swift:28` | MEASURED | `hudSmoothing` | high |
| HUD distance / lift / floor | 0.6 m / 0.25 m / 1.2 m | `Aura/ImmersiveView.swift:27-30` | MEASURED | constants | high |
| Spatial panel mesh size | 1.05 × 0.62 m, cornerRadius 0.06 | `Aura/ImmersiveView.swift:152-153` | MEASURED | code | high |
| Texture canvas size | 520 × 300 pt | `Aura/ImmersiveView.swift:34-35` | MEASURED | constants | high |
| Tail lines shown | 6 (immersive) / 8 (2D) | `Aura/ImmersiveView.swift:33`, `ContentView.swift:14` | MEASURED | constants | high |
| Max azimuth mapping | ±90° | `Aura/MicrophoneMonitor.swift:48` | MEASURED | `maxAzimuthDegrees` | high |
| Sound-history ring size | 3 | `:240` / `ContentView.swift:67` | MEASURED | `prefix(3)` | high |
| Vision Pro render rate | 90 Hz | `ANCHORS.txt:60` | INFERRED | visionOS platform fact, not set in repo | medium |
| External dependencies | 0 | `Readme.md:63`; no Package.resolved/Podfile | MEASURED | absence of manifests | high |
| Git commits (Rajat) | 6 (all code in 2) | `git log --author="Rajat Savdekar"` | MEASURED | log | high |
| Hackathon result | 2nd place | author-confirmed 2026-06-25 | AUTHOR-CONFIRMED | not in repo; verify via event records | high |
| Production users / adoption (beyond hackathon) | — | none | NEEDS-INPUT | not in repo | — |

**Dropped performance estimates from `ANCHORS.txt` (no benchmark artifact):** ~30–80 ms on-device latency, ~200–500 ms cloud RTT avoided, ~66% rasterization CPU reduction, ~8× vDSP speedup.

---

## 8. Evidence index (reverse direction)

| Claim ID | Evidence |
|---|---|
| Identity / on-device | `Readme.md:3-13`; `Aura/MicrophoneMonitor.swift:240` |
| Solo code / team Readme-only | `git shortlog -sne`; `git log --all --oneline`; `git log --diff-filter=A -- Aura/*.swift` |
| Author email mismatch | `git log --author="rajatsavdekar@gmail.com"` → empty; commits as `RDX-Rajat-Savdekar` |
| Dual ML pipeline | `Aura/MicrophoneMonitor.swift:144-149`, `:155`, `:157-163` |
| Shared tap RMS/azimuth | `Aura/MicrophoneMonitor.swift:165-204` |
| On-device enforcement | `Aura/MicrophoneMonitor.swift:240-241`, `:263-264` |
| Utterance temporal segmenter | `Aura/MicrophoneMonitor.swift:373-471` |
| Sentence splitter / abbrevs | `Aura/ContentView.swift:258-342` |
| Hysteresis classifier | `Aura/MicrophoneMonitor.swift:342-356` |
| Locale hot-swap | `Aura/MicrophoneMonitor.swift:299-333` |
| Texture-baked HUD | `Aura/ImmersiveView.swift:311-342` |
| Debounce | `Aura/ImmersiveView.swift:284-300`; `Aura/ContentView.swift:248-255` |
| Billboard / NaN guards | `Aura/ImmersiveView.swift:256-282`, `:201-205` |
| MainActor bridging | `Aura/MicrophoneMonitor.swift:482-495`; `Aura/AVPlayerViewModel.swift:48-52` |
| ImmersiveView NOT wired | `Aura/AuraApp.swift:9-15` (WindowGroup only); grep: no `ImmersiveSpace(id:` scene, `ToggleImmersiveSpaceButton` unreferenced |
| AVKit scaffold non-functional | `Aura/AVPlayerViewModel.swift:16-20` (`videoURL = nil`) |
| Template files | `Aura/AppModel.swift`, `Aura/ToggleImmersiveSpaceButton.swift`, `Aura/Untitled.swift` (empty) |
| Tech stack / target | `Aura.xcodeproj/project.pbxproj:172-173`, `:182`, `:187`, `:287` |
| Author's anchor doc | `AMAZON_INTERVIEW_TECHNICAL_ANCHORS.txt` (whole file) |

---

## 9. NEEDS HUMAN INPUT (the handoff)

**Resolved 2026-06-25 (author + demo-video transcript):**
- ✅ **Author identity:** `RDX-Rajat-Savdekar@users.noreply.github.com` confirmed as the author. (The `rajatsavdekar@gmail.com` filter simply doesn't appear in git history.)
- ✅ **Outcome:** Won **2nd place**; demo video published on YouTube (`Readme.md:91`) and demoed live.
- ✅ **Demoed live (footage exists):** the **2D captioning + live sound classification (siren→"emergency vehicle", clapping, whispering) + multi-speaker transcription + Japanese language switch + the RealityKit spatial captioning panel** were all shown working on video. Caveat: the committed HEAD does not wire `ImmersiveView` into a scene, so the spatial demo ran from a different build/branch — be ready to explain this if someone inspects this commit.
- ✅ **Languages:** ≥2 verified live (English + Japanese); 7 selectable in the picker.
- ✅ **Model decision:** evaluated training custom models, chose Apple's recently-released on-device Core ML models (D7, §4). Claim "evaluated training, chose Apple's models," not "trained a model."
- ✅ **Performance numbers dropped** (see §7).

**Still open:**
- **Sample rate:** the ~23 ms buffer figure assumes 44.1 kHz; the code reads `inputNode.outputFormat`. Confirm device sample rate if you want to cite buffer latency.
- **Spanish/Hindi/etc.:** beyond English + Japanese, how many of the other 5 picker locales did you verify actually transcribing on-device? (Claim "7 selectable, N verified".)
- **Azimuth feature:** README says directional audio is "early code … UI does not display sound direction" (`Readme.md:69-72`); azimuth is computed but unused in UI. Don't claim directional awareness as a shipped feature.
- **Production usage** beyond the hackathon demo (if any).

---

### Areas deliberately NOT crawled
- `Packages/RealityKitContent/` (Reality Composer Pro package: `.rkassets`, USD/binary 3D media, `.swiftpm` user data) — asset bundle, not author source logic.
- `Aura/Assets.xcassets/` (app-icon layer PNGs, color sets) — binary assets.
- Xcode user data (`xcuserdata`, `xcschemes`), `.DS_Store`, and the full `project.pbxproj` (only build-relevant settings grepped, not the whole file).
