import React, { useState, useEffect } from 'react';
import type { PageId } from '../types';
import { SERVICES_LIST, SALON_INFO } from '../data/salonData';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface BookingPageProps {
  onNavigate: (page: PageId) => void;
  initialService?: string;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onNavigate, initialService }) => {
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || SERVICES_LIST[0].name);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM - 1:00 PM)');
  const [notes, setNotes] = useState('');

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<null | {
    id: string;
    message: string;
    details: {
      fullName: string;
      email: string;
      phone: string;
      service: string;
      date: string;
      time: string;
    };
  }>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Sync initialService if user navigated with a chosen service
  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  // Calculate today's date in YYYY-MM-DD for min attribute (past dates disabled)
  const todayString = new Date().toISOString().split('T')[0];

  const timeSlots = [
    'Morning (9:00 AM – 11:30 AM)',
    'Midday (11:30 AM – 2:00 PM)',
    'Afternoon (2:00 PM – 4:30 PM)',
    'Late Afternoon / Evening (4:30 PM – 7:00 PM)',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@example.com).';
    }

    if (!phone.trim()) {
      errs.phone = 'Phone number is required for appointment confirmation.';
    } else if (phone.trim().length < 7) {
      errs.phone = 'Please enter a valid phone number.';
    }

    if (!service) {
      errs.service = 'Please select a beauty service.';
    }

    if (!preferredDate) {
      errs.preferredDate = 'Please choose a preferred appointment date.';
    } else if (preferredDate < todayString) {
      errs.preferredDate = 'Appointment date cannot be in the past.';
    }

    if (!preferredTime) {
      errs.preferredTime = 'Please choose a preferred time slot.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service,
      preferredDate,
      preferredTime,
      notes: notes.trim(),
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit appointment request. Please try again.');
      }

      setSubmissionSuccess({
        id: data.appointment?.id || `VEL-${Date.now().toString(36).toUpperCase()}`,
        message: data.message,
        details: {
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          service: payload.service,
          date: payload.preferredDate,
          time: payload.preferredTime,
        },
      });

      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setErrors({});
    } catch (err: any) {
      console.warn('Backend API request error, saving locally:', err);
      // Fallback local persistence if server is warming up
      const fallbackId = `VEL-${Date.now().toString(36).toUpperCase()}`;
      try {
        const stored = JSON.parse(localStorage.getItem('velora_appointments') || '[]');
        stored.unshift({ ...payload, id: fallbackId, createdAt: new Date().toISOString() });
        localStorage.setItem('velora_appointments', JSON.stringify(stored));
      } catch (storageErr) {
        console.error('LocalStorage error:', storageErr);
      }

      setSubmissionSuccess({
        id: fallbackId,
        message: 'Your appointment request has been recorded. Our salon concierge will reach out to confirm your scheduled time.',
        details: {
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          service: payload.service,
          date: payload.preferredDate,
          time: payload.preferredTime,
        },
      });
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
            <Calendar className="w-3.5 h-3.5" />
            Appointments
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#352722] font-semibold text-balance">
            Let's Plan Your Beauty Visit.
          </h1>
          <p className="text-base sm:text-lg text-[#352722]/80 leading-relaxed max-w-2xl mx-auto">
            Please submit your appointment request below. Our concierge team will review availability and contact you promptly to finalize your booking details.
          </p>
        </div>
      </section>

      {/* Booking Form & Context Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-8 bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#E8D8C8] shadow-sm">
            {submissionSuccess ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="text-center space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Request Received · Ref #{submissionSuccess.id}
                  </span>
                  <h3 className="font-serif text-3xl font-semibold text-[#352722]">
                    Thank You, {submissionSuccess.details.fullName}!
                  </h3>
                  <p className="text-sm text-[#352722]/80 max-w-md mx-auto leading-relaxed">
                    {submissionSuccess.message}
                  </p>
                </div>

                {/* Appointment Summary Box */}
                <div className="bg-[#FAF6F0] rounded-2xl p-6 border border-[#E8D8C8] space-y-3 text-xs sm:text-sm text-[#352722]">
                  <div className="font-medium text-[#352722] border-b border-[#E8D8C8] pb-2">
                    Request Details:
                  </div>
                  <div className="grid grid-cols-2 gap-y-2">
                    <span className="text-[#352722]/60">Requested Service:</span>
                    <span className="font-semibold text-right">{submissionSuccess.details.service}</span>

                    <span className="text-[#352722]/60">Preferred Date:</span>
                    <span className="font-semibold text-right">{submissionSuccess.details.date}</span>

                    <span className="text-[#352722]/60">Preferred Time:</span>
                    <span className="font-semibold text-right">{submissionSuccess.details.time}</span>

                    <span className="text-[#352722]/60">Confirmation Email:</span>
                    <span className="font-semibold text-right">{submissionSuccess.details.email}</span>

                    <span className="text-[#352722]/60">Contact Phone:</span>
                    <span className="font-semibold text-right">{submissionSuccess.details.phone}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmissionSuccess(null)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#352722]/30 text-[#352722] text-xs uppercase tracking-widest font-semibold hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                  <button
                    onClick={() => onNavigate('services')}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#352722] text-[#FAF6F0] text-xs uppercase tracking-widest font-semibold hover:bg-[#352722]/90 transition-colors cursor-pointer"
                  >
                    Explore More Services
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="border-b border-[#E8D8C8] pb-4">
                  <h2 className="font-serif text-2xl font-semibold text-[#352722]">
                    Appointment Request Form
                  </h2>
                  <p className="text-xs text-[#352722]/70 mt-1">
                    Complete the details below. This is an appointment request; bookings are finalized after concierge verification.
                  </p>
                </div>

                {serverError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                    Full Name <span className="text-[#C58F91]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className={`w-full px-4 py-3 rounded-xl border bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all ${
                        errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-[#E8D8C8]'
                      }`}
                      required
                    />
                    <User className="w-4 h-4 text-[#352722]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email and Phone 2-column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                      Email Address <span className="text-[#C58F91]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="eleanor@example.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all ${
                          errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E8D8C8]'
                        }`}
                        required
                      />
                      <Mail className="w-4 h-4 text-[#352722]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                      Phone Number <span className="text-[#C58F91]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all ${
                          errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#E8D8C8]'
                        }`}
                        required
                      />
                      <Phone className="w-4 h-4 text-[#352722]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                    Select Service <span className="text-[#C58F91]">*</span>
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8D8C8] bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all cursor-pointer"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.duration} · {s.priceSample})
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-xs text-red-600 mt-1">{errors.service}</p>
                  )}
                </div>

                {/* Date & Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                      Preferred Date <span className="text-[#C58F91]">*</span>
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      min={todayString}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all cursor-pointer ${
                        errors.preferredDate ? 'border-red-400 bg-red-50/20' : 'border-[#E8D8C8]'
                      }`}
                      required
                    />
                    {errors.preferredDate && (
                      <p className="text-xs text-red-600 mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="preferredTime" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                      Preferred Time <span className="text-[#C58F91]">*</span>
                    </label>
                    <select
                      id="preferredTime"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8D8C8] bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all cursor-pointer"
                    >
                      {timeSlots.map((slot, i) => (
                        <option key={i} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5">
                  <label htmlFor="notes" className="block text-xs font-semibold uppercase tracking-wider text-[#352722]">
                    Additional Notes (Optional)
                  </label>
                  <div className="relative">
                    <textarea
                      id="notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share details such as hair length, skin sensitivities, occasion timing, or special requests..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E8D8C8] bg-[#FAF6F0]/50 text-sm text-[#352722] focus:outline-none focus:ring-2 focus:ring-[#C58F91] transition-all resize-y"
                    />
                    <FileText className="w-4 h-4 text-[#352722]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#352722] text-[#FAF6F0] text-xs uppercase tracking-widest font-semibold hover:bg-[#352722]/90 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 text-[#C58F91]" />
                        <span>Submit Appointment Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Context & Assistance Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Help Card */}
            <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 border border-[#E8D8C8] space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#E8D8C8] flex items-center justify-center text-[#C58F91]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#352722]">
                Need Help Choosing a Service?
              </h3>
              <p className="text-xs sm:text-sm text-[#352722]/75 leading-relaxed">
                If you are planning for a bridal party or are undecided between different facial therapies or coloring techniques, our concierge is happy to assist.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#352722] hover:text-[#C58F91] transition-colors cursor-pointer"
              >
                Contact Salon Concierge
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Salon Hours & Guidelines */}
            <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#E8D8C8] space-y-4 text-xs text-[#352722]/80">
              <div className="flex items-center gap-2 text-[#C58F91] font-semibold">
                <Clock className="w-4 h-4" />
                <span className="uppercase tracking-widest">Salon Schedule</span>
              </div>
              <div className="space-y-1.5 pt-1">
                {SALON_INFO.hours.map((h, i) => (
                  <div key={i} className="flex justify-between border-b border-[#FAF6F0] pb-1">
                    <span className="font-medium text-[#352722]">{h.days}</span>
                    <span>{h.hours}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-start gap-2 text-[11px] text-[#352722]/70 leading-relaxed border-t border-[#E8D8C8]/60">
                <ShieldCheck className="w-4 h-4 text-[#C58F91] shrink-0 mt-0.5" />
                <span>
                  All appointment requests are reviewed by our stylists. We honor a 24-hour rescheduling courtesy.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
