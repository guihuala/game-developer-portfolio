import React, { createContext, useContext, useState, useEffect } from 'react';

export type ParticleIntensity = 'off' | 'low' | 'high';

interface SettingsContextType {
  particleIntensity: ParticleIntensity;
  setParticleIntensity: (intensity: ParticleIntensity) => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  setAudioEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [particleIntensity, setParticleIntensityState] = useState<ParticleIntensity>(() => {
    const saved = localStorage.getItem('particleIntensity');
    return (saved as ParticleIntensity) || 'low';
  });

  const [audioEnabled, setAudioEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem('audioEnabled');
    return saved !== 'false'; // Default to true
  });

  const setParticleIntensity = (intensity: ParticleIntensity) => {
    setParticleIntensityState(intensity);
    localStorage.setItem('particleIntensity', intensity);
  };

  const setAudioEnabled = (enabled: boolean) => {
    setAudioEnabledState(enabled);
    localStorage.setItem('audioEnabled', String(enabled));
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  return (
    <SettingsContext.Provider 
      value={{ 
        particleIntensity, 
        setParticleIntensity, 
        audioEnabled, 
        toggleAudio,
        setAudioEnabled 
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
