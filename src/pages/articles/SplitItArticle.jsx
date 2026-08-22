import ArticleLayout from '../../components/ArticleLayout';

export default function SplitItArticle({ layout = "article" }) {
  return (
    <ArticleLayout
      layout={layout}
      projectSlug="splitit"
      title="SplitIt: Full-Stack Expense Splitting on React + Express"
      date="2025"
      tags={['React 19', 'Express 5', 'MongoDB', 'JWT', 'Vite']}
      description="A Splitwise-style app I built end-to-end to learn full-stack: feature-sliced API layer, JWT auth, and client-side split validation over MongoDB."
    >
      <section>
        <h2>The Problem</h2>
        <p>
          I wanted a free alternative to paid expense-splitting apps and a concrete project to
          practice React + Node + MongoDB together. SplitIt covers friends, groups, shared
          expenses, balances, settle-up payments, and activity feeds.
        </p>
        <p>
          <strong>Honesty note:</strong> the live deployment uses demo/fake data: no real users
          yet. This is a learning portfolio piece, not a production product.
        </p>
      </section>

      <section>
        <h2>Frontend Shape</h2>
        <p>
          React 19 + Vite SPA with one axios service module per backend resource (auth, groups,
          expenses, friends, payments, users, activity). Components stay thin; API calls don&apos;t
          leak into JSX.
        </p>
        <ul>
          <li>
            <strong>Auth:</strong> zustand store hydrated from <code>localStorage</code>; JWT sent
            as <code>Authorization: Bearer</code> on each request.
          </li>
          <li>
            <strong>Routing:</strong> React Router v7 <code>PrivateRoute</code> wrapper with{' '}
            <code>Outlet</code> / <code>Navigate</code> gate.
          </li>
          <li>
            <strong>Dashboard load:</strong> <code>Promise.all</code> for friends, groups, and
            balances in parallel, then client-side balance↔name reconciliation.
          </li>
        </ul>
      </section>

      <section>
        <h2>Split Modes (Client Validates, Server Computes)</h2>
        <p>
          The expense modal supports equal, unequal, and percentage splits. Live{' '}
          <code>useEffect</code> recomputes remaining balance; submit is blocked unless shares sum
          to the total (or 100%). The actual debt/net-balance math runs server-side in Express +
          Mongoose: the client validates and forwards.
        </p>
      </section>

      <section>
        <h2>Tradeoffs I&apos;d Revisit</h2>
        <ul>
          <li>
            Tailwind via CDN instead of a PostCSS build: moved fast when local Tailwind kept
            breaking; not ideal for production bundle size.
          </li>
          <li>
            JWT in <code>localStorage</code>: fine for a demo, XSS-exposed in a real app.
          </li>
          <li>
            Duplicated Add/Edit expense modals: would merge into one parameterized component next
            pass.
          </li>
        </ul>
      </section>
    </ArticleLayout>
  );
}
