# Caliberate — Context Capsule

> Technical briefing. Resume numbers are not gated by this file.

## 1. Meta
- **Project id:** `caliberate`
- **Name:** Caliberate (also referred to as Caliber in planning docs)
- **Repo:** https://github.com/RDX-Rajat-Savdekar/Caliberate
- **Local:** `/Users/rajatsavdekar/Documents/GitHub/Caliberate`
- **Crawl date:** 2026-09-09
- **Author:** Rajat Savdekar, solo (1 commit)
- **Status:** Planning lock only. No harness code in the repo yet.

## 2. Identity + problem
Eval harness for LLM-generated code patches: sandboxed Docker workers, hidden tests as the solve bit, an LLM-as-judge after you calibrate it, CI gate on a task set you authored.

Thesis in the docs: calibrate the judge and the tasks before you trust a number. Pitch is "I treat models like something you can measure," not "I want to be an eval engineer."

Fills the backend + AI project slot next to MockPad (CRDT / collab) on the resume.

## 3. What is actually in the repo
| File | What it is |
|---|---|
| `start.md` | Why it exists, market notes, 4–6 week slice, suggested stack |
| `PLAN.md` | Long-horizon plan (Horizon A = resume slice) |
| `DECISIONS.md` | Locked stack choices with industry survey |
| `NEVER.md` | Originally an honesty contract; no longer a resume gate |
| `.cursor/rules/industry-then-tradeoff.mdc` | Survey industry, write tradeoff, lock one choice |

No `src/`, no Dockerfiles, no Postgres schema, no GitHub Actions, no tasks, no UI.

## 4. Locked decisions (from `DECISIONS.md`, 2026-08-28)
- Own the runner. Harbor-compatible task directory on disk (`instruction.md`, `task.toml`, `environment/Dockerfile`, `tests/test.sh` → `/logs/verifier/reward.txt`). Do not depend on Harbor/Inspect at runtime in Horizon A.
- `Sandbox` protocol + hardened Docker now (`network_mode=none`, cpu/mem caps). Firecracker later.
- Postgres as source of truth; workers claim with `SKIP LOCKED`. Redis/Temporal later.
- Two-tier grade: hidden tests = solved; LLM-as-judge for taste/minimality after calibration (Cohen's kappa vs self-labels).
- Task calibration stolen from Senior SWE-Bench: 3× oracle patch, 3× no-op; reject leaky tasks.

## 5. Intended stack
Python, FastAPI, PostgreSQL, Docker, GitHub Actions. Frontend is a sprinkle (dashboard of pass rate / kappa / $/task / p95), not week-1 work.

Suggested Horizon A scope in the docs: 30–50 tasks, 3–5 OSS repos, 3 pinned models.

## 6. Resume bullets currently on `latex_resume/12.tex`
```
Runs candidate model patches in isolated Docker containers off a PostgreSQL SKIP LOCKED
work queue, with leases so a crashed worker releases its task instead of losing it.

Wired into CI to run the regression suite against each patch and reject the ones that break it.
```

Those describe the plan, not committed code. Use whatever numbers you want on the page.

## 7. Links
- GitHub: https://github.com/RDX-Rajat-Savdekar/Caliberate
- Portfolio case study: `/writing/caliberate`
