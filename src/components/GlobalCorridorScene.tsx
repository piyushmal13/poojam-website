"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlobalCorridorScene() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (svgRef.current) {
      const lines = svgRef.current.querySelectorAll(".flight-path");
      const nodes = svgRef.current.querySelectorAll(".hub-node");

      gsap.to(nodes, {
        opacity: 0.5,
        scale: 1.2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
        ease: "sine.inOut"
      });

      gsap.fromTo(lines, 
        { strokeDashoffset: 1000 }, 
        { 
          strokeDashoffset: 0, 
          duration: 3, 
          repeat: -1, 
          ease: "linear",
          stagger: 0.5
        }
      );
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 flex items-center justify-center overflow-hidden">
      <svg ref={svgRef} viewBox="0 0 1000 500" className="w-[120%] max-w-none h-auto" style={{ filter: "drop-shadow(0 0 15px rgba(201,168,76,0.3))" }}>
        {/* Mumbai Hub */}
        <circle cx="700" cy="250" r="6" fill="#C9A84C" className="hub-node" />
        <circle cx="700" cy="250" r="15" fill="rgba(201,168,76,0.2)" className="hub-node" />
        
        {/* London Hub */}
        <circle cx="480" cy="180" r="4" fill="#34D399" className="hub-node" />
        
        {/* Dubai Hub */}
        <circle cx="620" cy="220" r="4" fill="#60A5FA" className="hub-node" />
        
        {/* Singapore Hub */}
        <circle cx="800" cy="300" r="4" fill="#C9A84C" className="hub-node" />

        {/* Paths radiating from Mumbai */}
        <path 
          d="M700 250 Q 590 180 480 180" 
          fill="none" 
          stroke="url(#gradientGold)" 
          strokeWidth="1.5"
          strokeDasharray="10 15"
          className="flight-path"
        />
        <path 
          d="M700 250 Q 660 210 620 220" 
          fill="none" 
          stroke="url(#gradientGold)" 
          strokeWidth="1.5"
          strokeDasharray="10 15"
          className="flight-path"
        />
        <path 
          d="M700 250 Q 750 280 800 300" 
          fill="none" 
          stroke="url(#gradientGold)" 
          strokeWidth="1.5"
          strokeDasharray="10 15"
          className="flight-path"
        />

        <defs>
          <linearGradient id="gradientGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
