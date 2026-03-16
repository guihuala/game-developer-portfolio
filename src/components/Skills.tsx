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
    name: "编程能力",
    enName: "Programming & Engineering",
    god: "开发核心",
    enGod: "Development Core",
    icon: Gamepad2,
    desc: "熟悉 C# 语言与 Unity 引擎，掌握常用 API，具备完整游戏项目开发经验。理解面向对象编程理念，能编写模块化、可维护的代码。",
    enDesc: "Familiar with C# and Unity with mastery of core APIs and full-cycle development experience. Deep understanding of OOP principles for writing modular, maintainable code.",
    flavor: "“理解面向对象编程理念，编写模块化、可维护的代码。”",
    enFlavor: "\"Understanding OOP principles to write modular and maintainable code.\""
  },
  {
    id: 'design',
    name: "游戏设计",
    enName: "Game Design & UX",
    god: "玩法逻辑",
    enGod: "Gameplay & Systems",
    icon: LayoutTemplate,
    desc: "擅长核心机制构建与数值平衡调优；注重玩家交互反馈与 UI/UX 体验。",
    enDesc: "Skilled in core mechanics construction and numerical balance tuning; focused on player interactive feedback and UI/UX experience.",
    flavor: "“注重玩家交互反馈与 UI/UX 体验，构建核心玩法循环。”",
    enFlavor: "\"Focusing on interactive feedback and UI/UX to build engaging gameplay loops.\""
  },
  {
    id: 'art',
    name: "美术技能",
    enName: "Technical Art & Assets",
    god: "视觉表现",
    enGod: "Visual Arts",
    icon: PenTool,
    desc: "具备美术基础，能使用 Photoshop、Krita、Blender 等进行 2D/3D 资源创作和处理。熟悉从资产制作到引擎部署的完整工作流程。",
    enDesc: "Proficient in Photoshop, Krita, and Blender for 2D/3D asset creation. Familiar with the full pipeline from production to engine deployment.",
    flavor: "“熟练掌握从资产制作到引擎部署的完整美术工作流。”",
    enFlavor: "\"Mastering the full art pipeline from asset creation to engine deployment.\""
  },
  {
    id: 'leadership',
    name: "项目管理与协作",
    enName: "Project Management",
    god: "团队执行",
    enGod: "Collaboration",
    icon: Trophy,
    desc: "熟练使用 GitHub 进行版本控制与多人协作，使用 Trello 管理任务进度，具备良好沟通协调能力，能够高效推动项目执行并解决团队协作中的问题。",
    enDesc: "Proficient in GitHub for version control and Trello for task tracking. Strong coordination skills to drive project execution and resolve team challenges.",
    flavor: "“高效推动项目执行，解决协作中的复杂问题。”",
    enFlavor: "\"Efficiently driving project execution and resolving complex collaborative challenges.\""
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
