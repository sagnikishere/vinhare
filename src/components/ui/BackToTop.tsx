'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useSmoothScroll } from '../providers/SmoothScrollProvider';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = totalHeight > 0 ? Math.min(100, Math.max(0, (scrolled / totalHeight) * 100)) : 0;
        setScrollPercent(percent);

        if (scrolled > 450) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleGlideTop = () => {
    scrollTo(0, { duration: 1.5 });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-[800]"
        >
          <button
            onClick={handleGlideTop}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full glass-panel-gold border border-[#D4AF37]/50 shadow-[0_10px_25px_rgba(184,134,11,0.2)] hover:border-[#D4AF37] hover:scale-105 active:scale-95 transition-all focus:outline-none"
            aria-label="Glide to top of page"
            data-cursor="TOP"
          >
            {/* SVG Circular Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-[#D4AF37]/20"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={125.66}
                strokeDashoffset={125.66 - (125.66 * scrollPercent) / 100}
                strokeLinecap="round"
                className="text-[#D4AF37] transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>

            {/* Icon */}
            <ChevronUp className="w-5 h-5 text-[#B8860B] group-hover:text-[#8B6508] -translate-y-[1px] transition-transform group-hover:-translate-y-1" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
