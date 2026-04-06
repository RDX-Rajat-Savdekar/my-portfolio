import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';
import pdfUrl from '/Rajat_Resume.pdf?url';

const projects = [
  {
    name: 'Aura: Live Caption & Sound Awareness',
    description:
      'visionOS accessibility app providing real-time captions and visual alerts for hearing-impaired users. Won 2nd place at a USC Hackathon.',
    details:
      'Built spatial UI with SwiftUI for Apple Vision Pro. Integrated CoreML for on-device sound classification — kept processing local to protect user privacy. Managed the full SDLC from spatial UI design to model optimization.',
    tags: ['SwiftUI', 'visionOS', 'CoreML', 'Accessibility'],
    github: 'https://github.com/RDX-Rajat-Savdekar',
    youtube: 'https://youtube.com/@rajatsavdekar',
    badge: '2nd @ USC Hackathon',
  },
  {
    name: 'SplitIt — Splitwise Clone',
    description:
      'Fault-tolerant expense splitting app using graph algorithms to simplify debt across concurrent multi-user environments.',
    details:
      'Designed graph-based debt simplification logic. Built a modular REST API following OOP principles, optimized MongoDB schemas for real-time transaction updates. Implemented JWT auth and session state management.',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT', 'Graph Algorithms'],
    live: '#',
  },
  {
    name: 'RAG System',
    description:
      'Scalable distributed service using retrieval-augmented generation pipelines for context-aware queries.',
    details:
      'Engineered RAG pipelines to integrate external knowledge sources. Built a resilient vector search system, optimizing retrieval architectures to resolve edge-case hallucinations and ensure low latency.',
    tags: ['Python', 'LangChain', 'Vector DB', 'RAG', 'Distributed Systems'],
    github: 'https://github.com/RDX-Rajat-Savdekar',
  },
  {
    name: 'Manim-DSA',
    description:
      '20+ animated visualizations of complex distributed systems and DSA concepts. Built a rendering pipeline with caching that cut build times by 30%.',
    details:
      'Created a library of algorithmic animations demonstrating "Thinking Big" via visual system design breakdowns. Engineered caching and operational monitoring into the rendering pipeline.',
    tags: ['Python', 'Manim', 'System Design', 'DevOps'],
    github: 'https://github.com/RDX-Rajat-Savdekar',
    youtube: 'https://youtube.com/@rajatsavdekar',
  },
  {
    name: 'MockPad',
    description:
      'AI-powered coding environment for algorithm practice — personalized suggestions, real-time progress tracking, built on MERN.',
    details:
      'Developed an AI coding assistant with the MERN stack. Integrated GenAI tools to design a scalable REST API for real-time progress tracking and personalized algorithmic suggestions.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'GenAI'],
    github: 'https://github.com/RDX-Rajat-Savdekar',
  },
];

const experience = [
  {
    role: 'Teaching Assistant',
    org: 'Discover Engineering, USC Summer Programs',
    location: 'Los Angeles, CA',
    period: 'May 2025 – July 2025',
    bullets: [
      'Mentored 2 international teams through an intensive 4-week engineering rotation, delivering weekly prototypes.',
      'Guided students through the full product lifecycle, enforcing technical standards to transform concepts into functional projects.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Jalgaon Fruits Sales Cooperative',
    location: 'Jalgaon, India',
    period: 'May 2023 – May 2024',
    bullets: [
      'Owned the full lifecycle of a web-based procurement platform for 150 daily users — drove the transition from manual logs to a digital architecture with 99.9% uptime.',
      'Refactored legacy PHP modules into scalable microservices using Flask and MySQL, designing a fault-tolerant backend with zero data loss.',
      'Implemented Docker-based CI/CD pipelines, reducing release cycles by 30%.',
    ],
  },
];

const skills = {
  Languages: ['Java', 'Python', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
  'Core & Cloud': ['AWS (EC2, Lambda)', 'Docker', 'Kubernetes', 'Microservices', 'Distributed Systems', 'CI/CD'],
  Frameworks: ['Node.js', 'Flask', 'React', 'PostgreSQL', 'MongoDB', 'TensorFlow', 'LangChain'],
};

const s = {
  sectionLabel: {
    display: 'block',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#71717a',
    marginBottom: '1.5rem',
  },
  tag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.68rem',
    color: '#71717a',
    border: '1px solid #27272a',
    borderRadius: '4px',
    padding: '1px 6px',
  },
};

export default function Work() {
  return (
    <main style={{ maxWidth: '672px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: '3rem' }}
      >
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: '#fafafa',
            marginBottom: '1rem',
          }}
        >
          Work
        </h1>
        <a
          href={pdfUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.4rem 0.875rem',
            border: '1px solid #3f3f46',
            borderRadius: '6px',
            fontSize: '0.8125rem',
            color: '#a1a1aa',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#71717a';
            e.currentTarget.style.color = '#fafafa';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#3f3f46';
            e.currentTarget.style.color = '#a1a1aa';
          }}
        >
          ↓ Download Resume (PDF)
        </a>
      </motion.div>

      {/* Projects */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        style={{ marginBottom: '4rem' }}
      >
        <span style={s.sectionLabel}>Projects</span>
        <div>
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
              style={{
                padding: '1.5rem 0',
                borderBottom: '1px solid #27272a',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '0.5rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fafafa' }}>
                    {project.name}
                  </h3>
                  {project.badge && (
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.65rem',
                        color: '#f59e0b',
                        backgroundColor: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.25)',
                        borderRadius: '4px',
                        padding: '1px 6px',
                      }}
                    >
                      {project.badge}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.8rem', color: '#71717a', transition: 'color 0.15s' }}
                      onMouseEnter={(e) => (e.target.style.color = '#d4d4d8')}
                      onMouseLeave={(e) => (e.target.style.color = '#71717a')}
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.youtube && (
                    <a
                      href={project.youtube}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.8rem', color: '#71717a', transition: 'color 0.15s' }}
                      onMouseEnter={(e) => (e.target.style.color = '#d4d4d8')}
                      onMouseLeave={(e) => (e.target.style.color = '#71717a')}
                    >
                      YouTube ↗
                    </a>
                  )}
                  {project.live && project.live !== '#' && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.8rem', color: '#71717a', transition: 'color 0.15s' }}
                      onMouseEnter={(e) => (e.target.style.color = '#d4d4d8')}
                      onMouseLeave={(e) => (e.target.style.color = '#71717a')}
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#a1a1aa', lineHeight: 1.65, marginBottom: '0.5rem' }}>
                {project.description}
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#71717a', lineHeight: 1.6, marginBottom: '0.875rem' }}>
                {project.details}
              </p>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={s.tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        style={{ marginBottom: '4rem' }}
      >
        <span style={s.sectionLabel}>Experience</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {experience.map((job) => (
            <div key={job.role}>
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
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fafafa' }}>{job.role}</p>
                  <p style={{ fontSize: '0.8125rem', color: '#a1a1aa' }}>{job.org} · {job.location}</p>
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    color: '#71717a',
                    paddingTop: '2px',
                  }}
                >
                  {job.period}
                </span>
              </div>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {job.bullets.map((b, i) => (
                  <li key={i} style={{ fontSize: '0.875rem', color: '#a1a1aa', lineHeight: 1.65 }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        style={{ marginBottom: '4rem' }}
      >
        <span style={s.sectionLabel}>Skills</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: '#71717a',
                  paddingTop: '3px',
                  width: '100px',
                  flexShrink: 0,
                }}
              >
                {category}
              </span>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {items.map((item) => (
                  <span key={item} style={s.tag}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25 }}
        style={{ marginBottom: '2rem' }}
      >
        <span style={s.sectionLabel}>Education</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            {
              degree: 'MS in Computer Science',
              school: 'University of Southern California',
              location: 'Los Angeles, CA',
              period: 'Aug 2024 – May 2026',
              gpa: '3.6',
              courses: 'Web Technologies, Algorithms, Database Systems, Machine Learning',
            },
            {
              degree: 'BE in Computer Engineering',
              school: 'University of Mumbai',
              location: 'Mumbai, India',
              period: 'Aug 2019 – May 2023',
              gpa: '3.7',
              courses: 'Operating Systems, Cloud Computing, Software Engineering',
            },
          ].map((edu) => (
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
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fafafa' }}>{edu.degree}</p>
                  <p style={{ fontSize: '0.8125rem', color: '#a1a1aa' }}>{edu.school} · {edu.location}</p>
                  <p style={{ fontSize: '0.8rem', color: '#71717a', marginTop: '0.25rem' }}>
                    {edu.courses} · GPA {edu.gpa}
                  </p>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#71717a', paddingTop: '2px' }}>
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
