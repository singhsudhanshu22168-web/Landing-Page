"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { CinematicSectionVideo } from "@/components/video/CinematicSectionVideo";

export const TransformationSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(896);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width) {
            setContainerWidth(entry.contentRect.width);
          }
        }
      });
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateWidth);
      if (observer) observer.disconnect();
    };
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="relative py-16 md:py-24 bg-[#080808] overflow-hidden border-t border-gold/15 select-none">
      {/* ============================================================ */}
      {/* CLIP 04 — Transformation Video Segment (6.0s – 8.0s) */}
      {/* ============================================================ */}
      <CinematicSectionVideo startTime={6.0} endTime={8.0} overlayOpacity={0.65} objectPosition="center 30%" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-gold/30 bg-black/60 mb-4 max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase gold-text">
              Interactive Comparison
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-6xl text-white font-medium tracking-tight">
            THE ART OF <span className="gold-text italic font-normal">TRANSFORMATION.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-champagne/70 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Drag the golden divider line left or right to witness the flawless hair restyle & royal bridal makeover.
          </p>
        </div>

        {/* Before & After Draggable Slider Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="relative h-[300px] sm:h-[480px] md:h-[600px] w-full max-w-4xl mx-auto overflow-hidden select-none border border-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-ew-resize group touch-pan-y"
        >
          {/* AFTER Image (Full Width Base Layer) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=90"
              alt="After Transformation - Royal Glamour"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-1.5 border border-gold/40 text-gold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-semibold uppercase">
              AFTER RITUAL
            </div>
          </div>

          {/* BEFORE Image (Clipped Left Overlay Layer) */}
          <div
            className="absolute top-0 bottom-0 left-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div
              className="relative h-full max-w-none"
              style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}
            >
              <img
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1600&q=90"
                alt="Before Transformation - Natural Base"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-1.5 border border-white/20 text-champagne text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-light uppercase">
                BEFORE RITUAL
              </div>
            </div>
          </div>

          {/* Draggable Divider Line & Golden Emblem Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-gold-gradient shadow-[0_0_15px_rgba(212,175,55,0.8)] z-20 flex items-center justify-center -translate-x-1/2 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Royal Gold Emblem Handle */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black border-2 border-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.6)] text-gold">
              <span className="text-xs sm:text-sm font-serif font-bold">⇄</span>
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="text-center mt-5 sm:mt-6 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-champagne/50 uppercase font-light">
          Drag horizontally to inspect precision skin texture & hair gloss
        </div>
      </div>
    </section>
  );
};
