'use me';
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroSceneProps {
  scrollProgress: number; // 0 to 1
}

export const HeroScene: React.FC<HeroSceneProps> = ({ scrollProgress }) => {
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.5, 0));
  const particlesRef = useRef<THREE.Points>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  // Generate 800 floating golden sparkles
  const [particlePositions, particleScales] = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 1] = Math.random() * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 44;
      scales[i] = Math.random() * 0.16 + 0.05;
    }
    return [positions, scales];
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;

    // Sequential scroll camera positions:
    // 0.00-0.20: Vinhare Hotels (Center [0, 6.2, 22])
    // 0.20-0.42: Mithila Marriage (Left Wedding Pavilion [-7, 3.2, 11])
    // 0.42-0.65: Shiv Garden Resort (Right Garden Lawns [7, 3.0, 9])
    // 0.65-0.85: J.P. Resort (Center-Left Modern Villa [-4, 2.4, 6])
    // 0.85-1.00: Raj Resort (Center Royal Palace Façade [0, 1.8, 2.5])

    let targetPosX = 0;
    let targetPosY = 6.2;
    let targetPosZ = 22;
    let lookX = 0;
    let lookY = 1.8;
    let lookZ = 0;

    if (scrollProgress < 0.22) {
      // Step 0 -> Step 1 (Vinhare Main Hotel to Mithila Marriage)
      const t = scrollProgress / 0.22;
      targetPosX = THREE.MathUtils.lerp(0, -6.5, t);
      targetPosY = THREE.MathUtils.lerp(6.2, 3.2, t);
      targetPosZ = THREE.MathUtils.lerp(22, 11, t);
      lookX = THREE.MathUtils.lerp(0, -5, t);
      lookY = THREE.MathUtils.lerp(1.8, 1.5, t);
    } else if (scrollProgress < 0.45) {
      // Step 1 -> Step 2 (Mithila Marriage to Shiv Garden Resort)
      const t = (scrollProgress - 0.22) / 0.23;
      targetPosX = THREE.MathUtils.lerp(-6.5, 6.5, t);
      targetPosY = THREE.MathUtils.lerp(3.2, 3.0, t);
      targetPosZ = THREE.MathUtils.lerp(11, 9, t);
      lookX = THREE.MathUtils.lerp(-5, 5, t);
      lookY = THREE.MathUtils.lerp(1.5, 1.6, t);
    } else if (scrollProgress < 0.72) {
      // Step 2 -> Step 3 (Shiv Garden Resort to J.P. Resort)
      const t = (scrollProgress - 0.45) / 0.27;
      targetPosX = THREE.MathUtils.lerp(6.5, -3.5, t);
      targetPosY = THREE.MathUtils.lerp(3.0, 2.3, t);
      targetPosZ = THREE.MathUtils.lerp(9, 6, t);
      lookX = THREE.MathUtils.lerp(5, -2, t);
      lookY = THREE.MathUtils.lerp(1.6, 1.5, t);
    } else {
      // Step 3 -> Step 4 (J.P. Resort to Raj Resort)
      const t = (scrollProgress - 0.72) / 0.28;
      targetPosX = THREE.MathUtils.lerp(-3.5, 0, t);
      targetPosY = THREE.MathUtils.lerp(2.3, 1.8, t);
      targetPosZ = THREE.MathUtils.lerp(6, 2.4, t);
      lookX = THREE.MathUtils.lerp(-2, 0, t);
      lookY = THREE.MathUtils.lerp(1.5, 1.7, t);
    }

    // Gentle ambient float oscillation
    const time = state.clock.getElapsedTime();
    targetPosX += Math.sin(time * 0.4) * 0.12;
    targetPosY += Math.cos(time * 0.3) * 0.08;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPosX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPosY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPosZ, 0.06);

    cameraTargetRef.current.x = THREE.MathUtils.lerp(cameraTargetRef.current.x, lookX, 0.06);
    cameraTargetRef.current.y = THREE.MathUtils.lerp(cameraTargetRef.current.y, lookY, 0.06);
    cameraTargetRef.current.z = THREE.MathUtils.lerp(cameraTargetRef.current.z, lookZ, 0.06);

    camera.lookAt(cameraTargetRef.current);

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.015;
    }

    if (waterRef.current) {
      (waterRef.current.material as THREE.MeshStandardMaterial).roughness =
        0.1 + Math.sin(time * 1.5) * 0.03;
    }
  });

  return (
    <group>
      {/* Light Golden Atmosphere Fog */}
      <fogExp2 attach="fog" args={['#F5F0E6', 0.025]} />

      {/* Golden & White Lighting Setup */}
      <ambientLight intensity={1.2} color="#FFF8EF" />
      <directionalLight
        position={[18, 24, 12]}
        intensity={2.6}
        color="#F3E5AB"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-12, 12, -10]} intensity={0.8} color="#D4AF37" />
      <pointLight position={[0, 5, 0]} intensity={2.5} color="#FFD700" distance={15} />

      {/* Floating Gold Sparkle Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#D4AF37"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ground Lawn Platform - Soft Sandstone Marble */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#EAE4D9" roughness={0.85} />
      </mesh>

      {/* Central Reflecting Water Pool with Gold Shimmer */}
      <mesh ref={waterRef} position={[0, 0.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 15]} />
        <meshStandardMaterial
          color="#D9E6ED"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Pool Border Gold Trim */}
      <mesh position={[0, 0.05, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.25, 2.35, 4]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* -------------------------------------------------------------
          CENTER ARCHITECTURE: VINHARE HOTEL & RESORTS / RAJ RESORT
         ------------------------------------------------------------- */}
      <group position={[0, 0, -2]}>
        {/* Main Grand Ivory Wall */}
        <mesh position={[0, 3.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[14, 7.2, 1.6]} />
          <meshStandardMaterial color="#FDFBF7" roughness={0.4} />
        </mesh>

        {/* Polished Gold Pillars */}
        {[-4.5, -2.2, 2.2, 4.5].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 2.8, 0.9]} castShadow>
            <cylinderGeometry args={[0.45, 0.55, 5.6, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
          </mesh>
        ))}

        {/* Central Royal Golden Dome */}
        <mesh position={[0, 8.1, 0]} castShadow>
          <sphereGeometry args={[2.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Golden Finial Spire */}
        <mesh position={[0, 10.7, 0]}>
          <coneGeometry args={[0.22, 1.4, 16]} />
          <meshStandardMaterial color="#F7E7B4" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          LEFT MODULE: MITHILA MARRIAGE EVENT LLP (ROYAL MANDAP)
         ------------------------------------------------------------- */}
      <group position={[-7.5, 0, 3]}>
        {/* Mandap Base Platform */}
        <mesh position={[0, 0.2, 0]} receiveShadow>
          <cylinderGeometry args={[3.2, 3.4, 0.4, 32]} />
          <meshStandardMaterial color="#F5F0E6" roughness={0.5} />
        </mesh>

        {/* Ornate Gold Mandap Pillars */}
        {[-1.5, 1.5].map((x, i) =>
          [-1.5, 1.5].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, 1.8, z]} castShadow>
              <cylinderGeometry args={[0.25, 0.3, 3.2, 12]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
            </mesh>
          ))
        )}

        {/* Mandap Royal Canopy Roof */}
        <mesh position={[0, 3.6, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[2.8, 1.4, 4]} />
          <meshStandardMaterial color="#C5A059" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Floating Floral Gold Lanterns */}
        {[-1.2, 1.2].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 2.8, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#F7E7B4" emissive="#D4AF37" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>

      {/* -------------------------------------------------------------
          RIGHT MODULE: SHIV GARDEN RESORT (GARDEN LAWNS)
         ------------------------------------------------------------- */}
      <group position={[7.5, 0, 2]}>
        {/* Lawn Villa Pavilion */}
        <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.5, 4.4, 5.5]} />
          <meshStandardMaterial color="#FAF6EE" roughness={0.5} />
        </mesh>

        {/* Gold Trim Roof Cornice */}
        <mesh position={[0, 4.5, 0]}>
          <boxGeometry args={[7, 0.4, 6]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Manicured Garden Hedges */}
        {[-2.5, 0, 2.5].map((x, idx) => (
          <mesh key={idx} position={[x, 0.5, 3.2]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#2E4A28" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* -------------------------------------------------------------
          FRONT-LEFT MODULE: J.P. RESORT (MODERN VILLA & SUITES)
         ------------------------------------------------------------- */}
      <group position={[-4, 0, 5]}>
        <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 3.2, 4]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>
        {/* Glowing Pool Terrace */}
        <mesh position={[0, 1.8, 2.1]}>
          <boxGeometry args={[4, 1.4, 0.2]} />
          <meshStandardMaterial
            color="#FFF2D6"
            emissive="#E5C158"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Tropical Palm Trees Surrounding Property */}
      {[-8, -5, 5, 8].map((xPos, idx) => (
        <group key={idx} position={[xPos, 0, 8]}>
          <mesh position={[0, 1.8, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.22, 3.6, 8]} />
            <meshStandardMaterial color="#3D3226" roughness={0.8} />
          </mesh>
          <mesh position={[0, 3.8, 0]}>
            <coneGeometry args={[1.6, 1.2, 7]} />
            <meshStandardMaterial color="#2A4025" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

