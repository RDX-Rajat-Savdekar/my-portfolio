import ArticleLayout from '../../components/ArticleLayout';

export default function AuraArticle({ layout = "article" }) {
  return (
    <ArticleLayout
      layout={layout}
      projectSlug="aura"
      title="Aura: Real-time Spatial HUDs on visionOS"
      date="October 2025"
      tags={['visionOS', 'Swift', 'SwiftUI', 'RealityKit', 'On-device ML']}
      description="How we built Aura: a visionOS accessibility prototype for Apple Vision Pro in a 24-hour hackathon at LA Tech Week / USC ISI. Live speech captions + environmental sound alerts, entirely on-device."
    >
      <section>
        <h2>System Design Postmortem (Video)</h2>
        <p>
          The full walkthrough: what we shipped, what we cut, and why: with Manim animations, Swift
          snippets, and hackathon B-roll. Outcome: <strong>2nd place</strong>, fully working prototype,
          zero external dependencies (no cloud ASR, no audio leaving the headset).
        </p>
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            marginBottom: '1.5rem',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/3KEH2BCODBo?start=24"
            title="How we built Aura: visionOS accessibility postmortem"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
          />
        </div>
        <p style={{ fontSize: '0.9375rem', color: 'var(--muted)' }}>
          More clips in the link bar above:{' '}
          <a href="https://www.youtube.com/watch?v=ZEGKj1Lh-io" target="_blank" rel="noreferrer">
            60-second demo
          </a>
          {' · '}
          <a href="https://www.youtube.com/watch?v=HbW9F2zjmLQ" target="_blank" rel="noreferrer">
            full hackathon demo
          </a>
          .
        </p>
        <h3>Chapters</h3>
        <ol>
          <li>0:00: The problem</li>
          <li>1:24: On-device only</li>
          <li>2:17: Build vs train</li>
          <li>3:25: One tap, dual pipeline</li>
          <li>4:28: Segmentation</li>
          <li>5:28: Texture HUD vs 90 Hz</li>
          <li>6:19: MainActor bridge</li>
          <li>6:55: Iron Man HUD</li>
          <li>8:03: Scale</li>
          <li>8:46: Outro</li>
        </ol>
      </section>

      <section>
        <h2>The Context</h2>
        <p>
          Aura is a visionOS application for the hearing-impaired. It provides real-time speech-to-text
          transcription and environmental sound classification (sirens, doorbells, etc.) directly in the
          user&apos;s spatial field of view: built in 24 hours at LA Tech Week / USC ISI.
        </p>
      </section>

      <section>
        <h2>The Technical Challenge: Rendering at 90Hz</h2>
        <p>
          The Apple Vision Pro updates its immersive spaces at 90Hz. The primary bottleneck was the{' '}
          <strong>SwiftUI-to-GPU-texture pipeline</strong>. Rendering a complex transcript HUD every frame
          was pinning the render thread, causing jitter in the spatial environment.
        </p>
        <blockquote>
          &ldquo;Each refresh cycle involved a full SwiftUI layout pass, off-screen GPU rasterization,
          and a Metal texture upload. At 90 fps, this was unsustainable.&rdquo;
        </blockquote>
      </section>

      <section>
        <h2>Implementation & Trade-offs</h2>
        <h3>Two-Stage Debounce Pipeline</h3>
        <p>
          I decoupled the UI update frequency from the ML inference rate. While the on-device speech
          recognizer fires partial results at ~30Hz, I capped the texture regeneration at{' '}
          <strong>10Hz (100ms gate)</strong>.
        </p>
        <p>
          This resulted in a <strong>66% reduction in CPU load</strong> for the rasterization path without
          any perceptible loss in UX responsiveness.
        </p>

        <h3>Stable Billboarding via Gram-Schmidt</h3>
        <p>
          Standard RealityKit &lsquo;look-at&rsquo; methods often produce degenerate results (NaN
          quaternions) when the user looks directly above or below a panel. I implemented an explicit
          Gram-Schmidt orthogonalization with a zero-vector guard: a stable HUD that never flickers,
          regardless of head orientation.
        </p>

        <h3>On-Device ML vs. Cloud Fallback</h3>
        <p>
          Architectural decision: <strong>on-device ML only</strong>.
        </p>
        <ul>
          <li>
            <strong>Rejected:</strong> Cloud ASR (Whisper/Google STT): 200–500ms RTT and privacy cost.
          </li>
          <li>
            <strong>Chosen:</strong> Pure <code>SFSpeechRecognizer</code>: ~50ms latency, zero audio
            bytes leave the device.
          </li>
        </ul>
      </section>

      <section>
        <h2>Results</h2>
        <p>
          Aura won <strong>2nd place at LA Tech Week / USC ISI</strong>. By leveraging Accelerate for
          vectorized audio math (SIMD), we achieved an 8× speedup in RMS calculations vs. a naive scalar
          loop, keeping the audio tap callback from missing buffers.
        </p>
      </section>
    </ArticleLayout>
  );
}
