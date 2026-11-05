'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Phone,
  Calendar,
  Flower2,
  UtensilsCrossed,
  Music,
  Camera,
} from 'lucide-react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { EnquiryModal } from '../../components/modals/EnquiryModal';
import { CustomCursor } from '../../components/ui/CustomCursor';
import { SmoothScrollProvider } from '../../components/providers/SmoothScrollProvider';
import { BackToTop } from '../../components/ui/BackToTop';
import { BRAND_INFO } from '../../data/vinhareData';
import Link from 'next/link';

export default function WeddingsPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const weddingPillars = [
    {
      icon: <Flower2 className="w-6 h-6 text-[#B8860B]" />,
      title: 'Sacred Mandap Artistry',
      desc: 'Bespoke floral styling, gold pillar canopies, and culturally authentic ceremony staging tailored to traditional rituals.',
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6 text-[#B8860B]" />,
      title: 'Feasts & Gourmet Banqueting',
      desc: 'Multi-course celebratory feasts blending beloved Bihari heritage recipes with North Indian royal culinary excellence.',
    },
    {
      icon: <Music className="w-6 h-6 text-[#B8860B]" />,
      title: 'Baraat & Sangeet Staging',
      desc: 'Grand procession avenues, acoustic stage infrastructure, and atmospheric evening lighting for unforgettable celebrations.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#B8860B]" />,
      title: 'Bridal & Groom Holding Suites',
      desc: 'Plush preparatory suites equipped with salon vanity staging and private lounge comfort for the couple and families.',
    },
  ];

  const weddingPhotos = [
    {
      title: 'Shiv Garden Resort - Grand Celebration Lawn',
      url: '/images/shiv-garden/IMG_2974.jpg',
      tag: 'Shiv Garden Lawns',
    },
    {
      title: 'J.P. Resort - Grand Wedding Mandap & Floral Stage',
      url: '/images/jp-resort/IMG_3992.jpg',
      tag: 'J.P. Celebration Pavilion',
    },
    {
      title: 'Resort Raj - Rock Garden & Royal Celebration Lawns',
      url: '/images/raj-resort/DSC_1844.webp',
      tag: 'Resort Raj Grounds',
    },
    {
      title: 'Shiv Garden Resort - Golden Night Illumination',
      url: '/images/shiv_garden_night.jpeg',
      tag: 'Night Staging',
    },
    {
      title: 'J.P. Resort - Ceremonial Stage & Traditional Mural',
      url: '/images/jp-resort/IMG_3996.jpg',
      tag: 'J.P. Royal Mandap',
    },
    {
      title: 'Resort Raj - Palace Promenade & Fine Art Corridor',
      url: '/images/raj-resort/DSC_1760.webp',
      tag: 'Resort Raj Banquets',
    },
  ];

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      <main className="min-h-screen bg-[#FDFBF7] text-[#1A1814] pt-28 pb-20 overflow-hidden">
        {/* Header Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pt-6 pb-12 border-b border-[#D4AF37]/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF4E6] border border-[#D4AF37]/50 mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-bold text-[#B8860B] uppercase">
                  MITHILA MARRIAGE SERVICES • ROYAL WEDDINGS
                </span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#1A1814] tracking-[0.05em] leading-tight">
                CELEBRATIONS OF ROYAL GRACE
              </h1>

              <p className="text-sm sm:text-base font-light text-[#52483B] mt-3 leading-relaxed">
                Transforming life’s most sacred milestones into unforgettable celebrations across our landmark resorts. From expansive manicured lawns at <strong className="font-semibold text-[#B8860B]">Shiv Garden Resort</strong> to heritage banquets at Resort Raj.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="px-7 py-3.5 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2 border border-[#D4AF37]/50"
              >
                <span>PLAN YOUR WEDDING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Wedding Highlights Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
          <h2 className="text-xs tracking-[0.3em] font-bold text-[#B8860B] uppercase mb-8">
            END-TO-END CELEBRATION ECOSYSTEM
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weddingPillars.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl glass-panel-gold border-2 border-[#D4AF37]/35 shadow-sm hover:border-[#D4AF37] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 rounded-2xl bg-[#FAF4E6] border border-[#D4AF37]/40 w-fit mb-5 shadow-sm">
                    {p.icon}
                  </div>
                  <h3 className="font-serif-luxury text-xl text-[#1A1814] font-medium leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#52483B] font-light mt-2.5 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Photo Gallery Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D4AF37]/25">
            <div>
              <span className="text-xs tracking-[0.3em] text-[#B8860B] uppercase font-bold">
                VISUAL ANTHOLOGY
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1814] font-light mt-1">
                Iconic Wedding Venues & Setups
              </h2>
            </div>

            <Link
              href="/gallery"
              className="text-xs font-bold tracking-wider text-[#B8860B] uppercase flex items-center space-x-1.5 hover:underline"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weddingPhotos.map((photo, pIdx) => (
              <div
                key={pIdx}
                className="aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-[#D4AF37]/35 shadow-md relative group cursor-pointer"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider bg-black/60 text-[#F3E5AB] backdrop-blur-md uppercase border border-white/20">
                    {photo.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-light">
                  <p className="line-clamp-1 text-[#FDFBF7]">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1A1814] via-[#2A241D] to-[#1A1814] text-white border-2 border-[#D4AF37]/45 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-bold text-[#D4AF37] uppercase">
                YOUR SACRED STORY BEGINS HERE
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#FDFBF7] mt-1">
                Schedule a Wedding Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#D8CFBC] font-light max-w-xl mt-2 leading-relaxed">
                Speak directly with our chief celebration planners. We coordinate dates, lawn staging, guest accommodation, and catering seamlessly.
              </p>
            </div>

            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:scale-105 transition-all flex items-center space-x-2 flex-shrink-0 cursor-pointer"
            >
              <span>ENQUIRE FOR WEDDINGS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <Footer onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <BackToTop />
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedOption="Mithila Marriage Services"
      />
    </SmoothScrollProvider>
  );
}
