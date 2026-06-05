import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';

const events = [
  {
    title: 'May 2025 — Sola Con Finals',
    folder: 'may-2025-sola-con-finals',
    files: ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg'],
    caption:
      'Organized the finals — coordinating under pressure, connecting with the community. It taught me leadership and the value of creating space for others to build.',
  },
  {
    title: 'April 2025 — MESA Fair',
    folder: 'april-2025-mesa-fair',
    files: ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.mp4', '6.mp4', '7.mp4'],
    caption:
      'STEM outreach for K-12 students. Simplifying complex engineering concepts for the next generation of builders.',
  },
  {
    title: 'Jan 2025 — Sola Con',
    folder: 'jan-2025-sola-con',
    files: [
      '1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg',
      '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg', '10.jpeg',
    ],
    caption:
      'Helped build exhibits and run talks. Collaborating with creators from different disciplines broadened how I think about problems.',
  },
  {
    title: 'Dec 2024 — HustNCode Hackathon',
    folder: 'dec-2024-hustncode',
    files: [
      '1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg',
      '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg',
    ],
    caption:
      'Mentored teams through the hackathon. Guiding students from stuck to shipping in 24 hours is an incredible feedback loop.',
  },
];

export default function Community() {
  return (
    <main style={{ maxWidth: '672px', margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: '3rem' }}
      >
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: 'var(--fg)',
            marginBottom: '0.75rem',
          }}
        >
          Community
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '480px' }}>
          Volunteering, mentoring, and organizing events in the Los Angeles tech community. 
          Focusing on STEM outreach and supporting early-career builders.
        </p>
      </motion.div>

      {/* Events */}
      <div>
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            style={{
              marginBottom: '4rem',
              paddingBottom: '4rem',
              borderBottom: i < events.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--fg)',
                marginBottom: '0.625rem',
              }}
            >
              {event.title}
            </h2>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                maxWidth: '540px',
                fontStyle: 'italic',
              }}
            >
              {event.caption}
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '0.5rem',
              }}
            >
              {event.files.map((file, idx) => {
                const isVideo = file.endsWith('.mp4');
                return (
                  <div
                    key={idx}
                    style={{
                      width: '100%',
                      aspectRatio: '4 / 3',
                      overflow: 'hidden',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg)',
                      border: '1px solid var(--border)',
                      position: 'relative',
                    }}
                  >
                    {isVideo ? (
                      <video
                        src={`/community/${event.folder}/${file}`}
                        controls
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          top: 0,
                          left: 0,
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <img
                        src={`/community/${event.folder}/${file}`}
                        alt={`${event.title} ${idx + 1}`}
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          top: 0,
                          left: 0,
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <ContactMe />
    </main>
  );
}
