import ArticleLayout from '../../components/ArticleLayout';

export default function CaliberateArticle({ layout = 'article' }) {
  return (
    <ArticleLayout
      layout={layout}
      projectSlug="caliberate"
      title="Caliberate: Calibrate the Judge Before You Trust the Number"
      date="August 2026"
      tags={['Python', 'FastAPI', 'Docker', 'PostgreSQL', 'LLM evals']}
      description="A sandboxed eval harness for LLM-generated patches: hidden tests as truth, an LLM-as-judge only after agreement against my labels, and a CI gate on a set I authored."
    >
      <section>
        <h2>Why this exists</h2>
        <p>
          Everyone can wrap SWE-bench. Almost nobody publishes agreement rates. Caliberate is the
          project I am building so that every number I quote about a model — pass rate, taste,
          cost, wall-clock — comes from a run table I can defend in a screen.
        </p>
        <p>
          The name is the thesis: <strong>calibrate</strong> the judge and the tasks before you
          trust any number. It is a portfolio harness with a published set, not a production eval
          platform.
        </p>
      </section>

      <section>
        <h2>What it is</h2>
        <p>
          Versioned tasks mined from real PRs, one Docker container per task (network off, CPU and
          memory caps, hard timeout), two-tier grading, then a CI gate on the golden set.
        </p>
        <ul>
          <li>
            <strong>Task store (Postgres):</strong> <code>repo@sha</code>, issue text, hidden tests,
            oracle patch. A task that changes is a new version, not an edit-in-place.
          </li>
          <li>
            <strong>Runner:</strong> workers claim jobs with <code>SKIP LOCKED</code>. Isolation,
            cleanup, retries, crash recovery, artifacts (stdout, patch, test log, tokens, $).
          </li>
          <li>
            <strong>Verifier:</strong> hidden tests pass or fail. Deterministic. This is the source
            of truth for &quot;solved.&quot;
          </li>
          <li>
            <strong>Judge:</strong> rubric for minimality, convention, bloat. Never pass/fail until
            I have measured agreement against my own labels (Cohen&apos;s kappa, confusion matrix).
          </li>
        </ul>
      </section>

      <section>
        <h2>Task calibration (stolen method, own set)</h2>
        <p>
          Senior SWE-Bench&apos;s rule, scaled down: for each task, run the oracle patch 3× and a
          no-op 3×. Reject if the oracle does not reliably pass or the empty diff ever passes.
          Publishing the rejection log is the point. &quot;We threw out leaky tests&quot; is a
          better bullet than a raw task count.
        </p>
        <p>
          Scope lock: 30–50 tasks, 3–5 real OSS repos, 3 pinned models. Harbor&apos;s on-disk task
          layout is the export format so other people can run the set later. Harbor and Inspect are
          not runtime dependencies.
        </p>
      </section>

      <section>
        <h2>What I am not building</h2>
        <ul>
          <li>A SWE-bench / Harbor / Inspect clone, or a 12-repo leaderboard against Opus.</li>
          <li>An uncalibrated LLM-as-judge as the solve bit.</li>
          <li>A React dashboard before one toy task passes by hand.</li>
          <li>
            Any latency, cost, kappa, or pass-rate number that is not in a logged run table. Those
            bullets get written after the harness exists.
          </li>
        </ul>
      </section>

      <section>
        <h2>Status</h2>
        <p>
          Public as of August 2026: the contract (
          <a href="https://github.com/RDX-Rajat-Savdekar/Caliberate" target="_blank" rel="noreferrer">
            github.com/RDX-Rajat-Savdekar/Caliberate
          </a>
          ) — problem, stack decisions, and an honesty file so later chats cannot inflate the
          project. Next: Docker runner, one toy task I can pass by hand, then task mining.
        </p>
      </section>
    </ArticleLayout>
  );
}
