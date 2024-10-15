import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import { Blog } from './components/Blog'
import { BlogPost } from './components/BlogPost'
import { SignIn } from './components/SignIn';
import { Dashboard } from './components/Dashboard';
import { HintPage } from './components/HintPage';

function App() {
  return (
    <div className="h-screen">
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/submit" element={<HintPage />} />
      </Routes>
    </div>
  );
}

export default App;
