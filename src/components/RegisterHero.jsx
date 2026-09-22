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
