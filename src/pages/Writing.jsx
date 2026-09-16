import { useRef } from 'react';
import ContactMe from '../components/ContactMeComponent';
import { site, externalArticles } from '../data/content';
import { page, tag } from '../styles/shared';
import { gsap, useGSAP } from '../lib/gsap';

export default function Writing() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.writing-intro > *',
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.55 },
        );
        gsap.fromTo(
          '.writing-row',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.5, delay: 0.12 },
        );
      });
    },
    { scope: root },
  );

  return (
    <main ref={root} style={page}>
      <div className="writing-intro" style={{ marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: 'var(--fg)',
            marginBottom: '0.75rem',
          }}
        >
          Writing
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '36rem' }}>
          Notes on process and tools. Project writeups live on each project page.
        </p>
      </div>

      <section style={{ marginBottom: '3.5rem' }}>
        <a href={site.links.medium} target="_blank" rel="noreferrer" className="plink plink-live">
          Follow on Medium ↗
        </a>
      </section>

      <section>
        <p className="home-eyebrow" style={{ marginBottom: '1rem' }}>
          On Medium
        </p>
        <div>
          {externalArticles.map((article) => (
            <a
              key={article.link}
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="writing-row"
              style={{ display: 'block', padding: '1.25rem 0', borderBottom: '1px solid var(--border)' }}
            >
              <span className="writing-date" style={{ display: 'block', marginBottom: '0.4rem' }}>
                {article.date}
              </span>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.4rem' }}>
                {article.title} ↗
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                {article.summary}
              </p>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {article.tags.map((t) => (
                  <span key={t} style={tag}>
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <ContactMe />
    </main>
  );
}
