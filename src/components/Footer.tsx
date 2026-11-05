import React from 'react';
import { CONTACT_INFO } from '../constants/contactInfo';

export const Footer: React.FC = () => (
  <footer className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex flex-wrap justify-between gap-4 border-t border-cyan-main/15 text-sm text-cyan-dark/70">
    <span>© {new Date().getFullYear()} {CONTACT_INFO.name}</span>
    <div className="flex flex-wrap gap-5">
      <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline underline-offset-4">{CONTACT_INFO.email}</a>
      <a href={CONTACT_INFO.itch} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">itch.io</a>
      <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">GitHub</a>
    </div>
  </footer>
);
