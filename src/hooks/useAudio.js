
import { useCallback } from 'react';

// Base64 Audio Strings (shortened for performance)
const AUDIO_SOURCES = {
  cash: 'data:audio/wav;base64,UklGRi4AAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=', // Placeholder: Logic handles actual playback if real files aren't available, or uses these snippets
  click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE=',
  buzzer: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAB9eHVxbWloZ2RhXltZV1VUUlFQTk1MSEhISEhISEhISEhITE1OT1BRUlRVV1lcXmBiZGZoamxub3Fzd3l7fYGChIeIiouNjY6Pj4+Pjo2MiomIhYN/fXp3dHFubGpnZWNgXltZWFZVU1JRUFBPTk5OTk1NTU1NTU1NTE1NTU5PT1BRUlRVVlhaXF1fYWRmaGpsbnBydHZ5e36Ag4WIioyOj5CRkpOTlJSUlJSUk5KRkI+OjIqIhYN/fHl2c3BtamhlY2BdW1lXVVRSUVBPT05OTk5OTk5OT09QUVJTVFZYWl1fYWRmaGttbnBydHd5fH+ChIeKjY6QkpOUlJWWlpaWlZWUk5KQjo2LiYaEgX57eHVybmtoZWJfXVtZV1ZUU1JRUFBPTk5OTk5OT09QUVJTVFZYWl1fYWRmaGtvbnBzdbh6fH+Ch4qMjpCSlJWWl5iYmJiXl5aVlJKRj42LiYaEgX57eHVybmtoZWJfXVtZV1ZUU1JRUFBPTk5OTk5OT09QUVJTVFZYWl1fYWRmaGtvbnBzdbh6fH+Ch4qMjpCSlJWWl5iYmJiXl5aVlJKRj42LiYaEgX57eHVybmtoZWJfXVtZV1ZUU1JRUFBPTk5O'
};

function useAudio(volume = 50) {
  const playSound = useCallback((type) => {
    if (volume <= 0) return;

    let src = AUDIO_SOURCES.click; // Default
    if (type === 'buzzer') src = AUDIO_SOURCES.buzzer;
    if (type === 'cash') src = AUDIO_SOURCES.click; // Reusing click for simplicity or add specific base64

    const audio = new Audio(src);
    audio.volume = Math.min(Math.max(volume / 100, 0), 1);
    
    audio.play().catch(e => {
        // Silent catch for autoplay restrictions
    });
  }, [volume]);

  return { playSound };
}

export default useAudio;
