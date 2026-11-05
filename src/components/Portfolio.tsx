import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { featuredProjects } from '../content/projects';

const roles: Record<number, { zh: string; en: string }> = {
  1: { zh: '制作人 · 主程序', en: 'Producer · Lead programmer' },
  2: { zh: '制作人 · 系统设计 · 核心程序', en: 'Producer · System design · Gameplay programming' },
  3: { zh: '独立开发 · 程序与美术', en: 'Solo development · Programming & art' },
};

export const Portfolio: React.FC = () => {
  const { language, t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const project = featuredProjects[selected];
  const select = (index: number) => setSelected((index + featuredProjects.length) % featuredProjects.length);

  const handleKey = (event: React.KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % featuredProjects.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + featuredProjects.length - 1) % featuredProjects.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = featuredProjects.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="work-gallery">
      <div className="gallery-index">
        <h1>{t('精选', 'Selected')}<br /><span>{t('作品', 'Works')}<span className="title-period" aria-hidden="true">.</span></span></h1>
        <div className="project-tabs" role="tablist" aria-label={t('选择作品', 'Select a project')}>
          {featuredProjects.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => { tabs.current[index] = node; }}
              role="tab"
              id={`project-tab-${item.id}`}
              aria-controls="project-stage"
              aria-selected={index === selected}
              tabIndex={index === selected ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => handleKey(event, index)}
              className={`project-tab ${index === selected ? 'selected' : ''}`}
            >
              <span className="tab-copy"><span>{language === 'zh' ? item.title : item.enTitle}</span><small>{language === 'zh' ? item.type : item.enType}</small></span>
              <ArrowUpRight size={19} className="tab-arrow" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div id="project-stage" role="tabpanel" aria-labelledby={`project-tab-${project.id}`} tabIndex={0} className="project-stage">
        <div className="stage-visual">
          <div className="stage-grid" aria-hidden="true" />
          <AnimatePresence initial={false} mode="wait">
            <motion.div key={project.id} className="stage-image" initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }} transition={{ duration: reduceMotion ? 0 : .18 }}>
              <Link to={`/project/${project.id}`} aria-label={`${t('查看项目', 'View project')}: ${language === 'zh' ? project.title : project.enTitle}`}>
                <img src={project.image} alt={language === 'zh' ? project.title : project.enTitle} fetchPriority="high" />
                <span className="stage-open"><ArrowUpRight aria-hidden="true" /></span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="stage-caption">
          <div className="stage-description" aria-live="polite" aria-atomic="true">
            <p>{language === 'zh' ? project.desc : project.enDesc}</p>
            <small>{roles[project.id][language]}</small>
            <Link to={`/project/${project.id}`}>{t('查看项目', 'View project')}<ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
          <div className="stage-pagination">
            <span className="page-count" aria-hidden="true"><strong>0{selected + 1}</strong><span>/ 03</span></span>
            <div><button onClick={() => select(selected - 1)} aria-label={t('上一个作品', 'Previous project')}><ArrowLeft size={18} /></button><button onClick={() => select(selected + 1)} aria-label={t('下一个作品', 'Next project')}><ArrowRight size={18} /></button></div>
          </div>
        </div>
        <div className="stage-progress" aria-hidden="true">{featuredProjects.map((item, index) => <span key={item.id} className={index === selected ? 'active' : ''} />)}</div>
      </div>
    </section>
  );
};
