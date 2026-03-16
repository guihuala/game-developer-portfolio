import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Code, Heart, Sparkles, Palette } from 'lucide-react';

const cards = [
  { 
    id: 1, 
    title: '设计哲学', 
    enTitle: 'Philosophy', 
    type: 'Core Value', 
    icon: User, 
    img: 'https://picsum.photos/seed/philosophy/600/800', 
    desc: '玩家体验至上。<br/>致力于打造<span class="text-cyan-main font-bold">引发共鸣</span>的沉浸式体验。', 
    color: '#00BCD4', 
    bgColor: '#E0F7FA' 
  },
  { 
    id: 2, 
    title: '技术栈', 
    enTitle: 'Tech Stack', 
    type: 'Skills', 
    icon: Code, 
    img: 'https://picsum.photos/seed/tech/800/600', 
    desc: '全栈开发与游戏引擎。<br/><span class="text-yellow-600 font-bold">React, Node.js, Unity, C#</span>', 
    color: '#FFD54F', 
    bgColor: '#FFF9C4' 
  },
  { 
    id: 3, 
    title: '业余爱好', 
    enTitle: 'Hobbies', 
    type: 'Life', 
    icon: Heart, 
    img: 'https://picsum.photos/seed/hobbies/600/600', 
    desc: '桌游设计、科幻小说、<br/><span class="text-cyan-main font-bold">摄影与像素画</span>。', 
    color: '#00ACC1', 
    bgColor: '#E0F7FA' 
  },
  { 
    id: 4, 
    title: '未来愿景', 
    enTitle: 'Vision', 
    type: 'Goal', 
    icon: Sparkles, 
    img: 'https://picsum.photos/seed/vision/800/800', 
    desc: '创造能够<span class="text-yellow-600 font-bold">启发灵感</span><br/>并连接人与人的虚拟世界。', 
    color: '#FBC02D', 
    bgColor: '#FFF9C4' 
  }
];

export const ArtGallery: React.FC = () => {
  const [activeCard, setActiveCard] = useState<typeof cards[0] | null>(null);

  const playCard = (card: typeof cards[0]) => {
    setActiveCard(card);
  };

  return (
    <section id="gallery" className="relative py-32 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-yellow-main rounded-full flex items-center justify-center mb-6 shadow-lg"
          >
            <Palette className="w-8 h-8 text-cyan-dark" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black font-sans text-cyan-dark mb-2 uppercase tracking-tighter">
            个人<span className="text-cyan-main">画廊</span>
          </h2>
          <p className="text-xl font-black text-cyan-main uppercase tracking-widest mb-6">About Me</p>
          <div className="w-24 h-1.5 rounded-full bg-cyan-main shadow-sm"></div>
          
          <div className="mt-6 space-y-1">
            <p className="text-cyan-dark/80 font-sans font-bold text-lg max-w-2xl">
              点击卡牌，了解更多关于我的故事与理念。
            </p>
            <p className="text-cyan-dark/50 font-sans font-semibold text-sm max-w-2xl mx-auto">
              Click the cards to learn more about my story and philosophy.
            </p>
          </div>
        </div>

        {/* Gallery Board Area */}
        <div className="relative w-full h-[600px] bg-white/60 backdrop-blur-xl rounded-[3rem] border-4 border-cyan-main/30 shadow-[0_8px_32px_rgba(0,188,212,0.1)] overflow-hidden flex flex-col items-center justify-between p-8"
             style={{ backgroundImage: 'radial-gradient(rgba(0,188,212,0.15) 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
          
          {/* Battlefield (Active Card) */}
          <div className="flex-1 w-full flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {activeCard ? (
                <motion.div
                  key={activeCard.id}
                  className="relative flex items-center justify-center cursor-pointer"
                  onClick={() => setActiveCard(null)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Light Burst Effect */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0.8, scale: 0.5 },
                      visible: { opacity: 0, scale: 3, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                    className="absolute w-64 h-64 bg-white rounded-full blur-3xl z-0 pointer-events-none"
                  />
                  
                  {/* The Card */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 50, scale: 0.8, rotate: -5 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        rotate: 0,
                        transition: { duration: 0.5, type: "spring" }
                      },
                      exit: { 
                        opacity: 0, 
                        scale: 0.8, 
                        filter: 'blur(10px)', 
                        transition: { duration: 0.2 } 
                      }
                    }}
                    className="relative w-72 h-[400px] rounded-2xl border-8 flex flex-col shadow-2xl z-10 overflow-hidden"
                    style={{ borderColor: activeCard.color, backgroundColor: activeCard.bgColor }}
                  >
                    {/* Icon */}
                    <div className="absolute top-2 left-2 w-12 h-12 bg-white rounded-full border-4 flex items-center justify-center shadow-lg z-40" style={{ borderColor: activeCard.color }}>
                      <activeCard.icon className="w-6 h-6" style={{ color: activeCard.color }} />
                    </div>
                    
                    {/* Title Banner */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[120%] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-y-2 border-white/50 py-1 z-30 shadow-md transform -rotate-2">
                      <div className="text-center text-white font-black text-xl tracking-widest">{activeCard.title}</div>
                    </div>
                    
                    {/* Image */}
                    <div className="w-full h-56 border-b-4 border-white relative mt-12 z-20">
                      <img src={activeCard.img} alt={activeCard.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Type */}
                    <div className="text-center text-sm font-bold text-cyan-dark/60 mt-2 uppercase tracking-widest">{activeCard.type}</div>

                    {/* Description */}
                    <div className="flex-1 bg-white/80 text-cyan-dark p-4 text-base font-bold text-center flex items-center justify-center m-2 rounded-md shadow-inner">
                      <span dangerouslySetInnerHTML={{ __html: activeCard.desc }} />
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="text-cyan-main/40 font-black text-2xl tracking-widest border-4 border-dashed border-cyan-main/30 rounded-3xl w-72 h-[400px] flex items-center justify-center bg-white/30">
                  SELECT A CARD
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Hand (Cards) */}
          <div className="h-48 w-full flex justify-center items-end gap-4 perspective-[1000px] z-20">
            {cards.map((card) => {
              const isActive = activeCard?.id === card.id;

              return (
                <div key={card.id} className="relative w-32 h-48 shrink-0">
                  <motion.div
                    onClick={() => playCard(card)}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ 
                      y: isActive ? -20 : 0, 
                      zIndex: isActive ? 50 : 10,
                      opacity: 1,
                      filter: isActive ? 'brightness(1)' : 'brightness(0.9)'
                    }}
                    whileHover={{ 
                      y: -30, 
                      scale: 1.1, 
                      zIndex: 40,
                      transition: { duration: 0.2 }
                    }}
                    className="absolute inset-0 rounded-xl border-4 flex flex-col shadow-xl overflow-hidden cursor-pointer"
                    style={{ borderColor: card.color, backgroundColor: card.bgColor }}
                  >
                    {/* Icon */}
                    <div className="absolute top-1 left-1 w-8 h-8 bg-white rounded-full border-2 flex items-center justify-center shadow-md z-40" style={{ borderColor: card.color }}>
                      <card.icon className="w-4 h-4" style={{ color: card.color }} />
                    </div>
                    
                    {/* Title Banner */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[120%] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-y border-white/50 py-0.5 z-30 shadow-sm transform -rotate-2">
                      <div className="text-center text-white font-bold text-[10px] tracking-widest">{card.title}</div>
                    </div>
                    
                    {/* Image */}
                    <div className="w-full h-24 border-b-2 border-white relative mt-8 z-20">
                      <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Type */}
                    <div className="text-center text-[10px] font-bold text-cyan-dark/60 mt-1">{card.type}</div>

                    {/* Description */}
                    <div className="flex-1 bg-white/80 text-cyan-dark p-1 text-[10px] font-bold text-center flex items-center justify-center m-1 rounded-sm overflow-hidden leading-tight">
                      <span dangerouslySetInnerHTML={{ __html: card.desc }} />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
