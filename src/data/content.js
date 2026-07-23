/** Single source of truth for projects and writing. */

export const site = {
  name: 'Rajat Savdekar',
  domain: 'rajatsavdekar.dev',
  tagline:
    'I build high-utility tools at the intersection of Spatial Computing and On-device AI. My approach is simple: build the expensive tool, then make it free.',
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
    slug: 'celestia-vr',
    name: 'CelestiaVR',
    featured: true,
    tagline: 'Immersive VR stargazing for Meta Quest 3 with NASA/JPL data',
    description:
      'Meta Quest 3 VR stargazing app rendering a real, time-accurate sky (~9k stars, planets, 88 constellations) with gaze-dwell interaction. I owned the real-time sky rendering engine on a 5-person USC AR/VR team.',
    details:
      'GPU-instanced star field from the 119k-row HYG catalog (mag ≤ 6.5), sidereal-accurate rotation about the true celestial pole, and affine-aligned Stellarium constellation art — measured 72–90 Hz on Quest 3.',
    tags: ['Unity 6', 'OpenXR', 'URP', 'C#', 'HLSL', 'XR'],
    badge: '1st @ RealityShift · USC XR Hackathon',
    articlePath: '/writing/celestia-vr',
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
    tagline: 'visionOS on-device captions & sound awareness — 2nd @ LA Tech Week',
    description:
      'Apple Vision Pro accessibility app running two on-device ML pipelines (Speech ASR + SoundAnalysis) with zero cloud fallback. Solo code; teammates contributed README only.',
    details:
      'Dual pipeline off one AVAudioEngine tap, two-layer utterance segmentation, classifier hysteresis/throttle, and a RealityKit texture-baked spatial HUD (designed + demoed; wiring varies by build).',
    tags: ['visionOS', 'SwiftUI', 'CoreML', 'RealityKit', 'Accessibility'],
    badge: '2nd @ LA Tech Week / USC ISI',
    articlePath: '/writing/aura',
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
    tagline: 'Free CoderPad — real-time collaborative interviews with playback',
    description:
      'Solo-built mock-interview web app: shared Monaco editor, whiteboard, notes, timer, and 4-language code execution — all synced through one Yjs CRDT doc per room.',
    details:
      'Yjs + y-websocket + LevelDB backend with 30-min/2-hr room TTL. Hardest bug: Excalidraw↔Yjs echo-loop + Float32Array pressure restore. WebRTC audio prototyped then scoped out.',
    tags: ['React 19', 'Yjs', 'Node.js', 'Monaco', 'Excalidraw'],
    badge: '100+ real users',
    articlePath: '/writing/mockpad',
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
    featured: false,
    tagline: 'Autonomous CI repair — webhook in, validated patch PR out',
    description:
      'The CI failure that fixes itself: GitHub Actions webhook → log diagnosis → unified diff → validate → open PR (or comment), with branch-aware trust policies and a full product dashboard.',
    details:
      'OpenAI Build Week 2026 · Developer Tools. Split diagnosis/fix AI steps, live clone/apply/push, multi-model providers, PostgreSQL multi-tenant backend, RBAC, Slack/email, Jira — 25 Vitest tests.',
    tags: ['TypeScript', 'React', 'Express', 'PostgreSQL', 'Codex'],
    badge: 'OpenAI Build Week 2026',
    articlePath: '/writing/stitch',
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
    tagline: 'Comment-native cipher game for Reddit — encode in 5, crack in comments',
    description:
      'Devvit Web game for Reddit\'s "Games with a Hook" hackathon: pick 5 emojis, post instantly, redditors guess in comments. XP, streaks, dual leaderboards, lazy-loaded Phaser solve burst.',
    details:
      'React 19 + Hono + Redis on Devvit. Autonomous safety (local denylist + optional OpenAI Moderation), Levenshtein fuzzy matching, crowd-sourced answer dictionary, Cipher of the Day cron.',
    tags: ['Devvit', 'React', 'TypeScript', 'Redis', 'Phaser'],
    badge: 'Reddit Games with a Hook 2026',
    articlePath: '/writing/emojicode',
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
    tagline: 'Co-op puzzle platformer with deterministic ghost replay (WebGL)',
    description:
      'Unity 2D cooperative puzzle-platformer where Round 2 replays your Round 1 actions as a ghost. I built the keyframe replay system, analytics buffer, and spline collision generator.',
    details:
      '50 Hz Vector2 keyframe sampling instead of input replay to avoid PhysX divergence across WebGL hosts. Programmatic BoxCollider2D subdivision on splines to prevent tunneling.',
    tags: ['Unity', 'C#', 'WebGL', '2D Physics'],
    badge: null,
    articlePath: '/writing/after-image',
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
    tagline: 'Full-stack Splitwise-style expense splitting',
    description:
      'React 19 + Vite frontend and Express 5 + MongoDB backend for group expense tracking, flexible splits, balances, and settle-up payments.',
    details:
      'Feature-sliced axios service layer, zustand + localStorage JWT auth, and client-side equal/unequal/percentage split validation. Demo deployment with fake data.',
    tags: ['React', 'Express', 'MongoDB', 'JWT', 'Vite'],
    badge: null,
    articlePath: '/writing/splitit',
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
    tagline: 'Open-source lab for programmatic animation & interactive explainers',
    description:
      'Multi-engine playground combining Manim CE, Remotion, Godot, Motion Canvas, React Three Fiber, and React Flow to build motion-driven technical content.',
    details:
      '35+ interactive demos across learning folders; Whisper + FFmpeg VO alignment tooling; Astro × GSAP × Three.js scroll showcases.',
    tags: ['Manim', 'Remotion', 'Godot', 'Motion Canvas', 'R3F'],
    badge: null,
    articlePath: '/writing/creator-lab',
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
    tagline: 'Four undergrad publications — GLCM tool cited 10× across Nature, Springer, IEEE',
    description:
      'Undergraduate research from Mumbai University: GLCM texture analysis, medical transcript NLP, IAS interview analysis, and LSB steganography — code and PDFs in one repo.',
    details:
      'The GLCM MATLAB GUI is the standout: contrast, entropy, homogeneity, and related features, reused in 10+ peer-reviewed papers. Repo tracks all publications, certificates, and source.',
    tags: ['Research', 'MATLAB', 'NLP', 'Publications'],
    badge: null,
    articlePath: '/writing/research-papers',
    github: 'https://github.com/RDX-Rajat-Savdekar/Research-Papers',
    githubSecondary: null,
    youtube: null,
    live: null,
    presentation: null,
    paper: null,
    extraLinks: [
      {
        label: 'Google Scholar',
        url: 'https://scholar.google.com/citations?user=ynyXTd8AAAAJ&hl=en',
      },
    ],
  },
  {
    slug: 'trojanmind',
    name: 'TrojanMind',
    featured: false,
    tagline: 'AI academic & mental health copilot for USC students',
    description:
      'Anthropic hackathon project: paste a Google Calendar / Brightspace iCal feed and get urgency scoring, burnout risk, a 7-day action plan, streaming narrative, and dual-persona chat — with crisis-mode safety routing.',
    details:
      '3-stage Claude pipeline (classify → assess risk → generate plan) on claude-haiku-4-5. Crisis intercept when stress ≥ 9. React + Express + SSE + node-ical.',
    tags: ['React', 'Node.js', 'Claude API', 'SSE', 'Mental Health'],
    badge: 'Anthropic Hackathon',
    articlePath: '/writing/trojanmind',
    github: 'https://github.com/pavan-r411/TrojanMind',
    githubSecondary: null,
    githubSecondaryLabel: null,
    youtube: 'https://www.youtube.com/watch?v=QOkA36npHNo',
    live: null,
    presentation: null,
    paper: null,
  },
];

export const experience = [
  {
    role: 'Teaching Assistant',
    org: 'Discover Engineering, USC Summer Programs',
    location: 'Los Angeles, CA',
    period: 'May 2025 – July 2025',
    bullets: [
      'Mentored international teams through intensive engineering rotations, delivering weekly prototypes.',
      'Guided students through the full product lifecycle, enforcing technical standards to transform concepts into functional projects.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Jalgaon Fruits Sales Cooperative',
    location: 'Jalgaon, India',
    period: 'May 2023 – May 2024',
    bullets: [
      'Owned the full lifecycle of a web-based procurement platform for 150 daily users — drove the transition from manual logs to digital architecture.',
      'Refactored legacy PHP modules into scalable microservices using Flask and MySQL, designing a fault-tolerant backend.',
      'Implemented Docker-based CI/CD pipelines, reducing release cycles by 30%.',
    ],
  },
];

export const education = [
  {
    degree: 'MS in Computer Science',
    school: 'University of Southern California',
    location: 'Los Angeles, CA',
    period: 'Aug 2024 – May 2026',
    gpa: '3.6',
    courses: 'Web Technologies, Algorithms, Database Systems, Machine Learning',
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
      'On-device speech + sound classification on Vision Pro — system design postmortem from a 24-hour LA Tech Week hackathon (2nd place).',
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
      'Keyframe replay at 50 Hz instead of input simulation — avoiding PhysX divergence on WebGL.',
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
      'Manim, Remotion, Godot, Motion Canvas, R3F, and React Flow — a playground for programmatic explainers.',
  },
  'research-papers': {
    date: '2019–2023',
    title: 'Research Papers: Four Undergrad Publications',
    summary:
      'GLCM texture tool (10 citations), medical transcript NLP, IAS interview analysis, and LSB steganography — code and PDFs in one repo.',
  },
  stitch: {
    date: 'July 2026',
    title: 'Stitch: Autonomous CI Repair for OpenAI Build Week',
    summary:
      'Webhook → diagnose → patch → PR. Branch-aware trust, multi-model AI, product dashboard with SSE — built with Codex for the Developer Tools track.',
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

/** Case study index — derived from projects with articles. */
export const caseStudies = projects
  .filter((p) => p.articlePath)
  .map((p) => ({
    date: articleMeta[p.slug]?.date ?? '2026',
    title: articleMeta[p.slug]?.title ?? p.name,
    summary: articleMeta[p.slug]?.summary ?? p.tagline,
    tags: p.tags.slice(0, 4),
    path: p.articlePath,
    projectSlug: p.slug,
  }))
  .sort((a, b) => {
    const order = [
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
      'The LaTeX macros I created to make my resume format clean, consistent, and easy to update — with real examples and reasoning.',
    tags: ['LaTeX', 'Resume Design', 'Productivity'],
    link: 'https://medium.com/@rajatsavdekar/custom-macros-i-wrote-and-why-f8845e1541ab',
  },
];

export const humanPosts = [
  {
    title: "8 Weeks of Google Prep: What the Guides Don't Tell You",
    preview:
      'The full framework — 6-phase problem solving, the MIKE method, and what actually moved the needle.',
    status: 'coming soon',
  },
  {
    title: 'Applying for Jobs on OPT: The Visa Math Nobody Explains',
    preview:
      'Timelines, cap-gap, H-1B lottery odds, and how to think about your job search given the constraints.',
    status: 'coming soon',
  },
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

/** Build link chips for Work page and article headers. */
export function getProjectLinks(project) {
  if (!project) return [];
  const links = [];
  if (project.github) links.push({ label: 'GitHub', url: project.github });
  if (project.githubSecondary) {
    links.push({
      label: project.githubSecondaryLabel ?? 'Backend repo',
      url: project.githubSecondary,
    });
  }
  if (project.youtube) {
    links.push({ label: project.youtubeLabel ?? 'YouTube', url: project.youtube });
  }
  if (project.extraLinks?.length) links.push(...project.extraLinks);
  if (project.live) {
    links.push({
      label: project.liveLabel ?? 'Live',
      url: project.live,
    });
  }
  if (project.presentation) links.push({ label: 'Presentation', url: project.presentation });
  if (project.paper) links.push({ label: 'Paper', url: project.paper });
  return links;
}
