"use client";

import React, { useRef, useState, useEffect } from "react";

interface CinematicSectionVideoProps {
  startTime: number; // e.g. 0.0
  endTime: number;   // e.g. 2.0
  overlayOpacity?: number; // e.g. 0.6
  radialVignette?: boolean;
  objectPosition?: string; // e.g. "center 25%"
  className?: string;
}

export const CinematicSectionVideo: React.FC<CinematicSectionVideoProps> = ({
  startTime,
  endTime,
  overlayOpacity = 0.55,
  radialVignette = true,
  objectPosition = "center 25%",
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Accessibility check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotion);

    // IntersectionObserver for performance (only play when visible in viewport)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (videoRef.current) {
            if (entry.isIntersecting && !mediaQuery.matches) {
              if (
                videoRef.current.currentTime < startTime ||
                videoRef.current.currentTime >= endTime
              ) {
                videoRef.current.currentTime = startTime;
              }
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotion);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [startTime, endTime]);

  // Handle precise time looping within [startTime, endTime]
  const handleTimeUpdate = () => {
    if (!videoRef.current || reducedMotion) return;
    if (
      videoRef.current.currentTime >= endTime ||
      videoRef.current.currentTime < startTime
    ) {
      videoRef.current.currentTime = startTime;
    }
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none z-[1] ${className}`}>
      {/* Background Obsidian Base */}
      <div className="absolute inset-0 bg-[#080808] z-[0]" />

      {/* Shared Single Video Asset with Time-Boundary Looping */}
      <video
        ref={videoRef}
        autoPlay={!reducedMotion}
        loop={false}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-[1]"
        style={{
          objectPosition,
          filter: "brightness(0.92) contrast(1.04)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <source src="/priya_beauty_salon_hero_background.mp4#t=0.1" type="video/mp4" />
      </video>

      {/* Linear Top Dark Fade */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#080808]/90 via-[#080808]/40 to-transparent pointer-events-none z-[2]" />

      {/* Center Radial Dark Vignette Overlay for Typography Contrast */}
      {radialVignette && (
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: `radial-gradient(ellipse at center, rgba(8,8,8,${overlayOpacity}) 0%, rgba(8,8,8,${
              overlayOpacity * 0.5
            }) 55%, rgba(8,8,8,0.92) 100%)`,
          }}
        />
      )}

      {/* Linear Bottom Dark Fade for Smooth Section Transitions */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent pointer-events-none z-[2]" />
    </div>
  );
};
