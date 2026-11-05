import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../constants/contactInfo';
import { SEO } from '../components/SEO';
import { siteContent } from '../content/siteContent';
import { ReadingDeck } from '../components/ReadingDeck';

export const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <article className="about-layout">
      <SEO title="About Me" description="Mokukeki is a game developer working across programming, gameplay design, and art." />
      <ReadingDeck name={t('关于我', 'About me')} pages={[
        {
          layout: 'feature', label: t('自我介绍', 'Introduction'),
          title: '桂花拉糕/moku',
          content: <div className="about-introduction">
            <div className="about-short-copy">
              <p>{t('主要做游戏程序，也参与玩法设计和美术。', 'I mainly work on game programming, and also do gameplay design and art.')}</p>
              <p>{t('做过团队项目，也独立完成过游戏。平时会画画、做模型，项目里需要的部分也会自己学着做。', 'I have worked on team projects and solo games. I also draw, make models, and learn what I need for each project.')}</p>
            </div>
            <p className="about-tool-line">Unity / C# · Blender · Photoshop · Spine · Shader</p>
            <div className="about-paths">
              <Link to="/" className="primary-link">{t('查看作品', 'View works')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link to="/experience" className="secondary-link">{t('经历与现场记录', 'Experiences & photos')}<ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
            <div className="about-contact" aria-label={t('联系方式', 'Contact details')}>
              <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>{CONTACT_INFO.phone}</a>
              <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={`tel:${CONTACT_INFO.phoneHongKong.replace(/\s/g, '')}`}>{CONTACT_INFO.phoneHongKong}</a>
              <a href={CONTACT_INFO.itch} target="_blank" rel="noreferrer">itch.io</a>
            </div>
          </div>,
        },
        {
          layout: 'visual', label: t('角色', 'Character'), title: t('桂花角色', 'Moku'),
          content: <div className="about-artwork">
            <div className="about-print">
              <img src={siteContent.assets.avatar} alt={t('桂花拉糕的手绘角色', 'Mokukeki’s illustrated character')} width={2048} height={2048} />

            </div>

          </div>,
        },
      ]} />
    </article>
  );
};
