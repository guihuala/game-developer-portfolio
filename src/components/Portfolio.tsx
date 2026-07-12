import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

import { projects, Project } from '../content/projects';
import { siteContent } from '../content/siteContent';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { playHover, playClick } = useSoundEffects();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHover}
      onClick={() => {
        playClick();
        navigate(`/project/${project.id}`);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[3/4] rounded-[2rem] cursor-pointer group perspective-1000"
    >
      {/* Card Body */}
      <div 
        className="absolute inset-0 rounded-[2rem] overflow-hidden bg-white border-4 border-white flex flex-col"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Image Top Half */}
        <div className="relative h-1/2 w-full overflow-hidden bg-cyan-light">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          {/* Cute Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <Star className="w-4 h-4" style={{ color: project.color, fill: project.color }} />
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-cyan-dark">
              {language === 'zh' ? project.type : project.enType}
            </span>
          </div>
        </div>

        {/* Content Bottom Half */}
        <div className="relative h-1/2 p-6 flex flex-col bg-white">
          <h3 className="text-2xl font-black font-sans mb-1 text-cyan-dark tracking-tight group-hover:text-cyan-main transition-colors">
            {language === 'zh' ? project.title : project.enTitle}
          </h3>
          <p className="text-[10px] font-black font-sans text-cyan-main/60 uppercase tracking-widest mb-3">
            {language === 'zh' ? project.enTitle : project.title}
          </p>
          
          <div className="space-y-1 mb-4">
            <p className="text-sm text-cyan-dark/80 font-sans font-bold line-clamp-2">
              {language === 'zh' ? project.desc : project.enDesc}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="text-[11px] font-bold font-sans px-2.5 py-1 rounded-full bg-cyan-light text-cyan-dark">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-auto flex items-center gap-2 text-sm font-black font-sans uppercase tracking-wider group-hover:underline" style={{ color: project.color }}>
            <Plus className="w-4 h-4" />
            {siteContent.portfolio.detailsButton[language]}
          </div>
        </div>
        
        {/* Glare Effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]"
          style={{ 
            x: useTransform(x, [-0.5, 0.5], ["-100%", "100%"]),
            y: useTransform(y, [-0.5, 0.5], ["-100%", "100%"])
          }}
        />
      </div>
    </motion.div>
  );
};

export const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const content = siteContent.portfolio;
  const allLabel = content.allFilter[language];
  const [selectedTag, setSelectedTag] = useState<string>(allLabel);
  const { playHover, playClick } = useSoundEffects();

  const usefulTags = ['Unity', 'C#', 'Art'];
  const allTags = [allLabel, ...usefulTags];

  const filteredProjects = selectedTag === allLabel
    ? projects 
    : projects.filter(p => p.tags.includes(selectedTag));

  return (
    <section id="quests" className="relative h-full z-10">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6 pb-4 lg:pb-8 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <aside className="lg:w-60 xl:w-64 lg:shrink-0 lg:pt-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-sans text-cyan-dark mb-2 uppercase tracking-tighter">
            {content.titlePrefix[language]}<span className="text-cyan-main">{content.titleHighlight[language]}</span>
          </h2>
          <div className="flex lg:flex-col flex-wrap gap-2 mt-5 lg:mt-8">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => { playClick(); setSelectedTag(tag); }}
              onMouseEnter={playHover}
              className={`px-4 py-2 rounded-lg font-sans font-bold text-sm text-left transition-colors duration-200 ${
                selectedTag === tag 
                  ? 'bg-cyan-light text-cyan-dark' 
                  : 'text-cyan-dark/55 hover:text-cyan-dark'
              }`}
            >
              {tag}
            </button>
          ))}
          </div>
        </aside>

        <motion.div
          layout
          data-lenis-prevent
          className="flex-1 min-h-0 h-full overflow-y-auto overscroll-contain lg:pr-3 pb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 content-start perspective-1000"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
