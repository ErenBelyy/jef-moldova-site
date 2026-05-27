"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// ─── Geometry: EU Parliament Hemicycle ───────────────────────────────────────

function ParliamentBuilding({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state: RootState) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15 + 0.2;
  });

  // Hemicycle rows — build from bottom up based on progress
  const rows = useMemo(() => {
    const data: { radius: number; y: number; seats: number }[] = [];
    for (let i = 0; i < 8; i++) {
      data.push({
        radius: 1.4 + i * 0.22,
        y: i * 0.08,
        seats: 30 + i * 8,
      });
    }
    return data;
  }, []);

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Ground plane */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial
          color="#051a0e"
          transparent
          opacity={Math.min(1, progress * 3)}
          roughness={0.8}
        />
      </mesh>

      {/* Main hall floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 3.5, 64, 1, -Math.PI * 0.05, Math.PI * 1.1]} />
        <meshStandardMaterial
          color="#041a0d"
          transparent
          opacity={Math.min(1, progress * 2)}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Hemicycle seat rows — appear progressively */}
      {rows.map((row, i) => {
        const rowProgress = Math.max(0, (progress - i * 0.1) / 0.2);
        if (rowProgress <= 0) return null;
        const clampedP = Math.min(1, rowProgress);

        return (
          <group key={i}>
            {/* Row arc */}
            <mesh position={[0, row.y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry
                args={[row.radius - 0.05, row.radius + 0.02, 64, 1, -Math.PI * 0.05, Math.PI * 1.1]}
              />
              <meshStandardMaterial
                color="#0a3d1f"
                transparent
                opacity={clampedP * 0.9}
                roughness={0.5}
                metalness={0.3}
              />
            </mesh>

            {/* Individual seats */}
            {Array.from({ length: Math.floor(row.seats * clampedP) }).map((_, j) => {
              const angle = -0.05 * Math.PI + (j / (row.seats - 1)) * Math.PI * 1.1;
              const x = Math.cos(angle) * row.radius;
              const z = Math.sin(angle) * row.radius;
              const isLit = j % 3 === 0;
              return (
                <mesh key={j} position={[x, row.y + 0.06, z]}>
                  <boxGeometry args={[0.08, 0.06, 0.07]} />
                  <meshStandardMaterial
                    color={isLit ? "#10B981" : "#0d5c2a"}
                    emissive={isLit ? "#39FF14" : "#000000"}
                    emissiveIntensity={isLit ? 0.3 : 0}
                    transparent
                    opacity={clampedP}
                    roughness={0.4}
                    metalness={0.6}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}

      {/* Central podium — speaker's platform */}
      {progress > 0.4 && (
        <group position={[0, 0, 0.8]}>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.3, 0.35, 0.2, 16]} />
            <meshStandardMaterial
              color="#059669"
              transparent
              opacity={Math.min(1, (progress - 0.4) * 4)}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
          {/* Podium screen glow */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.25, 0.15, 0.02]} />
            <meshStandardMaterial
              color="#39FF14"
              emissive="#39FF14"
              emissiveIntensity={0.8}
              transparent
              opacity={Math.min(1, (progress - 0.5) * 5)}
            />
          </mesh>
        </group>
      )}

      {/* Side towers — iconic EU Parliament towers */}
      {[[-2.8, 0, 1.2], [2.8, 0, 1.2]].map(([x, y, z], i) => {
        const towerProgress = Math.max(0, (progress - 0.5) / 0.4);
        if (towerProgress <= 0) return null;
        const clampedT = Math.min(1, towerProgress);
        return (
          <group key={i} position={[x, y, z]}>
            <mesh position={[0, clampedT * 1.5 * 0.5, 0]}>
              <boxGeometry args={[0.3, clampedT * 1.5, 0.3]} />
              <meshStandardMaterial
                color="#041a0d"
                transparent
                opacity={clampedT}
                roughness={0.4}
                metalness={0.5}
              />
            </mesh>
            {/* Windows */}
            {Array.from({ length: Math.floor(clampedT * 6) }).map((_, w) => (
              <mesh key={w} position={[0, 0.15 + w * 0.22, 0.16]}>
                <boxGeometry args={[0.06, 0.08, 0.01]} />
                <meshStandardMaterial
                  color="#39FF14"
                  emissive="#39FF14"
                  emissiveIntensity={0.9}
                  transparent
                  opacity={clampedT * 0.8}
                />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Curved glass roof — the iconic dome */}
      {progress > 0.7 && (
        <mesh position={[0, 0.9, 0.6]} rotation={[0.1, 0, 0]}>
          <torusGeometry args={[1.9, 0.06, 8, 64, Math.PI * 1.1]} />
          <meshStandardMaterial
            color="#10B981"
            transparent
            opacity={Math.min(1, (progress - 0.7) * 5) * 0.6}
            roughness={0.1}
            metalness={0.9}
            wireframe
          />
        </mesh>
      )}

      {/* EU Stars ring at the top — appears last */}
      {progress > 0.85 &&
        Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const starProgress = Math.min(1, (progress - 0.85) * 8);
          const staggered = Math.min(1, Math.max(0, (progress - 0.85 - i * 0.01) * 10));
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 2.2,
                2.2,
                Math.sin(angle) * 0.8 + 0.6,
              ]}
              scale={staggered * 0.06}
            >
              <octahedronGeometry args={[1]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={1.5}
                transparent
                opacity={staggered * 0.95}
              />
            </mesh>
          );
        })}
    </group>
  );
}

// ─── Floating particles ───────────────────────────────────────────────────────
function Particles({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 600;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4;
    }
    return pos;
  }, []);

  useFrame((s: any) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = s.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#39FF14" transparent opacity={progress * 0.4} sizeAttenuation />
    </points>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ progress }: { progress: number }) {
  return (
    <>
      <ambientLight intensity={0.3} color="#051a0e" />
      <pointLight position={[0, 5, 3]} color="#10B981" intensity={3} />
      <pointLight position={[-4, 2, 0]} color="#39FF14" intensity={1.5} />
      <pointLight position={[4, 2, 0]} color="#059669" intensity={1.5} />
      <pointLight position={[0, 1, 4]} color="#FFD700" intensity={0.8 * progress} />
      <Particles progress={progress} />
      <ParliamentBuilding progress={progress} />
    </>
  );
}

// ─── Loader UI ────────────────────────────────────────────────────────────────
const LOADING_MESSAGES = [
  "Inițializare sisteme...",
  "Construim Parlamentul European...",
  "Activare noduri democratice...",
  "Conectare la rețeaua JEF...",
  "Pregătim viitorul Europei...",
  "Bine ai venit în JEF Moldova.",
];

export function EUParliamentLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += 0.008 + Math.random() * 0.004;
      if (p >= 1) {
        p = 1;
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 900);
        }, 600);
      }
      setProgress(p);
      const msgIdx = Math.floor(p * (LOADING_MESSAGES.length - 1));
      setMessageIndex(msgIdx);
    }, 24);

    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-jef-dark overflow-hidden"
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* Radial glow */}
          <div className="absolute inset-0 bg-gradient-radial from-emerald-900/30 via-transparent to-transparent" />

          {/* 3D Canvas */}
          <div className="relative w-full max-w-[560px] h-[340px] mx-auto">
            <Canvas
              camera={{ position: [0, 2.5, 6], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
            >
              <Scene progress={progress} />
            </Canvas>

            {/* Scan-line sweep */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent pointer-events-none"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Text block */}
          <div className="relative z-10 flex flex-col items-center gap-6 mt-4 px-6 w-full max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="font-display font-bold text-sm text-black">JEF</span>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">JEF Moldova</span>
            </div>

            {/* Message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sm text-emerald-400/80 tracking-widest text-center"
              >
                {LOADING_MESSAGES[messageIndex]}
              </motion.p>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs text-white/20">CONSTRUIRE</span>
                <span className="font-mono text-xs text-emerald-400">
                  {Math.round(progress * 100)}%
                </span>
              </div>
              <div className="h-px w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-600 via-green-400 to-lime-400 rounded-full"
                  style={{ width: `${progress * 100}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              {/* Glow under bar */}
              <div
                className="h-px mt-0.5 bg-gradient-to-r from-emerald-600/30 to-lime-400/30 rounded-full blur-sm"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* EU Stars indicator */}
            <div className="flex gap-2 mt-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  animate={{
                    backgroundColor:
                      progress > (i / 12) * 0.85
                        ? "#FFD700"
                        : "rgba(255,255,255,0.1)",
                    boxShadow:
                      progress > (i / 12) * 0.85
                        ? "0 0 6px #FFD700"
                        : "none",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}