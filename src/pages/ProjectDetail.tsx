import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, Star, PlayCircle, ExternalLink, Code2, PenTool, Cpu, Trophy } from 'lucide-react';
import { projects } from '../content/projects';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { SEO } from '../components/SEO';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { playHover, playClick } = useSoundEffects();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const project = projects.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-black text-cyan-dark mb-4">{t("项目未找到", "Project Not Found")}</h1>
        <button 
          onClick={() => { playClick(); navigate('/works'); }}
          onMouseEnter={playHover}
          className="px-8 py-3 bg-yellow-main text-cyan-dark font-black rounded-full hover:scale-105 transition-transform"
        >
          {t("返回作品集 Back to Works", "Back to Works")}
        </button>
      </div>
    );
  }

  return (
    <div id="project-detail" className="pt-20 min-h-screen pb-20">
      <SEO 
        title={project.enTitle} 
        description={project.enDesc}
        image={project.image}
        keywords={`${project.tags.join(', ')}, ${project.enType}, game developer`}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-cyan-main origin-left z-[60]"
        style={{ scaleX }}
      />
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => { playClick(); navigate('/works'); }}
          onMouseEnter={playHover}
          className="group flex items-center gap-2 text-cyan-dark font-black font-sans uppercase tracking-wider mb-8 hover:text-cyan-main transition-colors mt-8"
        >
          <div className="p-2 rounded-full bg-white shadow-sm group-hover:bg-cyan-light transition-colors">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          {t("返回 Back", "Back")}
        </motion.button>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full aspect-video rounded-[3rem] overflow-hidden bg-cyan-dark shadow-2xl mb-12 border-8 border-white group/hero"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-dark/80 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div>
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 inline-flex shadow-lg mb-4">
                <Star className="w-5 h-5" style={{ color: project.color, fill: project.color }} />
                <span className="font-sans font-black text-sm uppercase tracking-wider text-cyan-dark">
                  {language === 'zh' ? project.type : project.enType}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black font-sans text-white drop-shadow-md tracking-tight">
                {language === 'zh' ? project.title : project.enTitle}
              </h1>
              <p className="text-xl md:text-2xl font-black text-white/80 uppercase tracking-widest mt-2">
                {language === 'zh' ? project.enTitle : project.title}
              </p>
            </div>
            
            {project.trailerUrl && (
              <button 
                onMouseEnter={playHover}
                onClick={() => { playClick(); window.open(project.trailerUrl, '_blank'); }}
                className="hidden md:flex items-center gap-3 px-8 py-4 bg-white text-cyan-dark rounded-full font-black uppercase tracking-wider hover:scale-105 transition-transform shadow-xl"
              >
                <PlayCircle className="w-6 h-6 text-yellow-main" />
                {t("观看 PV", "Watch PV")}
              </button>
            )}
          </div>
        </motion.div>

        {/* Quick Info Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-6 mb-12 border-2 border-white shadow-sm flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-black text-cyan-dark/40 uppercase tracking-widest mr-2">{t("技术栈", "Stack")}:</span>
            {project.tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-cyan-light/10 rounded-full font-bold text-xs text-cyan-dark border border-cyan-main/10">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <button 
                onMouseEnter={playHover}
                onClick={() => { playClick(); window.open(project.liveUrl, '_blank'); }}
                className="px-6 py-3 bg-cyan-dark text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-cyan-main transition-colors flex items-center gap-2 shadow-lg"
              >
                {t("体验 Demo", "Try Demo")} <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Content Section - Full Width */}
        <div className="space-y-16">
          
          {/* Overview Section */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-black text-cyan-dark mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-cyan-main/10 flex items-center justify-center text-cyan-main text-lg shadow-inner">01</span>
              {t("项目概述", "Overview")} <span className="text-cyan-dark/10 text-xl font-black uppercase tracking-[0.2em] ml-2">Context.Info</span>
            </h2>
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border-2 border-white leading-relaxed">
              <p className="text-cyan-dark/80 font-bold text-lg md:text-xl leading-relaxed">
                {language === 'zh' ? project.details.about : project.details.enAbout}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {project.details.features.map((feature, idx) => (
                  <div key={idx} className="bg-cyan-light/5 rounded-[2rem] p-6 border-2 border-transparent hover:border-cyan-main/20 transition-all group">
                    <Star className="w-6 h-6 text-yellow-main mb-4 group-hover:scale-110 transition-transform" fill="currentColor" />
                    <p className="text-cyan-dark font-black text-sm leading-relaxed">
                      {language === 'zh' ? feature : project.details.enFeatures[idx]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Honors & Awards Section */}
          {project.details.honors && project.details.honors.length > 0 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black text-cyan-dark mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-yellow-main/20 flex items-center justify-center text-yellow-main text-lg shadow-inner">★</span>
                {t("奖项荣誉", "Honors & Awards")} <span className="text-cyan-dark/10 text-xl font-black uppercase tracking-[0.2em] ml-2">Awards.Rec</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.details.honors.map((honor, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 border-2 border-yellow-main/20 shadow-sm flex items-center gap-4 group hover:border-yellow-main transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-main/10 flex items-center justify-center text-yellow-main shrink-0 group-hover:rotate-12 transition-transform">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <span className="text-cyan-dark font-black text-base">
                      {language === 'zh' ? honor : project.details.enHonors?.[idx]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Design & Tech Modules - Horizontal Scrolling Style */}
          <div className="grid grid-cols-1 gap-16">
            {/* Design Module */}
            {project.details.designModules && project.details.designModules.length > 0 && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-black text-cyan-dark mb-8 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-cyan-main/10 flex items-center justify-center text-cyan-main text-lg shadow-inner">02</span>
                  {t("系统设计", "System Design")} <span className="text-cyan-dark/10 text-xl font-black uppercase tracking-[0.2em] ml-2">Logic.Structure</span>
                </h2>
                
                <div className="relative group/scroll">
                   {/* Horizontal Scroll Area */}
                  <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide px-2 -mx-2 snap-x">
                    {project.details.designModules.map((module, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`min-w-[320px] md:min-w-[550px] rounded-[2.5rem] p-8 md:p-10 shadow-sm border-2 snap-center flex flex-col justify-between overflow-hidden cursor-default transition-all ${idx % 2 === 0 ? 'bg-white border-white' : 'bg-cyan-dark border-cyan-main/10 text-white'}`}
                      >
                         <div>
                           <div className="flex items-center gap-4 mb-6">
                             <div className={`p-3 rounded-2xl ${idx % 2 === 0 ? 'bg-cyan-main/10 text-cyan-main' : 'bg-cyan-main/20 text-cyan-main'}`}>
                               <IconForType type={module.icon} />
                             </div>
                             <h4 className="text-xl font-black uppercase tracking-tight">
                               {language === 'zh' ? module.title : module.enTitle}
                             </h4>
                           </div>
                           <p className={`${idx % 2 === 0 ? 'text-cyan-dark/70' : 'text-white/60'} text-sm font-bold leading-relaxed mb-8`}>
                              {language === 'zh' ? module.content : module.enContent}
                           </p>
                         </div>

                         {module.image && (
                            <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-cyan-dark/5 border-2 border-cyan-light/10 mt-auto">
                              <img src={module.image} alt={module.title} className="w-full h-full object-cover" />
                            </div>
                         )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Visual Indicator */}
                  {project.details.designModules.length > 1 && (
                    <div className="mt-4 flex justify-center gap-1.5 opacity-30 group-hover/scroll:opacity-100 transition-opacity">
                      {project.details.designModules.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'w-8 bg-cyan-main' : 'w-2 bg-cyan-light'}`} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tech Module */}
            {project.details.techModules && project.details.techModules.length > 0 && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-black text-cyan-dark mb-8 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-cyan-main/10 flex items-center justify-center text-cyan-main text-lg shadow-inner">03</span>
                  {t("技术实现", "Tech Evolution")} <span className="text-cyan-dark/10 text-xl font-black uppercase tracking-[0.2em] ml-2">Internal.Core</span>
                </h2>
                
                <div className="relative group/scroll-tech">
                  <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide px-2 -mx-2 snap-x">
                    {project.details.techModules.map((module, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`min-w-[320px] md:min-w-[550px] rounded-[2.5rem] p-8 md:p-10 shadow-sm border-2 snap-center flex flex-col justify-between overflow-hidden cursor-default transition-all ${idx % 2 === 0 ? 'bg-white border-white' : 'bg-cyan-dark border-cyan-main/10 text-white'}`}
                      >
                         <div>
                           <div className="flex items-center gap-4 mb-6">
                             <div className={`p-3 rounded-2xl ${idx % 2 === 0 ? 'bg-cyan-main/10 text-cyan-main' : 'bg-cyan-main/20 text-cyan-main'}`}>
                               <IconForType type={module.icon} />
                             </div>
                             <h4 className="text-xl font-black uppercase tracking-tight">
                               {language === 'zh' ? module.title : module.enTitle}
                             </h4>
                           </div>
                           <p className={`${idx % 2 === 0 ? 'text-cyan-dark/70' : 'text-white/60'} text-sm font-bold leading-relaxed mb-8`}>
                             {language === 'zh' ? module.content : module.enContent}
                           </p>
                         </div>

                         {module.image && (
                            <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-cyan-dark/5 border-2 border-cyan-light/10 mt-auto">
                              <img src={module.image} alt={module.title} className="w-full h-full object-cover" />
                            </div>
                         )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Visual Indicator */}
                  {project.details.techModules.length > 1 && (
                    <div className="mt-4 flex justify-center gap-1.5 opacity-30 group-hover/scroll-tech:opacity-100 transition-opacity">
                      {project.details.techModules.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'w-8 bg-cyan-main' : 'w-2 bg-cyan-light'}`} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Gallery Module */}
          {project.details.gallery && project.details.gallery.length > 0 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black text-cyan-dark mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-cyan-main/10 flex items-center justify-center text-cyan-main text-lg shadow-inner">04</span>
                {t("更多截图", "Snapshot.Ref")} <span className="text-cyan-dark/10 text-xl font-black uppercase tracking-[0.2em] ml-2">Visual.Gallery</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.details.gallery.map((img, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative aspect-video rounded-[2.5rem] overflow-hidden bg-white shadow-md border-4 border-white cursor-zoom-in"
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-cyan-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 p-3 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform">
                        <ExternalLink className="w-5 h-5 text-cyan-dark" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Projects Section */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="pt-16 border-t-2 border-cyan-light/20 mt-16">
            <h2 className="text-3xl font-black text-cyan-dark mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-cyan-main/10 flex items-center justify-center text-cyan-main text-lg shadow-inner">→</span>
                {t("继续探索", "Continue Exploration")}
              </div>
              <button 
                onClick={() => { playClick(); navigate('/works'); }}
                className="text-sm font-black text-cyan-main hover:underline uppercase tracking-widest"
              >
                {t("查看全部 View All", "View All")}
              </button>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.filter(p => p.id !== project.id).slice(0, 2).map(p => (
                <motion.div 
                  key={p.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => { playClick(); navigate(`/project/${p.id}`); window.scrollTo(0, 0); }}
                  onMouseEnter={playHover}
                  className="bg-white rounded-[2.5rem] p-4 shadow-sm border-2 border-white cursor-pointer group flex items-center gap-6"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shrink-0">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-xl font-black text-cyan-dark group-hover:text-cyan-main transition-colors truncate">
                      {language === 'zh' ? p.title : p.enTitle}
                    </h3>
                    <p className="text-[10px] font-black text-cyan-main/60 uppercase tracking-widest mb-2">
                       {language === 'zh' ? p.enTitle : p.title}
                    </p>
                    <p className="text-sm text-cyan-dark/60 font-bold line-clamp-2 leading-snug">
                       {language === 'zh' ? p.desc : p.enDesc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

// Unified Icon Selector
const IconForType = ({ type }: { type?: string }) => {
  switch (type) {
    case 'code': return <Code2 className="w-6 h-6" />;
    case 'cpu': return <Cpu className="w-6 h-6" />;
    case 'star': return <Star className="w-6 h-6" fill="currentColor" />;
    case 'trophy': return <Trophy className="w-6 h-6" />;
    case 'play': return <PlayCircle className="w-6 h-6" />;
    default: return <PenTool className="w-6 h-6" />;
  }
};
