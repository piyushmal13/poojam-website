"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Key } from "lucide-react";

export default function CinematicDoors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current && leftDoorRef.current && rightDoorRef.current && contentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      // Doors split open
      tl.to(leftDoorRef.current, { xPercent: -100, ease: "power2.inOut" }, 0)
        .to(rightDoorRef.current, { xPercent: 100, ease: "power2.inOut" }, 0)
        // The text pushes through the Z-axis
        .fromTo(contentRef.current, { scale: 0.8, opacity: 0, z: -500 }, { scale: 1, opacity: 1, z: 0, ease: "power2.out" }, 0.2);
    }
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#030512]">
      
      {/* Background that is revealed */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div ref={contentRef} className="text-center space-y-6 max-w-4xl px-4">
          <div className="h-16 w-16 mx-auto rounded-full border border-champagne/40 flex items-center justify-center bg-midnight/50 shadow-[0_0_40px_rgba(201,168,76,0.3)]">
            <Key className="w-6 h-6 text-champagne" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-tight">
            Unlocking Your <br />
            <span className="gradient-gold">Executive Potential</span>.
          </h2>
          <p className="t-body-lg text-text-secondary max-w-2xl mx-auto">
            You have achieved the operational mastery. Now, we architect the authority. Step into the elite echelon of global career positioning.
          </p>
        </div>
      </div>

      {/* Left Door */}
      <div 
        ref={leftDoorRef} 
        className="absolute top-0 left-0 w-1/2 h-full z-20 bg-gradient-to-r from-[#010208] to-[#0a0e23] border-r border-champagne/20 flex items-center justify-end pr-4 sm:pr-10"
        style={{ boxShadow: "10px 0 50px rgba(0,0,0,0.8)" }}
      >
        <div className="w-1 h-32 bg-gradient-to-b from-transparent via-champagne/40 to-transparent rounded-full" />
      </div>

      {/* Right Door */}
      <div 
        ref={rightDoorRef} 
        className="absolute top-0 right-0 w-1/2 h-full z-20 bg-gradient-to-l from-[#010208] to-[#0a0e23] border-l border-champagne/20 flex items-center justify-start pl-4 sm:pl-10"
        style={{ boxShadow: "-10px 0 50px rgba(0,0,0,0.8)" }}
      >
        <div className="w-1 h-32 bg-gradient-to-b from-transparent via-champagne/40 to-transparent rounded-full" />
      </div>
      
    </section>
  );
}
