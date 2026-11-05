import React from 'react';
import { Moon, Sun, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { CONTACT_INFO } from '../constants/contactInfo';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLateNightMode, toggleLateNightMode } = useSettings();
  return (
    <header className="atelier-header">
      <div className="atelier-identity">
        {location.pathname !== '/' && <button className="page-back" onClick={() => location.key === 'default' ? navigate('/') : navigate(-1)} aria-label={t('返回上一页', 'Go back')} title={t('返回', 'Back')}><ArrowLeft size={22} aria-hidden="true" /></button>}
      <Link to="/" className="atelier-brand" aria-label={t('桂花拉糕 · 主页', 'Mokukeki · Home')}><span className="brand-flower" aria-hidden="true">✤</span><span>moku<span className="brand-dot">.</span><small>{t('桂花拉糕', 'mokukeki')}</small></span></Link>
      </div>
      <div className="atelier-utilities"><a className="atelier-contact" href={`mailto:${CONTACT_INFO.email}`}>{t('联系我', 'Contact')}<ArrowUpRight size={14} aria-hidden="true" /></a><button onClick={toggleLateNightMode} aria-label={t('切换明暗模式', 'Toggle color theme')}>{isLateNightMode ? <Moon size={16} /> : <Sun size={16} />}</button><button onClick={toggleLanguage} aria-label={t('Switch to English', '切换为中文')}>{language === 'zh' ? 'EN' : '中'}</button></div>
    </header>
  );
};
