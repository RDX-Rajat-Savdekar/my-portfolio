import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactMe from '../components/ContactMeComponent';

export default function Home() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Rajat Savdekar
        </h1>
        <p style={{ 
          fontSize: '1.3rem', 
          color: '#ccc',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Software Developer & Community Builder
        </p>
        <p style={{ 
          fontSize: '1rem', 
          color: '#aaa',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          Passionate about creating meaningful software solutions and contributing to the tech community. 
          I build applications, share knowledge through development logs, and actively support local community initiatives.
        </p>
      </motion.div>


      {/* Navigation Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}
      >
        {[
          { 
            label: 'Resume', 
            path: '/resume', 
            desc: 'My professional experience, skills, and technical background',
            icon: '📄',
            color: '#38bdf8'
          },
          { 
            label: 'DevLogs', 
            path: '/log', 
            desc: 'Development insights, learning notes, and technical explorations',
            icon: '💻',
            color: '#818cf8'
          },
          { 
            label: 'Articles', 
            path: '/articles', 
            desc: 'Insights and tutorials on various tech topics learnt from my journey',
            icon: '📝',
            color: '#10b981'
          },
          { 
            label: 'Community', 
            path: '/community', 
            desc: 'Local community involvement and volunteer contributions',
            icon: '🌟',
            color: '#10b981'
          },
        ].map(({ label, path, desc, icon, color }) => (
          <Link key={path} to={path} style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '2.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                textAlign: 'left',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
              <h2 style={{ 
                color: color, 
                marginBottom: '1rem',
                fontSize: '1.5rem',
                fontWeight: '600'
              }}>
                {label}
              </h2>
              <p style={{ 
                fontSize: '1rem', 
                color: '#bbb', 
                lineHeight: '1.6' 
              }}>
                {desc}
              </p>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <ContactMe />
    </div>
  );
}