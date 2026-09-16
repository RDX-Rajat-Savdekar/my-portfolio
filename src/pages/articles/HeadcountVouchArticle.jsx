import ArticleLayout from '../../components/ArticleLayout';

const still = (file) => `/projects/stitch/headcount-vouch/stills/${file}`;

export default function HeadcountVouchArticle({ layout = 'article' }) {
  return (
    <ArticleLayout
      layout={layout}
      projectSlug="headcount-vouch"
      title="Headcount & Vouch: Two Real CALL-E Calls"
      date="September 2026"
      tags={['TypeScript', 'Next.js', 'CALL-E', 'SQLite', 'Remotion']}
      description="After a disaster, the people who do not pick up are the ones you most need to find. Employment verify has the opposite hole: dialing without a consent record. Two consoles, two live outbound calls."
    >
      <section>
        <h2>Why these two</h2>
        <p>
          Counties still run CDC CASPER with clipboards: walk a sample of houses after a fire or flood
          and ask if everyone is safe, if they have power, water, medicine. It takes days. The number
          that matters is not completed calls. It is who never actually answered. Voicemail is not a
          reach.
        </p>
        <p>
          Employment verification fails the other way. Tools dial first and treat consent as a
          checkbox. In California you are not allowed to ask salary history. So the second console
          will not place a CALL-E call without a consent artifact, and salary never makes it into the
          script even if someone typed it on the form.
        </p>
      </section>

      <section>
        <h2>Headcount</h2>
        <p>
          An EOC console for a one-shot household needs wave. Coverage is dialed / reached /
          unaccounted. If the model claims something the transcript does not support, the field is
          struck through. Medical emergency, trapped, or a bad critical field fail closed to a human.
        </p>
        <div className="article-stills">
          <img src={still('headcount-incoming.png')} alt="Incoming Headcount live call" />
          <img src={still('headcount-incall.png')} alt="Headcount call in progress" />
        </div>
        <img
          src={still('headcount-dashboard-1.png')}
          alt="CALL-E Conversation Detail for the Headcount CASPER drill"
        />
        <img
          src={still('headcount-dashboard-2.png')}
          alt="Headcount live-call transcript, second page"
        />
      </section>

      <section>
        <h2>Vouch</h2>
        <p>
          Confirm stays off if consent is missing, revoked, or expired. There is no override.
          California SB 1162 strips salary history from the compiled task. Third-party-only is a
          first-class disposition, not a collapsed fail.
        </p>
        <div className="article-stills">
          <img src={still('vouch-incoming.jpg')} alt="Incoming Vouch live call" />
          <img src={still('vouch-ended.jpg')} alt="Vouch call ended" />
        </div>
        <img
          src={still('vouch-dashboard.png')}
          alt="CALL-E Conversation Detail for the Vouch employment verify"
        />
      </section>

      <section>
        <h2>What shipped</h2>
        <ul>
          <li>
            Two real outbound CALL-E calls on video: 62s CASPER drill, 66s employment verify (title
            and dates, rehire is policy, salary never asked).
          </li>
          <li>Fixture replay is the default. Live calling is opt-in. Kill switch on every screen.</li>
          <li>
            Vendored into{' '}
            <a href="https://github.com/CALLE-AI/awesome-phone-call-agents/pull/601">
              Headcount PR #601
            </a>{' '}
            and{' '}
            <a href="https://github.com/CALLE-AI/awesome-phone-call-agents/pull/605">Vouch PR #605</a>.
          </li>
        </ul>
        <p>
          Demo:{' '}
          <a href="https://youtu.be/-Xsi651IdK8" target="_blank" rel="noreferrer">
            YouTube
          </a>
          . Hackathon:{' '}
          <a href="https://call-e.devpost.com/" target="_blank" rel="noreferrer">
            CALL-E: Your Code Is Calling
          </a>
          .
        </p>
      </section>
    </ArticleLayout>
  );
}
