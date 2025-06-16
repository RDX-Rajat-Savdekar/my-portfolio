// StickySectionHeader.jsx
import { motion } from 'framer-motion';

export default function StickySectionHeader({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'sticky',
        top: '64px',
        zIndex: 10,
        background: 'rgba(33, 33, 33, 0.4)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        padding: '0.5rem 1rem',
        marginBottom: '1rem',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.1)',
        width: 'fit-content',
        margin: '2rem auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      {label}
    </motion.div>
  );
}
