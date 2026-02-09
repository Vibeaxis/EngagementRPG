
export const CelebrityProfiles = [
  { handle: "@TechLord", displayName: "Techno King", avatar: "🚀", badge: "Legend" },
  { handle: "@MainCharacter", displayName: "The Protagonist", avatar: "🦄", badge: "Icon" },
  { handle: "@MovieStar", displayName: "Famous Actor", avatar: "⭐", badge: "Star" },
  { handle: "@ElonMusk2", displayName: "X Owner", avatar: "👽", badge: "Owner" },
  { handle: "@TechBro", displayName: "VC Thought Leader", avatar: "🌉", badge: "Visionary" },
  { handle: "@InfluencerKing", displayName: "Mr. Beastly", avatar: "👑", badge: "Creator" },
  { handle: "@Celebrity_AI", displayName: "Sentient LLM", avatar: "🤖", badge: "AGI" },
  { handle: "@ChartGod", displayName: "Crypto Oracle", avatar: "📉", badge: "Bullish" },
  { handle: "@HumbleHustler", displayName: "Wellness Guru", avatar: "🧘", badge: "Ascended" },
  { handle: "@PolitiBot", displayName: "Angry Pundit", avatar: "🚩", badge: "Verified" },
  { handle: "@LegacyCEO", displayName: "Old Money Mike", avatar: "👴", badge: "Billionaire" },
  { handle: "@StreamQueen", displayName: "Gamer Girl 77", avatar: "🎮", badge: "Partner" },
  { handle: "@DeepStateDarryl", displayName: "Conspiracy Connoisseur", avatar: "🛰️", badge: "Exposed" }
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
  "Your entire net worth is a rounding error on my lunch receipt.",
  "Why is everyone complaining about the cost of living? Just increase your output. Skill issue.",
  "I've decided to start charging my friends for my time. My hourly rate is 400 SOL.",
  "If you haven't been 'canceled' at least three times this year, you're not actually saying anything.",
  "Imagine still using a physical wallet in 2026. Absolute peasant behavior.",
  "Taking a break from social media to reconnect with nature (posted from my $4k VR headset).",
  "Just fire everyone and start over with 3 talented interns. Efficiency is king.",
  "I don't read books anymore. I just absorb the vibes of the cover and it's much faster.",
  "The only reason you're not a millionaire is because you eat lunch. Lunch is for the weak.",
  "Just spent $2 million on a digital jpeg of a depressed rock. You wouldn't get it.",
  "Freedom of speech doesn't mean freedom from me calling you a bot. !!",
  "Interesting. Looking into this. (Actually just scrolling while on the toilet).",
  "Legacy media is a dying star. I am the supernova. Follow for more truths."
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
