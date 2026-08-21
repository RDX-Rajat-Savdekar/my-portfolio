import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import ProjectHeroMedia from '../components/ProjectHeroMedia';
import ProjectLinks from '../components/ProjectLinks';
import { getProjectBySlug } from '../data/content';
import { tag } from '../styles/shared';
import CelestiaVRArticle from './articles/CelestiaVRArticle';
import AuraArticle from './articles/AuraArticle';
import AfterImageArticle from './articles/AfterImageArticle';
import MockPadArticle from './articles/MockPadArticle';
import SplitItArticle from './articles/SplitItArticle';
import CreatorLabArticle from './articles/CreatorLabArticle';
import ResearchPapersArticle from './articles/ResearchPapersArticle';
import TrojanmindArticle from './articles/TrojanmindArticle';
import StitchArticle from './articles/StitchArticle';
import EmojiCodeArticle from './articles/EmojiCodeArticle';

const WRITEUPS = {
  'celestia-vr': CelestiaVRArticle,
  aura: AuraArticle,
  'after-image': AfterImageArticle,
  mockpad: MockPadArticle,
  splitit: SplitItArticle,
  'creator-lab': CreatorLabArticle,
  'research-papers': ResearchPapersArticle,
  trojanmind: TrojanmindArticle,
  stitch: StitchArticle,
  emojicode: EmojiCodeArticle,
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  if (!project) return <Navigate to="/work" replace />;

  const Writeup = WRITEUPS[slug];
  if (Writeup) {
    return <Writeup layout="project" />;
  }

  return <GenericProjectPage project={project} />;
}

function GenericProjectPage({ project }) {
  const media = project.media ?? {};
  const preview = media.preview || media.poster;

  return (
    <main className="project-page">
      <Link to="/#projects" className="back-link">
        ← All projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {preview && <ProjectHeroMedia media={media} />}

        <p className="home-eyebrow" style={{ marginBottom: '0.75rem' }}>
          {project.badge || project.filter || 'Project'}
        </p>
        <h1 className="project-page-title">{project.name}</h1>
        <p className="project-page-lead">{project.tagline}</p>
        <ProjectLinks project={{ ...project, projectPath: null }} />

        <div className="project-page-body">
          <p>{project.description}</p>
          {project.details && <p className="project-page-details">{project.details}</p>}
        </div>

        <div className="project-card-tags" style={{ marginTop: '1.25rem' }}>
          {project.tags.map((t) => (
            <span key={t} style={tag}>
              {t}
            </span>
          ))}
        </div>

        {project.papers?.length > 0 && (
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
                style={{ marginTop: '1rem' }}
              >
                Full Google Scholar profile →
              </a>
            )}
          </section>
        )}
      </motion.div>

      <ContactMe />
    </main>
  );
}
