import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';

const featuredProjects = [
  {
    name: 'MockPad',
    description:
      'AI-powered coding environment for algorithm practice. Personalized suggestions, real-time progress tracking, built on the MERN stack with GenAI tools.',
    tags: ['React', 'Node.js', 'MongoDB', 'GenAI'],
    github: 'https://github.com/RDX-Rajat-Savdekar',
  },
  {
    name: 'Manim-DSA',
    description:
      '20+ animated visualizations of complex distributed systems and DSA concepts. Engineered a rendering pipeline with caching that cut build times by 30%.',
    tags: ['Python', 'Manim', 'System Design'],
    github: 'https://github.com/RDX-Rajat-Savdekar',
    youtube: 'https://youtube.com/@rajatsavdekar',
  },
  {
    name: 'Aura',
    description:
      'visionOS accessibility app providing real-time captions and sound alerts for hearing-impaired users. CoreML for on-device sound classification. Won 2nd place at a USC Hackathon.',
    tags: ['SwiftUI', 'visionOS', 'CoreML'],
    github: 'https://github.com/RDX-Rajat-Savdekar',
    youtube: 'https://youtube.com/@rajatsavdekar',
    badge: '2nd @ USC Hackathon',
  },
];

const recentWriting = [
  {
    date: 'Sep 2025',
    title: 'Portfolio Restructure — Simple & Focused',
    type: 'devlog',
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
    type: 'devlog',
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
    padding: '4rem 1.5rem 2rem',
  },
  sectionLabel: {
    display: 'block',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#71717a',
    marginBottom: '1.5rem',
  },
  divider: {
    borderTop: '1px solid #27272a',
    marginBottom: '0px',
  },
  tag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.7rem',
    color: '#71717a',
    border: '1px solid #27272a',
    borderRadius: '4px',
    padding: '1px 6px',
  },
};

export default function Home() {
  return (
    <main style={s.page}>
      {/* ── Hero ── */}
      <motion.section {...fade(0)} style={{ marginBottom: '5rem' }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#f59e0b',
            marginBottom: '1rem',
          }}
        >
          MS CS @ USC · Los Angeles, CA
        </p>
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#fafafa',
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
            color: '#a1a1aa',
            marginBottom: '2rem',
            maxWidth: '520px',
          }}
        >
          I build software and write about the process. Currently finishing my
          master's at USC, on OPT, figuring it out in public.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            to="/work"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.125rem',
              backgroundColor: '#f59e0b',
              color: '#09090b',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 600,
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fbbf24')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f59e0b')}
          >
            View my work →
          </Link>
          <Link
            to="/writing"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.125rem',
              border: '1px solid #3f3f46',
              color: '#d4d4d8',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#71717a';
              e.currentTarget.style.color = '#fafafa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#3f3f46';
              e.currentTarget.style.color = '#d4d4d8';
            }}
          >
            Read my writing →
          </Link>
        </div>
      </motion.section>

      {/* ── Selected Work ── */}
      <motion.section {...fade(0.1)} style={{ marginBottom: '5rem' }}>
        <span style={s.sectionLabel}>Selected Work</span>
        <div>
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
              style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '1.25rem 0',
                borderBottom: '1px solid #27272a',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    marginBottom: '0.375rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: '#fafafa',
                    }}
                  >
                    {project.name}
                  </h3>
                  {project.badge && (
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.65rem',
                        color: '#f59e0b',
                        backgroundColor: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.25)',
                        borderRadius: '4px',
                        padding: '1px 6px',
                      }}
                    >
                      {project.badge}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: '#a1a1aa',
                    marginBottom: '0.75rem',
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={s.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.375rem',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  paddingTop: '2px',
                  minWidth: '60px',
                }}
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.8rem', color: '#71717a', transition: 'color 0.15s' }}
                    onMouseEnter={(e) => (e.target.style.color = '#d4d4d8')}
                    onMouseLeave={(e) => (e.target.style.color = '#71717a')}
                  >
                    GitHub ↗
                  </a>
                )}
                {project.youtube && (
                  <a
                    href={project.youtube}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.8rem', color: '#71717a', transition: 'color 0.15s' }}
                    onMouseEnter={(e) => (e.target.style.color = '#d4d4d8')}
                    onMouseLeave={(e) => (e.target.style.color = '#71717a')}
                  >
                    YouTube ↗
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.8rem', color: '#71717a', transition: 'color 0.15s' }}
                    onMouseEnter={(e) => (e.target.style.color = '#d4d4d8')}
                    onMouseLeave={(e) => (e.target.style.color = '#71717a')}
                  >
                    Live ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <Link
          to="/work"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            fontSize: '0.8125rem',
            color: '#71717a',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#d4d4d8')}
          onMouseLeave={(e) => (e.target.style.color = '#71717a')}
        >
          View all work →
        </Link>
      </motion.section>

      {/* ── Writing ── */}
      <motion.section {...fade(0.2)} style={{ marginBottom: '5rem' }}>
        <span style={s.sectionLabel}>Writing</span>
        <div>
          {recentWriting.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
                padding: '0.875rem 0',
                borderBottom: '1px solid #27272a',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: '#52525b',
                  paddingTop: '2px',
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
                      color: '#d4d4d8',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#fafafa')}
                    onMouseLeave={(e) => (e.target.style.color = '#d4d4d8')}
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
                      color: '#d4d4d8',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#fafafa')}
                    onMouseLeave={(e) => (e.target.style.color = '#d4d4d8')}
                  >
                    {item.title} ↗
                  </a>
                )}
              </div>
              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  ...(item.type === 'article'
                    ? {
                        color: '#f59e0b',
                        backgroundColor: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.2)',
                      }
                    : {
                        color: '#71717a',
                        backgroundColor: '#18181b',
                        border: '1px solid #27272a',
                      }),
                }}
              >
                {item.type}
              </span>
            </div>
          ))}
        </div>
        <Link
          to="/writing"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            fontSize: '0.8125rem',
            color: '#71717a',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#d4d4d8')}
          onMouseLeave={(e) => (e.target.style.color = '#71717a')}
        >
          View all writing →
        </Link>
      </motion.section>

      {/* ── Currently ── */}
      <motion.section
        {...fade(0.3)}
        style={{
          marginBottom: '4rem',
          padding: '1.25rem 1.5rem',
          borderRadius: '8px',
          border: '1px solid #27272a',
          backgroundColor: '#18181b',
        }}
      >
        <span style={{ ...s.sectionLabel, marginBottom: '1rem' }}>Currently</span>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {[
            ['MS CS at USC', 'graduating May 2026'],
            ['Looking for', 'full-time SWE roles (on OPT)'],
            ['Building', 'MockPad, writing in public'],
          ].map(([label, value]) => (
            <li
              key={label}
              style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem' }}
            >
              <span style={{ color: '#52525b', flexShrink: 0 }}>→</span>
              <span style={{ color: '#71717a' }}>
                {label}{' '}
                <span style={{ color: '#d4d4d8' }}>{value}</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      <ContactMe />
    </main>
  );
}
