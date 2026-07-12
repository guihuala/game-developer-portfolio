import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, PenTool, LayoutTemplate, Trophy } from 'lucide-react';
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
  const { language } = useLanguage();
  const { playHover, playClick } = useSoundEffects();
  const [activeBoon, setActiveBoon] = useState(boons[0]);

  return (
    <div className="w-full h-full p-2 md:p-4 lg:p-8 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 lg:gap-10">
        
        {/* Left: Boon Selector (Vertical List of Icons) */}
        <div className="flex lg:flex-col gap-3 items-center justify-center shrink-0">
          {boons.map((boon) => {
            const isActive = activeBoon.id === boon.id;
            return (
              <motion.button
                key={boon.id}
                onMouseEnter={() => { playHover(); setActiveBoon(boon); }}
                onClick={playClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-colors border ${
                  isActive ? 'bg-cyan-light border-cyan-main' : 'border-transparent text-cyan-dark/35 hover:bg-cyan-light/50 hover:text-cyan-main'
                }`}
              >
                <boon.icon className={`w-7 h-7 ${isActive ? 'text-cyan-dark' : ''}`} />
              </motion.button>
            );
          })}
        </div>

        {/* Right: Boon Inspection Panel - Flat Style */}
        <div className="flex-1 min-h-[380px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBoon.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white border-t-2 border-cyan-main p-6 lg:p-10 flex flex-col h-full"
            >
              {/* Header */}
              <div className="mb-5">
                <span className="text-xs font-black tracking-widest uppercase text-cyan-main">
                  {language === 'zh' ? activeBoon.god : activeBoon.enGod}
                </span>
              </div>

              {/* Title Section */}
              <div className="mb-6 lg:mb-8">
                <h2 className="text-3xl md:text-5xl font-black text-cyan-dark tracking-tight">
                  {language === 'zh' ? activeBoon.name : activeBoon.enName}
                </h2>
              </div>

              {/* Description Section */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-lg lg:text-xl text-cyan-dark/75 font-bold leading-relaxed">
                  {language === 'zh' ? activeBoon.desc : activeBoon.enDesc}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
