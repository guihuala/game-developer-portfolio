import React from 'react';
import { Coffee, Code2, Heart } from 'lucide-react';

export const PersonalIntro: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 lg:p-12">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full h-full gap-12">
        
        {/* Left Side: Text */}
        <div className="flex-1 flex flex-col items-start lg:pr-8">
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-cyan-dark mb-4 drop-shadow-sm flex items-center gap-3">
              <Coffee className="w-8 h-8 text-yellow-main" />
              你好！
            </h3>
            <p className="text-lg text-cyan-dark/90 font-sans font-bold leading-relaxed">
              我是一名充满激情的独立游戏开发与全栈工程师。我热爱创造既有深度机制又具艺术表现力的产品与世界。
            </p>
            <p className="text-md text-cyan-dark/70 font-sans font-semibold leading-relaxed">
              我曾主导过多款游戏的核心玩法设计与系统架构。擅长将抽象的想法转化为玩家可以触摸体验到的实际乐趣。无论是前端的像素跃动，还是后端的数据洪流，我都能游刃有余。
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 w-full mt-12 pt-6 border-t-2 border-cyan-light/30">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-light/30 rounded-xl text-cyan-main shadow-sm">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="font-black text-cyan-dark text-sm tracking-widest uppercase">全栈发力</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-main/20 rounded-xl text-yellow-main shadow-sm">
                <Heart className="w-6 h-6" />
              </div>
              <span className="font-black text-cyan-dark text-sm tracking-widest uppercase">游戏至上</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink-100 rounded-xl text-pink-500 shadow-sm">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="font-black text-cyan-dark text-sm tracking-widest uppercase">咖啡驱动</span>
            </div>
          </div>
        </div>

        {/* Right Side: Avatar */}
        <div className="w-full lg:w-[400px] flex flex-col items-center justify-center shrink-0 mb-8 lg:mb-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-white shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-main/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src="/avatar.png" 
              alt="Avatar" 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out z-0" 
            />
          </div>
        </div>

      </div>
    </div>
  );
};
