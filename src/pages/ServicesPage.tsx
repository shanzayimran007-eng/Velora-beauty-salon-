import React, { useState } from 'react';
import type { PageId } from '../types';
import { SERVICES_LIST } from '../data/salonData';
import { Calendar, HelpCircle, Clock, Info } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId, serviceId?: string) => void;
  selectedServiceId?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Hair Styling & Blowouts' },
    { id: 'skincare', label: 'Facial & Skincare' },
    { id: 'makeup', label: 'Makeup Artistry' },
    { id: 'nails', label: 'Manicure & Pedicure' },
    { id: 'bridal', label: 'Bridal Beauty' },
  ];

  const filteredServices = SERVICES_LIST.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-[#FAF6F0] py-16 border-b border-[#E8D8C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C58F91]">
            Our Offerings
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#352722] font-semibold text-balance">
            Beauty Services, Thoughtfully Delivered.
          </h1>
          <p className="text-base sm:text-lg text-[#352722]/80 leading-relaxed max-w-2xl mx-auto">
            From precision blowouts and personalized haircare to restorative botanical facials, nail grooming, and custom bridal styling.
          </p>

          {/* Pricing Disclaimer Note */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E8D8C8]/40 border border-[#E8D8C8] text-xs text-[#352722]/80 mt-2">
            <Info className="w-3.5 h-3.5 text-[#C58F91] shrink-0" />
            <span>Sample prices shown are for demonstration and can be customized based on individual hair length and consultation.</span>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 p-1.5 bg-[#E8D8C8]/40 rounded-2xl max-w-3xl mx-auto border border-[#E8D8C8]">
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

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8D8C8] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E8D8C8]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF6F0]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-medium text-[#352722] border border-[#E8D8C8]">
                    {service.categoryLabel}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-semibold text-[#352722]">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#352722]/60">
                      <Clock className="w-3.5 h-3.5 text-[#C58F91]" />
                      <span>{service.duration}</span>
                      <span>·</span>
                      <span className="font-medium text-[#352722]/90">
                        {service.priceSample}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#352722]/75 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onNavigate('booking', service.name)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#352722] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#352722]/90 hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C58F91]" />
                  Book This Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Have Questions Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6F0] rounded-3xl p-8 sm:p-10 border border-[#E8D8C8] text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#E8D8C8] flex items-center justify-center text-[#352722] mx-auto">
            <HelpCircle className="w-5 h-5 text-[#C58F91]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#352722] font-semibold">
            Unsure Which Treatment Suits Your Needs?
          </h2>
          <p className="text-sm text-[#352722]/75 max-w-xl mx-auto">
            Our salon consultants are delighted to answer your questions regarding hair textures, skin sensitivity, or bridal party schedules.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#352722]/40 text-[#352722] text-xs uppercase tracking-widest font-semibold hover:bg-[#E8D8C8]/60 transition-colors cursor-pointer"
            >
              Have Questions? Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
