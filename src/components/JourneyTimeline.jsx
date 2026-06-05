import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const journey = [
  {
    date: '2024 - Present',
    title: 'MS Computer Science',
    location: 'University of Southern California',
    description: 'Specializing in Backend Engineering and Spatial Computing. Researching on-device AI and XR interactions.',
    icon: '🎓',
  },
  {
    date: 'Spring 2026',
    title: 'CelestiaVR Launch',
    location: 'USC Research Project',
    description: 'Architected a VR stargazing engine using NASA/JPL data for Meta Quest 3S.',
    icon: '✨',
  },
  {
    date: 'Oct 2024',
    title: 'USC Hackathon Winner (2nd)',
    location: 'University of Southern California',
    description: 'Developed Aura, a visionOS application for accessibility using CoreML.',
    icon: '🏆',
  },
  {
    date: 'June 2024',
    title: 'MockPad Released',
    location: 'Open Source',
    description: 'Launched a free alternative to CoderPad with real-time playback and AI assist.',
    icon: '💻',
  },
  {
    date: 'May 2023',
    title: 'Software Engineer',
    location: 'Jalgaon Fruits Coop',
    description: 'Digitized procurement workflows for 150+ farmers, implementing Flask microservices and Docker.',
    icon: '⚡',
  },
];

export default function JourneyTimeline() {
  return (
    <div style={{ marginTop: '2rem' }}>
      <VerticalTimeline layout="1-column-left" lineColor="#27272a">
        {journey.map((item, i) => (
          <VerticalTimelineElement
            key={i}
            className="vertical-timeline-element--work"
            contentStyle={{ 
              background: 'transparent', 
              color: 'var(--fg)', 
              boxShadow: 'none',
              padding: '0.5rem 0 2rem 0',
              border: 'none'
            }}
            contentArrowStyle={{ display: 'none' }}
            date={item.date}
            dateClassName="timeline-date"
            iconStyle={{ 
              background: 'var(--bg)', 
              color: '#fff', 
              boxShadow: '0 0 0 4px var(--border), inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}
            icon={<span>{item.icon}</span>}
          >
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: 0 }}>{item.title}</h3>
            <h4 style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 500, margin: '0.25rem 0' }}>{item.location}</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', fontWeight: 400, margin: '0.5rem 0' }}>
              {item.description}
            </p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      <style>{`
        .vertical-timeline::before {
          left: 20px !important;
        }
        .vertical-timeline-element-icon {
          left: 0 !important;
          width: 40px !important;
          height: 40px !important;
        }
        .vertical-timeline-element-content {
          margin-left: 60px !important;
        }
        .timeline-date {
          float: none !important;
          display: block;
          font-family: var(--font-mono);
          font-size: 0.75rem !important;
          color: var(--muted) !important;
          opacity: 0.6;
          margin-bottom: 0.5rem;
        }
        @media only screen and (min-width: 1170px) {
          .vertical-timeline-element-content {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
