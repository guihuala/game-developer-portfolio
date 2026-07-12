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
    <div id="about-me" className="pt-20 lg:pt-24 min-h-screen lg:h-screen lg:overflow-hidden">
      <SEO 
        title="About Me" 
        description="Learn more about Mokukeki's background as a game developer, design philosophy, and technical skill set."
      />
      <div className="max-w-7xl mx-auto w-full h-full px-4 md:px-6 pb-4 lg:pb-8 flex flex-col lg:flex-row gap-4 lg:gap-10">
        
        {/* Header & Tabs */}
        <aside className="flex lg:w-52 xl:w-60 lg:shrink-0 flex-col items-center lg:items-start lg:pt-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-sans text-cyan-dark mb-4 lg:mb-10 uppercase tracking-tighter">
            {t("关于", "ABOUT")}<span className="text-cyan-main">{t("我", "ME")}</span>
          </h2>
          
          <nav className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-col gap-2 w-full max-w-2xl lg:max-w-none" aria-label={t('关于我分类', 'About sections')}>
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(index, tab.id)}
                  className={`relative flex items-center lg:justify-start justify-center py-3 px-4 rounded-xl transition-colors duration-300 ${
                    isActive ? "text-cyan-dark" : "text-cyan-dark/50 hover:text-cyan-main"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBubble"
                      className="absolute inset-0 bg-cyan-light rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-3 font-black text-sm md:text-base">
                    <Icon className="w-5 h-5" />
                    {language === 'zh' ? tab.label : tab.enLabel}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="relative w-full flex-1 min-h-[520px] lg:min-h-0 lg:h-full flex flex-col overflow-hidden">
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
              <div className="w-full h-full p-2 md:p-4 overflow-hidden">
                <ActiveComponent />
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};
