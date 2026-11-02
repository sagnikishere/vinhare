'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertyItem } from '../../types';
import { X, MapPin, Phone, CheckCircle2, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { BRAND_INFO } from '../../data/vinhareData';

interface PropertyDetailModalProps {
  property: PropertyItem | null;
  onClose: () => void;
  onOpenEnquiry: (propertySlug?: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onOpenEnquiry,
}) => {
  if (!property) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-[#FDFBF7] text-[#1A1814] overflow-y-auto"
      >
        {/* Top Floating Close Bar in Glassmorphic Dock */}
        <div className="sticky top-0 z-50 bg-white/75 backdrop-blur-2xl border-b border-[#D4AF37]/35 py-3.5 px-6 md:px-12 flex items-center justify-between shadow-[0_4px_20px_rgba(184,134,11,0.06)]">
          <div className="flex items-center space-x-3">
            <span className="font-serif-luxury text-xl text-[#B8860B]">VINHARE</span>
            <span className="text-xs text-[#8C8275]">/</span>
            <span className="text-xs tracking-widest text-[#1A1814] uppercase font-bold">
              {property.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="glass-pill flex items-center space-x-2 px-4 py-2 rounded-full border border-[#D4AF37]/60 text-[#B8860B] hover:bg-[#D4AF37] hover:text-white transition-all text-xs tracking-widest uppercase font-bold shadow-sm"
          >
            <span>CLOSE PROPERTY</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Banner Section */}
        <div className="relative h-[65vh] w-full overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#1A1814]/40 to-transparent" />

          <div className="absolute bottom-12 left-6 md:left-12 right-6 max-w-5xl">
            <span className="glass-pill-dark px-4 py-1.5 rounded-full text-xs tracking-[0.3em] font-bold text-[#F3E5AB] border border-[#D4AF37]/45 shadow-lg uppercase">
              {property.type}
            </span>

            <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl tracking-[0.05em] text-[#1A1814] font-light mt-3 drop-shadow-sm">
              {property.name}
            </h1>

            <p className="text-lg md:text-2xl font-serif text-[#B8860B] italic mt-2 font-medium">
              "{property.tagline}"
            </p>
          </div>
        </div>

        {/* Property Overview Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Main Overview */}
            <div className="lg:col-span-8 flex flex-col space-y-10">
              <div>
                <h3 className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-bold mb-3">
                  PROPERTY OVERVIEW
                </h3>
                <p className="text-lg md:text-xl font-light text-[#2C261E] leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Highlights Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {property.highlights.map((h, idx) => (
                  <div key={idx} className="p-6 rounded-2xl glass-panel-gold border-2 border-[#D4AF37]/35 shadow-sm glass-card-interactive">
                    <h4 className="font-serif-luxury text-xl text-[#1A1814] mb-2 font-medium">{h.title}</h4>
                    <p className="text-xs text-[#52483B] leading-relaxed font-light">{h.desc}</p>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="p-8 rounded-3xl glass-panel-gold border-2 border-[#D4AF37]/45 shadow-md">
                <h4 className="text-xs tracking-[0.3em] text-[#B8860B] uppercase font-bold mb-4">
                  KEY FEATURES & AMENITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl glass-panel border border-[#D4AF37]/25 text-xs text-[#1A1814] font-medium shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Image Gallery Grid */}
              <div>
                <h3 className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-bold mb-6">
                  PROPERTY GALLERY
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {property.gallery.map((imgUrl, idx) => (
                    <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden glass-panel border-2 border-[#D4AF37]/35 shadow-sm group">
                      <img src={imgUrl} alt={`${property.name} ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sticky Enquiry Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 p-8 rounded-3xl glass-panel-gold border-2 border-[#D4AF37]/45 flex flex-col space-y-6 shadow-[0_25px_60px_rgba(184,134,11,0.18)]">
                <div>
                  <span className="text-[10px] tracking-[0.3em] font-bold text-[#B8860B] uppercase">
                    RESERVATIONS & EVENTS
                  </span>
                  <h4 className="font-serif-luxury text-3xl font-light text-[#1A1814] mt-1">
                    Book {property.name}
                  </h4>
                </div>

                <div className="space-y-3 pt-2 text-xs text-[#1A1814]">
                  <div className="flex items-center space-x-3 p-3 rounded-xl glass-panel border border-[#D4AF37]/25">
                    <MapPin className="w-4 h-4 text-[#B8860B]" />
                    <span className="font-medium">{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl glass-panel border border-[#D4AF37]/25">
                    <Phone className="w-4 h-4 text-[#B8860B]" />
                    <span className="font-bold">{BRAND_INFO.phoneFormatted}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenEnquiry(property.name)}
                  className="w-full py-4 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white font-bold text-xs tracking-[0.25em] uppercase rounded-full hover:shadow-[0_10px_25px_rgba(184,134,11,0.35)] transition-all flex items-center justify-center space-x-2 border border-[#D4AF37]/50"
                >
                  <span>SEND ENQUIRY FOR PROPERTY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
