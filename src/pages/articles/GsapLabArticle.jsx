import { Link } from 'react-router-dom';
import ContactMe from '../../components/ContactMeComponent';
import GsapLabStage from '../../components/GsapLabStage';
import ProjectHeroMedia from '../../components/ProjectHeroMedia';
import ProjectLinks from '../../components/ProjectLinks';
import { getProjectBySlug, getProjectProof } from '../../data/content';
import { tag } from '../../styles/shared';
import { gsap, useGSAP, SplitText } from '../../lib/gsap';
import { useRef } from 'react';
import '../gsap-lab.css';

const COPY = {
  'astro-gsap-f1': {
    variant: 'f1',
    sister: 'astro-gsap-iron-man',
    notes: [
      'A lap is a timeline. Scroll is the playhead. The CodeTV GSAP Cloud challenge asked for a scroll story; this one treats the circuit as a scrubbed sequence: sectors, delta, and a car that only moves because you do.',
      'Built in Astro, then rebuilt in Webflow so the same GSAP timeline could live on the challenge site. The clip on this page is the submitted piece. The specimen above is the same idea, running here: pin, scrub, DrawSVG, MotionPath.',
    ],
  },
  'astro-gsap-iron-man': {
    variant: 'iron-man',
    sister: 'astro-gsap-f1',
    notes: [
      'A HUD is a layout problem with a pulse. The second GSAP Lab piece treats Iron Man as instrumentation: arcs drawn, status scrambled, power tied to scroll.',
      'Same stack as the F1 sequence: Astro for the local build, GSAP for the motion, Webflow for the hosted challenge. One lab, two registers. The specimen above is the HUD vocabulary running on this page.',
    ],
  },
};

export default function GsapLabArticle({ slug }) {
  const project = getProjectBySlug(slug);
  const copy = COPY[slug];
  const sister = copy ? getProjectBySlug(copy.sister) : null;
  const proof = getProjectProof(project);
  const media = project?.media ?? {};
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const title = root.current?.querySelector('.project-page-title');
        if (title) {
          SplitText.create(title, {
            type: 'chars',
            tag: 'span',
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.chars, {
                yPercent: 110,
                duration: 0.7,
                stagger: 0.02,
                ease: 'power4.out',
              });
            },
          });
        }
        gsap.from('.project-scan > *:not(.project-page-title)', {
          autoAlpha: 0,
          y: 12,
          stagger: 0.06,
          duration: 0.55,
          delay: 0.12,
        });
      });
    },
    { scope: root, dependencies: [slug] },
  );

  if (!project || !copy) return null;

  return (
    <main ref={root} className="project-page is-lab">
      <Link to="/#projects" className="back-link">
        ← All projects
      </Link>

      <header className="project-scan">
        <p className="home-eyebrow">{project.badge}</p>
        <h1 className="project-page-title">{project.name}</h1>
        <p className="project-page-lead">{project.tagline}</p>
        {proof.length > 0 && (
          <ul className="project-proof">
            {proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <div className="project-scan-links">
          <ProjectLinks project={{ ...project, projectPath: null }} />
        </div>
        <div className="project-card-tags">
          {project.tags.map((item) => (
            <span key={item} style={tag}>
              {item}
            </span>
          ))}
        </div>
        {sister && (
          <Link to={sister.projectPath} className="lab-sister">
            Also in the lab: {sister.name} →
          </Link>
        )}
      </header>

      <GsapLabStage variant={copy.variant} />

      <ProjectHeroMedia media={media} />

      <div className="lab-notes">
        <h2>Notes</h2>
        {copy.notes.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>

      <ContactMe />
    </main>
  );
}
