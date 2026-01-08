// src/components/TextTitle.js
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three';

export default function TextTitle() {
  const meshRef = useRef();

  // Load font from public/fonts/
  const font = useLoader(FontLoader, '/fonts/helvetiker_regular.typeface.json');


  // Animate slight floating effect
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.1; // subtle sway
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.1 + 2.5; // floating at top center
  });

  return (
    <group position={[0, 2.5, 0]}>
      <Text3D
        ref={meshRef}
        font={font}
        size={1}
        height={0.3}
        curveSegments={20}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.05}
        bevelSegments={10}
      >
        Rainfall Predictor
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00e5ff"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </Text3D>
    </group>
  );
}
