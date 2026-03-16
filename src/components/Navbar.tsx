import React from 'react';
import { motion } from 'motion/react';
import { Flower2, Sparkles, Languages } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { particleIntensity, setParticleIntensity } = useSettings();
  const { playHover, playClick } = useSoundEffects();
  
  const navItems = [
    { zh: '主页', en: 'Home', path: '/' },
    { zh: '作品', en: 'Works', path: '/works' },
    { zh: '关于我', en: 'About', path: '/about' },
    { zh: '经历', en: 'Experience', path: '/experience' }
  ];

  const cycleIntensity = () => {
    playClick();
    if (particleIntensity === 'high') setParticleIntensity('low');
    else if (particleIntensity === 'low') setParticleIntensity('off');
    else setParticleIntensity('high');
  };

  const currentNavItems = navItems.map(item => ({
    ...item,
    display: language === 'zh' ? item.zh : item.en
  }));

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
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 flex items-center justify-center transition-all"
            >
              <span className="text-yellow-main text-4xl" style={{ transform: "rotate(45deg)", display: "inline-block" }}>✤</span>
            </motion.div>
            <span className="font-sans font-black text-2xl tracking-wide text-cyan-dark group-hover:text-cyan-main transition-colors">
              {t("桂花", "moku")}
              <span className="text-yellow-main">{t("拉糕", "keki")}</span>
            </span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {currentNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseEnter={playHover}
              onClick={playClick}
              className={({ isActive }) => `relative flex flex-col items-center group ${isActive ? 'is-active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <span className={`font-sans font-black text-base transition-colors ${isActive ? 'text-cyan-main' : 'text-cyan-dark/80 group-hover:text-cyan-main'}`}>
                    {item.display}
                  </span>
                  <span className={`font-sans font-bold text-[10px] uppercase tracking-widest transition-colors -mt-1 ${isActive ? 'text-yellow-main' : 'text-cyan-dark/40 group-hover:text-yellow-main'} opacity-0 group-hover:opacity-100 transition-opacity`}>
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
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-light/30 hover:bg-cyan-light/60 transition-colors text-cyan-dark border border-cyan-main/20"
            title="Toggle Particle Intensity"
          >
            <Sparkles className={`w-4 h-4 ${particleIntensity === 'off' ? 'opacity-40' : 'text-yellow-main'}`} />
            <span className="font-sans font-bold text-xs uppercase tracking-widest">
              FX: {particleIntensity}
            </span>
          </button>

          {/* Language Switch Button */}
          <button
            onClick={() => {
              playClick();
              toggleLanguage();
            }}
            onMouseEnter={playHover}
            className="flex items-center justify-center p-2 rounded-full bg-cyan-light/30 hover:bg-cyan-light/60 transition-colors text-cyan-dark border border-cyan-main/20"
            title="Toggle Language"
          >
            <Languages className="w-5 h-5 text-cyan-dark" />
            <span className="ml-1 font-sans font-black text-xs uppercase">{language === 'zh' ? 'EN' : '中'}</span>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={cycleIntensity}
            className="text-cyan-dark hover:text-cyan-main bg-cyan-light/30 p-2 rounded-full shadow-sm"
          >
            <Sparkles className={`w-5 h-5 ${particleIntensity === 'off' ? 'opacity-40' : 'text-yellow-main'}`} />
          </button>
          <button onClick={() => { playClick(); toggleLanguage(); }} className="text-cyan-dark hover:text-cyan-main bg-cyan-light/30 p-2 rounded-full shadow-sm">
            <Languages className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
