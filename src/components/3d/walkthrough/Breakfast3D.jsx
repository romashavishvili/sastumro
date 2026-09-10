import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Breakfast3D({ position = [0, 0, -50], isActive = true }) {
  const steamRef = useRef();

  useFrame((state) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    // Gentle rising and fading steam particles
    if (steamRef.current) {
      steamRef.current.children.forEach((p, idx) => {
        p.position.y = ((t * 0.4 + idx * 0.25) % 1.2);
        p.scale.setScalar(0.6 + p.position.y * 1.5);
        if (p.material) {
          p.material.opacity = Math.max(0, 0.4 - p.position.y * 0.35);
        }
      });
    }
  });

  return (
    <group position={position}>
      {/* -------------------------------------------------------------
          ROOM SHELL: SUNLIT BREAKFAST HALL (8 x 4.2 x 8)
         ------------------------------------------------------------- */}
      {/* Floor - Honey Oak Planks */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#322216" roughness={0.35} metalness={0.05} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#1E1A16" roughness={0.85} />
      </mesh>

      {/* Back Wall with Tall Arched Windows */}
      <mesh position={[0, 2.1, -4]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#24211B" roughness={0.8} />
      </mesh>
      {/* Double Arched Windows */}
      {[-1.8, 1.8].map((x, wIdx) => (
        <group key={wIdx} position={[x, 2.2, -3.95]}>
          <mesh>
            <boxGeometry args={[1.7, 2.7, 0.08]} />
            <meshStandardMaterial color="#19130D" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[1.5, 2.5]} />
            <meshPhysicalMaterial
              color="#FFF9EC"
              transmission={0.82}
              opacity={1}
              roughness={0.12}
              transparent
            />
          </mesh>
        </group>
      ))}

      {/* Bright Morning Sun Directional Light through Windows */}
      <directionalLight
        position={[0, 4, -6]}
        color="#FFF6E0"
        intensity={1.8}
        castShadow
      />

      {/* Left Wall with Stone/Brick Texture */}
      <mesh position={[-4, 2.1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#27231D" roughness={0.8} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[4, 2.1, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#27231D" roughness={0.8} />
      </mesh>

      {/* Front Arch Entrance */}
      <mesh position={[-2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#24211B" roughness={0.8} />
      </mesh>
      <mesh position={[2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#24211B" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.6, 4]}>
        <boxGeometry args={[3.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#24211B" roughness={0.8} />
      </mesh>

      {/* -------------------------------------------------------------
          RUSTIC SOLID OAK REFECTORY TABLE & SETTINGS
         ------------------------------------------------------------- */}
      <group position={[0, 0, -1.2]}>
        {/* Tabletop */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.08, 1.4]} />
          <meshStandardMaterial color="#382518" roughness={0.4} />
        </mesh>
        {/* 4 Sturdy Trestle Legs */}
        {[[-1.4, -0.5], [1.4, -0.5], [-1.4, 0.5], [1.4, 0.5]].map(([x, z], lIdx) => (
          <mesh key={lIdx} position={[x, 0.35, z]} castShadow>
            <boxGeometry args={[0.1, 0.7, 0.1]} />
            <meshStandardMaterial color="#2C1A0F" roughness={0.5} />
          </mesh>
        ))}

        {/* Linen Table Runner */}
        <mesh position={[0, 0.785, 0]}>
          <boxGeometry args={[3.42, 0.01, 0.55]} />
          <meshStandardMaterial color="#EAE2D2" roughness={0.9} />
        </mesh>

        {/* Ceramic Tableware Settings */}
        {[-0.9, 0, 0.9].map((x, pIdx) => (
          <group key={pIdx} position={[x, 0.79, 0]}>
            {/* Ceramic Plate */}
            <mesh position={[0, 0.01, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.02, 16]} />
              <meshStandardMaterial color="#D7CFBE" roughness={0.5} />
            </mesh>
            {/* Small Ceramic Teacup */}
            <mesh position={[0.22, 0.04, 0]}>
              <cylinderGeometry args={[0.045, 0.035, 0.06, 12]} />
              <meshStandardMaterial color="#C4B8A0" roughness={0.4} />
            </mesh>
          </group>
        ))}

        {/* Center Fruit Bowl with Pomegranates & Figs */}
        <mesh position={[0, 0.84, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.15, 0.12, 20]} />
          <meshStandardMaterial color="#C9A227" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Fruit items */}
        <mesh position={[-0.05, 0.94, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#7D1C1B" roughness={0.6} />
        </mesh>
        <mesh position={[0.06, 0.93, 0.04]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color="#4A1E2B" roughness={0.7} />
        </mesh>

        {/* 4 Wooden Chairs */}
        {[[-0.9, -0.85], [0.9, -0.85], [-0.9, 0.85], [0.9, 0.85]].map(([x, z], cIdx) => (
          <group key={cIdx} position={[x, 0, z]} rotation={[0, z > 0 ? Math.PI : 0, 0]}>
            <mesh position={[0, 0.42, 0]} castShadow>
              <boxGeometry args={[0.44, 0.04, 0.42]} />
              <meshStandardMaterial color="#2E1C12" roughness={0.5} />
            </mesh>
            {/* Chair Backrest */}
            <mesh position={[0, 0.78, -0.18]}>
              <boxGeometry args={[0.42, 0.68, 0.04]} />
              <meshStandardMaterial color="#2E1C12" roughness={0.5} />
            </mesh>
            {/* Chair Legs */}
            {[[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].map(([cx, cz], legI) => (
              <mesh key={legI} position={[cx, 0.2, cz]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                <meshStandardMaterial color="#24140B" roughness={0.6} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* -------------------------------------------------------------
          BRASS SAMOVAR & TEA CONSOLE WITH RISING STEAM
         ------------------------------------------------------------- */}
      <group position={[3.2, 0, -2.5]}>
        {/* Walnut Side Console */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.0, 0.6]} />
          <meshStandardMaterial color="#2A190E" roughness={0.45} />
        </mesh>

        {/* Traditional Brass Samovar / Tea Urn */}
        <mesh position={[0, 1.25, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.12, 0.45, 24]} />
          <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.52, 0]}>
          <coneGeometry args={[0.15, 0.12, 20]} />
          <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
        </mesh>
        {/* Spigot tap */}
        <mesh position={[0, 1.15, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
          <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
        </mesh>

        {/* Ambient Rising Steam Particles */}
        <group ref={steamRef} position={[0, 1.6, 0]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} position={[(Math.random() - 0.5) * 0.08, 0, (Math.random() - 0.5) * 0.08]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} />
            </mesh>
          ))}
        </group>

        {/* Warm Ambient Console Light */}
        <pointLight position={[0, 1.8, 0]} color="#FFEAC2" intensity={1.1} distance={3.5} />
      </group>
    </group>
  );
}
