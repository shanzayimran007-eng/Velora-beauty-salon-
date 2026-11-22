import React from 'react';
import type { PageId } from '../types';
import { SALON_INFO, SERVICES_LIST, getWhatsAppUrl, getDirectEmailUrl } from '../data/salonData';
import { Sparkles, MapPin, Phone, Mail, Clock, ArrowRight, Instagram, Facebook, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId, serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#352722] text-[#FAF6F0] pt-16 pb-12 border-t border-[#352722]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E8D8C8]/15 flex items-center justify-center text-[#C58F91] border border-[#C58F91]/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-serif text-2xl font-semibold tracking-wider text-[#FAF6F0]">
                  Velora
                </span>
                <span className="block text-[10px] tracking-[0.25em] uppercase text-[#FAF6F0]/60 -mt-1 font-sans">
                  Beauty Salon
                </span>
              </div>
            </div>
            <p className="text-sm text-[#FAF6F0]/75 leading-relaxed pr-4">
              Reveal your natural beauty in our tranquil sanctuary. Offering personalized hair design, skin therapies, bridal styling, and restorative nail care.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#C58F91] font-semibold block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                {SALON_INFO.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#FAF6F0]/10 hover:bg-[#C58F91] hover:text-[#352722] text-[#FAF6F0]/80 flex items-center justify-center transition-colors text-xs"
                    aria-label={`Visit our ${social.name} (configured link)`}
                  >
                    {social.name === 'Instagram' ? (
                      <Instagram className="w-4 h-4" />
                    ) : (
                      <Facebook className="w-4 h-4" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg tracking-wide text-[#FAF6F0] border-b border-[#FAF6F0]/10 pb-2">
              Explore Velora
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF6F0]/80 font-medium">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C58F91] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#C58F91]" /> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C58F91] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#C58F91]" /> About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#C58F91] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#C58F91]" /> Beauty Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#C58F91] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#C58F91]" /> Our Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-[#C58F91] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#C58F91]" /> Book an Appointment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C58F91] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#C58F91]" /> Contact & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg tracking-wide text-[#FAF6F0] border-b border-[#FAF6F0]/10 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF6F0]/80 font-medium">
              {SERVICES_LIST.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onNavigate('services', service.id)}
                    className="hover:text-[#C58F91] transition-colors flex items-center justify-between w-full group cursor-pointer text-left"
                  >
                    <span>{service.name}</span>
                    <span className="text-xs text-[#FAF6F0]/40 group-hover:text-[#C58F91] transition-colors">
                      {service.duration}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Salon Placeholders & Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg tracking-wide text-[#FAF6F0] border-b border-[#FAF6F0]/10 pb-2">
              Salon Concierge
            </h4>
            <div className="space-y-3 text-xs text-[#FAF6F0]/80">
              {/* WhatsApp direct */}
              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-[#FAF6F0]">WhatsApp Concierge:</span>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>{SALON_INFO.whatsappDisplay}</span>
                    <span className="text-[10px] bg-[#25D366]/20 px-1.5 py-0.2 rounded text-emerald-300">Chat</span>
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C58F91] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-[#FAF6F0]">Salon Address (Placeholder):</span>
                  <span>{SALON_INFO.addressPlaceholder}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C58F91] shrink-0" />
                <div>
                  <span className="block font-medium text-[#FAF6F0]">Direct Line (Placeholder):</span>
                  <a href={`tel:${SALON_INFO.phoneClean}`} className="hover:text-[#C58F91] transition-colors">
                    {SALON_INFO.phonePlaceholder}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C58F91] shrink-0" />
                <div>
                  <span className="block font-medium text-[#FAF6F0]">Concierge Inquiries:</span>
                  <a href={getDirectEmailUrl()} className="hover:text-[#C58F91] transition-colors">
                    {SALON_INFO.emailPlaceholder}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#C58F91] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-[#FAF6F0]">Hours of Operation:</span>
                  <div className="text-[11px] space-y-0.5 text-[#FAF6F0]/70 mt-0.5">
                    {SALON_INFO.hours.map((h, i) => (
                      <div key={i} className="flex justify-between gap-4">
                        <span>{h.days}:</span>
                        <span>{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 mt-8 border-t border-[#FAF6F0]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6F0]/60">
          <p>© 2026 Velora Beauty Salon. All rights reserved.</p>
          <p className="text-[11px] text-[#FAF6F0]/50">
            Design crafted for luxury beauty experience · Reveal Your Natural Beauty.
          </p>
        </div>
      </div>
    </footer>
  );
};
