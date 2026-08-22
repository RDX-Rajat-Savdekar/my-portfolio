import ArticleLayout from '../../components/ArticleLayout';

export default function StitchArticle({ layout = "article" }) {
  return (
    <ArticleLayout
      layout={layout}
      projectSlug="stitch"
      title="Stitch: Autonomous CI Repair for OpenAI Build Week"
      date="July 2026"
      tags={['TypeScript', 'React', 'Express', 'PostgreSQL', 'Codex']}
      description="The CI failure that fixes itself while you sleep: webhook in, diagnosis, validated patch, pull request out. Built for OpenAI Build Week 2026 Developer Tools track."
    >
      <section>
        <h2>The Problem</h2>
        <p>
          CI failures are noisy: logs are long, root causes are buried, and the fix requires repo
          context. For{' '}
          <a href="https://openai.devpost.com/" target="_blank" rel="noreferrer">
            OpenAI Build Week 2026
          </a>{' '}
          (Developer Tools track), we built <strong>Stitch</strong>: a webhook-triggered repair agent
          with a full product dashboard. When GitHub Actions fails, Stitch pulls job logs, diagnoses the
          root cause, generates a fix as a real unified diff, validates the patch, and opens a PR: or
          comments on an existing one, depending on branch policy.
        </p>
      </section>

      <section>
        <h2>Two AI Steps, On Purpose</h2>
        <p>
          Diagnosis is read-only analysis; fix generation writes code. Splitting them makes the pipeline
          testable, demo-friendly, and safer: each stage has its own prompt, schema, and retry
          boundary.
        </p>
        <ul>
          <li>
            <strong>Diagnosis</strong>: structured root-cause JSON from CI logs.
          </li>
          <li>
            <strong>Fix generation</strong>: minimal unified diff scoped to that diagnosis, validated
            before git touch.
          </li>
        </ul>
      </section>

      <section>
        <h2>Branch Router</h2>
        <p>Per-pattern trust so the agent behaves like a cautious teammate:</p>
        <ul>
          <li>
            <code>main</code>: Autopilot: opens fix PR
          </li>
          <li>
            <code>release/*</code>: Fix &amp; propose: opens PR, pending review
          </li>
          <li>
            <code>feature/*</code>: Diagnose &amp; suggest: comments on existing PR
          </li>
          <li>
            <code>dev</code>: Autopilot + auto-merge when allowed
          </li>
          <li>
            <code>hotfix/*</code>: Autopilot (urgent)
          </li>
        </ul>
      </section>

      <section>
        <h2>What Shipped</h2>
        <ul>
          <li>
            GitHub Actions webhook → full pipeline: clone, <code>git apply</code>, push branch, open/merge/revert
            PR
          </li>
          <li>
            React dashboard + SSE live feed: Fix Log, Issues, Audit Trail, Reports
          </li>
          <li>
            PostgreSQL multi-tenant backend (Prisma), RBAC, Slack + email notifications, Jira REST
            integration
          </li>
          <li>Multi-model AI settings: OpenAI, Anthropic, Gemini, Copilot mix per step</li>
          <li>25 Vitest tests; demo sandbox with seeded workspace (<code>demo@stitch.dev</code>)</li>
        </ul>
        <p>
          Team repo:{' '}
          <a
            href="https://github.com/Khushalsarode/openai-build-week-hackathon"
            target="_blank"
            rel="noreferrer"
          >
            openai-build-week-hackathon ↗
          </a>
          . My fork mirrors the submission codebase.
        </p>
      </section>

      <section>
        <h2>How Codex Was Used</h2>
        <p>
          Codex built the pipeline, GitHub plugin, branch router, dashboard, and multi-model AI layer.
          OpenAI at runtime handles diagnosis JSON and a separate call for the unified diff. Our
          architectural calls: split diagnosis/fix, branch-aware trust, Postgres multi-tenant, and a
          real failing CI test repo for judges.
        </p>
      </section>
    </ArticleLayout>
  );
}
