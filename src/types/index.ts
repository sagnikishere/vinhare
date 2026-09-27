export interface PropertyItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  type: string; // RESORT • STAY • EVENTS
  description: string;
  tagline: string;
  image: string;
  gallery: string[];
  features: string[];
  location: string;
  phone: string;
  capacity?: string;
  highlights: {
    title: string;
    desc: string;
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ALL' | 'RESORTS' | 'WEDDINGS' | 'EVENTS' | 'EXPERIENCES';
  property: string;
  image: string;
  aspect: 'square' | 'tall' | 'wide';
}

export interface HotspotItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  iconName: string;
  details: string[];
}

export interface NetworkLocation {
  id: string;
  name: string;
  region: string;
  property: string;
  x: number; // Percentage on map canvas
  y: number;
  image: string;
  type: string;
  description: string;
}

export interface EnquiryFormData {
  occasion: string;
  destination: string;
  date: string;
  guests: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}
