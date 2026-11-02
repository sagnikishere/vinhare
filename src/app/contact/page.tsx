'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
} from 'lucide-react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { CustomCursor } from '../../components/ui/CustomCursor';
import { SmoothScrollProvider } from '../../components/providers/SmoothScrollProvider';
import { BackToTop } from '../../components/ui/BackToTop';
import { BRAND_INFO, PROPERTIES } from '../../data/vinhareData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    property: 'Shiv Garden Resort',
    eventType: 'Wedding Ceremony',
    guestCount: '300-500 guests',
    date: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar onOpenEnquiry={() => {}} />

      <main className="min-h-screen bg-[#FDFBF7] text-[#1A1814] pt-28 pb-20 overflow-hidden">
        {/* Page Header */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pt-6 pb-12 border-b border-[#D4AF37]/30">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF4E6] border border-[#D4AF37]/50 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-bold text-[#B8860B] uppercase">
                RESERVATIONS & EVENT ENQUIRIES
              </span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#1A1814] tracking-[0.05em] leading-tight">
              CONNECT WITH CONCIERGE
            </h1>

            <p className="text-sm sm:text-base font-light text-[#52483B] mt-4 leading-relaxed">
              Plan your grand wedding, stay reservation, or private celebration. Our dedicated concierge team is available 24/7 to assist your family.
            </p>
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info & Property Locations */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl glass-panel-gold border-2 border-[#D4AF37]/35 shadow-sm space-y-6">
                <h3 className="font-serif-luxury text-2xl text-[#1A1814] font-medium">
                  Direct Concierge Desk
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/70 border border-[#D4AF37]/30 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-[#FAF4E6] text-[#B8860B]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[#8C8275] text-[10px] tracking-wider uppercase font-bold">
                        CALL OR WHATSAPP
                      </p>
                      <a
                        href={`tel:${BRAND_INFO.phone}`}
                        className="text-base font-serif-luxury font-bold text-[#1A1814] hover:text-[#B8860B] transition-colors"
                      >
                        {BRAND_INFO.phoneFormatted}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/70 border border-[#D4AF37]/30 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-[#FAF4E6] text-[#B8860B]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[#8C8275] text-[10px] tracking-wider uppercase font-bold">
                        EMAIL CONCIERGE
                      </p>
                      <a
                        href={`mailto:${BRAND_INFO.email}`}
                        className="text-sm font-medium text-[#1A1814] hover:text-[#B8860B] transition-colors"
                      >
                        {BRAND_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/70 border border-[#D4AF37]/30 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-[#FAF4E6] text-[#B8860B]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[#8C8275] text-[10px] tracking-wider uppercase font-bold">
                        LOCATION
                      </p>
                      <p className="text-sm font-medium text-[#1A1814]">
                        {BRAND_INFO.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Addresses Card */}
              <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-4">
                <h4 className="text-xs tracking-[0.3em] font-bold text-[#B8860B] uppercase">
                  OUR RESORTS
                </h4>
                <div className="space-y-3 text-xs text-[#4A4033]">
                  <div className="p-3 rounded-xl bg-white/80 border border-[#D4AF37]/20">
                    <p className="font-bold text-[#1A1814]">Shiv Garden Resort</p>
                    <p className="text-[#786C5E] mt-0.5">Grand celebration lawns & banquet suites, Bihar</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-[#D4AF37]/20">
                    <p className="font-bold text-[#1A1814]">J.P. Resort</p>
                    <p className="text-[#786C5E] mt-0.5">Reflecting pool & modern luxury stays, Bihar</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-[#D4AF37]/20">
                    <p className="font-bold text-[#1A1814]">Resort Raj</p>
                    <p className="text-[#786C5E] mt-0.5">Palatial architecture & wedding ballrooms, Bihar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl glass-panel-gold border-2 border-[#D4AF37]/45 shadow-xl">
                {submitted ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#FAF4E6] border border-[#D4AF37] flex items-center justify-center mx-auto text-[#B8860B]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif-luxury text-3xl text-[#1A1814]">
                      Enquiry Submitted Successfully
                    </h3>
                    <p className="text-sm text-[#52483B] max-w-md mx-auto">
                      Thank you for contacting Vinhare Hospitality Group. Our chief concierge will reach out to you within 2 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-full border border-[#D4AF37] text-xs font-bold text-[#B8860B] uppercase tracking-wider"
                    >
                      SUBMIT ANOTHER ENQUIRY
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1A1814]">
                        Plan Your Event or Stay
                      </h3>
                      <p className="text-xs text-[#6B5E4F] mt-1">
                        Fill in your event details below to receive availability and tailored package options.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold tracking-wider text-[#6B5E4F] uppercase mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#D4AF37]/35 text-xs focus:outline-none focus:border-[#B8860B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-wider text-[#6B5E4F] uppercase mb-1.5">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#D4AF37]/35 text-xs focus:outline-none focus:border-[#B8860B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold tracking-wider text-[#6B5E4F] uppercase mb-1.5">
                          Preferred Property *
                        </label>
                        <select
                          value={formData.property}
                          onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#D4AF37]/35 text-xs focus:outline-none focus:border-[#B8860B]"
                        >
                          <option>Shiv Garden Resort</option>
                          <option>J.P. Resort</option>
                          <option>Resort Raj</option>
                          <option>Mithila Marriage Services</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-wider text-[#6B5E4F] uppercase mb-1.5">
                          Occasion / Event Type *
                        </label>
                        <select
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#D4AF37]/35 text-xs focus:outline-none focus:border-[#B8860B]"
                        >
                          <option>Wedding Ceremony & Reception</option>
                          <option>Pre-Wedding / Sangeet / Mehendi</option>
                          <option>Resort Luxury Stay / Vacation</option>
                          <option>Birthday / Anniversary Celebration</option>
                          <option>Corporate Retreat / Banquet</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-[#6B5E4F] uppercase mb-1.5">
                        Tentative Date / Month
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#D4AF37]/35 text-xs focus:outline-none focus:border-[#B8860B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-[#6B5E4F] uppercase mb-1.5">
                        Special Requirements or Message
                      </label>
                      <textarea
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Tell us about your estimated guest count, catering preferences, or specific lawn requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#D4AF37]/35 text-xs focus:outline-none focus:border-[#B8860B]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white font-bold text-xs tracking-[0.25em] uppercase rounded-full shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 border border-[#D4AF37]/60"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT RESERVATION ENQUIRY</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenEnquiry={() => {}} />
      <BackToTop />
    </SmoothScrollProvider>
  );
}
