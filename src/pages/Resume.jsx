// src/pages/Resume.jsx
import { motion } from 'framer-motion';
import StickySectionHeader from '../components/StickySectionHeader';
import SectionBlock from '../components/SectionBlock';
import ContactMe from '../components/ContactMeComponent';
import pdfUrl from '/Rajat_Resume.pdf?url'; // ensures correct path in prod

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  padding: '1.5rem',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
};

const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: i * 0.1 },
});

export default function Resume() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Resume</h1>
        <a
          href={pdfUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.7rem 1.1rem',
            fontWeight: 700,
            borderRadius: 10,
            textDecoration: 'none',
            color: '#0b1020',
            background: 'linear-gradient(135deg,#9ae6b4,#63b3ed)',
          }}
        >
          ⬇️ Download Resume (PDF)
        </a>
      </div>

      <SectionBlock />

      {/* === Education === */}
      <StickySectionHeader label="Education" />
      <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
        <motion.div {...fadeUp(0)} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: 0 }}>Master of Science in Computer Science</h3>
              <p style={{ margin: '0.25rem 0', color: '#aaa' }}>
                University of Southern California • Los Angeles, CA
              </p>
              <p style={{ margin: 0, color: '#bbb', fontSize: '0.95rem' }}>
                Relevant Coursework: Algorithms, Web Technology, Data Science/ML, Game Design, NLP • GPA: 3.6
              </p>
            </div>
            <span style={{ fontSize: '0.9rem', color: '#ccc', whiteSpace: 'nowrap' }}>Aug 2024 – May 2026</span>
          </div>
        </motion.div>

        <motion.div {...fadeUp(1)} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: 0 }}>Bachelor of Engineering in Computer Engineering</h3>
              <p style={{ margin: '0.25rem 0', color: '#aaa' }}>
                University of Mumbai • Mumbai, India
              </p>
              <p style={{ margin: 0, color: '#bbb', fontSize: '0.95rem' }}>
                Relevant Coursework: Computer Networks, Software Engineering, Data Structures, AR/VR • GPA: 3.7
              </p>
            </div>
            <span style={{ fontSize: '0.9rem', color: '#ccc', whiteSpace: 'nowrap' }}>Aug 2019 – May 2023</span>
          </div>
        </motion.div>
      </div>

      {/* === Experience === */}
      <StickySectionHeader label="Experience" />
      <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
        <motion.div {...fadeUp(0)} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>Frontend Developer Intern — World Salon</h3>
            <span style={{ fontSize: '0.9rem', color: '#ccc' }}>Jun 2025 – Aug 2025</span>
          </div>
          <p style={{ fontStyle: 'italic', margin: '0.5rem 0', color: '#aaa' }}>Los Angeles, CA</p>
          <ul style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
            <li>Built end-to-end Speaker Portal (login, profile, events, invitations), streamlining scheduling for ~500 speakers and reducing manual coordination by ~30%.</li>
            <li>Integrated 20 REST APIs with Swagger/OpenAPI and secure auth, cutting API-related bugs by ~40% during QA.</li>
            <li>Optimized frontend with Vite (code splitting, asset preloading) and enforced quality via PR workflows and linting.</li>
          </ul>
        </motion.div>

        <motion.div {...fadeUp(1)} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>Teaching Assistant — USC Summer Programs</h3>
            <span style={{ fontSize: '0.9rem', color: '#ccc' }}>May 2025 – Jun 2025</span>
          </div>
          <p style={{ fontStyle: 'italic', margin: '0.5rem 0', color: '#aaa' }}>Los Angeles, CA</p>
          <ul style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
            <li>Supported an intensive 4-week “Discover Engineering” program for ~160 high-school students.</li>
            <li>Led hands-on workshops (Arduino, LEDs, design sprints) to teach practical problem solving.</li>
          </ul>
        </motion.div>

        <motion.div {...fadeUp(2)} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>Software Engineer — Jalgaon Fruits Sales Cooperative</h3>
            <span style={{ fontSize: '0.9rem', color: '#ccc' }}>May 2023 – May 2024</span>
          </div>
          <p style={{ fontStyle: 'italic', margin: '0.5rem 0', color: '#aaa' }}>Jalgaon, India</p>
          <ul style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
            <li>Digitized procurement and inventory workflows for ~150 daily users, reducing errors and enabling faster farmer payments.</li>
            <li>Refactored legacy PHP monolith into Flask microservices, improving responsiveness and simplifying maintenance of procurement and approval processes.</li>
            <li>Introduced Docker and CI/CD (GitHub Actions), stabilizing deployments and accelerating releases by ~30%.</li>
            <li>Built React + Flask dashboards with analytics on stock, demand trends, and payments to reduce spoilage and improve transparency.</li>
          </ul>
        </motion.div>
      </div>

      {/* === Projects (optional on resume page) === */}
      <StickySectionHeader label="Projects" />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {[
          {
            title: 'E-Commerce Product Discovery Platform',
            date: 'Aug 2025',
            type: 'Personal Project',
            bullets: [
              'Designing global-scale discovery app with search, filtering, recommendations, and product pages.',
              'Planning bundle-size reduction, code splitting, and accessibility for high-performance UX.',
            ],
            tools: 'React · Redux · Node.js · Webpack · MongoDB',
          },
          {
            title: 'DSA Visualizer Series',
            date: 'May 2025',
            type: 'Personal Project',
            bullets: [
              '10 animated explainers for algorithms and data structures with step-by-step visual clarity.',
              'Motion graphics to improve comprehension and retention.',
            ],
            tools: 'Manim · Python',
          },
          {
            title: 'Full Stack Weather Tracker',
            date: 'Dec 2024',
            type: 'Course Project',
            bullets: [
              'Web + iOS weather apps with autocomplete search, forecast visualization, and favorites.',
              'REST backends (Node.js/Flask) deployed on GCP.',
            ],
            tools: 'Angular · Node.js · Flask · SwiftUI · GCP',
          },
        ].map((p, i) => (
          <motion.div key={i} {...fadeUp(i)} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>{p.title}</h3>
              <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{p.date}</span>
            </div>
            <p style={{ fontStyle: 'italic', margin: '0.5rem 0', color: '#aaa' }}>{p.type}</p>
            <ul style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
              {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
            <div style={{ fontSize: '0.85rem', color: '#bbb' }}>Tools: {p.tools}</div>
          </motion.div>
        ))}
      </div>

      {/* === Skills + Quick Links === */}
      <StickySectionHeader label="Skills & Links" />
      <motion.div {...fadeUp(0)} style={{ ...cardStyle, marginBottom: '2rem' }}>
        <ul style={{ margin: 0, paddingLeft: '1rem', lineHeight: 1.6 }}>
          <li><b>Languages:</b> Python, JavaScript/TypeScript, C++, Java</li>
          <li><b>Frontend:</b> React, Angular, Redux, Tailwind, Vite</li>
          <li><b>Backend:</b> Node.js, Flask, Django, REST/OpenAPI</li>
          <li><b>Databases/Infra:</b> MySQL, MongoDB, PostgreSQL, GCP, Docker, GitHub Actions</li>
          <li><b>Testing:</b> Jest, React Testing Library, Postman</li>
        </ul>
        <div style={{ marginTop: '0.75rem' }}>
          <a href="https://www.linkedin.com/in/rajatsavdekar" target="_blank" rel="noreferrer" style={{ color: '#FFCC00', fontWeight: 600, textDecoration: 'none' }}>LinkedIn</a>
          <span style={{ opacity: 0.5, margin: '0 0.5rem' }}>•</span>
          <a href="https://github.com/RDX-Rajat-Savdekar" target="_blank" rel="noreferrer" style={{ color: '#FFCC00', fontWeight: 600, textDecoration: 'none' }}>GitHub</a>
        </div>
      </motion.div>

      <ContactMe />
    </div>
  );
}
