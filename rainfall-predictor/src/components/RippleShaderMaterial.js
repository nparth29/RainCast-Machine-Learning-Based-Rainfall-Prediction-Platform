import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// Custom shader material for ripple surface
const RippleShaderMaterial = shaderMaterial(
  { uTime: 0 },
  `
    uniform float uTime;
    varying float vWave;
    void main() {
      vec3 pos = position;
      float dist = length(pos.xz);
      float height = 0.5 * sin(dist * 8.0 - uTime * 2.0) * exp(-dist * 0.5);
      pos.y += height;
      vWave = height;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    varying float vWave;
    void main() {
      vec3 baseColor = vec3(0.2, 0.5, 0.7);
      float intensity = clamp(vWave * 0.5 + 0.5, 0.0, 1.0);
      vec3 color = mix(baseColor * 0.8, baseColor * 1.2, intensity);
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ RippleShaderMaterial });
export { RippleShaderMaterial };
