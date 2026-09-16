import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ContactMe from '../components/ContactMeComponent';
import { LookMarks } from '../components/RegisterHero';
import { site, experience, education, projects, resumePdf, groupProjectsByCategory, categoryLooks } from '../data/content';
import { pageWide, sectionLabel } from '../styles/shared';
import { gsap, useGSAP } from '../lib/gsap';

export default function Work() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.work-intro > *',
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.6 },
      );
    },
    { scope: root },
  );

  return (
    <main ref={root} style={pageWide} className="work-page">
      <div className="work-intro" style={{ marginBottom: '2.5rem' }}>
        <h1 className="work-title">Work</h1>
        <p className="work-lede">
          Experience, education, and the resume. Project media lives on the home page.
        </p>
        <p className="home-hire">{site.availability}</p>
        <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          Open PDF
        </a>
      </div>

      <section className="home-section">
        <span style={sectionLabel}>Resume</span>
        <div className="resume-embed">
          <iframe src={`${resumePdf}#view=FitH`} title="Resume preview" className="hero-preview-frame" />
        </div>
      </section>

      <section className="home-section">
        <span style={sectionLabel}>Experience</span>
        <div className="work-stack">
          {experience.map((job) => (
            <div key={`${job.role}-${job.period}`} className="work-job">
              <div className="work-job-head">
                <div>
                  <p className="work-job-role">{job.role}</p>
                  <p className="work-job-org">
                    {job.org} · {job.location}
                  </p>
                </div>
                <span className="work-job-period">{job.period}</span>
              </div>
              <ul className="work-job-bullets">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <span style={sectionLabel}>Education</span>
        <div className="work-stack">
          {education.map((edu) => (
            <div key={edu.school} className="work-job">
              <div className="work-job-head">
                <div>
                  <p className="work-job-role">{edu.degree}</p>
                  <p className="work-job-org">
                    {edu.school} · {edu.location}
                  </p>
                  <p className="work-job-meta">
                    {edu.courses} · {edu.gpa.includes('/') ? 'CGPA' : 'GPA'} {edu.gpa}
                  </p>
                </div>
                <span className="work-job-period">{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <span style={sectionLabel}>Projects</span>
        <div className="work-project-groups">
          {groupProjectsByCategory(projects).map((group) => (
            <div key={group.id} className="work-project-group">
              <div className="project-group-head">
                <h2 className="project-group-label">{group.label}</h2>
                <LookMarks ids={categoryLooks[group.id]} />
              </div>
              <div className="work-project-list">
                {group.projects.map((project) => (
                  <Link
                    key={project.slug}
                    to={project.projectPath || `/projects/${project.slug}`}
                    className="work-project-row"
                  >
                    <span className="work-project-name">{project.name}</span>
                    <span className="work-project-tagline">{project.tagline}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link to="/#projects" className="section-more">
          See project media
        </Link>
      </section>

      <ContactMe />
    </main>
  );
}
