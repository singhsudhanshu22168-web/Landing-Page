"use client";

import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  treatment: string;
  location: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: "1",
    quote: "I felt completely transformed, while still feeling like myself. Divya and her team created a royal bridal look that exceeded every dream.",
    clientName: "Rhea Kapoor",
    treatment: "Royal Bridal Experience",
    location: "Mumbai",
  },
  {
    id: "2",
    quote: "The 24K Gold Facial and Keratin Therapy left my skin glowing for weeks. The atmosphere is pure luxury from the second you walk in.",
    clientName: "Meera Singhania",
    treatment: "Skin & Hair Rituals",
    location: "Delhi",
  },
  {
    id: "3",
    quote: "Priya Beauty Salon is an oasis of aesthetic perfection. The attention to detail and bespoke hospitality are unmatched.",
    clientName: "Natasha Merchant",
    treatment: "Signature HD Makeup",
    location: "Bengaluru",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const current = testimonialsData[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-20 md:py-24 bg-[#070707] overflow-hidden border-t border-b border-gold/10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Section Badge */}
        <span className="text-xs font-semibold tracking-[0.3em] gold-text uppercase block mb-4">
          Client Experience
        </span>

        {/* 5-Star Rating Accent */}
        <div className="flex items-center justify-center gap-1.5 mb-6 text-gold">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-gold stroke-gold" />
          ))}
        </div>

        {/* Large Editorial Quote */}
        <div className="min-h-[170px] flex flex-col justify-center transition-all duration-700">
          <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl text-champagne/90 font-light leading-relaxed tracking-wide italic">
            “{current.quote}”
          </blockquote>

          <div className="mt-6">
            <cite className="not-italic font-serif text-2xl text-white font-medium block">
              — {current.clientName}
            </cite>
            <span className="text-xs tracking-[0.25em] text-gold uppercase font-light mt-1 block">
              {current.treatment} • {current.location}
            </span>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:border-gold hover:bg-gold/10 transition-all"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeIndex === idx ? "bg-gold w-8" : "bg-white/20 hover:bg-gold/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:border-gold hover:bg-gold/10 transition-all"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
