import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import JourneyTimeline from '../components/JourneyTimeline';

const whatImBuilding = [
  {
    name: 'MockPad',
    description: 'Free CoderPad — real-time collaborative interviews with playback',
    links: [{ label: 'Live', url: 'https://mockpad-kappa.vercel.app/' }],
  },
  {
    name: 'CelestiaVR',
    description: 'Immersive VR stargazing for Meta Quest 3 with NASA/JPL data',
    links: [
      { label: 'Demo', url: 'https://www.youtube.com/watch?v=QzRTp0EtUsQ' },
      { label: 'Animated Presentation', url: 'https://rdx-rajat-savdekar.github.io/Celestia_Presentation/' },
    ],
  },
  {
    name: 'Aura',
    description: 'visionOS CoreML app — 2nd place USC Hackathon',
    links: [{ label: 'Demo', url: 'https://www.youtube.com/watch?v=HbW9F2zjmLQ&t=65s' }],
  },
  {
    name: 'SplitIt',
    description: 'Expense splitter',
    links: [{ label: 'Live', url: 'https://splitit-frontend-vite.vercel.app/login' }],
  },
  {
    name: 'Trojanmind',
    description: 'AI-powered Mental Health Copilot for USC students',
    links: [{ label: 'Demo', url: 'https://www.youtube.com/watch?v=QOkA36npHNo' }],
  },
  {
    name: 'Research Papers',
    description: 'All papers I have published',
    links: [{ label: 'Repo', url: 'https://github.com/RDX-Rajat-Savdekar/Research-Papers' }],
  },
];

const recentWriting = [
  {
    date: 'Sep 2025',
    title: 'Building for Spatial Computing: Lessons from CelestiaVR',
    type: 'article',
    path: '/writing',
    internal: true,
  },
  {
    date: 'Jun 2025',
    title: 'Why I Built My Resume Template from Scratch in LaTeX',
    type: 'article',
    link: 'https://medium.com/@rajatsavdekar/why-i-built-my-resume-template-from-scratch-in-latex-b7354b387f5d',
    internal: false,
  },
  {
    date: 'Sep 2025',
    title: 'React Performance Optimization — What Actually Matters',
    type: 'article',
    path: '/writing',
    internal: true,
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

const s = {
  page: {
    maxWidth: '672px',
    margin: '0 auto',
    padding: '6rem 1.5rem 4rem',
  },
  sectionLabel: {
    display: 'block',
    fontFamily: "var(--font-mono)",
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    marginBottom: '1.5rem',
  },
  tag: {
    fontFamily: "var(--font-mono)",
    fontSize: '0.7rem',
    color: 'var(--muted)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '1px 6px',
  },
};

export default function Home() {
  return (
    <main style={s.page}>
      {/* ── Hero ── */}
      <motion.section {...fade(0)} style={{ marginBottom: '6rem' }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '1rem',
          }}
        >
          MS CS @ USC · Los Angeles
        </p>
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}
        >
          Rajat Savdekar
        </h1>
        <p
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'var(--muted)',
            marginBottom: '2rem',
            maxWidth: '540px',
          }}
        >
          I build high-utility tools at the intersection of <strong>Spatial Computing</strong> and <strong>On-device AI</strong>. 
          My approach is simple: build the expensive tool, then make it free.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            to="/work"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.125rem',
              backgroundColor: 'var(--fg)',
              color: 'var(--bg)',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 600,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            View Work
          </Link>
          <Link
            to="/writing"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.125rem',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--muted)';
              e.currentTarget.style.color = 'var(--fg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--muted)';
            }}
          >
            Read Articles
          </Link>
        </div>
      </motion.section>

      {/* ── What I'm Building ── */}
      <motion.section {...fade(0.1)} style={{ marginBottom: '6rem' }}>
        <span style={s.sectionLabel}>What I'm Building</span>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.75rem 0', color: 'var(--fg)', fontWeight: 600, width: '25%' }}>Project</th>
                <th style={{ padding: '0.75rem 0', color: 'var(--fg)', fontWeight: 600 }}>What it does</th>
                <th style={{ padding: '0.75rem 0', color: 'var(--fg)', fontWeight: 600, textAlign: 'right' }}>Links</th>
              </tr>
            </thead>
            <tbody>
              {whatImBuilding.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1.25rem 0', color: 'var(--fg)', fontWeight: 500, verticalAlign: 'top' }}>{p.name}</td>
                  <td style={{ padding: '1.25rem 0', color: 'var(--muted)', lineHeight: 1.5, verticalAlign: 'top', paddingRight: '1rem' }}>{p.description}</td>
                  <td style={{ padding: '1.25rem 0', textAlign: 'right', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                      {p.links.map((l, j) => (
                        <a
                          key={j}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: 'var(--accent)', whiteSpace: 'nowrap', transition: 'opacity 0.15s' }}
                          onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                          onMouseLeave={(e) => (e.target.style.opacity = '1')}
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          to="/work"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            fontSize: '0.8125rem',
            color: 'var(--muted)',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--fg)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
        >
          View detailed technical analysis →
        </Link>
      </motion.section>

      {/* ── Articles ── */}
      <motion.section {...fade(0.2)} style={{ marginBottom: '6rem' }}>
        <span style={s.sectionLabel}>Recent Articles</span>
        <div>
          {recentWriting.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
                padding: '1rem 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                  opacity: 0.6,
                  paddingTop: '3px',
                  width: '60px',
                }}
              >
                {item.date}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                {item.internal ? (
                  <Link
                    to={item.path}
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--fg)',
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.target.style.opacity = '1')}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--fg)',
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.target.style.opacity = '1')}
                  >
                    {item.title} ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/writing"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            fontSize: '0.8125rem',
            color: 'var(--muted)',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--fg)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
        >
          View all articles →
        </Link>
      </motion.section>

      {/* ── Journey ── */}
      <motion.section
        {...fade(0.3)}
        style={{
          marginBottom: '6rem',
        }}
      >
        <span style={s.sectionLabel}>The Journey</span>
        <JourneyTimeline />
      </motion.section>

      <ContactMe />
    </main>
  );
}
