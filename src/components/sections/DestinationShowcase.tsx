'use me';
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PROPERTIES } from '../../data/vinhareData';
import { PropertyItem } from '../../types';

interface DestinationShowcaseProps {
  onSelectProperty: (property: PropertyItem) => void;
  onOpenEnquiry: () => void;
}

export const DestinationShowcase: React.FC<DestinationShowcaseProps> = ({
  onSelectProperty,
  onOpenEnquiry,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const resortProperties = PROPERTIES.filter((p) => p.id !== 'mithila-marriage-services');

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#FDFBF7] text-[#1A1814]">
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden py-12 px-6 md:px-12">
        {/* Header Title */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
            <span className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-bold">
              DESTINATION SHOWCASE
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs text-[#52483B] tracking-widest font-semibold">
            <span>SWIPE / SCROLL HORIZONTALLY</span>
            <div className="w-8 h-[2px] bg-[#D4AF37]" />
          </div>
        </div>

        {/* Horizontal Motion Track */}
        <motion.div style={{ x }} className="flex items-center space-x-12 pl-4 md:pl-20 z-10 my-auto">
          {/* Intro Headline Card */}
          <div className="flex-none w-[320px] sm:w-[480px] flex flex-col justify-center">
            <span className="text-sm tracking-[0.3em] text-[#B8860B] uppercase font-bold mb-2">
              EXCELLENCE IN BIHAR
            </span>
            <h2 className="font-serif-luxury text-5xl sm:text-7xl font-light leading-tight text-[#1A1814]">
              ONE GROUP.
            </h2>
            <h2 className="font-serif-luxury text-5xl sm:text-7xl font-light leading-tight text-gold-gradient">
              THREE DESTINATIONS.
            </h2>
            <p className="text-xs md:text-sm text-[#52483B] mt-6 font-light max-w-md leading-relaxed">
              Explore our trio of signature luxury resort properties, engineered for peaceful living, grand celebrations, and royal hospitality.
            </p>
          </div>

          {/* Huge Property Showcase Cards */}
          {resortProperties.map((prop) => (
            <div
              key={prop.id}
              onClick={() => onSelectProperty(prop)}
              data-cursor="VIEW"
              className="flex-none w-[80vw] sm:w-[65vw] lg:w-[50vw] aspect-[16/10] relative rounded-3xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/40 group cursor-pointer shadow-[0_20px_50px_rgba(184,134,11,0.15)]"
            >
              <img
                src={prop.image}
                alt={prop.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814] via-[#1A1814]/40 to-transparent opacity-85" />

              <div className="absolute top-8 left-8">
                <span className="px-4 py-1.5 rounded-full text-xs tracking-[0.25em] font-bold text-[#F3E5AB] bg-[#1A1814]/85 border border-[#D4AF37]/40 uppercase backdrop-blur-md">
                  {prop.type}
                </span>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="max-w-xl">
                  <h3 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white group-hover:text-[#F3E5AB] transition-colors">
                    {prop.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EADCC9]/90 font-serif italic mt-1">
                    "{prop.tagline}"
                  </p>
                </div>

                <button className="px-6 py-3 rounded-full bg-[#D4AF37] text-white text-xs tracking-[0.2em] font-bold uppercase flex items-center space-x-2 hover:bg-[#B8860B] transition-colors flex-shrink-0 shadow-md">
                  <span>EXPLORE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* End Conclusion CTA Card */}
          <div className="flex-none w-[340px] sm:w-[450px] aspect-[16/10] rounded-3xl glass-panel-gold border-2 border-[#D4AF37]/50 p-10 flex flex-col justify-between items-start text-left shadow-[0_20px_50px_rgba(184,134,11,0.15)]">
            <div>
              <span className="text-xs tracking-[0.3em] text-[#B8860B] uppercase font-bold">
                YOUR VINHARE JOURNEY
              </span>
              <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#1A1814] mt-3 font-light">
                WHERE WILL YOU GO?
              </h2>
              <p className="text-xs text-[#52483B] mt-4 font-light leading-relaxed">
                Connect with our dedicated concierge desk to reserve suites, schedule site visits, or plan your event.
              </p>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="w-full py-4 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-semibold text-xs tracking-[0.25em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(184,134,11,0.3)] transition-colors flex items-center justify-center space-x-2"
            >
              <span>TALK TO CONCIERGE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Progress Bar Indicator at Bottom */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20 pt-4 border-t border-[#D4AF37]/30">
          <span className="text-[11px] tracking-widest text-[#B8860B] font-bold">01 — 03 PROPERTIES</span>
          <div className="w-48 h-[3px] bg-[#EAE4D9] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#D4AF37]"
              style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
            />
          </div>
          <span className="text-[11px] tracking-widest text-[#B8860B] font-bold">BIHAR, INDIA</span>
        </div>
      </div>
    </section>
  );
};
