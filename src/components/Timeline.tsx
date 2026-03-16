import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Gamepad2, Swords, GraduationCap, Cpu, Code2, Sparkles, Layers, Search, MapPin, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

const milestones = [
  {
    id: 'origin',
    year: "2020 - 2021",
    title: "兴趣起源：初探代码",
    enTitle: "The Spark: First Step",
    desc: "在正式进入大学前，我因为对游戏的热爱开始了自学。写下了第一个 'Hello World'，虽然那时还不明白逻辑背后的原理，但那种创造的快感让我确信了未来的方向。",
    enDesc: "Self-study began with a passion for games. Wrote my first 'Hello World'. even without deep theory knowledge, the joy of creation confirmed my future path.",
    icon: Search,
    color: "#0284C7",
    questType: "PROLOGUE",
    x: 12,
    y: 88
  },
  {
    id: 'university',
    year: "2021秋 - 至今",
    title: "初露锋芒：大学生涯",
    enTitle: "Lvl 1: University Era",
    desc: "踏入游戏开发专业，从最基础的一行代码开始。在课程作业中第一次发现，原来创造世界比玩游戏更有趣。这个阶段我专注于吸收各种游戏逻辑和数学知识。",
    enDesc: "Entered game dev program. Started from raw code. Realized that creating worlds is more fun than playing them. Focused on absorbing game logic and math.",
    icon: GraduationCap,
    color: "#0284C7",
    questType: "TUTORIAL",
    x: 42,
    y: 82
  },
  {
    id: 'technical',
    year: "2022 上半年",
    title: "技术磨砺：底层逻辑",
    enTitle: "Grind: Core Logic",
    desc: "开始深入研究 C++ 和数据结构。这不仅是枯燥的语法，更是理解游戏运行本质的钥匙。我学着如何更高效地管理内存，并尝试进行性能优化。",
    enDesc: "Dove into C++ and data structures. It's more than syntax—it's the key to understanding how games run. Learned memory management and optimization.",
    icon: Code2,
    color: "#FFD54F",
    questType: "SIDE QUEST",
    x: 25,
    y: 65
  },
  {
    id: 'engine',
    year: "2022 - 2023",
    title: "深渊凝视：引擎探索",
    enTitle: "The Void: Engine Study",
    desc: "独立完成了几个简陋的小 Demo。虽然代码写得一团糟，但我在这段时间弄明白了渲染管线、物理引擎和那些让人头秃的 Bug。这是我从“玩家”向“开发者”转变的阵痛期。",
    enDesc: "Created several small demos. Despite messy code, I learned about rendering pipelines, physics, and debugging. A painful but vital transition from player to developer.",
    icon: Cpu,
    color: "#FFD54F",
    questType: "SIDE QUEST",
    x: 55,
    y: 52
  },
  {
    id: 'fullstack',
    year: "2023 上半年",
    title: "领域扩张：全栈尝试",
    enTitle: "Expansion: Full-stack",
    desc: "不满足于客户端，我开始接触后端和 Web 技术。尝试构建了自己的第一个游戏配套管理系统，明白了数据在前后端之间流转的奥秘。",
    enDesc: "Not content with just client-side, I explored backend and Web tech. Built my first integrated system, understanding data flow between client and server.",
    icon: Layers,
    color: "#0284C7",
    questType: "GUILD QUEST",
    x: 82,
    y: 68
  },
  {
    id: 'gamejam',
    year: "2023 - 2024",
    title: "磨砺意志：Game Jam",
    enTitle: "Trial by Fire: Game Jams",
    desc: "第一次走出校园象牙塔，在 48 小时内和队友极限产出。学会了如何在资源匮乏的情况下进行取舍，也明白了团队协作中沟通的重要性远胜于单打独斗。",
    enDesc: "Stepped out of secondary school bubble. Created games in 48-hour jams. Learned how to make trade-offs under pressure and the power of teamwork over solo dev.",
    icon: Swords,
    color: "#0284C7",
    questType: "GUILD QUEST",
    x: 90,
    y: 35
  },
  {
    id: 'gradproject',
    year: "2024 - 2025",
    title: "毕业课题：最后的试炼",
    enTitle: "Final Boss: Grad Project",
    desc: "正在进行的毕业设计。我将这几年学到的所有技能都倾注其中。这不仅是一份作业，更是一份向行业递出的敲门砖。虽然还没毕业，但我已经做好了进入新手村的准备。",
    enDesc: "Ongoing graduation project. Pouring every skill I've learned into this. It's more than an assignment; it's my first actual stepping stone into the industry.",
    icon: Gamepad2,
    color: "#FFD54F",
    questType: "MAIN QUEST",
    x: 65,
    y: 15
  }
];

export const Timeline: React.FC = () => {
  const [activeNode, setActiveNode] = useState<typeof milestones[0] | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const { playHover, playSuccess } = useSoundEffects();

  // Optimized Position handling with MotionValues
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 });

  // Convert to percentage strings for CSS
  const xPercent = useTransform(springX, (val) => `${val}%`);
  const yPercent = useTransform(springY, (val) => `${val}%`);

  useEffect(() => {
    let lastCheckTime = 0;
    const CHECK_INTERVAL = 50; // Only check distance every 50ms

    const handleMouseMove = (e: MouseEvent | Touch) => {
      if (!mapRef.current) return;

      const rect = mapRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const boundedX = Math.max(0, Math.min(100, x));
      const boundedY = Math.max(0, Math.min(100, y));

      // Update MotionValues directly (no re-render)
      mouseX.set(boundedX);
      mouseY.set(boundedY);

      // Throttled Distance Check
      const now = performance.now();
      if (now - lastCheckTime > CHECK_INTERVAL) {
        lastCheckTime = now;
        
        let foundActive = false;
        for (const node of milestones) {
          const dist = Math.sqrt(Math.pow(boundedX - node.x, 2) + Math.pow(boundedY - node.y, 2));
          if (dist < 12) {
            if (activeNode?.id !== node.id) {
              setActiveNode(node);
              playSuccess();
            }
            foundActive = true;
            break;
          }
        }
        if (!foundActive && activeNode !== null) {
          setActiveNode(null);
        }
      }
    };

    const mapEl = mapRef.current;
    if (mapEl) {
      const onMove = (e: MouseEvent) => handleMouseMove(e);
      const onTouch = (e: TouchEvent) => {
        if (e.touches[0]) handleMouseMove(e.touches[0]);
      };

      mapEl.addEventListener('mousemove', onMove, { passive: true });
      mapEl.addEventListener('touchmove', onTouch, { passive: true });
      
      return () => {
        mapEl.removeEventListener('mousemove', onMove);
        mapEl.removeEventListener('touchmove', onTouch);
      };
    }
  }, [activeNode, mouseX, mouseY, playSuccess]);

  // Draw dash lines between nodes
  const renderPath = () => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 drop-shadow-md" preserveAspectRatio="none">
        <polyline
          points={milestones.map(m => `${m.x}%,${m.y}%`).join(' ')}
          fill="none"
          stroke="#00BCD4"
          strokeWidth="4"
          strokeDasharray="10, 15"
          className="opacity-30"
        />
      </svg>
    );
  };

  return (
    <section id="timeline" className="relative pt-24 pb-12 z-10 overflow-hidden bg-white">
      {/* Subtle Game Map Background */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#00BCD4 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header - Compact style like About page */}
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-black font-sans text-cyan-dark mb-4 uppercase tracking-tighter">
            成长<span className="text-cyan-main">历程</span>
          </h2>
          
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-black text-cyan-main uppercase tracking-[0.3em] mb-2">{t("Journey Map", "Adventurer's Path")}</p>
            <div className="w-12 h-1 bg-cyan-main/30 rounded-full mb-4"></div>
            <p className="text-cyan-dark/40 text-[10px] font-bold tracking-widest uppercase bg-cyan-light/30 px-4 py-1.5 rounded-full border border-cyan-main/10">
              {t("移动鼠标控制角色 · 靠近据点查看详情", "Mouse to control · Near nodes for info")}
            </p>
          </div>
        </div>

        {/* The Game Map Container */}
        <div
          ref={mapRef}
          className="relative w-full aspect-[4/5] md:aspect-video bg-cyan-dark rounded-[3rem] border-8 border-yellow-main/50 shadow-2xl overflow-hidden cursor-crosshair touch-none"
        >

          {/* Topographical / Fantasy Map texture */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-cyan-dark to-black"></div>

          {renderPath()}

          {/* Render Nodes (Locations) */}
          {milestones.map((node) => {
            const Icon = node.icon;
            const isActive = activeNode?.id === node.id;

            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className="relative group">
                  {/* Location Pin Bounce animation */}
                  <motion.div
                    animate={{ y: isActive ? [0, -10, 0] : 0, scale: isActive ? 1.2 : 1 }}
                    transition={{ repeat: isActive ? Infinity : 0, duration: 1.5, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center shadow-lg transition-colors duration-300`}
                      style={{ backgroundColor: isActive ? node.color : 'rgba(255,255,255,0.1)', borderColor: node.color, color: isActive ? 'white' : node.color }}
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    {/* Glowing effect under node */}
                    <div className="absolute inset-0 bg-current opacity-20 blur-xl -z-10 rounded-full" style={{ color: node.color }}></div>

                    {/* Node Label */}
                    <div className={`mt-2 px-3 py-1 rounded-full text-xs font-black shadow-md border-2 whitespace-nowrap transition-opacity ${isActive ? 'opacity-100 bg-white text-cyan-dark' : 'opacity-80 bg-cyan-dark/80 text-white'}`} style={{ borderColor: node.color }}>
                      {language === 'zh' ? node.title : node.enTitle}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}

          {/* The Player Avatar (Follows Mouse) - Now using Osmanthus Clay Icon */}
          <motion.div
            className="absolute z-20 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: xPercent, top: yPercent }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Outer Glow (Adjusted to follow raw icon) */}
              <div className="absolute inset-0 bg-yellow-main/30 blur-2xl rounded-full scale-110 animate-pulse"></div>
              
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <img 
                  src="/桂花泥图标.png" 
                  alt="Player" 
                  className="w-full h-full object-contain filter drop-shadow-[0_5px_15px_rgba(255,213,79,0.5)]"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Dialog Box / Quest Panel */}
          <AnimatePresence>
            {activeNode && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border-4 z-30 pointer-events-none"
                style={{ borderColor: activeNode.color }}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div
                    className="hidden md:flex w-16 h-16 rounded-2xl shrink-0 items-center justify-center text-white shadow-md relative overflow-hidden"
                    style={{ backgroundColor: activeNode.color }}
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 w-full h-full translate-x-10"></div>
                    <activeNode.icon className="w-8 h-8 relative z-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-white text-[10px] font-black tracking-widest uppercase shadow-sm" style={{ backgroundColor: activeNode.color }}>
                        {activeNode.questType}
                      </span>
                      <span className="text-cyan-dark/50 font-bold text-sm tracking-widest">{activeNode.year}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-cyan-dark mb-1">{language === 'zh' ? activeNode.title : activeNode.enTitle}</h3>
                    <p className="text-xs font-black text-cyan-main uppercase tracking-widest mb-4">{language === 'zh' ? activeNode.enTitle : activeNode.title}</p>

                    <p className="text-cyan-dark/80 font-sans font-bold text-sm md:text-base leading-relaxed mb-2 max-w-3xl">
                      {language === 'zh' ? activeNode.desc : activeNode.enDesc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
