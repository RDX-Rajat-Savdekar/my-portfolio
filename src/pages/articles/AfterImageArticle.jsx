import ArticleLayout from '../../components/ArticleLayout';

export default function AfterImageArticle() {
  return (
    <ArticleLayout
      title="Engineering a Deterministic Ghost Replay System"
      date="June 2026"
      tags={['Unity', 'C#', 'Game Engine', 'Memory Management']}
      description="Optimizing memory and physics for a Unity 2D game. Solving GC pressure and frame spikes through architectural pivots."
    >
      <section>
        <h2>The Context</h2>
        <p>
          AfterImage is a precision platformer where the player's past actions are replayed as a 'ghost'. This required a highly accurate, deterministic replay engine that could run alongside active gameplay without impacting performance.
        </p>
      </section>

      <section>
        <h2>The Technical Challenge: GC Spikes & List Resizing</h2>
        <p>
          During playtesting, I noticed consistent frame hitches every ~60 seconds. Using the Unity Profiler, I traced the issue to <code>List&lt;Vector2&gt;</code> resizing in the Ghost Replay system. As the list reached its capacity, .NET would allocate a new backing array and copy thousands of entries, triggering a Gen 0 GC promotion.
        </p>
        <blockquote>
          "In a 60 fps game loop, these mid-frame GC stalls manifest as 1-3ms spikes—enough to cause a 'stutter' that ruins a precision platformer."
        </blockquote>
      </section>

      <section>
        <h2>Implementation & Trade-offs</h2>
        <h3>Kinematic Replay vs. Physics Simulation</h3>
        <p>
          I had to decide how to 're-run' the player's history.
        </p>
        <ul>
          <li><strong>Rejected:</strong> Re-simulating physics with cloned inputs. This is notoriously non-deterministic across platforms due to floating-point divergence in physics engines.</li>
          <li><strong>Chosen:</strong> Keyframe Position Replay. I sampled world positions at 50Hz (aligned with <code>FixedUpdate</code>) and directly set the <code>transform.position</code>. This is O(1) per-frame and 100% deterministic.</li>
        </ul>

        <h3>Memory Optimization: Write-Behind Buffering</h3>
        <p>
          To protect the gameplay SLA, I moved all non-critical I/O (like analytics and persistence) to a write-behind buffer.
        </p>
        <p>
          Instead of sending network requests mid-level, which could add 200ms of latency, I batched all telemetry into memory and submitted it once on <code>OnApplicationQuit</code>. This eliminated mid-session network stalls entirely.
        </p>
      </section>

      <section>
        <h2>Results</h2>
        <p>
          By aligning the render and physics cadences (capping at 60fps) and implementing explicit memory clearing on scene loads, we reduced GPU power draw by ~30% and eliminated all mid-session GC spikes.
        </p>
        <p>
          The final system recorded ~3,000 samples for a 60-second run (approx. 24KB), providing a smooth, frame-perfect ghost that felt identical to the player's original movements.
        </p>
      </section>
    </ArticleLayout>
  );
}
