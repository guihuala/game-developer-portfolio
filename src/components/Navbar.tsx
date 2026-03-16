import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower2, Moon, Sun, Languages, Menu, X, Github, Twitter, Globe, Tv, Gamepad2 } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { CONTACT_INFO } from '../constants/contactInfo';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { isLateNightMode, toggleLateNightMode } = useSettings();
  const { playHover, playClick } = useSoundEffects();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { zh: '主页', en: 'Home', path: '/' },
    { zh: '作品', en: 'Works', path: '/works' },
    { zh: '关于我', en: 'About', path: '/about' },
    { zh: '经历', en: 'Experience', path: '/experience' }
  ];

  const currentNavItems = navItems.map(item => ({
    ...item,
    display: language === 'zh' ? item.zh : item.en
  }));

  const toggleMobileMenu = () => {
    playClick();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${
        isMobileMenuOpen ? 'bg-white' : isLateNightMode ? 'bg-[#0A1A1F]/80 backdrop-blur-lg' : 'bg-white/60 backdrop-blur-lg'
      } border-b ${isLateNightMode ? 'border-cyan-main/10' : 'border-white/80'} shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-[110]">
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer group"
            onMouseEnter={playHover}
            onClick={() => { playClick(); setIsMobileMenuOpen(false); }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 flex items-center justify-center transition-all"
            >
              <span className="text-yellow-main text-4xl" style={{ transform: "rotate(45deg)", display: "inline-block" }}>✤</span>
            </motion.div>
            <div className="flex flex-col items-start leading-none">
              <span className={`font-sans font-black text-2xl tracking-wide transition-colors ${isLateNightMode ? 'text-cyan-main' : 'text-cyan-dark'} group-hover:text-cyan-main`}>
                {t("桂花", "moku")}
                <span className="text-yellow-main">{t("拉糕", "keki")}</span>
              </span>
              <AnimatePresence>
                {isLateNightMode && (
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[8px] font-black text-yellow-main/60 tracking-[0.3em] uppercase mt-1 flex items-center gap-1"
                  >
                    <Moon className="w-2 h-2" /> {t("深夜模式", "NIGHT MODE")}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {currentNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseEnter={playHover}
              onClick={playClick}
              className={({ isActive }) => `relative flex flex-col items-center group px-4 py-2 rounded-xl transition-all ${
                isActive 
                  ? isLateNightMode ? 'bg-cyan-main/10' : 'bg-cyan-light/20' 
                  : 'hover:bg-cyan-light/10'
              }`}
            >
              {({ isActive }) => (
                <>
                  <span className={`font-sans font-black text-lg transition-colors ${
                    isActive 
                      ? 'text-cyan-main' 
                      : isLateNightMode ? 'text-cyan-light/60 group-hover:text-cyan-main' : 'text-cyan-dark/80 group-hover:text-cyan-main'
                  }`}>
                    {item.display}
                  </span>
                  {language === 'zh' && (
                    <span className={`font-sans font-bold text-[10px] uppercase tracking-widest transition-colors -mt-1 ${isActive ? 'text-yellow-main' : 'text-cyan-dark/40 group-hover:text-yellow-main'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      {item.en}
                    </span>
                  )}
                  <motion.span 
                    layoutId="nav-underline"
                    className={`absolute -bottom-1 left-4 right-4 h-1.5 bg-yellow-main rounded-full transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  ></motion.span>
                </>
              )}
            </NavLink>
          ))}

          <div className="flex items-center gap-4 ml-4">
            {/* Night mode Toggle Button */}
            <button
              onClick={() => { playClick(); toggleLateNightMode(); }}
              onMouseEnter={playHover}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors border ${
                isLateNightMode 
                  ? 'bg-cyan-main/20 text-yellow-main border-yellow-main/20' 
                  : 'bg-cyan-light/30 text-cyan-dark border-cyan-main/20'
              }`}
              title="Toggle Night Mode"
            >
              {isLateNightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span className="font-sans font-bold text-xs uppercase tracking-widest">
                {isLateNightMode ? t("深夜", "NIGHT") : t("日间", "DAY")}
              </span>
            </button>

            {/* Language Switch Button */}
            <button
              onClick={() => {
                playClick();
                toggleLanguage();
              }}
              onMouseEnter={playHover}
              className={`flex items-center justify-center p-2 rounded-full transition-colors border ${
                isLateNightMode 
                  ? 'bg-cyan-main/20 text-cyan-light border-cyan-main/20' 
                  : 'bg-cyan-light/30 text-cyan-dark border-cyan-main/20'
              }`}
              title="Toggle Language"
            >
              <Languages className="w-5 h-5" />
              <span className="ml-1 font-sans font-black text-xs uppercase">{language === 'zh' ? 'EN' : '中'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4 relative z-[120]">
          <button
            onClick={() => { playClick(); toggleLanguage(); }}
            className={`p-2 rounded-full ${isLateNightMode ? 'bg-cyan-main/20 text-cyan-light' : 'bg-cyan-light/30 text-cyan-dark'}`}
          >
            <Languages className="w-5 h-5" />
          </button>
          <button
            onClick={toggleMobileMenu}
            onMouseEnter={playHover}
            className={`p-2 rounded-full ${isLateNightMode ? 'bg-cyan-main/20 text-cyan-light' : 'bg-cyan-light/40 text-cyan-dark'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] bg-white flex flex-col items-center justify-start md:hidden p-8 pt-28"
          >
            {/* Background Decorative Patterns */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#00BCD4 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            {/* Social Icons Quick Access - NEW SECTION */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-6 mb-10 relative z-10"
            >
              {[
                { icon: Github, link: CONTACT_INFO.github, color: '#006064' },
                { icon: Tv, link: CONTACT_INFO.bilibili, color: '#fb7299' },
                { icon: Gamepad2, link: CONTACT_INFO.itch, color: '#fa5c5c' },
                { icon: Globe, link: CONTACT_INFO.blog, color: '#00BCD4' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-cyan-main/10 shadow-md transition-all hover:border-cyan-main/30"
                  style={{ color: social.color }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            <div className="flex flex-col items-center gap-4 w-full relative z-10 max-w-sm">
              {currentNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => { playClick(); setIsMobileMenuOpen(false); }}
                  className={({ isActive }) => `flex flex-col items-center gap-1 p-4 w-full rounded-2xl border-2 transition-all ${
                    isActive 
                    ? 'bg-white border-cyan-main shadow-lg scale-[1.02]' 
                    : 'bg-white border-cyan-light/20 shadow-sm hover:border-cyan-main/20'
                  }`}
                >
                  {({ isActive }) => (
                    <>
                      <span className={`font-sans font-black text-2xl ${isActive ? 'text-cyan-main' : 'text-cyan-dark'}`}>{item.display}</span>
                      {language === 'zh' && (
                        <span className="font-sans font-bold text-[10px] uppercase tracking-[0.25em] text-cyan-dark/30">{item.en}</span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-6 relative z-10 w-full max-w-sm">
              <button
                onClick={() => { playClick(); toggleLateNightMode(); }}
                className="flex flex-1 items-center justify-center gap-3 px-8 py-4 rounded-3xl bg-white text-cyan-dark border-2 border-cyan-main/20 font-black shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                {isLateNightMode ? <Moon className="w-5 h-5 text-yellow-main" /> : <Sun className="w-5 h-5 text-yellow-main" />}
                <span>{isLateNightMode ? t("深夜模式", "NIGHT MODE") : t("日间模式", "DAY MODE")}</span>
              </button>
            </div>

            <footer className="mt-auto pb-10 text-cyan-dark/30 font-black text-[10px] tracking-widest uppercase">
              ✤ {language === 'zh' ? '桂花拉糕' : 'MOKU KEKI'} PORTFOLIO ✤
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
