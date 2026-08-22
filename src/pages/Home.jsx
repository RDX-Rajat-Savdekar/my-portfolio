import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import ProjectMediaCard, { bentoSize } from '../components/ProjectMediaCard';
import {
  site,
  experience,
  externalArticles,
  projectFilters,
  getProjectsByFilter,
  getFeaturedProjects,
} from '../data/content';
import { pageWide, sectionLabel, fade, easeOut } from '../styles/shared';
import pdfUrl from '/Rajat_Resume.pdf?url';

const COMMUNITY_PREVIEW = [
  { title: 'Sola Con Finals', src: '/community/may-2025-sola-con-finals/1.jpeg' },
  { title: 'MESA Fair', src: '/community/april-2025-mesa-fair/1.jpeg' },
  { title: 'Sola Con', src: '/community/jan-2025-sola-con/1.jpeg' },
  { title: 'HustNCode', src: '/community/dec-2024-hustncode/1.jpeg' },
];

function ExpandPill({ id, openKey, onToggle, label, primary, children }) {
  const open = openKey === id;
  return (
    <div className={`home-expand${open ? ' is-open' : ''}${primary ? ' is-primary' : ''}`}>
      <button
        type="button"
        className="home-expand-toggle"
        aria-expanded={open}
        onClick={() => onToggle(id)}
      >
        {label}
      </button>
      <span className="home-expand-panel">{children}</span>
    </div>
  );
}

function ProjectThumb({ project }) {
  const media = project.media ?? {};
  const src = media.poster || media.preview;
  const isVideo = /\.(mp4|webm)$/i.test(src ?? '');
  const to = project.projectPath || `/projects/${project.slug}`;

  return (
    <Link to={to} className="hero-thumb">
      {isVideo ? (
        <video src={src} muted loop playsInline autoPlay />
      ) : src ? (
        <img src={src} alt="" />
      ) : null}
      <span className="hero-thumb-name">{project.name}</span>
    </Link>
  );
}

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [openKey, setOpenKey] = useState(null);
  const projects = useMemo(() => getProjectsByFilter(filter), [filter]);
  const featured = useMemo(() => getFeaturedProjects().slice(0, 4), []);
  const previewOpen = ['projects', 'resume', 'writing', 'community'].includes(openKey);

  const toggle = (id) => setOpenKey((current) => (current === id ? null : id));

  return (
    <main style={pageWide} className="home-page">
      <div className="home-atmosphere" aria-hidden />

      <motion.section {...fade(0)} className="home-hero">
        <p className="home-eyebrow">{site.location}</p>
        <h1 className="home-name">{site.name}</h1>
        <p className="home-bio">
          Spatial computing and on-device AI. Build the expensive tool, then make it free.
        </p>
        <div className="home-cta-row">
          <ExpandPill id="projects" openKey={openKey} onToggle={toggle} label="See projects" primary>
            <a href="#projects" className="home-expand-link">
              Jump down
            </a>
          </ExpandPill>

          <ExpandPill id="contact" openKey={openKey} onToggle={toggle} label="Contact">
            <a href={`mailto:${site.email}`} className="home-expand-link">
              {site.email}
            </a>
          </ExpandPill>

          <ExpandPill id="resume" openKey={openKey} onToggle={toggle} label="Resume">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="home-expand-link">
              Open PDF
            </a>
          </ExpandPill>

          <ExpandPill id="writing" openKey={openKey} onToggle={toggle} label="Writing">
            <Link to="/writing" className="home-expand-link">
              Open page
            </Link>
          </ExpandPill>

          <ExpandPill id="community" openKey={openKey} onToggle={toggle} label="Community">
            <Link to="/community" className="home-expand-link">
              Open page
            </Link>
          </ExpandPill>
        </div>

        <div className={previewOpen ? 'hero-preview is-open' : 'hero-preview'}>
          <div className="hero-preview-inner">
            {openKey === 'resume' && (
              <iframe
                src={`${pdfUrl}#view=FitH`}
                title="Resume preview"
                className="hero-preview-frame"
              />
            )}

            {openKey === 'projects' && (
              <div className="hero-preview-grid">
                {featured.map((project) => (
                  <ProjectThumb key={project.slug} project={project} />
                ))}
              </div>
            )}

            {openKey === 'writing' && (
              <div className="hero-preview-panel">
                {externalArticles.map((item) => (
                  <a
                    key={item.link}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="writing-row"
                  >
                    <span className="writing-date">{item.date}</span>
                    <span className="writing-title">{item.title} ↗</span>
                  </a>
                ))}
              </div>
            )}

            {openKey === 'community' && (
              <div className="hero-preview-grid">
                {COMMUNITY_PREVIEW.map((item) => (
                  <Link to="/community" key={item.src} className="hero-thumb">
                    <img src={item.src} alt="" />
                    <span className="hero-thumb-name">{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      <motion.section {...fade(0.08)} id="projects" className="home-section">
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

        <AnimatePresence mode="popLayout">
          <motion.div layout className="project-grid" transition={{ duration: 0.55, ease: easeOut }}>
            {projects.map((project, i) => (
              <ProjectMediaCard
                key={project.slug}
                project={project}
                index={i}
                size={bentoSize(i)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <Link to="/work" className="section-more">
          Experience and resume
        </Link>
      </motion.section>

      <motion.section {...fade(0.12)} id="experience" className="home-section">
        <span style={sectionLabel}>Experience</span>
        <div className="experience-strip">
          {experience.map((job) => (
            <div key={`${job.role}-${job.period}`} className="experience-item">
              <div className="experience-meta">
                <p className="experience-role">{job.role}</p>
                <p className="experience-org">
                  {job.org} · {job.location}
                </p>
              </div>
              <span className="experience-period">{job.period}</span>
              <p className="experience-bullet">{job.bullets[0]}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...fade(0.16)} className="home-section">
        <span style={sectionLabel}>Writing</span>
        <div className="writing-list">
          {externalArticles.slice(0, 2).map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="writing-row"
            >
              <span className="writing-date">{item.date}</span>
              <span className="writing-title">{item.title} ↗</span>
            </a>
          ))}
        </div>
        <Link to="/writing" className="section-more">
          All writing
        </Link>
      </motion.section>

      <div id="contact">
        <ContactMe />
      </div>
    </main>
  );
}
