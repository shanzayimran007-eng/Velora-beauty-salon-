import React, { useState } from 'react';
import { SALON_INFO, getWhatsAppUrl, getDirectEmailUrl } from '../data/salonData';
import { MessageCircle, Mail, Phone, Calendar, X, Send, Sparkles, ExternalLink } from 'lucide-react';
import type { PageId } from '../types';

interface QuickContactWidgetProps {
  onNavigate: (page: PageId) => void;
}

export const QuickContactWidget: React.FC<QuickContactWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email'>('whatsapp');

  const quickPrompts = [
    'I want to inquire about booking an appointment.',
    'What are the details for your Bridal Beauty package?',
    'I have a question about haircut & blowout pricing.',
    'Are walk-in visits available today?',
  ];

  const handleOpenEmail = () => {
    const url = getDirectEmailUrl(
      'Direct Client Inquiry - Velora Beauty Salon',
      customMsg || 'Hello Velora Concierge,\n\nI would like to inquire about your services...'
    );
    window.location.href = url;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Direct Contact Card */}
      {isOpen && (
        <div className="mb-3 w-[340px] sm:w-[380px] bg-[#FAF6F0] rounded-3xl shadow-2xl border border-[#E8D8C8] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-250">
          {/* Card Header */}
          <div className="bg-[#352722] text-[#FAF6F0] p-5 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] uppercase tracking-wider text-[#E8D8C8] font-semibold">
                  Direct Concierge Support
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium tracking-wide">
                Chat with Velora
              </h3>
              <p className="text-xs text-[#FAF6F0]/70">
                Direct contact via WhatsApp, Email, or Telephone
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close direct contact window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Contact Mode Selector */}
          <div className="p-2 bg-[#E8D8C8]/40 border-b border-[#E8D8C8] flex gap-1">
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-[#25D366] text-white shadow-sm'
                  : 'text-[#352722] hover:bg-[#FAF6F0]'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Direct
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'email'
                  ? 'bg-[#352722] text-[#FAF6F0] shadow-sm'
                  : 'text-[#352722] hover:bg-[#FAF6F0]'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#C58F91]" />
              Direct Email
            </button>
          </div>

          {/* Content Body */}
          <div className="p-5 space-y-4">
            {activeTab === 'whatsapp' ? (
              <div className="space-y-3">
                <div className="text-xs text-[#352722]/80 leading-relaxed bg-[#FFFFFF] p-3 rounded-xl border border-[#E8D8C8]">
                  <p className="font-medium text-[#352722] flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C58F91]" />
                    Instant WhatsApp Connection
                  </p>
                  <span>
                    Connect directly to our salon desk at <strong>{SALON_INFO.whatsappDisplay}</strong>. Choose a quick topic or type your message below:
                  </span>
                </div>

                {/* Quick Topics */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-[#352722]/60 uppercase tracking-wider block">
                    Quick Topics:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {quickPrompts.slice(0, 3).map((prompt, idx) => (
                      <a
                        key={idx}
                        href={getWhatsAppUrl(prompt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-left text-xs bg-[#FFFFFF] hover:bg-[#E8D8C8]/60 p-2.5 rounded-xl border border-[#E8D8C8] text-[#352722] transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="line-clamp-1">{prompt}</span>
                        <Send className="w-3 h-3 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Custom Message Input */}
                <div className="space-y-1.5 pt-1">
                  <label htmlFor="widget-wa-msg" className="block text-[11px] font-semibold text-[#352722]/70 uppercase tracking-wider">
                    Or Write Custom Message:
                  </label>
                  <div className="relative">
                    <input
                      id="widget-wa-msg"
                      type="text"
                      value={customMsg}
                      onChange={(e) => setCustomMsg(e.target.value)}
                      placeholder="Type your question here..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D8C8] bg-white text-xs text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#25D366] pr-10"
                    />
                    <a
                      href={getWhatsAppUrl(customMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-2 top-2 p-1 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors cursor-pointer"
                      aria-label="Send via WhatsApp"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl(customMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba59] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp Now
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-[#352722]/80 leading-relaxed bg-[#FFFFFF] p-3 rounded-xl border border-[#E8D8C8]">
                  <p className="font-medium text-[#352722] mb-1">Send Direct Email</p>
                  <span>
                    Email our salon manager directly at <strong>{SALON_INFO.emailPlaceholder}</strong>. Opens in your default mail app (Outlook, Gmail, Apple Mail).
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="widget-email-msg" className="block text-[11px] font-semibold text-[#352722]/70 uppercase tracking-wider">
                    Inquiry Notes (Optional):
                  </label>
                  <textarea
                    id="widget-email-msg"
                    rows={3}
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder="Describe your inquiry..."
                    className="w-full p-3 rounded-xl border border-[#E8D8C8] bg-white text-xs text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] resize-none"
                  />
                </div>

                <button
                  onClick={handleOpenEmail}
                  className="w-full py-2.5 rounded-xl bg-[#352722] text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#352722]/90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Mail className="w-4 h-4 text-[#C58F91]" />
                  Open Email Client
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Direct Phone & Online Booking Links */}
            <div className="pt-3 border-t border-[#E8D8C8] flex items-center justify-between gap-2 text-xs">
              <a
                href={`tel:${SALON_INFO.phoneClean}`}
                className="flex items-center gap-1.5 text-[#352722] hover:text-[#C58F91] font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C58F91]" />
                Call Salon
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('booking');
                }}
                className="flex items-center gap-1.5 text-[#352722] hover:text-[#C58F91] font-semibold transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C58F91]" />
                Book Online
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1 bg-[#FFFFFF] px-3.5 py-1.5 rounded-full shadow-lg border border-[#E8D8C8] text-xs font-medium text-[#352722] pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Chat on WhatsApp</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'bg-[#352722] text-[#FAF6F0] rotate-90 scale-95'
              : 'bg-[#25D366] text-white hover:scale-105 hover:shadow-2xl'
          }`}
          aria-label={isOpen ? 'Close direct contact menu' : 'Open WhatsApp and Direct Contact menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}
        </button>
      </div>
    </div>
  );
};
