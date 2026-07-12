/** 项目案例统一编辑入口；本地图片建议放在 public/Work 下。 */
export interface ProjectModule {
  title: string;
  enTitle: string;
  content: string;
  enContent: string;
  image?: string;
  icon?: 'pen' | 'code' | 'cpu' | 'star' | 'trophy' | 'play';
}

export interface ProjectDetails {
  about: string;
  enAbout: string;
  features: string[];
  enFeatures: string[];
  designModules: ProjectModule[];
  techModules: ProjectModule[];
  gallery?: string[];
  honors?: string[];
  enHonors?: string[];
}

export interface Project {
  id: number;
  title: string;
  enTitle: string;
  type: string;
  enType: string;
  image: string;
  color: string;
  desc: string;
  enDesc: string;
  tags: string[];
  details: ProjectDetails;
  trailerUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "步入沼泽",
    enTitle: "Step or Sink",
    type: "3D 角色扮演",
    enType: "3D RPG",
    image: "/Work/1/sos_cover.webp",
    color: "#00BCD4",
    desc: "拥有独特交互逻辑的地形探索游戏。",
    enDesc: "Terrain exploration game with unique interaction logic.",
    tags: ["Unity", "Blender", "Photoshop", "Spine", "C#"],
    details: {
      about: "这个项目最早是参加 GameJam 时做的 Demo，后来又花了大约三个月扩展成完整版。算是自己又爱又恨的一个项目，大部分内容都由我完成。我担任主制作人和主程序，负责核心玩法、交互逻辑、部分美术资产、场景渲染，也参与了世界观和关卡机制的设计。",
      enAbout: "This project originated from a GameJam event and was later expanded into a full product. Designed from scratch, it features unique gameplay mechanics and art style. I served as the lead producer, responsible for core programming, interaction logic, parts of art creation, scene rendering, world-building, and level mechanism design.",
      features: [
        "包含沼泽、流沙等多样化地形，需要管理步数与体力",
        "收集分布在世界各地的民俗收藏品解锁额外剧情关卡",
        "敌人跑酷潜行逃脱机制，包含了视线检测与倒计时机制"
      ],
      enFeatures: [
        "Diverse terrain like swamps and quicksand, requiring stamina and step management",
        "Collect folklore items scattered across the world to unlock extra story levels",
        "Enemy line-of-sight detection and countdown escape sequence"
      ],
      designModules: [
        {
          title: "地形交互与体力管理",
          enTitle: "Terrain & Overworld",
          content: "地图里有沼泽、流沙等不同地形，经过时会消耗不同数量的步数和体力。玩家需要先观察路线，再决定要不要绕路，探索本身也是玩法的一部分。",
          enContent: "Designed diverse terrains like swamps and quicksand. Players must manage steps and stamina, adding tactical depth to exploration that fits the survival theme.",
          image: "/Work/1/sos_gameplay_1.webp",
          icon: 'star'
        },
        {
          title: "民俗叙事与收集系统",
          enTitle: "Folklore & Collection",
          content: "地图中散落着一些民俗收藏品。它们一方面用来补充世界观，另一方面也会解锁额外剧情和关卡，算是给绕路探索一个比较实际的理由。",
          enContent: "Used folklore items as drivers for exploration. Collecting specific sets not only completes world-building but also unlocks unique narrative branches.",
          icon: 'pen'
        },
        {
          title: "潜行逃脱与视线检测",
          enTitle: "Stealth & Escape",
          content: "敌人的视线范围会直接显示在场景中。被发现后会进入倒计时，玩家需要利用地形尽快离开警戒区域。",
          enContent: "Enemies feature dynamic LoS detection. Once alerted, players must plan paths to escape before the countdown, creating intense tension and gameplay feedback.",
          icon: 'trophy'
        }
      ],
      techModules: [
        {
          title: "2.5D 风格化渲染管线",
          enTitle: "2.5D Stylized Pipeline",
          content: "项目使用 MK Toon，并在这个基础上调整了材质和 Shader。主要处理了高度图、阴影和手绘贴图的显示，让 2D 素材放进 3D 场景后不会显得太突兀。",
          enContent: "Customized hand-drawn materials via MK Toon. Used custom Shaders for heightmaps and shadows to balance 2D aesthetics with 3D spatial depth.",
          image: "https://picsum.photos/seed/step-tech/800/400",
          icon: 'cpu'
        },
        {
          title: "A* 寻路优化与路径缓存",
          enTitle: "Pathfinding & Cache",
          content: "因为地图地形比较复杂，我对 A* 寻路做了一些调整，并加入路径缓存，减少多个单位同时寻路时的重复计算。",
          enContent: "Optimized A* for complex terrains. Introduced Path Cache to maintain 60+ FPS even with numerous entities performing pathfinding simultaneously.",
          icon: 'code'
        }
      ],
      gallery: [
        "https://img.itch.zone/aW1hZ2UvMzU2NzQxNy8yMTIzOTI0NS5qcGc=/original/FNIrOP.jpg",
        "https://img.itch.zone/aW1hZ2UvMzU2NzQxNy8yMTIzOTI0Ni5qcGc=/original/ZqC2K4.jpg",
        "https://img.itch.zone/aW1hZ2UvMzU2NzQxNy8yMTIzOTI0OC5qcGc=/original/ZmvoDr.jpg"
      ]
    },
    trailerUrl: "https://www.bilibili.com/video/BV18wE2zVE7z/?spm_id_from=333.1387.favlist.content.click&vd_source=b9c1f0d495c34533b22289bd32c99a18",
    liveUrl: "https://guihuala.itch.io/step-or-sink2"
  },
  {
    id: 2,
    title: "遗愿清单",
    enTitle: "The Bucket List",
    type: "2D 剧情解谜",
    enType: "2D Narrative Puzzle",
    image: "/Work/2/tbl_cover.webp",
    color: "#FFD54F",
    desc: "以“光影交互”为核心的叙事解谜游戏。",
    enDesc: "Narrative puzzle game featuring light and shadow interaction.",
    tags: ["Unity", "Photoshop", "C#", "HLSL"],
    details: {
      about: "《遗愿清单》是一款 2D 横版叙事解谜游戏，目前的 Demo 包含 5 个章节。玩家扮演摄影师 Canis，在 Oryon 去世一年后出发完成她留下的遗愿清单。我主要负责核心玩法程序、交互系统、部分美术设计，以及团队进度协调。",
      enAbout: "A narrative puzzle game centered around 'light and shadow interaction.' The demo version encompasses 5 chapters and received widespread acclaim. I was responsible for core programming, interactive systems, partial art design, and team coordination. Photographer Canis embarks on a journey to fulfill her partner Oryon's last bucket list a year after she passed away from illness.",
      features: [
        "光影交互系统",
        "互联的区域探秘",
        "情感充沛的叙事体验"
      ],
      enFeatures: [
        "Light interaction system",
        "Interconnected sandbox exploration",
        "Emotionally rich narrative experience"
      ],
      designModules: [
        {
          title: "双层光影解谜机制",
          enTitle: "Dual-Layer Light Logic",
          content: "游戏的主要机制围绕光照展开。被照亮的区域会显示过去的状态，阴影里则保留现在的样子。玩家需要移动或寻找光源，对照两个状态来解谜。",
          enContent: "Innovative mechanism: Lit areas show the 'intact past' while shadows hide the 'ruined present.' Players must find light sources to bridge these two timelines.",
          image: "https://picsum.photos/seed/list-design/800/400",
          icon: 'star'
        },
        {
          title: "互联沙盒关卡设计",
          enTitle: "Sandbox Exploration",
          content: "关卡不是完全按顺序推进，而是由几个互相连接的区域组成。玩家可以自由探索，也可以通过地图快速移动，避免在已经走过的场景里反复赶路。",
          enContent: "Shifted from linear levels to Interconnected regions. Supports free exploration, deep scene interaction, and fast travel, boosting narrative immersion.",
          icon: 'pen'
        }
      ],
      techModules: [
        {
          title: "实时光影像素计算",
          enTitle: "Pixel-Perfect Lighting",
          content: "我用 C# 收集光源和遮挡物的数据，再传给自定义 Shader，按像素计算哪些内容应该被光照显示。这个系统主要用来实现“只有被照亮时才看得见”的场景物件。",
          enContent: "Collected light & occluder data in C# passed to custom Shaders. Achieved pixel-level transparency logic for the 'lit-only' effect via reversed ray-logic.",
          image: "https://picsum.photos/seed/list-tech/800/400",
          icon: 'code'
        },
        {
          title: "通用交互框架架构",
          enTitle: "Universal Interaction",
          content: "为了方便后面继续加谜题，我写了一套通用交互基类，统一处理物品状态保存、交互提示和道具消耗判断，减少每个物件重复写逻辑。",
          enContent: "Built a scalable interaction base class. Supports state persistence, visual hints, and complex item validation, ensuring logical consistency across gameplay.",
          icon: 'cpu'
        }
      ],
      gallery: [
        "https://picsum.photos/seed/list1/800/600",
        "https://picsum.photos/seed/list2/800/600",
        "https://picsum.photos/seed/list3/800/600",
        "https://picsum.photos/seed/list4/800/600"
      ],
      honors: ["2026开拓芯双赛道入围", "2026CUSGA最佳剧情入围", "2026mini-game入围"],
      enHonors: ["Demo version highly acclaimed by players", "2026CUSGA Finalist"]
    },
    liveUrl: "https://guihuala.itch.io/the-bucket-list-demo"
  },
  {
    id: 3,
    title: "菌丝工厂",
    enTitle: "Mycelium Mill",
    type: "2D 模拟工厂",
    enType: "2D Factory Simulation",
    image: "/Work/3/mm_cover.webp",
    color: "#00BCD4",
    desc: "结合轻松治愈的工厂自动化模拟游戏。",
    enDesc: "Cozy and healing automated factory simulation game.",
    tags: ["Unity", "Photoshop", "C#", "HLSL"],
    details: {
      about: "这是一个自己独立开发的工厂模拟游戏。最开始只是突然想到，可以把菌丝管道和自动化流水线放在一起，于是就做了出来。玩法、程序和美术都由我完成，整体规模不大，主要用来验证这套想法能不能成立。",
      enAbout: "An automated simulation game combining a love for mushrooms with factory gameplay, emphasizing a relaxing and creative experience. Independently responsible for gameplay design, art design, and all programming.",
      features: [
        "培育与利用不同功能的蘑菇自动化加工",
        "搭建菌丝管网物流与逻辑元件流水线",
        "多层视差背景与动态天气氛围"
      ],
      enFeatures: [
        "Cultivate and utilize functionally diverse mushrooms for automated processing",
        "Build mycelium pipe logistics and logic gate production lines",
        "Multi-layer parallax background and dynamic weather"
      ],
      designModules: [
        {
          title: "菌丝物流与逻辑流线",
          enTitle: "Mycelium Logistics & Logic Gates",
          content: "玩家用菌丝管道采集和运输土壤里的原料，再培育不同功能的蘑菇。灯笼菇负责照明，能量菇可以发电和加速，裂解菇则负责回收资源。流水线里还加入了分流器和过滤器，分别对应比较简单的 OR、AND 逻辑。",
          enContent: "Players use mycelium pipes to harvest and process raw materials from the soil to cultivate mushrooms like Lantern Mushrooms (lighting), Energy Mushrooms (power/acceleration), and Fission Mushrooms (recycling). Setup automated lines using Mycelium Splitters (OR logic) and Spore Filters (AND logic).",
          image: "https://picsum.photos/seed/mill-design/800/400",
          icon: 'pen'
        }
      ],
      techModules: [
        {
          title: "Shader编写与视察滚动系统",
          enTitle: "Shader Programming & Parallax System",
          content: "我一共设计并绘制了 11 种蘑菇，也做了多层视差背景和动态天气。因为项目是自己一个人做的，所以美术方案尽量保持简单，方便后续继续增加资产。",
          enContent: "Designed and drew 11 cute mushroom assets based on real/original functions. Implemented a multi-layer parallax scrolling background and dynamic weather system, rendering a healing and fresh visual atmosphere.",
          image: "https://picsum.photos/seed/mill-tech/800/400",
          icon: 'code'
        }
      ],
      gallery: [
        "https://picsum.photos/seed/mill1/800/600",
        "https://picsum.photos/seed/mill2/800/600",
        "https://picsum.photos/seed/mill3/800/600"
      ]
    },
    liveUrl: "https://guihuala.itch.io/mycelium-mill"
  },
  {
    id: 4,
    title: "请出示门票",
    enTitle: "Check my tickets",
    type: "2D 休闲模拟",
    enType: "2D Casual Sim",
    image: "/Work/4/cyt_cover.webp",
    color: "#FFD54F",
    desc: "扮演检票员快速处理各种伪造票的限时挑战作。",
    enDesc: "Play as a ticket inspector handling forged tickets in a time-limited challenge.",
    tags: ["Unity", "Photoshop", "C#"],
    details: {
      about: "这是参加 Ludum Dare 58 时在 72 小时内完成的游戏，主题是“收集者”。玩家要当电影院检票员，在限定时间里判断电影票是真是假。我主要负责程序、动画、音效接入和 UX 设计。",
      enAbout: "Developed for Ludum Dare 58 over 72 hours, themed 'Collector'. I was primarily responsible for programming (engine work, animation, audio) and UX design.",
      features: [
        "检定电影名、放映日期等细节查验真伪",
        "道具商店购买紫外线灯揭露伪冒印记",
        "紧张刺激的工作日模拟"
      ],
      enFeatures: [
        "Inspect movie names and dates to verify authenticity",
        "Item shop to purchase UV lights for uncovering forged marks",
        "Intense and thrilling workday simulation"
      ],
      designModules: [
        {
          title: "玩法与验证系统",
          enTitle: "Gameplay & Authentication System",
          content: "玩家需要对照排片表检查电影名、时间和日期，还会遇到手绘假票或被污损的票。赚到的钱可以在商店购买紫外线灯等工具，帮助检查比较难判断的票。",
          enContent: "Players act as ticket inspectors, checking movie names, times, and dates against a schedule, identifying hand-drawn fakes or damaged tickets. Includes a shop system to buy tools like UV lights for verification.",
          icon: 'pen'
        }
      ],
      techModules: [
        {
          title: "非线性对象生成与UI性能优化",
          enTitle: "Non-linear Spawning & UI Optimization",
          content: "票据生成速度会随游戏时间变化，用来模拟不同时段的人流。因为票据 UI 创建得很频繁，我使用对象池避免反复实例化。另外写了一个简单的自定义 Inspector，方便队友直接调整票据和关卡参数。",
          enContent: "Non-linear spawning system dynamically adjusts ticket generation strategies based on in-game time to simulate rush hour crowds naturally. Performance optimization featured an Object Pool pattern for UI rendering. Created a custom Inspector tool for level designers.",
          icon: 'code'
        }
      ],
      gallery: [
        "https://picsum.photos/seed/ticket1/800/600",
        "https://picsum.photos/seed/ticket2/800/600"
      ]
    }
  },
  {
    id: 5,
    title: "其他作品",
    enTitle: "Other Projects",
    type: "综合设计",
    enType: "Misc Games",
    image: "https://picsum.photos/seed/other-games/800/600",
    color: "#00BCD4",
    desc: "参与制作的多个项目及独立开发的小品级游戏集锦。",
    enDesc: "Collection of various creative projects contributed to or developed independently.",
    tags: ["Game Design", "Art", "Programming"],
    details: {
      about: "这里放的是一些规模比较小，或者我只负责了其中一部分的项目。《家人保卫战》里我主要做美术；《梦境事务所》里负责程序、美术和关卡设计；另外还有几款自己独立完成的同人小游戏，包括《Minute Through Dimensions》。",
      enAbout: "This encompasses various projects I contributed to, as well as several smaller independent games. Notable titles include 'Family Defense' (card game about internet debates, CUSGO prelims, Art Design); 'Dream Agency' (puzzle strategy, won G-bits University Dev Challenge 'Best Art', Programming/Art/Level Design); and several solo doujin games like 'Minute Through Dimensions' (Programming/Art/Music).",
      features: [
        "《家人保卫战》：CUSGA 初赛入围者",
        "《梦境事务所》：吉比特高校“最佳美术奖”",
        "《Minute Through Dimensions》：个人全栈作品"
      ],
      enFeatures: [
        "'Family Defense': CUSGA prelims project",
        "'Dream Agency': G-bits University 'Best Art' award",
        "'Minute Through Dimensions': Solo full-stack project"
      ],
      designModules: [
        {
          title: "家人保卫战",
          enTitle: "Family Defense",
          content: "这是一款以网络辩论为题材的卡牌游戏，入围了 2025 CUSGA 初赛。我是后来加入团队的美术，主要负责角色和卡牌的卡通风格，以及游戏中的 UI 资源。",
          enContent: "A card battle game themed around internet debates. 2025 CUSGA Preliminaries Finalist. As the Art Lead, I developed a high-energy cartoon-styled visual language and full UI framework to convey the intensity of debates.",
          icon: 'star'
        },
        {
          title: "梦境事务所",
          enTitle: "Dream Agency",
          content: "这是和同学合作参加吉比特高校开发挑战赛时做的策略解谜游戏，最后获得了“最佳美术奖”。我负责程序、场景美术和一部分关卡设计。",
          enContent: "A dream-themed strategy puzzle game, winner of the G-bits University Dev Challenge 'Best Art' award. I orchestrated the programming base, scene art, and level mechanics, simulating non-linear dream logic.",
          icon: 'pen'
        },
        {
          title: "Minute Through Dimensions",
          enTitle: "Minute Through Dimensions",
          content: "这是一款自己独立完成的同人小游戏。从 C# 玩法逻辑、Spine 动画到 BGM 和音效都是自己做的，主要玩法是在不同维度之间快速切换并通过关卡。",
          enContent: "A solo full-stack project covering everything from C# architecture to Spine animation, BGM composition, and sound design. It features fast-paced cross-dimensional interaction, showcasing full-pipeline integration.",
          icon: 'play'
        }
      ],
      techModules: [
        {
          title: "工具流与泛能力拓展",
          enTitle: "Toolchains & Pipeline Expansion",
          content: "这些项目的规模和分工都不太一样。因为小团队经常缺人，我除了程序之外也做过美术资产、动画和音效，慢慢整理出了一套比较适合小项目的制作流程。",
          enContent: "By participating in games of varying scales, I expanded beyond just programming, learning to quickly build workflows for art assets and audio processing, finding optimal solutions for small indie teams.",
          icon: 'code'
        }
      ],
      gallery: [
        "https://picsum.photos/seed/misc1/800/600",
        "https://picsum.photos/seed/misc2/800/600",
        "https://picsum.photos/seed/misc3/800/600"
      ],
      honors: [
        "《家人保卫战》：2025CUSGA 初赛入围",
        "《梦境事务所》：吉比特高校开发挑战赛“最佳美术奖”"
      ],
      enHonors: [
        "'Family Defense': 2025CUSGA Preliminaries Finalist",
        "'Dream Agency': G-bits University Dev Challenge 'Best Art' Award"
      ]
    }
  }
];
