'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Volume2,
  VolumeX,
  Play,
  Pause,
} from 'lucide-react';
import { PropertyItem } from '../../types';

interface ScrollVideoHeroProps {
  onOpenEnquiry: (option?: string) => void;
  onExploreClick: () => void;
  onSelectProperty?: (property: PropertyItem) => void;
}

export const ScrollVideoHero: React.FC<ScrollVideoHeroProps> = ({
  onOpenEnquiry,
  onExploreClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  // Reliable background video autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setVideoLoaded(true);
          })
          .catch((err) => {
            console.warn('Autoplay prevented by browser:', err);
          });
      }
    }
  }, []);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between items-center bg-[#0D0C0A] text-white pt-24 pb-8 px-6">
      {/* 60FPS Continuous Hardware Autoplaying Video */}
      <video
        ref={videoRef}
        src="/video/vinhare-scroll.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-80' : 'opacity-40'
        }`}
      />

      {/* Cinematic Luxury Dark Gold & Vignette Gradients for Crystal-Clear Text */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0C0A]/85 via-[#0D0C0A]/40 to-[#0D0C0A]/90 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(13,12,10,0.8)_100%)] pointer-events-none z-[1]" />

      {/* Top Spacer for the fixed Luxury Navbar */}
      <div className="w-full h-8 pointer-events-none z-10" />

      {/* Center Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto px-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center"
        >
          {/* Gold Badge */}
          <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full glass-pill-dark mb-4 sm:mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#D4AF37]/45">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.35em] text-[#F3E5AB] font-bold uppercase">
              👑 VINHARE LUXURY COLLECTION • BIHAR
            </span>
          </div>

          {/* Welcome To Pre-heading */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#F3E5AB]/90 tracking-[0.2em] font-light mb-1">
            Welcome to
          </p>

          {/* Brand Heading */}
          <h1 className="font-serif-luxury text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-[0.12em] font-light text-gold-gradient drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] my-1">
            VINHARE
          </h1>

          {/* Tagline */}
          <div className="flex items-center justify-center space-x-3 my-2 w-full max-w-2xl px-2">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/80" />
            <h2 className="text-[11px] sm:text-sm md:text-base tracking-[0.3em] text-[#D4AF37] uppercase font-semibold text-center">
              A Group of Hotels, Resorts & Event Destinations
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/80" />
          </div>

          {/* Editorial Subtext */}
          <p className="text-xs sm:text-base md:text-lg font-light text-[#E2D8C6] tracking-[0.04em] font-serif max-w-2xl mx-auto my-4 sm:my-6 leading-relaxed">
            Where regal Indian hospitality meets breathtaking celebrations. Discover our landmark venues — Shiv Garden Resort, J.P. Resort, Resort Raj & Mithila Marriage Services.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mt-2">
            <button
              onClick={onExploreClick}
              data-cursor="DISCOVER"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white font-bold text-xs tracking-[0.25em] uppercase rounded-full shadow-[0_10px_35px_rgba(184,134,11,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2.5 group border border-[#D4AF37]/50"
            >
              <span>EXPLORE DESTINATIONS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenEnquiry('General Enquiry')}
              data-cursor="PLAN"
              className="w-full sm:w-auto px-8 py-3.5 glass-pill-dark hover:bg-[#D4AF37] hover:text-black text-[#F3E5AB] font-semibold text-xs tracking-[0.25em] uppercase rounded-full transition-all duration-300 shadow-md hover:scale-105"
            >
              PLAN YOUR VISIT
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Scroll Down Prompt & Discreet Media Controls */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs text-[#F3E5AB] pt-4">
        {/* Scroll Down Prompt */}
        <div
          onClick={onExploreClick}
          className="flex items-center space-x-2 cursor-pointer hover:text-white transition-colors group"
        >
          <span className="text-[10px] tracking-[0.3em] font-semibold uppercase text-[#F3E5AB]/85 group-hover:text-[#D4AF37] transition-colors">
            SCROLL TO EXPLORE
          </span>
          <div className="w-6 h-6 rounded-full border border-[#D4AF37]/50 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
            <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
          </div>
        </div>

        {/* Video / Audio Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlayPause}
            className="p-2 sm:p-2.5 rounded-full glass-pill-dark text-[#F3E5AB] hover:text-white hover:border-[#D4AF37] hover:scale-105 transition-all shadow-md"
            title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="p-2 sm:p-2.5 rounded-full glass-pill-dark text-[#F3E5AB] hover:text-white hover:border-[#D4AF37] hover:scale-105 transition-all shadow-md"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
