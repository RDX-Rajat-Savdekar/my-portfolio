export const page = {
  maxWidth: '672px',
  margin: '0 auto',
  padding: '6rem 1.5rem 4rem',
};

export const sectionLabel = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '1.5rem',
};

export const tag = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.68rem',
  color: 'var(--muted)',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  padding: '1px 6px',
};

export const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

export const linkMuted = {
  fontSize: '0.8125rem',
  color: 'var(--muted)',
  transition: 'color 0.15s',
};
