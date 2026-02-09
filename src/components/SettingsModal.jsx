
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Volume1, VolumeX, Smartphone, Eye, Moon, Skull, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Custom Toggle component to replace missing shadcn Switch
const Toggle = ({ label, checked, onChange, description, disabled = false }) => (
  <div className="flex items-start justify-between py-3">
    <div className="flex-1 pr-4">
      <div className="font-medium text-white text-sm">{label}</div>
      {description && <div className="text-xs text-gray-500 mt-0.5">{description}</div>}
    </div>
    <label className={`relative inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked} 
        onChange={e => !disabled && onChange(e.target.checked)} 
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d9bf0]"></div>
    </label>
  </div>
);

const Slider = ({ label, value, onChange, icon: Icon, min = 0, max = 100, description }) => (
  <div className="py-3 space-y-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-white text-sm font-medium">
        {Icon && <Icon size={16} />}
        {label}
      </div>
      <span className="text-xs text-gray-400 font-mono">{value}%</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1d9bf0]"
    />
    {description && <div className="text-xs text-gray-500">{description}</div>}
  </div>
);

const SettingsModal = ({ isOpen, onClose, settings, updateSetting, resetGame, triggerHaptic }) => {
  const [algoValue, setAlgoValue] = useState(50);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAlgoValue(Math.floor(Math.random() * 25) + 50); // Random 50-75
      setShowDeleteConfirm(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const VolumeIcon = settings.volume === 0 ? VolumeX : settings.volume < 50 ? Volume1 : Volume2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md bg-[#16181c] border border-[#2f3336] rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#2f3336]">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Functional Settings */}
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Experience</h3>
            
            <Slider 
              label="Master Volume" 
              icon={VolumeIcon}
              value={settings.volume} 
              onChange={(val) => updateSetting('volume', val)} 
            />

            <Toggle 
              label="Haptic Feedback" 
              checked={settings.hapticFeedback} 
              onChange={(checked) => {
                updateSetting('hapticFeedback', checked);
                if(checked) triggerHaptic('medium');
              }}
              description="Phone go brrr when number go down."
            />

            <Toggle 
              label="Filter Out Reality" 
              checked={settings.grobFrequency} 
              onChange={(checked) => updateSetting('grobFrequency', checked)} 
              description={settings.grobFrequency ? "High Grob Activity (10-15%)" : "Standard Grob Activity (2-5%)"}
            />
          </section>

          {/* Satirical Settings */}
          <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">System</h3>
            
            <Toggle 
              label="Darker Mode" 
              checked={true} 
              onChange={() => {}} // No-op
              disabled={false} // Clickable but does nothing effectively except maybe flicker?
              description="We've already made it as dark as possible."
            />

            <Slider 
              label="Algorithm Transparency" 
              icon={Eye}
              value={algoValue} 
              onChange={(val) => setAlgoValue(val)} 
              description="See how the algorithm works (you won't)."
            />
          </section>

          {/* Danger Zone */}
          <section className="pt-4 border-t border-[#2f3336]">
            {!showDeleteConfirm ? (
              <Button 
                variant="destructive" 
                className="w-full animate-pulse-red bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Skull size={18} className="mr-2" />
                DELETE SOUL
              </Button>
            ) : (
              <div className="space-y-3 p-4 bg-red-900/10 border border-red-900/50 rounded-lg text-center">
                <p className="text-red-400 text-sm font-bold">Are you sure? This deletes everything.</p>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    className="flex-1 text-gray-400 hover:text-white"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={resetGame}
                  >
                    CONFIRM DELETE
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;
