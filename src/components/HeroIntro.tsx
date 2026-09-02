"use client";

import React, { useEffect, useState, useRef } from "react";
import { Logo } from "@/components/brand/Logo";

interface HeroIntroProps {
  onComplete: () => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if intro has already been seen in this session
    if (typeof window !== "undefined") {
      const hasSeenIntro = sessionStorage.getItem("priya_salon_intro_seen");
      if (hasSeenIntro === "true") {
        setIsDone(true);
        onComplete();
        return;
      }
    }

    // Check motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    // Prevent scrolling during intro
    document.body.style.overflow = "hidden";

    // Play video softly
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // Precise timing sequence matching prompt guidelines:
    // 0.0s – 0.8s: Gate is closed, subtle reflection beam appears
    // 0.8s – 2.5s: Gate begins opening from center
    // 2.0s – 3.5s: Video revealed through opening
    // 2.3s – 3.8s: Logo begins revealing inside opening
    // 3.8s – 4.5s: Logo reaches full visibility + subtle champagne light sweep
    // 4.5s – 5.2s: Intro completes, smooth fade to existing landing page

    const t1 = setTimeout(() => setPhase(1), 800);   // Gate begins opening from center
    const t2 = setTimeout(() => setPhase(2), 2000);  // Video revealed fully in opening
    const t3 = setTimeout(() => setPhase(3), 2300);  // Logo begins reveal with scale 0.98 -> 1
    const t4 = setTimeout(() => setPhase(4), 3800);  // Logo full visibility + champagne sweep
    const t5 = setTimeout(() => {
      setPhase(5);
      sessionStorage.setItem("priya_salon_intro_seen", "true");
      document.body.style.overflow = "";
      onComplete();
      setTimeout(() => setIsDone(true), 600);
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden transition-opacity duration-700 pointer-events-none select-none ${
        phase >= 5 ? "opacity-0" : "opacity-100"
      }`}
      style={{ perspective: "1400px" }}
    >
      {/* ============================================================ */}
      {/* 1. REVEALED BACKGROUND VIDEO (Behind Gate) */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-[1] overflow-hidden bg-[#050505]">
        <video
          ref={videoRef}
          autoPlay={!reducedMotion}
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            phase >= 1 ? "opacity-100 scale-100" : "opacity-40 scale-105"
          }`}
          style={{
            objectPosition: "center 30%",
            filter: "brightness(0.85) contrast(1.05)",
          }}
        >
          <source src="/priya_beauty_salon_hero_background.mp4" type="video/mp4" />
        </video>

        {/* Soft Dark Radial Vignette for Content Contrast */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.75) 65%, rgba(5,5,5,0.95) 100%)",
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* 2. LUXURY 3D GILDED GATE DOORS (Split Left & Right) */}
      {/* ============================================================ */}
      {/* LEFT GATE DOOR */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1/2 z-[10] bg-[#080808] border-r border-[#C9A96E]/40 shadow-[10px_0_30px_rgba(0,0,0,0.8)] transition-transform duration-[1700ms] cubic-bezier(0.16,1,0.3,1) flex items-center justify-end"
        style={{
          transformOrigin: "left center",
          transform:
            phase >= 1
              ? "perspective(1200px) rotateY(-82deg) translateX(-95%)"
              : "perspective(1200px) rotateY(0deg) translateX(0%)",
          background:
            "linear-gradient(135deg, #0d0d0d 0%, #050505 50%, #12100d 100%)",
        }}
      >
        {/* Decorative Gilded Arch & Border Details on Left Gate */}
        <div className="absolute inset-4 border border-[#C9A96E]/20 pointer-events-none flex flex-col justify-between p-6">
          <div className="w-12 h-12 border-t-2 border-l-2 border-[#C9A96E]/60" />
          <div className="w-12 h-12 border-b-2 border-l-2 border-[#C9A96E]/60" />
        </div>
        {/* Subtle Ornamental Filigree Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
        {/* Center Vertical Gold Trim Seam */}
        <div className="w-1 h-full bg-gradient-to-b from-[#C9A96E]/20 via-[#C9A96E]/80 to-[#C9A96E]/20 shadow-[0_0_15px_rgba(201,169,110,0.5)]" />
      </div>

      {/* RIGHT GATE DOOR */}
      <div
        className="absolute top-0 right-0 bottom-0 w-1/2 z-[10] bg-[#080808] border-l border-[#C9A96E]/40 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] transition-transform duration-[1700ms] cubic-bezier(0.16,1,0.3,1) flex items-center justify-start"
        style={{
          transformOrigin: "right center",
          transform:
            phase >= 1
              ? "perspective(1200px) rotateY(82deg) translateX(95%)"
              : "perspective(1200px) rotateY(0deg) translateX(0%)",
          background:
            "linear-gradient(225deg, #0d0d0d 0%, #050505 50%, #12100d 100%)",
        }}
      >
        {/* Decorative Gilded Arch & Border Details on Right Gate */}
        <div className="absolute inset-4 border border-[#C9A96E]/20 pointer-events-none flex flex-col justify-between p-6 items-end">
          <div className="w-12 h-12 border-t-2 border-r-2 border-[#C9A96E]/60" />
          <div className="w-12 h-12 border-b-2 border-r-2 border-[#C9A96E]/60" />
        </div>
        {/* Subtle Ornamental Filigree Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
        {/* Center Vertical Gold Trim Seam */}
        <div className="w-1 h-full bg-gradient-to-b from-[#C9A96E]/20 via-[#C9A96E]/80 to-[#C9A96E]/20 shadow-[0_0_15px_rgba(201,169,110,0.5)]" />
      </div>

      {/* INITIAL SEAM LIGHT REFLECTION (Before Gate Opens) */}
      <div
        className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 z-[15] pointer-events-none transition-opacity duration-700 ${
          phase === 0 ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(231, 208, 162, 0.4), transparent)",
        }}
      />

      {/* ============================================================ */}
      {/* 3. LOGO & BRAND REVEAL INSIDE THE OPENING */}
      {/* ============================================================ */}
      <div
        className={`relative z-[30] flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ease-out transform ${
          phase >= 3
            ? "opacity-100 scale-100 translate-y-0 filter blur-0"
            : "opacity-0 scale-[0.98] translate-y-3 filter blur-[3px]"
        }`}
      >
        <div className="relative group">
          {/* Champagne Royal Logo Emblem */}
          <Logo size="xl" showText={false} variant="champagne" animateGlow={phase >= 3} />

          {/* Delicate Metallic Champagne Light Sweep */}
          {phase >= 4 && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-[220%] h-full bg-gradient-to-r from-transparent via-[#F3E8D8]/50 to-transparent transform -rotate-45 -translate-x-[150%] animate-[shimmerSweep_1.8s_ease-in-out_forwards]" />
            </div>
          )}
        </div>

        {/* Brand Name Typography Reveal in Soft Pearl / Champagne */}
        <div className="mt-6 text-center">
          <h1
            className="font-serif text-3xl sm:text-4xl md:text-6xl font-semibold tracking-[0.28em] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            style={{
              color: "#F3E8D8",
              backgroundImage: "linear-gradient(135deg, #F3E8D8 0%, #E7D0A2 50%, #C9A96E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Priya
          </h1>
          <p className="font-sans text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase font-light mt-2.5 text-[#E7D0A2]/90 drop-shadow">
            Beauty Salon
          </p>
        </div>
      </div>
    </div>
  );
};
