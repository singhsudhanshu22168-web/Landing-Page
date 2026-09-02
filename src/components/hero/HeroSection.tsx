"use client";

import React, { useState, useEffect } from "react";
import { Hero3D } from "@/components/hero/Hero3D";
import { CinematicSectionVideo } from "@/components/video/CinematicSectionVideo";
import { ArrowDown, Sparkles, Crown } from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center bg-[#080808] overflow-hidden pt-20 pb-12 select-none"
    >
      {/* ============================================================ */}
      {/* CLIP 01 — Hero Video Segment (0.0s – 2.0s) */}
      {/* ============================================================ */}
      <CinematicSectionVideo startTime={0.0} endTime={2.0} overlayOpacity={0.5} objectPosition="center 25%" />

      {/* ============================================================ */}
      {/* LAYER 04 — 3D WebGL Canvas Layer (Three.js Gold & Glass) */}
      {/* ============================================================ */}
      <Hero3D />

      {/* Ambient Gold Radial Glow Behind Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(198,166,107,0.14)_0%,rgba(8,8,8,0)_70%)] pointer-events-none z-[3]" />

      {/* ============================================================ */}
      {/* LAYER 05 & 06 — Existing Logo, Typography & Action Buttons */}
      {/* ============================================================ */}
      <div
        className="relative z-[10] max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: reducedMotion
            ? "none"
            : `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0px)`,
        }}
      >
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/35 bg-[#080808]/70 backdrop-blur-md mb-6 animate-fadeIn shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <Crown className="w-3.5 h-3.5 text-gold" />
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-champagne/90">
            The Royal Atelier of Haute Beauté
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[1.05] max-w-5xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          YOUR BEAUTY. <br />
          <span className="italic font-normal gold-text">YOUR SIGNATURE.</span>
        </h1>

        {/* Sub-description */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-champagne/80 max-w-2xl font-light tracking-wide leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Step into a world of bespoke luxury, where timeless Indian heritage meets modern couture styling. Every ritual tailored for royalty.
        </p>

        {/* Hero CTA Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-5 z-20">
          {/* Primary CTA Button */}
          <button
            onClick={onOpenBooking}
            className="group relative px-9 py-4 bg-gold-gradient text-black font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(198,166,107,0.35)] hover:shadow-[0_0_50px_rgba(198,166,107,0.65)] hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4" />
              BOOK YOUR EXPERIENCE
            </span>
          </button>

          {/* Secondary CTA Action */}
          <a
            href="#services"
            className="group px-8 py-4 border border-gold/40 text-champagne font-medium text-xs tracking-[0.25em] uppercase transition-all duration-500 hover:border-gold hover:text-gold flex items-center gap-2 bg-[#080808]/60 backdrop-blur-md"
          >
            EXPLORE OUR SERVICES
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 text-gold" />
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] tracking-[0.3em] uppercase text-champagne/70 font-light drop-shadow">
          Scroll To Discover
        </span>
        <div className="w-5 h-8 border border-gold/40 rounded-full flex justify-center p-1 bg-[#080808]/40 backdrop-blur-xs">
          <div className="w-1 h-2 bg-gold rounded-full animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
};
