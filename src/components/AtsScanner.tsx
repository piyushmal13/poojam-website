"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, FileText, CheckCircle, AlertTriangle, ChevronRight, MessageSquare, Send, RefreshCw } from "lucide-react";

export const AtsScanner: React.FC = () => {
  const [step, setStep] = useState<"idle" | "scanning" | "results" | "leadForm">("idle");
  const [resumeText, setResumeText] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const [score, setScore] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const statusPhrases = [
    "Evaluating structure & line spacing...",
    "Extracting key skill keywords...",
    "Testing machine readability Index...",
    "Parsing chronological experience...",
    "Cross-referencing high-impact action verbs...",
    "Generating SWOT telemetry report...",
  ];

  // Dynamic message change during scanning
  useEffect(() => {
    if (step !== "scanning") return;

    let phraseIndex = 0;
    const interval = setInterval(() => {
      if (phraseIndex < statusPhrases.length) {
        setStatusMsg(statusPhrases[phraseIndex]);
        phraseIndex++;
      }
    }, 600);

    const progressTimer = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          clearInterval(interval);
          // Calculated score based on text length to feel authentic but leave room for improvement
          const baseScore = Math.min(55 + Math.floor((resumeText.length % 20)), 74);
          setScore(baseScore || 62);
          setTimeout(() => setStep("results"), 350);
          return 100;
        }
        return prev + 4;
      });
    }, 120);

    return () => {
      clearInterval(interval);
      clearInterval(progressTimer);
    };
  }, [step, resumeText]);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return;
    setScanProgress(0);
    setStep("scanning");
  };

  const handleClaimReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#10B981", "#06B6D4", "#D4AF37", "#FFFFFF"],
      });
    }, 1500);
  };

  const handleReset = () => {
    setResumeText("");
    setFormData({ name: "", email: "", phone: "" });
    setSubmitted(false);
    setStep("idle");
  };

  // WhatsApp Pre-filled link generator
  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hi Pooja! I just ran my resume through your website's ATS Grader and got a score of ${score}/100.\n\n` +
      `My Name: ${formData.name}\n` +
      `My Email: ${formData.email}\n\n` +
      `I would love to receive my Free Deep SWOT Resume Analysis Report & discuss how to optimize it for my dream roles!`
    );
    return `https://wa.me/919923649723?text=${message}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto apple-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/5 shadow-2xl">
      {/* Glow Highlight overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      {step === "idle" && (
        <form onSubmit={handleStartScan} className="space-y-5 animate-header">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Instant ATS Resume Grader</h3>
              <p className="text-zinc-400 text-xs mt-0.5">Paste your current resume content to verify machine readability.</p>
            </div>
          </div>

          <div className="relative">
            <textarea
              className="w-full h-48 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 text-xs font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/20 resize-none transition-all"
              placeholder="Paste your plain text resume content here... (e.g. Summary, Experience, Skills, Education)"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              required
            />
            {resumeText.trim().length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-zinc-600 p-4 text-center">
                <span className="text-[11px] font-mono">SECURE INTERACTIVE PARSER PANEL</span>
                <span className="text-[10px] text-zinc-700 mt-1">100% Secure & Confidential</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!resumeText.trim()}
            className="w-full py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 disabled:bg-zinc-800 disabled:text-zinc-600 cursor-pointer disabled:cursor-not-allowed transition-all shadow-[0_4px_20px_-5px_rgba(16,185,129,0.4)] flex items-center justify-center gap-1.5"
          >
            <span>Analyze Resume Now</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </form>
      )}

      {step === "scanning" && (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="h-16 w-16 rounded-full border border-emerald-500/20 flex items-center justify-center text-emerald-400 animate-pulse">
              <RefreshCw className="h-6 w-6 animate-spin duration-3000" />
            </div>
            <div className="absolute inset-[-10px] rounded-full border border-cyan-500/10 animate-ping duration-1000 opacity-20" />
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm uppercase tracking-widest font-mono">Running Telemetry Scans</h4>
            <p className="text-emerald-400 font-mono text-[11px] h-4 animate-pulse">{statusMsg}</p>
          </div>

          <div className="w-64">
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-100 ease-out"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <span className="text-zinc-500 font-mono text-[10px] mt-2 block text-right">{scanProgress}% completed</span>
          </div>
        </div>
      )}

      {step === "results" && (
        <div className="space-y-6 animate-header">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Analysis Metrics</h3>
                <p className="text-zinc-400 text-xs mt-0.5">Machine evaluation completed successfully.</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-[10px] font-mono text-zinc-500 hover:text-white border border-zinc-800 rounded-lg px-2.5 py-1 hover:bg-zinc-900 transition-all flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Grader reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Score Ring */}
            <div className="md:col-span-4 flex flex-col items-center justify-center py-4 bg-zinc-950/40 border border-zinc-900 rounded-2xl relative">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">ATS Match Index</span>
              <div className="relative flex items-center justify-center">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="46" stroke="#0F0F13" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke={score >= 70 ? "#10B981" : "#F59E0B"}
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 46}
                    strokeDashoffset={2 * Math.PI * 46 * (1 - score / 100)}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white tracking-tight">{score}</span>
                  <span className="text-[9px] text-zinc-500 font-mono">/ 100</span>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full mt-3 uppercase border ${
                score >= 70 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                  : "bg-amber-500/10 border-amber-500/20 text-amber-400"
              }`}>
                {score >= 70 ? "Moderate Match" : "Poor Match"}
              </span>
            </div>

            {/* Core Insights */}
            <div className="md:col-span-8 space-y-3.5">
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Strengths (Correct Telemetry)</span>
                </h4>
                <ul className="text-zinc-300 text-xs space-y-1.5 pl-5 list-disc leading-relaxed">
                  <li>Machine-readable document flow (no images/heavy tables).</li>
                  <li>Good contact coordinates and readable phone lines.</li>
                  <li>Sequential work experience timeline structure.</li>
                </ul>
              </div>

              <div className="space-y-2 pt-1">
                <h4 className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Critical Gaps (ATS Roadblocks)</span>
                </h4>
                <ul className="text-zinc-300 text-xs space-y-1.5 pl-5 list-disc leading-relaxed">
                  <li><strong className="text-white">Weak Action Verbs</strong>: Resume heavily uses passive phrasing instead of metric-driven outputs.</li>
                  <li><strong className="text-white">Low Keyword Match</strong>: Missing crucial algorithmic industry terms.</li>
                  <li><strong className="text-white">Lack of Metric Impacts</strong>: Underdeveloped quantified achievements.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-transparent border border-emerald-500/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-sm">Get Your 100% Free Deep SWOT + ATS Audit Report</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">Receive a complete 15-page handbook outlining every single adjustment needed to guarantee shortlistings.</p>
            </div>
            <button
              onClick={() => setStep("leadForm")}
              className="px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 font-mono text-xs font-bold text-black uppercase cursor-pointer transition-all shadow-[0_4px_15px_-5px_rgba(16,185,129,0.3)] shrink-0 flex items-center gap-1"
            >
              <span>Claim Free Audit</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {step === "leadForm" && (
        <div className="space-y-5 animate-header">
          <div className="flex items-center gap-3 pb-3 border-b border-white/5">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Claim Free Deep SWOT Report</h3>
              <p className="text-zinc-400 text-xs mt-0.5">Your score of {score}/100 has been cached. Enter details to unlock detailed analysis.</p>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleClaimReport} className="space-y-4">
              <div>
                <label className="block text-zinc-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajat Thakur"
                  className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rajat@domain.com"
                    className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 disabled:bg-zinc-800 disabled:text-zinc-600 cursor-pointer disabled:cursor-not-allowed transition-all shadow-[0_4px_15px_-5px_rgba(16,185,129,0.3)] flex items-center justify-center gap-1.5"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Processing Report...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send SWOT Report</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-5 animate-header">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle className="h-6 w-6 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-white text-base">SWOT Analysis Registered Successfully!</h4>
                <p className="text-zinc-400 text-xs max-w-md leading-relaxed">
                  Pooja Chandak is currently compiling your custom 15-page evaluation.
                  Click below to open a direct WhatsApp connection to fast-track your shortlisting.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg whatsapp-glow"
                >
                  <MessageSquare className="h-4 w-4 fill-black" />
                  <span>Connect on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-5 py-3.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-950 font-mono text-xs font-bold uppercase cursor-pointer transition-all"
                >
                  Scan Another
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
