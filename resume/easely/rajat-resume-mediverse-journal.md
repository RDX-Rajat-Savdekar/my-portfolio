# Rajat resume journal — Mediverse / MedicalVR

Projected Easely experience block. Theme: **backend + AI.** Three bullets. No frontend line.

Draft numbers. Drill editor notes live in `rajat-journal.md`. Resume copy is not gated by this journal.

---

## Draft bullets (short)

Software Engineer, Backend & AI Infrastructure  
Easely — Mediverse / MedicalVR Surgical Training Platform

- Reduced AI-narration inference cost by 60% across 150+ surgical replays by 4-bit quantizing a 7B medical LLM, batching speech synthesis, and caching model plus translation outputs.
- Locked Quest training scenes at 72 Hz and cut drill frame time 4x by stripping 255 extra mesh-deform scripts and jobifying vertex updates, then added CI/CD that deploys Quest builds, runs a fixed drill pass against a baseline, and caught 8 regressions before merge.
- Cut replay upload failures by replacing 100 MB in-memory SQLite blobs with streamed object storage and a file API that matches the Quest client.

Slot map: B1 AI-narration cost · B2 Quest runtime + CI/CD · B3 replay store.

---

## LaTeX (paste into resume)

```latex
\workentry
  {Software Engineer}                          % title
  {Aug 2026 -- Present}                        % dates
  {Easely -- Mediverse / MedicalVR Surgical Training Platform} % company
  {Los Angeles, CA}                            % location
{
  \item Reduced AI-narration inference cost by \textbf{60\%} across \textbf{150+ surgical replays} by 4-bit quantizing a 7B medical LLM, batching speech synthesis, and caching model plus translation outputs.
  \item Locked Quest training scenes at \textbf{72 Hz} and cut drill frame time \textbf{4x} by stripping 255 extra mesh-deform scripts and jobifying vertex updates, then added CI/CD that deploys Quest builds, runs a fixed drill pass against a baseline, and caught \textbf{8} regressions before merge.
  \item Cut replay upload failures by replacing \textbf{100 MB} in-memory SQLite blobs with streamed object storage and a file API that matches the Quest client.
}
```


---

## Why these three (repo now → what to start)

### B1 — AI-narration cost

**Now:** `MedicalVR-narration-backend/` runs BioMistral-7B float16 with disk offload, Coqui glow-tts / XTTS v2 one sentence at a time, GPT-4 or NLLB translation as a **standalone** script (not on `/process`). Audio already has SHA256 skip-if-exists. No quantization. spaCy reloads on every hallucination check.

**Start:** wall-clock one full `/process` job (the “22 min” is a Unity comment, not your number). Quantize BioMistral to GGUF, keep the process warm, batch TTS, extend the audio hash cache to `final_mapped.json` and translated sentences so GPT-4 is not one HTTP call per sentence.

### B2 — Quest runtime + CI/CD (chosen)

Locked line combines 72 Hz, 4x drill, and CI/CD. AI-narration stays on B1.

**Now:** editor-only `DrillPerfHarness`. Jungle still has ~255 `DrillNew` + 266 non-convex MeshColliders. Hot path is cheaper but not jobified. No CI.

**Start:** strip skeleton `DrillNew` in the prefab; Burst/Jobs on the vertex loop; Quest p95 capture; GitHub Action deploys the Quest build, runs the harness against a checked-in baseline, fails the PR on a jump. Log catches so “8” is real. Convex colliders are optional engineering, not on the resume line.

### B3 — replay store (chosen)

**Now:** Unity `JsonUploader` posts to `medicalvrreplayserver.onrender.com` (`/upload`, `/download`, `X-API-Key`). In-repo `MedicalVR-backend/` is a different API: SQLite `TextField` blobs, 100 MB in-memory upload buffer, no streaming, no object storage, no auth.

**Start:** streamed object storage (not SQLite blobs). File API that matches `JsonUploader`. Count upload failures before/after so “cut failures” is a real number. Do not rest this bullet on Redis/FastAPI workers — that is AI-narration, and B1 already owns it.

---

## What not to mix in

- Editor cuboid fps from `rajat-journal.md` is not the 72 Hz claim. Measure that on Quest before you ship B2.
- `DrillTargetPruner` is not a win (1.75 → 1.62 ms). Do not cite it.
- You did not write BioMistral / XTTS / NLLB. Verbs stay on serving: quantized, batched, cached, queued.
- No fourth frontend/debrief bullet.

---

## Number checklist (replace before shipping)

| Token | Replace with |
|---|---|
| 60% | GPU-hour or token $ before vs after GGUF + cache |
| 150+ | actual replay/job count from the store |
| 72 Hz / 4x | Quest profiler, same cuboid, before vs after prefab + jobs |
| 8 | count of real CI/CD catches (keep a log) |
| upload failures | Quest upload error rate before vs after streamed storage |

---

## 6-month order (so the bullets become true)

1. Time the current AI-narration job. Quantize, batch TTS, extend hash cache. **Unlocks B1.**
2. Streamed object storage + file API that matches `JsonUploader`. Log upload failures. **Unlocks B3.**
3. Prefab strip + jobified drill. Quest capture. CI/CD: deploy Quest build, run harness vs baseline. **Unlocks B2.**
