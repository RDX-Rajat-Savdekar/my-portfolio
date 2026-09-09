# Rajat journal — drill performance (2026-08-27)

Branch: `rajat-fix-drill` (from `origin/pranav-environment-setup`)
Unity: 2021.3.45, Quest target. All numbers below are **editor / XR Device Simulator**, not a headset.

This is the write-up of the drill work: what the product actually does, what we changed, how we measured it, what the numbers say, and what we should **not** treat as the long-term fix.

**§0** is the resume reference. Everything after that is the engineering record. Resume copy is not gated by this journal.

---

## 0. Resume reference

Draft lines for an Easely / MedicalVR experience block. Past tense, one number per bullet, mechanism in the middle. All fps / ms numbers below are **Unity editor + XR Device Simulator**, not Quest.

### Product (one line)

MedicalVR is a Meta Quest surgical-training sandbox in Unity 2021.3 / OpenXR / XR Interaction Toolkit: grab tools in an OR or field tent, operate on a bunion-foot mesh (marker, scalpel, drill, bonesaw, chevron osteotomy), optional voice commands, session record/replay, AI narration. The documented assignment here is **drill performance**, not the whole product.

### What you owned

- **Did:** read the real drill path (`DrillHoleMaker` on the bit + `DrillNew` on anatomy; grab shell does not cut); optimized the `DrillNew` hot path; built isolated ToolLab scenes on the real foot; built an automated frame-time harness; compared Jungle vs lab on the same 2807-vert cuboid; showed Jungle’s extra cost was ~256 idle non-convex MeshColliders on a human skeleton; prototyped physics layers (`drillableSurfaces` / `CutTool`) as the product pattern; Play Mode NRE guards so Jungle can run without Core / ReplayManager.
- **Did not:** measure on a headset; strip `DrillNew` from the Jungle prefab (runtime pruner is a diagnostic); ship an octree; own narration, replay backend, or other tools.

### Draft bullets (pick 3)

Use these as copy-paste starters.

1. **Intro / product.** Optimized runtime bone drilling in a Unity XR surgical trainer targeting Meta Quest by isolating a ~22-bone foot lab from a 256-collider play scene and replacing a per-frame world-space vertex walk with local-space tests, lazy mesh clones, and MeshCollider recooks throttled to 0.15 s
2. **Diagnosis (the judgment line).** Traced a ~2.5x editor frame-time gap (Jungle 2.1 ms p95 vs lab 0.8 ms on the same 2807-vert cuboid) to ~256 idle non-convex MeshColliders on a full human skeleton, not the surgical-foot vertex loop
3. **Measurement.** Built a Play Mode harness and editor menu that parks the drill bit in a named bone and logs CSV p95, so ToolLab vs Jungle runs compare the same cuboid instead of silently falling back to a 5178-vert skeleton mesh
4. **Architecture (swap with 3 if the JD wants physics / XR).** Designed a foot-only `drillableSurfaces` / `CutTool` physics-layer pattern so the bit ignores Default-layer room and skeleton meshes after a runtime pruner of 253 skeleton colliders barely moved Jungle (1.75 → 1.62 ms)

### Numbers you may use (and how to say them)

| Claim | Exact basis | Interview phrasing |
|---|---|---|
| ~22 vs ~256 drill targets | Enabled `DrillNew` in ToolLab vs Jungle | “Surgical foot is ~22 bones. The play scene had copied the same script onto a full skeleton, ~256 objects.” |
| 2807-vert cuboid | Fair bone for ToolLab and Jungle | “Same named bone, same vert count. First Jungle run was invalid because the foot was inactive.” |
| Lab ~0.8 ms p95 / Jungle ~2.1 ms p95 | §4 table, cuboid vs cuboid | “About 2.5× in the editor. p95, not max — max was a scene-switch hitch.” |
| 0.15 s collider throttle | `heavyUpdateInterval` | “Recook MeshCollider at most every 150 ms while the bit is in bone, plus on exit.” |
| Pruner 1.75 → 1.62 ms | Jungle all-on vs pruned | “Killing 253 skeleton colliders barely moved Jungle. Do not put that on a resume as a win.” |

### Editor vs headset notes

- fps / ms numbers in this journal are Unity editor + XR Device Simulator, not Quest.
- Prefab still has the skeleton colliders; the runtime pruner is a diagnostic, not a product ship.
- Octree / spatial index was not built.
- Grabbing the drill does not cut bone; the bit trigger does.

### Keywords to thread (only if the JD has them)

Unity, C#, XR Interaction Toolkit, OpenXR, Meta Quest, MeshCollider, PhysX, profiler / frame time, physics layers, Play Mode instrumentation.

### 30-second screen answer

“They asked why the drill scene was heavy. First I checked the tool — the grab script does nothing; a 2 cm trigger on the bit displaces vertices on anything with `DrillNew`. I made that loop cheaper (local space, skip no-op uploads, throttle collider cooks). Then I measured: isolated foot lab vs the play scene, same bone. Play scene was still ~2.5× slower because someone put `DrillNew` plus non-convex MeshColliders on a whole skeleton, ~256 of them, and physics tests those every step even when you are not drilling. The product fix is foot-only targets and CutTool layers, not an octree. We have not proven it on Quest yet.”

---

## 1. Assignment and what “drilling” actually is

The assigned problem was drill performance. Kris’s play scene (`JungleScene_KrisToolTesting`) felt heavy. The first guess was “the drill mesh code is too slow.” That was only half true.

**Grabbing the drill does nothing to bone.** `MVRTool_Drill` is an empty grab shell. Cutting starts only when the tiny trigger on the bit, `CutVolume` (`DrillHoleMaker`, `holeRadius` ≈ 0.02), overlaps a mesh that has `DrillNew`. No Space / trigger button is required. If the bit is not inside a bone, `OnTriggerStay` never runs.

Anatomy that matters for surgery is the bunion foot prefab (`BunionFoot-v2` / `v3`): named bones like `talus`, `calcanus`, `cuboid`, `metatrl*`, plus soft tissue `footr`. Jungle also had a **full human skeleton** (`skeleton.*`, `humanbody-edit`) with the same `DrillNew` + non-convex `MeshCollider` pattern copied onto ~255 objects.

That last part is the real cost in Jungle: idle physics against hundreds of triangle meshes, every physics step, whether you are drilling or not.

---

## 2. Process (how we actually figured this out)

1. **Read the tool path.** Confirmed `MVRTool_Drill` does not cut. Pattern is `DrillHoleMaker` on the bit + `DrillNew` on anatomy.
2. **Looked at Jungle.** Counted `DrillNew`: on the order of **255**, mostly skeleton, not the ~25 foot bones.
3. **Optimized `DrillNew` first anyway.** The per-frame hot path was genuinely wasteful (full world-space vertex walk, mesh upload every stay, collider recook every stay, submesh add every frame, `Start()` clone on every object). That work is still correct to keep.
4. **Built an isolated lab** so we could see foot-only cost without Jungle’s skeleton and environment: `ToolLab_Drill`.
5. **Automated measurement.** Manual grab in XR Device Simulator was too noisy (WASD vs grip, missing the 1 cm bit). `DrillPerfHarness` parks `CutVolume` inside `cuboid` for ~6 s and appends CSV.
6. **Compared scenes on the same bone.** First Jungle run cheated: the bunion foot was inactive, so the harness fell back to `skeleton.027` (5178 verts). After that we force-find `cuboid` (including inactive), activate the hierarchy, and compare 2807-vert cuboid vs cuboid.
7. **Hunted the leftover Jungle gap.** After `DrillNew` was cheap, Jungle was still ~2.5× slower in editor. Profiler-style reasoning + collider counts pointed at **idle MeshColliders**, not the drill inner loop.
8. **Tried a runtime pruner** (disable non-foot `DrillNew` / `MeshCollider` if there are >40). Confirmed it is **not** the product fix.
9. **Built the long-term pattern in a new scene** (`ToolLab_DrillOptimized`): foot-only `DrillNew`, physics layers so the bit does not test Default-layer room/skeleton.
10. **Re-ran ToolLab / Optimized / Jungle** and compared.

CSV lives at `MedicalVR-src/Logs/DrillPerf/drill_perf.csv` (gitignored). Older schema rows are in `drill_perf_before_layers.csv`.

How to re-run: stop Play, then **MVR → Drill Perf → Run all (ToolLab, Optimized, Jungle)**. Individual scenes have their own menu items. Click Game view if you test by hand; **Y/T** for the simulated controller, **G** grip, push the **bit** into a **bone**. Do not use Space.

---

## 3. Changes we made

### 3.1 `DrillNew` hot path (commit `8a57529d`)

File: `MedicalVR-src/Assets/MVR/Scripts/TestScript/DrillNew.cs`

Same idea applied to `TestMedicalVRDrill.cs`. `DrillNewNew.cs` (decal stamp) was left alone.

| Before | After |
|---|---|
| `Start()` clones the mesh on every object | Lazy clone on first actual drill (`EnsureRuntimeMesh`) |
| World `TransformPoint` + `Distance` every vertex, every `OnTriggerStay` | Local space + `sqrMagnitude`; world radius via `InverseTransformVector` |
| Radius test used `>=` (cube at exactly 0.080 could fail) | Inclusive `>` |
| Always `mesh.vertices` + `RecalculateNormals()` | Skip mesh upload if no verts moved |
| Recook `MeshCollider` every stay | Collider + normals at most every **0.15 s** (`heavyUpdateInterval`), plus on trigger exit |
| `UpdateSubmeshes()` could add a submesh every frame | Inner-hole submesh once |
| No cached bit | Cache `DrillHoleMaker` |
| `debugDrill` default **true** (256 warnings in Jungle) | Default **false**; `ApplyLabSettings` / `SetDebug` for the lab |

This is the right code for “one bone being drilled.” It does **not** fix 256 idle MeshColliders.

### 3.2 Isolated lab scene (same commit)

`Assets/MVR/Scenes/Sandbox/ToolLab/ToolLab_Drill.unity`

- XR Origin MVR, `Tool_Drill` (keyboard WASD + R/F) and `Tool_Drill (VR)` (grip), XR Device Simulator, `BunionFoot-v2`, `TestScene_Room`.
- `DrillLabBindFoot` (execution order −40) adds `DrillNew` + `MeshCollider` at runtime to foot meshes, **skips `footr`**.
- Two drills exist because the simulator also uses WASD; VR copy is grab, back copy is fly.
- Pink room: `Mat_GridWorldSpace` had a missing Shader Graph; retargeted to URP Lit. Skybox set to the XRI cubemap.
- `tent.ma` was moved out of Assets to `MayaSource/tent.ma` so Unity stops requiring Maya.
- Added to Editor Build Settings.

### 3.3 Perf harness (commit `a40669f5`)

- Runtime: `DrillPerfHarness.cs` — park bit in named bone (`cuboid`), warmup + 6 s sample, append CSV.
- Editor: `Assets/Editor/DrillPerfMenu.cs` — **MVR → Drill Perf**.
- Later: count **enabled** `DrillNew` vs total, and enabled `MeshCollider`s, so Jungle after prune is readable.
- Menu now queues **ToolLab → Optimized → Jungle**.

### 3.4 Jungle Play Mode NREs (uncommitted until this journal push)

Jungle is missing `Core` / `ReplayManager` / `Outline` that other scenes assume.

- `MVRGrabInteractable.Start`: null `Outline`; `Core.Ins != null` before `GetService`.
- `ReplayableTool` / `ReplayableHardware`: skip register if `ReplayManager.Instance == null`.
- `ChevronNew.clear()`: null-check `lineToLineRayGenerator`.

These are Play Mode crash guards, not drill math.

### 3.5 Runtime pruner (not the long-term fix)

`DrillTargetPruner.cs`: AfterSceneLoad, if more than 40 `DrillNew`, disable script + MeshCollider unless under `BunionFoot` (or named `DrillTarget` / `temp_Bone` / `cuboid`).

This is a measurement / editor-Jungle crutch. It does not change the prefab. The product fix is: **do not put `DrillNew` on the human skeleton in the first place.**

### 3.6 Optimized lab scene (this push)

`Assets/MVR/Scenes/Sandbox/ToolLab/ToolLab_DrillOptimized.unity`

Copy of ToolLab with `DrillLabBindFoot.applyPhysicsLayers = true`:

- Foot bone GameObjects → layer 3 `drillableSurfaces`.
- Each `DrillHoleMaker` (`CutVolume` only, not XR Origin / grab colliders) → layer 8 `CutTool`.
- `Physics.IgnoreLayerCollision(CutTool, Default, true)` while that binder lives; restored on destroy so it does not leak into the next scene.

Project already had those layer names in TagManager. CutTool still collides with `drillableSurfaces`, so the hole still works.

---

## 4. Metrics (editor, cuboid, 2807 verts unless noted)

Fair comparison is **cuboid vs cuboid**. Ignore the first Jungle row that drilled `skeleton.027`.

| Time | Scene | Bone | DrillNew (enabled / total) | MeshColliders on | avg ms | p95 ms | fps |
|---|---|---|---|---|---|---|---|
| 15:07 | ToolLab_Drill | cuboid | 23 | — | 0.689 | 0.805 | ~1452 |
| 15:08 | Jungle (all DrillNew live) | cuboid | 256 | ~266 | 1.747 | 2.089 | ~572 |
| 15:30 | ToolLab_DrillOptimized (layers) | cuboid | 22 / 23 | 27 | 0.751 | 0.884 | ~1331 |
| 15:30 | Jungle (pruner on) | cuboid | 3 / 256 | 14 | 1.625 | 1.811 | ~615 |

Notes:

- All of these are **far under 72 Hz in the editor**. That does not prove Quest.
- Optimized vs ToolLab is noise (~0.75 vs ~0.69 ms). Layers did not help the isolated lab, because the lab has no skeleton for the bit to ignore.
- Max ~387 ms on the 15:30 runs is a hitch (script reload / scene switch), not drilling. **p95 is the number to trust.**
- Jungle after prune (3 enabled `DrillNew`) is still ~2× the lab (~1.8 ms p95 vs ~0.8 ms). The leftover is the rest of Jungle (environment, other systems), not the foot drill loop.
- Pruning 253 skeleton colliders barely moved Jungle (1.75 → 1.62 ms). In the editor, Jungle’s baseline is expensive even with a sane drill setup.

---

## 5. Findings (the point of the work)

1. **The drill inner loop was sloppy and is now cheaper.** Lazy clone, local-space tests, skip no-op uploads, throttle collider recooks. Keep this.
2. **Jungle’s drill cost was mostly “255 copies of DrillNew on a human skeleton,” not “cuboid is too many verts.”** Kris’s scene is a bad place to judge surgical-foot drill perf.
3. **Idle non-convex MeshColliders dominate, not `OnTriggerStay`, once you are not overlapping.** If the bit is in empty air, DrillNew does nothing; physics still tests every enabled MeshCollider against everything it can hit.
4. **An isolated foot lab (~22 bones) is the right editor proxy for the surgical task.** ToolLab and Optimized are both ~0.7–0.9 ms p95 on cuboid.
5. **Physics layers are the right product pattern, but they are not a magic editor-fps win** until the bit is in a scene full of Default-layer junk. Prove them on Quest, in Jungle or a real OR, not by comparing two empty labs.
6. **The runtime pruner is a diagnostic, not shipping architecture.** Strip `DrillNew` from skeleton in the prefab/scene. Optionally keep cheap colliders and only recook a full MeshCollider on the bone you are actually drilling.
7. **Editor fps is the wrong pass/fail.** 600 fps Jungle vs 1400 fps lab is interesting. Quest 72/90 Hz with the same 256 MeshColliders is the actual risk. We have not measured on device yet.

---

## 6. Tradeoffs

**Throttle collider recooks (0.15 s)**
- Win: huge cut in MeshCollider cooking while holding the bit in bone.
- Cost: collider can lag the visible hole for a fraction of a second; another tool might briefly disagree with the mesh. Recook on trigger exit covers “just finished this hole.”

**Lazy mesh clone**
- Win: 22–256 objects no longer duplicate meshes at `Start()`.
- Cost: first contact with a bone pays a clone hitch. Acceptable.

**debugDrill default false**
- Win: Jungle no longer dumps a warning per bone.
- Cost: you must opt in to see “CutVolume overlapping but no verts in radius.”

**Two drills in ToolLab (keyboard + VR)**
- Win: can test without grabbing.
- Cost: two `CutVolume`s; WASD also moves the simulator camera. Easy to think “drill is broken” when you are flying the wrong object.

**Runtime pruner**
- Win: lets Jungle Play Mode look more like “foot only” without editing 255 YAML objects.
- Cost: hides the scene bug; `FindObjectsOfType` still reports 256 components; jungle foot may be inactive so “kept” count can be 2–3 instead of ~22. Do not ship this as the design.

**Ignore CutTool vs Default at runtime**
- Win: bit stops generating contacts against room / Default skeleton.
- Cost: must restore on destroy or it leaks into the next Play Mode scene. Must never put XR Origin or grab colliders on CutTool. Bones must be on `drillableSurfaces` or the bit would ignore them too.

**Not building an octree / spatial index yet**
- One 2807-vert cuboid is already cheap in editor after the hot-path fix. Spatial index is for “one dense bone is still heavy on Quest,” not for “we parented DrillNew to a whole person.”

**NRE guards in grab/replay/chevron**
- Win: Jungle and ToolLab can Play without Core/ReplayManager.
- Cost: those scenes still do not have replay or command service. Guards are not a substitute for wiring those scenes correctly if we need those systems.

---

## 7. Long-term plan (agreed, only partly done)

1. **Prefab/scene:** `DrillNew` only on surgical foot bones. Strip it from the human skeleton in Jungle (or don’t use that skeleton in a drill playtest).
2. **Physics layers:** bones `drillableSurfaces`, bit `CutVolume` only on `CutTool`, ignore CutTool vs Default. That is what `ToolLab_DrillOptimized` does at runtime.
3. **Cheap idle colliders** (box / convex) on bones; full MeshCollider only while that bone is being drilled — not implemented yet.
4. **Keep the current `DrillNew` hot path.** Octree later if a single bone is still heavy on Quest.
5. **Prove on Quest**, not editor fps.

---

## 8. How to use the scenes

| Scene | What it is |
|---|---|
| `ToolLab_Drill` | Isolated foot, default layers, ~22 `DrillNew`. Baseline. |
| `ToolLab_DrillOptimized` | Same foot, layers on. Product-pattern lab. |
| `JungleScene_KrisToolTesting` | Play scene. ~256 `DrillNew` on skeleton + foot. Pruner disables non-foot at runtime. |

Menu: **MVR → Drill Perf → Run all**.

Manual: grab VR drill, push **bit** into **bone**, hold. Skin `footr` is not drillable in the lab binder.

---

## 9. Commits on this branch

- `8a57529d` — Optimize drill mesh edits and add isolated ToolLab on the real foot.
- `a40669f5` — Auto-drill perf harness (ToolLab vs Jungle without grabbing).
- (this push) — Optimized lab + layers, Jungle NRE guards, pruner, journal, harness/menu updates.

Do not commit local noise: `OpenXR Package Settings.asset`, `MedicalVR-src.slnx`, `google-services-desktop.json`, `GvhProjectSettings.xml`.
