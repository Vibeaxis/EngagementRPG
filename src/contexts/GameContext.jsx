
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import useSettings from '@/hooks/useSettings';
import useAudio from '@/hooks/useAudio';
import useHapticFeedback from '@/hooks/useHapticFeedback';
import { GrobBuffs } from '@/utils/GrobData';
import { useToast } from '@/components/ui/use-toast';

const GameContext = createContext(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

const INITIAL_GAME_STATE = {
  impressions: 0,
  adRevenue: 0,
  followers: 10,
  grifterLevel: 0,
  posterLevel: 0,
  verifiedLevel: 0,
  totalNetWorth: 0,
  unlockedSkins: [],
  // Prime Tip Persistence
  primeTipActive: false,
  highlightedRealUsers: [],
  primeTipTimeRemaining: 0,
  // Ad Metrics
  adEngagementCount: 0,
  adRevenueEarned: 0,
  // Duel Stats
  duelStats: { duelsWon: 0, duelsLost: 0, totalRatios: 0 }
};

export function GameProvider({ children }) {
  const { storedValue, saveState, clearState } = useLocalStorage(INITIAL_GAME_STATE);
  const { toast } = useToast();

  // Settings Hooks
  const { settings, updateSetting } = useSettings();
  const { playSound } = useAudio(settings.volume);
  const { triggerHaptic } = useHapticFeedback(settings.hapticFeedback);

  // Hydrate state from localStorage
  const [impressions, setImpressions] = useState(storedValue.impressions);
  const [adRevenue, setAdRevenue] = useState(storedValue.adRevenue);
  const [followers, setFollowers] = useState(storedValue.followers);
  const [unlockedSkins, setUnlockedSkins] = useState(storedValue.unlockedSkins || []);
  
  // Upgrades
  const [grifterLevel, setGrifterLevel] = useState(storedValue.grifterLevel);
  const [posterLevel, setPosterLevel] = useState(storedValue.posterLevel);
  const [verifiedLevel, setVerifiedLevel] = useState(storedValue.verifiedLevel);

  // Prime Tip State
  const [primeTipActive, setPrimeTipActive] = useState(storedValue.primeTipActive);
  const [highlightedRealUsers, setHighlightedRealUsers] = useState(storedValue.highlightedRealUsers || []);
  const [primeTipTimeRemaining, setPrimeTipTimeRemaining] = useState(storedValue.primeTipTimeRemaining || 0);
  
  // Ad Metrics
  const [adEngagementCount, setAdEngagementCount] = useState(storedValue.adEngagementCount || 0);
  const [adRevenueEarned, setAdRevenueEarned] = useState(storedValue.adRevenueEarned || 0);
  
  // Duel Stats
  const [duelStats, setDuelStats] = useState(storedValue.duelStats || { duelsWon: 0, duelsLost: 0, totalRatios: 0 });

  // Volatile state (not saved)
  const [verificationBattery, setVerificationBattery] = useState(100);
  const [gameActive, setGameActive] = useState(true);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [communityNotes, setCommunityNotes] = useState([]);
  const [activeTrend, setActiveTrend] = useState(null);
  const [shadowbanActive, setShadowbanActive] = useState(false);
  const [shadowbanTimer, setShadowbanTimer] = useState(0);
  const [botPercentage, setBotPercentage] = useState(10);
  const [blockedTweetIds, setBlockedTweetIds] = useState([]);
  const [playerHandle, setPlayerHandle] = useState(() => localStorage.getItem('playerHandle') || 'Player');
  
  // Boss/Duel State
  const [isBoss, setIsBoss] = useState(false);
  const [currentCelebrity, setCurrentCelebrity] = useState(null);
  const [pauseSpawning, setPauseSpawning] = useState(false);

  // Grob State
  const [activeGrobBuff, setActiveGrobBuff] = useState(null); // { type: 'SPEED_BOOST', duration: 5 }
  const [grobBuffTimer, setGrobBuffTimer] = useState(0);
  const [sidebarFlicker, setSidebarFlicker] = useState(false);

  // Auto-save every 5 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveState({
        impressions,
        adRevenue,
        followers,
        grifterLevel,
        posterLevel,
        verifiedLevel,
        totalNetWorth: storedValue.totalNetWorth + adRevenue,
        primeTipActive,
        highlightedRealUsers,
        primeTipTimeRemaining,
        unlockedSkins,
        adEngagementCount,
        adRevenueEarned,
        duelStats
      });
    }, 5000);

    return () => clearInterval(saveInterval);
  }, [
    impressions, adRevenue, followers, grifterLevel, posterLevel, verifiedLevel, 
    saveState, storedValue.totalNetWorth, primeTipActive, highlightedRealUsers, primeTipTimeRemaining,
    unlockedSkins, adEngagementCount, adRevenueEarned, duelStats
  ]);

  // Derived Stats / Multipliers
  const getCashMultiplier = useCallback(() => 1 + (grifterLevel * 0.1), [grifterLevel]);
  const getImpressionMultiplier = useCallback(() => {
    let mult = 1 + (posterLevel * 0.1);
    // Apply Grob Speed Boost
    if (activeGrobBuff?.type === 'SPEED_BOOST' && grobBuffTimer > 0) {
      mult *= 2;
    }
    return mult;
  }, [posterLevel, activeGrobBuff, grobBuffTimer]);
  
  const getBatteryDrainReduction = useCallback(() => Math.min(verifiedLevel * 0.01, 0.5), [verifiedLevel]); // Max 50% reduction

  const getUpgradeCost = useCallback((treeType, level) => {
    const baseCost = treeType === 'Verified' ? 20 : 10;
    return baseCost * Math.pow(1.5, level);
  }, []);

  // Purchase Upgrade Logic
  const purchaseUpgrade = useCallback((treeType) => {
    let currentLevel = 0;
    if (treeType === 'Grifter') currentLevel = grifterLevel;
    if (treeType === 'Poster') currentLevel = posterLevel;
    if (treeType === 'Verified') currentLevel = verifiedLevel;

    const cost = getUpgradeCost(treeType, currentLevel);

    if (adRevenue >= cost) {
      setAdRevenue(prev => prev - cost);
      
      if (treeType === 'Grifter') setGrifterLevel(prev => prev + 1);
      if (treeType === 'Poster') setPosterLevel(prev => prev + 1);
      if (treeType === 'Verified') setVerifiedLevel(prev => prev + 1);
      
      playSound('cash');
      return true; // Success
    }
    return false; // Not enough funds
  }, [adRevenue, grifterLevel, posterLevel, verifiedLevel, getUpgradeCost, playSound]);

  // Reset Game
  const resetGame = useCallback(() => {
      clearState();
      localStorage.removeItem('playerHandle');
      localStorage.removeItem('gameSettings');
      window.location.href = '/';
  }, [clearState]);

  // Existing Logic: Calculate tweet spawn rate
  const getTweetSpawnRate = useCallback(() => {
    if (adRevenue > 2000) return 800;
    if (adRevenue > 500) return 2000;
    return 4000;
  }, [adRevenue]);

  // Existing Logic: Update bot percentage
  useEffect(() => {
    if (impressions > 10000) setBotPercentage(30);
    else if (impressions > 5000) setBotPercentage(20);
    else if (impressions > 1000) setBotPercentage(15);
    else setBotPercentage(10);
  }, [impressions]);

  // Existing Logic: Shadowban check
  const isShadowbanned = useCallback(() => {
    return followers === 0 || shadowbanActive;
  }, [followers, shadowbanActive]);

  const getMultiplier = useCallback(() => {
    if (isShadowbanned()) return 0.1;
    // Apply Poster Level Multiplier here as well for base follower scaling
    const baseMult = (1 + followers / 100);
    return baseMult * getImpressionMultiplier();
  }, [followers, isShadowbanned, getImpressionMultiplier]);

  const addImpressions = useCallback((baseAmount) => {
    const multiplier = getMultiplier();
    const finalAmount = Math.floor(baseAmount * multiplier);
    
    setImpressions(prev => prev + finalAmount);
    
    const id = Date.now() + Math.random();
    setFloatingNumbers(prev => [...prev, { id, value: finalAmount, type: 'impression' }]);
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(num => num.id !== id));
    }, 1500);
  }, [getMultiplier]);

  const updateFollowers = useCallback((amount, isTrendMatch = false) => {
    const finalAmount = isTrendMatch ? amount * 2 : amount;
    
    if (finalAmount < 0) {
      triggerHaptic('heavy');
      playSound('buzzer');
    }

    setFollowers(prev => Math.max(0, prev + finalAmount));

    const id = Date.now() + Math.random();
    setFloatingNumbers(prev => [...prev, { 
      id, 
      value: finalAmount, 
      type: 'follower',
      label: finalAmount > 0 ? `${finalAmount} Followers` : `${finalAmount} Followers`
    }]);
    
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(num => num.id !== id));
    }, 1500);
  }, [triggerHaptic, playSound]);

  const addAdRevenue = useCallback((baseAmount) => {
    const shadowbanMult = isShadowbanned() ? 0.1 : 1;
    const upgradeMult = getCashMultiplier();
    
    const finalAmount = baseAmount * shadowbanMult * upgradeMult;
    
    if (finalAmount > 0) playSound('cash');

    setAdRevenue(prev => prev + finalAmount);
  }, [isShadowbanned, getCashMultiplier, playSound]);

  const deductAdRev = useCallback((cost) => {
    if (adRevenue >= cost) {
      setAdRevenue(prev => prev - cost);
      return true;
    }
    return false;
  }, [adRevenue]);

  const drainBattery = useCallback((basePercentage) => {
    const reduction = getBatteryDrainReduction();
    const actualDrain = basePercentage * (1 - reduction);
    setVerificationBattery(prev => Math.max(0, prev - actualDrain));
  }, [getBatteryDrainReduction]);

  const refillBattery = useCallback((cost) => {
    if (adRevenue >= cost) {
      setAdRevenue(prev => prev - cost);
      setVerificationBattery(100);
      playSound('click');
      return true;
    }
    return false;
  }, [adRevenue, playSound]);

  const updateDifficulty = useCallback(() => {
    const spawnRate = getTweetSpawnRate();
    if (spawnRate <= 800) setDifficultyLevel(3);
    else if (spawnRate <= 2000) setDifficultyLevel(2);
    else setDifficultyLevel(1);
  }, [getTweetSpawnRate]);

  const addPenalty = useCallback((amount, tweetId) => {
    const penalty = Math.abs(amount);
    setImpressions(prev => Math.max(0, prev - penalty));
    
    triggerHaptic('heavy');
    playSound('buzzer');

    const id = Date.now() + Math.random();
    setFloatingNumbers(prev => [...prev, { id, value: -penalty, type: 'penalty', tweetId }]);
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(num => num.id !== id));
    }, 1500);
  }, [triggerHaptic, playSound]);

  const addCommunityNote = useCallback((tweetId) => {
    const id = Date.now() + Math.random();
    setCommunityNotes(prev => [...prev, { id, tweetId }]);
    setTimeout(() => {
      setCommunityNotes(prev => prev.filter(note => note.id !== id));
    }, 3000);
  }, []);

  const blockTweet = useCallback((tweetId) => {
    setBlockedTweetIds(prev => [...prev, tweetId]);
    triggerHaptic('medium');
  }, [triggerHaptic]);

  const triggerShadowban = useCallback((durationSeconds) => {
    setShadowbanActive(true);
    setShadowbanTimer(durationSeconds);
    triggerHaptic('heavy');
  }, [triggerHaptic]);

  const decrementShadowbanTimer = useCallback(() => {
    setShadowbanTimer(prev => {
      if (prev <= 1) {
        setShadowbanActive(false);
        return 0;
      }
      return prev - 1;
    });
  }, []);

  // Prime Tip Functions
  const activatePrimeTip = useCallback((userIds) => {
    setPrimeTipActive(true);
    setHighlightedRealUsers(userIds);
    setPrimeTipTimeRemaining(60);
    playSound('click');
  }, [playSound]);

  const clearPrimeTip = useCallback(() => {
    setPrimeTipActive(false);
    setHighlightedRealUsers([]);
    setPrimeTipTimeRemaining(0);
  }, []);

  const decrementPrimeTimer = useCallback(() => {
    setPrimeTipTimeRemaining(prev => {
      if (prev <= 1) {
        clearPrimeTip();
        return 0;
      }
      return prev - 1;
    });
  }, [clearPrimeTip]);

  const removeHighlightedUser = useCallback((tweetId) => {
    setHighlightedRealUsers(prev => prev.filter(id => id !== tweetId));
  }, []);

  // Grob Functions
  const applyGrobBuff = useCallback(() => {
    const randomBuff = GrobBuffs[Math.floor(Math.random() * GrobBuffs.length)];
    
    switch (randomBuff.type) {
      case 'IMPRESSIONS': addImpressions(randomBuff.value); break;
      case 'FOLLOWERS': updateFollowers(randomBuff.value); break;
      case 'SPEED_BOOST': setActiveGrobBuff(randomBuff); setGrobBuffTimer(randomBuff.duration); break;
      case 'CASH': addAdRevenue(randomBuff.value); break;
      case 'BATTERY': setVerificationBattery(prev => Math.min(100, prev + randomBuff.value)); break;
      case 'SKIN':
        if (!unlockedSkins.includes(randomBuff.value)) {
          setUnlockedSkins(prev => [...prev, randomBuff.value]);
          toast({ title: "SKIN UNLOCKED", description: "Grob aesthetic acquired.", className: "bg-cyan-500 border-cyan-400 text-black font-mono" });
        } else {
          addImpressions(500);
        }
        break;
      default: break;
    }
    playSound('click');
    return randomBuff;
  }, [addImpressions, updateFollowers, addAdRevenue, unlockedSkins, toast, playSound]);

  const triggerSidebarFlicker = useCallback(() => {
    setSidebarFlicker(true);
    setTimeout(() => setSidebarFlicker(false), 2000); 
    triggerHaptic('heavy');
  }, [triggerHaptic]);

  const decrementGrobTimer = useCallback(() => {
    setGrobBuffTimer(prev => {
      if (prev <= 1) {
        setActiveGrobBuff(null);
        return 0;
      }
      return prev - 1;
    });
  }, []);
  
  // Ad Functions
  const trackAdEngagement = useCallback((revenue) => {
    setAdEngagementCount(prev => prev + 1);
    setAdRevenueEarned(prev => prev + revenue);
  }, []);

  // Duel Functions
  const startDuel = useCallback((celebrityTweet) => {
    setCurrentCelebrity(celebrityTweet);
    setIsBoss(true);
    setPauseSpawning(true);
    playSound('buzzer'); // Alert sound
  }, [playSound]);

  const endDuel = useCallback((result) => {
    if (result.won) {
      setDuelStats(prev => ({ ...prev, duelsWon: prev.duelsWon + 1, totalRatios: prev.totalRatios + 1 }));
      if (result.rewards) {
        if (result.rewards.followers) updateFollowers(Math.floor(followers * (result.rewards.followers / 100)));
        if (result.rewards.impressions) addImpressions(result.rewards.impressions);
        if (result.rewards.revenue) addAdRevenue(result.rewards.revenue);
      }
    } else {
      setDuelStats(prev => ({ ...prev, duelsLost: prev.duelsLost + 1 }));
      if (result.penalties) {
        if (result.penalties.followers) setFollowers(prev => Math.floor(prev * 0.8)); // -20%
        if (result.penalties.battery) drainBattery(95); // Set to 5% basically
        if (result.penalties.impressions) addPenalty(result.penalties.impressions, 'duel-loss');
      }
    }

    // Wait a moment before resuming spawning, handled by UI usually but ensuring state consistency
    setTimeout(() => {
        setIsBoss(false);
        setPauseSpawning(false);
        setCurrentCelebrity(null);
    }, 1500); // 1.5s cleanup buffer
  }, [followers, updateFollowers, addImpressions, addAdRevenue, drainBattery, addPenalty]);

  const value = {
    impressions,
    adRevenue,
    verificationBattery,
    gameActive,
    difficultyLevel,
    tweetSpawnRate: getTweetSpawnRate(),
    floatingNumbers,
    communityNotes,
    followers,
    activeTrend,
    shadowbanActive,
    shadowbanTimer,
    botPercentage,
    blockedTweetIds,
    grifterLevel,
    posterLevel,
    verifiedLevel,
    primeTipActive,
    highlightedRealUsers,
    primeTipTimeRemaining,
    unlockedSkins,
    activeGrobBuff,
    grobBuffTimer,
    sidebarFlicker,
    adEngagementCount,
    adRevenueEarned,
    playerHandle,
    settings,
    duelStats,
    isBoss,
    currentCelebrity,
    pauseSpawning,
    updateSetting,
    playSound,
    triggerHaptic,
    addImpressions,
    addAdRevenue,
    deductAdRev,
    drainBattery,
    refillBattery,
    updateDifficulty,
    setGameActive,
    addPenalty,
    addCommunityNote,
    updateFollowers,
    setActiveTrend,
    getMultiplier,
    isShadowbanned,
    blockTweet,
    triggerShadowban,
    decrementShadowbanTimer,
    purchaseUpgrade,
    getUpgradeCost,
    getCashMultiplier,
    getImpressionMultiplier,
    getBatteryDrainReduction,
    resetGame,
    activatePrimeTip,
    decrementPrimeTimer,
    removeHighlightedUser,
    clearPrimeTip,
    applyGrobBuff,
    triggerSidebarFlicker,
    decrementGrobTimer,
    trackAdEngagement,
    startDuel,
    endDuel
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
