import React from 'react';
import type { PageId } from '../types';
import { HERO_IMAGE, FACIAL_IMAGE } from '../data/salonData';
import { ArrowRight, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const whyChoosePoints = [
    {
      title: 'Personalized beauty consultations',
      description: 'We listen attentively to your lifestyle, hair texture, skin profile, and personal vision before starting any service.',
    },
    {
      title: 'Professional and attentive service',
      description: 'Every appointment is conducted with quiet care, steady focus, and deliberate respect for your time and comfort.',
    },
    {
      title: 'A comfortable, welcoming environment',
      description: 'Our salon is created as an inviting haven with soft lighting, warm beverages, and serene spaces designed for relaxation.',
    },
    {
      title: 'Attention to detail and client satisfaction',
      description: 'From precision perimeter cuts to seamless brow lines and gentle rinse basins, we refine every touchpoint of your visit.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-[#FAF6F0] py-16 border-b border-[#E8D8C8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C58F91] inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            About Velora
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#352722] font-semibold text-balance">
            The Art of Beauty, The Velora Way.
          </h1>
          <p className="text-base sm:text-lg text-[#352722]/80 leading-relaxed pt-2 max-w-2xl mx-auto">
            At Velora Beauty Salon, we believe beauty is personal. Our goal is to create a welcoming space where every guest can relax, feel confident, and enjoy beauty services tailored to their individual style.
          </p>
        </div>
      </section>

      {/* Large Salon Image Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8D8C8] aspect-[21/9] sm:aspect-[16/7] bg-[#E8D8C8]">
          <img
            src={HERO_IMAGE}
            alt="Velora Beauty Salon studio interior featuring spacious illuminated styling stations"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="eager"
          />
        </div>
      </section>

      {/* Story & Mission Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Our Story */}
          <div className="space-y-4 bg-[#FFFFFF] p-8 sm:p-10 rounded-3xl border border-[#E8D8C8]">
            <div className="w-8 h-0.5 bg-[#C58F91]" />
            <h2 className="font-serif text-3xl text-[#352722] font-semibold">
              Our Story
            </h2>
            <p className="text-sm sm:text-base text-[#352722]/80 leading-relaxed">
              Velora was founded with the aspiration to bring a calmer, more thoughtful approach to the modern beauty experience. We noticed that salon appointments often felt rushed or transactional. In response, Velora was designed as a soothing sanctuary where guests can pause, be heard, and receive attentive personal care.
            </p>
            <p className="text-sm sm:text-base text-[#352722]/80 leading-relaxed">
              From our warm ivory palettes and natural light to the carefully chosen products we use, every element has been curated to make every visit feel like a peaceful retreat.
            </p>
          </div>

          {/* Our Mission */}
          <div className="space-y-4 bg-[#FFFFFF] p-8 sm:p-10 rounded-3xl border border-[#E8D8C8]">
            <div className="w-8 h-0.5 bg-[#C58F91]" />
            <h2 className="font-serif text-3xl text-[#352722] font-semibold">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base text-[#352722]/80 leading-relaxed">
              Our mission is to celebrate and accentuate your natural beauty with genuine hospitality and high standards of craft. We are committed to treating every client as an individual, taking the time to understand your lifestyle, routine, and aesthetic goals.
            </p>
            <p className="text-sm sm:text-base text-[#352722]/80 leading-relaxed">
              Whether you come to Velora for a maintenance trim, restorative skincare treatment, or bridal celebration styling, our focus remains on delivering an uplifting and restorative experience.
            </p>
          </div>
        </div>
      </section>

      {/* Our Beauty Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF6F0] rounded-3xl p-8 sm:p-12 border border-[#E8D8C8]">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8D8C8] shadow-sm">
            <img
              src={FACIAL_IMAGE}
              alt="Skincare treatment reflecting Velora beauty philosophy"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C58F91]">
              Guiding Principle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#352722] font-semibold">
              Our Beauty Philosophy
            </h2>
            <p className="text-sm sm:text-base text-[#352722]/80 leading-relaxed">
              We believe that authentic beauty is never one-size-fits-all. True beauty radiates when care is personalized, skin is nourished, and hair is styled in harmony with how you live and express yourself.
            </p>
            <p className="text-sm sm:text-base text-[#352722]/80 leading-relaxed">
              Rather than pushing passing trends, we focus on enhancing what is inherently yours—creating soft dimensional colors, healthy hair textures, glowing skin, and polished styling that feels effortless and timeless.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Velora? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C58F91]">
            Guest Commitment
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#352722] font-semibold">
            Why Choose Velora?
          </h2>
          <p className="text-sm text-[#352722]/75">
            Four core standards that shape your visit from the moment you arrive.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyChoosePoints.map((point, index) => (
            <div
              key={index}
              className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#E8D8C8] space-y-3 hover:border-[#C58F91]/50 transition-colors"
            >
              <div className="flex items-center gap-3 text-[#C58F91]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <h3 className="font-serif text-xl font-semibold text-[#352722]">
                  {point.title}
                </h3>
              </div>
              <p className="text-sm text-[#352722]/75 leading-relaxed pl-8">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={() => onNavigate('services')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-[#352722]/30 text-[#352722] font-semibold text-xs uppercase tracking-widest hover:bg-[#E8D8C8]/50 hover:border-[#352722] transition-colors cursor-pointer"
          >
            Discover Our Services
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#352722] text-[#FAF6F0] font-semibold text-xs uppercase tracking-widest hover:bg-[#352722]/90 hover:shadow-md transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#C58F91]" />
            Book Your Visit
          </button>
        </div>
      </section>
    </div>
  );
};
