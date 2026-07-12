import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { siteContent } from '../content/siteContent';

interface Choice {
  zh: string;
  en: string;
  nextNode: string;
}

interface DialogueNode {
  zh: string;
  en: string;
  choices?: Choice[];
  portrait?: string;
}

const dialogueTree = siteContent.personalIntro.dialogue as unknown as Record<string, DialogueNode>;

export const PersonalIntro: React.FC = () => {
  const { language, t } = useLanguage();
  const { playHover, playClick } = useSoundEffects();
  const [currentNodeId, setCurrentNodeId] = useState("intro");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const currentNode = dialogueTree[currentNodeId];
  const currentText = language === 'zh' ? currentNode.zh : currentNode.en;

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(currentText.slice(0, i + 1));
      i++;
      if (i >= currentText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [currentNodeId, language, currentText]);

  const handleChoice = (nextNode: string) => {
    playClick();
    setCurrentNodeId(nextNode);
  };

  return (
    <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-start p-2 md:p-4 relative overflow-hidden">
      {/* Background Bottom Patterns (底纹) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, #00BCD4 1px, transparent 0)',
          backgroundSize: '32px 32px' 
        }} 
      />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #00BCD4, #00BCD4 1px, transparent 1px, transparent 10px)'
        }}
      />



      <div className="flex flex-col items-center justify-between w-full h-full gap-4 max-w-6xl relative">
        {/* HUD Corners for the whole area */}
        <div className="absolute -inset-4 pointer-events-none hidden lg:block">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-main/20"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-main/20"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-main/20"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-main/20"></div>
        </div>
        
        {/* Character Portrait Layer */}
        <div className="flex-1 w-full flex items-center justify-center relative min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNodeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-64 h-64 md:w-[360px] md:h-[360px] lg:w-[430px] lg:h-[430px] -mb-8 md:-mb-12"
            >
              <img 
                src={siteContent.assets.avatar}
                alt="Avatar" 
                className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(2,132,199,0.1)]" 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Choices - Flat Style & Centered */}
        {!isTyping && currentNode.choices && (
          <div className="absolute inset-0 flex flex-col items-end justify-center gap-2 z-40 pointer-events-none pb-24 pr-2 md:pr-8">
            <AnimatePresence>
              {currentNode.choices.map((choice, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={playHover}
                  onClick={() => handleChoice(choice.nextNode)}
                  className="pointer-events-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-white/90 backdrop-blur-md border-2 border-cyan-main hover:bg-cyan-main hover:text-white rounded-xl text-sm sm:text-base font-black text-cyan-dark transition-all flex items-center gap-3 group/choice shadow-xl min-w-[200px] sm:min-w-[260px] justify-end"
                >
                  <span className="text-right">{language === 'zh' ? choice.zh : choice.en}</span>
                  <ChevronRight className="w-4 h-4 text-cyan-main group-hover/choice:text-white transition-colors" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* AVG Dialogue Box - More Impactful Scale */}
        <div className="w-full pb-2 relative z-30 max-w-4xl -mt-12 md:-mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white rounded-2xl border-2 border-cyan-main p-5 md:p-6 flex flex-col gap-1 shadow-sm relative"
          >
            {/* Name Box */}
            <div className="absolute -top-3.5 left-8 px-4 py-1 bg-cyan-dark rounded-lg border-2 border-cyan-main shadow-md">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">{siteContent.personalIntro.speaker[language]}</span>
            </div>

            <div className="flex-1 flex flex-col justify-center min-h-[2rem]">
              <p className="text-cyan-dark text-base lg:text-lg font-bold leading-snug font-sans">
                {displayedText}
                {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-cyan-main animate-pulse" />}
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
