import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';

const projects = [
  {
    title: 'DSA Visualizer Series',
    type: 'Personal Project',
    date: 'May–Jun 2025',
    description: [
      'Produced 10+ animated videos on DSA concepts',
      'Covered recursion, sliding window, two-pointer',
      'Focused on visual storytelling to teach algorithms'
    ],
    tools: ['Manim', 'Python', 'YouTube'],
    link: 'https://youtube.com/yourprojectlink'
  },
  {
    title: 'Full Stack Weather Tracker',
    type: 'Academic Project',
    date: 'Aug–Dec 2024',
    description: [
      'Developed real-time weather app with location autocomplete',
      'Cross-platform deployment: web & iOS',
      'Used REST APIs and forecast visualization charts'
    ],
    tools: ['Angular', 'Node.js', 'SwiftUI', 'GCP'],
    link: ''
  },
  {
    title: 'Medical Transcript Analysis',
    type: 'Capstone Project',
    date: 'Aug 2022–Aug 2023',
    description: [
      'Built real-time ML pipeline to classify diseases from transcripts',
      'Used TF-IDF + Transformer Models, reached 92%+ accuracy',
      'Supported voice input for live analysis'
    ],
    tools: ['NLP', 'scikit-learn', 'Flask', 'Google Speech API'],
    link: 'https://github.com/yourprojectrepo'
  },
  {
  title: 'Unity Games with USC',
  type: 'Volunteer Assistance',
  date: 'Jan–May 2025',
  description: [
    'Assisted with design and development of Unity-based educational games',
    'Integrated 3D assets and interactions for gameplay mechanics',
    'Collaborated with faculty and student teams to refine user experience'
  ],
  tools: ['Unity', 'C#', '3D Assets', 'Game Design'],
  link: '' // Add a GitHub or Itch.io link here if available
}

];

export default function Projects() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Projects</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
      }}>
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(6px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{proj.title}</h3>
              <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{proj.date}</span>
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '0.5rem', color: '#aaa' }}>{proj.type}</p>
            <ul style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
              {proj.description.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
            <div style={{ fontSize: '0.85rem', color: '#bbb' }}>
              Tools: {proj.tools.join(' · ')}
            </div>
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  color: '#00c3ffff',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                View Project ↗
              </a>
            )}
          </motion.div>
        ))}
      </div>
      <ContactMe />

    </div>
    
  );
}
