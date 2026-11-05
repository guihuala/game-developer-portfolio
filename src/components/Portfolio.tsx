import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { featuredProjects } from '../content/projects';

const roles: Record<number, { zh: string; en: string }> = {
  1: { zh: '制作人 · 主程序', en: 'Producer · Lead programmer' },
  2: { zh: '制作人 · 系统设计 · 核心程序', en: 'Producer · System design · Gameplay programming' },
  3: { zh: '独立开发 · 程序与美术', en: 'Solo development · Programming & art' },
};

export const Portfolio: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 pb-16">
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-cyan-dark">{t('精选作品', 'Selected Works')}</h1>
        <div aria-hidden="true" className="w-9 h-1 rounded-full bg-yellow-main mt-5" />
      </header>

      <div className="space-y-5 md:space-y-6">
        {featuredProjects.map((project, index) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className="group grid md:grid-cols-[1.15fr_1fr] gap-2 md:gap-0 p-3 rounded-2xl border border-cyan-dark/10 bg-white/80 shadow-[0_4px_20px_-12px_rgba(2,132,199,0.15)] transition-[border-color,box-shadow] duration-300 hover:border-cyan-main/40 hover:shadow-[0_12px_32px_-20px_rgba(2,132,199,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-dark"
          >
            <div className="overflow-hidden rounded-xl bg-cyan-light/30 self-center">
              <img
                src={project.image}
                alt={language === 'zh' ? project.title : project.enTitle}
                className="w-full aspect-[16/10] object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
            <div className="flex flex-col justify-center px-2 py-4 md:px-7 md:py-5 lg:px-9">
              <div className="flex items-center gap-3 text-xs mb-3 md:mb-4">
                <span aria-hidden="true" className="font-mono text-cyan-dark/45">0{index + 1}</span>
                <span aria-hidden="true" className="w-5 h-px bg-cyan-dark/20" />
                <span className="font-bold text-cyan-main">{language === 'zh' ? project.type : project.enType}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-cyan-dark group-hover:text-cyan-main transition-colors">{language === 'zh' ? project.title : project.enTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{language === 'zh' ? project.desc : project.enDesc}</p>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">{roles[project.id][language]}</p>
              <div className="mt-5 pt-4 border-t border-cyan-dark/10 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-cyan-dark">{t('查看项目', 'View project')}</span>
                <span className="w-8 h-8 rounded-full bg-cyan-light/50 text-cyan-dark flex items-center justify-center transition-colors group-hover:bg-cyan-dark group-hover:text-white">
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
