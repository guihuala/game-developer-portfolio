import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLocation } from 'react-router-dom';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <motion.main
      key={pathname}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
};
