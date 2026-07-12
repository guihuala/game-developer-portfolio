import React, { lazy, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useToast } from '../context/ToastContext';
import { siteContent } from '../content/siteContent';

const Osmanthus3D = lazy(() => import('./Osmanthus3D').then((module) => ({
  default: module.Osmanthus3D,
})));

export const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const { language, t } = useLanguage();
  const { playHover, playClick, playSuccess } = useSoundEffects();
  const { showToast } = useToast();

  const content = siteContent.hero;
  const fullText = content.greeting[language];
  const navigate = useNavigate();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    const update3DVisibility = () => setShow3D(mediaQuery.matches);
    update3DVisibility();
    mediaQuery.addEventListener('change', update3DVisibility);
    return () => mediaQuery.removeEventListener('change', update3DVisibility);
  }, []);

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
          content.achievementTitle[language],
          content.achievementDescription[language],
          'achievement'
        );
      }

      // Auto hide bubble after 3 seconds
      const timer = setTimeout(() => setShowBubble(false), 3000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <section id="start" className="relative min-h-[75vh] flex items-center justify-center pt-20 overflow-hidden z-10">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Grid / Dots */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, var(--cyan-main) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start z-20 relative"
        >

          <h1 className="font-sans font-black text-cyan-dark leading-tight mb-2">
            <span className="block text-cyan-main text-2xl sm:text-4xl md:text-5xl mb-1">
              {text}<span className="typing-cursor"></span>
            </span>
            <span className="block text-3xl sm:text-5xl md:text-6xl">{content.titleLine1[language]}</span>
            <span className="block text-3xl sm:text-5xl md:text-6xl text-yellow-main drop-shadow-sm">{content.titleLine2[language]}</span>
          </h1>

          <div className="space-y-2 mb-10">
            <p className="text-base md:text-xl text-cyan-dark/80 max-w-lg font-sans font-bold leading-relaxed">
              {content.description[language]}
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
                <span>{content.projectsButton[language]}</span>
                <span className="text-[10px] uppercase opacity-70 mt-1">{content.projectsButtonCaption[language]}</span>
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
                <span>{content.aboutButton[language]}</span>
                <span className="text-[10px] uppercase opacity-70 mt-1">{content.aboutButtonCaption[language]}</span>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Content - 3D Osmanthus Flower */}
        <div className="hidden lg:block relative z-10 w-full lg:w-[calc(100%+6rem)] xl:w-[calc(100%+6rem)] lg:-mr-24 xl:-mr-48 h-[700px] xl:h-[800px] 2xl:h-[900px]">
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
            {show3D && (
              <Suspense fallback={null}>
                <Osmanthus3D />
              </Suspense>
            )}

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
                    {content.bubble[language]}
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
