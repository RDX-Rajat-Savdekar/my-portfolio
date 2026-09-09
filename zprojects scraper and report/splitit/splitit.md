# SplitIt (Frontend) — Context Capsule

> Technical briefing. Resume numbers are not gated by this file.
> You should NOT need to re-open the codebase. Full report: `./splitit-report.md`.

## 1. Meta
- **Project id:** `splitit` (frontend repo: `splitit-frontend-vite`; backend: `splitit-backend`)
- **Name:** SplitIt — Expense Splitting Web App (full-stack)
- **Local repos:** `/Users/rajatsavdekar/Documents/GitHub/splitit-frontend-vite`, `/Users/rajatsavdekar/Documents/GitHub/splitit-backend`
- **Crawl date:** 2026-06-25
- **Author filter:** `156324870+RDX-Rajat-Savdekar@users.noreply.github.com` (GitHub noreply). Solo repo — 3/3 commits this author.
- **Paths skipped:** `node_modules/` (not present), `package-lock.json` (existence only), `public/vite.svg`, `src/App.css` (unused Vite template CSS). Repo is small (~25 source files) — read in full, no sampling debt.
- **Full report:** `./splitit-frontend_report.md` (copied from repo root `report.md`).

## 2. Identity + problem
React 19 + Vite SPA + Node.js Express/MongoDB REST API for a Splitwise-style group expense-splitting app. Lets a logged-in user manage friends/groups, log shared expenses with flexible splits, view who-owes-whom balances, and settle debts.

**Motivation (author-confirmed):** Learning full-stack by building a free alternative to paid Splitwise-style tools.

**Portfolio/demo:** All data fake, zero real users (author-confirmed). Live at [splitit-frontend-vite.vercel.app/login](https://splitit-frontend-vite.vercel.app/login) (frontend) + Render (backend).

## 3. Directory map
| Path | What lives there | Why it matters |
|---|---|---|
| `src/index.jsx` | React DOM bootstrap | Entry point; loads `index.css` |
| `src/App.jsx` | Router shell (4 routes) + Toaster | Entry to page tree + route guard wiring |
| `src/components/PrivateRoute.jsx` | Auth gate (`Outlet`/`Navigate`) | Protects `/` and `/group/:id` |
| `src/components/Header.jsx` | Nav + logout | Session-aware nav |
| `src/features/auth/authStore.jsx` | zustand store (user, hydrated from localStorage) | Global auth state |
| `src/features/auth/authService.jsx` | register/login/logout (axios) | Auth API + localStorage persistence |
| `src/features/groups/groupService.jsx` | group CRUD (axios) | Groups API |
| `src/features/expenses/expenseService.jsx` | expense CRUD (axios) | Expenses API |
| `src/features/friends/friendService.jsx` | get/add friends | Friends API |
| `src/features/payments/paymentService.js` | record payment (Settle Up) | Payments API |
| `src/features/users/userService.jsx` | balance + detailed-balance | Balance data |
| `src/features/activity/activityService.js` | overall + per-group activity | Activity feed API |
| `src/pages/Dashboard.jsx` | Home: balances, groups, friends, settle-up | Main orchestration; parallel fetch + name reconciliation |
| `src/pages/GroupPage.jsx` | Single group: expenses, members, history | CRUD hub for a group |
| `src/pages/Login.jsx` / `Register.jsx` | Auth forms (+ hardcoded guest login) | Public routes |
| `src/components/ExpenseModal.jsx` | Add expense + split engine | Hard part: 3-mode split + validation |
| `src/components/EditExpenseModal.jsx` | Edit expense | Near-verbatim copy of ExpenseModal |
| `src/components/GroupModal.jsx` / `EditGroupModal.jsx` | Create/edit group | Member selection |
| `src/components/SettleUpModal.jsx` | Confirm payment | Settle-up flow |
| `src/components/ActivityFeed.jsx` | Recent activity widget | Dashboard feed |
| `index.html` | HTML shell | Loads Tailwind via **CDN** `<script>` |
| `vite.config.js` | Vite + dev proxy `/api`→`:5000` | Build + local backend proxy |

## 4. Entry points
- **Boot:** `src/index.jsx` → `<App/>` in `React.StrictMode`. `src/index.jsx:6-10`.
- **Routing root:** `src/App.jsx` — BrowserRouter; routes `/login`, `/register`, `/` (Dashboard, guarded), `/group/:groupId` (guarded). `src/App.jsx:21-27`.
- **Auth gate:** `src/components/PrivateRoute.jsx:4-10`.
- **API base:** every `src/features/*Service*` builds URL from `import.meta.env.VITE_API_URL`.

## 5. Architecture decisions (interview gold)
| Decision | Why | Rejected alt | Evidence |
|---|---|---|---|
| Feature-sliced axios service layer (one module per backend resource) | Keep API calls out of components | none found — no React Query/RTK/central client | `src/features/groups/groupService.jsx:54-60` |
| zustand + localStorage for auth/session | Lightweight persistent session, no backend session | Context/Redux (not used; reason undocumented) | `src/features/auth/authStore.jsx:4-8` |
| Route protection via wrapper route + `Outlet` | Gate private pages cleanly | none documented | `src/components/PrivateRoute.jsx:4-10` |
| Parallel data load via `Promise.all` (4 resources) | Reduce load latency | sequential fetch | `src/pages/Dashboard.jsx:34-39` |
| Env-based API base + Vite dev proxy | local/prod parity | hardcoded `/api` (was switched in commit `530de3c`) | `vite.config.js:7-11` |
| Tailwind via CDN, not PostCSS build | local Tailwind build "caused too many issues" (author-confirmed) | proper Tailwind/PostCSS pipeline (abandoned) | `index.html:8`, `src/index.css:1-3` |

## 6. Author scope
**Author built (full-stack):** routing shell + protected routes; 7-module axios service layer; zustand + localStorage auth; dashboard orchestration; client split validation; **Express 5 REST API** with JWT auth, Mongoose/MongoDB models, expense/balance/payment controllers, and protected route middleware. Debt **net-balance** math runs server-side (`userController.js`); client validates/forwards split inputs.

**Libraries integrated (not authored):** Vite, react-router-dom v7, zustand, axios, react-hot-toast, react-modal, Tailwind CDN (frontend); Express, Mongoose, bcryptjs, jsonwebtoken (backend).

**Solo** — frontend 3 commits, backend 7 commits (same author).

## 7. Tech stack (exact strings)
- JavaScript (JSX, ES modules) — `package.json:5` (`"type":"module"`)
- React `^19.1.1` + react-dom `^19.1.1` — `package.json:14-15`
- Vite `^7.1.7` + `@vitejs/plugin-react` `^5.0.4` — `package.json:25,30`
- react-router-dom `^7.9.4` — `package.json:18`
- zustand `^5.0.8` — `package.json:19`
- axios `^1.12.2` — `package.json:13`
- react-hot-toast `^2.6.0` — `package.json:16`; react-modal `^3.16.3` — `package.json:17`
- Tailwind CSS via CDN `<script>` — `index.html:8` (no `tailwindcss` dep in manifest)
- ESLint `^9.36.0` flat config + react-hooks/react-refresh plugins — `eslint.config.js`
- Node.js + Express `^5.1.0` + Mongoose `^8.19.1` + MongoDB — `splitit-backend/package.json`
- bcryptjs + jsonwebtoken + cors + dotenv — backend auth
- Auth transport: JWT `Bearer` token in `Authorization` header — frontend services + `authMiddleware.js`
- Deploy: **Vercel** [splitit-frontend-vite.vercel.app](https://splitit-frontend-vite.vercel.app/) + **Render** (backend) — author-confirmed

## 8. Hard parts
- **Three-mode split calculator + live validation** — equal sends `splitWith`; unequal/percentage send `shares[]` and block submit unless sums match (`remaining===0.00` / percentages `===100`); live recompute via `useEffect`. `src/components/ExpenseModal.jsx:35-86`. *(Client validates/forwards only; debt math is backend.)*
- **Balance ↔ name reconciliation** — joins `userId`-keyed balances to friend names client-side, fallback "Unknown User". `src/pages/Dashboard.jsx:46-53`.
- **Settle-up flow** — only `amount<0` debts settleable; records `Math.abs(amount)` then refetches. `src/pages/Dashboard.jsx:94-121`.
- **Tailwind via CDN** — `@tailwind` directives in `index.css` are dead (no PostCSS plugin); CDN does the styling. `index.html:8`.
- **Repetition smell** — auth header config hand-rolled in every service; no shared axios instance/interceptor, no global 401 handling. `src/features/*Service*`.
- **Code duplication** — `EditExpenseModal.jsx` is a near-verbatim copy of `ExpenseModal.jsx` (heading still says "Add New Expense"). `src/components/EditExpenseModal.jsx:110`.

## 9. Metrics
| Claim | Value | Status | Confidence | Source |
|---|---|---|---|---|
| Domain service modules | 7 | MEASURED | high | `src/features/` |
| App routes | 4 | MEASURED | high | `src/App.jsx:21-27` |
| Split modes supported | 3 (equal/unequal/%) | MEASURED | high | `ExpenseModal.jsx:143-145` |
| Components + pages | 14 | MEASURED | high | `src/components` + `src/pages` |
| Backend REST routes | 19 | MEASURED | high | counted `router.*` in `splitit-backend/routes/` (+ `/api/test`) |
| Frontend axios call sites | 18 | MEASURED | high | counted in `splitit-frontend-vite/src/features/*` |
| Git commits (frontend / backend) | 3 / 7 | MEASURED | high | git log |
| Production URL (frontend) | https://splitit-frontend-vite.vercel.app/ | MEASURED | high | live deploy |
| Real users | 0 (demo/fake data) | MEASURED | high | author-confirmed |
| Load-latency improvement % | — | N/A | — | not benchmarked (author-confirmed) |

## 10. Top candidate bullets (edit before use)
1. **Feature-sliced React SPA** [full-stack / frontend] — React 19 + Vite client with a domain-isolated axios service layer (7 modules) over route-guarded pages. `src/features/`, `src/App.jsx`. Tier 1.
2. **Client-side expense-split engine** [frontend] — equal/unequal/percentage splits with live remaining-balance calculator + submit-time validation. `ExpenseModal.jsx:35-86`. Tier 1.
3. **JWT auth + persistent session + route guard** [frontend] — zustand + localStorage, Bearer token per request, React Router v7 `Outlet`/`Navigate` gate. `authStore.jsx:4-8`, `PrivateRoute.jsx`. Tier 1.
4. **Concurrent dashboard data load** [frontend] — `Promise.all` for friends/groups/balances + client-side balance↔name reconciliation. `Dashboard.jsx:34-53`. Tier 2. *(Keep latency claim qualitative.)*
5. **Full CRUD UX** [frontend] — groups, expenses, friends, settle-up payments, activity feeds via react-modal + react-hot-toast. `GroupPage.jsx`, `*Modal.jsx`. Tier 2.
6. **Env-parameterized API base + dev proxy** [frontend / generalist-sde] — `VITE_API_URL` + Vite `/api` proxy for local/prod parity. `vite.config.js:7-11`, commit `530de3c`. Tier 3.

## 11. Interview hooks
- **Q: How is the API layer organized?** → One axios `*Service` module per backend resource; components import the service and pass `user.token`. `groupService.jsx:54-60`.
- **Q: How do you keep users logged in?** → zustand store seeded from localStorage; login writes the user (incl. token) back to localStorage. `authStore.jsx:4-8`.
- **Q: How are routes protected?** → `PrivateRoute` returns `<Outlet/>` if a user exists, else `<Navigate to="/login"/>`. `PrivateRoute.jsx:4-10`.
- **Q: How do unequal/percentage splits stay valid?** → Live `useEffect` recomputes remaining; submit blocked unless shares sum to total / 100%. `ExpenseModal.jsx:35-86`. (Backend does the actual debt math.)
- **Q: Why Tailwind via CDN?** → Local Tailwind build kept breaking, so I used the CDN to keep moving — Tailwind is still the styling system; I'd wire the PostCSS build for production.
- **Q: What would you refactor?** → Shared axios instance + interceptor for auth headers and 401 handling; de-duplicate Edit/Add expense modals; move JWT off localStorage.

## 13. NEEDS HUMAN INPUT
- [x] Promise.all — not measured; no % claim.
- [x] Endpoint count — **18** frontend axios sites / **19** backend routes (verified from repos).
- [x] zustand vs React Query — **deliberate simplicity**: small SPA with 7 resource modules; zustand for minimal auth persistence without Redux/React Query overhead (agent framing for interviews).
- [x] Motivation — learning full-stack; free alternative to paid Splitwise-style apps.
- [x] Live URL — https://splitit-frontend-vite.vercel.app/ + Render backend.
- [x] Full-stack — author built **both** frontend and backend.
- [x] Usage — fake demo data only.

## 13b. Author Q&A log (2026-06-29)
See checked items above. Backend `readme.md` checklist is **stale** — groups, expenses, balances, payments, and activity routes are implemented in code.

## 14. Re-crawl triggers (capsule goes stale if…)
- Backend host changes (Render → DigitalOcean migration completes) or `VITE_API_URL` target moves.
- Tailwind moves from CDN to a real PostCSS/build pipeline.
- A shared axios instance/interceptor or React Query is introduced (kills the "repetition smell").
- Auth moves off localStorage, or real accounts/sessions are added.
- Tests or CI/CD are added (would flip the 0 rows in §9).
- Routes / service modules / split-mode counts change (metrics §9).
- App stops being demo-only (real users).
