"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface MobileStickyCTAProps {
  onOpenBooking: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none">
      <button
        onClick={onOpenBooking}
        className="pointer-events-auto w-full py-3.5 sm:py-4 bg-gold-gradient text-black font-bold text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform rounded-none"
      >
        <Sparkles className="w-4 h-4" />
        BOOK APPOINTMENT
      </button>
    </div>
  );
};
