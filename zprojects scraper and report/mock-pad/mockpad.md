# MockPad — Context Capsule

> Technical briefing. Resume numbers are not gated by this file.
> You should NOT need to re-open the codebase. Full report: `./mockpad_report.md`.

## 1. Meta
- **Project id:** `mockpad`
- **Name:** MockPad
- **Crawl date:** 2026-06-25
- **Author filter:** `156324870+RDX-Rajat-Savdekar@users.noreply.github.com` = `rajatsavdekar@gmail.com` — **confirmed same author, solo** (2026-06-29).
- **Paths skipped:** `node_modules/`, `client/dist/`, `server/storage/` (LevelDB data), lockfiles, `.DS_Store`.
- **Full report:** `report.md` (repo root).

## 2. Identity + problem
Free, real-time collaborative code-editor web app for technical mock interviews (a CoderPad clone), built on Yjs CRDTs. Two people (interviewer + interviewee) share a live Monaco editor, whiteboard, notes, timer, and code execution in one browser room. Positioned as a free alternative to paid platforms (CoderPad/HackerRank).

**Motivation (author-confirmed, anonymize on resume):** Built for big-tech interview prep after realizing no free CoderPad-tier option exists. Do not name the target company on the resume — say "technical interview prep" or "mock interview prep."

## 3. Directory map
| Path | What lives there | Why it matters |
|---|---|---|
| `client/` | React 19 + Vite SPA | The entire UI |
| `client/src/App.jsx` | Router (2 routes) | Entry to page tree |
| `client/src/pages/Home.jsx` | Landing: create/join room | Room creation + naming |
| `client/src/pages/Room.jsx` | **Central coordination file** | All shared state via `sharedMap.set(...)`; ~700 lines |
| `client/src/hooks/useYjs.js` | Y.Doc + WebsocketProvider + Monaco binding | Realtime backbone + cursor CSS injection |
| `client/src/hooks/useCodeRunner.js` | Judge0 CE fetch | Code execution (4 langs) |
| `client/src/hooks/useWebRTC.js` | WebRTC audio/recording hook | Built then CUT (not imported) |
| `client/src/components/Whiteboard.jsx` | Excalidraw ↔ Yjs sync | Hard part: echo-loop + Float32Array fix |
| `client/src/components/Timer.jsx` | Shared stopwatch/countdown | Clock-drift-free timer |
| `client/src/components/Notes.jsx` | Private + shareable notes (tabbed) | Per-user notes via sharedMap |
| `client/src/components/SummaryModal.jsx` | Export md + whiteboard SVG | Session summary |
| `client/src/components/AudioControls.jsx` | Audio call UI | CUT (not imported) |
| `client/src/data/resources.js` | ~14 code-pattern snippets | Resource drawer content |
| `client/src/utils/roomId.js` | UUIDs, username gen, deterministic color | Identity (sessionStorage) |
| `server/index.js` | Node `ws` + y-websocket + LevelDB | Sync server + room lifecycle/TTL + `/end-room` |
| `server/Dockerfile` / `server/fly.toml` | Container / Fly config | Docker used; **fly.toml is stale/unused** |
| `.github/workflows/deploy.yml` | SSH deploy to DigitalOcean (pm2) | Backend CI/CD (the real one) |
| `client/vercel.json` | Vercel config | Frontend deploy |

## 4. Entry points
- **Frontend boot:** `client/src/main.jsx` → `App.jsx` (BrowserRouter). Routes: `/` (Home), `/room/:roomId` (Room), `*`→redirect. `client/src/App.jsx:8-11`.
- **Room logic root:** `client/src/pages/Room.jsx` — wires Yjs, code runner, all panels.
- **Realtime root:** `client/src/hooks/useYjs.js` — creates `Y.Doc` + `WebsocketProvider`.
- **Server boot:** `server/index.js` — `http.createServer` + `WebSocketServer`, `node index.js`, port 1234.

## 5. Architecture decisions (interview gold)
| Decision | Why | Rejected alt | Evidence |
|---|---|---|---|
| Single `Y.Doc` per room = sole source of truth; no REST/DB for app state | Free conflict resolution + offline merge | REST API ("No REST API — all state is Yjs") | `CLAUDE.md:27`, `Room.jsx:80` |
| Manual Monaco remote-cursor CSS injection | y-monaco emits decoration classes but ships no CSS | none (library workaround) | `useYjs.js:8-35` |
| Two-flag echo-loop guard for Excalidraw↔Yjs | onChange/observe would ping-pong & reset strokes mid-draw | Yjs `transaction.local` (comment says refs are more reliable) | `Whiteboard.jsx:30-106` |
| Restore freedraw `pressures` as Float32Array after JSON | JSON.stringify flattens typed array → strokes collapse to dots | none (bug fix) | `Whiteboard.jsx:5-15` |
| Dual room TTL (30-min inactivity + 2-hr hard) + in-memory conn tracking | Free-tier resource hygiene | none documented | `server/index.js:7-39` |
| WebRTC signaling over Yjs awareness, then CUT feature | Reuse awareness channel (no signaling server); but don't rebuild Zoom | shipping in-app calls → use Zoom/Meet/Discord | `useWebRTC.js:31-41`; author-confirmed |
| Free public Judge0 CE, no API key | No key needed; Run sends no auth header | paid/keyed Judge0 (`.env` key unused) | `useCodeRunner.js:21-28` |

## 6. Author scope
**Author built:** the Yjs coordination layer (which state lives in `monaco` text vs `shared` map vs `whiteboard` map); manual cursor CSS; whiteboard echo-loop + Float32Array fix; server room-lifecycle/TTL + `/end-room`; role state machine (1st→interviewer, 2nd→interviewee, rest→viewer) + swap; the (cut) WebRTC hook; custom vertical-resize hook; clock-drift-free timer; summary export; deterministic user color. `Room.jsx`, `useYjs.js`, `Whiteboard.jsx`, `server/index.js`, `Timer.jsx`.

**Libraries did (do NOT credit author):** CRDT merge algorithm = **Yjs/y-websocket/y-monaco/y-leveldb**; editor = **Monaco**; whiteboard canvas + SVG export = **Excalidraw**; code sandbox = **Judge0 CE** (3rd-party API); horizontal panels = **react-resizable-panels**.

**Solo** — one git author, 20 commits.

## 7. Tech stack (exact strings)
- JavaScript (JSX, ES modules) — `client/package.json:5`; server CommonJS — `server/package.json:12`
- React 19 — `client/package.json:15-16`; Vite 8 — `:33`; react-router-dom 7 — `:19`
- Monaco via `@monaco-editor/react` 4.7 — `client/package.json:14`
- Yjs 13.6 + y-websocket 2.1 + y-monaco 0.1 — `client/package.json:20-22`
- `@excalidraw/excalidraw` 0.18 — `client/package.json:13`; react-markdown 10 — `:17`; react-resizable-panels 4.9 — `:18`
- Node.js 20 (`node:20-alpine`) + `ws` 8.20 + `y-leveldb` 0.2 — `server/package.json:14-17`, `server/Dockerfile:1`
- Judge0 CE `https://ce.judge0.com` — `useCodeRunner.js:11`
- WebRTC + 2 Google STUN servers (cut feature) — `useWebRTC.js:3-6`
- Umami analytics (cloud) — `client/index.html`
- Deploy: Vercel (frontend, `client/vercel.json`) + DigitalOcean/pm2 via GitHub Actions SSH (`deploy.yml`). `server/fly.toml` is stale/unused.

## 8. Hard parts
- **Echo-loop suppression across two reactive systems** (Excalidraw + Yjs) via synchronous refs, not transaction origin. `Whiteboard.jsx:30-106`
- **Typed-array survival through JSON** for freedraw pressure data. `Whiteboard.jsx:8-15`
- **Role/presence race handling** — re-read presence at 500/1500/3000 ms after each awareness change. `Room.jsx:104-112`
- **WebRTC negotiation** — buffer ICE until remoteDescription set; dedupe signals by `from-type-ts`; mix local+remote into one MediaRecorder file. `useWebRTC.js:101-135,182-217`
- **Clock-drift-free timer** — store `timerStartedAt`+`timerElapsed` in Yjs, recompute locally so all clients agree. `Timer.jsx:36-42`
- **Server room lifecycle** — dual TTL timers + manual override endpoint. `server/index.js:16-73`

## 9. Metrics
| Claim | Value | Status | Confidence | Source |
|---|---|---|---|---|
| Supported languages | 4 (Py/JS/Java/C++) | MEASURED | high | `useCodeRunner.js:4-9` |
| Interview types | 4 | MEASURED | high | `Room.jsx:48` |
| User roles | 3 | MEASURED | high | `Room.jsx:151-155` |
| Code-pattern snippets | ~14 | ESTIMATED | medium | `data/resources.js` |
| Room TTL | 30-min inactivity / 2-hr hard | MEASURED | high | `server/index.js:7-8` |
| Timer presets | 30m/45m/1h | MEASURED | high | `Timer.jsx:7-11` |
| Total commits | 20 | MEASURED | high | git |
| Contributors | 1 (solo) | MEASURED | high | git shortlog |
| Dev window | ~11 days (2026-04-06→04-17) | MEASURED | high | git dates |
| Frontend routes | 2 + catch-all | MEASURED | high | `App.jsx:8-11` |
| Server HTTP endpoints | 1 (`POST /end-room`) | MEASURED | high | `server/index.js:59` |
| Unique visitors (Apr 17–Jun 22 2026) | 18 | MEASURED | high | Umami |
| Weekly prep cohort (recurring users) | ~50 | ESTIMATED | medium | Author-reported friend group doing weekly prep; exceeds Umami uniques because repeat sessions / not all users in analytics window |
| Real end-to-end interview sessions | yes (friend group) | QUALITATIVE | medium | Author-confirmed weekly 2-person prep sessions, not just landing-page hits |
| Backend VM | 1 GB RAM / 10 GB SSD | MEASURED | high | Author-confirmed DigitalOcean droplet (fly.toml 256 MB is stale/unused) |
| Typical peak server utilization | ~20% | ESTIMATED | low | Author assumption; implies headroom, not a load test |
| Concurrent active users at peak (derived) | ~4–10 | ESTIMATED | low | ~20% of 1 GB droplet ≈ 2–5 concurrent rooms × ~2 active (interviewer + interviewee) per room |
| Visits / Views | 18 / 21 | MEASURED | high | Umami |
| Bounce / avg duration | 89% / 31s | MEASURED | high | Umami |
| Geo / referrer | US 83%, India 17% / bing | MEASURED | high | Umami |
| Concurrent users/room | ~2 active + N viewers | ESTIMATED | medium | Author-confirmed design: interviewer + interviewee active; viewers optional |
| Code-pattern snippets | ~14 | ESTIMATED | high | Author confirmed ~14; `data/resources.js` |
| Production URL | https://mockpad-kappa.vercel.app/ | MEASURED | high | Live deploy |
| Run latency / max rooms | — | NEEDS-INPUT | — | no benchmark |

## 10. Top candidate bullets (edit before use)
1. **CRDT collaboration** [full-stack / backend-distributed] — shared Monaco editor + presence + roles + timer + notes + whiteboard via one Yjs doc per room. `useYjs.js`, `Room.jsx:80`. Tier 1.
2. **Whiteboard sync** [frontend / full-stack] — Excalidraw↔Yjs with echo-loop suppression + Float32Array stroke fix. `Whiteboard.jsx:8-15,99-106`. Tier 1.
3. **Room lifecycle server** [backend-distributed / platform-infra] — `ws`+y-websocket+LevelDB persistence, 30m/2h TTL cleanup, end-room endpoint. `server/index.js:7-95`. Tier 1.
4. **WebRTC audio (prototyped, scoped out)** [frontend / backend-distributed] — SDP/ICE over Yjs awareness + dual-stream recording, then deliberately cut for BYO voice tools. `useWebRTC.js`. Tier 2. *Frame as scoping decision, not shipped.*
5. **Judge0 code execution** [full-stack / generalist-sde] — 4-language in-editor run synced to peers. `useCodeRunner.js:4-9`. Tier 2.
6. **CI/CD** [platform-infra] — GitHub Actions SSH deploy to DigitalOcean (pm2) + Vercel frontend. `deploy.yml`, `vercel.json`. Tier 2.

## 11. Interview hooks
- **Q: How do edits stay consistent across users?** → Single Yjs CRDT doc per room; conflict resolution is free, no REST app-state layer. `Room.jsx:80`
- **Q: Hardest bug?** → Excalidraw/Yjs feedback loop resetting strokes mid-draw; fixed with synchronous local/remote refs + Float32Array pressure restore. `Whiteboard.jsx`
- **Q: Why no in-app video?** → Built a WebRTC prototype, then cut it — better to let users use Zoom/Meet/Discord than reinvent calling. (Knowing what NOT to build.)
- **Q: How do timers stay in sync?** → Store start-time + elapsed in Yjs, recompute locally → no clock drift. `Timer.jsx:36-42`
- **Q: How are rooms cleaned up?** → Server tracks connections; 30-min inactivity + 2-hr hard TTL delete the LevelDB doc. `server/index.js:7-39`
- **Q: Code execution security?** → Offloaded to Judge0 CE sandbox (3rd-party); I integrated, didn't build sandboxing.

## 13. NEEDS HUMAN INPUT
- [x] Author identity — same person, solo.
- [x] Production URL — https://mockpad-kappa.vercel.app/
- [x] Motivation — big-tech interview prep; no free CoderPad (anonymize on resume).
- [x] Real sessions — yes; friend group weekly prep (~50 recurring users, author-estimated).
- [x] Droplet — 1 GB RAM / 10 GB SSD DigitalOcean.
- [x] Recognition — portfolio + LinkedIn post planned this week (not yet done).
- [x] Snippet count — ~14 confirmed.
- [x] Concurrency — ~2 active per room; ~20% peak server usage → ~4–10 concurrent active users estimated.

## 13b. Author Q&A log (2026-06-29)
| # | Answer |
|---|---|
| 1 | Solo author confirmed |
| 2 | Live at mockpad-kappa.vercel.app |
| 3 | Interview prep; no free CoderPad equivalent (keep employer anonymous) |
| 4 | Friends use weekly; ~50 real prep users (author-estimated; Umami undercounts repeats) |
| 5 | 1 GB RAM, 10 GB SSD |
| 6 | Portfolio + LinkedIn this week |
| 7 | ~14 snippets yes |
| 8 | ~20% server usage at peak → ~2–5 rooms, ~4–10 active users derived |

## 14. Re-crawl triggers (capsule goes stale if…)
- A session replay / recording-persistence system is added (currently no replay).
- WebRTC audio is un-cut and wired back into the UI.
- App state moves off pure Yjs (e.g. a REST API or database is introduced).
- Auth / accounts / persistent user identity is added (currently sessionStorage only).
- Backend host changes (e.g. off DigitalOcean) or fly.toml becomes active.
- Languages/interview-types/roles counts change (metrics in §9).
- A load test or latency benchmark is added (would convert NEEDS-INPUT rows).
