import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingObject({ scrollProgress = 0 }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const groupRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Frame loop for smooth rotation, mouse parallax, and scroll interaction
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Mouse parallax target (state.pointer gives normalized [-1, 1] coords)
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Scroll based transformations
    // Progress 0 = Hero, 0.3 = About, 0.6 = Services, 0.9 = Contact
    const targetY = isMobile
      ? -scrollProgress * 1.5
      : Math.sin(scrollProgress * Math.PI) * 0.4 - scrollProgress * 1.8;

    const targetX = isMobile
      ? 0
      : Math.sin(scrollProgress * Math.PI * 2) * 1.2;

    const targetScale = isMobile
      ? 0.75 - scrollProgress * 0.15
      : 1.15 - Math.sin(scrollProgress * Math.PI) * 0.25;

    // Smooth Lerp for group position and scale
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.06);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, Math.max(targetScale, 0.5), 0.06)
    );

    // Dynamic rotation combining idle spin, mouse tilt, and scroll-spin
    const targetRotX = (mouseY * 0.35) + (scrollProgress * Math.PI * 2.5);
    const targetRotY = (mouseX * 0.45) + (scrollProgress * Math.PI * 3.5);

    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotX + state.clock.elapsedTime * 0.15,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotY + state.clock.elapsedTime * 0.25,
        0.05
      );
    }

    // Outer accent ring counter-rotates
    if (ringRef.current) {
      ringRef.current.rotation.x = -state.clock.elapsedTime * 0.2;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.35 + mouseX * 0.3;
      ringRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  // Geometry details tuned for performance vs visual richness
  const radialSegments = isMobile ? 48 : 80;
  const tubularSegments = isMobile ? 12 : 24;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float
        speed={1.8}
        rotationIntensity={0.6}
        floatIntensity={0.8}
        floatingRange={[-0.15, 0.15]}
      >
        {/* Main Abstract Sculptural Torus Knot */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.25, 0.38, radialSegments, tubularSegments, 2, 3]} />
          <MeshDistortMaterial
            color="#0b1320"
            emissive="#002b4d"
            emissiveIntensity={0.35}
            roughness={0.12}
            metalness={0.88}
            clearcoat={1}
            clearcoatRoughness={0.1}
            distort={0.28}
            speed={2.0}
            reflectivity={0.9}
          />
        </mesh>

        {/* Floating Outer Accent Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.0, 0.015, 16, isMobile ? 40 : 64]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Secondary Delicate Gyro Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.3, 0.008, 12, isMobile ? 32 : 56]} />
          <meshStandardMaterial
            color="#ccff00"
            emissive="#ccff00"
            emissiveIntensity={1.2}
            roughness={0.2}
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}
