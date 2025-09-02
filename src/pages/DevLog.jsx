import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';

const logs = [
  {
    title: 'Switched from Template to Custom Portfolio',
    date: 'June 14, 2025',
    notes: [
      'Dropped the old template-based portfolio site',
      'Set up React + Vite + GitHub Pages manually',
      'Created custom sections: Resume Timeline, Projects, Articles'
    ],
    link: 'https://github.com/yourusername/portfolio'
  },
  {
    title: 'Finished Resume Timeline Component',
    date: 'June 15, 2025',
    notes: [
      'Used react-vertical-timeline-component',
      'Created reusable macros in LaTeX and documented them as an article',
      'Added framer-motion and sticky headers for animated section flow'
    ],
    link: ''
  },
  {
    title: 'Launched Projects Page with Motion Cards',
    date: 'June 15, 2025',
    notes: [
      'Mapped 3 projects into animated card grid',
      'Added tags, links, and responsive layout',
      'Integrated design with rest of the site (glassmorphism)'
    ],
    link: 'https://github.com/yourusername/portfolio/commits'
  }
];

export default function DevLog() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>DevLog</h1>

      {logs.map((log, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(6px)',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            position: 'relative'
          }}
        >
          {/* Top-right date */}
          <div style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.5rem',
            fontSize: '1.1rem',
            color: '#aaa'
          }}>
            {log.date}
          </div>

          <h3 style={{ marginBottom: '0.6rem' }}>{log.title}</h3>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.95rem' }}>
            {log.notes.map((note, j) => (
              <li key={j} style={{ marginBottom: '0.4rem' }}>{note}</li>
            ))}
          </ul>

          {log.link && (
            <a
              href={log.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '0.8rem',
                color: '#00c3ffff',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              View Update ↗
            </a>
          )}
        </motion.div>
      ))}
            <ContactMe />

    </div>
  );
}
