import React from 'react';
import { ParticleBackground } from '../effects/ParticleBackground';

export const ParticleHeroCanvas: React.FC = () => {
  return (
    <ParticleBackground
      enableGlow={true}
      enableMouseInteraction={true}
      particleSpeed={0.9}
    />
  );
};
