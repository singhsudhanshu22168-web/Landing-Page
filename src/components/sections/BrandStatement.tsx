"use client";

import React from "react";
import { CinematicSectionVideo } from "@/components/video/CinematicSectionVideo";

export const BrandStatement: React.FC = () => {
  return (
    <section id="about" className="relative pt-16 md:pt-24 pb-20 md:pb-28 bg-[#080808] overflow-hidden border-t border-b border-gold/15 select-none">
      {/* ============================================================ */}
      {/* CLIP 02 — Brand Statement Video Segment (2.0s – 4.0s) */}
      {/* ============================================================ */}
      <CinematicSectionVideo startTime={2.0} endTime={4.0} overlayOpacity={0.65} objectPosition="center 30%" />

      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(198,166,107,0.12)_0%,transparent_70%)] pointer-events-none z-[2]" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* Subtle Gold Royal Filigree Ornamental Line */}
        <div className="flex items-center justify-center gap-4 mb-6 md:mb-8 opacity-80">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold" />
          <svg width="40" height="20" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 25 C30 5 70 45 90 25 M20 25 C40 15 60 35 80 25"
              stroke="#d4af37"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="50" cy="25" r="4" fill="#d4af37" />
          </svg>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Oversized Editorial Typography */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-champagne/90 leading-[1.25] tracking-wide">
          “BEAUTY IS NOT ABOUT <br />
          <span className="gold-text font-normal">BECOMING SOMEONE ELSE.</span>
        </h2>

        <div className="my-6 md:my-8">
          <span className="inline-block text-gold text-2xl font-serif">✦</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.25] tracking-tight">
          IT IS ABOUT <br />
          <span className="italic font-normal text-gold">BECOMING YOUR BEST SELF.”</span>
        </h2>

        {/* Royal Philosophy Sub-text */}
        <p className="mt-10 md:mt-12 text-xs sm:text-sm tracking-[0.3em] uppercase text-champagne/60 max-w-xl mx-auto font-light leading-relaxed">
          Crafted with care since 2012 — Priya Beauty Salon transforms personal grooming into a royal ritual of self-love and timeless radiance.
        </p>
      </div>
    </section>
  );
};
