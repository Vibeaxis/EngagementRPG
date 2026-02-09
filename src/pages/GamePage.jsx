
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { GameProvider, useGame } from '@/contexts/GameContext';
import useGameLoop from '@/hooks/useGameLoop';
import Tweet from '@/components/Tweet';
import ReplyModal from '@/components/ReplyModal';
import FloatingNumber from '@/components/FloatingNumber';
import CommunityNote from '@/components/CommunityNote';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import ProfilePanel from '@/components/ProfilePanel';
import PinnedTweet from '@/components/PinnedTweet';
import SettingsModal from '@/components/SettingsModal';
import RatioDuel from '@/components/RatioDuel';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, User, Zap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

function GameContent() {
  const { tweets, removeTweet } = useGameLoop();
  const { 
    gameActive, 
    setGameActive, 
    floatingNumbers, 
    communityNotes, 
    activeGrobBuff, 
    grobBuffTimer, 
    sidebarFlicker,
    settings,
    updateSetting,
    resetGame,
    triggerHaptic,
    isBoss
  } = useGame();
  
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleTweetExpire = (tweetId) => {
    removeTweet(tweetId);
  };

  const handleReplyClick = (tweet) => {
    // If it's a celebrity tweet, Tweet.jsx handles the duel trigger via startDuel.
    // However, if we reached here, it's a normal tweet.
    if (tweet.authorType !== 'Celebrity') {
        setSelectedTweet(tweet);
    }
  };

  const handleModalClose = () => {
    setSelectedTweet(null);
  };

  const togglePause = () => {
    setGameActive(!gameActive);
  };

  return (
    <div className="flex min-h-screen bg-black overflow-hidden relative">
      <Helmet>
        <title>Twitter RPG - Gain Impressions & Ad Revenue</title>
        <meta 
          name="description" 
          content="Play the ultimate Twitter engagement game. Reply to viral tweets, gain impressions, earn ad revenue, and manage your verification battery in this addictive RPG experience." 
        />
      </Helmet>

      {/* Left Panel - wrapped in div to handle UI flicker */}
      <div className={`h-screen ${sidebarFlicker ? 'animate-ui-flicker' : ''}`}>
        <LeftPanel />
      </div>

      {/* Center Feed */}
      <div className="flex-1 relative h-screen overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-lg border-b border-gray-800">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-black text-white">
                <span className="text-[#1d9bf0]">X</span> Engagement RPG
              </h1>
              <div className="flex items-center gap-2">
                {/* Grob Buff Indicator */}
                <AnimatePresence>
                  {activeGrobBuff && activeGrobBuff.type === 'SPEED_BOOST' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-[#00D9FF] text-black px-3 py-1.5 rounded font-mono text-sm font-bold flex items-center gap-2 border-2 border-white"
                    >
                      <Zap size={14} className="animate-pulse" />
                      SPEED: {grobBuffTimer}s
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  onClick={() => setIsSettingsOpen(true)}
                  variant="outline"
                  size="sm"
                  className="bg-[#16181c] border-gray-800 text-white hover:bg-[#1d9bf0] hover:text-white"
                >
                  <Settings size={16} />
                </Button>
                
                <Button
                  onClick={() => setIsProfileOpen(true)}
                  variant="outline"
                  size="sm"
                  className="bg-[#16181c] border-gray-800 text-white hover:bg-[#1d9bf0] hover:text-white"
                >
                  <User size={16} className="mr-2" />
                  Profile
                </Button>
                
                <Button
                  onClick={togglePause}
                  variant="outline"
                  size="sm"
                  className="bg-[#16181c] border-gray-800 text-white hover:bg-[#1d9bf0] hover:text-white"
                >
                  {gameActive ? (
                    <>
                      <Pause size={16} className="mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play size={16} className="mr-2" />
                      Resume
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tweet Feed - Waterfall / List Layout */}
        <div className="max-w-2xl mx-auto px-4 py-6 pb-20">
          {/* Pinned Tweet by Grob */}
          <PinnedTweet tweets={tweets} />

          {!gameActive && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 text-center mb-6"
            >
              <p className="text-yellow-300 font-bold">Game Paused</p>
              <p className="text-yellow-200 text-sm">Click Resume to continue</p>
            </motion.div>
          )}

          <div className="space-y-4 relative min-h-[500px]">
            <AnimatePresence mode="popLayout">
              {tweets.map((tweet) => {
                const hasNote = communityNotes.some(note => note.tweetId === tweet.id);
                const tweetFloatingNumbers = floatingNumbers.filter(num => !num.tweetId || num.tweetId === tweet.id);
                
                return (
                  <div key={tweet.id} className="relative">
                    <Tweet
                      tweet={tweet}
                      onReply={handleReplyClick}
                      onExpire={handleTweetExpire}
                    />
                    
                    {/* Community Note Overlay */}
                    {hasNote && <CommunityNote tweetId={tweet.id} />}
                    
                    {/* Floating Numbers */}
                    <AnimatePresence>
                      {tweetFloatingNumbers.map((num) => (
                        <FloatingNumber
                          key={num.id}
                          value={num.value}
                          type={num.type}
                          id={num.id}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                );
              })}
            </AnimatePresence>

            {tweets.length === 0 && gameActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-gray-500 text-lg mb-2">
                  Waiting for feed updates...
                </div>
                <div className="text-gray-600 text-sm">
                  The algorithm is processing...
                </div>
              </motion.div>
            )}

            {tweets.length === 0 && !gameActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-gray-500 text-lg mb-2">
                  Game is paused
                </div>
                <div className="text-gray-600 text-sm">
                  Resume to start seeing tweets
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Global Floating Numbers (not attached to tweets) */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatePresence>
            {floatingNumbers
              .filter(num => !num.tweetId)
              .map((num) => (
                <div key={num.id} className="absolute top-1/2 left-1/2">
                  <FloatingNumber
                    value={num.value}
                    type={num.type}
                    id={num.id}
                  />
                </div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel */}
      <RightPanel />

      {/* Profile Panel (Slide In) */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <ProfilePanel 
              isOpen={isProfileOpen} 
              onClose={() => setIsProfileOpen(false)} 
            />
          </>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            updateSetting={updateSetting}
            resetGame={resetGame}
            triggerHaptic={triggerHaptic}
          />
        )}
      </AnimatePresence>

      {/* Reply Modal */}
      <ReplyModal
        tweet={selectedTweet}
        isOpen={!!selectedTweet}
        onClose={handleModalClose}
      />
      
      {/* Ratio Duel Overlay */}
      {isBoss && <RatioDuel />}
      
    </div>
  );
}

function GamePage() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default GamePage;
