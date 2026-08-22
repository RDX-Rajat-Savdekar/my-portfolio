import ArticleLayout from '../../components/ArticleLayout';

export default function CreatorLabArticle({ layout = "article" }) {
  return (
    <ArticleLayout
      layout={layout}
      projectSlug="creator-lab"
      title="RDX Dev Creator Lab: One Repo, Six Animation Engines"
      date="2026"
      tags={['Manim', 'Remotion', 'Godot', 'Motion Canvas', 'R3F']}
      description="An open-source playground for programmatic explainers: picking the right engine for math video, scroll sites, real-time sims, and embedded 3D."
    >
      <section>
        <h2>Why This Exists</h2>
        <p>
          I&apos;m building toward Sebastian Lague / 3Blue1Brown-style technical content. That
          requires different tools for different outputs: rendered math video, programmatic YouTube
          segments, real-time interactive sims, and embeddable 3D in articles. Rather than
          one-size-fits-all WebGL, this repo is a labeled lab: six engines, each with learning
          exercises and demo projects.
        </p>
      </section>

      <section>
        <h2>What&apos;s Inside</h2>
        <ul>
          <li>
            <strong>Manim CE</strong>: vector math / DSA visualizers (Python).
          </li>
          <li>
            <strong>Remotion</strong>: React-driven programmatic video (spring physics, templated
            intros).
          </li>
          <li>
            <strong>Godot + GDScript</strong>: lightweight real-time sims exportable to HTML5.
          </li>
          <li>
            <strong>Motion Canvas</strong>: generator-based, frame-accurate 2D explainers synced
            to voiceover.
          </li>
          <li>
            <strong>React Three Fiber</strong>: browser 3D at 60fps via <code>useFrame</code>{' '}
            ref mutation (not React state).
          </li>
          <li>
            <strong>React Flow</strong>: live architecture / system-design diagrams.
          </li>
        </ul>
        <p>
          Also includes production-ish showcases (Astro × GSAP × Three.js scroll sites) and Python
          tooling that parses Whisper transcripts to align FFmpeg cuts with VO markers.
        </p>
      </section>

      <section>
        <h2>Key Decision: Multi-Engine vs. One Canvas</h2>
        <p>
          <strong>Chosen:</strong> decouple by output target: don&apos;t force Unity or raw WebGL
          to be both a game engine and a blog widget factory.
        </p>
        <p>
          <strong>Rejected:</strong> a single monolithic canvas codebase: faster to learn each
          toolchain on its own terms, then harvest twice (article embed + YouTube segment).
        </p>
      </section>
    </ArticleLayout>
  );
}
