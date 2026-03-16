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

export type ParticleIntensity = 'off' | 'low' | 'high';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Custom Hook for Konami Code
const useKonamiCode = (callback: () => void) => {
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let position = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[position]) {
        position++;
        if (position === konamiCode.length) {
          callback();
          position = 0;
        }
      } else {
        position = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};

// Route wrapper to access useLocation
const AppContent = () => {
  const [particleIntensity, setParticleIntensity] = useState<ParticleIntensity>('high');
  const [isLoading, setIsLoading] = useState(true);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const location = useLocation();

  useKonamiCode(() => {
    setIsEasterEggActive(true);
    // Auto turn off after 5 seconds
    setTimeout(() => setIsEasterEggActive(false), 5000);
  });

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
          animate={isEasterEggActive ? { 
            rotate: [0, -5, 5, -5, 5, 0], 
            scale: [1, 1.05, 1.05, 1],
            filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)']
          } : {}}
          transition={{ duration: 1 }}
          className="min-h-screen bg-[#F8FCFC] text-cyan-dark font-sans selection:bg-yellow-main selection:text-cyan-dark relative overflow-hidden"
        >
          {/* Easter Egg Confetti overlay */}
          <AnimatePresence>
            {isEasterEggActive && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] pointer-events-none flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0, y: 100 }}
                  animate={{ scale: [1, 1.5, 1], y: 0 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                  className="bg-yellow-main p-8 rounded-[3rem] shadow-2xl flex flex-col items-center border-8 border-white"
                >
                  <PartyPopper className="w-24 h-24 text-cyan-dark mb-4 animate-bounce" />
                  <h2 className="text-4xl font-black text-cyan-dark uppercase tracking-widest text-center">
                    Level Up!
                  </h2>
                  <p className="font-bold text-cyan-dark/70 mt-2">You found the secret Konami Code.</p>
                </motion.div>
                
                {/* Simple JS Confetti simulation */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial={{ y: -100, x: window.innerWidth / 2, opacity: 1 }}
                    animate={{ 
                      y: window.innerHeight, 
                      x: window.innerWidth / 2 + (Math.random() - 0.5) * 800,
                      rotate: Math.random() * 360,
                      opacity: 0
                    }}
                    transition={{ duration: 2 + Math.random() * 2, ease: "easeOut" }}
                    className="absolute w-4 h-4 rounded-sm z-[1000]"
                    style={{ backgroundColor: ['#00BCD4', '#FFD54F', '#F472B6', '#4ADE80'][Math.floor(Math.random() * 4)] }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <CustomCursor />
          <ParticleBackground intensity={particleIntensity} />
          <Navbar particleIntensity={particleIntensity} setParticleIntensity={setParticleIntensity} />
          
          <main className="relative z-10 min-h-screen flex flex-col">
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
        </motion.div>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
