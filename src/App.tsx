import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Works } from './pages/Works';
import { Experience } from './pages/Experience';
import { ProjectDetail } from './pages/ProjectDetail';
import { LanguageProvider } from './context/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider, useSettings } from './context/SettingsContext';

const Router = import.meta.env.VITE_GITHUB_PAGES === 'true' ? HashRouter : BrowserRouter;

const AppContent = () => {
  const { isLateNightMode } = useSettings();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`min-h-screen font-sans selection:bg-yellow-main selection:text-cyan-dark ${isLateNightMode ? 'dark-mode bg-[#0A1A1F]' : 'bg-[#F8FCFC]'}`}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
      {pathname === '/' && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <LanguageProvider>
          <SettingsProvider><AppContent /></SettingsProvider>
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  );
}
