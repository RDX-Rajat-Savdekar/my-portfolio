import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactMe from '../components/ContactMeComponent';

const technicalArticles = [
  {
    date: 'June 2026',
    title: 'Architecting an Astronomically Accurate XR Sky Engine',
    summary:
      'How I built a high-performance celestial simulation for Meta Quest 3S using JPL telemetry and custom rotation models.',
    tags: ['Unity', 'XR', 'Physics', 'Math'],
    path: '/writing/celestia-vr',
  },
  {
    date: 'October 2024',
    title: 'Aura: Real-time Spatial HUDs on visionOS',
    summary:
      'Engineering a low-latency, privacy-first accessibility tool for Apple Vision Pro using CoreML and custom rendering pipelines.',
    tags: ['visionOS', 'SwiftUI', 'CoreML'],
    path: '/writing/aura',
  },
  {
    date: 'June 2026',
    title: 'Engineering a Deterministic Ghost Replay System',
    summary:
      'Optimizing memory and physics for a Unity 2D game. Solving GC pressure and frame spikes through architectural pivots.',
    tags: ['Unity', 'C#', 'Memory', 'Optimization'],
    path: '/writing/after-image',
  },
];

const externalArticles = [
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
];

const s = {
  tag: {
    fontFamily: "var(--font-mono)",
    fontSize: '0.68rem',
    color: 'var(--muted)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '1px 6px',
  },
};

export default function Writing() {
  const [activeTab, setActiveTab] = useState('technical');

  return (
    <main style={{ maxWidth: '672px', margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
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
            color: 'var(--fg)',
            marginBottom: '0.75rem',
          }}
        >
          Articles
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.65 }}>
          Technical deep-dives, engineering case studies, and honest writing about the journey.
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
          borderBottom: '1px solid var(--border)',
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
              borderBottom: activeTab === tab.id ? '2px solid var(--fg)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--fg)' : 'var(--muted)',
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
          {/* Case Studies */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              opacity: 0.6,
              marginBottom: '1rem',
            }}
          >
            Engineering Case Studies
          </p>
          <div style={{ marginBottom: '4rem' }}>
            {technicalArticles.map((article, i) => (
              <Link
                key={i}
                to={article.path}
                style={{
                  display: 'block',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid var(--border)',
                  textDecoration: 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: '0.7rem', color: 'var(--muted)' }}>
                    {article.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--fg)',
                    marginBottom: '0.5rem',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--fg)')}
                >
                  {article.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {article.summary}
                </p>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {article.tags.map((tag) => (
                    <span key={tag} style={s.tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* External Articles */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              opacity: 0.6,
              marginBottom: '1rem',
            }}
          >
            External Publications
          </p>
          <div>
            {externalArticles.map((article, i) => (
              <a
                key={i}
                href={article.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid var(--border)',
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: '0.7rem',
                    color: 'var(--muted)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {article.date}
                </span>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--fg)',
                    marginBottom: '0.5rem',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  {article.title} ↗
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
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
          <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Personal writing on interview prep, navigating OPT, and graduate school. 
            Documenting the journey in real-time.
          </p>
          <div style={{ marginBottom: '2rem' }}>
            {humanPosts.map((post, i) => (
              <div
                key={i}
                style={{
                  padding: '1.25rem 0',
                  borderBottom: '1px solid var(--border)',
                  opacity: 0.6,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.375rem', gap: '1rem' }}>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--fg)' }}>
                    {post.title}
                  </h3>
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: "var(--font-mono)",
                      fontSize: '0.65rem',
                      color: 'var(--muted)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      padding: '1px 6px',
                    }}
                  >
                    {post.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                  {post.preview}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
            }}
          >
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              Follow along on{' '}
              <a
                href="https://medium.com/@rajatsavdekar"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--accent)', transition: 'opacity 0.15s' }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                Medium ↗
              </a>{' '}
              for more articles.
            </p>
          </div>
        </motion.div>
      )}

      <ContactMe />
    </main>
  );
}
