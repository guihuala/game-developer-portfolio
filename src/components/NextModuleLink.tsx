import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Props {
  to: string;
  zhText: string;
  enText: string;
}

export const NextModuleLink: React.FC<Props> = ({ to, zhText, enText }) => {
  return (
    <div className="w-full flex justify-center py-16 relative z-10">
      <Link to={to}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex flex-col items-center gap-2 px-12 py-6 bg-white rounded-[2rem] shadow-lg border-4 border-cyan-light hover:border-yellow-main hover:shadow-yellow-main/20 transition-all duration-300"
        >
          <span className="text-2xl font-black font-sans text-cyan-dark group-hover:text-cyan-main transition-colors">
            {zhText}
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
