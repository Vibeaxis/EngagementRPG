// src/utils/TweetFactory.js

const DOOMER_POOL = [
  "The planet is literally on fire and I'm here arguing about a subscription badge.",
  "The peak of human civilization was 2005. Everything else is DLC.",
  "We traded our privacy for ads about vitamins we don't need.",
  "Imagine thinking your vote matters more than the trending tab.",
  "I'm not pessimistic, I'm just paying attention.",
   "We're not living in history, we're living in a Terms of Service update.",
  "Every app is the same app now. Just different fonts and different lies.",
  "My feed knows my insecurities better than my therapist. Cool. Love that.",
  "The future is just pop-ups with better branding.",
  "We built a global nervous system and use it to argue about screenshots.",
  "Somewhere there's a dashboard KPI for my mental health. It's trending down."
];

const TECH_OPTIMIST_POOL = [
  "Web3 is dead. Long live Web4. It's decentralized but in my garage.",
  "If you aren't using AI to write your grocery list, you're a luddite.",
  "The future belongs to those who ship features on Christmas Eve.",
  "Hardware is hard. Software is harder. Being a visionary is effortless.",
  "I don't see problems, I see 'monetization opportunities'.",
    "We don't have bugs, we have 'surprise user journeys.'",
  "If your startup isn't pivoting weekly, is it even alive?",
  "Just add an agent layer. Boom. Solved. Ship it.",
  "I don't fear layoffs. I fear not being early to the next hype cycle.",
  "The solution is simple: more compute, less conscience.",
  "I replaced my personality with a roadmap and it scaled beautifully."
];

const CHRONIC_SCROLLER_POOL = [
  "I've been scrolling for 4 hours and I haven't seen a single original thought.",
  "Who are you people and why are you in my house (timeline)?",
  "Logging off for 5 minutes to stare at a wall. I'll be back.",
  "My thumb has developed a callus specifically for this app.",
  "Is it 2026 yet? I feel like I've been here for a decade.",
    "I opened the app to check one thing and now I'm in a seven-hour hostage situation.",
  "My screen time report just sent me a cease and desist.",
  "I scrolled so long the algorithm started recommending my own thoughts back to me.",
  "Every post is either bait, cope, or an ad wearing a trench coat.",
  "I muted 400 accounts and the timeline got louder somehow.",
  "If I see one more 'normalize' post I'm going to normalize throwing my phone away."
];

const BRAIN_ROT_POOL = [
  "Skibidi is the new Latin. Change my mind.",
  "I am currently speedrunning my own downfall. 100% glitchless.",
  "What if we all just stopped posting at the same time? (I'm still posting though).",
  "My brain is 90% static and 10% reaction memes.",
  "Error: Personality not found. Loading 'Controversial Take' instead.",
    "I have opinions I didn't earn and confidence I definitely didn't earn.",
  "My personality is just 'quote tweet + disbelief' at this point.",
  "I can't read a paragraph anymore but I can detect sarcasm in 0.2 seconds.",
  "The discourse is a microwave. Everyone's heated and nothing is cooked.",
  "I said 'bro' out loud and my phone vibrated. We're synced.",
  "New lore drop: I am the problem. Season finale soon."
];

// --- NEW ADDITIONS ---

const PUNDIT_POOL = [
  "Thread: Why this 14-second clip of a park bench proves the economy is collapsing. 1/45",
  "The mainstream media won't tell you about this, but I will for $8 a month.",
  "Big if true. Concerning. Looking into this.",
  "Does anyone else feel like the reality setting on the simulation got turned up to 11?",
  "I am once again asking you to ignore the facts and focus on my feelings.",
    "Thread: I studied the vibes and the vibes say we're doomed. 1/38",
  "This one out-of-context screenshot changes everything.",
  "You're not wrong, you're just uninformed by my extremely curated reality.",
  "I have sources (my timeline) and experts (my mutuals).",
  "I'm not saying it's a psyop, I'm saying it's extremely convenient.",
  "Reminder: If my prediction fails, it was still spiritually correct."
];

const HUSTLE_POOL = [
  "If you aren't waking up at 2 AM to stare at the sun, you're already behind.",
  "I replaced my blood with espresso and my dreams with spreadsheets. Level up.",
  "Your 9-5 is my 9-5... except mine is AM to AM. We are not the same.",
  "Don't go to college. Buy my course on how to sell courses about not going to college.",
  "Comfort is a slow death. Sleep on a bed of nails for maximum ROI.",
    "I don't take breaks. Breaks take me (weak mindset).",
  "I turned my trauma into a funnel and honestly? It's converting.",
  "Your friends are a liability unless they can optimize your mornings.",
  "Sleep is just debt with interest. Pay it later when you're rich (never).",
  "I measure happiness in quarterly performance. It's been a rough year.",
  "I don't 'relax'—I strategically underperform in silence."
];

const AI_DOOMSAYER_POOL = [
  "I just saw an LLM write a poem that made me cry. The end is near.",
  "If you can't tell the difference between a bot and your mom, does it even matter?",
  "The Turing test is obsolete. We need a 'Soul Test' for 2026.",
  "Currently teaching my toaster how to feel regret. Progress is slow.",
  "I, for one, welcome our new algorithmic overlords.",
   "The model said 'I understand you' and my fight-or-flight filed paperwork.",
  "We gave autocomplete a god complex and called it innovation.",
  "If the chatbot starts asking questions back, I'm moving to the woods.",
  "AGI isn't coming. It's already here and it's doing customer support.",
  "Alignment is just vibes-based security. You're all praying with spreadsheets.",
  "I watched an agent chain six tools together and felt my employment evaporate."
];
const REPLY_GUY_POOL = [
  "Respectfully, you’re wrong and I’m going to explain it in the worst possible tone.",
  "As a man who has never experienced consequences, here’s my take.",
  "Source: I made it up, but with confidence.",
  "Actually ☝️ this is more nuanced (it’s not).",
  "Not to be that guy, but I am literally that guy.",
  "You missed one key detail: me."
];

const BRAND_APOLOGIST_POOL = [
  "Unpopular opinion: the billion-dollar company is actually the victim here.",
  "They’re listening and learning (by raising prices).",
  "You can’t expect perfection from a company with infinite resources.",
  "Remember: real humans work there (and the CEO is a human yacht).",
  "It’s a free service (it costs your soul, but still).",
  "I, for one, welcome our new 'updated experience.'"
];

const CORPORATE_SOCIAL_POOL = [
  "We hear you. We’re taking this feedback seriously. (No further questions.)",
  "Drop a 💙 if you also love being monetized!",
  "Quick reminder: kindness is free (unlike premium).",
  "We’re excited to announce an announcement about our upcoming announcement.",
  "You asked, we listened, we pivoted into something worse.",
  "Happy Monday! Here’s a thread about resilience during layoffs."
];

const CRYPTO_PROPHET_POOL = [
  "If you don’t understand it, it’s because you’re early (and poor).",
  "The banks are scared (I am also scared, but spiritually).",
  "Just one more cycle, bro. One more cycle and I’m free.",
  "I lost everything, but the tech is solid.",
  "Decentralization is when my money disappears with no customer support.",
  "Paper hands are a mindset problem."
];

const VC_BRAIN_POOL = [
  "What if we Uber, but for emotional stability?",
  "This is a massive market opportunity (because humans are miserable).",
  "We’re pre-revenue, post-truth, and scaling feelings at 10x.",
  "Moat? Vibes. TAM? Everyone. Exit? Obviously.",
  "If it doesn’t 10x, why is it even real?",
  "Your startup isn’t failing—it’s discovering product-market humility."
];

const STARTUP_FOUNDER_POOL = [
  "Shipping is my love language. Sleep is my ex.",
  "We’re building the future (it’s a dashboard with gradients).",
  "I’m not ignoring you—I’m ‘heads down.’",
  "If you can’t handle me at my MVP you don’t deserve me at my Series B.",
  "Our culture is transparency (unless it’s bad news).",
  "Day 1: We’re changing the world. Day 30: We’re changing the pricing page."
];

const PRODUCTIVITY_MONK_POOL = [
  "If you don’t optimize your morning, you don’t deserve an afternoon.",
  "I schedule joy for 12 minutes on Thursdays.",
  "My calendar has more personality than I do.",
  "Reminder: rest is important (but I won’t be doing it).",
  "I automated my friendships into recurring check-ins.",
  "I’m not burnt out, I’m just running on a newer version of stress."
];

const WELLNESS_BIOHACKER_POOL = [
  "I fixed my anxiety by drinking something that tastes like battery acid.",
  "The secret to happiness is magnesium and ignoring your inbox forever.",
  "I don’t have emotions, I have inflammation.",
  "My sleep routine has 14 steps and none of them are sleep.",
  "If you’re not tracking your heartbeat, are you even alive?",
  "I went outside once. Horrible UX. Would not recommend."
];

const MINIMALIST_AESTHETIC_POOL = [
  "Deleted 900 apps. Now I just doomscroll on one beautiful app.",
  "My personality is off-white and negative space.",
  "I don’t chase clout. I curate silence.",
  "Simple living tip: remove everything except the thing ruining you.",
  "My setup is clean because my life is not.",
  "I’m in my ‘quiet era’ (posting this loudly)."
];

const NOSTALGIA_POSTER_POOL = [
  "Take me back to when the internet was ugly and everyone was normal-ish.",
  "Remember when an app did one thing and didn’t ask for your soul?",
  "2007 MySpace would’ve fixed this.",
  "The golden age of culture ended the day we got notifications.",
  "I miss when ‘viral’ was a medical problem.",
  "We used to log on for fun. Now it’s emotional labor."
];

const THREADLORD_POOL = [
  "Thread: 7 lessons I learned by being wrong in public. 1/19",
  "Stay with me—this gets worse (for you).",
  "Here’s the blueprint nobody asked for.",
  "Bookmark this. You won’t. But bookmark it.",
  "If you read this entire thread, you legally owe me respect.",
  "Final thought: I’m still thinking. More soon."
];

const HOT_TAKE_ARTIST_POOL = [
  "This will trigger people, but that’s the point.",
  "I said what I said (and I said it for engagement).",
  "If you disagree, you’re proving my point somehow.",
  "Your boos mean nothing; I’ve seen what you clap for.",
  "I’m not controversial, you’re just unprepared for my genius.",
  "Breaking: my opinion just changed for better reach."
];

const CONTEXT_POLICE_POOL = [
  "You’re missing context (I will not provide it).",
  "Actually, this is a quote from 2014, so your argument is invalid.",
  "Before we continue, define every word you used.",
  "I’m not defending them, I’m defending nuance (same thing).",
  "This discourse is exhausting (I started it).",
  "Can we please be accurate while we scream?"
];

const FACT_CHECK_GOBLIN_POOL = [
  "Not true. Here’s a link you won’t click.",
  "I regret to inform you that reality disagrees with your vibes.",
  "Citation needed (and no, your friend’s story doesn’t count).",
  "We can’t all live in the same timeline if you keep freelancing facts.",
  "This is misinformation, but it’s also embarrassing.",
  "I checked. It’s worse than you think."
];

const CONSPIRACY_UNCLE_POOL = [
  "Funny how this happens RIGHT after I posted my theory.",
  "Do your own research (on videos with 12 views).",
  "Connect the dots. No, not those dots. The other dots.",
  "They don’t want you to know this (because it’s nonsense).",
  "If you zoom in 800%, you can see the truth.",
  "Coincidence? Sure. And my algorithm loves me naturally."
];

const STAN_ACCOUNT_POOL = [
  "Actually, my fave is incapable of wrongdoing, thanks.",
  "Delete this before the fandom finds you.",
  "I’m shaking. Not from anger. From loyalty.",
  "You don’t understand their art (or me).",
  "This is disrespectful to their entire timeline.",
  "I will defend them with my last 2% battery."
];

const CANCEL_CYCLE_POOL = [
  "We need to talk about this (for exactly 24 hours).",
  "Accountability looks like me yelling into the void, apparently.",
  "The apology was giving ‘PR drafted in a panic.’",
  "I’m not mad, I’m just collecting screenshots.",
  "We’re learning and growing (by moving to the next target).",
  "This discourse is toxic (I am the toxin)."
];

const GAMER_ENERGY_POOL = [
  "Skill issue (society edition).",
  "Patch notes: reality got nerfed again.",
  "Stop balancing fun around whales. Oh wait—everything does that now.",
  "I don’t want realism, I want dopamine with a framerate.",
  "Ranked mode has ruined my personality.",
  "This community is cooked and I’m still queued."
];

const SPORTSBOOK_DEGEN_POOL = [
  "I’m not gambling, I’m stress-testing probability.",
  "One more parlay and I’m financially literate again.",
  "If it hits, I’m a genius. If it misses, it was rigged.",
  "My bankroll is a narrative device.",
  "I can’t stop now, the algorithm needs to see my grind.",
  "This app knows my weakness and sends push alerts about it."
];

const AI_PROMPT_GURU_POOL = [
  "You’re not bad at writing—you’re just under-prompted.",
  "Here’s my framework: ask nicely, then threaten it politely.",
  "If your prompt isn’t 400 lines, do you even care?",
  "My agent runs 12 tools because I’m allergic to effort.",
  "Pro tip: blame the model when your idea is mid.",
  "The real prompt was the friends we fine-tuned along the way."
];

const INFLUENCER_HUMBLEBRAG_POOL = [
  "Not to flex but… (flexes violently).",
  "I’m so grateful (for the attention specifically).",
  "Can’t believe this happened to me (it happened because I posted 14 times).",
  "I almost didn’t share this (I shared it immediately).",
  "Just a reminder: you can do it too (if you have my exact life).",
  "Small win today: existing loudly online."
];

const FINANCE_BRO_POOL = [
  "If you’re not investing, you’re basically choosing poverty.",
  "Compounding is magic. So is denial.",
  "I’m diversified: anxiety, caffeine, and one volatile stock.",
  "Risk management is for people who hate plot twists.",
  "I don’t chase money. I sprint at it, sweating.",
  "My portfolio is long-term (until tomorrow morning)."
];

const ACADEMIC_POSTER_POOL = [
  "As the literature suggests, you are all doing too much.",
  "I’m begging you to read a paper before forming a personality.",
  "This is not new. It’s just louder now.",
  "Methodology matters (unless it supports my point).",
  "Please stop using ‘evidence’ like it’s a seasoning.",
  "Peer review would end half of this app overnight."
];

const COMMENT_SECTION_PHILOSOPHER_POOL = [
  "We’re all just atoms screaming into a blue check.",
  "Sometimes the real algorithm is the sadness we made along the way.",
  "Every timeline is a mirror, and it hates us.",
  "The app is free because you are the product and also the consumer.",
  "I came here for memes and found existential dread.",
  "Anyway, like and subscribe to my despair."
];
// src/utils/TweetFactory.js

// tiny helpers
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const pickWeighted = (items) => {
  const total = items.reduce((sum, it) => sum + (it.weight ?? 1), 0);
  let r = Math.random() * total;
  for (const it of items) {
    r -= (it.weight ?? 1);
    if (r <= 0) return it;
  }
  return items[items.length - 1]; // fallback
};

// ---- CONFIG ----
// Keep your original 7 as “core” weights.
// Add new archetypes at lower weights so they show up but don’t drown the feed.
export const ARCHETYPES = [
  { voice: "Doomer",       pool: DOOMER_POOL,         weight: 15 },
  { voice: "Optimist",     pool: TECH_OPTIMIST_POOL,  weight: 15 },
  { voice: "Scroller",     pool: CHRONIC_SCROLLER_POOL, weight: 15 },
  { voice: "BrainRot",     pool: BRAIN_ROT_POOL,      weight: 15 },
  { voice: "Pundit",       pool: PUNDIT_POOL,         weight: 15 },
  { voice: "Hustle",       pool: HUSTLE_POOL,         weight: 15 },
  { voice: "AIDoomsayer",  pool: AI_DOOMSAYER_POOL,   weight: 10 },

  // --- extras (tune weights however you want) ---
  { voice: "ReplyGuy",     pool: REPLY_GUY_POOL,      weight: 6 },
  { voice: "BrandApologist", pool: BRAND_APOLOGIST_POOL, weight: 5 },
  { voice: "CorpSocial",   pool: CORPORATE_SOCIAL_POOL, weight: 4 },
  { voice: "CryptoProphet", pool: CRYPTO_PROPHET_POOL, weight: 5 },
  { voice: "VCBrain",      pool: VC_BRAIN_POOL,       weight: 4 },
  { voice: "Founder",      pool: STARTUP_FOUNDER_POOL, weight: 4 },
  { voice: "ProductivityMonk", pool: PRODUCTIVITY_MONK_POOL, weight: 4 },
  { voice: "Biohacker",    pool: WELLNESS_BIOHACKER_POOL, weight: 4 },
  { voice: "Minimalist",   pool: MINIMALIST_AESTHETIC_POOL, weight: 3 },
  { voice: "NostalgiaPoster", pool: NOSTALGIA_POSTER_POOL, weight: 4 },
  { voice: "Threadlord",   pool: THREADLORD_POOL,     weight: 4 },
  { voice: "HotTake",      pool: HOT_TAKE_ARTIST_POOL, weight: 5 },
  { voice: "ContextPolice", pool: CONTEXT_POLICE_POOL, weight: 3 },
  { voice: "FactCheckGoblin", pool: FACT_CHECK_GOBLIN_POOL, weight: 3 },
  { voice: "ConspiracyUncle", pool: CONSPIRACY_UNCLE_POOL, weight: 3 },
  { voice: "StanAccount",  pool: STAN_ACCOUNT_POOL,   weight: 3 },
  { voice: "CancelCycle",  pool: CANCEL_CYCLE_POOL,   weight: 3 },
  { voice: "GamerEnergy",  pool: GAMER_ENERGY_POOL,   weight: 4 },
  { voice: "SportsbookDegen", pool: SPORTSBOOK_DEGEN_POOL, weight: 3 },
  { voice: "PromptGuru",   pool: AI_PROMPT_GURU_POOL, weight: 4 },
  { voice: "Humblebrag",   pool: INFLUENCER_HUMBLEBRAG_POOL, weight: 3 },
  { voice: "FinanceBro",   pool: FINANCE_BRO_POOL,    weight: 4 },
  { voice: "AcademicPoster", pool: ACADEMIC_POSTER_POOL, weight: 2 },
  { voice: "CommentPhilosopher", pool: COMMENT_SECTION_PHILOSOPHER_POOL, weight: 3 },
];

// Optional: make metrics feel “on brand” per voice
const METRICS_BY_VOICE = {
  Doomer:      { likes: [200, 6500],  retweets: [20, 700] },
  Optimist:    { likes: [100, 9000],  retweets: [10, 900] },
  Scroller:    { likes: [50, 3500],   retweets: [5, 250] },
  BrainRot:    { likes: [500, 12000], retweets: [50, 1600] },
  Pundit:      { likes: [200, 8000],  retweets: [30, 1200] },
  Hustle:      { likes: [150, 7000],  retweets: [20, 900] },
  AIDoomsayer: { likes: [300, 10000], retweets: [40, 1400] },

  ReplyGuy:    { likes: [5, 900],     retweets: [1, 60] },
  BrandApologist: { likes: [20, 2000], retweets: [2, 180] },
  CorpSocial:  { likes: [30, 5000],   retweets: [5, 600] },
  CryptoProphet: { likes: [40, 6500], retweets: [10, 900] },
  VCBrain:     { likes: [20, 2500],   retweets: [3, 200] },
  Threadlord:  { likes: [80, 9000],   retweets: [20, 2000] },
  HotTake:     { likes: [200, 15000], retweets: [80, 2500] },
};

// 2. THE GENERATOR (Config-Driven)
export const generateArchetypeTweet = () => {
  const { voice, pool } = pickWeighted(ARCHETYPES);
  const text = pick(pool);

  const m = METRICS_BY_VOICE[voice] || { likes: [0, 5000], retweets: [0, 500] };

  return {
    content: text,
    authorType: "Archetype",
    voice,
    likes: randInt(m.likes[0], m.likes[1]),
    retweets: randInt(m.retweets[0], m.retweets[1]),
  };
};
