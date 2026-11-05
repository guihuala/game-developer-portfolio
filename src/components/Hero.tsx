import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '../content/projects';
import { siteContent } from '../content/siteContent';
import { useLanguage } from '../context/LanguageContext';

const Osmanthus3D = lazy(() => import('./Osmanthus3D').then((module) => ({ default: module.Osmanthus3D })));

class ModelFallback extends React.Component<{ children: React.ReactNode; label: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <img src={siteContent.assets.avatar} alt={this.props.label} /> : this.props.children; }
}

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className={`studio-home ${language === 'en' ? 'studio-english' : ''}`}>
      <div className="studio-desk">
        <div className="desk-note desk-object">
          <span className="desk-tape" aria-hidden="true" />
          <span className="note-kicker">{t('桂花拉糕 / moku', 'mokukeki / moku')}</span>
          <h1>{t('你好，我是', "Hi, I’m")}<br />{t('桂花拉糕。', 'moku.')}</h1>
          <p>{t('主要做游戏程序，也参与玩法和美术。做过团队项目，也独立做过游戏。这里放了一些作品。', 'I mainly work on game programming, and also do gameplay design and art. Here are some games I’ve made with teams and on my own.')}</p>
          <Link to="/about">{t('关于我', 'About me')}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          <svg className="note-scribble" viewBox="0 0 90 30" fill="none" aria-hidden="true"><path d="M3 18C22 2 48 3 44 13S14 29 20 18 64 2 85 17M73 5l13 13-17 6" stroke="currentColor" strokeWidth="1.5" /></svg>
        </div>

        {featuredProjects.map((project, index) => (
          <Link className={`desk-project desk-object desk-project-${index + 1}`} to={`/project/${project.id}`} key={project.id}>
            <span className="project-print-head"><span>{t('游戏作品', 'Game')}</span><ArrowUpRight size={16} aria-hidden="true" /></span>
            <div className="project-print-image"><img src={project.image} alt={language === 'zh' ? project.title : project.enTitle} fetchPriority={index === 0 ? 'high' : 'auto'} /><span className="print-open">{t('打开作品', 'Explore project')}<ArrowUpRight size={17} /></span></div>
            <div className="project-print-caption"><h2>{language === 'zh' ? project.title : project.enTitle}</h2><span>{language === 'zh' ? project.type : project.enType}</span></div>
          </Link>
        ))}

        <div className="desk-mascot desk-object">
          <ModelFallback label={t('桂花角色', 'Moku’s character')}>
            <Suspense fallback={null}><Osmanthus3D /></Suspense>
          </ModelFallback>
        </div>

        <Link to="/experience" className="desk-ticket desk-object"><strong>{t('经历', 'Experience')}</strong><span>{t('Game Jam、比赛和现场照片', 'Game jams, competitions and photos')}<ArrowUpRight size={17} aria-hidden="true" /></span></Link>
        <span className="desk-flower" aria-hidden="true">✤</span>
      </div>

    </section>
  );
};
