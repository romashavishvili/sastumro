import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import Bedroom3D from './Bedroom3D';
import Lounge3D from './Lounge3D';
import Breakfast3D from './Breakfast3D';
import Courtyard3D from './Courtyard3D';

function CameraRig({ scrollProgress = 0, lookOffset }) {
  const currentTarget = useRef(new THREE.Vector3(0, 1.2, -1.5));
  const currentPos = useRef(new THREE.Vector3(0, 1.4, 3.4));

  useFrame((state, delta) => {
    // Room positions along Z axis:
    // Room 0 (Bedroom): z = 0, target z = -1.5, cam z = 3.4
    // Room 1 (Lounge): z = -25, target z = -26.5, cam z = -21.6
    // Room 2 (Breakfast): z = -50, target z = -51.5, cam z = -46.6
    // Room 3 (Courtyard): z = -75, target z = -76.5, cam z = -71.6

    const clampedProgress = THREE.MathUtils.clamp(scrollProgress, 0, 1);

    // Spline interpolation along Z axis for seamless camera walk
    const targetZBase = -clampedProgress * 75;
    const targetCamZ = targetZBase + 3.4;
    const targetLookZ = targetZBase - 1.5;

    // Interactive user drag-to-look around offsets
    const dragYaw = (lookOffset.current?.x || 0) * 0.8;
    const dragPitch = (lookOffset.current?.y || 0) * 0.4;

    const destLookX = Math.sin(dragYaw) * 2.5;
    const destLookY = 1.3 - dragPitch * 1.5;
    const destLookZ = targetLookZ;

    // Smooth physical camera glide
    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, (lookOffset.current?.x || 0) * 0.3, 3.5, delta);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, 1.4 - (lookOffset.current?.y || 0) * 0.2, 3.5, delta);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetCamZ, 3.2, delta);

    currentTarget.current.x = THREE.MathUtils.damp(currentTarget.current.x, destLookX, 4, delta);
    currentTarget.current.y = THREE.MathUtils.damp(currentTarget.current.y, destLookY, 4, delta);
    currentTarget.current.z = THREE.MathUtils.damp(currentTarget.current.z, destLookZ, 3.2, delta);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentTarget.current);
  });

  return null;
}

export default function WalkthroughCanvas({
  scrollProgress = 0,
  lookOffset,
  roomLights = {},
  onToggleLight,
  isInView = true,
}) {
  // Determine which rooms are in or near view for active animations
  const roomIdx = Math.min(Math.floor(scrollProgress * 4), 3);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Canvas
      frameloop={isInView ? 'always' : 'never'}
      camera={{ position: [0, 1.4, 3.4], fov: isMobile ? 58 : 52 }}
      dpr={isMobile ? 1 : [1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
      }}
      shadows
      style={{ width: '100%', height: '100%' }}
    >
      {/* Atmosphere Fog: Softly blends distant rooms into warm deep spruce */}
      <color attach="background" args={['#0F1B16']} />
      <fog attach="fog" args={['#0F1B16', 9, 38]} />

      {/* Global Warm Sololaki Daylight & Ambient Fill - removes flat dark look */}
      <ambientLight intensity={0.62} color="#FFF4E3" />
      <directionalLight
        position={[-6, 8, 4]}
        intensity={0.68}
        color="#FFEAC6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* 4 Connected Rooms in 3D Space with Interactive Lighting */}
      <Bedroom3D
        position={[0, 0, 0]}
        isActive={roomIdx === 0}
        lightOn={Boolean(roomLights.bedroom)}
        onToggleLight={() => onToggleLight && onToggleLight('bedroom')}
      />
      <Lounge3D
        position={[0, 0, -25]}
        isActive={roomIdx === 1}
        lightOn={Boolean(roomLights.lounge)}
        onToggleLight={() => onToggleLight && onToggleLight('lounge')}
      />
      <Breakfast3D
        position={[0, 0, -50]}
        isActive={roomIdx === 2}
        lightOn={Boolean(roomLights.breakfast)}
        onToggleLight={() => onToggleLight && onToggleLight('breakfast')}
      />
      <Courtyard3D
        position={[0, 0, -75]}
        isActive={roomIdx === 3}
        lightOn={Boolean(roomLights.courtyard)}
        onToggleLight={() => onToggleLight && onToggleLight('courtyard')}
      />

      {/* Camera Flight & Interactive Drag Orbit Controller */}
      <CameraRig scrollProgress={scrollProgress} lookOffset={lookOffset} />
    </Canvas>
  );
}
