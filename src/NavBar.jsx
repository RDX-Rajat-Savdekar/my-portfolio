import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  const navItems = [
    { name: 'Work', path: '/work' },
    { name: 'Writing', path: '/writing' },
    { name: 'Community', path: '/community' },
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
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            color: '#71717a',
            letterSpacing: '0.025em',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#fafafa')}
          onMouseLeave={(e) => (e.target.style.color = '#71717a')}
        >
          rajatsavdekar.dev
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? '#f59e0b' : '#a1a1aa',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => { if (!isActive) e.target.style.color = '#fafafa'; }}
                onMouseLeave={(e) => { if (!isActive) e.target.style.color = '#a1a1aa'; }}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
