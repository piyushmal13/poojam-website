"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Terminal } from "../components/terminal/Terminal";
import { 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Database, 
  Globe, 
  ArrowUpRight, 
  Award,
  ExternalLink,
  Linkedin,
  Github,
  Mail,
  Zap,
} from "lucide-react";

// Floating Particle Component
const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ["rgba(198,162,91,", "rgba(16,185,129,", "rgba(6,182,212,"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();

        // Subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity * 0.15})`;
        ctx.fill();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(198,162,91,${0.03 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

// Premium Loading Splash Screen
const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#070709] flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? "none" : "auto" }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-xl border border-amber-500/30 bg-amber-500/5 flex items-center justify-center font-serif text-amber-500 font-bold text-2xl select-none loading-logo-pulse">
          PM
        </div>
        <div>
          <span className="font-bold text-lg tracking-widest text-white block uppercase font-sans">POOJA MALPANI</span>
          <span className="text-[11px] text-zinc-500 uppercase tracking-widest block font-mono">SYSTEM INITIALIZATION</span>
        </div>
      </div>

      <div className="w-64 h-1 bg-zinc-900 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-1.5 text-[11px] font-mono text-zinc-500">
        <div className={`transition-opacity duration-300 ${phase >= 0 ? "opacity-100" : "opacity-0"}`}>
          <span className="text-emerald-500">✔</span> Connecting to secure infrastructure...
        </div>
        <div className={`transition-opacity duration-300 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}>
          <span className="text-emerald-500">{phase >= 2 ? "✔" : "⚡"}</span> Loading executive telemetry modules...
        </div>
        <div className={`transition-opacity duration-300 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
          <span className="text-emerald-500">{phase >= 3 ? "✔" : "⚡"}</span> Initializing CRT rendering engine...
        </div>
        <div className={`transition-opacity duration-300 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>
          <span className="text-emerald-500">{progress >= 100 ? "✔" : "⚡"}</span> Boot sequence complete.
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [telemetryUptime, setTelemetryUptime] = useState("99.9997%");
  const [systemLoad, setSystemLoad] = useState("0.02%");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Reveal card refs
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Telemetry updates to simulate active systems
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      const activeUptime = (99.999 + Math.random() * 0.0009).toFixed(5);
      const activeLoad = (0.01 + Math.random() * 0.05).toFixed(3);
      setTelemetryUptime(`${activeUptime}%`);
      setSystemLoad(`${activeLoad}%`);
    }, 5000);

    return () => clearInterval(telemetryInterval);
  }, []);

  // Scroll reveal animation observer
  useEffect(() => {
    if (!showContent) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showContent]);

  // Staggered entrance after loading
  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => setShowContent(true), 100);
    }
  }, [isLoaded]);

  const triggerCardCommand = (command: string) => {
    const event = new CustomEvent("terminal:autotype", {
      detail: { command }
    });
    window.dispatchEvent(event);
  };

  const cardData = [
    {
      id: "card-arch-audit",
      title: "Enterprise Architecture Review",
      desc: "Audit distributed structures, discover pipeline friction, and trace API scale barriers.",
      cmd: "skills",
      icon: Layers,
      color: "text-amber-400 bg-amber-500/5 border-amber-500/10"
    },
    {
      id: "card-system-modern",
      title: "Event-Driven System Strategy",
      desc: "Examine engineering roadmap telemetry and structure vertical transition schedules.",
      cmd: "experience",
      icon: Cpu,
      color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
    },
    {
      id: "card-ats-analyzer",
      title: "Interactive ATS Resume Scan",
      desc: "Feed engineering credentials into our parser engine to check ATS compatibility index.",
      cmd: "ats",
      icon: ShieldCheck,
      color: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10"
    },
    {
      id: "card-inquiry-wizard",
      title: "Direct Secure Contact Portal",
      desc: "Initiate visual dialogue wizard to log operational queries & transmit inbox logs.",
      cmd: "contact",
      icon: Globe,
      color: "text-purple-400 bg-purple-500/5 border-purple-500/10"
    }
  ];

  return (
    <>
      {/* Loading Splash Screen */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      <div className={`min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sans relative overflow-hidden selection:bg-amber-500/30 selection:text-white transition-opacity duration-700 ${showContent ? "opacity-100" : "opacity-0"}`}>
        
        {/* Floating Particles Background */}
        <FloatingParticles />

        {/* Visual background grids & ambient radial highlights */}
        <div className="absolute inset-0 luxury-grid opacity-35 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

        {/* Premium Header/Navigation Bar */}
        <header className="relative z-30 border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-md px-6 py-4 animate-slide-down">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg border border-amber-500/20 bg-amber-500/5 flex items-center justify-center font-serif text-amber-500 font-bold text-lg select-none hover:bg-amber-500/10 transition-colors">
                PM
              </div>
              <div>
                <span className="font-bold text-sm tracking-widest text-white block uppercase">POOJA MALPANI</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-medium">EXECUTIVE TELEMETRY SYSTEM</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 bg-zinc-900/60 px-3 py-1 rounded-full border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                NODE STATUS: SECURE
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900/60 px-3 py-1 rounded-full border border-zinc-800/80">
                UPTIME: <span className="text-zinc-200">{telemetryUptime}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900/60 px-3 py-1 rounded-full border border-zinc-800/80">
                LOAD: <span className="text-zinc-200">{systemLoad}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Social Links */}
              <div className="hidden sm:flex items-center gap-1.5">
                <a
                  href="https://linkedin.com/in/poojamalpani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="LinkedIn"
                  id="social-linkedin"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://github.com/poojamalpani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="GitHub"
                  id="social-github"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
                <a
                  href="mailto:pooja@malpani.dev"
                  className="social-icon-btn"
                  title="Email"
                  id="social-email"
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>

              <button
                onClick={() => triggerCardCommand("contact")}
                id="cta-book-session"
                className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-1.5 text-xs font-mono text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all cursor-pointer group"
              >
                <Zap className="h-3 w-3 group-hover:animate-pulse" />
                <span>BOOK ADVISORY</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Layout Area */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mission, Bio, and Capability triggers */}
          <section className="lg:col-span-5 space-y-8 lg:pr-4">
            
            <div className="space-y-4 reveal-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-wider">
                <Award className="h-3 w-3" />
                <span>Board-Level Tech Specialist</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-serif leading-tight">
                Unlocking <br />
                <span className="text-gradient-gold">Competitive Authority</span> <br />
                At Scale.
              </h1>
              
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-lg">
                Technology in high-velocity businesses isn&apos;t just operational infrastructure—it is strategic leverage. 
                Pooja Malpani provides executive architecture audits, team re-scaling plans, and core code 
                modernizations that drive enterprise valuation.
              </p>
            </div>

            {/* Profile Card with Headshot */}
            <div className="reveal-on-scroll flex items-center gap-4 p-4 rounded-xl border border-zinc-800/60 bg-zinc-950/40 backdrop-blur-sm" style={{ transitionDelay: "0.2s" }}>
              <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden border-2 border-amber-500/30 headshot-glow">
                <Image
                  src="/pooja-headshot.png"
                  alt="Pooja Malpani — Executive Technology Advisor"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Pooja Malpani</div>
                <div className="text-[11px] text-zinc-500 font-mono">CTO Specialist · Architecture Advisor</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">12+ Years</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">Fortune 500</span>
                </div>
              </div>
            </div>

            {/* Interactive Credential / Autotype Trigger Cards */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold reveal-on-scroll" style={{ transitionDelay: "0.3s" }}>
                Core Advising Protocols (Click to run audit)
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {cardData.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.id}
                      id={card.id}
                      ref={(el) => { cardRefs.current[index] = el; }}
                      onClick={() => triggerCardCommand(card.cmd)}
                      className="reveal-on-scroll w-full text-left p-4 rounded-xl border bg-zinc-950/40 hover:bg-zinc-900/40 hover:border-zinc-800 transition-all scale-on-hover luxury-glow cursor-pointer relative group flex gap-4 border-zinc-900"
                      style={{ transitionDelay: `${0.35 + index * 0.1}s` }}
                    >
                      <div className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center border ${card.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                          <span>{card.title}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                        </div>
                        <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{card.desc}</p>
                        <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-amber-500/70 group-hover:text-amber-500 transition-colors uppercase">
                          <span>Execute command:</span>
                          <span className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-300 font-bold group-hover:border-amber-500/20">{card.cmd}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
          </section>

          {/* Right Column: Physical CRT Chassis enclosing the Terminal */}
          <section className="lg:col-span-7 flex flex-col items-stretch">
            
            <div className="text-center sm:text-left mb-3 reveal-on-scroll" style={{ transitionDelay: "0.15s" }}>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
                Interactive Mainframe Node console
              </span>
            </div>

            {/* Physical CRT Bezel Frame Structure */}
            <div className="reveal-on-scroll relative p-2 sm:p-3 rounded-3xl border border-zinc-800 bg-gradient-to-b from-[#18181b] to-[#0c0c0e] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.85)]" style={{ transitionDelay: "0.2s" }}>
              
              {/* Visual chassis details (metallic shine, screws, vent grilles) */}
              <div className="absolute top-2 left-6 h-1.5 w-16 bg-zinc-900/60 rounded-full border border-zinc-800/40" />
              <div className="absolute top-2 right-6 h-1.5 w-16 bg-zinc-900/60 rounded-full border border-zinc-800/40" />
              
              {/* Top Vent slats */}
              <div className="flex justify-center gap-1 mb-2 mt-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-1 w-8 rounded-full bg-zinc-900/80 border-t border-black" />
                ))}
              </div>

              {/* Terminal React Instance */}
              <div className="relative">
                <Terminal />
              </div>

              {/* Visual Hardware Telemetry and Screen Housing Controls */}
              <div className="mt-4 px-4 py-2 border border-zinc-900 bg-zinc-950/80 rounded-xl flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <div className="flex items-center gap-3">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  <span>BAUD REGULATION: active</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>VOLTAGE: ~1.05V</span>
                  <span className="hidden sm:inline">PINGS: 12ms</span>
                </div>
              </div>
              
            </div>

            {/* Core Quantitative Business Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6 reveal-on-scroll" style={{ transitionDelay: "0.35s" }}>
              {[
                { label: "SYS UP-TIME INDEX", val: telemetryUptime, icon: Activity },
                { label: "SCALE LIMITS MET", val: "10M+ RPS", icon: Database },
                { label: "DILIGENCE VALUE AUDITED", val: "$1.2B+", icon: Globe }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-zinc-950/30 border border-zinc-900 rounded-xl p-3 flex flex-col justify-between h-20 relative hover:border-zinc-800 transition-colors stat-card-hover">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider font-bold">{stat.label}</span>
                      <Icon className="h-3.5 w-3.5 text-zinc-600" />
                    </div>
                    <span className="text-base font-bold text-white tracking-tight mt-1">{stat.val}</span>
                  </div>
                );
              })}
            </div>

          </section>
        </main>

        {/* Fine-Print Footer */}
        <footer className="relative z-30 border-t border-zinc-900/60 bg-zinc-950/30 py-6 mt-16 px-6 text-center text-xs font-mono text-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Pooja Malpani Advisory. Built with Next.js & engineered for excellence.</p>
            <div className="flex items-center gap-4">
              {/* Mobile Social Links */}
              <div className="flex sm:hidden items-center gap-2 mr-2">
                <a href="https://linkedin.com/in/poojamalpani" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                  <Linkedin className="h-3 w-3" />
                </a>
                <a href="https://github.com/poojamalpani" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
                  <Github className="h-3 w-3" />
                </a>
                <a href="mailto:pooja@malpani.dev" className="social-icon-btn" title="Email">
                  <Mail className="h-3 w-3" />
                </a>
              </div>
              <span className="hover:text-zinc-400 cursor-pointer flex items-center gap-1" onClick={() => triggerCardCommand("help")}>
                Workstation Protocols <ExternalLink className="h-3 w-3" />
              </span>
              <span>●</span>
              <span className="hover:text-zinc-400 cursor-pointer flex items-center gap-1" onClick={() => triggerCardCommand("about")}>
                Philosophical Mandates <ExternalLink className="h-3 w-3" />
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
