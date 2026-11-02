'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_INFO } from '../../data/vinhareData';
import { Phone, MapPin, Mail, ArrowUpRight, Share2, Globe } from 'lucide-react';

interface FooterProps {
  onOpenEnquiry: (option?: string) => void;
  onSelectPropertyBySlug?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry }) => {
  return (
    <footer className="relative bg-[#FAF7F2] text-[#1A1814] pt-20 pb-12 border-t border-[#D4AF37]/30 overflow-hidden">
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D4AF37]/30">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Link href="/" className="flex flex-col group">
              <span className="font-serif-luxury text-4xl tracking-[0.2em] font-light text-[#B8860B] group-hover:text-[#997022] transition-colors">
                VINHARE
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#8C8275] uppercase font-bold -mt-1">
                HOTEL & RESORT
              </span>
            </Link>

            <p className="text-sm font-serif italic text-[#2C261E] font-light max-w-sm">
              "{BRAND_INFO.taglinePrimary}"
            </p>

            <p className="text-xs text-[#52483B] font-light leading-relaxed max-w-sm">
              {BRAND_INFO.taglineSecondary} Creating luxury stays, grand wedding venues, and landmark celebration spaces in Bihar, India.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={BRAND_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-pill text-[#B8860B] hover:bg-[#D4AF37] hover:text-white hover:scale-105 transition-all duration-300 shadow-sm"
                aria-label="Vinhare Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={BRAND_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-pill text-[#B8860B] hover:bg-[#D4AF37] hover:text-white hover:scale-105 transition-all duration-300 shadow-sm"
                aria-label="Vinhare Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Destinations Col */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs tracking-[0.3em] font-bold text-[#B8860B] uppercase">
              DESTINATIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#443B2F] font-medium">
              <li>
                <Link href="/destinations" className="hover:text-[#B8860B] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#B8860B] transition-colors" />
                  Shiv Garden Resort
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-[#B8860B] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#B8860B] transition-colors" />
                  J.P. Resort
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-[#B8860B] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#B8860B] transition-colors" />
                  Resort Raj
                </Link>
              </li>
            </ul>

            <h4 className="text-xs tracking-[0.3em] font-bold text-[#B8860B] uppercase pt-4">
              ROYAL WEDDINGS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#443B2F] font-medium">
              <li>
                <Link href="/weddings" className="hover:text-[#B8860B] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#B8860B] transition-colors" />
                  Mithila Marriage Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Nav Col */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs tracking-[0.3em] font-bold text-[#B8860B] uppercase">
              QUICK PAGES
            </h4>
            <ul className="space-y-2.5 text-xs text-[#443B2F] font-medium">
              <li><Link href="/" className="hover:text-[#B8860B] transition-colors">Home</Link></li>
              <li><Link href="/destinations" className="hover:text-[#B8860B] transition-colors">Destinations</Link></li>
              <li><Link href="/weddings" className="hover:text-[#B8860B] transition-colors">Weddings</Link></li>
              <li><Link href="/gallery" className="hover:text-[#B8860B] transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-[#B8860B] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#B8860B] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="glass-panel rounded-2xl p-6 border border-[#D4AF37]/40 shadow-xl flex flex-col space-y-4">
              <h4 className="text-xs tracking-[0.3em] font-bold text-[#B8860B] uppercase">
                CONCIERGE CONTACT
              </h4>

              <div className="space-y-3 text-xs text-[#1A1814]">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg glass-pill text-[#B8860B]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <a href={`tel:${BRAND_INFO.phone}`} className="hover:text-[#B8860B] font-bold tracking-wider transition-colors">
                    {BRAND_INFO.phoneFormatted}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg glass-pill text-[#B8860B]">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-[#443B2F]">{BRAND_INFO.location}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg glass-pill text-[#B8860B]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-[#443B2F]">{BRAND_INFO.email}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenEnquiry('General Enquiry')}
                  className="w-full py-3.5 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-white font-bold text-xs tracking-[0.2em] uppercase rounded-xl hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] transition-all transform active:scale-95 cursor-pointer"
                >
                  PLAN AN EVENT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] text-[#786C5E]">
          <p>© {BRAND_INFO.copyrightYear} Vinhare Hotel & Resort. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-[#B8860B] font-bold">
            Bihar, India • Luxury Hospitality Group
          </p>
        </div>
      </div>
    </footer>
  );
};
