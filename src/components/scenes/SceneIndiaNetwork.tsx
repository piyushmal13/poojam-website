"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Html } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

interface CityNode {
  name: string;
  pos: [number, number, number];
  industry: string;
  role: string;
  salary: string;
  interviews: string;
  story: string;
}

const CITY_NODES: CityNode[] = [
  { name: "Mumbai", pos: [0, 0, 0], industry: "Finance", role: "VP Investment Banking", salary: "₹28L → ₹58L", interviews: "6.5x Increase", story: "Repositioned from general compliance to high-value M&A advisory." },
  { name: "Delhi", pos: [-0.3, 1.6, 0.1], industry: "IT", role: "Director of Engineering", salary: "₹35L → ₹68L", interviews: "4.0x Increase", story: "Reframed technical leadership from 'managing servers' to 'platform scaling'." },
  { name: "Bangalore", pos: [0.3, -1.2, 0.1], industry: "Product", role: "Principal Product Manager", salary: "₹24L → ₹52L", interviews: "5.5x Increase", story: "Extracted and high-lighted cross-functional GTM metrics for MAU growth." },
  { name: "Pune", pos: [-0.1, -0.2, 0.05], industry: "Automotive", role: "Senior Operations Director", salary: "₹20L → ₹42L", interviews: "4.8x Increase", story: "Transformed tactical supply-chain oversight into strategic P&L impact." },
  { name: "Hyderabad", pos: [0.4, -0.6, 0.1], industry: "Analytics", role: "Head of Data Science", salary: "₹18L → ₹38L", interviews: "5.0x Increase", story: "Showcased business intelligence ROI rather than database queries." },
  { name: "Chennai", pos: [0.6, -1.3, 0.1], industry: "Logistics", role: "VP Global Supply Chain", salary: "₹22L → ₹45L", interviews: "3.5x Increase", story: "Mapped regional warehouse restructuring directly to ₹4.5Cr cost savings." },
  { name: "Ahmedabad", pos: [-0.5, 0.5, 0.05], industry: "Pharma", role: "VP Global Quality Assurance", salary: "₹18L → ₹36L", interviews: "4.2x Increase", story: "Audit-first resume alignment that unlocked key multinational shortlist calls." },
  { name: "Kolkata", pos: [1.8, 0.8, 0.15], industry: "Retail", role: "Director of Digital Strategy", salary: "₹16L → ₹34L", interviews: "3.8x Increase", story: "Repositioned legacy retail framework experience into modern e-commerce GTM." },
  { name: "Dubai", pos: [-3.5, 0.8, -0.4], industry: "Exec Advisory", role: "Partner, Consulting", salary: "$120K → $220K", interviews: "6.0x Increase", story: "Cross-border strategy repositioning tailored for sovereign wealth clients." },
  { name: "Singapore", pos: [4.2, -2.0, -0.6], industry: "Fintech", role: "APAC Head of Strategy", salary: "S$130K → S$250K", interviews: "5.2x Increase", story: "Secured high-stakes inbound recruiter interest via SSI optimization." },
  { name: "London", pos: [-5.0, 3.2, -1.2], industry: "Banking", role: "Managing Director, Risk", salary: "£140K → £260K", interviews: "4.5x Increase", story: "Aligned European compliance auditing expertise for C-Suite advisory roles." },
  { name: "Toronto", pos: [-6.8, 3.8, -1.5], industry: "SaaS", role: "VP Customer Success", salary: "C$110K → C$210K", interviews: "5.0x Increase", story: "Turned retention metrics into customer lifecycle expansion stories." }
];

/* ── India Particle Contour Mesh ── */
function IndiaHologramGrid() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particles that form a stunning stylized outline of India in space
  const particles = useMemo(() => {
    const coords = [];
    const count = 1600;

    for (let i = 0; i < count; i++) {
      // Approximate map shapes using height zones
      const y = (Math.random() - 0.5) * 5 + 0.5; // -2 to 3
      let width = 0;
      let xOffset = 0;

      if (y < 0) {
        // Peninsula Tip -> Middle India
        const t = (y + 2.5) / 2.5; // 0 to 1
        width = t * 1.5;
        xOffset = -0.2 * (1 - t);
      } else if (y >= 0 && y < 1.6) {
        // Central India to North broadness
        width = 2.0 - (y / 1.6) * 0.6;
        xOffset = 0.1 * y;
      } else {
        // Kashmir (Karakoram north)
        const t = (y - 1.6) / 1.4;
        width = 0.8 * (1 - t) + 0.1;
        xOffset = -0.15;
      }

      // Add Eastern Wing (Northeast India)
      if (y > 0.3 && y < 1.3 && Math.random() < 0.25) {
        width = 1.0;
        xOffset = 1.6;
      }

      const x = (Math.random() - 0.5) * width * 1.8 + xOffset;
      const z = (Math.random() - 0.5) * 0.4 + (Math.sin(y * 2) * 0.1); // Add subtle depth wave
      
      coords.push(x, y, z);
    }
    return new Float32Array(coords);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Ambient wave motion
    pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#1C2548"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.35}
      />
    </points>
  );
}

interface MapInternalsProps {
  scrollProgress: number;
  onHoverCity: (city: CityNode | null) => void;
}

function MapInternals({ scrollProgress, onHoverCity }: MapInternalsProps) {
  const mapGroupRef = useRef<THREE.Group>(null);
  const mumbaiPos = new THREE.Vector3(...CITY_NODES[0].pos);

  useFrame((state) => {
    if (!mapGroupRef.current) return;
    // Smooth scroll integration & floating
    mapGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      mapGroupRef.current.rotation.y,
      -0.2 + scrollProgress * 0.5,
      0.05
    );
    mapGroupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
  });

  // Arc connections
  const connections = useMemo(() => {
    return CITY_NODES.slice(1).map((target) => {
      const targetPos = new THREE.Vector3(...target.pos);
      const mid = new THREE.Vector3().addVectors(mumbaiPos, targetPos).multiplyScalar(0.5);
      
      // Loft the Bezier curves up along Z coordinate for 3D depth
      const distance = mumbaiPos.distanceTo(targetPos);
      mid.z += distance * 0.4;
      
      const curve = new THREE.QuadraticBezierCurve3(mumbaiPos, mid, targetPos);
      return {
        points: curve.getPoints(50),
        node: target,
      };
    });
  }, [mumbaiPos]);

  return (
    <group ref={mapGroupRef}>
      <IndiaHologramGrid />

      {/* Origin: Mumbai Node */}
      <group position={mumbaiPos}>
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#DFBF6D" />
        </mesh>
        <Html distanceFactor={10}>
          <div className="px-2.5 py-1 rounded bg-obsidian/90 border border-champagne/40 text-[9px] font-mono text-champagne select-none pointer-events-none">
            MUMBAI CORE
          </div>
        </Html>
      </group>

      {/* Target Nodes & Pathways */}
      {connections.map((c, idx) => {
        // Show arcs progressively based on scroll
        const triggerPoint = idx / connections.length;
        const opacity = scrollProgress > triggerPoint ? 0.65 : 0.0;
        
        return (
          <group key={idx}>
            {/* Bezier Path */}
            <Line
              points={c.points}
              color="#DFBF6D"
              lineWidth={1.5}
              transparent
              opacity={opacity}
            />

            {/* Glowing endpoint node */}
            <group
              position={new THREE.Vector3(...c.node.pos)}
              onClick={() => onHoverCity(c.node)}
              onPointerOver={() => {
                document.body.style.cursor = "pointer";
                onHoverCity(c.node);
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
              }}
            >
              <mesh>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color={opacity > 0 ? "#DFBF6D" : "#1C2548"} />
              </mesh>
              <Html distanceFactor={10}>
                <button
                  className="px-2 py-0.5 rounded bg-midnight/80 border border-graphite-light/50 text-[8px] font-mono text-white/70 hover:text-champagne hover:border-champagne/50 transition-colors uppercase cursor-pointer"
                  onClick={() => onHoverCity(c.node)}
                >
                  {c.node.name}
                </button>
              </Html>
            </group>
          </group>
        );
      })}
    </group>
  );
}

interface SceneProps {
  scrollProgress?: number;
}

export default function SceneIndiaNetwork({ scrollProgress = 0 }: SceneProps) {
  const [selectedCity, setSelectedCity] = useState<CityNode | null>(null);

  return (
    <div className="relative w-full h-full min-h-screen">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.4, 5.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 5, 2]} intensity={0.4} color="#DFBF6D" />
          
          <MapInternals
            scrollProgress={scrollProgress}
            onHoverCity={setSelectedCity}
          />

          <EffectComposer>
            <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
            <Vignette offset={0.3} darkness={0.7} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Glassmorphic Dossier popup on city click/hover */}
      {selectedCity && (
        <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:top-8 md:bottom-auto md:w-80 z-20 glass-elevated rounded-2xl p-5 border border-champagne/20 pointer-events-auto transition-all animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-mono uppercase text-champagne tracking-widest">
              Success Dossier
            </span>
            <button
              onClick={() => setSelectedCity(null)}
              className="text-[10px] font-mono text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              ✕ CLOSE
            </button>
          </div>
          <h4 className="text-lg font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
            {selectedCity.name}
          </h4>
          <p className="t-label mb-3">{selectedCity.industry} · Placed Node</p>

          <div className="grid grid-cols-2 gap-3 mb-4 bg-midnight/50 rounded-xl p-3 border border-graphite-light/50">
            <div>
              <span className="text-[9px] font-mono text-text-muted block">OUTCOME ROLE</span>
              <span className="text-[11px] font-semibold text-white truncate block">{selectedCity.role}</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-text-muted block">CTC TRANSFORMATION</span>
              <span className="text-[11px] font-bold text-success block">{selectedCity.salary}</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-graphite-light/50">
              <span className="text-[9px] font-mono text-text-muted block">INTERVIEW SUCCESS</span>
              <span className="text-[11px] font-semibold text-champagne block">{selectedCity.interviews}</span>
            </div>
          </div>

          <p className="text-[11px] text-text-secondary leading-relaxed italic">
            "{selectedCity.story}"
          </p>
        </div>
      )}
    </div>
  );
}
