import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import Work from './pages/Work';
import Writing from './pages/Writing';
import Community from './pages/Community';
import ProjectPage from './pages/ProjectPage';
import './App.css';

const writingRedirects = [
  'caliberate',
  'mediverse',
  'celestia-vr',
  'aura',
  'after-image',
  'mockpad',
  'stitch',
  'emojicode',
  'splitit',
  'creator-lab',
  'research-papers',
  'trojanmind',
];

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/writing" element={<Writing />} />
        {writingRedirects.map((slug) => (
          <Route
            key={slug}
            path={`/writing/${slug}`}
            element={<Navigate to={`/projects/${slug}`} replace />}
          />
        ))}
        <Route
          path="/writing/research-texture"
          element={<Navigate to="/projects/research-papers" replace />}
        />
        <Route
          path="/projects/astro-gsap"
          element={<Navigate to="/projects/astro-gsap-f1" replace />}
        />
        <Route path="/community" element={<Community />} />
        <Route path="/resume" element={<Navigate to="/work" replace />} />
        <Route path="/log" element={<Navigate to="/writing" replace />} />
        <Route path="/articles" element={<Navigate to="/writing" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
