import React, { useState } from 'react';
import type { PageId } from '../types';
import { Menu, X, Sparkles, Calendar, MessageCircle, Mail } from 'lucide-react';
import { getWhatsAppUrl, getDirectEmailUrl } from '../data/salonData';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Our Gallery' },
    { id: 'booking', label: 'Booking' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8D8C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark and Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
            aria-label="Velora Beauty Salon Home"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8D8C8] flex items-center justify-center text-[#352722] border border-[#C58F91]/30 transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-[#C58F91]" />
            </div>
            <div className="whitespace-nowrap shrink-0">
              <span className="block font-serif text-2xl font-semibold tracking-wide text-[#352722]">
                Velora
              </span>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[#352722]/70 -mt-1 font-sans">
                Beauty Salon
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 whitespace-nowrap transition-colors cursor-pointer text-sm tracking-wide ${
                    isActive
                      ? 'text-[#352722] font-semibold'
                      : 'text-[#352722]/75 hover:text-[#352722]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C58F91] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Direct WhatsApp Quick Contact Button */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
              aria-label="Direct WhatsApp Chat with Velora Concierge"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => handleNavClick('booking')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#352722] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#352722]/90 hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C58F91]" />
              Book an Appointment
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg text-[#352722] hover:bg-[#E8D8C8]/60 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8D8C8] bg-[#FAF6F0] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#E8D8C8] text-[#352722] font-semibold'
                      : 'text-[#352722]/80 hover:bg-[#E8D8C8]/40 hover:text-[#352722]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Direct Contact Options on Mobile */}
            <div className="pt-4 mt-2 border-t border-[#E8D8C8] space-y-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white text-sm uppercase tracking-wider font-semibold hover:bg-[#20ba59] transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Direct WhatsApp Chat
              </a>

              <a
                href={getDirectEmailUrl()}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-[#352722]/30 text-[#352722] text-xs uppercase tracking-wider font-semibold hover:bg-[#E8D8C8]/40 transition-all"
              >
                <Mail className="w-4 h-4 text-[#C58F91]" />
                Direct Email Concierge
              </a>

              <button
                onClick={() => handleNavClick('booking')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#352722] text-[#FAF6F0] text-sm uppercase tracking-wider font-semibold hover:bg-[#352722]/90 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C58F91]" />
                Book an Appointment
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
