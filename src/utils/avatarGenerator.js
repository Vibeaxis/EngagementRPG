
export const generateGlowieAvatar = () => {
  const avatars = ["😎", "👮‍♂️", "🦅", "🚛", "🕶️", "🇺🇸"];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

export const generatePornBotAvatar = () => {
  // Using a consistent seed based on time to get different images but stable for the session if needed
  const seed = Math.random().toString(36).substring(7);
  return `https://i.pravatar.cc/150?u=${seed}`;
};

export const generateBrandAvatar = () => {
  const avatars = ["🍔", "🏦", "💻", "🎮", "🥤", "👠", "🚗", "📱"];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

export const generateRealUserAvatar = () => {
  const seed = Math.random().toString(36).substring(7);
  // Using a different service or param to distinguish visual style if possible, 
  // but pravatar is fine for generic users too.
  return `https://i.pravatar.cc/150?u=${seed}_real`;
};
