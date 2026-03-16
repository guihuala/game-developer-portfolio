import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Coffee, Play } from 'lucide-react';
import { Osmanthus3D } from './Osmanthus3D';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

export const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const { language, t } = useLanguage();
  const { playHover, playClick } = useSoundEffects();
  
  const fullText = language === 'zh' ? "你好，我是桂花拉糕" : "Hello, I'm mokukeki";
  const navigate = useNavigate();

  useEffect(() => {
    setText(''); // Reset text when language changes
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, Math.max(50, 150 - (fullText.length * 2))); // Faster for longer english text
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section id="start" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start z-20"
        >

          <h1 className="text-5xl md:text-6xl font-sans font-black text-cyan-dark leading-tight mb-2">
            <span className="block text-cyan-main">
              {text}<span className="typing-cursor"></span>
            </span>
            <span className="block mt-2">{t("专注于游戏设计", "Focusing on Game Design")}</span>
            <span className="block text-yellow-main drop-shadow-sm">{t("与开发.", "& Development.")}</span>
          </h1>

          <div className="space-y-2 mb-10">
            <p className="text-lg md:text-xl text-cyan-dark/80 max-w-lg font-sans font-bold leading-relaxed">
              {t(
                "我致力于打造有趣的游戏机制和温馨的视觉体验。用代码和创意构建美好的数字世界。", 
                "Dedicated to crafting engaging game mechanics and cozy visual experiences. Building beautiful digital worlds with code and creativity."
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => { playClick(); navigate('/works'); }}
              onMouseEnter={playHover}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-yellow-main text-cyan-dark font-black font-sans tracking-wider rounded-full flex items-center gap-3 shadow-lg shadow-yellow-main/30 transition-all"
            >
              <Play className="w-6 h-6 fill-current" />
              <div className="flex flex-col items-start leading-none">
                <span>{t("查看项目", "View Projects")}</span>
                <span className="text-[10px] uppercase opacity-70 mt-1">{t("View Projects", "Portfolio")}</span>
              </div>
            </motion.button>
            <motion.button
              onClick={() => { playClick(); navigate('/about'); }}
              onMouseEnter={playHover}
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/80 border-2 border-cyan-main text-cyan-main font-black font-sans tracking-wider rounded-full shadow-md transition-all flex items-center gap-2"
            >
              <div className="flex flex-col items-start leading-none">
                <span>{t("关于我", "About Me")}</span>
                <span className="text-[10px] uppercase opacity-70 mt-1">{t("About Me", "Profile")}</span>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Content - 3D Osmanthus Flower */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute right-0 top-0 z-0 w-full lg:w-[60%] h-full opacity-60 lg:opacity-100 pointer-events-auto"
        >
          {/* Glowing backdrop */}
          <div className="absolute inset-0 bg-yellow-main/20 blur-[100px] rounded-full w-3/4 h-3/4 m-auto pointer-events-none"></div>

          <Osmanthus3D />
        </motion.div>

      </div>
    </section>
  );
};
