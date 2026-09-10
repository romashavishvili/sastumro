import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Courtyard3D({ position = [0, 0, -75], isActive = true }) {
  const lanternRef = useRef();

  useFrame((state) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    // Lantern gentle breeze sway and light flicker
    if (lanternRef.current) {
      lanternRef.current.rotation.z = Math.sin(t * 1.2) * 0.04;
      lanternRef.current.rotation.x = Math.cos(t * 0.9) * 0.03;
    }
  });

  return (
    <group position={position}>
      {/* -------------------------------------------------------------
          COURTYARD SHELL: 1894 TBILISI HISTORIC COURTYARD (9 x 5 x 9)
         ------------------------------------------------------------- */}
      {/* Cobblestone / Flagstone Ground */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#2B2620" roughness={0.9} />
      </mesh>

      {/* Weathered Brick Back Wall */}
      <mesh position={[0, 2.5, -4.5]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#38251C" roughness={0.95} />
      </mesh>

      {/* Left Wall with Stone Facade */}
      <mesh position={[-4.5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#302720" roughness={0.95} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[4.5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#302720" roughness={0.95} />
      </mesh>

      {/* Deep Twilight Sky Glow */}
      <ambientLight intensity={0.4} color="#587062" />
      <directionalLight position={[-3, 8, 2]} intensity={0.6} color="#A2B7A8" />

      {/* -------------------------------------------------------------
          TRADITIONAL TBILISI CARVED WOODEN BALCONY OVERHEAD
         ------------------------------------------------------------- */}
      <group position={[0, 3.2, -3.8]}>
        {/* Balcony Floor Base */}
        <mesh position={[0, 0, 0.7]} castShadow receiveShadow>
          <boxGeometry args={[7.5, 0.15, 1.6]} />
          <meshStandardMaterial color="#2E1C12" roughness={0.5} />
        </mesh>
        {/* Ornate Carved Wooden Railing */}
        <mesh position={[0, 0.5, 1.45]}>
          <boxGeometry args={[7.5, 0.85, 0.08]} />
          <meshStandardMaterial color="#382418" roughness={0.6} />
        </mesh>
        {/* Decorative Balcony Cantilever Brackets Below */}
        {[-3, -1.5, 0, 1.5, 3].map((x, bIdx) => (
          <mesh key={bIdx} position={[x, -0.4, 0.7]} rotation={[0.45, 0, 0]}>
            <boxGeometry args={[0.12, 0.85, 0.12]} />
            <meshStandardMaterial color="#2E1C12" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* -------------------------------------------------------------
          CENTENARY FIG TREE (ასწლოვანი ლეღვის ხე)
         ------------------------------------------------------------- */}
      <group position={[-2.4, 0, -1.5]}>
        {/* Organic Trunk */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.45, 3.2, 12]} />
          <meshStandardMaterial color="#2A1E16" roughness={0.9} />
        </mesh>
        {/* Main Branches */}
        <mesh position={[0.4, 3.1, 0.2]} rotation={[0, 0, -0.45]} castShadow>
          <cylinderGeometry args={[0.18, 0.24, 1.8, 10]} />
          <meshStandardMaterial color="#2A1E16" roughness={0.9} />
        </mesh>
        <mesh position={[-0.4, 3.0, -0.2]} rotation={[0, 0, 0.45]} castShadow>
          <cylinderGeometry args={[0.16, 0.22, 1.6, 10]} />
          <meshStandardMaterial color="#2A1E16" roughness={0.9} />
        </mesh>
        {/* Leaf Foliage Canopies */}
        <mesh position={[0, 3.8, 0]} castShadow>
          <sphereGeometry args={[1.5, 14, 14]} />
          <meshStandardMaterial color="#1E3224" roughness={0.8} />
        </mesh>
        <mesh position={[0.9, 3.6, 0.4]}>
          <sphereGeometry args={[1.1, 12, 12]} />
          <meshStandardMaterial color="#263E2D" roughness={0.8} />
        </mesh>
        <mesh position={[-0.8, 3.7, -0.4]}>
          <sphereGeometry args={[1.2, 12, 12]} />
          <meshStandardMaterial color="#192C1F" roughness={0.8} />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          CENTRAL CARVED STONE FOUNTAIN BASIN
         ------------------------------------------------------------- */}
      <group position={[0.5, 0, 0.5]}>
        {/* Lower Basin */}
        <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.1, 1.2, 0.5, 24]} />
          <meshStandardMaterial color="#3C362F" roughness={0.8} />
        </mesh>
        {/* Interior Water Plane */}
        <mesh position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.95, 24]} />
          <meshPhysicalMaterial
            color="#254238"
            roughness={0.1}
            metalness={0.1}
            transmission={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Center Fountain Spout Pedestal */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.18, 0.24, 0.6, 16]} />
          <meshStandardMaterial color="#302C26" roughness={0.7} />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          HANGING BRASS LANTERNS WITH WARM EVENING GLOW
         ------------------------------------------------------------- */}
      <group ref={lanternRef} position={[1.8, 2.7, -1.8]}>
        {/* Lantern Hanging Chain */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.8, 8]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Brass Lantern Frame */}
        <mesh position={[0, -0.15, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.22, 0.42, 6]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Internal Glowing Candle / Bulb */}
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color="#FFE29C" />
        </mesh>
        {/* Warm Evening Lantern Point Light */}
        <pointLight
          position={[0, -0.15, 0]}
          color="#FFCA66"
          intensity={2.2}
          distance={6.5}
          castShadow
        />
      </group>
    </group>
  );
}
