/**
 * 网站内容统一编辑入口。
 *
 * 文本使用 { zh, en }；图片使用从 public 目录开始的绝对路径。
 * 项目案例请编辑同目录下的 projects.ts。
 */
export type LocalizedText = { zh: string; en: string };

export const siteContent = {
  assets: {
    avatar: '/avatar.webp',
    playerIcon: '/桂花泥图标.png',
    flowerModel: '/小桂花.glb',
  },

  hero: {
    greeting: { zh: '你好，我是桂花拉糕', en: "Hello, I'm mokukeki" },
    titleLine1: { zh: '热爱游戏设计', en: 'Love Game Design' },
    titleLine2: { zh: '与开发', en: '& Development' },
    description: {
      zh: '喜欢做游戏，也喜欢研究玩法、程序和画面到底要怎么配合。这里放了一些自己做过的项目。',
      en: 'I make games and enjoy figuring out how gameplay, code, and visuals can work together. Here are some projects I have worked on.',
    },
    projectsButton: { zh: '查看项目', en: 'View Projects' },
    projectsButtonCaption: { zh: 'View Projects', en: 'Portfolio' },
    aboutButton: { zh: '关于我', en: 'About Me' },
    aboutButtonCaption: { zh: 'About Me', en: 'Profile' },
    bubble: { zh: '再戳就要变成拉糕了...', en: "Stop poking... I'll turn into a cake..." },
    achievementTitle: { zh: '成就达成！', en: 'Achievement!' },
    achievementDescription: {
      zh: '一只喜欢被戳的桂花。',
      en: 'A flower that likes to be poked.',
    },
  },

  personalIntro: {
    speaker: { zh: '桂花拉糕', en: 'moku' },
    dialogue: {
      intro: {
        zh: '你好，我是 moku。平时主要做游戏程序，也会画画、做模型和设计玩法。想先看哪一部分？',
        en: "Hi, I'm moku. I mainly work on game programming, but I also draw, model, and design gameplay. Where would you like to start?",
        choices: [
          { zh: '专长与技能', en: 'Skills & Expertise', nextNode: 'start' },
          { zh: 'moku的经历', en: 'Experience & Story', nextNode: 'journey' },
        ],
      },
      start: {
        zh: '我做项目时不太喜欢只管一个部分。程序是主要方向，不过从玩法、美术到最后放进引擎里的效果，我基本都会参与。',
        en: "I rarely stick to only one part of a project. Programming is my main focus, but I usually get involved in gameplay, art, and the final in-engine result as well.",
        choices: [
          { zh: '开发历程', en: 'Development Journey', nextNode: 'journey' },
          { zh: '美术风格', en: 'Artistic Style', nextNode: 'art' },
          { zh: '未来愿景', en: 'Future Vision', nextNode: 'vision' },
        ],
      },
      journey: {
        zh: '做过几次团队项目，也自己独立做过游戏。根据项目缺什么，我当过主程序、制作人，也负责过美术。',
        en: 'I have worked on both team projects and solo games. Depending on what a project needed, I have taken on programming, production, and art roles.',
        choices: [
          { zh: '还有呢？', en: 'Tell me more', nextNode: 'journey_2' },
          { zh: '换个话题', en: 'Other topics', nextNode: 'start' },
        ],
      },
      journey_2: {
        zh: '当然也不是什么都会，只是遇到没人做的部分，通常会先自己学着解决。久而久之，程序之外的东西也做了不少。',
        en: 'I do not know everything, of course. But when a project is missing something, I tend to learn enough to solve it. That is how I ended up doing quite a lot beyond programming.',
        choices: [{ zh: '回到主菜单', en: 'Back to menu', nextNode: 'start' }],
      },
      art: {
        zh: '美术方面做过 3D 建模、Spine 动画和像素画。也会为了项目效果写一些 Shader，主要还是哪里需要就学哪里。',
        en: 'For art, I have worked with 3D modeling, Spine animation, and pixel art. I also write shaders when a project needs them, learning as I go.',
        choices: [{ zh: '听起来很酷', en: 'Sounds cool!', nextNode: 'start' }],
      },
      vision: {
        zh: '之后还是想继续做游戏，希望能把现在这些项目慢慢做得更完整，也做出一些自己真的会想玩的东西。',
        en: 'I want to keep making games, finish more of what I start, and eventually make something I would genuinely want to play myself.',
        choices: [{ zh: '加油！', en: 'Keep it up!', nextNode: 'start' }],
      },
    },
  },

  artGallery: {
    title: { zh: '图库展示', en: 'ART GALLERY' },
    images: [
      '/art/鹤喰.webp',
      '/art/bg.webp',
      '/art/Image_658224922644321.webp',
      '/art/156828.webp',
      '/art/158419.webp',
      '/art/honakana.webp',
      '/art/1.webp',
      '/art/2.webp',
    ],
  },
  portfolio: {
    titlePrefix: { zh: '项目', en: 'Selected ' },
    titleHighlight: { zh: '展示', en: 'Works' },
    subtitle: { zh: 'Selected Works', en: 'Portfolio' },
    description: { zh: '这里放了几个完成度比较高的项目，也记录了我在里面具体做了什么。', en: 'A selection of my more complete projects, with notes on what I actually worked on in each one.' },
    allFilter: { zh: '全部', en: 'All' },
    detailsButton: { zh: '查看详情', en: 'Details View' },
  },
} as const;

export const localized = (value: LocalizedText, language: 'zh' | 'en') => value[language];
