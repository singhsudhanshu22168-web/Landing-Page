"use client";

import React from "react";
import { Award, Sparkles } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  specialty: string;
  imageUrl: string;
}

const artistsData: Artist[] = [
  {
    id: "divya",
    name: "DIVYA",
    role: "Founder & Beauty Director",
    experience: "15+ Years Mastery",
    bio: "Visionary aesthetician trained in London and Mumbai. Master of royal bridal trousseau and bespoke facial rejuvenation.",
    specialty: "Royal Bridal Couture & Dermal Radiance",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "ananya",
    name: "ANANYA",
    role: "Master Hair Sculptor",
    experience: "11+ Years Experience",
    bio: "Pioneer in organic balayage coloring, precision hair sculpting, and silk keratin restoration for high-fashion clients.",
    specialty: "Couture Balayage & Hair Botox",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "priya",
    name: "PRIYA",
    role: "Lead Bridal & Runway Artist",
    experience: "9+ Years Craft",
    bio: "Celebrity glam specialist known for weightless HD airbrush finishes and timeless regal bride aesthetics.",
    specialty: "HD Airbrush & Runway Glamour",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
  },
];

interface ArtistsSectionProps {
  onBookArtist: (artistName: string) => void;
}

export const ArtistsSection: React.FC<ArtistsSectionProps> = ({ onBookArtist }) => {
  return (
    <section className="relative py-20 md:py-24 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-14">
          <span className="text-xs font-semibold tracking-[0.3em] gold-text uppercase block mb-2">
            Master Artisans
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-white font-medium">
            MEET THE ARTISTS
          </h2>
          <p className="mt-4 text-champagne/70 text-sm max-w-xl mx-auto font-light">
            Our internationally trained beauty directors bring passion, precision, and royal artistry to every appointment.
          </p>
        </div>

        {/* Editorial Artist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artistsData.map((artist) => (
            <div
              key={artist.id}
              className="glass-panel group overflow-hidden border border-gold/20 hover:border-gold transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Artist Photo */}
                <div className="relative h-96 w-full overflow-hidden border-b border-gold/20">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 border border-gold/30 text-[10px] gold-text font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {artist.experience}
                  </div>
                </div>

                {/* Artist Info */}
                <div className="p-6">
                  <h3 className="font-serif text-3xl text-white font-medium tracking-wider">
                    {artist.name}
                  </h3>
                  <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase block mt-1">
                    {artist.role}
                  </span>
                  <p className="mt-4 text-xs text-champagne/80 font-light leading-relaxed">
                    {artist.bio}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-champagne/70">
                    <span className="font-light">Specialty:</span>
                    <span className="gold-text font-medium text-[11px]">{artist.specialty}</span>
                  </div>
                </div>
              </div>

              {/* Book Artist Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onBookArtist(artist.name)}
                  className="w-full py-3 border border-gold/40 text-gold text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-gold-gradient hover:text-black flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  RESERVE WITH {artist.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
