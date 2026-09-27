'use me';
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from '../../data/vinhareData';
import { GalleryItem } from '../../types';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    'ALL' | 'RESORTS' | 'WEDDINGS' | 'EVENTS' | 'EXPERIENCES'
  >('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['ALL', 'RESORTS', 'WEDDINGS', 'EVENTS', 'EXPERIENCES'] as const;

  const filteredItems =
    activeCategory === 'ALL'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightboxItem = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevLightboxItem = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section
      id="gallery"
      className="relative py-32 bg-[#FDFBF7] text-[#1A1814] overflow-hidden border-t border-[#D4AF37]/25"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#D4AF37]/30">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-[1.5px] w-10 bg-[#B8860B]" />
              <span className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-bold">
                VISUAL ANTHOLOGY
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl tracking-[0.08em] text-[#1A1814] font-light">
              MOMENTS AT VINHARE
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-white shadow-md'
                    : 'bg-white text-[#786C5E] border border-[#D4AF37]/30 hover:border-[#B8860B] hover:text-[#1A1814]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => openLightbox(idx)}
                data-cursor="EXPAND"
                className="relative rounded-2xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/35 group cursor-pointer break-inside-avoid shadow-[0_15px_40px_rgba(184,134,11,0.12)]"
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    item.aspect === 'tall'
                      ? 'aspect-[3/4]'
                      : item.aspect === 'wide'
                      ? 'aspect-[16/10]'
                      : 'aspect-square'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/90 text-[#B8860B] shadow-sm">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex flex-col">
                    <span className="text-[10px] tracking-[0.25em] text-[#F3E5AB] font-bold uppercase">
                      {item.property}
                    </span>
                    <h4 className="font-serif-luxury text-xl text-white font-light mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-white/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 text-[#1A1814]"
          >
            {/* Top Lightbox Header */}
            <div className="flex items-center justify-between z-20">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-4 h-4 text-[#B8860B]" />
                <span className="text-xs tracking-[0.3em] text-[#B8860B] uppercase font-bold">
                  VINHARE GALLERY • {lightboxIndex + 1} OF {filteredItems.length}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="p-3 rounded-full border border-[#D4AF37]/50 text-[#B8860B] hover:bg-[#D4AF37] hover:text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Center Image */}
            <div className="relative flex-1 flex items-center justify-center my-6 z-10">
              <button
                onClick={prevLightboxItem}
                className="absolute left-0 md:left-6 z-20 p-4 rounded-full border border-[#D4AF37]/50 bg-white/90 text-[#B8860B] hover:bg-[#D4AF37] hover:text-white transition-colors shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={filteredItems[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl border-2 border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(184,134,11,0.2)]"
              />

              <button
                onClick={nextLightboxItem}
                className="absolute right-0 md:right-6 z-20 p-4 rounded-full border border-[#D4AF37]/50 bg-white/90 text-[#B8860B] hover:bg-[#D4AF37] hover:text-white transition-colors shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="text-center z-20">
              <span className="text-xs tracking-[0.25em] text-[#B8860B] uppercase font-bold">
                {filteredItems[lightboxIndex].property}
              </span>
              <h3 className="font-serif-luxury text-2xl md:text-3xl font-light text-[#1A1814]">
                {filteredItems[lightboxIndex].title}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
