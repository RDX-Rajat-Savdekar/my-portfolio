import ArticleLayout from '../../components/ArticleLayout';

const papers = [
  {
    title: 'Texture Feature Analysis Using GLCM Matrix',
    url: 'https://ijnrd.org/viewpaperforall.php?paper=IJNRD2202021',
    about:
      'Image classification using Gray-Level Co-occurrence Matrix for texture feature extraction.',
    citations: '10 — Nature, Springer, IEEE',
  },
  {
    title: 'Medical Transcript Analysis',
    url: 'https://www.ijnrd.org/viewpaperforall.php?paper=IJNRD2307427',
    about: 'NLP-based analysis of medical transcripts for structured information extraction.',
    citations: '—',
  },
  {
    title: 'Analysis of IAS Interview Transcripts',
    url: 'https://ijnrd.org/viewpaperforall.php?paper=IJNRD2205009',
    about:
      'Computational analysis of UPSC IAS interview transcripts to identify patterns and language structure.',
    citations: '—',
  },
  {
    title: 'LSB Based Image Steganography Using Passkey',
    url: 'https://ijircce.com/admin/main/storage/app/pdf/KJgaW76YVKApNMzguI2BQkfdSOYWGOZNhhDyGQvX.pdf',
    about: 'Secure data hiding in images using LSB steganography with passkey authentication.',
    citations: '—',
  },
];

export default function ResearchPapersArticle() {
  return (
    <ArticleLayout
      projectSlug="research-papers"
      title="Research Papers: Four Undergrad Publications"
      date="2019–2023"
      tags={['Research', 'MATLAB', 'NLP', 'Publications']}
      description="Four publications from Computer Engineering at Mumbai University. The GLCM paper has been cited 10 times across Nature, Springer, and IEEE."
    >
      <section>
        <h2>Overview</h2>
        <p>
          This repo tracks all of my undergraduate research — papers, certificates, MATLAB/Jupyter
          source, and PDFs. The GLCM texture tool is the one other groups actually reused; the rest
          span NLP and security topics from the same period.
        </p>
        <p>
          <a
            href="https://scholar.google.com/citations?user=ynyXTd8AAAAJ&hl=en"
            target="_blank"
            rel="noreferrer"
          >
            Google Scholar profile ↗
          </a>
          {' · '}
          <a
            href="https://github.com/RDX-Rajat-Savdekar/Research-Papers/tree/main/All%20Pdfs"
            target="_blank"
            rel="noreferrer"
          >
            All PDFs in repo ↗
          </a>
        </p>
      </section>

      <section>
        <h2>Publications</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {papers.map((paper) => (
            <li
              key={paper.url}
              style={{
                marginBottom: '1.75rem',
                paddingBottom: '1.75rem',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <a
                href={paper.url}
                target="_blank"
                rel="noreferrer"
                style={{ fontWeight: 600, color: 'var(--fg)' }}
              >
                {paper.title} ↗
              </a>
              <p style={{ margin: '0.5rem 0 0.25rem' }}>{paper.about}</p>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--muted)',
                }}
              >
                Citations: {paper.citations}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>GLCM Tool (Highlight)</h2>
        <p>
          The texture paper shipped with a MATLAB GUI for GLCM feature extraction — contrast,
          entropy, homogeneity, and related measures — so researchers could run the same pipeline
          without rewriting boilerplate. That reproducibility is why it picked up citations across
          Nature, Springer, and IEEE venues.
        </p>
        <p>
          Source lives under{' '}
          <code>Texture Extraction using Matlab/</code> in the{' '}
          <a
            href="https://github.com/RDX-Rajat-Savdekar/Research-Papers"
            target="_blank"
            rel="noreferrer"
          >
            Research-Papers repo ↗
          </a>
          .
        </p>
      </section>
    </ArticleLayout>
  );
}
