import pdfUrl from '/Rajat_Resume.pdf?url';

const links = [
  { name: 'GitHub', href: 'https://github.com/RDX-Rajat-Savdekar' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/rajatsavdekar' },
  { name: 'Resume', href: pdfUrl },
];

export default function ContactMe() {
  return (
    <footer
      style={{
        marginTop: '5rem',
        paddingTop: '2rem',
        borderTop: '1px solid #27272a',
      }}
    >
      <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1rem' }}>
        Available for full-time software engineering roles starting Summer 2026.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
        <a
          href="mailto:rajatsavdekar@gmail.com"
          style={{
            fontSize: '0.875rem',
            color: 'var(--accent)',
            fontWeight: 500,
            transition: 'opacity 0.15s',
            marginRight: '1.5rem',
          }}
          onMouseEnter={(e) => (e.target.style.opacity = '0.7')}
          onMouseLeave={(e) => (e.target.style.opacity = '1')}
        >
          rajatsavdekar@gmail.com
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
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--fg)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
          >
            {link.name} ↗
          </a>
        ))}
      </div>
    </footer>
  );
}
