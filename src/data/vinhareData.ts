import { PropertyItem, GalleryItem, HotspotItem, NetworkLocation } from '../types';

export const BRAND_INFO = {
  name: 'VINHARE HOTEL & RESORT',
  parentName: 'Vinhare Hospitality Group',
  taglinePrimary: 'One Group. Multiple Destinations.',
  taglineSecondary: 'Creating Experiences. Delivering Excellence.',
  phone: '+91 9122276844',
  phoneFormatted: '+91 91222 76844',
  location: 'Bihar, India',
  email: 'concierge@vinhare.com',
  copyrightYear: 2026,
  socialLinks: {
    instagram: 'https://instagram.com/vinhareresort',
    facebook: 'https://facebook.com/vinharehospitality',
    whatsapp: 'https://wa.me/919122276844',
  },
};

export const PROPERTIES: PropertyItem[] = [
  {
    id: 'shiv-garden-resort',
    slug: 'shiv-garden-resort',
    name: 'Shiv Garden Resort',
    subtitle: 'Lush Lawns & Regal Celebrations',
    type: 'RESORT • STAY • EVENTS',
    description:
      'Shiv Garden Resort offers an atmospheric blend of opulent garden lawns, courtyard architecture, and high-end event spaces. Crafted for serene stays and unforgettable gatherings.',
    tagline: 'Where natural elegance meets timeless hospitality.',
    image: '/images/shiv_garden_day.jpeg',
    gallery: [
      '/images/shiv_garden_day.jpeg',
      '/images/shiv_garden_night.jpeg',
      '/images/shiv_garden_resort.jpg',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    ],
    features: [
      'Expansive Manicured Event Lawns',
      'Luxury Guest Accommodation Suites',
      'Grand Banquet & Celebration Halls',
      'Atmospheric Evening Lighting',
      'In-House Catering & Hospitality Team',
    ],
    location: 'Bihar, India',
    phone: '+91 9122276844',
    highlights: [
      {
        title: 'Manicured Lawns',
        desc: 'Vast landscaped green spaces suitable for large celebrations, evening receptions, and open-air gatherings.',
      },
      {
        title: 'Sanctuary Stays',
        desc: 'Thoughtfully appointed rooms and suites providing peaceful rest away from urban noise.',
      },
      {
        title: 'Bespoke Event Support',
        desc: 'Dedicated event management coordinating decor, lighting, and guest hospitality.',
      },
    ],
  },
  {
    id: 'jp-resort',
    slug: 'jp-resort',
    name: 'J.P. Resort',
    subtitle: 'Modern Luxury Stays & Celebrations',
    type: 'RESORT • CELEBRATIONS • STAYS',
    description:
      'J.P. Resort is designed for guests seeking refined leisure, contemporary suite comfort, and serene surroundings. Perfect for family retreats, intimate ceremonies, and relaxing stays.',
    tagline: 'Spaces designed to slow down time.',
    image: '/images/jp_resort.jpg',
    gallery: [
      '/images/jp_resort.jpg',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop',
    ],
    features: [
      'Reflecting Pools & Courtyard Lounge',
      'Contemporary Air-Conditioned Suites',
      'Private Dining & Banquet Courtyards',
      'Verdant Tropical Landscaping',
      '24/7 Dedicated Concierge Care',
    ],
    location: 'Bihar, India',
    phone: '+91 9122276844',
    highlights: [
      {
        title: 'Serene Architecture',
        desc: 'Sleek stone lines, glowing ambient warm lights, and private outdoor lounge terraces.',
      },
      {
        title: 'Celebration Courtyards',
        desc: 'Ideal spaces for birthdays, family anniversaries, corporate retreats, and engagement events.',
      },
      {
        title: 'Refined Dining',
        desc: 'Authentic Indian hospitality paired with fresh regional cuisines served in elegant settings.',
      },
    ],
  },
  {
    id: 'resort-raj',
    slug: 'resort-raj',
    name: 'Resort Raj',
    subtitle: 'Heritage Elegance & Royal Hospitality',
    type: 'RESORT • EVENTS • HOSPITALITY',
    description:
      'Resort Raj embodies royal Indian grace and classical architecture. Featuring soaring arched entrances, majestic pillars, and sprawling banquet spaces for grand occasions.',
    tagline: 'Experience royal granduer and gracious hospitality.',
    image: '/images/raj_resort.webp',
    gallery: [
      '/images/raj_resort.webp',
      '/images/hero_resort.jpg',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200&auto=format&fit=crop',
    ],
    features: [
      'Heritage Royal Façade & Pillars',
      'Spacious Grand Ballroom & Banquet',
      'Vast Outdoor Amphitheatre & Lawns',
      'VIP Suites & Dressing Pavilions',
      'Comprehensive Wedding & Event Setup',
    ],
    location: 'Bihar, India',
    phone: '+91 9122276844',
    highlights: [
      {
        title: 'Palatial Ambience',
        desc: 'Ornate stone carvings, glowing lanterns, and grand entry pathways that impress every arrival.',
      },
      {
        title: 'Scale & Distinction',
        desc: 'Designed to accommodate significant guest gatherings with effortless movement and security.',
      },
      {
        title: 'Complete Event Planning',
        desc: 'From stage design to sound, floral arrangements, and guest reception.',
      },
    ],
  },
  {
    id: 'mithila-marriage-services',
    slug: 'mithila-marriage-services',
    name: 'Mithila Marriage Services',
    subtitle: 'Unforgettable Wedding & Celebration Planning',
    type: 'WEDDINGS • CELEBRATIONS • SERVICES',
    description:
      'Mithila Marriage Services is Vinhare’s dedicated wedding ecosystem. We transform wedding visions into breathtaking realities with authentic cultural elegance, opulent mandap design, and seamless execution.',
    tagline: 'Your moment. Your story. Your Vinhare.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    ],
    features: [
      'Opulent Royal Mandap Architecture',
      'Cultural Decor & Floral Styling',
      'Catering & Feast Coordination',
      'Bridal & Groom Suite Preparations',
      'Sound, Lighting & Cinematic Stage Management',
    ],
    location: 'Bihar, India',
    phone: '+91 9122276844',
    highlights: [
      {
        title: 'Sacred Mandap Design',
        desc: 'Intricately styled floral and gold structures crafted to celebrate traditions with dignity and splendor.',
      },
      {
        title: 'End-to-End Coordination',
        desc: 'Handling invitations, welcoming processions, guest logistics, rituals, and receptions.',
      },
      {
        title: 'Custom Themes',
        desc: 'Tailored aesthetic palettes matching your family heritage and modern luxury preferences.',
      },
    ],
  },
];

export const EXPERIENCES = [
  {
    id: 'stay',
    title: 'STAY',
    subtitle: 'Wake up somewhere worth remembering.',
    description:
      'Immerse in sanctuary spaces designed for genuine relaxation. From garden suites to pool-side villas, every room is an oasis of calm.',
    image: '/images/jp_resort.jpg',
  },
  {
    id: 'celebrate',
    title: 'CELEBRATE',
    subtitle: 'Bring everyone together.',
    description:
      'From weddings to corporate galas, our expansive manicured lawns and grand pavilions elevate life’s landmark milestones.',
    image: '/images/shiv_garden_night.jpeg',
  },
  {
    id: 'dine',
    title: 'DINE',
    subtitle: 'Gather around something unforgettable.',
    description:
      'Savor carefully curated menus blending authentic Bihari heritage flavors with contemporary culinary excellence.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'relax',
    title: 'RELAX',
    subtitle: 'Slow down.',
    description:
      'Unwind by serene reflecting waters, walk along fragrant tropical gardens, and rediscover peace surrounded by nature.',
    image: '/images/raj_resort.webp',
  },
  {
    id: 'create-memories',
    title: 'CREATE MEMORIES',
    subtitle: 'Take the moment with you.',
    description:
      'The Vinhare experience extends beyond physical spaces — it is defined by warm smiles, thoughtful details, and lasting memories.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Shiv Garden Resort - Daytime',
    category: 'RESORTS',
    property: 'Shiv Garden Resort',
    image: '/images/shiv_garden_day.jpeg',
    aspect: 'wide',
  },
  {
    id: 'g2',
    title: 'Serene Villa & Reflecting Pool',
    category: 'RESORTS',
    property: 'J.P. Resort',
    image: '/images/jp_resort.jpg',
    aspect: 'tall',
  },
  {
    id: 'g3',
    title: 'Resort Raj Palatial View',
    category: 'RESORTS',
    property: 'Resort Raj',
    image: '/images/raj_resort.webp',
    aspect: 'wide',
  },
  {
    id: 'g4',
    title: 'Royal Mandap Setup',
    category: 'WEDDINGS',
    property: 'Mithila Marriage Services',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    aspect: 'square',
  },
  {
    id: 'g5',
    title: 'Shiv Garden Night Illumination',
    category: 'EVENTS',
    property: 'Shiv Garden Resort',
    image: '/images/shiv_garden_night.jpeg',
    aspect: 'tall',
  },
  {
    id: 'g6',
    title: 'Courtyard Candlelit Dining',
    category: 'EXPERIENCES',
    property: 'J.P. Resort',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    aspect: 'wide',
  },
  {
    id: 'g7',
    title: 'Floral Wedding Procession',
    category: 'WEDDINGS',
    property: 'Mithila Marriage Services',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    aspect: 'square',
  },
  {
    id: 'g8',
    title: 'Heritage Palace Grounds',
    category: 'EXPERIENCES',
    property: 'Resort Raj',
    image: '/images/hero_resort.jpg',
    aspect: 'tall',
  },
];

export const HOTSPOTS_DATA: HotspotItem[] = [
  {
    id: 'rooms',
    title: 'LUXURY STAYS',
    subtitle: 'Comfort Redefined',
    description:
      'Elegantly furnished air-conditioned suites and villas featuring plush bedding, modern bath fixtures, and scenic garden or pool views.',
    position: [-2.5, 1.8, 1.2],
    iconName: 'Bed',
    details: [
      'Deluxe & Executive Suite Options',
      'Private Balcony & Garden Patios',
      '24-Hour Room Service & Housekeeping',
      'Complimentary Wi-Fi & Premium Amenities',
    ],
  },
  {
    id: 'gardens',
    title: 'GARDENS & LAWNS',
    subtitle: 'Lush Open Air Spaces',
    description:
      'Vast manicured green lawns framed by tropical flora and atmospheric ambient lanterns, ideal for evening walks and outdoor receptions.',
    position: [0, 0.6, 3.2],
    iconName: 'Trees',
    details: [
      'Multi-Tiered Outdoor Lawns',
      'Warm Golden Lantern Pathways',
      'Water Fountains & Reflecting Basins',
      'Ample Event Staging Capability',
    ],
  },
  {
    id: 'events',
    title: 'GRAND CELEBRATION HALLS',
    subtitle: 'Where Moments Happen',
    description:
      'High-ceilinged air-conditioned banquet halls equipped with acoustic management, stage infrastructure, and grand entrance portals.',
    position: [2.8, 2.2, -1],
    iconName: 'PartyPopper',
    details: [
      'Versatile Floorplan Layouts',
      'Bridal & Groom Holding Suites',
      'State-of-the-Art Stage Lighting Support',
      'Dedicated Catering Kitchen Access',
    ],
  },
  {
    id: 'dining',
    title: 'DINING & HOSPITALITY',
    subtitle: 'Taste & Tradition',
    description:
      'Gourmet dining pavilions presenting local North Indian delicacies and global cuisines prepared by master culinary teams.',
    position: [-1.2, 1.2, -2.2],
    iconName: 'Utensils',
    details: [
      'Courtyard Al-Fresco Seating',
      'Custom Wedding & Banquet Menus',
      'Live Food Counters & Barbeque',
      'Hygienic Kitchen Excellence',
    ],
  },
];

export const NETWORK_LOCATIONS: NetworkLocation[] = [
  {
    id: 'loc-1',
    name: 'Shiv Garden Resort',
    region: 'Bihar Central Region',
    property: 'Shiv Garden Resort',
    x: 48,
    y: 42,
    image: '/images/shiv_garden_day.jpeg',
    type: 'Resort • Stay • Events',
    description: 'Premier garden lawn resort destination for grand events and serene retreats.',
  },
  {
    id: 'loc-2',
    name: 'J.P. Resort',
    region: 'Bihar Urban Oasis',
    property: 'J.P. Resort',
    x: 55,
    y: 50,
    image: '/images/jp_resort.jpg',
    type: 'Resort • Celebrations • Stays',
    description: 'Modern luxury stay villas with private reflecting pool and relaxing courtyard lounges.',
  },
  {
    id: 'loc-3',
    name: 'Resort Raj',
    region: 'Bihar Heritage Zone',
    property: 'Resort Raj',
    x: 42,
    y: 58,
    image: '/images/raj_resort.webp',
    type: 'Resort • Events • Hospitality',
    description: 'Royal palace façade resort crafted for palatial celebrations and luxury hosting.',
  },
  {
    id: 'loc-4',
    name: 'Mithila Marriage Services',
    region: 'Cultural Wedding Hub',
    property: 'Mithila Marriage Services',
    x: 58,
    y: 35,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    type: 'Weddings • Celebrations • Services',
    description: 'Bespoke wedding design, opulent mandaps, and comprehensive marriage planning.',
  },
];
