import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactMe from './ContactMeComponent';

export default function ArticleLayout({ children, title, date, tags, description }) {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
      <Link
        to="/writing"
        style={{
          display: 'inline-block',
          fontSize: '0.875rem',
          color: 'var(--muted)',
          marginBottom: '2rem',
          transition: 'color 0.15s',
        }}
        onMouseEnter={(e) => (e.target.style.color = 'var(--fg)')}
        onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
      >
        ← Back to Articles
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <header style={{ marginBottom: '3rem' }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: '0.75rem',
              color: 'var(--accent)',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {date}
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--fg)',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: 'var(--muted)',
              marginBottom: '1.5rem',
            }}
          >
            {description}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                  border: '1px solid var(--border)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="article-content"
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: '#d4d4d8',
          }}
        >
          {children}
        </div>
      </motion.article>

      <div style={{ marginTop: '6rem' }}>
        <ContactMe />
      </div>

      <style>{`
        .article-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--fg);
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }
        .article-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--fg);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .article-content p {
          margin-bottom: 1.5rem;
        }
        .article-content ul, .article-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.25rem;
        }
        .article-content li {
          margin-bottom: 0.5rem;
        }
        .article-content code {
          font-family: var(--font-mono);
          background: #18181b;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9em;
          color: var(--accent);
        }
        .article-content blockquote {
          border-left: 2px solid var(--accent);
          padding-left: 1.5rem;
          font-style: italic;
          color: var(--muted);
          margin: 2rem 0;
        }
        .article-content strong {
          color: var(--fg);
        }
      `}</style>
    </main>
  );
}
