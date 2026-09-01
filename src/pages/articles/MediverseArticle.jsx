import ArticleLayout from '../../components/ArticleLayout';

export default function MediverseArticle({ layout = 'article' }) {
  return (
    <ArticleLayout
      layout={layout}
      projectSlug="mediverse"
      title="Mediverse: Measuring Drill Cost in a Quest Surgical Trainer"
      date="August 2026"
      tags={['Unity', 'C#', 'OpenXR', 'Meta Quest', 'XR']}
      description="The grab script does not cut. A 2 cm trigger on the bit does. The Jungle scene was slow because of ~256 idle skeleton colliders, not the foot vertex loop."
    >
      <section>
        <h2>The product</h2>
        <p>
          Mediverse is a Meta Quest surgical-training sandbox at{' '}
          <a
            href="https://www.linkedin.com/company/easley-dunn-productions"
            target="_blank"
            rel="noreferrer"
          >
            Easley-Dunn Productions
          </a>{' '}
          (Scott Easley): grab tools in an OR or field tent, operate on a bunion-foot mesh (marker,
          scalpel, drill, bonesaw, chevron osteotomy), optional voice commands, session
          record/replay, AI narration.
        </p>
        <p>
          My role is systems and performance. The documented assignment here is{' '}
          <strong>drill performance</strong>, not the whole product. I did not own narration, the
          replay backend, or the other tools.
        </p>
      </section>

      <section>
        <h2>What drilling actually is</h2>
        <p>
          Grabbing the drill does nothing to bone. <code>MVRTool_Drill</code> is an empty grab
          shell. Cutting starts only when a tiny trigger on the bit, <code>CutVolume</code> (
          <code>DrillHoleMaker</code>, hole radius ≈ 0.02), overlaps a mesh that has{' '}
          <code>DrillNew</code>. No button is required. If the bit is not inside a bone,{' '}
          <code>OnTriggerStay</code> never runs.
        </p>
        <p>
          Anatomy that matters for surgery is the bunion foot (~22 bones). The play scene
          (Jungle) had also copied <code>DrillNew</code> plus non-convex MeshColliders onto a full
          human skeleton: on the order of <strong>255</strong> objects. That last part is the real
          cost: idle physics against hundreds of triangle meshes, every physics step, whether you
          are drilling or not.
        </p>
      </section>

      <section>
        <h2>Make the hot path cheaper, then measure</h2>
        <p>
          The per-frame loop was genuinely wasteful, so I fixed it first: local-space tests
          instead of a world-space vertex walk, lazy mesh clones on first actual drill, skip mesh
          upload if no verts moved, MeshCollider recooks throttled to 0.15 s. That is the right
          code for one bone being drilled. It does not fix 256 idle colliders.
        </p>
        <p>
          Then I built an isolated foot lab and a Play Mode harness that parks the bit in a named
          bone (<code>cuboid</code>, 2807 verts) for ~6 s and appends CSV p95. Manual grab in the
          XR Device Simulator was too noisy. First Jungle run cheated: the bunion foot was
          inactive, so the harness fell back to a 5178-vert skeleton mesh. After that, runs
          force-find <code>cuboid</code> including inactive objects.
        </p>
      </section>

      <section>
        <h2>The number that survived comparison</h2>
        <p>
          Same cuboid, editor + XR Device Simulator: lab ~0.8 ms p95, Jungle ~2.1 ms p95. About
          2.5×. A runtime pruner that disabled 253 skeleton colliders barely moved Jungle (1.75 →
          1.62 ms). That is not a resume win. The product fix is foot-only drill targets and
          CutTool physics layers, not an octree, and not &quot;delete the skeleton at runtime.&quot;
        </p>
      </section>

      <section>
        <h2>What I will not claim yet</h2>
        <ul>
          <li>
            Quest 72/90 Hz, &quot;2.5× on device,&quot; or a locked headset frame time. Every fps /
            ms number above is Unity editor, not a headset.
          </li>
          <li>
            AI-narration cost cuts, streamed replay storage, or CI catches. Those are the next
            systems on this role. They go on this page when they are measured.
          </li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
