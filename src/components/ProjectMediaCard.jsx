import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import ProjectLinks from './ProjectLinks';
import { tag } from '../styles/shared';

const isVideoSrc = (src) => /\.(mp4|webm)$/i.test(src ?? '');

/**
 * Idle: looping GIF or muted video. Hover/focus: swap to the richer clip.
 */
export default function ProjectMediaCard({ project, index = 0 }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const videoRef = useRef(null);
  const media = project.media ?? {};
  const hasHoverVideo = Boolean(media.hover) && !reduceMotion;
  const showVideo = hovered && hasHoverVideo && canHover;
  const previewSrc = media.preview || media.poster || null;
  const previewIsVideo = isVideoSrc(previewSrc) && !reduceMotion;
  const detailTo = project.projectPath || `/projects/${project.slug}`;

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
      el.currentTime = 0;
      const play = el.play();
      if (play?.catch) play.catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [showVideo, hasHoverVideo]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
    >
      <Link to={detailTo} className="project-card-media" aria-label={`${project.name} details`}>
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
              preload={index < 4 ? 'auto' : 'metadata'}
            />
          ) : (
            <img
              src={previewSrc}
              alt=""
              className="project-card-preview"
              style={{ opacity: showVideo ? 0 : 1 }}
              loading={index < 4 ? 'eager' : 'lazy'}
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
        {canHover && hasHoverVideo && media.hover !== previewSrc && !showVideo && (
          <span className="project-card-hint">Hover for video</span>
        )}
      </Link>

      <div className="project-card-body">
        <div className="project-card-title-row">
          <Link to={detailTo}>
            <h3>{project.name}</h3>
          </Link>
          {project.badge && <span className="project-badge">{project.badge}</span>}
        </div>
        <p className="project-card-tagline">{project.tagline}</p>
        <ProjectLinks project={project} compact />
        <div className="project-card-tags">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} style={tag}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
