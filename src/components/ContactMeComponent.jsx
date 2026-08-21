import { site } from '../data/content';
import pdfUrl from '/Rajat_Resume.pdf?url';

const links = [
  { name: 'GitHub', href: site.links.github },
  { name: 'LinkedIn', href: site.links.linkedin },
  { name: 'Medium', href: site.links.medium },
  { name: 'Résumé', href: pdfUrl },
];

export default function ContactMe() {
  return (
    <footer className="site-footer">
      <p className="site-footer-availability">{site.availability}</p>
      <div className="site-footer-links">
        <a href={`mailto:${site.email}`} className="site-footer-email">
          {site.email}
        </a>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="site-footer-link"
          >
            {link.name} ↗
          </a>
        ))}
      </div>
    </footer>
  );
}
