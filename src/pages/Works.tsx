import React from 'react';
import { Portfolio } from '../components/Portfolio';
import { SEO } from '../components/SEO';

export const Works: React.FC = () => {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen lg:h-screen lg:overflow-hidden">
      <SEO 
        title="Works" 
        description="A list of featured game projects by Mokukeki, including 3D RPGs, narrative puzzles, and simulation games."
      />
      <Portfolio />
    </div>
  );
};
