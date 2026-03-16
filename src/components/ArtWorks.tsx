import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface ArtItem {
  id: number;
  image: string;
}

// 您现在只需添加图片路径，系统会自动根据高度适配宽度，确保图片不被裁切
const artworks: ArtItem[] = [
  { id: 1, image: "/art/鹤喰.png" },
  { id: 2, image: "/art/bg.png" },
  { id: 3, image: "/art/Image_658224922644321.jpg" },
  { id: 4, image: "/art/156828.jpg" },
  { id: 5, image: "/art/158419.jpg" },
  { id: 6, image: "/art/honakana.jpg" },
  { id: 7, image: "/art/1.jpg" },
  { id: 8, image: "/art/2.jpg" },
];

export const ArtWorks: React.FC = () => {
  const { t } = useLanguage();
  const { playHover } = useSoundEffects();

  const row1Items = artworks.filter((_, i) => i % 2 === 0);
  const row2Items = artworks.filter((_, i) => i % 2 !== 0);

  const row1 = [...row1Items, ...row1Items, ...row1Items];
  const row2 = [...row2Items, ...row2Items, ...row2Items];

  return (
    <div className="w-full min-h-[500px] lg:h-[750px] relative bg-cyan-dark/[0.03] rounded-[2rem] lg:rounded-[3rem] border-4 border-cyan-main/10 shadow-inner overflow-hidden flex flex-col justify-center gap-6 lg:gap-12 py-12 lg:py-16">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(0,188,212,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Floated Header */}
      <div className="absolute top-6 lg:top-8 left-6 lg:left-10 z-50 pointer-events-none">
        <h3 className="text-lg lg:text-xl font-black text-cyan-dark uppercase tracking-tighter flex items-center gap-3">
          <span className="w-8 lg:w-10 h-1 bg-cyan-main rounded-full" />
          {t("图库展示", "ART GALLERY")}
        </h3>
      </div>

      {/* Row 1: Leftward */}
      <div className="flex items-center h-40 lg:h-64">
        <motion.div 
          className="flex gap-6 lg:gap-10 px-6 lg:px-10 items-center h-full"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 40 + row1Items.length * 2, repeat: Infinity, ease: "linear" }}
          style={{ width: 'max-content' }}
        >
          {row1.map((art, index) => (
            <motion.div
              key={`r1-${art.id}-${index}`}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onMouseEnter={playHover}
              className="h-full flex-shrink-0 shadow-lg lg:shadow-xl rounded-lg lg:rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm border-2 border-cyan-light/10"
            >
              <img 
                src={art.image} 
                alt="" 
                className="h-full w-auto object-contain block" 
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Rightward */}
      <div className="flex items-center h-40 lg:h-64">
        <motion.div 
          className="flex gap-6 lg:gap-10 px-6 lg:px-10 items-center h-full"
          animate={{ x: ["-33.333%", "0%"] }}
          transition={{ duration: 35 + row2Items.length * 2, repeat: Infinity, ease: "linear" }}
          style={{ width: 'max-content' }}
        >
          {row2.map((art, index) => (
            <motion.div
              key={`r2-${art.id}-${index}`}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onMouseEnter={playHover}
              className="h-full flex-shrink-0 shadow-lg lg:shadow-xl rounded-lg lg:rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm border-2 border-cyan-light/10"
            >
              <img 
                src={art.image} 
                alt="" 
                className="h-full w-auto object-contain block" 
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-24 lg:w-48 bg-gradient-to-r from-white/20 via-white/5 to-transparent pointer-events-none z-20" />
      <div className="absolute inset-y-0 right-0 w-24 lg:w-48 bg-gradient-to-l from-white/20 via-white/5 to-transparent pointer-events-none z-20" />
    </div>
  );
};
