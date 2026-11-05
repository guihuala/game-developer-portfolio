import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../constants/contactInfo';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <article className="pt-28 pb-16 min-h-screen max-w-3xl mx-auto px-5 md:px-8">
      <SEO title="About Me" description="Mokukeki is a game developer working across programming, gameplay design, and art." />
      <h1 className="text-3xl md:text-4xl font-black text-cyan-dark mb-8">{t('关于我', 'About Me')}</h1>
      <div className="space-y-5 text-base leading-loose text-cyan-dark/80">
        <p>{t('我是桂花拉糕，也叫 moku。主要做游戏程序，也参与玩法设计和美术。比起只负责一个环节，我更喜欢把一个想法从原型慢慢做成能玩的作品。', "I'm mokukeki, or moku. I mainly work on game programming, with a hand in gameplay design and art. I enjoy taking an idea from an early prototype to a playable game.")}</p>
        <p>{t('做过团队项目，也独立开发过游戏。《遗愿清单》和《步入沼泽》中，我负责制作与核心程序；《菌丝工厂》则由我独立完成玩法、程序和美术。', 'I work both with teams and on my own. On The Bucket List and Step or Sink, I handled production and core programming. For Mycelium Mill, I made the gameplay, code, and art myself.')}</p>
      </div>
      <p className="mt-7 text-sm text-cyan-dark/70">Unity / C# · Blender · Photoshop · Spine · Shader</p>
      <Link to="/experience" className="inline-block mt-7 text-sm font-bold text-cyan-dark underline underline-offset-4">{t('一些经历与现场记录', 'Experiences and event photos')}</Link>
      <div className="mt-12 pt-6 border-t border-cyan-main/15 flex flex-wrap gap-x-6 gap-y-3 text-sm text-cyan-dark">
        <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline underline-offset-4">{CONTACT_INFO.email}</a>
        <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">GitHub</a>
        <a href={CONTACT_INFO.itch} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">itch.io</a>
      </div>
    </article>
  );
};
