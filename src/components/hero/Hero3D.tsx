"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// 3D Abstract Luxury Gold & Glass Ribbon Sculpture
function GoldSculpture({ mousePos, reducedMotion }: { mousePos: { x: number; y: number }; reducedMotion: boolean }) {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const crownGeomRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    // Gentle slow continuous rotation
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y += delta * 0.08;
      outerRingRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.06 + mousePos.y * 0.08;
      outerRingRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.25) * 0.05 + mousePos.x * 0.08;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 0.12;
      innerCoreRef.current.rotation.z += delta * 0.05;
    }

    if (crownGeomRef.current) {
      crownGeomRef.current.rotation.y += delta * 0.06;
    }
  });

  // Refined Champagne Gold & Charcoal Glass Material properties
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#C6A66B"),
    roughness: 0.16,
    metalness: 0.94,
    envMapIntensity: 2.2,
  });

  const darkGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#151515"),
    roughness: 0.12,
    transmission: 0.88,
    thickness: 1.1,
    ior: 1.52,
    metalness: 0.08,
    clearcoat: 1.0,
  });

  return (
    <group scale={1.05} position={[0, -0.1, 0]}>
      <Float speed={reducedMotion ? 0 : 1.8} rotationIntensity={0.25} floatIntensity={0.35}>
        {/* Outer Flowing Gold Ribbon Torus Knot */}
        <group ref={outerRingRef}>
          <mesh material={goldMaterial}>
            <torusKnotGeometry args={[1.45, 0.14, 128, 32, 2, 3]} />
          </mesh>

          {/* Secondary Intertwining Translucent Ribbon */}
          <mesh material={darkGlassMaterial} rotation={[Math.PI / 4, Math.PI / 3, 0]} scale={1.08}>
            <torusGeometry args={[1.75, 0.05, 32, 100]} />
          </mesh>

          {/* Crown-inspired Ornamental Floating Jewels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const angle = (i / 5) * Math.PI * 2;
            const x = Math.cos(angle) * 1.95;
            const z = Math.sin(angle) * 1.95;
            return (
              <mesh key={i} position={[x, 0.3 * Math.sin(i), z]} material={goldMaterial} scale={0.075}>
                <octahedronGeometry />
              </mesh>
            );
          })}
        </group>

        {/* Central Faceted Crystal Core */}
        <mesh ref={innerCoreRef} scale={0.65} material={goldMaterial}>
          <icosahedronGeometry args={[1, 0]} />
        </mesh>

        {/* Outer Crown Arc Accent */}
        <group ref={crownGeomRef} position={[0, 1.85, 0]}>
          <mesh material={goldMaterial}>
            <torusGeometry args={[0.55, 0.025, 16, 50, Math.PI]} />
          </mesh>
        </group>
      </Float>

      {/* Floating Subtle Champagne Gold Motes & Dust Particles */}
      <Sparkles
        count={reducedMotion ? 20 : 55}
        scale={6.5}
        size={2.4}
        speed={reducedMotion ? 0 : 0.25}
        opacity={0.55}
        color="#F4EFE6"
      />
    </group>
  );
}

export const Hero3D: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none opacity-80 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Luxury Studio Lighting */}
        <ambientLight intensity={0.45} />
        
        {/* Warm Champagne Gold Lighting */}
        <directionalLight position={[5, 5, 5]} intensity={2.6} color="#C6A66B" />
        <directionalLight position={[-5, -2, -3]} intensity={1.3} color="#9F8050" />
        
        {/* Soft Point Light */}
        <pointLight position={[0, 0, 3]} intensity={1.0} color="#F4EFE6" />
        
        {/* 3D Gold Ribbon Sculpture */}
        <GoldSculpture mousePos={mousePos} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};
