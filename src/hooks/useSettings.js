
import { useState, useEffect } from 'react';

const DEFAULT_SETTINGS = {
  grobFrequency: false, // false = 2-5%, true = 10-15%
  volume: 50,
  hapticFeedback: true,
  algorithmTransparency: 75, // Visual only
  darkerMode: true // Visual only
};

function useSettings() {
  // Initialize state with localStorage or defaults
  const [settings, setSettings] = useState(() => {
    try {
      const item = window.localStorage.getItem('gameSettings');
      return item ? JSON.parse(item) : DEFAULT_SETTINGS;
    } catch (error) {
      console.warn("Error reading settings from localStorage", error);
      return DEFAULT_SETTINGS;
    }
  });

  // Persist settings whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem('gameSettings', JSON.stringify(settings));
    } catch (error) {
      console.warn("Error saving settings to localStorage", error);
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return {
    settings,
    updateSetting
  };
}

export default useSettings;
