
export const generateGlowieHandle = () => {
  const keywords = ["Based", "Liberty", "Patriot", "Constitution", "Freedom", "Eagle", "Militia", "Resistance", "Truth", "American"];
  const nouns = ["Eagle", "Dad", "Fighter", "Mike", "John", "Steve", "Guy", "Man", "Enjoyer"];
  const years = ["1776", "1984", "2024", "2025"];
  
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const year = years[Math.floor(Math.random() * years.length)];
  
  // Mix formats for variety
  const formats = [
    `@${keyword}${noun}${year}`,
    `@${keyword}${year}`,
    `@${noun}${keyword}${year}`,
    `@${keyword}_${noun}_${year}`
  ];
  
  return formats[Math.floor(Math.random() * formats.length)];
};

export const generatePornBotHandle = () => {
  const isVip = Math.random() > 0.5;
  
  if (isVip) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let keysmash = "";
    for(let i=0; i<4; i++) keysmash += chars.charAt(Math.floor(Math.random() * chars.length));
    return `@${keysmash}_vip`;
  } else {
    const names = ["Alice", "Sarah", "Jessica", "Emma", "Nicole", "Sophia", "Ava", "Isabella", "Mia", "Chloe"];
    const name = names[Math.floor(Math.random() * names.length)];
    const digits = Math.floor(10000000 + Math.random() * 90000000);
    return `@${name}${digits}`;
  }
};

export const generateBrandHandle = () => {
  const brands = ["Wendys", "OperaGX", "Duolingo", "TacoBell", "Doritos", "MountainDew", "KFC", "Xbox", "Discord", "SlimJim"];
  const suffixes = ["Gaming", "Esports", "Stans", "Vibes", "Energy", "Moment", "Official", "US", "Feeds"];
  
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `@${brand}${suffix}`;
};

export const generateRealUserHandle = () => {
  const prefixes = ["0x", "Tech", "AI", "e_acc", "Prompt", "Solana", "Web3", "Degen", "Code", "Design"];
  const suffixes = ["Optimist", "Guru", "Whale", "Dev", "Maxi", "Bro", "Pilled", "Ninja", "Enjoyer", "Intern"];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `@${prefix}${suffix}`;
};
