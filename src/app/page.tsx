'use client';

import React, { useState } from 'react';
import { SmoothScrollProvider } from '../components/providers/SmoothScrollProvider';
import { CustomCursor } from '../components/ui/CustomCursor';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { Navbar } from '../components/ui/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import { IntroSection } from '../components/sections/IntroSection';
import { DestinationsSection } from '../components/sections/DestinationsSection';
import { DestinationShowcase } from '../components/sections/DestinationShowcase';
import { WeddingsSection } from '../components/sections/WeddingsSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { GallerySection } from '../components/sections/GallerySection';
import { AboutSection } from '../components/sections/AboutSection';
import { NetworkMapSection } from '../components/sections/NetworkMapSection';
import { EnquiryModal } from '../components/modals/EnquiryModal';
import { PropertyDetailModal } from '../components/modals/PropertyDetailModal';
import { Footer } from '../components/ui/Footer';
import { BackToTop } from '../components/ui/BackToTop';
import { PropertyItem } from '../types';

export default function Home() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [enquiryPreselect, setEnquiryPreselect] = useState<string | undefined>(undefined);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);

  const handleOpenEnquiry = (preselect?: string) => {
    setEnquiryPreselect(preselect);
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  const handleSelectProperty = (property: PropertyItem) => {
    setSelectedProperty(property);
  };

  const handleClosePropertyModal = () => {
    setSelectedProperty(null);
  };

  const handleExploreClick = () => {
    if (typeof window !== 'undefined' && (window as unknown as { __lenis?: { scrollTo: (target: string, opts: unknown) => void } }).__lenis) {
      (window as unknown as { __lenis?: { scrollTo: (target: string, opts: unknown) => void } }).__lenis?.scrollTo('#destinations', { offset: -70, duration: 1.4 });
    } else {
      const destEl = document.querySelector('#destinations');
      if (destEl) destEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SmoothScrollProvider>
      {/* Custom Luxury Mouse Cursor */}
      <CustomCursor />

      {/* Initial Minimal Brand Loading Reveal */}
      <LoadingScreen />

      {/* Floating Header Navbar */}
      <Navbar
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Main Page Flow */}
      <main className="relative z-10 bg-[#FDFBF7]">
        {/* Hero Section — Frame-by-frame Scroll Driven Video & Glass UI */}
        <HeroSection
          onOpenEnquiry={handleOpenEnquiry}
          onExploreClick={handleExploreClick}
          onSelectProperty={handleSelectProperty}
        />

        {/* Intro Section — Editorial Philosophy */}
        <IntroSection />

        {/* Destinations — 3D Physical Cards */}
        <DestinationsSection
          onSelectProperty={handleSelectProperty}
        />

        {/* Destination Showcase — Horizontal Scroll */}
        <DestinationShowcase
          onSelectProperty={handleSelectProperty}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Weddings — Mithila Marriage Services & 3D Transition */}
        <WeddingsSection
          onOpenEnquiry={handleOpenEnquiry}
          onSelectProperty={handleSelectProperty}
        />

        {/* Experience Section — 5 Cinematic Pillars */}
        <ExperienceSection
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Gallery Preview — Moments at Vinhare */}
        <GallerySection />

        {/* About Vinhare — Brand Story */}
        <AboutSection />

        {/* Vinhare Network — Bihar Map */}
        <NetworkMapSection
          onSelectProperty={handleSelectProperty}
        />
      </main>

      {/* Grand Luxury Footer */}
      <Footer
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Floating Smooth Glide Back To Top */}
      <BackToTop />

      {/* Interactive 5-Step Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        preselectedOption={enquiryPreselect}
      />

      {/* Cinematic Property Detail Page Transition Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={handleClosePropertyModal}
        onOpenEnquiry={handleOpenEnquiry}
      />
    </SmoothScrollProvider>
  );
}
