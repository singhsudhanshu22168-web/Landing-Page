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
    <section id="gallery" className="relative py-20 md:py-24 bg-[#080808] overflow-hidden border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] gold-text uppercase">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-white font-medium mt-2">
              EDITORIAL GALLERY
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["all", "bridal", "hair", "makeup", "interior"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
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
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <span className="w-10 h-10 rounded-full bg-black/60 border border-gold/40 flex items-center justify-center text-gold">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.3em] font-semibold text-gold uppercase block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl text-white font-medium">
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
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[70vh] border border-gold/40">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs gold-text uppercase tracking-[0.3em] font-semibold">
                {selectedImage.category}
              </span>
              <h4 className="font-serif text-2xl text-white mt-1">
                {selectedImage.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
