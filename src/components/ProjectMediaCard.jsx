import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import ProjectLinks from './ProjectLinks';
import { getFilterLabel, getProjectLook, lookMeta } from '../data/content';
import { tag } from '../styles/shared';
import { gsap, useGSAP } from '../lib/gsap';

const isVideoSrc = (src) => /\.(mp4|webm)$/i.test(src ?? '');

/** Repeating mix: large + two small beside it, then two medium, then flip. */
export function bentoSize(index) {
  const cycle = Math.floor(index / 5);
  const slot = index % 5;
  if (slot === 0) return cycle % 2 === 0 ? 'lg' : 'lg-alt';
  if (slot === 3 || slot === 4) return 'md';
  return 'sm';
}

export default function ProjectMediaCard({ project, index = 0, size = 'sm', showCategory = false }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const videoRef = useRef(null);
  const mediaRef = useRef(null);
  const titleRef = useRef(null);
  const hoverRef = useRef(false);
  const targetRef = useRef({ rx: 0, ry: 0 });
  const currentRef = useRef({ rx: 0, ry: 0 });
  const rafRef = useRef(0);
  const media = project.media ?? {};
  const hasHoverVideo = Boolean(media.hover) && !reduceMotion;
  const showVideo = hovered && hasHoverVideo && canHover;
  const previewSrc = media.preview || media.poster || null;
  const previewIsVideo = isVideoSrc(previewSrc) && !reduceMotion;
  const detailTo = project.projectPath || `/projects/${project.slug}`;
  const look = getProjectLook(project);
  const useTilt = canHover && !reduceMotion && look === 'globe';
  const roomy = size === 'lg' || size === 'lg-alt' || size === 'md';

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !hasHoverVideo) return;
    if (showVideo) {
      const play = el.play();
      if (play?.catch) play.catch(() => {});
    } else {
      el.pause();
    }
  }, [showVideo, hasHoverVideo]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  useGSAP(
    (context, contextSafe) => {
      const title = titleRef.current;
      if (!title || look !== 'overprint' || reduceMotion || !canHover) return;

      const cxTo = gsap.quickTo(title, '--cx', { duration: 0.4, ease: 'power3' });
      const mxTo = gsap.quickTo(title, '--mx', { duration: 0.4, ease: 'power3' });
      gsap.set(title, { '--cx': '-2px', '--mx': '2px' });

      const onMove = contextSafe((e) => {
        const box = title.getBoundingClientRect();
        const p = (e.clientX - box.left) / box.width - 0.5;
        cxTo(`${(-3 - p * 7).toFixed(2)}px`);
        mxTo(`${(3 + p * 7).toFixed(2)}px`);
      });
      const onLeave = contextSafe(() => {
        cxTo('-2px');
        mxTo('2px');
      });

      title.addEventListener('mousemove', onMove);
      title.addEventListener('mouseleave', onLeave);
      return () => {
        title.removeEventListener('mousemove', onMove);
        title.removeEventListener('mouseleave', onLeave);
      };
    },
    { dependencies: [look, reduceMotion, canHover] },
  );

  const tickTilt = () => {
    const el = mediaRef.current;
    const t = targetRef.current;
    const c = currentRef.current;
    c.rx += (t.rx - c.rx) * 0.16;
    c.ry += (t.ry - c.ry) * 0.16;
    const settled =
      Math.abs(c.rx - t.rx) < 0.04 &&
      Math.abs(c.ry - t.ry) < 0.04 &&
      Math.abs(c.rx) < 0.04 &&
      !hoverRef.current;
    if (el) {
      el.style.transform = settled
        ? ''
        : `perspective(920px) rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
    }
    if (settled) {
      rafRef.current = 0;
      return;
    }
    rafRef.current = requestAnimationFrame(tickTilt);
  };

  const startTilt = () => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tickTilt);
  };

  const onMove = (e) => {
    if (!useTilt || !mediaRef.current) return;
    const box = mediaRef.current.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * 100;
    const y = ((e.clientY - box.top) / box.height) * 100;
    const strength = size.startsWith('lg') ? 6 : 8;
    targetRef.current = {
      rx: ((y - 50) / 50) * -strength,
      ry: ((x - 50) / 50) * strength,
    };
    startTilt();
  };

  return (
    <article
      className={`project-card project-card-${size} look-${look}`}
      onMouseEnter={() => {
        setHovered(true);
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        setHovered(false);
        hoverRef.current = false;
        targetRef.current = { rx: 0, ry: 0 };
        startTilt();
      }}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
    >
      <div ref={mediaRef} className="project-card-media-wrap" onMouseMove={onMove}>
        {look === 'overprint' && (
          <span className="plate-marks" aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </span>
        )}
        <Link to={detailTo} className="project-card-media" aria-label={`${project.name} details`}>
          {look === 'catalog' && <span className="look-star" aria-hidden />}
          {look === 'globe' && <span className="reticle" aria-hidden />}
          {previewSrc &&
            (previewIsVideo ? (
              <video
                className="project-card-preview"
                src={previewSrc}
                poster={media.poster}
                style={{ opacity: showVideo ? 0 : 1 }}
                muted
                loop
                playsInline
                autoPlay
                preload={index < 6 ? 'auto' : 'metadata'}
              />
            ) : (
              <img
                src={previewSrc}
                alt=""
                className="project-card-preview"
                style={{ opacity: showVideo ? 0 : 1 }}
                loading={index < 6 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}
          {hasHoverVideo && media.hover !== previewSrc && (
            <video
              ref={videoRef}
              className="project-card-video"
              src={media.hover}
              muted
              loop
              playsInline
              preload="metadata"
              poster={media.poster || undefined}
              style={{ opacity: showVideo ? 1 : 0 }}
              aria-hidden={!showVideo}
            />
          )}
          {!previewSrc && !hasHoverVideo && (
            <div className="project-card-fallback" aria-hidden>
              <span>{project.name.slice(0, 1)}</span>
            </div>
          )}
        </Link>
      </div>

      <div className="project-card-body">
        {(showCategory && project.filter) || (project.badge && roomy) ? (
          <div className="project-card-meta">
            <span className={`look-mark is-${look}`}>{lookMeta[look].label}</span>
            {showCategory && project.filter && (
              <span className="project-category">{getFilterLabel(project.filter)}</span>
            )}
            {project.badge && roomy && <span className="project-badge">{project.badge}</span>}
          </div>
        ) : null}
        <div className="project-card-title-row">
          <Link to={detailTo}>
            <h3 ref={titleRef}>{project.name}</h3>
          </Link>
        </div>
        {roomy && <p className="project-card-tagline">{project.tagline}</p>}
        <ProjectLinks project={project} compact />
        {size.startsWith('lg') && (
          <div className="project-card-tags">
            {project.tags.slice(0, 4).map((t) => (
              <span key={t} style={tag}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
