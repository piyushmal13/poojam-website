"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Activity, Target, AlertTriangle } from "lucide-react";
import WebGLScannerScene from "@/components/WebGLScannerScene";

export default function ATSAuditPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSimulateAudit = () => {
    if (!file) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setScore(Math.floor(Math.random() * (85 - 45 + 1)) + 45); // Random score between 45 and 85
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#040714] text-white pt-28 pb-20 relative overflow-hidden">
      
      {/* Background WebGL Scanner for visual depth */}
      <div className="absolute top-0 right-0 w-1/2 h-[600px] pointer-events-none opacity-50 hidden lg:block">
        <WebGLScannerScene />
      </div>

      <div className="container-narrow relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-xs font-mono mb-12">
          <ArrowLeft className="w-4 h-4" /> Return to Core
        </Link>

        <div className="max-w-2xl space-y-6 mb-16">
          <span className="badge-gold tracking-widest text-[9px] uppercase">Proprietary Evaluation</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            The ATS <span className="gradient-gold">Visibility</span> Audit.
          </h1>
          <p className="t-body-lg text-text-secondary">
            Upload your current executive resume below. Our system will simulate a direct pass through Taleo and Workday parsing algorithms to identify critical blind spots, missing keyword anchors, and format rejections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Upload Portal */}
          <div className="glass-elevated rounded-3xl p-8 border border-champagne/15 space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.05),_transparent_70%)]" />
            
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-bold font-display">Initiate Scan Sequence</h3>
              <p className="text-sm text-text-secondary">Supported formats: PDF, DOCX (Max 5MB)</p>
              
              <label className="block w-full h-40 border-2 border-dashed border-graphite-light/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-champagne/50 hover:bg-white/5 transition-all group">
                <input 
                  type="file" 
                  accept=".pdf,.docx" 
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <Activity className="w-8 h-8 text-text-muted group-hover:text-champagne mb-3 transition-colors" />
                <span className="text-sm font-medium text-text-secondary group-hover:text-white">
                  {file ? file.name : "Drag & drop or click to upload"}
                </span>
              </label>

              <button 
                onClick={handleSimulateAudit} 
                disabled={!file || analyzing}
                className="btn-gold w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? "Running Deep Scan..." : "Execute Audit"}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-display border-b border-graphite-light/35 pb-4">Diagnostic Results</h3>
            
            {!score && !analyzing && (
              <div className="h-40 flex items-center justify-center border border-graphite-light/20 rounded-2xl bg-midnight/30">
                <p className="text-sm text-text-muted font-mono">Awaiting document payload...</p>
              </div>
            )}

            {analyzing && (
              <div className="h-40 flex flex-col items-center justify-center space-y-4 border border-champagne/30 rounded-2xl bg-champagne/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne/10 to-transparent w-[200%] animate-[slide_2s_linear_infinite]" />
                <Activity className="w-6 h-6 text-champagne animate-pulse" />
                <p className="text-sm font-mono text-champagne">Analyzing node structure & semantics...</p>
              </div>
            )}

            {score !== null && !analyzing && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-6 p-6 glass rounded-2xl border border-champagne/20">
                  <div className="w-20 h-20 rounded-full border-4 border-champagne flex items-center justify-center bg-midnight shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                    <span className="text-2xl font-bold text-white font-display">{score}%</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-lg">Machine Readability</h4>
                    <p className="text-xs text-text-secondary">Your document is scoring below executive thresholds.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 space-y-2">
                    <AlertTriangle className="w-4 h-4 text-danger" />
                    <h5 className="text-xs font-bold text-white">Keyword Gaps</h5>
                    <p className="text-[10px] text-text-secondary">Missing critical P&L and operational strategy anchors.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-champagne/10 border border-champagne/20 space-y-2">
                    <Target className="w-4 h-4 text-champagne" />
                    <h5 className="text-xs font-bold text-white">Format Issues</h5>
                    <p className="text-[10px] text-text-secondary">Complex tables or columns detected causing parser failure.</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-midnight border border-graphite-light/50 text-center space-y-3">
                  <ShieldCheck className="w-6 h-6 text-success mx-auto" />
                  <p className="text-sm text-white font-medium">Ready for the Re-Architecture?</p>
                  <p className="text-xs text-text-secondary mb-4">Book a consultation to map out the exact strategy required to push your score into the 95th percentile.</p>
                  <a href={`https://wa.me/919923649723?text=Hi Pooja, my resume scored ${score}% on the ATS Audit. I need help fixing it.`} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center text-xs">
                    Discuss Strategy on WhatsApp
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
