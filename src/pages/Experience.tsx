import React from 'react';
import { Timeline } from '../components/Timeline';
import { SEO } from '../components/SEO';

export const Experience: React.FC = () => {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen lg:h-screen lg:overflow-hidden">
      <SEO 
        title="Experience" 
        description="A journey through Mokukeki's professional experience, game jam participations, and academic milestones."
      />
      <Timeline />
    </div>
  );
};
