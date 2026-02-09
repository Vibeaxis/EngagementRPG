
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const [handle, setHandle] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [onlineCount, setOnlineCount] = useState(420069);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const change = Math.floor(Math.random() * 500) - 250;
        return Math.max(400000, Math.min(1000000, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20);
    setHandle(value);
  };

  const handleSignIn = () => {
    if (handle && agreed) {
      localStorage.setItem('playerHandle', handle);
      window.location.reload(); // Hard reload to trigger App router logic cleanly
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans text-white relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md space-y-8 z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center animate-logo-glitch">
              <Check className="w-16 h-16 text-[#1d9bf0]" strokeWidth={4} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center tracking-tighter animate-crt-flicker">
            Your Attention is Our Product.
          </h1>
        </div>

        {/* Form Section */}
        <div className="space-y-6 bg-[#16181c] p-8 rounded-2xl border border-[#2f3336]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Identify Yourself</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 text-lg">@</span>
              <input
                type="text"
                value={handle}
                onChange={handleInputChange}
                placeholder="handle"
                className="w-full bg-black border border-[#2f3336] rounded-lg py-3 pl-10 pr-4 text-lg focus:outline-none focus:border-[#1d9bf0] transition-colors placeholder:text-gray-700"
              />
            </div>
            <p className="text-xs text-gray-500 text-right">
              {handle.length}/20
            </p>
          </div>

          <div className="flex items-start space-x-3 group cursor-pointer" onClick={() => setAgreed(!agreed)}>
            <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-colors ${agreed ? 'bg-[#1d9bf0] border-[#1d9bf0]' : 'border-gray-500 group-hover:border-gray-300'}`}>
              {agreed && <Check size={14} className="text-white" />}
            </div>
            <p className="text-sm text-gray-400 leading-tight select-none">
              I agree to surrender my sanity and receive 0% of the revenue I generate.
            </p>
          </div>

          <Button 
            className={`w-full py-6 text-lg font-bold transition-all duration-300 ${handle && agreed ? 'bg-[#1d9bf0] hover:bg-[#1a8cd8] shadow-[0_0_20px_rgba(29,155,240,0.4)]' : 'bg-[#2f3336] text-gray-500 cursor-not-allowed'}`}
            disabled={!handle || !agreed}
            onClick={handleSignIn}
          >
            Sign In with Regret
          </Button>
        </div>
      </motion.div>

      {/* Online Counter */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-600 font-mono">
        <span className="inline-block w-2 h-2 rounded-full bg-green-900 mr-2 animate-pulse"></span>
        {onlineCount.toLocaleString()} DOOMSCROLLING NOW
      </div>
    </div>
  );
};

export default LandingPage;
