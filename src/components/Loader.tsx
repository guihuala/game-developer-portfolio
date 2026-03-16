import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500); // Wait a bit at 100%
          return 100;
        }
        // Random increment between 5 and 20
        return Math.min(prev + Math.floor(Math.random() * 15) + 5, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: '-100%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-[#F8FCFC] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Decorative background grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00BCD4 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Animated Logo / Icon */}
          <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 border-4 border-cyan-light/60 border-t-cyan-main rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-2 border-4 border-dashed border-yellow-main/60 rounded-full"
            />
            <Loader2 className="w-8 h-8 text-cyan-dark animate-pulse" />
          </div>

          <h1 className="text-3xl font-black text-cyan-dark tracking-widest uppercase mb-2">
            Loading Assets
          </h1>
          
          <div className="flex items-center gap-4 w-64 mt-4">
            <span className="text-cyan-main font-bold font-mono text-sm w-12 text-right">
              {progress}%
            </span>
            <div className="flex-1 h-1.5 bg-cyan-light/50 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-yellow-main shadow-[0_0_10px_rgba(255,213,79,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
          </div>
          
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-cyan-dark/50 text-xs font-bold uppercase tracking-[0.3em] mt-8"
          >
            Compiling Shaders...
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
