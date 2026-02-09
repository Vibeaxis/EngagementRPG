
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function FloatingNumber({ value, type, id, label }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const isPositive = value > 0;
  
  // Determine color based on type and value
  let color;
  if (type === 'follower') {
    color = isPositive ? '#22c55e' : '#ef4444'; // Green for positive, Red for negative followers
  } else if (type === 'penalty') {
    color = '#ef4444';
  } else {
    color = '#1d9bf0'; // Blue for impressions
  }

  const displayValue = label || (isPositive ? `+${value}` : value);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={id}
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -80, opacity: 0, scale: 1.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute pointer-events-none z-50 whitespace-nowrap"
          style={{
            color: color,
            fontSize: '24px',
            fontWeight: 900,
            textShadow: '0 0 10px rgba(0,0,0,0.8)',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '50%'
          }}
        >
          {displayValue}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingNumber;
