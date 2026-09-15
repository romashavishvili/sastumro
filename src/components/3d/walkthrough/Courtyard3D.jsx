import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Courtyard3D({
  position = [0, 0, -75],
  isActive = true,
  lightOn = false,
  onToggleLight,
}) {
  const lanternRef = useRef();
  const lanternLightRef = useRef();
  const currentIntensity = useRef(lightOn ? 2.6 : 0);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame((state, delta) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    // Lantern gentle breeze sway
    if (lanternRef.current && !prefersReducedMotion) {
      lanternRef.current.rotation.z = Math.sin(t * 1.2) * 0.04;
      lanternRef.current.rotation.x = Math.cos(t * 0.9) * 0.03;
    }

    // Smooth light transition (0.4–0.8s) + realistic warm candle/filament flicker
    const targetIntensity = lightOn ? 2.6 : 0;
    if (prefersReducedMotion) {
      currentIntensity.current = targetIntensity;
    } else {
      currentIntensity.current = THREE.MathUtils.damp(
        currentIntensity.current,
        targetIntensity,
        4.5,
        delta
      );
    }

    if (lanternLightRef.current) {
      if (lightOn && !prefersReducedMotion) {
        const flicker = Math.sin(t * 7) * 0.09 + Math.sin(t * 19) * 0.04;
        lanternLightRef.current.intensity = Math.max(0, currentIntensity.current + flicker);
      } else {
        lanternLightRef.current.intensity = currentIntensity.current;
      }
    }
  });

  return (
    <group position={position}>
      {/* -------------------------------------------------------------
          COURTYARD SHELL: 1894 TBILISI HISTORIC COURTYARD (9 x 5 x 9)
         ------------------------------------------------------------- */}
      {/* Cobblestone / Flagstone Ground with warm earthy patina */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#3C342C" roughness={0.88} />
      </mesh>

      {/* Weathered Historic Sololaki Red-Clay Brick Back Wall */}
      <mesh position={[0, 2.5, -4.5]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#543326" roughness={0.9} />
      </mesh>

      {/* Left Wall with Warm Stone Facade */}
      <mesh position={[-4.5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#443930" roughness={0.9} />
      </mesh>

      {/* Right Wall with Warm Stone Facade */}
      <mesh position={[4.5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#443930" roughness={0.9} />
      </mesh>

      {/* Warm Twilight Sky & Courtyard Atmosphere */}
      <ambientLight intensity={0.55} color="#7E8B80" />
      <directionalLight position={[-3, 8, 2]} intensity={0.75} color="#C4D2C6" />

      {/* -------------------------------------------------------------
          TRADITIONAL TBILISI CARVED WOODEN BALCONY OVERHEAD
         ------------------------------------------------------------- */}
      <group position={[0, 3.2, -3.8]}>
        {/* Balcony Floor Base */}
        <mesh position={[0, 0, 0.7]} castShadow receiveShadow>
          <boxGeometry args={[7.5, 0.15, 1.6]} />
          <meshStandardMaterial color="#3E2618" roughness={0.45} />
        </mesh>
        {/* Ornate Carved Wooden Railing */}
        <mesh position={[0, 0.5, 1.45]}>
          <boxGeometry args={[7.5, 0.85, 0.08]} />
          <meshStandardMaterial color="#482F1E" roughness={0.5} />
        </mesh>
        {/* Decorative Balcony Cantilever Brackets Below */}
        {[-3, -1.5, 0, 1.5, 3].map((x, bIdx) => (
          <mesh key={bIdx} position={[x, -0.4, 0.7]} rotation={[0.45, 0, 0]}>
            <boxGeometry args={[0.12, 0.85, 0.12]} />
            <meshStandardMaterial color="#3E2618" roughness={0.45} />
          </mesh>
        ))}
      </group>

      {/* -------------------------------------------------------------
          CENTENARY FIG TREE (ასწლოვანი ლეღვის ხე)
         ------------------------------------------------------------- */}
      <group position={[-2.4, 0, -1.5]}>
        {/* Ground Contact Shadow */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.5, 2.5]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.6} />
        </mesh>

        {/* Organic Fig Tree Trunk */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.45, 3.2, 12]} />
          <meshStandardMaterial color="#3A2A1E" roughness={0.88} />
        </mesh>
        {/* Main Branches */}
        <mesh position={[0.4, 3.1, 0.2]} rotation={[0, 0, -0.45]} castShadow>
          <cylinderGeometry args={[0.18, 0.24, 1.8, 10]} />
          <meshStandardMaterial color="#3A2A1E" roughness={0.88} />
        </mesh>
        <mesh position={[-0.4, 3.0, -0.2]} rotation={[0, 0, 0.45]} castShadow>
          <cylinderGeometry args={[0.16, 0.22, 1.6, 10]} />
          <meshStandardMaterial color="#3A2A1E" roughness={0.88} />
        </mesh>
        {/* Leaf Foliage Canopies */}
        <mesh position={[0, 3.8, 0]} castShadow>
          <sphereGeometry args={[1.5, 14, 14]} />
          <meshStandardMaterial color="#263E2D" roughness={0.78} />
        </mesh>
        <mesh position={[0.9, 3.6, 0.4]}>
          <sphereGeometry args={[1.1, 12, 12]} />
          <meshStandardMaterial color="#304D39" roughness={0.78} />
        </mesh>
        <mesh position={[-0.8, 3.7, -0.4]}>
          <sphereGeometry args={[1.2, 12, 12]} />
          <meshStandardMaterial color="#213627" roughness={0.78} />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          CENTRAL CARVED STONE FOUNTAIN BASIN
         ------------------------------------------------------------- */}
      <group position={[0.5, 0, 0.5]}>
        {/* Basin Contact Shadow */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.8, 2.8]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.6} />
        </mesh>

        {/* Lower Basin */}
        <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.1, 1.2, 0.5, 24]} />
          <meshStandardMaterial color="#4A433A" roughness={0.75} />
        </mesh>

        {/* High-Performance Water Plane (zero transmission lag) */}
        <mesh position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.95, 24]} />
          <meshStandardMaterial
            color="#2A5445"
            roughness={0.08}
            metalness={0.15}
            transparent
            opacity={0.76}
          />
        </mesh>

        {/* Center Fountain Spout Pedestal */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.18, 0.24, 0.6, 16]} />
          <meshStandardMaterial color="#3E3831" roughness={0.7} />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          INTERACTIVE HANGING BRASS LANTERN WITH WARM EVENING GLOW
         ------------------------------------------------------------- */}
      <group ref={lanternRef} position={[1.8, 2.7, -1.8]}>
        {/* Lantern Hanging Chain */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.8, 8]} />
          <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.25} />
        </mesh>

        {/* Clickable Brass Lantern Group */}
        <group
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleLight) onToggleLight();
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Brass Lantern Hexagonal Frame */}
          <mesh position={[0, -0.15, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.24, 0.46, 6]} />
            <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.22} />
          </mesh>

          {/* Frosted Warm Lantern Glass Panes */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.16, 0.22, 0.42, 6]} />
            <meshStandardMaterial
              color={lightOn ? '#FFF4D6' : '#E8DDBE'}
              roughness={0.35}
              emissive={lightOn ? '#FFA834' : '#000000'}
              emissiveIntensity={lightOn ? 1.6 : 0}
            />
          </mesh>

          {/* Internal Glowing Candle Flame */}
          {lightOn && (
            <mesh position={[0, -0.15, 0]}>
              <sphereGeometry args={[0.075, 12, 12]} />
              <meshBasicMaterial color="#FFE8A3" />
            </mesh>
          )}
        </group>

        {/* Dynamic Warm Evening Lantern Point Light (2700K Warm Glow) */}
        <pointLight
          ref={lanternLightRef}
          position={[0, -0.15, 0]}
          color="#FFB347"
          intensity={lightOn ? 2.6 : 0}
          distance={6.8}
          decay={2}
          castShadow={lightOn}
        />
      </group>
    </group>
  );
}
