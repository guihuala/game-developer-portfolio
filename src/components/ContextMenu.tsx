import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon,
  Sun,
  Volume2, 
  VolumeX, 
  Languages, 
  Plus, 
  Minus,
  Home,
  Briefcase,
  User,
  ArrowUp,
  X,
  UserPlus,
  Mail,
  Github,
  Twitter
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { CONTACT_INFO } from '../constants/contactInfo';

export const ContextMenu: React.FC = () => {
  const { 
    isLateNightMode,
    toggleLateNightMode,
    audioEnabled, 
    toggleAudio 
  } = useSettings();
  const { language, toggleLanguage, t } = useLanguage();
  const { playHover, playClick, playSuccess } = useSoundEffects();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setVisible(true);
      
      let x = e.clientX;
      let y = e.clientY;
      const menuWidth = 240;
      const menuHeight = 400;

      if (x + menuWidth > window.innerWidth) x -= menuWidth;
      if (y + menuHeight > window.innerHeight) y -= menuHeight;

      setPosition({ x, y });
      playClick();
    };

    const handleClick = () => setVisible(false);
    const handleScroll = () => {
      setVisible(false);
      setShowContactModal(false);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [playClick]);

  const menuItems = [
    { 
      label: t("返回顶部", "Back to Top"), 
      icon: ArrowUp, 
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) 
    },
    { 
      label: t("召唤开发者", "Summon Developer"), 
      icon: UserPlus, 
      onClick: () => {
        setShowContactModal(true);
        playSuccess();
      }
    },
    { 
      label: t("导航至主页", "Go to Home"), 
      icon: Home, 
      onClick: () => navigate('/') 
    },
    { 
      label: t("查看作品", "View Works"), 
      icon: Briefcase, 
      onClick: () => navigate('/works') 
    },
  ];

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed z-[9999] w-60 border-2 shadow-2xl overflow-hidden rounded-xl py-2 ${
              isLateNightMode ? 'bg-[#0A1A1F] border-cyan-main text-white' : 'bg-white border-cyan-main text-cyan-dark'
            }`}
            style={{ left: position.x, top: position.y }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`px-4 py-2 border-b-2 border-cyan-main/5 mb-2 flex justify-between items-center ${isLateNightMode ? 'bg-cyan-main/10' : 'bg-cyan-main/5'}`}>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-main">Protocol Menu</span>
              <X className="w-3 h-3 text-cyan-dark/20 cursor-pointer" onClick={() => setVisible(false)} />
            </div>

            {/* Quick Nav */}
            <div className="flex flex-col mb-2">
              {menuItems.map((item, i) => (
                <button
                  key={i}
                  onMouseEnter={playHover}
                  onClick={() => { item.onClick(); setVisible(false); }}
                  className={`flex items-center gap-3 px-4 py-2.5 hover:bg-cyan-main hover:text-white transition-all text-sm font-black italic tracking-tight ${
                    isLateNightMode ? 'text-cyan-light' : 'text-cyan-dark'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mx-2 border-t-2 border-cyan-main/5 pt-2 mb-2" />

            {/* Settings Section */}
            <div className="flex flex-col gap-1">
              <button
                onMouseEnter={playHover}
                onClick={(e) => { e.stopPropagation(); playClick(); toggleLateNightMode(); }}
                className={`flex items-center justify-between px-4 py-2.5 hover:bg-cyan-light/20 transition-all text-sm font-black ${
                  isLateNightMode ? 'text-cyan-light' : 'text-cyan-dark'
                }`}
              >
                <div className="flex items-center gap-3 italic">
                  <Moon className={`w-4 h-4 ${isLateNightMode ? 'text-yellow-main' : 'text-cyan-dark/30'}`} />
                  <span>{t("深夜模式", "Late Night")}</span>
                </div>
                <span className="text-[10px] font-black uppercase text-cyan-main tracking-widest">{isLateNightMode ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onMouseEnter={playHover}
                onClick={(e) => { e.stopPropagation(); playClick(); toggleAudio(); }}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-cyan-light/20 text-cyan-dark transition-all text-sm font-black"
              >
                <div className="flex items-center gap-3 italic">
                  {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-main" /> : <VolumeX className="w-4 h-4 text-cyan-dark/30" />}
                  <span>音频反馈</span>
                </div>
                <span className="text-[10px] font-black uppercase text-cyan-main tracking-widest">{audioEnabled ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onMouseEnter={playHover}
                onClick={(e) => { e.stopPropagation(); playClick(); toggleLanguage(); }}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-cyan-light/20 text-cyan-dark transition-all text-sm font-black"
              >
                <div className="flex items-center gap-3 italic">
                  <Languages className="w-4 h-4 text-cyan-main" />
                  <span>语言切换</span>
                </div>
                <span className="text-[10px] font-black uppercase text-cyan-main tracking-widest">{language === 'zh' ? 'EN' : 'ZH'}</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-2 px-4 py-2 border-t-2 border-cyan-main/5 text-[8px] font-black text-cyan-dark/20 uppercase tracking-[0.3em] flex justify-between italic">
              <span>MOKU.PROTOCOL</span>
              <span>V2.4.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white border-8 border-cyan-main shadow-2xl rounded-[3rem] overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-cyan-dark uppercase tracking-tighter italic">Summon</h2>
                    <p className="text-cyan-main font-black text-xs uppercase tracking-widest">The Developer</p>
                  </div>
                  <button 
                    onClick={() => setShowContactModal(false)}
                    className="w-10 h-10 rounded-full bg-cyan-light/20 flex items-center justify-center text-cyan-dark hover:bg-cyan-main hover:text-white transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  <a href={`mailto:${CONTACT_INFO.email}`} className="group cursor-pointer bg-cyan-light/10 p-4 rounded-2xl border-2 border-transparent hover:border-cyan-main hover:bg-white transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-main rounded-xl flex items-center justify-center text-white shadow-md">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-cyan-dark/40 uppercase tracking-widest leading-none mb-1">Send a Message</p>
                        <p className="text-sm font-black text-cyan-dark">{CONTACT_INFO.email}</p>
                      </div>
                    </div>
                  </a>

                  <div className="flex gap-4">
                    <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center bg-cyan-light/10 p-4 rounded-3xl gap-2 hover:bg-cyan-main hover:text-white transition-all group border-2 border-transparent hover:border-cyan-main">
                      <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Github</span>
                    </a>
                    <a href={CONTACT_INFO.twitter} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center bg-cyan-light/10 p-4 rounded-3xl gap-2 hover:bg-cyan-main hover:text-white transition-all group border-2 border-transparent hover:border-cyan-main">
                      <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Twitter</span>
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t-2 border-cyan-light/20 text-center">
                  <p className="text-xs font-bold text-cyan-dark/40 italic">"Waiting for your quest invitation."</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
