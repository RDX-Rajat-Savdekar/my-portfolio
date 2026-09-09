# Crawl Report: SplitIt — Frontend (Vite + React)

_Crawled: 2026-06-25. Author filter: `156324870+RDX-Rajat-Savdekar@users.noreply.github.com` (the email you gave as `<your-email>` resolved to this single GitHub no-reply address via git). 100% of commits (3/3) are by this author — solo project._

_Skipped / not crawled: `node_modules/` (not present, install-only), `package-lock.json` (3,291 lines — existence noted only), `public/vite.svg`, `src/App.css` (38 lines of leftover Vite template CSS — skimmed, not used). Repo is small (~25 source files); everything else was read in full, so there is no sampling debt._

---

## 0. TL;DR
- **Identity:** A React 19 + Vite single-page web client for "SplitIt," an expense-splitting / debt-tracking app (a Splitwise-style clone) that talks to a separate REST backend.
- Strongest bullet-worthy themes (headlines):
  1. **Feature-sliced SPA architecture** — domain-isolated `src/features/<domain>/*Service` API layer over `axios`, consumed by page/component views.
  2. **Three-mode expense split engine on the client** — equal / unequal / percentage splits with a live "remaining amount" calculator and submit-time validation.
  3. **JWT auth flow with persistence + route guarding** — `zustand` store hydrated from `localStorage`, `Bearer` token attached per request, `PrivateRoute` gate via React Router v7 `Outlet`/`Navigate`.
  4. **Full CRUD UX surface** — groups, expenses, friends, payments ("Settle Up"), and activity feeds across modal-driven dashboard + group pages.
  5. **Deploy-aware config** — env-driven `VITE_API_URL` base + dev proxy to `localhost:5000` for local/prod parity.

## 1. What it is & why it exists
- **Identity (1 sentence):** Browser front-end for SplitIt that lets a logged-in user manage friends/groups, log shared expenses with flexible splits, view who-owes-whom balances, and settle debts. [`src/App.jsx:18-31`, `src/pages/Dashboard.jsx:172-268`] (MEASURED)
- **Problem it solves:** Tracking and splitting shared expenses among friends/groups and resolving balances — inferred from feature set (groups, expenses, splits, balances, "Settle Up" payments). [`src/pages/GroupPage.jsx`, `src/components/SettleUpModal.jsx`] (INFERRED)
- **Why built / motivation:** Not stated in repo (README is the unmodified Vite template). Author confirms it is a **portfolio/demo project** — all data is fake, no real users. (author-confirmed 2026-06-25)
- **Deployment:** Frontend hosted on **Vercel**; backend hosted on **Render** (author plans to migrate the backend to a self-managed **DigitalOcean droplet**). (author-confirmed 2026-06-25)

## 2. Author scope
- **What the AUTHOR built** (all application code; MEASURED via git — 3/3 commits are this author):
  - Routing shell + protected routing (`src/App.jsx`, `src/components/PrivateRoute.jsx:4-10`).
  - The entire `src/features/*` axios service layer — 8 service modules (`auth`, `users`, `groups`, `expenses`, `friends`, `payments`, `activity`). [`src/features/`]
  - `zustand` auth store with `localStorage` hydration (`src/features/auth/authStore.jsx:4-15`).
  - Dashboard data orchestration incl. parallel fetch via `Promise.all` and balance-name reconciliation (`src/pages/Dashboard.jsx:31-59`).
  - Client-side split logic + validation in `ExpenseModal`/`EditExpenseModal` (`src/components/ExpenseModal.jsx:48-86`).
  - All Tailwind-class UI markup, modals, toasts wiring.
- **What a LIBRARY/FRAMEWORK did (do NOT credit author):**
  - HMR, build, bundling: **Vite** + `@vitejs/plugin-react`. [`vite.config.js`, `package.json:25`]
  - Routing primitives: **react-router-dom v7** (`Routes`, `Outlet`, `Navigate`). [`package.json:18`]
  - Global state primitive: **zustand** `create`. [`package.json:19`]
  - HTTP: **axios**; toasts: **react-hot-toast**; modal shell: **react-modal**. [`package.json:13,16,17`]
  - CSS utility classes: **Tailwind** (loaded via CDN — see §5). [`index.html:8`]
- **Solo or team?** Solo. Detected via `git shortlog -sne` → single author, 3 commits. (MEASURED)

## 3. Tech stack (exact strings)
| Layer | Technology | Evidence |
|---|---|---|
| Language | JavaScript (JSX, ES modules) | `package.json:5` (`"type":"module"`), `.jsx` files |
| UI framework | React `^19.1.1`, react-dom `^19.1.1` | `package.json:14-15` |
| Build tool | Vite `^7.1.7` + `@vitejs/plugin-react` `^5.0.4` | `package.json:25,30`, `vite.config.js:1-6` |
| Routing | react-router-dom `^7.9.4` | `package.json:18`, `src/App.jsx:1` |
| State mgmt | zustand `^5.0.8` | `package.json:19`, `src/features/auth/authStore.jsx:1` |
| HTTP client | axios `^1.12.2` | `package.json:13`, all `src/features/*Service*` |
| Notifications | react-hot-toast `^2.6.0` | `package.json:16`, `src/App.jsx:8` |
| Modals | react-modal `^3.16.3` | `package.json:17`, `src/components/ExpenseModal.jsx:2` |
| Styling | Tailwind CSS via CDN `<script>` | `index.html:8` (note: no `tailwindcss` dep in manifest) |
| Lint | ESLint `^9.36.0` (flat config) + react-hooks/react-refresh plugins | `package.json:22,27,28`, `eslint.config.js` |
| Auth transport | JWT `Bearer` token in `Authorization` header | `src/features/expenses/expenseService.jsx:8-10` |

## 4. Architecture & decisions (interview gold)
- **Decision: Feature-sliced ("ducks"-style) service layer.** Each domain owns a `*Service` module exporting plain async axios functions; React components import the service and pass `user.token`.
  - Why: keeps API calls out of components, one file per backend resource. [`src/features/groups/groupService.jsx:54-60`] (INFERRED from structure)
  - Rejected alternative: none found in repo — ask author (no React Query / RTK / centralized api client present).
- **Decision: zustand for auth, `localStorage` for persistence.** Store seeds `user` from `localStorage` on load; components call `useAuthStore.setState({ user })` directly after login.
  - Why: lightweight session persistence without a backend session. [`src/features/auth/authStore.jsx:4-8`, `src/pages/Login.jsx:35-37`] (INFERRED)
  - Rejected alternative: Context/Redux — not used; reason not documented (NEEDS-INPUT).
  - Note: the store is essentially state-only; auth mutations are done via `useAuthStore.setState` from components rather than store actions (the `// add actions later` comment confirms it's unfinished). [`src/features/auth/authStore.jsx:13-14`]
- **Decision: Route protection via wrapper route + `Outlet`.** `PrivateRoute` returns `<Outlet/>` if `user` else `<Navigate to="/login"/>`. [`src/components/PrivateRoute.jsx:4-10`, `src/App.jsx:25-28`] (MEASURED)
- **Decision: Parallel data loading.** Dashboard and GroupPage fetch 4 resources concurrently with `Promise.all` to reduce load latency. [`src/pages/Dashboard.jsx:34-39`, `src/pages/GroupPage.jsx:36-41`] (MEASURED)
- **Decision: Env-based API base + dev proxy.** Services build URLs from `import.meta.env.VITE_API_URL`; Vite dev server proxies `/api` → `http://localhost:5000`.
  - Why: local vs prod parity. The "Configure production API URL" commit (`530de3c`) switched hardcoded `/api/...` to `VITE_API_URL + ...`. [`vite.config.js:7-11`, `src/features/auth/authService.jsx:3-4`, commit `530de3c`] (MEASURED)
  - Note: dev proxy is now partially dead config — services use absolute `VITE_API_URL`, so the `/api` proxy only matters if `VITE_API_URL` is empty (NEEDS-INPUT to confirm intended local setup).

## 5. Hard parts / notable engineering
- **Three-mode split calculator with live validation.** `equal` sends `splitWith` member IDs; `unequal` and `percentage` send `shares[]` and block submit unless they sum correctly (`remaining === 0.00`, or percentages `=== 100`). Live "remaining" recomputed via `useEffect`. [`src/components/ExpenseModal.jsx:35-86`] (MEASURED) — the heavy lifting (actual debt math) is presumably backend; the client computes split inputs + validation only.
- **Balance ↔ name reconciliation.** Detailed balances come back keyed by `userId`; the client joins them to friend names client-side (`detailedBalanceData.map` + `friendData.find`), falling back to "Unknown User". [`src/pages/Dashboard.jsx:46-53`] (MEASURED)
- **Settle-up flow.** Only debts where `amount < 0` are settleable; modal records a payment of `Math.abs(amount)` then refetches. [`src/pages/Dashboard.jsx:94-121`] (MEASURED)
- **Tailwind delivered via CDN, not the build.** `index.html:8` loads `https://cdn.tailwindcss.com`, while `src/index.css` contains `@tailwind` directives but there is **no `tailwindcss`/PostCSS dependency or config** in the repo — so the `@tailwind` directives do nothing at build time and the CDN is what actually styles the app. Author-confirmed: the CDN was used deliberately because the **local Tailwind build setup caused too many issues** — Tailwind is genuinely the styling system, just delivered via CDN rather than the PostCSS pipeline. Fair to claim "Tailwind CSS"; do not claim a production-optimized/purged Tailwind build. [`index.html:8`, `src/index.css:1-3`, `package.json`] (author-confirmed 2026-06-25)
- **Repetition smell:** auth header config (`{ headers: { Authorization: Bearer ... } }`) is hand-rolled in every service function; no shared axios instance/interceptor and no global 401 handling. [`src/features/*Service*`] (MEASURED) — honest "what I'd improve" talking point.
- **Code duplication:** `EditExpenseModal.jsx` is a near-verbatim copy of `ExpenseModal.jsx` (its heading even still says "Add New Expense"). [`src/components/EditExpenseModal.jsx:110`] (MEASURED)

## 6. Candidate bullets (forward direction)
> Plain candidates for the author to edit — not final resume copy.

1. **Built a React 19 + Vite single-page app for a group expense-splitting product, structured as a feature-sliced axios service layer (8 domain modules) consumed by route-guarded pages.** — Archetype: full-stack / frontend. Label: MEASURED. Evidence: `src/features/`, `src/App.jsx`. Tier: 1.
2. **Implemented a client-side expense-split engine supporting equal, unequal, and percentage splits with a live remaining-balance calculator and submit-time validation.** — Archetype: frontend. Label: MEASURED. Evidence: `src/components/ExpenseModal.jsx:35-86`. Tier: 1.
3. **Implemented JWT auth with persistent sessions (zustand + localStorage) and protected routing via a React Router v7 `Outlet`/`Navigate` guard.** — Archetype: frontend. Label: MEASURED. Evidence: `src/features/auth/authStore.jsx:4-8`, `src/components/PrivateRoute.jsx`. Tier: 1.
4. **Reduced dashboard load latency by fetching friends, groups, and balances concurrently with `Promise.all` and reconciling balance records to friend names client-side.** — Archetype: frontend. Label: ESTIMATED (latency claim is qualitative; the concurrency itself is MEASURED). Evidence: `src/pages/Dashboard.jsx:34-53`. Tier: 2.
5. **Delivered a full CRUD UX (groups, expenses, friends, "Settle Up" payments, activity feeds) using react-modal dialogs and react-hot-toast feedback.** — Archetype: frontend. Label: MEASURED. Evidence: `src/pages/GroupPage.jsx`, `src/components/*Modal.jsx`. Tier: 2.
6. **Parameterized the API base via `VITE_API_URL` with a Vite dev proxy for local/prod parity.** — Archetype: frontend / generalist-sde. Label: MEASURED. Evidence: `vite.config.js:7-11`, commit `530de3c`. Tier: 3.

## 7. Metrics found vs metrics needed
| Claim | Value | Source (file:line / artifact) | Status | Basis / reasoning | Confidence |
|---|---|---|---|---|---|
| Domain service modules | 8 | `src/features/` (auth, users, groups, expenses, friends, payments, activity = 7 dirs; auth has store+service) | MEASURED | Counted service files: authService, userService, groupService, expenseService, friendService, paymentService, activityService = 7 service modules + 1 store | high |
| Distinct backend endpoints called | ~14 | `src/features/*Service*` | ESTIMATED | Counted axios calls: users register/login/balance/detailed-balance (4), groups GET-list/GET-one/POST/PUT/DELETE (5), expenses GET-by-group/POST/PUT/DELETE (4), friends GET/POST (2), payments POST (1), activity GET-overall/GET-by-group (2) = 18 calls across ~14 unique paths | medium |
| App routes | 4 | `src/App.jsx:21-27` | MEASURED | `/login`, `/register`, `/` (Dashboard), `/group/:groupId` | high |
| React components/pages | 14 | `src/components` (8) + `src/pages` (4) + App + index | MEASURED | File count | high |
| Split modes supported | 3 | `src/components/ExpenseModal.jsx:143-145` | MEASURED | equal / unequal / percentage buttons | high |
| Git commits (this author) | 3 | `git log` | MEASURED | Initial, prod API URL, modals+activity feed | high |
| Lines added (initial commit) | 4,326 (incl. 3,291 lock file) | commit `8272dee` stat | MEASURED | ~1,035 non-lockfile lines authored initially | high |
| Dev-server backend port | 5000 | `vite.config.js:9` | MEASURED | proxy target `http://localhost:5000` | high |
| Test coverage | 0 | no test files / no test runner in `package.json` | MEASURED | no `vitest`/`jest`/`*.test.*` present | high |
| CI/CD pipelines | 0 | no `.github/`, no CI config found | MEASURED | absence | high |
| Hosting | Vercel (frontend) + Render (backend) | author-confirmed | MEASURED | author-confirmed 2026-06-25; backend migration to DigitalOcean droplet planned | high |
| Real users / usage | 0 (demo/portfolio) | author-confirmed | MEASURED | author-confirmed: all data fake, no real users | high |

## 8. Evidence index (reverse direction)
| Claim ID | Claim | Evidence |
|---|---|---|
| C1 | React 19 + Vite 7 SPA | `package.json:14-15,30` |
| C2 | Feature-sliced service layer | `src/features/groups/groupService.jsx:54-60`, `src/features/expenses/expenseService.jsx:43-48` |
| C3 | zustand + localStorage auth persistence | `src/features/auth/authStore.jsx:4-8`; `src/features/auth/authService.jsx:14,27` |
| C4 | Protected routing via Outlet/Navigate | `src/components/PrivateRoute.jsx:4-10`; `src/App.jsx:25-28` |
| C5 | 3-mode split + validation + live remaining | `src/components/ExpenseModal.jsx:35-86,143-158` |
| C6 | Parallel fetch + name reconciliation | `src/pages/Dashboard.jsx:34-53` |
| C7 | Settle-up payment flow | `src/pages/Dashboard.jsx:94-121`; `src/components/SettleUpModal.jsx:5-43` |
| C8 | Group/expense CRUD | `src/pages/GroupPage.jsx:59-121`; `src/features/groups/groupService.jsx`; `src/features/expenses/expenseService.jsx` |
| C9 | Env-based API base + dev proxy | `vite.config.js:7-11`; `src/features/auth/authService.jsx:3-4`; commit `530de3c` |
| C10 | Tailwind via CDN, no build pipeline | `index.html:8`; `src/index.css:1-3`; `package.json` (no tailwind dep) |
| C11 | Hardcoded demo/guest login | `src/pages/Login.jsx:46-65` |
| C12 | Solo author, 3 commits | `git shortlog -sne`, `git log` |

## 9. NEEDS HUMAN INPUT (the handoff)
_Resolved 2026-06-25 (author answers folded in):_
- ~~**Production deployment**~~ → RESOLVED: frontend on **Vercel**, backend on **Render**, with a planned migration of the backend to a **DigitalOcean droplet**.
- ~~**Real usage**~~ → RESOLVED: **portfolio/demo project, all data fake, zero real users.** Never claim adoption/usage numbers.
- ~~**Tailwind via CDN**~~ → RESOLVED: deliberate — local Tailwind build caused too many issues, so CDN was used. Tailwind is genuinely the styling system; just don't claim a purged/optimized production build.
- ~~**Scope — split math**~~ → RESOLVED: "go with the code" — the client only validates/forwards split inputs; the debt math is server-side. Do not claim a custom debt-simplification algorithm.

_Still open:_
- **Latency claim (bullet #4):** Did you actually measure the `Promise.all` improvement vs sequential? If not, keep it qualitative ("loads data concurrently"), not "X% faster."
- **Endpoint count (~14):** Confirm against the backend's real route list; my count is from frontend call sites only.
- **Why zustand over Context/Redux, and why no React Query?** Was this a deliberate choice or expedience? (interview framing)
