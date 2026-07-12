import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Code2, Gamepad2, GraduationCap, Layers, Swords } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { siteContent } from '../content/siteContent';

const milestones = [
  { id: 'start', year: '2024', title: '开始学习游戏开发', enTitle: 'Started Game Development', desc: '2024 年开始正式学习游戏开发。最初主要从 Unity 和 C# 入手，一边补编程基础，一边用课程作业和小 Demo 熟悉完整的制作流程。', enDesc: 'I began studying game development in 2024, starting with Unity and C#. I learned programming fundamentals while using coursework and small demos to understand the full development process.', icon: GraduationCap, x: 14, y: 55 },
  { id: 'projects', year: '2024', title: '完成最初的游戏项目', enTitle: 'First Game Projects', desc: '开始和同学合作，也尝试独立完成小游戏。这一年做了《梦格事务所》和《Minute Through Dimensions》等项目，逐渐接触程序、美术和关卡设计之间的配合。', enDesc: 'I began collaborating with classmates and making small games independently, including Dream Agency and Minute Through Dimensions. These projects helped me connect programming, art, and level design.', icon: Code2, x: 36, y: 40 },
  { id: 'jams', year: '2024 - 2025', title: '比赛与 Game Jam', enTitle: 'Competitions and Game Jams', desc: '之后参加了多次 Game Jam 和高校游戏比赛。在时间有限的情况下做项目，让我更熟悉范围控制、团队分工，以及如何先完成一个真正能玩的版本。', enDesc: 'I joined several game jams and university game competitions. Working under short deadlines taught me scope control, team coordination, and how to finish a genuinely playable build first.', icon: Swords, x: 62, y: 52 },
  { id: 'portfolio', year: '2025 - 2026', title: '独立开发与作品整理', enTitle: 'Solo Development and Portfolio', desc: '这一阶段继续完成《步入沼泽》《遗愿清单》《菌丝工厂》等项目，也开始整理作品集。相比继续增加 Demo，我更希望把已有玩法做完整，并把自己具体负责的内容说明白。', enDesc: 'I continued working on Step or Sink, The Bucket List, Mycelium Mill, and other projects while organizing my portfolio. I became more interested in completing existing ideas than simply adding more demos.', icon: Gamepad2, x: 82, y: 35 },
  { id: 'study', year: '2026', title: '申请传媒方向留学', enTitle: 'Applying for Media Studies', desc: '2026 年开始申请传媒方向的留学深造。游戏开发仍然是我重要的实践经历，而接下来也希望从传媒、内容和受众的角度继续理解互动作品。', enDesc: 'In 2026, I began applying for further study in media. Game development remains an important part of my practice, and I hope to understand interactive work more deeply through media, content, and audience studies.', icon: Layers, x: 72, y: 15 },
];

export const Timeline: React.FC = () => {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState(milestones[milestones.length - 1].id);
  const mapRef = useRef<HTMLDivElement>(null);
  const { playSuccess } = useSoundEffects();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });
  const xPercent = useTransform(springX, (value) => `${value}%`);
  const yPercent = useTransform(springY, (value) => `${value}%`);
  const active = milestones.find((item) => item.id === activeId) ?? milestones[0];

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    let previousId = activeId;
    const move = (clientX: number, clientY: number) => {
      const rect = map.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      mouseX.set(x);
      mouseY.set(y);
      const nearby = milestones.find((item) => Math.hypot(x - item.x, y - item.y) < 9);
      if (nearby && nearby.id !== previousId) {
        previousId = nearby.id;
        setActiveId(nearby.id);
        playSuccess();
      }
    };
    const onMouseMove = (event: MouseEvent) => move(event.clientX, event.clientY);
    const onTouchMove = (event: TouchEvent) => event.touches[0] && move(event.touches[0].clientX, event.touches[0].clientY);
    map.addEventListener('mousemove', onMouseMove, { passive: true });
    map.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('touchmove', onTouchMove);
    };
  }, [activeId, mouseX, mouseY, playSuccess]);

  return (
    <section className="h-full max-w-7xl mx-auto px-4 md:px-6 pb-4 lg:pb-8 flex flex-col lg:flex-row gap-4 lg:gap-10">
      <aside className="lg:w-72 xl:w-80 shrink-0 lg:pt-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-cyan-dark mb-4 lg:mb-8">
          {language === 'zh' ? <>成长<span className="text-cyan-main">经历</span></> : <>My <span className="text-cyan-main">Journey</span></>}
        </h1>
        <nav className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-col gap-1" aria-label={language === 'zh' ? '经历阶段' : 'Experience stages'}>
          {milestones.map((item) => {
            const selected = item.id === activeId;
            return (
              <button key={item.id} onClick={() => setActiveId(item.id)} className={`text-left rounded-xl px-4 py-3 transition-colors ${selected ? 'bg-cyan-light text-cyan-dark' : 'text-cyan-dark/55 hover:text-cyan-dark'}`}>
                <span className="block min-w-0">
                  <span className="block text-[11px] font-bold opacity-55">{item.year}</span>
                  <span className="block text-sm font-black truncate">{language === 'zh' ? item.title : item.enTitle}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div ref={mapRef} className="relative flex-1 min-h-[500px] lg:min-h-0 h-full overflow-hidden rounded-3xl bg-cyan-dark cursor-crosshair touch-none">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #00BCD4 1px, transparent 1px), linear-gradient(to bottom, #00BCD4 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <polyline points={milestones.map((item) => `${item.x}%,${item.y}%`).join(' ')} fill="none" stroke="#00BCD4" strokeWidth="3" strokeDasharray="8 12" opacity="0.45" />
        </svg>

        {milestones.map((item) => {
          const Icon = item.icon;
          const selected = item.id === activeId;
          return (
            <button key={item.id} onClick={() => setActiveId(item.id)} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
              <span className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'bg-yellow-main border-yellow-main text-cyan-dark' : 'bg-cyan-dark border-cyan-main text-cyan-main'}`}>
                <Icon className="w-5 h-5" />
              </span>
              <span className="hidden xl:block text-[10px] font-black text-white/70 whitespace-nowrap">{language === 'zh' ? item.title : item.enTitle}</span>
            </button>
          );
        })}

        <motion.img src={siteContent.assets.playerIcon} alt="" className="absolute z-20 w-16 h-16 object-contain pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ left: xPercent, top: yPercent }} />

        <article className="absolute left-5 right-5 bottom-5 md:left-8 md:right-8 md:bottom-8 bg-white rounded-2xl p-5 md:p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2 text-sm font-black text-cyan-main"><span>{active.year}</span></div>
          <h2 className="text-xl md:text-3xl font-black text-cyan-dark mb-2">{language === 'zh' ? active.title : active.enTitle}</h2>
          <p className="text-sm md:text-base leading-relaxed font-bold text-cyan-dark/65 max-w-3xl">{language === 'zh' ? active.desc : active.enDesc}</p>
        </article>
      </div>
    </section>
  );
};
