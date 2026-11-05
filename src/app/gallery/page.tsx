'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  MapPin,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { EnquiryModal } from '../../components/modals/EnquiryModal';
import { CustomCursor } from '../../components/ui/CustomCursor';
import { SmoothScrollProvider } from '../../components/providers/SmoothScrollProvider';
import { BackToTop } from '../../components/ui/BackToTop';
import { BRAND_INFO } from '../../data/vinhareData';

interface GalleryItemDef {
  id: string;
  title: string;
  property: string;
  category: 'ALL' | 'SHIV GARDEN' | 'JP RESORT' | 'RAJ RESORT' | 'RESORTS' | 'WEDDINGS' | 'EVENTS' | 'EXPERIENCES';
  image: string;
  aspect: 'wide' | 'tall' | 'square';
  caption: string;
}

const ALL_GALLERY_PHOTOS: GalleryItemDef[] = [
  // 18 Authentic Shiv Garden Photos from media\siv gadern
  {
    id: 'sg-1',
    title: 'Shiv Garden Resort - Grand Celebration Lawn',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_2974.jpg',
    aspect: 'wide',
    caption: 'Expansive open-air manicured lawns framed by royal palm trees and evening illumination.',
  },
  {
    id: 'sg-2',
    title: 'Shiv Garden Resort - Royal Arrival Pathway',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_2976.jpg',
    aspect: 'wide',
    caption: 'Welcoming procession avenue paved for royal baraat and guest arrivals.',
  },
  {
    id: 'sg-3',
    title: 'Shiv Garden Resort - Courtyard Lawns & Flora',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_2982.jpg',
    aspect: 'wide',
    caption: 'Lush green tropical gardens curated for serene leisure and daytime gatherings.',
  },
  {
    id: 'sg-4',
    title: 'Shiv Garden Resort - Palatial Banquet Facade',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_2999.jpg',
    aspect: 'wide',
    caption: 'Opulent architecture and grand banquet hall entrance illuminated with golden light.',
  },
  {
    id: 'sg-5',
    title: 'Shiv Garden Resort - Evening Event Pavilion',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3002.jpg',
    aspect: 'wide',
    caption: 'High-ceilinged banquet space engineered for majestic wedding feasts and receptions.',
  },
  {
    id: 'sg-6',
    title: 'Shiv Garden Resort - VIP Guest Suites Wing',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3006.jpg',
    aspect: 'wide',
    caption: 'Plush air-conditioned suites offering modern luxury comfort away from urban noise.',
  },
  {
    id: 'sg-7',
    title: 'Shiv Garden Resort - Central Courtyard Promenade',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3008.jpg',
    aspect: 'wide',
    caption: 'Paved walkways connecting guest accommodation pavilions with main festival lawns.',
  },
  {
    id: 'sg-8',
    title: 'Shiv Garden Resort - Manicured Garden Sanctuary',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3009.jpg',
    aspect: 'wide',
    caption: 'Peaceful garden seating framed by blooming flowers and decorative ornamental plants.',
  },
  {
    id: 'sg-9',
    title: 'Shiv Garden Resort - Palm Grove & Open Skies',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3015.jpg',
    aspect: 'wide',
    caption: 'Sprawling natural sanctuary capturing authentic Bihar open-air beauty.',
  },
  {
    id: 'sg-10',
    title: 'Shiv Garden Resort - Reception Lawns Daytime',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3020.jpg',
    aspect: 'wide',
    caption: 'Crisp green lawns ready for daytime ceremonies, haldi, and pre-wedding celebrations.',
  },
  {
    id: 'sg-11',
    title: 'Shiv Garden Resort - Outer Perimeter Lawns',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3047.jpg',
    aspect: 'wide',
    caption: 'Extensive multi-acre boundary accommodating thousands of celebratory guests.',
  },
  {
    id: 'sg-12',
    title: 'Shiv Garden Resort - Evening Staging Grounds',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3066.jpg',
    aspect: 'wide',
    caption: 'Festive staging setup for music, sangeet performances, and banquet dining.',
  },
  {
    id: 'sg-13',
    title: 'Shiv Garden Resort - Architecture & Avenues',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3069.jpg',
    aspect: 'wide',
    caption: 'Harmonious blend of traditional Indian aesthetic with spacious modern layouts.',
  },
  {
    id: 'sg-14',
    title: 'Shiv Garden Resort - Suite Terrace View',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3072.jpg',
    aspect: 'wide',
    caption: 'Scenic overlooking vistas across green treetops and private courtyard gardens.',
  },
  {
    id: 'sg-15',
    title: 'Shiv Garden Resort - Banquet Gateway',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3073.jpg',
    aspect: 'wide',
    caption: 'Ornate arched entrance welcoming guests to grand indoor celebration halls.',
  },
  {
    id: 'sg-16',
    title: 'Shiv Garden Resort - Evening Panorama',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3082.jpg',
    aspect: 'wide',
    caption: 'Glow of twilight lanterns setting an unforgettable mood for wedding receptions.',
  },
  {
    id: 'sg-17',
    title: 'Shiv Garden Resort - Soaring Heritage Tower',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3907.jpg',
    aspect: 'tall',
    caption: 'Iconic palatial architectural tower soaring above the central courtyard.',
  },
  {
    id: 'sg-18',
    title: 'Shiv Garden Resort - Royal Façade Perspective',
    property: 'Shiv Garden Resort',
    category: 'SHIV GARDEN',
    image: '/images/shiv-garden/IMG_3908.jpg',
    aspect: 'tall',
    caption: 'Classical stone columns and regal archway details highlighting royal craftsmanship.',
  },

  // 5 Authentic J.P. Resort Photos from media\jp resort
  {
    id: 'jp-1',
    title: 'J.P. Resort - Grand Wedding Mandap & Floral Stage',
    property: 'J.P. Resort',
    category: 'JP RESORT',
    image: '/images/jp-resort/IMG_3992.jpg',
    aspect: 'tall',
    caption: 'Regal wedding stage adorned with cascading floral arches, tiered purple dais, and golden ambient illumination.',
  },
  {
    id: 'jp-2',
    title: 'J.P. Resort - Ceremonial Floral Arches & Fairy Lighting',
    property: 'J.P. Resort',
    category: 'JP RESORT',
    image: '/images/jp-resort/IMG_3993.jpg',
    aspect: 'tall',
    caption: 'Magnificent festive backdrop with multi-tier flower arrangements and sparkling twilight fairy light curtains.',
  },
  {
    id: 'jp-3',
    title: 'J.P. Resort - Floral Canopy & Bridal Dais Detail',
    property: 'J.P. Resort',
    category: 'JP RESORT',
    image: '/images/jp-resort/IMG_3995.jpg',
    aspect: 'tall',
    caption: 'Close-up perspective of the exquisite bridal seating platform and sculpted floral chandeliers.',
  },
  {
    id: 'jp-4',
    title: 'J.P. Resort - Traditional Wedding Mural & Stage Pavilion',
    property: 'J.P. Resort',
    category: 'JP RESORT',
    image: '/images/jp-resort/IMG_3996.jpg',
    aspect: 'tall',
    caption: 'Traditional cultural wedding painting featuring royal bride and groom alongside majestic peacocks.',
  },
  {
    id: 'jp-5',
    title: 'J.P. Resort - Grand Banqueting Staging Perspective',
    property: 'J.P. Resort',
    category: 'JP RESORT',
    image: '/images/jp-resort/IMG_3997.jpg',
    aspect: 'tall',
    caption: 'Panoramic elevated angle showcasing the expansive ceremonial stage and celebratory carpet.',
  },
  {
    id: 'jp-suite',
    title: 'J.P. Resort - Modern Villa Suite & Courtyard',
    property: 'J.P. Resort',
    category: 'JP RESORT',
    image: '/images/jp_resort.jpg',
    aspect: 'tall',
    caption: 'Contemporary luxury suite architecture opening towards serene garden courtyards.',
  },

  // 26 Authentic Resort Raj Photos from media\raj reosrt
  {
    id: 'raj-1',
    title: 'Resort Raj - Rock Garden & Rustic Waterfall Bridge',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1835.webp',
    aspect: 'wide',
    caption: 'Signature landscaped rock waterfall with wooden arched bridge, ornamental swans, and resort crest.',
  },
  {
    id: 'raj-2',
    title: 'Resort Raj - Palatial Swimming Pool & Sun Courtyard',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1821.webp',
    aspect: 'wide',
    caption: 'Vibrant swimming pool framed by classical palace columns, tall arched windows, and poolside loungers.',
  },
  {
    id: 'raj-3',
    title: 'Resort Raj - Luxury Master Bedchamber & Geometric Suite',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1720.webp',
    aspect: 'wide',
    caption: 'Opulent king-sized master suite with modern triangle upholstered headboard, golden lamps, and mirrors.',
  },
  {
    id: 'raj-4',
    title: 'Resort Raj - Palace Promenade & Fine Art Corridor',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1760.webp',
    aspect: 'tall',
    caption: 'Grand hallway with black marble trim, polished marble flooring, and framed classical paintings.',
  },
  {
    id: 'raj-5',
    title: 'Resort Raj - Arched Bistro Cafe & Dining Lounge',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1800.webp',
    aspect: 'wide',
    caption: 'Stylish cafe lounge with teal velvet dining chairs, marble-topped tables, and arched windows.',
  },
  {
    id: 'raj-6',
    title: 'Resort Raj - Stepping Stone Pathway & Swan Basin',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1831.webp',
    aspect: 'tall',
    caption: 'Curved stone garden footpath leading across serene waterways and lush landscaped greenery.',
  },
  {
    id: 'raj-7',
    title: 'Resort Raj - Luxury Poolside Deck & Palace Wing',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1825.webp',
    aspect: 'wide',
    caption: 'Expansive pool deck with kid wading basin, surrounding sun loungers, and decorative lighting.',
  },
  {
    id: 'raj-8',
    title: 'Resort Raj - VIP Executive Suite Bedchamber',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1723.webp',
    aspect: 'wide',
    caption: 'Spacious guest accommodation featuring warm ambient backlighting and plush bedding.',
  },
  {
    id: 'raj-9',
    title: 'Resort Raj - Heritage Palace Façade & Pillars',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj_resort.webp',
    aspect: 'wide',
    caption: 'Regal Indian architecture with grand white portico, majestic archways, and palatial entrance.',
  },
  {
    id: 'raj-10',
    title: 'Resort Raj - Tropical Garden Lawns & Palace Grounds',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1844.webp',
    aspect: 'wide',
    caption: 'Manicured green lawn surrounded by mature palms, natural stone feature walls, and event staging.',
  },
  {
    id: 'raj-11',
    title: 'Resort Raj - VIP Lounge & Sculpture Relief Art',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1770.webp',
    aspect: 'tall',
    caption: 'Intimate reception lounge with classical equestrian sculpture, chandelier, and plush velvet seating.',
  },
  {
    id: 'raj-12',
    title: 'Resort Raj - Cinema Art Staircase & Poster Gallery',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1788.webp',
    aspect: 'tall',
    caption: 'Architectural black granite staircase lined with vintage Indian cinema artwork leading to suites.',
  },
  {
    id: 'raj-13',
    title: 'Resort Raj - Luxury Suite Vanity & Accent Lighting',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1732.webp',
    aspect: 'tall',
    caption: 'Designer bedside lighting, illuminated vanity mirrors, and refined wood wall paneling.',
  },
  {
    id: 'raj-14',
    title: 'Resort Raj - Executive Dressing Area & Suite Comfort',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1726.webp',
    aspect: 'wide',
    caption: 'Contemporary bedroom setup complete with bedside controls, ambient sconces, and polished floors.',
  },
  {
    id: 'raj-15',
    title: 'Resort Raj - Entertainment Console & In-Room Bar',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1750.webp',
    aspect: 'tall',
    caption: 'In-suite smart entertainment display, minibar refrigerator, and bespoke wooden desk cabinetry.',
  },
  {
    id: 'raj-16',
    title: 'Resort Raj - Fine Dining Hall & Event Seating',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1805.webp',
    aspect: 'wide',
    caption: 'Warmly lit dining hall designed for family feasts, celebrations, and corporate hospitality.',
  },
  {
    id: 'raj-17',
    title: 'Resort Raj - Private Dining Alcove & Accent Walls',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1810.webp',
    aspect: 'wide',
    caption: 'Cozy seating booths with modern wooden privacy screens and inspirational art displays.',
  },
  {
    id: 'raj-18',
    title: 'Resort Raj - Gourmet Hospitality Counter',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1815.webp',
    aspect: 'wide',
    caption: 'Dedicated restaurant service station and beverage counter serving authentic regional specialties.',
  },
  {
    id: 'raj-19',
    title: 'Resort Raj - Tropical Rockery & Water Fountain',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1838.webp',
    aspect: 'wide',
    caption: 'Ornate natural stone rockery with flowing waters, decorative urns, and flowering plants.',
  },
  {
    id: 'raj-20',
    title: 'Resort Raj - Manicured Festival Grounds',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1840.webp',
    aspect: 'wide',
    caption: 'Expansive open-air event grounds suited for majestic wedding processions and receptions.',
  },
  {
    id: 'raj-21',
    title: 'Resort Raj - Palatial Grounds Panorama',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1847.webp',
    aspect: 'wide',
    caption: 'Wide angle view of the estate gardens, event staging infrastructure, and boundary greenery.',
  },
  {
    id: 'raj-22',
    title: 'Resort Raj - Grand Entrance Portico',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/hero_resort.jpg',
    aspect: 'wide',
    caption: 'Imposing classical palace entrance with towering colonnades and broad arrival avenue.',
  },
  {
    id: 'raj-23',
    title: 'Resort Raj - Deluxe Suite Double Bedroom',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1730.webp',
    aspect: 'wide',
    caption: 'Inviting double suite arrangement featuring tasteful interior decor and climate control.',
  },
  {
    id: 'raj-24',
    title: 'Resort Raj - Luxury Bedside Detail & Golden Glow',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1738.webp',
    aspect: 'wide',
    caption: 'Cozy night lighting casting a serene golden glow throughout the accommodation quarters.',
  },
  {
    id: 'raj-25',
    title: 'Resort Raj - Gallery Promenade Long Perspective',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1766.webp',
    aspect: 'tall',
    caption: 'Symmetric hallway lined with tall windows welcoming abundant natural daylight.',
  },
  {
    id: 'raj-26',
    title: 'Resort Raj - Classical Drawing Room Suite',
    property: 'Resort Raj',
    category: 'RAJ RESORT',
    image: '/images/raj-resort/DSC_1775.webp',
    aspect: 'tall',
    caption: 'Elegant waiting foyer tailored for guest relaxation and dignitary welcoming.',
  },
  {
    id: 'sg-night',
    title: 'Shiv Garden Resort - Golden Night Illumination',
    property: 'Shiv Garden Resort',
    category: 'EVENTS',
    image: '/images/shiv_garden_night.jpeg',
    aspect: 'tall',
    caption: 'Spectacular nocturnal lighting transforming the resort into a glowing wonderland.',
  },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [enquiryPreselect, setEnquiryPreselect] = useState<string | undefined>(undefined);

  const filterTabs = [
    { id: 'ALL', label: 'All Photos', count: ALL_GALLERY_PHOTOS.length },
    {
      id: 'SHIV GARDEN',
      label: 'Shiv Garden Resort',
      count: ALL_GALLERY_PHOTOS.filter((p) => p.category === 'SHIV GARDEN' || p.property === 'Shiv Garden Resort').length,
    },
    {
      id: 'JP RESORT',
      label: 'J.P. Resort',
      count: ALL_GALLERY_PHOTOS.filter((p) => p.category === 'JP RESORT' || p.property === 'J.P. Resort').length,
    },
    {
      id: 'RAJ RESORT',
      label: 'Resort Raj',
      count: ALL_GALLERY_PHOTOS.filter((p) => p.category === 'RAJ RESORT' || p.property === 'Resort Raj').length,
    },
    {
      id: 'RESORTS',
      label: 'Resorts & Stays',
      count: ALL_GALLERY_PHOTOS.filter((p) => p.category === 'RESORTS' || p.category === 'SHIV GARDEN' || p.category === 'JP RESORT' || p.category === 'RAJ RESORT').length,
    },
    {
      id: 'WEDDINGS',
      label: 'Royal Weddings',
      count: ALL_GALLERY_PHOTOS.filter((p) => p.category === 'WEDDINGS' || p.title.toLowerCase().includes('wedding') || p.caption.toLowerCase().includes('wedding') || p.property === 'Mithila Marriage Services').length,
    },
    {
      id: 'EVENTS',
      label: 'Celebrations & Banquets',
      count: ALL_GALLERY_PHOTOS.filter((p) => p.category === 'EVENTS' || p.category === 'SHIV GARDEN' || p.property === 'J.P. Resort').length,
    },
    {
      id: 'EXPERIENCES',
      label: 'Dining & Leisure',
      count: ALL_GALLERY_PHOTOS.filter((p) => p.category === 'EXPERIENCES' || p.title.toLowerCase().includes('dining') || p.title.toLowerCase().includes('pool') || p.title.toLowerCase().includes('garden') || p.title.toLowerCase().includes('bistro')).length,
    },
  ];

  const displayedPhotos =
    activeTab === 'ALL'
      ? ALL_GALLERY_PHOTOS
      : activeTab === 'SHIV GARDEN'
      ? ALL_GALLERY_PHOTOS.filter(
          (p) => p.category === 'SHIV GARDEN' || p.property === 'Shiv Garden Resort'
        )
      : activeTab === 'JP RESORT'
      ? ALL_GALLERY_PHOTOS.filter(
          (p) => p.category === 'JP RESORT' || p.property === 'J.P. Resort'
        )
      : activeTab === 'RAJ RESORT'
      ? ALL_GALLERY_PHOTOS.filter(
          (p) => p.category === 'RAJ RESORT' || p.property === 'Resort Raj'
        )
      : activeTab === 'RESORTS'
      ? ALL_GALLERY_PHOTOS.filter(
          (p) =>
            p.category === 'RESORTS' ||
            p.category === 'SHIV GARDEN' ||
            p.category === 'JP RESORT' ||
            p.category === 'RAJ RESORT'
        )
      : activeTab === 'WEDDINGS'
      ? ALL_GALLERY_PHOTOS.filter(
          (p) =>
            p.category === 'WEDDINGS' ||
            p.title.toLowerCase().includes('wedding') ||
            p.caption.toLowerCase().includes('wedding') ||
            p.property === 'Mithila Marriage Services'
        )
      : activeTab === 'EVENTS'
      ? ALL_GALLERY_PHOTOS.filter(
          (p) =>
            p.category === 'EVENTS' ||
            p.category === 'SHIV GARDEN' ||
            p.property === 'J.P. Resort'
        )
      : activeTab === 'EXPERIENCES'
      ? ALL_GALLERY_PHOTOS.filter(
          (p) =>
            p.category === 'EXPERIENCES' ||
            p.title.toLowerCase().includes('dining') ||
            p.title.toLowerCase().includes('pool') ||
            p.title.toLowerCase().includes('garden') ||
            p.title.toLowerCase().includes('bistro')
        )
      : ALL_GALLERY_PHOTOS.filter((p) => p.category === activeTab);

  const openLightbox = (index: number) => {
    setLightboxIdx(index);
  };

  const closeLightbox = () => {
    setLightboxIdx(null);
  };

  const nextPhoto = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % displayedPhotos.length);
  };

  const prevPhoto = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + displayedPhotos.length) % displayedPhotos.length);
  };

  const handleOpenEnquiry = (preselect?: string) => {
    setEnquiryPreselect(preselect);
    setIsEnquiryOpen(true);
  };

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar onOpenEnquiry={() => handleOpenEnquiry('General Enquiry')} />

      <main className="min-h-screen bg-[#FDFBF7] text-[#1A1814] pt-28 pb-20 overflow-hidden">
        {/* Gallery Hero Banner */}
        <section className="relative px-6 md:px-12 max-w-7xl mx-auto pt-6 pb-12 border-b border-[#D4AF37]/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF4E6] border border-[#D4AF37]/50 mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-bold text-[#B8860B] uppercase">
                  VISUAL ANTHOLOGY & REAL PROPERTY SPACES
                </span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#1A1814] tracking-[0.05em] leading-tight">
                MOMENTS AT VINHARE
              </h1>

              <p className="text-sm sm:text-base font-light text-[#52483B] mt-3 leading-relaxed">
                Immerse yourself in authentic views across our landmark destinations. Featuring real photo archives from <strong className="font-semibold text-[#B8860B]">Shiv Garden Resort</strong>, alongside J.P. Resort, Resort Raj, and Mithila Marriage Services.
              </p>
            </div>

            {/* Quick Action Pill */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <button
                onClick={() => handleOpenEnquiry('Shiv Garden Resort')}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white text-xs font-bold tracking-[0.2em] uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2 border border-[#D4AF37]/60"
              >
                <span>BOOK A VISIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-8 pb-2 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white shadow-md border border-[#D4AF37]'
                    : 'bg-white/80 text-[#6B5E4F] border border-[#D4AF37]/30 hover:border-[#B8860B] hover:text-[#1A1814]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? 'bg-black/20 text-white'
                      : 'bg-[#F2ECE1] text-[#8C8275]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {displayedPhotos.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.03 }}
                  onClick={() => openLightbox(idx)}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/35 group cursor-pointer break-inside-avoid shadow-[0_15px_40px_rgba(184,134,11,0.08)] hover:border-[#D4AF37]/80 hover:shadow-[0_20px_50px_rgba(184,134,11,0.18)] transition-all"
                >
                  <div
                    className={`relative w-full overflow-hidden ${
                      photo.aspect === 'tall'
                        ? 'aspect-[3/4]'
                        : photo.aspect === 'wide'
                        ? 'aspect-[16/10]'
                        : 'aspect-square'
                    }`}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Property Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="glass-pill-dark px-3 py-1 rounded-full text-[9px] tracking-[0.2em] font-bold text-[#F3E5AB] uppercase border border-[#D4AF37]/40 shadow-sm flex items-center space-x-1">
                        <Camera className="w-3 h-3 text-[#D4AF37]" />
                        <span>{photo.property}</span>
                      </span>
                    </div>

                    {/* Expand icon on hover */}
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                      <Maximize2 className="w-3.5 h-3.5 text-[#F3E5AB]" />
                    </div>

                    {/* Bottom Caption Box */}
                    <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                      <h3 className="font-serif-luxury text-base sm:text-lg font-light text-white group-hover:text-[#F3E5AB] transition-colors leading-snug">
                        {photo.title}
                      </h3>
                      <p className="text-[11px] text-[#D8CFBC] font-light mt-1 line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Fullscreen Interactive Lightbox Modal */}
        <AnimatePresence>
          {lightboxIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
            >
              {/* Lightbox Top Header */}
              <div className="flex items-center justify-between text-white z-10 px-2 sm:px-6">
                <div className="flex items-center space-x-3">
                  <span className="font-serif-luxury text-lg sm:text-xl text-[#F3E5AB] tracking-widest">
                    VINHARE
                  </span>
                  <span className="text-xs text-[#8C8275]">/</span>
                  <span className="text-xs tracking-[0.2em] font-mono text-[#D4AF37] uppercase">
                    {displayedPhotos[lightboxIdx].property} • {lightboxIdx + 1} OF{' '}
                    {displayedPhotos.length}
                  </span>
                </div>

                <button
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                  title="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Image Display */}
              <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden px-2 sm:px-12">
                <motion.img
                  key={displayedPhotos[lightboxIdx].id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={displayedPhotos[lightboxIdx].image}
                  alt={displayedPhotos[lightboxIdx].title}
                  className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                />

                {/* Nav Arrows */}
                {displayedPhotos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevPhoto();
                      }}
                      className="absolute left-2 sm:left-6 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-[#D4AF37] hover:text-black text-white transition-all border border-white/20 shadow-2xl"
                      title="Previous Photo"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextPhoto();
                      }}
                      className="absolute right-2 sm:right-6 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-[#D4AF37] hover:text-black text-white transition-all border border-white/20 shadow-2xl"
                      title="Next Photo"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption Banner & Thumbnail Carousel */}
              <div className="max-w-4xl mx-auto w-full flex flex-col items-center space-y-2 z-10">
                <div className="text-center px-4">
                  <h4 className="font-serif-luxury text-base sm:text-xl text-white">
                    {displayedPhotos[lightboxIdx].title}
                  </h4>
                  <p className="text-xs text-[#D8CFBC] font-light max-w-xl mx-auto mt-0.5">
                    {displayedPhotos[lightboxIdx].caption}
                  </p>
                </div>

                {/* Thumbnails strip */}
                <div className="flex items-center space-x-2 overflow-x-auto py-2 px-4 max-w-full scrollbar-none">
                  {displayedPhotos.map((photo, tIdx) => (
                    <button
                      key={photo.id}
                      onClick={() => setLightboxIdx(tIdx)}
                      className={`flex-shrink-0 w-12 h-9 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        lightboxIdx === tIdx
                          ? 'border-[#D4AF37] scale-105 shadow-md ring-1 ring-[#D4AF37]'
                          : 'border-white/20 opacity-45 hover:opacity-100'
                      }`}
                      title={photo.title}
                    >
                      <img src={photo.image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onOpenEnquiry={() => handleOpenEnquiry('General Enquiry')} />
      <BackToTop />
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedOption={enquiryPreselect}
      />
    </SmoothScrollProvider>
  );
}
