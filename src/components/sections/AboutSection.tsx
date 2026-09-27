'use me';
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_INFO } from '../../data/vinhareData';
import { Phone, MapPin, Award, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-32 bg-[#FDFBF7] text-[#1A1814] overflow-hidden border-t border-[#D4AF37]/25"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Large Media Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(184,134,11,0.15)]"
          >
            <img
              src="/images/hero_resort.jpg"
              alt="Vinhare Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814]/90 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-sm">
              <span className="text-[10px] tracking-[0.3em] font-bold text-[#B8860B] uppercase">
                PARENT BRAND
              </span>
              <h4 className="font-serif-luxury text-2xl text-[#1A1814] font-light mt-1">
                {BRAND_INFO.parentName}
              </h4>
              <p className="text-xs text-[#52483B] mt-1 font-light">
                {BRAND_INFO.taglineSecondary}
              </p>
            </div>
          </motion.div>

          {/* Right Editorial Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col space-y-6"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-[1.5px] w-10 bg-[#B8860B]" />
                <span className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-bold">
                  THE VINHARE STORY
                </span>
              </div>

              <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light text-[#1A1814] leading-tight">
                BUILDING DESTINATIONS WHERE PEOPLE COME TOGETHER.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#2C261E] font-serif italic font-light leading-relaxed">
              "Vinhare is the parent hospitality brand unifying premier resorts, event spaces, and wedding services across Bihar, India."
            </p>

            <p className="text-xs sm:text-sm text-[#52483B] font-light leading-relaxed">
              Under the Vinhare umbrella, guests discover Shiv Garden Resort, J.P. Resort, Resort Raj, and Mithila Marriage Services. Each property is crafted to deliver exceptional guest comfort, royal architecture, and impeccable event management without compromise.
            </p>

            {/* Verified Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#D4AF37]/30">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold tracking-wider text-[#1A1814] uppercase">
                    4 ECOSYSTEM PROPERTIES
                  </h5>
                  <p className="text-[11px] text-[#786C5E]">
                    Shiv Garden, J.P., Resort Raj & Mithila Marriage
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold tracking-wider text-[#1A1814] uppercase">
                    BIHAR CENTRAL HUB
                  </h5>
                  <p className="text-[11px] text-[#786C5E]">
                    {BRAND_INFO.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Hotline */}
            <div className="p-6 rounded-2xl glass-panel-gold border-2 border-[#D4AF37]/40 flex items-center justify-between mt-4 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-[#D4AF37]/20 text-[#B8860B]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-widest text-[#B8860B] uppercase font-bold">
                    DIRECT CONCIERGE LINE
                  </span>
                  <p className="font-serif-luxury text-xl text-[#1A1814] font-medium">
                    {BRAND_INFO.phoneFormatted}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
