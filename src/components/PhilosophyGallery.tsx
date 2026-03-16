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
    title: '动作肉鸽', 
    enTitle: 'Action Roguelike', 
    type: 'ACTION / ROGUE', 
    enType: 'ACTION / ROGUE',
    icon: Zap, 
    img: 'https://picsum.photos/seed/hades/600/800', 
    desc: '喜欢具有挑战性的动作表现与机制反馈。代表作：《死亡细胞》、《哈迪斯》、《小骨》。', 
    enDesc: 'Focus on action feedback and challenging mechanics. Favs: Dead Cells, Hades, Skul.',
    color: '#FF5252', 
    cost: 1,
    edition: 'polychrome'
  },
  { 
    id: 2, 
    title: '卡牌构筑', 
    enTitle: 'Deck-building', 
    type: 'STRATEGY', 
    enType: 'STRATEGY',
    icon: Code, 
    img: 'https://picsum.photos/seed/slaythespire/800/600', 
    desc: '研究策略的深度与数值成长的逻辑。代表作：《杀戮尖塔》、《小丑牌》。', 
    enDesc: 'Studying strategic depth and numerical growth loops. Favs: Slay the Spire, Balatro.',
    color: '#FFD54F', 
    cost: 3,
    edition: 'holographic'
  },
  { 
    id: 3, 
    title: '模拟经营', 
    enTitle: 'Simulation', 
    type: 'COZY / MGMT', 
    enType: 'COZY / MGMT',
    icon: Heart, 
    img: 'https://picsum.photos/seed/stardew/600/600', 
    desc: '喜爱轻松治愈的氛围与长线经营设计。代表作：《星露谷物语》等。', 
    enDesc: 'Appreciating cozy atmospheres and long-term management. Favs: Stardew Valley, etc.',
    color: '#4ADE80', 
    cost: 2,
    edition: 'base'
  },
  { 
    id: 4, 
    title: '音乐游戏', 
    enTitle: 'Rhythm Games', 
    type: 'RHYTHM', 
    enType: 'RHYTHM',
    icon: Sparkles, 
    img: 'https://picsum.photos/seed/rhythm/600/600', 
    desc: '对节奏反馈与关卡设计有浓厚兴趣。喜爱各类传统音游与独立节奏作品。', 
    enDesc: 'Interested in rhythmic feedback and level design. Love traditional and indie titles.',
    color: '#F472B6', 
    cost: 1,
    edition: 'foil'
  },
  { 
    id: 5, 
    title: '二次元手游', 
    enTitle: 'Mobile Games', 
    type: 'SOCIAL / GACHA', 
    enType: 'SOCIAL / GACHA',
    icon: User, 
    img: 'https://picsum.photos/seed/gacha/600/800', 
    desc: '关注工业化叙事与角色塑造。长期体验各类高品质二次元手游。', 
    enDesc: 'Observation of industrial storytelling and character archetypes in mobile titles.',
    color: '#A78BFA', 
    cost: 1,
    edition: 'holographic'
  },
  { 
    id: 6, 
    title: '东方 Project', 
    enTitle: 'Touhou Project', 
    type: 'DANMAKU / DOUJIN', 
    enType: 'DANMAKU / DOUJIN',
    icon: Sparkles, 
    img: 'https://picsum.photos/seed/touhou/800/800', 
    desc: '深度爱好者，关注弹幕艺术与同人二创文化。', 
    enDesc: 'Hardcore fan, focusing on danmaku art and doujin culture.',
    color: '#00BCD4', 
    cost: 0,
    edition: 'negative'
  }
];

const CardBack = () => (
  <div className="absolute inset-0 bg-[#00151a] rounded-xl overflow-hidden border-2 border-cyan-light/30 flex flex-col items-center justify-center p-4">
    <div className="absolute inset-0 opacity-10 pointer-events-none" 
         style={{ 
           backgroundImage: `radial-gradient(circle at 2px 2px, #00BCD4 1px, transparent 0)`,
           backgroundSize: '16px 16px' 
         }}></div>
    <div className="w-12 h-12 rounded-full border-2 border-yellow-main/20 flex items-center justify-center relative">
      <span className="text-yellow-main/30 text-2xl font-black">✤</span>
    </div>
  </div>
);

const CardFoil = ({ mouseX, mouseY, edition }: { mouseX: any, mouseY: any, edition: CardEdition }) => {
  const foilX = useTransform(mouseX, [-0.5, 0.5], ["-20%", "120%"]);
  const foilY = useTransform(mouseY, [-0.5, 0.5], ["-20%", "120%"]);
  
  const isSpecial = edition !== 'base';

  const getFoilStyle = () => {
    switch (edition) {
      case 'foil':
        return 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 70%)';
      case 'holographic':
        return 'linear-gradient(110deg, transparent 20%, rgba(0,230,255,0.3) 40%, rgba(255,255,255,0.6) 50%, rgba(0,230,255,0.3) 60%, transparent 80%)';
      case 'polychrome':
        return 'linear-gradient(110deg, rgba(255,0,0,0.2) 0%, rgba(255,255,0,0.2) 20%, rgba(0,255,0,0.2) 40%, rgba(0,255,255,0.2) 60%, rgba(0,0,255,0.2) 80%, rgba(255,0,255,0.2) 100%)';
      case 'negative':
        return 'linear-gradient(110deg, #00151a 0%, #00BCD4 50%, #00151a 100%)';
      default:
        return 'none';
    }
  };
  
  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10 ${isSpecial ? 'opacity-50' : 'opacity-100'}`} />
      
      {isSpecial && (
        <>
          <motion.div 
            className={`absolute inset-0 pointer-events-none z-50 ${edition === 'polychrome' || edition === 'negative' ? 'opacity-100 mix-blend-screen' : 'opacity-0 group-hover:opacity-100 mix-blend-color-dodge'} transition-opacity duration-500`}
            style={{
              background: getFoilStyle(),
              backgroundSize: '400% 400%',
              backgroundPosition: `${foilX.get()} ${foilY.get()}`,
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-20 pointer-events-none z-20" />
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
    <div className="relative w-full h-[650px] bg-cyan-dark/[0.03] backdrop-blur-2xl rounded-[3rem] border-4 border-cyan-main/10 shadow-xl overflow-hidden flex flex-col items-center p-6"
         style={{ backgroundImage: 'radial-gradient(rgba(0,188,212,0.05) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}>
      
      {/* Background Decorative Elements (Homage) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {/* Floating background ghosts of cards */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [i * 60, i * 60 + 10, i * 60],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-40 h-60 border-2 border-cyan-main/20 rounded-2xl"
            style={{ 
              transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(300px)`,
            }}
          />
        ))}
      </div>

      {/* Decorative HUD */}
      <div className="absolute top-4 lg:top-6 left-4 lg:left-8 flex flex-col gap-1 lg:gap-2 z-10">
        <div className="flex items-center gap-2 lg:gap-4 text-cyan-main/60 font-black text-[7px] lg:text-[9px] uppercase tracking-[0.2em]">
          <div className="flex items-center gap-1.5 bg-cyan-main/10 border border-cyan-main/20 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-sm">
            <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-cyan-main rounded-full animate-pulse" />
            <span>{t("系统就绪", "SYSTEM READY")}</span>
          </div>
          <span>HP: 99/99</span>
          <span className="hidden sm:inline">GOLD: 125</span>
        </div>
        <div className="h-1 w-24 lg:w-48 bg-cyan-main/5 rounded-full overflow-hidden">
          <motion.div className="h-full bg-cyan-main/20" animate={{ width: ['0%', '100%'] }} transition={{ duration: 4, repeat: Infinity }} />
        </div>
      </div>

      <div className="absolute top-4 lg:top-6 right-4 lg:right-8 z-10 text-right">
        <div className="px-2 lg:px-3 py-0.5 lg:py-1 bg-yellow-main/10 border border-yellow-main/30 rounded-sm text-[7px] lg:text-[9px] font-black text-yellow-600 uppercase tracking-widest inline-block">
          {t("选择卡牌查看详情", "DECK VIEW")}
        </div>
      </div>

      {/* Battlefield (Central Focus) */}
      <div className="flex-1 w-full flex items-center justify-center relative perspective-[2000px] py-12 lg:py-0">
        {/* Floor Marking */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] border border-cyan-main/5 rounded-full [transform:rotateX(75deg)] -z-10" />
        
        <AnimatePresence mode="wait">
          {activeCard ? (
            <motion.div
              key={activeCard.id}
              initial={{ rotateY: 180, scale: 0.5, y: 100, opacity: 0 }}
              animate={{ rotateY: 360, scale: 1, y: -20, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="relative w-56 h-[380px] sm:w-72 sm:h-[440px] group cursor-pointer perspective-[2000px]"
              onMouseMove={handleMouseMove}
              onClick={() => setSelectedId(null)}
            >
              <motion.div 
                style={{ 
                  rotateX, 
                  rotateY, 
                  transformStyle: 'preserve-3d',
                }}
                className="w-full h-full relative"
              >
                {/* Front */}
                <div className={`absolute inset-0 rounded-xl lg:rounded-2xl border-[4px] lg:border-[6px] shadow-2xl overflow-hidden flex flex-col z-10 ${
                  activeCard.edition === 'negative' ? 'bg-[#000d11] border-cyan-main' : 'bg-white border-cyan-light'
                }`}>
                  
                  {/* Holographic foil layer */}
                  <CardFoil mouseX={mouseX} mouseY={mouseY} edition={activeCard.edition} />
                  
                  {/* Header */}
                  <div className={`flex justify-between items-center p-3 lg:p-4 mt-1 border-b border-cyan-main/5`}>
                    <span className={`font-black tracking-tighter ${activeCard.edition === 'negative' ? 'text-cyan-main' : 'text-cyan-dark'} text-sm lg:text-lg uppercase whitespace-nowrap overflow-hidden text-ellipsis`}>
                      {language === 'zh' ? activeCard.title : activeCard.enTitle}
                    </span>
                    <span className="text-[8px] lg:text-[10px] font-black opacity-30">#00{activeCard.id}</span>
                  </div>

                  {/* Art */}
                  <div className={`w-full h-32 lg:h-48 relative overflow-hidden bg-cyan-dark/5`}>
                    <img src={activeCard.img} className={`w-full h-full object-cover ${activeCard.edition === 'negative' ? 'invert hue-rotate-180 brightness-75' : 'grayscale-[0.1]'}`} alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Type Bar */}
                  <div className={`py-1 lg:py-1.5 px-3 lg:px-4 text-[7px] lg:text-[9px] font-black uppercase tracking-widest border-y border-cyan-main/10 ${
                    activeCard.edition === 'negative' ? 'bg-cyan-main/20 text-cyan-main' : 'bg-cyan-light/10 text-cyan-main'
                  }`}>
                    {language === 'zh' ? activeCard.type : activeCard.enType}
                  </div>

                  {/* Description Box */}
                  <div className={`flex-1 p-3 lg:p-5 text-xs lg:text-sm font-bold leading-relaxed ${
                    activeCard.edition === 'negative' ? 'text-white/80' : 'text-cyan-dark/80'
                  }`}>
                    <p className="line-clamp-4">{language === 'zh' ? activeCard.desc : activeCard.enDesc}</p>
                  </div>

                  {/* Footer */}
                  <div className={`pb-3 lg:pb-4 px-3 lg:px-5 flex justify-between items-center opacity-30 text-[7px] lg:text-[8px] font-black uppercase tracking-tighter`}>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-cyan-main rounded-full" />
                      <span>{activeCard.edition}</span>
                    </div>
                    <span>© 2026 Moku.Dev</span>
                  </div>
                </div>

                {/* Back */}
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
              <div className="w-56 h-[340px] lg:w-72 lg:h-[420px] rounded-[1.5rem] lg:rounded-3xl border-4 border-dashed border-cyan-main/20 flex flex-col items-center justify-center p-6 lg:p-10 text-center relative">
                <div className="w-14 h-14 lg:w-20 lg:h-20 bg-cyan-main/5 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 lg:w-10 lg:h-10 text-cyan-main/20 animate-pulse" />
                </div>
                <h4 className="text-sm lg:text-xl font-black text-cyan-main/30 uppercase tracking-[0.2em]">
                  {t("等待选择", "SELECT A CARD")}
                </h4>
                <p className="text-[10px] lg:text-xs font-bold text-cyan-main/20 mt-4 leading-relaxed">
                  {t("从下方手牌中选择一张，\n将其置入战场中心。", "Select a card from your hand\nand move it to center stage.")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The Hand (Bottom Card Rack) */}
      <div className="h-32 lg:h-44 w-full max-w-4xl relative flex items-end justify-center perspective-[1000px] mt-4 mb-2 lg:mb-0">
        {philosophyCards.map((card, index) => {
          const isSelected = selectedId === card.id;
          const total = philosophyCards.length;
          const rotZ = (index - (total - 1) / 2) * (window.innerWidth < 640 ? 6 : 8); 
          const moveY = Math.abs(index - (total - 1) / 2) * (window.innerWidth < 640 ? 5 : 10);
          
          return (
            <div 
              key={card.id} 
              className="relative w-16 h-28 sm:w-28 sm:h-40 -ml-4 sm:-ml-8 first:ml-0 group"
              style={{ zIndex: isSelected ? 100 : 10 + index }}
            >
              <motion.div
                layoutId={`card-${card.id}`}
                whileHover={{ 
                  y: -30, 
                  scale: 1.1, 
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
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-cyan-dark text-white px-2 py-1 rounded text-[7px] lg:text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
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
