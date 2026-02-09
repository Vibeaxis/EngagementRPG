
import React, { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Zap, TrendingUp, DollarSign, Flame, Clock, Sparkles, Bot, ShieldBan, Megaphone } from 'lucide-react';

function ReplyModal({ tweet, isOpen, onClose }) {
  const { 
    verificationBattery, 
    addImpressions, 
    addAdRevenue, 
    drainBattery,
    addPenalty,
    addCommunityNote,
    updateFollowers,
    activeTrend,
    triggerShadowban,
    getCashMultiplier,
    getImpressionMultiplier,
    applyGrobBuff,
    deductAdRev,
    triggerSidebarFlicker,
    blockTweet,
    trackAdEngagement,
    playSound // Use playSound from context now
  } = useGame();
  
  const { toast } = useToast();

  const [speedBonus, setSpeedBonus] = useState(null);

  useEffect(() => {
    if (isOpen && tweet && tweet.authorType !== 'Grob' && tweet.authorType !== 'Ad') {
      const tweetAge = Date.now() - tweet.timestamp;
      let bonus = { text: "Mid.", value: 0, color: "text-gray-400" };
      
      if (tweetAge < 1500) {
        bonus = { text: "FIRST! +5 Followers", value: 5, color: "text-green-500 font-bold" };
      } else if (tweetAge > 3500) {
        bonus = { text: "LATE... -3 Followers", value: -3, color: "text-red-500 font-bold" };
      }
      
      setSpeedBonus(bonus);
    } else {
      setSpeedBonus(null);
    }
  }, [isOpen, tweet]);

  const handleReply = (strategy) => {
    // Ad Battery Logic handled below or if battery check fails
    if (verificationBattery === 0 && tweet.authorType !== "Grob") return;

    // --- AD LOGIC ---
    if (tweet.authorType === "Ad") {
      drainBattery(10); // Mental Fatigue
      addAdRevenue(0.10); // Pennies
      trackAdEngagement(0.10);
      
      toast({
        title: "Ad Engagement",
        description: "Revenue: +$0.10 | Mental Fatigue: -10% Battery",
        className: "bg-gray-800 text-white border border-gray-600"
      });
      onClose();
      return;
    }

    // --- GROB LOGIC ---
    if (tweet.authorType === "Grob") {
      const buff = applyGrobBuff();
      toast({
        title: "GROB BUFF ACTIVATED!",
        description: `${buff.label} - ${buff.description}`,
        className: "bg-[#00D9FF] text-black font-bold border-2 border-white"
      });
      onClose();
      return;
    }

    // --- TRAP TWEET CONSEQUENCES ---
    if (tweet.authorType === "Glowie") {
      triggerShadowban(10);
      drainBattery(10);
      toast({
        variant: "destructive",
        title: "⚠️ WATCHLISTED",
        description: "You replied to a Fed! 10s Shadowban activated (0.1x reach).",
      });
      onClose();
      return;
    }
    
    if (tweet.authorType === "PornBot") {
      updateFollowers(-20);
      drainBattery(strategy === 'rage' ? 10 : 6);
      toast({
        variant: "destructive",
        title: "🚫 SPAM TRAP",
        description: "Bot detected! Lost 20 followers and double battery.",
      });
      onClose();
      return;
    }

    if (tweet.authorType === "BrandAccount") {
      addImpressions(0);
      drainBattery(2);
      toast({
        title: "Silence, Brand",
        description: "Interacting with brands kills your reach. +0 Impressions.",
      });
      onClose();
      return;
    }
    
    // --- NORMAL REPLY LOGIC (Real Users) ---
    // Replaced inline Audio with playSound from context
    playSound('click');

    const isTrendMatch = tweet.topic === activeTrend;

    if (speedBonus && speedBonus.value !== 0) {
      updateFollowers(speedBonus.value, isTrendMatch);
    }

    const impMult = getImpressionMultiplier();
    
    // Check for Prime Bonus
    const bonusImpressions = tweet.bonusImpressions || 0;
    if (bonusImpressions > 0) {
      toast({
        title: "PRIME BONUS!",
        description: `+${bonusImpressions} Bonus Impressions added!`,
        className: "bg-yellow-500 text-black font-bold"
      });
    }

    switch (strategy) {
      case 'based':
        addImpressions((50 * impMult) + bonusImpressions);
        drainBattery(2);
        break;
      case 'rage':
        addImpressions((150 * impMult) + bonusImpressions);
        addAdRevenue(5); 
        drainBattery(5);
        
        if (Math.random() < 0.2) {
          setTimeout(() => {
            addCommunityNote(tweet.id);
            addPenalty(150 * 2, tweet.id);
            // Replaced inline penalty Audio
            playSound('buzzer');
          }, 3000);
        }
        break;
      case 'promo':
        addImpressions(100 + bonusImpressions);
        addAdRevenue(5);
        drainBattery(3);
        break;
      default:
        break;
    }

    onClose();
  };

  const handleBlockGrob = () => {
    if (deductAdRev(1.00)) {
      triggerSidebarFlicker();
      blockTweet(tweet.id);
      toast({
        title: "GROB HACKED YOUR SIDEBAR",
        description: "Grob has been blocked... for now. Sidebar destabilized.",
        className: "bg-red-900 border-red-500 text-white font-mono"
      });
      onClose();
    } else {
      toast({
        variant: "destructive",
        title: "Insufficient Funds",
        description: "You need $1.00 to block Grob's signal."
      });
    }
  };

  const strategies = [
    {
      id: 'based',
      name: 'Based Nod',
      icon: TrendingUp,
      description: 'Agree with the take',
      baseImpressions: 50,
      battery: '-2%',
      revenue: null,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'rage',
      name: 'Rage Bait',
      icon: Flame,
      description: 'Controversial response',
      baseImpressions: 150,
      battery: '-5%',
      baseRevenue: 5,
      color: 'from-red-500 to-orange-600',
      warning: '20% Community Note risk'
    },
    {
      id: 'promo',
      name: 'Promo',
      icon: DollarSign,
      description: 'Plug your content',
      baseImpressions: 100,
      battery: '-3%',
      baseRevenue: 5,
      color: 'from-blue-500 to-cyan-600'
    }
  ];

  const hasBonus = tweet?.bonusImpressions > 0;
  const isGrob = tweet?.authorType === "Grob";
  const isAd = tweet?.authorType === "Ad";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`border-gray-800 text-white max-w-lg ${isGrob ? 'bg-slate-950 border-[#00D9FF] grob-grid' : 'bg-[#16181c]'}`}>
        <DialogHeader>
          <DialogTitle className={`text-2xl font-bold flex items-center justify-between ${isGrob ? 'text-[#00D9FF] font-mono' : isAd ? 'text-gray-400' : 'text-[#1d9bf0]'}`}>
            <span>
              {isGrob ? "GROB_INTERACTION_PROTOCOL" : isAd ? "Promoted Interaction" : "Choose Your Reply Strategy"}
            </span>
            {speedBonus && (
              <span className={`text-sm flex items-center gap-1 ${speedBonus.color}`}>
                <Clock size={14} /> {speedBonus.text}
              </span>
            )}
          </DialogTitle>
          <div className="flex flex-col mt-2 gap-1">
             {tweet?.topic === activeTrend && activeTrend && !isGrob && !isAd && (
                <div className="text-sm text-[#1d9bf0] font-semibold">
                  🔥 Trend Match! 2x Followers Bonus Active
                </div>
             )}
             {hasBonus && !isGrob && !isAd && (
                <div className="text-sm text-yellow-400 font-bold flex items-center gap-1">
                  <Sparkles size={14} /> Prime Target: +{tweet.bonusImpressions} Bonus Impressions
                </div>
             )}
          </div>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          {isAd ? (
            // Ad Specific UI
            <>
              <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg text-center mb-4">
                 <p className="text-gray-400 text-sm mb-2">Consume product?</p>
                 <div className="flex items-center justify-center gap-4 text-xs font-mono">
                    <span className="text-green-400">+$0.10 Revenue</span>
                    <span className="text-red-400">-10% Battery</span>
                 </div>
              </div>
              <Button
                onClick={() => handleReply('ad_engage')}
                className="w-full p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Megaphone size={16} />
                  <span>Mindlessly Engage</span>
                </div>
              </Button>
            </>
          ) : isGrob ? (
            // Grob Specific UI
            <>
              <Button
                onClick={() => handleReply('grob_accept')}
                className="w-full h-auto p-6 bg-[#00D9FF]/10 hover:bg-[#00D9FF]/20 border border-[#00D9FF] text-[#00D9FF] font-mono group transition-all"
              >
                <div className="flex items-center gap-4 w-full justify-center">
                   <Bot size={32} className="animate-pulse" />
                   <div className="text-left">
                     <div className="text-xl font-bold">ACCEPT GROB'S WISDOM</div>
                     <div className="text-sm opacity-80">Effect: Random Buff (0 Battery)</div>
                   </div>
                </div>
              </Button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-800"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Or</span>
                <div className="flex-grow border-t border-gray-800"></div>
              </div>

              <Button
                onClick={handleBlockGrob}
                variant="destructive"
                className="w-full bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50"
              >
                <ShieldBan size={16} className="mr-2" />
                BLOCK GROB SIGNAL ($1.00)
              </Button>
            </>
          ) : (
            // Normal Strategies
            strategies.map((strategy) => {
              const Icon = strategy.icon;
              const canAfford = verificationBattery >= parseInt(strategy.battery);
              
              const impMult = getImpressionMultiplier();
              const cashMult = getCashMultiplier();
              
              const displayImpressions = Math.floor((strategy.baseImpressions * impMult) + (tweet?.bonusImpressions || 0));
              const displayRevenue = strategy.baseRevenue ? (strategy.baseRevenue * cashMult).toFixed(2) : null;

              return (
                <Button
                  key={strategy.id}
                  onClick={() => handleReply(strategy.id)}
                  disabled={!canAfford}
                  className={`w-full h-auto p-4 bg-gradient-to-r ${strategy.color} hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all group`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <Icon size={24} className="flex-shrink-0 mt-1" />
                    <div className="flex-1 text-left">
                      <div className="font-bold text-lg mb-1">{strategy.name}</div>
                      <div className="text-sm opacity-90 mb-2">{strategy.description}</div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className={`bg-black/20 px-2 py-1 rounded ${hasBonus ? 'text-yellow-300 font-bold border border-yellow-500/50' : ''}`}>
                          +{displayImpressions} impressions
                          {impMult > 1 && !hasBonus && <span className="text-yellow-300 ml-1 font-bold">({impMult.toFixed(1)}x)</span>}
                        </span>
                        <span className="bg-black/20 px-2 py-1 rounded flex items-center gap-1">
                          <Zap size={12} /> {strategy.battery}
                        </span>
                        {displayRevenue && (
                          <span className="bg-black/20 px-2 py-1 rounded">
                            +${displayRevenue}
                            {cashMult > 1 && <span className="text-green-300 ml-1 font-bold">({cashMult.toFixed(1)}x)</span>}
                          </span>
                        )}
                      </div>
                      {strategy.warning && (
                        <div className="mt-2 text-xs text-yellow-300 font-semibold">
                          ⚠️ {strategy.warning}
                        </div>
                      )}
                    </div>
                  </div>
                </Button>
              );
            })
          )}
        </div>

        {verificationBattery === 0 && !isGrob && !isAd && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-center">
            <p className="text-red-300 font-bold">Battery depleted! Refill to continue.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ReplyModal;
