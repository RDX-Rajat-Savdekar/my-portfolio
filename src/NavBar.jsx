import { Link, useLocation } from 'react-router-dom';
import pdfUrl from '/Rajat_Resume.pdf?url';

export default function NavBar() {
  const location = useLocation();
  const navItems = [
    { name: 'Work', path: '/work' },
    { name: 'Writing', path: '/writing' },
    { name: 'Community', path: '/community' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/RDX-Rajat-Savdekar' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/rajatsavdekar' },
    { name: 'Resume', href: pdfUrl },
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid #27272a',
        backgroundColor: 'rgba(9, 9, 11, 0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          maxWidth: '672px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: '0.8rem',
            color: 'var(--muted)',
            letterSpacing: '0.025em',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--fg)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
        >
          rajatsavdekar.dev
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderRight: '1px solid var(--border)', paddingRight: '1.25rem' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--fg)' : 'var(--muted)',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.target.style.color = 'var(--fg)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.target.style.color = 'var(--muted)'; }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--muted)',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

