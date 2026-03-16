import React from 'react';
import { motion } from 'motion/react';
import { Flower2, Sparkles } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

interface NavbarProps {
  particleIntensity: 'off' | 'low' | 'high';
  setParticleIntensity: (val: 'off' | 'low' | 'high') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ particleIntensity, setParticleIntensity }) => {
  const navItems = [
    { zh: '主页', en: 'Home', path: '/' },
    { zh: '作品', en: 'Works', path: '/works' },
    { zh: '关于我', en: 'About', path: '/about' },
    { zh: '经历', en: 'Experience', path: '/experience' }
  ];

  const cycleIntensity = () => {
    if (particleIntensity === 'high') setParticleIntensity('low');
    else if (particleIntensity === 'low') setParticleIntensity('off');
    else setParticleIntensity('high');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-lg border-b border-white/80 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 flex items-center justify-center bg-yellow-main rounded-full border-4 border-white shadow-md group-hover:shadow-lg transition-all">
              <Flower2 className="text-white w-6 h-6" />
            </div>
            <span className="font-sans font-black text-2xl tracking-wide text-cyan-dark group-hover:text-cyan-main transition-colors">
              桂花<span className="text-yellow-main">拉糕</span>
            </span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `relative flex flex-col items-center group ${isActive ? 'is-active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <span className={`font-sans font-black text-base transition-colors ${isActive ? 'text-cyan-main' : 'text-cyan-dark/80 group-hover:text-cyan-main'}`}>
                    {item.zh}
                  </span>
                  <span className={`font-sans font-bold text-[10px] uppercase tracking-widest transition-colors -mt-1 ${isActive ? 'text-yellow-main' : 'text-cyan-dark/40 group-hover:text-yellow-main'}`}>
                    {item.en}
                  </span>
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1.5 bg-yellow-main rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </>
              )}
            </NavLink>
          ))}

          {/* Particle Toggle Button */}
          <button
            onClick={cycleIntensity}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-light/30 hover:bg-cyan-light/60 transition-colors text-cyan-dark border border-cyan-main/20"
            title="Toggle Particle Intensity"
          >
            <Sparkles className={`w-4 h-4 ${particleIntensity === 'off' ? 'opacity-40' : 'text-yellow-main'}`} />
            <span className="font-sans font-bold text-xs uppercase tracking-widest">
              FX: {particleIntensity}
            </span>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={cycleIntensity}
            className="text-cyan-dark hover:text-cyan-main bg-cyan-light/30 p-2 rounded-full shadow-sm"
          >
            <Sparkles className={`w-5 h-5 ${particleIntensity === 'off' ? 'opacity-40' : 'text-yellow-main'}`} />
          </button>
          <button className="text-cyan-dark hover:text-cyan-main bg-white p-2 rounded-full shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
