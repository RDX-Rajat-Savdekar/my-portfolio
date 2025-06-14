import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav style={{
    position: 'sticky',
    top: 0,
    zIndex: 10,
    display: 'flex',
    gap: '1rem',
    padding: '1rem 2rem',
    backgroundColor: 'rgba(18, 18, 18, 0.6)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  }}
>
      <Link to="/" style={{ margin: '0 1rem', color: 'white' }}>Home</Link>
      <Link to="/projects" style={{ margin: '0 1rem', color: 'white' }}>Projects</Link>
      <Link to="/log" style={{ margin: '0 1rem', color: 'white' }}>DevLog</Link>
      <Link to="/resume" style={{ margin: '0 1rem', color: 'white' }}>Resume</Link>
      <Link to="/community" style={{ margin: '0 1rem', color: 'white' }}>Community</Link>
      <Link to="/articles" style={{ margin: '0 1rem', color: 'white' }}>Articles</Link>
    </nav>
  )
}
