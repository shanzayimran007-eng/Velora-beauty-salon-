import React, { useState, useEffect } from 'react';
import type { PageId, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/salonData';
import { X, Calendar, Sparkles, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'hair', label: 'Hair' },
    { id: 'skincare', label: 'Skincare' },
    { id: 'makeup', label: 'Makeup' },
    { id: 'nails', label: 'Nails' },
    { id: 'bridal', label: 'Bridal' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeLightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightboxItem(filteredItems[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeLightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveLightboxItem(filteredItems[nextIndex]);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-[#FAF6F0] py-16 border-b border-[#E8D8C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C58F91] inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Salon Showcase
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#352722] font-semibold text-balance">
            A Glimpse of Velora.
          </h1>
          <p className="text-base sm:text-lg text-[#352722]/80 leading-relaxed max-w-2xl mx-auto">
            Explore our sanctuary spaces, client transformations, intricate bridal styling, restorative skin care, and refined nail artistry.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 p-1.5 bg-[#E8D8C8]/40 rounded-2xl max-w-2xl mx-auto border border-[#E8D8C8]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#352722] text-[#FAF6F0] shadow-sm font-semibold'
                    : 'text-[#352722]/80 hover:text-[#352722] hover:bg-[#FAF6F0]/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8D8C8] border border-[#E8D8C8] shadow-sm hover:shadow-xl transition-all cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#E8D8C8] font-medium">
                    {item.categoryLabel}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-medium mt-1">{item.title}</h3>
                <p className="text-xs text-white/80 line-clamp-2 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Statement & CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-6">
        <div className="w-12 h-0.5 bg-[#C58F91] mx-auto rounded-full" />
        <blockquote className="font-serif text-2xl sm:text-3xl text-[#352722] italic font-medium">
          “Every detail reflects our passion for beauty and care.”
        </blockquote>
        <p className="text-sm text-[#352722]/75 max-w-lg mx-auto">
          Our team is devoted to thoughtful consultations, refined technique, and making your salon time an experience to anticipate.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('booking')}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#352722] text-[#FAF6F0] text-xs uppercase tracking-widest font-semibold hover:bg-[#352722]/90 hover:shadow-lg transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#C58F91]" />
            Ready for Your Transformation?
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-[#FAF6F0] rounded-3xl overflow-hidden shadow-2xl border border-[#E8D8C8]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 text-[#352722] hover:bg-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#352722] flex items-center justify-center transition-colors shadow-md cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#352722] flex items-center justify-center transition-colors shadow-md cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
              <div className="md:col-span-8 bg-black/5 flex items-center justify-center aspect-[4/3] md:aspect-auto">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-cover max-h-[70vh]"
                />
              </div>
              <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FAF6F0]">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-widest text-[#C58F91] font-semibold">
                    {activeLightboxItem.categoryLabel}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#352722]">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-sm text-[#352722]/80 leading-relaxed">
                    {activeLightboxItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8D8C8]">
                  <button
                    onClick={() => {
                      setActiveLightboxItem(null);
                      onNavigate('booking');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#352722] text-[#FAF6F0] text-xs uppercase tracking-widest font-semibold hover:bg-[#352722]/90 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C58F91]" />
                    Book Similar Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
