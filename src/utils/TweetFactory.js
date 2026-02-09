// src/utils/TweetFactory.js

const DOOMER_POOL = [
  "The planet is literally on fire and I'm here arguing about a subscription badge.",
  "The peak of human civilization was 2005. Everything else is DLC.",
  "We traded our privacy for ads about vitamins we don't need.",
  "Imagine thinking your vote matters more than the trending tab.",
  "I'm not pessimistic, I'm just paying attention."
];

const TECH_OPTIMIST_POOL = [
  "Web3 is dead. Long live Web4. It's decentralized but in my garage.",
  "If you aren't using AI to write your grocery list, you're a luddite.",
  "The future belongs to those who ship features on Christmas Eve.",
  "Hardware is hard. Software is harder. Being a visionary is effortless.",
  "I don't see problems, I see 'monetization opportunities'."
];

const CHRONIC_SCROLLER_POOL = [
  "I've been scrolling for 4 hours and I haven't seen a single original thought.",
  "Who are you people and why are you in my house (timeline)?",
  "Logging off for 5 minutes to stare at a wall. I'll be back.",
  "My thumb has developed a callus specifically for this app.",
  "Is it 2026 yet? I feel like I've been here for a decade."
];

const BRAIN_ROT_POOL = [
  "Skibidi is the new Latin. Change my mind.",
  "I am currently speedrunning my own downfall. 100% glitchless.",
  "What if we all just stopped posting at the same time? (I'm still posting though).",
  "My brain is 90% static and 10% reaction memes.",
  "Error: Personality not found. Loading 'Controversial Take' instead."
];

// --- NEW ADDITIONS ---

const PUNDIT_POOL = [
  "Thread: Why this 14-second clip of a park bench proves the economy is collapsing. 1/45",
  "The mainstream media won't tell you about this, but I will for $8 a month.",
  "Big if true. Concerning. Looking into this.",
  "Does anyone else feel like the reality setting on the simulation got turned up to 11?",
  "I am once again asking you to ignore the facts and focus on my feelings."
];

const HUSTLE_POOL = [
  "If you aren't waking up at 2 AM to stare at the sun, you're already behind.",
  "I replaced my blood with espresso and my dreams with spreadsheets. Level up.",
  "Your 9-5 is my 9-5... except mine is AM to AM. We are not the same.",
  "Don't go to college. Buy my course on how to sell courses about not going to college.",
  "Comfort is a slow death. Sleep on a bed of nails for maximum ROI."
];

const AI_DOOMSAYER_POOL = [
  "I just saw an LLM write a poem that made me cry. The end is near.",
  "If you can't tell the difference between a bot and your mom, does it even matter?",
  "The Turing test is obsolete. We need a 'Soul Test' for 2026.",
  "Currently teaching my toaster how to feel regret. Progress is slow.",
  "I, for one, welcome our new algorithmic overlords."
];

// 2. THE GENERATOR (Updated Roll Logic)
export const generateArchetypeTweet = () => {
  const roll = Math.random();
  let pool;
  let voice;

  if (roll < 0.15) {
    pool = DOOMER_POOL;
    voice = "Doomer";
  } else if (roll < 0.30) {
    pool = TECH_OPTIMIST_POOL;
    voice = "Optimist";
  } else if (roll < 0.45) {
    pool = CHRONIC_SCROLLER_POOL;
    voice = "Scroller";
  } else if (roll < 0.60) {
    pool = BRAIN_ROT_POOL;
    voice = "BrainRot";
  } else if (roll < 0.75) {
    pool = PUNDIT_POOL;
    voice = "Pundit";
  } else if (roll < 0.90) {
    pool = HUSTLE_POOL;
    voice = "Hustle";
  } else {
    pool = AI_DOOMSAYER_POOL;
    voice = "AIDoomsayer";
  }

  const text = pool[Math.floor(Math.random() * pool.length)];

  return {
    content: text,
    authorType: "Archetype",
    voice: voice,
    likes: Math.floor(Math.random() * 5000),
    retweets: Math.floor(Math.random() * 500)
  };
};