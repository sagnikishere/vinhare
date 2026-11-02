'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingMandalaMotif() {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Ornate Gold Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.8, 0.08, 16, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Inner Concentric Golden Rings */}
      <mesh>
        <torusGeometry args={[2.0, 0.05, 16, 48]} />
        <meshStandardMaterial color="#F3E5AB" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Geometric Petal Spokes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI) / 6;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh position={[0, 1.4, 0]}>
              <boxGeometry args={[0.08, 0.9, 0.08]} />
              <meshStandardMaterial color="#C5A059" metalness={0.85} roughness={0.2} />
            </mesh>
            <mesh position={[0, 2.4, 0]}>
              <octahedronGeometry args={[0.18]} />
              <meshStandardMaterial color="#F3E5AB" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        );
      })}

      {/* Central Glowing Ornament Sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#FFD180"
          emissive="#D4AF37"
          emissiveIntensity={0.8}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

export const WeddingTransitionCanvas: React.FC = () => {
  return (
    <div className="w-full h-64 md:h-80 relative flex items-center justify-center pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={2} color="#FFA834" />
        <pointLight position={[0, 0, 2]} intensity={2} color="#D4AF37" />
        <RotatingMandalaMotif />
      </Canvas>
    </div>
  );
};
