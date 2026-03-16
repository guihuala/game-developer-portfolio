import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, PenTool, Cpu, Layers, Zap, Sparkles } from 'lucide-react';

const nodes = [
  {
    id: 'concept',
    title: '概念与世界观',
    enTitle: 'Concept & Lore',
    icon: PenTool,
    color: '#FFD54F', // yellow-main
    x: 20,
    y: 10,
    content: "世界观构建、叙事弧线与角色设计。确立游戏的核心吸引力。",
    enContent: "World-building, narrative arcs, and character design. Establishing the core 'hook' of the game.",
    code: "// Lore snippet\nconst world = new World({\n  theme: 'Cozy-Fantasy',\n  magicSystem: 'Baking',\n  conflict: 'Rival Bakeries'\n});"
  },
  {
    id: 'proto',
    title: '核心原型',
    enTitle: 'Prototyping',
    icon: Zap,
    color: '#00BCD4', // cyan-main
    x: 50,
    y: 30,
    content: "快速迭代核心机制。在投入美术资源前找到“好玩”的点。",
    enContent: "Rapid iteration on core mechanics. Finding the 'fun' before committing to art assets.",
    code: "// Player Controller Prototype\nvoid Update() {\n  if (Input.GetButtonDown(\"Jump\")) {\n    rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);\n    PlayVFX(cuteJumpStars);\n  }\n}"
  },
  {
    id: 'systems',
    title: '系统架构',
    enTitle: 'Core Systems',
    icon: Cpu,
    color: '#FFD54F', // yellow-main
    x: 80,
    y: 50,
    content: "为背包、战斗和AI行为构建健壮、可扩展的系统架构。",
    enContent: "Building robust, scalable architecture for inventory, combat, and AI behaviors.",
    code: "// State Machine\nclass PetState {\n  virtual void Enter() {}\n  virtual void Execute() {}\n  virtual void Exit() {}\n}\n\nclass SleepState : PetState {\n  // Zzz...\n}"
  },
  {
    id: 'polish',
    title: '表现打磨',
    enTitle: 'Juice & Polish',
    icon: Layers,
    color: '#00BCD4', // cyan-main
    x: 30,
    y: 70,
    content: "添加Q弹的动画、顿帧、粒子特效和音效设计，让交互充满乐趣。",
    enContent: "Adding bouncy animations, hit pause, particle effects, and sound design to make interactions feel joyful.",
    code: "// Bouncy Scale\nIEnumerator Bounce() {\n  transform.localScale = Vector3.one * 1.2f;\n  yield return new WaitForSeconds(0.1f);\n  transform.localScale = Vector3.one;\n}"
  },
  {
    id: 'ship',
    title: '优化与发布',
    enTitle: 'Optimization & Ship',
    icon: Code2,
    color: '#FFD54F', // yellow-main
    x: 70,
    y: 90,
    content: "性能分析、修复Bug，并确保在目标平台上获得流畅的体验。",
    enContent: "Profiling, bug fixing, and ensuring a smooth experience across target platforms.",
    code: "// Object Pooling\npublic GameObject GetPooledConfetti() {\n  for (int i = 0; i < poolSize; i++) {\n    if (!confetti[i].activeInHierarchy) {\n      return confetti[i];\n    }\n  }\n  return null;\n}"
  }
];

const TypewriterCode: React.FC<{ code: string }> = ({ code }) => {
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    setDisplayedCode('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCode(code.slice(0, i));
      i++;
      if (i > code.length) clearInterval(interval);
    }, 20); // Fast typing speed
    return () => clearInterval(interval);
  }, [code]);

  return <code>{displayedCode}<span className="animate-pulse">_</span></code>;
};

export const SkillTree: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    setActiveNode(id);
  };

  return (
    <section id="skill-tree" className="relative py-32 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-black font-sans text-cyan-dark mb-2 uppercase tracking-tighter">
            开发<span className="text-cyan-main">流程</span>
          </h2>
          <p className="text-xl font-black text-cyan-main uppercase tracking-widest mb-6">Workflow</p>
          <div className="w-24 h-1.5 rounded-full bg-yellow-main shadow-sm"></div>
          
          <div className="mt-6 space-y-1">
            <p className="text-cyan-dark/80 font-sans font-bold text-lg max-w-2xl">
              我的开发流程。拖拽节点进行互动，点击查看见解和代码片段。
            </p>
            <p className="text-cyan-dark/50 font-sans font-semibold text-sm max-w-2xl mx-auto">
              My development process. Drag nodes to interact, click to view insights and code snippets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Tree Visualization */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-white rounded-[3rem] shadow-xl border-4 border-white overflow-hidden p-8">
            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00BCD4" />
                  <stop offset="100%" stopColor="#FFD54F" />
                </linearGradient>
              </defs>
              <path d="M 20% 10% L 50% 30% L 80% 50% L 70% 90%" stroke="url(#line-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="12 12" />
              <path d="M 50% 30% L 30% 70% L 70% 90%" stroke="url(#line-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="12 12" />
            </svg>

            {/* Nodes */}
            {nodes.map((node, i) => {
              const Icon = node.icon;
              const isActive = activeNode === node.id;
              
              return (
                <motion.button
                  key={node.id}
                  onTap={() => handleNodeClick(node.id)}
                  drag
                  dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                  dragElastic={0.2}
                  className={`absolute w-16 h-16 -ml-8 -mt-8 rounded-full flex items-center justify-center z-10 transition-colors duration-300 shadow-md cursor-grab active:cursor-grabbing ${isActive ? 'scale-125 z-20' : 'hover:scale-110'}`}
                  style={{ 
                    left: `${node.x}%`, 
                    top: `${node.y}%`,
                    backgroundColor: 'white',
                    border: `4px solid ${node.color}`,
                  }}
                  animate={isActive ? {} : {
                    y: [0, -10, 0],
                    x: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4 + (i % 3), 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-7 h-7 pointer-events-none" style={{ color: node.color }} />
                  
                  {/* Pulse effect for inactive nodes */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full animate-ping opacity-30 pointer-events-none" style={{ backgroundColor: node.color }}></span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Node Details Panel */}
          <div className="relative w-full min-h-[400px] bg-white rounded-[3rem] border-4 border-white p-8 shadow-xl flex flex-col">
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="flex-1 flex flex-col"
                >
                  {nodes.map(n => n.id === activeNode && (
                    <React.Fragment key={n.id}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-2xl" style={{ backgroundColor: `${n.color}20` }}>
                          <n.icon className="w-8 h-8" style={{ color: n.color }} />
                        </div>
                        <div>
                          <h3 className="text-3xl font-black font-sans uppercase tracking-tight text-cyan-dark">
                            {n.title}
                          </h3>
                          <p className="text-sm font-black font-sans text-cyan-main/60 uppercase tracking-widest mt-1">
                            {n.enTitle}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-8">
                        <p className="text-lg text-cyan-dark/80 font-sans font-bold leading-relaxed">
                          {n.content}
                        </p>
                        <p className="text-sm text-cyan-dark/50 font-sans font-semibold leading-relaxed">
                          {n.enContent}
                        </p>
                      </div>
                      
                      <div className="mt-auto relative group">
                        <pre className="relative bg-cyan-light/50 p-6 rounded-2xl overflow-x-auto border-2 border-white shadow-inner font-mono text-sm text-cyan-dark min-h-[120px]">
                          <TypewriterCode code={n.code} />
                        </pre>
                      </div>
                    </React.Fragment>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center opacity-60"
                >
                  <Sparkles className="w-16 h-16 text-cyan-main mb-4 animate-bounce" />
                  <p className="font-sans font-black text-lg text-cyan-dark uppercase tracking-widest">选择一个节点查看</p>
                  <p className="font-sans font-bold text-xs text-cyan-main uppercase tracking-widest mt-2">Select a node to inspect</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
