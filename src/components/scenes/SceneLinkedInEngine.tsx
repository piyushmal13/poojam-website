"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Line } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

interface SceneProps {
  scrollProgress?: number;
}

function LinkedInBlock({
  position,
  scatterPos,
  size,
  color,
  scrollProgress,
  label,
}: {
  position: [number, number, number];
  scatterPos: [number, number, number];
  size: [number, number, number];
  color: string;
  scrollProgress: number;
  label: string;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Linear interpolate position based on scrollProgress
    const currentX = THREE.MathUtils.lerp(scatterPos[0], position[0], scrollProgress);
    const currentY = THREE.MathUtils.lerp(scatterPos[1], position[1], scrollProgress);
    const currentZ = THREE.MathUtils.lerp(scatterPos[2], position[2], scrollProgress);

    meshRef.current.position.set(currentX, currentY, currentZ);

    // Subtle drift rotation when not locked
    const driftSpeed = 0.5 + Math.random() * 0.5;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      Math.sin(state.clock.elapsedTime * driftSpeed) * 0.1,
      0,
      scrollProgress
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      Math.cos(state.clock.elapsedTime * driftSpeed * 0.5) * 0.05,
      0,
      scrollProgress
    );
  });

  return (
    <group ref={meshRef}>
      {/* 3D Glass Block */}
      <RoundedBox args={size} radius={0.03} smoothness={3}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          transparent
          opacity={THREE.MathUtils.lerp(0.3, 0.75, scrollProgress)}
          transmission={0.3}
          thickness={0.2}
          clearcoat={1}
        />
      </RoundedBox>

      {/* Wireframe border glow when locked */}
      {scrollProgress > 0.95 && (
        <mesh>
          <boxGeometry args={[size[0] + 0.02, size[1] + 0.02, size[2] + 0.02]} />
          <meshBasicMaterial color="#DFBF6D" wireframe transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}

function ProfileAssembly({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Rotate assembly isometrically on scroll
    groupRef.current.rotation.y = -0.4 + scrollProgress * 0.4;
    groupRef.current.rotation.x = 0.25;
  });

  // Scattered initial points and target structural positions
  const blocks = [
    { label: "HEADER", pos: [0, 1.2, 0] as [number, number, number], scatter: [-2.5, 2.0, -1.0] as [number, number, number], size: [2.2, 0.5, 0.08] as [number, number, number], color: "#1C2548" },
    { label: "HEADLINE", pos: [0, 0.6, 0] as [number, number, number], scatter: [2.0, 1.5, 1.0] as [number, number, number], size: [2.2, 0.4, 0.08] as [number, number, number], color: "#0E122B" },
    { label: "EXPERIENCE", pos: [0, -0.1, 0] as [number, number, number], scatter: [-1.8, -1.2, 1.5] as [number, number, number], size: [2.2, 0.7, 0.08] as [number, number, number], color: "#DFBF6D" },
    { label: "SKILLS", pos: [0, -0.7, 0] as [number, number, number], scatter: [2.2, -1.5, -1.0] as [number, number, number], size: [2.2, 0.3, 0.08] as [number, number, number], color: "#1C2548" },
    { label: "RECOMMENDATIONS", pos: [0, -1.2, 0] as [number, number, number], scatter: [0, -2.5, 2.0] as [number, number, number], size: [2.2, 0.4, 0.08] as [number, number, number], color: "#0E122B" },
  ];

  return (
    <group ref={groupRef} position={[-0.8, 0, 0]}>
      {blocks.map((b, idx) => (
        <LinkedInBlock
          key={idx}
          position={b.pos}
          scatterPos={b.scatter}
          size={b.size}
          color={b.color}
          scrollProgress={scrollProgress}
          label={b.label}
        />
      ))}
    </group>
  );
}

/* ── SSI Gauge Ring ── */
function SSIGaugeHUD({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !pointerRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05 + 0.3;
    pointerRef.current.rotation.z = -scrollProgress * Math.PI * 1.3;
  });

  return (
    <group ref={groupRef} position={[1.8, 0, 0]} rotation={[0.2, 0, 0]}>
      {/* Outer segmented ring */}
      <mesh>
        <torusGeometry args={[0.8, 0.02, 8, 64, Math.PI * 1.4]} />
        <meshBasicMaterial color="#DFBF6D" transparent opacity={0.3} />
      </mesh>

      {/* Progress arc ring */}
      <mesh ref={pointerRef}>
        <torusGeometry args={[0.82, 0.03, 8, 64, scrollProgress * Math.PI * 1.3]} />
        <meshBasicMaterial color="#DFBF6D" />
      </mesh>

      {/* Gauge brackets */}
      <Line
        points={[
          [-0.9, 0.9, 0],
          [-0.6, 0.9, 0],
          [-0.9, 0.9, 0],
          [-0.9, 0.6, 0],
        ]}
        color="#1C2548"
        lineWidth={1.5}
      />
      <Line
        points={[
          [0.9, -0.9, 0],
          [0.6, -0.9, 0],
          [0.9, -0.9, 0],
          [0.9, -0.6, 0],
        ]}
        color="#1C2548"
        lineWidth={1.5}
      />
    </group>
  );
}

function LinkedInEngineScene({ scrollProgress = 0 }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 4, 3]} intensity={0.6} color="#DFBF6D" />
      <pointLight position={[-3, -2, 2]} intensity={0.2} color="#1C2548" />

      <ProfileAssembly scrollProgress={scrollProgress} />
      <SSIGaugeHUD scrollProgress={scrollProgress} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.3} mipmapBlur />
        <Vignette offset={0.3} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export default function SceneLinkedInEngine({ scrollProgress = 0 }: SceneProps) {
  return (
    <div className="w-full h-full min-h-screen bg-transparent pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
      >
        <LinkedInEngineScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
