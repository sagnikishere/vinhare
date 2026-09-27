'use me';
'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { BRAND_INFO } from '../../data/vinhareData';

export const IntroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Card 3D tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotateX((-y / rect.height) * 16);
    setRotateY((x / rect.width) * 16);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section
      ref={containerRef}
      id="about-intro"
      className="relative py-28 md:py-40 bg-[#FDFBF7] text-[#1A1814] overflow-hidden border-t border-[#D4AF37]/25"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Category Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-3 mb-6"
        >
          <div className="h-[1.5px] w-12 bg-[#B8860B]" />
          <span className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-bold">
            THE VINHARE PHILOSOPHY
          </span>
        </motion.div>

        {/* Oversized Headline Compositions */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif-luxury text-4xl sm:text-6xl md:text-8xl tracking-[0.05em] font-light text-[#1A1814] leading-tight"
          >
            MORE THAN A DESTINATION.
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif-luxury text-4xl sm:text-6xl md:text-8xl tracking-[0.05em] font-light text-gold-gradient leading-tight"
          >
            A COLLECTION OF EXPERIENCES.
          </motion.h2>
        </div>

        {/* Grid Content with Floating 3D Tilt Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col space-y-8"
          >
            <p className="text-lg md:text-2xl font-serif text-[#2C261E] leading-relaxed font-light">
              "Vinhare brings together distinctive resorts, hospitality experiences and celebration destinations under one growing brand."
            </p>

            <p className="text-sm md:text-base text-[#52483B] leading-relaxed font-light">
              Rooted in Bihar, India, Vinhare represents a unified standard of refined accommodation, grand celebration spaces, and warm Indian hospitality. Whether seeking a peaceful retreat, hosting a landmark wedding, or dining with loved ones, every destination delivers unmatched quality.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#D4AF37]/30">
              <div className="flex flex-col space-y-2">
                <Compass className="w-5 h-5 text-[#B8860B]" />
                <h4 className="text-xs tracking-widest text-[#1A1814] font-bold uppercase">
                  DESTINATIONS
                </h4>
                <p className="text-[11px] text-[#786C5E]">Shiv Garden, J.P. & Resort Raj</p>
              </div>

              <div className="flex flex-col space-y-2">
                <Sparkles className="w-5 h-5 text-[#B8860B]" />
                <h4 className="text-xs tracking-widest text-[#1A1814] font-bold uppercase">
                  WEDDINGS
                </h4>
                <p className="text-[11px] text-[#786C5E]">Mithila Marriage Ecosystem</p>
              </div>

              <div className="flex flex-col space-y-2">
                <ShieldCheck className="w-5 h-5 text-[#B8860B]" />
                <h4 className="text-xs tracking-widest text-[#1A1814] font-bold uppercase">
                  EXCELLENCE
                </h4>
                <p className="text-[11px] text-[#786C5E]">Uncompromising Guest Care</p>
              </div>
            </div>
          </motion.div>

          {/* Right Floating Image Card with Interactive 3D Tilt */}
          <motion.div
            style={{ y: yImage }}
            className="lg:col-span-6 perspective-1000"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              data-cursor="TILT"
              className="relative rounded-2xl overflow-hidden glass-panel-gold p-3 transition-transform duration-200 ease-out cursor-pointer shadow-[0_20px_50px_rgba(184,134,11,0.15)] border-2 border-[#D4AF37]/40"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/images/hero_resort.jpg"
                  alt="Vinhare Luxury Experience"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814]/90 via-transparent to-transparent opacity-80" />

                {/* Card Badge */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] tracking-[0.3em] text-[#F3E5AB] uppercase font-bold">
                      THE VINHARE STANDARD
                    </span>
                    <h3 className="font-serif-luxury text-2xl text-white mt-0.5">
                      Bihar's Flagship Hospitality Group
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded border border-[#D4AF37]/60 bg-[#1A1814]/80 text-[10px] tracking-widest text-[#F3E5AB]">
                    EST. HOSPITALITY
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
