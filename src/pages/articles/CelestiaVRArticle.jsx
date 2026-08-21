import ArticleLayout from '../../components/ArticleLayout';

export default function CelestiaVRArticle({ layout = "article" }) {
  return (
    <ArticleLayout
      layout={layout}
      projectSlug="celestia-vr"
      title="Architecting an Astronomically Accurate XR Sky Engine"
      date="June 2026"
      tags={['Unity', 'XR', 'Physics', 'Optimization']}
      description="How I built a high-performance celestial simulation for Meta Quest 3S using JPL telemetry and custom rotation models."
    >
      <section>
        <h2>The Context</h2>
        <p>
          CelestiaVR is an immersive stargazing experience for the Meta Quest 3S. Unlike typical skybox-based apps, I wanted to build a scientifically accurate simulation where the stars and planets were positioned using real-world astronomical data.
        </p>
      </section>

      <section>
        <h2>The Technical Challenge: Deterministic Sky Orientation</h2>
        <p>
          The primary challenge was ensuring that the sky dome rotated correctly over time (sidereal rate) without accumulating floating-point errors or encountering gimbal lock. In XR, even a 0.1-degree drift can be perceptible over a long session, breaking the immersion of an observatory.
        </p>
        <blockquote>
          "The intuitive solution—accumulating Euler angles—drifts significantly after just a few hours of runtime due to precision boundaries."
        </blockquote>
      </section>

      <section>
        <h2>Implementation & Trade-offs</h2>
        <h3>RaDec to Local Coordinate Mapping</h3>
        <p>
          I opted to store celestial data in Right Ascension (RA) and Declination (Dec) rather than pre-computed Vector3s. This allowed us to verify our data directly against JPL Horizons telemetry. I wrote a custom converter that transforms these spherical coordinates into Unity's Cartesian space once at startup.
        </p>
        <p>
          <code>O(N)</code> conversions at <code>Start()</code>, <code>O(1)</code> thereafter. We traded a negligible boot-time cost for a 33% reduction in asset storage and 100% human-readability of our data.
        </p>

        <h3>Quaternion Composition vs. Euler Angles</h3>
        <p>
          To rotate the dome, I used <code>transform.Rotate()</code> with <code>Space.World</code> around a pre-computed pole axis. This composes quaternions internally, which are numerically stable over indefinitely long runtimes.
        </p>
        <ul>
          <li><strong>Rejected:</strong> Space.Self rotation. This causes axis precession as the dome's local axes rotate with it.</li>
          <li><strong>Chosen:</strong> Space.World around a latitude-fixed pole axis. This mimics Earth's actual rotation physics.</li>
        </ul>
      </section>

      <section>
        <h2>Results & Performance SLA</h2>
        <p>
          The project won <strong>1st place at RealityShift</strong>, USC&apos;s XR Hackathon in Los
          Angeles — on a 5-person team where I owned the real-time sky rendering engine.
        </p>
        <p>
          Building for the Quest 3S meant hitting a strict <strong>72Hz frame budget</strong>. I implemented a 'lazy-enable' strategy for the telescope eyepiece camera, which reclaimed <strong>4-6ms of GPU time</strong> whenever the user wasn't actively looking through the lens.
        </p>
        <p>
          By moving all high-frequency calculations to <code>Awake()</code> and using <code>sqrMagnitude</code> for dead-zone checks, we achieved a consistent <code style={{ color: 'var(--accent)' }}>5.8ms GPU / 3.2ms CPU</code> frame time, well within the project's performance SLA.
        </p>
      </section>
    </ArticleLayout>
  );
}
