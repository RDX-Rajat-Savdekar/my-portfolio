# Portfolio + Interactive-Content Research Report

> Reference doc for the `my-portfolio` project. Pull this into new chats for context.
> Compiled: 2026-06-27. Owner: Rajat Savdekar.
> Two parts: (A) what actually gets new-grad SDEs hired, (B) the interactive-tooling
> landscape for building explorable articles + eventually a YouTube video.

---

## TL;DR (read this if nothing else)

1. **A portfolio is an argument, not a gallery.** The claim is: *"I can define a real
   problem, make decisions under constraints, and ship + explain it."* Every element
   either strengthens or weakens that claim.
2. **Depth beats breadth, hard.** 2–4 complete, deployed, independently-built projects.
   One real project + a written case study > eight tutorial clones.
3. **The case study / article is the differentiator.** Explaining *why* (decisions,
   tradeoffs, what broke, what you'd change) is literally what senior interviews test.
   This is the single highest-leverage thing on the list, and it is exactly the plan.
4. **AI is fine as a tool, fatal as the author.** Use AI to scaffold; you own every
   decision and must be able to walk a senior engineer through the code line-by-line.
5. **Both cringe extremes fail the same test:** the medium screaming louder than the
   substance (one-shot generic AI site OR drive-a-car-around-a-map gimmick). Aim for
   "competent and considered": fast, clean, gets out of the way, clearly human-made.
6. **For interactive content:** web-native (React + D3 + Three.js/R3F) is the right
   long-term bet because it embeds directly in articles AND is what the portfolio is
   already built in. Manim for math video, Motion Canvas for polished explainer video,
   Unity only if the content genuinely needs real-time 3D/game mechanics.

---

# PART A — What gets a new-grad SDE hired

### The core mental model
A portfolio is **"your best argument, not your best project"** — it communicates *how you
think*, what you've shipped, and evidence you can do the job. Design the whole site
around that argument, not around demonstrating everything you know.
(Sources: Medium "rebuilt my portfolio 3 times", Hyperskill 2026.)

### What hiring managers consistently say they care about
From a survey of 12 hiring managers (3 FAANG-tier, 4 growth-stage, 5 early-stage),
answers were "remarkably consistent" (popout.page):

1. **Evidence of completed projects.** Not "in progress," not "coming soon." Deployed,
   live, accessible via URL. Two finished projects beat six half-built repos.
2. **Clear explanation of YOUR contribution.** For team projects, what *you specifically*
   built — not what "the team" built. This is the #1 mistake.
3. **Writing ability.** 9 of 12 mentioned it. READMEs, posts, descriptions get read.
   *"If a developer can explain a technical concept clearly in writing, they can probably
   explain it clearly in a code review. That's half the job."*
4. **Design sensibility = intentionality, not beauty.** Consistent spacing, readable
   type, deliberate palette. *"I'm not looking for beautiful. I'm looking for thoughtful.
   If the portfolio is a mess, the code might be too."*
5. **GitHub activity = consistency over virality.** Contribution graph regularity > one
   viral repo. Curate your 6 pinned repos as a story.

### The "built vs. followed" test (Hyperskill)
Reviewers can spot tutorial-derived projects: code structure matches the tutorial,
minimal/absent error handling, commit history is one giant commit or maps perfectly to
tutorial chapters, README describes *what* not *why*. Independently-built projects look
different: small iterative commits, real edge-case handling, README with architectural
decisions + tradeoffs.

### The 30-minute walkthrough test
A project is only as valuable as your ability to discuss it. Interviewers ask you to walk
through architecture, justify a decision, and say what you'd change. If you can't explain
the *why* in a 30-minute deep-dive, the project isn't portfolio-ready. **This applies
doubly to AI-assisted projects** — MentorCruise reports career-changers who built with AI
and then "couldn't explain the architecture in a screen-share." The code looked fine; it
didn't survive review. **You still need to own it.**

### What a strong project actually is
- Solves a **specific, named, real problem** (not "a web app" / "a REST API"). Specificity
  proves you thought before coding.
- Has **constraints** (time, cost, scope) you navigated.
- Shows **tradeoffs** considered (performance vs simplicity, build vs buy, speed vs
  maintainability).
- Is **shipped** (scope → prioritize → deliver) and **documented**.
- **Quantifies impact** where possible (usage numbers, latency reduced, % improvements —
  even rough estimates).
- **Domain relevance**: tilt projects toward the roles you target. A portfolio in a new
  domain proves you can do the *new* job, not just your current one.

### Minimum viable portfolio (MVP) for a competitive junior/mid role
3 projects that collectively demonstrate: language fluency, ecosystem familiarity,
ability to build a complete system with external dependencies, and independent
problem-solving. Each *additional* project must add something new (framework, system
type, domain) — not repeat.

Strong project *types* for 2026: AI/ML projects, API-based web apps, DevOps/CI-CD
pipelines, developer tools. Open-source contributions to moderately popular repos (500+
stars) can outweigh a solo project — they prove you can work in an existing codebase.

### Performance / UX baseline for the site itself
- Loads in **< 3 seconds**, mobile-responsive.
- States **who you are + what you do within a ~6-second scan**.
- One-click **resume PDF**.
- Un-missable **contact + links** (email, GitHub, LinkedIn).
- Include tests, CI/CD, clean idiomatic code where relevant (signals production thinking).

### The two cringe failure modes (and why both fail)
- **One-shot generic AI site:** evidence of nothing. Generic themes/keywords, no personal
  judgment. Reviewers can "smell rewritten documentation from a mile away."
- **Over-engineered gimmick (e.g. drive-a-car-to-see-the-profile):** effort spent on the
  wrong thing; disrespects the reader's 30 seconds; signals novelty-over-substance.
- **Shared root cause:** the medium drowns the substance. Fix = restraint. Personality
  comes from *your voice + specific real details*, not from a wacky theme.

---

# PART B — Interactive content: tooling landscape

Goal: build interactive tools/explainers *inside articles* (Gemini-widget style), and
eventually produce a good YouTube explainer video. Two different output targets —
**embedded-in-web** vs **rendered-video** — and the best tool differs per target.

## B1. The genre: "Explorable Explanations"
Coined via Bret Victor; popularized by Nicky Case (`ncase.me`) and Distill.pub.
Definition: interactive simulation + prose guidance, so readers learn by *doing* and
testing expectations against actual behavior. Key distinction (Max Goldstein): the visuals
must be **integrated with the author's prose** — the author roughly knows what the reader
will discover. A bare dashboard/sandbox is NOT an explorable; auto-updating numbers in
text or paragraphs that change with user actions ARE.

Reference hubs to study for taste: `explorabl.es`, `distill.pub`, `ncase.me`
(Parable of the Polygons, Evolution of Trust), `minutelabs.io`, PhET sims, Observable.

**Implication for the articles:** every interactive bit must *serve the explanation* (help
the reader understand a decision faster). Interactivity for its own sake = the gimmick
trap again.

## B2. Tooling matrix

### For EMBEDDED-IN-ARTICLE interactivity (the primary need — recommended)
Because the portfolio is already **React 19 + Vite + Tailwind**, web-native wins: it drops
straight into existing article components and is the same skill that builds the site.

| Tool | Best for | Notes |
|---|---|---|
| **D3.js** | Bespoke 2D interactive viz, data-driven SVG | Industry standard; pan/zoom/brush/drag behaviors. Slight learning curve. |
| **Observable Plot** | Quick 2D charts | High-level API built on D3; fast path for standard charts. |
| **Three.js + React Three Fiber (R3F)** | 3D/spatial explainers | Declarative JSX scenes; production-proven. |
| **p5.js** | Creative-coding sketches, generative/animation | Friendly, great for quick playful sims. |
| **KaTeX** | Math typesetting in articles | Pairs with viz for math-heavy explainers. |
| **Pyodide** | Python in the browser, no server | Live runnable code cells inside an article. |

**Critical integration pattern (D3/Three.js + React):** React and D3/Three both touch the
DOM, so wire them carefully to avoid re-render hell:
- React owns **state** (controls, levels, data loading); D3/Three own the **render loop**.
- Bridge via `useEffect` (rebuild/update the scene when deps change) and `useRef` for
  object handles.
- High-frequency animation (60fps) → mutate via refs in `useFrame` (R3F), **never** React
  state. Low-frequency (UI controls) → React state.
- Wrap control components in `React.memo` so dragging a slider doesn't re-render the whole
  tree (classic bug: slider moves one tick then stops).
- Global state for scenes → **Zustand** (keeps data outside React's render cycle; each 3D
  object subscribes to only its slice).
- `useMemo` geometries/materials; keep geometry at module scope to share GPU buffers.

Real-world references that match this exact stack: "Play & Learn ML" (React 19 + Vite +
D3 + R3F, one component owns its canvas via refs), and `open-calc` (React + Vite + D3 +
Three + KaTeX + Pyodide, one JS object per lesson, a `VizFrame` registry mapping string
IDs → viz components — a clean content architecture worth copying).

Newer niche libs to watch (browser-native math/diagram animation): Vizzy (TS 2D math
viz), Elucim (React toolkit for animated concept explanations), Manim-Web ports.

### For RENDERED VIDEO (the eventual YouTube goal)
| Tool | Language | Best for | Tradeoffs |
|---|---|---|---|
| **Manim** | Python | Math/science animation (3Blue1Brown engine) | Gold standard for math; assumes math literacy; not interactive/web. |
| **Motion Canvas** | TypeScript | Polished, frame-precise explainer video | Generator-based timeline, visual editor + real-time preview; steepest learning curve, most polished output. |
| **Remotion** | React/TS | Programmatic/templated video at scale | Best if leveraging React skills + batch rendering (Lambda); paid license above revenue threshold. |
| **Unity** | C# / Visual Scripting | Real-time 3D, game-like interactive tutorials | Powerful but heavy; only worth it when content genuinely needs game/3D mechanics. |

### Verdict on the user's Manim → Unity question
- **Unity is overkill** for tutorial/explainer animation unless the subject *is* a game,
  physics sandbox, or genuinely needs real-time interactive 3D. It carries a full game
  engine's complexity for content that's usually 2D conceptual.
- **Better progression given the React/web stack:**
  - Embedded article interactives → **D3 + R3F (+ p5.js for playful bits)**. Same stack as
    the site, reusable, directly answers the "Gemini-widget-in-article" goal.
  - YouTube explainer → **Motion Canvas** (TS, polished, closest to the web mental model)
    or **Manim** (if the topic is math-heavy). **Remotion** if templating many videos.
- Keep **Manim** in the back pocket purely for math-notation-heavy segments.
- **Reuse play:** an interactive D3/R3F explainer built for an article can be screen-
  recorded / narrated into a video, or rebuilt in Motion Canvas. Build the explorable
  once, harvest it twice.

---

# PART C — Does maintaining articles actually pay off? (+ quirky tactics)

**Short answer: yes, and it's one of the highest-ROI, most durable career moves in 2026.**
With AI-generated resumes flooding screening, blogs are high-signal, *verifiable* proof of
depth, communication, learning velocity, and initiative. Engineering leaders read posts to
gauge fit *before* scheduling interviews. Posts work "while you sleep" (inbound) and, unlike
a resume, compound over time. (Sources: parthh.in, careerswami, jobsbyculture, GitNexa,
Medium "5 blog posts → Stripe".)

### What actually works (the playbook)
- **Specificity + personal experience win.** "How I fixed a 3s LCP in Next.js by migrating
  to Server Components" >>> "How to use React hooks." Managers can smell rewritten docs.
- **Write about what was HARD, not what you built.** The hard part is where the learning
  is, and learning is what's being evaluated. *"I built a dashboard with filtering" says
  nothing; "the filtering forced me to rethink state management — here's what I changed
  and why" says something real.*
- **Consistency > volume.** ~1 deep post/month beats daily filler. Results typically show
  in 3–6 months; 10–15 quality posts start ranking in search + getting shared.
- **Own the platform.** Most durable order: personal blog/newsletter (algorithm-
  independent) → LinkedIn articles → Dev.to/Hashnode → Medium publications. Pick ONE and
  be consistent; cross-post for reach.
- **Aim to be the canonical reference** for one specific problem. A single post that
  becomes *the* answer for a niche problem beats 100 generic tutorials.
- **Done + live > almost-perfect + local.** You only learn what's wrong by shipping.

### Reusable article skeleton (one per good project)
1. **The problem** — what + why it mattered (2–3 sentences).
2. **Constraints** — time, cost, what you knew/didn't (where realism lives).
3. **Key decisions** — each as: *choice → alternatives → why → tradeoff accepted.* (The
   whole point; pre-answers the senior interview.)
4. **What broke / surprised me** — the human, credibility-building part.
5. **What I'd do differently** — shows growth + ongoing thought.
   Add an **interactive widget per decision** where it speeds understanding (toggle a
   diagram, before/after benchmark, live demo of the actual thing).

### Quirky / compounding tactics worth trying
- **Nutshell-style expandable explanations** (`ncase.me/nutshell`): inline expandable
  snippets (even recursive) so readers learn just-in-time, in-context, without leaving the
  page. Works with plain headings/paragraphs/links; can embed others' content. Great for
  layering depth without walls of text.
- **Build-once-harvest-twice:** article interactive → screen-record into the YouTube video.
- **Content registry architecture** (à la `open-calc`'s `VizFrame`): one content object per
  article + a string-ID → component map, so adding an interactive = adding an ID. Keeps the
  "frequently build projects → one article each" pipeline cheap.
- **A "how I used AI deliberately as a tool" post** — timely, differentiating, and directly
  rebuts the "AI-generated portfolio" suspicion by showing judgment/ownership.
- **Open-source the explorables** (Nicky Case publishes public-domain) — remixability +
  GitHub activity + adoption metrics (stars/downloads) to cite as impact.

---

## Sources
**Portfolio / hiring:**
- Hyperskill — Building a Developer Portfolio in 2026: What Actually Gets Attention
- popout.page — How to Build a Developer Portfolio That Gets Interviews (12-hiring-manager survey)
- popout.page — Developer Portfolio 2026: What Actually Gets You Hired
- whatisthesalary.com — Software Engineer Portfolio (2026)
- refactortalent.com — Developer Portfolio Projects That Impress Hiring Managers
- MentorCruise — How to build a SWE portfolio that survives code review
- Medium (Ishaq Saqib) — How I rebuilt my portfolio 3 times before it got me interviews

**Blogging / personal brand:**
- parthh.in — Why GitHub and Technical Blogs Are the New Resume in 2026
- careerswami.com — How to Build a Personal Brand as a SWE in 2026
- jobsbyculture.com — Building a Personal Brand as a Software Engineer in 2026
- gitnexa.com — Technical Blogging for Developers: Complete 2026 Guide
- Medium (Beyond Localhost) — I Wrote 5 Blog Posts. They Got Me Hired at Stripe.

**Interactive tooling:**
- Wikipedia — Explorable explanation; Max Goldstein — Exploring "Explorable Explanations"
- ncase.me + ncase.me/nutshell; explorabl.es; distill.pub
- beginnersinai.org — Remotion vs Motion Canvas vs Manim (2026)
- slama.dev — From Manim to Motion Canvas; github.com/motion-canvas
- d3js.org; React Three Fiber Architecture in Production (IGC); ncoughlin.com — Three.js with React
- dev.to — Building Play & Learn ML (React+D3+R3F); github.com/g4m3rm1k3/open-calc
- learn.unity.com; MDPI — Unity Visual Scripting in education
