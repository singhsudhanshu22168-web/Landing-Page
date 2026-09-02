"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, Clock, Tag } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  startingPrice: string;
  treatments: string[];
  imageUrl: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "hair",
    num: "01",
    title: "HAIR ATELIER",
    tagline: "Couture Haircuts, Balayage & Keratin Rejuvenation",
    description: "Precision hair sculpting, bespoke organic colorations, and botanical hair botox treatments engineered for breathtaking gloss and vitality.",
    duration: "60 - 150 mins",
    startingPrice: "₹2,500",
    treatments: ["Balayage & Ombré Color", "Keratin & Olaplex Therapy", "Royal Hair Spa", "Precision Hair Cut"],
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "skin",
    num: "02",
    title: "SKIN RITUALS",
    tagline: "Hydra-Glow, 24K Gold Facial & Anti-Aging Therapy",
    description: "Rejuvenating dermal elixirs, diamond microdermabrasion, and 24K gold foil infused collagen facials designed to restore luminous youthful glow.",
    duration: "45 - 90 mins",
    startingPrice: "₹3,200",
    treatments: ["24K Gold Radiance Facial", "Hydra-Peel Dermal Infusion", "LED Light Therapy", "Deep Pore Detox"],
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "makeup",
    num: "03",
    title: "SIGNATURE MAKEUP",
    tagline: "High-Fashion Glamour & HD Airbrush Artistry",
    description: "Editorial runway makeup and flawless HD airbrush contouring tailored to match your personal features and event ambiance.",
    duration: "60 - 90 mins",
    startingPrice: "₹4,500",
    treatments: ["HD Airbrush Glamour", "Cocktail & Event Makeup", "Editorial Photo Shoot", "Lash & Brow Lamination"],
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "bridal",
    num: "04",
    title: "BRIDAL EXPERIENCE",
    tagline: "The Royal Bride — Comprehensive Trousseau Ritual",
    description: "An extraordinary multi-day royal trousseau experience including pre-bridal skin detox, traditional mehendi aesthetic, and bespoke bridal hair & makeup.",
    duration: "Full Day / Custom",
    startingPrice: "₹25,000",
    treatments: ["Royal Bridal Makeup & Styling", "Pre-Bridal Glow Package", "Draping & Trousseau Styling", "Grooming & Spa"],
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "nails",
    num: "05",
    title: "NAIL ARTISTRY",
    tagline: "Gel Extensions, Chrome Foil & Luxury Pedicures",
    description: "High-shine gel extensions, hand-painted gold leaf nail artistry, and soothing paraffin wax manicures for flawless hands.",
    duration: "45 - 75 mins",
    startingPrice: "₹1,800",
    treatments: ["Custom Gel Extensions", "Hand-Painted Chrome Art", "Royal Paraffin Spa", "3D Nail Embellishments"],
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeService, setActiveService] = useState<ServiceItem>(servicesData[0]);

  return (
    <section id="services" className="relative py-20 md:py-24 bg-[#080808] overflow-hidden">
      {/* Background Dynamic Image Reveal Container */}
      <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-700 pointer-events-none">
        <img
          src={activeService.imageUrl}
          alt={activeService.title}
          className="w-full h-full object-cover filter blur-sm scale-105 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-[#080808]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-14 border-b border-gold/20 pb-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] gold-text uppercase">
              Bespoke Offerings
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-white font-medium mt-2">
              SIGNATURE SERVICES
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-champagne/70 text-sm max-w-md font-light tracking-wide">
            Hover or select any service below to explore our signature royal beauty rituals and treatment menus.
          </p>
        </div>

        {/* Main Interactive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
          {/* Left Column: Typography Service Selector List (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {servicesData.map((service) => {
              const isSelected = activeService.id === service.id;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveService(service)}
                  onClick={() => setActiveService(service)}
                  className={`group cursor-pointer p-4 sm:p-5 transition-all duration-500 border-b ${
                    isSelected
                      ? "border-gold bg-surface/80 shadow-[0_0_30px_rgba(212,175,55,0.1)] translate-x-3"
                      : "border-white/5 hover:border-gold/40 hover:bg-surface/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span
                        className={`font-serif text-lg md:text-xl transition-colors duration-300 ${
                          isSelected ? "text-gold font-semibold" : "text-white/40 group-hover:text-gold/70"
                        }`}
                      >
                        {service.num}
                      </span>
                      <h3
                        className={`font-serif text-2xl md:text-4xl tracking-wider transition-all duration-300 ${
                          isSelected
                            ? "text-white font-medium tracking-widest pl-2"
                            : "text-champagne/70 group-hover:text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <ArrowRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        isSelected
                          ? "text-gold translate-x-0 opacity-100"
                          : "text-white/20 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold/60"
                      }`}
                    />
                  </div>

                  {/* Active Animated Gold Line Accent */}
                  <div
                    className={`h-[2px] bg-gold-gradient mt-4 transition-all duration-500 ${
                      isSelected ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: High-Fashion Visual & Detail Card (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 rounded-none border border-gold/30 relative group overflow-hidden">
              {/* Image Card Container */}
              <div className="relative h-72 w-full mb-5 overflow-hidden border border-gold/20">
                <img
                  src={activeService.imageUrl}
                  alt={activeService.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-champagne font-light">
                  <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1 border border-gold/30">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    {activeService.duration}
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1 border border-gold/30 gold-text font-semibold">
                    <Tag className="w-3.5 h-3.5 text-gold" />
                    From {activeService.startingPrice}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h4 className="font-serif text-2xl text-gold font-medium mb-2">
                {activeService.tagline}
              </h4>
              <p className="text-xs text-champagne/80 font-light leading-relaxed mb-4">
                {activeService.description}
              </p>

              {/* Key Treatments */}
              <div className="mb-6">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase block mb-3">
                  Included Rituals
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activeService.treatments.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-champagne/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(activeService.title)}
                className="w-full py-3.5 bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:brightness-110 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                BOOK {activeService.title}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
