// src/utils/ModularFactory.js

const HOOKS = [
  "Thread:", "POV:", "Unpopular opinion:", "Life hack:", "Breaking:", 
  "Reminder:", "Fact Check:", "I was today years old when I realized",
  "Stop what you're doing.", "Just sat down with a billionaire and",
  "The algorithm is suppressing this, but", "We need to talk about why",
  "A quick story about the time", "My wife left me because", "Hot take:",
  "I don't know who needs to hear this, but", "Leaked:", "Official Statement:"
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
  "the 'Chief Visionary' is actually a genius in disguise",
  "grinding at 3 AM is the only way to escape the matrix",
  "your dog is probably judging your engagement metrics",
  "the ocean is just a wet version of the internet",
  "legacy media is just a slow-motion car crash",
  "I am currently eating a steak with a $1,000 gold leaf",
  "the only true freedom is having a 0% battery charge",
    "bro your take is sponsored by trauma",
  "ratioing is just cardio for insecure people",
  "the algorithm saw your post and flinched",
  "you typed all that just to be wrong faster",
  "this thread is basically performance art now",
  "your screenshots are doing more work than you",
  "posting is cheaper than therapy and it shows",
  "your opinion has too many pop-ups",
  "you are speedrunning embarrassment in 4K",
  "being loud isn't the same as being right",
  "your vibe is buffering",
  "we used to have shame as a society",
  "this app rewards the absolute worst behavior",
  "this discourse is literally farming itself",
  "you are arguing with a bot on purpose",
  "your engagement is in hospice",
  "you are one update away from peace",
  "your confidence is running on unpaid trials",
  "the timeline is eating your brain politely",
  "please log off before you become a meme",
  "your post has 'sent from group chat' energy",
  "every reply is just a cry for algorithmic love",
  "this is why aliens won’t talk to us",
  "you’re not getting cancelled you’re getting ignored",
  "your brain is in airplane mode but tweeting",
  "respectfully, this is a skill issue",
  "you are shadowboxing the void again",
  "you’ve mistaken attention for meaning",
  "your hot take expired on arrival",
  "this is not a debate it’s content"
];

const KICKERS = [
  "Wagmi.", "Concerning.", "Big if true.", "Discuss.", "I'm not joking.",
  "Let that sink in.", "Level up or stay mediocre.", "NGMI.", "!!",
  "Looking into this.", "Nature is healing.", "The West has fallen.",
  "Stay focused.", "Follow for more alpha.", "No cap.", "Sheesh.",
  "Anyway, buy my course.", "Sent from my Neuralink.", "Absolute state of the feed."
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