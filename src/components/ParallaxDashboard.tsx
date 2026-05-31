"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Linkedin, Eye, MousePointer2 } from "lucide-react";

export default function ParallaxDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current && card1Ref.current && card2Ref.current && card3Ref.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5,
        }
      });

      tl.fromTo(card1Ref.current, { y: 100, opacity: 0 }, { y: -20, opacity: 1 }, 0)
        .fromTo(card2Ref.current, { y: 150, opacity: 0 }, { y: -50, opacity: 1 }, 0.1)
        .fromTo(card3Ref.current, { y: 200, opacity: 0 }, { y: -80, opacity: 1 }, 0.2);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto h-[400px] mt-12 flex justify-center items-center">
      
      {/* Background Depth Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.1),_transparent_70%)] blur-2xl" />

      {/* Main Dashboard UI Mock */}
      <div 
        ref={card2Ref} 
        className="absolute z-20 w-[90%] md:w-[600px] glass-elevated rounded-2xl border border-champagne/20 p-6 shadow-2xl"
        style={{ transform: "translateZ(50px)" }}
      >
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-graphite-light/50">
          <div className="w-12 h-12 rounded-full bg-graphite flex items-center justify-center border border-champagne/30">
            <Linkedin className="w-6 h-6 text-champagne" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide">Recruiter Search Appearances</div>
            <div className="text-xs text-success font-mono mt-1">▲ +450% this week</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-3 w-full bg-midnight/50 rounded-full overflow-hidden">
            <div className="h-full bg-champagne w-[85%] rounded-full" />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-text-secondary">
            <span>SSI Score: 85</span>
            <span>Top 1% Industry</span>
          </div>
        </div>
      </div>

      {/* Floating Insight Card 1 */}
      <div 
        ref={card1Ref} 
        className="absolute z-10 left-0 md:left-10 bottom-0 md:-bottom-10 w-48 glass rounded-xl border border-graphite-light/50 p-4"
        style={{ transform: "translateZ(20px)" }}
      >
        <Eye className="w-4 h-4 text-champagne mb-2" />
        <div className="text-2xl font-display text-white">1,204</div>
        <div className="text-[9px] font-mono text-text-secondary mt-1">C-SUITE PROFILE VIEWS</div>
      </div>

      {/* Floating Insight Card 2 */}
      <div 
        ref={card3Ref} 
        className="absolute z-30 right-0 md:right-10 top-10 md:top-0 w-48 glass rounded-xl border border-champagne/30 p-4 bg-midnight/80"
        style={{ transform: "translateZ(80px)" }}
      >
        <MousePointer2 className="w-4 h-4 text-success mb-2" />
        <div className="text-2xl font-display text-white">24</div>
        <div className="text-[9px] font-mono text-success mt-1">INBOUND INQUIRIES</div>
      </div>

    </div>
  );
}
