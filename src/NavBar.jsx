import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NavBar() {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume', path: '/resume' },
    { name: 'DevLog', path: '/log' },
    { name: 'Articles', path: '/articles' },
    { name: 'Community', path: '/community' },
    { name: 'Contact Me', path: '/contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem 2rem',
        backgroundColor: 'rgba(18, 18, 18, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            position: 'relative',
            padding: '0.5rem 1rem',
            color: location.pathname === item.path ? '#38bdf8' : '#fff',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'color 0.2s ease-in-out',
          }}
        >
          {item.name}
          {/* Underline on hover */}
          <span
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              height: '2px',
              width: '100%',
              backgroundColor: '#38bdf8',
              transform: location.pathname === item.path ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.3s ease',
            }}
          />
        </Link>
      ))}
    </motion.nav>
  );
}
