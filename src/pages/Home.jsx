import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import ProjectMediaCard from '../components/ProjectMediaCard';
import {
  site,
  experience,
  humanPosts,
  externalArticles,
  projectFilters,
  getProjectsByFilter,
} from '../data/content';
import { pageWide, sectionLabel, fade } from '../styles/shared';

export default function Home() {
  const [filter, setFilter] = useState('all');
  const projects = useMemo(() => getProjectsByFilter(filter), [filter]);

  return (
    <main style={pageWide} className="home-page">
      <div className="home-atmosphere" aria-hidden />

      <motion.section {...fade(0)} className="home-hero">
        <p className="home-eyebrow">{site.location}</p>
        <h1 className="home-name">{site.name}</h1>
        <p className="home-bio">
          I build high-utility tools at the intersection of{' '}
          <strong>Spatial Computing</strong> and <strong>On-device AI</strong>. My
          approach is simple: build the expensive tool, then make it free.
        </p>
        <div className="home-cta-row">
          <a href="#projects" className="btn-primary">
            See projects
          </a>
          <a href="#contact" className="btn-ghost">
            Contact
          </a>
        </div>
      </motion.section>

      <motion.section {...fade(0.08)} id="projects" className="home-section">
        <div className="section-head">
          <span style={sectionLabel}>Projects</span>
          <p className="section-sub">
            GIF on load, video on hover. Sorted so similar link types sit together — Live demos,
            then videos, then papers / repos.
          </p>
        </div>

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
          <motion.div layout className="project-grid">
            {projects.map((project, i) => (
              <ProjectMediaCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <Link to="/work" className="section-more">
          Full catalog, experience & resume →
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
        <p className="section-sub">Human stuff — hiring, OPT, grad school. Not project writeups.</p>
        <div className="writing-list">
          {humanPosts.map((post) => (
            <div key={post.title} className="writing-row" style={{ cursor: 'default' }}>
              <span className="writing-date">{post.status}</span>
              <span className="writing-title">{post.title}</span>
            </div>
          ))}
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
          All writing →
        </Link>
      </motion.section>

      <div id="contact">
        <ContactMe />
      </div>
    </main>
  );
}
