import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import FloatingObject from './FloatingObject';
import Particles from './Particles';

export default function Scene({ scrollProgress = 0 }) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        shadows
        className="pointer-events-auto"
      >
        <Suspense fallback={null}>
          {/* Studio Lighting Setup */}
          <ambientLight intensity={0.4} />

          {/* Key Directional Light */}
          <directionalLight
            position={[6, 8, 6]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={0.5}
            shadow-camera-far={25}
            shadow-camera-left={-4}
            shadow-camera-right={4}
            shadow-camera-top={4}
            shadow-camera-bottom={-4}
            shadow-bias={-0.0005}
          />

          {/* Electric Cyan Rim Light for Awwwards Aesthetic */}
          <directionalLight
            position={[-7, 2, -4]}
            intensity={2.8}
            color="#00f0ff"
          />

          {/* Soft Lime Accent Fill Light */}
          <pointLight
            position={[3, -4, 2]}
            intensity={1.2}
            color="#ccff00"
            distance={10}
          />

          {/* Core Interactive 3D Entity */}
          <FloatingObject scrollProgress={scrollProgress} />

          {/* Subtle Ambient Cosmic Particles */}
          <Particles count={70} />

          {/* Realistic Floor Shadow */}
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.65}
            scale={12}
            blur={2.5}
            far={4.5}
          />

          {/* Studio HDRI Environment for realistic metallic reflections */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
