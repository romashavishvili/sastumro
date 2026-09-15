import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Lounge3D({
  position = [0, 0, -25],
  isActive = true,
  lightOn = false,
  onToggleLight,
}) {
  const fireLightRef = useRef();
  const lampLightRef = useRef();
  const currentIntensity = useRef(lightOn ? 2.4 : 0);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame((state, delta) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    // Fireplace gentle ember flicker
    if (fireLightRef.current) {
      fireLightRef.current.intensity = 1.9 + Math.sin(t * 6) * 0.25 + Math.cos(t * 13) * 0.12;
    }

    // Smooth lamp light transition (0.4–0.8s) + subtle living filament flicker
    const targetIntensity = lightOn ? 2.4 : 0;
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

    if (lampLightRef.current) {
      if (lightOn && !prefersReducedMotion) {
        const flicker = Math.sin(t * 7) * 0.07 + Math.sin(t * 17) * 0.03;
        lampLightRef.current.intensity = Math.max(0, currentIntensity.current + flicker);
      } else {
        lampLightRef.current.intensity = currentIntensity.current;
      }
    }
  });

  return (
    <group position={position}>
      {/* -------------------------------------------------------------
          ROOM SHELL: HISTORIC TBILISI TOWNHOUSES SALON (8 x 4.2 x 8)
         ------------------------------------------------------------- */}
      {/* Floor - Rich Walnut & Parquet Oak with warm natural sheen */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          color="#382316"
          roughness={0.28}
          metalness={0.08}
        />
      </mesh>

      {/* Ceiling with warm plaster tone & Sololaki molded rosette */}
      <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#322C24" roughness={0.85} />
      </mesh>
      {/* Ceiling Walnut Beams */}
      {[-2.2, 0, 2.2].map((z, i) => (
        <mesh key={i} position={[0, 4.08, z]}>
          <boxGeometry args={[8, 0.2, 0.22]} />
          <meshStandardMaterial color="#3D2619" roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 4.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 1.3, 32]} />
        <meshStandardMaterial color="#443D32" roughness={0.9} />
      </mesh>

      {/* Back Wall - Sololaki Heritage Forest Green & Walnut Wainscoting */}
      <mesh position={[0, 2.1, -4]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#22362C" roughness={0.82} />
      </mesh>
      {/* Carved Walnut Lower Wainscoting Panels */}
      <mesh position={[0, 0.65, -3.98]} receiveShadow>
        <boxGeometry args={[8, 1.3, 0.05]} />
        <meshStandardMaterial color="#362215" roughness={0.45} />
      </mesh>
      <mesh position={[0, 1.32, -3.96]}>
        <boxGeometry args={[8, 0.06, 0.08]} />
        <meshStandardMaterial color="#2B190E" roughness={0.4} />
      </mesh>

      {/* Left Wall with Bookshelf & Warm Plaster */}
      <mesh position={[-4, 2.1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#24382D" roughness={0.82} />
      </mesh>

      {/* Right Wall with Tall Arched Window (Afternoon Sololaki Sunlight) */}
      <group position={[4, 2.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh receiveShadow>
          <planeGeometry args={[8, 4.2]} />
          <meshStandardMaterial color="#24382D" roughness={0.82} />
        </mesh>

        {/* Tall Arched Window Frame */}
        <mesh position={[0, 0.2, 0.02]}>
          <boxGeometry args={[1.8, 2.8, 0.08]} />
          <meshStandardMaterial color="#281A10" roughness={0.45} />
        </mesh>
        {/* Warm Golden Daylight Window Pane */}
        <mesh position={[0, 0.2, 0.04]}>
          <planeGeometry args={[1.6, 2.6]} />
          <meshStandardMaterial
            color="#FFF4DE"
            roughness={0.12}
            transparent
            opacity={0.82}
          />
        </mesh>
      </group>

      {/* Front Arch Entrance */}
      <mesh position={[-2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#22362C" roughness={0.82} />
      </mesh>
      <mesh position={[2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#22362C" roughness={0.82} />
      </mesh>
      <mesh position={[0, 3.6, 4]}>
        <boxGeometry args={[3.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#22362C" roughness={0.82} />
      </mesh>

      {/* -------------------------------------------------------------
          CAST-IRON FIREPLACE & CARVED MANTEL (Back Wall Center)
         ------------------------------------------------------------- */}
      <group position={[0, 0, -3.8]}>
        {/* Contact Shadow Under Fireplace */}
        <mesh position={[0, 0.005, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 1.2]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.65} />
        </mesh>

        {/* Carved Stone Hearth Base */}
        <mesh position={[0, 0.08, 0.25]} receiveShadow>
          <boxGeometry args={[2.9, 0.16, 0.85]} />
          <meshStandardMaterial color="#2B2A2E" roughness={0.7} />
        </mesh>

        {/* Stone / Cast-iron Fireplace Surround */}
        <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 1.95, 0.5]} />
          <meshStandardMaterial color="#222326" roughness={0.65} metalness={0.25} />
        </mesh>

        {/* Carved Walnut Wood Mantelpiece Shelf */}
        <mesh position={[0, 2.08, 0.05]} castShadow>
          <boxGeometry args={[2.95, 0.14, 0.65]} />
          <meshStandardMaterial color="#422718" roughness={0.35} />
        </mesh>

        {/* Interior Firebox Cavity */}
        <mesh position={[0, 0.78, 0.05]}>
          <boxGeometry args={[1.5, 1.25, 0.52]} />
          <meshStandardMaterial color="#0D0C0D" roughness={0.95} />
        </mesh>

        {/* Burning Embers / Logs */}
        <mesh position={[-0.2, 0.28, 0.1]} rotation={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.8, 12]} />
          <meshStandardMaterial color="#38190B" roughness={0.9} />
        </mesh>
        <mesh position={[0.2, 0.3, 0.1]} rotation={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.75, 12]} />
          <meshStandardMaterial color="#301509" roughness={0.9} />
        </mesh>

        {/* Glowing Fire Coals */}
        <mesh position={[0, 0.22, 0.1]}>
          <boxGeometry args={[0.85, 0.16, 0.4]} />
          <meshStandardMaterial color="#FF4500" emissive="#FF5500" emissiveIntensity={2.8} />
        </mesh>

        {/* Fireplace Point Light casting warm amber reflections */}
        <pointLight
          ref={fireLightRef}
          position={[0, 0.65, 0.35]}
          color="#FF7A29"
          intensity={2.1}
          distance={5.8}
          castShadow
        />

        {/* Mantel Decor: Brass Candlesticks & Clock */}
        <mesh position={[-0.9, 2.28, 0.05]}>
          <cylinderGeometry args={[0.04, 0.06, 0.35, 12]} />
          <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.22} />
        </mesh>
        <mesh position={[0.9, 2.28, 0.05]}>
          <cylinderGeometry args={[0.04, 0.06, 0.35, 12]} />
          <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.22} />
        </mesh>
        <mesh position={[0, 2.29, 0.05]}>
          <boxGeometry args={[0.42, 0.32, 0.18]} />
          <meshStandardMaterial color="#C9A227" metalness={0.85} roughness={0.28} />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          TUFTED VELVET SOFA & CARVED COFFEE TABLE
         ------------------------------------------------------------- */}
      <group position={[0, 0, -1.0]}>
        {/* Contact Shadow Under Sofa */}
        <mesh position={[0, 0.005, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.3, 1.6]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.65} />
        </mesh>

        {/* Velvet Lounge Sofa Base */}
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.45, 1.1]} />
          <meshStandardMaterial color="#224233" roughness={0.72} />
        </mesh>
        {/* Sofa Backrest */}
        <mesh position={[0, 0.95, -0.42]} castShadow>
          <boxGeometry args={[2.8, 0.68, 0.28]} />
          <meshStandardMaterial color="#1D3A2C" roughness={0.72} />
        </mesh>
        {/* 2 Armrests */}
        <mesh position={[-1.42, 0.72, 0]}>
          <boxGeometry args={[0.26, 0.55, 1.15]} />
          <meshStandardMaterial color="#1D3A2C" roughness={0.72} />
        </mesh>
        <mesh position={[1.42, 0.72, 0]}>
          <boxGeometry args={[0.26, 0.55, 1.15]} />
          <meshStandardMaterial color="#1D3A2C" roughness={0.72} />
        </mesh>

        {/* 2 Ochre Velvet Bolster Pillows */}
        <mesh position={[-0.8, 0.76, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.55, 16]} />
          <meshStandardMaterial color="#D49D28" roughness={0.75} />
        </mesh>
        <mesh position={[0.8, 0.76, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.55, 16]} />
          <meshStandardMaterial color="#D49D28" roughness={0.75} />
        </mesh>

        {/* Traditional Sololaki Carpet Under Coffee Table */}
        <mesh position={[0, 0.012, 1.4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[3.4, 2.6]} />
          <meshStandardMaterial color="#823223" roughness={0.92} />
        </mesh>

        {/* Round Carved Walnut Coffee Table */}
        <group position={[0, 0, 1.5]}>
          {/* Table Contact Shadow */}
          <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.6, 1.6]} />
            <meshBasicMaterial color="#0A0806" transparent opacity={0.55} />
          </mesh>

          <mesh position={[0, 0.38, 0]} castShadow>
            <cylinderGeometry args={[0.72, 0.72, 0.06, 32]} />
            <meshStandardMaterial color="#422718" roughness={0.32} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.14, 0.26, 0.36, 16]} />
            <meshStandardMaterial color="#321C11" roughness={0.45} />
          </mesh>
          {/* Ceramic Teapot & Open Book */}
          <mesh position={[0.15, 0.44, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#ECE4D0" roughness={0.28} />
          </mesh>
          <mesh position={[-0.18, 0.42, 0.08]} rotation={[0, 0.2, 0]}>
            <boxGeometry args={[0.26, 0.03, 0.34]} />
            <meshStandardMaterial color="#6B231E" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* -------------------------------------------------------------
          VINTAGE GEORGIAN BOOKSHELF (Left Wall)
         ------------------------------------------------------------- */}
      <group position={[-3.65, 0, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        {/* Contact Shadow */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.7, 0.7]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.6} />
        </mesh>

        {/* Bookshelf Frame */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <boxGeometry args={[2.4, 3.2, 0.45]} />
          <meshStandardMaterial color="#361E12" roughness={0.38} />
        </mesh>
        {/* 4 Shelves with Rich Multi-Colored Books */}
        {[-0.8, -0.1, 0.6, 1.3].map((y, sIdx) => (
          <mesh key={sIdx} position={[0, 1.6 + y, 0.05]}>
            <boxGeometry args={[2.25, 0.38, 0.35]} />
            <meshStandardMaterial
              color={sIdx % 3 === 0 ? '#6B231E' : sIdx % 3 === 1 ? '#213B2E' : '#B88628'}
              roughness={0.75}
            />
          </mesh>
        ))}
      </group>

      {/* -------------------------------------------------------------
          INTERACTIVE STANDING BRASS ARC READING LAMP
         ------------------------------------------------------------- */}
      <group position={[2.8, 0, 0.8]}>
        {/* Contact Shadow Under Lamp Base */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial color="#0A0806" transparent opacity={0.5} />
        </mesh>

        {/* Clickable Brass Lamp Group */}
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
          {/* Heavy Polished Brass Base */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.26, 0.28, 0.08, 24]} />
            <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
          </mesh>

          {/* Slender Brass Stem */}
          <mesh position={[0, 1.25, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 2.4, 16]} />
            <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
          </mesh>

          {/* Curved Arc Arm */}
          <mesh position={[-0.2, 2.35, 0]} rotation={[0, 0, -0.4]}>
            <cylinderGeometry args={[0.018, 0.018, 0.65, 12]} />
            <meshStandardMaterial color="#C9A227" metalness={0.92} roughness={0.2} />
          </mesh>

          {/* Fluted Amber/Cream Bell Shade */}
          <mesh position={[-0.45, 2.18, 0]} rotation={[0, 0, -0.2]}>
            <coneGeometry args={[0.26, 0.34, 24, 1, true]} />
            <meshStandardMaterial
              color={lightOn ? '#FFF8E6' : '#E8DDBD'}
              roughness={0.4}
              emissive={lightOn ? '#FFA834' : '#000000'}
              emissiveIntensity={lightOn ? 1.6 : 0}
            />
          </mesh>

          {/* Warm Bulb Glow Sphere */}
          {lightOn && (
            <mesh position={[-0.45, 2.12, 0]}>
              <sphereGeometry args={[0.065, 12, 12]} />
              <meshBasicMaterial color="#FFE8A3" />
            </mesh>
          )}
        </group>

        {/* Dynamic Warm Lamp Point Light (2700K Warm Tungsten Glow) */}
        <pointLight
          ref={lampLightRef}
          position={[-0.45, 2.1, 0]}
          color="#FFB347"
          intensity={lightOn ? 2.4 : 0}
          distance={5.8}
          decay={2}
          castShadow={lightOn}
        />
      </group>
    </group>
  );
}
