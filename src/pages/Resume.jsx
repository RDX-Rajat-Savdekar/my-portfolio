import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function Resume() {
  return (
    <div       style={{
        padding: '2rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}
>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Resume Timeline</h1>

      {/* 🎓 Education Section */}
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Education</h2>
        <VerticalTimeline lineColor="#888">
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{ background: '#1a202c', color: '#fff' }}
            date="Aug 2024 – May 2026"
            iconStyle={{ background: '#6b46c1', color: '#fff' }}
          >
            <h3>Masters of Science in Computer Science</h3>
            <h4>University of Southern California</h4>
            <p>Courses: Algorithms, Web Tech, ML, Advanced Game Design</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{ background: '#1a202c', color: '#fff' }}
            date="Aug 2019 – May 2023"
            iconStyle={{ background: '#319795', color: '#fff' }}
          >
            <h3>Bachelor of Engineering in Computer Engineering</h3>
            <h4>University of Mumbai</h4>
            <p>Courses: Networks, Software Engg, DSA, AR/VR</p>
            <p>GPA: 9.4 / 10</p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </section>

      {/* 💼 Experience Section */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Technical Experience</h2>
        <VerticalTimeline lineColor="#888">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#1a202c', color: '#fff' }}
            date="May 2025 – Present"
            iconStyle={{ background: '#d69e2e', color: '#fff' }}
          >
            <h3>Frontend Developer Intern</h3>
            <h4>World Salon – Tech platform</h4>
            <ul>
              <li>Built 8+ React components to improve UX</li>
              <li>Implemented Redux + REST APIs for data flow</li>
              <li>Collaborated with designers & backend engineers</li>
            </ul>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#1a202c', color: '#fff' }}
            date="Jan 2023 – Oct 2023"
            iconStyle={{ background: '#2b6cb0', color: '#fff' }}
          >
            <h3>Software Engineer Intern</h3>
            <h4>JFSS – Enterprise Software</h4>
            <ul>
              <li>Contributed to 5+ projects in 9 months</li>
              <li>Improved delivery speed by 20%</li>
            </ul>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#1a202c', color: '#fff' }}
            date="Jul 2021 – Dec 2021"
            iconStyle={{ background: '#718096', color: '#fff' }}
          >
            <h3>Software Engineer Intern</h3>
            <h4>Softaid Computers</h4>
            <ul>
              <li>Built & deployed E-Attendance, E-Vikas</li>
              <li>100+ daily users, used PHP, MySQL</li>
              <li>Trained in Flutter & IoT (ESP8266)</li>
            </ul>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </section>
    </div>
  );
}
