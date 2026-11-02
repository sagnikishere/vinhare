'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NETWORK_LOCATIONS, PROPERTIES } from '../../data/vinhareData';
import { NetworkLocation, PropertyItem } from '../../types';
import { MapPin, ArrowRight, Sparkles, Navigation } from 'lucide-react';

interface NetworkMapSectionProps {
  onSelectProperty: (property: PropertyItem) => void;
}

export const NetworkMapSection: React.FC<NetworkMapSectionProps> = ({
  onSelectProperty,
}) => {
  const [selectedLoc, setSelectedLoc] = useState<NetworkLocation>(
    NETWORK_LOCATIONS[0]
  );

  const handleExplore = (propertyName: string) => {
    const matched = PROPERTIES.find((p) => p.name === propertyName);
    if (matched) onSelectProperty(matched);
  };

  return (
    <section
      id="network"
      className="relative py-32 bg-[#FDFBF7] text-[#1A1814] overflow-hidden border-t border-[#D4AF37]/25"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="h-[1.5px] w-10 bg-[#B8860B]" />
            <span className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-bold">
              REGIONAL PRESENCE
            </span>
            <div className="h-[1.5px] w-10 bg-[#B8860B]" />
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl tracking-[0.08em] text-[#1A1814] font-light">
            ONE GROUP. MULTIPLE DESTINATIONS.
          </h2>

          <p className="text-xs sm:text-sm text-[#52483B] mt-3 font-light leading-relaxed">
            Centered across Bihar, India — connecting landmark resorts and celebration destinations under the Vinhare ecosystem.
          </p>
        </div>

        {/* Interactive Network Map Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Map Graphic Box in Glassmorphism */}
          <div className="lg:col-span-7 h-[420px] md:h-[500px] relative rounded-3xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/45 shadow-[0_25px_60px_rgba(184,134,11,0.16)] p-6 flex flex-col justify-between">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#EAE4D9_1px,transparent_1px),linear-gradient(to_bottom,#EAE4D9_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 pointer-events-none" />

            {/* Glowing Center Radial */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Region Title Overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="glass-pill px-3.5 py-1.5 rounded-full text-[10px] tracking-widest text-[#B8860B] font-bold uppercase shadow-sm">
                BIHAR, INDIA REGIONAL MAP
              </span>
              <Navigation className="w-4 h-4 text-[#B8860B]" />
            </div>

            {/* Interactive Pins Floating on Map Canvas */}
            <div className="absolute inset-0 z-10">
              {NETWORK_LOCATIONS.map((loc) => {
                const isSelected = selectedLoc.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLoc(loc)}
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    data-cursor="SELECT"
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  >
                    {/* Glowing Pulse Ring */}
                    <div
                      className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#D4AF37] text-white shadow-[0_0_25px_#D4AF37] scale-125 border-2 border-white'
                          : 'glass-panel text-[#B8860B] border border-[#D4AF37]/60 hover:scale-110 shadow-md'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>

                    {/* Tooltip Badge */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-full glass-pill-dark border border-[#D4AF37]/40 text-[10px] tracking-widest text-[#F3E5AB] uppercase whitespace-nowrap transition-opacity duration-200 shadow-lg ${
                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {loc.name}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative z-10 text-[10px] text-[#786C5E] tracking-widest font-bold uppercase glass-pill px-3 py-1 rounded-full self-start">
              SELECT LOCATION PIN TO INSPECT DESTINATION
            </div>
          </div>

          {/* Right Selected Property Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLoc.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl glass-panel-gold border-2 border-[#D4AF37]/45 p-6 shadow-[0_25px_60px_rgba(184,134,11,0.18)] flex flex-col space-y-4"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src={selectedLoc.image}
                    alt={selectedLoc.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4">
                    <span className="glass-pill-dark px-3 py-1 rounded-full text-[10px] tracking-widest font-bold text-[#F3E5AB] border border-[#D4AF37]/40 uppercase shadow-md">
                      {selectedLoc.type}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.3em] text-[#B8860B] uppercase font-bold">
                    {selectedLoc.region}
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-light text-[#1A1814] mt-0.5">
                    {selectedLoc.name}
                  </h3>
                  <p className="text-xs text-[#52483B] font-light leading-relaxed mt-2">
                    {selectedLoc.description}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleExplore(selectedLoc.property)}
                    className="w-full py-3.5 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-semibold text-xs tracking-[0.2em] uppercase rounded-full hover:shadow-[0_10px_25px_rgba(184,134,11,0.35)] transition-all flex items-center justify-center space-x-2 border border-[#D4AF37]/50"
                  >
                    <span>EXPLORE PROPERTY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
