'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { HOTSPOTS_DATA } from '../../data/vinhareData';
import { HotspotItem } from '../../types';
import { Bed, Trees, PartyPopper, Utensils } from 'lucide-react';

interface ResortModelProps {
  selectedHotspot: HotspotItem | null;
  onSelectHotspot: (hotspot: HotspotItem) => void;
}

const hotspotIcons: Record<string, React.ReactNode> = {
  Bed: <Bed className="w-4 h-4 text-[#B8860B]" />,
  Trees: <Trees className="w-4 h-4 text-[#B8860B]" />,
  PartyPopper: <PartyPopper className="w-4 h-4 text-[#B8860B]" />,
  Utensils: <Utensils className="w-4 h-4 text-[#B8860B]" />,
};

export const ResortModel: React.FC<ResortModelProps> = ({
  selectedHotspot,
  onSelectHotspot,
}) => {
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
        rotateSpeed={0.6}
      />

      <ambientLight intensity={1.3} color="#FFF8EF" />
      <directionalLight position={[10, 15, 10]} intensity={2.5} color="#F3E5AB" castShadow />
      <pointLight position={[0, 5, 0]} intensity={2.5} color="#FFD700" />

      <group ref={modelRef} position={[0, -0.8, 0]}>
        {/* Base Pedestal Disc - White Marble */}
        <mesh position={[0, -0.2, 0]} receiveShadow>
          <cylinderGeometry args={[5, 5.2, 0.4, 64]} />
          <meshStandardMaterial color="#FAF6EE" roughness={0.5} />
        </mesh>

        {/* Gold Border Ring */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.95, 5.05, 64]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Central Reflecting Water Basin */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 32]} />
          <meshStandardMaterial color="#D9E6ED" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Main Pavilion Palace Center */}
        <group position={[0, 0.2, -0.5]}>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[3, 2, 2]} />
            <meshStandardMaterial color="#FDFBF7" roughness={0.3} />
          </mesh>
          <mesh position={[0, 2.4, 0]} castShadow>
            <sphereGeometry args={[0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>

        {/* Left Guest Villa Block (ROOMS) */}
        <group position={[-2.5, 0.2, 1]}>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[1.8, 1.6, 1.8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.7, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[1.1, 0.8, 4]} />
            <meshStandardMaterial color="#C5A059" roughness={0.4} />
          </mesh>
        </group>

        {/* Right Banquet Hall Block (EVENTS) */}
        <group position={[2.6, 0.2, -1]}>
          <mesh position={[0, 0.9, 0]} castShadow>
            <boxGeometry args={[2.2, 1.8, 2]} />
            <meshStandardMaterial color="#FDFBF7" roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.9, 0]}>
            <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} />
          </mesh>
        </group>

        {/* Dining Terrace Pavilion (DINING) */}
        <group position={[-1.5, 0.2, -2.2]}>
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[1.6, 1.2, 1.4]} />
            <meshStandardMaterial color="#FAF6EE" roughness={0.4} />
          </mesh>
        </group>

        {/* Garden Hedges & Trees (GARDENS) */}
        {[
          [1, 0.2, 2.5],
          [-0.8, 0.2, 2.8],
          [2, 0.2, 1.8],
        ].map((pos, idx) => (
          <group key={idx} position={pos as [number, number, number]}>
            <mesh position={[0, 0.4, 0]}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial color="#2E4A28" roughness={0.7} />
            </mesh>
          </group>
        ))}

        {/* 3D Hotspot Nodes HTML */}
        {HOTSPOTS_DATA.map((spot) => (
          <group key={spot.id} position={spot.position}>
            <Html center distanceFactor={12}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotspot(spot);
                }}
                className={`group flex items-center space-x-2 px-3 py-1.5 rounded-full backdrop-blur-md border cursor-pointer transition-all duration-300 shadow-sm ${
                  selectedHotspot?.id === spot.id
                    ? 'bg-[#D4AF37] border-[#F7E7B4] text-white scale-110 shadow-[0_0_20px_#D4AF37]'
                    : 'bg-white/95 border-[#D4AF37]/50 text-[#1A1814] hover:border-[#D4AF37] hover:scale-105'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#B8860B] animate-ping" />
                {hotspotIcons[spot.iconName]}
                <span className="text-[10px] tracking-widest font-bold uppercase whitespace-nowrap">
                  {spot.title}
                </span>
              </div>
            </Html>
          </group>
        ))}
      </group>
    </>
  );
};
