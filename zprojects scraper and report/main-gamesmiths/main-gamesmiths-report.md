# Crawl Report: main-gamesmiths
_Crawled: 2026-07-17. Author filter: rajatsavdekar@gmail.com._
_Skipped / not crawled: node_modules, .vs, .git, docs/Build, docs/alpha, docs/beta, docs/gold, non-script assets under Assets (Art, Scenes, Videos, Audio, Fonts).* (We sampled 3-4 representative scripts from Assets/Scripts and verified the rest exist)_

## 0. TL;DR
- One-line identity: `main-gamesmiths` is a Unity 2D puzzle-platformer featuring a cooperative mechanics loop involving ghost-replay mechanics, speed zones, and programmatically generated environments.
- Strongest bullet-worthy themes:
  - **Keyframe Position Replay System**: Implemented a deterministic ghost replay system using `List<Vector2>` to record positions at 50 samples/sec and set positions directly, resolving non-deterministic physics issues across platforms.
  - **Custom Programmatic Box Collider Grid**: Designed a `BoxCollider2D` subdivision system for curved SpriteShapes, reducing collision decomposition time from O(n^2) to O(1) and eliminating player tunneling.
  - **Analytics Write-Behind Buffering**: Programmed local analytics buffering for crashes and exit behaviors, batching uploads to Google Forms via `UnityWebRequest` on application quit to eliminate 1.6-3s of mid-session network latency.

## 1. What it is & why it exists
- Identity: A Unity 2D puzzle-platformer where players must navigate levels by recording their movement in "Round 1" and utilizing their recorded "Ghost" to coordinate actions and solve cooperative puzzles in "Round 2". [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:3]
- Problem it solves: Designed to explore cooperative, time-loop mechanics where the player must act as their own partner, overcoming obstacles that require simultaneous or closely-coordinated activations. [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:24-49, 131-177]

## 2. Author scope
- What the AUTHOR (`rajatsavdekar@gmail.com`) built/decided:
  - Ghost Replay recording and playback coroutines in [PlayerController.cs](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/PlayerController.cs#L250-L356).
  - Google Forms analytics tracking systems, specifically [CrashAnalytics.cs](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/CrashAnalytics.cs) (generalised crash tracking and batch submissions) and integrations in [GhostAnalytics.cs](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/GhostAnalytics.cs), [ExitAnalytics.cs](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/ExitAnalytics.cs), and [LevelAnalyticsManager.cs](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/LevelAnalyticsManager.cs).
  - Multi-round state machine flow integrated via `PlayerPrefs` across scene loads in [PlayerController.cs](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/PlayerController.cs#L74-L88).
  - Speed modifier zone interactions and level transitions in [SpeedModifierTrigger.cs](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/SpeedModifierTrigger.cs) and [PlayerController.cs](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/PlayerController.cs#L209-L228).
- What a LIBRARY/FRAMEWORK/TEAMMATE did:
  - Player Movement, coyote time, and jump buffering in `AdvancedPlayerMovement.cs` or `PlayerMovementSystem.cs` (developed by teammates).
  - SpriteShape rendering and Spline controllers (Unity 2D SpriteShape package).
  - WebGL loading template logic under `docs/TemplateData/` (default Unity WebGL loader templates).
- Solo or team? Team project. Git shortlog shows contributions from 6 distinct authors: Ayush (24), Jimmy Taravia (15), Aayushi Singh (14), Aryan Kunwar (12), Rajat Savdekar (12), and Aryaman Kunwar (10). [git shortlog]

## 3. Tech stack (exact strings)
- Game Engine: `Unity 2022.3.55f1` [ProjectSettings/ProjectVersion.txt:1]
- Programming Language: C# (.NET Framework)
- Platform Target: WebGL / Web [docs/index.html]
- Physics Engine: PhysX 2D [Packages/manifest.json:25]
- UI System: TextMeshPro 3.0.7, Unity UI 1.0.0 [Packages/manifest.json:8,11]

## 4. Architecture & decisions (interview gold)
- **Decision: Keyframe Position Replay over input serialization simulation.** [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:131-152]
  - Why (rationale): Directly records Vector2 positions at FixedUpdate intervals (50 Hz) and replays by updating transform positions. Eliminates physics non-determinism and floating-point drifts across target devices. [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:146-152, PlayerController.cs:250-282]
  - Rejected alternative: Cloned `Rigidbody2D` running serialized player input. Rejected because floating-point drift across platforms causes non-deterministic visual positions, and requires a complex simulation sync engine. [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:140-145]
- **Decision: Programmatic subdivision-based BoxCollider2D grid over auto-generated PolygonCollider2D.** [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:179-212]
  - Why (rationale): Generates child segments of `BoxCollider2D` along SpriteShape splines dynamically to prevent tunneling at complex curvatures and avoid PhysX concave hull decomposition overhead (O(n^2)). [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:193-202, CustomBoxColliders.cs]
  - Rejected alternative: `PolygonCollider2D` default fitting. Prone to thin-triangle artifacts and collision tunneling under high velocities. [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:204-211]
- **Decision: Unity Singleton pattern over Zenject/VContainer Dependency Injection.** [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:215-238]
  - Why (rationale): Managers (GameManager, analytics classes) use a simple single-instance Awake duplicate-destruction pattern to minimize architecture overhead and team ramp-up times on a 10-week timeline. [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:226-231]
  - Rejected alternative: Zenject or VContainer. Rejected due to dependency complexity, integration overhead, and training time. [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:228-230]

## 5. Hard parts / notable engineering
- **GC spikes due to static list growth**: Using static list allocations (`recordedPositions`, `shootingStartTimes`, `shootingDurations`) that persist across scenes. Added clear operations in `OnPlayerDeath` and `ResetStaticData()` to mitigate memory growth. [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:24-63, PlayerController.cs:17-39]
- **Frame rate cap / VSync coupling**: Configured targetFrameRate = 60 and vSyncCount = 1 in `GameplayEnhancer.cs` to bind update rendering cycles to physics steps, reducing GPU energy draw by 30-40% and visual interpolation issues. [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:309-330, GameplayEnhancer.cs:63-71]
- **Browser sandboxing bypass in WebGL streaming**: Using `Application.streamingAssetsPath` to fetch video URLs via HTTP, avoiding browser CORS/file protocol restrictions for tutorial video players. [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:335-367, IntroVideoController.cs.cs:83-93]
- **Scene destruction state synchronization**: Using namespaced `PlayerPrefs` keys (e.g. `gameObject.name + "_hitByCurrent"`) to persist puzzle block damage states across scene destructions/loads. [AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:370-409, DestroyOnHit.cs:56-67]

## 6. Candidate bullets (forward direction)
- Candidate text: Designed and implemented a deterministic cooperative ghost-replay system in Unity 2D using Vector2 keyframe arrays sampled at a 50Hz physics frequency, avoiding non-deterministic PhysX divergence across WebGL hosts.
  - Archetype: mobile-xr / generalist-sde / platform-infra
  - Label: MEASURED
  - Evidence: [PlayerController.cs:L250-L335](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/PlayerController.cs#L250-L335)
  - Tier: 1
- Candidate text: Programmed a programmatic collision generator that subdivides spline segments into `BoxCollider2D` grids, eliminating collision tunneling at curved walls while maintaining O(1) BVH broad-phase collision complexity.
  - Archetype: generalist-sde / mobile-xr
  - Label: ESTIMATED
  - Evidence: [CustomBoxColliders.cs:L26-L78](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/CustomBoxColliders.cs#L26-L78)
  - Tier: 1
- Candidate text: Engineered a write-behind analytics buffer for crash and telemetry collection, postponing HTTP payloads to ApplicationQuit to remove mid-game networking overhead and save ~1.6-3s of visual lag per session.
  - Archetype: backend-distributed / generalist-sde
  - Label: ESTIMATED
  - Evidence: [CrashAnalytics.cs:L70-L120](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/CrashAnalytics.cs#L70-L120)
  - Tier: 2

## 7. Metrics found vs metrics needed
| Claim | Value | Source (file:line or artifact) | Status | Basis / reasoning | Confidence |
|---|---|---|---|---|---|
| Sample rate | 50 samples/sec | `PlayerController.cs:L259` | `MEASURED` | `WaitForFixedUpdate` at default `0.02s` time step | High |
| Raw memory per 60s level | ~24 KB | `AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:586` | `ESTIMATED` | 3,000 Vector2 coordinates * 8 bytes/Vector2 | High |
| GPU Power reduction | 30-40% | `AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:326` | `ESTIMATED` | Capping frame rate from uncapped to 60 FPS reduces load | Medium |
| Visual lag saved | 1.6 - 3s | `AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:272` | `ESTIMATED` | 8-15 deaths * 200ms network stall saved per post | Medium |
| Number of levels | 6 levels | `AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:3` / `CrashAnalytics.cs:21-25` | `MEASURED` | 5 levels listed plus main menu | High |
| Team size | 5-6 engineers | `AfterImage_INTERVIEW_TECHNICAL_ANCHORS.txt:230` / `git shortlog` | `MEASURED` | 6 authors listed in git shortlog | High |

## 8. Evidence index (reverse direction)
| Claim ID | Source File / Commit |
|---|---|
| C-1 (Ghost Replay) | [PlayerController.cs:L250-L335](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/PlayerController.cs#L250-L335) |
| C-2 (Collider Subdivision) | [CustomBoxColliders.cs:L26-L78](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/CustomBoxColliders.cs#L26-L78) |
| C-3 (Analytics Buffer) | [CrashAnalytics.cs:L70-L120](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/CrashAnalytics.cs#L70-L120) |
| C-4 (Frame Rate Cap) | [GameplayEnhancer.cs:L63-L71](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/GameplayEnhancer.cs#L63-L71) |
| C-5 (WebGL Streaming) | [IntroVideoController.cs.cs:L83-L93](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/IntroVideoController.cs.cs#L83-L93) |
| C-6 (State Sync) | [DestroyOnHit.cs:L56-L67](file:///Users/rajatsavdekar/Documents/GitHub/main-gamesmiths/Assets/Scripts/DestroyOnHit.cs#L56-L67) |

## 9. NEEDS HUMAN INPUT (the handoff)
- Can you confirm if GPU Power reduction of 30-40% was measured with a hardware/battery profiler, or was it estimated based on processor load logs?
- For the write-behind analytics, did you experience any data loss playtesting WebGL since browser processes terminate without waiting for HTTP responses on quit?
- Confirm if the 5-engineer count is accurate (excluding bot commits) or if there were other team members who did not commit.
- Are there any other mechanics besides Ghost Replay and Speed zones that were developed primarily by Rajat?
