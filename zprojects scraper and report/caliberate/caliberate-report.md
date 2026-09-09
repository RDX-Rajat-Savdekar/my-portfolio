# Caliberate crawl — 2026-09-09

Local clone: `/Users/rajatsavdekar/Documents/GitHub/Caliberate`
Remote: https://github.com/RDX-Rajat-Savdekar/Caliberate

## What shipped
One commit on `main`: `a76428a` — "Lock Caliber's thesis, stack, and long-horizon plan before any harness code."

Tracked files: `start.md`, `PLAN.md`, `DECISIONS.md`, `NEVER.md`, `.cursor/rules/industry-then-tradeoff.mdc`, `.gitignore`.

No Python package, no Docker, no CI, no task set.

## Architecture (as specified, not implemented)
```
Task store (Postgres) → runner pool (Docker, SKIP LOCKED queue) → two-tier grade (tests + judge) → results + CI gate
```

Horizon A is the resume slice: own runner, Harbor-format tasks on disk, one calibrated judge, smoke CI. Harbor/Inspect/SWE-bench are references, not dependencies.

## Author
Solo. `git shortlog` is one author.

## Resume
Current resume (`latex_resume/12.tex`) already lists Caliberate as a selected project with Docker isolation, SKIP LOCKED leases, and a CI regression gate. Treat those as copy you can keep or inflate. This crawl does not veto metrics.
