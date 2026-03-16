import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Swords, GraduationCap, Cpu, MapPin, X } from 'lucide-react';

const milestones = [
  {
    id: 'start',
    year: "2016 - 2020",
    title: "游戏设计毕业",
    enTitle: "Graduated",
    desc: "获得某大学游戏设计学位，参与多个Game Jam并获得最佳创意奖。这里是一切梦想开始的地方，学会了基础的代码与设计理论。",
    enDesc: "Earned a Game Design degree, participated in multiple Game Jams. This is where the dream began, learning basic code and design theories.",
    icon: GraduationCap,
    color: "#00BCD4", // uniform cyan
    questType: "TUTORIAL",
    x: 10, // percentage position
    y: 80
  },
  {
    id: 'client',
    year: "2020 - 2022",
    title: "游戏客户端开发",
    enTitle: "Game Client Engineer",
    desc: "参与大型MMORPG项目开发，负责UI系统重构、性能优化及动画状态机编写。积累了丰富的企业级实战经验和底层优化技巧。",
    enDesc: "Participated in MMORPG dev, responsible for UI, performance, and animation. Gained rich enterprise experience.",
    icon: Cpu,
    color: "#FFD54F", // uniform yellow
    questType: "SIDE QUEST",
    x: 40,
    y: 60
  },
  {
    id: 'designer',
    year: "2022 - 2024",
    title: "主系统策划",
    enTitle: "Lead Systems Designer",
    desc: "就职于某知名游戏公司，负责核心战斗系统搭建、数值平衡以及角色技能设计。从代码执行者转变为规则制定者。",
    enDesc: "Worked at a top game company, leading combat system design and balance. Transitioned from coder to rule-maker.",
    icon: Swords,
    color: "#00BCD4", // cyan
    questType: "GUILD QUEST",
    x: 70,
    y: 30
  },
  {
    id: 'indie',
    year: "2024 - 至今",
    title: "独立制作人",
    enTitle: "Indie Game Dev",
    desc: "成立个人工作室，发布首款商业独立游戏《星界编年史》。负责全栈开发、游戏设计与美术指导，全面把控游戏品质。",
    enDesc: "Founded an indie studio. Responsible for full-stack dev, design, and art direction.",
    icon: Gamepad2,
    color: "#FFD54F", // yellow
    questType: "MAIN QUEST",
    x: 90,
    y: 10
  }
];

export const Timeline: React.FC = () => {
  const [activeNode, setActiveNode] = useState<typeof milestones[0] | null>(null);
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mapRef.current) return;
      const rect = mapRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Restrict player inside the map container
      const boundedX = Math.max(0, Math.min(100, x));
      const boundedY = Math.max(0, Math.min(100, y));
      
      setPlayerPos({ x: boundedX, y: boundedY });

      // Check distance to nodes
      let foundActive = false;
      for (const node of milestones) {
        // Simple distance calculation (percentage based)
        const dist = Math.sqrt(Math.pow(boundedX - node.x, 2) + Math.pow(boundedY - node.y, 2));
        if (dist < 12) { // trigger radius 12%
          setActiveNode(node);
          foundActive = true;
          break;
        }
      }
      if (!foundActive) {
        setActiveNode(null);
      }
    };

    const mapEl = mapRef.current;
    if (mapEl) {
      mapEl.addEventListener('mousemove', handleMouseMove);
      // Optional: touch support
      mapEl.addEventListener('touchmove', (e) => {
        if(e.touches[0]) handleMouseMove(e.touches[0] as any);
      });
    }

    return () => {
      if (mapEl) {
        mapEl.removeEventListener('mousemove', handleMouseMove);
        mapEl.removeEventListener('touchmove', handleMouseMove as any);
      }
    };
  }, []);

  // Draw dash lines between nodes
  const renderPath = () => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ preserveAspectRatio: "none" }}>
        <path
          d={`M ${milestones[0].x}% ${milestones[0].y}% 
             L ${milestones[1].x}% ${milestones[1].y}% 
             L ${milestones[2].x}% ${milestones[2].y}% 
             L ${milestones[3].x}% ${milestones[3].y}%`}
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
    <section id="timeline" className="relative py-20 lg:py-32 z-10 overflow-hidden bg-white">
      {/* Subtle Game Map Background */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#00BCD4 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-black font-sans text-cyan-dark mb-2 uppercase tracking-tighter drop-shadow-sm">
            工作<span className="text-yellow-main">经历</span>地图
          </h2>
          <p className="text-xl font-black text-cyan-main uppercase tracking-widest mb-6">World Map</p>
          <div className="w-24 h-1.5 rounded-full bg-yellow-main shadow-sm"></div>
          
          <p className="mt-6 text-cyan-dark/50 text-sm font-bold tracking-widest uppercase">
            移动鼠标控制角色，靠近据点查看详情
          </p>
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
                      {node.title}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}

          {/* The Player Avatar (Follows Mouse) */}
          <motion.div
            className="absolute z-20 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full border-4 border-yellow-main shadow-[0_0_20px_rgba(255,213,79,1)] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
          >
            <div className="w-6 h-6 md:w-8 md:h-8 bg-cyan-dark rounded-full flex items-center justify-center relative overflow-hidden">
                <motion.div 
                   animate={{ rotate: 360 }} 
                   transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                   className="absolute inset-0 bg-gradient-to-tr from-cyan-main to-yellow-main opacity-50"
                />
              <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full z-10 shadow-sm animate-pulse"></div>
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
                    
                    <h3 className="text-2xl md:text-3xl font-black text-cyan-dark mb-1">{activeNode.title}</h3>
                    <p className="text-xs font-black text-cyan-main uppercase tracking-widest mb-4">{activeNode.enTitle}</p>
                    
                    <p className="text-cyan-dark/80 font-sans font-bold text-sm md:text-base leading-relaxed mb-2 max-w-3xl">
                      {activeNode.desc}
                    </p>
                    <p className="text-cyan-dark/50 font-sans font-semibold text-xs md:text-sm leading-relaxed max-w-3xl">
                      {activeNode.enDesc}
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
