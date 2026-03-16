import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        {/* Simplified Osmanthus Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 flex items-center justify-center mb-8"
        >
          <span className="text-yellow-main text-6xl" style={{ transform: "rotate(45deg)", display: "inline-block" }}>✤</span>
        </motion.div>

        {/* Minimal Progress Text */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-cyan-dark font-black tracking-[0.4em] uppercase text-[10px]">
            Loading Protocol
          </span>
          <div className="w-32 h-1 bg-cyan-light/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-main"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-cyan-main font-black text-[10px] mt-1">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};
