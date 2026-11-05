import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { siteContent } from '../content/siteContent';

const Osmanthus3D = lazy(() => import('./Osmanthus3D').then((module) => ({ default: module.Osmanthus3D })));

export const Hero: React.FC = () => {
  const [show3D, setShow3D] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    const update = () => setShow3D(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-12 min-h-[80vh] grid lg:grid-cols-2 items-center gap-6">
      <div className="py-12">
        <p className="text-base font-bold text-cyan-main mb-5">{siteContent.hero.greeting[language]}</p>
        <h1 className="text-4xl md:text-6xl font-black text-cyan-dark leading-tight">{t('做游戏，也把想法做出来。', 'Making games, bringing ideas to life.')}</h1>
        <p className="mt-6 max-w-md text-base leading-loose text-cyan-dark/80">{t('以程序为主，参与玩法与美术。这里是我和团队一起，以及自己独立完成的一些作品。', 'Game programming, gameplay, and art. A selection of games I have made with teams and on my own.')}</p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link to="/works" className="px-6 py-3 rounded-lg bg-cyan-dark text-white text-sm font-bold hover:bg-cyan-main transition-colors">{t('查看作品', 'View works')}</Link>
          <Link to="/about" className="py-3 text-sm font-bold text-cyan-dark underline underline-offset-4">{t('关于我', 'About me')}</Link>
        </div>
      </div>
      <div className="hidden lg:block h-[520px]">
        {show3D && <Suspense fallback={null}><Osmanthus3D /></Suspense>}
      </div>
    </section>
  );
};
