import type { ServiceItem, GalleryItem } from '../types';
import HERO_IMAGE from '../assets/images/hero_velora_salon_1792307715800.jpg';
import HAIR_IMAGE from '../assets/images/service_hair_styling_1792307716305.jpg';
import BLOWOUT_IMAGE from '../assets/images/gallery_blowout_curl_1792307735613.jpg';
import FACIAL_IMAGE from '../assets/images/service_facial_skincare_1792307717276.jpg';
import MAKEUP_IMAGE from '../assets/images/service_makeup_artistry_1792307717944.jpg';
import MANICURE_IMAGE from '../assets/images/service_manicure_pedicure_1792307717636.jpg';
import BRIDAL_IMAGE from '../assets/images/gallery_bridal_elegance_1792307735231.jpg';
import PEDICURE_IMAGE from '../assets/images/gallery_pedicure_spa_1792307735638.jpg';

export {
  HERO_IMAGE,
  HAIR_IMAGE,
  BLOWOUT_IMAGE,
  FACIAL_IMAGE,
  MAKEUP_IMAGE,
  MANICURE_IMAGE,
  BRIDAL_IMAGE,
  PEDICURE_IMAGE,
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'hair-styling',
    name: 'Hair Styling',
    category: 'hair',
    categoryLabel: 'Hair Styling & Design',
    description: 'Professional styling for your preferred look and occasion.',
    duration: '60 min',
    priceSample: '$75 (Sample price)',
    image: HAIR_IMAGE,
  },
  {
    id: 'haircuts-blowouts',
    name: 'Haircuts & Blowouts',
    category: 'hair',
    categoryLabel: 'Haircuts & Blowouts',
    description: 'Personalized cuts and polished styling.',
    duration: '75 min',
    priceSample: '$85 (Sample price)',
    image: BLOWOUT_IMAGE,
  },
  {
    id: 'facial-skincare',
    name: 'Facial & Skincare',
    category: 'skincare',
    categoryLabel: 'Facial & Skincare',
    description: 'Relaxing facial treatments tailored to individual skincare needs.',
    duration: '75 min',
    priceSample: '$120 (Sample price)',
    image: FACIAL_IMAGE,
  },
  {
    id: 'makeup-styling',
    name: 'Makeup',
    category: 'makeup',
    categoryLabel: 'Makeup Artistry',
    description: 'Makeup styling for celebrations, parties and special occasions.',
    duration: '60 min',
    priceSample: '$95 (Sample price)',
    image: MAKEUP_IMAGE,
  },
  {
    id: 'manicure-pedicure',
    name: 'Manicure & Pedicure',
    category: 'nails',
    categoryLabel: 'Nail Grooming & Spa',
    description: 'Nail grooming and beauty care for hands and feet.',
    duration: '90 min',
    priceSample: '$80 (Sample price)',
    image: MANICURE_IMAGE,
  },
  {
    id: 'bridal-beauty',
    name: 'Bridal Beauty',
    category: 'bridal',
    categoryLabel: 'Bridal Beauty Preparation',
    description: 'Bridal makeup and beauty preparation tailored to your special day.',
    duration: '120+ min',
    priceSample: 'Price on consultation',
    isPriceOnConsultation: true,
    image: BRIDAL_IMAGE,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-interior',
    title: 'Velora Sanctuary Interior',
    category: 'hair',
    categoryLabel: 'Salon Interior',
    image: HERO_IMAGE,
    description: 'Serene salon studio with luminous arched mirrors and warm travertine finishes.',
  },
  {
    id: 'gal-hair-styling',
    title: 'Custom Blowout & Styling',
    category: 'hair',
    categoryLabel: 'Hair Styling',
    image: HAIR_IMAGE,
    description: 'Meticulous brush blowout delivering soft radiant movement and shine.',
  },
  {
    id: 'gal-blowout-curl',
    title: 'Lustrous Brunette Curls',
    category: 'hair',
    categoryLabel: 'Haircuts & Blowouts',
    image: BLOWOUT_IMAGE,
    description: 'Bouncy, polished volume with nourished, healthy hair texture.',
  },
  {
    id: 'gal-facial',
    title: 'Botanical Radiance Facial',
    category: 'skincare',
    categoryLabel: 'Facial & Skincare',
    image: FACIAL_IMAGE,
    description: 'Gentle facial massage with calming serums in a quiet wellness space.',
  },
  {
    id: 'gal-makeup',
    title: 'Luminous Special Occasion Makeup',
    category: 'makeup',
    categoryLabel: 'Makeup',
    image: MAKEUP_IMAGE,
    description: 'Natural radiant complexion styling tailored for memorable evenings and celebrations.',
  },
  {
    id: 'gal-manicure',
    title: 'Minimalist Hand & Nail Care',
    category: 'nails',
    categoryLabel: 'Manicure & Nails',
    image: MANICURE_IMAGE,
    description: 'Precision nail shaping and nourishing cuticle care at the travertine bar.',
  },
  {
    id: 'gal-pedicure',
    title: 'Floral Petal Foot Spa Treatment',
    category: 'nails',
    categoryLabel: 'Pedicure & Spa',
    image: PEDICURE_IMAGE,
    description: 'A restorative warm soak infused with organic rose petals and botanical oils.',
  },
  {
    id: 'gal-bridal',
    title: 'Romantic Bridal Preparation',
    category: 'bridal',
    categoryLabel: 'Bridal Beauty',
    image: BRIDAL_IMAGE,
    description: 'Exquisite bridal updo and glowing makeup styling for an unforgettable celebration.',
  },
];

export const SALON_INFO = {
  name: 'Velora Beauty Salon',
  tagline: 'Reveal Your Natural Beauty.',
  phonePlaceholder: '+1 (555) 234-5678',
  emailPlaceholder: 'contact@velorasalon.com',
  addressPlaceholder: '124 Blossom Lane, Suite 200, Metropolis, NY 10001',
  hours: [
    { days: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
    { days: 'Saturday', hours: '9:00 AM – 6:00 PM' },
    { days: 'Sunday', hours: '10:00 AM – 4:00 PM' },
  ],
  socials: [
    { name: 'Instagram', handle: '@velorabeautysalon', url: 'https://instagram.com' },
    { name: 'Pinterest', handle: 'Velora Salon Atelier', url: 'https://pinterest.com' },
    { name: 'Facebook', handle: 'Velora Beauty Salon', url: 'https://facebook.com' },
  ],
};
