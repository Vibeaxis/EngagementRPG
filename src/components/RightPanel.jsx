
import React, { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import VerificationBattery from './VerificationBattery';
import { TrendingUp, DollarSign, Zap, Target, Users, AlertOctagon, Rocket, Bot, Skull } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function RightPanel() {
  const { 
    impressions, 
    adRevenue, 
    difficultyLevel,
    tweetSpawnRate,
    addAdRevenue,
    followers,
    getMultiplier,
    isShadowbanned,
    deductAdRev,
    updateFollowers,
    shadowbanTimer,
    shadowbanActive,
    botPercentage
  } = useGame();

  // Ad revenue conversion (every 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const conversionRate = impressions * 0.001; // $0.001 per impression
      addAdRevenue(conversionRate);
    }, 10000);

    return () => clearInterval(interval);
  }, [impressions, addAdRevenue]);

  const isViralMode = tweetSpawnRate < 1000;
  const currentMultiplier = getMultiplier();
  const shadowbanned = isShadowbanned();

  const handleBuyBots = () => {
    if (deductAdRev(2.00)) {
      updateFollowers(50);
    }
  };

  const handleBoostPost = () => {
    if (deductAdRev(5.00)) {
      updateFollowers(10);
    }
  };

  return (
    <div className="w-80 h-screen sticky top-0 bg-gradient-to-br from-[#0a0a0a] to-[#16181c] border-l border-gray-800 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Analytics Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1d9bf0] mb-2">Analytics</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#1d9bf0] to-cyan-400 mx-auto rounded-full" />
        </div>

        {/* Shadowban Alert */}
        {shadowbanActive && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/40 border border-red-500 rounded-xl p-4 text-center animate-pulse"
          >
            <div className="flex items-center justify-center gap-2 text-red-400 font-black mb-1">
              <AlertOctagon size={24} />
              <span>SHADOWBAN ACTIVE</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {shadowbanTimer}s remaining
            </div>
            <div className="text-xs text-red-300">
              Reach reduced to 10%
            </div>
          </motion.div>
        )}

        {/* Impressions Score */}
        <motion.div 
          className="bg-gradient-to-br from-[#1d9bf0]/20 to-cyan-500/10 backdrop-blur-sm border border-[#1d9bf0]/50 rounded-xl p-6 text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="text-[#1d9bf0]" size={24} />
            <span className="text-gray-400 text-sm font-medium">IMPRESSIONS</span>
          </div>
          <div className="text-5xl font-black text-white mb-1">
            {impressions.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Total reach</div>
        </motion.div>

        {/* Multiplier & Followers */}
        <div className={`rounded-xl p-4 border ${shadowbanned ? 'bg-red-900/20 border-red-500/50' : 'bg-[#16181c] border-gray-800'}`}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Users size={16} className={shadowbanned ? 'text-red-500' : 'text-[#1d9bf0]'} />
              <span className="text-sm text-gray-400">FOLLOWERS</span>
            </div>
            <span className={`font-bold ${shadowbanned ? 'text-red-500' : 'text-white'}`}>{followers}</span>
          </div>
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-2">
               <Zap size={16} className="text-yellow-500" />
               <span className="text-sm text-gray-400">MULTIPLIER</span>
             </div>
             <span className="font-bold text-yellow-500">x{currentMultiplier.toFixed(2)}</span>
          </div>
          {followers === 0 && !shadowbanActive && (
            <div className="mt-2 text-center text-xs text-red-400 font-bold flex items-center justify-center gap-1">
              <AlertOctagon size={12} /> ZERO FOLLOWERS: Reach limited!
            </div>
          )}
        </div>

        {/* Dead Internet Stats */}
        <div className="bg-[#16181c] border border-gray-800 rounded-xl p-4">
           <div className="flex items-center gap-2 mb-2">
             <Skull size={16} className="text-gray-400" />
             <span className="text-sm font-bold text-gray-400">Dead Internet Theory</span>
           </div>
           <div className="flex justify-between items-center text-sm">
             <span className="text-gray-500">Bot Activity</span>
             <span className="text-white font-bold">{botPercentage}%</span>
           </div>
           <div className="w-full h-1 bg-gray-800 mt-2 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gray-600 transition-all duration-1000" 
               style={{ width: `${botPercentage}%` }} 
             />
           </div>
        </div>

        {/* Shop / Actions */}
        <div className="space-y-2">
           <Button 
             onClick={handleBuyBots} 
             disabled={adRevenue < 2.00}
             className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 flex justify-between items-center p-4 h-auto"
           >
             <div className="flex items-center gap-2">
               <Bot size={18} className="text-purple-400" />
               <div className="flex flex-col items-start">
                 <span className="font-bold text-sm">Buy Bots</span>
                 <span className="text-xs text-gray-400">+50 Followers</span>
               </div>
             </div>
             <span className="text-sm font-bold text-green-400">$2.00</span>
           </Button>

           {shadowbanned && (
             <Button 
               onClick={handleBoostPost} 
               disabled={adRevenue < 5.00}
               className="w-full bg-red-900/30 hover:bg-red-900/50 text-white border border-red-800 flex justify-between items-center p-4 h-auto"
             >
               <div className="flex items-center gap-2">
                 <Rocket size={18} className="text-red-400" />
                 <div className="flex flex-col items-start">
                   <span className="font-bold text-sm">Boost Post</span>
                   <span className="text-xs text-gray-400">Escape Shadowban (+10)</span>
                 </div>
               </div>
               <span className="text-sm font-bold text-green-400">$5.00</span>
             </Button>
           )}
        </div>

        {/* Ad Revenue */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm border border-green-500/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="text-green-400" size={20} />
              <span className="text-gray-400 text-sm font-medium">AD REVENUE</span>
            </div>
          </div>
          <div className="text-3xl font-black text-white mb-2">
            ${adRevenue.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">
            Conversion: ${(impressions * 0.001).toFixed(2)}/10s
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-sm border border-purple-500/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="text-purple-400" size={20} />
              <span className="text-gray-400 text-sm font-medium">DIFFICULTY</span>
            </div>
            <span className="text-2xl font-black text-white">
              {difficultyLevel}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Spawn Rate</span>
              <span>{(tweetSpawnRate / 1000).toFixed(1)}s</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${Math.max(20, 100 - (tweetSpawnRate / 40))}%` }}
                animate={{ width: `${Math.max(20, 100 - (tweetSpawnRate / 40))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Viral Mode Indicator */}
        {isViralMode && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-2xl font-black text-white mb-1"
            >
              🔥 VIRAL MODE 🔥
            </motion.div>
            <div className="text-sm text-white/90">Maximum engagement!</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default RightPanel;
