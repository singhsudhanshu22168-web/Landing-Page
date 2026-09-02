"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  animateGlow?: boolean;
  variant?: "default" | "champagne";
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = true,
  className = "",
  animateGlow = false,
  variant = "default",
}) => {
  // Dimensions based on size preset
  const dimensions = {
    sm: { iconSize: 40, textSize: "text-base", subSize: "text-[9px]" },
    md: { iconSize: 56, textSize: "text-xl", subSize: "text-[10px]" },
    lg: { iconSize: 84, textSize: "text-2xl", subSize: "text-[12px]" },
    xl: { iconSize: 130, textSize: "text-4xl", subSize: "text-[14px]" },
  }[size];

  const goldGradientId = variant === "champagne" ? "priyaChampagne" : "priyaGold";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Royal Emblem SVG Container */}
      <div className={`relative flex items-center justify-center ${animateGlow ? "animate-pulse-glow" : ""}`}>
        <svg
          width={dimensions.iconSize}
          height={dimensions.iconSize}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_12px_rgba(201,169,110,0.35)] transition-transform duration-500 hover:scale-105"
        >
          <defs>
            {/* Rich Gold Gradient */}
            <linearGradient id="priyaGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffdfa" />
              <stop offset="25%" stopColor="#f7e5a9" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="75%" stopColor="#aa771c" />
              <stop offset="100%" stopColor="#bf953f" />
            </linearGradient>

            {/* Refined Warm Champagne / Soft Pearl Gradient */}
            <linearGradient id="priyaChampagne" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3E8D8" />
              <stop offset="25%" stopColor="#E7D0A2" />
              <stop offset="60%" stopColor="#C9A96E" />
              <stop offset="85%" stopColor="#A6854A" />
              <stop offset="100%" stopColor="#C9A96E" />
            </linearGradient>

            <linearGradient id="priyaDarkGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#8c6d3f" />
              <stop offset="100%" stopColor="#5e451b" />
            </linearGradient>

            <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(212,175,55,0.25)" />
              <stop offset="100%" stopColor="rgba(5,5,5,0)" />
            </radialGradient>
          </defs>

          {/* Background Ambient Glow */}
          <circle cx="100" cy="100" r="95" fill="url(#goldGlow)" />

          {/* Outer Royal Ornamental Ring */}
          <circle
            cx="100"
            cy="100"
            r="88"
            stroke={`url(#${goldGradientId})`}
            strokeWidth="2"
            strokeDasharray="4 2 12 2"
            opacity="0.75"
          />

          <circle
            cx="100"
            cy="100"
            r="82"
            stroke={`url(#${goldGradientId})`}
            strokeWidth="1.5"
          />

          {/* Decorative Corner Ornaments (N, S, E, W Jewels) */}
          <circle cx="100" cy="14" r="3.5" fill={`url(#${goldGradientId})`} />
          <circle cx="100" cy="186" r="3.5" fill={`url(#${goldGradientId})`} />
          <circle cx="14" cy="100" r="3.5" fill={`url(#${goldGradientId})`} />
          <circle cx="186" cy="100" r="3.5" fill={`url(#${goldGradientId})`} />

          {/* Crown Ornament Top */}
          <g transform="translate(68, 28) scale(0.64)">
            {/* Crown Base */}
            <path
              d="M10 60 Q50 68 90 60 L85 45 Q50 52 15 45 Z"
              fill={`url(#${goldGradientId})`}
            />
            {/* Crown Spikes */}
            <path
              d="M15 45 L5 15 L30 35 L50 5 L70 35 L95 15 L85 45 Z"
              fill={`url(#${goldGradientId})`}
            />
            {/* Crown Jewels */}
            <circle cx="5" cy="15" r="3.5" fill="#ffffff" />
            <circle cx="50" cy="5" r="4.5" fill="#ffffff" />
            <circle cx="95" cy="15" r="3.5" fill="#ffffff" />
          </g>

          {/* Feminine Profile & Hair Silhouette */}
          <g transform="translate(15, 8)">
            {/* Elegant Flowing Hair Swirls */}
            <path
              d="M60 85 C55 60 70 45 95 48 C120 51 135 68 132 90 C130 105 120 120 100 135 C80 150 65 142 60 130 C58 125 62 120 68 122 C78 125 90 122 105 110 C120 98 122 82 115 70 C108 58 92 52 80 62 C70 70 65 80 60 85 Z"
              fill={`url(#${goldGradientId})`}
              opacity="0.9"
            />
            {/* Delicate Face Profile Line */}
            <path
              d="M92 75 C95 82 98 86 96 90 C94 92 90 94 92 98 C94 100 97 101 95 105 C93 108 88 111 84 114"
              stroke={`url(#${goldGradientId})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Eyelash / Eye Contour */}
            <path
              d="M94 84 Q98 83 101 86"
              stroke={`url(#${goldGradientId})`}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Lips */}
            <path
              d="M92 99 Q95 100 93 102"
              stroke={`url(#${goldGradientId})`}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Bottom Ornamental Filigree Curves */}
          <path
            d="M50 148 Q100 175 150 148 Q100 162 50 148 Z"
            fill={`url(#${goldGradientId})`}
          />
          <path
            d="M65 156 Q100 176 135 156"
            stroke={`url(#${goldGradientId})`}
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col tracking-wider">
          <span
            className={`font-serif font-bold gold-text uppercase leading-none ${dimensions.textSize}`}
            style={{ letterSpacing: "0.18em" }}
          >
            Priya
          </span>
          <span
            className={`font-sans tracking-[0.35em] text-champagne/80 uppercase font-light mt-1 ${dimensions.subSize}`}
          >
            Beauty Salon
          </span>
        </div>
      )}
    </div>
  );
};
