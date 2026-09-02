"use client";

import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles as SparklesIcon, ChevronRight, RotateCcw, Check, Calendar } from "lucide-react";
import { CinematicSectionVideo } from "@/components/video/CinematicSectionVideo";

// --- Curated Beauty Gallery Images Reflected Inside the Golden Mirror ---
const BEAUTY_PORTFOLIO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85",
    title: "Royal Indian Bridal Elegance",
    category: "Bridal Couture",
  },
  {
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
    title: "Honey Gold Balayage & Waves",
    category: "Hair Transformation",
  },
  {
    url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85",
    title: "Smokey Eye & Gold Contour",
    category: "Glamour Makeup",
  },
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    title: "Signature Bridal Trousseau",
    category: "Bridal Artistry",
  },
  {
    url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
    title: "24K Gold Dermal Radiance",
    category: "Skin Rituals",
  },
  {
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=85",
    title: "Gloss Silk Keratin Restyle",
    category: "Hair Atelier",
  },
  {
    url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",
    title: "Royal Gold Nail Artistry",
    category: "Nail Artistry",
  },
];

// --- Internal Moving Mirror Reel Component ---
function MirrorImageReel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BEAUTY_PORTFOLIO_IMAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentImg = BEAUTY_PORTFOLIO_IMAGES[currentIndex];

  return (
    <div className="w-[305px] h-[305px] rounded-full overflow-hidden relative select-none pointer-events-none shadow-2xl bg-black">
      {/* Animated Image Layer with Soft Crossfade & Ken Burns Zoom */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.08, y: 6 }}
          animate={{ opacity: 1, scale: 1.0, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -6 }}
          transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentImg.url}
            alt={currentImg.title}
            className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Obsidian & Soft Gold Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(212,175,55,0.25)_0%,rgba(5,5,5,0.2)_50%,rgba(5,5,5,0.85)_100%)] pointer-events-none" />

      {/* Shimmer Light Reflection Sweep */}
      <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 animate-shimmer-sweep pointer-events-none" />

      {/* Floating Reflection Label inside Mirror Surface */}
      <div className="absolute bottom-6 inset-x-0 text-center z-10 px-4">
        <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] gold-text px-3.5 py-1 rounded-full bg-black/80 border border-gold/30 backdrop-blur-md shadow-lg">
          {currentImg.category}
        </span>
      </div>
    </div>
  );
}

// --- 3D Interactive Golden Mirror Mesh ---
function Golden3DMirror() {
  const mirrorGroupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const glassRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (mirrorGroupRef.current) {
      // Gentle slow floating tilt and sway
      mirrorGroupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
      mirrorGroupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.04;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.08;
    }
  });

  // Materials: Metallic Gold
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d4af37"),
    metalness: 0.95,
    roughness: 0.12,
  });

  const darkObsidianMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#050505"),
    metalness: 0.9,
    roughness: 0.05,
  });

  return (
    <group ref={mirrorGroupRef} position={[0, 0, 0]} scale={1.15}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Outer Oval Gold Bezel Frame */}
        <mesh ref={outerRingRef} material={goldMaterial}>
          <torusGeometry args={[2.0, 0.08, 32, 100]} />
        </mesh>

        {/* Inner Gold Bevel Ring */}
        <mesh material={goldMaterial} position={[0, 0, 0.02]}>
          <torusGeometry args={[1.82, 0.03, 32, 80]} />
        </mesh>

        {/* Dark Backing Plate */}
        <mesh ref={glassRef} material={darkObsidianMaterial} position={[0, 0, -0.05]}>
          <circleGeometry args={[1.8, 64]} />
        </mesh>

        {/* Moving Beauty Portfolio Gallery (Clipped strictly inside mirror surface) */}
        <Html transform position={[0, 0, 0.01]} distanceFactor={3.2} zIndexRange={[1, 5]}>
          <MirrorImageReel />
        </Html>

        {/* Royal Crest Filigree Spikes at Top, Bottom, Left & Right */}
        <mesh position={[0, 2.1, 0.05]} material={goldMaterial} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.25, 0.6, 4]} />
        </mesh>
        <mesh position={[0, -2.1, 0.05]} material={goldMaterial} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.25, 0.6, 4]} />
        </mesh>
        <mesh position={[2.05, 0, 0.05]} material={goldMaterial} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.18, 0.4, 4]} />
        </mesh>
        <mesh position={[-2.05, 0, 0.05]} material={goldMaterial} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.18, 0.4, 4]} />
        </mesh>

        {/* Floating Golden Motes & Ambient Particles */}
        <Sparkles count={80} scale={6} size={3.5} speed={0.5} color="#f7e5a9" />
      </Float>
    </group>
  );
}

// --- Question Options Interfaces ---
interface FeatureOptions {
  occasion: string;
  feeling: string;
  focus: string;
}

interface GoldenMirrorSectionProps {
  onOpenBooking: (service?: string) => void;
}

export const GoldenMirrorSection: React.FC<GoldenMirrorSectionProps> = ({ onOpenBooking }) => {
  const [step, setStep] = useState<"intro" | 1 | 2 | 3 | "result">("intro");
  const [mounted, setMounted] = useState(false);
  const [answers, setAnswers] = useState<FeatureOptions>({
    occasion: "",
    feeling: "",
    focus: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Step 1 Options
  const occasionOptions = ["Bridal", "Party", "Date Night", "Photoshoot", "Everyday"];

  // Step 2 Options
  const feelingOptions = ["Elegant", "Natural", "Glamorous", "Bold", "Royal"];

  // Step 3 Options
  const focusOptions = ["Hair", "Skin", "Makeup", "Complete Look"];

  const handleSelectOccasion = (opt: string) => {
    setAnswers((prev) => ({ ...prev, occasion: opt }));
    setStep(2);
  };

  const handleSelectFeeling = (opt: string) => {
    setAnswers((prev) => ({ ...prev, feeling: opt }));
    setStep(3);
  };

  const handleSelectFocus = (opt: string) => {
    const finalAnswers = { ...answers, focus: opt };
    setAnswers(finalAnswers);
    setStep("result");

    // Trigger golden confetti celebration on result reveal
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f7e5a9", "#ffffff", "#aa771c"],
    });
  };

  const handleReset = () => {
    setAnswers({ occasion: "", feeling: "", focus: "" });
    setStep("intro");
  };

  // Helper to dynamically calculate personalized recommendation
  const getRecommendation = () => {
    const { occasion, feeling, focus } = answers;

    let title = "THE ROYAL SOFT GLAM";
    let subtitle = "Elegant. Radiant. Unmistakably yours.";
    let bookingService = "SIGNATURE MAKEUP";
    let experiences = [
      "Signature Makeup Ritual",
      "Luxury Hair Styling & Volume",
      "Glow-Prep Skin Elixir",
    ];

    if (occasion === "Bridal" || feeling === "Royal") {
      title = "THE BRIDAL MAJESTY";
      subtitle = "Regal. Timeless. Designed for your grand moment.";
      bookingService = "BRIDAL EXPERIENCE";
      experiences = [
        "Royal Couture Makeup & Veil Styling",
        "24K Gold Facial Preparation",
        "Master Sculpted Updo & Crown Setting",
      ];
    } else if (feeling === "Glamorous" || focus === "Makeup") {
      title = "THE HOLLYWOOD RADIANCE";
      subtitle = "Luminous. High-impact. Camera-ready perfection.";
      bookingService = "SIGNATURE MAKEUP";
      experiences = [
        "Airbrush HD Contour & Eye Sculpting",
        "Hollywood Waves or Sleek Blowout",
        "Hydrating Glass-Skin Primer Ritual",
      ];
    } else if (focus === "Hair") {
      title = "THE CROWN SCULPTURE";
      subtitle = "Voluminous. Silky. Crafted to command attention.";
      bookingService = "HAIR ATELIER";
      experiences = [
        "Bespoke Hair Sculpting & Couture Styling",
        "Deep Nourishing Botanical Treatment",
        "Scalp & Crown Massaging Ritual",
      ];
    } else if (focus === "Skin" || feeling === "Natural") {
      title = "THE LUMINOUS DEW";
      subtitle = "Fresh. Effortless. Highlighting your natural beauty.";
      bookingService = "SKIN RITUALS";
      experiences = [
        "Signature Hydrating Facial & Lymphatic Drainage",
        "Natural Glow Skin Finishing",
        "Gentle Organic Skin Elixir Application",
      ];
    } else if (feeling === "Bold") {
      title = "THE ECLIPSE COUTURE";
      subtitle = "Striking. Modern. An iconic beauty statement.";
      bookingService = "SIGNATURE MAKEUP";
      experiences = [
        "High-Fashion Editorial Makeup",
        "Structured Hair Architecture",
        "Radiant Luminizing Skin Sculpting",
      ];
    }

    return { title, subtitle, bookingService, experiences };
  };

  const rec = getRecommendation();

  return (
    <section
      id="golden-mirror"
      className="relative py-24 md:py-32 bg-[#080808] text-champagne overflow-hidden border-t border-b border-gold/15 select-none"
    >
      {/* ============================================================ */}
      {/* CLIP 03 — Golden Mirror Video Segment (4.0s – 6.0s) */}
      {/* ============================================================ */}
      <CinematicSectionVideo startTime={4.0} endTime={6.0} overlayOpacity={0.6} objectPosition="center 35%" />

      {/* Background Ambient Glow & Subtle Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(198,166,107,0.1)_0%,transparent_70%)] pointer-events-none z-[2]" />

      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Top Filigree Accent */}
        <div className="flex items-center justify-center gap-4 mb-4 opacity-80">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold" />
          <SparklesIcon className="w-4 h-4 text-gold" />
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold" />
        </div>

        <p className="text-center font-sans text-xs uppercase tracking-[0.4em] gold-text mb-3 font-semibold">
          Interactive Beauty Consultation
        </p>

        {/* Section Main Title Banner */}
        <h2 className="text-center font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-wide mb-12">
          THE GOLDEN MIRROR
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3D WebGL Mirror Canvas Container */}
          <div className="lg:col-span-5 flex justify-center items-center h-[340px] sm:h-[420px] relative">
            {mounted ? (
              <div className="w-full h-full relative">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 8, 5]} intensity={3} color="#f7e5a9" />
                  <directionalLight position={[-5, -4, -4]} intensity={1.5} color="#aa771c" />
                  <pointLight position={[0, 0, 3]} intensity={2} color="#ffffff" />
                  <Golden3DMirror />
                </Canvas>
              </div>
            ) : (
              <div className="w-[305px] h-[305px] rounded-full border-2 border-gold/30 bg-surface/50 backdrop-blur animate-pulse flex items-center justify-center overflow-hidden">
                <MirrorImageReel />
              </div>
            )}
          </div>

          {/* Interactive Steps Card Container */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 md:p-12 rounded-2xl border border-gold/20 relative shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {/* --- INTRO DISPLAY --- */}
                {step === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="text-center space-y-6"
                  >
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight tracking-wide">
                      WHAT DO YOU SEE?
                    </h3>

                    <p className="font-serif text-lg sm:text-xl md:text-2xl text-champagne/90 italic font-light max-w-md mx-auto leading-relaxed">
                      Not just a reflection.
                      <br />
                      <span className="gold-text font-normal">
                        A version of you waiting to be revealed.
                      </span>
                    </p>

                    <div className="pt-4">
                      <button
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-semibold text-sm uppercase tracking-[0.25em] rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.03] transition-all duration-300 group"
                      >
                        <span>DISCOVER YOUR SIGNATURE</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 1 --- */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-gold/15 pb-4">
                      <span className="text-xs uppercase tracking-[0.3em] text-gold/80 font-mono">
                        Step 01 / 03
                      </span>
                      <span className="text-xs text-champagne/50">The Occasion</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-wide">
                      WHAT ARE YOU GETTING READY FOR?
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      {occasionOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectOccasion(opt)}
                          className="px-4 py-3.5 rounded-xl bg-surface/80 border border-gold/20 hover:border-gold hover:bg-gold/10 text-champagne hover:text-gold text-sm tracking-wider uppercase transition-all duration-300 text-center font-medium shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 2 --- */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-gold/15 pb-4">
                      <span className="text-xs uppercase tracking-[0.3em] text-gold/80 font-mono">
                        Step 02 / 03
                      </span>
                      <span className="text-xs text-champagne/50">The Essence</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-wide">
                      HOW DO YOU WANT TO FEEL?
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      {feelingOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectFeeling(opt)}
                          className="px-4 py-3.5 rounded-xl bg-surface/80 border border-gold/20 hover:border-gold hover:bg-gold/10 text-champagne hover:text-gold text-sm tracking-wider uppercase transition-all duration-300 text-center font-medium shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 3 --- */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-gold/15 pb-4">
                      <span className="text-xs uppercase tracking-[0.3em] text-gold/80 font-mono">
                        Step 03 / 03
                      </span>
                      <span className="text-xs text-champagne/50">The Focus</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-wide">
                      WHAT IS YOUR BEAUTY FOCUS?
                    </h3>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {focusOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectFocus(opt)}
                          className="px-4 py-3.5 rounded-xl bg-surface/80 border border-gold/20 hover:border-gold hover:bg-gold/10 text-champagne hover:text-gold text-sm tracking-wider uppercase transition-all duration-300 text-center font-medium shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* --- RESULT REVEAL --- */}
                {step === "result" && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="text-center space-y-2 border-b border-gold/20 pb-5">
                      <span className="text-xs font-mono uppercase tracking-[0.35em] gold-text">
                        YOUR BEAUTY SIGNATURE
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-wide gold-text-solid">
                        {rec.title}
                      </h3>
                      <p className="font-serif italic text-sm sm:text-base text-champagne/80">
                        {rec.subtitle}
                      </p>
                    </div>

                    {/* Recommended Experience Breakdown */}
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-gold/70 mb-3 font-semibold">
                        Recommended Experience Ritual:
                      </p>
                      <ul className="space-y-2">
                        {rec.experiences.map((exp, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 text-sm text-champagne/90 bg-surface/60 px-4 py-2.5 rounded-lg border border-gold/10"
                          >
                            <Check className="w-4 h-4 text-gold flex-shrink-0" />
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTAs */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        onClick={() => onOpenBooking(rec.bookingService)}
                        className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-bold text-xs uppercase tracking-[0.25em] rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>BOOK THIS EXPERIENCE</span>
                      </button>

                      <button
                        onClick={handleReset}
                        className="w-full sm:w-auto px-5 py-3 text-xs uppercase tracking-[0.2em] text-champagne/60 hover:text-gold transition-colors flex items-center justify-center gap-2 border border-gold/20 hover:border-gold/50 rounded-full"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>RE-CONSULT MIRROR</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
