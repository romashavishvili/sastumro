import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Breakfast3D({
  position = [0, 0, -50],
  isActive = true,
  lightOn = false,
  onToggleLight,
}) {
  const steamRef = useRef();
  const chandelierLightRef = useRef();
  const currentIntensity = useRef(lightOn ? 2.5 : 0);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame((state, delta) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    // Gentle rising and fading steam particles from samovar
    if (steamRef.current) {
      steamRef.current.children.forEach((p, idx) => {
        p.position.y = (t * 0.4 + idx * 0.25) % 1.2;
        p.scale.setScalar(0.6 + p.position.y * 1.5);
        if (p.material) {
          p.material.opacity = Math.max(0, 0.4 - p.position.y * 0.35);
        }
      });
    }

    // Smooth light transition (0.4–0.8s) + subtle living filament flicker
    const targetIntensity = lightOn ? 2.5 : 0;
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

    if (chandelierLightRef.current) {
      if (lightOn && !prefersReducedMotion) {
        const flicker = Math.sin(t * 8) * 0.08 + Math.sin(t * 19) * 0.03;
        chandelierLightRef.current.intensity = Math.max(0, currentIntensity.current + flicker);
      } else {
        chandelierLightRef.current.intensity = currentIntensity.current;
      }
    }
  });

  return (
    <group position={position}>
      {/* -------------------------------------------------------------
          ROOM SHELL: SUNLIT BREAKFAST HALL (8 x 4.2 x 8)
         ------------------------------------------------------------- */}
      {/* Floor - Honeyed Oak Planks with warm sheen */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#3D291C" roughness={0.28} metalness={0.06} />
      </mesh>

      {/* Ceiling with aged timber beams */}
      <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#362E25" roughness={0.88} />
      </mesh>
      {[-2.5, 0, 2.5].map((z, i) => (
        <mesh key={i} position={[0, 4.08, z]}>
          <boxGeometry args={[8, 0.22, 0.25]} />
          <meshStandardMaterial color="#42291A" roughness={0.5} />
        </mesh>
      ))}

      {/* Back Wall with Tall Arched Windows & Sololaki Plaster */}
      <mesh position={[0, 2.1, -4]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#3E342B" roughness={0.82} />
      </mesh>
      {/* Double Arched Windows */}
      {[-1.8, 1.8].map((x, wIdx) => (
        <group key={wIdx} position={[x, 2.2, -3.95]}>
          <mesh>
            <boxGeometry args={[1.7, 2.7, 0.08]} />
            <meshStandardMaterial color="#25160E" roughness={0.45} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[1.5, 2.5]} />
            <meshStandardMaterial
              color="#FFF6E0"
              opacity={0.8}
              roughness={0.12}
              transparent
            />
          </mesh>
        </group>
      ))}

      {/* Morning Sun Directional Light through Windows */}
      <directionalLight
        position={[0, 4, -6]}
        color="#FFF2D6"
        intensity={1.9}
        castShadow
      />

      {/* Left Wall with Authentic Sololaki Brick Trim */}
      <mesh position={[-4, 2.1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#3B3229" roughness={0.82} />
      </mesh>
      <mesh position={[-3.97, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[5, 2.2]} />
        <meshStandardMaterial color="#7D3D2C" roughness={0.92} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[4, 2.1, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#3B3229" roughness={0.82} />
      </mesh>

      {/* Front Arch Entrance */}
      <mesh position={[-2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#3B3229" roughness={0.82} />
      </mesh>
      <mesh position={[2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#3B3229" roughness={0.82} />
      </mesh>
      <mesh position={[0, 3.6, 4]}>
        <boxGeometry args={[3.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#3B3229" roughness={0.82} />
      </mesh>

      {/* -------------------------------------------------------------
          RUSTIC SOLID OAK REFECTORY TABLE & SETTINGS
         ------------------------------------------------------------- */}
      <group position={[0, 0, -1.2]}>
        {/* Contact Shadow Under Table & Chairs */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 2.4]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.65} />
        </mesh>

        {/* Tabletop */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.08, 1.4]} />
          <meshStandardMaterial color="#4A2F1D" roughness={0.32} metalness={0.08} />
        </mesh>
        {/* 4 Sturdy Trestle Legs */}
        {[[-1.4, -0.5], [1.4, -0.5], [-1.4, 0.5], [1.4, 0.5]].map(([x, z], lIdx) => (
          <mesh key={lIdx} position={[x, 0.35, z]} castShadow>
            <boxGeometry args={[0.1, 0.7, 0.1]} />
            <meshStandardMaterial color="#362013" roughness={0.45} />
          </mesh>
        ))}

        {/* Linen Table Runner */}
        <mesh position={[0, 0.785, 0]}>
          <boxGeometry args={[3.42, 0.01, 0.55]} />
          <meshStandardMaterial color="#ECE4D4" roughness={0.85} />
        </mesh>

        {/* Ceramic Tableware Settings */}
        {[-0.9, 0, 0.9].map((x, pIdx) => (
          <group key={pIdx} position={[x, 0.79, 0]}>
            {/* Ceramic Plate */}
            <mesh position={[0, 0.01, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.02, 16]} />
              <meshStandardMaterial color="#DFD8C8" roughness={0.4} />
            </mesh>
            {/* Small Ceramic Teacup */}
            <mesh position={[0.22, 0.04, 0]}>
              <cylinderGeometry args={[0.045, 0.035, 0.06, 12]} />
              <meshStandardMaterial color="#C8BEAA" roughness={0.35} />
            </mesh>
          </group>
        ))}

        {/* Center Fruit Bowl with Pomegranates & Figs */}
        <mesh position={[0, 0.84, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.15, 0.12, 20]} />
          <meshStandardMaterial color="#C9A227" metalness={0.88} roughness={0.25} />
        </mesh>
        {/* Fruit items */}
        <mesh position={[-0.05, 0.94, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#88201E" roughness={0.55} />
        </mesh>
        <mesh position={[0.06, 0.93, 0.04]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color="#542031" roughness={0.65} />
        </mesh>

        {/* 4 Wooden Chairs */}
        {[[-0.9, -0.85], [0.9, -0.85], [-0.9, 0.85], [0.9, 0.85]].map(([x, z], cIdx) => (
          <group key={cIdx} position={[x, 0, z]} rotation={[0, z > 0 ? Math.PI : 0, 0]}>
            <mesh position={[0, 0.42, 0]} castShadow>
              <boxGeometry args={[0.44, 0.04, 0.42]} />
              <meshStandardMaterial color="#3D2417" roughness={0.45} />
            </mesh>
            {/* Chair Backrest */}
            <mesh position={[0, 0.78, -0.18]}>
              <boxGeometry args={[0.42, 0.68, 0.04]} />
              <meshStandardMaterial color="#3D2417" roughness={0.45} />
            </mesh>
            {/* Chair Legs */}
            {[[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].map(([cx, cz], legI) => (
              <mesh key={legI} position={[cx, 0.2, cz]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                <meshStandardMaterial color="#2E180E" roughness={0.5} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* -------------------------------------------------------------
          INTERACTIVE VINTAGE BRASS & PLEATED CHANDELIER
         ------------------------------------------------------------- */}
      <group position={[0, 2.7, -1.2]}>
        {/* Ceiling Hanging Chain */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1.4, 8]} />
          <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
        </mesh>

        {/* Clickable Chandelier Group */}
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
          {/* Brass Canopy Hub */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.16, 0.08, 16]} />
            <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
          </mesh>

          {/* Fluted Amber/Cream Linen Shade */}
          <mesh position={[0, -0.18, 0]}>
            <coneGeometry args={[0.55, 0.35, 32, 1, true]} />
            <meshStandardMaterial
              color={lightOn ? '#FFF8E6' : '#EAE0C4'}
              roughness={0.4}
              emissive={lightOn ? '#FFA834' : '#000000'}
              emissiveIntensity={lightOn ? 1.6 : 0}
            />
          </mesh>

          {/* Brass Lower Ring Trim */}
          <mesh position={[0, -0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.015, 12, 32]} />
            <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
          </mesh>

          {/* Warm Bulb Glow Sphere */}
          {lightOn && (
            <mesh position={[0, -0.22, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshBasicMaterial color="#FFE8A3" />
            </mesh>
          )}
        </group>

        {/* Dynamic Warm Chandelier Point Light (2700K Tungsten Glow) */}
        <pointLight
          ref={chandelierLightRef}
          position={[0, -0.25, 0]}
          color="#FFB347"
          intensity={lightOn ? 2.5 : 0}
          distance={6.2}
          decay={2}
          castShadow={lightOn}
        />
      </group>

      {/* -------------------------------------------------------------
          BRASS SAMOVAR & TEA CONSOLE WITH RISING STEAM
         ------------------------------------------------------------- */}
      <group position={[3.2, 0, -2.5]}>
        {/* Contact Shadow */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.5, 0.9]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.55} />
        </mesh>

        {/* Walnut Side Console */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.0, 0.6]} />
          <meshStandardMaterial color="#382214" roughness={0.4} />
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
        <pointLight position={[0, 1.8, 0]} color="#FFE8C0" intensity={1.2} distance={3.8} />
      </group>
    </group>
  );
}
