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
    zh: "你好，冒险者！欢迎来到我的个人存档。我是 moku，一名正在不断寻找“新手村”出口的游戏开发者。你想通过哪种方式了解我？",
    en: "Hello, Adventurer! Welcome to my archive. I'm moku, a game developer still looking for the 'Noob Village' exit. How would you like to explore my profile?",
    choices: [
      { zh: "查看技能面板", en: "Check Skill Boons", nextNode: "start" },
      { zh: "了解我的故事", en: "Learn my story", nextNode: "journey" },
    ]
  },
  start: {
    zh: "在这个存档里，我记录了自己从零开始的学习历程。无论是底层架构还是视觉表现，我都以此为乐。",
    en: "In this archive, I've recorded my learning journey from scratch. Whether it's architecture or visuals, I find joy in both.",
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
  const { language } = useLanguage();
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
    <div className="w-full min-h-[600px] flex flex-col items-center justify-start pt-12 lg:pt-20 p-4 relative">
      
      <div className="flex flex-col items-center justify-between w-full h-full gap-4 max-w-5xl relative">
        
        {/* Character Portrait Layer */}
        <div className="flex-1 w-full flex items-center justify-center relative min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNodeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] -mb-24 lg:-mb-32"
            >
              <img 
                src="/avatar.png" 
                alt="Avatar" 
                className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(2,132,199,0.1)]" 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Choices - Flat Style & Centered */}
        {!isTyping && currentNode.choices && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-40 pointer-events-none pb-32">
            <AnimatePresence>
              {currentNode.choices.map((choice, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={playHover}
                  onClick={() => handleChoice(choice.nextNode)}
                  className="pointer-events-auto px-10 py-3 bg-white border-2 border-cyan-main hover:bg-cyan-main hover:text-white rounded-xl text-base font-black text-cyan-dark transition-all flex items-center gap-4 group/choice shadow-md min-w-[280px] justify-center"
                >
                  <ChevronRight className="w-5 h-5 text-cyan-main group-hover/choice:text-white transition-colors" />
                  {language === 'zh' ? choice.zh : choice.en}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* AVG Dialogue Box - More Compact & Higher Up */}
        <div className="w-full pb-8 relative z-30 max-w-4xl -mt-24 lg:-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white rounded-2xl border-2 border-cyan-main p-5 md:p-6 flex flex-col gap-1 shadow-lg relative"
          >
            {/* Name Box */}
            <div className="absolute -top-3.5 left-8 px-4 py-1 bg-cyan-dark rounded-lg border-2 border-cyan-main shadow-md">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">moku</span>
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
