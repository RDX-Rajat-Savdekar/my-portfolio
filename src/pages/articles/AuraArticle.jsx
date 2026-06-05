import ArticleLayout from '../../components/ArticleLayout';

export default function AuraArticle() {
  return (
    <ArticleLayout
      title="Aura: Real-time Spatial HUDs on visionOS"
      date="October 2024"
      tags={['visionOS', 'Swift', 'SwiftUI', 'RealityKit', 'On-device ML']}
      description="Engineering a low-latency, privacy-first accessibility tool for Apple Vision Pro using CoreML and custom rendering pipelines."
    >
      <section>
        <h2>The Context</h2>
        <p>
          Aura is a visionOS application designed for the hearing-impaired. It provides real-time speech-to-text transcription and environmental sound classification (e.g., sirens, doorbells) directly in the user's spatial field of view.
        </p>
      </section>

      <section>
        <h2>The Technical Challenge: Rendering at 90Hz</h2>
        <p>
          The Apple Vision Pro updates its immersive spaces at 90Hz. The primary bottleneck was the <strong>SwiftUI-to-GPU-texture pipeline</strong>. Rendering a complex transcript HUD every frame was pinning the render thread, causing jitter in the spatial environment.
        </p>
        <blockquote>
          "Each refresh cycle involved a full SwiftUI layout pass, off-screen GPU rasterization, and a Metal texture upload. At 90 fps, this was unsustainable."
        </blockquote>
      </section>

      <section>
        <h2>Implementation & Trade-offs</h2>
        <h3>Two-Stage Debounce Pipeline</h3>
        <p>
          I decoupled the UI update frequency from the ML inference rate. While the on-device speech recognizer fires partial results at ~30Hz, I capped the texture regeneration at <strong>10Hz (100ms gate)</strong>.
        </p>
        <p>
          This resulted in a <strong>66% reduction in CPU load</strong> for the rasterization path without any perceptible loss in UX responsiveness.
        </p>

        <h3>Stable Billboarding via Gram-Schmidt</h3>
        <p>
          Standard RealityKit 'look-at' methods often produce "degenerate" results (NaN quaternions) when the user looks directly above or below a panel. I implemented an explicit Gram-Schmidt orthogonalization with a zero-vector guard. This guaranteed a stable HUD that never flickers or disappears, regardless of head orientation.
        </p>

        <h3>On-Device ML vs. Cloud Fallback</h3>
        <p>
          I made the architectural decision to enforce <strong>On-device ML only</strong>.
        </p>
        <ul>
          <li><strong>Rejected:</strong> Cloud ASR (Whisper/Google STT). This adds 200-500ms RTT and compromises user privacy.</li>
          <li><strong>Chosen:</strong> Pure SFSpeechRecognizer. Processing latency was reduced to ~50ms, and zero audio bytes ever leave the device.</li>
        </ul>
      </section>

      <section>
        <h2>Results</h2>
        <p>
          Aura won <strong>2nd Place at the USC Hackathon</strong>. By leveraging the Accelerate framework for vectorized audio math (SIMD), we achieved an 8x speedup in RMS calculations compared to a naive scalar loop, ensuring our audio tap callback never missed a buffer.
        </p>
      </section>
    </ArticleLayout>
  );
}
