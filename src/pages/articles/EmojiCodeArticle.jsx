import ArticleLayout from '../../components/ArticleLayout';

export default function EmojiCodeArticle() {
  return (
    <ArticleLayout
      projectSlug="emojicode"
      title="EmojiCode: A Hook-y Cipher Game on Reddit Devvit"
      date="July 2026"
      tags={['Devvit', 'React', 'TypeScript', 'Redis', 'Phaser']}
      description="Encode it in 5. Crack it in comments. A comment-driven cipher game for Reddit — built for the Games with a Hook hackathon with Phaser."
    >
      <section>
        <h2>The Idea</h2>
        <p>
          <strong>EmojiCode</strong> is built around instant publish: pick exactly 5 emojis, type the
          answer, hit submit — your post is live in the feed immediately. Other redditors guess what it
          means in comments (or inline on the post). No queue, no daily curation, no human moderator in
          the loop.
        </p>
        <p>
          Built for{' '}
          <a
            href="https://redditgameswithahook.devpost.com/"
            target="_blank"
            rel="noreferrer"
          >
            Reddit&apos;s Games with a Hook Hackathon
          </a>{' '}
          (with Phaser), June 17 – July 15, 2026. Status: feature-complete against the MVP spec;
          remaining work is publish-side (public test subreddit + Devpost demo links).
        </p>
      </section>

      <section>
        <h2>Why It&apos;s &ldquo;Hook-y&rdquo;</h2>
        <p>The hackathon judges on daily return — EmojiCode&apos;s retention loop:</p>
        <ul>
          <li>
            <strong>Cipher of the Day</strong> — refreshed at midnight, something new to check daily.
          </li>
          <li>
            <strong>Streaks</strong> — visible nudge before you lose an active decode streak.
          </li>
          <li>
            <strong>XP + named ranks</strong> — concrete &ldquo;N more decodes to Legendary Cipher&rdquo;
            progress, synced to Reddit flair.
          </li>
          <li>
            <strong>User-authored content</strong> — every cipher is community-made; the feed never
            runs out.
          </li>
        </ul>
      </section>

      <section>
        <h2>Gameplay & Autonomy</h2>
        <ul>
          <li>
            Smart guess checking — Levenshtein fuzzy match + crowd-sourced answer dictionary (solvers
            can add alternate phrasings after cracking).
          </li>
          <li>
            Hint (word shapes only) and no-penalty Give Up; First Crack 🥇 and ranked medals for early
            solvers.
          </li>
          <li>
            Dual leaderboards: Decoders (XP from guessing) and Cipher Masters (upvotes on posts you
            created).
          </li>
          <li>
            Fail-closed safety: local denylist always on; optional OpenAI Moderation endpoint when
            configured.
          </li>
        </ul>
      </section>

      <section>
        <h2>Stack & Phaser Moment</h2>
        <p>
          Devvit Web · React 19 + TypeScript + Vite · Tailwind CSS 4 · Hono on Devvit server runtime ·
          Redis (sorted sets, no external DB) · Devvit Scheduler for daily/weekly cron.
        </p>
        <p>
          The solve celebration is a real Phaser Arcade Physics burst — emojis explode, fall under
          gravity, bounce — code-split via <code>React.lazy</code> so the ~1MB Phaser bundle only loads
          on a correct guess. Targets the hackathon&apos;s{' '}
          <strong>Best Use of Phaser</strong> sub-award.
        </p>
      </section>
    </ArticleLayout>
  );
}
