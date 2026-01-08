import { useRef } from 'react'; // ✅ useMemo removed
import { useFrame } from '@react-three/fiber';

export default function RippleEffect() {
  const rippleCount = 10;
  const rippleRefs = useRef([]);

  const ripples = useRef(
    Array.from({ length: rippleCount }).map(() => ({
      x: (Math.random() * 2 - 1) * 20,
      z: (Math.random() * 2 - 1) * 20,
      scale: 0.1,
      opacity: 0.5 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 0.5
    }))
  );

  useFrame((_state, delta) => {
    ripples.current.forEach((ripple, i) => {
      ripple.scale += ripple.speed * delta;
      ripple.opacity -= 0.2 * delta;

      if (ripple.opacity <= 0) {
        ripple.x = (Math.random() * 2 - 1) * 20;
        ripple.z = (Math.random() * 2 - 1) * 20;
        ripple.scale = 0.1;
        ripple.opacity = 1;
        ripple.speed = 0.5 + Math.random() * 0.5;
      }

      const mesh = rippleRefs.current[i];
      if (mesh) {
        mesh.position.set(ripple.x, 0, ripple.z);
        mesh.scale.set(ripple.scale, 1, ripple.scale);
        mesh.material.opacity = ripple.opacity;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: rippleCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(ref) => (rippleRefs.current[i] = ref)}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.5, 0.55, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
