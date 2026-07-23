# Tools Learning Guide

> Companion to `PORTFOLIO_RESEARCH.md`. A plain-English primer on every tool discussed,
> so a future agent can teach me the basics "to the extent I'll actually need them."
> Compiled: 2026-06-27. Owner: Rajat Savdekar.
>
> **Context for the teaching agent:** I'm an MS CS grad, comfortable with Unity (AR/VR +
> game design), JavaScript/React (my portfolio is React 19 + Vite + Tailwind), and general
> programming. I know these tool *names* but not what they are. Two goals: (1) build
> **interactive widgets embedded in web articles**, and (2) eventually make **3Blue1Brown /
> Sebastian Lague–style YouTube videos** (I'm leaning into the Unity path). Teach me each
> tool only to the depth those two goals require — not exhaustive mastery. Prefer: a 1-line
> mental model → a tiny runnable example → the 20% of features I'll use 80% of the time →
> one small exercise. Skip enterprise/edge features.

---

## How to read this doc
Each tool has the same card:
- **What it is** — one sentence.
- **Language / runtime** — what you write it in.
- **What it's for** — the job it does.
- **Why it's on my list** — how it maps to my 2 goals.
- **Mental model** — the one idea that makes it click.
- **Tiny taste** — minimal code/usage so it's not abstract.
- **Learn to this extent** — the scope to stop at.
- **First resource** — where to start.

Difficulty: 🟢 easy entry · 🟡 medium · 🔴 steep.

---

# CATEGORY 1 — Web-native interactive (embed in articles)
These run in the browser and drop into my existing React/Vite site.

## 1. D3.js 🟡
- **What it is:** A JavaScript library for building *custom* data-driven 2D graphics (SVG).
- **Language / runtime:** JavaScript, in the browser.
- **What it's for:** Bespoke charts + interactive visualizations (pan, zoom, drag, brush)
  where off-the-shelf chart libs are too rigid.
- **Why it's on my list:** The workhorse for interactive *explainer* widgets inside articles.
- **Mental model:** "**Bind data to DOM/SVG elements, then describe how they look & update.**"
  You don't draw a chart; you say "for each data point, there's a circle, here's where it
  goes," and D3 keeps the elements in sync with the data (`data().join()`).
- **Tiny taste:**
```js
d3.select("svg")
  .selectAll("circle")
  .data([10, 40, 80])      // bind data
  .join("circle")          // create one circle per item
  .attr("cx", (d, i) => 50 + i * 60)
  .attr("cy", 100)
  .attr("r", d => d / 4);  // radius driven by data
```
- **Learn to this extent:** selections + `data().join()`, scales (`scaleLinear`), axes, a
  simple transition, and one interaction (drag or hover tooltip). Skip the 50 chart sub-modules.
- **First resource:** d3js.org "What is D3" + Observable's "D3 in depth" intro notebooks.

## 2. Observable Plot 🟢
- **What it is:** A high-level charting library built *on top of* D3.
- **Language / runtime:** JavaScript, browser.
- **What it's for:** Standard charts (bar/line/scatter) in a few lines, without D3 boilerplate.
- **Why it's on my list:** Fast path when I just need a normal chart, not a custom widget.
- **Mental model:** "**D3 is a toolbox; Plot is the power tool for common jobs.**" You declare
  *marks* (dot, line, bar) over data and it figures out scales/axes.
- **Tiny taste:**
```js
Plot.plot({ marks: [ Plot.dot(data, { x: "weight", y: "height" }) ] });
```
- **Learn to this extent:** the `marks` concept + 3–4 mark types + basic options. That's it.
- **First resource:** observablehq.com/plot getting-started.

## 3. Three.js 🔴
- **What it is:** The standard JavaScript library for 3D graphics in the browser (WebGL).
- **Language / runtime:** JavaScript, browser (GPU via WebGL).
- **What it's for:** 3D scenes — meshes, cameras, lights, materials, animation.
- **Why it's on my list:** 3D/spatial explainers on the web. NOTE: my Unity/3D background
  means the *concepts* (scene graph, mesh, material, camera) will feel familiar.
- **Mental model:** "**Scene + Camera + Renderer.**" You put objects (meshes = geometry +
  material) into a scene, point a camera at it, and a renderer draws it each frame.
- **Tiny taste:**
```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
scene.add(cube);
// each frame: cube.rotation.x += 0.01; renderer.render(scene, camera);
```
- **Learn to this extent:** scene/camera/renderer, a mesh, basic lighting, the animation
  loop, OrbitControls. Then jump to R3F (below) for React integration. Skip raw shader
  authoring at first.
- **First resource:** threejs.org "Creating a scene" + "Three.js Journey" (Bruno Simon) intro.

## 4. React Three Fiber (R3F) 🟡
- **What it is:** Three.js wrapped in React — you write 3D scenes as JSX components.
- **Language / runtime:** JavaScript/JSX (React), browser.
- **What it's for:** 3D inside a React app using the same component/state patterns as the site.
- **Why it's on my list:** This is how 3D actually lands in *my* portfolio (React-based).
- **Mental model:** "**Three.js objects become JSX tags.**" `<mesh>`, `<boxGeometry>`,
  `<meshStandardMaterial>` instead of imperative `new THREE.*`.
- **Tiny taste:**
```jsx
<Canvas>
  <ambientLight />
  <mesh rotation={[0.4, 0.2, 0]}>
    <boxGeometry />
    <meshStandardMaterial color="hotpink" />
  </mesh>
</Canvas>
```
- **Key gotcha to learn:** high-frequency animation goes in `useFrame` with **refs**, never
  React state (or you trigger re-renders every frame). UI controls = React state; wrap them
  in `React.memo`. Global state = Zustand.
- **Learn to this extent:** `<Canvas>`, meshes/lights as JSX, `useFrame`, `useRef`, and the
  `@react-three/drei` helpers (OrbitControls, Environment). 
- **First resource:** r3f docs "Your first scene" + the `drei` helper list.

## 5. p5.js 🟢
- **What it is:** A friendly creative-coding library (modern Processing for the web).
- **Language / runtime:** JavaScript, browser (canvas).
- **What it's for:** Quick generative art, playful 2D sims, particle systems, sketches.
- **Why it's on my list:** Fastest way to prototype a *playful* interactive bit for an article.
- **Mental model:** "**`setup()` runs once, `draw()` runs every frame.**" You paint pixels.
- **Tiny taste:**
```js
function setup() { createCanvas(400, 400); }
function draw() { background(220); circle(mouseX, mouseY, 50); }
```
- **Learn to this extent:** setup/draw loop, shapes, `mouseX/Y`, a simple particle array,
  basic vectors. Great mental warm-up before D3/Three.
- **First resource:** p5js.org "Get Started" + The Coding Train (Dan Shiffman) videos.

## 6. KaTeX 🟢
- **What it is:** A fast library that renders LaTeX math notation into clean HTML.
- **Language / runtime:** JS library; you feed it LaTeX strings.
- **What it's for:** Beautiful equations in articles (e.g. `$\int_0^1 x^2 dx$`).
- **Why it's on my list:** Any math-flavored article/explainer needs real notation.
- **Mental model:** "**LaTeX string in → typeset math out.**"
- **Tiny taste:** `katex.render("c = \\pm\\sqrt{a^2 + b^2}", element);`
- **Learn to this extent:** how to render inline vs block, and basic LaTeX math syntax.
  Trivial — an afternoon.
- **First resource:** katex.org docs + a LaTeX math cheat sheet.

## 7. Pyodide 🟡
- **What it is:** CPython compiled to WebAssembly — runs real Python *in the browser*.
- **Language / runtime:** Python, executed client-side (no server).
- **What it's for:** Live, runnable Python code cells inside an article (numpy works too).
- **Why it's on my list:** "Run this code yourself" interactive lessons with zero backend.
- **Mental model:** "**A Python interpreter shipped as a download to the browser tab.**"
- **Tiny taste:**
```js
let pyodide = await loadPyodide();
pyodide.runPython("print(sum([1,2,3]))");
```
- **Learn to this extent:** load it, run a string, pass values JS↔Python, load a package
  (numpy). Skip advanced FFI.
- **First resource:** pyodide.org "Getting started".

## 8. Zustand 🟢
- **What it is:** A tiny React state-management library.
- **Language / runtime:** JavaScript (React).
- **What it's for:** Shared/global state that lives *outside* React's render cycle — crucial
  for performant 3D (components subscribe to only the slice they care about).
- **Why it's on my list:** The recommended state layer for R3F scenes with many objects.
- **Mental model:** "**One store hook; components subscribe to just the fields they use.**"
- **Tiny taste:**
```js
const useStore = create(set => ({ count: 0, inc: () => set(s => ({count: s.count+1})) }));
// in component: const count = useStore(s => s.count);
```
- **Learn to this extent:** create a store, read with a selector, update with `set`. 30 mins.
- **First resource:** zustand docs README (it's short).

## 9. Nutshell (Nicky Case) 🟢 — technique, not a framework
- **What it is:** A tool for inline **expandable, embeddable** explanations (even recursive).
- **Language / runtime:** Drop-in JS over normal HTML headings/paragraphs/links.
- **What it's for:** Just-in-time, in-context depth — readers expand a term without leaving
  the page; you can embed others' snippets too.
- **Why it's on my list:** A quirky article UX that layers depth without walls of text.
- **Mental model:** "**Hyperlinks, but they expand inline instead of navigating away.**"
- **Learn to this extent:** how to install the script + mark expandable links. Minimal.
- **First resource:** ncase.me/nutshell.

> Niche/optional (skim only): **Vizzy** (TS 2D math viz), **Elucim** (React concept-animation
> toolkit), **Manim-Web** (Manim-style in browser). Look at these *after* D3/R3F basics.

---

# CATEGORY 2 — Rendered video / animation (YouTube)

## 10. Manim 🔴
- **What it is:** A Python library for programmatic math/science animation (built by 3Blue1Brown).
- **Language / runtime:** Python; renders to video files.
- **What it's for:** Precise animated equations, graphs, geometric transforms, vector fields.
- **Why it's on my list:** For *math-notation-heavy insets* in my videos (used surgically,
  not for whole videos).
- **IMPORTANT:** Use **Manim Community Edition (Manim CE)**, NOT Grant's bespoke `manimgl`.
  Grant himself recommends CE for newcomers; tutorials/docs assume CE.
- **Mental model:** "**A `Scene` is a class; inside `construct()` you `play()` animations on
  `Mobjects` (math objects).**"
- **Tiny taste:**
```python
class Hello(Scene):
    def construct(self):
        c = Circle()
        self.play(Create(c))         # animate drawing it
        self.play(Transform(c, Square()))
```
- **Learn to this extent:** Scene/construct, common Mobjects (Circle, Square, Text, MathTex,
  Axes), `play()` with Create/Transform/FadeIn, and rendering to mp4. Skip custom plugins.
- **First resource:** docs.manim.community "Quickstart" + the official tutorial series.

## 11. Motion Canvas 🟡
- **What it is:** A TypeScript library + visual editor for polished 2D explainer animation.
- **Language / runtime:** TypeScript; has a real-time preview editor; renders to video.
- **What it's for:** Frame-precise, hand-crafted 2D explainers, diagrams, title cards (an
  After Effects alternative that's code-driven).
- **Why it's on my list:** Slick 2D segments/overlays for videos, in a language I know.
- **Mental model:** "**Animations are written as generator functions** — you `yield*` steps
  in sequence, giving frame-exact control over timing." Animate *properties*, not objects.
- **Tiny taste:**
```ts
yield* circle().scale(2, 0.6);   // grow over 0.6s
yield* circle().position.x(200, 1); // then move over 1s
```
- **Learn to this extent:** the generator/`yield*` timeline, signals (reactive values),
  basic shapes + layout, and exporting. Steeper than it looks — take it slow.
- **First resource:** motioncanvas.io docs "Quickstart" + slama.dev "Manim → Motion Canvas".

## 12. Remotion 🟡
- **What it is:** A framework to make videos *programmatically using React*.
- **Language / runtime:** React/TypeScript; renders React components to video (incl. on AWS Lambda).
- **What it's for:** Templated/data-driven video at scale (e.g. same intro across many videos).
- **Why it's on my list:** Optional — only if I later want reusable intros/outros or batch video.
- **Mental model:** "**Each frame is a React render; you animate by reading the current frame
  number** (`useCurrentFrame()`) and interpolating."
- **Tiny taste:**
```jsx
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1]); // fade in over 30 frames
return <h1 style={{ opacity }}>Hello</h1>;
```
- **Learn to this extent:** `useCurrentFrame`, `interpolate`, `<Sequence>` for timing,
  rendering out. Only go here if templating need arises. Note: paid license above a revenue
  threshold.
- **First resource:** remotion.dev "Fundamentals".

## 13. Unity 🟡 (for me — already comfortable) / 🔴 (for video production layer)
- **What it is:** A full real-time 3D game engine.
- **Language / runtime:** C# (+ HLSL for shaders); real-time GPU rendering.
- **What it's for:** Sebastian Lague–style "build the simulation, then narrate it" videos;
  real-time 3D, physics, compute-shader simulations.
- **Why it's on my list:** My **primary video path** — I already know the engine; the gap is
  the *video production layer* (below) + compute shaders.
- **Mental model (engine):** "**GameObjects with Components; scripts run in a per-frame
  `Update()` loop.**" (I know this already.)
- **The bits I still need to learn (the 'video' part):**
  - **Compute shaders / HLSL** — run thousands of tiny tasks in parallel on the GPU
    (fluids, particles). Data moves CPU↔GPU via `ComputeBuffer`. *This is the Seb Lague
    superpower.*
  - **Unity Recorder** — exports frame-perfect video / image sequences **decoupled from
    real-time FPS** (a slow sim still exports smooth 60fps). The #1 "make it a video" tool.
  - **Post-processing (URP/HDRP volumes)** — bloom, tone mapping, vignette, DoF = the
    "beautiful" look. Plus a disciplined color palette.
  - **Custom editor tools** — property drawers / editor windows / a gradient editor to tweak
    parameters live (Seb builds these constantly).
  - **Cinemachine** — smooth, scripted camera moves.
- **Learn to this extent:** I have the engine; focus on compute shaders, Unity Recorder,
  post-processing, and one custom editor tool. Study **Seb Lague's open-source GitHub repos**
  as worked examples.
- **First resource:** Seb Lague "Coding Adventure" repos + Unity's compute shader + Recorder docs.

## 14. Blender 🔴 — optional 3D powerhouse
- **What it is:** Free, open-source 3D creation suite (modeling, animation, rendering).
- **Language / runtime:** GUI + **Python** scripting; **Geometry Nodes** for procedural 3D.
- **What it's for:** Gorgeous 3D hero shots / procedural geometry without a game engine; the
  closest thing to "3b1b-grade 3D beauty."
- **Why it's on my list:** Optional alternative/companion to Unity for non-interactive,
  cinematic 3D segments.
- **Mental model:** "**A scene you light + render; Geometry Nodes = node-based procedural
  modeling; everything is Python-scriptable.**"
- **Learn to this extent:** ONLY if/when I want cinematic 3D. Basics: navigate viewport, add
  objects, materials, a camera, render an image, dip into Geometry Nodes. Defer unless needed.
- **First resource:** Blender "Blender Fundamentals" series + Geometry Nodes intro.

## 15. DaVinci Resolve 🟡 — the editor
- **What it is:** Free, industry-grade video editing + color grading software.
- **Language / runtime:** Desktop app (GUI).
- **What it's for:** Stitching captured clips, voiceover, music, color grade, export — the
  final assembly step for *any* of the above pipelines.
- **Why it's on my list:** Every video path (Unity, Manim, Motion Canvas) ends here.
- **Mental model:** "**Timeline of clips + audio tracks; pages for edit, color, audio, export.**"
- **Learn to this extent:** import media, cut on a timeline, add VO + music, basic transitions,
  a simple color grade, export to mp4/H.264. Skip Fusion/advanced color at first.
- **First resource:** Blackmagic's official "Resolve in X minutes" beginner tutorial.

---

# Suggested learning order (mapped to my 2 goals)

**Track A — Web interactive (do first; reuses my React skills):**
1. p5.js (🟢 warm-up: the frame loop + drawing) →
2. D3.js (🟡 the core widget skill) + KaTeX (🟢 quick) →
3. R3F (🟡; Three.js concepts as JSX) + Zustand (🟢) →
4. Pyodide (🟡 optional) + Nutshell (🟢 technique).

**Track B — Video (my Sebastian Lague ambition):**
1. Unity video layer: **Unity Recorder → post-processing → compute shaders** (lean on
   existing Unity skill) →
2. **DaVinci Resolve** (so I can finish *a* video early) →
3. **Manim CE** (math insets) →
4. Optional: **Motion Canvas** (slick 2D) / **Blender** (cinematic 3D) / **Remotion** (templating).

**The build-once-harvest-twice link:** a D3/R3F explorable built for an article (Track A) can
be screen-recorded + narrated into a video (Track B). Same idea, two outputs.

---

# Glossary (terms that show up everywhere)
- **WebGL** — browser API for GPU-accelerated graphics (Three.js sits on it).
- **Shader** — a small program that runs on the GPU per-pixel (fragment) or per-vertex.
- **Compute shader** — a shader for *general* parallel computation (not just drawing).
- **HLSL** — the shader language used in Unity.
- **SVG vs Canvas vs WebGL** — three ways to draw on the web: SVG = DOM shapes (D3), Canvas =
  immediate-mode 2D pixels (p5), WebGL = GPU 3D (Three).
- **Render loop / frame loop** — code that runs ~60×/sec to update + redraw.
- **Easing** — the acceleration curve of an animation (what makes motion feel "premium").
- **Mobject** — Manim's term for a "math object" you animate.
- **ComputeBuffer** — Unity's channel for sending arrays of data to/from the GPU.

---

## Cross-references
- Strategy, hiring research, and the "why" behind all this: see `PORTFOLIO_RESEARCH.md`.
- Verified creator stacks (3b1b = Manim CE; Sebastian Lague = Unity + compute shaders +
  custom editor tools + Unity Recorder): `PORTFOLIO_RESEARCH.md` Part B / Part C.
