"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/* ── City node data ── */
interface CityData {
  name: string;
  lat: number;
  lon: number;
  placements: number;
  industry: string;
  salary: string;
}

const CITIES: CityData[] = [
  { name: "Mumbai", lat: 19.07, lon: 72.87, placements: 180, industry: "Finance", salary: "₹28L avg" },
  { name: "Pune", lat: 18.52, lon: 73.85, placements: 95, industry: "Tech Ops", salary: "₹21L avg" },
  { name: "Bangalore", lat: 12.97, lon: 77.59, placements: 120, industry: "Product", salary: "₹32L avg" },
  { name: "Delhi", lat: 28.61, lon: 77.21, placements: 65, industry: "Sales", salary: "₹26L avg" },
  { name: "Hyderabad", lat: 17.38, lon: 78.47, placements: 45, industry: "Analytics", salary: "₹24L avg" },
  { name: "Chennai", lat: 13.08, lon: 80.27, placements: 30, industry: "IT Services", salary: "₹20L avg" },
  { name: "Ahmedabad", lat: 23.02, lon: 72.57, placements: 20, industry: "Operations", salary: "₹18L avg" },
  { name: "Kolkata", lat: 22.57, lon: 88.36, placements: 15, industry: "Finance", salary: "₹16L avg" },
  { name: "Dubai", lat: 25.20, lon: 55.27, placements: 12, industry: "Exec", salary: "$85K avg" },
  { name: "Singapore", lat: 1.35, lon: 103.82, placements: 8, industry: "Strategy", salary: "S$95K avg" },
];

/* Convert lat/lon to 3D sphere coordinates */
function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* ── India Network Globe ── */
function Globe({ radius = 3 }: { radius?: number }) {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  // Wireframe sphere
  const wireframeGeo = useMemo(() => new THREE.SphereGeometry(radius, 36, 18), [radius]);

  // City positions on sphere
  const cityPositions = useMemo(
    () => CITIES.map((c) => latLonToVec3(c.lat, c.lon, radius)),
    [radius]
  );

  // Mumbai origin index
  const mumbaiIdx = 0;
  const mumbaiPos = cityPositions[mumbaiIdx];

  // Arc curves from Mumbai to each city
  const arcs = useMemo(() => {
    return cityPositions.slice(1).map((target) => {
      const mid = new THREE.Vector3().addVectors(mumbaiPos, target).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(radius * 1.3);
      const curve = new THREE.QuadraticBezierCurve3(mumbaiPos, mid, target);
      return curve.getPoints(40);
    });
  }, [cityPositions, mumbaiPos, radius]);

  return (
    <group ref={globeRef}>
      {/* Wireframe globe */}
      <mesh geometry={wireframeGeo}>
        <meshStandardMaterial
          color="#1C2548"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Solid inner glow sphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 32, 16]} />
        <meshStandardMaterial
          color="#0A0E23"
          transparent
          opacity={0.85}
          roughness={1}
        />
      </mesh>

      {/* City nodes */}
      {cityPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Glow sphere */}
          <mesh>
            <sphereGeometry args={[i === mumbaiIdx ? 0.12 : 0.06, 16, 16]} />
            <meshStandardMaterial
              color={i === mumbaiIdx ? "#C9A84C" : "#E8D5A0"}
              emissive={i === mumbaiIdx ? "#C9A84C" : "#E8D5A0"}
              emissiveIntensity={i === mumbaiIdx ? 1.5 : 0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Pulse ring */}
          {i === mumbaiIdx && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.15, 0.2, 32]} />
              <meshStandardMaterial
                color="#C9A84C"
                emissive="#C9A84C"
                emissiveIntensity={0.8}
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Arc pathways from Mumbai */}
      {arcs.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#C9A84C"
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}
    </group>
  );
}

/* ── Ambient Stars ── */
function StarField({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const stars = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 30,
        z: (Math.random() - 0.5) * 30 - 10,
      })),
    [count]
  );

  useFrame(() => {
    if (!ref.current) return;
    stars.forEach((s, i) => {
      dummy.position.set(s.x, s.y, s.z);
      dummy.scale.setScalar(0.02 + Math.random() * 0.01);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#5E6B8A" transparent opacity={0.4} />
    </instancedMesh>
  );
}

/* ── Scene Internals ── */
function IndiaNetworkScene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#C9A84C" distance={30} decay={2} />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#4B5EAA" distance={20} decay={2} />

      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <Globe />
      </Float>

      <StarField />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.8} intensity={0.7} mipmapBlur />
        <Vignette offset={0.3} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

/* ── Exported Component ── */
export default function SceneIndiaNetwork() {
  return (
    <div className="w-full h-full" style={{ minHeight: "100vh" }}>
      <Canvas
        camera={{ position: [0, 1, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <IndiaNetworkScene />
      </Canvas>
    </div>
  );
}

export { CITIES };
