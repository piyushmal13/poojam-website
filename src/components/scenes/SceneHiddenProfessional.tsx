"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Text } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/* ── Floating Resume Document ── */
function ResumeSheet({
  position,
  rotation,
  opacity,
  color,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  opacity: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[0.8, 1.1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

/* ── Opportunity Particles ── */
function OpportunityField({ count = 300 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 14,
      z: (Math.random() - 0.5) * 12,
      speed: 0.002 + Math.random() * 0.004,
      isGold: Math.random() < 0.1,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.y += Math.sin(state.clock.elapsedTime * p.speed * 100 + i) * 0.003;
      p.x += Math.cos(state.clock.elapsedTime * p.speed * 50 + i) * 0.002;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.isGold ? 0.06 : 0.03);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#C9A84C"
        emissive="#C9A84C"
        emissiveIntensity={0.4}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

/* ── Central Figure Silhouette ── */
function CentralFigure() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.4, 1.2, 8, 16]} />
        <MeshDistortMaterial
          color="#1C2548"
          emissive="#C9A84C"
          emissiveIntensity={0.05}
          roughness={0.8}
          metalness={0.2}
          distort={0.15}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/* ── 3D Scene Internals ── */
function HiddenProfessionalScene() {
  const resumes = useMemo(() => {
    const items: { pos: [number, number, number]; rot: [number, number, number]; opacity: number; color: string }[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      items.push({
        pos: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius - 2,
        ],
        rot: [
          Math.random() * 0.5,
          angle + Math.random() * 0.5,
          Math.random() * 0.3,
        ],
        opacity: 0.15 + Math.random() * 0.25,
        color: Math.random() > 0.7 ? "#C9A84C" : "#232D58",
      });
    }
    return items;
  }, []);

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 5, 3]} intensity={0.8} color="#C9A84C" distance={20} decay={2} />
      <pointLight position={[-4, -2, -3]} intensity={0.3} color="#4B5EAA" distance={15} decay={2} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.5}
        color="#C9A84C"
        distance={25}
        decay={2}
      />

      <CentralFigure />
      <OpportunityField />

      {resumes.map((r, i) => (
        <ResumeSheet key={i} position={r.pos} rotation={r.rot} opacity={r.opacity} color={r.color} />
      ))}

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={0.6}
          mipmapBlur
        />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

/* ── Exported Component ── */
export default function SceneHiddenProfessional() {
  return (
    <div className="w-full h-full" style={{ minHeight: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <HiddenProfessionalScene />
      </Canvas>
    </div>
  );
}
