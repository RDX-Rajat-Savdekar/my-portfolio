import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import { site, externalArticles, humanPosts } from '../data/content';
import { page, tag } from '../styles/shared';

export default function Writing() {
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
        <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '36rem' }}>
          Personal essays on interview prep, OPT, and graduate school. Project deep-dives live on
          each project page — not here.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        style={{ marginBottom: '3.5rem' }}
      >
        <p className="home-eyebrow" style={{ marginBottom: '1rem' }}>
          Human
        </p>
        <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
          Documenting the journey in real time — hiring loops, visa math, and what actually helped.
        </p>
        <div style={{ marginBottom: '1.5rem' }}>
          {humanPosts.map((post) => (
            <div
              key={post.title}
              style={{
                padding: '1.25rem 0',
                borderBottom: '1px solid var(--border)',
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
                <h3 style={{ fontSize: '0.975rem', fontWeight: 600, color: 'var(--fg)' }}>{post.title}</h3>
                <span style={{ ...tag, flexShrink: 0 }}>{post.status}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{post.preview}</p>
            </div>
          ))}
        </div>
        <a href={site.links.medium} target="_blank" rel="noreferrer" className="plink plink-live">
          Follow on Medium ↗
        </a>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <p className="home-eyebrow" style={{ marginBottom: '1rem' }}>
          On Medium
        </p>
        <div>
          {externalArticles.map((article) => (
            <a
              key={article.link}
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="writing-row"
              style={{ display: 'block', padding: '1.25rem 0', borderBottom: '1px solid var(--border)' }}
            >
              <span className="writing-date" style={{ display: 'block', marginBottom: '0.4rem' }}>
                {article.date}
              </span>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.4rem' }}>
                {article.title} ↗
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
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
      </motion.section>

      <ContactMe />
    </main>
  );
}
