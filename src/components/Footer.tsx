import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Mail, Gamepad2, Tv, Globe } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const socials = [
    { icon: Github, link: CONTACT_INFO.github, color: '#006064', label: 'GitHub' },
    { icon: Twitter, link: CONTACT_INFO.twitter, color: '#00BCD4', label: 'Twitter' },
    { icon: Tv, link: CONTACT_INFO.bilibili, color: '#fb7299', label: 'Bilibili' },
    { icon: Gamepad2, link: CONTACT_INFO.itch, color: '#fa5c5c', label: 'Itch.io' }
  ];

  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative py-8 z-10 overflow-hidden bg-white/50 backdrop-blur-sm border-t border-cyan-light/30">
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
        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
          {/* Blog Button */}
          <motion.a
            href={CONTACT_INFO.blog}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -8, scale: 1.05 }}
            className="flex items-center gap-3 px-6 py-3 bg-cyan-main text-white rounded-full font-black text-sm shadow-lg shadow-cyan-main/30 border-2 border-white/20 transition-all w-full sm:w-auto justify-center"
          >
            <Globe className="w-4 h-4" />
            <span>{t("博客", "BLOG")}</span>
          </motion.a>

          <div className="flex items-center gap-2 lg:gap-3">
            {socials.map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white border-2 border-cyan-light/30 flex items-center justify-center shadow-md transition-colors hover:border-cyan-main/50"
                  style={{ color: social.color }}
                  title={social.label}
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
