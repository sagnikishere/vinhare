'use me';
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WeddingTransitionCanvas } from '../3d/WeddingTransitionCanvas';
import { PROPERTIES } from '../../data/vinhareData';
import { PropertyItem } from '../../types';

interface WeddingsSectionProps {
  onOpenEnquiry: (option?: string) => void;
  onSelectProperty: (property: PropertyItem) => void;
}

export const WeddingsSection: React.FC<WeddingsSectionProps> = ({
  onOpenEnquiry,
  onSelectProperty,
}) => {
  const mithilaProperty = PROPERTIES.find((p) => p.id === 'mithila-marriage-services')!;

  return (
    <section
      id="weddings"
      className="relative py-32 bg-[#FDFBF7] text-[#1A1814] overflow-hidden border-t border-[#D4AF37]/25"
    >
      {/* 3D Rotating Golden Architectural Motif Transition */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <WeddingTransitionCanvas />
        </motion.div>
      </div>

      {/* Atmospheric Glowing Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 -mt-12">
        {/* Main Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-white/90 backdrop-blur-md mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span className="text-[11px] tracking-[0.35em] text-[#B8860B] font-bold uppercase">
              CELEBRATIONS & SACRED RITES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl tracking-[0.08em] font-light leading-none text-[#1A1814]"
          >
            YOUR MOMENT.
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl tracking-[0.08em] font-light leading-none text-gold-gradient my-2"
          >
            YOUR STORY.
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl tracking-[0.08em] font-light leading-none text-[#1A1814]"
          >
            YOUR VINHARE.
          </motion.h2>
        </div>

        {/* Feature Hero Card for Mithila Marriage Services */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/40 p-8 lg:p-12 shadow-[0_20px_60px_rgba(184,134,11,0.15)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Image Feature */}
            <div
              onClick={() => onSelectProperty(mithilaProperty)}
              data-cursor="WEDDING"
              className="lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-sm"
            >
              <img
                src={mithilaProperty.image}
                alt="Mithila Marriage Services Mandap Setup"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814]/80 via-transparent to-transparent opacity-70" />

              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 rounded-full text-xs tracking-[0.25em] font-bold text-[#F3E5AB] bg-[#1A1814]/80 backdrop-blur-md border border-[#D4AF37]/40 uppercase">
                  MITHILA MARRIAGE ECOSYSTEM
                </span>
              </div>
            </div>

            {/* Right Narrative Content */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div>
                <span className="text-xs tracking-[0.3em] text-[#B8860B] uppercase font-bold">
                  WEDDINGS BY VINHARE
                </span>
                <h3 className="font-serif-luxury text-4xl sm:text-5xl font-light text-[#1A1814] mt-1">
                  MITHILA MARRIAGE SERVICES
                </h3>
              </div>

              <p className="text-base text-[#2C261E] font-serif italic leading-relaxed">
                "From intimate ceremonies to grand celebrations, create moments that deserve to be remembered."
              </p>

              <p className="text-xs sm:text-sm text-[#52483B] font-light leading-relaxed">
                Combining cultural heritage, opulent mandap craftsmanship, and end-to-end event execution across our premier resort properties in Bihar.
              </p>

              {/* Service Features Checkmarks */}
              <div className="space-y-3 pt-2">
                {[
                  'Royal Mandap Architecture & Floral Styling',
                  'Gourmet Festive Feast & Catering Services',
                  'Bridal & Groom Preparatory Suite Facilities',
                  'Cinematic Lighting & Sound Management',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs text-[#1A1814] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={() => onOpenEnquiry('Mithila Marriage Services')}
                  data-cursor="PLAN"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white font-semibold text-xs tracking-[0.25em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(184,134,11,0.3)] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>PLAN YOUR WEDDING</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectProperty(mithilaProperty)}
                  className="w-full sm:w-auto px-6 py-4 border-2 border-[#D4AF37] text-[#1A1814] hover:text-[#B8860B] hover:border-[#B8860B] text-xs tracking-[0.2em] font-semibold uppercase rounded-full transition-colors bg-white/80"
                >
                  VIEW WEDDING DETAILS
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
