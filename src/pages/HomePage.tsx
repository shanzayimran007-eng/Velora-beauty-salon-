import React from 'react';
import type { PageId } from '../types';
import {
  HERO_IMAGE,
  HAIR_IMAGE,
  FACIAL_IMAGE,
  MAKEUP_IMAGE,
  MANICURE_IMAGE,
  BRIDAL_IMAGE,
  BLOWOUT_IMAGE,
} from '../data/salonData';
import { Calendar, ArrowRight, Sparkles, HeartHandshake, Smile, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredServices = [
    {
      id: 'hair-styling',
      title: 'Hair Styling',
      desc: 'Professional styling for your preferred look and occasion.',
      image: HAIR_IMAGE,
      tag: 'Hair Care',
    },
    {
      id: 'facial-skincare',
      title: 'Facial & Skincare',
      desc: 'Relaxing facial treatments tailored to individual skincare needs.',
      image: FACIAL_IMAGE,
      tag: 'Skin Wellness',
    },
    {
      id: 'makeup-styling',
      title: 'Makeup',
      desc: 'Makeup styling for celebrations, parties and special occasions.',
      image: MAKEUP_IMAGE,
      tag: 'Artistry',
    },
    {
      id: 'manicure-pedicure',
      title: 'Manicure & Pedicure',
      desc: 'Nail grooming and beauty care for hands and feet.',
      image: MANICURE_IMAGE,
      tag: 'Hand & Foot Care',
    },
  ];

  const galleryPreviews = [
    { title: 'Velora Sanctuary', img: HERO_IMAGE, category: 'Interior' },
    { title: 'Voluminous Blowout', img: BLOWOUT_IMAGE, category: 'Hair' },
    { title: 'Hydrating Facial', img: FACIAL_IMAGE, category: 'Skincare' },
    { title: 'Bridal Radiance', img: BRIDAL_IMAGE, category: 'Bridal' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FAF6F0] pt-6 pb-16 lg:py-20 border-b border-[#E8D8C8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C58F91]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Velora Beauty Atelier</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#352722] font-semibold leading-[1.15] text-balance">
                Reveal Your Natural Beauty.
              </h1>
              <p className="text-base sm:text-lg text-[#352722]/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience personalized beauty treatments, expert care, and a moment of relaxation at Velora Beauty Salon.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('booking')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#352722] text-[#FAF6F0] font-semibold text-sm uppercase tracking-wider hover:bg-[#352722]/90 hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 text-[#C58F91]" />
                  Book an Appointment
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#352722]/30 text-[#352722] font-semibold text-sm uppercase tracking-wider hover:bg-[#E8D8C8]/50 hover:border-[#352722] transition-all cursor-pointer whitespace-nowrap"
                >
                  Explore Our Services
                  <ArrowRight className="w-4 h-4 text-[#352722]" />
                </button>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8D8C8] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] bg-[#E8D8C8]">
                <img
                  src={HERO_IMAGE}
                  alt="Velora Beauty Salon luxury interior with warm travertine and arched mirrors"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-white pointer-events-none">
                  <p className="text-xs uppercase tracking-widest text-[#E8D8C8] font-medium">A Sanctuary of Quiet Elegance</p>
                  <p className="font-serif text-lg sm:text-xl font-medium">Warm Ivory &amp; Botanical Comfort</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-12 h-0.5 bg-[#C58F91] mx-auto rounded-full" />
        <h2 className="font-serif text-3xl sm:text-4xl text-[#352722] font-semibold">
          Welcome to Velora Beauty Salon
        </h2>
        <p className="text-base sm:text-lg text-[#352722]/80 leading-relaxed max-w-2xl mx-auto">
          We invite you to step away from the fast pace of daily life and enter an environment designed entirely around your well-being. At Velora, beauty is an unhurried, tailored ritual created to leave you feeling radiant, rested, and confident.
        </p>
      </section>

      {/* Three Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#E8D8C8] shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E8D8C8] flex items-center justify-center text-[#C58F91]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#352722] font-semibold">
              Expert Beauty Professionals
            </h3>
            <p className="text-sm text-[#352722]/75 leading-relaxed">
              Our stylists and estheticians bring focused dedication and attentive technique to every haircut, color treatment, and restorative skin session.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#E8D8C8] shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E8D8C8] flex items-center justify-center text-[#C58F91]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#352722] font-semibold">
              Personalized Treatments
            </h3>
            <p className="text-sm text-[#352722]/75 leading-relaxed">
              Every guest begins with a one-on-one consultation so every shade, facial formula, and grooming detail reflects your unique personal preferences.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#E8D8C8] shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E8D8C8] flex items-center justify-center text-[#C58F91]">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#352722] font-semibold">
              Relaxing Luxury Experience
            </h3>
            <p className="text-sm text-[#352722]/75 leading-relaxed">
              Immerse yourself in gentle ambient sounds, warm beverage service, soft ivory interiors, and a serene atmosphere crafted for calm rejuvenation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C58F91]">
              Curated Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#352722] font-semibold">
              Signature Treatments
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#352722] hover:text-[#C58F91] transition-colors cursor-pointer"
          >
            Explore All 6 Services
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8D8C8] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-[#E8D8C8]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-xs uppercase tracking-wider text-[#C58F91] font-medium">
                    {service.tag}
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-[#352722]">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#352722]/75 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onNavigate('services', service.id)}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#352722]/20 text-xs font-semibold uppercase tracking-wider text-[#352722] hover:bg-[#352722] hover:text-[#FAF6F0] hover:border-[#352722] transition-colors cursor-pointer"
                >
                  View Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="bg-[#FAF6F0] py-16 border-y border-[#E8D8C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C58F91]">
              Visual Glimpse
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#352722] font-semibold">
              Moments at Velora
            </h2>
            <p className="text-sm text-[#352722]/75">
              A curated look into our salon atmosphere, detailed artistry, and guest transformations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {galleryPreviews.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8D8C8] group shadow-sm border border-[#E8D8C8]"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <p className="text-[10px] uppercase tracking-wider text-[#E8D8C8]">{item.category}</p>
                    <p className="font-serif text-sm font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#E8D8C8] text-[#352722] text-xs font-semibold uppercase tracking-widest hover:bg-[#C58F91] hover:text-[#FAF6F0] transition-colors cursor-pointer"
            >
              View Our Gallery
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#352722] text-[#FAF6F0] p-8 sm:p-14 lg:p-16 overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs uppercase tracking-widest text-[#C58F91] font-semibold">
              Begin Your Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Your Beauty Journey Starts Here.
            </h2>
            <p className="text-sm sm:text-base text-[#FAF6F0]/80 leading-relaxed">
              Book a bespoke hair, skin, bridal, or nail treatment today. Our dedicated stylists and estheticians look forward to welcoming you.
            </p>
            <div className="pt-4">
              <button
                onClick={() => onNavigate('booking')}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#FAF6F0] text-[#352722] text-xs uppercase tracking-widest font-semibold hover:bg-[#E8D8C8] hover:shadow-xl transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C58F91]" />
                Reserve Your Visit
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
