
import { useState, useEffect, useCallback } from 'react';
import { GrobTips } from '@/utils/TextData';

const STORAGE_KEY = 'grob-tip-index';

export function useGrobTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [currentTip, setCurrentTip] = useState(GrobTips[currentTipIndex] || GrobTips[0]);

  // Persist index when it changes
  useEffect(() => {
    setCurrentTip(GrobTips[currentTipIndex]);
    localStorage.setItem(STORAGE_KEY, currentTipIndex.toString());
  }, [currentTipIndex]);

  const rotateTip = useCallback(() => {
    setCurrentTipIndex(prev => {
      let next;
      // Prevent same tip twice in a row, unless there's only 1 tip
      do {
        next = Math.floor(Math.random() * GrobTips.length);
      } while (next === prev && GrobTips.length > 1);
      return next;
    });
  }, []);

  // Auto-rotate every 15-20 seconds
  useEffect(() => {
    const minTime = 15000;
    const maxTime = 20000;
    const intervalTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

    const interval = setInterval(rotateTip, intervalTime);
    return () => clearInterval(interval);
  }, [rotateTip]);

  return { currentTip, rotateTip };
}
