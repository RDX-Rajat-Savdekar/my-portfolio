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

  const contactLinks = [
    { name: 'GitHub', href: site.links.github },
    { name: 'LinkedIn', href: site.links.linkedin },
    { name: 'Medium', href: site.links.medium },
    { name: 'Résumé', href: pdfUrl },
  ];

  return (
    <header className="site-header">
      <div className="contact-strip">
        <div className="contact-strip-inner">
          <span className="contact-strip-label">Contact</span>
          <a href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {contactLinks.map((link) => (
            <a key={link.name} href={link.href} target="_blank" rel="noreferrer">
              {link.name}
            </a>
          ))}
          <span className="contact-strip-spacer">{site.location}</span>
        </div>
      </div>

      <nav className="site-nav">
        <div className="site-nav-inner">
          <Link to="/" className="site-nav-brand">
            {site.name}
          </Link>

          <div className="site-nav-links">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === '/writing' && location.pathname.startsWith('/writing')) ||
                (item.path === '/work' && location.pathname.startsWith('/projects'));
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
          </div>
        </div>
      </nav>
    </header>
  );
}
