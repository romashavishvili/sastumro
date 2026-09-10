import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Bedroom3D({ position = [0, 0, 0], isActive = true }) {
  const lampLightRef = useRef();
  const dustRef = useRef();

  useFrame((state) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    // Gentle breathing pulsation on bedside warm lamp
    if (lampLightRef.current) {
      lampLightRef.current.intensity = 1.4 + Math.sin(t * 1.5) * 0.15;
    }

    // Subtle drift of dust particles in the sunbeam
    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.02;
      dustRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Room Shell: 19th-Century Tbilisi Townhouse Bedroom (Width: 8, Height: 4.2, Depth: 8) */}
      {/* Floor - Dark Polished Oak Parquet */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#221811" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Ceiling with Timber Beams */}
      <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#1C1814" roughness={0.8} />
      </mesh>
      {/* Ceiling Exposed Wood Beams */}
      {[-2.5, 0, 2.5].map((z, i) => (
        <mesh key={i} position={[0, 4.08, z]}>
          <boxGeometry args={[8, 0.22, 0.25]} />
          <meshStandardMaterial color="#2E1C12" roughness={0.6} />
        </mesh>
      ))}

      {/* Back Wall (Behind Bed) with Tbilisi Historic Brick Arch Accent */}
      <mesh position={[0, 2.1, -4]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#2B2620" roughness={0.85} />
      </mesh>
      {/* Brick Arch Recess panel */}
      <mesh position={[0, 2.0, -3.96]} receiveShadow>
        <planeGeometry args={[4.2, 3.4]} />
        <meshStandardMaterial color="#4A2E24" roughness={0.9} />
      </mesh>

      {/* Left Wall with Tall Arched Window */}
      <group position={[-4, 2.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh receiveShadow>
          <planeGeometry args={[8, 4.2]} />
          <meshStandardMaterial color="#25211B" roughness={0.8} />
        </mesh>
        {/* Tall Window Opening & Frame */}
        <mesh position={[0, 0.2, 0.02]}>
          <boxGeometry args={[1.8, 2.8, 0.08]} />
          <meshStandardMaterial color="#18130E" roughness={0.5} />
        </mesh>
        {/* Translucent Window Glass Pane with Afternoon Sunlight */}
        <mesh position={[0, 0.2, 0.04]}>
          <planeGeometry args={[1.6, 2.6]} />
          <meshPhysicalMaterial
            color="#FFF4DE"
            transmission={0.8}
            opacity={1}
            roughness={0.15}
            transparent
          />
        </mesh>
        {/* Warm Linen Draped Curtains */}
        <mesh position={[-0.95, 0.2, 0.08]}>
          <boxGeometry args={[0.28, 2.9, 0.06]} />
          <meshStandardMaterial color="#D5CCA8" roughness={0.8} />
        </mesh>
        <mesh position={[0.95, 0.2, 0.08]}>
          <boxGeometry args={[0.28, 2.9, 0.06]} />
          <meshStandardMaterial color="#D5CCA8" roughness={0.8} />
        </mesh>
      </group>

      {/* Right Wall */}
      <mesh position={[4, 2.1, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#25211B" roughness={0.8} />
      </mesh>

      {/* Front Archway / Exit Portal towards Next Room (Lounge) */}
      <mesh position={[-2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#25211B" roughness={0.8} />
      </mesh>
      <mesh position={[2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#25211B" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.6, 4]}>
        <boxGeometry args={[3.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#25211B" roughness={0.8} />
      </mesh>

      {/* -------------------------------------------------------------
          HAND-CARVED WALNUT BED & FURNITURE
         ------------------------------------------------------------- */}
      <group position={[0, 0, -2.4]}>
        {/* Carved Walnut Headboard */}
        <mesh position={[0, 1.2, -1.2]} castShadow>
          <boxGeometry args={[2.8, 1.6, 0.12]} />
          <meshStandardMaterial color="#362214" roughness={0.4} metalness={0.15} />
        </mesh>
        {/* Decorative Crown Molding on Headboard */}
        <mesh position={[0, 2.05, -1.2]}>
          <boxGeometry args={[3.0, 0.12, 0.18]} />
          <meshStandardMaterial color="#C9A227" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Bed Walnut Frame Base */}
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.45, 2.3]} />
          <meshStandardMaterial color="#2C1A0F" roughness={0.5} />
        </mesh>
        {/* 4 Carved Bed Corner Posts */}
        {[[-1.25, 0], [1.25, 0], [-1.25, -1.15], [1.25, -1.15]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.6, z]}>
            <cylinderGeometry args={[0.06, 0.08, 1.2, 12]} />
            <meshStandardMaterial color="#362214" roughness={0.4} />
          </mesh>
        ))}

        {/* Layered White Linen Mattress & Duvet */}
        <mesh position={[0, 0.62, 0.05]} castShadow>
          <boxGeometry args={[2.3, 0.35, 2.15]} />
          <meshStandardMaterial color="#EFE9DD" roughness={0.85} />
        </mesh>
        {/* Folded Dark Forest Green Bed Runner */}
        <mesh position={[0, 0.81, 0.6]}>
          <boxGeometry args={[2.32, 0.04, 0.65]} />
          <meshStandardMaterial color="#172820" roughness={0.9} />
        </mesh>

        {/* Two Soft Linen Pillows */}
        <mesh position={[-0.62, 0.9, -0.75]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.78, 0.18, 0.52]} />
          <meshStandardMaterial color="#F7F3EB" roughness={0.9} />
        </mesh>
        <mesh position={[0.62, 0.9, -0.75]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.78, 0.18, 0.52]} />
          <meshStandardMaterial color="#F7F3EB" roughness={0.9} />
        </mesh>

        {/* Patterned Caucasian / Tbilisi Area Rug */}
        <mesh position={[0, 0.015, 0.4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[3.8, 3.2]} />
          <meshStandardMaterial color="#5C251C" roughness={0.95} />
        </mesh>
        {/* Rug Decorative Inner Border */}
        <mesh position={[0, 0.018, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.4, 2.8]} />
          <meshStandardMaterial color="#8E4328" roughness={0.95} />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          BEDSIDE NIGHTSTANDS & BRASS LAMPS
         ------------------------------------------------------------- */}
      {/* Left Nightstand */}
      <group position={[-1.9, 0, -3.4]}>
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.65, 0.84, 0.55]} />
          <meshStandardMaterial color="#2E1C12" roughness={0.45} />
        </mesh>
        {/* Brass Table Lamp */}
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.35, 12]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Fluted Lamp Shade */}
        <mesh position={[0, 1.25, 0]}>
          <coneGeometry args={[0.22, 0.28, 20, 1, true]} />
          <meshStandardMaterial color="#FFF1D0" roughness={0.5} emissive="#FFE5A8" emissiveIntensity={0.6} />
        </mesh>
        {/* Bedside Point Light */}
        <pointLight
          ref={lampLightRef}
          position={[0, 1.25, 0]}
          color="#FFE099"
          intensity={1.5}
          distance={4.2}
          castShadow
        />
      </group>

      {/* Right Nightstand */}
      <group position={[1.9, 0, -3.4]}>
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.65, 0.84, 0.55]} />
          <meshStandardMaterial color="#2E1C12" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.35, 12]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <coneGeometry args={[0.22, 0.28, 20, 1, true]} />
          <meshStandardMaterial color="#FFF1D0" roughness={0.5} emissive="#FFE5A8" emissiveIntensity={0.4} />
        </mesh>
        <pointLight position={[0, 1.25, 0]} color="#FFE099" intensity={0.9} distance={3.8} />
      </group>

      {/* Floating Dust Particles in Sunbeam */}
      <group ref={dustRef} position={[-2.2, 2.0, -1.0]}>
        {[...Array(24)].map((_, i) => {
          const x = (Math.random() - 0.5) * 1.8;
          const y = (Math.random() - 0.5) * 1.8;
          const z = (Math.random() - 0.5) * 2.2;
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.012, 6, 6]} />
              <meshBasicMaterial color="#FFE8B5" transparent opacity={0.65} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
