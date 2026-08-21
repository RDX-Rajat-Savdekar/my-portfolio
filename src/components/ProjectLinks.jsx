import { Link } from 'react-router-dom';
import { getProjectLinks } from '../data/content';

/** Uniform, high-visibility action chips for every project. */
export default function ProjectLinks({ project, compact = false }) {
  const external = getProjectLinks(project);
  const chips = [];

  if (project.projectPath) {
    chips.push({
      key: 'page',
      label: compact ? 'Details' : 'Project page',
      to: project.projectPath,
      kind: 'primary',
    });
  }

  for (const link of external) {
    const l = link.label.toLowerCase();
    if (compact && (l.includes('pdf') || l.startsWith('pdf'))) continue;
    chips.push({
      key: link.url,
      label: link.label,
      href: link.url,
      kind: linkTone(link.label),
    });
  }

  if (!chips.length) return null;

  return (
    <div className={`project-links ${compact ? 'project-links-compact' : ''}`}>
      {chips.map((chip) =>
        chip.to ? (
          <Link key={chip.key} to={chip.to} className={`plink plink-${chip.kind}`}>
            {chip.label}
          </Link>
        ) : (
          <a
            key={chip.key}
            href={chip.href}
            target="_blank"
            rel="noreferrer"
            className={`plink plink-${chip.kind}`}
          >
            {chip.label}
            <span aria-hidden> ↗</span>
          </a>
        )
      )}
    </div>
  );
}

function linkTone(label) {
  const l = label.toLowerCase();
  if (l.includes('live') || l.includes('app') || l.includes('demo')) return 'live';
  if (l.includes('youtube') || l.includes('video') || l.includes('postmortem')) return 'media';
  if (l.includes('github') || l.includes('repo')) return 'code';
  if (l.includes('paper') || l.includes('scholar') || l.includes('pdf')) return 'paper';
  return 'default';
}
