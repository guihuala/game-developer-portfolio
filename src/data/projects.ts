export interface ProjectDetails {
  about: string;
  enAbout: string;
  features: string[];
  enFeatures: string[];
  designModule: {
    title: string;
    enTitle: string;
    content: string;
    enContent: string;
    image?: string;
  };
  techModule: {
    title: string;
    enTitle: string;
    content: string;
    enContent: string;
    image?: string;
  };
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
    image: "https://picsum.photos/seed/step-or-sink/800/600",
    color: "#00BCD4",
    desc: "拥有独特交互逻辑的地形探索游戏。",
    enDesc: "Terrain exploration game with unique interaction logic.",
    tags: ["Unity", "Blender", "Photoshop", "Spine", "C#"],
    details: {
      about: "该作品起源于一次 GameJam 活动，随后被扩展为完整的商业作品。项目从零开始构思，拥有独特的游戏玩法和美术风格。我担任主制作人，负责核心玩法程序开发、交互逻辑、部分美术资产制作、场景渲染、世界观剧情设计及关卡机制设计。",
      enAbout: "This project originated from a GameJam event and was later expanded into a full commercial product. Designed from scratch, it features unique gameplay mechanics and art style. I served as the lead producer, responsible for core programming, interaction logic, parts of art creation, scene rendering, world-building, and level mechanism design.",
      features: [
        "包含沼泽、流沙等多样化地形，需管理步数与体力",
        "收集分布在世界各地的民俗收藏品解锁额外剧情关卡",
        "敌人跑酷潜行逃脱机制，含视线检测与倒计时机制"
      ],
      enFeatures: [
        "Diverse terrain like swamps and quicksand, requiring stamina and step management",
        "Collect folklore items scaterred across the world to unlock extra story levels",
        "Enemy line-of-sight detection and countdown escape sequence"
      ],
      designModule: {
        title: "玩法机制设计",
        enTitle: "Gameplay Mechanic Design",
        content: "地形交互包含沼泽、流沙等多样化地形，玩家需管理步数与体力防止角色下陷；探索机制涉及收集民俗收藏品解锁额外剧情关卡；敌人系统为敌人拥有视线检测，玩家需在倒计时结束前逃离视线范围。",
        enContent: "Terrain interactions include swamps and quicksand where players manage stamina to prevent sinking. Exploration involves collecting folklore items. Enemies use line-of-sight detection requiring players to escape before a countdown ends.",
        image: "https://picsum.photos/seed/step-design/800/400"
      },
      techModule: {
        title: "渲染管线与核心系统技术实现",
        enTitle: "Rendering Pipeline & Core Tech",
        content: "使用了基于 MK Toon 框架定制的 2.5D 风格化渲染；实现了带路径缓存（Path Cache）优化的 A* 寻路算法，显著提升性能；自研地图编辑器，支持自由绘制、矩形绘制与实时预览。",
        enContent: "Customized 2.5D stylized rendering based on MK Toon framework. Implemented A* pathfinding algorithm optimized with Path Cache, significantly boosting performance. Developed an in-house map editor supporting freehand drawing, rectangle drawing, and real-time previews.",
        image: "https://picsum.photos/seed/step-tech/800/400"
      },
      gallery: [
        "https://picsum.photos/seed/step1/800/600",
        "https://picsum.photos/seed/step2/800/600",
        "https://picsum.photos/seed/step3/800/600"
      ]
    }
  },
  {
    id: 2,
    title: "遗愿清单",
    enTitle: "The Bucket List",
    type: "2D 剧情解谜",
    enType: "2D Narrative Puzzle",
    image: "https://picsum.photos/seed/bucket-list/800/600",
    color: "#FFD54F",
    desc: "以“双层光影交互”为核心的叙事解谜游戏。",
    enDesc: "Narrative puzzle game featuring dual-layer light and shadow interaction.",
    tags: ["Unity", "Photoshop", "C#", "HLSL"],
    details: {
      about: "一款以“双层光影交互”为核心玩法的叙事解谜游戏，Demo 版本已完成 5 个章节并获得玩家广泛好评。我负责核心玩法程序开发、交互系统、部分美术设计及团队进度协调。剧情设定是摄影师 Canis 在爱人 Oryon 因病去世一年后，踏上完成她最后遗愿清单的旅程。",
      enAbout: "A narrative puzzle game centered around 'dual-layer light and shadow interaction.' The demo version encompasses 5 chapters and received widespread acclaim. I was responsible for core programming, interactive systems, partial art design, and team coordination. Photographer Canis embarks on a journey to fulfill her partner Oryon's last bucket list a year after she passed away from illness.",
      features: [
        "双层光影交互系统",
        "互联的区域探秘",
        "情感充沛的叙事体验"
      ],
      enFeatures: [
        "Dual-layer light interaction system",
        "Interconnected sandbox exploration",
        "Emotionally rich narrative experience"
      ],
      designModule: {
        title: "光影解谜与关卡设计",
        enTitle: "Light Puzzle & Level Design",
        content: "光影解谜：被光照亮的区域会呈现“过去完整”的状态（内层），而未被照亮的区域则是“现在破败”的状态（外层），玩家需在两层之间切换以解决谜题。沙盒关卡：采用互联的沙盒区域设计，支持自由探索、场景交互及快速旅行系统。",
        enContent: "Illuminated areas reveal a 'complete past' state (inner layer), while unlit areas show a 'ruined present' state (outer layer). Players switch between layers to solve puzzles. The interconnected sandbox level design supports free exploration and fast travel.",
        image: "https://picsum.photos/seed/list-design/800/400"
      },
      techModule: {
        title: "实时光影计算与交互系统集成",
        enTitle: "Real-time Lighting & Interaction System",
        enContent: "Real-time lighting system: Gathered light source and occluder data via C# and passed to custom Shaders, achieving pixel-level transparency calculations for 'visible only when lit'. Interaction architecture: All objects inherit from a common base class supporting state saving, visual hints, and complex item consumption validation.",
        content: "实时光影系统：通过 C# 收集光源与遮光物数据并传递给自定义 Shader，实现“仅光照可见”的像素级透明度计算。交互架构：所有交互对象均继承自通用基类，支持状态保存、视觉提示及复杂的物品消耗验证。",
        image: "https://picsum.photos/seed/list-tech/800/400"
      },
      gallery: [
        "https://picsum.photos/seed/list1/800/600",
        "https://picsum.photos/seed/list2/800/600",
        "https://picsum.photos/seed/list3/800/600",
        "https://picsum.photos/seed/list4/800/600"
      ],
      honors: ["Demo 版本广受玩家好评"],
      enHonors: ["Demo version highly acclaimed by players"]
    }
  },
  {
    id: 3,
    title: "菌丝工厂",
    enTitle: "Mycelium Mill",
    type: "2D 模拟工厂",
    enType: "2D Factory Simulation",
    image: "https://picsum.photos/seed/mycelium-mill/800/600",
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
      designModule: {
        title: "菌丝物流与逻辑流线",
        enTitle: "Mycelium Logistics & Logic Gates",
        content: "玩家利用菌丝管道采集并加工土壤中的原材料，用于培育包含灯笼菇（照明）、能量菇（发电/加速）和裂解菇（资源回收）等多功能蘑菇资产。并使用菌丝分流器（OR逻辑）和孢子过滤器（AND逻辑）等装置达成自动化。",
        enContent: "Players use mycelium pipes to harvest and process raw materials from the soil to cultivate mushrooms like Lantern Mushrooms (lighting), Energy Mushrooms (power/acceleration), and Fission Mushrooms (recycling). Setup automated lines using Mycelium Splitters (OR logic) and Spore Filters (AND logic).",
        image: "https://picsum.photos/seed/mill-design/800/400"
      },
      techModule: {
        title: "Shader编写与视差滚动系统",
        enTitle: "Shader Programming & Parallax System",
        content: "设计和绘制了 11 种基于现实或原创功能的可爱蘑菇资产；实现了多层视差滚动背景与动态天气系统，渲染了治愈清新的视觉氛围。",
        enContent: "Designed and drew 11 cute mushroom assets based on real/original functions. Implemented a multi-layer parallax scrolling background and dynamic weather system, rendering a healing and fresh visual atmosphere.",
        image: "https://picsum.photos/seed/mill-tech/800/400"
      },
      gallery: [
        "https://picsum.photos/seed/mill1/800/600",
        "https://picsum.photos/seed/mill2/800/600",
        "https://picsum.photos/seed/mill3/800/600"
      ]
    }
  },
  {
    id: 4,
    title: "请出示门票",
    enTitle: "Check my tickets",
    type: "2D 休闲模拟",
    enType: "2D Casual Sim",
    image: "https://picsum.photos/seed/check-my-tickets/800/600",
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
      designModule: {
        title: "玩法与验证系统",
        enTitle: "Gameplay & Authentication System",
        content: "玩家扮演检票员，需根据排片表核对电影名、放映时间及日期，并识别手绘伪造票或污损票。包含商店系统，可购买紫外线灯（真伪验证）等道具辅助工作。",
        enContent: "Players act as ticket inspectors, checking movie names, times, and dates against a schedule, identifying hand-drawn fakes or damaged tickets. Includes a shop system to buy tools like UV lights for verification."
      },
      techModule: {
        title: "非线性对象生成与UI性能优化",
        enTitle: "Non-linear Spawning & UI Optimization",
        content: "非线性生成系统：票据生成策略会根据游戏时间动态调整，模拟人流高峰期的自然感。性能优化：UI 渲染采用了对象池模式，避免频繁实例化造成的卡顿。自定义编辑器：为关卡设计师开发了自定义 Inspector 工具，可快速调整参数。",
        enContent: "Non-linear spawning system dynamically adjusts ticket generation strategies based on in-game time to simulate rush hour crowds naturally. Performance optimization featured an Object Pool pattern for UI rendering. Created a custom Inspector tool for level designers."
      },
      gallery: [
        "https://picsum.photos/seed/ticket1/800/600",
        "https://picsum.photos/seed/ticket2/800/600"
      ]
    }
  },
  {
    id: 5,
    title: "参与及其他独立作品",
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
        "《家人保卫战》：CUSGO 初赛入围者",
        "《梦境事务所》：吉比特高校“最佳美术奖”",
        "《Minute Through Dimensions》：个人全栈作品"
      ],
      enFeatures: [
        "'Family Defense': CUSGO prelims project",
        "'Dream Agency': G-bits University 'Best Art' award",
        "'Minute Through Dimensions': Solo full-stack project"
      ],
      designModule: {
        title: "多方位设计与打磨",
        enTitle: "Multi-faceted Design & Polish",
        content: "在《家人保卫战》中负责风格化美术构建；在《梦境事务所》中深度结合 dream 概念与策略解谜，设计了精巧的关卡；而个人同人游戏则锻炼了从策划到整体视觉音效统筹的全要素能力。",
        enContent: "In 'Family Defense', I handled stylized art construction; in 'Dream Agency', I deeply integrated dream concepts with puzzle strategy. Solo projects trained my full-pipeline abilities from design to overall composition."
      },
      techModule: {
        title: "工具流与泛能力拓展",
        enTitle: "Toolchains & Pipeline Expansion",
        content: "随着参与不同定位和不同体量的游戏项目，我逐渐能够不仅局限于程序开发，还在美术资产、音效处理等泛技术领域快速搭建工作流，寻找针对小型独立团队优选的实现方案。",
        enContent: "By participating in games of varying scales, I expanded beyond just programming, learning to quickly build workflows for art assets and audio processing, finding optimal solutions for small indie teams."
      },
      gallery: [
        "https://picsum.photos/seed/misc1/800/600",
        "https://picsum.photos/seed/misc2/800/600",
        "https://picsum.photos/seed/misc3/800/600"
      ],
      honors: [
        "《家人保卫战》：CUSGO 初赛入围",
        "《梦境事务所》：吉比特高校开发挑战赛“最佳美术奖”"
      ],
      enHonors: [
        "'Family Defense': CUSGO Preliminaries Finalist",
        "'Dream Agency': G-bits University Dev Challenge 'Best Art' Award"
      ]
    }
  }
];
