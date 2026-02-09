
import { useState, useEffect, useCallback, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import {
  generateGlowieAvatar,
  generatePornBotAvatar,
  generateBrandAvatar,
  generateRealUserAvatar
} from '@/utils/avatarGenerator';
import {
  generateGlowieHandle,
  generatePornBotHandle,
  generateBrandHandle,
  generateRealUserHandle
} from '@/utils/handleGenerator';
import {
  generateGlowieText,
  generatePornBotText,
  generateBrandText,
  generateRealUserText
} from '@/utils/trapTweetGenerator';
import { generateGrobTweet } from '@/utils/GrobData';
import { generateAdTweet } from '@/utils/AdData';
import { generateCelebrityTweet } from '@/utils/CelebrityData';
import { generateArchetypeTweet } from '@/utils/TweetFactory';
import { generateModularTweet } from '@/utils/ModularFactory';
const TOPICS = ['Drama', 'Celebrity', 'Tech', 'Politics', 'Meme', 'Crypto'];

function useGameLoop() {
  const { 
    gameActive, 
    updateDifficulty, 
    botPercentage,
    blockedTweetIds,
    shadowbanActive,
    decrementShadowbanTimer,
    decrementPrimeTimer,
    removeHighlightedUser,
    primeTipActive,
    decrementGrobTimer,
    activeGrobBuff,
    impressions,
    settings,
    isBoss,
    pauseSpawning,
    currentCelebrity
  } = useGame();
  
  const [tweets, setTweets] = useState([]);
  const tweetCountRef = useRef(0);

  const spawnIntervalMs = Math.max(600, (2.0 - (impressions / 100000)) * 1000);

  const createTweet = useCallback(() => {
    tweetCountRef.current += 1;

    // Celebrity Tweet Logic (Every 10th tweet, 20% chance, if no current boss)
    if (tweetCountRef.current % 10 === 0 && !currentCelebrity && Math.random() < 0.2) {
      const celebTweet = generateCelebrityTweet();
      return {
        id: `tweet-celeb-${Date.now()}`,
        ...celebTweet,
        timestamp: Date.now(),
        expiresAt: Date.now() + 15000, // Celebs stay longer
      };
    }

    // 20% Chance for Ad
    if (Math.random() < 0.2) {
      const adTweet = generateAdTweet();
      return {
        id: `tweet-ad-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...adTweet,
        timestamp: Date.now(),
        expiresAt: Date.now() + 8000,
      };
    }

    // Grob Logic
    const baseGrob = settings?.grobFrequency ? 0.10 : 0.02;
    const varGrob = settings?.grobFrequency ? 0.05 : 0.03;
    const grobChance = baseGrob + Math.random() * varGrob;
    
    if (Math.random() < grobChance) {
      const grobTweet = generateGrobTweet();
      return {
        id: `tweet-grob-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...grobTweet,
        timestamp: Date.now(),
        expiresAt: Date.now() + 8000, 
      };
    }

    const rand = Math.random() * 100;
    let authorType = "Real";
    
   if (rand < botPercentage) {
      const subRand = Math.random();
      if (subRand < 0.33) authorType = "Glowie";
      else if (subRand < 0.66) authorType = "PornBot";
      else authorType = "BrandAccount";
    } else {
      // 30% chance to be an "Archetype" voice, 70% to be your original "Real" user
      if (Math.random() < 0.3) {
        authorType = "Archetype";
        } else {
    // 20% chance: The Modular Chaos Engine (Infinite Variety)
    const modular = generateModularTweet();
    content = modular.content;
    authorType = "Modular";

      }
    }

    let avatar, handle, content;

    switch (authorType) {
      case "Glowie":
        avatar = generateGlowieAvatar();
        handle = generateGlowieHandle();
        content = generateGlowieText();
        break;
      case "PornBot":
        avatar = generatePornBotAvatar();
        handle = generatePornBotHandle();
        content = generatePornBotText();
        break;
      case "BrandAccount":
        avatar = generateBrandAvatar();
        handle = generateBrandHandle();
        content = generateBrandText();
        break;
        // NEW: The Archetype Branch
      case "Archetype":
        const archetype = generateArchetypeTweet();
        avatar = generateRealUserAvatar(); // Uses standard human avatar
        handle = generateRealUserHandle(); // Uses standard human handle
        content = archetype.content;       // Uses new unhinged writing
        break;
      case "Real":
      default:
        avatar = generateRealUserAvatar();
        handle = generateRealUserHandle();
        content = generateRealUserText();
        break;
    }

    const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    
    return {
      id: `tweet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content,
      authorType,
      avatar,
      handle,
      timestamp: Date.now(),
      expiresAt: Date.now() + 5000,
      topic: randomTopic
    };
  }, [botPercentage, settings?.grobFrequency, currentCelebrity]);

  const removeTweet = useCallback((tweetId) => {
    setTweets(prev => prev.filter(t => t.id !== tweetId));
    removeHighlightedUser(tweetId);
  }, [removeHighlightedUser]);

  const spawnTweet = useCallback(() => {
    // Check pause states from context
    if (isBoss || pauseSpawning) return;

    const newTweet = createTweet();
    setTweets(prev => {
      const maxTweets = 5;
      const currentTweets = [...prev, newTweet];
      if (currentTweets.length > maxTweets) {
        const removed = currentTweets.shift();
        removeHighlightedUser(removed.id);
        return currentTweets;
      }
      return currentTweets;
    });
  }, [createTweet, removeHighlightedUser, isBoss, pauseSpawning]);

  // Main game loop for spawning tweets
  useEffect(() => {
    if (!gameActive) return;

    updateDifficulty();
    
    const interval = setInterval(() => {
      spawnTweet();
    }, spawnIntervalMs);

    return () => clearInterval(interval);
  }, [gameActive, spawnIntervalMs, spawnTweet, updateDifficulty]);

  // Timer Loops
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      if (shadowbanActive) decrementShadowbanTimer();
      if (primeTipActive) decrementPrimeTimer();
      if (activeGrobBuff) decrementGrobTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [
    gameActive, 
    shadowbanActive, decrementShadowbanTimer, 
    primeTipActive, decrementPrimeTimer,
    activeGrobBuff, decrementGrobTimer
  ]);

  // Filter out blocked tweets before returning
  // Also filter out Celebrity tweets if Boss Mode is Active (they are shown in the duel UI, not feed, or removed)
  // Actually, let's keep them in feed until interacted with, but if duel starts, maybe remove it?
  const visibleTweets = tweets.filter(tweet => !blockedTweetIds.includes(tweet.id));

  return { tweets: visibleTweets, removeTweet };
}

export default useGameLoop;
