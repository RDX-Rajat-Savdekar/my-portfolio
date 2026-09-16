import { StarGlobe } from '../pages/looks/canvases';

export default function RegisterHero({ children }) {
  return (
    <section className="home-hero register-hero">
      <div className="hero-copy">{children}</div>
      <div className="hero-globe" aria-hidden>
        <StarGlobe className="hero-globe-canvas" inked={false} />
      </div>
    </section>
  );
}

export function ModeLegend() {
  return (
    <ul className="mode-legend">
      <li className="is-overprint">
        <b>Plate</b>
        <span>printed proof</span>
      </li>
      <li className="is-catalog">
        <b>Field</b>
        <span>named catalog</span>
      </li>
      <li className="is-globe">
        <b>Sphere</b>
        <span>spatial instrument</span>
      </li>
    </ul>
  );
}

export function LookMarks({ ids }) {
  if (!ids?.length) return null;
  return (
    <span className="look-marks">
      {ids.map((id) => (
        <span key={id} className={`look-mark is-${id}`}>
          {id === 'overprint' ? 'Plate' : id === 'catalog' ? 'Field' : 'Sphere'}
        </span>
      ))}
    </span>
  );
}
