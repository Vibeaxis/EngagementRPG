
import { useState, useEffect, useCallback, useRef } from 'react';

const useRatioDuel = (isActive, playerLevel = 1, onEnd) => {
  const [barPosition, setBarPosition] = useState(50); // 0 = loss, 100 = win
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [duelActive, setDuelActive] = useState(false);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  
  const frameRef = useRef();
  const lastTimeRef = useRef();

  useEffect(() => {
    if (isActive) {
      setDuelActive(true);
      setBarPosition(50);
      setTimeRemaining(10);
      lastTimeRef.current = Date.now();
    } else {
      setDuelActive(false);
    }
  }, [isActive]);

const handlePlayerClick = useCallback(() => {
  if (!duelActive) return;
  
  setBarPosition(prev => {
    const next = prev + (2.5 + (playerLevel * 0.1));
    
    // TRIGGER WIN IMMEDIATELY AT 100
    if (next >= 100) {
      setDuelActive(false);
      onEnd({ won: true, rewards: { followers: 10, impressions: 5000, revenue: 50 } });
      return 100;
    }
    return next;
  });

  // Simplified shake logic that doesn't rely on the state variable
  return barPosition < 40 ? 'heavy' : 'light'; 
}, [duelActive, playerLevel, onEnd, barPosition]);

  useEffect(() => {
    if (!duelActive) return;

    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = now - lastTimeRef.current;
      
      if (deltaTime >= 50) { // Update ~20fps
        // AI pushes left (bar goes down)
        // Difficulty scales slightly with level but base difficulty ensures tension
        const aiStrength = 0.5 + (playerLevel * 0.05); 
        
        setBarPosition(prev => {
          const newPos = prev - aiStrength;
          
          if (newPos <= 0) {
            setDuelActive(false);
            onEnd({ won: false, penalties: { followers: -20, battery: 5, impressions: -1000 } });
            return 0;
          }
          if (newPos >= 100) {
            setDuelActive(false);
            onEnd({ won: true, rewards: { followers: 10, impressions: 5000, revenue: 50 } }); // followers is % in context
            return 100;
          }
          return newPos;
        });

        lastTimeRef.current = now;
      }
      
      frameRef.current = requestAnimationFrame(gameLoop);
    };

    frameRef.current = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(frameRef.current);
  }, [duelActive, playerLevel, onEnd]);

  // Timer Countdown
  useEffect(() => {
    if (!duelActive) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setDuelActive(false);
          onEnd({ won: false, penalties: { followers: -20, battery: 5, impressions: -1000 } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duelActive, onEnd]);

  // Shake Intensity Calculation for Visuals
  useEffect(() => {
    if (barPosition < 25) setShakeIntensity(8);
    else if (barPosition < 50) setShakeIntensity(4);
    else if (barPosition < 75) setShakeIntensity(2);
    else setShakeIntensity(0);
  }, [barPosition]);

  return {
    barPosition,
    timeRemaining,
    duelActive,
    handlePlayerClick,
    shakeIntensity
  };
};

export default useRatioDuel;
