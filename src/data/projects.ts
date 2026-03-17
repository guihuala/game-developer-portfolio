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
      about: "该作品起源于一次 GameJam 活动，随后被扩展为完整的作品。项目从零开始构思，拥有独特的游戏玩法和美术风格。我担任主制作人，负责核心玩法程序开发、交互逻辑、部分美术资产制作、场景渲染、世界观剧情设计及关卡机制设计。",
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
          content: "设计了沼泽、流沙等多样化地形，玩家需精准管理步数与体力。这种“步步为营”的设计不仅增加了探索的厚度，也完美契合了游戏生存的主题。",
          enContent: "Designed diverse terrains like swamps and quicksand. Players must manage steps and stamina, adding tactical depth to exploration that fits the survival theme.",
          image: "/Work/1/sos_gameplay_1.webp",
          icon: 'star'
        },
        {
          title: "民俗叙事与收集系统",
          enTitle: "Folklore & Collection",
          content: "通过散落在地图各处的民俗收藏品作为驱动力，引导玩家主动探索。收集特定的物品组合不仅能补全世界观，还能解锁独有的剧情分支关卡。",
          enContent: "Used folklore items as drivers for exploration. Collecting specific sets not only completes world-building but also unlocks unique narrative branches.",
          icon: 'pen'
        },
        {
          title: "潜行逃脱与视线检测",
          enTitle: "Stealth & Escape",
          content: "敌人拥有动态视线渲染。一旦进入警戒区，玩家必须冷静规划路径在倒计时结束前脱离，营造了极强的紧张感与心跳反馈。",
          enContent: "Enemies feature dynamic LoS detection. Once alerted, players must plan paths to escape before the countdown, creating intense tension and gameplay feedback.",
          icon: 'trophy'
        }
      ],
      techModules: [
        {
          title: "2.5D 风格化渲染管线",
          enTitle: "2.5D Stylized Pipeline",
          content: "基于 MK Toon 框架定制了手绘感材质。通过自研 Shader 处理高度图与实时阴影，使 2D 的细腻感与 3D 的空间感在画面中达到平衡。",
          enContent: "Customized hand-drawn materials via MK Toon. Used custom Shaders for heightmaps and shadows to balance 2D aesthetics with 3D spatial depth.",
          image: "https://picsum.photos/seed/step-tech/800/400",
          icon: 'cpu'
        },
        {
          title: "A* 寻路优化与路径缓存",
          enTitle: "Pathfinding & Cache",
          content: "针对复杂地形优化了 A* 寻路。引入路径缓存（Path Cache）机制，即便在大量单位同时寻路的情况下也能保持稳定性能。",
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
      about: "一款以“光影交互”为核心玩法的叙事解谜游戏，Demo 版本已完成 5 个章节并获得玩家广泛好评。我负责核心玩法程序开发、交互系统、部分美术设计及团队进度协调。剧情设定是摄影师 Canis 在爱人 Oryon 因病去世一年后，踏上完成她最后遗愿清单的旅程。",
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
          content: "创新的“光照即真相”机制：被照亮区域呈现“过去完整”状态，阴影中则是“现在破败”状态。玩家需寻找光源，在两个时空层级中拆解谜题。",
          enContent: "Innovative mechanism: Lit areas show the 'intact past' while shadows hide the 'ruined present.' Players must find light sources to bridge these two timelines.",
          image: "https://picsum.photos/seed/list-design/800/400",
          icon: 'star'
        },
        {
          title: "互联沙盒关卡设计",
          enTitle: "Sandbox Exploration",
          content: "摒弃了传统的线性关卡，采用了区域互联的沙盒模式。支持自由探索、场景深度交互及配套的地图快速旅行系统，大幅提升了叙事沉浸感。",
          enContent: "Shifted from linear levels to Interconnected regions. Supports free exploration, deep scene interaction, and fast travel, boosting narrative immersion.",
          icon: 'pen'
        }
      ],
      techModules: [
        {
          title: "实时光影像素计算",
          enTitle: "Pixel-Perfect Lighting",
          content: "通过 C# 收集光源与遮光物数据并传递给自定义 Shader。实现了基于光线遮挡的高效像素级透明度反向计算，攻克了“仅光照可见”的视觉难题。",
          enContent: "Collected light & occluder data in C# passed to custom Shaders. Achieved pixel-level transparency logic for the 'lit-only' effect via reversed ray-logic.",
          image: "https://picsum.photos/seed/list-tech/800/400",
          icon: 'code'
        },
        {
          title: "通用交互框架架构",
          enTitle: "Universal Interaction",
          content: "构建了高度可扩展的交互基类。支持物品状态保存、视觉提示及复杂的物品消耗验证，不仅减少了冗余代码，也确保了玩家在长程解谜中的反馈一致性。",
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
      honors: ["Demo 版本广受玩家好评", "2025CUSGA 初赛入围"],
      enHonors: ["Demo version highly acclaimed by players", "2025CUSGA Finalist"]
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
      about: "结合了对蘑菇的热爱与工厂类游戏玩法的自动化模拟游戏，强调轻松治愈的创造体验。独立负责玩法设计、美术设计及全部程序开发。",
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
          content: "玩家利用菌丝管道采集并加工土壤中的原材料，用于培育包含灯笼菇（照明）、能量菇（发电/加速）和裂解菇（资源回收）等多功能蘑菇资产。并使用菌丝分流器（OR逻辑）和孢子过滤器（AND逻辑）等装置达成自动化。",
          enContent: "Players use mycelium pipes to harvest and process raw materials from the soil to cultivate mushrooms like Lantern Mushrooms (lighting), Energy Mushrooms (power/acceleration), and Fission Mushrooms (recycling). Setup automated lines using Mycelium Splitters (OR logic) and Spore Filters (AND logic).",
          image: "https://picsum.photos/seed/mill-design/800/400",
          icon: 'pen'
        }
      ],
      techModules: [
        {
          title: "Shader编写与视察滚动系统",
          enTitle: "Shader Programming & Parallax System",
          content: "设计和绘制了 11 种基于现实或原创功能的可爱蘑菇资产；实现了多层视差滚动背景与动态天气系统，渲染了治愈清新的视觉氛围。",
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
      about: "为 Ludum Dare 58 开发的 72 小时限时挑战作品，主题为“收集者”。我主要负责程序开发（引擎工作、动画、音效）及 UX 设计。",
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
          content: "玩家扮演检票员，需根据排片表核对电影名、放映时间及日期，并识别手绘伪造票或污损票。包含商店系统，可购买紫外线灯（真伪验证）等道具辅助工作。",
          enContent: "Players act as ticket inspectors, checking movie names, times, and dates against a schedule, identifying hand-drawn fakes or damaged tickets. Includes a shop system to buy tools like UV lights for verification.",
          icon: 'pen'
        }
      ],
      techModules: [
        {
          title: "非线性对象生成与UI性能优化",
          enTitle: "Non-linear Spawning & UI Optimization",
          content: "非线性生成系统：票据生成策略会根据游戏时间动态调整，模拟人流高峰期的自然感。性能优化：UI 渲染采用了对象池模式，避免频繁实例化造成的卡顿。自定义编辑器：为关卡设计师开发了自定义 Inspector 工具，可快速调整参数。",
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
      about: "包含我对参与的不同项目的贡献以及尝试的不同小品级游戏的制作。其中有以网络辩论为主题的卡牌对决游戏《家人保卫战》（入围 CUSGO 初赛，负责美术设计）；梦境主题策略解谜游戏《梦境事务所》（获吉比特高校开发挑战赛“最佳美术奖”，负责程序、美术与关卡设计）；以及独立完成多款同人游戏（如《Minute Through Dimensions》），负责程序、美术及音乐制作。",
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
          content: "网络辩论题材的卡牌对决游戏。入围 2025 CUSGA 初赛。我作为美术负责人，构建了极具张力的卡通渲染风格及全套 UI 交互框架，旨在通过视觉语言传递辩论的激烈感。",
          enContent: "A card battle game themed around internet debates. 2025 CUSGA Preliminaries Finalist. As the Art Lead, I developed a high-energy cartoon-styled visual language and full UI framework to convey the intensity of debates.",
          icon: 'star'
        },
        {
          title: "梦境事务所",
          enTitle: "Dream Agency",
          content: "梦境主题的策略解谜游戏，荣获吉比特高校开发挑战赛“最佳美术奖”。我统筹了程序底座、场景原画与关卡机制，通过创新的解谜逻辑模拟了梦境的非线性叙事。",
          enContent: "A dream-themed strategy puzzle game, winner of the G-bits University Dev Challenge 'Best Art' award. I orchestrated the programming base, scene art, and level mechanics, simulating non-linear dream logic.",
          icon: 'pen'
        },
        {
          title: "Minute Through Dimensions",
          enTitle: "Minute Through Dimensions",
          content: "个人独立完成的全栈作品。涵盖了从 C# 玩法逻辑架构到 Spine 动画制作、BGM 编曲及音效设计。这是一个探索跨维度互动的快节奏关卡作品，展示了全流程统筹能力。",
          enContent: "A solo full-stack project covering everything from C# architecture to Spine animation, BGM composition, and sound design. It features fast-paced cross-dimensional interaction, showcasing full-pipeline integration.",
          icon: 'play'
        }
      ],
      techModules: [
        {
          title: "工具流与泛能力拓展",
          enTitle: "Toolchains & Pipeline Expansion",
          content: "随着参与不同定位和不同体量的游戏项目，我逐渐能够不仅局限于程序开发，还在美术资产、音效处理等泛技术领域快速搭建工作流，寻找针对小型独立团队优选的实现方案。",
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
