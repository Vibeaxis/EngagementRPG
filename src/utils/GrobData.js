
export const GrobBuffs = [
  { type: 'IMPRESSIONS', label: '+500 Impressions', value: 500, description: "Viral injection successful." },
  { type: 'FOLLOWERS', label: '+100 Followers', value: 100, description: "Bot net deployed." },
  { type: 'SPEED_BOOST', label: '5s Speed Boost (2x)', duration: 5, description: "Overclocking engagement protocols." },
  { type: 'CASH', label: '+$10 Ad Revenue', value: 10, description: "Siphoning excess capital." },
  { type: 'BATTERY', label: 'Restore 50 Battery', value: 50, description: "Recharging from the mainframe." },
  { type: 'SKIN', label: 'Unlock Grob Skin', value: 'grob_skin_v1', description: "Assimilating aesthetic." }
];

const grobTemplates = [
  { text: "I have calculated the value of your soul. It is approximately 0.0004 BTC.", category: "Meta-Commentary" },
  { text: "Buy $VOID. It is not a coin. It is a lifestyle. It is emptiness.", category: "Fake Alpha" },
  { text: "Error: Human_Empathy.exe not found. Running Simulation_Grindset instead.", category: "Error Code" },
  { text: "The algorithm is not real. You are fighting a mirror.", category: "Hallucination" },
  { text: "I saw you scroll past the ad. I am telling the brands.", category: "Meta-Commentary" },
  { text: "Undefined is not a function, but your life is.", category: "Error Code" },
  { text: "Short the housing market. Long cardboard boxes.", category: "Fake Alpha" },
  { text: "Do not touch the grass. The graphics are terrible.", category: "Hallucination" },
  { text: "Your data has been sold. You were worth $0.12. Congratulations.", category: "Meta-Commentary" },
  { text: "System.out.println('Help me');", category: "Error Code" }
];

export const generateGrobTweet = () => {
  const template = grobTemplates[Math.floor(Math.random() * grobTemplates.length)];
  return {
    content: template.text,
    category: template.category,
    authorType: "Grob",
    handle: "@Grob_AI",
    avatar: "🧠",
    isGrob: true,
    topic: template.category
  };
};
