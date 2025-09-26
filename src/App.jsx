import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import DevLog from './pages/DevLog';
import Resume from './pages/Resume';
import Community from './pages/Community';
import Articles from './pages/Articles';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/log" element={<DevLog />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}


export default App;
