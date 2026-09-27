'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../../data/vinhareData';

interface NavbarProps {
  onOpenEnquiry: (preselectedOption?: string) => void;
  onSelectProperty?: (slug: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, onSelectProperty }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Weddings', href: '#weddings' },
    { label: 'Experiences', href: '#experiences' },
    { label: '3D Resort', href: '#interactive-3d' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Network', href: '#network' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-[#D4AF37]/30 py-4 shadow-sm'
            : 'bg-gradient-to-b from-white/95 via-white/40 to-transparent py-5 md:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex flex-col items-start focus:outline-none"
            data-cursor="HOME"
          >
            <span
              className={`font-serif-luxury tracking-[0.25em] font-light text-[#B8860B] transition-all duration-300 ${
                isScrolled ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
              }`}
            >
              VINHARE
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#8C8275] uppercase font-semibold -mt-1 opacity-90 group-hover:opacity-100 transition-opacity">
              HOTEL & RESORT
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-xs tracking-[0.2em] uppercase text-[#1A1814] hover:text-[#B8860B] transition-colors py-1 group font-semibold"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="flex items-center space-x-2 text-xs text-[#B8860B] hover:text-[#1A1814] font-semibold transition-colors tracking-widest"
              title="Call Vinhare Concierge"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{BRAND_INFO.phone}</span>
            </a>

            <button
              onClick={() => onOpenEnquiry()}
              data-cursor="BOOK"
              className="relative group px-6 py-2.5 overflow-hidden rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] hover:shadow-[0_5px_20px_rgba(184,134,11,0.3)] transition-all duration-300 shadow-sm"
            >
              <span className="relative z-10 text-xs tracking-[0.25em] font-semibold text-white uppercase flex items-center space-x-1">
                <span>ENQUIRE</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-4 py-2 text-[10px] tracking-widest font-semibold text-white bg-[#D4AF37] rounded-full uppercase shadow-sm"
            >
              ENQUIRE
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#B8860B] hover:text-[#1A1814] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[899] bg-[#FDFBF7] flex flex-col justify-between px-8 py-24 lg:hidden border-b border-[#D4AF37]/30"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15)_0%,transparent_60%)] pointer-events-none" />

            <div className="flex flex-col space-y-6">
              <span className="text-[10px] tracking-[0.4em] text-[#B8860B] uppercase font-bold">
                NAVIGATION
              </span>

              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="font-serif-luxury text-3xl text-[#1A1814] hover:text-[#B8860B] transition-colors font-light"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col space-y-6 pt-8 border-t border-[#D4AF37]/30">
              <div className="flex flex-col space-y-1 text-xs text-[#1A1814]">
                <span className="text-[#B8860B] font-bold tracking-widest uppercase">CONCIERGE DESK</span>
                <a href={`tel:${BRAND_INFO.phone}`} className="text-base font-serif-luxury text-[#B8860B]">
                  {BRAND_INFO.phoneFormatted}
                </a>
                <span className="text-[11px] text-[#8C8275]">{BRAND_INFO.location}</span>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-4 text-xs font-semibold tracking-[0.25em] text-white bg-gradient-to-r from-[#B8860B] to-[#D4AF37] rounded-full uppercase shadow-md"
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
