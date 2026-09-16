import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import ProjectLinks from './ProjectLinks';
import { gsap, useGSAP } from '../lib/gsap';

const STILL = {
  headcount: '/projects/stitch/headcount-vouch/stills/headcount-incoming.png',
  vouch: '/projects/stitch/headcount-vouch/stills/vouch-incoming.jpg',
};

export default function HeadcountFeature({ project }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const media = project.media ?? {};
  const playVideo = hovered && Boolean(media.hover) && canHover && !reduceMotion;

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (playVideo) {
      const play = el.play();
      if (play?.catch) play.catch(() => {});
    } else {
      el.pause();
    }
  }, [playVideo]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.plate-marks i',
          { scale: 0 },
          { scale: 1, duration: 0.45, stagger: 0.06, ease: 'back.out(1.7)' },
        );
        gsap.fromTo(
          '.now-feature-split figure',
          { xPercent: (i) => (i === 0 ? -10 : 10), autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' },
        );
        gsap.fromTo(
          '.now-feature-copy > *',
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.6, delay: 0.12 },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <article
      ref={rootRef}
      className="now-feature look-overprint"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="plate-marks" aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </span>
      <Link
        to={project.projectPath}
        className="now-feature-media"
        aria-label="Headcount & Vouch details"
      >
        <div className="now-feature-split">
          <figure>
            <img src={STILL.headcount} alt="" />
            <figcaption>Headcount</figcaption>
          </figure>
          <figure>
            <img src={STILL.vouch} alt="" />
            <figcaption>Vouch</figcaption>
          </figure>
        </div>
        {media.hover && (
          <video
            ref={videoRef}
            className="now-feature-video"
            src={media.hover}
            poster={media.poster}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ opacity: playVideo ? 1 : 0 }}
            aria-hidden={!playVideo}
          />
        )}
        <span className="now-feature-hint">{playVideo ? 'Live call' : 'Hover for the call'}</span>
      </Link>

      <div className="now-feature-copy">
        <p className="now-feature-kicker">
          <span>Plate</span>
          {project.badge && <span className="project-badge">{project.badge}</span>}
        </p>
        <h2>
          <Link to={project.projectPath}>{project.name}</Link>
        </h2>
        <p className="now-feature-tagline">{project.tagline}</p>
        <p className="now-feature-body">{project.description}</p>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
