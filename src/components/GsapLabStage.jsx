import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

const F1_STATS = [
  { key: 'spd', label: 'SPD', from: 64, to: 312, pad: 3 },
  { key: 'gear', label: 'GEAR', from: 2, to: 8, pad: 1 },
  { key: 'delta', label: 'DELTA', from: 0.42, to: -0.184, pad: 0 },
];

function formatDelta(value) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(3)}`;
}

function F1Stage() {
  const root = useRef(null);

  useGSAP(
    () => {
      const stage = root.current;
      if (!stage) return;

      const mm = gsap.matchMedia();
      const path = stage.querySelector('.lab-track-path');
      const car = stage.querySelector('.lab-car');
      const fill = stage.querySelector('.lab-lap-fill');
      const sectors = stage.querySelectorAll('.lab-sector');
      const spd = stage.querySelector('[data-stat="spd"]');
      const gear = stage.querySelector('[data-stat="gear"]');
      const delta = stage.querySelector('[data-stat="delta"]');
      const plate = stage.querySelector('.lab-title-ink');
      const cyan = stage.querySelector('.lab-title-cyan');
      const magenta = stage.querySelector('.lab-title-magenta');

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(path, { drawSVG: '100%' });
        gsap.set(fill, { scaleX: 1 });
        gsap.set(sectors, { scaleX: 1 });
        gsap.set([cyan, magenta], { x: 0, autoAlpha: 0.35 });
        if (spd) spd.textContent = '312';
        if (gear) gear.textContent = '8';
        if (delta) delta.textContent = '-0.184';
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const stats = { spd: 64, gear: 2, delta: 0.42 };
        gsap.set(path, { drawSVG: 0 });
        gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(sectors, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(cyan, { x: -16, y: 3 });
        gsap.set(magenta, { x: 16, y: -3 });

        const writeStats = () => {
          if (spd) spd.textContent = String(Math.round(stats.spd)).padStart(3, '0');
          if (gear) gear.textContent = String(Math.round(stats.gear));
          if (delta) delta.textContent = formatDelta(stats.delta);
        };

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: writeStats,
          scrollTrigger: {
            trigger: stage,
            start: 'top 88px',
            end: '+=220%',
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        tl.to(cyan, { x: -0.8, y: 0, duration: 0.18 }, 0);
        tl.to(magenta, { x: 0.8, y: 0, duration: 0.18 }, 0);
        tl.from(
          plate,
          { yPercent: 110, duration: 0.18, ease: 'power3.out' },
          0,
        );
        tl.fromTo(path, { drawSVG: 0 }, { drawSVG: '100%', duration: 1 }, 0);
        tl.to(
          car,
          {
            duration: 1,
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
          },
          0,
        );
        tl.to(fill, { scaleX: 1, duration: 1 }, 0);
        tl.to(sectors[0], { scaleX: 1, duration: 0.22 }, 0.05);
        tl.to(sectors[1], { scaleX: 1, duration: 0.22 }, 0.28);
        tl.to(sectors[2], { scaleX: 1, duration: 0.22 }, 0.52);
        tl.to(sectors[3], { scaleX: 1, duration: 0.22 }, 0.76);
        tl.to(
          stats,
          {
            spd: 312,
            gear: 8,
            delta: -0.184,
            duration: 1,
          },
          0,
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="lab-stage lab-stage-f1" aria-label="Scroll-driven pole lap specimen">
      <p className="lab-kicker">Live specimen · scroll is the playhead</p>
      <div className="lab-title-stack">
        <span className="lab-title-plate lab-title-cyan" aria-hidden>
          POLE LAP
        </span>
        <span className="lab-title-plate lab-title-magenta" aria-hidden>
          POLE LAP
        </span>
        <span className="lab-title-clip">
          <span className="lab-title-ink">POLE LAP</span>
        </span>
      </div>

      <div className="lab-track-wrap">
        <svg className="lab-track-svg" viewBox="0 0 800 160" fill="none" aria-hidden>
          <path
            className="lab-track-guide"
            d="M36 118 C 150 28, 250 24, 390 78 S 620 150, 764 46"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <path
            className="lab-track-path"
            d="M36 118 C 150 28, 250 24, 390 78 S 620 150, 764 46"
            stroke="currentColor"
            strokeWidth="2.5"
          />
        </svg>
        <span className="lab-car" aria-hidden />
      </div>

      <dl className="lab-telemetry">
        {F1_STATS.map((stat) => (
          <div key={stat.key} className="lab-stat">
            <dt>{stat.label}</dt>
            <dd data-stat={stat.key}>{stat.key === 'delta' ? '+0.420' : String(stat.from).padStart(stat.pad, '0')}</dd>
          </div>
        ))}
      </dl>

      <div className="lab-lap">
        <span className="lab-lap-label">Lap 14</span>
        <span className="lab-lap-bar">
          <i className="lab-lap-fill" />
        </span>
      </div>

      <ol className="lab-sectors">
        {['S1 18.4', 'S2 22.1', 'S3 16.8', 'S4 19.0'].map((label) => (
          <li key={label} className="lab-sector">
            {label}
          </li>
        ))}
      </ol>
    </section>
  );
}

function IronStage() {
  const root = useRef(null);

  useGSAP(
    () => {
      const stage = root.current;
      if (!stage) return;
      const mm = gsap.matchMedia();
      const arcs = stage.querySelectorAll('.lab-hud-arc');
      const status = stage.querySelector('.lab-hud-status');
      const power = stage.querySelector('[data-stat="power"]');
      const alt = stage.querySelector('[data-stat="alt"]');
      const ticks = stage.querySelectorAll('.lab-hud-tick');
      const reticles = stage.querySelectorAll('.lab-hud-reticle');

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(arcs, { drawSVG: '100%' });
        gsap.set(ticks, { autoAlpha: 1 });
        if (status) status.textContent = 'SYSTEMS ALIGNED';
        if (power) power.textContent = '100';
        if (alt) alt.textContent = '4.2';
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const stats = { power: 12, alt: 0.4 };
        gsap.set(arcs, { drawSVG: 0 });
        gsap.set(ticks, { autoAlpha: 0, scale: 0.6 });

        const writeHud = () => {
          if (power) power.textContent = String(Math.round(stats.power)).padStart(3, '0');
          if (alt) alt.textContent = stats.alt.toFixed(1);
        };

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: writeHud,
          scrollTrigger: {
            trigger: stage,
            start: 'top 88px',
            end: '+=200%',
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          arcs,
          { drawSVG: 0 },
          { drawSVG: '100%', duration: 1, stagger: 0.08 },
          0,
        );
        tl.to(
          ticks,
          { autoAlpha: 1, scale: 1, stagger: 0.06, duration: 0.4 },
          0.12,
        );
        tl.fromTo(
          reticles,
          { rotation: -18, autoAlpha: 0.2, transformOrigin: '160px 160px' },
          { rotation: 0, autoAlpha: 1, duration: 1 },
          0,
        );
        tl.to(
          status,
          {
            duration: 0.55,
            scrambleText: {
              text: 'SYSTEMS ALIGNED',
              chars: 'upperCase',
              revealDelay: 0.12,
              speed: 0.55,
            },
          },
          0.2,
        );
        tl.to(
          stats,
          {
            power: 100,
            alt: 4.2,
            duration: 1,
          },
          0,
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="lab-stage lab-stage-iron" aria-label="Scroll-driven HUD specimen">
      <p className="lab-kicker">Live specimen · arcs, scramble, scrub</p>
      <p className="lab-hud-status">BOOT SEQUENCE</p>

      <div className="lab-hud">
        <svg className="lab-hud-svg" viewBox="0 0 320 320" fill="none" aria-hidden>
          <circle className="lab-hud-guide" cx="160" cy="160" r="138" />
          <circle className="lab-hud-guide" cx="160" cy="160" r="104" />
          <circle className="lab-hud-guide" cx="160" cy="160" r="68" />
          <g transform="rotate(-90 160 160)">
            <circle className="lab-hud-arc" cx="160" cy="160" r="138" stroke="currentColor" strokeWidth="2" />
            <circle className="lab-hud-arc lab-hud-arc-2" cx="160" cy="160" r="104" stroke="currentColor" strokeWidth="2" />
            <circle className="lab-hud-arc lab-hud-arc-3" cx="160" cy="160" r="68" stroke="currentColor" strokeWidth="2" />
          </g>
          <g className="lab-hud-reticle">
            <path d="M160 28 V 58" />
            <path d="M160 262 V 292" />
            <path d="M28 160 H 58" />
            <path d="M262 160 H 292" />
          </g>
        </svg>
        <div className="lab-hud-core">
          <span className="lab-hud-tick">PWR</span>
          <strong data-stat="power">012</strong>
          <span className="lab-hud-tick">%</span>
        </div>
      </div>

      <dl className="lab-telemetry lab-telemetry-iron">
        <div className="lab-stat">
          <dt>ALT</dt>
          <dd>
            <span data-stat="alt">0.4</span>
            <small>km</small>
          </dd>
        </div>
        <div className="lab-stat">
          <dt>LOCK</dt>
          <dd>HUD</dd>
        </div>
        <div className="lab-stat">
          <dt>STACK</dt>
          <dd>GSAP</dd>
        </div>
      </dl>
    </section>
  );
}

export default function GsapLabStage({ variant }) {
  return variant === 'iron-man' ? <IronStage /> : <F1Stage />;
}
