import React from 'react';
import { Hero } from '../components/Hero';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="Welcome to the game development portfolio of Mokukeki. Explore creative 3D and 2D games, technical demos, and more."
      />
      <Hero />
    </>
  );
};
