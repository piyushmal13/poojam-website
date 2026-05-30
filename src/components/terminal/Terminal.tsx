"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { TerminalAudio } from "./TerminalAudio";
import { TerminalCrt } from "./TerminalCrt";
import { Sparkles, Terminal as TermIcon, Play, Code } from "lucide-react";
import { TerminalAts } from "./TerminalAts";
import { TerminalGemini } from "./TerminalGemini";

interface LogLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "system" | "prompt";
  component?: React.ReactNode;
}

interface ActiveFlow {
  type: "contact" | "ats" | "gemini";
  step: number;
  data: Record<string, string>;
}

// Matrix Falling Rain component inside terminal screen when active
const MatrixRain: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || 800);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 480);

    const columns = Math.floor(width / 16);
    const yPositions = Array(columns).fill(0);

    // Dynamic resize handler
    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.fillStyle = "rgba(4, 4, 6, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(16, 185, 129, 0.45)"; // Soft green phosphor
      ctx.font = "13px monospace";

      for (let i = 0; i < yPositions.length; i++) {
        // Japanese Katakana + Latin digits mix
        const char = String.fromCharCode(33 + Math.floor(Math.random() * 93));
        const x = i * 16;
        const y = yPositions[i];

        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 16;
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  if (!isActive) return null;
  return <canvas ref={canvasRef} className="matrix-canvas-wrapper" />;
};

export const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [matrixActive, setMatrixActive] = useState(false);
  const [theme, setTheme] = useState("emerald");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAutotyping, setIsAutotyping] = useState(false);

  // Conversational state machine for interactive user prompts
  const [activeFlow, setActiveFlow] = useState<ActiveFlow | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initial Boot Sequence
  useEffect(() => {
    const bootLogs: LogLine[] = [
      { text: "PM-OS [Version 2.0.4429]", type: "system" },
      { text: "(c) 2026 Malpani Tech. All rights reserved.", type: "system" },
      { text: "--------------------------------------------------------", type: "system" },
      { text: "   ██████╗ ███╗   ███╗     ██████╗ ███████╗", type: "success" },
      { text: "   ██╔══██╗████╗ ████║    ██╔═══██╗██╔════╝", type: "success" },
      { text: "   ██████╔╝██╔████╔██║    ██║   ██║███████╗", type: "success" },
      { text: "   ██╔═══╝ ██║╚██╔╝██║    ██║   ██║╚════██║", type: "success" },
      { text: "   ██║     ██║ ╚═╝ ██║    ╚██████╔╝███████║", type: "success" },
      { text: "   ╚═╝     ╚═╝     ╚═╝     ╚═════╝ ╚══════╝", type: "success" },
      { text: "--------------------------------------------------------", type: "system" },
      { text: "SECURE ENCRYPTED NODE INITIALIZED. AUTH LEVEL: GUEST", type: "system" },
      { text: "Type 'help' to list available command-line modules.", type: "prompt" },
    ];

    setLogs(bootLogs);
    
    // Play boot sound sequence on first load
    setTimeout(() => {
      TerminalAudio.playBootSound();
      TerminalAudio.startHum();
    }, 800);

    return () => {
      TerminalAudio.stopHum();
    };
  }, []);

  // Keep terminal scrolled to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Focus terminal input box on click anywhere inside screen
  const focusInput = () => {
    if (inputRef.current && !isAutotyping) {
      inputRef.current.focus();
    }
  };

  // Autotype utility triggered by Modern GUI buttons
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const triggerAutotype = useCallback((commandText: string) => {
    if (isAutotyping) return;
    setIsAutotyping(true);
    setInputVal("");
    focusInput();

    let index = 0;
    const interval = setInterval(() => {
      if (index < commandText.length) {
        const nextChar = commandText[index];
        setInputVal((prev) => prev + nextChar);
        TerminalAudio.playKeyClick();
        index++;
      } else {
        clearInterval(interval);
        setIsAutotyping(false);
        // Dispatch keypress sound and run command
        setTimeout(() => {
          executeCommand(commandText);
          setInputVal("");
        }, 300);
      }
    }, 45); // Speed of character typings
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutotyping]);

  // Listen for global custom events to trigger terminal autotyping externally
  useEffect(() => {
    const handleAutotype = (e: Event) => {
      const customEvent = e as CustomEvent<{ command: string }>;
      if (customEvent.detail && customEvent.detail.command) {
        if (!isAutotyping && !activeFlow) {
          triggerAutotype(customEvent.detail.command);
        }
      }
    };
    window.addEventListener("terminal:autotype", handleAutotype);
    return () => {
      window.removeEventListener("terminal:autotype", handleAutotype);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutotyping, activeFlow]);

  // Keyboard navigation for history (Up/Down arrow)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = inputVal.trim();
      executeCommand(command);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const newIdx = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIdx);
      setInputVal(commandHistory[commandHistory.length - 1 - newIdx]);
      TerminalAudio.playKeyClick();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - newIdx]);
      }
      TerminalAudio.playKeyClick();
    } else {
      // Play standard typing clicking noise
      if (e.key.length === 1) {
        TerminalAudio.playKeyClick();
      }
    }
  };

  // Execute typed string input
  const executeCommand = (cmdString: string) => {
    if (!cmdString) {
      // Empty enter prints an empty line
      setLogs((prev) => [...prev, { text: `guest@pm-os:~$ `, type: "prompt" }]);
      return;
    }

    // Reset history index
    setHistoryIndex(-1);
    setCommandHistory((prev) => {
      // Avoid adjacent duplicates in history
      if (prev[prev.length - 1] === cmdString) return prev;
      return [...prev, cmdString];
    });

    // 1. Process multi-step dialog flow (contact / ATS wizard) if active
    if (activeFlow) {
      handleFlowStep(cmdString);
      return;
    }

    const lowerCmd = cmdString.toLowerCase();
    const parts = lowerCmd.split(" ");
    const command = parts[0];
    const args = parts.slice(1);

    // Print command entered to screen
    setLogs((prev) => [...prev, { text: `guest@pm-os:~$ ${cmdString}`, type: "input" }]);

    // Core Router Command Parser Switch
    switch (command) {
      case "help":
        renderHelp();
        break;

      case "clear":
        setLogs([]);
        break;

      case "about":
        renderAbout();
        break;

      case "experience":
        renderExperience();
        break;

      case "skills":
        renderSkills();
        break;

      case "services":
        renderServices();
        break;

      case "resume":
        renderResume();
        break;

      case "matrix":
        setMatrixActive((prev) => !prev);
        setLogs((prev) => [
          ...prev,
          {
            text: `Matrix digital rain code waterfall toggled: ${!matrixActive ? "ACTIVATED" : "DEACTIVATED"}.`,
            type: "success",
          },
        ]);
        TerminalAudio.playSuccessChime();
        break;

      case "sound":
        const action = args[0];
        if (action === "on") {
          TerminalAudio.setMute(false);
          setLogs((prev) => [...prev, { text: "Mechanical sound synthesizers: ENABLED", type: "success" }]);
          TerminalAudio.playSuccessChime();
        } else if (action === "off") {
          TerminalAudio.setMute(true);
          setLogs((prev) => [...prev, { text: "Mechanical sound synthesizers: MUTED", type: "system" }]);
        } else {
          setLogs((prev) => [
            ...prev,
            { text: "Syntax: 'sound on' or 'sound off'. Current status: " + (TerminalAudio.getMutedStatus() ? "MUTED" : "ON"), type: "error" },
          ]);
          TerminalAudio.playErrorBeep();
        }
        break;

      case "theme":
        const targetTheme = args[0];
        const validThemes = ["emerald", "amber", "cyberpunk", "ocean", "onyx"];
        if (validThemes.includes(targetTheme)) {
          setTheme(targetTheme);
          document.documentElement.setAttribute("data-theme", targetTheme);
          setLogs((prev) => [
            ...prev,
            { text: `System theme adjusted to [${targetTheme.toUpperCase()}]. Refreshing telemetry color palette...`, type: "success" },
          ]);
          TerminalAudio.playSuccessChime();
        } else {
          setLogs((prev) => [
            ...prev,
            { text: "Syntax: 'theme [emerald|amber|cyberpunk|ocean|onyx]'.", type: "error" },
          ]);
          TerminalAudio.playErrorBeep();
        }
        break;

      case "ats":
        startAtsFlow();
        break;

      case "contact":
        startContactFlow();
        break;

      case "gemini":
        const promptText = args.join(" ");
        if (!promptText) {
          startGeminiFlow();
        } else {
          setLogs((prev) => [
            ...prev,
            {
              text: "",
              type: "success",
              component: <TerminalGemini prompt={promptText} />,
            },
          ]);
        }
        break;

      default:
        setLogs((prev) => [
          ...prev,
          {
            text: `Command '${command}' not recognized. Type 'help' to review workstation shell protocols.`,
            type: "error",
          },
        ]);
        TerminalAudio.playErrorBeep();
    }
  };

  // --- WIZARD DIALOG CONTROLLER (FLOW SYSTEM) ---
  const startGeminiFlow = () => {
    setActiveFlow({
      type: "gemini",
      step: 0,
      data: {},
    });
    setLogs((prev) => [
      ...prev,
      { text: ">> SECURE COGNITIVE NEURAL LINK INITIATED <<", type: "system" },
      { text: "Gemini AI interactive shell loaded. Ask me about Pooja's experience, core capabilities, or general software scaling topics.", type: "system" },
      { text: "Type your query below (or type 'exit' to return to PM-OS):", type: "prompt" },
    ]);
    TerminalAudio.playSuccessChime();
  };

  const startContactFlow = () => {
    setActiveFlow({
      type: "contact",
      step: 0,
      data: { name: "", email: "", message: "" },
    });
    setLogs((prev) => [
      ...prev,
      { text: ">> Starting Secure Inquiry Transmission Protocol <<", type: "system" },
      { text: "Please enter your Full Name:", type: "prompt" },
    ]);
    TerminalAudio.playSuccessChime();
  };

  const startAtsFlow = () => {
    setActiveFlow({
      type: "ats",
      step: 0,
      data: { text: "" },
    });
    setLogs((prev) => [
      ...prev,
      { text: ">> Initializing Interactive ATS Resume Analyzer CLI <<", type: "system" },
      { text: "Paste your resume plain text or type 'mock' to evaluate an elite executive CV template:", type: "prompt" },
    ]);
    TerminalAudio.playSuccessChime();
  };

  const handleFlowStep = (input: string) => {
    if (!activeFlow) return;

    // Print user's response as output line
    setLogs((prev) => [...prev, { text: `> ${input}`, type: "input" }]);

    if (activeFlow.type === "contact") {
      const step = activeFlow.step;
      const data = { ...activeFlow.data };

      if (step === 0) {
        data.name = input;
        setActiveFlow({ type: "contact", step: 1, data });
        setLogs((prev) => [...prev, { text: `Enter your Email Address:`, type: "prompt" }]);
        TerminalAudio.playKeyClick();
      } else if (step === 1) {
        // Basic email syntax validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          setLogs((prev) => [
            ...prev,
            { text: "❌ Invalid email format. Please enter a valid email address (e.g. name@domain.com):", type: "error" },
          ]);
          TerminalAudio.playErrorBeep();
          return;
        }
        data.email = input;
        setActiveFlow({ type: "contact", step: 2, data });
        setLogs((prev) => [...prev, { text: `Enter your Message / Corporate Inquiry:`, type: "prompt" }]);
        TerminalAudio.playSuccessChime();
      } else if (step === 2) {
        data.message = input;
        setActiveFlow(null); // Terminate flow
        
        // Show spinning/saving loader
        setLogs((prev) => [
          ...prev,
          { text: "Transmitting package to secure database pipeline...", type: "system" },
        ]);
        
        setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            {
              text: `✔ ENVELOPE TRANSMITTED SUCCESSFULLY.`,
              type: "success",
            },
            {
              text: `Name: ${data.name}\nEmail: ${data.email}\nInquiry Logged. Reference ID: PM-9${Math.floor(
                1000 + Math.random() * 9000
              )}\nPooja Malpani will follow up directly at your secure email vector.`,
              type: "system",
            },
          ]);
          TerminalAudio.playSuccessChime();
          // Celebration confetti burst
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C6A25B', '#10b981', '#f59e0b', '#06b6d4'],
          });
        }, 1200);
      }
    } else if (activeFlow.type === "ats") {
      setActiveFlow(null); // Exit text collection step
      
      setLogs((prev) => [
        ...prev,
        { text: "Triggering scanning algorithms...", type: "system" },
        {
          text: "",
          type: "success",
          component: <TerminalAts resumeText={input} />,
        },
      ]);
    } else if (activeFlow.type === "gemini") {
      if (input.toLowerCase().trim() === "exit" || input.toLowerCase().trim() === "quit") {
        setActiveFlow(null);
        setLogs((prev) => [
          ...prev,
          { text: "Secure link terminated. Returning to main shell.", type: "system" },
        ]);
        TerminalAudio.playSuccessChime();
        return;
      }
      setLogs((prev) => [
        ...prev,
        {
          text: "",
          type: "success",
          component: <TerminalGemini prompt={input} />,
        },
      ]);
    }
  };

  // --- COMMAND RENDERS (REPORTS & TABLES) ---

  const renderHelp = () => {
    const helpItems = [
      { cmd: "help", desc: "List all executable console commands." },
      { cmd: "about", desc: "Display Pooja Malpani's high-level executive profile & core philosophy." },
      { cmd: "experience", desc: "Print vertical ASCII timeline of senior leadership credentials." },
      { cmd: "skills", desc: "Visualize key engineering & advisory skills with retro progress bars." },
      { cmd: "services", desc: "Present elite advising tiers and technical audit products." },
      { cmd: "ats", desc: "Audit your CV alignment using the interactive ATS Resume Analyzer." },
      { cmd: "gemini [prompt]", desc: "Interact with the integrated Gemini AI Cognitive Agent (or type 'gemini' for chat)." },
      { cmd: "contact", desc: "Initialize secure visual input workflow to transmit messages." },
      { cmd: "resume", desc: "Unlock downloadable CV assets & print resume structure." },
      { cmd: "matrix", desc: "Toggle Canvas-based retro green rain background matrix overlay." },
      { cmd: "theme [name]", desc: "Toggle UI theme color palette [emerald|amber|cyberpunk|ocean|onyx]." },
      { cmd: "sound [on|off]", desc: "Toggle Web Audio API synthesizer clicks & low hum." },
      { cmd: "clear", desc: "Purge active console logs buffer." },
    ];

    const helpComponent = (
      <div className="my-2 border border-zinc-800 bg-zinc-950/40 p-3 rounded-lg">
        <div className="grid grid-cols-12 gap-2 text-xs border-b border-zinc-800 pb-1.5 font-bold uppercase tracking-wider text-zinc-400">
          <span className="col-span-4 glow-text">Command ID</span>
          <span className="col-span-8 text-zinc-500">Operation Protocol Summary</span>
        </div>
        <div className="mt-2 space-y-1">
          {helpItems.map((item) => (
            <div key={item.cmd} className="grid grid-cols-12 gap-2 text-[12px] font-mono leading-relaxed">
              <span className="col-span-4 font-bold text-white hover:glow-text cursor-pointer" onClick={() => triggerAutotype(item.cmd)}>
                {item.cmd}
              </span>
              <span className="col-span-8 text-zinc-400">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    );

    setLogs((prev) => [
      ...prev,
      { text: "WORKSTATION SHELL INTERPRETER DIRECTORY:", type: "success" },
      { text: "", type: "success", component: helpComponent },
    ]);
    TerminalAudio.playSuccessChime();
  };

  const renderAbout = () => {
    setLogs((prev) => [
      ...prev,
      {
        text: ">> EXECUTIVE STATEMENT & CORE MISSION <<",
        type: "success",
      },
      {
        text: "Pooja Malpani is a veteran product engineering champion and corporate tech advisor. Known for orchestrating deep-tech system developments and leading large-scale architectural modernization for high-status global brands.",
        type: "system",
      },
      {
        text: "“In high-consequence corporate environments, technology must not merely serve the business—it must build unfair competitive authority. True system elegance scales product velocities while minimizing operational friction.”",
        type: "system",
      },
      {
        text: "Primary Focus Areas:\n  ■ Algorithmic execution infrastructures & low latency APIs.\n  ■ Digital business ecosystem scale, microservices, and web structures.\n  ■ Corporate technology advisory for Fortune 500 executives and VCs.",
        type: "system",
      },
    ]);
    TerminalAudio.playSuccessChime();
  };

  const renderExperience = () => {
    const experienceTimeline = (
      <div className="my-3 space-y-4 font-mono text-xs border-l border-emerald-500/30 pl-4 ml-2">
        <div className="relative">
          <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="font-bold text-white uppercase text-[13px]">Corporate Advisor & CTO Specialist</span>
          <div className="text-[10px] text-zinc-500">2023 - PRESENT | MALPANI ADVISORY</div>
          <p className="text-zinc-400 mt-1">Provide board-level engineering architecture audits, due-diligence for tech acquisitions, and system modernization consulting for enterprise level operations.</p>
        </div>

        <div className="relative">
          <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
          <span className="font-bold text-zinc-300 uppercase text-[13px]">VP of Product & Engineering</span>
          <div className="text-[10px] text-zinc-500">2019 - 2023 | ZENITH TRADING ECOSYSTEM</div>
          <p className="text-zinc-400 mt-1">Directed engineering squads in low-latency high-frequency trading platform developments. Scaled engineering operations from 20 to 120 developers while improving API system performance by 35%.</p>
        </div>

        <div className="relative">
          <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
          <span className="font-bold text-zinc-300 uppercase text-[13px]">Director of Core Architecture</span>
          <div className="text-[10px] text-zinc-500">2015 - 2019 | VECTOR FINANCIAL GROUPS</div>
          <p className="text-zinc-400 mt-1">Led structural transition from legacy monolith codebases to robust event-driven microservices. Achieved high-fidelity multi-region failover and strict compliance standards.</p>
        </div>
      </div>
    );

    setLogs((prev) => [
      ...prev,
      { text: "SENIOR EXECUTIVE TELEMETRY HISTORY (TIMELINE):", type: "success" },
      { text: "", type: "system", component: experienceTimeline },
    ]);
    TerminalAudio.playSuccessChime();
  };

  const renderSkills = () => {
    const skillsList = [
      { name: "Enterprise Architecture Audits", score: 95 },
      { name: "Algorithmic Platform Performance", score: 90 },
      { name: "Executive Leadership & Team Scaling", score: 98 },
      { name: "Event-Driven Microservices Systems", score: 88 },
      { name: "Quantitative Risk & Security Safeguards", score: 92 },
      { name: "Digital Ecosystem Strategy", score: 96 },
    ];

    const skillsComponent = (
      <div className="my-2 space-y-2 border border-zinc-800/40 bg-zinc-950/20 p-3 rounded-lg max-w-xl">
        {skillsList.map((skill) => {
          const filledBlocks = Math.round(skill.score / 10);
          const bar = "█".repeat(filledBlocks) + "░".repeat(10 - filledBlocks);
          return (
            <div key={skill.name} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
              <span className="text-zinc-300 font-medium sm:w-2/3">{skill.name}</span>
              <div className="flex items-center gap-2 mt-0.5 sm:mt-0 font-bold">
                <span className="glow-text text-[11px] tracking-tighter">{bar}</span>
                <span className="text-white w-8 text-right">{skill.score}%</span>
              </div>
            </div>
          );
        })}
      </div>
    );

    setLogs((prev) => [
      ...prev,
      { text: "CORE CAPABILITIES MATRIX:", type: "success" },
      { text: "", type: "system", component: skillsComponent },
    ]);
    TerminalAudio.playSuccessChime();
  };

  const renderServices = () => {
    const servicesComponent = (
      <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <div className="border border-zinc-800 bg-zinc-950/40 p-3 rounded-lg">
          <div className="text-xs font-bold text-white uppercase tracking-wider glow-text">01. Advisory & Audit Tiers</div>
          <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
            Direct 1-on-1 strategic assessments for CEOs, CTOs, and VCs looking for deep technical structural diligence, team reorganization, and platform scale mapping.
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-950/40 p-3 rounded-lg">
          <div className="text-xs font-bold text-white uppercase tracking-wider glow-text">02. Modernization Engineering</div>
          <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
            Direct intervention program to refactor bottleneck monoliths, implement high-performance event-driven backends, and automate product pipeline infrastructure.
          </p>
        </div>
      </div>
    );

    setLogs((prev) => [
      ...prev,
      { text: "ELITE SERVICES SCHEMAS (BOOKING CHANNELS):", type: "success" },
      { text: "", type: "system", component: servicesComponent },
      { text: "Type 'contact' or click 'Book Session' to request deep corporate consulting.", type: "prompt" },
    ]);
    TerminalAudio.playSuccessChime();
  };

  const renderResume = () => {
    // Simulate downloading resume
    if (typeof window !== "undefined") {
      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("download", "Pooja_Malpani_Executive_CV.pdf");
      // Mute link so it doesn't navigate
      // Just visually alert user of a download
    }

    setLogs((prev) => [
      ...prev,
      { text: "TRANSMITTING EXECUTIVE CV PACKAGE...", type: "system" },
      {
        text: "✔ Simulated Download initiated: 'Pooja_Malpani_Executive_CV.pdf'\n" +
              "─────────────────────────────────────────────────────\n" +
              "HIGHLIGHTS LOGGED:\n" +
              "  • VP / CTO profile demonstrating $12M+ budget management.\n" +
              "  • Engineering system scalability expertise in Node/TS/Go/Rust.\n" +
              "  • Leadership certification & references from series A-C founders.",
        type: "success",
      },
    ]);
    TerminalAudio.playSuccessChime();
  };

  return (
    <div className="w-full relative" onClick={focusInput}>
      <TerminalCrt>
        <div className="relative min-h-[440px] flex flex-col justify-between">
          
          {/* Matrix canvas render in the background */}
          <MatrixRain isActive={matrixActive} />

          {/* Logs container */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto pr-1 space-y-2 relative z-10 max-h-[460px] scroll-smooth"
          >
            {logs.map((log, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {log.type === "input" && (
                  <div className="flex items-center gap-1.5 font-bold text-zinc-300">
                    <span>{log.text}</span>
                  </div>
                )}
                
                {log.type === "output" && <div className="text-zinc-300">{log.text}</div>}
                
                {log.type === "error" && <div className="text-red-400 font-semibold">{log.text}</div>}
                
                {log.type === "success" && <div className="glow-text font-bold">{log.text}</div>}
                
                {log.type === "system" && <div className="text-zinc-500 font-mono text-[13px]">{log.text}</div>}
                
                {log.type === "prompt" && <div className="dim-text font-bold animate-pulse">{log.text}</div>}

                {/* Custom rich rendering modules inside terminal */}
                {log.component && <div className="mt-1">{log.component}</div>}
              </div>
            ))}
          </div>

          {/* Command Prompt Line */}
          <div className="relative z-10 flex items-center border-t border-zinc-900/60 pt-3 mt-3 font-mono text-sm">
            <span className="glow-text font-bold mr-2 shrink-0">
              {activeFlow
                ? `${activeFlow.type}-wizard(step-${activeFlow.step}):~$`
                : "guest@pm-os:~$"}
            </span>

            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isAutotyping}
                className="w-full bg-transparent text-white focus:outline-none font-mono caret-transparent"
                autoComplete="off"
                spellCheck={false}
              />
              
              {/* Retro Blinking Cursor Box Overlay */}
              <div
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none h-4 w-2 animate-pulse bg-emerald-400"
                style={{
                  left: `${Math.min(inputVal.length * 8.4, 520)}px`,
                  backgroundColor: "var(--term-cursor)",
                  boxShadow: "var(--term-glow)",
                }}
              />
            </div>

            {/* Quick Autocomplete Run helper */}
            <button
              onClick={() => {
                if (inputVal.trim()) {
                  executeCommand(inputVal.trim());
                  setInputVal("");
                }
              }}
              className="ml-2 flex items-center justify-center p-1 rounded hover:bg-zinc-800/40 text-zinc-500 hover:text-white transition-colors"
              title="Run Command"
            >
              <Play className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </TerminalCrt>

      {/* Floating Side Companion Click panel */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
        <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 mr-2 mt-2 select-none">
          <Code className="h-3 w-3 text-zinc-500" />
          Quick Executions:
        </span>
        {[
          { text: "Interactive Bio", cmd: "about" },
          { text: "Career Timeline", cmd: "experience" },
          { text: "Skill Matrix", cmd: "skills" },
          { text: "Analyze Resume", cmd: "ats" },
          { text: "Falling Matrix", cmd: "matrix" },
          { text: "Gemini AI Chat", cmd: "gemini" },
          { text: "Contact Console", cmd: "contact" },
        ].map((btn) => (
          <button
            key={btn.cmd}
            onClick={() => triggerAutotype(btn.cmd)}
            disabled={isAutotyping || (activeFlow !== null)}
            className="flex h-7 items-center gap-1 rounded bg-[#0f0f13] border border-zinc-800 hover:border-emerald-500/30 px-3 text-[11px] font-mono text-zinc-400 hover:text-white hover:bg-zinc-950 transition-all select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <TermIcon className="h-2.5 w-2.5 text-emerald-500" />
            <span>{btn.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
