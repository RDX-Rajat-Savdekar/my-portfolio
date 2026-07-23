import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import Work from './pages/Work';
import Writing from './pages/Writing';
import Community from './pages/Community';
import CelestiaVRArticle from './pages/articles/CelestiaVRArticle';
import AuraArticle from './pages/articles/AuraArticle';
import AfterImageArticle from './pages/articles/AfterImageArticle';
import MockPadArticle from './pages/articles/MockPadArticle';
import SplitItArticle from './pages/articles/SplitItArticle';
import CreatorLabArticle from './pages/articles/CreatorLabArticle';
import ResearchPapersArticle from './pages/articles/ResearchPapersArticle';
import TrojanmindArticle from './pages/articles/TrojanmindArticle';
import StitchArticle from './pages/articles/StitchArticle';
import EmojiCodeArticle from './pages/articles/EmojiCodeArticle';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/celestia-vr" element={<CelestiaVRArticle />} />
        <Route path="/writing/aura" element={<AuraArticle />} />
        <Route path="/writing/after-image" element={<AfterImageArticle />} />
        <Route path="/writing/mockpad" element={<MockPadArticle />} />
        <Route path="/writing/stitch" element={<StitchArticle />} />
        <Route path="/writing/emojicode" element={<EmojiCodeArticle />} />
        <Route path="/writing/splitit" element={<SplitItArticle />} />
        <Route path="/writing/creator-lab" element={<CreatorLabArticle />} />
        <Route path="/writing/research-papers" element={<ResearchPapersArticle />} />
        <Route path="/writing/research-texture" element={<Navigate to="/writing/research-papers" replace />} />
        <Route path="/writing/trojanmind" element={<TrojanmindArticle />} />
        <Route path="/community" element={<Community />} />
        <Route path="/resume" element={<Navigate to="/work" replace />} />
        <Route path="/log" element={<Navigate to="/writing" replace />} />
        <Route path="/articles" element={<Navigate to="/writing" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
