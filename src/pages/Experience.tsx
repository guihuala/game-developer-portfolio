import React from 'react';
import { Timeline } from '../components/Timeline';
import { SEO } from '../components/SEO';

export const Experience: React.FC = () => {
  return (
    <div>
      <SEO 
        title="Experience" 
        description="A journey through Mokukeki's professional experience, game jam participations, and academic milestones."
      />
      <Timeline />
    </div>
  );
};
