import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import ProjectMediaCard, { bentoSize } from '../components/ProjectMediaCard';
import { site, communityEvents, projectFilters, getProjectsByFilter, resumePdf } from '../data/content';
import { pageWide, sectionLabel, fade, easeOut } from '../styles/shared';

const COMMUNITY_PREVIEW = communityEvents.map((event) => ({
  title: event.title.replace(/^[A-Za-z]+ \d{4}:\s*/, ''),
  src: `/community/${event.folder}/${event.files[0]}`,
}));

function ExpandPill({ id, openKey, onToggle, label, children }) {
  const open = openKey === id;
  return (
    <div className={open ? 'home-expand is-open' : 'home-expand'}>
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

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [openKey, setOpenKey] = useState(null);
  const projects = useMemo(() => getProjectsByFilter(filter), [filter]);
  const previewOpen = openKey === 'resume' || openKey === 'community';

  const toggle = (id) => setOpenKey((current) => (current === id ? null : id));

  return (
    <main style={pageWide} className="home-page">
      <div className="home-atmosphere" aria-hidden />

      <motion.section {...fade(0)} className="home-hero">
        <p className="home-eyebrow">{site.location}</p>
        <h1 className="home-name">{site.name}</h1>
        <p className="home-bio">
          Spatial computing and on-device AI. Currently: Mediverse, a Quest surgical trainer at
          Easley-Dunn, and Caliberate, a calibrated eval harness for LLM-generated code. Build the
          expensive tool, then make it free.
        </p>
        <p className="home-hire">{site.availability}</p>
        <div className="home-cta-row">
          <a href="#projects" className="btn-primary">
            See projects
          </a>

          <ExpandPill id="resume" openKey={openKey} onToggle={toggle} label="Resume">
            <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="home-expand-link">
              Open PDF
            </a>
          </ExpandPill>

          <ExpandPill id="community" openKey={openKey} onToggle={toggle} label="Community">
            <Link to="/community" className="home-expand-link">
              Open page
            </Link>
          </ExpandPill>
        </div>

        <div
          className={`hero-preview${previewOpen ? ' is-open' : ''}${openKey === 'resume' ? ' is-resume' : ''}`}
        >
          <div className="hero-preview-inner">
            {openKey === 'resume' && (
              <iframe
                src={`${resumePdf}#view=FitH`}
                title="Resume preview"
                className="hero-preview-frame"
              />
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
          Experience, education, and resume
        </Link>
      </motion.section>

      <div id="contact">
        <ContactMe />
      </div>
    </main>
  );
}
