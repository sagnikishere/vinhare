'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Eye,
  Layers,
  Volume2,
  VolumeX,
  CheckCircle2,
  Building2,
  HeartHandshake,
  Maximize2,
  Play,
  Pause,
} from 'lucide-react';
import { PROPERTIES } from '../../data/vinhareData';
import { PropertyItem } from '../../types';

interface ScrollVideoHeroProps {
  onOpenEnquiry: (option?: string) => void;
  onExploreClick: () => void;
  onSelectProperty: (property: PropertyItem) => void;
}

export const ScrollVideoHero: React.FC<ScrollVideoHeroProps> = ({
  onOpenEnquiry,
  onExploreClick,
  onSelectProperty,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
  const [hasPassedFlash, setHasPassedFlash] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  // Property references matching scenes
  const mithilaProperty = PROPERTIES.find((p) => p.id === 'mithila-marriage-services') || PROPERTIES[3];
  const shivProperty = PROPERTIES.find((p) => p.id === 'shiv-garden-resort') || PROPERTIES[0];
  const jpProperty = PROPERTIES.find((p) => p.id === 'jp-resort') || PROPERTIES[1];
  const rajProperty = PROPERTIES.find((p) => p.id === 'resort-raj') || PROPERTIES[2];

  const scenesData = [
    {
      index: 0,
      badge: 'BIHAR, INDIA',
      subtitleTag: 'ONE GROUP. MULTIPLE DESTINATIONS.',
      title: 'VINHARE',
      subtext: 'Creating Experiences. Delivering Excellence.',
      type: 'BRAND',
      property: null,
      bgImage: '/images/hero_resort.jpg',
    },
    {
      index: 1,
      badge: 'DESTINATION 01 / 04 • SACRED CELEBRATIONS',
      subtitleTag: 'WEDDING & CELEBRATIONS',
      title: 'MITHILA MARRIAGE SERVICES',
      subtext: 'Opulent royal mandaps, cultural heritage, floral styling & feast management across our luxury resorts.',
      type: 'WEDDING',
      property: mithilaProperty,
      bgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      highlights: [
        'Royal Mandap Styling & Floral Canopy',
        'Gourmet Festive Feast & Catering',
        'Bridal & Groom Preparatory Suites',
      ],
    },
    {
      index: 2,
      badge: 'DESTINATION 02 / 04 • RESORT & EVENTS',
      subtitleTag: 'MANICURED LAWNS & REGAL GATHERINGS',
      title: 'SHIV GARDEN RESORT',
      subtext: 'Sprawling green lawns, courtyard architecture, and grand celebration spaces for iconic events.',
      type: 'RESORT',
      property: shivProperty,
      bgImage: '/images/shiv_garden_day.jpeg',
      highlights: [
        'Vast Manicured Celebration Lawns',
        'Luxury Accommodation Suites',
        'Atmospheric Evening Lighting',
      ],
    },
    {
      index: 3,
      badge: 'DESTINATION 03 / 04 • LEISURE & STAYS',
      subtitleTag: 'MODERN LUXURY & REFLECTING POOLS',
      title: 'J.P. RESORT',
      subtext: 'Sleek contemporary suite comfort, reflecting water basins, and peaceful family retreats.',
      type: 'RESORT',
      property: jpProperty,
      bgImage: '/images/jp_resort.jpg',
      highlights: [
        'Reflecting Pools & Courtyards',
        'Air-Conditioned Modern Suites',
        '24/7 Dedicated Concierge',
      ],
    },
    {
      index: 4,
      badge: 'DESTINATION 04 / 04 • PALATIAL HERITAGE',
      subtitleTag: 'ROYAL GRACE & GRAND BALLROOMS',
      title: 'RESORT RAJ',
      subtext: 'Heritage architectural arches, golden spires, and grand ballroom spaces designed for royal weddings.',
      type: 'HERITAGE',
      property: rajProperty,
      bgImage: '/images/raj_resort.webp',
      highlights: [
        'Palatial Façade & Soaring Columns',
        'Grand Ballroom Staging',
        'VIP Guest Staging Facilities',
      ],
    },
  ];

  // High performance scroll listener with passive event handling
  useEffect(() => {
    let animationFrameId: number;

    const updateScrollProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentY = -rect.top;
      const progress = Math.min(Math.max(currentY / totalHeight, 0), 1);
      setScrollProgress(progress);

      // Trigger 1st White Flash on entering Mithila Marriage Services (around 0.18 - 0.23 progress)
      if (progress >= 0.18 && progress <= 0.25) {
        if (!hasPassedFlash) {
          setIsFlashActive(true);
          setHasPassedFlash(true);
          setTimeout(() => setIsFlashActive(false), 700);
        }
      } else if (progress < 0.14) {
        setHasPassedFlash(false);
      }

      // Determine scene cleanly based on scroll percentage
      if (progress < 0.20) {
        setCurrentScene(0);
      } else if (progress < 0.40) {
        setCurrentScene(1);
      } else if (progress < 0.60) {
        setCurrentScene(2);
      } else if (progress < 0.80) {
        setCurrentScene(3);
      } else {
        setCurrentScene(4);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasPassedFlash]);

  const activeScene = scenesData[currentScene];

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const jumpToScene = (index: number) => {
    if (containerRef.current) {
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      const targetY = containerRef.current.offsetTop + (index / 4) * totalHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative h-[380vh] md:h-[450vh] w-full bg-[#0D0C0A] text-white">
      {/* -------------------------------------------------------------------
          WHITE FLASH TRANSITION OVERLAY
         ------------------------------------------------------------------- */}
      <AnimatePresence>
        {isFlashActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-white pointer-events-none flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Sparkles className="w-14 h-14 text-[#D4AF37] mx-auto mb-3 animate-spin-slow" />
              <h3 className="font-serif-luxury text-3xl sm:text-5xl text-[#1A1814] tracking-[0.2em] uppercase font-light">
                MITHILA MARRIAGE SERVICES
              </h3>
              <p className="text-xs sm:text-sm tracking-[0.4em] text-[#B8860B] uppercase font-bold mt-2">
                UNVEILING VINHARE LUXURY DESTINATIONS
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------------
          STICKY FULLSCREEN VIEWPORT (60 FPS SUPERSMOOTH HARDWARE VIDEO)
         ------------------------------------------------------------------- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-10">
        
        {/* Background Resort Image Crossfade Fallback Layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene.bgImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            style={{
              backgroundImage: `url(${activeScene.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>

        {/* 60FPS Hardware Accelerated Smooth Background Video */}
        <video
          ref={videoRef}
          src="/video/vinhare-scroll.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-40 mix-blend-overlay' : 'opacity-20'
          }`}
        />

        {/* Premium Dark Glass & Golden Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0C0A]/90 via-[#0D0C0A]/60 to-[#0D0C0A]/95 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(13,12,10,0.85)_100%)] pointer-events-none z-[1]" />

        {/* -------------------------------------------------------------------
            TOP BAR: BRAND BADGE & MEDIA CONTROLS
           ------------------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-10 sm:pt-14">
          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold text-[#F3E5AB] tracking-[0.25em] uppercase">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>VINHARE LUXURY COLLECTION</span>
          </div>

          {/* Controls: Mute Toggle, Play/Pause & Scroll Progress */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={togglePlayPause}
              className="p-2 sm:p-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-[#F3E5AB] hover:text-white hover:border-[#D4AF37] transition-all"
              title={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 sm:p-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-[#F3E5AB] hover:text-white hover:border-[#D4AF37] transition-all"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            <div className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-[11px] text-[#F3E5AB] tracking-widest font-mono">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{(scrollProgress * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            CENTER CONTENT: DYNAMIC GLASS CARDS & BRAND HIGHLIGHTS
           ------------------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-5xl mx-auto my-auto flex flex-col justify-center items-center text-center px-2 py-2 sm:py-4">
          <AnimatePresence mode="wait">
            {currentScene === 0 ? (
              /* BRAND OVERVIEW (0% - 20% SCROLL) */
              <motion.div
                key="brand-hero"
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="max-w-3xl flex flex-col items-center"
              >
                {/* Gold Pill Badge */}
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-[#D4AF37]/40 bg-black/50 backdrop-blur-2xl mb-4 sm:mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.35em] text-[#F3E5AB] font-bold uppercase">
                    {activeScene.badge}
                  </span>
                </div>

                <h2 className="text-[10px] sm:text-xs md:text-sm tracking-[0.45em] text-[#D4AF37] uppercase font-semibold mb-2">
                  {activeScene.subtitleTag}
                </h2>

                <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.12em] font-light text-gold-gradient drop-shadow-2xl my-1">
                  VINHARE
                </h1>

                <p className="text-sm sm:text-lg font-light text-[#E2D8C6] tracking-[0.18em] font-serif max-w-xl mb-6 sm:mb-8">
                  {activeScene.subtext}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <button
                    onClick={onExploreClick}
                    data-cursor="DISCOVER"
                    className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white font-bold text-xs tracking-[0.25em] uppercase rounded-full shadow-[0_10px_35px_rgba(184,134,11,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2.5 group"
                  >
                    <span>EXPLORE DESTINATIONS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry('General Enquiry')}
                    data-cursor="PLAN"
                    className="w-full sm:w-auto px-7 py-3.5 border border-[#D4AF37]/50 bg-black/40 hover:bg-[#D4AF37] hover:text-black text-[#F3E5AB] font-semibold text-xs tracking-[0.25em] uppercase rounded-full backdrop-blur-xl transition-all duration-300 shadow-md"
                  >
                    PLAN YOUR VISIT
                  </button>
                </div>
              </motion.div>
            ) : (
              /* HOTEL & RESORT GLASS CARDS */
              <motion.div
                key={`scene-${currentScene}`}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-[#D4AF37]/40 bg-black/60 backdrop-blur-2xl p-5 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-left relative overflow-hidden transition-all duration-500"
              >
                {/* Background Ambient Warm Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-[90px] pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                  {/* Left Column: Property Preview Thumbnail */}
                  {activeScene.property && (
                    <div
                      onClick={() => onSelectProperty(activeScene.property!)}
                      data-cursor="VIEW"
                      className="md:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group border border-white/20 shadow-xl"
                    >
                      <img
                        src={activeScene.property.image}
                        alt={activeScene.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Glass Overlay Tag */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-1 rounded-full text-[9px] tracking-[0.2em] font-bold text-[#F3E5AB] bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 uppercase">
                          {activeScene.type}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white font-medium">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Click to View Full Resort</span>
                        </span>
                        <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-125 transition-transform" />
                      </div>
                    </div>
                  )}

                  {/* Right Column: Hotel Details & Actions */}
                  <div className={`${activeScene.property ? 'md:col-span-7' : 'md:col-span-12'} flex flex-col justify-between space-y-3.5`}>
                    <div>
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase mb-2">
                        {currentScene === 1 ? (
                          <HeartHandshake className="w-3.5 h-3.5" />
                        ) : (
                          <Building2 className="w-3.5 h-3.5" />
                        )}
                        <span>{activeScene.badge}</span>
                      </div>

                      <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.04em] text-white leading-tight">
                        {activeScene.title}
                      </h2>

                      <p className="text-[11px] sm:text-xs md:text-sm font-serif italic text-[#D4AF37] mt-1">
                        "{activeScene.subtitleTag}"
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#D8CFBC] font-light leading-relaxed">
                      {activeScene.subtext}
                    </p>

                    {/* Service Feature Highlights */}
                    {activeScene.highlights && (
                      <div className="space-y-1.5 pt-1 border-t border-white/10">
                        {activeScene.highlights.map((feat, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-[11px] sm:text-xs text-[#EAE2D2]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Glass UI Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      {activeScene.property && (
                        <button
                          onClick={() => onSelectProperty(activeScene.property!)}
                          className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white font-bold text-[11px] tracking-[0.2em] uppercase rounded-full shadow-[0_8px_25px_rgba(184,134,11,0.3)] hover:scale-105 transition-all flex items-center space-x-1.5"
                        >
                          <span>EXPLORE RESORT</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() =>
                          onOpenEnquiry(activeScene.property ? activeScene.property.name : 'General Enquiry')
                        }
                        className="px-5 py-2.5 sm:px-6 sm:py-3 border border-[#D4AF37]/50 bg-black/40 hover:bg-white hover:text-black text-[#F3E5AB] font-semibold text-[11px] tracking-[0.2em] uppercase rounded-full backdrop-blur-xl transition-all"
                      >
                        BOOK / ENQUIRE
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* -------------------------------------------------------------------
            BOTTOM STEPPER NAVIGATION (TOUCH FRIENDLY FOR ALL DEVICES)
           ------------------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-[#F3E5AB]">
          {/* Unit Stepper Pills */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {scenesData.map((scene, idx) => (
              <button
                key={idx}
                onClick={() => jumpToScene(idx)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border transition-all duration-300 text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold whitespace-nowrap ${
                  currentScene === idx
                    ? 'border-[#D4AF37] bg-[#D4AF37]/30 text-[#F3E5AB] backdrop-blur-md shadow-md scale-105'
                    : 'border-white/10 bg-black/40 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    currentScene === idx ? 'bg-[#D4AF37] animate-pulse' : 'bg-white/40'
                  }`}
                />
                <span>{scene.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Scroll Down Prompt */}
          <div
            onClick={() => jumpToScene(Math.min(currentScene + 1, 4))}
            className="flex items-center space-x-1.5 cursor-pointer hover:text-white transition-colors"
          >
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold uppercase text-[#F3E5AB]/80">
              SCROLL OR TAP TO EXPLORE
            </span>
            <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};
