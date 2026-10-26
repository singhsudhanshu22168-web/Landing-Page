"use client";

import React, { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";

interface HeroIntroProps {
  onComplete: () => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    // Cinematic timeline sequence
    const t1 = setTimeout(() => setPhase(1), 300);   // Warm gold ambient light appears
    const t2 = setTimeout(() => setPhase(2), 1200);  // Salon Apple Ravet logo fades into view
    const t3 = setTimeout(() => setPhase(3), 2400);  // Delicate light reflection sweeps across gold logo
    const t4 = setTimeout(() => setPhase(4), 3800);  // Logo scales down & glides to complete sequence
    const t5 = setTimeout(() => {
      setPhase(5);
      onComplete();
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  if (phase >= 5) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden transition-opacity duration-1000">
      {/* Step 1: Subtle Warm Golden Light Radial Glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-1500 pointer-events-none ${
          phase >= 1 ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.18) 0%, rgba(140, 109, 63, 0.05) 45%, rgba(5, 5, 5, 1) 75%)",
        }}
      />

      {/* Subtle Dust / Ambient Particles */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Step 2 & 3: Logo Entrance & Light Reflection Sweep */}
      <div
        className={`relative flex flex-col items-center justify-center px-4 max-w-full transition-all duration-1000 transform ${
          phase >= 2 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        } ${phase >= 4 ? "scale-90 opacity-0 transition-all duration-700" : ""}`}
      >
        <div className="relative group">
          {/* Logo Component */}
          <Logo size="xl" showText={false} animateGlow={phase >= 2} />

          {/* Step 3: Delicate Light Reflection Sweeping Across Logo */}
          {phase >= 3 && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-champagne/40 to-transparent transform -rotate-45 translate-x-[-150%] animate-[shimmerSweep_1.8s_ease-in-out_forwards]" />
            </div>
          )}
        </div>

        {/* Brand Name Typography Reveal */}
        <div
          className={`mt-6 text-center transition-all duration-1000 ${
            phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold tracking-[0.18em] sm:tracking-[0.25em] gold-text uppercase">
            Salon Apple
          </h1>
          <p className="font-sans text-[11px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.4em] text-champagne/80 uppercase font-light mt-2">
            Ravet
          </p>
        </div>
      </div>
    </div>
  );
};
