import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef } from 'react';
import * as THREE from 'three';

export default function FogEffect() {
  const fogColor = "#eeeeee";
  const fogDensity = 0.05;

  useThree(({ scene }) => {
    scene.fog = new THREE.FogExp2(fogColor, fogDensity);
    return () => { scene.fog = null; };
  });

  const fogTexture = useLoader(TextureLoader, process.env.PUBLIC_URL + "/textures/fog.png");
  fogTexture.wrapS = fogTexture.wrapT = THREE.RepeatWrapping;

  const fogPlane1 = useRef(null);
  const fogPlane2 = useRef(null);

  useFrame((state, delta) => {
    if (fogPlane1.current) {
      fogPlane1.current.material.map.offset.x += 0.01 * delta;
      fogPlane1.current.material.map.offset.y += 0.01 * delta;
    }
    if (fogPlane2.current) {
      fogPlane2.current.material.map.offset.x -= 0.01 * delta;
      fogPlane2.current.material.map.offset.y += 0.005 * delta;
    }
  });

  return (
    <group>
      <mesh ref={fogPlane1} position={[0, 5, -10]}>
        <planeGeometry args={[50, 50]} />
        <meshLambertMaterial map={fogTexture} transparent opacity={0.2} depthWrite={false} />
      </mesh>
      <mesh ref={fogPlane2} position={[0, 5, 10]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshLambertMaterial map={fogTexture} transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </group>
  );
}
