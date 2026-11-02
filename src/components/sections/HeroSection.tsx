'use client';

import React from 'react';
import { ScrollVideoHero } from './ScrollVideoHero';
import { PropertyItem } from '../../types';

interface HeroSectionProps {
  onOpenEnquiry: (option?: string) => void;
  onExploreClick: () => void;
  onSelectProperty: (property: PropertyItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnquiry,
  onExploreClick,
  onSelectProperty,
}) => {
  return (
    <ScrollVideoHero
      onOpenEnquiry={onOpenEnquiry}
      onExploreClick={onExploreClick}
      onSelectProperty={onSelectProperty}
    />
  );
};


