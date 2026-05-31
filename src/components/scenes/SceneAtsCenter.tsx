"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/* ── Floating ATS Resume Document ── */
function ATSDocument() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Resume document body */}
        <RoundedBox args={[2.4, 3.2, 0.05]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#141B3A" roughness={0.4} metalness={0.1} />
        </RoundedBox>

        {/* Header bar — name section */}
        <mesh position={[0, 1.2, 0.03]}>
          <planeGeometry args={[2.0, 0.25]} />
          <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.3} />
        </mesh>

        {/* Section lines — simulating resume content */}
        {[-0.1, -0.35, -0.55, -0.75, -1.0, -1.2].map((y, i) => (
          <mesh key={i} position={[-0.15, y + 0.6, 0.03]}>
            <planeGeometry args={[1.3 - (i % 3) * 0.2, 0.05]} />
            <meshStandardMaterial
              color={i < 2 ? "#34D399" : i < 4 ? "#C9A84C" : "#F87171"}
              emissive={i < 2 ? "#34D399" : i < 4 ? "#C9A84C" : "#F87171"}
              emissiveIntensity={0.2}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}

        {/* Keyword tags floating */}
        {[
          { text: "ATS", pos: [1.6, 0.8, 0.5] as [number, number, number], color: "#34D399" },
          { text: "KEYWORDS", pos: [-1.7, 0.3, 0.3] as [number, number, number], color: "#C9A84C" },
          { text: "METRICS", pos: [1.5, -0.4, 0.6] as [number, number, number], color: "#60A5FA" },
          { text: "IMPACT", pos: [-1.6, -0.8, 0.4] as [number, number, number], color: "#E8D5A0" },
        ].map((kw, i) => (
          <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.1} floatIntensity={0.5}>
            <mesh position={kw.pos}>
              <planeGeometry args={[0.6, 0.15]} />
              <meshStandardMaterial
                color={kw.color}
                emissive={kw.color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.6}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </Float>
  );
}

/* ── Scanning Laser ── */
function ScanLaser() {
  const laserRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!laserRef.current) return;
    const y = Math.sin(state.clock.elapsedTime * 0.8) * 1.6;
    laserRef.current.position.y = y;
  });

  return (
    <mesh ref={laserRef} position={[0, 0, 0.08]}>
      <planeGeometry args={[2.6, 0.015]} />
      <meshStandardMaterial
        color="#C9A84C"
        emissive="#C9A84C"
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

/* ── Score Gauge Ring ── */
function ScoreGauge() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
  });

  return (
    <group position={[3.5, 0, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.8, 0.04, 16, 64, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Center dot */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#34D399" emissive="#34D399" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

/* ── Scene Internals ── */
function ATSCenterScene() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 3, 4]} intensity={0.7} color="#C9A84C" distance={20} decay={2} />
      <pointLight position={[-3, -2, 2]} intensity={0.3} color="#4B5EAA" distance={15} decay={2} />
      <spotLight
        position={[0, 5, 3]}
        angle={0.5}
        penumbra={0.9}
        intensity={0.4}
        color="#C9A84C"
        distance={20}
        decay={2}
      />

      <ATSDocument />
      <ScanLaser />
      <ScoreGauge />

      <EffectComposer>
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.8} intensity={0.8} mipmapBlur />
        <Vignette offset={0.25} darkness={0.65} />
      </EffectComposer>
    </>
  );
}

/* ── Exported Component ── */
export default function SceneAtsCenter() {
  return (
    <div className="w-full h-full" style={{ minHeight: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ATSCenterScene />
      </Canvas>
    </div>
  );
}
