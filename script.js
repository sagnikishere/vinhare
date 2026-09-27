/* ==========================================================================
   VINHERE HOTEL & RESORT - INTERACTIVE JAVASCRIPT
   Navbar scroll, mobile menu, venue calculator, gallery lightbox, 
   testimonial carousel, animated counters, modal handlers.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Line Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set default dates for booking input fields
  const checkInInput = document.getElementById('quickCheckIn');
  const checkOutInput = document.getElementById('quickCheckOut');
  if (checkInInput && checkOutInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    checkInInput.value = today.toISOString().split('T')[0];
    checkOutInput.value = tomorrow.toISOString().split('T')[0];
  }

  // 2. Sticky Navbar & Active Section Link Update
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Navbar solid state
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
      document.body.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
      document.body.classList.remove('scrolled');
    }

    // Scroll spy for active link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-open');
      });
    });
  }

  // 4. Animated Counter-Up for Statistics
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          let count = 0;
          const duration = 2000;
          const increment = Math.ceil(target / (duration / 30));

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            if (target === 99) {
              stat.textContent = count + '%';
            } else if (target === 1200) {
              stat.textContent = count.toLocaleString() + '+';
            } else {
              stat.textContent = count + '+';
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.4 });

  const experienceSection = document.querySelector('.experience-banner');
  if (experienceSection) {
    countUpObserver.observe(experienceSection);
  }

  // Initialize Venue Calculator with default value
  updateGuestCalculator(350);
});

/* ==========================================================================
   5. VENUE SWITCHER DATA & LOGIC
   ========================================================================== */
const venueData = {
  ballroom: {
    name: 'Grand Ballroom',
    capacity: 'Capacity: 600+ Guests',
    suitable: 'Suitable For: Grand Weddings • Royal Receptions • Corporate Galas',
    image: 'assets/wedding_hall.jpg',
    facilities: [
      'Majestic Stage & Backdrop Setup',
      'Surround Sound & Acoustic Panels',
      'Intelligent Stage & Hall Lighting',
      'In-House Gourmet Banquet Catering',
      'Dedicated Bridal Dressing Suite',
      'Valet Parking & Executive Entrance'
    ]
  },
  lawn: {
    name: 'Lotus Heritage Garden Lawn',
    capacity: 'Capacity: 1,200+ Guests',
    suitable: 'Suitable For: Destination Weddings • Open Air Receptions • Sangeet',
    image: 'assets/resort_hero.jpg',
    facilities: [
      'Expansive Manicured Green Lawns',
      'Open Sky Floral Mandap Setup',
      'Live BBQ & Buffet Counters Area',
      'Ambient Garden Fairy Lighting',
      'High Capacity Electric Power Backup',
      '200+ Car Parking & Valet'
    ]
  },
  hall: {
    name: 'Mithila Heritage Hall',
    capacity: 'Capacity: 350+ Guests',
    suitable: 'Suitable For: Engagements • Mehendi • Anniversaries • Family Dinners',
    image: 'assets/wedding_hall.jpg',
    facilities: [
      'Traditional Mithila Decorative Motifs',
      'Central Climate Control (AC)',
      'Built-in Stage & Audio Speakers',
      'Separate Dining Hall Access',
      'Dressing Rooms Included',
      'Complimentary Wi-Fi'
    ]
  },
  terrace: {
    name: 'Crown Terrace Lounge',
    capacity: 'Capacity: 150+ Guests',
    suitable: 'Suitable For: Cocktail Parties • VIP Birthdays • Sunset Gatherings',
    image: 'assets/royal_suite.jpg',
    facilities: [
      'Panoramic Resort & Garden Views',
      'Artisanal Bar & Lounge Seating',
      'Mood Lighting & Acoustic Music Setup',
      'Covered Semi-Outdoor Deck',
      'Finger Food & Mocktail Service',
      'Private Elevator Access'
    ]
  }
};

function switchVenue(venueKey, btn) {
  // Update Tab active styling
  document.querySelectorAll('.venue-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const data = venueData[venueKey];
  if (!data) return;

  const imgElem = document.getElementById('venueDisplayImg');
  const nameElem = document.getElementById('venueDisplayName');
  const capElem = document.getElementById('venueDisplayCapacity');
  const suitElem = document.getElementById('venueDisplaySuitable');
  const facElem = document.getElementById('venueDisplayFacilities');

  if (imgElem) imgElem.src = data.image;
  if (nameElem) nameElem.textContent = data.name;
  if (capElem) capElem.textContent = data.capacity;
  if (suitElem) suitElem.textContent = data.suitable;

  if (facElem) {
    facElem.innerHTML = data.facilities.map(fac => `
      <div class="facility-item"><i data-lucide="check"></i> ${fac}</div>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

/* Venue Capacity Estimator */
function updateGuestCalculator(val) {
  const valDisplay = document.getElementById('guestCountVal');
  const venueName = document.getElementById('calcRecVenueName');
  const venueDesc = document.getElementById('calcRecVenueDesc');

  if (valDisplay) valDisplay.textContent = val;

  const count = parseInt(val, 10);
  if (count <= 200) {
    venueName.textContent = 'Crown Terrace Lounge';
    venueDesc.textContent = 'Perfect for intimate engagements, cocktail nights, and family parties up to 200 guests.';
  } else if (count <= 400) {
    venueName.textContent = 'Mithila Heritage Hall';
    venueDesc.textContent = 'Ideal for mid-sized weddings, Sangeet functions, and corporate meetings.';
  } else if (count <= 750) {
    venueName.textContent = 'Grand Ballroom';
    venueDesc.textContent = 'Our flagship indoor hall with plush chandelier seating, stage, and full banquet setup.';
  } else {
    venueName.textContent = 'Lotus Heritage Garden Lawn';
    venueDesc.textContent = 'Massive open-air garden lawn designed for royal destination weddings with 800-1200+ guests.';
  }
}

/* ==========================================================================
   6. GALLERY MASONRY FILTER & LIGHTBOX MODAL
   ========================================================================== */
const galleryImagesData = [
  { src: 'assets/resort_hero.jpg', title: 'Resort Facade at Dusk', category: 'Property' },
  { src: 'assets/wedding_hall.jpg', title: 'Grand Wedding Mandap', category: 'Weddings' },
  { src: 'assets/royal_suite.jpg', title: 'Royal Presidential Suite', category: 'Rooms' },
  { src: 'assets/resort_hero.jpg', title: 'Gourmet Restaurant', category: 'Dining' },
  { src: 'assets/wedding_hall.jpg', title: 'Sangeet Night Stage', category: 'Events' },
  { src: 'assets/resort_hero.jpg', title: 'Reflecting Pool & Gardens', category: 'Property' }
];

let currentLightboxIndex = 0;

function filterGallery(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  if (galleryImagesData[index]) {
    img.src = galleryImagesData[index].src;
    caption.textContent = `${galleryImagesData[index].title} (${galleryImagesData[index].category})`;
  }

  if (modal) modal.classList.add('active');
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.remove('active');
}

function changeLightboxImage(step) {
  currentLightboxIndex += step;
  if (currentLightboxIndex < 0) currentLightboxIndex = galleryImagesData.length - 1;
  if (currentLightboxIndex >= galleryImagesData.length) currentLightboxIndex = 0;
  openLightbox(currentLightboxIndex);
}

/* ==========================================================================
   7. TESTIMONIALS SLIDER
   ========================================================================== */
const testimonialsData = [
  {
    rating: '★★★★★',
    text: '"An amazing experience from start to finish. The hospitality, ambience and arrangements made our celebration truly memorable. Our guests were wowed by the decor and catering!"',
    author: '— Rajesh & Sunita Sharma',
    tag: 'Royal Wedding Host'
  },
  {
    rating: '★★★★★',
    text: '"We booked the Royal Presidential Suite for our anniversary weekend. The butler service, serene gardens, and delicious Mithila thali were beyond expectations!"',
    author: '— Ananya Roy',
    tag: 'Luxury Weekend Guest'
  },
  {
    rating: '★★★★★',
    text: '"Organizing our annual corporate retreat at VinHere Grand Ballroom was seamless. High-speed tech, punctual service, and delicious buffet spreads!"',
    author: '— Devendra Singhania',
    tag: 'Corporate Event Organizer'
  },
  {
    rating: '★★★★★',
    text: '"The Lotus Garden Lawn provided the most magical backdrop for our daughter’s reception. Unforgettable evening with warm Indian hospitality."',
    author: '— Mahendra Prasad',
    tag: 'Grand Reception Host'
  }
];

let currentTestimonialIndex = 0;

function setTestimonial(index) {
  currentTestimonialIndex = index;
  const data = testimonialsData[index];
  if (!data) return;

  const textElem = document.getElementById('testimonialText');
  const authorElem = document.getElementById('testimonialAuthor');
  const tagElem = document.getElementById('testimonialTag');
  const dots = document.querySelectorAll('.carousel-dot');

  if (textElem) textElem.textContent = data.text;
  if (authorElem) authorElem.textContent = data.author;
  if (tagElem) tagElem.textContent = data.tag;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Auto advance testimonials every 6 seconds
setInterval(() => {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialsData.length;
  setTestimonial(currentTestimonialIndex);
}, 6000);

/* ==========================================================================
   8. MODAL HANDLERS & TOAST NOTIFICATIONS
   ========================================================================== */
function openBookingModal() {
  const modal = document.getElementById('bookingModal');
  const title = document.getElementById('modalTitle');
  const sub = document.getElementById('modalSub');
  const roomInput = document.getElementById('modalSelectedRoom');

  if (title) title.textContent = 'Book Your Stay';
  if (sub) sub.textContent = 'Select your dates and preferred room category.';
  if (roomInput) roomInput.value = 'Deluxe Room / Suite';

  if (modal) modal.classList.add('active');
}

function openRoomModal(roomName, price) {
  const modal = document.getElementById('bookingModal');
  const title = document.getElementById('modalTitle');
  const sub = document.getElementById('modalSub');
  const roomInput = document.getElementById('modalSelectedRoom');

  if (title) title.textContent = `Reserve ${roomName}`;
  if (sub) sub.textContent = `Starting at ${price} per night with full royal amenities.`;
  if (roomInput) roomInput.value = roomName;

  if (modal) modal.classList.add('active');
}

function openEventModal() {
  const modal = document.getElementById('bookingModal');
  const title = document.getElementById('modalTitle');
  const sub = document.getElementById('modalSub');
  const roomInput = document.getElementById('modalSelectedRoom');

  if (title) title.textContent = 'Plan Your Event / Wedding';
  if (sub) sub.textContent = 'Provide your event details and our senior planner will contact you.';
  if (roomInput) roomInput.value = 'Grand Wedding / Event Package';

  if (modal) modal.classList.add('active');
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('active');
}

function showToastNotification() {
  const toast = document.getElementById('confirmationToast');
  if (toast) {
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4500);
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  showToastNotification();
  event.target.reset();
}

function handleQuickBooking(event) {
  event.preventDefault();
  showToastNotification();
}

function handleModalForm(event) {
  event.preventDefault();
  closeBookingModal();
  showToastNotification();
  event.target.reset();
}
