/** Single source of truth for projects and writing. */

/** Query busts GitHub Pages / browser cache when the PDF bytes change. */
export const resumePdf = '/Rajat_Resume.pdf?v=20260831';

export const site = {
  name: 'Rajat Savdekar',
  domain: 'rajatsavdekar.dev',
  tagline:
    'Spatial computing, on-device AI, and calibrated backend systems. Build the expensive tool, then make it free.',
  location: 'MS CS @ USC · Los Angeles',
  availability: 'Available for full-time software engineering roles starting Summer 2026.',
  email: 'rajatsavdekar@gmail.com',
  links: {
    github: 'https://github.com/RDX-Rajat-Savdekar',
    linkedin: 'https://linkedin.com/in/rajatsavdekar',
    medium: 'https://medium.com/@rajatsavdekar',
  },
};

export const projects = [
  {
    slug: 'caliberate',
    name: 'Caliberate',
    featured: true,
    filter: 'tools',
    tagline: 'Calibrated eval harness for LLM-generated code patches in sandboxed containers',
    description:
      'Portfolio eval harness that scores LLM-generated patches against hidden tests in isolated Docker workers, then calibrates an LLM-as-judge against my own labels before any number is trusted.',
    details:
      'Thesis: calibrate the judge and the tasks first. Two-tier grade (programmatic verifier = solved; judge = taste, only after agreement is measured). Task calibration is 3× oracle / 3× no-op. Not a SWE-bench wrapper; not a production eval platform. In progress: public contract and runner next.',
    tags: ['Python', 'FastAPI', 'Docker', 'PostgreSQL', 'LLM evals'],
    badge: 'In progress',
    projectPath: '/projects/caliberate',
    github: 'https://github.com/RDX-Rajat-Savdekar/Caliberate',
    githubSecondary: null,
    youtube: null,
    live: null,
    presentation: null,
    paper: null,
  },
  {
    slug: 'mediverse',
    name: 'Mediverse',
    featured: true,
    filter: 'xr',
    tagline: 'Quest surgical trainer: drill runtime, measurement harness, backend & AI infra',
    description:
      'Meta Quest surgical-training sandbox at Easley-Dunn Productions (Scott Easley): grab tools in an OR or field tent, operate on a bunion-foot mesh, session record/replay, AI narration. I own systems and performance on the drill path first.',
    details:
      'Unity 2021.3 / OpenXR / XR Interaction Toolkit. Isolated a ~22-bone foot lab from a 256-collider play scene; local-space vertex tests, lazy mesh clones, MeshCollider recooks throttled to 0.15 s; Play Mode CSV p95 harness. Editor measurements only — not Quest Hz claims.',
    tags: ['Unity', 'C#', 'OpenXR', 'Meta Quest', 'XR'],
    badge: 'Easley-Dunn · Current',
    projectPath: '/projects/mediverse',
    github: null,
    githubSecondary: null,
    youtube: null,
    live: null,
    presentation: null,
    paper: null,
  },
  {
    slug: 'celestia-vr',
    name: 'CelestiaVR',
    featured: true,
    filter: 'xr',
    media: {
      preview: '/projects/stitch/celestia/exports/loop.mp4',
      hover: '/projects/stitch/celestia/exports/hover.mp4',
    },
    tagline: 'Immersive VR stargazing for Meta Quest 3 with NASA/JPL data',
    description:
      'Meta Quest 3 VR stargazing app rendering a real, time-accurate sky (~9k stars, planets, 88 constellations) with gaze-dwell interaction. I owned the real-time sky rendering engine on a 5-person USC AR/VR team.',
    details:
      'GPU-instanced star field from the 119k-row HYG catalog (mag ≤ 6.5), sidereal-accurate rotation about the true celestial pole, and affine-aligned Stellarium constellation art: measured 72–90 Hz on Quest 3.',
    tags: ['Unity 6', 'OpenXR', 'URP', 'C#', 'HLSL', 'XR'],
    badge: '1st @ RealityShift · USC XR Hackathon',
    projectPath: '/projects/celestia-vr',
    github: 'https://github.com/RDX-Rajat-Savdekar/CelestiaVR',
    githubSecondary: null,
    youtube: 'https://www.youtube.com/watch?v=QzRTp0EtUsQ',
    live: null,
    presentation: 'https://rdx-rajat-savdekar.github.io/Celestia_Presentation/',
    paper: null,
  },
  {
    slug: 'aura',
    name: 'Aura',
    featured: true,
    filter: 'xr',
    media: {
      preview: '/projects/stitch/aura-visionos/exports/loop.mp4',
      hover: '/projects/stitch/aura-visionos/exports/hover.mp4',
    },
    tagline: 'visionOS on-device captions & sound awareness: 2nd @ LA Tech Week',
    description:
      'Apple Vision Pro accessibility app running two on-device ML pipelines (Speech ASR + SoundAnalysis) with zero cloud fallback. Solo code; teammates contributed README only.',
    details:
      'Dual pipeline off one AVAudioEngine tap, two-layer utterance segmentation, classifier hysteresis/throttle, and a RealityKit texture-baked spatial HUD (designed + demoed; wiring varies by build).',
    tags: ['visionOS', 'SwiftUI', 'CoreML', 'RealityKit', 'Accessibility'],
    badge: '2nd @ LA Tech Week / USC ISI',
    projectPath: '/projects/aura',
    github: 'https://github.com/RDX-Rajat-Savdekar/Aura-Vision-Pro',
    githubSecondary: null,
    youtube: 'https://www.youtube.com/watch?v=3KEH2BCODBo&t=24s',
    youtubeLabel: 'Postmortem',
    extraLinks: [
      { label: '60s demo', url: 'https://www.youtube.com/watch?v=ZEGKj1Lh-io' },
      { label: 'Hackathon demo', url: 'https://www.youtube.com/watch?v=HbW9F2zjmLQ' },
      {
        label: 'Video production',
        url: 'https://github.com/RDX-Rajat-Savdekar/rdx-dev-creator-lab/tree/main/projects/aura',
      },
    ],
    live: null,
    presentation: null,
    paper: null,
  },
  {
    slug: 'mockpad',
    name: 'MockPad',
    featured: true,
    filter: 'web',
    media: {
      preview: '/projects/stitch/mockpad/media/mockpad-demo.gif',
      hover: '/projects/stitch/mockpad/media/mockpad-demo.mp4',
    },
    tagline: 'Free CoderPad: real-time collaborative interviews with playback',
    description:
      'Solo-built mock-interview web app: shared Monaco editor, whiteboard, notes, timer, and 4-language code execution: all synced through one Yjs CRDT doc per room.',
    details:
      'Yjs + y-websocket + LevelDB backend with 30-min/2-hr room TTL. Hardest bug: Excalidraw↔Yjs echo-loop + Float32Array pressure restore. WebRTC audio prototyped then scoped out.',
    tags: ['React 19', 'Yjs', 'Node.js', 'Monaco', 'Excalidraw'],
    badge: '100+ real users',
    projectPath: '/projects/mockpad',
    github: 'https://github.com/RDX-Rajat-Savdekar/mockpad',
    githubSecondary: null,
    youtube: null,
    live: 'https://mockpad-kappa.vercel.app/',
    presentation: null,
    paper: null,
  },
  {
    slug: 'stitch',
    name: 'Stitch',
    featured: true,
    filter: 'tools',
    media: {
      preview: '/projects/stitch/stitch/exports/opt/preview.gif',
      hover: '/projects/stitch/stitch/exports/stitch-demo-hover.mp4',
      poster: '/projects/stitch/stitch/exports/stitch-demo-poster.jpg',
    },
    tagline: 'Autonomous CI repair: webhook in, validated patch PR out',
    description:
      'The CI failure that fixes itself: GitHub Actions webhook → log diagnosis → unified diff → validate → open PR (or comment), with branch-aware trust policies and a full product dashboard.',
    details:
      'OpenAI Build Week 2026 · Developer Tools. Split diagnosis/fix AI steps, live clone/apply/push, multi-model providers, PostgreSQL multi-tenant backend, RBAC, Slack/email, Jira: 25 Vitest tests.',
    tags: ['TypeScript', 'React', 'Express', 'PostgreSQL', 'Codex'],
    badge: 'OpenAI Build Week 2026',
    projectPath: '/projects/stitch',
    github: 'https://github.com/RDX-Rajat-Savdekar/openai_build_week',
    githubSecondary: 'https://github.com/Khushalsarode/openai-build-week-hackathon',
    githubSecondaryLabel: 'Team repo',
    youtube: null,
    live: null,
    presentation: null,
    paper: null,
    extraLinks: [
      { label: 'Devpost', url: 'https://openai.devpost.com/' },
    ],
  },
  {
    slug: 'emojicode',
    name: 'EmojiCode',
    featured: false,
    filter: 'web',
    media: {
      preview: '/projects/stitch/emojicode/exports/preview.gif',
      hover: '/projects/stitch/emojicode/exports/hover.mp4',
      poster: '/projects/stitch/emojicode/3homepag.jpg',
    },
    tagline: 'Comment-native cipher game for Reddit: encode in 5, crack in comments',
    description:
      'Devvit Web game for Reddit\'s "Games with a Hook" hackathon: pick 5 emojis, post instantly, redditors guess in comments. XP, streaks, dual leaderboards, lazy-loaded Phaser solve burst.',
    details:
      'React 19 + Hono + Redis on Devvit. Autonomous safety (local denylist + optional OpenAI Moderation), Levenshtein fuzzy matching, crowd-sourced answer dictionary, Cipher of the Day cron.',
    tags: ['Devvit', 'React', 'TypeScript', 'Redis', 'Phaser'],
    badge: 'Reddit Games with a Hook 2026',
    projectPath: '/projects/emojicode',
    github: 'https://github.com/Khushalsarode/EmojiCode',
    githubSecondary: null,
    youtube: null,
    live: 'https://developers.reddit.com/apps/emojicode',
    liveLabel: 'App listing',
    presentation: null,
    paper: null,
    extraLinks: [
      {
        label: 'Devpost',
        url: 'https://redditgameswithahook.devpost.com/',
      },
    ],
  },
  {
    slug: 'after-image',
    name: 'AfterImage',
    featured: false,
    filter: 'xr',
    media: {
      preview: '/projects/stitch/main-gamesmiths/exports/preview.gif',
      hover: '/projects/stitch/main-gamesmiths/exports/hover.mp4',
    },
    tagline: 'Co-op puzzle platformer with deterministic ghost replay (WebGL)',
    description:
      'Unity 2D cooperative puzzle-platformer where Round 2 replays your Round 1 actions as a ghost. I built the keyframe replay system, analytics buffer, and spline collision generator.',
    details:
      '50 Hz Vector2 keyframe sampling instead of input replay to avoid PhysX divergence across WebGL hosts. Programmatic BoxCollider2D subdivision on splines to prevent tunneling.',
    tags: ['Unity', 'C#', 'WebGL', '2D Physics'],
    badge: null,
    projectPath: '/projects/after-image',
    github: 'https://github.com/CSCI-526/main-gamesmiths',
    githubSecondary: null,
    youtube: null,
    live: 'https://csci-526.github.io/main-gamesmiths/gold/',
    presentation: null,
    paper: null,
  },
  {
    slug: 'splitit',
    name: 'SplitIt',
    featured: false,
    filter: 'web',
    tagline: 'Full-stack Splitwise-style expense splitting',
    description:
      'React 19 + Vite frontend and Express 5 + MongoDB backend for group expense tracking, flexible splits, balances, and settle-up payments.',
    details:
      'Feature-sliced axios service layer, zustand + localStorage JWT auth, and client-side equal/unequal/percentage split validation. Demo deployment with fake data.',
    tags: ['React', 'Express', 'MongoDB', 'JWT', 'Vite'],
    badge: null,
    projectPath: '/projects/splitit',
    media: {
      preview: '/projects/stitch/splitit/media/exports/preview.gif',
      hover: '/projects/stitch/splitit/media/exports/hover.mp4',
      poster: '/projects/stitch/splitit/media/splitit-dashboard.png',
    },
    github: 'https://github.com/RDX-Rajat-Savdekar/splitit-frontend-vite',
    githubSecondary: 'https://github.com/RDX-Rajat-Savdekar/splitit-backend',
    githubSecondaryLabel: 'Backend repo',
    youtube: null,
    live: 'https://splitit-frontend-vite.vercel.app/login',
    presentation: null,
    paper: null,
  },
  {
    slug: 'creator-lab',
    name: 'RDX Dev Creator Lab',
    featured: false,
    filter: 'tools',
    media: {
      preview: '/projects/stitch/rdx-dev-creator-lab/media/demo.gif',
      hover: '/projects/stitch/rdx-dev-creator-lab/media/demo.mp4',
    },
    tagline: 'Open-source lab for programmatic animation & interactive explainers',
    description:
      'Multi-engine playground combining Manim CE, Remotion, Godot, Motion Canvas, React Three Fiber, and React Flow to build motion-driven technical content.',
    details:
      '35+ interactive demos across learning folders; Whisper + FFmpeg VO alignment tooling; Astro × GSAP × Three.js scroll showcases.',
    tags: ['Manim', 'Remotion', 'Godot', 'Motion Canvas', 'R3F'],
    badge: null,
    projectPath: '/projects/creator-lab',
    github: 'https://github.com/RDX-Rajat-Savdekar/rdx-dev-creator-lab',
    githubSecondary: null,
    youtube: null,
    live: null,
    presentation: null,
    paper: null,
  },
  {
    slug: 'research-papers',
    name: 'Research Papers',
    featured: false,
    filter: 'research',
    papers: [
      {
        title: 'Texture feature analysis of an image using Gray level Co-Occurrence matrix',
        shortLabel: 'GLCM PDF',
        year: '2022',
        venue: 'IJNRD',
        citations: 10,
        pdf: '/projects/stitch/research_papers_pdf/All%20Pdfs/TEXTURE%20FEATURE%20ANALYSIS%20OF%20AN%20IMAGE%20USING%20GRAY%20LEVEL%20COOCCURRENCE%20MATRIX..pdf',
        scholar: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ynyXTd8AAAAJ&citation_for_view=ynyXTd8AAAAJ:d1gkVwhDpl0C',
      },
      {
        title: 'Analysis of IAS Interview Transcript Using Word Data Visualization',
        shortLabel: 'IAS PDF',
        year: '2022',
        venue: 'IJNRD',
        pdf: '/projects/stitch/research_papers_pdf/All%20Pdfs/ANALYSIS%20OF%20IAS%20INTERVIEW%20TRANSCRIPT%20USING%20WORD%20DATA%20VISUALIZATION.pdf',
      },
      {
        title: 'Medical Transcript Analysis',
        shortLabel: 'Medical PDF',
        year: '2022',
        venue: 'Undergrad research',
        pdf: '/projects/stitch/research_papers_pdf/All%20Pdfs/Medical%20Transcript%20Analysis.pdf',
      },
      {
        title: 'LSB Based Image Steganography using Passkey',
        shortLabel: 'Stego PDF',
        year: '2022',
        venue: 'Undergrad research',
        pdf: '/projects/stitch/research_papers_pdf/All%20Pdfs/LSB%20Based%20Image%20Steganography%20using%20Passkey.pdf',
      },
    ],
    scholar: 'https://scholar.google.com/citations?user=ynyXTd8AAAAJ&hl=en',
    tagline: 'Four undergrad publications: GLCM tool cited 10× across Nature, Springer, IEEE',
    description:
      'Undergraduate research from Mumbai University: GLCM texture analysis, medical transcript NLP, IAS interview analysis, and LSB steganography: code and PDFs in one repo.',
    details:
      'The GLCM MATLAB GUI is the standout: contrast, entropy, homogeneity, and related features, reused in 10+ peer-reviewed papers. Repo tracks all publications, certificates, and source.',
    tags: ['Research', 'MATLAB', 'NLP', 'Publications'],
    badge: null,
    projectPath: '/projects/research-papers',
    github: 'https://github.com/RDX-Rajat-Savdekar/Research-Papers',
    githubSecondary: null,
    youtube: null,
    live: null,
    presentation: null,
    paper: null,
  },
  {
    slug: 'trojanmind',
    name: 'TrojanMind',
    featured: false,
    filter: 'web',
    media: {
      preview: '/projects/stitch/trojanmind/exports/preview.gif',
      hover: '/projects/stitch/trojanmind/exports/hover.mp4',
    },
    tagline: 'AI academic & mental health copilot for USC students',
    description:
      'Anthropic hackathon project: paste a Google Calendar / Brightspace iCal feed and get urgency scoring, burnout risk, a 7-day action plan, streaming narrative, and dual-persona chat: with crisis-mode safety routing.',
    details:
      '3-stage Claude pipeline (classify → assess risk → generate plan) on claude-haiku-4-5. Crisis intercept when stress ≥ 9. React + Express + SSE + node-ical.',
    tags: ['React', 'Node.js', 'Claude API', 'SSE', 'Mental Health'],
    badge: 'Anthropic Hackathon',
    projectPath: '/projects/trojanmind',
    github: 'https://github.com/pavan-r411/TrojanMind',
    githubSecondary: null,
    githubSecondaryLabel: null,
    youtube: 'https://www.youtube.com/watch?v=QOkA36npHNo',
    live: null,
    presentation: null,
    paper: null,
  },
  {
    slug: 'devstack',
    name: 'DevStack',
    featured: false,
    filter: 'tools',
    media: {
      preview: '/projects/stitch/devstack/media/exports/preview.gif',
      hover: '/projects/stitch/devstack/media/devstack-demo.mp4',
    },
    tagline: 'Control plane for auth, feature flags, workflows, and metrics',
    description:
      'Portfolio walkthrough of a developer control plane covering overview, auth, flags, workflows, and metrics in one demo surface.',
    details: null,
    tags: ['TypeScript', 'React', 'Platform', 'DevTools'],
    badge: null,
    projectPath: '/projects/devstack',
    github: 'https://github.com/RDX-Rajat-Savdekar/DevStack',
    githubSecondary: null,
    youtube: null,
    live: null,
    presentation: null,
    paper: null,
  },
  {
    slug: 'cloudbridge',
    name: 'CloudBridge',
    featured: false,
    filter: 'tools',
    media: {
      preview: '/projects/stitch/cloudbridge/media/exports/preview.gif',
      hover: '/projects/stitch/cloudbridge/media/exports/hover.mp4',
    },
    tagline: 'Bridge between local workflows and cloud infrastructure',
    description:
      'CloudBridge connects local development workflows to cloud services.',
    details: null,
    tags: ['Cloud', 'TypeScript', 'Infrastructure'],
    badge: null,
    projectPath: '/projects/cloudbridge',
    github: 'https://github.com/RDX-Rajat-Savdekar/cloud-bridge',
    githubSecondary: null,
    youtube: null,
    live: null,
    presentation: null,
    paper: null,
  },
  {
    slug: 'astro-gsap-f1',
    name: 'GSAP Lab: F1',
    featured: false,
    filter: 'web',
    media: {
      preview: '/projects/stitch/astro/media/exports/f1-loop.mp4',
      hover: '/projects/stitch/astro/media/exports/f1-hover.mp4',
    },
    tagline: 'Scroll-driven F1 sequence: Astro + GSAP + Webflow',
    description:
      'One of two motion pieces from the GSAP Lab: a Formula 1 scroll story built for the CodeTV GSAP Cloud challenge.',
    details: null,
    tags: ['Astro', 'GSAP', 'Webflow', 'Motion'],
    badge: 'CodeTV GSAP Cloud',
    projectPath: '/projects/astro-gsap-f1',
    github: null,
    githubSecondary: null,
    youtube: null,
    live: 'https://gsap-lab-a8153b.webflow.io/',
    presentation: null,
    paper: null,
    extraLinks: [
      { label: 'Challenge site', url: 'https://codetv-gsap-cloud.webflow.io/' },
    ],
  },
  {
    slug: 'astro-gsap-iron-man',
    name: 'GSAP Lab: Iron Man',
    featured: false,
    filter: 'web',
    media: {
      preview: '/projects/stitch/astro/media/exports/iron-man-loop.mp4',
      hover: '/projects/stitch/astro/media/exports/iron-man-hover.mp4',
    },
    tagline: 'Iron Man HUD scroll experiment: Astro + GSAP + Webflow',
    description:
      'The second GSAP Lab piece: an Iron Man HUD sequence with the same Astro × GSAP × Webflow stack, submitted to the CodeTV GSAP Cloud challenge.',
    details: null,
    tags: ['Astro', 'GSAP', 'Webflow', 'Motion'],
    badge: 'CodeTV GSAP Cloud',
    projectPath: '/projects/astro-gsap-iron-man',
    github: null,
    githubSecondary: null,
    youtube: null,
    live: 'https://gsap-lab-a8153b.webflow.io/',
    presentation: null,
    paper: null,
    extraLinks: [
      { label: 'Challenge site', url: 'https://codetv-gsap-cloud.webflow.io/' },
    ],
  },
];

const projectProof = {
  caliberate: [
    'Calibrate the judge and the tasks before you trust any number',
    'Hidden tests in isolated Docker workers; LLM-as-judge only after agreement',
    'Public repo: contract, decisions, honesty rules — runner next',
  ],
  mediverse: [
    'Current role at Easley-Dunn Productions (Scott Easley)',
    'Drill runtime on a Quest surgical trainer: editor p95 harness, not headset Hz',
    '~256 idle skeleton colliders, not the foot vertex loop, explained the Jungle gap',
  ],
  'celestia-vr': [
    '1st at RealityShift, USC XR Hackathon',
    'Real-time sky on Quest 3: ~9k stars, 88 constellations, 72-90 Hz',
    'Owned the sky rendering engine on a 5-person team',
  ],
  aura: [
    '2nd at LA Tech Week / USC ISI',
    'Two on-device ML pipelines, no cloud fallback',
    'Solo code; teammates wrote the README',
  ],
  mockpad: [
    '100+ real users',
    'Shared editor, whiteboard, notes, and timer on one Yjs doc',
    'Live at mockpad-kappa.vercel.app',
  ],
  stitch: [
    'OpenAI Build Week 2026, Developer Tools',
    'Webhook in, validated patch PR out',
    'Multi-tenant backend with RBAC, Slack, and Jira',
  ],
  emojicode: [
    'Reddit Games with a Hook 2026',
    'Encode in 5 emojis, crack in comments',
    'React + Hono + Redis on Devvit',
  ],
  'after-image': [
    'Deterministic ghost replay for a co-op WebGL platformer',
    '50 Hz keyframe sampling to avoid PhysX drift',
    'Built replay, analytics buffer, and spline collision',
  ],
  splitit: [
    'Splitwise-style groups, balances, and settle-up',
    'React 19 frontend, Express 5 + MongoDB backend',
    'Equal, unequal, and percentage splits',
  ],
  'creator-lab': [
    'Open-source lab for programmatic animation',
    '35+ demos across Manim, Remotion, Godot, and R3F',
    'Whisper + FFmpeg voiceover tooling',
  ],
  'research-papers': [
    'Four undergrad publications',
    'GLCM texture tool cited 10 times (Nature, Springer, IEEE)',
    'Code and PDFs in one repo',
  ],
  trojanmind: [
    'Anthropic hackathon',
    'Calendar in, burnout risk and a 7-day plan out',
    'Crisis routing when stress hits 9+',
  ],
  devstack: [
    'Control plane for auth, flags, workflows, and metrics',
    'One demo surface for the full walkthrough',
  ],
  cloudbridge: [
    'Connects local workflows to cloud services',
    'TypeScript infrastructure tooling',
  ],
  'astro-gsap-f1': [
    'CodeTV GSAP Cloud challenge',
    'Scroll-driven F1 sequence in Astro + GSAP + Webflow',
  ],
  'astro-gsap-iron-man': [
    'CodeTV GSAP Cloud challenge',
    'Iron Man HUD scroll piece, same motion stack',
  ],
};

export function getProjectProof(project) {
  if (project?.proof?.length) return project.proof;
  return projectProof[project?.slug] ?? [];
}

export const communityEvents = [
  {
    title: 'May 2025: Sola Con Finals',
    role: 'Organized the finals',
    featured: true,
    folder: 'may-2025-sola-con-finals',
    files: ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg'],
    caption: 'Coordinated the finals under pressure and kept the floor moving.',
  },
  {
    title: 'Dec 2024: HustNCode Hackathon',
    role: 'Mentored teams',
    featured: true,
    folder: 'dec-2024-hustncode',
    files: ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg'],
    caption: 'Helped teams go from stuck to shipping in 24 hours.',
  },
  {
    title: 'April 2025: MESA Fair',
    role: 'STEM outreach for K-12',
    featured: false,
    folder: 'april-2025-mesa-fair',
    files: ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.mp4', '6.mp4', '7.mp4'],
    caption: 'Translated engineering ideas for the next set of builders.',
  },
  {
    title: 'Jan 2025: Sola Con',
    role: 'Exhibits and talks',
    featured: false,
    folder: 'jan-2025-sola-con',
    files: [
      '1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg',
      '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg', '10.jpeg',
    ],
    caption: 'Built exhibits and ran talks with creators from other disciplines.',
  },
];

export const experience = [
  {
    role: 'Software Developer – Systems & Performance',
    org: 'Easley-Dunn Productions, Inc. (Mediverse)',
    location: 'Torrance, CA',
    period: 'Aug 2026 – Present',
    bullets: [
      'Building runtime and backend systems for Mediverse, a Meta Quest surgical-training platform in Unity / OpenXR: tools, anatomy, session replay, and AI narration.',
      'Isolated a ~22-bone foot lab from a 256-collider play scene and replaced a per-frame world-space vertex walk with local-space tests, lazy mesh clones, and MeshCollider recooks throttled to 0.15 s.',
      'Traced a ~2.5× editor frame-time gap on the same 2807-vert cuboid to ~256 idle non-convex MeshColliders on a full skeleton, then built a Play Mode harness that logs CSV p95 so ToolLab vs Jungle runs compare the same bone.',
    ],
  },
  {
    role: 'Teaching Assistant',
    org: 'USC Summer Programs',
    location: 'Los Angeles, CA',
    period: 'May 2025 – Jul 2025',
    bullets: [
      'Led a program of 150 students through Python, Git, AI, and REST API development on robotics hardware, guiding functional prototype delivery on schedule.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Jalgaon Fruit Sales Cooperative Ltd',
    location: 'Jalgaon, India',
    period: 'May 2023 – May 2024',
    bullets: [
      'Decomposed a legacy PHP, SQL monolith by building Python Flask microservices backed by PostgreSQL, orchestrating automated cron jobs to synchronize state and cutting query latency by 40% across 1,000+ daily truck transactions.',
      'Doubled peak harvest write throughput (2x) and scaled revenue from $100K to $200K by architecting an isolated write path that eliminated 10-15 minute freezes from MyISAM table locking.',
      'Reduced support chatbot inference costs by 35% across inventory lookups by implementing Redis-based semantic prompt caching, model fallback routing, and token compression over warehouse metadata.',
      'Cut deployment cycle time by 30% and eliminated production regressions by containerizing microservices with Docker, integrating automated pytest validation suites, and configuring multi-stage CI/CD pipelines.',
      'Built a web procurement platform backed by RESTful APIs, migrating 150+ daily clerks across 5 warehouses from manual logs to live stakeholder analytics dashboards.',
    ],
  },
];

export const education = [
  {
    degree: 'MS in Computer Science',
    school: 'University of Southern California',
    location: 'Los Angeles, CA',
    period: 'Aug 2024 – May 2026',
    gpa: '3.63',
    courses: 'Multimedia System Design, Database Systems, Machine Learning, Game Design',
  },
  {
    degree: 'BE in Computer Engineering',
    school: 'University of Mumbai',
    location: 'Mumbai, India',
    period: 'Aug 2019 – May 2023',
    gpa: '3.7',
    courses: 'Operating Systems, Cloud Computing, Software Engineering',
  },
];

const articleMeta = {
  caliberate: {
    date: 'August 2026',
    title: 'Caliberate: Calibrate the Judge Before You Trust the Number',
    summary:
      'A sandboxed eval harness for LLM-generated patches: hidden tests as truth, an LLM-as-judge only after agreement against my labels, and a CI gate on a set I authored.',
  },
  mediverse: {
    date: 'August 2026',
    title: 'Mediverse: Measuring Drill Cost in a Quest Surgical Trainer',
    summary:
      'The grab script does not cut. A 2 cm trigger on the bit does. The Jungle scene was slow because of ~256 idle skeleton colliders, not the foot vertex loop.',
  },
  'celestia-vr': {
    date: 'June 2026',
    title: 'Architecting an Astronomically Accurate XR Sky Engine',
    summary:
      'GPU-instanced star fields, polar-axis sidereal rotation, and constellation art alignment on Meta Quest 3.',
  },
  aura: {
    date: 'October 2025',
    title: 'Aura: Real-time Spatial HUDs on visionOS',
    summary:
      'On-device speech + sound classification on Vision Pro: system design postmortem from a 24-hour LA Tech Week hackathon (2nd place).',
  },
  mockpad: {
    date: 'April 2026',
    title: 'Building MockPad: A Free Real-Time Interview Editor on Yjs',
    summary:
      'One CRDT doc per room, Excalidraw sync without echo loops, and knowing when not to ship WebRTC.',
  },
  'after-image': {
    date: 'June 2026',
    title: 'Engineering a Deterministic Ghost Replay System',
    summary:
      'Keyframe replay at 50 Hz instead of input simulation: avoiding PhysX divergence on WebGL.',
  },
  splitit: {
    date: '2025',
    title: 'SplitIt: Full-Stack Expense Splitting on React + Express',
    summary:
      'JWT auth, feature-sliced API layer, and client-side split validation over a MongoDB backend.',
  },
  'creator-lab': {
    date: '2026',
    title: 'RDX Dev Creator Lab: One Repo, Six Animation Engines',
    summary:
      'Manim, Remotion, Godot, Motion Canvas, R3F, and React Flow: a playground for programmatic explainers.',
  },
  'research-papers': {
    date: '2019–2023',
    title: 'Research Papers: Four Undergrad Publications',
    summary:
      'GLCM texture tool (10 citations), medical transcript NLP, IAS interview analysis, and LSB steganography: code and PDFs in one repo.',
  },
  stitch: {
    date: 'July 2026',
    title: 'Stitch: Autonomous CI Repair for OpenAI Build Week',
    summary:
      'Webhook → diagnose → patch → PR. Branch-aware trust, multi-model AI, product dashboard with SSE: built with Codex for the Developer Tools track.',
  },
  emojicode: {
    date: 'July 2026',
    title: 'EmojiCode: A Hook-y Cipher Game on Reddit Devvit',
    summary:
      'Instant-publish 5-emoji ciphers, comment-native guessing, retention loops (streaks, Cipher of the Day), and a lazy-loaded Phaser solve celebration.',
  },
  trojanmind: {
    date: '2025',
    title: 'TrojanMind: Calendar-Aware Mental Health Copilot',
    summary:
      'Claude-powered 3-stage pipeline from iCal → burnout risk → 7-day plan, with crisis-mode safety routing for USC students.',
  },
};

/** Project writeup index: derived from projects with deep pages. */
export const caseStudies = projects
  .filter((p) => p.projectPath && articleMeta[p.slug])
  .map((p) => ({
    date: articleMeta[p.slug]?.date ?? '2026',
    title: articleMeta[p.slug]?.title ?? p.name,
    summary: articleMeta[p.slug]?.summary ?? p.tagline,
    tags: p.tags.slice(0, 4),
    path: p.projectPath,
    projectSlug: p.slug,
  }))
  .sort((a, b) => {
    const order = [
      'caliberate',
      'mediverse',
      'celestia-vr',
      'aura',
      'mockpad',
      'stitch',
      'emojicode',
      'trojanmind',
      'after-image',
      'splitit',
      'creator-lab',
      'research-papers',
    ];
    return order.indexOf(a.projectSlug) - order.indexOf(b.projectSlug);
  });

export const externalArticles = [
  {
    date: 'Jun 2025',
    title: 'Why I Built My Resume Template from Scratch in LaTeX',
    summary:
      'The decisions, macros, and hacks behind building a clean, editable LaTeX resume without relying on overused templates.',
    tags: ['LaTeX', 'Productivity', 'Design'],
    link: 'https://medium.com/@rajatsavdekar/why-i-built-my-resume-template-from-scratch-in-latex-b7354b387f5d',
  },
  {
    date: 'Jun 2025',
    title: 'Custom Macros I Wrote (and Why)',
    summary:
      'The LaTeX macros I created to make my resume format clean, consistent, and easy to update: with real examples and reasoning.',
    tags: ['LaTeX', 'Resume Design', 'Productivity'],
    link: 'https://medium.com/@rajatsavdekar/custom-macros-i-wrote-and-why-f8845e1541ab',
  },
];

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'featured', label: 'Featured' },
  { id: 'xr', label: 'XR / Spatial' },
  { id: 'web', label: 'Web' },
  { id: 'tools', label: 'Tools' },
  { id: 'research', label: 'Research' },
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectsByFilter(filterId = 'all') {
  let list;
  if (filterId === 'all') list = [...projects];
  else if (filterId === 'featured') list = projects.filter((p) => p.featured);
  else list = projects.filter((p) => p.filter === filterId);
  return sortProjectsByLinks(list);
}

function hasProjectMedia(project) {
  const media = project?.media;
  return Boolean(media?.preview || media?.poster || media?.hover);
}

/** Media-first on the home grid; text-only cards (no photo/video) go last. */
export function sortProjectsByLinks(list) {
  const rank = (p) => {
    if (p.live) return 0;
    if (p.youtube) return 1;
    if (p.papers?.length || p.scholar || p.paper) return 2;
    if (p.github) return 3;
    return 4;
  };
  return [...list].sort((a, b) => {
    const ma = hasProjectMedia(a) ? 0 : 1;
    const mb = hasProjectMedia(b) ? 0 : 1;
    if (ma !== mb) return ma - mb;
    const ra = rank(a);
    const rb = rank(b);
    if (ra !== rb) return ra - rb;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return 0;
  });
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

/** Build link chips: Live / Demo first, then code, then papers. */
export function getProjectLinks(project) {
  if (!project) return [];
  const links = [];
  if (project.live) {
    links.push({
      label: project.liveLabel ?? 'Live',
      url: project.live,
    });
  }
  if (project.youtube) {
    links.push({ label: project.youtubeLabel ?? 'YouTube', url: project.youtube });
  }
  if (project.presentation) links.push({ label: 'Presentation', url: project.presentation });
  if (project.github) links.push({ label: 'GitHub', url: project.github });
  if (project.githubSecondary) {
    links.push({
      label: project.githubSecondaryLabel ?? 'Backend repo',
      url: project.githubSecondary,
    });
  }
  if (project.extraLinks?.length) links.push(...project.extraLinks);
  if (project.paper) links.push({ label: 'Paper', url: project.paper });
  if (project.scholar) links.push({ label: 'Google Scholar', url: project.scholar });
  if (project.papers?.length) {
    project.papers.forEach((p, i) => {
      if (p.pdf) links.push({ label: p.shortLabel || `PDF ${i + 1}`, url: p.pdf });
    });
  }
  return links;
}
