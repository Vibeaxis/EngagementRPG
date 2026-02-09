
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

function VerificationBattery() {
  const { verificationBattery, refillBattery, adRevenue } = useGame();
  
  const radius = 60;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (verificationBattery / 100) * circumference;

  const handleRefill = () => {
    if (adRevenue >= 8) {
      refillBattery(8);
    }
  };

  const batteryColor = verificationBattery === 0 ? '#6b7280' : '#1d9bf0';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            stroke="#374151"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <motion.circle
            stroke={batteryColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={false}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Zap 
            size={24} 
            className={verificationBattery === 0 ? 'text-gray-500' : 'text-[#1d9bf0]'}
            fill={verificationBattery === 0 ? '#6b7280' : '#1d9bf0'}
          />
          <span className={`text-xl font-bold ${verificationBattery === 0 ? 'text-gray-500' : 'text-white'}`}>
            {verificationBattery}%
          </span>
        </div>
      </div>
      
      {verificationBattery < 100 && (
        <Button
          onClick={handleRefill}
          disabled={adRevenue < 8}
          className="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          size="sm"
        >
          <Zap size={16} className="mr-1" />
          Refill ($8)
        </Button>
      )}
    </div>
  );
}

export default VerificationBattery;
