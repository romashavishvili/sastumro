import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function Chandelier({ mouse, scrollProgress = 0 }) {
  const groupRef = useRef();
  const innerRingRef = useRef();
  const sphereRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const mx = mouse?.current?.x || 0;
    const my = mouse?.current?.y || 0;

    // Smooth physical parallax tilt in response to mouse movement
    const targetRotX = my * 0.28 + Math.sin(time * 0.35) * 0.05;
    const targetRotY = time * 0.16 + mx * 0.4;
    const targetRotZ = Math.cos(time * 0.3) * 0.03 - mx * 0.06;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      2.5,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      2.5,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ,
      2.5,
      delta
    );

    // Scroll-linked transformation: subtly shrink and drift as hero leaves view
    // progress is clamped between 0 and 1
    const clampedProgress = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const targetScale = THREE.MathUtils.lerp(1.0, 0.72, clampedProgress);
    const targetY = THREE.MathUtils.lerp(0, -1.2, clampedProgress);
    const targetX = THREE.MathUtils.lerp(0, 0.4, clampedProgress);

    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 3, delta)
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      3,
      delta
    );
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetX,
      3,
      delta
    );

    // Inner concentric ring counter-oscillates
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = Math.sin(time * 0.4) * 0.12;
      innerRingRef.current.rotation.z = -time * 0.08;
    }

    // Glass transmission sphere subtle optical pulse
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Top Ceiling Mount Rosette */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.05, 24]} />
          <meshStandardMaterial
            color="#C9A227"
            metalness={0.92}
            roughness={0.24}
          />
        </mesh>

        {/* 4 Delicate Brass Suspension Rods */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => {
          const radius = 1.32;
          const x = Math.cos(angle) * radius * 0.42;
          const z = Math.sin(angle) * radius * 0.42;
          return (
            <mesh
              key={i}
              position={[x, 0.9, z]}
              rotation={[
                Math.sin(angle) * -0.16,
                0,
                Math.cos(angle) * 0.16,
              ]}
            >
              <cylinderGeometry args={[0.012, 0.012, 1.85, 8]} />
              <meshStandardMaterial
                color="#C9A227"
                metalness={0.92}
                roughness={0.25}
              />
            </mesh>
          );
        })}

        {/* Primary Outer Brass Torus Ring */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[1.38, 0.055, 16, 52]} />
          <meshStandardMaterial
            color="#C9A227"
            metalness={0.92}
            roughness={0.22}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* Secondary Inclined Brass Halo Ring */}
        <group ref={innerRingRef}>
          <mesh rotation={[Math.PI / 7, 0, 0]}>
            <torusGeometry args={[0.92, 0.035, 12, 38]} />
            <meshStandardMaterial
              color="#DFB837"
              metalness={0.9}
              roughness={0.26}
              envMapIntensity={1.2}
            />
          </mesh>
        </group>

        {/* Central Physical Glass Transmission Sphere */}
        <mesh ref={sphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.52, 36, 36]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.94}
            opacity={1}
            transparent
            roughness={0.06}
            ior={1.54}
            thickness={1.3}
            attenuationColor="#F3EFE6"
            attenuationDistance={1.6}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Central Brass Meridian Equatorial Ring around the Sphere */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.54, 0.016, 12, 32]} />
          <meshStandardMaterial
            color="#C9A227"
            metalness={0.94}
            roughness={0.2}
          />
        </mesh>

        {/* Internal Warm Amber Filament Light Source */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#FFF4D4"
            emissive="#FFE094"
            emissiveIntensity={2.8}
            roughness={0.1}
          />
        </mesh>

        {/* Radiant Soft Interior Glow */}
        <pointLight
          position={[0, 0, 0]}
          intensity={1.9}
          color="#FFE5B0"
          distance={4.8}
        />
      </group>
    </Float>
  );
}
