import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';

const devlogs = [
  {
    date: 'Sep 25, 2025',
    title: 'Portfolio Restructure — Simple & Focused',
    summary:
      'Rebuilt the portfolio to focus on three core things: Work, Writing, and Community. Cut the noise, added more story.',
    tags: ['React', 'Portfolio', 'UX'],
    status: 'completed',
  },
  {
    date: 'Sep 20, 2025',
    title: 'React Performance Optimization — What Actually Matters',
    summary:
      'Deep dive into React.memo, useMemo, and code splitting with React.lazy. Used Vite bundle analysis to find the real bottlenecks.',
    tags: ['React', 'Performance', 'Vite'],
    status: 'ongoing',
  },
  {
    date: 'Sep 15, 2025',
    title: 'Docker Containerization — Multi-stage Builds & CI/CD',
    summary:
      'Set up multi-stage Docker builds for a full-stack app. Wired Docker Compose for local orchestration and integrated into GitHub Actions.',
    tags: ['Docker', 'DevOps', 'CI/CD'],
    status: 'completed',
  },
  {
    date: 'Sep 10, 2025',
    title: 'Migrating to TypeScript — Incrementally, Not All at Once',
    summary:
      'Gradual migration of existing JS projects to TypeScript. Set up strict type checking, learned when generics actually help.',
    tags: ['TypeScript', 'JavaScript', 'Refactoring'],
    status: 'ongoing',
  },
  {
    date: 'Sep 05, 2025',
    title: 'Building a REST API with Node.js & Express',
    summary:
      'Built a RESTful API with proper error handling, JWT authentication, role-based access control, and Swagger documentation.',
    tags: ['Node.js', 'Express', 'API Design', 'Auth'],
    status: 'completed',
  },
];

const articles = [
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

const humanPosts = [
  {
    title: '8 Weeks of Google Prep: What the Guides Don\'t Tell You',
    preview: 'The full framework — 6-phase problem solving, the MIKE method, and what actually moved the needle.',
    status: 'coming soon',
  },
  {
    title: 'Applying for Jobs on OPT: The Visa Math Nobody Explains',
    preview: 'Timelines, cap-gap, H-1B lottery odds, and how to think about your job search given the constraints.',
    status: 'coming soon',
  },
  {
    title: 'What USC\'s CS Master\'s Actually Taught Me vs What I Expected',
    preview: 'The gap between what I thought grad school would be and what it actually is — the good and the frustrating.',
    status: 'coming soon',
  },
];

const statusColor = {
  completed: '#10b981',
  ongoing: '#f59e0b',
};

const s = {
  tag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.68rem',
    color: '#71717a',
    border: '1px solid #27272a',
    borderRadius: '4px',
    padding: '1px 6px',
  },
};

export default function Writing() {
  const [activeTab, setActiveTab] = useState('technical');

  return (
    <main style={{ maxWidth: '672px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: '2.5rem' }}
      >
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: '#fafafa',
            marginBottom: '0.75rem',
          }}
        >
          Writing
        </h1>
        <p style={{ fontSize: '0.9375rem', color: '#71717a', lineHeight: 1.65 }}>
          Technical devlogs and honest writing about the journey. The process, not just the outcomes.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        style={{
          display: 'flex',
          gap: '0',
          marginBottom: '2.5rem',
          borderBottom: '1px solid #27272a',
        }}
      >
        {[
          { id: 'technical', label: 'Technical' },
          { id: 'human', label: 'Human' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.625rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === tab.id ? '2px solid #f59e0b' : '2px solid transparent',
              color: activeTab === tab.id ? '#fafafa' : '#71717a',
              marginBottom: '-1px',
              transition: 'color 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Technical Tab */}
      {activeTab === 'technical' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Devlogs */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#52525b',
              marginBottom: '1rem',
            }}
          >
            Devlogs
          </p>
          <div style={{ marginBottom: '3rem' }}>
            {devlogs.map((log, i) => (
              <div
                key={i}
                style={{
                  padding: '1.25rem 0',
                  borderBottom: '1px solid #27272a',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.375rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.7rem',
                      color: '#52525b',
                    }}
                  >
                    {log.date}
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.68rem',
                      color: statusColor[log.status] || '#71717a',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: statusColor[log.status] || '#71717a',
                        display: 'inline-block',
                      }}
                    />
                    {log.status}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: '#fafafa',
                    marginBottom: '0.375rem',
                  }}
                >
                  {log.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#a1a1aa',
                    lineHeight: 1.65,
                    marginBottom: '0.75rem',
                  }}
                >
                  {log.summary}
                </p>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {log.tags.map((tag) => (
                    <span key={tag} style={s.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Articles */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#52525b',
              marginBottom: '1rem',
            }}
          >
            Articles on Medium
          </p>
          <div>
            {articles.map((article, i) => (
              <a
                key={i}
                href={article.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block',
                  padding: '1.25rem 0',
                  borderBottom: '1px solid #27272a',
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    color: '#52525b',
                    display: 'block',
                    marginBottom: '0.375rem',
                  }}
                >
                  {article.date}
                </span>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: '#d4d4d8',
                    marginBottom: '0.375rem',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#fafafa')}
                  onMouseLeave={(e) => (e.target.style.color = '#d4d4d8')}
                >
                  {article.title} ↗
                </p>
                <p
                  style={{ fontSize: '0.875rem', color: '#a1a1aa', lineHeight: 1.65, marginBottom: '0.75rem' }}
                >
                  {article.summary}
                </p>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {article.tags.map((tag) => (
                    <span key={tag} style={s.tag}>{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Human Tab */}
      {activeTab === 'human' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p style={{ fontSize: '0.9375rem', color: '#71717a', lineHeight: 1.75, marginBottom: '2rem' }}>
            The honest stuff — interview prep reality checks, navigating OPT, what grad school actually
            teaches you. Writing this while I'm in it, not after I've figured it out.
          </p>
          <div style={{ marginBottom: '2rem' }}>
            {humanPosts.map((post, i) => (
              <div
                key={i}
                style={{
                  padding: '1.25rem 0',
                  borderBottom: '1px solid #27272a',
                  opacity: 0.6,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.375rem', gap: '1rem' }}>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#d4d4d8' }}>
                    {post.title}
                  </h3>
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      color: '#71717a',
                      backgroundColor: '#18181b',
                      border: '1px solid #27272a',
                      borderRadius: '4px',
                      padding: '1px 6px',
                    }}
                  >
                    {post.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#71717a', lineHeight: 1.65 }}>
                  {post.preview}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #27272a',
              backgroundColor: '#18181b',
            }}
          >
            <p style={{ fontSize: '0.875rem', color: '#71717a', lineHeight: 1.65 }}>
              Follow along on{' '}
              <a
                href="https://medium.com/@rajatsavdekar"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#f59e0b', transition: 'color 0.15s' }}
                onMouseEnter={(e) => (e.target.style.color = '#fbbf24')}
                onMouseLeave={(e) => (e.target.style.color = '#f59e0b')}
              >
                Medium ↗
              </a>{' '}
              for articles as they publish. These posts are in progress — writing while I'm in the middle of it.
            </p>
          </div>
        </motion.div>
      )}

      <ContactMe />
    </main>
  );
}
