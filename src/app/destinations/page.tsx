'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  Camera,
  Calendar,
  Users,
  Award,
} from 'lucide-react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { EnquiryModal } from '../../components/modals/EnquiryModal';
import { PropertyDetailModal } from '../../components/modals/PropertyDetailModal';
import { CustomCursor } from '../../components/ui/CustomCursor';
import { SmoothScrollProvider } from '../../components/providers/SmoothScrollProvider';
import { BackToTop } from '../../components/ui/BackToTop';
import { PROPERTIES, BRAND_INFO } from '../../data/vinhareData';
import { PropertyItem } from '../../types';
import Link from 'next/link';

export default function DestinationsPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryPreselect, setEnquiryPreselect] = useState<string | undefined>(undefined);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);

  const resortProperties = PROPERTIES.filter((p) => p.id !== 'mithila-marriage-services');

  const handleOpenEnquiry = (propertyPreselect?: string) => {
    setEnquiryPreselect(propertyPreselect);
    setIsEnquiryOpen(true);
  };

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar onOpenEnquiry={() => handleOpenEnquiry('General Enquiry')} />

      <main className="min-h-screen bg-[#FDFBF7] text-[#1A1814] pt-28 pb-20 overflow-hidden">
        {/* Page Header */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pt-6 pb-12 border-b border-[#D4AF37]/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF4E6] border border-[#D4AF37]/50 mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-bold text-[#B8860B] uppercase">
                  OUR SIGNATURE RESORTS • BIHAR
                </span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#1A1814] tracking-[0.05em] leading-tight">
                OUR DESTINATIONS
              </h1>

              <p className="text-sm sm:text-base font-light text-[#52483B] mt-3 leading-relaxed">
                Three iconic luxury properties across Bihar, each crafted with specialized architecture, expansive celebration grounds, and serene stay comfort.
              </p>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0">
              <Link
                href="/gallery"
                className="px-6 py-3 rounded-full glass-pill border border-[#D4AF37]/60 text-[#B8860B] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-white transition-all flex items-center space-x-2 shadow-sm"
              >
                <Camera className="w-4 h-4" />
                <span>VIEW REAL PHOTO ARCHIVE</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Detailed Property Showcases */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-14 space-y-24">
          {resortProperties.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center pb-20 border-b border-[#D4AF37]/25 last:border-b-0"
            >
              {/* Left Column: Image Gallery Preview */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div
                  onClick={() => setSelectedProperty(prop)}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/40 shadow-2xl group cursor-pointer"
                >
                  <img
                    src={prop.image}
                    alt={prop.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="glass-pill-dark px-3.5 py-1.5 rounded-full text-[10px] tracking-wider font-bold text-[#F3E5AB] uppercase border border-[#D4AF37]/40">
                      {prop.type}
                    </span>
                    {prop.id === 'shiv-garden-resort' && (
                      <span className="bg-[#B8860B] text-white px-3.5 py-1.5 rounded-full text-[10px] tracking-wider font-bold uppercase shadow-md flex items-center space-x-1">
                        <Camera className="w-3.5 h-3.5" />
                        <span>18 REAL PHOTOS</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-serif italic text-base text-[#F3E5AB]">
                      "{prop.tagline}"
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] tracking-widest uppercase font-bold flex items-center space-x-1">
                      <span>EXPAND</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Thumbnails row for this property */}
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {prop.gallery.slice(0, 4).map((thumb, tIdx) => (
                    <div
                      key={tIdx}
                      onClick={() => setSelectedProperty(prop)}
                      className="aspect-[4/3] rounded-xl overflow-hidden border border-[#D4AF37]/30 shadow-sm cursor-pointer group"
                    >
                      <img
                        src={thumb}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Property Content & Booking */}
              <div className={`lg:col-span-5 flex flex-col space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <div className="flex items-center space-x-2 text-[#B8860B] text-xs tracking-[0.25em] uppercase font-bold mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{prop.location}</span>
                  </div>

                  <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#1A1814] leading-tight">
                    {prop.name}
                  </h2>
                  <p className="text-sm font-serif italic text-[#B8860B] mt-1 font-medium">
                    {prop.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#4A4033] font-light leading-relaxed">
                  {prop.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 pt-2 border-t border-[#D4AF37]/25">
                  <h4 className="text-xs tracking-wider uppercase font-bold text-[#8C7A65]">
                    KEY AMENITIES & FEATURES
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {prop.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2 text-xs text-[#2C241B]">
                        <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() => handleOpenEnquiry(prop.name)}
                    className="px-6 py-3.5 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all border border-[#D4AF37]/50"
                  >
                    BOOK / ENQUIRE
                  </button>

                  <button
                    onClick={() => setSelectedProperty(prop)}
                    className="px-6 py-3.5 border border-[#D4AF37]/50 text-[#B8860B] hover:bg-[#D4AF37] hover:text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all shadow-sm"
                  >
                    VIEW FULL DETAILS
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Bottom Banner */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1A1814] via-[#2A241D] to-[#1A1814] text-white border-2 border-[#D4AF37]/45 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-bold text-[#D4AF37] uppercase">
                EXPERIENCE THE REAL SPACES
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#FDFBF7] mt-1">
                Explore The Complete Photo Gallery
              </h3>
              <p className="text-xs sm:text-sm text-[#D8CFBC] font-light max-w-xl mt-2 leading-relaxed">
                Browse our visual archive featuring all 18 authentic high-definition photographs of Shiv Garden Resort and other landmark venues.
              </p>
            </div>

            <Link
              href="/gallery"
              className="px-8 py-4 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:scale-105 transition-all flex items-center space-x-2 flex-shrink-0"
            >
              <span>EXPLORE ALL PHOTOS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer onOpenEnquiry={() => handleOpenEnquiry('General Enquiry')} />
      <BackToTop />
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedOption={enquiryPreselect}
      />
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenEnquiry={(name) => handleOpenEnquiry(name)}
      />
    </SmoothScrollProvider>
  );
}
