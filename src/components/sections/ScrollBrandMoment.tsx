"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Logo } from "@/components/brand/Logo";

function MorphingGoldEmblem({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scrollProgress * Math.PI * 2.5 + state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.5;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.scale.setScalar(1 + Math.sin(scrollProgress * Math.PI) * 0.25);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.3;
    }
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d4af37"),
    roughness: 0.15,
    metalness: 0.9,
  });

  return (
    <group ref={meshRef} scale={1.4}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Outer Orbiting Golden Crown Ring */}
        <mesh ref={ring1Ref} material={goldMat}>
          <torusGeometry args={[1.8, 0.05, 32, 100]} />
        </mesh>

        {/* Inner Counter-rotating Filigree Ring */}
        <mesh ref={ring2Ref} material={goldMat} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.3, 0.08, 32, 80]} />
        </mesh>

        {/* Central Crown Geometry Spikes */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i / 8) * Math.PI * 2;
          const x = Math.cos(a) * 0.9;
          const z = Math.sin(a) * 0.9;
          return (
            <mesh key={i} position={[x, Math.sin(i + scrollProgress * 5) * 0.4, z]} material={goldMat} scale={0.12}>
              <coneGeometry args={[0.6, 1.5, 5]} />
            </mesh>
          );
        })}
      </Float>

      {/* Sparkling Gold Motes */}
      <Sparkles count={120} scale={8} size={4} speed={0.6} color="#f7e5a9" />
    </group>
  );
}

export const ScrollBrandMoment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[70vh] bg-[#050505] flex items-center justify-center overflow-hidden py-16 md:py-20">
      {/* 3D WebGL Canvas */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none opacity-85">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={3} color="#f7e5a9" />
            <directionalLight position={[-10, -5, -5]} intensity={1.5} color="#aa771c" />
            <MorphingGoldEmblem scrollProgress={scrollProgress} />
          </Canvas>
        </div>
      )}

      {/* Overlay Brand Narrative */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <div className="flex justify-center mb-4">
          <Logo size="lg" showText={false} animateGlow />
        </div>
        <span className="text-xs font-semibold tracking-[0.4em] gold-text uppercase block mb-3">
          3D Brand Installation
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-medium tracking-tight leading-tight">
          WHERE ROYAL TRADITION <br />
          <span className="italic font-normal gold-text">MEETS MODERN COUTURE</span>
        </h2>
        <p className="mt-4 text-sm text-champagne/70 font-light tracking-widest max-w-lg mx-auto leading-relaxed">
          Every curve, ornament, and detail of Priya Beauty Salon reflects decades of dedicated craftsmanship, designed to elevate your personal beauty signature into a masterpiece.
        </p>
      </div>
    </section>
  );
};
