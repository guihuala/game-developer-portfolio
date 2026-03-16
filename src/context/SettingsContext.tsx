import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  isLateNightMode: boolean;
  toggleLateNightMode: () => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  setAudioEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLateNightMode, setIsLateNightMode] = useState<boolean>(() => {
    const hours = new Date().getHours();
    return hours >= 1 && hours < 5; // Midnight to early morning
  });

  const [audioEnabled, setAudioEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem('audioEnabled');
    return saved !== 'false'; // Default to true
  });

  const toggleLateNightMode = () => {
    setIsLateNightMode(!isLateNightMode);
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
        isLateNightMode,
        toggleLateNightMode,
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
