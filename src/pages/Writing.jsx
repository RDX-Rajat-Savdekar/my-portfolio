import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactMe from '../components/ContactMeComponent';
import { site, caseStudies, externalArticles, humanPosts } from '../data/content';
import { page, tag } from '../styles/shared';

export default function Writing() {
  const [activeTab, setActiveTab] = useState('technical');

  return (
    <main style={page}>
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
          Writing
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.65 }}>
          Engineering case studies, architecture decisions, and honest writing about the journey.
        </p>
      </motion.div>

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
            type="button"
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
            }}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {activeTab === 'technical' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
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
            {caseStudies.map((article) => (
              <Link
                key={article.path}
                to={article.path}
                style={{
                  display: 'block',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--muted)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {article.date}
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.5rem' }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {article.summary}
                </p>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {article.tags.map((t) => (
                    <span key={t} style={tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
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
            {externalArticles.map((article) => (
              <a
                key={article.link}
                href={article.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--muted)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {article.date}
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.5rem' }}>
                  {article.title} ↗
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {article.summary}
                </p>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {article.tags.map((t) => (
                    <span key={t} style={tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'human' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Personal writing on interview prep, navigating OPT, and graduate school. Documenting the
            journey in real-time.
          </p>
          <div style={{ marginBottom: '2rem' }}>
            {humanPosts.map((post) => (
              <div
                key={post.title}
                style={{
                  padding: '1.25rem 0',
                  borderBottom: '1px solid var(--border)',
                  opacity: 0.6,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.375rem',
                    gap: '1rem',
                  }}
                >
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--fg)' }}>{post.title}</h3>
                  <span style={{ ...tag, flexShrink: 0 }}>{post.status}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{post.preview}</p>
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
              <a href={site.links.medium} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
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
