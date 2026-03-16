import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Works } from './pages/Works';
import { Experience } from './pages/Experience';
import { ProjectDetail } from './pages/ProjectDetail';
import { Loader } from './components/Loader';
import { PageTransition } from './components/PageTransition';
import { AnimatePresence, motion } from 'motion/react';
import { PartyPopper } from 'lucide-react';
import { LanguageProvider } from './context/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { ContextMenu } from './components/ContextMenu';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
const AppContent = () => {
  const { isLateNightMode } = useSettings();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div 
          animate={isLateNightMode ? { 
            backgroundColor: '#0A1A1F',
            color: '#E0F7FA'
          } : {
            backgroundColor: '#F8FCFC',
            color: '#006064'
          }}
          transition={{ duration: 1 }}
          className={`min-h-screen font-sans selection:bg-yellow-main selection:text-cyan-dark relative overflow-hidden ${
            isLateNightMode ? 'dark-mode' : ''
          }`}
        >
          <CustomCursor />
          <ContextMenu />
          <ParticleBackground />
          <Navbar />
          
          <main className="relative z-20 min-h-screen flex flex-col">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/works" element={<PageTransition><Works /></PageTransition>} />
                <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
                <Route path="/project/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <Footer />

          {/* Late Night Overlay Glow */}
          <AnimatePresence>
            {isLateNightMode && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 pointer-events-none z-50 bg-indigo-900/10 mix-blend-color-burn"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <LanguageProvider>
          <SettingsProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </SettingsProvider>
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  );
}
