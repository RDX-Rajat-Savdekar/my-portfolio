export const page = {
  maxWidth: '720px',
  margin: '0 auto',
  padding: '3.5rem 1.5rem 4rem',
};

/** Wider canvas for media-forward pages (Home / Work). */
export const pageWide = {
  maxWidth: '1120px',
  margin: '0 auto',
  padding: '3.5rem 1.5rem 4rem',
  position: 'relative',
};

export const sectionLabel = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.68rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  paddingBottom: '0.6rem',
  marginBottom: '1.5rem',
  borderBottom: '2px solid var(--rule)',
};

export const tag = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.66rem',
  color: 'var(--muted)',
  border: '1px solid var(--border)',
  borderRadius: '3px',
  padding: '1px 6px',
};

export const easeOut = [0.22, 1, 0.36, 1];

export const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: easeOut },
});

export const linkMuted = {
  fontSize: '0.8125rem',
  color: 'var(--muted)',
  transition: 'color 0.15s',
};
