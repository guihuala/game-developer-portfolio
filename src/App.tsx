import React, { useEffect } from 'react';
import './studio.css';
import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PageTransition } from './components/PageTransition';
import { ParticleBackground } from './components/ParticleBackground';
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
    <div className={`atelier-app min-h-screen font-sans selection:bg-yellow-main selection:text-cyan-dark ${isLateNightMode ? 'dark-mode' : ''}`}>
      <ParticleBackground />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </PageTransition>
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
