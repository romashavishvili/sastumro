import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 80 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#00f0ff');
    const color2 = new THREE.Color('#3b82f6');
    const color3 = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Spread in a cylindrical / spherical volume around the center
      const r = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8;

      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;

      const mixed = Math.random() > 0.6 ? color1 : Math.random() > 0.5 ? color2 : color3;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
