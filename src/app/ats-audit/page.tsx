"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Activity, 
  Target, 
  AlertTriangle, 
  Terminal, 
  FileText, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  XCircle,
  Calendar
} from "lucide-react";

const CALENDLY_LINK = "https://calendly.com/your-calendly-link"; 

const STAGES = [
  { id: 1, label: "Ingesting Document & Format Extraction" },
  { id: 2, label: "C-Suite Vector Keyword Compliance" },
  { id: 3, label: "P&L Ownership & Revenue Anchor Audit" },
  { id: 4, label: "Compiling Format Integrity Report" }
];

const LOG_MESSAGES = [
  "SYSTEM: File payload fetched. Size: 2.4MB. Initializing scanner...",
  "PARSER: Mapping document nodes. Taleo v10 ruleset loaded.",
  "WARNING: Found nested standard layout tables. Parsing indexation at risk.",
  "PARSER: Taleo check complete. Moving to Workday v20 compatibility matrix...",
  "PARSER: Scanning vectors against 500+ C-Suite executive parameters...",
  "CRITICAL: Structural dilution found. Flagged 8 instances of 'Responsible for'.",
  "METRICS: Initiating P&L and revenue-anchor scan sequence...",
  "FAIL: 0 bottom-line revenue anchors or metric indicators found in operations.",
  "PARSER: Social Selling Index check simulated. low LinkedIn alignment.",
  "SYSTEM: Audit compile success. Generating diagnostic visibility score..."
];

export default function ATSAuditPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("parsing");

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const executeAudit = () => {
    if (!file) return;
    setAnalyzing(true);
    setScore(null);
    setLogs([]);
    setActiveStage(1);

    // Simulate multi-stage audit sequence
    // 1. Logs injection
    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < LOG_MESSAGES.length) {
        setLogs((prev) => [...prev, LOG_MESSAGES[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    // 2. Stage transitions
    setTimeout(() => setActiveStage(2), 800);
    setTimeout(() => setActiveStage(3), 1600);
    setTimeout(() => setActiveStage(4), 2200);

    // 3. Final Score compilation
    setTimeout(() => {
      clearInterval(logInterval);
      setAnalyzing(false);
      setScore(54); // Fixed realistic warning score to drive conversions
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] pt-24 md:pt-32 pb-16 md:pb-20 relative overflow-hidden font-sans">
      
      {/* Light Abstract Background Elements */}
      <div className="blur-blob w-[300px] h-[300px] bg-[#C9A84C]/15 top-[-50px] right-[-50px] anim-pulse hidden md:block" />
      <div className="blur-blob w-[300px] h-[300px] bg-[#34D399]/10 bottom-[10%] left-[-50px] anim-float delay-2 hidden md:block" />

      <div className="container-main relative z-10 text-left">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors text-xs font-mono font-bold mb-8 md:mb-12">
          <ArrowLeft className="w-4 h-4 text-[#C9A84C]" /> Return to Boardroom
        </Link>

        {/* Section Header */}
        <div className="max-w-2xl space-y-4 mb-10 md:mb-14">
          <span className="tag-accent border border-[#C9A84C]/30 bg-white text-[#B29440] font-black uppercase tracking-wider py-1 px-3">
            Proprietary Executive Evaluation
          </span>
          <h1 className="heading-lg text-3d text-black">
            The ATS <span className="accent-text">Visibility</span> Audit Terminal.
          </h1>
          <p className="text-body-lg text-sm sm:text-base leading-relaxed">
            Upload your resume. Our diagnostic system simulates a direct parsing scan through Taleo and Workday to map keyword vector dilution and visual formatting issues.
          </p>
        </div>

        {/* Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Upload & Live Processing Terminal */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Upload Console */}
            <div className="bento-card bg-gray-50 border-gray-200/80 shadow-xs space-y-6">
              <div className="space-y-2">
                <h3 className="heading-md text-black">Initiate Scan Sequence</h3>
                <p className="text-xs text-gray-500 font-bold">Supported formats: PDF, DOCX (Max 5MB)</p>
              </div>

              <label className="block w-full h-36 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all group bg-white shadow-inner">
                <input 
                  type="file" 
                  accept=".pdf,.docx" 
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <FileText className="w-8 h-8 text-gray-400 group-hover:text-[#C9A84C] mb-2 transition-colors" />
                <span className="text-xs font-black text-gray-600 group-hover:text-black text-center px-4">
                  {file ? file.name : "Drag & drop your resume or click to browse"}
                </span>
              </label>

              <button 
                onClick={executeAudit} 
                disabled={!file || analyzing}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-bold py-3.5"
              >
                {analyzing ? "Executing Deep Diagnostic Audit..." : "Execute Audit Sequence"}
              </button>
            </div>

            {/* 2. Real-Time Parser Terminal Logs */}
            {(analyzing || logs.length > 0) && (
              <div className="bento-card !p-5 bg-black border-black text-emerald-400 font-mono shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Terminal className="w-4.5 h-4.5 text-emerald-400" />
                    <span>PARSER SYSTEM SHELL</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                </div>

                <div className="h-44 overflow-y-auto text-[11px] leading-relaxed space-y-1.5 pr-2 scrollbar-none font-bold text-left">
                  {logs.map((log, i) => (
                    <div 
                      key={i} 
                      className={`${
                        log.startsWith("CRITICAL") || log.startsWith("FAIL")
                          ? "text-red-400" 
                          : log.startsWith("WARNING") 
                          ? "text-yellow-400" 
                          : "text-emerald-400"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                  {analyzing && (
                    <div className="flex items-center gap-1.5 text-emerald-400/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 anim-pulse" />
                      <span>compiling vector logs...</span>
                    </div>
                  )}
                  <div ref={terminalEndRef} />
                </div>
              </div>
            )}

            {/* 3. Scan Stage Progress Indicators */}
            {analyzing && (
              <div className="bento-card border-gray-200 bg-white shadow-xs p-4 space-y-3">
                <span className="text-[9px] font-bold font-mono tracking-widest text-[#B29440] uppercase">Scanning Pipeline</span>
                <div className="space-y-2">
                  {STAGES.map((st) => (
                    <div key={st.id} className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] ${
                          activeStage > st.id 
                            ? "bg-emerald-500 border-emerald-500 text-white" 
                            : activeStage === st.id 
                            ? "border-[#C9A84C] text-[#C9A84C]" 
                            : "border-gray-200 text-gray-400"
                        }`}>
                          {activeStage > st.id ? "✔" : st.id}
                        </div>
                        <span className={activeStage === st.id ? "text-black" : "text-gray-400"}>{st.label}</span>
                      </div>
                      {activeStage === st.id && <Activity className="w-3.5 h-3.5 text-[#C9A84C] anim-pulse" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Diagnostic Dashboard & Results */}
          <div className="lg:col-span-5 space-y-6">
            
            <h3 className="heading-md border-b border-gray-200 pb-3 text-black">Diagnostic Results Dashboard</h3>
            
            {/* Awaiting payload spacer */}
            {!score && !analyzing && (
              <div className="h-48 flex flex-col items-center justify-center border border-gray-200 rounded-2xl bg-gray-50 shadow-inner p-6 space-y-2">
                <Terminal className="w-8 h-8 text-gray-300" />
                <p className="text-xs font-bold font-mono text-gray-400 uppercase tracking-widest">Awaiting document payload</p>
                <p className="text-[10px] text-gray-400 font-semibold text-center">Execute the audit on your resume to compile diagnostics.</p>
              </div>
            )}

            {/* Results Panel */}
            {score !== null && !analyzing && (
              <div className="space-y-6">
                
                {/* 1. Score Circle Gauge */}
                <div className="bento-card border-[#C9A84C]/40 bg-white shadow-md flex items-center gap-6 p-6">
                  
                  {/* Circular Progress Gauge */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        className="stroke-gray-100"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        className="stroke-[#C9A84C] gauge-circle"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 34}
                        strokeDashoffset={2 * Math.PI * 34 * (1 - score / 100)}
                      />
                    </svg>
                    <span className="absolute text-lg font-black text-black">{score}%</span>
                  </div>

                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-black text-base">Visibility Index</h4>
                      <span className="tag-accent !bg-red-50 !text-red-700 !border-red-100 uppercase !text-[8px] !py-0.5 font-black">Rejection Risk</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                      Your document indexation falls significantly below the 90% C-Suite hiring threshold.
                    </p>
                  </div>
                </div>

                {/* 2. Categorized Scores Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Compliance Score", score: "62%", state: "Critical", icon: <AlertTriangle className="w-4 h-4 text-red-600" /> },
                    { label: "Executive Density", score: "54%", state: "Poor", icon: <Activity className="w-4 h-4 text-red-600" /> },
                    { label: "P&L/Metrics Focus", score: "40%", state: "Alert", icon: <Target className="w-4 h-4 text-red-600" /> },
                    { label: "Formatting Integrity", score: "70%", state: "Warning", icon: <ShieldCheck className="w-4 h-4 text-yellow-600" /> }
                  ].map((cat, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between space-y-2 text-left shadow-2xs">
                      <div className="flex justify-between items-center">
                        {cat.icon}
                        <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          cat.state === "Warning" 
                            ? "bg-yellow-50 border border-yellow-200 text-yellow-800" 
                            : "bg-red-50 border border-red-200 text-red-800"
                        }`}>{cat.state}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">{cat.label}</span>
                        <span className="text-base font-black text-black mt-0.5">{cat.score}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3. Detailed Diagnostic Accordions */}
                <div className="bento-card border-gray-200 bg-white shadow-xs p-4 space-y-2">
                  <span className="text-[9px] font-bold font-mono tracking-widest text-gray-400 uppercase block mb-2 text-left">Detailed Breakdown</span>
                  
                  {/* Category 1: Parsing */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden text-left">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === "parsing" ? null : "parsing")}
                      className="w-full p-3.5 bg-gray-50 flex items-center justify-between font-bold text-xs text-black cursor-pointer"
                    >
                      <span className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-600" /> ATS Parsing Compliance</span>
                      <span className="text-xs text-gray-400">{activeAccordion === "parsing" ? "▲" : "▼"}</span>
                    </button>
                    {activeAccordion === "parsing" && (
                      <div className="p-3.5 bg-white text-xs text-gray-700 space-y-2 leading-relaxed">
                        <p>Our simulator flagged structural layout issues inside your headers and margins. Complex nested tables are diluting parser reading systems, resulting in skipped sections.</p>
                        <p className="text-red-700 font-bold">☠ Workday Risk: Highly Vulnerable to character skipping.</p>
                      </div>
                    )}
                  </div>

                  {/* Category 2: Keywords */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden text-left">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === "keywords" ? null : "keywords")}
                      className="w-full p-3.5 bg-gray-50 flex items-center justify-between font-bold text-xs text-black cursor-pointer"
                    >
                      <span className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-600" /> C-Suite Keyword Density</span>
                      <span className="text-xs text-gray-400">{activeAccordion === "keywords" ? "▲" : "▼"}</span>
                    </button>
                    {activeAccordion === "keywords" && (
                      <div className="p-3.5 bg-white text-xs text-gray-700 space-y-2 leading-relaxed">
                        <p>Found standard operations verbiage like "Responsible for". Vector scanning registers severe keyword dilution compared against standard C-Suite JDs.</p>
                        <p className="text-emerald-700 font-bold">✓ Strategy: Pooja will completely rewrite these sections using active metrics verbs.</p>
                      </div>
                    )}
                  </div>

                  {/* Category 3: Metrics */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden text-left">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === "metrics" ? null : "metrics")}
                      className="w-full p-3.5 bg-gray-50 flex items-center justify-between font-bold text-xs text-black cursor-pointer"
                    >
                      <span className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-600" /> P&L Ownership & Revenue Focus</span>
                      <span className="text-xs text-gray-400">{activeAccordion === "metrics" ? "▲" : "▼"}</span>
                    </button>
                    {activeAccordion === "metrics" && (
                      <div className="p-3.5 bg-white text-xs text-gray-700 space-y-2 leading-relaxed">
                        <p>Your resume outlines responsibilities, but completely fails to quantify financial outcomes, capital expansion, cost reductions, or P&L ratios.</p>
                        <p className="text-red-700 font-bold">☠ Hiring Panel Risk: Shortlist drops by 80% without solid numbers.</p>
                      </div>
                    )}
                  </div>

                </div>

                {/* 4. Strategic Call to Action Box */}
                <div className="p-6 rounded-2xl bg-black border border-black text-center space-y-4 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent-glow),_transparent)] opacity-40 pointer-events-none" />
                  
                  <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
                  <div className="space-y-1 z-10 relative">
                    <p className="text-sm text-white font-extrabold">Ready to Re-Architect Your Positioning?</p>
                    <p className="text-[11px] text-gray-300">
                      Book a strategy session with Pooja to map out the exact CAR achievements rewrite required to secure top indexation.
                    </p>
                  </div>
                  <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-accent w-full justify-center text-xs py-3.5 font-bold shadow-none">
                    <Calendar className="w-4 h-4 text-white" /> Schedule Positioning Lock
                  </a>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
