import { useRef } from 'react';
import ContactMe from '../components/ContactMeComponent';
import { communityEvents } from '../data/content';
import { pageWide, sectionLabel } from '../styles/shared';
import { gsap, useGSAP } from '../lib/gsap';

function MediaTile({ event, file, idx }) {
  const isVideo = file.endsWith('.mp4');
  const src = `/community/${event.folder}/${file}`;

  return (
    <div className="community-tile">
      {isVideo ? (
        <video src={src} controls />
      ) : (
        <img src={src} alt={`${event.title} ${idx + 1}`} loading="lazy" />
      )}
    </div>
  );
}

function EventGallery({ event, files }) {
  return (
    <div className="community-grid">
      {files.map((file, idx) => (
        <MediaTile key={file} event={event} file={file} idx={idx} />
      ))}
    </div>
  );
}

export default function Community() {
  const root = useRef(null);
  const featured = communityEvents.filter((event) => event.featured);
  const rest = communityEvents.filter((event) => !event.featured);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.community-intro > *',
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.55 },
      );
      gsap.fromTo(
        '.community-roles li',
        { autoAlpha: 0, x: -10 },
        { autoAlpha: 1, x: 0, stagger: 0.05, duration: 0.45, delay: 0.1 },
      );
    },
    { scope: root },
  );

  return (
    <main ref={root} style={pageWide} className="community-page">
      <div className="community-intro">
        <h1 className="work-title">Community</h1>
        <p className="work-lede">
          Volunteering, mentoring, and organizing in the Los Angeles tech community.
        </p>
      </div>

      <section className="home-section">
        <span style={sectionLabel}>What I ran</span>
        <ul className="community-roles">
          {communityEvents.map((event) => (
            <li key={event.title}>
              <span className="community-role">{event.role}</span>
              <span className="community-role-event">{event.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section">
        <span style={sectionLabel}>Featured</span>
        <div className="community-featured">
          {featured.map((event) => (
            <article key={event.title} className="community-feature">
              <p className="community-role">{event.role}</p>
              <h2>{event.title}</h2>
              <p className="community-caption">{event.caption}</p>
              <EventGallery event={event} files={event.files.slice(0, 3)} />
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <span style={sectionLabel}>More photos</span>
        {rest.map((event) => (
          <article key={event.title} className="community-more">
            <p className="community-role">{event.role}</p>
            <h2>{event.title}</h2>
            <p className="community-caption">{event.caption}</p>
            <EventGallery event={event} files={event.files} />
          </article>
        ))}
        {featured
          .filter((event) => event.files.length > 3)
          .map((event) => (
            <article key={`${event.title}-more`} className="community-more">
              <p className="community-role">{event.role}</p>
              <h2>{event.title}</h2>
              <EventGallery event={event} files={event.files.slice(3)} />
            </article>
          ))}
      </section>

      <ContactMe />
    </main>
  );
}
