import { Link, useLocation } from 'react-router-dom';
import { site } from './data/content';
import pdfUrl from '/Rajat_Resume.pdf?url';

export default function NavBar() {
  const location = useLocation();
  const navItems = [
    { name: 'Work', path: '/work' },
    { name: 'Writing', path: '/writing' },
    { name: 'Community', path: '/community' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: site.links.github },
    { name: 'LinkedIn', href: site.links.linkedin },
    { name: 'Resume', href: pdfUrl },
  ];

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <Link to="/" className="site-nav-brand">
          {site.domain}
        </Link>

        <div className="site-nav-links">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === '/writing' && location.pathname.startsWith('/writing'));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={isActive ? 'site-nav-link active' : 'site-nav-link'}
              >
                {item.name}
              </Link>
            );
          })}
          <span className="site-nav-divider" aria-hidden="true" />
          {socialLinks.map((link) => (
            <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className="site-nav-link">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
