import { getProjectLook } from '../data/content.js';

const VIDEO = /\.(mp4|webm)($|\?)/i;
const GIF = /\.gif($|\?)/i;

/** Idle clip while the pointer is away. Hover clip is the video, when one exists. */
export function projectPlayback(project) {
  const media = project?.media ?? {};
  const preview = media.preview || null;
  const poster = media.poster && !VIDEO.test(media.poster) ? media.poster : null;

  let idle = null;
  if (preview && GIF.test(preview)) idle = { kind: 'gif', src: preview };
  else if (preview && VIDEO.test(preview)) idle = { kind: 'video', src: preview };
  else if (preview) idle = { kind: 'image', src: preview };
  else if (poster) idle = { kind: 'image', src: poster };

  const hoverSrc = media.hover || null;
  const hover = hoverSrc && VIDEO.test(hoverSrc) ? { kind: 'video', src: hoverSrc } : null;

  return { idle, hover };
}

export function projectStill(project) {
  const media = project?.media ?? {};
  if (media.poster && !VIDEO.test(media.poster)) {
    return { kind: 'image', src: media.poster };
  }
  const preview = media.preview;
  if (!preview) return null;
  if (VIDEO.test(preview)) return { kind: 'video', src: preview };
  return { kind: 'image', src: preview };
}

function decorate(project, role) {
  return {
    slug: project.slug,
    name: project.name,
    role,
    featured: Boolean(project.featured),
    filter: project.filter,
    href: project.projectPath || `/projects/${project.slug}`,
    look: getProjectLook(project),
    still: projectStill(project),
    playback: projectPlayback(project),
  };
}

function stageIndex(items) {
  const spotlight = items.findIndex((project) => project.spotlight);
  if (spotlight >= 0) return spotlight;
  const featured = items.findIndex((project) => project.featured);
  if (featured >= 0) return featured;
  return 0;
}

/** One stage, then at most two wide featured cells, then the remaining tiles. */
export function layoutProjectShowcase(list) {
  const items = Array.isArray(list) ? list : [];
  if (!items.length) return { stage: null, cells: [] };

  const lead = stageIndex(items);
  const wide = [];
  const tiles = [];

  items.forEach((project, index) => {
    if (index === lead) return;
    if (project.featured && wide.length < 2) {
      wide.push(decorate(project, 'wide'));
      return;
    }
    tiles.push(decorate(project, 'tile'));
  });

  return { stage: decorate(items[lead], 'stage'), cells: [...wide, ...tiles] };
}
