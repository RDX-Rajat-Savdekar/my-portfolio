import { motion } from 'framer-motion';

export default function ContactMe() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem 1rem', color: '#ccc' }}>
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', width: '60%', margin: '2rem auto' }} />
      <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        Have a question or want to collaborate?
      </p>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="mailto:rajatsavdekar@gmail.com"
        style={{
          display: 'inline-block',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          color: '#38bdf8',
          textDecoration: 'none',
          marginBottom: '0.8rem'
        }}
      >
        → Email me at rajatsavdekar@gmail.com
      </motion.a>

      <div style={{ marginTop: '1rem', fontSize: '0.95rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {[
          { name: 'GitHub', href: 'https://github.com/RDX-Rajat-Savdekar' },
          { name: 'LinkedIn', href: 'https://linkedin.com/in/rajatsavdekar' },
          { name: 'Resume', href: '/Rajat_Resume.pdf' }
        ].map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, color: '#38bdf8' }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: '#aaa',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.3s ease'
            }}
          >
            {link.name}
          </motion.a>
        ))}
      </div>
    </div>
  );
}