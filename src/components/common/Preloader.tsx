import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if preloader was already shown this session
    const hasSeen = sessionStorage.getItem('yecha_preloader_seen');
    if (hasSeen) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('yecha_preloader_seen', 'true');
          }, 300);
          return 100;
        }
        const diff = Math.floor(Math.random() * 25) + 10;
        return Math.min(prev + diff, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="brand-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A120D] text-[#FAF7F2] select-none"
        >
          <div className="flex flex-col items-center max-w-sm w-full px-8 text-center">
            {/* Hindi Wordmark */}
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.3em] font-serif text-[#C4B099] mb-2 uppercase"
            >
              एच कैफे • भोपाल
            </motion.span>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-serif text-4xl sm:text-5xl font-light tracking-[0.25em] text-[#FAF7F2] mb-6"
            >
              YECHA
            </motion.h1>

            {/* Elegant Progress Line */}
            <div className="w-48 h-[2px] bg-[#3B2B21] rounded-full overflow-hidden mb-4 relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#8C6D58] via-[#D4AF37] to-[#8C6D58]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between w-48 text-[10px] tracking-[0.2em] text-[#A89887] uppercase font-mono"
            >
              <span>Salaiya, Bhopal</span>
              <span>{progress}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
