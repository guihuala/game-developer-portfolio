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
  };
  techModule: {
    title: string;
    enTitle: string;
    content: string;
    enContent: string;
  };
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
}

export const projects: Project[] = [
  {
    id: 1,
    title: "霓虹之刃",
    enTitle: "NEON BLADE",
    type: "动作 RPG",
    enType: "Action RPG",
    image: "https://picsum.photos/seed/cute-rpg/800/600",
    color: "#00BCD4",
    desc: "一款快节奏的动作游戏，拥有流畅的连招机制和可爱的角色。",
    enDesc: "A fast-paced slasher with fluid combo mechanics and cute characters.",
    tags: ["Unity", "C#", "VFX Graph"],
    details: {
      about: "《霓虹之刃》是我在大学期间主导开发的一款独立动作游戏。游戏设定在一个充满生机的赛博朋克世界中，玩家将扮演一名失去记忆的机械少女，通过不断战斗找回自己的过去。游戏强调爽快的打击感和华丽的视觉表现。",
      enAbout: "Neon Blade is an indie action game I led during college. Set in a vibrant cyberpunk world, players control an amnesiac mecha-girl fighting to uncover her past. The game emphasizes satisfying combat and gorgeous visuals.",
      features: ["流畅的连招系统与技能树", "超过20种可爱的机械敌人", "动态天气与昼夜交替"],
      enFeatures: ["Fluid combo system and skill tree", "Over 20 cute mecha enemies", "Dynamic weather and day/night cycle"],
      designModule: {
        title: "战斗系统设计",
        enTitle: "Combat System Design",
        content: "为了实现极具深度的连招体验，我设计了一套基于状态机的战斗架构。通过轻重攻击的自由组合以及强制取消机制（Cancel），玩家可以在不打断动作流畅度的前提下创造属于自己的连招路线。此外，我还为不同的敌人配置了丰富的受击硬直与浮空参数，以确保每次击打都有拳拳到肉的真实感。",
        enContent: "To achieve a deep combo experience, I designed a combat architecture based on state machines. Through the free combination of light/heavy attacks and a 'Cancel' mechanic, players can create unique combo routes without interrupting fluidity. Additionally, varying hit-stun and juggle parameters were configured for different enemies to ensure impactful feedback."
      },
      techModule: {
        title: "动作状态机与特效渲染",
        enTitle: "Animation State Machine & VFX",
        content: "技术层面，游戏使用了自研的节点驱动连招编辑器，大幅提高了技能制作效率。在视觉表现上，我使用 Unity 的 VFX Graph 和 URP（通用渲染管线）编写了大量自定义 Shader，包括随攻击轨迹生成的霓虹残影，以及基于 SDF（距离场）的动态流火特效。",
        enContent: "Technically, the game utilizes a custom node-driven combo editor to speed up skill creation. Visually, I used Unity's VFX Graph and URP to write numerous custom Shaders, including neon afterimages that follow attack trajectories and dynamic SDF-based fire effects."
      }
    }
  },
  {
    id: 2,
    title: "星界编年史",
    enTitle: "ASTRAL CHRONICLES",
    type: "回合制策略",
    enType: "Turn-based Strategy",
    image: "https://picsum.photos/seed/astral-cute/800/600",
    color: "#FFD54F",
    desc: "史诗般的太空歌剧，包含深度的战术战斗与分支剧情。",
    enDesc: "Epic space opera with deep tactical combat and branching narratives.",
    tags: ["Unreal Engine", "Blueprints", "C++"],
    details: {
      about: "《星界编年史》结合了传统战棋的深度与现代视觉表现。玩家将指挥一支星际舰队，在不同的星系间探索、贸易并与敌对势力交战。每个决定都会影响宇宙的最终走向。",
      enAbout: "Astral Chronicles combines the depth of traditional SRPGs with modern visuals. Players command a starfleet, exploring, trading, and fighting across galaxies. Every decision impacts the universe's fate.",
      features: ["基于网格的深度战术战斗", "多重结局的网状叙事", "飞船自定义与船员养成"],
      enFeatures: ["Deep grid-based tactical combat", "Branching narrative with multiple endings", "Ship customization and crew progression"],
      designModule: {
        title: "网状叙事引擎",
        enTitle: "Branching Narrative Engine",
        content: "游戏最核心的卖点是其错综复杂的剧情分支。我设计了一个基于全局变量和派系声望的树状网格模型。玩家的选择不仅仅影响下一段对话，还会实时改变星球市场的物价、不同种族对玩家的态度，甚至是战役中敌人的兵力部署。",
        enContent: "The core selling point is its intricate branching narrative. I designed a tree-grid model based on global variables and faction reputations. Player choices affect not just dialogue, but also market prices, racial attitudes, and even enemy deployments in battles."
      },
      techModule: {
        title: "AI行为树与大视距渲染",
        enTitle: "AI Behavior Trees & Macro Rendering",
        content: "为了处理回合制中的多维度决策，我使用 Unreal 的行为树（Behavior Tree）与环境查询系统（EQS）构建了具有不同“性格”的 AI，使它们懂得包抄和后撤。在渲染方面，由于太空场景尺度极大，我采用了层级LOD和贴花投影器，实现了极低开销下的浩瀚星河渲染。",
        enContent: "To handle multi-dimensional decisions in turn-based combat, I built AI with distinct 'personalities' using Unreal's Behavior Trees and EQS, allowing them to flank and retreat. For rendering, given the massive scale of space scenes, I utilized hierarchical LOD and decal projectors to achieve a vast galaxy rendering with extremely low overhead."
      }
    }
  },
  {
    id: 3,
    title: "灵魂编织者",
    enTitle: "SOUL WEAVER",
    type: "类银河恶魔城",
    enType: "Metroidvania",
    image: "https://picsum.photos/seed/soul-cute/800/600",
    color: "#FF8A65",
    desc: "使用丝线移动机制探索一个相互连接的奇幻世界。",
    enDesc: "Explore an interconnected world using thread-based traversal.",
    tags: ["Godot", "GDScript", "Pixel Art"],
    details: {
      about: "在《灵魂编织者》中，玩家扮演一位能够操控灵魂之线的织工。利用丝线进行摆荡、拉扯敌人或解开环境谜题。游戏采用了精美的像素艺术风格，营造出一种温馨而神秘的氛围。",
      enAbout: "In Soul Weaver, players act as a weaver who manipulates soul threads. Use threads to swing, pull enemies, or solve environmental puzzles. The game features beautiful pixel art, creating a cozy yet mysterious atmosphere.",
      features: ["独特的丝线物理摆荡机制", "无缝连接的庞大地图", "温馨治愈的像素美术风格"],
      enFeatures: ["Unique thread-based physics swinging", "Massive seamlessly interconnected map", "Cozy and healing pixel art style"],
      designModule: {
        title: "物理交互的关卡设计",
        enTitle: "Physics-based Level Design",
        content: "本作的核心移动机制完全基于物理引擎。因此在关卡设计上，我摒弃了传统的固定跳跃平台，转而大量使用可交互的锚点与动态障碍物。玩家需要利用物理钟摆的惯性来到达隐藏区域，这种‘操作门槛’使得探索本身就成为了一种奖励。",
        enContent: "The core traversal mechanic is entirely physics-based. Thus, in level design, I discarded traditional static platforms in favor of interactive anchor points and dynamic obstacles. Players must use pendulum momentum to reach hidden areas, making the ‘skill floor’ of exploration a reward in itself."
      },
      techModule: {
        title: "自定义物理约束与数据优化",
        enTitle: "Custom Physics Constraints & Optimization",
        content: "在 Godot 中，为了让丝线的摆荡既符合物理直觉又易于玩家控制，我重写了部分 Box2D 的关节约束逻辑（Joint Constraints），加入了空气阻力和辅助吸附算法。另外，由于地图是真无缝加载，我实现了一套基于区块坐标的异步流加载系统，确保了游戏全程无读条。",
        enContent: "In Godot, to make thread swinging intuitive yet controllable, I rewrote part of the Box2D joint constraints logic, adding air resistance and assisted snapping algorithms. Furthermore, for the truly seamless map loading, I implemented a chunk-coordinate-based asynchronous streaming system to ensure zero loading screens."
      }
    }
  }
];
