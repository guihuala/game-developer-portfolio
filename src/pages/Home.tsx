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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mokukeki",
          "jobTitle": "Game Developer",
          "url": "https://your-portfolio-url.com",
          "sameAs": [
            "https://github.com/your-github",
            "https://linkedin.com/in/your-linkedin"
          ],
          "knowsAbout": ["Game Development", "Unity", "C#", "Level Design", "Technical Art"]
        })}
      </script>
      <Hero />
    </>
  );
};
