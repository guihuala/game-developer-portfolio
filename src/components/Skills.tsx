import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Code, Box, PenTool, Music, Layers } from 'lucide-react';

const skills = [
  { name: 'Unity', level: '95%', color: '#00BCD4', icon: Gamepad2, desc: 'C# / Editor / URP', size: 140 },
  { name: 'Unreal', level: '85%', color: '#FFD54F', icon: Code, desc: 'C++ / Blueprints', size: 120 },
  { name: 'Godot', level: '75%', color: '#4ADE80', icon: Layers, desc: 'GDScript', size: 100 },
  { name: 'UI / UX', level: '90%', color: '#00BCD4', icon: PenTool, desc: 'Figma / Animation', size: 130 },
  { name: '3D Art', level: '60%', color: '#F472B6', icon: Box, desc: 'Blender / Modeling', size: 90 },
  { name: 'Audio', level: '50%', color: '#FFD54F', icon: Music, desc: 'FMOD / Editing', size: 85 }
];

export const Skills: React.FC = () => {
  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center">
      
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-black text-cyan-dark uppercase tracking-widest">
          Technology <span className="text-cyan-main">Stack</span>
        </h3>
        <p className="text-cyan-dark/50 font-bold text-sm mt-2">
          Feel free to drag the skill nodes around!
        </p>
      </div>

      <div className="relative w-full h-[500px] bg-white/50 backdrop-blur-md rounded-[3rem] border-4 border-white shadow-inner overflow-hidden flex items-center justify-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00BCD4 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {skills.map((skill, index) => {
          // Generate somewhat random starting positions
          const startX = Math.random() * 200 - 100;
          const startY = Math.random() * 200 - 100;

          return (
            <motion.div
              key={skill.name}
              drag
              dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
              dragElastic={0.2}
              initial={{ opacity: 0, scale: 0, x: startX, y: startY }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: "spring",
                bounce: 0.5
              }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
              whileDrag={{ scale: 1.2, zIndex: 100, cursor: 'grabbing' }}
              className="absolute flex flex-col items-center justify-center rounded-full shadow-lg border-4 border-white cursor-grab group bg-white"
              style={{
                width: skill.size,
                height: skill.size,
                color: skill.color
              }}
            >
              <div className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: skill.color }}></div>
              <skill.icon className="w-1/3 h-1/3 mb-1 transition-transform group-hover:-translate-y-1" style={{ color: skill.color }} />
              
              <span className="font-black font-sans text-cyan-dark text-sm tracking-wider uppercase group-hover:text-cyan-main transition-colors">
                {skill.name}
              </span>
              
              <span className="text-[10px] font-bold text-cyan-dark/50 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-3">
                {skill.desc}
              </span>

              {/* Orbital proficiency level */}
              <motion.div 
                className="absolute inset-x-0 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-center flex justify-center"
                initial={{ y: -10 }}
                whileHover={{ y: 0 }}
              >
                <span className="px-3 py-1 bg-cyan-dark text-white rounded-full text-xs font-black shadow-md border-2 border-white">
                  {skill.level}
                </span>
              </motion.div>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
};
