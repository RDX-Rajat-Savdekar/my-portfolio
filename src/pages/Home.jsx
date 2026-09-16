import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import HeadcountFeature from '../components/HeadcountFeature';
import ProjectMediaCard, { bentoSize } from '../components/ProjectMediaCard';
import RegisterHero, { ModeLegend, LookMarks } from '../components/RegisterHero';
import {
  site,
  communityEvents,
  projectFilters,
  getProjectsByFilter,
  groupProjectsByCategory,
  getProjectBySlug,
  getFilterLabel,
  categoryLooks,
  resumePdf,
} from '../data/content';
import { pageWide, sectionLabel, easeOut } from '../styles/shared';
import { gsap, useGSAP, ScrollTrigger, SplitText } from '../lib/gsap';

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

function ProjectGrid({ projects, sizeForIndex }) {
  return (
    <motion.div layout className="project-grid" transition={{ duration: 0.55, ease: easeOut }}>
      {projects.map((project, i) => (
        <ProjectMediaCard
          key={project.slug}
          project={project}
          index={i}
          size={sizeForIndex ? sizeForIndex(i) : bentoSize(i)}
          showCategory
        />
      ))}
    </motion.div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [openKey, setOpenKey] = useState(null);
  const pageRef = useRef(null);
  const grouped = useMemo(
    () => (filter === 'all' ? groupProjectsByCategory(getProjectsByFilter('all')) : null),
    [filter],
  );
  const projects = useMemo(() => {
    if (filter === 'all') return [];
    const list = getProjectsByFilter(filter);
    if (filter === 'featured') return list.filter((p) => !p.spotlight);
    return list;
  }, [filter]);
  const headcount = getProjectBySlug('headcount-vouch');
  const showSpotlight = (filter === 'all' || filter === 'featured') && headcount;
  const previewOpen = openKey === 'resume' || openKey === 'community';

  const toggle = (id) => setOpenKey((current) => (current === id ? null : id));

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);

      gsap.set('.home-name-plate-cyan', { x: -18, y: 4, autoAlpha: 0.9 });
      gsap.set('.home-name-plate-magenta', { x: 18, y: -4, autoAlpha: 0.9 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.home-eyebrow', { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.45 }, 0);
      tl.to('.home-name-plate-cyan', { x: -1, y: 0, duration: 0.85, ease: 'expo.out' }, 0.05);
      tl.to('.home-name-plate-magenta', { x: 1, y: 0, duration: 0.85, ease: 'expo.out' }, 0.05);
      tl.to('.home-name-plate-cyan', { autoAlpha: 0.2, duration: 0.35 }, 0.72);
      tl.to('.home-name-plate-magenta', { autoAlpha: 0.2, duration: 0.35 }, 0.72);

      SplitText.create('.home-name-ink', {
        type: 'chars',
        tag: 'span',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 115,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power4.out',
            delay: 0.08,
          });
        },
      });

      tl.fromTo('.home-hire', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.42);
      tl.fromTo(
        '.home-cta-row > *',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.5 },
        0.52,
      );
      tl.fromTo(
        '.hero-globe',
        { autoAlpha: 0, scale: 0.82, rotation: 8 },
        { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.9 },
        0.12,
      );
      tl.fromTo(
        '.mode-legend li',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.45 },
        0.62,
      );
      tl.fromTo(
        '.filter-chip',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.4 },
        0.7,
      );

      gsap.to('.hero-globe', {
        y: 36,
        rotation: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      return () => window.removeEventListener('load', refresh);
    },
    { scope: pageRef },
  );

  return (
    <main ref={pageRef} style={pageWide} className="home-page">
      <div className="home-atmosphere" aria-hidden />

      <RegisterHero>
        <p className="home-eyebrow">{site.location}</p>
        <h1 className="home-name">
          <span className="home-name-stack">
            <span className="home-name-plate home-name-plate-cyan" aria-hidden>
              {site.name}
            </span>
            <span className="home-name-plate home-name-plate-magenta" aria-hidden>
              {site.name}
            </span>
            <span className="home-name-clip">
              <span className="home-name-ink">{site.name}</span>
            </span>
          </span>
        </h1>
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
      </RegisterHero>

      <section id="projects" className="home-section">
        <span style={sectionLabel}>Projects</span>
        <ModeLegend />

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

        {showSpotlight && <HeadcountFeature project={headcount} />}

        <AnimatePresence mode="popLayout">
          {grouped ? (
            <div className="project-groups">
              {grouped.map((group) => (
                <section key={group.id} className="project-group" aria-labelledby={`group-${group.id}`}>
                  <div className="project-group-head">
                    <h2 id={`group-${group.id}`} className="project-group-label">
                      {group.label}
                    </h2>
                    <LookMarks ids={categoryLooks[group.id]} />
                    <span className="project-group-count">
                      {group.projects.length} {group.projects.length === 1 ? 'project' : 'projects'}
                    </span>
                  </div>
                  <ProjectGrid
                    projects={group.projects}
                    sizeForIndex={(i) => (i === 0 ? 'lg' : bentoSize(i + 1))}
                  />
                </section>
              ))}
            </div>
          ) : (
            <>
              {filter !== 'featured' && (
                <div className="project-group-head">
                  <h2 className="project-group-label project-group-label-solo">{getFilterLabel(filter)}</h2>
                  <LookMarks ids={categoryLooks[filter]} />
                </div>
              )}
              <ProjectGrid projects={projects} />
            </>
          )}
        </AnimatePresence>

        <Link to="/work" className="section-more">
          Experience, education, and resume
        </Link>
      </section>

      <div id="contact">
        <ContactMe />
      </div>
    </main>
  );
}
