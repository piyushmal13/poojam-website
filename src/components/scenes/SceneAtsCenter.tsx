"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Line } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

interface SceneProps {
  scrollProgress?: number;
}

function ScanningResume({ scrollProgress = 0 }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Slow drift & rotate based on scroll
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05 - 0.2 + scrollProgress * 0.4;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} position={[-0.8, 0, 0]}>
        {/* Wireframe Glass Document */}
        <RoundedBox args={[2.5, 3.4, 0.06]} radius={0.05} smoothness={4}>
          <meshPhysicalMaterial
            color="#0E122B"
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.7}
            transmission={0.4}
            thickness={0.5}
            clearcoat={1}
          />
        </RoundedBox>

        {/* Header section (Name) */}
        <mesh position={[0, 1.3, 0.035]}>
          <planeGeometry args={[1.8, 0.2]} />
          <meshBasicMaterial color="#DFBF6D" />
        </mesh>

        {/* Simulating text lines that change color based on scan progress */}
        {[-0.1, -0.4, -0.7, -1.0, -1.3].map((y, idx) => {
          // If the scanning laser has passed this line, it turns gold/green (optimized)
          // The laser Y sweeps from Y=1.5 down to Y=-1.5
          const laserY = 1.5 - scrollProgress * 3.0;
          const isPassed = y > laserY;

          return (
            <mesh key={idx} position={[-0.2, y + 0.6, 0.035]}>
              <planeGeometry args={[1.5 - (idx % 2) * 0.3, 0.06]} />
              <meshBasicMaterial
                color={isPassed ? "#DFBF6D" : "#F87171"} // Gold vs Red
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}

        {/* Metric markers popping up */}
        {scrollProgress > 0.4 && (
          <group position={[1.4, 0.5, 0.2]}>
            <mesh>
              <planeGeometry args={[0.6, 0.25]} />
              <meshBasicMaterial color="#DFBF6D" transparent opacity={0.6} />
            </mesh>
          </group>
        )}
      </group>
    </Float>
  );
}

/* ── Glowing Sweeping Laser Line ── */
function VolumetricLaser({ scrollProgress = 0 }: { scrollProgress: number }) {
  const laserRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!laserRef.current) return;
    // Sweep Y coordinates matching the resume text zones
    laserRef.current.position.y = 1.5 - scrollProgress * 3.0;
  });

  return (
    <mesh ref={laserRef} position={[-0.8, 0, 0.08]}>
      <planeGeometry args={[2.8, 0.02]} />
      <meshBasicMaterial
        color="#DFBF6D"
        transparent
        opacity={0.9 * Math.sin(scrollProgress * Math.PI)}
      />
    </mesh>
  );
}

/* ── HUD Dial / Score Gauge ── */
function BloombergHUDDial({ scrollProgress = 0 }: { scrollProgress: number }) {
  const dialRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!dialRef.current || !ringRef.current) return;
    dialRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05 - 0.3;
    ringRef.current.rotation.z = -scrollProgress * Math.PI * 1.5;
  });

  return (
    <group ref={dialRef} position={[1.6, 0, 0]}>
      {/* Outer circular HUD ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.9, 0.025, 8, 80, Math.PI * 1.8]} />
        <meshBasicMaterial color="#DFBF6D" transparent opacity={0.5} />
      </mesh>

      {/* Solid core indicator */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#34D399" />
      </mesh>
      
      {/* Target scanning brackets */}
      <Line
        points={[
          [-1.1, 1.1, 0],
          [-0.7, 1.1, 0],
          [-1.1, 1.1, 0],
          [-1.1, 0.7, 0],
        ]}
        color="#DFBF6D"
        lineWidth={1.5}
        transparent
        opacity={0.3}
      />
      <Line
        points={[
          [1.1, -1.1, 0],
          [0.7, -1.1, 0],
          [1.1, -1.1, 0],
          [1.1, -0.7, 0],
        ]}
        color="#DFBF6D"
        lineWidth={1.5}
        transparent
        opacity={0.3}
      />
    </group>
  );
}

function ScanEngineScene({ scrollProgress = 0 }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.12} />
      <pointLight position={[0, 4, 3]} intensity={0.5} color="#DFBF6D" />
      <pointLight position={[-3, -2, 2]} intensity={0.2} color="#1C2548" />

      <ScanningResume scrollProgress={scrollProgress} />
      <VolumetricLaser scrollProgress={scrollProgress} />
      <BloombergHUDDial scrollProgress={scrollProgress} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.4} mipmapBlur />
        <Vignette offset={0.3} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export default function SceneAtsCenter({ scrollProgress = 0 }: SceneProps) {
  return (
    <div className="w-full h-full min-h-screen bg-transparent pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
      >
        <ScanEngineScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
