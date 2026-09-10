import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Chandelier from './Chandelier';

export default function ChandelierScene({ mouse, scrollProgress = 0 }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Subtle fade-in transition when 3D scene compiles
    const timer = setTimeout(() => setIsLoaded(true), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="canvas-wrapper">
      {/* Loading state indicator */}
      <div
        className="canvas-loader"
        style={{
          opacity: isLoaded ? 0 : 1,
          pointerEvents: isLoaded ? 'none' : 'auto',
        }}
      >
        <div className="spinner-ring" />
        <span className="loader-text">სცენის მომზადება...</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.3], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Suspense fallback={null}>
          {/* Architectural Ambient & Warm Direct Sunlight */}
          <ambientLight intensity={0.55} color="#F3EFE6" />

          <directionalLight
            position={[5, 6, 4]}
            intensity={1.5}
            color="#FFF5E4"
          />

          {/* Deep Forest Fill Light */}
          <directionalLight
            position={[-4, -3, -2]}
            intensity={0.4}
            color="#1B3329"
          />

          {/* Core Physical Brass & Glass Chandelier with Sphere */}
          <Chandelier mouse={mouse} scrollProgress={scrollProgress} />

          {/* Studio reflections */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      <div className="chandelier-caption">
        არქიტექტურული სანათი &bull; 1894
      </div>
    </div>
  );
}
