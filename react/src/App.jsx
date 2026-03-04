import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import History from './pages/History';
import Roadmap from './pages/Roadmap';
import VisionMission from './pages/VisionMission';
import Organization from './pages/Organization';
import CI from './pages/CI';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Location from './pages/Location';
import News from './pages/News';
import Blog from './pages/Blog';
import Technology from './pages/Technology';
import Investment from './pages/Investment';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* About */}
        <Route path="/about/vision-mission" element={<VisionMission />} />
        <Route path="/about/ci" element={<CI />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/organization" element={<Organization />} />
        {/* Technology */}
        <Route path="/technology" element={<Technology />} />
        <Route path="/technology/roadmap" element={<Roadmap />} />
        {/* Investment */}
        <Route path="/investment" element={<Investment />} />
        <Route path="/investment/news" element={<News />} />
        <Route path="/investment/blog" element={<Blog />} />
        {/* FAQ */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/faq/contact" element={<Contact />} />
        <Route path="/faq/location" element={<Location />} />
        {/* 404 */}
        <Route path="*" element={<Placeholder />} />
      </Route>
    </Routes>
  );
}
