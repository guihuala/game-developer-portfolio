import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { User, Heart, Code, Sparkles, Palette, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

type CardEdition = 'base' | 'foil' | 'holographic' | 'polychrome' | 'negative';

interface CardData {
  id: number;
  title: string;
  enTitle: string;
  type: string;
  enType: string;
  icon: any;
  img: string;
  desc: string;
  enDesc: string;
  color: string;
  cost: number;
  edition: CardEdition;
}

const philosophyCards: CardData[] = [
  { 
    id: 1, 
    title: '设计哲学', 
    enTitle: 'Philosophy', 
    type: '核心价值', 
    enType: 'Core Value',
    icon: User, 
    img: 'https://picsum.photos/seed/philosophy/600/800', 
    desc: '玩家体验至上。致力于打造引发共鸣的沉浸式体验。', 
    enDesc: 'Player experience first. Dedicated to building immersive experiences that resonate.',
    color: '#00BCD4', 
    cost: 3,
    edition: 'base'
  },
  { 
    id: 2, 
    title: '技术架构', 
    enTitle: 'Tech Stack', 
    type: '生产力', 
    enType: 'Skills',
    icon: Code, 
    img: 'https://picsum.photos/seed/tech/800/600', 
    desc: '全栈整合。用底层思维构建上层创意。', 
    enDesc: 'Full-stack integration. Building artistic creations with low-level logic.',
    color: '#FFD54F', 
    cost: 5,
    edition: 'holographic'
  },
  { 
    id: 3, 
    title: '多元驱动', 
    enTitle: 'Diversity', 
    type: '灵感源', 
    enType: 'Life',
    icon: Heart, 
    img: 'https://picsum.photos/seed/hobbies/600/600', 
    desc: '跨界融合。从日常中汲取游戏的養分。', 
    enDesc: 'Cross-boundary fusion. Drawing game nourishment from daily life.',
    color: '#00BCD4', 
    cost: 2,
    edition: 'polychrome'
  },
  { 
    id: 4, 
    title: '未来愿景', 
    enTitle: 'Vision', 
    type: '目标', 
    enType: 'Goal',
    icon: Sparkles, 
    img: 'https://picsum.photos/seed/vision/800/800', 
    desc: '构建能够启发灵感并连接人际的虚拟世界。', 
    enDesc: 'Building virtual worlds that inspire and connect people.',
    color: '#FFD54F', 
    cost: 9,
    edition: 'negative'
  }
];

const CardBack = () => (
  <div className="absolute inset-0 bg-[#00151a] rounded-xl overflow-hidden border-4 border-cyan-light/50 flex flex-col items-center justify-center p-4">
    <div className="absolute inset-0 opacity-20 pointer-events-none" 
         style={{ 
           backgroundImage: `radial-gradient(circle at 2px 2px, #00BCD4 1px, transparent 0)`,
           backgroundSize: '16px 16px' 
         }}></div>
    <div className="w-16 h-16 rounded-full border-4 border-yellow-main/40 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-yellow-main/5 blur-xl rounded-full"></div>
      <span className="text-yellow-main text-3xl font-black">✤</span>
    </div>
    <div className="mt-4 text-[8px] font-black text-cyan-main/40 uppercase tracking-[0.3em]">Mokukeki Tcg</div>
  </div>
);

const CardFoil = ({ mouseX, mouseY, edition }: { mouseX: any, mouseY: any, edition: CardEdition }) => {
  const foilX = useTransform(mouseX, [-0.5, 0.5], ["-20%", "120%"]);
  const foilY = useTransform(mouseY, [-0.5, 0.5], ["-20%", "120%"]);
  
  if (edition === 'base') {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10" />
    );
  }

  const getFoilStyle = () => {
    switch (edition) {
      case 'foil':
        return 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 55%, transparent 70%)';
      case 'holographic':
        return 'linear-gradient(110deg, transparent 20%, rgba(0,230,255,0.6) 40%, rgba(255,255,255,0.9) 50%, rgba(0,230,255,0.6) 60%, transparent 80%)';
      case 'polychrome':
        return 'linear-gradient(110deg, #ff0000 0%, #ffff00 20%, #00ff00 40%, #00ffff 60%, #0000ff 80%, #ff00ff 100%)';
      default:
        return 'none';
    }
  };
  
  return (
    <>
      <motion.div 
        className={`absolute inset-0 pointer-events-none z-50 ${edition === 'polychrome' ? 'opacity-80 mix-blend-overlay' : 'opacity-0 group-hover:opacity-100 mix-blend-color-dodge'} transition-opacity duration-500`}
        style={{
          background: getFoilStyle(),
          backgroundSize: edition === 'polychrome' ? '400% 400%' : '150% 150%',
          backgroundPosition: `${foilX.get()} ${foilY.get()}`,
        }}
        animate={edition === 'polychrome' ? {
          backgroundPosition: ['0% 0%', '100% 100%'],
        } : {}}
        transition={edition === 'polychrome' ? {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse'
        } : {}}
      />
      {/* Dynamic Shine Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30 pointer-events-none z-20" />
    </>
  );
};

export const PhilosophyGallery: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { language, t } = useLanguage();
  const { playHover, playClick, playSuccess } = useSoundEffects();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));

  const activeCard = philosophyCards.find(c => c.id === selectedId);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div className="relative w-full h-[650px] bg-cyan-dark/5 backdrop-blur-2xl rounded-[3rem] border-4 border-cyan-main/10 shadow-xl overflow-hidden flex flex-col items-center p-6"
         style={{ backgroundImage: 'radial-gradient(rgba(0,188,212,0.1) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}>
      
      {/* Decorative HUD */}
      <div className="absolute top-6 left-8 flex items-center gap-4 text-cyan-main/60 font-black text-[9px] uppercase tracking-[0.2em] z-10">
        <div className="flex items-center gap-1.5 bg-cyan-main/10 border border-cyan-main/20 px-2 py-1 rounded-sm">
          <Zap className="w-3 h-3" />
          <span>{t("就绪", "READY")}</span>
        </div>
        <span>SLOT: {selectedId ? 1 : 0}/1</span>
      </div>

      <div className="absolute top-6 right-8 z-10">
        <div className="px-3 py-1 bg-yellow-main/10 border border-yellow-main/30 rounded-sm text-[9px] font-black text-yellow-600 uppercase tracking-widest">
          {t("战斗阶段", "PHASE: SELECT")}
        </div>
      </div>

      {/* Battlefield (Central Focus) */}
      <div className="flex-1 w-full flex items-center justify-center relative perspective-[2000px]">
        <AnimatePresence mode="wait">
          {activeCard ? (
            <motion.div
              key={activeCard.id}
              initial={{ rotateY: 180, scale: 0.5, y: 100, opacity: 0 }}
              animate={{ rotateY: 360, scale: 1, y: -20, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="relative w-64 h-[380px] sm:w-72 sm:h-[420px] group cursor-pointer perspective-[2000px]"
              onMouseMove={handleMouseMove}
              onClick={() => setSelectedId(null)}
            >
              <motion.div 
                style={{ 
                  rotateX, 
                  rotateY, 
                  transformStyle: 'preserve-3d',
                }}
                animate={activeCard.edition === 'negative' ? {
                  x: [0, -2, 2, -1, 0],
                  filter: [
                    'brightness(1.2) contrast(1.1)',
                    'brightness(1.5) contrast(1.3) hue-rotate(90deg)',
                    'brightness(1.2) contrast(1.1) hue-rotate(0deg)',
                  ]
                } : {}}
                transition={activeCard.edition === 'negative' ? {
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                } : {}}
                className="w-full h-full relative"
              >
                {/* Front */}
                <div className={`absolute inset-0 rounded-2xl border-[6px] shadow-2xl overflow-hidden flex flex-col z-10 ${
                  activeCard.edition === 'holographic' ? 'bg-[#e0e0e0] border-white' : 
                  activeCard.edition === 'negative' ? 'bg-[#000000] border-cyan-main' : 'bg-white border-cyan-light'
                }`}
                     style={{ borderColor: activeCard.edition === 'negative' ? '#00BCD4' : undefined }}>
                  
                  {/* Holographic foil layer */}
                  <CardFoil mouseX={mouseX} mouseY={mouseY} edition={activeCard.edition} />
                  
                  {/* Header */}
                  <div className={`flex justify-between items-center p-3 mt-1`}>
                    <span className={`font-black tracking-tight ${activeCard.edition === 'negative' ? 'text-cyan-main' : 'text-cyan-dark'} text-sm uppercase`}>
                      {language === 'zh' ? activeCard.title : activeCard.enTitle}
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm ${
                      activeCard.edition === 'negative' ? 'bg-cyan-main text-white' : 'bg-yellow-main text-cyan-dark'
                    }`}>
                      {activeCard.cost}
                    </div>
                  </div>

                  {/* Art (Simplified - No extra border) */}
                  <div className={`w-full h-48 relative overflow-hidden`}>
                    <motion.img 
                      src={activeCard.img} 
                      className="w-full h-full object-cover grayscale-[0.3] transition-all group-hover:grayscale-0" 
                      alt="" 
                      animate={activeCard.edition === 'negative' ? {
                        opacity: [1, 0.8, 1],
                        scale: [1, 1.05, 1]
                      } : {}}
                      transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Type Bar (Simplified) */}
                  <div className={`py-1 px-4 text-[8px] font-black uppercase tracking-widest border-y border-cyan-main/10 ${
                    activeCard.edition === 'negative' ? 'bg-cyan-dark text-cyan-main' : 'bg-cyan-light/10 text-cyan-main'
                  }`}>
                    {language === 'zh' ? activeCard.type : activeCard.enType}
                  </div>

                  {/* Description Box (Cleaned) */}
                  <div className={`flex-1 p-4 text-xs font-bold leading-snug ${
                    activeCard.edition === 'negative' ? 'text-white/80' : 'text-cyan-dark/80'
                  }`}>
                    <p>{language === 'zh' ? activeCard.desc : activeCard.enDesc}</p>
                  </div>

                  {/* Footer Stats */}
                  <div className={`pb-3 px-4 flex justify-between items-center opacity-30 text-[6px] font-bold uppercase`}>
                    <span>Illus. mokukeki</span>
                    <span>#00{activeCard.id} / S-EDITION</span>
                  </div>
                </div>

                {/* Back (for rotation) */}
                <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(180deg) translateZ(-1px)' }}>
                  <CardBack />
                </div>
              </motion.div>

              {/* Selection Glow */}
              <div className="absolute -inset-4 bg-cyan-main/10 blur-2xl rounded-full -z-20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Success light burst on play */}
              <motion.div 
                initial={{ opacity: 1, scale: 0.5 }}
                animate={{ opacity: 0, scale: 4 }}
                className="absolute inset-0 bg-white rounded-full blur-3xl -z-10"
              />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-72 h-[420px] rounded-3xl border-4 border-dashed border-cyan-main/20 flex flex-col items-center justify-center p-10 text-center relative">
                <div className="w-20 h-20 bg-cyan-main/5 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-cyan-main/20 animate-pulse" />
                </div>
                <h4 className="text-xl font-black text-cyan-main/30 uppercase tracking-[0.2em]">
                  {t("等待入场", "Awaiting Move")}
                </h4>
                <p className="text-xs font-bold text-cyan-main/20 mt-4 leading-relaxed">
                  {t("从下方手牌中选择一张，\n将其置入战场中心。", "Select a card from your hand\nand move it to center stage.")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The Hand (Bottom Card Rack) */}
      <div className="h-44 w-full max-w-4xl relative flex items-end justify-center perspective-[1000px] mt-4">
        {philosophyCards.map((card, index) => {
          const isSelected = selectedId === card.id;
          const total = philosophyCards.length;
          const rotZ = (index - (total - 1) / 2) * 8; // Fan out effect
          const moveY = Math.abs(index - (total - 1) / 2) * 10;
          
          return (
            <div 
              key={card.id} 
              className="relative w-28 h-40 -ml-8 first:ml-0 group"
              style={{ zIndex: isSelected ? 100 : 10 + index }}
            >
              <motion.div
                layoutId={`card-${card.id}`}
                whileHover={{ 
                  y: -40, 
                  scale: 1.15, 
                  rotateZ: 0,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
                animate={{ 
                  rotateZ: isSelected ? 0 : rotZ,
                  y: isSelected ? -200 : moveY,
                  opacity: isSelected ? 0 : 1,
                  scale: 1,
                }}
                onClick={() => {
                  if (selectedId !== card.id) {
                    playSuccess();
                    setSelectedId(card.id);
                  }
                }}
                onMouseEnter={() => !isSelected && playHover()}
                className="absolute inset-0 cursor-pointer origin-bottom"
              >
                <div className="w-full h-full relative group shadow-2xl">
                  {/* Card Back (Default state in hand) */}
                  <CardBack />
                  
                  {/* Small tooltip on hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-cyan-dark text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {language === 'zh' ? card.title : card.enTitle}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
