'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Award,
  ShieldCheck,
  HeartHandshake,
  MapPin,
  Phone,
  ArrowRight,
  Clock,
  Compass,
} from 'lucide-react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { EnquiryModal } from '../../components/modals/EnquiryModal';
import { CustomCursor } from '../../components/ui/CustomCursor';
import { SmoothScrollProvider } from '../../components/providers/SmoothScrollProvider';
import { BackToTop } from '../../components/ui/BackToTop';
import { BRAND_INFO } from '../../data/vinhareData';
import Link from 'next/link';

export default function AboutPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-[#B8860B]" />,
      title: 'Delivering Excellence',
      desc: 'Uncompromising commitment to genuine hospitality, pristine cleanliness, and regal attention to guest comfort.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#B8860B]" />,
      title: 'Authentic Indian Hospitality',
      desc: 'Rooted in the timeless principle of Atithi Devo Bhava, welcoming every family with warmth and dignity.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#B8860B]" />,
      title: 'Scale & Reliability',
      desc: 'Proven infrastructure capable of effortlessly hosting thousands of celebration attendees with secure coordination.',
    },
    {
      icon: <Compass className="w-6 h-6 text-[#B8860B]" />,
      title: 'Multiple Landmark Venues',
      desc: 'A cohesive ecosystem of resorts across Bihar offering specialized destinations for stays, marriages, and corporate retreats.',
    },
  ];

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      <main className="min-h-screen bg-[#FDFBF7] text-[#1A1814] pt-28 pb-20 overflow-hidden">
        {/* Header Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pt-6 pb-12 border-b border-[#D4AF37]/30">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF4E6] border border-[#D4AF37]/50 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-bold text-[#B8860B] uppercase">
                THE VINHARE STORY
              </span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#1A1814] tracking-[0.05em] leading-tight">
              ONE GROUP. MULTIPLE DESTINATIONS.
            </h1>

            <p className="text-sm sm:text-base font-light text-[#52483B] mt-4 leading-relaxed">
              Vinhare Hospitality Group is dedicated to elevating the standard of hospitality, resort leisure, and grand event banqueting across Bihar, India.
            </p>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-sm text-[#4A4033] font-light leading-relaxed">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1814] font-light leading-snug">
                Redefining Celebration & Sanctuary in Bihar
              </h2>
              <p>
                From manicured open-air festival lawns at <strong className="font-semibold text-[#B8860B]">Shiv Garden Resort</strong> to the contemporary leisure suites at J.P. Resort and palatial ballrooms at Resort Raj, our properties provide spaces where memories are made.
              </p>
              <p>
                Whether you are planning a landmark multi-day royal wedding, an anniversary gathering, or seeking peaceful sanctuary away from daily bustle, Vinhare delivers personalized care, exquisite catering, and effortless staging.
              </p>

              <div className="pt-4 flex items-center space-x-4">
                <Link
                  href="/destinations"
                  className="px-6 py-3 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-md hover:scale-105 transition-all"
                >
                  EXPLORE DESTINATIONS
                </Link>
                <Link
                  href="/gallery"
                  className="px-6 py-3 border border-[#D4AF37]/60 text-[#B8860B] text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#D4AF37] hover:text-white transition-all"
                >
                  VIEW GALLERY
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/45 shadow-2xl">
                <img
                  src="/images/shiv-garden/IMG_2974.jpg"
                  alt="Shiv Garden Resort"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] tracking-[0.25em] font-bold text-[#F3E5AB] uppercase">
                    FEATURED PROPERTY
                  </span>
                  <h3 className="font-serif-luxury text-2xl text-white mt-1">
                    Shiv Garden Resort • Bihar
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20">
          <h2 className="text-xs tracking-[0.3em] font-bold text-[#B8860B] uppercase mb-8">
            OUR CORE VALUES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl glass-panel-gold border-2 border-[#D4AF37]/35 shadow-sm hover:border-[#D4AF37] transition-all"
              >
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
            ))}
          </div>
        </section>
      </main>

      <Footer onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <BackToTop />
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </SmoothScrollProvider>
  );
}
