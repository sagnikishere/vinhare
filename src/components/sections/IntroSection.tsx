'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { BRAND_INFO } from '../../data/vinhareData';

const HOTEL_SLIDES = [
  {
    id: 'shiv-garden',
    name: 'Shiv Garden Resort',
    subtitle: 'Lush Manicured Lawns & Regal Celebrations',
    image: '/images/shiv-garden/IMG_2974.jpg',
    tag: 'GARDEN RESORT • STAY • EVENTS',
  },
  {
    id: 'jp-resort',
    name: 'J.P. Resort',
    subtitle: 'Modern Luxury Suites & Private Courtyards',
    image: '/images/jp_resort.jpg',
    tag: 'CONTEMPORARY RESORT & SUITES',
  },
  {
    id: 'resort-raj',
    name: 'Resort Raj',
    subtitle: 'Palatial Heritage Façade & Poolside Stays',
    image: '/images/raj_resort.webp',
    tag: 'HERITAGE PALACE & POOL VILLA',
  },
];

export const IntroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto changing hotel slides
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HOTEL_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
            <div className="p-6 md:p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/35 shadow-sm">
              <p className="text-lg md:text-2xl font-serif text-[#2C261E] leading-relaxed font-light">
                "Vinhare brings together distinctive resorts, hospitality experiences and celebration destinations under one growing brand."
              </p>
            </div>

            <p className="text-sm md:text-base text-[#52483B] leading-relaxed font-light">
              Rooted in Bihar, India, Vinhare represents a unified standard of refined accommodation, grand celebration spaces, and warm Indian hospitality. Whether seeking a peaceful retreat, hosting a landmark wedding, or dining with loved ones, every destination delivers unmatched quality.
            </p>

            {/* Core Pillars in Glass Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col space-y-2 p-4 rounded-2xl glass-panel border border-[#D4AF37]/30 glass-card-interactive">
                <Compass className="w-5 h-5 text-[#B8860B]" />
                <h4 className="text-xs tracking-widest text-[#1A1814] font-bold uppercase">
                  DESTINATIONS
                </h4>
                <p className="text-[11px] text-[#786C5E]">Shiv Garden, J.P. & Resort Raj</p>
              </div>

              <div className="flex flex-col space-y-2 p-4 rounded-2xl glass-panel border border-[#D4AF37]/30 glass-card-interactive">
                <Sparkles className="w-5 h-5 text-[#B8860B]" />
                <h4 className="text-xs tracking-widest text-[#1A1814] font-bold uppercase">
                  WEDDINGS
                </h4>
                <p className="text-[11px] text-[#786C5E]">Mithila Marriage Ecosystem</p>
              </div>

              <div className="flex flex-col space-y-2 p-4 rounded-2xl glass-panel border border-[#D4AF37]/30 glass-card-interactive">
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
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#1A1814]">
                {/* Auto Crossfade Hotel Images */}
                <AnimatePresence mode="sync">
                  <motion.img
                    key={HOTEL_SLIDES[currentSlide].id}
                    src={HOTEL_SLIDES[currentSlide].image}
                    alt={HOTEL_SLIDES[currentSlide].name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Dark Vignette & Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814]/95 via-[#1A1814]/30 to-transparent pointer-events-none" />

                {/* Top Indicators: 3 Interactive Pills */}
                <div className="absolute top-4 right-4 flex items-center space-x-1.5 z-20">
                  {HOTEL_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        currentSlide === idx
                          ? 'w-7 bg-[#F3E5AB] shadow-md shadow-[#D4AF37]/50'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Top Left Property Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="glass-pill-dark px-3 py-1 rounded-full text-[9px] tracking-[0.25em] font-bold text-[#F3E5AB] uppercase border border-[#D4AF37]/40 shadow-sm backdrop-blur-md">
                    {HOTEL_SLIDES[currentSlide].tag}
                  </span>
                </div>

                {/* Bottom Card Badge with Dynamic Hotel Information */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20 pointer-events-none">
                  <div>
                    <span className="text-[10px] tracking-[0.3em] text-[#F3E5AB] uppercase font-bold flex items-center space-x-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-pulse" />
                      <span>THE VINHARE STANDARD • {currentSlide + 1} OF 3</span>
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={HOTEL_SLIDES[currentSlide].id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h3 className="font-serif-luxury text-2xl md:text-3xl text-white mt-1">
                          {HOTEL_SLIDES[currentSlide].name}
                        </h3>
                        <p className="text-xs font-serif italic text-[#E5D3B3] mt-0.5">
                          {HOTEL_SLIDES[currentSlide].subtitle}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg border border-[#D4AF37]/60 bg-[#1A1814]/85 backdrop-blur-md text-[10px] tracking-widest text-[#F3E5AB] font-mono shadow-md">
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
