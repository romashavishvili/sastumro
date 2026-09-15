import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Bedroom3D({ position = [0, 0, 0], isActive = true, lightOn = false, onToggleLight }) {
  const lampLightRef = useRef();
  const dustRef = useRef();
  const currentIntensity = useRef(lightOn ? 2.2 : 0);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame((state, delta) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    // Smooth light transition (0.4–0.8s) + realistic warm lamp flicker
    const targetIntensity = lightOn ? 2.2 : 0;
    if (prefersReducedMotion) {
      currentIntensity.current = targetIntensity;
    } else {
      currentIntensity.current = THREE.MathUtils.damp(currentIntensity.current, targetIntensity, 4.5, delta);
    }

    if (lampLightRef.current) {
      if (lightOn && !prefersReducedMotion) {
        // Continuous subtle warm living flicker
        const flicker = Math.sin(t * 8) * 0.08 + Math.sin(t * 19) * 0.04;
        lampLightRef.current.intensity = Math.max(0, currentIntensity.current + flicker);
      } else {
        lampLightRef.current.intensity = currentIntensity.current;
      }
    }

    // Subtle drift of dust particles in the warm sunbeam
    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.02;
      dustRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* -------------------------------------------------------------
          ROOM SHELL: 19th-Century Tbilisi Townhouse Bedroom (Width: 8, Height: 4.2, Depth: 8)
         ------------------------------------------------------------- */}

      {/* Floor - Rich Polished Walnut & Oak Parquet with warm sheen */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          color="#3A2417"
          roughness={0.28}
          metalness={0.12}
        />
      </mesh>

      {/* Ceiling with Aged Timber Beams */}
      <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#2E2822" roughness={0.9} />
      </mesh>
      {/* Exposed Walnut Ceiling Beams */}
      {[-2.5, 0, 2.5].map((z, i) => (
        <mesh key={i} position={[0, 4.08, z]}>
          <boxGeometry args={[8, 0.22, 0.25]} />
          <meshStandardMaterial color="#3D2619" roughness={0.55} />
        </mesh>
      ))}

      {/* Back Wall - Warm Cream & Sand Plaster with Tbilisi Brick Arch Recess */}
      <mesh position={[0, 2.1, -4]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#362E25" roughness={0.88} />
      </mesh>
      {/* Authentic Sololaki Historic Red-Clay Brick Arch Recess */}
      <mesh position={[0, 2.0, -3.96]} receiveShadow>
        <planeGeometry args={[4.2, 3.4]} />
        <meshStandardMaterial color="#6E382A" roughness={0.92} />
      </mesh>
      {/* Arch Carved Timber Trim */}
      <mesh position={[0, 3.68, -3.94]}>
        <boxGeometry args={[4.25, 0.08, 0.06]} />
        <meshStandardMaterial color="#3D2619" roughness={0.4} />
      </mesh>

      {/* Left Wall with Tall Arched Sololaki Window */}
      <group position={[-4, 2.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh receiveShadow>
          <planeGeometry args={[8, 4.2]} />
          <meshStandardMaterial color="#332B23" roughness={0.88} />
        </mesh>

        {/* Tall Window Frame (Dark aged timber) */}
        <mesh position={[0, 0.2, 0.02]}>
          <boxGeometry args={[1.8, 2.8, 0.08]} />
          <meshStandardMaterial color="#24160E" roughness={0.45} />
        </mesh>

        {/* Translucent Window Glass Pane with Golden Afternoon Sunlight Glow */}
        <mesh position={[0, 0.2, 0.04]}>
          <planeGeometry args={[1.6, 2.6]} />
          <meshStandardMaterial
            color="#FFF4DE"
            roughness={0.12}
            transparent
            opacity={0.82}
          />
        </mesh>

        {/* Natural Linen Curtains with warm terracotta/beige tone */}
        <mesh position={[-0.95, 0.2, 0.08]}>
          <boxGeometry args={[0.3, 2.9, 0.08]} />
          <meshStandardMaterial color="#D8C8A8" roughness={0.85} />
        </mesh>
        <mesh position={[0.95, 0.2, 0.08]}>
          <boxGeometry args={[0.3, 2.9, 0.08]} />
          <meshStandardMaterial color="#D8C8A8" roughness={0.85} />
        </mesh>
      </group>

      {/* Right Wall */}
      <mesh position={[4, 2.1, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#332B23" roughness={0.88} />
      </mesh>

      {/* Front Arch Entrance */}
      <mesh position={[-2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#332B23" roughness={0.88} />
      </mesh>
      <mesh position={[2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#332B23" roughness={0.88} />
      </mesh>
      <mesh position={[0, 3.6, 4]}>
        <boxGeometry args={[3.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#332B23" roughness={0.88} />
      </mesh>

      {/* -------------------------------------------------------------
          HAND-CARVED WALNUT BED & FURNITURE
         ------------------------------------------------------------- */}
      <group position={[0, 0, -2.4]}>
        {/* Contact Shadow Under Bed */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.9, 2.7]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.65} />
        </mesh>

        {/* Carved Walnut Headboard with rich grain sheen */}
        <mesh position={[0, 1.2, -1.2]} castShadow>
          <boxGeometry args={[2.8, 1.6, 0.12]} />
          <meshStandardMaterial color="#4A2E1C" roughness={0.32} metalness={0.08} />
        </mesh>
        {/* Ornate Brass Crown Molding on Headboard */}
        <mesh position={[0, 2.05, -1.2]}>
          <boxGeometry args={[3.0, 0.12, 0.18]} />
          <meshStandardMaterial color="#C9A227" roughness={0.25} metalness={0.88} />
        </mesh>

        {/* Bed Walnut Frame Base */}
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.45, 2.3]} />
          <meshStandardMaterial color="#382113" roughness={0.38} />
        </mesh>
        {/* 4 Turned Bed Corner Posts */}
        {[[-1.25, 0], [1.25, 0], [-1.25, -1.15], [1.25, -1.15]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.6, z]}>
            <cylinderGeometry args={[0.065, 0.08, 1.2, 16]} />
            <meshStandardMaterial color="#4A2E1C" roughness={0.35} />
          </mesh>
        ))}

        {/* Soft White Linen Duvet with natural fabric sheen */}
        <mesh position={[0, 0.62, 0.05]} castShadow>
          <boxGeometry args={[2.3, 0.35, 2.15]} />
          <meshStandardMaterial color="#F5EFEB" roughness={0.78} />
        </mesh>

        {/* Deep Forest Green & Terracotta Bed Runner */}
        <mesh position={[0, 0.81, 0.6]}>
          <boxGeometry args={[2.32, 0.04, 0.65]} />
          <meshStandardMaterial color="#1E3329" roughness={0.85} />
        </mesh>

        {/* Two Plump Linen Pillows */}
        <mesh position={[-0.62, 0.9, -0.75]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.78, 0.18, 0.52]} />
          <meshStandardMaterial color="#FAF6F0" roughness={0.8} />
        </mesh>
        <mesh position={[0.62, 0.9, -0.75]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.78, 0.18, 0.52]} />
          <meshStandardMaterial color="#FAF6F0" roughness={0.8} />
        </mesh>

        {/* Traditional Sololaki Geometric Wool Rug */}
        <mesh position={[0, 0.015, 0.4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[3.8, 3.2]} />
          <meshStandardMaterial color="#7A3525" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.018, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.5, 2.9]} />
          <meshStandardMaterial color="#964632" roughness={0.92} />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          INTERACTIVE BEDSIDE NIGHTSTAND & CLICKABLE BRASS LAMP
         ------------------------------------------------------------- */}
      {/* Left Nightstand with interactive lamp */}
      <group position={[-1.9, 0, -3.4]}>
        {/* Contact shadow */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 0.8]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.5} />
        </mesh>

        {/* Walnut Nightstand */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.65, 0.84, 0.55]} />
          <meshStandardMaterial color="#3D2619" roughness={0.35} />
        </mesh>

        {/* Clickable/Tappable Brass Table Lamp with Hover/Cursor */}
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
          {/* Lamp Base */}
          <mesh position={[0, 0.88, 0]}>
            <cylinderGeometry args={[0.08, 0.13, 0.08, 16]} />
            <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.05, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.35, 12]} />
            <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
          </mesh>

          {/* Lamp Shade (warms up and glows when light is ON) */}
          <mesh position={[0, 1.25, 0]}>
            <coneGeometry args={[0.24, 0.3, 24, 1, true]} />
            <meshStandardMaterial
              color={lightOn ? '#FFF8E6' : '#E8DCBF'}
              roughness={0.4}
              emissive={lightOn ? '#FFA834' : '#000000'}
              emissiveIntensity={lightOn ? 1.6 : 0}
            />
          </mesh>

          {/* Warm Bulb Glow Sphere */}
          {lightOn && (
            <mesh position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial color="#FFE8A3" />
            </mesh>
          )}
        </group>

        {/* Dynamic Warm Lamp Point Light (2700K Warm Tungsten Glow) */}
        <pointLight
          ref={lampLightRef}
          position={[0, 1.25, 0]}
          color="#FFB347"
          intensity={lightOn ? 2.2 : 0}
          distance={5.5}
          decay={2}
          castShadow={lightOn}
        />
      </group>

      {/* Right Nightstand */}
      <group position={[1.9, 0, -3.4]}>
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 0.8]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.65, 0.84, 0.55]} />
          <meshStandardMaterial color="#3D2619" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.08, 0.13, 0.08, 16]} />
          <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.35, 12]} />
          <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <coneGeometry args={[0.24, 0.3, 24, 1, true]} />
          <meshStandardMaterial
            color={lightOn ? '#FFF8E6' : '#E8DCBF'}
            roughness={0.4}
            emissive={lightOn ? '#FFA834' : '#000000'}
            emissiveIntensity={lightOn ? 1.2 : 0}
          />
        </mesh>
        {lightOn && (
          <pointLight position={[0, 1.25, 0]} color="#FFB347" intensity={1.4} distance={4.5} />
        )}
      </group>

      {/* Floating Dust Particles in Sunbeam */}
      <group ref={dustRef} position={[-2.2, 2.0, -1.0]}>
        {[...Array(20)].map((_, i) => {
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
