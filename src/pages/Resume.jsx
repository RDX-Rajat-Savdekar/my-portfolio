import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import StickySectionHeader from '../components/StickySectionHeader';
import SectionBlock from '../components/SectionBlock';
import ContactMe from '../components/ContactMeComponent';



export default function Resume() {
  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      {/* Centered Download Button */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <a
          href="/Rajat_Resume.pdf"
          download
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#fff',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            textDecoration: 'none',
            transition: 'all 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ⬇️ Download Resume
        </a>
      </div>

<SectionBlock></SectionBlock>

      {/* Education */}
      <StickySectionHeader label="Education" />
      <VerticalTimeline lineColor="#888">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{ background: 'rgba(26, 32, 44, 0.9)', color: '#fff', backdropFilter: 'blur(4px)' }}
            date="Aug 2024 – May 2026"
            iconStyle={{ background: '#6b46c1', color: '#fff' }}
          >
            <h3>Masters of Science in Computer Science</h3>
            <h4>University of Southern California</h4>
            <p>Courses: Algorithms, Web Tech, ML, Advanced Game Design</p>
          </VerticalTimelineElement>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <VerticalTimelineElement
          position="right"
            className="vertical-timeline-element--education"
            contentStyle={{ background: 'rgba(26, 32, 44, 0.9)', color: '#fff', backdropFilter: 'blur(4px)' }}
            date="Aug 2019 – May 2023"
            iconStyle={{ background: '#319795', color: '#fff' }}
          >
            <h3>Bachelor of Engineering in Computer Engineering</h3>
            <h4>University of Mumbai</h4>
            <p>Courses: Networks, Software Engg, DSA, AR/VR</p>
            <p>GPA: 9.4 / 10</p>
          </VerticalTimelineElement>
        </motion.div>
      </VerticalTimeline>

<SectionBlock></SectionBlock>


      {/* Technical Experience */}
      <StickySectionHeader label="Technical Experience" />
      <VerticalTimeline lineColor="#888">
        {[
          {
            title: 'Frontend Developer Intern',
            org: 'World Salon – Tech platform',
            date: 'May 2025 – Present',
            points: [
              'Built 8+ React components to improve UX',
              'Implemented Redux + REST APIs for data flow',
              'Collaborated with designers & backend engineers'
            ],
            color: '#d69e2e'
          },
          {
            title: 'Software Engineer Intern',
            org: 'JFSS – Enterprise Software',
            date: 'Jan 2023 – Oct 2023',
            points: [
              'Contributed to 5+ projects in 9 months',
              'Improved delivery speed by 20%'
            ],
            color: '#2b6cb0'
          },
          {
            title: 'Software Engineer Intern',
            org: 'Softaid Computers',
            date: 'Jul 2021 – Dec 2021',
            points: [
              'Built & deployed E-Attendance, E-Vikas',
              '100+ daily users, used PHP, MySQL',
              'Trained in Flutter & IoT (ESP8266)'
            ],
            color: '#718096'
          }
        ].map(({ title, org, date, points, color }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
          >
           <VerticalTimelineElement
  position={i % 2 === 0 ? 'left' : 'right'}  // <-- this is new
  className="vertical-timeline-element--work"
  contentStyle={{
    background: 'rgba(26, 32, 44, 0.9)',
    color: '#fff',
    backdropFilter: 'blur(4px)',
  }}
  date={date}
  iconStyle={{ background: color, color: '#fff' }}
>
  <h3>{title}</h3>
  <h4>{org}</h4>
  <ul>
    {points.map((p, j) => (
      <li key={j}>{p}</li>
    ))}
  </ul>
</VerticalTimelineElement>

          </motion.div>
        ))}
      </VerticalTimeline>




<SectionBlock></SectionBlock>

      {/* Outreach & Teaching */}
      <StickySectionHeader label="Outreach & Teaching" />
      <VerticalTimeline lineColor="#888">
        {[
          {
            title: 'Teaching Assistant',
            org: 'Discover Engineering – USC Viterbi',
            date: 'May 2025 – July 2025',
            points: [
              'Led weekly workshops for 60 high school students',
              'Guided hands-on STEM activities and prototyping'
            ]
          },
          {
            title: 'Teaching Assistant',
            org: 'Energy of STEM – USC Viterbi',
            date: 'July 2025 – Aug 2025',
            points: [
              'Taught 100+ students about circuits and energy systems',
              'Facilitated teamwork and troubleshooting in daily projects'
            ]
          }
        ].map(({ title, org, date, points }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
          >
            <VerticalTimelineElement
  position={i % 2 === 0 ? 'left' : 'right'}  // 👈 Add this line
  className="vertical-timeline-element--work"
  contentStyle={{
    background: 'rgba(26, 32, 44, 0.9)',
    color: '#fff',
    backdropFilter: 'blur(4px)',
  }}
  date={date}
  iconStyle={{ background: '#38a169', color: '#fff' }}
>
  <h3>{title}</h3>
  <h4>{org}</h4>
  <ul>
    {points.map((p, j) => (
      <li key={j}>{p}</li>
    ))}
  </ul>
</VerticalTimelineElement>

          </motion.div>
        ))}
      </VerticalTimeline>
      <ContactMe />
    </div>
  );
}
