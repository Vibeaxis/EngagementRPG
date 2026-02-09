// src/utils/ModularFactory.js

const HOOKS = [
  "Thread:", "POV:", "Unpopular opinion:", "Life hack:", "Breaking:", 
  "Reminder:", "Fact Check:", "I was today years old when I realized",
  "Stop what you're doing.", "Just sat down with a billionaire and",
  "The algorithm is suppressing this, but", "We need to talk about why"
];

const MIDDLES = [
  "buying the dip is actually a spiritual experience",
  "your 9-5 is basically a voluntary prison sentence",
  "AI is actually just 40,000 interns in a trench coat",
  "manifesting your destiny requires at least 4 monitors",
  "the vibes in the simulation are strictly rancid today",
  "crypto is just astrology for people who like spreadsheets",
  "touching grass is a psyop designed to lower your productivity",
  "every notification is a tiny hit of dopamine heroin",
  "your personality is just a collection of curated reaction memes",
  "the 'Chief Visionary' is actually a genius in disguise"
];

const KICKERS = [
  "Wagmi.", "Concerning.", "Big if true.", "Discuss.", "I'm not joking.",
  "Let that sink in.", "Level up or stay mediocre.", "NGMI.", "!!",
  "Looking into this.", "Nature is healing.", "The West has fallen.",
  "Stay focused.", "Follow for more alpha."
];

export const generateModularTweet = () => {
  const h = HOOKS[Math.floor(Math.random() * HOOKS.length)];
  const m = MIDDLES[Math.floor(Math.random() * MIDDLES.length)];
  const k = KICKERS[Math.floor(Math.random() * KICKERS.length)];

  // Math: 12 Hooks * 10 Middles * 14 Kickers = 1,680 unique tweets
  // All from just 36 lines of writing.
  return {
    content: `${h} ${m}. ${k}`,
    authorType: "Modular",
    likes: Math.floor(Math.random() * 8000),
    retweets: Math.floor(Math.random() * 900)
  };
};