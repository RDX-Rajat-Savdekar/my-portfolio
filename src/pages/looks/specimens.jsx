import { motion } from 'framer-motion';
import { CatalogSky, StarGlobe } from './canvases';
import { HV, SKY } from './media';

const words = ['Disaster', 'reach', 'is', 'a', 'denominator.'];

export function LookPaper() {
  return (
    <div className="spec spec-paper">
      <p className="spec-kicker">MS CS @ USC · Los Angeles</p>
      <h3>Rajat Savdekar</h3>
      <p className="spec-lede">
        Latest: Headcount & Vouch, two real outbound CALL-E calls. Currently Mediverse and
        Caliberate.
      </p>
      <div className="spec-paper-card">
        <img src={HV.poster} alt="" />
        <div>
          <span>Tools</span>
          <strong>Headcount & Vouch</strong>
          <em>Disaster reach is a denominator. Employment verify is a consent gate.</em>
        </div>
      </div>
    </div>
  );
}

export function LookTally() {
  return (
    <div className="spec spec-tally">
      <header className="tally-top">
        <span className="tally-rec">Rec</span>
        <span>CALL-E · two consoles</span>
        <span className="tally-clock">00:62 / 00:66</span>
      </header>
      <div className="tally-grid">
        <article>
          <p>Lane A · CASPER</p>
          <h3>Headcount</h3>
          <img src={HV.headcount} alt="" />
          <dl>
            <div>
              <dt>Dialed</dt>
              <dd>48</dd>
            </div>
            <div>
              <dt>Reached</dt>
              <dd>31</dd>
            </div>
            <div>
              <dt>Unaccounted</dt>
              <dd>17</dd>
            </div>
          </dl>
          <p className="tally-rule">Voicemail is not a reach.</p>
        </article>
        <article>
          <p>Lane B · SB 1162</p>
          <h3>Vouch</h3>
          <video src={HV.demo} poster={HV.vouch} muted loop playsInline autoPlay />
          <p className="tally-rule">No consent artifact, no dial. Salary never enters the script.</p>
        </article>
      </div>
    </div>
  );
}

export function LookOverprint() {
  return (
    <div className="spec spec-overprint">
      <div className="crop-marks" aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </div>
      <p className="print-sheet">Sheet 02 · Headcount / Vouch · 2026</p>
      <div className="overprint-name">
        <span>SAVDEKAR</span>
        <span>SAVDEKAR</span>
        <span>SAVDEKAR</span>
      </div>
      <div className="print-stack">
        <figure>
          <img src={HV.incall} alt="" />
          <figcaption>Cyan plate · Headcount in-call</figcaption>
        </figure>
        <figure>
          <img src={HV.vouch} alt="" />
          <figcaption>Magenta plate · Vouch incoming</figcaption>
        </figure>
      </div>
      <p className="print-footer">Register on hover. Two plates, one job: who got reached, who got paid fairly.</p>
    </div>
  );
}

export function LookCatalog() {
  return (
    <div className="spec spec-catalog">
      <CatalogSky />
      <div className="catalog-copy">
        <p>Named field, not decoration</p>
        <h3>The sky is a catalog</h3>
        <p>
          Celestia already treats stars as data. This look uses the same idea on the site: projects
          as named points, linked like a constellation, drifting on a sidereal clock.
        </p>
      </div>
    </div>
  );
}

export function LookReel() {
  return (
    <div className="spec spec-reel">
      <div className="film-edge" aria-hidden />
      <video className="reel-video" src={HV.demo} poster={HV.poster} muted loop playsInline autoPlay />
      <div className="reel-type">
        {words.map((word, i) => (
          <motion.span
            key={word}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        ))}
        <motion.strong
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.6 }}
        >
          Headcount & Vouch
        </motion.strong>
      </div>
      <div className="film-edge film-edge-right" aria-hidden />
    </div>
  );
}

export function LookGlobe() {
  return (
    <div className="spec spec-globe">
      <div className="globe-stage">
        <StarGlobe />
      </div>
      <div className="globe-readout">
        <p>Instrument</p>
        <h3>Spatial, then type</h3>
        <p>
          A projected star globe — no Three.js yet. If this is the one, we swap the canvas for React
          Three Fiber and let Celestia / Aura / Mediverse share a real spatial layer.
        </p>
        <video src={SKY} muted loop playsInline autoPlay />
      </div>
    </div>
  );
}

export const SPECIMENS = {
  paper: LookPaper,
  tally: LookTally,
  overprint: LookOverprint,
  catalog: LookCatalog,
  reel: LookReel,
  globe: LookGlobe,
};
