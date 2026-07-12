import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, ExternalLink, PlayCircle, Star, Trophy } from 'lucide-react';
import { projects } from '../content/projects';
import { useLanguage } from '../context/LanguageContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { SEO } from '../components/SEO';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { playHover, playClick } = useSoundEffects();
  const project = projects.find((item) => item.id === Number(id));
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => window.scrollTo(0, 0), [id]);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-black text-cyan-dark mb-6">{t('项目未找到', 'Project Not Found')}</h1>
        <button onClick={() => navigate('/works')} className="font-black text-cyan-main">{t('返回作品集', 'Back to Works')}</button>
      </div>
    );
  }

  const local = <T,>(zh: T, en: T) => language === 'zh' ? zh : en;

  return (
    <main className="pt-24 pb-24 min-h-screen">
      <SEO title={project.enTitle} description={project.enDesc} image={project.image} keywords={`${project.tags.join(', ')}, ${project.enType}, game developer`} />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-main origin-left z-[60]" style={{ scaleX }} />

      <article className="max-w-4xl mx-auto px-5 md:px-8">
        <button onClick={() => { playClick(); navigate('/works'); }} onMouseEnter={playHover} className="flex items-center gap-2 text-sm font-black text-cyan-dark/60 hover:text-cyan-main mb-14">
          <ArrowLeft className="w-4 h-4" /> {t('返回作品', 'Back to Works')}
        </button>

        <header className="relative w-full aspect-video overflow-hidden bg-cyan-dark mb-8 group rounded-[2rem] md:rounded-[3rem]">
          <img src={project.image} alt={local(project.title, project.enTitle)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-dark/90 via-cyan-dark/10 to-transparent" />
          <div className="absolute bottom-6 md:bottom-9 left-6 md:left-9 right-6 md:right-9 flex items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full mb-4">
                <Star className="w-4 h-4" style={{ color: project.color, fill: project.color }} />
                <span className="text-xs font-black text-cyan-dark uppercase tracking-wider">{local(project.type, project.enType)}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">{local(project.title, project.enTitle)}</h1>
              <p className="mt-2 text-sm md:text-lg font-black text-white/65 uppercase tracking-widest">{local(project.enTitle, project.title)}</p>
            </div>
            {project.trailerUrl && (
              <a href={project.trailerUrl} target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 bg-white text-cyan-dark px-5 py-3 rounded-full font-black text-sm">
                <PlayCircle className="w-5 h-5 text-yellow-main" />{t('观看视频', 'Watch video')}
              </a>
            )}
          </div>
        </header>

        <nav className="flex flex-wrap items-center justify-between gap-5 bg-white border border-cyan-main/10 rounded-2xl px-5 py-4 md:px-6 mb-16" aria-label={t('项目快速信息', 'Project quick links')}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-cyan-dark/40 uppercase tracking-widest mr-1">{t('技术栈', 'Stack')}</span>
            {project.tags.map((tag) => <span key={tag} className="px-3 py-1 bg-cyan-light rounded-full text-xs font-bold text-cyan-dark">{tag}</span>)}
          </div>
          <div className="flex gap-3">
            {project.trailerUrl && <a href={project.trailerUrl} target="_blank" rel="noreferrer" className="md:hidden inline-flex items-center gap-1 font-black text-sm text-cyan-main"><PlayCircle className="w-4 h-4" />{t('视频', 'Video')}</a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-cyan-dark text-white px-4 py-2 rounded-xl font-black text-sm">{t('体验 Demo', 'Try Demo')}<ExternalLink className="w-4 h-4" /></a>}
          </div>
        </nav>

        <ArticleSection title={t('项目介绍', 'Project Overview')}>
          <p>{local(project.details.about, project.details.enAbout)}</p>
          <ul className="mt-8 space-y-3 list-disc pl-5">
            {project.details.features.map((feature, index) => <li key={feature}>{local(feature, project.details.enFeatures[index])}</li>)}
          </ul>
        </ArticleSection>

        {project.details.honors?.length ? (
          <ArticleSection title={t('奖项与成绩', 'Awards')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.details.honors.map((honor, index) => (
                <div key={honor} className="flex items-center gap-4 bg-white border border-yellow-main/30 rounded-2xl p-5">
                  <span className="w-11 h-11 rounded-xl bg-yellow-main/15 text-yellow-600 flex items-center justify-center shrink-0"><Trophy className="w-5 h-5" /></span>
                  <span className="font-black text-cyan-dark text-sm md:text-base leading-relaxed">{local(honor, project.details.enHonors?.[index] ?? honor)}</span>
                </div>
              ))}
            </div>
          </ArticleSection>
        ) : null}

        {project.details.designModules.length > 0 && (
          <ArticleSection title={t('玩法与系统设计', 'Gameplay and System Design')}>
            {project.details.designModules.map((module) => (
              <ContentBlock key={module.title} title={local(module.title, module.enTitle)} text={local(module.content, module.enContent)} image={module.image} />
            ))}
          </ArticleSection>
        )}

        {project.details.techModules.length > 0 && (
          <ArticleSection title={t('技术实现', 'Technical Implementation')}>
            {project.details.techModules.map((module) => (
              <ContentBlock key={module.title} title={local(module.title, module.enTitle)} text={local(module.content, module.enContent)} image={module.image} />
            ))}
          </ArticleSection>
        )}

        {project.details.gallery?.length ? (
          <ArticleSection title={t('项目截图', 'Gallery')}>
            <div data-lenis-prevent className="flex gap-5 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-5 scrollbar-hide">
              {project.details.gallery.map((image, index) => (
                <figure key={image} className="min-w-[85%] md:min-w-[70%] snap-center overflow-hidden rounded-2xl bg-white border-4 border-white">
                  <img src={image} alt={`${local(project.title, project.enTitle)} ${index + 1}`} loading="lazy" className="w-full aspect-video object-cover" />
                </figure>
              ))}
            </div>
          </ArticleSection>
        ) : null}

        <nav className="pt-10 border-t border-cyan-main/20">
          <p className="text-sm font-black text-cyan-main mb-5">{t('其他项目', 'Other Projects')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.filter((item) => item.id !== project.id).slice(0, 3).map((item) => (
              <button key={item.id} onClick={() => navigate(`/project/${item.id}`)} className="text-left bg-white rounded-2xl overflow-hidden border border-cyan-main/10 group">
                <img src={item.image} alt={local(item.title, item.enTitle)} loading="lazy" className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="block p-5">
                  <span className="block text-[10px] font-black text-cyan-main uppercase tracking-widest mb-2">{local(item.type, item.enType)}</span>
                  <span className="block text-xl font-black text-cyan-dark group-hover:text-cyan-main transition-colors mb-2">{local(item.title, item.enTitle)}</span>
                  <span className="block text-sm font-semibold text-cyan-dark/55 leading-relaxed line-clamp-2">{local(item.desc, item.enDesc)}</span>
                </span>
              </button>
            ))}
          </div>
        </nav>
      </article>
    </main>
  );
};

const ArticleSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-20">
    <h2 className="text-3xl md:text-4xl font-black text-cyan-dark mb-7">{title}</h2>
    <div className="text-base md:text-lg text-cyan-dark/75 font-semibold leading-8">{children}</div>
  </section>
);

const ContentBlock = ({ title, text, image }: { key?: React.Key; title: string; text: string; image?: string }) => (
  <section className="mb-14 last:mb-0">
    <h3 className="text-xl md:text-2xl font-black text-cyan-dark mb-4">{title}</h3>
    <p>{text}</p>
    {image && <img src={image} alt={title} loading="lazy" className="w-full h-auto mt-7" />}
  </section>
);
