"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

interface SceneProps {
  scrollProgress?: number;
}

function FiltrationParticles({ scrollProgress = 0 }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 2000;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate initial particle states
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Random position in a column
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 12 + 2; // Initial spread
      const z = (Math.random() - 0.5) * 6;
      
      // Determine if this particle is one of the "survivors" (only 5% survive in gold)
      const isSurvivor = Math.random() < 0.05;
      
      // Dissolve trajectory when filtered
      const angle = Math.random() * Math.PI * 2;
      const scatterX = Math.cos(angle) * (2 + Math.random() * 4);
      const scatterZ = Math.sin(angle) * (2 + Math.random() * 4);
      
      data.push({
        x,
        y,
        z,
        isSurvivor,
        scatterX,
        scatterZ,
        speed: 0.2 + Math.random() * 0.8,
        noiseSeed: Math.random() * 100,
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Define scanning laser plane Y coordinate
    // It sweeps from Y = 6 down to Y = -6
    const laserY = 6 - scrollProgress * 12;

    particles.forEach((p, i) => {
      let currentX = p.x;
      let currentY = p.y - scrollProgress * 4; // Constant downward drift
      let currentZ = p.z;
      let scale = 0.035;

      const isBelowLaser = currentY < laserY;

      if (!isBelowLaser) {
        // Particle has been crossed by the filter laser plane!
        if (p.isSurvivor) {
          // Survivors glow gold and gravitate smoothly to a tight center core
          const targetX = 0;
          const targetY = -1.5;
          const targetZ = 0;
          
          const t = Math.min((currentY - laserY) / 3, 1); // transition factor
          currentX = THREE.MathUtils.lerp(currentX, targetX, t * 0.1);
          currentY = THREE.MathUtils.lerp(currentY, targetY, t * 0.1);
          currentZ = THREE.MathUtils.lerp(currentZ, targetZ, t * 0.1);
          scale = 0.05 + Math.sin(state.clock.elapsedTime * 3 + p.noiseSeed) * 0.01;
        } else {
          // ReJECTED profiles dissolve outward, turn red, and shrink to zero
          const t = Math.min((currentY - laserY) / 2, 1);
          currentX = THREE.MathUtils.lerp(currentX, p.x + p.scatterX, t * 0.5);
          currentY -= t * 2; // Rapid fall/dissolve
          currentZ = THREE.MathUtils.lerp(currentZ, p.z + p.scatterZ, t * 0.5);
          scale = THREE.MathUtils.lerp(0.035, 0.0, t);
        }
      } else {
        // Normal state before scanning
        // Add subtle wave noise
        currentY += Math.sin(state.clock.elapsedTime * 0.5 + p.noiseSeed) * 0.02;
        currentX += Math.cos(state.clock.elapsedTime * 0.2 + p.noiseSeed) * 0.01;
      }

      dummy.position.set(currentX, currentY, currentZ);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      // We pass custom colors: survivors are gold, rejected are red/obsidian
      let color = new THREE.Color("#B8C0D0"); // Default platinum
      if (!isBelowLaser) {
        if (p.isSurvivor) {
          color.set("#DFBF6D"); // Premium Gold
        } else {
          // Dissolving into faint red
          const t = Math.min((currentY - laserY) / 2, 1);
          color.lerp(new THREE.Color("#F87171"), t);
        }
      }
      meshRef.current!.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial transparent opacity={0.8} />
    </instancedMesh>
  );
}

/* ── Sweeping Laser Filter Plane ── */
function FilterLaserPlane({ scrollProgress = 0 }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    // Sweep Y coordinates matching the filtration particles
    meshRef.current.position.y = 6 - scrollProgress * 12;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[15, 6]} />
      <meshBasicMaterial
        color="#F87171"
        transparent
        opacity={0.15 * Math.sin(scrollProgress * Math.PI)}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function HiddenProfessionalScene({ scrollProgress = 0 }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 4, 2]} intensity={0.4} color="#DFBF6D" />
      <pointLight position={[0, -4, 2]} intensity={0.2} color="#F87171" />

      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
        <FiltrationParticles scrollProgress={scrollProgress} />
      </Float>

      <FilterLaserPlane scrollProgress={scrollProgress} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.2} mipmapBlur />
        <Vignette offset={0.3} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export default function SceneHiddenProfessional({ scrollProgress = 0 }: SceneProps) {
  return (
    <div className="w-full h-full min-h-screen bg-transparent pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
      >
        <HiddenProfessionalScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
