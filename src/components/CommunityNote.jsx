
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

function CommunityNote({ tweetId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-yellow-500/20 backdrop-blur-sm border-2 border-yellow-500 rounded-lg z-40 flex items-center justify-center pointer-events-none"
    >
      <div className="bg-yellow-500/90 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-bold">
        <AlertTriangle size={20} />
        <span>Community Note: This claim is disputed</span>
      </div>
    </motion.div>
  );
}

export default CommunityNote;
