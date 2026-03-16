import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';

import { projects } from '../data/projects';
import { Project } from '../data/projects';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const navigate = useNavigate();

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
      onClick={() => navigate(`/project/${project.id}`)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[3/4] rounded-[2rem] cursor-pointer group perspective-1000"
    >
      {/* Card Body */}
      <div 
        className="absolute inset-0 rounded-[2rem] overflow-hidden bg-white shadow-xl transition-all duration-300 border-4 border-white group-hover:shadow-2xl flex flex-col"
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
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-cyan-dark">{project.type}</span>
          </div>
        </div>

        {/* Content Bottom Half */}
        <div className="relative h-1/2 p-6 flex flex-col bg-white">
          <h3 className="text-2xl font-black font-sans mb-1 text-cyan-dark tracking-tight group-hover:text-cyan-main transition-colors">
            {project.title}
          </h3>
          <p className="text-[10px] font-black font-sans text-cyan-main/60 uppercase tracking-widest mb-3">
            {project.enTitle}
          </p>
          
          <div className="space-y-1 mb-4">
            <p className="text-sm text-cyan-dark/80 font-sans font-bold line-clamp-2">
              {project.desc}
            </p>
            <p className="text-xs text-cyan-dark/50 font-sans font-semibold line-clamp-1">
              {project.enDesc}
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
            查看详情 Details
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
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  const filteredProjects = selectedTag === 'All' 
    ? projects 
    : projects.filter(p => p.tags.includes(selectedTag));

  return (
    <section id="quests" className="relative py-32 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-black font-sans text-cyan-dark mb-2 uppercase tracking-tighter">
            项目<span className="text-cyan-main">展示</span>
          </h2>
          <p className="text-xl font-black text-cyan-main uppercase tracking-widest mb-6">Selected Works</p>
          <div className="w-24 h-1.5 rounded-full bg-cyan-main shadow-sm"></div>
          <div className="mt-6 space-y-1">
            <p className="text-cyan-dark/80 font-sans font-bold text-lg max-w-2xl">
              已完成的原型和发布的项目。点击卡片查看详情。
            </p>
            <p className="text-cyan-dark/50 font-sans font-semibold text-sm max-w-2xl mx-auto">
              A collection of completed prototypes and shipped titles. Click cards to inspect details.
            </p>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2 rounded-full font-sans font-bold text-sm transition-all duration-300 ${
                selectedTag === tag 
                  ? 'bg-cyan-main text-white shadow-md shadow-cyan-main/30' 
                  : 'bg-white text-cyan-dark/70 hover:bg-cyan-light hover:text-cyan-main shadow-sm'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000">
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
