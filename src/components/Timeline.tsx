import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl } from '../utils/assetUrl';

const milestones = [
  {
    "id": "start",
    "year": "2024",
    "title": "开始做游戏",
    "enTitle": "Starting to make games",
    "desc": "2024 年开始学习 Unity 和 C#，也和同学做起了游戏。程序是主要方向，项目需要时，也会学着补上美术、建模和动画。",
    "enDesc": "I started learning Unity and C# in 2024 and making games with classmates. Programming is my main focus, with art, modeling, and animation learned along the way as projects needed them."
  },
  {
    "id": "jams",
    "year": "2024 - 2026",
    "title": "把原型继续做下去",
    "enTitle": "Taking prototypes further",
    "desc": "参加过 Game Jam 和高校游戏比赛。《步入沼泽》从 Jam 的 Demo 开始，又花了大约三个月扩展；后来也和团队带着《遗愿清单》参加活动，上台分享作品。",
    "enDesc": "I have taken part in game jams and university game competitions. Step or Sink grew from a jam demo through roughly three more months of development. With the team, I also presented The Bucket List at events."
  },
  {
    "id": "portfolio",
    "year": "2025 - 2026",
    "title": "团队合作与独立开发",
    "enTitle": "With a team and on my own",
    "desc": "在《遗愿清单》中负责制作、系统设计和核心程序，也协调团队进度。《菌丝工厂》则从菌丝管道的想法出发，玩法、程序和美术都由我独立完成。",
    "enDesc": "On The Bucket List, I handled production, system design, core programming, and team coordination. Mycelium Mill began with an idea for mycelium pipes; I made its gameplay, code, and art on my own."
  },
  {
    "id": "study",
    "year": "2026",
    "title": "接下来",
    "enTitle": "What comes next",
    "desc": "继续打磨已有项目，也在申请传媒方向的留学。想从内容表达和受众的角度多理解游戏，做出自己也会想玩的作品。",
    "enDesc": "I am continuing to develop my projects and applying for further study in media. I want to understand games through expression and audiences, and make things I would want to play myself."
  }
];

const photos = [
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

  return (
    <article className="max-w-3xl mx-auto px-5 md:px-8 pb-12 lg:pb-16">
      <h1 className="text-3xl md:text-4xl font-black text-cyan-dark mb-10">
        {zh ? '成长经历' : 'My Journey'}
      </h1>

      {milestones.map((item) => {
        const images = item.id === 'jams' ? [photos[0]] : item.id === 'portfolio' ? [photos[1], photos[2]] : [];

        return (
          <section key={item.id} className="mb-9 last:mb-0">
            <p className="text-xs font-bold text-cyan-main mb-2">{item.year}</p>
            <h2 className="text-lg md:text-xl font-bold text-cyan-dark mb-3">{zh ? item.title : item.enTitle}</h2>
            <p className="text-sm md:text-base leading-loose text-cyan-dark/80">{zh ? item.desc : item.enDesc}</p>

            {images.length > 0 && (
              <div className={`mt-6 grid gap-4 ${images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                {images.map((photo) => (
                  <figure key={photo.src} className="min-w-0">
                    <img
                      src={photo.src}
                      alt={zh ? photo.alt : photo.enAlt}
                      width={1920}
                      height={photo.height}
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                    />
                    <figcaption className="mt-2 text-xs leading-relaxed text-cyan-dark/65">
                      {zh ? photo.caption : photo.enCaption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </article>
  );
};
