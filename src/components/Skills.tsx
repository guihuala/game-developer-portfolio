import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, PenTool, LayoutTemplate, Trophy, Shield, Zap, Sparkles, Swords, Crown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface Boon {
  id: string;
  name: string;
  enName: string;
  god: string;
  enGod: string;
  icon: any;
  desc: string;
  enDesc: string;
  flavor: string;
  enFlavor: string;
}

const boons: Boon[] = [
  {
    id: 'programming',
    name: "核心引擎架构",
    enName: "Core Engine Architecture",
    god: "客户端开发",
    enGod: "Frontend/Client",
    icon: Gamepad2,
    desc: "精通 Unity 引擎与 C# 核心开发，具备构建高性能商业级游戏框架、多线程逻辑处理及自定义渲染管线（URP）的能力。",
    enDesc: "Proficient in Unity & C# core, capable of building high-performance frameworks, multi-threaded logic, and custom SRPs.",
    flavor: "“以底层架构支撑上层创意，用代码编织稳定的世界基石。”",
    enFlavor: "\"Supporting creativity with solid architecture; weaving worlds with code.\""
  },
  {
    id: 'art',
    name: "视觉艺术表现",
    enName: "Visual Arts & Animation",
    god: "美术设计",
    enGod: "Technical Art",
    icon: PenTool,
    desc: "横跨 3D 建模、Spine 2D 骨骼动画与 HLSL 着色器。擅长通过技术手段提升视觉品质，打造独特的风格化艺术效果。",
    enDesc: "Spanning 3D modeling, Spine animation, and HLSL shaders. Enhancing visual quality through technical expertise.",
    flavor: "“在理性的技术边界内，释放感性的视觉张力。”",
    enFlavor: "\"Unleashing visual tension within the boundaries of technical logic.\""
  },
  {
    id: 'design',
    name: "系统与关卡机制",
    enName: "Systems & Level Design",
    god: "玩法逻辑",
    enGod: "Gameplay Design",
    icon: LayoutTemplate,
    desc: "深度洞察游戏性设计，负责复杂系统机制的数值模型搭建与玩法逻辑闭环，确保存档、交互等全系统的高效协同。",
    enDesc: "In-depth insight into game design, in charge of numerical models, gameplay loops, and system coordination.",
    flavor: "“严谨的规则是自由交互的前提，合理的逻辑是乐趣的源泉。”",
    enFlavor: "\"Rigorous rules enable freedom; logical flow fosters fun.\""
  },
  {
    id: 'leadership',
    name: "项目全周期管理",
    enName: "Project Lifecycle Management",
    god: "制作人职能",
    enGod: "Production",
    icon: Trophy,
    desc: "具备从立项原型到上线运营的全周期管理经验。高效协调跨部门沟通，确保游戏在核心创意与技术落地之间达成完美平衡。",
    enDesc: "Experience across the full project lifecycle. Coordinating cross-dept communication to balance vision and tech.",
    flavor: "“统筹全局，确保每一行代码、每一张画稿都服务于最终的体验。”",
    enFlavor: "\"Orchestrating every asset and line of code for a unified player experience.\""
  }
];

export const Skills: React.FC = () => {
  const { language, t } = useLanguage();
  const { playHover, playClick } = useSoundEffects();
  const [activeBoon, setActiveBoon] = useState(boons[0]);

  return (
    <div className="w-full h-full p-4 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Ornate Lines - Simplified & Flat */}
      <div className="absolute inset-0 border-[16px] border-cyan-main/5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-32 bg-cyan-main/20" />

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12 z-10">
        
        {/* Left: Boon Selector (Vertical List of Icons) */}
        <div className="flex lg:flex-col gap-6 items-center justify-center shrink-0">
          {boons.map((boon) => {
            const isActive = activeBoon.id === boon.id;
            return (
              <motion.button
                key={boon.id}
                onMouseEnter={() => { playHover(); setActiveBoon(boon); }}
                onClick={playClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all border-2 ${
                  isActive ? 'bg-white border-cyan-main shadow-md' : 'bg-cyan-dark/10 border-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:bg-white'
                }`}
              >
                <boon.icon className={`w-8 h-8 md:w-10 md:h-10 ${isActive ? 'text-cyan-dark' : 'text-cyan-main'}`} />
                {isActive && (
                  <motion.div 
                    layoutId="boon-active-indicator"
                    className="absolute inset-x-0 -bottom-8 flex justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-main" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right: Boon Inspection Panel - Flat Style */}
        <div className="flex-1 min-h-[480px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBoon.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl border-2 border-cyan-main p-8 lg:p-12 shadow-sm flex flex-col h-full relative"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-[0.3em] uppercase text-cyan-main">
                    {language === 'zh' ? activeBoon.god : activeBoon.enGod}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Crown className="w-6 h-6 text-cyan-main" />
                </div>
              </div>

              {/* Title Section */}
              <div className="mb-10">
                <h2 className="text-3xl lg:text-6xl font-black text-cyan-dark italic tracking-tight">
                  {language === 'zh' ? activeBoon.name : activeBoon.enName}
                </h2>
                <div className="h-1.5 w-24 bg-cyan-main mt-4 rounded-full" />
              </div>

              {/* Description Section */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xl lg:text-2xl text-cyan-dark font-black leading-relaxed">
                  {language === 'zh' ? activeBoon.desc : activeBoon.enDesc}
                </p>
              </div>

              {/* Flavor Text Footer */}
              <div className="mt-8 pt-8 border-t-2 border-cyan-main/10 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Swords className="w-4 h-4 text-cyan-main/30" />
                  <p className="text-cyan-dark/40 text-sm italic font-black">
                    {language === 'zh' ? activeBoon.flavor : activeBoon.enFlavor}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Background Decorative Text - Unified Color */}
      <div className="absolute -bottom-10 left-0 text-[15vh] font-black text-cyan-main/[0.03] uppercase pointer-events-none whitespace-nowrap select-none italic">
         TECHNICAL ARCHIVE // MOKU.DEV
      </div>
    </div>
  );
};
