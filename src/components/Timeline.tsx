import React, { useRef, useState } from 'react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl } from '../utils/assetUrl';
import { ReadingDeck, ReadingPage } from './ReadingDeck';

const photos = [
  {
    src: assetUrl('/experience/game-jam-2025.jpg'),
    height: 1292,
    caption: 'Game Jam 现场。',
    enCaption: 'At a game jam.',
    alt: 'Game Jam 现场，参与者围坐在桌前使用电脑制作游戏',
    enAlt: 'Game jam participants working on games together at their laptops',
  },
  {
    src: assetUrl('/experience/bucket-list-presentation.jpg'),
    height: 1281,
    caption: '和团队一起介绍《遗愿清单》。',
    enCaption: 'Presenting The Bucket List with the team.',
    alt: '团队在舞台上介绍《遗愿清单》，背景屏幕展示游戏画面',
    enAlt: 'The team presenting The Bucket List on stage with the game on screen',
  },
  {
    src: assetUrl('/experience/coreblazer-stage.jpg'),
    height: 1278,
    caption: '《遗愿清单》在开拓芯活动现场。',
    enCaption: 'The Bucket List at the Coreblazer event.',
    alt: '开拓芯活动舞台上的团队，背景屏幕展示《遗愿清单》',
    enAlt: 'The team on the Coreblazer stage with The Bucket List on screen',
  },
  {
    src: assetUrl('/experience/event-moment.jpg'),
    height: 1406,
    caption: '活动现场，和团队一起留下的记录。',
    enCaption: 'Another moment from the event with the team.',
    alt: '活动现场的舞台记录，参与者站在彩色背景屏幕前',
    enAlt: 'Event participants on stage in front of a colorful screen',
  },
];

export const Timeline: React.FC = () => {
  const { language } = useLanguage();
  const zh = language === 'zh';
  const [openPhoto, setOpenPhoto] = useState<(typeof photos)[number] | null>(null);
  const viewer = useRef<HTMLDialogElement>(null);

  const photoFigure = (photo: (typeof photos)[number]) => (
    <figure key={photo.src} className="experience-figure">
      <button className="experience-photo" onClick={() => { setOpenPhoto(photo); viewer.current?.showModal(); }} aria-label={`${zh ? '查看完整照片：' : 'View full photo: '}${zh ? photo.alt : photo.enAlt}`}>
        <img src={photo.src} alt={zh ? photo.alt : photo.enAlt} width={1920} height={photo.height} loading="lazy" />
        <span><ArrowUpRight size={20} aria-hidden="true" /></span>
      </button>
      <figcaption>{zh ? photo.caption : photo.enCaption}</figcaption>
    </figure>
  );

  const pages: ReadingPage[] = [
{ layout: 'feature', label: '2024', title: '2024', content: <div className="experience-year">

        <h3>{zh ? '开始做游戏' : 'Starting to make games'}</h3>
        <p>{zh ? '开始尝试独立开发，并全栈制作同人游戏。在创作中感受到了乐趣。' : 'I began exploring independent development, making fan games from start to finish and discovering the joy of creating.'}</p>
        <div className="experience-game-link">
          <a href="https://guihuala.itch.io/hebibibi" target="_blank" rel="noreferrer"><Play size={15} aria-hidden="true" /><span>{zh ? '试玩游戏' : 'Play a game'}</span><ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <p>{zh ? '参加了第一次gamejam，担任程序与美术，并在比赛中获得了最佳美术奖。' : 'I joined my first game jam as a programmer and artist, and the game won the Best Art award.'}</p>
      </div> },
{ label: '2025', title: '2025', content: <div className="experience-year">

        <p>{zh ? '开始参加各类gj和比赛。第一次参加了ggj，担任程序。' : 'I started taking part in more game jams and competitions, including my first Global Game Jam as a programmer.'}</p>
        <p>{zh ? '开发了多款游戏，并申请传媒方向的硕士。' : 'I developed several games and applied for a master’s degree in media.'}</p>

      </div> },
{ label: '2026', title: '2026', content: <div className="experience-year">

        <p>{zh ? '作为《遗愿清单》的制作人继续开发游戏。' : 'I continued developing The Bucket List as its producer.'}</p>
        <p>{zh ? '游戏入围了多项赛事，并得以展出。' : 'The game was shortlisted in several competitions and exhibited at events.'}</p>

        <p>{zh ? '开始攻读硕士学位，游戏开发依然作为兴趣在持续。' : 'I began my master’s degree, while continuing to make games as a personal interest.'}</p>
      </div> },
...photos.map((photo) => ({ layout: 'visual' as const, label: zh ? '现场照片' : 'Event photos', title: zh ? photo.caption : photo.enCaption, content: photoFigure(photo) }))
];
  return (
    <article className="experience-reader">
      <ReadingDeck pages={pages} name={zh ? '经历与现场记录' : 'Experience & photos'} />

      <dialog ref={viewer} className="photo-viewer" aria-label={zh ? '现场照片' : 'Event photo'} onClick={(event) => { if (event.target === event.currentTarget) viewer.current?.close(); }}>
        <button className="photo-viewer-close" onClick={() => viewer.current?.close()} aria-label={zh ? '关闭照片' : 'Close photo'}><X size={22} /></button>
        {openPhoto && <figure><img src={openPhoto.src} alt={zh ? openPhoto.alt : openPhoto.enAlt} /><figcaption>{zh ? openPhoto.caption : openPhoto.enCaption}</figcaption></figure>}
      </dialog>
    </article>
  );
};
