import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface Props {
  to: string;
  zhText: string;
  enText: string;
}

export const NextModuleLink: React.FC<Props> = ({ to, zhText, enText }) => {
  const { language } = useLanguage();
  const { playHover, playClick } = useSoundEffects();
  
  return (
    <div className="w-full flex justify-end pr-6 lg:pr-12 py-8 relative z-10">
      <Link to={to}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={playHover}
          onClick={playClick}
          className="group flex flex-col items-end gap-1 px-6 py-3 bg-white rounded-3xl shadow-lg border-2 border-cyan-light hover:border-yellow-main hover:shadow-yellow-main/20 transition-all duration-300"
        >
          <span className="text-xl font-black font-sans text-cyan-dark group-hover:text-cyan-main transition-colors">
            {language === 'zh' ? zhText : enText}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-cyan-dark/50 uppercase tracking-widest">
              {enText}
            </span>
            <ArrowRight className="w-4 h-4 text-yellow-main group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </motion.button>
      </Link>
    </div>
  );
};
