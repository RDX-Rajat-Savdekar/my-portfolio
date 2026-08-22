import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactMe from './ContactMeComponent';
import ProjectHeroMedia from './ProjectHeroMedia';
import ProjectLinks from './ProjectLinks';
import { getProjectBySlug, getProjectProof } from '../data/content';

export default function ArticleLayout({
  layout = 'article',
  projectSlug,
  title,
  date,
  tags,
  description,
  children,
}) {
  const project = projectSlug ? getProjectBySlug(projectSlug) : null;
  const isProject = layout === 'project';
  const media = project?.media ?? {};
  const preview = media.preview || media.poster;
  const proof = project ? getProjectProof(project) : [];
  const lead = isProject && project ? project.tagline : description;

  return (
    <main className={isProject ? 'project-page' : 'article-page'}>
      <Link to={isProject ? '/#projects' : '/writing'} className="back-link">
        {isProject ? '← All projects' : '← Writing'}
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <header className="project-scan">
          <div className="home-eyebrow">
            {isProject ? project?.badge || date : date}
          </div>
          <h1 className="project-page-title">{isProject && project ? project.name : title}</h1>
          <p className="project-page-lead">{lead}</p>
          {proof.length > 0 && (
            <ul className="project-proof">
              {proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {project && (
            <div className="project-scan-links">
              <ProjectLinks project={{ ...project, projectPath: null }} />
            </div>
          )}
          <div className="project-scan-tags">
            {tags.map((t) => (
              <span key={t} className="tag-pill">
                {t}
              </span>
            ))}
          </div>
        </header>

        {isProject && preview && <ProjectHeroMedia media={media} />}

        {isProject && project?.papers?.length > 0 && (
          <section className="papers-section">
            <h2>Papers</h2>
            <ul className="papers-list">
              {project.papers.map((paper) => (
                <li key={paper.title}>
                  <div>
                    <p className="paper-title">{paper.title}</p>
                    <p className="paper-meta">
                      {paper.venue} · {paper.year}
                      {paper.citations ? ` · ${paper.citations} citations` : ''}
                    </p>
                  </div>
                  <div className="paper-actions">
                    {paper.pdf && (
                      <a href={paper.pdf} target="_blank" rel="noreferrer" className="plink plink-paper">
                        PDF ↗
                      </a>
                    )}
                    {paper.scholar && (
                      <a href={paper.scholar} target="_blank" rel="noreferrer" className="plink plink-default">
                        Scholar ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {project.scholar && (
              <a
                href={project.scholar}
                target="_blank"
                rel="noreferrer"
                className="section-more"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                Full Google Scholar profile →
              </a>
            )}
          </section>
        )}

        {children && (
          <div className="article-content">
            {isProject && <h2 className="project-notes-label">Notes</h2>}
            {children}
          </div>
        )}
      </motion.article>

      <div style={{ marginTop: '5rem' }}>
        <ContactMe />
      </div>
    </main>
  );
}
