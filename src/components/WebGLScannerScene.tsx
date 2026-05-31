"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ScannerPlane() {
  const planeRef = useRef<THREE.Mesh>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (scanLineRef.current) {
      // Move the scanline up and down
      scanLineRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 2;
    }
    if (planeRef.current) {
      // Gentle floating animation for the resume document
      planeRef.current.position.z = Math.sin(state.clock.elapsedTime) * 0.2;
      planeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group rotation={[-0.2, 0.1, 0]}>
      {/* The Resume Document */}
      <mesh ref={planeRef} position={[0, 0, 0]}>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial color="#0A0E23" transparent opacity={0.8} side={THREE.DoubleSide} />
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(3, 4)]} />
          <lineBasicMaterial color="#C9A84C" linewidth={2} />
        </lineSegments>
      </mesh>

      {/* The Volumetric Scanner Line */}
      <mesh ref={scanLineRef} position={[0, 0, 0.1]}>
        <boxGeometry args={[3.5, 0.05, 0.05]} />
        <meshBasicMaterial color="#34D399" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export default function WebGLScannerScene() {
  return (
    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 pointer-events-none opacity-30" style={{ WebkitMaskImage: "radial-gradient(ellipse at right, black 20%, transparent 80%)" }}>
      <Canvas camera={{ position: [2, 0, 6] }}>
        <ScannerPlane />
      </Canvas>
    </div>
  );
}
