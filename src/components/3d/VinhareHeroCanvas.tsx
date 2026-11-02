'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroScene } from './HeroScene';

interface VinhareHeroCanvasProps {
  scrollProgress: number;
}

export const VinhareHeroCanvas: React.FC<VinhareHeroCanvasProps> = ({ scrollProgress }) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    // WebGL support check
    try {
      const canvas = document.createElement('canvas');
      const supportsWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setHasWebGL(supportsWebGL);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    // High-quality fallback image for low-end / non-WebGL devices
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero_resort.jpg"
          alt="Vinhare Hotel & Resort Architecture"
          className="w-full h-full object-cover brightness-90 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/30 to-transparent" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 6, 22], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <HeroScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
      {/* Vignette Overlay for Golden & White Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(253,251,247,0.75)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-[#FDFBF7]/60 pointer-events-none" />
    </div>
  );
};
