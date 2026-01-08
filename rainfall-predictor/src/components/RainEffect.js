// src/components/RainEffect.js
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function RainEffect() {
  const rainCount = 2000; // 🟢 Slightly denser
  const rainRef = useRef();

  // 🎯 Generate randomized positions for raindrops
  const positions = useMemo(() => {
    const arr = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = Math.random() * 100;
      const z = (Math.random() - 0.5) * 100;
      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, []);

  // 🌧 Animate raindrop fall
  useFrame(() => {
    const positions = rainRef.current.geometry.attributes.position.array;
    for (let i = 1; i < rainCount * 3; i += 3) {
      positions[i] -= 0.3; // 🔽 Slower fall speed
      if (positions[i] < -10) positions[i] = 100;
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15} // 🔽 Smaller for thin raindrop effect
        color="#cceeff" // 💙 Soft bluish-white
        transparent
        opacity={0.45} // 🌫 Slight transparency
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
