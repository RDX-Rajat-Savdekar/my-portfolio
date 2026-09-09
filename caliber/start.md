# Caliber

Eval harness that scores LLM-generated code patches in sandboxed containers, with a judge you validated against your own human labels, wired into a CI regression gate.

The name is the thesis: **calibrate** the judge and the tasks before you trust any number. Everyone can wrap SWE-bench. Almost nobody publishes agreement rates.

This file is the briefing. Do not re-open the chat that produced it unless you need the resume-audit context around MockPad / CloudBridge / DevStack / Easely.

---

## 1. Why this exists

Resume philosophy: **backend + AI**, with a sprinkle of frontend. Current project slot is thin:

| Keep | Reframe | Cut |
|---|---|---|
| MockPad — real CRDT collab, deployed, weekly users | CloudBridge — Next.js advisor, not FastAPI/Terraform | DevStack — one commit, GraphQL claim is false |
| Aura — honors, 2nd place hackathon | Easely bullets — currently *targets*, not measured | SplitIt — demo, 0 users |

You do not have a third project that carries a backend+AI resume. Caliber fills that slot.

Every bullet this project can produce is a number you can put on the page (agreement rate, flakiness, $/run, p95 wall-clock).

---

## 2. Market research (Aug 2026)

There are two things people mean by "AI code eval." Only one is the path.

### 2.1 The job function (not the target)

Labs and data vendors hire people to design benchmark tasks and verifiers. Real, actively posting:

- [OpenTrain — AI Benchmark Engineer](https://www.opentrain.ai/jobs/ai-benchmark-engineer-software-engineering--cmryuo2op00030ajkxq7iy077/) — Harbor, Docker, Python verifiers, multi-agent task design from real OSS diffs. 5+ years, 4-week contractor, PST overlap.
- [Epoch AI — Software Engineer, Benchmarking](https://jobs.lever.co/epoch-ai/d172645e-a11f-44a0-88d0-7a989e0a28f6) — Inspect library, run/maintain eval infra, design new benchmarks. 2+ years.
- [Mindrift — Senior SWE, AI Coding Benchmarks](https://remoteleaf.com/company/mindriftai-be-the-i-in-ai/senior-software-engineer-ai-coding-benchmarks-poland/) — Docker/Postgres/Kafka/Redis, write tests that accept all correct approaches, ~20h task assignments, up to ~$40/hr. 5+ years.

These are mostly senior/contract. Not a new-grad job title. Do not pitch Caliber as "I want to be an eval engineer." Pitch it as "I treat models like something you can measure."

### 2.2 The skill (the actual signal)

- [Dexity, 390 live AI-engineer JDs](https://dexity.com/intel/ai-engineer-career-path-2026): LLMs 63%, Python 59%, **evals 56%**, agents 50%. RAG and fine-tuning ~26% each. Evals called the **#1 differentiator**.
- [Digital Applied / AI Career Lab 2026](https://www.digitalapplied.com/blog/ai-developer-hiring-skills-that-matter-2026): eval literacy is "the single biggest signal of 'this person actually built with LLMs' vs watching YouTube videos." Recommended screen: walk through an eval you designed — metric, dataset, how it was kept fresh, what it caught.
- [techinterview.org](https://www.techinterview.org/post/3233476828/llm-eval-prompt-interview-questions/): "The eval round is the new system design interview" at OpenAI, Anthropic, Scale, Sierra, Series B AI companies. The answer that marks experience: **judge-against-humans before you trust judge-against-model** (Cohen's kappa / agreement rate).
- [Vibe Engines — LLM evals handbook](https://vibeengines.com/handbook/llm-evals-interview) and [eval + observability system design](https://vibeengines.com/ai-system-design/llm-eval-observability-system-design): golden sets, LLM-as-judge calibration, CI regression gate, online vs offline, production drift loop.

### 2.3 The state of the art (do not rebuild this)

[Senior SWE-Bench](https://snorkel.ai/leaderboard/senior-swe-bench/) (Snorkel + Princeton + UW–Madison) is the current bar:

- 50 public + 50 private tasks from real PRs across 12 OSS repos (PostHog, Gitea, Harbor, Better Auth, …).
- Harness: Mini-SWE-Agent via **Harbor**.
- Two scores: Basic Solve (tests pass) vs Tasteful Solve (six gates: verifiers + validation + rubric + bloat + practice + relative taste).
- Frontier models: Opus 4.8 leads at **24% tasteful pass@1**. Top models fail senior-level correctness + taste **>75%** of the time.
- Task calibration they use (steal this): run each task **3× on the oracle patch** and **3× on a no-op**; reject if `pass³ < 1` on oracle or `pass³ > 0` on no-op.
- Taste: two-judge panel (Sonnet + GPT), averaged, calibrated against human reviewers.

Harbor and Inspect are the two frameworks to *know*, not to clone.

**Do not rebuild SWE-bench.** Scope is 30–50 tasks, 3–5 repos, 3 models. The shareable artifact is *your* task set + calibration numbers + CI gate, not a leaderboard against Opus.

---

## 3. What to build

### 3.1 Product shape

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Task store │────▶│  Runner pool │────▶│  Two-tier grade │
│  (Postgres) │     │  (Docker,   │     │  tests + judge  │
│             │     │   queue,    │     │                 │
│  repo@sha   │     │   isolated) │     │  then calibrate │
│  issue text │     └──────────────┘     └────────┬────────┘
│  hidden     │                                    │
│  tests      │                                    ▼
└─────────────┘                          ┌─────────────────┐
                                         │  Results + cost │
                                         │  CI gate        │
                                         │  small UI      │
                                         └─────────────────┘
```

### 3.2 Components (backend first)

**Task store (Postgres)**
- One row per task: `repo_url`, `base_sha`, `issue_md`, `oracle_patch` (hidden from the agent), `hidden_tests` (path + command), tags (bug / feature / perf), stack.
- Version the golden set. A task that changes is a new version, not an edit-in-place. Interviewers ask "how was the set kept fresh."
- Mine from real PRs. Prefer PRs you can explain. 3–5 OSS repos you already know (Python/TS backends: FastAPI, Flask, Node, or a small infra tool). Do not use toy Fibonacci repos.

**Runner**
- One Docker container per task. Network off. CPU + memory caps. Hard timeout.
- Queue (Redis or Postgres `SKIP LOCKED`) so N tasks run in parallel.
- This is where the backend engineering lives: isolation, cleanup, retries, crash recovery, artifact capture (stdout, patch, test log).
- Record wall-clock, token in/out, $ estimate per (task, model, attempt).

**Two-tier grading**
1. **Programmatic verifier** — hidden tests pass or fail. Deterministic. Cheap. This is the source of truth for "solved."
2. **LLM-as-judge** — rubric for minimality, convention alignment, bloat. Run only after tests pass, or always if you want failure taxonomy. Never treat the judge as the pass/fail without calibration.

**Judge calibration (the differentiator)**
- Hand-label ~150 outputs yourself (pass/fail on the rubric axes, or a 1–5).
- Run the judge over the same set.
- Report agreement: Cohen's kappa or plain agreement rate, plus confusion matrix.
- If kappa is ~0.65, *say so* and show what you changed (rubric rewrite, few-shot, route ambiguous slice to human).
- This is the interview answer from §2.2. Do not skip it to ship faster.

**Task calibration (stolen from Senior SWE-Bench, scaled down)**
- For each task: 3× oracle patch, 3× no-op (empty diff).
- Reject the task if oracle doesn't reliably pass or no-op ever passes.
- Publish the rejection log. "We threw out 12 of 48 candidates because the tests were leaky" is a better bullet than "48 tasks."

**CI gate**
- GitHub Action: on prompt / model / config change, run the suite (or a smoke subset) and fail the PR if a tracked metric regresses past a threshold.
- Treat prompts and model IDs like code. Pin them.
- A flaky-case list that grows as new failures get folded back into the golden set.

**Frontend sprinkle**
- Small dashboard: per-model pass rate, kappa, $/task, p95 wall-clock, flaky tasks, last CI run.
- Not the product. Do not spend week 1 on React.

### 3.3 Stack (suggested, not sacred)

| Layer | Default | Why |
|---|---|---|
| API / workers | Python + FastAPI | Matches resume Languages + Backend; eval ecosystem is Python |
| Store | PostgreSQL | Tasks, runs, labels, versions |
| Queue | Redis or PG `SKIP LOCKED` | You already claim Redis |
| Isolation | Docker | What the hiring JDs actually list |
| CI | GitHub Actions | You already claim CI/CD |
| Judge | One strong model, pinned | Calibrate *that* judge; don't swap weekly |
| Agent under test | Thin harness (apply patch from model, or a small tool-using loop) | You are grading patches, not building Mini-SWE-Agent |
| UI | Whatever is fastest (Next.js you already know) | Sprinkle |

FastAPI is allowed here because you will actually write it. Do not put FastAPI on CloudBridge.

### 3.4 Scope lock (4–6 weeks)

| In | Out |
|---|---|
| 30–50 calibrated tasks | Rebuilding SWE-bench / Harbor / Inspect |
| 3–5 real OSS repos | 12-repo leaderboard |
| 3 models compared | Multi-agent decomposition |
| Offline eval + CI gate | Online production monitoring / A/B |
| One calibrated judge | Unvalidated LLM-as-judge as gospel |
| Cost + latency per run | Claiming "sub-Nms" without a harness log |
| Public task set + results write-up | Private-only set with no artifact |

If a week is slipping, cut models to 2, tasks to 30, UI to a README table. Never cut calibration.

---

## 4. Resume bullets this should unlock

Drafts. Fill in whatever numbers you want on the page.

- Built **Caliber**, a sandboxed eval harness that runs LLM-generated patches against hidden tests in isolated Docker workers, scoring **N** tasks from **K** OSS repos.
- Calibrated an LLM-as-judge against **~150** self-labeled outputs (**κ = X**); rewrote the rubric after the first pass disagreed on **Y%** of convention-alignment cases.
- Rejected **M / T** candidate tasks that passed a no-op or failed the oracle across 3×3 calibration runs, then gated prompt and model changes in CI so a **Z-point** drop in pass rate blocked merge.
- Cut eval **$/run** by **P%** by … (batch, cache, cheaper verifier-first short-circuit).

Skills line: `LLM evals, Docker sandboxing, LLM-as-judge, CI regression gates`.

---

## 5. How this sits next to the rest of the resume

**Complements MockPad** — MockPad is distributed systems (CRDT, WebSockets, room TTL). Caliber is backend + measurement. Different axis.

**Complements CloudBridge (reframed)** — CloudBridge can later grow a *tiny* eval: "does Gemini beat the deterministic rules engine, and by how much." That is a one-weekend add-on, not a third project. Do not merge the repos.

**Easely AI-narration** — if B1 (quantize + cache) ever becomes true, Caliber is the offline suite you'd run before changing the medical LLM or the TTS batching. Same habit, different domain. Do not mix medical data into this repo.

**JFSS chatbot caching** — if that 35% is defensible, Caliber's cost-accounting is the same story in a cleaner setting. If it isn't, this project is the replacement AI-cost bullet.

---

## 6. Build sequence

1. **Week 0 — contract.** Pick 3 repos. Write the task schema. Decide the 3 models and pin versions.
2. **Week 1 — runner.** Docker per task, network off, timeout, artifact capture, one toy task that you can pass by hand. No judge yet.
3. **Week 2 — task mining.** 40 candidate tasks from real PRs. Oracle + no-op calibration. Keep ~30 that survive. Hidden tests must not be visible to the agent prompt.
4. **Week 3 — grader + judge.** Verifier first. Then judge. Label 150. Compute kappa. Iterate rubric once.
5. **Week 4 — CI + cost.** GitHub Action smoke subset on every prompt/config change. Per-run $ and p95 in the results table.
6. **Week 5–5.5 — publish.** Public task set, results write-up, dashboard if it exists. Record one demo of a failing CI gate.

Repo should live next to the others (`~/Documents/GitHub/caliber`), not inside `my-portfolio`. This folder in the portfolio is the planning capsule only.

---

## 7. Interview hooks (write answers after you have them)

- **How do you know the judge is any good?** → kappa vs my labels, confusion matrix, what I changed in the rubric.
- **How do you know the tasks are fair?** → 3× oracle / 3× no-op; rejection log.
- **What happens when a prompt change looks better but isn't?** → CI gate on the golden set; flaky list.
- **Why Docker, not a local venv?** → untrusted generated code; network off; reproducible.
- **Why not just run SWE-bench?** → I needed a set I authored, calibrated, and can defend in a screen. SWE-bench is a capability eval of models; this is a product-facing eval of *my* harness and *my* tasks.

---

## 8. Sources

- OpenTrain AI Benchmark Engineer JD (Harbor, Docker, Python verifiers).
- Epoch AI Software Engineer, Benchmarking JD (Inspect).
- Mindrift Senior SWE, AI Coding Benchmarks JD.
- Dexity Intel — AI Engineer Career Path 2026 (390 JDs).
- Digital Applied — AI Developer Hiring 2026.
- Vibe Engines — 51 LLM evals interview questions; eval + observability system design.
- techinterview.org — eval round as system design.
- Senior SWE-Bench — snorkel.ai/leaderboard/senior-swe-bench (oracle/no-op calibration, taste gates, Harbor).

Capsule written 2026-08-28 from the resume-audit conversation. Re-read this instead of re-deriving the project.
