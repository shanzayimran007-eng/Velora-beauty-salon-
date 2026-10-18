import React, { useState } from 'react';
import type { PageId } from '../types';
import { SALON_INFO } from '../data/salonData';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Instagram,
  Facebook,
  Share2,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }

    if (!subject.trim()) {
      errs.subject = 'Subject is required.';
    }

    if (!message.trim() || message.trim().length < 5) {
      errs.message = 'Please provide a message with at least 5 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Could not send message. Please try again.');
      }

      setSuccessMessage(data.message);
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setErrors({});
    } catch (err: any) {
      console.warn('Backend API request error, saving locally:', err);
      // Local fallback
      try {
        const stored = JSON.parse(localStorage.getItem('velora_contacts') || '[]');
        stored.unshift({ ...payload, id: `MSG-${Date.now().toString(36).toUpperCase()}`, createdAt: new Date().toISOString() });
        localStorage.setItem('velora_contacts', JSON.stringify(stored));
      } catch (storageErr) {
        console.error('LocalStorage error:', storageErr);
      }

      setSuccessMessage('Thank you for reaching out to Velora Beauty Salon. We have received your inquiry and will respond within 24 hours.');
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-[#FAF6F0] py-16 border-b border-[#E8D8C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C58F91] inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#352722] font-semibold text-balance">
            We'd Love to Hear From You.
          </h1>
          <p className="text-base sm:text-lg text-[#352722]/80 leading-relaxed max-w-2xl mx-auto">
            Whether you have an inquiry regarding custom treatments, bridal coordination, or need assistance locating our atelier, our team is at your service.
          </p>
        </div>
      </section>

      {/* Main Grid: Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Salon Placeholders & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E8D8C8] space-y-6 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-[#352722] border-b border-[#E8D8C8] pb-3">
                Salon Information
              </h2>

              <div className="space-y-5 text-sm text-[#352722]/85">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#E8D8C8] flex items-center justify-center text-[#C58F91] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#352722]/50 font-semibold">
                      Telephone (Placeholder)
                    </span>
                    <span className="font-medium text-[#352722] block mt-0.5">
                      {SALON_INFO.phonePlaceholder}
                    </span>
                    <span className="text-[11px] text-[#352722]/50">
                      Editable sample number for business customization
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#E8D8C8] flex items-center justify-center text-[#C58F91] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#352722]/50 font-semibold">
                      Email Inquiries (Placeholder)
                    </span>
                    <span className="font-medium text-[#352722] block mt-0.5">
                      {SALON_INFO.emailPlaceholder}
                    </span>
                    <span className="text-[11px] text-[#352722]/50">
                      Editable concierge mailbox
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#E8D8C8] flex items-center justify-center text-[#C58F91] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#352722]/50 font-semibold">
                      Salon Address (Placeholder)
                    </span>
                    <span className="font-medium text-[#352722] block mt-0.5 leading-snug">
                      {SALON_INFO.addressPlaceholder}
                    </span>
                    <span className="text-[11px] text-[#352722]/50">
                      Ready to be customized with the exact salon storefront location
                    </span>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-4 pt-2 border-t border-[#E8D8C8]/60">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#E8D8C8] flex items-center justify-center text-[#C58F91] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <span className="block text-xs uppercase tracking-wider text-[#352722]/50 font-semibold mb-1">
                      Opening Hours (Editable Placeholders)
                    </span>
                    <div className="space-y-1 text-xs">
                      {SALON_INFO.hours.map((h, i) => (
                        <div key={i} className="flex justify-between py-0.5">
                          <span className="font-medium text-[#352722]">{h.days}:</span>
                          <span className="text-[#352722]/80">{h.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="bg-[#FAF6F0] p-6 rounded-3xl border border-[#E8D8C8] space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#C58F91] font-semibold flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                Social Channels (Configured Placeholders)
              </span>
              <div className="flex flex-wrap gap-2">
                {SALON_INFO.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#E8D8C8] text-xs font-medium text-[#352722] hover:bg-[#E8D8C8]/60 transition-colors"
                  >
                    {social.name === 'Instagram' ? (
                      <Instagram className="w-3.5 h-3.5 text-[#C58F91]" />
                    ) : (
                      <Facebook className="w-3.5 h-3.5 text-[#C58F91]" />
                    )}
                    <span>{social.name}: {social.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Navigation CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('booking')}
                className="flex-1 py-3 px-4 rounded-xl bg-[#352722] text-[#FAF6F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#352722]/90 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C58F91]" />
                Book an Appointment
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="flex-1 py-3 px-4 rounded-xl border border-[#352722]/30 text-[#352722] text-xs uppercase tracking-wider font-semibold hover:bg-[#E8D8C8]/50 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                Explore Our Services
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-8 sm:p-10 rounded-3xl border border-[#E8D8C8] shadow-sm">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#352722] border-b border-[#E8D8C8] pb-4">
              Send a Message
            </h2>

            {successMessage ? (
              <div className="py-8 space-y-4 text-center animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#352722]">
                  Message Successfully Sent
                </h3>
                <p className="text-sm text-[#352722]/80 max-w-md mx-auto leading-relaxed">
                  {successMessage}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSuccessMessage(null)}
                    className="px-6 py-2.5 rounded-full border border-[#352722]/30 text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 pt-6" noValidate>
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contactName" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                    Your Name <span className="text-[#C58F91]">*</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Charlotte Miller"
                    className={`w-full px-4 py-3 rounded-xl border bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all ${
                      errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-[#E8D8C8]'
                    }`}
                    required
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contactEmail" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                    Email Address <span className="text-[#C58F91]">*</span>
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="charlotte@example.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all ${
                      errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E8D8C8]'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contactSubject" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                    Subject <span className="text-[#C58F91]">*</span>
                  </label>
                  <input
                    id="contactSubject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Bridal party inquiry or service consultation question"
                    className={`w-full px-4 py-3 rounded-xl border bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all ${
                      errors.subject ? 'border-red-400 bg-red-50/20' : 'border-[#E8D8C8]'
                    }`}
                    required
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-600 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contactMessage" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                    Message <span className="text-[#C58F91]">*</span>
                  </label>
                  <textarea
                    id="contactMessage"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How may our salon concierge assist you today?"
                    className={`w-full px-4 py-3 rounded-xl border bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all resize-y ${
                      errors.message ? 'border-red-400 bg-red-50/20' : 'border-[#E8D8C8]'
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#352722] text-[#FAF6F0] text-xs uppercase tracking-widest font-semibold hover:bg-[#352722]/90 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#C58F91]" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section with Elegant Styled Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6F0] rounded-3xl border border-[#E8D8C8] overflow-hidden p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C58F91] font-semibold">
                Salon Location
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#352722] mt-1">
                Atelier Map &amp; Directions
              </h3>
            </div>
            <div className="text-xs text-[#352722]/70 max-w-sm">
              Note: A live interactive map will embed once actual business street coordinates are configured.
            </div>
          </div>

          {/* Styled Map Placeholder Visual */}
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[16/6] bg-[#E8D8C8]/60 border border-[#E8D8C8] flex items-center justify-center text-center p-6">
            <div className="space-y-3 max-w-md">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#E8D8C8] flex items-center justify-center text-[#C58F91] mx-auto shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-serif text-xl font-medium text-[#352722]">
                  124 Blossom Lane, Suite 200
                </p>
                <p className="text-xs text-[#352722]/70 mt-1">
                  Metropolis, NY 10001 · Valet and customer street parking available.
                </p>
              </div>
              <p className="text-[11px] text-[#352722]/50 italic">
                (Location placeholder ready for Google Maps integration upon business configuration)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
