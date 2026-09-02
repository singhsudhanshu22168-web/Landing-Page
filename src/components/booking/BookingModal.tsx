"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { X, Sparkles, Calendar, Clock, User, CheckCircle2, MessageCircle, ChevronRight, ChevronLeft } from "lucide-react";
import confetti from "canvas-confetti";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialArtist?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = "",
  initialArtist = "",
}) => {
  const [step, setStep] = useState<number>(1);
  const [service, setService] = useState<string>(initialService || "HAIR ATELIER");
  const [artist, setArtist] = useState<string>(initialArtist || "Any Available Master Artist");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (initialService) setService(initialService);
    if (initialArtist) setArtist(initialArtist);
  }, [initialService, initialArtist]);

  if (!isOpen) return null;

  const servicesList = [
    { name: "HAIR ATELIER", price: "From ₹2,500", duration: "60-150 mins" },
    { name: "SKIN RITUALS", price: "From ₹3,200", duration: "45-90 mins" },
    { name: "SIGNATURE MAKEUP", price: "From ₹4,500", duration: "60-90 mins" },
    { name: "BRIDAL EXPERIENCE", price: "From ₹25,000", duration: "Full Day" },
    { name: "NAIL ARTISTRY", price: "From ₹1,800", duration: "45-75 mins" },
  ];

  const artistsList = [
    { name: "Any Available Master Artist", role: "First available specialist" },
    { name: "DIVYA", role: "Founder & Beauty Director" },
    { name: "ANANYA", role: "Master Hair Sculptor" },
    { name: "PRIYA", role: "Lead Bridal & Runway Artist" },
  ];

  const timeSlots = [
    "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM", "07:00 PM"
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setStep(6);
    
    // Trigger celebratory gold confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f7e5a9", "#aa771c", "#ffffff"],
    });

    // Save booking to localStorage
    const bookingRecord = {
      id: "PBS-" + Math.floor(100000 + Math.random() * 900000),
      service,
      artist,
      date: selectedDate || new Date().toISOString().split("T")[0],
      time: selectedTime || "11:30 AM",
      clientInfo,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("pbs_latest_booking", JSON.stringify(bookingRecord));
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Priya Beauty Salon! I would like to confirm my appointment:\n\n` +
    `✦ Service: ${service}\n` +
    `✦ Specialist: ${artist}\n` +
    `✦ Date: ${selectedDate || "Upcoming"}\n` +
    `✦ Time: ${selectedTime || "11:30 AM"}\n` +
    `✦ Client Name: ${clientInfo.name}\n` +
    `✦ Phone: ${clientInfo.phone}`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative max-w-3xl w-full bg-[#090909] border border-gold/40 shadow-[0_0_80px_rgba(212,175,55,0.2)] p-6 sm:p-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-champagne/70 hover:text-gold transition-colors"
          aria-label="Close Booking Window"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Logo size="sm" showText={false} />
          </div>
          <span className="text-[10px] tracking-[0.35em] gold-text uppercase font-semibold block">
            Exclusive Appointment Portal
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-medium mt-1">
            YOUR NEXT SIGNATURE LOOK STARTS HERE.
          </h2>
        </div>

        {/* Step Indicator Bar */}
        {!confirmed && (
          <div className="flex items-center justify-center gap-2 mb-10 border-b border-white/10 pb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                    step === s
                      ? "bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                      : step > s
                      ? "bg-gold/20 text-gold border border-gold/40"
                      : "bg-surface text-white/40"
                  }`}
                >
                  {s}
                </div>
                {s < 5 && <div className={`w-6 h-[1px] ${step > s ? "bg-gold" : "bg-white/10"}`} />}
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: CHOOSE SERVICE */}
        {step === 1 && (
          <div>
            <h3 className="text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-4">
              Step 1: Choose Your Desired Ritual
            </h3>
            <div className="space-y-3 mb-8">
              {servicesList.map((item) => (
                <div
                  key={item.name}
                  onClick={() => setService(item.name)}
                  className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                    service === item.name
                      ? "border-gold bg-surface/90 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                      : "border-white/10 hover:border-gold/40 bg-surface/40"
                  }`}
                >
                  <div>
                    <h4 className="font-serif text-lg text-white font-medium">{item.name}</h4>
                    <span className="text-xs text-champagne/60 font-light">{item.duration}</span>
                  </div>
                  <span className="gold-text font-semibold text-sm">{item.price}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:brightness-110"
            >
              CONTINUE TO SPECIALIST <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: CHOOSE ARTIST */}
        {step === 2 && (
          <div>
            <h3 className="text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-4">
              Step 2: Choose Preferred Artist
            </h3>
            <div className="space-y-3 mb-8">
              {artistsList.map((item) => (
                <div
                  key={item.name}
                  onClick={() => setArtist(item.name)}
                  className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                    artist === item.name
                      ? "border-gold bg-surface/90 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                      : "border-white/10 hover:border-gold/40 bg-surface/40"
                  }`}
                >
                  <div>
                    <h4 className="font-serif text-lg text-white font-medium">{item.name}</h4>
                    <span className="text-xs text-champagne/60 font-light">{item.role}</span>
                  </div>
                  <User className={`w-5 h-5 ${artist === item.name ? "text-gold" : "text-white/20"}`} />
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-4 border border-gold/40 text-gold text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> BACK
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-4 bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:brightness-110"
              >
                SELECT DATE <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT DATE */}
        {step === 3 && (
          <div>
            <h3 className="text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-4">
              Step 3: Select Date
            </h3>
            <div className="mb-8">
              <label className="block text-xs text-champagne/70 mb-2 font-light">
                Choose Preferred Reservation Date:
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-4 bg-surface border border-gold/40 text-white font-sans text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-4 border border-gold/40 text-gold text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> BACK
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!selectedDate}
                className="w-2/3 py-4 bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50"
              >
                SELECT TIME <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SELECT TIME */}
        {step === 4 && (
          <div>
            <h3 className="text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-4">
              Step 4: Select Available Time Slot
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 text-xs tracking-wider uppercase border font-medium transition-all ${
                    selectedTime === time
                      ? "border-gold bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "border-white/10 text-champagne hover:border-gold/40"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(3)}
                className="w-1/3 py-4 border border-gold/40 text-gold text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> BACK
              </button>
              <button
                onClick={() => setStep(5)}
                disabled={!selectedTime}
                className="w-2/3 py-4 bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50"
              >
                ENTER DETAILS <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONTACT DETAILS */}
        {step === 5 && (
          <form onSubmit={handleConfirm}>
            <h3 className="text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-4">
              Step 5: Enter Client Details
            </h3>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs text-champagne/70 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  className="w-full p-3 bg-surface border border-gold/30 text-white text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-champagne/70 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    className="w-full p-3 bg-surface border border-gold/30 text-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-champagne/70 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="priya@example.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="w-full p-3 bg-surface border border-gold/30 text-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-champagne/70 mb-1">Special Preferences / Requests</label>
                <textarea
                  rows={2}
                  placeholder="Hair texture notes, skin sensitivity, or wedding date..."
                  value={clientInfo.notes}
                  onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                  className="w-full p-3 bg-surface border border-gold/30 text-white text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-1/3 py-4 border border-gold/40 text-gold text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> BACK
              </button>
              <button
                type="submit"
                className="w-2/3 py-4 bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              >
                <Sparkles className="w-4 h-4" /> CONFIRM APPOINTMENT
              </button>
            </div>
          </form>
        )}

        {/* STEP 6: CONFIRMATION & WHATSAPP DIRECT TRIGGER */}
        {step === 6 && (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-gold mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-3xl text-white font-medium">
              RESERVATION CONFIRMED
            </h3>
            <p className="text-xs text-gold tracking-[0.25em] uppercase mt-1">
              Priya Beauty Salon Concierge
            </p>

            <div className="my-6 p-6 bg-surface border border-gold/30 text-left max-w-md mx-auto space-y-2 text-xs text-champagne">
              <div><strong className="text-gold">Ritual:</strong> {service}</div>
              <div><strong className="text-gold">Specialist:</strong> {artist}</div>
              <div><strong className="text-gold">Date & Time:</strong> {selectedDate} at {selectedTime}</div>
              <div><strong className="text-gold">Client:</strong> {clientInfo.name} ({clientInfo.phone})</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366] text-black font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:brightness-110"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                CONFIRM VIA WHATSAPP
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3.5 border border-gold/40 text-gold text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/10"
              >
                RETURN TO WEBSITE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
