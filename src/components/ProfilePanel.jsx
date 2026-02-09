
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  Trash2, 
  User, 
  Lock, 
  Zap, 
  Briefcase 
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function ProfilePanel({ isOpen, onClose }) {
  const { 
    adRevenue, 
    grifterLevel, 
    posterLevel, 
    verifiedLevel, 
    purchaseUpgrade, 
    getUpgradeCost,
    resetGame,
    impressions,
    playerHandle // Get player handle
  } = useGame();

  const upgrades = [
    {
      type: 'Grifter',
      name: 'The Grifter',
      description: 'Sell courses, crypto scams, and supplements.',
      effect: '+10% Ad Revenue per level',
      currentLevel: grifterLevel,
      icon: DollarSign,
      color: 'from-green-500/20 to-emerald-500/10 border-green-500/30',
      iconColor: 'text-green-500',
      btnColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      type: 'Poster',
      name: 'The Poster',
      description: 'Master the art of engagement baiting.',
      effect: '+10% Impressions per level',
      currentLevel: posterLevel,
      icon: TrendingUp,
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30',
      iconColor: 'text-blue-500',
      btnColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      type: 'Verified',
      name: 'Verified User',
      description: 'Pay for verification to boost visibility.',
      effect: '-1% Battery Drain per level (Max 50%)',
      currentLevel: verifiedLevel,
      icon: CheckCircle,
      color: 'from-yellow-500/20 to-orange-500/10 border-yellow-500/30',
      iconColor: 'text-yellow-500',
      btnColor: 'bg-yellow-600 hover:bg-yellow-700'
    }
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-[#000000] border-l border-gray-800 shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1d9bf0] to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {playerHandle.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">@{playerHandle}</h2>
              <p className="text-gray-400 text-sm">Media Empire Tycoon</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-white">
            Close
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#16181c] p-4 rounded-xl border border-gray-800">
            <div className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Net Worth</div>
            <div className="text-2xl font-bold text-white flex items-center gap-1">
              <DollarSign size={20} className="text-green-500" />
              {adRevenue.toFixed(2)}
            </div>
          </div>
          <div className="bg-[#16181c] p-4 rounded-xl border border-gray-800">
             <div className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Lifetime Reach</div>
             <div className="text-2xl font-bold text-white flex items-center gap-1">
               <TrendingUp size={20} className="text-blue-500" />
               {(impressions / 1000).toFixed(1)}k
             </div>
          </div>
        </div>

        {/* Upgrade Trees */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="text-[#1d9bf0]" /> Skill Trees
          </h3>
          
          <div className="grid gap-4">
            {upgrades.map((upgrade) => {
              const cost = getUpgradeCost(upgrade.type, upgrade.currentLevel);
              const canAfford = adRevenue >= cost;
              const Icon = upgrade.icon;

              return (
                <Card key={upgrade.type} className={`bg-gradient-to-br ${upgrade.color} border-0 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Icon size={100} />
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-black/40 ${upgrade.iconColor}`}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{upgrade.name}</CardTitle>
                          <div className="text-xs font-bold text-white/60 bg-white/10 px-2 py-0.5 rounded-full inline-block mt-1">
                            Lvl {upgrade.currentLevel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <p className="text-gray-300 text-sm mb-2">{upgrade.description}</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                      <Zap size={12} />
                      {upgrade.effect}
                    </div>
                    
                    {/* Progress Bar Visual */}
                    <div className="w-full h-1.5 bg-black/40 rounded-full mt-4 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(upgrade.currentLevel % 10) * 10}%` }}
                        className={`h-full ${upgrade.btnColor}`}
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-2">
                    <Button 
                      onClick={() => purchaseUpgrade(upgrade.type)}
                      disabled={!canAfford}
                      className={`w-full ${canAfford ? upgrade.btnColor : 'bg-gray-800 text-gray-500 cursor-not-allowed'} transition-all`}
                    >
                      {canAfford ? (
                        <span className="font-bold flex items-center gap-1">
                          Upgrade <span className="text-white/80 font-normal">(${cost.toFixed(2)})</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock size={14} /> Need ${cost.toFixed(2)}
                        </span>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-8 border-t border-gray-800">
          <h3 className="text-sm font-bold text-red-500 mb-4 uppercase tracking-wider">Danger Zone</h3>
          <Button 
            variant="destructive" 
            className="w-full bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50"
            onClick={resetGame}
          >
            <Trash2 size={16} className="mr-2" />
            Delete Account (Hard Reset)
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfilePanel;
