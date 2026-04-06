import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import Work from './pages/Work';
import Writing from './pages/Writing';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/community" element={<Community />} />
        {/* Legacy routes */}
        <Route path="/resume" element={<Navigate to="/work" replace />} />
        <Route path="/log" element={<Navigate to="/writing" replace />} />
        <Route path="/articles" element={<Navigate to="/writing" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
