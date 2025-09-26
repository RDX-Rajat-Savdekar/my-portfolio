// src/pages/Community.jsx
import { motion } from 'framer-motion';
import ContactMe from '../components/ContactMeComponent';

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.04)',
  padding: '2rem',
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.08)',
  marginBottom: '2rem',
};

const events = [
  {
    title: "May 2025 Sola Con Finals",
    folder: "may-2025-sola-con-finals",
    files: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"],
    caption: "Organizing the finals pushed me to coordinate under pressure and connect deeply with the community. It taught me leadership, and I hope my work inspired participants to take pride in their achievements."
  },
  {
    title: "April 2025 MESA Fair",
    folder: "april-2025-mesa-fair",
    files: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.mp4", "6.mp4", "7.mp4"],
    caption: "Volunteering at MESA Fair opened my eyes to the joy of science outreach — seeing young students’ faces light up when they grasp a concept was deeply rewarding. I hope my guidance gave them confidence to pursue STEM."
  },
  {
    title: "Jan 2025 Sola Con",
    folder: "jan-2025-sola-con",
    files: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg"],
    caption: "At Sola Con, I helped build exhibits and run talks — collaborating with creators broadened my perspective and sharpened my event skills. I aim to have left attendees more curious and inspired."
  },
  {
    title: "Dec 2024 HustNCode",
    folder: "dec-2024-hustncode",
    files: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg"],
    caption: "Mentoring at HustNCode influenced me to condense complex ideas into accessible lessons. Watching participants grow over the hackathon motivates me to keep teaching and coding."
  },
  {
    title: "Nov 2024 Sola Con",
    folder: "nov-2024-sola-con",
    files: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"],
    caption: "Helping with Sola Con demos and workshops taught me patience in explaining to diverse audiences. I hope the hands-on work elevated the experience for others and built community ties."
  }
];

export default function Community() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Community Impact
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#ccc',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          Showcasing volunteering and community events through photos and videos.
        </p>
      </motion.div>

      {/* Events */}
      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          style={cardStyle}
        >
          <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>{event.title}</h3>
          <p style={{ color: '#ccc', fontStyle: 'italic', marginBottom: '1rem' }}>
            {event.caption}
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {event.files.map((file, idx) => {
              const isVideo = file.endsWith('.mp4');
              // container to enforce same aspect ratio
              return (
                <div
                  key={idx}
                  style={{
                    width: '100%',
                    // fixed ratio: let's do 4:3 (you can tweak)
                    aspectRatio: '4 / 3',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    background: '#000',
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

      <ContactMe />
    </div>
  );
}
