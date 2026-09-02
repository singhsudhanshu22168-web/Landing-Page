"use client";

import React from "react";
import { Sparkles, Calendar, Clock, MapPin, Phone, MessageCircle } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { CinematicSectionVideo } from "@/components/video/CinematicSectionVideo";

interface BookingSectionProps {
  onOpenBooking: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="booking" className="relative py-20 md:py-28 bg-[#080808] overflow-hidden border-t border-gold/20 select-none">
      {/* ============================================================ */}
      {/* CLIP 05 — Final Booking / CTA Video Segment (8.0s – 10.0s) */}
      {/* ============================================================ */}
      <CinematicSectionVideo startTime={8.0} endTime={10.0} overlayOpacity={0.6} objectPosition="center 20%" />

      {/* Background Gold Glow Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(198,166,107,0.15)_0%,transparent_70%)] pointer-events-none z-[2]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-5">
          <Logo size="lg" showText={false} animateGlow />
        </div>

        <span className="text-xs font-semibold tracking-[0.4em] gold-text uppercase block mb-3">
          Reserve Your Experience
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-medium tracking-tight">
          YOUR NEXT <br />
          <span className="gold-text italic font-normal">SIGNATURE LOOK STARTS HERE.</span>
        </h2>

        <p className="mt-4 text-sm text-champagne/70 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
          Elevate your personal grooming ritual with our master artisans. Choose your preferred service, specialist, date, and time.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={onOpenBooking}
            className="px-10 py-5 bg-gold-gradient text-black font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-500 shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] hover:scale-105 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            BOOK AN APPOINTMENT
          </button>

          <a
            href="https://wa.me/?text=Hello%20Priya%20Beauty%20Salon!%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-5 border border-gold/40 text-gold font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-gold/10 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WHATSAPP BOOKING
          </a>
        </div>

        {/* Salon Contact Info Bar */}
        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10 text-left max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-surface border border-gold/30 text-gold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-medium">Atelier Location</h4>
              <p className="text-xs text-champagne/70 font-light mt-1">
                Plot 42, Royal Promenade, Bandra West, Mumbai 400050
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-surface border border-gold/30 text-gold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-medium">Salon Hours</h4>
              <p className="text-xs text-champagne/70 font-light mt-1">
                Tue – Sun: 10:00 AM – 8:00 PM <br />
                Monday: Private Bridal Appointments
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-surface border border-gold/30 text-gold">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-medium">Direct Concierge</h4>
              <p className="text-xs text-champagne/70 font-light mt-1">
                +91 98200 12345 <br />
                concierge@priyabeautysalon.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
