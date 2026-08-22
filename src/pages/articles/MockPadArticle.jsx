import ArticleLayout from '../../components/ArticleLayout';

export default function MockPadArticle({ layout = "article" }) {
  return (
    <ArticleLayout
      layout={layout}
      projectSlug="mockpad"
      title="Building MockPad: A Free Real-Time Interview Editor on Yjs"
      date="April 2026"
      tags={['React 19', 'Yjs', 'Node.js', 'Monaco', 'WebRTC']}
      description="A solo-built CoderPad alternative: one CRDT document per room, Excalidraw sync without echo loops, and a deliberate decision to cut in-app WebRTC."
    >
      <section>
        <h2>The Problem</h2>
        <p>
          Technical interview prep needs a shared editor, whiteboard, timer, and runnable code: but
          CoderPad-tier tools are paid. I built MockPad as a free, real-time collaborative room:
          interviewer + interviewee (+ optional viewers) in one browser session.
        </p>
      </section>

      <section>
        <h2>Architecture: One Y.Doc, No REST App State</h2>
        <p>
          Every collaborative field: Monaco buffer, language, run output, roles, timer, notes,
          interview type, whiteboard: lives in a single <code>Y.Doc</code> per room. Conflict
          resolution is free; there is no REST layer mirroring application state.
        </p>
        <ul>
          <li>
            <strong>Chosen:</strong> Yjs + y-websocket + LevelDB persistence on a Node{' '}
            <code>ws</code> server.
          </li>
          <li>
            <strong>Rejected:</strong> REST + polling/WebSockets for each resource: more glue,
            more race conditions.
          </li>
        </ul>
      </section>

      <section>
        <h2>Hardest Bug: Excalidraw ↔ Yjs Echo Loop</h2>
        <p>
          Excalidraw&apos;s <code>onChange</code> and Yjs&apos;s <code>observe</code> ping-ponged:
          a remote update triggered <code>updateScene</code> mid-stroke and reset the in-progress
          line. Fix: synchronous <code>isLocalRef</code> / <code>isRemoteRef</code> flags around
          writes: not <code>transaction.local</code>, which wasn&apos;t reliable enough here.
        </p>
        <p>
          Second bug: <code>JSON.stringify</code> flattened freedraw <code>pressures</code> from{' '}
          <code>Float32Array</code> to a plain array, collapsing strokes to dots. Restore typed
          arrays on ingest.
        </p>
      </section>

      <section>
        <h2>What I Deliberately Did Not Ship</h2>
        <p>
          I prototyped WebRTC audio with SDP/ICE over Yjs awareness (no separate signaling server)
          and dual-stream recording: then cut it. Rebuilding Zoom inside an interview editor
          wasn&apos;t the product; letting users bring Meet/Discord was the better tradeoff.
        </p>
      </section>

      <section>
        <h2>Server Hygiene</h2>
        <p>
          Rooms auto-delete after 30 minutes of inactivity or a 2-hour hard TTL, with an optional{' '}
          <code>POST /end-room</code> override. Timers store <code>timerStartedAt</code> + elapsed
          in Yjs so all clients agree without clock drift.
        </p>
      </section>
    </ArticleLayout>
  );
}
