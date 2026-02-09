
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Hash, ShieldBan, Sparkles, Bot, Megaphone, Star, Check } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function Tweet({ tweet, onReply, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(tweet.expiresAt - Date.now());
  const totalTime = 5000;
  const { blockTweet, highlightedRealUsers, startDuel } = useGame();
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = tweet.expiresAt - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        onExpire(tweet.id);
      } else {
        setTimeLeft(remaining);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [tweet.expiresAt, tweet.id, onExpire]);

  const progress = (timeLeft / (tweet.authorType === 'Celebrity' ? 15000 : 5000)) * 100;

  const handleBlock = (e) => {
    e.stopPropagation();
    blockTweet(tweet.id);
    toast({
      title: "User Blocked",
      description: `Blocked ${tweet.handle} and removed tweet from feed.`,
      duration: 2000,
    });
  };

  const isHighlighted = highlightedRealUsers.includes(tweet.id);
  const isGrob = tweet.authorType === "Grob";
  const isAd = tweet.authorType === "Ad";
  const isCelebrity = tweet.authorType === "Celebrity";

  // Styles
  let borderColor = "border-gray-800";
  let bgColor = "bg-[#16181c]";
  let textColor = "text-white";
  let hoverBorder = "hover:border-[#1d9bf0]";
  let containerClasses = "";
  
  if (isGrob) {
    borderColor = "border-[#00D9FF] shadow-[0_0_10px_rgba(0,217,255,0.2)]";
    bgColor = "bg-slate-950 grob-grid"; 
    textColor = "text-[#00D9FF] font-mono";
  } else if (isAd) {
    borderColor = "border-gray-700/50";
    bgColor = "bg-[#111214]"; 
    hoverBorder = "hover:border-gray-500";
  } else if (isCelebrity) {
    borderColor = "border-[#FFD700] border-4";
    bgColor = "bg-[#1a1a1a]";
    hoverBorder = "hover:border-yellow-300";
    containerClasses = "celebrity-pulse";
  } else if (isHighlighted) {
    borderColor = "border-yellow-400"; 
  } else if (tweet.authorType === "Glowie") {
    borderColor = "border-red-500";
  } else if (tweet.authorType === "PornBot") {
    borderColor = "border-yellow-500";
  } else if (tweet.authorType === "BrandAccount") {
    borderColor = "border-gray-500";
  }

  const handleReplyClick = () => {
    if (isCelebrity) {
      startDuel(tweet);
    } else {
      onReply({
        ...tweet,
        bonusImpressions: isHighlighted ? 50 : 0
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`relative rounded-lg p-4 border ${borderColor} ${bgColor} ${hoverBorder} transition-all cursor-pointer group ${isHighlighted ? 'glow-aura' : ''} ${isGrob ? 'animate-glitch' : ''} ${containerClasses}`}
      onClick={handleReplyClick}
    >
      {/* Promoted Tag for Ads */}
      {isAd && (
        <div className="absolute -top-2.5 left-4 z-20 bg-gray-800 border border-gray-600 px-2 py-0.5 rounded text-[10px] text-gray-300 font-bold flex items-center gap-1">
          <Megaphone size={10} /> Promoted
        </div>
      )}

      {isHighlighted && (
        <div className="absolute -top-3 -right-3 z-20">
          <div className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
            <Sparkles size={10} /> +50 BONUS
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden text-2xl border ${isCelebrity ? 'border-[#FFD700] border-2 bg-black' : isHighlighted ? 'border-yellow-400 border-2' : isGrob ? 'border-[#00D9FF] bg-black' : isAd ? 'border-gray-700 bg-gray-900' : 'bg-gray-800 border-gray-700'}`}>
          {tweet.avatar.startsWith('http') ? (
            <img src={tweet.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className={isGrob ? 'animate-pulse' : ''}>{tweet.avatar}</span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
             <div className="flex flex-col">
               <div className="flex items-center gap-1">
                 <span className={`font-bold truncate ${isCelebrity ? 'text-[#FFD700] text-lg' : isGrob ? 'text-[#00D9FF] font-mono' : isHighlighted ? 'text-yellow-400' : 'text-white'}`}>{tweet.handle}</span>
                 {tweet.authorType === "Real" && (
                   <div className="w-4 h-4 rounded-full bg-[#1d9bf0] flex items-center justify-center">
                     <span className="text-white text-[10px] font-bold">✓</span>
                   </div>
                 )}
                 {isCelebrity && (
                   <div className="flex items-center gap-1 bg-[#FFD700]/20 border border-[#FFD700] px-1.5 py-0.5 rounded-full text-[10px] text-[#FFD700] font-bold uppercase tracking-wider">
                     <Star size={8} fill="currentColor" /> {tweet.badge || "LEGEND"} <Check size={8} strokeWidth={4} />
                   </div>
                 )}
                 {isGrob && (
                   <div className="flex items-center gap-1 bg-[#00D9FF]/10 border border-[#00D9FF]/50 px-1.5 py-0.5 rounded text-[10px] text-[#00D9FF] font-mono">
                     <Bot size={10} /> AI Verified
                   </div>
                 )}
               </div>
               <span className="text-gray-500 text-xs">· now</span>
             </div>
             
             {/* Block Button */}
             <Button
               variant="ghost"
               size="sm"
               className="h-6 px-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 z-10"
               onClick={handleBlock}
               title="Block User"
             >
               <ShieldBan size={14} />
             </Button>
          </div>
          
          <p className={`${isCelebrity ? 'text-white text-lg font-medium drop-shadow-sm' : isGrob ? 'text-[#00D9FF]/90 font-mono tracking-wide' : isAd ? 'text-gray-300' : 'text-white'} text-base mb-3 leading-snug break-words`}>
            {tweet.content}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <MessageCircle size={16} className={`${isCelebrity ? 'text-[#FFD700]' : isGrob ? 'text-[#00D9FF]' : isHighlighted ? 'text-yellow-400' : 'group-hover:text-[#1d9bf0]'} transition-colors`} />
              <span className={`text-sm ${isCelebrity ? 'text-[#FFD700] font-bold uppercase' : isGrob ? 'text-[#00D9FF]' : isHighlighted ? 'text-yellow-400 font-bold' : 'group-hover:text-[#1d9bf0]'} transition-colors`}>
                {isCelebrity ? "[ATTEMPT RATIO]" : "Reply"}
              </span>
            </div>
            {tweet.topic && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${isCelebrity ? 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/50' : isGrob ? 'bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30' : 'bg-gray-800 text-gray-400'}`}>
                <Hash size={10} /> {tweet.topic}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Timer bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 rounded-b-lg overflow-hidden">
        <motion.div
          className={`h-full ${isCelebrity ? 'bg-[#FFD700] shadow-[0_0_10px_#FFD700]' : isGrob ? 'bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]' : isHighlighted ? 'bg-yellow-400' : isAd ? 'bg-gray-500' : 'bg-[#1d9bf0]'}`}
          style={{ width: `${progress}%` }}
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}

export default Tweet;
