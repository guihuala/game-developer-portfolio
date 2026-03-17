import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

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

const dialogueTree: Record<string, DialogueNode> = {
  intro: {
    zh: "你好！欢迎来到我的个人主页。我是 moku，一名热爱挑战且注重细节的游戏开发者。你想从哪个方面开始了解我？",
    en: "Hello! Welcome to my portfolio. I'm moku, a game developer passionate about challenges and detail-oriented design. Where would you like to start?",
    choices: [
      { zh: "查看专长与技能", en: "Skills & Expertise", nextNode: "start" },
      { zh: "了解我的经历", en: "Experience & Story", nextNode: "journey" },
    ]
  },
  start: {
    zh: "在这个空间里，我记录了自己在游戏开发领域的全栈探索。无论是底层的逻辑架构还是最终的视觉呈现，我都有广泛的涉猎。",
    en: "In this space, I've documented my full-stack exploration in game development. I have extensive experience in both logic architecture and visual presentation.",
    choices: [
      { zh: "关于开发历程", en: "Development Journey", nextNode: "journey" },
      { zh: "关于艺术风格", en: "Artistic Style", nextNode: "art" },
      { zh: "关于未来愿景", en: "Future Vision", nextNode: "vision" },
    ]
  },
  journey: {
    zh: "在多项开发项目中，我担任过主制作人、主程序及美术设计。我热衷于用底层逻辑构建上层创意。",
    en: "In various projects, I've served as lead producer, lead programmer, and art designer. I love building art with logic.",
    choices: [
      { zh: "还有呢？", en: "Tell me more", nextNode: "journey_2" },
      { zh: "换个话题", en: "Other topics", nextNode: "start" }
    ]
  },
  journey_2: {
    zh: "我擅长搞定从系统架构到视觉表现的所有环节。对我来说，开发不仅仅是写代码，更是创造世界。",
    en: "I handle everything from architecture to visuals. To me, dev isn't just coding—it's world building.",
    choices: [{ zh: "回到主菜单", en: "Back to menu", nextNode: "start" }]
  },
  art: {
    zh: "在美术方面，我跨越了 3D 建模、Spine 动画到像素插画。我喜欢用定制 Shader 打造独特的氛围。",
    en: "In art, I span 3D modeling, Spine animation, and pixel art. I love using custom Shaders for atmosphere.",
    choices: [{ zh: "听起来很酷", en: "Sounds cool!", nextNode: "start" }]
  },
  vision: {
    zh: "我的目标是构建能启发灵感并连接彼此的虚拟体验。这也是我不断探索新技术的原因。",
    en: "My goal is to build virtual experiences that inspire and connect. That's why I keep exploring new tech.",
    choices: [{ zh: "加油！", en: "Keep it up!", nextNode: "start" }]
  }
};

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
    <div className="w-full min-h-[600px] flex flex-col items-center justify-start pt-12 lg:pt-20 p-4 relative overflow-hidden">
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
        <div className="flex-1 w-full flex items-center justify-center relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNodeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] lg:w-[650px] lg:h-[650px] -mb-8 sm:-mb-16 lg:-mb-24"
            >
              <img 
                src="/avatar.webp" 
                alt="Avatar" 
                className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(2,132,199,0.1)]" 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Choices - Flat Style & Centered */}
        {!isTyping && currentNode.choices && (
          <div className="absolute inset-0 flex flex-col items-end justify-center gap-3 z-40 pointer-events-none pb-32 sm:pb-40 pr-6 sm:pr-10 lg:pr-8">
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
        <div className="w-full pb-6 lg:pb-10 relative z-30 max-w-5xl -mt-16 sm:-mt-24 lg:-mt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white rounded-3xl border-2 border-cyan-main p-6 sm:p-8 lg:p-10 flex flex-col gap-1 shadow-2xl relative"
          >
            {/* Name Box */}
            <div className="absolute -top-3.5 left-8 px-4 py-1 bg-cyan-dark rounded-lg border-2 border-cyan-main shadow-md">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">{t("桂花拉糕", "moku")}</span>
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
