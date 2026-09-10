import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Lounge3D({ position = [0, 0, -25], isActive = true }) {
  const fireLightRef = useRef();

  useFrame((state) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    // Fireplace gentle ember flicker
    if (fireLightRef.current) {
      fireLightRef.current.intensity = 1.8 + Math.sin(t * 7) * 0.25 + Math.cos(t * 11) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* -------------------------------------------------------------
          ROOM SHELL: HISTORIC TBILISI TOWNHOUSES SALON (8 x 4.2 x 8)
         ------------------------------------------------------------- */}
      {/* Floor - Parquet Oak */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#2A1B12" roughness={0.35} metalness={0.08} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#161814" roughness={0.8} />
      </mesh>
      {/* Molded Plaster Ceiling Rosette */}
      <mesh position={[0, 4.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 1.2, 32]} />
        <meshStandardMaterial color="#262820" roughness={0.9} />
      </mesh>

      {/* Back Wall - Deep Forest Green with Timber Wainscoting */}
      <mesh position={[0, 2.1, -4]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#14241D" roughness={0.8} />
      </mesh>
      {/* Lower Wainscot Panel */}
      <mesh position={[0, 0.6, -3.98]} receiveShadow>
        <boxGeometry args={[8, 1.2, 0.05]} />
        <meshStandardMaterial color="#20150F" roughness={0.5} />
      </mesh>

      {/* Left Wall - Tall Bookshelf Wall */}
      <mesh position={[-4, 2.1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#14241D" roughness={0.8} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[4, 2.1, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4.2]} />
        <meshStandardMaterial color="#14241D" roughness={0.8} />
      </mesh>

      {/* Front Arch Entrance (connecting from bedroom corridor) */}
      <mesh position={[-2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#14241D" roughness={0.8} />
      </mesh>
      <mesh position={[2.8, 2.1, 4]}>
        <boxGeometry args={[2.4, 4.2, 0.2]} />
        <meshStandardMaterial color="#14241D" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.6, 4]}>
        <boxGeometry args={[3.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#14241D" roughness={0.8} />
      </mesh>

      {/* -------------------------------------------------------------
          CAST-IRON FIREPLACE & CARVED MANTEL (Back Wall Center)
         ------------------------------------------------------------- */}
      <group position={[0, 0, -3.8]}>
        {/* Stone / Cast-iron Fireplace Surround */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 2.0, 0.5]} />
          <meshStandardMaterial color="#1C1D1F" roughness={0.7} metalness={0.3} />
        </mesh>

        {/* Carved Wood Mantelpiece Shelf */}
        <mesh position={[0, 2.05, 0.05]} castShadow>
          <boxGeometry args={[2.9, 0.12, 0.65]} />
          <meshStandardMaterial color="#2E1C12" roughness={0.4} />
        </mesh>

        {/* Interior Firebox Cavity */}
        <mesh position={[0, 0.75, 0.05]}>
          <boxGeometry args={[1.5, 1.3, 0.52]} />
          <meshStandardMaterial color="#0A0A0B" roughness={0.9} />
        </mesh>

        {/* Burning Embers / Logs */}
        <mesh position={[-0.2, 0.25, 0.1]} rotation={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.8, 12]} />
          <meshStandardMaterial color="#301509" roughness={0.9} />
        </mesh>
        <mesh position={[0.2, 0.28, 0.1]} rotation={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.75, 12]} />
          <meshStandardMaterial color="#2A1208" roughness={0.9} />
        </mesh>

        {/* Glowing Fire Coals */}
        <mesh position={[0, 0.2, 0.1]}>
          <boxGeometry args={[0.8, 0.15, 0.4]} />
          <meshStandardMaterial color="#FF4500" emissive="#FF5500" emissiveIntensity={2.8} />
        </mesh>

        {/* Fireplace Point Light casting warm orange reflections */}
        <pointLight
          ref={fireLightRef}
          position={[0, 0.6, 0.3]}
          color="#FF7A29"
          intensity={2.2}
          distance={5.5}
          castShadow
        />

        {/* Mantel Decor: Brass Candlesticks & Clock */}
        <mesh position={[-0.9, 2.25, 0.05]}>
          <cylinderGeometry args={[0.04, 0.06, 0.35, 12]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0.9, 2.25, 0.05]}>
          <cylinderGeometry args={[0.04, 0.06, 0.35, 12]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 2.26, 0.05]}>
          <boxGeometry args={[0.42, 0.32, 0.18]} />
          <meshStandardMaterial color="#C9A227" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          TUFTED VELVET SOFA & CARVED COFFEE TABLE
         ------------------------------------------------------------- */}
      <group position={[0, 0, -1.0]}>
        {/* Velvet / Leather Lounge Sofa */}
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.45, 1.1]} />
          <meshStandardMaterial color="#20382D" roughness={0.7} />
        </mesh>
        {/* Sofa Backrest */}
        <mesh position={[0, 0.95, -0.42]} castShadow>
          <boxGeometry args={[2.8, 0.68, 0.28]} />
          <meshStandardMaterial color="#1C3228" roughness={0.7} />
        </mesh>
        {/* 2 Armrests */}
        <mesh position={[-1.42, 0.72, 0]}>
          <boxGeometry args={[0.26, 0.55, 1.15]} />
          <meshStandardMaterial color="#1C3228" roughness={0.7} />
        </mesh>
        <mesh position={[1.42, 0.72, 0]}>
          <boxGeometry args={[0.26, 0.55, 1.15]} />
          <meshStandardMaterial color="#1C3228" roughness={0.7} />
        </mesh>

        {/* 2 Bolster Pillows */}
        <mesh position={[-0.8, 0.75, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.55, 16]} />
          <meshStandardMaterial color="#DDB83B" roughness={0.8} />
        </mesh>
        <mesh position={[0.8, 0.75, -0.15]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.55, 16]} />
          <meshStandardMaterial color="#DDB83B" roughness={0.8} />
        </mesh>

        {/* Round Carved Walnut Coffee Table */}
        <group position={[0, 0, 1.5]}>
          <mesh position={[0, 0.36, 0]} castShadow>
            <cylinderGeometry args={[0.7, 0.7, 0.06, 32]} />
            <meshStandardMaterial color="#321D12" roughness={0.35} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.17, 0]}>
            <cylinderGeometry args={[0.12, 0.24, 0.34, 16]} />
            <meshStandardMaterial color="#27150C" roughness={0.5} />
          </mesh>
          {/* Ceramic Teapot & Open Book */}
          <mesh position={[0.15, 0.42, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#ECE4D0" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* -------------------------------------------------------------
          VINTAGE GEORGIAN BOOKSHELF (Left Wall)
         ------------------------------------------------------------- */}
      <group position={[-3.65, 0, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        {/* Bookshelf Frame */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <boxGeometry args={[2.4, 3.2, 0.45]} />
          <meshStandardMaterial color="#26160D" roughness={0.45} />
        </mesh>
        {/* 4 Shelves with Multi-Colored Books */}
        {[-0.8, -0.1, 0.6, 1.3].map((y, sIdx) => (
          <mesh key={sIdx} position={[0, 1.6 + y, 0.05]}>
            <boxGeometry args={[2.25, 0.38, 0.35]} />
            <meshStandardMaterial
              color={sIdx % 2 === 0 ? '#4A2518' : '#1C2C24'}
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Standing Arc Lamp */}
      <group position={[2.8, 0, 0.8]}>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.26, 0.28, 0.06, 20]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.3, 12]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Fluted Bell Shade */}
        <mesh position={[-0.4, 2.2, 0]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[0.25, 0.32, 24, 1, true]} />
          <meshStandardMaterial color="#FFF1D0" roughness={0.5} emissive="#FFE5A8" emissiveIntensity={0.5} />
        </mesh>
        <pointLight position={[-0.4, 2.1, 0]} color="#FFE29C" intensity={1.4} distance={4.5} />
      </group>
    </group>
  );
}
