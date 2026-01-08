// src/components/ReflectiveWater.js
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function ReflectiveWater() {
  const meshRef = useRef();
  const { viewport } = useThree();

  // 🧊 Load seamless water texture
  const waterTexture = useLoader(THREE.TextureLoader, '/textures/water_final.png');
  waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
  waterTexture.repeat.set(10, 10);

  // 💧 Random ripple generator
  const generateRipples = () => {
    const ripples = [];
    for (let i = 0; i < 10; i++) {
      ripples.push(new THREE.Vector2(Math.random(), Math.random()));
    }
    return ripples;
  };

  // 🌊 Shader Uniforms
  const uniforms = useRef({
    uTime: { value: 0 },
    uRippleCenters: { value: generateRipples() },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uTexture: { value: waterTexture },
  });

  // 📏 Resize responsiveness
  useEffect(() => {
    const handleResize = () => {
      uniforms.current.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🌧 Continuous new ripple centers (rain effect)
  useEffect(() => {
    const interval = setInterval(() => {
      uniforms.current.uRippleCenters.value = generateRipples();
    }, 1300); // change ripple every 1.3 seconds
    return () => clearInterval(interval);
  }, []);

  // 🌀 Animate ripple movement
  useFrame((_, delta) => {
    uniforms.current.uTime.value += delta;
  });

  return (
    <mesh
      ref={meshRef}
      rotation-x={-Math.PI / 2}
      position={[0, -11, 0]}
    >
      <planeGeometry args={[200, 40, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
            uniform vec2 uResolution;
            uniform sampler2D uTexture;
            uniform vec2 uRippleCenters[10];
            varying vec2 vUv;

            void main() {
            vec3 texColor = texture2D(uTexture, vUv * 4.0).rgb;
            float rippleSum = 0.0;

            for (int i = 0; i < 10; i++) {
                vec2 center = uRippleCenters[i];
                float dist = distance(vUv, center);

                // ⬆️ Slightly increased wave frequency and density
                float ripple = sin(90.0 * dist - uTime * 8.5) / (120.0 * dist + 0.001);
                rippleSum += ripple;
            }

            vec3 color = texColor + rippleSum * 0.18;  // Slightly more visible wavefronts
            gl_FragColor = vec4(color, 1.0);
            }


        `}
        transparent
      />
    </mesh>
  );
}
