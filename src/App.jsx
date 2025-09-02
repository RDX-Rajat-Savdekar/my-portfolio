import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import DevLog from './pages/DevLog';
import Resume from './pages/Resume';
import Community from './pages/Community';
import Articles from './pages/Articles';
import ContactPage from './pages/ContactPage';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/log" element={<DevLog />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/community" element={<Community />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}


export default App;
