import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';

const logs = [
  {
    title: 'Portfolio Restructure - Simple & Focused',
    date: 'September 25, 2025',
    notes: [
      'Restructured entire portfolio to focus on 3 core pages: Resume, DevLogs, and Community Work',
      'Simplified the home page to be a clean landing with focused navigation',
      'Removed unnecessary complexity to create a more professional and streamlined experience'
    ],
    tags: ['React', 'Portfolio', 'UX Design'],
    status: 'completed'
  },
  {
    title: 'Learning React Performance Optimization',
    date: 'September 20, 2025',
    notes: [
      'Deep dive into React.memo and useMemo for preventing unnecessary re-renders',
      'Implemented code splitting with React.lazy for better initial load times',
      'Experimented with Vite bundle analysis to identify optimization opportunities'
    ],
    tags: ['React', 'Performance', 'Vite'],
    status: 'ongoing'
  },
  {
    title: 'Docker Containerization Journey',
    date: 'September 15, 2025',
    notes: [
      'Set up multi-stage Docker builds for a full-stack application',
      'Learned about Docker Compose for orchestrating multiple services',
      'Integrated Docker containers into CI/CD pipeline with GitHub Actions'
    ],
    tags: ['Docker', 'DevOps', 'CI/CD'],
    status: 'completed'
  },
  {
    title: 'Exploring TypeScript Integration',
    date: 'September 10, 2025',
    notes: [
      'Migrating existing JavaScript projects to TypeScript gradually',
      'Setting up strict type checking and custom type definitions',
      'Learning advanced TypeScript features like generics and utility types'
    ],
    tags: ['TypeScript', 'JavaScript', 'Refactoring'],
    status: 'ongoing'
  },
  {
    title: 'Building REST API with Node.js & Express',
    date: 'September 5, 2025',
    notes: [
      'Created RESTful API with proper error handling and validation',
      'Implemented JWT authentication and role-based access control',
      'Added comprehensive API documentation with Swagger/OpenAPI'
    ],
    tags: ['Node.js', 'Express', 'API Design', 'Authentication'],
    status: 'completed'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return '#10b981';
    case 'ongoing': return '#f59e0b';
    case 'planned': return '#6366f1';
    default: return '#6b7280';
  }
};

export default function DevLog() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #818cf8, #38bdf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Development Logs
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#ccc',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          A chronicle of my learning journey, technical experiments, and development insights. 
          Documenting the process, challenges, and discoveries along the way.
        </p>
      </motion.div>

      {/* Filter/Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            backgroundColor: '#10b981' 
          }} />
          <span style={{ fontSize: '0.9rem', color: '#ccc' }}>Completed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            backgroundColor: '#f59e0b' 
          }} />
          <span style={{ fontSize: '0.9rem', color: '#ccc' }}>Ongoing</span>
        </div>
      </motion.div>

      {/* Log Entries */}
      <div style={{ display: 'grid', gap: '2rem' }}>
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              position: 'relative'
            }}
          >
            {/* Status indicator */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(log.status)
              }} />
              <span style={{ 
                fontSize: '0.9rem', 
                color: '#aaa',
                textTransform: 'capitalize'
              }}>
                {log.status}
              </span>
            </div>

            {/* Date */}
            <div style={{
              fontSize: '0.9rem',
              color: '#818cf8',
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              {log.date}
            </div>

            {/* Title */}
            <h3 style={{ 
              marginBottom: '1rem',
              fontSize: '1.3rem',
              color: '#fff'
            }}>
              {log.title}
            </h3>

            {/* Notes */}
            <ul style={{ 
              paddingLeft: '1.2rem', 
              fontSize: '1rem',
              lineHeight: '1.7',
              marginBottom: '1.5rem'
            }}>
              {log.notes.map((note, j) => (
                <li key={j} style={{ 
                  marginBottom: '0.5rem',
                  color: '#ccc'
                }}>
                  {note}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {log.tags.map((tag, j) => (
                <span
                  key={j}
                  style={{
                    padding: '0.3rem 0.8rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#38bdf8',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    border: '1px solid rgba(56, 189, 248, 0.3)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Entry Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginTop: '3rem' }}
      >
        <div style={{
          padding: '1rem 2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'inline-block'
        }}>
          <p style={{ 
            margin: 0, 
            color: '#aaa',
            fontStyle: 'italic'
          }}>
            More entries coming soon as I continue learning and building...
          </p>
        </div>
      </motion.div>

      <ContactMe />
    </div>
  );
}
