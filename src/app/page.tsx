"use client";

import React, { useState } from "react";
import { HeroIntro } from "@/components/HeroIntro";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { GoldenMirrorSection } from "@/components/sections/GoldenMirrorSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TransformationSection } from "@/components/sections/TransformationSection";
import { ScrollBrandMoment } from "@/components/sections/ScrollBrandMoment";
import { GallerySection } from "@/components/sections/GallerySection";
import { ArtistsSection } from "@/components/sections/ArtistsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { BookingModal } from "@/components/booking/BookingModal";
import { Footer } from "@/components/Footer";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");
  const [preselectedArtist, setPreselectedArtist] = useState("");

  const handleOpenBooking = (service = "", artist = "") => {
    setPreselectedService(service);
    setPreselectedArtist(artist);
    setIsBookingOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#080808] text-champagne selection:bg-gold selection:text-black">
      {/* 1. Cinematic Opening Intro Sequence */}
      <HeroIntro onComplete={() => setIntroFinished(true)} />

      {/* 2. Top Minimal Navbar with Priya Beauty Salon Logo */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* 3. Hero Section & 3D Centerpiece */}
      <HeroSection onOpenBooking={() => handleOpenBooking()} />

      {/* 4. Section 2: Editorial Brand Statement */}
      <BrandStatement />

      {/* 5. Section 2.5: The Golden Mirror / Beauty Signature */}
      <GoldenMirrorSection onOpenBooking={(service) => handleOpenBooking(service)} />

      {/* 6. Section 3: Signature Services */}
      <ServicesSection onSelectService={(service) => handleOpenBooking(service)} />

      {/* 6. Section 4: Before & After Transformation Slider */}
      <TransformationSection />

      {/* 7. Section 5: 3D Brand Moment Scroll Transformation */}
      <ScrollBrandMoment />

      {/* 8. Section 6: Editorial Gallery */}
      <GallerySection />

      {/* 9. Section 7: Meet the Artists */}
      <ArtistsSection onBookArtist={(artist) => handleOpenBooking("", artist)} />

      {/* 10. Section 8: Client Experience Testimonials */}
      <TestimonialsSection />

      {/* 11. Section 9: Full-Screen Booking Section */}
      <BookingSection onOpenBooking={() => handleOpenBooking()} />

      {/* 12. Footer */}
      <Footer />

      {/* 13. Mobile Sticky CTA Bar */}
      <MobileStickyCTA onOpenBooking={() => handleOpenBooking()} />

      {/* 14. Interactive Multi-Step Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={preselectedService}
        initialArtist={preselectedArtist}
      />
    </main>
  );
}
