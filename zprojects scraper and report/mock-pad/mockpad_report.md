# Crawl Report: MockPad

_Crawled: 2026-06-25. Author filter: requested `rajatsavdekar@gmail.com`, but **git history contains zero commits under that email**. All 20 commits are authored by `Rajat Savdekar <156324870+RDX-Rajat-Savdekar@users.noreply.github.com>` (GitHub noreply). Treated as the same author (solo repo). Confirm this is you — see §9._

---

## 0. TL;DR

- **Identity:** MockPad is a free, real-time collaborative code-editor web app for technical mock interviews (a CoderPad clone), built on Yjs CRDTs. `CLAUDE.md:29-31`, `client/src/pages/Home.jsx:61`.
- Strongest bullet-worthy themes (headlines):
  1. **CRDT-based real-time collaboration** — shared Monaco code editor, presence/cursors, roles, timer, notes, and whiteboard all synced through a single Yjs `Y.Doc` per room. `client/src/hooks/useYjs.js`, `client/src/pages/Room.jsx:80`.
  2. **Bidirectional Excalidraw ↔ Yjs whiteboard sync** with hand-rolled echo-loop suppression and a `Float32Array` pressure-restore fix. `client/src/components/Whiteboard.jsx:8-15,99-106`.
  3. **Server-side room lifecycle management** — LevelDB persistence + dual TTL (30-min inactivity, 2-hr hard) auto-cleanup + manual end-room HTTP endpoint. `server/index.js:7-39,59-73`.
  4. **WebRTC peer-to-peer audio + dual-stream call recording** — fully implemented hook that was **intentionally cut from the product** (author scoping decision: defer voice to users' existing tools — Zoom/Meet/Discord — rather than rebuild it). Real engineering done, deliberately not shipped (§2, §4). `client/src/hooks/useWebRTC.js`.
  5. **Full deploy pipeline** — Vercel (frontend) + DigitalOcean/pm2 (backend) via GitHub Actions SSH deploy. `.github/workflows/deploy.yml`, `client/vercel.json`.

---

## 1. What it is & why it exists

- **Identity (1 sentence):** A two-part (React SPA + Node WebSocket) web app that lets an interviewer and interviewee share a live code editor, whiteboard, notes, timer, and code execution in one browser room. [MEASURED] `CLAUDE.md:29-31`, `client/src/App.jsx:8-12`.
- **Problem it solves:** Provides a free alternative to paid interview platforms (CoderPad/HackerRank). The marketing copy states "Free real-time collaborative code editor for mock interviews." [MEASURED] `client/src/pages/Home.jsx:61`, `useCodeRunner.js:3` ("free, no API key required").
- **Why built / motivation beyond the tagline:** Not stated in repo. [NEEDS-INPUT]

---

## 2. Author scope

**What the AUTHOR appears to have built/decided** [MEASURED + evidence]:
- The Yjs coordination layer: which collaborative state lives in `getText('monaco')` vs `getMap('shared')` vs `getMap('whiteboard')`, and the `sharedMap.set(...)` convention for all cross-user state. `client/src/pages/Room.jsx:80`, `client/src/hooks/useYjs.js:57,77`.
- Manual CSS injection for remote Monaco cursors/labels — author explicitly notes y-monaco "creates decoration elements ... but never injects the actual CSS — we have to do it ourselves." `client/src/hooks/useYjs.js:8-35`.
- Whiteboard echo-loop prevention (`isLocalRef`/`isRemoteRef`) and the freedraw `Float32Array` restore. `client/src/components/Whiteboard.jsx:8-15,30-106`.
- Server room-lifecycle logic: connection tracking, inactivity + hard TTL timers, LevelDB doc clearing, the `/end-room` endpoint. `server/index.js:11-95`.
- Role assignment state machine (1st→interviewer, 2nd→interviewee, rest→viewer) and role swap. `client/src/pages/Room.jsx:147-160,302-311`.
- A from-scratch WebRTC signaling/call/recording hook over Yjs awareness. `client/src/hooks/useWebRTC.js:31-217`.
- Custom vertical-resize hook using raw mouse events (instead of the panel library). `client/src/pages/Room.jsx:17-45`.
- Timer with stopwatch/countdown modes, progress ring, presets, custom parse. `client/src/components/Timer.jsx`.
- Session summary export (markdown + Excalidraw SVG). `client/src/components/SummaryModal.jsx`.
- Deterministic user color from userId hash (HSL→hex). `client/src/utils/roomId.js:34-54`.

**What a LIBRARY/FRAMEWORK did (do NOT credit author):**
- The CRDT merge/conflict-resolution algorithm itself: **Yjs** (`yjs@^13.6.30`) + **y-websocket** + **y-monaco** + **y-leveldb**. `client/package.json:20-22`, `server/package.json:14-17`.
- WebSocket sync protocol and persistence plumbing: `y-websocket/bin/utils` `setupWSConnection`/`setPersistence`. `server/index.js:3`.
- The code editor: **Monaco** via `@monaco-editor/react`. `client/src/components/Editor.jsx:1`.
- The whiteboard canvas/drawing/SVG export: **Excalidraw**. `client/src/components/Whiteboard.jsx:2`, `SummaryModal.jsx:3`.
- Code execution/sandboxing: **Judge0 CE** public instance (third-party API). `client/src/hooks/useCodeRunner.js:3,11`.
- Panel resizing (horizontal split): `react-resizable-panels`. `client/src/pages/Room.jsx:3`.

**Solo or team?** Solo. `git shortlog -sne --all` returns exactly one author (20 commits). [MEASURED]

**Honesty flag — built then deliberately cut:** `useWebRTC.js` and `AudioControls.jsx` are fully implemented but **never imported** by `Room.jsx` or any rendered component (grep confirms the symbols appear only in their own definition files), so audio calling is **not reachable in the running app**. Per the author, this was an **intentional product decision** — rather than rebuild voice/video inside MockPad ("building all things in one"), users are directed to their own choice of tool (Zoom / Google Meet / Discord). So the correct framing is "prototyped, then scoped out," not "broken/unfinished." Still: do not claim production audio calling exists. `client/src/hooks/useWebRTC.js`, `client/src/components/AudioControls.jsx` (no importers). [author-confirmed decision]

---

## 3. Tech stack (exact strings)

| Layer | Technology | Evidence |
|---|---|---|
| Language | JavaScript (ES modules, JSX) | `client/package.json:5`, `server/package.json:12` (CommonJS) |
| Frontend framework | React 19 | `client/package.json:15-16` |
| Build tool | Vite 8 | `client/package.json:33`, `client/README.md:1` |
| Router | react-router-dom 7 | `client/package.json:19`, `client/src/App.jsx:1` |
| Editor | Monaco via `@monaco-editor/react` 4.7 | `client/package.json:14` |
| CRDT / realtime | Yjs 13.6, y-websocket 2.1, y-monaco 0.1 | `client/package.json:20-22` |
| Whiteboard | `@excalidraw/excalidraw` 0.18 | `client/package.json:13` |
| Markdown render | react-markdown 10 | `client/package.json:17` |
| Layout | react-resizable-panels 4.9 | `client/package.json:18` |
| Server runtime | Node.js (CommonJS), `node:20-alpine` in Docker | `server/package.json:12`, `server/Dockerfile:1` |
| WebSocket server | `ws` 8.20 + y-websocket | `server/package.json:14,16` |
| Persistence | LevelDB via `y-leveldb` 0.2 | `server/package.json:15`, `server/index.js:4,10` |
| Code execution | Judge0 CE (`https://ce.judge0.com`) | `client/src/hooks/useCodeRunner.js:11` |
| Audio (prototyped, cut) | Browser WebRTC + Google STUN servers | `client/src/hooks/useWebRTC.js:3-6` |
| Analytics | Umami (cloud) | `client/index.html` (`cloud.umami.is/script.js`) |
| Frontend deploy | Vercel | `client/vercel.json` |
| Backend deploy (confirmed) | DigitalOcean + pm2 via GitHub Actions SSH | `.github/workflows/deploy.yml:13-27` |
| Stale config (unused — author confirmed DigitalOcean) | Fly.io | `server/fly.toml` |
| Lint | ESLint 9 | `client/package.json:29` |

---

## 4. Architecture & decisions (interview gold)

**Decision 1 — Single `Y.Doc` per room as the one source of truth; no REST/DB for app state.**
- Why: everything collaborative (code, language, output, roles, timer, notes, interview type, paste events, whiteboard) flows through one CRDT doc, so conflict resolution and offline merge are free. `CLAUDE.md:33-44`, `client/src/pages/Room.jsx:80`.
- Rejected alternative: a REST API for state — explicitly rejected: "No REST API — all state is Yjs." `CLAUDE.md:27`. (The only HTTP endpoint is `/end-room`, an out-of-band lifecycle action. `server/index.js:59`.)

**Decision 2 — Inject Monaco remote-cursor CSS manually instead of relying on y-monaco.**
- Why: y-monaco emits `yRemoteSelection-{clientID}` decoration classes but ships no CSS, so cursors/labels would be invisible. Author generates `<style>` rules per remote client. `client/src/hooks/useYjs.js:8-35`.
- Rejected alternative: none documented (this is a workaround for library behavior).

**Decision 3 — Two-flag echo-loop guard for Excalidraw↔Yjs sync.**
- Why: Excalidraw's `onChange` and Yjs's `wbMap.observe` would ping-pong; `isLocalRef`/`isRemoteRef` set synchronously around writes prevents `updateScene` firing mid-stroke (which would reset the stroke). `client/src/components/Whiteboard.jsx:30-106`.
- Rejected alternative (implied): relying on Yjs `event.transaction.local` — comment says the synchronous ref check "reliably skips our own writes **without** event.transaction.local." `Whiteboard.jsx:55-57`.

**Decision 4 — Restore freedraw `pressures` as `Float32Array` after JSON round-trip.**
- Why: `JSON.stringify` turns the typed array into a plain array and Excalidraw then "collapse[s] to a dot." `client/src/components/Whiteboard.jsx:5-15`.
- Rejected alternative: none — bug fix.

**Decision 5 — Dual room TTL + in-memory connection tracking on the server.**
- Why: free-tier resource hygiene; rooms self-destruct 30 min after last user leaves, with a 2-hr hard ceiling from creation. `server/index.js:7-8,26-39`.
- Rejected alternative: none documented. (Commit progression shows it evolved: `d0a5192` "rooms expire after 2 hours" → `39097b0` "30min inactivity + 2h hard TTL".)

**Decision 6 — Build WebRTC audio over Yjs awareness, then CUT it from the product. [author-confirmed]**
- Why built that way: reuses the existing awareness channel to exchange SDP offers/answers/ICE candidates (no separate signaling server), with `ts`-based dedupe. `client/src/hooks/useWebRTC.js:31-41,144-154`.
- Why cut: author decided not to rebuild voice/video inside MockPad and instead let interviewers/interviewees use their existing tool of choice (Zoom / Google Meet / Discord). This is a **scoping/product-judgment decision** — strong interview material (knowing what *not* to build). Rejected alternative = shipping an in-app call; chosen path = lean on established tools.

**Decision 7 — Use the FREE public Judge0 CE instance with no API key (verified by tracing the Run button).**
- What actually happens on Run: `Room.jsx:316` calls `runCode()`, which `fetch`es `https://ce.judge0.com/submissions?base64_encoded=false&wait=true` with only a `Content-Type: application/json` header and a `{ source_code, language_id }` body — **no auth header**. `client/src/hooks/useCodeRunner.js:21-28`.
- Why it works without the key on git: the public CE instance requires no key, so execution is unaffected by whether any key exists. The `VITE_JUDGE0_KEY` in `client/.env` is **never read** by any code path (the only `import.meta.env` reads in the repo are `VITE_WS_SERVER`). It is leftover/unused config and can be deleted with zero effect. `client/.env:1`, grep of `import.meta.env`.

---

## 5. Hard parts / notable engineering

- **Echo-loop suppression across two reactive systems** (Excalidraw + Yjs) using synchronous refs rather than transaction origin checks. [MEASURED] `client/src/components/Whiteboard.jsx:30-106`.
- **Typed-array survival through JSON serialization** for freedraw pressure data. [MEASURED] `Whiteboard.jsx:8-15`.
- **Race handling in role/presence sync** — remote role assignments arrive after awareness, so presence is re-read at 500/1500/3000 ms after each awareness change. [MEASURED] `client/src/pages/Room.jsx:104-112`.
- **WebRTC perfect-negotiation-ish flow**: buffering ICE candidates until `remoteDescription` is set, signal dedupe via `from-type-ts` keys, mixing local mic + remote track into one `MediaRecorder` for a single conversation file. [MEASURED, but unwired] `client/src/hooks/useWebRTC.js:101-135,182-217`.
- **Clock-drift-free timer** — stores `timerStartedAt` + `timerElapsed` in Yjs and recomputes elapsed locally, so all clients render the same countdown. [MEASURED] `client/src/components/Timer.jsx:36-42`.
- **Server-side lifecycle TTLs with manual override endpoint.** [MEASURED] `server/index.js:16-73`.
- **Dead config note (for §9):** `client/.env` contains a real-looking `VITE_JUDGE0_KEY` (RapidAPI-style). Verified **unused** — Run hits the public CE instance with no auth header, and no code reads the key. Gitignored (`.gitignore:3`). Not a live security exposure for the app, but stale; delete it to avoid confusion (and rotate if it's a valid key reused elsewhere). `client/.env:1`, `useCodeRunner.js:21-28`.

---

## 6. Candidate bullets (forward direction)

> Plain candidate text for the human to edit. Not final resume lines.

1. **Real-time collaborative interview editor on Yjs CRDTs.**
   - Text: "Built a real-time collaborative mock-interview web app (React 19 + Node) where a shared Monaco editor, presence cursors, roles, timer, notes, and whiteboard all sync through a single Yjs CRDT document per room."
   - Archetype: full-stack / backend-distributed.
   - Label: MEASURED. Evidence: `client/src/hooks/useYjs.js`, `client/src/pages/Room.jsx:80`. Tier: 1.

2. **Bidirectional whiteboard sync with echo-loop suppression.**
   - Text: "Integrated Excalidraw with Yjs for live multi-user drawing, preventing render-reset feedback loops with synchronous local/remote flags and fixing freedraw stroke corruption by restoring Float32Array pressure data after JSON sync."
   - Archetype: frontend / full-stack.
   - Label: MEASURED. Evidence: `client/src/components/Whiteboard.jsx:8-15,99-106`. Tier: 1.

3. **Server-side room lifecycle + persistence.**
   - Text: "Implemented a Node `ws` + y-websocket server persisting each room to LevelDB, with automatic cleanup (30-min inactivity and 2-hr hard TTL) and a manual end-room HTTP endpoint."
   - Archetype: backend-distributed / platform-infra.
   - Label: MEASURED. Evidence: `server/index.js:7-95`. Tier: 1.

4. **Peer-to-peer audio call + dual-stream recording over WebRTC (prototyped, then scoped out).**
   - Text: "Prototyped a WebRTC audio-call hook that signals SDP/ICE over Yjs awareness (no separate signaling server) and records both participants into a single WebM via AudioContext mixing — then deliberately cut it, choosing to let users bring their own voice tool (Zoom/Meet/Discord) rather than reimplement calling in-app."
   - Archetype: frontend / backend-distributed.
   - Label: MEASURED (code exists) + author-confirmed product decision (not shipped — see §2/§4). Evidence: `client/src/hooks/useWebRTC.js`. Tier: 2.
   - Note: frame as a *scoping decision*, not a shipped feature.

5. **Code execution across 4 languages via Judge0.**
   - Text: "Added in-editor code execution for Python, JavaScript, Java, and C++ using the public Judge0 CE API, syncing run output to all peers."
   - Archetype: full-stack / generalist-sde.
   - Label: MEASURED (count) / library-dependent (execution). Evidence: `client/src/hooks/useCodeRunner.js:4-9`, `Room.jsx:313-318`. Tier: 2.

6. **CI/CD to Vercel + DigitalOcean.**
   - Text: "Set up automated backend deploys to a DigitalOcean droplet via a GitHub Actions SSH workflow (pm2 restart) and hosted the frontend on Vercel."
   - Archetype: platform-infra.
   - Label: MEASURED (config present). Evidence: `.github/workflows/deploy.yml`, `client/vercel.json`. Tier: 2.

7. **Session summary export (markdown + SVG).**
   - Text: "Generated downloadable interview summaries (participants, duration, code, shared notes as markdown plus an Excalidraw whiteboard SVG)."
   - Archetype: frontend.
   - Label: MEASURED. Evidence: `client/src/components/SummaryModal.jsx:12-113`. Tier: 2/3.

---

## 7. Metrics found vs metrics needed

| Claim | Value | Source (file:line / artifact) | Status | Basis / reasoning | Confidence |
|---|---|---|---|---|---|
| Supported execution languages | 4 (Python, JavaScript, Java, C++) | `client/src/hooks/useCodeRunner.js:4-9` | MEASURED | `LANGUAGE_IDS` map has exactly 4 keys | high |
| Interview types | 4 (leetcode, system-design, behavioral, general) | `client/src/pages/Room.jsx:48` | MEASURED | array literal, 4 entries | high |
| User roles | 3 (interviewer, interviewee, viewer) | `client/src/pages/Room.jsx:151-155` | MEASURED | role assignment branches | high |
| Code pattern snippets in resource drawer | ~14 | `client/src/data/resources.js` (`name:` count = 14) | ESTIMATED | counted `name:` keys (each = one pattern card); a couple could be non-pattern keys | medium |
| Inactivity room TTL | 30 min | `server/index.js:7` | MEASURED | `INACTIVITY_TTL = 30 * 60 * 1000` | high |
| Hard room TTL | 2 hr | `server/index.js:8` | MEASURED | `HARD_TTL = 2 * 60 * 60 * 1000` | high |
| Timer presets | 30m / 45m / 1h | `client/src/components/Timer.jsx:7-11` | MEASURED | `PRESETS` array | high |
| STUN servers | 2 (Google) | `client/src/hooks/useWebRTC.js:3-6` | MEASURED | `ICE_SERVERS` array | high |
| Demo seed interview duration | 45 min | `client/src/pages/Room.jsx:174` | MEASURED | `45 * 60 * 1000` | high |
| Total commits | 20 | `git log --oneline \| wc -l` | MEASURED | git | high |
| Contributors | 1 (solo) | `git shortlog -sne --all` | MEASURED | single author entry | high |
| Active dev window | ~11 days (2026-04-06 → 2026-04-17) | `git log --date=short` | MEASURED | first/last commit dates; two bursts (Apr 6–8 build, Apr 17 deploy/polish) | high |
| Backend VM size | 256 MB / 1 shared CPU | `server/fly.toml:15-18` | ESTIMATED | from **unused** fly.toml; actual prod is DigitalOcean so the droplet spec is unknown — do NOT cite 256MB as the live size | low |
| Routes (frontend) | 2 (`/`, `/room/:roomId`) + catch-all redirect | `client/src/App.jsx:8-11` | MEASURED | Route definitions | high |
| Server HTTP endpoints | 1 (`POST /end-room`) | `server/index.js:59` | MEASURED | only handled route | high |
| Concurrent users per room (intended) | ~2 active + N viewers | `client/src/pages/Room.jsx:151-155`, `222` | ESTIMATED | role model caps named roles at interviewer+interviewee; countdown triggers at 2nd join; viewers unbounded | low |
| Unique visitors (Apr 17 – Jun 22, 2026) | 18 | Umami dashboard screenshot | MEASURED | analytics "Visitors" tile | high |
| Visits / sessions (same window) | 18 | Umami dashboard screenshot | MEASURED | analytics "Visits" tile | high |
| Page views (same window) | 21 | Umami dashboard screenshot | MEASURED | analytics "Views" tile | high |
| Bounce rate | 89% | Umami dashboard screenshot | MEASURED | analytics "Bounce rate" tile | high |
| Avg visit duration | 31s | Umami dashboard screenshot | MEASURED | analytics "Visit duration" tile | high |
| Geographic reach | 2 countries (US 83%, India 17%) | Umami dashboard screenshot | MEASURED | Location panel | high |
| Top referrer | bing.com (100% of referred) | Umami dashboard screenshot | MEASURED | Sources/Referrers panel | high |
| Code-run latency / throughput | — | no benchmark artifact | NEEDS-INPUT | depends on public Judge0 CE | — |
| Sync latency under load / max rooms | — | no load test in repo | NEEDS-INPUT | no benchmark script exists | — |

---

## 8. Evidence index (reverse direction)

| Claim ID | Claim | Evidence |
|---|---|---|
| C1 | Single Y.Doc per room; shared maps | `client/src/pages/Room.jsx:80`, `client/src/hooks/useYjs.js:57,77`, `CLAUDE.md:33-44` |
| C2 | Manual Monaco remote-cursor CSS | `client/src/hooks/useYjs.js:8-35` |
| C3 | Excalidraw↔Yjs echo-loop guard | `client/src/components/Whiteboard.jsx:30-106` |
| C4 | Float32Array pressure restore | `client/src/components/Whiteboard.jsx:5-15` |
| C5 | Room TTL cleanup (30m/2h) | `server/index.js:7-39` |
| C6 | Manual end-room endpoint | `server/index.js:59-73`, `client/src/pages/Room.jsx:275-285` |
| C7 | Role assignment + swap | `client/src/pages/Room.jsx:147-160,302-311` |
| C8 | WebRTC hook (signaling/record) | `client/src/hooks/useWebRTC.js:31-217` |
| C9 | WebRTC/AudioControls NOT imported | grep: symbols only in `useWebRTC.js`, `AudioControls.jsx` |
| C10 | Judge0 4-language execution | `client/src/hooks/useCodeRunner.js:4-11` |
| C11 | Judge0 key in .env unused | `client/.env:1`, `useCodeRunner.js:18-28` |
| C12 | Clock-drift-free timer | `client/src/components/Timer.jsx:36-42` |
| C13 | Summary export md+svg | `client/src/components/SummaryModal.jsx:12-113` |
| C14 | Deterministic user color | `client/src/utils/roomId.js:34-54` |
| C15 | CI/CD DigitalOcean SSH + Vercel | `.github/workflows/deploy.yml`, `client/vercel.json` |
| C16 | Umami analytics | `client/index.html` |
| C17 | Solo, 20 commits, Apr 6–17 | `git shortlog`, `git log --date=short` |
| C18 | Custom vertical-resize hook | `client/src/pages/Room.jsx:17-45` |

---

## 9. NEEDS HUMAN INPUT (the handoff)

**Identity / authorship**
- The git author email is `156324870+RDX-Rajat-Savdekar@users.noreply.github.com`, **not** the `rajatsavdekar@gmail.com` you gave. Confirm both are you (likely yes), or the report may mis-attribute.

**Scope ambiguities (build vs integrate)**
- ~~WebRTC audio call: shipped or abandoned?~~ **RESOLVED (author):** prototyped, then intentionally cut — direct users to Zoom/Meet/Discord. Frame as a scoping decision, never as a live feature.
- ~~`fly.toml` vs DigitalOcean — which hosts the backend?~~ **RESOLVED (author):** backend is **DigitalOcean-hosted** (matches `deploy.yml` SSH+pm2). `fly.toml` is therefore stale/unused config — consider deleting it. `.github/workflows/deploy.yml`, `server/fly.toml`.
- ~~Judge0 API key — why not on git / is it needed?~~ **RESOLVED (verified):** the key is never used; Run hits the free public CE instance. Delete `VITE_JUDGE0_KEY` from `.env`. `useCodeRunner.js:21-28`.
- Be careful crediting CRDT conflict resolution, Monaco, and Excalidraw behavior — those are libraries; your work is the integration/glue.

**Confirm/correct ESTIMATED rows**
- "~14 code pattern snippets" — verify exact count (low/medium confidence).
- "~2 active users + N viewers per room" — confirm intended/observed concurrency (low confidence).
- Backend VM "256 MB / 1 CPU" — confirm actual production sizing (Fly config may not be what's deployed).

**Metrics with no repo anchor (and how to make them defensible)**
- ~~Real usage~~ **PARTIALLY RESOLVED (Umami screenshot):** 18 visitors / 18 visits / 21 views over Apr 17 – Jun 22 2026, 89% bounce, 31s avg, US+India, bing referrer. Honest framing: this is **early/light real traffic (single-digit-to-tens of visitors), not adoption at scale** — present it that way; do not inflate. If you want a stronger number, report a longer window or "rooms created" if Umami tracks the room-path events. The high bounce + 31s avg suggests mostly landing-page visits, not full interview sessions — confirm whether any 2-person interview actually ran end-to-end.
- Code-execution latency / sync latency / max concurrent rooms — would need a benchmark or load test (none in repo).

**Outcome / recognition / production**
- Confirmed publicly deployed (Vercel frontend + DigitalOcean backend) with real visitors (see Umami). Provide the production URL for the fact record.
- Were any of the 18 visitors real interview sessions (2 people, full duration), or mostly you + landing-page hits? This determines whether you can claim real *usage* vs just *traffic*.
- Any recognition (portfolio, shared, hackathon, etc.)? [NEEDS-INPUT]

**Motivation**
- Why build this vs. using CoderPad? (Personal interview prep? Portfolio piece? Cost?) Not in repo.

**Housekeeping (low priority, verified)**
- Delete the unused `VITE_JUDGE0_KEY` from `client/.env` and the stale `server/fly.toml` — both are dead config that contradict how the app actually runs.

---
