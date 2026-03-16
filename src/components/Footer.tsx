import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Mail, Gamepad2, Heart } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';

export const Footer: React.FC = () => {
  const socials = [
    { icon: Github, link: CONTACT_INFO.github, color: '#006064' },
    { icon: Twitter, link: CONTACT_INFO.twitter, color: '#00BCD4' },
    { icon: Linkedin, link: CONTACT_INFO.linkedin, color: '#00838F' },
    { icon: Gamepad2, link: '#', color: '#FFD54F' }
  ];

  return (
    <footer id="contact" className="relative py-12 z-10 overflow-hidden bg-white/50 backdrop-blur-sm border-t border-cyan-light/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Section: Branding & Contact Info Combined */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div>
            <span className="text-cyan-dark/50 font-sans font-bold text-sm flex items-center gap-1 mt-1">
              Made with © {new Date().getFullYear()} {CONTACT_INFO.name}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-cyan-dark mt-2">
            <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 hover:text-cyan-main transition-colors">
              <Mail className="w-4 h-4 text-cyan-main" />
              <span className="font-bold text-sm font-sans">{CONTACT_INFO.email}</span>
            </a>
            <div className="flex items-center gap-2">
              <span className="font-black text-xs text-yellow-main tracking-widest uppercase">Phone:</span>
              <span className="font-bold text-sm font-sans">{CONTACT_INFO.phone}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Socials */}
        <div className="flex items-center gap-4">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={i}
                href={social.link}
                whileHover={{ y: -8, scale: 1.1, rotate: i % 2 === 0 ? 10 : -10 }}
                className="w-14 h-14 rounded-full bg-white border-4 border-cyan-light flex items-center justify-center shadow-md transition-colors"
                style={{ color: social.color }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
