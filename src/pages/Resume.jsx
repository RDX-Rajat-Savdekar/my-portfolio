// src/pages/Resume.jsx
import { motion } from 'framer-motion';
import StickySectionHeader from '../components/StickySectionHeader';
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

      {/* === Education === */}
      <StickySectionHeader label="Education" />
      <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
        <motion.div {...fadeUp(0)} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: 0 }}>Masters of Science in Computer Science</h3>
              <p style={{ margin: '0.25rem 0', color: '#aaa' }}>
                University of Southern California • Los Angeles, CA
              </p>
              <p style={{ margin: 0, color: '#bbb', fontSize: '0.95rem' }}>
                Relevant Coursework: Algorithms, Web Technology, Data Science/ML, Databases, Multimedia System • GPA: 3.6
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

      {/* === Work Experience === */}
      <StickySectionHeader label="Work Experience" />
      <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
        <motion.div {...fadeUp(0)} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>Teaching Assistant — USC Summer Programs</h3>
            <span style={{ fontSize: '0.9rem', color: '#ccc' }}>May 2025 – July 2025</span>
          </div>
          <p style={{ fontStyle: 'italic', margin: '0.5rem 0', color: '#aaa' }}>Los Angeles, CA</p>
          <ul style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
            <li>Led Arduino-based coding sessions for ∼160 students, improving programming logic and circuit design.</li>
            <li>Co-designed energy and electronics projects for over 100 participants, integrating coding with sustainability concepts.</li>
            <li>Mentored student teams in engineering challenges, fostering teamwork, iterative problem-solving, and confidence.</li>
            <li>Coordinated with 54 SoCalGas and USC staff volunteers to deliver seamless hands-on STEM workshops.</li>
          </ul>
        </motion.div>

        <motion.div {...fadeUp(1)} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>Software Engineer — Jalgaon Fruits Sales Cooperative</h3>
            <span style={{ fontSize: '0.9rem', color: '#ccc' }}>May 2023 – May 2024</span>
          </div>
          <p style={{ fontStyle: 'italic', margin: '0.5rem 0', color: '#aaa' }}>Jalgaon, India</p>
          <ul style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
            <li>Digitized procurement and inventory workflows, replacing manual logs with a web-based system for 150 daily users, reducing errors and enabling faster farmer payments.</li>
            <li>Refactored legacy PHP modules into Flask microservices, improving responsiveness, simplifying maintenance, and strengthening reliability of core workflows.</li>
            <li>Introduced Docker containerization and CI/CD pipelines (GitHub Actions) to stabilize deployments and accelerate release cycles by ∼30%, ensuring reliability during peak harvest periods.</li>
            <li>Built React + Flask dashboards with real-time analytics, providing data-driven insights that reduced spoilage and improved transparency for 150+ daily users.</li>
          </ul>
        </motion.div>
      </div>

      {/* === Projects === */}
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
            title: 'Resume Tailor (Free)',
            date: '',
            type: 'Next.js, React, Tailwind CSS, PDF.js, Vercel',
            bullets: [
              'Built an open-source tool that tailors resumes to job descriptions using keyword extraction and document comparison.',
              'Implemented PDF parsing with pdf.js and designed a responsive UI for side-by-side resume vs JD review.',
              'Deployed on Vercel with a modular React + Tailwind architecture for maintainability and fast iteration.',
            ],
            links: [{ label: 'GitHub', url: 'https://github.com/RDX-Rajat-Savdekar/resume-tailor-free' }],
          },
          {
            title: 'Retrieval-Augmented Generation System',
            date: '',
            type: 'Python, LLMs, Vector Search',
            bullets: [
              'Engineered a modular RAG pipeline integrating vector retrieval with LLMs for context-aware generation.',
              'Improved query precision through similarity search with relevance ranking, enhancing downstream response quality.',
            ],
            links: [{ label: 'GitHub', url: 'https://github.com/GurpreetKukkar15/rag-system' }],
          },
          {
            title: 'Multi-modal Search Engine Using CLIP',
            date: '',
            type: 'Python, PyTorch, OpenAI CLIP',
            bullets: [
              'Implemented a search engine leveraging joint text and image embeddings for natural language image retrieval.',
              'Evaluated system with precision@5 and recall metrics, refining cosine similarity thresholds for balanced relevance and diversity.',
            ],
            links: [{ label: 'GitHub', url: 'https://github.com/GurpreetKukkar15/Multi-modal-Search-Engine-Using-CLIP' }],
          },
          {
            title: 'Manim-DSA-SD-Concepts',
            date: '',
            type: 'Python, Manim',
            bullets: [
              'Designed and developed animated visualizations of core data structures, algorithms, and system design concepts, aiding conceptual clarity for learners.',
              'Engineered a modular rendering pipeline with caching and lazy loading, reducing build time by ∼30%.',
            ],
            links: [{ label: 'GitHub', url: 'https://github.com/RDX-Rajat-Savdekar/Manim-DSA-SD-Concepts' }],
          },
          {
            title: 'Typing Speed Web App',
            date: '',
            type: 'React, JavaScript',
            bullets: [
              'Built a responsive typing-test web app delivering real-time speed/accuracy feedback with adjustable difficulty modes.',
              'Optimized UI for cross-browser compatibility and mobile responsiveness, improving accessibility for 50+ test users.',
            ],
            links: [{ label: 'GitHub', url: 'https://github.com/RDX-Rajat-Savdekar/react-typing-mvp' }],
          },
          {
            title: 'Image Texture Analysis with GLCM',
            date: '',
            type: 'MATLAB, Image Processing [Publication]',
            bullets: [
              'Developed a GUI tool to compute texture features (contrast, entropy, homogeneity, correlation) from images.',
              'Cited in 10+ IEEE and Springer Nature papers, demonstrating research impact and academic relevance.',
            ],
            links: [{ label: 'Publication', url: 'https://ijnrd.org/viewpaperforall.php?paper=IJNRD2202021' }],
          },
        ].map((p, i) => (
          <motion.div key={i} {...fadeUp(i)} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ margin: 0, flex: 1 }}>{p.title}</h3>
              {p.date && <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{p.date}</span>}
            </div>
            <p style={{ fontStyle: 'italic', margin: '0.5rem 0', color: '#aaa' }}>{p.type}</p>
            <ul style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
              {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
            {p.links && (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {p.links.map((link, k) => (
                  <a
                    key={k}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'rgba(56, 189, 248, 0.1)',
                      color: '#38bdf8',
                      borderRadius: '20px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* === Skills === */}
      <StickySectionHeader label="Skills" />
      <motion.div {...fadeUp(0)} style={{ ...cardStyle, marginBottom: '2rem' }}>
        <ul style={{ margin: 0, paddingLeft: '1rem', lineHeight: 1.6 }}>
          <li><b>Languages:</b> Python, Java, JavaScript, C++, C#</li>
          <li><b>Databases:</b> MySQL, PostgreSQL, MongoDB, SQL, Vector</li>
          <li><b>Frontend:</b> React, Angular, HTML, CSS, Vite, Next.js</li>
          <li><b>Backend:</b> Node.js, Flask, OpenAPI, REST APIs, PDF.js</li>
          <li><b>ML / AI Tools:</b> PyTorch, OpenAI CLIP, Embeddings, Similarity Metrics, Multimodal Learning</li>
          <li><b>Cloud / DevOps:</b> AWS, Azure, Google Cloud Platform, Firebase, Vercel, Docker, GitHub Actions, CI/CD</li>
          <li><b>Performance & UX:</b> Animation / Visualization (Manim), Responsive Design, Cross-browser Compatibility</li>
          <li><b>Tools & Workflow:</b> Git, Figma, Jest, Postman, Swagger</li>
        </ul>
        <div style={{ marginTop: '0.75rem' }}>
          <a href="https://linkedin.com/in/rajatsavdekar" target="_blank" rel="noreferrer" style={{ color: '#FFCC00', fontWeight: 600, textDecoration: 'none' }}>LinkedIn</a>
          <span style={{ opacity: 0.5, margin: '0 0.5rem' }}>•</span>
          <a href="https://github.com/RDX-Rajat-Savdekar" target="_blank" rel="noreferrer" style={{ color: '#FFCC00', fontWeight: 600, textDecoration: 'none' }}>GitHub</a>
          <span style={{ opacity: 0.5, margin: '0 0.5rem' }}>•</span>
          <a href="https://rajatsavdekar.dev" target="_blank" rel="noreferrer" style={{ color: '#FFCC00', fontWeight: 600, textDecoration: 'none' }}>Portfolio</a>
        </div>
      </motion.div>

      <ContactMe />
    </div>
  );
}
