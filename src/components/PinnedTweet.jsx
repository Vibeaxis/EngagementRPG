
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap, Info, Timer } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useGrobTips } from '@/hooks/useGrobTips';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function PinnedTweet({ tweets }) {
  const { currentTip, rotateTip } = useGrobTips();
  const { 
    adRevenue, 
    deductAdRev, 
    activatePrimeTip, 
    primeTipActive, 
    primeTipTimeRemaining 
  } = useGame();
  const { toast } = useToast();

  const handleTip = () => {
    if (deductAdRev(5)) {
      rotateTip();
      
      // 10% Chance for Prime Tip
      if (Math.random() < 0.1) {
        // Find current real users to highlight
        const realUserTweets = tweets.filter(t => t.authorType === 'Real');
        const userIds = realUserTweets.map(t => t.id);
        
        activatePrimeTip(userIds);
        
        toast({
          title: "PRIME TIP ACTIVATED! 🚀",
          description: "Grob is hallucinating! Real users are highlighted for 60s. +50 Bonus Impressions on replies!",
          className: "bg-yellow-500 border-yellow-600 text-black font-bold",
          duration: 5000
        });
      } else {
        toast({
          title: "Tip Refreshed",
          description: "You paid $5 to hear more of Grob's wisdom.",
        });
      }
    }
  };

  const canAfford = adRevenue >= 5;

  return (
    <div className="mb-4 relative group z-20">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-[#1d9bf0] rounded-xl opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
      <div className="relative bg-black rounded-xl p-4 border-2 border-[#1d9bf0]/50 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[#1d9bf0] font-mono text-xs uppercase tracking-widest">
            <Terminal size={14} />
            <span>Pinned by Grob</span>
          </div>
          {primeTipActive ? (
            <span className="text-xs bg-yellow-500 text-black font-black px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
              <Timer size={12} /> PRIME: {primeTipTimeRemaining}s
            </span>
          ) : (
            <span className="text-[10px] bg-[#1d9bf0]/10 text-[#1d9bf0] px-2 py-0.5 rounded border border-[#1d9bf0]/30">
              {currentTip.category}
            </span>
          )}
        </div>

        {/* Content with Fade Animation */}
        <div className="min-h-[60px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTip.text}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.5 }}
              className="text-white font-mono text-sm md:text-base leading-snug"
            >
              <span className="text-green-400 mr-2">root@grob:~$</span>
              {currentTip.text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-3">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Info size={12} />
            <span>Tip refreshes automatically</span>
          </div>
          <Button 
            size="sm" 
            onClick={handleTip}
            disabled={!canAfford}
            className={`
              h-8 text-xs font-bold transition-all
              ${canAfford 
                ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
            `}
          >
            <Zap size={12} className="mr-1 fill-current" />
            Tip Grob ($5)
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PinnedTweet;
