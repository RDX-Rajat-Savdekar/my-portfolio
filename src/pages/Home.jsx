import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import { site, caseStudies, getFeaturedProjects, getProjectLinks } from '../data/content';
import { page, sectionLabel, tag, fade } from '../styles/shared';

export default function Home() {
  const featured = getFeaturedProjects();
  const recentArticles = caseStudies.slice(0, 5);

  return (
    <main style={page}>
      <motion.section {...fade(0)} style={{ marginBottom: '6rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '1rem',
          }}
        >
          {site.location}
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
          {site.name}
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
          I build high-utility tools at the intersection of{' '}
          <strong style={{ color: 'var(--fg)' }}>Spatial Computing</strong> and{' '}
          <strong style={{ color: 'var(--fg)' }}>On-device AI</strong>. My approach is
          simple: build the expensive tool, then make it free.
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
            }}
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
            }}
          >
            Read Case Studies
          </Link>
        </div>
      </motion.section>

      <motion.section {...fade(0.1)} style={{ marginBottom: '6rem' }}>
        <span style={sectionLabel}>Featured Work</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {featured.map((project) => (
            <article
              key={project.slug}
              style={{
                padding: '1.5rem 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--fg)' }}>
                    {project.name}
                  </h2>
                  {project.badge && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--accent)',
                        backgroundColor: 'rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '4px',
                        padding: '1px 6px',
                      }}
                    >
                      {project.badge}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {project.articlePath && (
                    <Link
                      to={project.articlePath}
                      style={{ fontSize: '0.8rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}
                    >
                      Case study →
                    </Link>
                  )}
                  {getProjectLinks(project).map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.8rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
                {project.tagline}
              </p>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {project.tags.slice(0, 4).map((t) => (
                  <span key={t} style={tag}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <Link
          to="/work"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            fontSize: '0.8125rem',
            color: 'var(--muted)',
          }}
        >
          All projects & experience →
        </Link>
      </motion.section>

      <motion.section {...fade(0.2)} style={{ marginBottom: '6rem' }}>
        <span style={sectionLabel}>Recent Case Studies</span>
        <div>
          {recentArticles.map((item) => (
            <Link
              key={item.path}
              to={item.path}
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
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                  opacity: 0.6,
                  paddingTop: '3px',
                  width: '72px',
                }}
              >
                {item.date}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--fg)', lineHeight: 1.5 }}>
                {item.title}
              </span>
            </Link>
          ))}
        </div>
        <Link
          to="/writing"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            fontSize: '0.8125rem',
            color: 'var(--muted)',
          }}
        >
          All writing →
        </Link>
      </motion.section>

      <ContactMe />
    </main>
  );
}
