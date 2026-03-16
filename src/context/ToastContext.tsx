import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Bell } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'info' | 'success';
}

interface ToastContextType {
  showToast: (title: string, message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((title: string, message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[10000] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="bg-white border-4 border-cyan-main shadow-2xl p-4 min-w-[300px] pointer-events-auto rounded-2xl flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-main flex items-center justify-center shrink-0 shadow-sm border-2 border-white">
                {toast.type === 'achievement' ? <Trophy className="w-6 h-6 text-cyan-dark" /> : 
                 toast.type === 'success' ? <Star className="w-6 h-6 text-cyan-dark" /> : 
                 <Bell className="w-6 h-6 text-cyan-dark" />}
              </div>
              <div>
                <h4 className="font-black text-cyan-dark text-sm uppercase tracking-tighter">{toast.title}</h4>
                <p className="text-cyan-dark/60 text-xs font-bold leading-relaxed mt-1">{toast.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
