import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { PersonalIntro } from '../components/PersonalIntro';
import { PhilosophyGallery } from '../components/PhilosophyGallery';
import { Skills } from '../components/Skills';
import { ArtWorks } from '../components/ArtWorks';
import { User, Image as ImageIcon, Box, Palette } from 'lucide-react';
import { SEO } from '../components/SEO';

const tabs = [
  { id: 'intro', label: '自我介绍', enLabel: 'Intro', icon: User, Component: PersonalIntro },
  { id: 'gaming', label: '游戏经历', enLabel: 'Gaming', icon: ImageIcon, Component: PhilosophyGallery },
  { id: 'skills', label: '专业技能', enLabel: 'Skills', icon: Box, Component: Skills },
  { id: 'gallery', label: '美术作品', enLabel: 'Artworks', icon: Palette, Component: ArtWorks },
];

export const About: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
  const ActiveComponent = tabs[activeIndex].Component;

  // Track previous tab to decide sliding direction
  const [prevIndex, setPrevIndex] = useState(0);
  const direction = activeIndex > prevIndex ? 1 : -1;

  const handleTabChange = (index: number, id: string) => {
    setPrevIndex(activeIndex);
    setActiveTab(id);
  };

  return (
    <div id="about-me" className="pt-24 min-h-screen flex flex-col">
      <SEO 
        title="About Me" 
        description="Learn more about Mokukeki's background as a game developer, design philosophy, and technical skill set."
      />
      <div className="max-w-6xl mx-auto w-full px-6 flex-1 flex flex-col">
        
        {/* Header & Tabs */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-4xl md:text-5xl font-black font-sans text-cyan-dark mb-8 uppercase tracking-tighter">
            {t("关于", "ABOUT")}<span className="text-cyan-main">{t("我", "ME")}</span>
          </h2>
          
          <div className="grid grid-cols-4 md:flex md:flex-row gap-2 mb-6 p-2 bg-white/50 backdrop-blur-md rounded-[2.5rem] border-2 border-cyan-light/30 shadow-inner max-w-fit mx-auto overflow-x-auto no-scrollbar justify-between">
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(index, tab.id)}
                  className={`relative flex-1 flex flex-col items-center justify-center py-4 px-6 rounded-full transition-colors duration-300 min-w-[120px] ${
                    isActive ? "text-cyan-dark" : "text-cyan-dark/50 hover:text-cyan-main"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBubble"
                      className="absolute inset-0 bg-white shadow-md rounded-full border-2 border-cyan-light"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2 font-black text-lg">
                    <Icon className="w-5 h-5" />
                    {language === 'zh' ? tab.label : tab.enLabel}
                  </span>
                  <span className="relative z-10 text-[10px] uppercase font-bold tracking-widest opacity-60 mt-1">
                    {language === 'zh' ? tab.enLabel : tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative w-full flex-1 min-h-[300px] lg:min-h-[400px] rounded-[2rem] lg:rounded-[3rem] bg-white/30 backdrop-blur-sm border-2 border-white shadow-xl flex flex-col mb-4 overflow-hidden">
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <div className="w-full p-4 md:p-6 lg:p-10 overflow-y-auto max-h-full">
                <ActiveComponent />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
