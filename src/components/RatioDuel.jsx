
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import useRatioDuel from '@/hooks/useRatioDuel';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const RatioDuel = () => {
  const { 
    isBoss, 
    currentCelebrity, 
    endDuel, 
    playSound, 
    playerHandle,
    posterLevel,
    triggerHaptic
  } = useGame();

  const [result, setResult] = useState(null);

  const handleDuelEnd = (res) => {
    setResult(res);
    if (res.won) playSound('cash'); // Victory sound placeholder
    else playSound('buzzer'); // Loss sound
    
    // Close after delay
    setTimeout(() => {
        endDuel(res);
    }, 2000);
  };

  const {
    barPosition,
    timeRemaining,
    handlePlayerClick,
    shakeIntensity
  } = useRatioDuel(isBoss, posterLevel || 1, handleDuelEnd);

  // Trigger Haptic from Hook logic
  useEffect(() => {
    if (shakeIntensity > 0) {
        // Map intensity to haptic type
        const type = shakeIntensity > 4 ? 'heavy' : 'light';
        triggerHaptic(type);
    }
  }, [shakeIntensity, triggerHaptic]);

  if (!isBoss || !currentCelebrity) return null;

  // Bar Color Logic
  const leftWidth = `${barPosition}%`;
  const rightWidth = `${100 - barPosition}%`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      {/* Background Shake Container */}
      <div 
        className="w-full max-w-2xl p-6 relative"
        style={{ 
            transform: `translate(${Math.random() * shakeIntensity - shakeIntensity/2}px, ${Math.random() * shakeIntensity - shakeIntensity/2}px)` 
        }}
      >
        <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white italic drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">RATIO DUEL</h1>
            <p className="text-[#1d9bf0] font-mono mt-2">10 seconds to ratio them into oblivion</p>
        </div>

        {/* Duel Area */}
        <div className="flex items-center justify-between mb-4 px-4">
            {/* Player */}
            <div className="flex flex-col items-center animate-bounce-avatar">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1d9bf0] to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-xl">
                    <User />
                </div>
                <div className="mt-2 bg-black/50 px-3 py-1 rounded-full border border-gray-600 text-white font-bold">
                    @{playerHandle}
                </div>
            </div>

            {/* Timer */}
            <div className="flex flex-col items-center">
                 <div className={`text-6xl font-black font-mono ${timeRemaining < 4 ? 'text-red-500 animate-pulse' : timeRemaining < 7 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {timeRemaining}
                 </div>
                 <div className="text-xs text-gray-500 uppercase tracking-widest">Seconds</div>
            </div>

            {/* Rival */}
            <div className="flex flex-col items-center animate-bounce-avatar" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 rounded-full bg-black border-4 border-[#FFD700] flex items-center justify-center text-3xl shadow-[0_0_20px_#FFD700]">
                    {currentCelebrity.avatar}
                </div>
                <div className="mt-2 bg-[#FFD700] text-black px-3 py-1 rounded-full font-bold border border-yellow-600">
                    Rival Reply Guy
                </div>
            </div>
        </div>

        {/* The Bar */}
        <div className="relative h-12 bg-gray-800 rounded-full overflow-hidden border-4 border-gray-700 shadow-inner mb-8">
            <div 
                className="absolute top-0 left-0 h-full bg-[#1d9bf0] transition-all duration-75 ease-linear flex items-center justify-end px-2"
                style={{ width: leftWidth }}
            >
                <span className="text-white/20 font-black text-xl select-none">YOU</span>
            </div>
            <div 
                className="absolute top-0 right-0 h-full bg-[#E74C3C] transition-all duration-75 ease-linear flex items-center justify-start px-2"
                style={{ width: rightWidth }}
            >
                <span className="text-white/20 font-black text-xl select-none">THEM</span>
            </div>
            
            {/* Center Marker */}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white z-10 transform -translate-x-1/2 opacity-50"></div>
            
            {/* Triangle Indicator */}
            <div 
                className="absolute top-[-5px] h-full w-4 z-20 transition-all duration-75 ease-linear transform -translate-x-1/2 flex flex-col justify-between py-1"
                style={{ left: leftWidth }}
            >
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
            </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
            <Button
                onClick={() => {
                    const shake = handlePlayerClick();
                    if(shake) triggerHaptic(shake);
                    // Floating text effect logic could go here
                }}
                disabled={!!result}
                className="h-24 w-full max-w-sm text-3xl font-black italic bg-[#1d9bf0] hover:bg-[#1a8cd8] border-b-8 border-[#0c7abf] active:border-b-0 active:translate-y-2 transition-all rounded-2xl shadow-[0_10px_30px_rgba(29,155,240,0.4)] animate-pulse-button"
            >
                RATIO HIM!
            </Button>
        </div>

        {/* Floating L + Ratio Text (Visual Only placeholder) */}
        {/* Ideally managed by a small internal state array mapped to absolute divs */}

      </div>

      {/* Result Overlays */}
      <AnimatePresence>
        {result && (
            <div className="absolute inset-0 flex items-center justify-center z-[60] bg-black/60">
                {result.won ? (
                    <motion.div 
                        initial={{ scale: 3, rotate: -15, opacity: 0 }}
                        animate={{ scale: 1, rotate: -15, opacity: 1 }}
                        className="p-8 border-8 border-green-500 text-green-500 font-black text-6xl uppercase tracking-tighter bg-black -rotate-12 shadow-[0_0_50px_rgba(34,197,94,0.5)]"
                    >
                        RATIO'D
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ scale: 3, rotate: 15, opacity: 0 }}
                        animate={{ scale: 1, rotate: 15, opacity: 1 }}
                        className="p-8 border-8 border-red-500 text-red-500 font-black text-5xl uppercase tracking-tighter bg-black rotate-12 shadow-[0_0_50px_rgba(239,68,68,0.5)] text-center"
                    >
                        COMMUNITY<br/>NOTED
                    </motion.div>
                )}
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RatioDuel;
