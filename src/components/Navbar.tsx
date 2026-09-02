"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { Menu, X, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#hero" },
    { name: "SERVICES", href: "#services" },
    { name: "ABOUT", href: "#about" },
    { name: "GALLERY", href: "#gallery" },
    { name: "CONTACT", href: "#booking" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md py-3 border-b border-gold/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Official Priya Beauty Salon Brand Emblem */}
        <a href="#hero" className="group">
          <Logo size="md" />
        </a>

        {/* Center Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium tracking-[0.25em] text-champagne/80 hover:text-gold transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-gold/40 after:via-gold after:to-gold/40 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="group relative px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase transition-all duration-500 overflow-hidden border border-gold/40 hover:border-gold hover:text-black rounded-none"
          >
            <span className="absolute inset-0 bg-gold-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
              BOOK APPOINTMENT
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gold focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] bg-black/95 backdrop-blur-xl border-t border-gold/20 flex flex-col justify-between p-8 z-40 animate-fadeIn">
          <div className="flex flex-col gap-6 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-[0.2em] text-champagne hover:text-gold border-b border-white/5 pb-3 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pb-8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 bg-gold-gradient text-black font-semibold text-xs tracking-[0.25em] uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              BOOK APPOINTMENT
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
