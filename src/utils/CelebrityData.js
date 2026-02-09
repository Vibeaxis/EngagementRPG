
export const CelebrityProfiles = [
  { handle: "@TechLord", displayName: "Techno King", avatar: "🚀", badge: "Legend" },
  { handle: "@MainCharacter", displayName: "The Protagonist", avatar: "🦄", badge: "Icon" },
  { handle: "@MovieStar", displayName: "Famous Actor", avatar: "⭐", badge: "Star" },
  { handle: "@ElonMusk2", displayName: "X Owner", avatar: "👽", badge: "Owner" },
  { handle: "@TechBro", displayName: "VC Thought Leader", avatar: "🌉", badge: "Visionary" },
  { handle: "@InfluencerKing", displayName: "Mr. Beastly", avatar: "👑", badge: "Creator" },
  { handle: "@Celebrity_AI", displayName: "Sentient LLM", avatar: "🤖", badge: "AGI" }
];

export const SmugTakes = [
  "I don't think you understand how first principles thinking works.",
  "Just bought a small island to avoid the woke mind virus. Thoughts?",
  "If you aren't waking up at 3AM to ice bath, you're NGMI.",
  "My new movie is not just a film, it's a cultural reset.",
  "Poor people should just buy more money. It's basic economics.",
  "AI will replace your job, your spouse, and your dog. And that's a good thing.",
  "I'm not arguing, I'm just explaining why I'm right.",
  "Deleting this app in 5 minutes. (Posted 3 hours ago)",
  "Just had a meeting with the President of Mars. Big things coming.",
  "Your entire net worth is a rounding error on my lunch receipt."
];

export const generateCelebrityTweet = () => {
  const profile = CelebrityProfiles[Math.floor(Math.random() * CelebrityProfiles.length)];
  const take = SmugTakes[Math.floor(Math.random() * SmugTakes.length)];

  return {
    content: take,
    authorType: "Celebrity",
    handle: profile.handle,
    displayName: profile.displayName,
    avatar: profile.avatar,
    isAd: false,
    topic: "Celebrity",
    badge: profile.badge,
    likes: Math.floor(Math.random() * 500000) + 10000,
    retweets: Math.floor(Math.random() * 50000) + 1000
  };
};
