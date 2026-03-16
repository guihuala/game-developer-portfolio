import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PersonalIntro } from '../components/PersonalIntro';
import { PhilosophyGallery } from '../components/PhilosophyGallery';
import { Skills } from '../components/Skills';
import { NextModuleLink } from '../components/NextModuleLink';
import { User, Image as ImageIcon, Box } from 'lucide-react';

const tabs = [
  { id: 'intro', label: '自我介绍', enLabel: 'Intro', icon: User, Component: PersonalIntro },
  { id: 'philosophy', label: '创作理念', enLabel: 'Philosophy', icon: ImageIcon, Component: PhilosophyGallery },
  { id: 'skills', label: '专业技能', enLabel: 'Skills', icon: Box, Component: Skills },
];

export const About: React.FC = () => {
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
    <div className="pt-24 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-6 flex-1 flex flex-col">
        
        {/* Header & Tabs */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black font-sans text-cyan-dark mb-8 uppercase tracking-tighter">
            关于<span className="text-cyan-main">我</span>
          </h2>
          
          <div className="flex bg-white/50 backdrop-blur-md p-2 rounded-full shadow-sm border border-cyan-light w-full max-w-3xl overflow-x-auto no-scrollbar justify-between">
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
                    {tab.label}
                  </span>
                  <span className="relative z-10 text-[10px] uppercase font-bold tracking-widest opacity-60 mt-1">
                    {tab.enLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Slider Area */}
        <div className="relative w-full flex-1 min-h-[600px] overflow-hidden rounded-[3rem] bg-white/30 backdrop-blur-sm border-2 border-white shadow-xl flex flex-col items-center justify-center mb-8">
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
              className="absolute inset-0 w-full h-full p-4 lg:p-8 flex items-center justify-center"
            >
              <div className="w-full h-full max-w-5xl relative">
                <ActiveComponent />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <NextModuleLink to="/works" zhText="作品集" enText="Works" />
    </div>
  );
};
