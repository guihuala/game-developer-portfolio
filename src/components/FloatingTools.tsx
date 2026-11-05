import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Home, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { CONTACT_INFO } from '../constants/contactInfo';
import { OsmanthusMark } from './StudioOrnament';

export const FloatingTools = () => {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const { pathname, key } = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { isLateNightMode, toggleLateNightMode } = useSettings();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [open]);
  return <div className="floating-tools" ref={root} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button ref={trigger} className="tools-trigger" aria-expanded={open} aria-controls="studio-tools" aria-label={t('导航与设置', 'Navigation and settings')} aria-describedby={open ? undefined : 'tools-hint'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <OsmanthusMark />}</button>
    {!open && <span role="tooltip" id="tools-hint" className="tools-hint">{t('导航与设置', 'Navigation & settings')}</span>}
    {open && <div id="studio-tools" className="tools-popover">
      <div className="tools-heading"><strong>moku<span>.</span></strong><small>{t('桂花拉糕', 'mokukeki')}</small></div>
      <nav aria-label={t('页面导航', 'Page navigation')}>
        {pathname !== '/' && <button onClick={() => key === 'default' ? navigate('/') : navigate(-1)}><ArrowLeft size={17} />{t('返回上一页', 'Go back')}</button>}
        <Link to="/"><Home size={17} />{t('主页', 'Home')}</Link>
        <Link to="/about">{t('关于我', 'About me')}<ArrowUpRight size={16} /></Link>
        <Link to="/experience">{t('经历', 'Experience')}<ArrowUpRight size={16} /></Link>
      </nav>
      <div className="tools-settings"><button onClick={toggleLateNightMode} aria-pressed={isLateNightMode}>{isLateNightMode ? <Moon size={17} /> : <Sun size={17} />}{t('明暗模式', 'Theme')}</button><button onClick={toggleLanguage}>{language === 'zh' ? 'English' : '中文'}</button></div>
      <div className="tools-social"><a href={`mailto:${CONTACT_INFO.email}`}>{t('联系我', 'Email')} ↗</a><a href={CONTACT_INFO.itch} target="_blank" rel="noreferrer">itch.io ↗</a><a href={CONTACT_INFO.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>
      <small className="tools-copyright">© {new Date().getFullYear()} MOKUKEKI</small>
    </div>}
  </div>;
};
