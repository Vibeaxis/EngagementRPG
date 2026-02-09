
import React, { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { TrendingUp, Sparkles, Target, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

function LeftPanel() {
  const { difficultyLevel, tweetSpawnRate, activeTrend, setActiveTrend } = useGame();

  const trendingTopics = [
    { name: 'Movies', posts: '127K', trending: true, topic: 'Drama' },
    { name: 'Celebrities', posts: '89K', trending: true, topic: 'Celebrity' },
    { name: 'Tech Takes', posts: '234K', trending: true, topic: 'Tech' },
    { name: 'Politics', posts: '456K', trending: false, topic: 'Politics' },
    { name: 'Gaming', posts: '178K', trending: false, topic: 'Meme' }
  ];

  const activeMultipliers = [
    { name: '2x Impressions', duration: '30s', active: difficultyLevel >= 2 },
    { name: '1.5x Ad Revenue', duration: '45s', active: difficultyLevel >= 3 }
  ];

  const maxSpawnRate = 4000;
  const minSpawnRate = 800;
  const progressPercentage = ((maxSpawnRate - tweetSpawnRate) / (maxSpawnRate - minSpawnRate)) * 100;

  useEffect(() => {
    // Randomly change active trend periodically if not set or for simulation
    // In a real app this might be driven by the game loop, but for now we'll pick one at random initially
    if (!activeTrend) {
      const randomTopic = trendingTopics[Math.floor(Math.random() * trendingTopics.length)].topic;
      setActiveTrend(randomTopic);
    }
  }, [activeTrend, setActiveTrend]);

  return (
    <div className="w-80 h-screen sticky top-0 bg-gradient-to-br from-[#16181c] to-[#0a0a0a] border-r border-gray-800 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1d9bf0] mb-2">Trending</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#1d9bf0] to-cyan-400 mx-auto rounded-full" />
        </div>

        {/* Active Trend Display - New for Task 4 */}
        <div className="bg-[#1d9bf0] rounded-xl p-4 text-center shadow-[0_0_15px_rgba(29,155,240,0.3)]">
           <div className="flex items-center justify-center gap-2 mb-1">
             <Hash className="text-white" size={20} />
             <span className="text-white font-bold text-lg">ACTIVE TREND</span>
           </div>
           <div className="text-2xl font-black text-white tracking-wider">
             #{activeTrend || 'None'}
           </div>
           <div className="text-white/80 text-xs mt-1 font-semibold">
             Reply to matching tweets for 2x Followers!
           </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-gradient-to-br from-[#1a1d24] to-[#16181c] backdrop-blur-sm border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-[#1d9bf0]" size={20} />
            <span className="text-gray-400 text-sm font-medium">TOP TOPICS</span>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={topic.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTrend(topic.topic)} // Allow manual setting for testing/gameplay
                className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer group ${
                  activeTrend === topic.topic ? 'bg-[#1d9bf0]/20 border border-[#1d9bf0]' : 'bg-[#16181c] hover:bg-[#1a1d24]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {topic.trending && (
                    <div className="w-2 h-2 bg-[#1d9bf0] rounded-full animate-pulse" />
                  )}
                  <div>
                    <div className={`font-bold transition-colors ${
                      activeTrend === topic.topic ? 'text-[#1d9bf0]' : 'text-white group-hover:text-[#1d9bf0]'
                    }`}>
                      #{topic.name}
                    </div>
                    <div className="text-xs text-gray-500">{topic.posts} posts</div>
                  </div>
                </div>
                {topic.trending && (
                  <TrendingUp size={16} className="text-[#1d9bf0]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Multipliers */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-sm border border-purple-500/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-purple-400" size={20} />
            <span className="text-gray-400 text-sm font-medium">MULTIPLIERS</span>
          </div>
          <div className="space-y-2">
            {activeMultipliers.map((multiplier) => (
              <div
                key={multiplier.name}
                className={`p-3 rounded-lg border ${
                  multiplier.active
                    ? 'bg-purple-500/20 border-purple-500/50'
                    : 'bg-gray-800/50 border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold text-sm ${
                    multiplier.active ? 'text-purple-300' : 'text-gray-500'
                  }`}>
                    {multiplier.name}
                  </span>
                  {multiplier.active && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                    />
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {multiplier.active ? `Active for ${multiplier.duration}` : 'Locked'}
                </div>
              </div>
            ))}
            {activeMultipliers.every(m => !m.active) && (
              <div className="text-center text-gray-500 text-sm py-2">
                Reach higher difficulty to unlock
              </div>
            )}
          </div>
        </div>

        {/* Difficulty Progression */}
        <div className="bg-gradient-to-br from-[#1a1d24] to-[#16181c] backdrop-blur-sm border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-[#1d9bf0]" size={20} />
            <span className="text-gray-400 text-sm font-medium">PROGRESSION</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Current Rate:</span>
              <span className="text-white font-bold">{(tweetSpawnRate / 1000).toFixed(1)}s</span>
            </div>
            
            <div className="relative">
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#1d9bf0] to-cyan-400"
                  style={{ width: `${progressPercentage}%` }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Slow (4.0s)</span>
                <span>Fast (0.8s)</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`p-2 rounded-lg text-center border ${
                    difficultyLevel >= level
                      ? 'bg-[#1d9bf0]/20 border-[#1d9bf0]'
                      : 'bg-gray-800/50 border-gray-700'
                  }`}
                >
                  <div className={`text-xs font-bold ${
                    difficultyLevel >= level ? 'text-[#1d9bf0]' : 'text-gray-500'
                  }`}>
                    LVL {level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-[#16181c] border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-400 space-y-2">
            <div className="font-bold text-[#1d9bf0] mb-2">💡 Pro Tips</div>
            <p>• Fast replies = +Followers</p>
            <p>• Match active trends for 2x bonus</p>
            <p>• Avoid shadowbans (0 followers)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
