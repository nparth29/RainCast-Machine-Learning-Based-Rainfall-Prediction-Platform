// src/components/ThreeScene.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RainEffect from './RainEffect';
import ReflectiveWater from './ReflectiveWater';

export default function ThreeScene() {
  return (
    <>
      {/* ✅ Background Image Layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${process.env.PUBLIC_URL + '/darkscene.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          zIndex: 0,
        }}
      />

      {/* 🌊 Three.js Canvas Layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none', // Let UI remain clickable
        }}
      >
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <RainEffect />
            <ReflectiveWater />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
    </>
  );
}








