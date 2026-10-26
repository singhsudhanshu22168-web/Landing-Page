"use client";

import React, { useState } from "react";
import { Maximize2 } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "bridal" | "hair" | "makeup" | "interior";
  imageUrl: string;
  aspectRatio: string;
}

const galleryData: GalleryItem[] = [
  {
    id: "1",
    title: "Royal Indian Bridal Elegance",
    category: "bridal",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "2",
    title: "Honey Gold Balayage & Wave Styling",
    category: "hair",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "3",
    title: "High-Glamour Smokey Eye & Contour",
    category: "makeup",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "4",
    title: "Obsidian & Gold Luxury Salon Interior",
    category: "interior",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "aspect-[16/9]",
  },
  {
    id: "5",
    title: "Signature Bridal Trousseau Styling",
    category: "bridal",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "6",
    title: "Gloss Silk Keratin Rejuvenation",
    category: "hair",
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=85",
    aspectRatio: "aspect-[4/3]",
  },
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === "all"
    ? galleryData
    : galleryData.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="relative py-16 md:py-24 bg-[#080808] overflow-hidden border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-5">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] gold-text uppercase">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white font-medium mt-1.5">
              EDITORIAL GALLERY
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["all", "bridal", "hair", "makeup", "interior"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gold-gradient text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "border border-gold/20 text-champagne/70 hover:border-gold hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`relative overflow-hidden group cursor-pointer border border-gold/20 hover:border-gold transition-all duration-500 ${item.aspectRatio}`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-4 sm:p-6">
                <div className="flex justify-end">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 border border-gold/40 flex items-center justify-center text-gold">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.3em] font-semibold text-gold uppercase block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-medium">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] h-full flex flex-col items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 sm:-top-10 sm:right-0 bg-black/80 sm:bg-transparent px-3 py-1.5 rounded-full sm:rounded-none border border-gold/40 sm:border-none text-gold sm:text-white/80 hover:text-gold text-xs uppercase tracking-widest z-20 flex items-center gap-1"
              aria-label="Close image modal"
            >
              ✕ Close
            </button>
            <div className="relative w-full h-[60vh] sm:h-[70vh] border border-gold/40">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 text-center px-4">
              <span className="text-xs gold-text uppercase tracking-[0.3em] font-semibold">
                {selectedImage.category}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-white mt-1">
                {selectedImage.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
