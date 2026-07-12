import React from 'react';
import { Heart, Code, Sparkles, User, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const gameInterests = [
  {
    title: '动作肉鸽',
    enTitle: 'Action Roguelike',
    desc: '喜欢操作反馈直接、需要反复练习的动作游戏。常玩《死亡细胞》《哈迪斯》和《小骨》。',
    enDesc: 'I enjoy action games with direct feedback and room for practice, including Dead Cells, Hades, and Skul.',
    icon: Zap,
  },
  {
    title: '卡牌构筑',
    enTitle: 'Deck-building',
    desc: '喜欢研究卡组之间的配合，以及每一局逐渐成型的过程。常玩《杀戮尖塔》和《小丑牌》。',
    enDesc: 'I enjoy finding card synergies and watching a build take shape over a run. Favorites include Slay the Spire and Balatro.',
    icon: Code,
  },
  {
    title: '模拟经营',
    enTitle: 'Simulation',
    desc: '会玩节奏比较慢的经营游戏，也很喜欢看一个小系统慢慢运转起来。代表作是《星露谷物语》。',
    enDesc: 'I like slower management games and watching small systems gradually come together, especially Stardew Valley.',
    icon: Heart,
  },
  {
    title: '音乐游戏',
    enTitle: 'Rhythm Games',
    desc: '长期在玩各类音游。除了打歌，也会留意谱面怎么配合音乐，以及反馈做得是否舒服。',
    enDesc: 'I have played rhythm games for years and often pay attention to chart design and how feedback follows the music.',
    icon: Sparkles,
  },
  {
    title: '二次元手游',
    enTitle: 'Mobile Games',
    desc: '玩过不少二次元手游，比较关注角色、美术和剧情是怎么长期更新与配合的。',
    enDesc: 'I have played many character-focused mobile games and follow how their art, characters, and stories develop over time.',
    icon: User,
  },
  {
    title: '东方 Project',
    enTitle: 'Touhou Project',
    desc: '从游戏到同人创作都很喜欢，也做过相关的同人小游戏。',
    enDesc: 'I enjoy both the games and the wider doujin scene, and have made several Touhou fan games myself.',
    icon: Sparkles,
  },
];

export const PhilosophyGallery: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="w-full max-w-5xl mx-auto py-4 md:py-8">
      <header className="mb-8 max-w-2xl">
        <h3 className="text-2xl md:text-3xl font-black text-cyan-dark mb-3">
          {language === 'zh' ? '我平时在玩什么' : 'Games I Play'}
        </h3>
        <p className="text-cyan-dark/65 font-bold leading-relaxed">
          {language === 'zh'
            ? '这些是我比较常玩的游戏类型。它们多少也会影响我做玩法和画面时的选择。'
            : 'These are the kinds of games I play most often. They also influence how I approach gameplay and visuals.'}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
        {gameInterests.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.enTitle} className="flex gap-4 py-5 border-t border-cyan-main/15">
              <Icon className="w-5 h-5 text-cyan-main shrink-0 mt-1" />
              <div>
                <h4 className="font-black text-cyan-dark mb-1">
                  {language === 'zh' ? item.title : item.enTitle}
                </h4>
                <p className="text-sm md:text-base text-cyan-dark/65 font-semibold leading-relaxed">
                  {language === 'zh' ? item.desc : item.enDesc}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
