export const generateArchetypeTweet = () => {
  const roll = Math.random();
  let pool;
  let voice;

  if (roll < 0.25) {
    pool = DOOMER_POOL;
    voice = "Doomer";
  } else if (roll < 0.50) {
    pool = TECH_OPTIMIST_POOL;
    voice = "Optimist";
  } else if (roll < 0.75) {
    pool = CHRONIC_SCROLLER_POOL;
    voice = "Scroller";
  } else {
    pool = BRAIN_ROT_POOL;
    voice = "BrainRot";
  }

  const text = pool[Math.floor(Math.random() * pool.length)];

  return {
    content: text,
    authorType: "StandardUser",
    voice: voice, // Hidden metadata for debugging/scaling
    isAd: false,
    likes: Math.floor(Math.random() * 5000),
    retweets: Math.floor(Math.random() * 500)
  };
};