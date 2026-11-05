import React from 'react';
import { CONTACT_INFO } from '../constants/contactInfo';

export const Footer: React.FC = () => {
  return <footer className="atelier-footer"><span>© {new Date().getFullYear()} MOKUKEKI</span><div><a href={`mailto:${CONTACT_INFO.email}`}>Email ↗</a><a href={CONTACT_INFO.itch} target="_blank" rel="noreferrer">itch.io ↗</a><a href={CONTACT_INFO.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></footer>;
};
