import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import { site, experience, education, projects } from '../data/content';
import { pageWide, sectionLabel, easeOut } from '../styles/shared';
import pdfUrl from '/Rajat_Resume.pdf?url';

export default function Work() {
  return (
    <main style={pageWide} className="work-page">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        style={{ marginBottom: '2.5rem' }}
      >
        <h1 className="work-title">Work</h1>
        <p className="work-lede">
          Experience, education, and the resume. Project media lives on the home page.
        </p>
        <p className="home-hire">{site.availability}</p>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          Open PDF
        </a>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: easeOut }}
        className="home-section"
      >
        <span style={sectionLabel}>Resume</span>
        <div className="resume-embed">
          <iframe src={`${pdfUrl}#view=FitH`} title="Resume preview" className="hero-preview-frame" />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
        className="home-section"
      >
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
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.14, ease: easeOut }}
        className="home-section"
      >
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
                    {edu.courses} · GPA {edu.gpa}
                  </p>
                </div>
                <span className="work-job-period">{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: easeOut }}
        className="home-section"
      >
        <span style={sectionLabel}>Projects</span>
        <div className="work-project-list">
          {projects.map((project) => (
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
        <Link to="/#projects" className="section-more">
          See project media
        </Link>
      </motion.section>

      <ContactMe />
    </main>
  );
}
