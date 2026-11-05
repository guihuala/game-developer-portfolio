import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { isLateNightMode, toggleLateNightMode } = useSettings();
  const items = [
    { path: '/', zh: '主页', en: 'Home' },
    { path: '/works', zh: '作品', en: 'Works' },
    { path: '/about', zh: '关于我', en: 'About' },
    { path: '/experience', zh: '经历', en: 'Experience' },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-cyan-main/10 backdrop-blur-lg ${isLateNightMode ? 'bg-[#0A1A1F]/95' : 'bg-white/90'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-wrap md:flex-nowrap items-center justify-between gap-x-6">
        <Link to="/" className="py-4 md:py-6 text-lg font-black text-cyan-dark">{t('桂花拉糕', 'mokukeki')}</Link>
        <nav aria-label={t('主导航', 'Main navigation')} className="order-last md:order-none w-full md:w-auto flex justify-between md:gap-7 pb-3 md:pb-0 text-sm">
          {items.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => `py-1 transition-colors ${isActive ? 'font-bold text-cyan-dark underline underline-offset-8 decoration-yellow-main decoration-2' : 'text-cyan-dark/70 hover:text-cyan-main'}`}>
              {item[language]}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleLateNightMode} aria-label={t('切换明暗模式', 'Toggle color theme')} className="w-11 h-11 flex items-center justify-center text-cyan-dark rounded-lg hover:bg-cyan-light/50">
            {isLateNightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button onClick={toggleLanguage} aria-label={t('Switch to English', '切换为中文')} className="min-w-11 h-11 text-sm font-bold text-cyan-dark rounded-lg hover:bg-cyan-light/50">{language === 'zh' ? 'EN' : '中'}</button>
        </div>
      </div>
    </header>
  );
};
