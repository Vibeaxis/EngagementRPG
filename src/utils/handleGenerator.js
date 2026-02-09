// 1. GLOWIES (The "Patriot" Traps)
export const generateGlowieHandle = () => {
  const keywords = ["Based", "Liberty", "Patriot", "Constitution", "Freedom", "Eagle", "Militia", "Resistance", "Truth", "American", "Real", "Justice", "Alpha", "MAGA", "Traditional"];
  const nouns = ["Eagle", "Dad", "Fighter", "Mike", "John", "Steve", "Guy", "Man", "Enjoyer", "Patriot", "Trucker", "Vet", "Coach", "Farmer"];
  const years = ["1776", "1984", "2024", "2025", "2026", "88", "45"];
  
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const year = years[Math.floor(Math.random() * years.length)];
  
  const formats = [
    `@${keyword}${noun}${year}`,
    `@${keyword}${year}`,
    `@${noun}${keyword}${year}`,
    `@${keyword}_${noun}_${year}`,
    `@${noun}${year}_${keyword}`,
    `@Real${keyword}${noun}`
  ];
  
  return formats[Math.floor(Math.random() * formats.length)];
};

// 2. PORNBOTS (The "Spam" Traps)
export const generatePornBotHandle = () => {
  const isVip = Math.random() > 0.4; // Slightly more VIPs for that "Premium" feel
  const names = ["Alice", "Sarah", "Jessica", "Emma", "Nicole", "Sophia", "Ava", "Isabella", "Mia", "Chloe", "Madison", "Krystal", "Tiffany", "Bambi", "Lexi"];
  
  if (isVip) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let keysmash = "";
    for(let i=0; i<4; i++) keysmash += chars.charAt(Math.floor(Math.random() * chars.length));
    const name = names[Math.floor(Math.random() * names.length)];
    
    const vipFormats = [
      `@${keysmash}_vip`,
      `@${name}_exclusive`,
      `@${name}_links`,
      `@${keysmash}_official_co`
    ];
    return vipFormats[Math.floor(Math.random() * vipFormats.length)];
  } else {
    const name = names[Math.floor(Math.random() * names.length)];
    // That classic 8-digit string that screams "I was generated in a server farm"
    const digits = Math.floor(10000000 + Math.random() * 90000000);
    return `@${name}${digits}`;
  }
};

// 3. BRANDS (The "Corporate Cringe")
export const generateBrandHandle = () => {
  const brands = ["Wendys", "OperaGX", "Duolingo", "TacoBell", "Doritos", "MountainDew", "KFC", "Xbox", "Discord", "SlimJim", "Netflix", "DisneyPlus", "Arbys", "Ryanair", "Gfuel"];
  const suffixes = ["Gaming", "Esports", "Stans", "Vibes", "Energy", "Moment", "Official", "US", "Feeds", "Cares", "News", "Global", "Direct"];
  
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  const brandFormats = [
    `@${brand}${suffix}`,
    `@${brand}_${suffix}`,
    `@${brand}Official`,
    `@Real${brand}`
  ];
  
  return brandFormats[Math.floor(Math.random() * brandFormats.length)];
};

// 4. REAL USERS (The "Engagement" Engine)
export const generateRealUserHandle = () => {
  const prefixes = ["0x", "Tech", "AI", "e_acc", "Prompt", "Solana", "Web3", "Degen", "Code", "Design", "Cyber", "Base", "Fiat", "Crypto", "Liquid", "Ghost", "Alpha"];
  const suffixes = ["Optimist", "Guru", "Whale", "Dev", "Maxi", "Bro", "Pilled", "Ninja", "Enjoyer", "Intern", "Founder", "Hustler", "Grifter", "King", "Oracle", "Slayer"];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  const realFormats = [
    `@${prefix}${suffix}`,
    `@${prefix}_${suffix}`,
    `@${suffix}${prefix}`,
    `@${prefix}Builds`,
    `@The${prefix}${suffix}`
  ];
  
  return realFormats[Math.floor(Math.random() * realFormats.length)];
};