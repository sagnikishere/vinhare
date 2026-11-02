'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../../data/vinhareData';

interface NavbarProps {
  onOpenEnquiry: (preselectedOption?: string) => void;
  onSelectProperty?: (slug: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Multi-page navigation links with 3D option removed
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Weddings', href: '/weddings' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isHomeTop = pathname === '/' && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
          isHomeTop
            ? 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4 md:py-6'
            : 'bg-[#FDFBF7]/90 backdrop-blur-2xl border-b border-[#D4AF37]/35 py-3 shadow-[0_12px_36px_rgba(184,134,11,0.08)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none"
            data-cursor="HOME"
          >
            <span
              className={`font-serif-luxury tracking-[0.25em] font-light transition-all duration-300 ${
                isHomeTop
                  ? 'text-2xl md:text-3xl text-gold-gradient drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]'
                  : 'text-2xl md:text-3xl text-[#B8860B]'
              }`}
            >
              VINHARE
            </span>
            <span
              className={`text-[9px] tracking-[0.35em] uppercase font-semibold -mt-1 transition-colors ${
                isHomeTop ? 'text-[#D4AF37]/80' : 'text-[#8C8275]'
              }`}
            >
              HOTEL & RESORT
            </span>
          </Link>

          {/* Desktop Navigation Links in Floating Glass Dock */}
          <nav
            className={`hidden lg:flex items-center space-x-1 px-3.5 py-1.5 rounded-full transition-all duration-300 border ${
              isHomeTop
                ? 'bg-black/55 backdrop-blur-xl border-[#D4AF37]/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                : 'bg-white/85 backdrop-blur-xl border-[#D4AF37]/35 shadow-[0_4px_20px_rgba(184,134,11,0.06)]'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-[11px] tracking-[0.2em] uppercase rounded-full px-4 py-1.5 transition-all font-semibold ${
                    isHomeTop
                      ? isActive
                        ? 'bg-[#D4AF37]/30 text-[#F3E5AB] border border-[#D4AF37]/60 shadow-sm'
                        : 'text-[#EADCC9] hover:text-[#F3E5AB] hover:bg-white/10'
                      : isActive
                      ? 'bg-[#FAF4E6] text-[#B8860B] border border-[#D4AF37]/50 shadow-sm'
                      : 'text-[#1A1814] hover:text-[#B8860B] hover:bg-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center space-x-3.5">
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all tracking-wider border ${
                isHomeTop
                  ? 'bg-black/55 backdrop-blur-xl text-[#F3E5AB] hover:text-white hover:border-[#D4AF37] border-[#D4AF37]/40 shadow-md'
                  : 'bg-white/85 text-[#B8860B] hover:text-[#1A1814] border-[#D4AF37]/35 shadow-sm'
              }`}
              title="Call Vinhare Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{BRAND_INFO.phone}</span>
            </a>

            <button
              onClick={() => onOpenEnquiry()}
              data-cursor="BOOK"
              className="relative group px-6 py-2.5 overflow-hidden rounded-full border border-[#D4AF37]/80 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white hover:shadow-[0_8px_25px_rgba(184,134,11,0.4)] hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
            >
              <span className="relative z-10 text-xs tracking-[0.25em] font-semibold text-white uppercase flex items-center space-x-1">
                <span>ENQUIRE</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2.5">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-4 py-1.5 text-[10px] tracking-widest font-semibold text-white bg-gradient-to-r from-[#B8860B] to-[#D4AF37] rounded-full uppercase shadow-sm border border-[#D4AF37]/60"
            >
              ENQUIRE
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full border focus:outline-none transition-colors ${
                isHomeTop
                  ? 'bg-black/50 backdrop-blur-xl border-[#D4AF37]/50 text-[#F3E5AB] hover:text-white'
                  : 'bg-white/80 border-[#D4AF37]/40 text-[#B8860B] hover:text-[#1A1814]'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Fullscreen Overlay Menu - Glassmorphic Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[899] bg-[#0D0C0A]/95 backdrop-blur-2xl flex flex-col justify-between px-8 py-24 lg:hidden border-b border-[#D4AF37]/40 text-white"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.2)_0%,transparent_60%)] pointer-events-none" />

            <div className="flex flex-col space-y-5 relative z-10">
              <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-bold">
                NAVIGATION
              </span>

              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif-luxury text-2xl sm:text-3xl text-[#FDFBF7] hover:text-[#D4AF37] transition-colors font-light tracking-wide block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col space-y-5 pt-6 border-t border-[#D4AF37]/30 relative z-10">
              <div className="flex flex-col space-y-1 text-xs">
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase">CONCIERGE DESK</span>
                <a href={`tel:${BRAND_INFO.phone}`} className="text-base font-serif-luxury text-[#F3E5AB]">
                  {BRAND_INFO.phoneFormatted}
                </a>
                <span className="text-[11px] text-[#A89F91]">{BRAND_INFO.location}</span>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3.5 text-xs font-semibold tracking-[0.25em] text-white bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] rounded-full uppercase shadow-md border border-[#D4AF37]/60"
              >
                PLAN AN EVENT / BOOK A STAY
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
