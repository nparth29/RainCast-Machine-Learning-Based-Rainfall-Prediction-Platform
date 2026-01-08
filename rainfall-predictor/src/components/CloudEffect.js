// src/components/AtmosphereEffect.js
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AtmosphereEffect() {
  const count = 1200;
  const meshRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, [count]);

  const scales = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 1.5;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const s = meshRef.current.geometry.attributes.size.array;
    for (let i = 0; i < count; i++) {
      s[i] = 1 + Math.sin(time * 2 + i) * 0.5;
    }
    meshRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={scales}
          count={scales.length}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        color={new THREE.Color('#38bdf8')}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
