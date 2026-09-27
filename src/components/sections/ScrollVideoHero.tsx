'use me';
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentScene, setCurrentScene] = useState<number>(0); 
  // 0: Vinhare Group Intro
  // 1: Mithila Marriage Services (After 1st White Flash)
  // 2: Shiv Garden Resort
  // 3: J.P. Resort
  // 4: Resort Raj

  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
  const [hasPassedFlash, setHasPassedFlash] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Smooth lerp refs for fluid scrubbing
  const targetProgressRef = useRef<number>(0);
  const smoothProgressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Define properties array aligned with scenes
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
    },
    {
      index: 1,
      badge: 'DESTINATION 01 / 04 • SACRED CELEBRATIONS',
      subtitleTag: 'WEDDING & CELEBRATIONS',
      title: 'MITHILA MARRIAGE SERVICES',
      subtext: 'Opulent royal mandaps, cultural heritage, floral styling & feast management across our luxury resorts.',
      type: 'WEDDING',
      property: mithilaProperty,
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
      highlights: [
        'Palatial Façade & Soaring Columns',
        'Grand Ballroom Staging',
        'VIP Guest Staging Facilities',
      ],
    },
  ];

  // Draw frame on canvas smoothly with aspect ratio cover
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const vw = canvas.width;
    const vh = canvas.height;
    const vidW = video.videoWidth || 1920;
    const vidH = video.videoHeight || 1080;

    const imgRatio = vidW / vidH;
    const canvasRatio = vw / vh;

    let renderW = vw;
    let renderH = vh;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderH = vw / imgRatio;
      offsetY = (vh - renderH) / 2;
    } else {
      renderW = vh * imgRatio;
      offsetX = (vw - renderW) / 2;
    }

    ctx.clearRect(0, 0, vw, vh);
    try {
      ctx.drawImage(video, offsetX, offsetY, renderW, renderH);
    } catch {
      // Ignore initial frame draw error before video is ready
    }
  }, []);

  // Smooth RAF Animation Loop for silky video scrubbing & canvas updates
  useEffect(() => {
    const loop = () => {
      // Lerp smooth progress towards target progress
      const diff = targetProgressRef.current - smoothProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        smoothProgressRef.current += diff * 0.12; // silky smooth lerp factor
      } else {
        smoothProgressRef.current = targetProgressRef.current;
      }

      const p = smoothProgressRef.current;

      // Update Video currentTime smoothly
      const video = videoRef.current;
      if (video && video.duration > 0) {
        const targetTime = p * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.015) {
          video.currentTime = targetTime;
        }
      }

      renderFrame();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [renderFrame]);

  // Update scroll target on window scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentY = -rect.top;
      const progress = Math.min(Math.max(currentY / totalHeight, 0), 1);
      targetProgressRef.current = progress;
      setScrollProgress(progress);

      // Handle 1st White Flash Trigger (around progress 0.18 to 0.25)
      if (progress >= 0.18 && progress <= 0.25) {
        if (!hasPassedFlash) {
          setIsFlashActive(true);
          setHasPassedFlash(true);
          setTimeout(() => setIsFlashActive(false), 800);
        }
      } else if (progress < 0.15) {
        setHasPassedFlash(false);
      }

      // Determine current scene index
      if (progress < 0.20) {
        setCurrentScene(0); // Brand Overview
      } else if (progress < 0.40) {
        setCurrentScene(1); // Mithila Marriage (After 1st white flash!)
      } else if (progress < 0.60) {
        setCurrentScene(2); // Shiv Garden Resort
      } else if (progress < 0.80) {
        setCurrentScene(3); // J.P. Resort
      } else {
        setCurrentScene(4); // Resort Raj
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', renderFrame);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', renderFrame);
    };
  }, [hasPassedFlash, renderFrame]);

  // Video load event handlers
  const handleVideoLoaded = () => {
    const video = videoRef.current;
    if (video) {
      setIsVideoLoaded(true);
      renderFrame();
    }
  };

  const handleSeeked = () => {
    renderFrame();
  };

  const activeScene = scenesData[currentScene];

  return (
    <div ref={containerRef} className="relative h-[550vh] w-full bg-[#0D0C0A] text-white">
      {/* -------------------------------------------------------------------
          1ST WHITE FLASH TRANSITION OVERLAY
         ------------------------------------------------------------------- */}
      <AnimatePresence>
        {isFlashActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-white pointer-events-none flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center px-6"
            >
              <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto mb-4 animate-spin-slow" />
              <h3 className="font-serif-luxury text-3xl sm:text-5xl text-[#1A1814] tracking-[0.2em] font-light uppercase">
                MITHILA MARRIAGE SERVICES
              </h3>
              <p className="text-xs sm:text-sm tracking-[0.4em] text-[#B8860B] uppercase font-bold mt-2">
                UNVEILING VINHARE DESTINATIONS
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------------
          STICKY FULLSCREEN VIEWPORT WITH FRAME-BY-FRAME VIDEO & GLASS UI
         ------------------------------------------------------------------- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8 md:p-12">
        {/* Hidden HTML5 Video Source */}
        <video
          ref={videoRef}
          src="/video/vinhare-scroll.mp4"
          preload="auto"
          muted={isMuted}
          playsInline
          onLoadedMetadata={handleVideoLoaded}
          onSeeked={handleSeeked}
          className="hidden"
        />

        {/* Dynamic HTML5 Canvas rendering video frame by frame */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
        />

        {/* Video Direct Fallback / Overlay Element */}
        <video
          src="/video/vinhare-scroll.mp4"
          muted
          playsInline
          loop
          autoPlay
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-30 mix-blend-overlay' : 'opacity-80'
          }`}
        />

        {/* Premium Dark Glass & Golden Ambient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0C0A]/80 via-transparent to-[#0D0C0A]/90 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(13,12,10,0.85)_100%)] pointer-events-none z-[1]" />

        {/* -------------------------------------------------------------------
            TOP BAR: CONTROLS & TIMELINE
           ------------------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-12 sm:pt-16">
          <div className="flex items-center space-x-2 text-[11px] font-semibold text-[#F3E5AB] tracking-[0.25em] uppercase">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>VINHARE LUXURY COLLECTION</span>
          </div>

          {/* Controls: Mute Toggle & Timeline Indicator */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-[#F3E5AB] hover:text-white hover:border-[#D4AF37] transition-all"
              title="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-[11px] text-[#F3E5AB] tracking-widest">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{(scrollProgress * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            CENTER CONTENT: PREMIUM GLASS CARDS FOR BRAND & HOTELS
           ------------------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto my-auto flex flex-col justify-center items-center text-center px-2 py-4">
          <AnimatePresence mode="wait">
            {currentScene === 0 ? (
              /* BRAND OVERVIEW (0% - 20% SCROLL) */
              <motion.div
                key="brand-hero"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="max-w-4xl flex flex-col items-center"
              >
                {/* Gold Pill Badge */}
                <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-[#D4AF37]/40 bg-black/50 backdrop-blur-2xl mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[11px] tracking-[0.35em] text-[#F3E5AB] font-bold uppercase">
                    {activeScene.badge}
                  </span>
                </div>

                <h2 className="text-xs sm:text-sm tracking-[0.45em] text-[#D4AF37] uppercase font-semibold mb-3">
                  {activeScene.subtitleTag}
                </h2>

                <h1 className="font-serif-luxury text-6xl sm:text-8xl md:text-9xl tracking-[0.12em] font-light text-gold-gradient drop-shadow-2xl my-1">
                  VINHARE
                </h1>

                <p className="text-base sm:text-xl font-light text-[#E2D8C6] tracking-[0.2em] font-serif max-w-2xl mb-8">
                  {activeScene.subtext}
                </p>

                {/* Main Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const destEl = document.querySelector('#destinations');
                      if (destEl) destEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    data-cursor="DISCOVER"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white font-bold text-xs tracking-[0.25em] uppercase rounded-full shadow-[0_10px_35px_rgba(184,134,11,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 group"
                  >
                    <span>EXPLORE DESTINATIONS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry('General Enquiry')}
                    data-cursor="PLAN"
                    className="w-full sm:w-auto px-8 py-4 border border-[#D4AF37]/50 bg-black/40 hover:bg-[#D4AF37] hover:text-black text-[#F3E5AB] font-semibold text-xs tracking-[0.25em] uppercase rounded-full backdrop-blur-xl transition-all duration-300 shadow-md"
                  >
                    PLAN YOUR VISIT
                  </button>
                </div>
              </motion.div>
            ) : (
              /* HOTEL & RESORT CARDS (AFTER 1ST WHITE FLASH) */
              <motion.div
                key={`scene-${currentScene}`}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -35, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="w-full max-w-4xl rounded-3xl border border-[#D4AF37]/40 bg-black/55 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-left relative overflow-hidden transition-all duration-500"
              >
                {/* Background Ambient Glow */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Property Preview Thumbnail with Glass Badge */}
                  {activeScene.property && (
                    <div
                      onClick={() => onSelectProperty(activeScene.property!)}
                      data-cursor="VIEW"
                      className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group border border-white/20 shadow-lg"
                    >
                      <img
                        src={activeScene.property.image}
                        alt={activeScene.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Glass Overlay Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] font-bold text-[#F3E5AB] bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 uppercase">
                          {activeScene.type}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white font-medium">
                        <span className="flex items-center space-x-1.5">
                          <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>View Details</span>
                        </span>
                        <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-125 transition-transform" />
                      </div>
                    </div>
                  )}

                  {/* Right Column: Hotel Details & Actions */}
                  <div className={`${activeScene.property ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col justify-between space-y-4`}>
                    <div>
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold tracking-[0.25em] uppercase mb-2">
                        {currentScene === 1 ? (
                          <HeartHandshake className="w-3.5 h-3.5" />
                        ) : (
                          <Building2 className="w-3.5 h-3.5" />
                        )}
                        <span>{activeScene.badge}</span>
                      </div>

                      <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light tracking-[0.05em] text-white leading-tight">
                        {activeScene.title}
                      </h2>

                      <p className="text-xs sm:text-sm font-serif italic text-[#D4AF37] mt-1">
                        "{activeScene.subtitleTag}"
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#D8CFBC] font-light leading-relaxed">
                      {activeScene.subtext}
                    </p>

                    {/* Service Feature Highlights */}
                    {activeScene.highlights && (
                      <div className="space-y-2 pt-1 border-t border-white/10">
                        {activeScene.highlights.map((feat, idx) => (
                          <div key={idx} className="flex items-center space-x-2.5 text-xs text-[#EAE2D2]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Glass UI Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      {activeScene.property && (
                        <button
                          onClick={() => onSelectProperty(activeScene.property!)}
                          className="px-6 py-3 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white font-bold text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_8px_25px_rgba(184,134,11,0.3)] hover:scale-105 transition-all flex items-center space-x-2"
                        >
                          <span>EXPLORE RESORT</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() =>
                          onOpenEnquiry(activeScene.property ? activeScene.property.name : 'General Enquiry')
                        }
                        className="px-6 py-3 border border-[#D4AF37]/50 bg-black/40 hover:bg-white hover:text-black text-[#F3E5AB] font-semibold text-xs tracking-[0.2em] uppercase rounded-full backdrop-blur-xl transition-all"
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
            BOTTOM SCRUBBER & SEQUENTIAL TIMELINE STEPPER (GLASS UI)
           ------------------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-[#F3E5AB]">
          {/* Unit Stepper Pills */}
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {scenesData.map((scene, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (containerRef.current) {
                    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
                    const targetY = (idx / 4) * totalHeight;
                    window.scrollTo({ top: containerRef.current.offsetTop + targetY, behavior: 'smooth' });
                  }
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-full border transition-all duration-300 text-[10px] tracking-wider uppercase font-semibold whitespace-nowrap ${
                  currentScene === idx
                    ? 'border-[#D4AF37] bg-[#D4AF37]/25 text-[#F3E5AB] backdrop-blur-md shadow-md scale-105'
                    : 'border-white/10 bg-black/30 text-white/50 hover:text-white hover:border-white/30'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentScene === idx ? 'bg-[#D4AF37] animate-pulse' : 'bg-white/30'
                  }`}
                />
                <span>{scene.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Scroll Prompt & Indicator */}
          <div className="flex items-center space-x-2 animate-bounce">
            <span className="text-[10px] tracking-[0.25em] font-semibold uppercase text-[#F3E5AB]/80">
              SCROLL DOWN TO EXPLORE DESTINATIONS
            </span>
            <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </div>
      </div>
    </div>
  );
};
