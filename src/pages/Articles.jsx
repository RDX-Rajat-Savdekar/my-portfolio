import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';

const articles = [
  {
    title: 'Why I Built My Resume Template from Scratch in LaTeX',
    date: 'June 2025',
    summary: 'A breakdown of the decisions, macros, and hacks I used to design a clean, editable LaTeX resume without relying on overused templates.',
    tags: ['LaTeX', 'Productivity', 'Design'],
    link: 'https://medium.com/@rajatsavdekar/why-i-built-my-resume-template-from-scratch-in-latex-b7354b387f5d'
  },
 {
  title: 'Custom Macros I Wrote (and Why)',
  date: 'June 2025',
  summary: 'A breakdown of the LaTeX macros I created to make my resume format clean, consistent, and easy to update — with real examples and reasoning.',
  tags: ['LaTeX', 'Resume Design', 'Productivity'],
  link: 'https://medium.com/@rajatsavdekar/custom-macros-i-wrote-and-why-f8845e1541ab'
}
];

export default function Articles() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Articles</h1>

      {articles.map((article, i) => (
        <motion.a
          href={article.link}
          key={i}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'block',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(6px)',
            marginBottom: '1.5rem',
            textDecoration: 'none',
            color: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <h3 style={{ marginBottom: '0.25rem' }}>{article.title}</h3>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>{article.date}</div>
          <p style={{ marginBottom: '0.5rem' }}>{article.summary}</p>
          <div style={{ fontSize: '0.85rem', color: '#bbb' }}>
            {article.tags.map((tag, j) => (
              <span
                key={j}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  marginRight: '0.5rem'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.a>
      ))}
            <ContactMe />
    </div>
  );
}
