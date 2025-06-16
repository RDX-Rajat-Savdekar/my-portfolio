// src/pages/ContactPage.jsx
import ContactMe from '../components/ContactMeComponent';

export default function ContactPage() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Let's Connect</h1>
      <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '2rem' }}>
        Whether it’s about a project, opportunity, or just to say hi — feel free to reach out.
      </p>
      <ContactMe />
    </div>
  );
}
