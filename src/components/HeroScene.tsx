/// <reference path="../types/third-party.d.ts" />

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#39FF14"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[2, 64, 64]} position={[3, 0, -2]}>
        <MeshDistortMaterial
          color="#059669"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.6}
          wireframe={false}
        />
      </Sphere>
    </Float>
  );
}

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = -state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.2, 16, 16]} position={[-3.5, 1, -1]}>
        <meshBasicMaterial
          color="#10B981"
          transparent
          opacity={0.15}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

function RingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 + Math.PI / 2;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, -1, -3]}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshBasicMaterial color="#39FF14" transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

function SmallOrbs() {
  const orbPositions = useMemo(
    () => [
      [1.5, 2, -1],
      [-2, -1.5, -2],
      [0, 2.5, -4],
      [-1, 0, -1.5],
      [2.5, -1, -3],
    ] as [number, number, number][],
    []
  );

  return (
    <>
      {orbPositions.map((pos, i) => (
        <Float key={i} speed={1 + i * 0.3} rotationIntensity={0.2} floatIntensity={0.5}>
          <Sphere args={[0.08 + i * 0.03, 8, 8]} position={pos}>
            <meshBasicMaterial color="#39FF14" transparent opacity={0.7} />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#10B981" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#39FF14" intensity={1} />
      <pointLight position={[0, 0, 3]} color="#059669" intensity={1.5} />
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />
      <ParticleField />
      <GlowingSphere />
      <WireframeSphere />
      <RingMesh />
      <SmallOrbs />
    </Canvas>
  );
}