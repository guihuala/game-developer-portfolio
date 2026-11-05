import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { assetUrl } from '../utils/assetUrl';

const milestones = [
  {
    "id": "start",
    "year": "2024",
    "title": "从一个想法开始动手",
    "enTitle": "Turning ideas into something playable",
    "desc": "2024 年开始正式学习游戏开发，从 Unity 和 C# 入手，把脑子里的想法一点点做成能玩的东西。比起单独学一项技术，我更喜欢带着一个具体的玩法去尝试，看看程序、画面和交互放在一起会是什么样子。",
    "enDesc": "I started learning game development in 2024 with Unity and C#, gradually turning ideas into playable things. I like learning through a concrete gameplay idea and seeing how code, visuals, and interaction come together."
  },
  {
    "id": "projects",
    "year": "2024",
    "title": "哪里需要，就多学一点",
    "enTitle": "Learning what the project needs",
    "desc": "最初做了《梦格事务所》和《Minute Through Dimensions》等项目，也开始和同学合作。程序是我的主要方向，但遇到项目里缺的部分，也会自己学着补上。后来画画、建模、动画和 Shader 都做了一些，慢慢习惯从整个作品的角度想问题。",
    "enDesc": "Early projects included Dream Agency and Minute Through Dimensions, alongside collaborations with classmates. Programming is my main focus, but I also learn what a project is missing. That has led me into drawing, modeling, animation, and shaders, and into thinking about the game as a whole."
  },
  {
    "id": "jams",
    "year": "2024 - 2026",
    "title": "从 Game Jam 到更完整的作品",
    "enTitle": "From game jams to fuller games",
    "desc": "这几年参加了 Game Jam 和高校游戏比赛，也尝试把短时间做出的原型继续做下去。《步入沼泽》就是从 Game Jam 的 Demo 开始，之后又花了大约三个月扩展。除了核心程序，我也参与玩法、关卡和美术，让最初的想法逐渐变成一个完整的游戏。后来也和团队带着《遗愿清单》参加活动，上台介绍我们的作品。",
    "enDesc": "I took part in game jams and university game competitions, and kept developing some of those prototypes. Step or Sink began as a game jam demo and grew through roughly three more months of work. Alongside core programming, I contributed to gameplay, levels, and art to turn the initial idea into a complete game. I also joined the team in presenting The Bucket List at events."
  },
  {
    "id": "portfolio",
    "year": "2025 - 2026",
    "title": "一起做游戏，也自己做游戏",
    "enTitle": "Making games together, and on my own",
    "desc": "在《遗愿清单》中，我担任制作人，参与系统设计、核心玩法程序和部分美术，也负责协调团队进度。这些照片记录了我们带着作品参加活动、上台分享的时刻。独立做《菌丝工厂》时，则从“菌丝能不能变成自动化管道”这个想法出发，把玩法、程序和美术都自己做了一遍。",
    "enDesc": "On The Bucket List, I worked as producer on system design, core gameplay programming, some art, and team coordination. These photos capture us sharing the game at events. For my solo project Mycelium Mill, I started with the idea of turning mycelium into automation pipes and made the gameplay, code, and art myself."
  },
  {
    "id": "study",
    "year": "2026",
    "title": "接下来，继续做，也继续学",
    "enTitle": "Continuing to make and learn",
    "desc": "现在一边整理作品，一边申请传媒方向的留学。接下来想继续把已有项目做得更完整，也从内容表达和受众的角度多理解游戏。想做的事情还有很多，还是希望从一个个具体的作品开始，做出自己也会想玩的东西。",
    "enDesc": "I am now organizing my portfolio and applying for further study in media. I want to keep developing my existing projects while learning more about how games communicate and reach their audiences. There is still plenty I want to explore, one project at a time, making games I would want to play myself."
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
