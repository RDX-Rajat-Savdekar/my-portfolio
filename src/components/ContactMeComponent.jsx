import { site } from '../data/content';
import pdfUrl from '/Rajat_Resume.pdf?url';

const links = [
  { name: 'GitHub', href: site.links.github },
  { name: 'LinkedIn', href: site.links.linkedin },
  { name: 'Resume', href: pdfUrl },
];

export default function ContactMe() {
  return (
    <footer
      style={{
        marginTop: '5rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border)',
      }}
    >
      <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1rem' }}>
        {site.availability}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
        <a
          href={`mailto:${site.email}`}
          style={{
            fontSize: '0.875rem',
            color: 'var(--accent)',
            fontWeight: 500,
            marginRight: '1.5rem',
          }}
        >
          {site.email}
        </a>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '0.875rem',
              color: 'var(--muted)',
              marginRight: '1.5rem',
            }}
          >
            {link.name} ↗
          </a>
        ))}
      </div>
    </footer>
  );
}
