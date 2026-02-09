
export const AdContent = [
  // Weird Gadget
  { text: "Stop sleeping on a flat pillow. The CubePillow aligns your chakras while you sleep. $299.", category: "Weird Gadget" },
  { text: "This $500 toaster connects to WiFi and tweets when your bread is burnt. Disruption.", category: "Weird Gadget" },
  { text: "Wearable air conditioner for your ankles. Stay cool from the ground up.", category: "Weird Gadget" },
  { text: "Smart water bottle that screams when you are dehydrated. Hydrate or die.", category: "Weird Gadget" },
  { text: "Keyboard with only emojis. Communicate faster. 🚀🔥💯.", category: "Weird Gadget" },

  // Mobile Game
  { text: "I can't reach Pink Color! 99% fail this level. 😫🧠", category: "Mobile Game" },
  { text: "If you have 200 IQ you can solve this puzzle. Install now!", category: "Mobile Game" },
  { text: "Build your empire. Marry the dragon. Divorce the goblin. Play Free.", category: "Mobile Game" },
  { text: "Level 1 Crook vs Level 100 Mafia Boss. That's how mafia works.", category: "Mobile Game" },
  { text: "Don't let your wife see you playing this game! 🤫😈", category: "Mobile Game" },

  // Hustle Course
  { text: "I made $10k dropshipping air. Buy my PDF to learn how.", category: "Hustle Course" },
  { text: "POV: You didn't buy Bitcoin in 2010. Don't miss this new coin $SCAM.", category: "Hustle Course" },
  { text: "Escape the matrix. 3AM cold showers. Raw meat diet. Sign up.", category: "Hustle Course" },
  { text: "Passive income is dead. Active struggle is in. Join the War Room.", category: "Hustle Course" },
  { text: "You are poor because you sleep. Wake up. Buy my course.", category: "Hustle Course" },

  // Oddly Specific
  { text: "Do you own a 2004 Honda Civic and have back pain? You may be entitled to cash.", category: "Oddly Specific" },
  { text: "T-Shirt for guys named Dave who were born in July and love fishing. Limited Edition.", category: "Oddly Specific" },
  { text: "Thinking about divorce? Our lawyers are cheaper than your spouse.", category: "Oddly Specific" },
  { text: "Local milfs in your area are desperate for engagement.", category: "Oddly Specific" },
  { text: "Are you lonely? This AI girlfriend will ruin your life for only $9.99/mo.", category: "Oddly Specific" }
];

const adHandles = [
  "@CloudFix", "@BioOptimizer", "@SolanaApe77", "@HealthHack99", "@GameMaster2024", 
  "@DropShipKing", "@CryptoGuru_X", "@GadgetZone", "@LawyerUp_Now", "@SingleInYourArea"
];

const adAvatars = [
  "📈", "💊", "🦍", "🩺", "🎮", "📦", "🚀", "⌚", "⚖️", "💔"
];

export const generateAdTweet = () => {
  const ad = AdContent[Math.floor(Math.random() * AdContent.length)];
  const handleIndex = Math.floor(Math.random() * adHandles.length);
  
  return {
    content: ad.text,
    category: ad.category,
    authorType: "Ad",
    handle: adHandles[handleIndex],
    avatar: adAvatars[handleIndex], // Using emoji as placeholder for logos
    isAd: true,
    topic: "Promoted",
    label: "Promoted"
  };
};
