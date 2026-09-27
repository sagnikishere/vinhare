'use me';
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { EXPERIENCES } from '../../data/vinhareData';

interface ExperienceSectionProps {
  onOpenEnquiry: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenEnquiry }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeExp = EXPERIENCES[activeIdx];

  return (
    <section
      id="experiences"
      className="relative py-32 bg-[#FDFBF7] text-[#1A1814] overflow-hidden border-t border-[#D4AF37]/25"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#D4AF37]/30">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-[1.5px] w-10 bg-[#B8860B]" />
              <span className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-bold">
                CURATED LIVING
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl tracking-[0.08em] text-[#1A1814] font-light">
              THE VINHARE EXPERIENCE
            </h2>
          </div>

          <p className="text-sm text-[#52483B] font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Every moment at Vinhare is crafted to evoke serenity, connection, and delight across stays, celebrations, dining, and relaxation.
          </p>
        </div>

        {/* Interactive Experience Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Vertical Storytelling Selector */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {EXPERIENCES.map((exp, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={exp.id}
                  onClick={() => setActiveIdx(idx)}
                  data-cursor="SELECT"
                  className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer border-2 ${
                    isActive
                      ? 'bg-white border-[#D4AF37] shadow-[0_10px_30px_rgba(184,134,11,0.15)]'
                      : 'bg-[#FAF7F2] border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] tracking-[0.3em] font-bold uppercase ${
                        isActive ? 'text-[#B8860B]' : 'text-[#8C8275]'
                      }`}
                    >
                      0{idx + 1} / 05
                    </span>
                    {isActive && <Sparkles className="w-4 h-4 text-[#B8860B]" />}
                  </div>

                  <h3
                    className={`font-serif-luxury text-2xl sm:text-3xl font-light mt-1 ${
                      isActive ? 'text-[#1A1814]' : 'text-[#52483B]'
                    }`}
                  >
                    {exp.title}
                  </h3>

                  <p className="text-xs text-[#B8860B] font-serif italic mt-1 font-medium">
                    "{exp.subtitle}"
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Fullscreen Visual Display Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(184,134,11,0.15)]"
              >
                <img
                  src={activeExp.image}
                  alt={activeExp.title}
                  className="w-full h-full object-cover transition-transform duration-1000 scale-105 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814] via-[#1A1814]/40 to-transparent opacity-85" />

                <div className="absolute bottom-8 left-8 right-8 flex flex-col space-y-4">
                  <span className="text-xs tracking-[0.3em] text-[#F3E5AB] uppercase font-bold">
                    {activeExp.title} AT VINHARE
                  </span>

                  <h3 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white">
                    "{activeExp.subtitle}"
                  </h3>

                  <p className="text-xs sm:text-sm text-[#EADCC9]/90 font-light max-w-lg leading-relaxed">
                    {activeExp.description}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={onOpenEnquiry}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white text-xs tracking-[0.2em] font-bold uppercase flex items-center space-x-2 hover:shadow-[0_10px_25px_rgba(184,134,11,0.3)] transition-all"
                    >
                      <span>BOOK THIS EXPERIENCE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
