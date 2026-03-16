import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gamepad2, Star, Code } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  enTitle: string;
  type: string;
  enType: string;
  image: string;
  color: string;
  desc: string;
  enDesc: string;
  tags: string[];
  details: {
    about: string;
    enAbout: string;
    features: string[];
    enFeatures: string[];
  }
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-cyan-dark/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border-4 border-white"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-cyan-dark hover:bg-yellow-main hover:text-white transition-colors shadow-sm"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="overflow-y-auto overflow-x-hidden custom-scrollbar">
              {/* Hero Image */}
              <div className="relative w-full h-64 md:h-80 bg-cyan-light">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 -mt-20 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 border-2 border-cyan-light">
                  <Star className="w-5 h-5" style={{ color: project.color, fill: project.color }} />
                  <span className="font-sans font-bold text-sm text-cyan-dark">{project.type} <span className="text-cyan-main/50 mx-1">|</span> {project.enType}</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black font-sans text-cyan-dark mb-2">
                  {project.title}
                </h2>
                <p className="text-xl font-black font-sans text-cyan-main uppercase tracking-widest mb-8">
                  {project.enTitle}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-cyan-light text-cyan-dark font-bold font-sans rounded-full text-sm border-2 border-white shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-black text-cyan-dark mb-2 flex items-center gap-2">
                      <Code className="w-6 h-6 text-yellow-main" /> 关于游戏
                    </h3>
                    <p className="text-sm font-bold text-cyan-main uppercase tracking-wider mb-4">About the Game</p>
                    <p className="text-cyan-dark/80 font-sans font-bold leading-relaxed mb-4">
                      {project.details.about}
                    </p>
                    <p className="text-cyan-dark/60 font-sans text-sm font-semibold leading-relaxed">
                      {project.details.enAbout}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-cyan-dark mb-2 flex items-center gap-2">
                      <Gamepad2 className="w-6 h-6 text-yellow-main" /> 核心特色
                    </h3>
                    <p className="text-sm font-bold text-cyan-main uppercase tracking-wider mb-4">Key Features</p>
                    <ul className="space-y-6">
                      {project.details.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-3 h-3 rounded-full bg-yellow-main mt-1.5 shrink-0 shadow-sm" />
                          <div>
                            <p className="font-bold text-cyan-dark">{feature}</p>
                            <p className="text-sm font-semibold text-cyan-dark/60 mt-1">{project.details.enFeatures[idx]}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
