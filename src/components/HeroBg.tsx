import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
} from 'three/tsl';

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP   = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE as any);

// ── Bloom only, no scan line ──────────────────────────────────────────────────
const PostProcessing = ({
  strength  = 1,
  threshold = 1,
}: {
  strength?:  number;
  threshold?: number;
}) => {
  const { gl, scene, camera } = useThree();

  const render = useMemo(() => {
    const postProcessing  = new THREE.PostProcessing(gl as any);
    const scenePass       = pass(scene, camera);
    const scenePassColor  = scenePass.getTextureNode('output');
    const bloomPass       = bloom(scenePassColor, strength, 0.5, threshold);

    postProcessing.outputNode = scenePassColor.add(bloomPass);
    return postProcessing;
  }, [camera, gl, scene, strength, threshold]);

  useFrame(() => {
    render.renderAsync();
  }, 1);

  return null;
};

// ── Blue cellular dot grid ────────────────────────────────────────────────────
const WIDTH  = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const { viewport } = useThree();

  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer  = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);
    const strength  = 0.01;

    const tDepthMap = texture(depthMap);
    const tMap      = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));

    const aspect   = float(WIDTH).div(HEIGHT);
    const tUv      = vec2(uv().x.mul(aspect), uv().y);
    const tiling   = vec2(120.0);
    const tiledUv  = mod(tUv.mul(tiling), 2.0).sub(1.0);

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist       = float(tiledUv.length());
    const dot        = float(smoothstep(0.5, 0.49, dist)).mul(brightness);

    const depth  = tDepthMap.r;
    const flow   = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    // Blue-cyan instead of red
    const mask  = dot.mul(flow).mul(vec3(0, 4, 10));
    const final = blendScreen(tMap, mask);

    const mat = new THREE.MeshBasicNodeMaterial({
      colorNode:   final,
      transparent: true,
      opacity:     0,
    });

    return { material: mat, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock, pointer }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    uniforms.uPointer.value  = pointer;

    if (meshRef.current) {
      const mat = meshRef.current.material as any;
      if ('opacity' in mat) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={[w * 0.4, h * 0.4, 1]}
      position={[viewport.width * 0.27, 0, 0]}
      material={material}
    >
      <planeGeometry />
    </mesh>
  );
};

// ── Background-only export ────────────────────────────────────────────────────
const HeroBg = ({ className = "absolute inset-0 h-full w-full" }: { className?: string }) => (
  <div className={className}>
    <Canvas
      flat
      className="h-full w-full"
      scene={{ background: new THREE.Color(0x000000) }}
      gl={async (props) => {
        const renderer = new THREE.WebGPURenderer(props as any);
        await renderer.init();
        return renderer;
      }}
    >
      <PostProcessing />
      <Scene />
    </Canvas>
  </div>
);

export default HeroBg;