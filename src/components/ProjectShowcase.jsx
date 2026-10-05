import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFilterLabel } from '../data/content';
import { layoutProjectShowcase } from '../lib/projectShowcase';

function matchesFilter(project, filter) {
  if (filter === 'all') return true;
  if (filter === 'featured') return Boolean(project.featured);
  return project.filter === filter;
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return reduce;
}

function play(node) {
  if (!node) return;
  const start = () => {
    const pending = node.play();
    if (pending?.catch) pending.catch(() => {});
  };
  const begin = () => {
    if (node.currentTime > 0.05) {
      node.addEventListener('seeked', start, { once: true });
      node.currentTime = 0;
      return;
    }
    start();
  };
  if (node.readyState >= 2) begin();
  else node.addEventListener('loadeddata', begin, { once: true });
}

function ProjectClip({ playback, hot }) {
  const idleRef = useRef(null);
  const hoverRef = useRef(null);
  const reduce = useReducedMotion();
  const { idle, hover } = playback ?? {};

  useEffect(() => {
    const idleNode = idleRef.current;
    const hoverNode = hoverRef.current;
    if (reduce) {
      idleNode?.pause();
      hoverNode?.pause();
      return;
    }
    if (hot && hoverNode) {
      idleNode?.pause();
      play(hoverNode);
      return;
    }
    if (hoverNode) {
      hoverNode.pause();
      if (hoverNode.readyState >= 1) hoverNode.currentTime = 0;
    }
    play(idleNode);
  }, [hot, reduce, idle, hover]);

  if (!idle && !hover) return <span className="project-still-empty" aria-hidden />;

  return (
    <span className="project-clip">
      {idle?.kind === 'video' ? (
        <video
          ref={idleRef}
          className="project-clip-idle"
          src={idle.src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      ) : idle ? (
        <img className="project-clip-idle" src={idle.src} alt="" />
      ) : null}
      {hover ? (
        <video
          ref={hoverRef}
          className="project-clip-hover"
          src={hover.src}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : null}
    </span>
  );
}

function useHot() {
  const [hot, setHot] = useState(false);
  return {
    hot,
    bind: {
      onMouseEnter: () => setHot(true),
      onMouseLeave: () => setHot(false),
      onFocus: () => setHot(true),
      onBlur: () => setHot(false),
    },
  };
}

export default function ProjectShowcase({ projects, filter = 'all' }) {
  const visible = useMemo(
    () => projects.filter((project) => matchesFilter(project, filter)),
    [projects, filter],
  );
  const layout = useMemo(() => layoutProjectShowcase(visible), [visible]);
  const stageHot = useHot();

  if (!layout.stage) return null;

  const { stage } = layout;
  const stageHasMedia = Boolean(stage.playback?.idle || stage.playback?.hover);

  return (
    <div className="project-showcase">
      <Link
        to={stage.href}
        className={
          stageHasMedia
            ? `project-stage look-${stage.look}${stageHot.hot ? ' is-hot' : ''}`
            : `project-stage look-${stage.look} is-text`
        }
        data-role="stage"
        data-slug={stage.slug}
        aria-label={stage.name}
        {...stageHot.bind}
      >
        {stageHasMedia && (
          <span className="project-stage-media">
            <ProjectClip playback={stage.playback} hot={stageHot.hot} />
          </span>
        )}
        <span className="project-stage-copy">
          <span className="project-stage-kicker">{getFilterLabel(stage.filter)}</span>
          <h2 className="project-stage-title">{stage.name}</h2>
        </span>
      </Link>

      <div className="project-board">
        {layout.cells.map((cell) => (
          <BoardCell key={cell.slug} cell={cell} />
        ))}
      </div>
    </div>
  );
}

function BoardCell({ cell }) {
  const { hot, bind } = useHot();

  return (
    <Link
      to={cell.href}
      className={`${cell.role === 'wide' ? 'project-board-cell is-wide' : 'project-board-cell'}${hot ? ' is-hot' : ''}`}
      data-role={cell.role}
      data-slug={cell.slug}
      aria-label={cell.name}
      {...bind}
    >
      <ProjectClip playback={cell.playback} hot={hot} />
      <span className="project-board-badge">{getFilterLabel(cell.filter)}</span>
      <span className="project-board-name">{cell.name}</span>
    </Link>
  );
}
