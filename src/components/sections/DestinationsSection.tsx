'use me';
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles, Phone } from 'lucide-react';
import { PROPERTIES } from '../../data/vinhareData';
import { PropertyItem } from '../../types';

interface DestinationsSectionProps {
  onSelectProperty: (property: PropertyItem) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectProperty,
}) => {
  // Filter out wedding service for destinations section, keeping the 3 resorts
  const resortProperties = PROPERTIES.filter(
    (p) => p.id === 'shiv-garden-resort' || p.id === 'jp-resort' || p.id === 'resort-raj'
  );

  return (
    <section
      id="destinations"
      className="relative py-32 bg-[#FDFBF7] text-[#1A1814] overflow-hidden border-t border-[#D4AF37]/25"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#F7E7B4]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#D4AF37]/30">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-[1.5px] w-10 bg-[#B8860B]" />
              <span className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-bold">
                OUR DESTINATIONS
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl tracking-[0.08em] text-[#1A1814] font-light">
              DISCOVER VINHARE
            </h2>
          </div>

          <p className="text-sm text-[#52483B] font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Three distinctive luxury properties across Bihar, each crafted with specialized architecture, expansive event grounds, and serene stay comfort.
          </p>
        </div>

        {/* 3D Physical Interactive Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resortProperties.map((property, idx) => (
            <Destination3DCard
              key={property.id}
              property={property}
              index={idx}
              onSelect={() => onSelectProperty(property)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Card3DProps {
  property: PropertyItem;
  index: number;
  onSelect: () => void;
}

const Destination3DCard: React.FC<Card3DProps> = ({ property, index, onSelect }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightX, setLightX] = useState(50);
  const [lightY, setLightY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setLightX((x / rect.width) * 100);
    setLightY((y / rect.height) * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="perspective-1000"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onSelect}
        data-cursor="EXPLORE"
        className="group relative rounded-2xl overflow-hidden glass-panel-gold border-2 border-[#D4AF37]/35 p-4 transition-all duration-300 cursor-pointer shadow-[0_15px_40px_rgba(184,134,11,0.12)]"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cursor Light Reflection Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(212, 175, 55, 0.3) 0%, transparent 60%)`,
          }}
        />

        {/* 3D Parallax Image Container */}
        <div
          className="relative aspect-[4/5] rounded-xl overflow-hidden transition-transform duration-500 ease-out"
          style={{
            transform: isHovered ? 'translateZ(30px) scale(1.03)' : 'translateZ(0px) scale(1)',
          }}
        >
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1814] via-[#1A1814]/30 to-transparent opacity-85" />

          {/* Type Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] font-bold text-[#F3E5AB] bg-[#1A1814]/80 backdrop-blur-md border border-[#D4AF37]/40 uppercase">
              {property.type}
            </span>
          </div>

          {/* Action Arrow Icon */}
          <div
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#1A1814]/80 border border-[#D4AF37]/50 flex items-center justify-center text-[#F3E5AB] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300"
            style={{
              transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)',
            }}
          >
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>

          {/* Card Content Overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col space-y-3 transition-transform duration-300"
            style={{
              transform: isHovered ? 'translateZ(35px)' : 'translateZ(0)',
            }}
          >
            <h3 className="font-serif-luxury text-3xl font-light text-white group-hover:text-[#F3E5AB] transition-colors">
              {property.name}
            </h3>

            <p className="text-xs text-[#EADCC9]/90 line-clamp-2 font-light leading-relaxed">
              {property.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/30 text-[11px] text-[#F3E5AB]">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{property.location}</span>
              </span>
              <span className="tracking-widest uppercase font-bold text-[#F3E5AB] group-hover:underline">
                EXPLORE DESTINATION →
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
