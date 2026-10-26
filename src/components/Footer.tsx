"use client";

import React from "react";
import { Logo } from "@/components/brand/Logo";
import { Instagram, Facebook, Youtube, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030303] border-t border-gold/20 pt-12 pb-24 md:pb-12 text-champagne/70 font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 pb-8 border-b border-white/10">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Footer Navigation */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs tracking-[0.2em] uppercase">
            <a href="#hero" className="hover:text-gold transition-colors">Home</a>
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#booking" className="hover:text-gold transition-colors">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-gold">
            <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Salon Apple Ravet. All Royal Rights Reserved.</p>
          <p className="flex items-center gap-1 justify-center sm:justify-start">
            Crafted for <span className="gold-text font-serif">Salon Apple Ravet</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
