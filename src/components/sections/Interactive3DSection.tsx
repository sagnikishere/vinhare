'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ResortModel } from '../3d/ResortModel';
import { HotspotItem } from '../../types';
import { HOTSPOTS_DATA } from '../../data/vinhareData';
import { CheckCircle2, RotateCcw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Interactive3DSection: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotItem | null>(
    HOTSPOTS_DATA[0]
  );

  return (
    <section
      id="interactive-3d"
      className="relative py-32 bg-[#FDFBF7] text-[#1A1814] overflow-hidden border-t border-[#D4AF37]/25"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="h-[1.5px] w-10 bg-[#B8860B]" />
            <span className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-bold">
              3D ARCHITECTURAL EXPLORER
            </span>
            <div className="h-[1.5px] w-10 bg-[#B8860B]" />
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl tracking-[0.08em] text-[#1A1814] font-light">
            THE VINHARE WORLD
          </h2>

          <p className="text-xs sm:text-sm text-[#52483B] mt-3 font-light leading-relaxed">
            Drag to rotate the 3D architectural resort representation. Click on any hotspot to inspect amenity features.
          </p>
        </div>

        {/* 3D Canvas & Hotspot Detail Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left / Main 3D Canvas Container */}
          <div className="lg:col-span-7 h-[450px] md:h-[550px] relative rounded-3xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/45 shadow-[0_25px_60px_rgba(184,134,11,0.16)]">
            <Canvas
              camera={{ position: [0, 4, 10], fov: 45 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ResortModel
                  selectedHotspot={selectedHotspot}
                  onSelectHotspot={(spot) => setSelectedHotspot(spot)}
                />
              </Suspense>
            </Canvas>

            {/* Helper Drag Overlay Tag */}
            <div className="absolute bottom-4 left-4 flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#D4AF37]/50 text-[10px] tracking-widest text-[#B8860B] font-bold uppercase pointer-events-none shadow-md">
              <RotateCcw className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>3D INTERACTIVE • ROTATE TO EXPLORE</span>
            </div>
          </div>

          {/* Right Hotspot Interactive Card Details */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {selectedHotspot && (
                <motion.div
                  key={selectedHotspot.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl glass-panel-gold border-2 border-[#D4AF37]/45 p-8 shadow-[0_25px_60px_rgba(184,134,11,0.18)]"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
                    <span className="text-[10px] tracking-[0.3em] font-bold text-[#B8860B] uppercase">
                      HOTSPOT INFO
                    </span>
                    <span className="text-xs text-[#8C8275] font-mono glass-pill px-2.5 py-0.5 rounded-full">
                      {selectedHotspot.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-3xl font-light text-[#1A1814] mt-4">
                    {selectedHotspot.title}
                  </h3>

                  <p className="text-xs text-[#B8860B] font-serif italic mt-0.5 font-medium">
                    "{selectedHotspot.subtitle}"
                  </p>

                  <p className="text-xs text-[#52483B] font-light leading-relaxed my-4">
                    {selectedHotspot.description}
                  </p>

                  {/* Highlights Bullet List in Glass Chips */}
                  <div className="space-y-2 pt-2">
                    {selectedHotspot.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2.5 p-2.5 rounded-xl glass-panel border border-[#D4AF37]/20 text-xs text-[#1A1814] font-medium shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Hotspot Tab Selectors */}
                  <div className="grid grid-cols-4 gap-2 pt-5 mt-5 border-t border-[#D4AF37]/30">
                    {HOTSPOTS_DATA.map((spot) => (
                      <button
                        key={spot.id}
                        onClick={() => setSelectedHotspot(spot)}
                        className={`py-2 text-[10px] tracking-widest font-bold uppercase rounded-xl transition-all ${
                          selectedHotspot.id === spot.id
                            ? 'bg-[#D4AF37] text-white shadow-md border border-[#D4AF37]'
                            : 'glass-panel text-[#786C5E] border border-[#D4AF37]/25 hover:text-[#B8860B] hover:border-[#D4AF37]/50'
                        }`}
                      >
                        {spot.id}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
