
import { useCallback } from 'react';

function useHapticFeedback(enabled = true) {
  const triggerHaptic = useCallback((type = 'heavy') => {
    if (!enabled) return;

    // Navigator vibration if supported
    if (navigator.vibrate) {
        if (type === 'light') navigator.vibrate(10);
        else if (type === 'medium') navigator.vibrate(20);
        else if (type === 'heavy') navigator.vibrate([30, 50, 30]);
    }

    // Screen Shake CSS
    const body = document.body;
    body.classList.add('animate-screen-shake');
    
    // Remove class after animation
    setTimeout(() => {
        body.classList.remove('animate-screen-shake');
    }, 200);

  }, [enabled]);

  return { triggerHaptic };
}

export default useHapticFeedback;
