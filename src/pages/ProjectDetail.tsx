import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink, PlayCircle } from 'lucide-react';
import { projects, featuredProjects } from '../content/projects';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { ReadingDeck, ReadingPage } from '../components/ReadingDeck';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const project = projects.find((item) => item.id === Number(id));
  if (!project) return <section className="project-missing"><h1>{t('项目未找到', 'Project not found')}</h1><Link to="/">{t('返回作品集', 'Back to works')}</Link></section>;
  const local = <T,>(zh: T, en: T) => language === 'zh' ? zh : en;
  const pages: ReadingPage[] = [{ layout: 'feature', label: t('项目介绍', 'Overview'), title: local(project.title, project.enTitle), text: local(project.details.about, project.details.enAbout) }];
  if (project.details.honors?.length) pages.push({ layout: 'awards', label: t('奖项与成绩', 'Awards'), title: t('奖项与成绩', 'Awards & recognition'), content: <ul className="reader-awards">{project.details.honors.map((honor, i) => <li key={honor}>{local(honor, project.details.enHonors?.[i] ?? honor)}</li>)}</ul> });
  for (const [modules, label] of [[project.details.designModules, t('玩法设计', 'Game design')], [project.details.techModules, t('技术实现', 'Implementation')]] as const) {
    modules.forEach((module) => pages.push({ label, title: local(module.title, module.enTitle), text: local(module.content, module.enContent), image: module.image }));
  }
  project.details.gallery?.forEach((image, i) => pages.push({ label: `${t('项目截图', 'Gallery')} ${i + 1}`, title: t('游戏画面', 'In-game gallery'), image }));
  pages.push({ layout: 'visual', label: t('其他作品', 'More projects'), title: t('继续探索', 'Keep exploring'), content: <div className="reader-projects">{featuredProjects.filter((item) => item.id !== project.id).map((item) => <Link to={`/project/${item.id}`} key={item.id}><img src={item.image} alt="" /><span>{local(item.title, item.enTitle)} ↗</span></Link>)}</div> });
  return <article className="project-reader">
    <SEO title={project.enTitle} description={project.enDesc} image={project.image} />
    <ReadingDeck key={project.id} pages={pages} name={local(project.title, project.enTitle)} lead={<aside className="project-cover">
      {project.image && <img src={project.image} alt={local(project.title, project.enTitle)} />}
      <div className="project-cover-copy"><span>{local(project.type, project.enType)}</span><h1>{local(project.title, project.enTitle)}</h1><p>{local(project.desc, project.enDesc)}</p><div className="reader-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="reader-links">{project.trailerUrl && <a href={project.trailerUrl} target="_blank" rel="noreferrer"><PlayCircle size={17} />{t('观看视频', 'Watch video')}</a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">{t('体验 Demo', 'Try demo')}<ExternalLink size={16} /></a>}</div></div>
    </aside>} />
  </article>;
};
