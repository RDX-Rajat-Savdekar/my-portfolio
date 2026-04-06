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
      <p style={{ fontSize: '0.875rem', color: '#71717a', marginBottom: '1rem' }}>
        Open to full-time SWE roles. On OPT.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
        <a
          href="mailto:rajatsavdekar@gmail.com"
          style={{
            fontSize: '0.875rem',
            color: '#f59e0b',
            fontWeight: 500,
            transition: 'color 0.15s',
            marginRight: '1.5rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#fbbf24')}
          onMouseLeave={(e) => (e.target.style.color = '#f59e0b')}
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
              color: '#71717a',
              marginRight: '1.5rem',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#fafafa')}
            onMouseLeave={(e) => (e.target.style.color = '#71717a')}
          >
            {link.name} ↗
          </a>
        ))}
      </div>
    </footer>
  );
}
