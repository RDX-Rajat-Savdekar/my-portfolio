import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFilterLabel, getProjectLook, lookMeta } from '../data/content';
import { gsap } from '../lib/gsap';

const isVideoSrc = (src) => /\.(mp4|webm)$/i.test(src ?? '');

const HEX_DIRS = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

const MIN_SCALE = 0.3;

function hexCells(count) {
  const cells = [{ q: 0, r: 0 }];
  if (count <= 1) return cells.slice(0, Math.max(count, 0));
  for (let ring = 1; cells.length < count; ring += 1) {
    let q = HEX_DIRS[4][0] * ring;
    let r = HEX_DIRS[4][1] * ring;
    for (let d = 0; d < 6; d += 1) {
      for (let step = 0; step < ring && cells.length < count; step += 1) {
        cells.push({ q, r });
        q += HEX_DIRS[d][0];
        r += HEX_DIRS[d][1];
      }
    }
  }
  return cells;
}

function axialToPixel(q, r, step) {
  return {
    x: step * (q + r / 2),
    y: step * ((Math.sqrt(3) / 2) * r),
  };
}

function faceMetrics(faceSize) {
  const radius = Math.max(faceSize, 240) / 2;
  const size = Math.round(gsap.utils.clamp(76, 132, radius * 0.4));
  const gutter = Math.max(10, Math.round(size * 0.16));
  const step = size + gutter;
  return {
    radius,
    size,
    gutter,
    step,
    inner: step * 0.88,
    outer: radius * 0.86,
  };
}

function packLayout(count, faceSize) {
  const metrics = faceMetrics(faceSize);
  return hexCells(Math.max(count, 0))
    .slice(0, count)
    .map(({ q, r }) => {
      const p = axialToPixel(q, r, metrics.step);
      return { x: p.x, y: p.y, ...metrics };
    });
}

function clusterExtent(slots) {
  let max = 0;
  slots.forEach((slot) => {
    max = Math.max(max, Math.hypot(slot.x, slot.y));
  });
  return max;
}

/**
 * Circular Apple Watch falloff (Blake Sanie regions + compact gutters).
 * Scale only shrinks from 1, then icons translate inward by half the lost
 * diameter so neighbors keep a constant gutter instead of overlapping.
 */
function projectOrb(x, y, metrics, reduce) {
  if (reduce) return { x, y, scale: 1 };

  const dist = Math.hypot(x, y);
  if (dist < 0.001) return { x: 0, y: 0, scale: 1 };

  let scale = MIN_SCALE;
  if (dist <= metrics.inner) {
    scale = 1;
  } else if (dist < metrics.outer) {
    const t = (dist - metrics.inner) / (metrics.outer - metrics.inner);
    const fall = 0.5 + 0.5 * Math.cos(Math.PI * t);
    scale = MIN_SCALE + (1 - MIN_SCALE) * fall;
  }

  const compact = (metrics.size * (1 - scale)) / 2;
  const extra = dist > metrics.outer ? Math.min((dist - metrics.outer) * 0.42, metrics.step) : 0;
  const pulled = Math.max(0, dist - compact - extra);

  return {
    x: (x / dist) * pulled,
    y: (y / dist) * pulled,
    scale,
  };
}

function matchesFilter(project, filter) {
  if (filter === 'all') return true;
  if (filter === 'featured') return Boolean(project.featured);
  return project.filter === filter;
}

function mediaSrc(project) {
  const media = project.media ?? {};
  return media.preview || media.poster || null;
}

function monogram(name) {
  const cleaned = name.replace(/^GSAP Lab:\s*/i, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function ProjectWatchGrid({ projects, filter = 'all' }) {
  const faceRef = useRef(null);
  const activeSlugRef = useRef(null);
  const slotsRef = useRef(new Map());
  const placedRef = useRef(false);
  const [faceSize, setFaceSize] = useState(560);
  const [active, setActive] = useState(projects[0] ?? null);

  const visible = useMemo(
    () => projects.filter((project) => matchesFilter(project, filter)),
    [projects, filter],
  );

  const metrics = useMemo(() => faceMetrics(faceSize), [faceSize]);

  const slots = useMemo(() => {
    const packed = packLayout(visible.length, faceSize);
    const map = new Map();
    visible.forEach((project, i) => {
      map.set(project.slug, packed[i] ?? { x: 0, y: 0, ...metrics });
    });
    return map;
  }, [visible, faceSize, metrics]);

  slotsRef.current = slots;

  useEffect(() => {
    const next = visible[0] ?? null;
    activeSlugRef.current = next?.slug ?? null;
    setActive(next);
  }, [visible]);

  useEffect(() => {
    const face = faceRef.current;
    if (!face) return undefined;
    const measure = () => {
      const box = face.getBoundingClientRect();
      setFaceSize(Math.max(240, Math.round(box.width)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(face);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const face = faceRef.current;
    if (!face) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hoverDur = reduce ? 0 : 0.22;
    const nodes = gsap.utils.toArray('[data-slug]', face);
    const movers = nodes.map((el) => {
      gsap.set(el, { xPercent: -50, yPercent: -50, transformOrigin: '50% 50%', force3D: true });
      return { el, slug: el.getAttribute('data-slug') };
    });

    const pan = { x: 0, y: 0 };
    const drag = { on: false, moved: false, lastX: 0, lastY: 0, pointerId: null };
    const pointer = { x: 0, y: 0, on: false, hit: null };

    const apply = (duration = hoverDur, ease = 'power3.out') => {
      const currentSlots = slotsRef.current;
      const m = faceMetrics(faceSize);
      const extent = clusterExtent(currentSlots);
      const maxPan = reduce
        ? 0
        : Math.min(m.radius * 0.58, Math.max(m.step * 0.2, extent * 0.9 + m.step * 0.15));

      pan.x = gsap.utils.clamp(-maxPan, maxPan, pan.x);
      pan.y = gsap.utils.clamp(-maxPan, maxPan, pan.y);

      let nearest = null;
      let nearestDist = Infinity;
      let hovered = null;
      let hoverDist = Infinity;

      movers.forEach((item) => {
        const slot = currentSlots.get(item.slug);
        if (!slot) {
          gsap.killTweensOf(item.el);
          gsap.set(item.el, { scale: 0.12, opacity: 0 });
          item.el.style.pointerEvents = 'none';
          item.el.style.zIndex = '1';
          item.el.classList.remove('is-live');
          return;
        }

        const projected = projectOrb(slot.x + pan.x, slot.y + pan.y, m, reduce);
        const dist = Math.hypot(projected.x, projected.y);
        const toPointer = pointer.on
          ? Math.hypot(projected.x - pointer.x, projected.y - pointer.y)
          : dist;

        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = item.slug;
        }
        if (toPointer < hoverDist) {
          hoverDist = toPointer;
          hovered = item.slug;
        }

        const vars = {
          x: projected.x,
          y: projected.y,
          scale: projected.scale,
          opacity: 1,
        };

        if (!placedRef.current || duration === 0) {
          gsap.set(item.el, vars);
        } else {
          gsap.to(item.el, { ...vars, duration, ease, overwrite: true });
        }

        item.el.style.pointerEvents = 'auto';
        item.el.style.zIndex = String(Math.round(projected.scale * 140));
        item.el.classList.toggle('is-live', item.slug === (hovered || nearest));
      });

      placedRef.current = true;

      const focused = pointer.hit || hovered || nearest;
      if (focused && focused !== activeSlugRef.current) {
        activeSlugRef.current = focused;
        const project = visible.find((p) => p.slug === focused);
        if (project) setActive(project);
      }
    };

    pan.x = 0;
    pan.y = 0;
    apply(0);

    const pointInFace = (clientX, clientY) => {
      const box = face.getBoundingClientRect();
      return {
        x: clientX - box.left - box.width / 2,
        y: clientY - box.top - box.height / 2,
      };
    };

    const trackPointer = (clientX, clientY) => {
      const p = pointInFace(clientX, clientY);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.on = true;
      const hit = document.elementFromPoint(clientX, clientY);
      pointer.hit = hit?.closest?.('[data-slug]')?.getAttribute('data-slug') ?? null;
      return p;
    };

    const followPointer = (clientX, clientY) => {
      if (reduce) return;
      gsap.killTweensOf(pan);
      const p = trackPointer(clientX, clientY);
      const currentSlots = slotsRef.current;
      const m = faceMetrics(faceSize);
      const extent = clusterExtent(currentSlots);
      const follow = 0.16 + 0.56 * Math.min(1, extent / (m.radius * 0.7));
      pan.x = -p.x * follow;
      pan.y = -p.y * follow;
      apply();
    };

    const onPointerDown = (event) => {
      if (reduce) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      drag.on = event.pointerType !== 'mouse';
      drag.moved = false;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.pointerId = event.pointerId;
      if (drag.on) {
        face.setPointerCapture(event.pointerId);
        face.classList.add('is-dragging');
        gsap.killTweensOf(pan);
      }
    };

    const onPointerMove = (event) => {
      if (reduce) return;
      if (drag.on) {
        const dx = event.clientX - drag.lastX;
        const dy = event.clientY - drag.lastY;
        if (Math.hypot(dx, dy) > 3) drag.moved = true;
        pan.x += dx;
        pan.y += dy;
        drag.lastX = event.clientX;
        drag.lastY = event.clientY;
        trackPointer(event.clientX, event.clientY);
        apply();
        return;
      }
      if (event.pointerType === 'mouse') followPointer(event.clientX, event.clientY);
    };

    const restPan = () => {
      drag.on = false;
      pointer.on = false;
      pointer.hit = null;
      face.classList.remove('is-dragging');
      if (reduce) return;
      gsap.to(pan, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: apply,
      });
    };

    const onPointerUp = (event) => {
      if (drag.pointerId !== event.pointerId) return;
      if (drag.on) restPan();
      drag.pointerId = null;
    };

    const onPointerLeave = () => {
      if (drag.on) return;
      restPan();
    };

    const onClickCapture = (event) => {
      if (!drag.moved) return;
      event.preventDefault();
      event.stopPropagation();
      drag.moved = false;
    };

    face.addEventListener('pointerdown', onPointerDown);
    face.addEventListener('pointermove', onPointerMove);
    face.addEventListener('pointerup', onPointerUp);
    face.addEventListener('pointercancel', onPointerUp);
    face.addEventListener('pointerleave', onPointerLeave);
    face.addEventListener('click', onClickCapture, true);

    return () => {
      face.removeEventListener('pointerdown', onPointerDown);
      face.removeEventListener('pointermove', onPointerMove);
      face.removeEventListener('pointerup', onPointerUp);
      face.removeEventListener('pointercancel', onPointerUp);
      face.removeEventListener('pointerleave', onPointerLeave);
      face.removeEventListener('click', onClickCapture, true);
      gsap.killTweensOf(pan);
      movers.forEach((item) => gsap.killTweensOf(item.el));
    };
  }, [visible, faceSize]);

  useEffect(() => {
    const face = faceRef.current;
    if (!face) return undefined;
    const videos = face.querySelectorAll('video[data-orb]');
    videos.forEach((node) => {
      if (node.getAttribute('data-orb') === active?.slug) {
        const play = node.play();
        if (play?.catch) play.catch(() => {});
      } else {
        node.pause();
      }
    });
    return undefined;
  }, [active]);

  const look = getProjectLook(active);
  const lookInfo = lookMeta[look];

  return (
    <div className="watch-plate">
      <span className="watch-crop tl" aria-hidden />
      <span className="watch-crop tr" aria-hidden />
      <span className="watch-crop bl" aria-hidden />
      <span className="watch-crop br" aria-hidden />

      <div ref={faceRef} className="watch-face" role="list">
        {visible.map((project) => {
          const src = mediaSrc(project);
          const video = isVideoSrc(src);
          const projectLook = getProjectLook(project);
          const href = project.projectPath || `/projects/${project.slug}`;
          return (
            <Link
              key={project.slug}
              to={href}
              role="listitem"
              data-slug={project.slug}
              className={`watch-orb look-${projectLook}${active?.slug === project.slug ? ' is-live' : ''}`}
              aria-label={project.name}
              aria-current={active?.slug === project.slug ? 'true' : undefined}
              style={{ width: metrics.size, height: metrics.size }}
              onPointerEnter={() => {
                activeSlugRef.current = project.slug;
                setActive(project);
              }}
              onFocus={() => {
                activeSlugRef.current = project.slug;
                setActive(project);
              }}
            >
              {src && video ? (
                <video
                  className="watch-orb-media"
                  src={src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  data-orb={project.slug}
                />
              ) : src ? (
                <img className="watch-orb-media" src={src} alt="" />
              ) : (
                <span className="watch-orb-mono">{monogram(project.name)}</span>
              )}
            </Link>
          );
        })}
        <div className="watch-vignette" aria-hidden />
      </div>

      <div className="watch-readout" aria-live="polite">
        {active ? (
          <>
            <p className="watch-readout-meta">
              <span className={`look-mark is-${look}`}>{lookInfo?.label}</span>
              <span>{getFilterLabel(active.filter)}</span>
            </p>
            <h3>{active.name}</h3>
            <p className="watch-readout-line">{active.tagline}</p>
          </>
        ) : (
          <p className="watch-readout-line">Move across the cluster. Click to open.</p>
        )}
      </div>
    </div>
  );
}
