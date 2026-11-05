import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../constants/contactInfo';
import { SEO } from '../components/SEO';
import { siteContent } from '../content/siteContent';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <article className="about-layout">
      <SEO title="About Me" description="Mokukeki is a game developer working across programming, gameplay design, and art." />
      <div className="about-introduction">
        <h1>{t('关于', 'About')}<br /><span>{t('我', 'Me')}<span className="title-period" aria-hidden="true">.</span></span></h1>
        <h2>{t('我是桂花拉糕，也叫 moku。', "I'm mokukeki, or moku.")}</h2>
        <div className="about-short-copy">
          <p>{t('主要做游戏程序，也参与玩法设计和美术。', 'I mainly work on game programming, and also do gameplay design and art.')}</p>
          <p>{t('做过团队项目，也独立完成过游戏。平时会画画、做模型，项目里需要的部分也会自己学着做。', 'I have worked on team projects and solo games. I also draw, make models, and learn what I need for each project.')}</p>
        </div>
        <p className="about-tool-line">Unity / C# · Blender · Photoshop · Spine · Shader</p>
        <div className="about-paths">
          <Link to="/works" className="primary-link">{t('查看作品', 'View works')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          <Link to="/experience" className="secondary-link">{t('经历与现场记录', 'Experiences & photos')}<ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="about-artwork">
        <div className="about-print">
          <div className="about-print-dots" aria-hidden="true" />
          <img src={siteContent.assets.avatar} alt={t('桂花拉糕的手绘角色', 'Mokukeki’s illustrated character')} width={2048} height={2048} />
          <svg className="about-spark" viewBox="0 0 90 90" fill="none" aria-hidden="true"><path d="M43 5c-3 24-9 33-35 37 23 4 33 15 36 41 3-24 16-36 39-40-23-3-36-16-40-38Z" stroke="currentColor" strokeWidth="2" /></svg>
        </div>
        <div className="about-contact">
          <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}<ArrowUpRight size={14} aria-hidden="true" /></a>
          <div><a href={CONTACT_INFO.github} target="_blank" rel="noreferrer">GitHub</a><a href={CONTACT_INFO.itch} target="_blank" rel="noreferrer">itch.io</a></div>
        </div>
      </div>
    </article>
  );
};
