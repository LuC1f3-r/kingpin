'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import fragment from '@/lib/glsl/neuralGradient.frag';
import vertex from '@/lib/glsl/neuralGradient.vert';

function NeuralPlane() {
  const material = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.u_time.value = state.clock.getElapsedTime();
    material.current.uniforms.u_resolution.value.set(state.viewport.width, state.viewport.height);
  });

  const scale = stateScale();

  return (
    <mesh scale={[scale, scale, 1]}>
      <planeGeometry args={[4, 4, 256, 256]} />
      <shaderMaterial
        ref={material}
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={{
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(1, 1) }
        }}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function stateScale() {
  if (typeof window === 'undefined') return 5;
  return window.innerWidth > 1024 ? 6 : 5;
}

function ParticleField() {
  const points = useMemo(() => {
    const positions = new Float32Array(4000 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = Math.random() * 0.5;
    }
    return positions;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });
  return (
    <points ref={ref} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#9df7ff" transparent opacity={0.6} />
    </points>
  );
}

export function OrbScene() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={[1, 1.5]}>
      <color attach="background" args={["#03040a"]} />
      <ambientLight intensity={0.3} />
      <Suspense fallback={null}>
        <NeuralPlane />
        <ParticleField />
      </Suspense>
    </Canvas>
  );
}
