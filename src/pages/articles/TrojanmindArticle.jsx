import ArticleLayout from '../../components/ArticleLayout';

export default function TrojanmindArticle() {
  return (
    <ArticleLayout
      projectSlug="trojanmind"
      title="TrojanMind: Calendar-Aware Mental Health Copilot"
      date="2025"
      tags={['React', 'Node.js', 'Claude API', 'SSE', 'Mental Health']}
      description="Paste a Google Calendar or Brightspace iCal feed — get urgency scoring, burnout risk, a 7-day plan anchored to real events, and crisis-mode safety routing."
    >
      <section>
        <h2>The Problem</h2>
        <p>
          USC students juggle classes, deadlines, and burnout — but generic wellness apps ignore
          their actual schedule. TrojanMind (Anthropic hackathon) treats the calendar as ground truth:
          paste an iCal link and the app builds a personalized week around events that already exist,
          not invented tasks.
        </p>
      </section>

      <section>
        <h2>3-Stage Claude Pipeline</h2>
        <p>
          Every AI step runs on <code>claude-haiku-4-5-20251001</code>:
        </p>
        <ul>
          <li>
            <strong>Event classifier</strong> — urgency score, cognitive load, and deadline clusters
            per calendar event.
          </li>
          <li>
            <strong>Risk assessor</strong> — burnout level; triggers crisis mode when stress is
            critical.
          </li>
          <li>
            <strong>Plan generator</strong> — 7-day action plan referencing only real event titles
            from the feed.
          </li>
        </ul>
        <p>
          A streaming narrative (SSE) walks the student through the week. Dual-persona chat keeps
          academic-advisor and wellness-companion context from the analysis.
        </p>
      </section>

      <section>
        <h2>Crisis Mode</h2>
        <p>
          When stress score ≥ 9 or burnout hits critical, the product switches modes entirely: no
          study plan, immediate USC crisis resources and relief actions. A micro-classifier runs in
          parallel on every chat message and can intercept with a full-screen modal if distress is
          detected.
        </p>
      </section>

      <section>
        <h2>Stack</h2>
        <p>
          React frontend, Node.js / Express backend, Anthropic Claude API, Server-Sent Events for
          streaming, and <code>node-ical</code> + <code>rrule</code> for calendar parsing.
        </p>
      </section>
    </ArticleLayout>
  );
}
