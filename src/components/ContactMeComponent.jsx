import { motion } from 'framer-motion';
import pdfUrl from '/Rajat_Resume.pdf?url'; // ✅ Vite-safe import for resume

export default function ContactMe() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem 1rem', color: '#ddd' }}>
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          width: '60%',
          margin: '2rem auto'
        }}
      />
      <p style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
        Have a question or want to collaborate?
      </p>

      {/* Email button */}
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="mailto:rajatsavdekar@gmail.com"
        style={{
          display: 'inline-block',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          color: '#00c3ffff', //
          textDecoration: 'none',
          marginBottom: '1rem',
          transition: 'color 0.3s ease'
        }}
      >
        → Email me at rajatsavdekar@gmail.com
      </motion.a>

      {/* Social / Quick Links */}
      <div
        style={{
          marginTop: '1rem',
          fontSize: '0.95rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}
      >
        {[
          { name: 'GitHub', href: 'https://github.com/RDX-Rajat-Savdekar' },
          { name: 'LinkedIn', href: 'https://linkedin.com/in/rajatsavdekar' },
          { name: 'Resume', href: pdfUrl }
        ].map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: '#FFCC00',   // USC Gold for consistency
              textDecoration: 'none',
              fontWeight: 600,
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
