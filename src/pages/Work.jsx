import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import { projects, experience, education, getProjectLinks } from '../data/content';
import { page, sectionLabel, tag } from '../styles/shared';
import pdfUrl from '/Rajat_Resume.pdf?url';

export default function Work() {
  return (
    <main style={page}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: '3rem' }}
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
          Work
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1.25rem', maxWidth: '520px' }}>
          Projects, experience, and education. Case studies with architecture decisions live under Writing.
        </p>
        <a
          href={pdfUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.4rem 0.875rem',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            fontSize: '0.8125rem',
            color: 'var(--muted)',
          }}
        >
          ↓ Download Resume (PDF)
        </a>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        style={{ marginBottom: '4rem' }}
      >
        <span style={sectionLabel}>Projects</span>
        <div>
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
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
                  marginBottom: '0.5rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--fg)' }}>
                    {project.name}
                  </h3>
                  {project.featured && (
                    <span style={{ ...tag, color: 'var(--accent)', borderColor: 'rgba(56, 189, 248, 0.25)' }}>
                      featured
                    </span>
                  )}
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
                      style={{ fontSize: '0.8rem', color: 'var(--accent)' }}
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
                      style={{ fontSize: '0.8rem', color: 'var(--muted)' }}
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '0.5rem' }}>
                {project.description}
              </p>
              {project.details && (
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--muted)',
                    opacity: 0.7,
                    lineHeight: 1.6,
                    marginBottom: '0.875rem',
                  }}
                >
                  {project.details}
                </p>
              )}
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {project.tags.map((t) => (
                  <span key={t} style={tag}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        style={{ marginBottom: '4rem' }}
      >
        <span style={sectionLabel}>Experience</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {experience.map((job) => (
            <div key={`${job.role}-${job.period}`}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.25rem',
                  marginBottom: '0.25rem',
                }}
              >
                <div>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--fg)' }}>{job.role}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
                    {job.org} · {job.location}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--muted)',
                    paddingTop: '2px',
                  }}
                >
                  {job.period}
                </span>
              </div>
              <ul
                style={{
                  marginTop: '0.75rem',
                  paddingLeft: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.375rem',
                }}
              >
                {job.bullets.map((b) => (
                  <li key={b} style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        style={{ marginBottom: '2rem' }}
      >
        <span style={sectionLabel}>Education</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {education.map((edu) => (
            <div key={edu.school}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.25rem',
                }}
              >
                <div>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--fg)' }}>{edu.degree}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
                    {edu.school} · {edu.location}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', opacity: 0.7, marginTop: '0.25rem' }}>
                    {edu.courses} · GPA {edu.gpa}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--muted)',
                    paddingTop: '2px',
                  }}
                >
                  {edu.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <ContactMe />
    </main>
  );
}
