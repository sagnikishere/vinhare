'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'initial' | 'full' | 'complete'>('initial');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage 1: "V"
    const timer1 = setTimeout(() => {
      setStage('full');
    }, 700);

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    // Stage 2: Reveal site
    const timer2 = setTimeout(() => {
      setStage('complete');
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#FDFBF7] text-[#1A1814]"
        >
          {/* Subtle Background Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* Center Brand Typography */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center"
            >
              <span className="font-serif-luxury text-6xl md:text-8xl tracking-[0.2em] font-light text-[#B8860B]">
                {stage === 'initial' ? 'V' : 'VINHARE'}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 'full' ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 text-xs tracking-[0.35em] text-[#8C8275] uppercase font-bold"
            >
              HOTEL & RESORT
            </motion.p>
          </div>

          {/* Minimal Loading Bar & Progress in Glass Pill */}
          <div className="absolute bottom-16 flex flex-col items-center gap-3 w-56 glass-pill px-5 py-3.5 rounded-2xl shadow-lg border border-[#D4AF37]/30">
            <div className="h-[3px] w-full bg-[#EAE4D9]/60 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="flex justify-between w-full text-[10px] tracking-widest text-[#786C5E] font-bold">
              <span>BIHAR, INDIA</span>
              <span className="text-[#B8860B] font-mono">{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
