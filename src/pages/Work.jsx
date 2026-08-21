import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import ProjectMediaCard from '../components/ProjectMediaCard';
import { experience, education, projectFilters, getProjectsByFilter } from '../data/content';
import { pageWide, sectionLabel } from '../styles/shared';
import pdfUrl from '/Rajat_Resume.pdf?url';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const projects = useMemo(() => getProjectsByFilter(filter), [filter]);

  return (
    <main style={pageWide}>
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
          Work
        </h1>
        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--muted)',
            lineHeight: 1.65,
            marginBottom: '1.25rem',
            maxWidth: '520px',
          }}
        >
          Full project catalog with the same media previews as home. Filter by lane, then dig into
          experience, education, and the resume PDF.
        </p>
        <a
          href={pdfUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
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
        <div className="filter-row" role="tablist" aria-label="Project filters">
          {projectFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              className={filter === item.id ? 'filter-chip active' : 'filter-chip'}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {projects.map((project, i) => (
            <ProjectMediaCard key={project.slug} project={project} index={i} />
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
