import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Star, PlayCircle, ExternalLink, Code2, PenTool, Cpu } from 'lucide-react';
import { projects } from '../data/projects';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-black text-cyan-dark mb-4">项目未找到</h1>
        <p className="text-cyan-dark/60 mb-8 font-bold">Project Not Found</p>
        <button onClick={() => navigate('/works')} className="px-8 py-3 bg-yellow-main text-cyan-dark font-black rounded-full hover:scale-105 transition-transform">
          返回作品集 Back to Works
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/works')}
          className="group flex items-center gap-2 text-cyan-dark font-black font-sans uppercase tracking-wider mb-8 hover:text-cyan-main transition-colors mt-8"
        >
          <div className="p-2 rounded-full bg-white shadow-sm group-hover:bg-cyan-light transition-colors">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          返回 Back
        </motion.button>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full aspect-video rounded-[3rem] overflow-hidden bg-cyan-dark shadow-2xl mb-12 border-8 border-white"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-dark/80 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div>
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 inline-flex shadow-lg mb-4">
                <Star className="w-5 h-5" style={{ color: project.color, fill: project.color }} />
                <span className="font-sans font-black text-sm uppercase tracking-wider text-cyan-dark">{project.type}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black font-sans text-white drop-shadow-md tracking-tight">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl font-black text-white/80 uppercase tracking-widest mt-2">{project.enTitle}</p>
            </div>
            
            <button className="hidden md:flex items-center gap-3 px-8 py-4 bg-white text-cyan-dark rounded-full font-black uppercase tracking-wider hover:scale-105 transition-transform shadow-xl">
              <PlayCircle className="w-6 h-6 text-yellow-main" />
              观看预告片
            </button>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left, 2/3) */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="text-3xl font-black text-cyan-dark mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan-light flex items-center justify-center text-cyan-main text-lg">1</span>
                项目概述 <span className="text-cyan-dark/30 text-lg uppercase tracking-widest">Overview</span>
              </h2>
              <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-white leading-relaxed">
                <p className="text-cyan-dark/80 font-bold text-lg mb-4">{project.details.about}</p>
                <p className="text-cyan-dark/50 font-semibold text-sm">{project.details.enAbout}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <h2 className="text-3xl font-black text-cyan-dark mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-yellow-main/20 flex items-center justify-center text-yellow-main text-lg">2</span>
                核心特色 <span className="text-cyan-dark/30 text-lg uppercase tracking-widest">Features</span>
              </h2>
              <div className="grid gap-4">
                {project.details.features.map((feature, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border-2 border-white flex items-start gap-4">
                    <div className="mt-1" style={{ color: project.color }}>
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <p className="text-cyan-dark font-black text-lg">{feature}</p>
                      <p className="text-cyan-dark/50 font-semibold text-xs mt-1">{project.details.enFeatures[idx]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Added: Design Module */}
            {(project.details as any).designModule && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <h2 className="text-3xl font-black text-cyan-dark mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-lg">
                    <PenTool className="w-4 h-4" />
                  </span>
                  系统设计 <span className="text-cyan-dark/30 text-lg uppercase tracking-widest">System Design</span>
                </h2>
                <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-white leading-relaxed">
                  <h3 className="text-xl font-bold text-cyan-dark mb-2">{(project.details as any).designModule.title}</h3>
                  <p className="text-sm font-bold text-cyan-dark/50 uppercase tracking-widest mb-4">{(project.details as any).designModule.enTitle}</p>
                  
                  <p className="text-cyan-dark/80 font-bold text-base mb-4">{(project.details as any).designModule.content}</p>
                  <p className="text-cyan-dark/50 font-semibold text-sm">{(project.details as any).designModule.enContent}</p>
                </div>
              </motion.div>
            )}

            {/* Added: Tech Module */}
            {(project.details as any).techModule && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <h2 className="text-3xl font-black text-cyan-dark mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-cyan-dark/10 flex items-center justify-center text-cyan-dark text-lg">
                    <Cpu className="w-4 h-4" />
                  </span>
                  技术实现 <span className="text-cyan-dark/30 text-lg uppercase tracking-widest">Implementation</span>
                </h2>
                <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-white leading-relaxed">
                  <h3 className="text-xl font-bold text-cyan-dark mb-2">{(project.details as any).techModule.title}</h3>
                  <p className="text-sm font-bold text-cyan-dark/50 uppercase tracking-widest mb-4">{(project.details as any).techModule.enTitle}</p>
                  
                  <p className="text-cyan-dark/80 font-bold text-base mb-4">{(project.details as any).techModule.content}</p>
                  <p className="text-cyan-dark/50 font-semibold text-sm">{(project.details as any).techModule.enContent}</p>
                </div>
              </motion.div>
            )}

          </div>

          {/* Sidebar (Right, 1/3) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="space-y-8"
          >
             {/* Tech Stack */}
             <div className="bg-gradient-to-b from-cyan-light/30 to-white rounded-[2rem] p-8 shadow-sm border-2 border-white">
              <h3 className="text-xl font-black text-cyan-dark mb-6 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-cyan-main" /> 技术栈
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white rounded-full font-bold text-sm text-cyan-dark shadow-sm border border-cyan-main/10 flex-grow text-center">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border-2 border-white text-center">
              <h3 className="text-lg font-black text-cyan-dark mb-4">想要了解更多？</h3>
              <button className="w-full py-4 bg-cyan-dark text-white rounded-xl font-black uppercase tracking-widest hover:bg-cyan-main transition-colors flex items-center justify-center gap-2">
                Visit Website <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
