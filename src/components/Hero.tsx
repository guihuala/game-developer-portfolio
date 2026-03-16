import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';
import { Osmanthus3D } from './Osmanthus3D';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useToast } from '../context/ToastContext';

export const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const { language, t } = useLanguage();
  const { playHover, playClick, playSuccess } = useSoundEffects();
  const { showToast } = useToast();

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

  const handleModelClick = () => {
    playClick();
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 3) {
      setShowBubble(true);
      if (newCount === 7) {
        setClickCount(0);
        playSuccess();
        showToast(
          language === 'zh' ? '成就达成！' : 'Achievement!',
          language === 'zh' ? '你发现了一个喜欢被戳的桂花。' : 'You found a flower that likes to be poked.',
          'achievement'
        );
      }

      // Auto hide bubble after 3 seconds
      const timer = setTimeout(() => setShowBubble(false), 3000);
      return () => clearTimeout(timer);
    }
  };

  const bubbleMessage = {
    zh: "再戳就要变成拉糕了...",
    en: "Stop poking... I'll turn into a cake..."
  };

  return (
    <section id="start" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start z-20"
        >

          <h1 className="font-sans font-black text-cyan-dark leading-tight mb-2">
            <span className="block text-cyan-main text-2xl sm:text-4xl md:text-5xl mb-1">
              {text}<span className="typing-cursor"></span>
            </span>
            <span className="block text-3xl sm:text-5xl md:text-6xl">{t("专注于游戏设计", "Focusing on Game Design")}</span>
            <span className="block text-3xl sm:text-5xl md:text-6xl text-yellow-main drop-shadow-sm">{t("与开发.", "& Development.")}</span>
          </h1>

          <div className="space-y-2 mb-10">
            <p className="text-base md:text-xl text-cyan-dark/80 max-w-lg font-sans font-bold leading-relaxed">
              {t(
                "我致力于打造有趣的游戏机制和温馨的视觉体验。用代码和创意构建美好的数字世界。",
                "Dedicated to crafting engaging game mechanics and cozy visual experiences. Building beautiful digital worlds with code and creativity."
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.button
              onClick={() => { playClick(); navigate('/works'); }}
              onMouseEnter={playHover}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-yellow-main text-cyan-dark font-black font-sans tracking-wider rounded-full flex items-center justify-center gap-3 shadow-lg shadow-yellow-main/30 transition-all border-b-4 border-yellow-600 active:border-b-0"
            >
              <Play className="w-5 h-5 fill-current" />
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
              className="px-8 py-4 bg-white/80 border-2 border-cyan-main text-cyan-main font-black font-sans tracking-wider rounded-full shadow-md transition-all flex items-center justify-center gap-2"
            >
              <div className="flex flex-col items-start leading-none">
                <span>{t("关于我", "About Me")}</span>
                <span className="text-[10px] uppercase opacity-70 mt-1">{t("About Me", "Profile")}</span>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Content - 3D Osmanthus Flower */}
        <div className="hidden lg:block relative z-10 w-full lg:w-[calc(100%+10rem)] xl:w-[calc(100%+12rem)] lg:-mr-24 xl:-mr-48 h-[700px] xl:h-[850px] 2xl:h-[1000px]">
          {/* Glowing backdrop */}
          <div className="absolute inset-0 bg-yellow-main/20 blur-[120px] rounded-full w-full h-full m-auto pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              rotate: clickCount > 0 ? [0, -4, 4, -4, 4, 0] : 0,
              scale: clickCount > 0 ? [1, 1.05, 1] : 1
            }}
            transition={{
              opacity: { duration: 1.5 },
              rotate: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
            onClick={handleModelClick}
            className="w-full h-full cursor-pointer relative pointer-events-auto"
          >
            <Osmanthus3D />

            {/* Speech Bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 z-30 bg-white px-6 py-3 rounded-2xl shadow-xl border-4 border-yellow-main whitespace-nowrap"
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-[15px] border-transparent border-t-yellow-main"></div>
                  <span className="text-cyan-dark font-black text-sm">
                    {language === 'zh' ? bubbleMessage.zh : bubbleMessage.en}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
