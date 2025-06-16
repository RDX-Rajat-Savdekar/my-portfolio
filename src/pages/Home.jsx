import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactMe from '../components/ContactMeComponent';

export default function Home() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Hey, I'm Rajat Savdekar
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
          Software developer, learner, and storyteller — building technical things that make an impact.
        </p>
      </motion.div>

      {/* Quick Access Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}
      >
        {[
          { label: 'Projects', path: '/projects', desc: 'What I’ve built recently' },
          { label: 'Resume', path: '/resume', desc: 'Technical timeline & experiences' },
          { label: 'DevLog', path: '/log', desc: 'Personal notes and site updates' },
          { label: 'Articles', path: '/articles', desc: 'Writings on DSA, systems, LaTeX' },
          { label: 'Community', path: '/community', desc: 'Where I’ve volunteered or helped out' },
        ].map(({ label, path, desc }, i) => (
          <motion.div
            key={path}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(6px)',
              textAlign: 'left',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            }}
          >
            <Link to={path} style={{ textDecoration: 'none', color: '#38bdf8' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>{label}</h2>
              <p style={{ fontSize: '0.9rem', color: '#bbb' }}>{desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
            <ContactMe />

    </div>

    
  );
}