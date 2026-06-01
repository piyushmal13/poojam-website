"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Activity, Target, AlertTriangle } from "lucide-react";

// Placeholder Calendly - the user can replace this later.
const CALENDLY_LINK = "https://calendly.com/your-calendly-link"; 

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
    <div className="min-h-screen bg-white text-[#111827] pt-24 md:pt-32 pb-16 md:pb-20 relative overflow-hidden font-sans">
      
      {/* Light Abstract Background Elements */}
      <div className="blur-blob w-[300px] h-[300px] bg-[#C9A84C]/20 top-[-50px] right-[-50px] anim-pulse hidden md:block" />
      <div className="blur-blob w-[300px] h-[300px] bg-[#34D399]/15 bottom-[10%] left-[-50px] anim-float delay-2 hidden md:block" />

      <div className="container-main relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-xs font-mono font-bold mb-8 md:mb-12">
          <ArrowLeft className="w-4 h-4" /> Return to Main
        </Link>

        <div className="max-w-2xl space-y-4 md:space-y-6 mb-10 md:mb-16">
          <span className="tag-accent border border-[#C9A84C]/30 bg-white text-[#B29440] shadow-sm">Proprietary Evaluation</span>
          <h1 className="heading-lg text-3d text-black">
            The ATS <span className="accent-text">Visibility</span> Audit.
          </h1>
          <p className="text-body-lg text-sm md:text-base">
            Upload your resume. Our system simulates a pass through Taleo and Workday to identify blind spots and format rejections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Upload Portal */}
          <div className="bento-card bg-gray-50 border-gray-200 shadow-sm space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h3 className="heading-md">Initiate Scan Sequence</h3>
              <p className="text-xs md:text-sm text-gray-500 font-medium">Supported formats: PDF, DOCX (Max 5MB)</p>
              
              <label className="block w-full h-32 md:h-40 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all group bg-white">
                <input 
                  type="file" 
                  accept=".pdf,.docx" 
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-gray-400 group-hover:text-[#C9A84C] mb-2 md:mb-3 transition-colors" />
                <span className="text-xs md:text-sm font-bold text-gray-600 group-hover:text-black text-center px-4">
                  {file ? file.name : "Drag & drop or click to upload"}
                </span>
              </label>

              <button 
                onClick={handleSimulateAudit} 
                disabled={!file || analyzing}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {analyzing ? "Running Deep Scan..." : "Execute Audit"}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="heading-md border-b border-gray-200 pb-3 md:pb-4">Diagnostic Results</h3>
            
            {!score && !analyzing && (
              <div className="h-32 md:h-40 flex items-center justify-center border border-gray-200 rounded-2xl bg-gray-50 shadow-inner">
                <p className="text-xs md:text-sm text-gray-400 font-mono font-bold">Awaiting document payload...</p>
              </div>
            )}

            {analyzing && (
              <div className="h-32 md:h-40 flex flex-col items-center justify-center space-y-3 md:space-y-4 border border-[#C9A84C]/30 rounded-2xl bg-[#C9A84C]/5 relative overflow-hidden">
                <Activity className="w-5 h-5 md:w-6 md:h-6 text-[#C9A84C] anim-pulse" />
                <p className="text-xs md:text-sm font-mono font-bold text-[#C9A84C]">Analyzing node structure...</p>
              </div>
            )}

            {score !== null && !analyzing && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bento-card bg-white border-gray-200 shadow-sm">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-[#C9A84C] flex items-center justify-center bg-gray-50 shadow-md">
                    <span className="text-xl md:text-2xl font-black text-black">{score}%</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-black text-base md:text-lg">Machine Readability</h4>
                    <p className="text-[10px] md:text-xs text-gray-500 font-medium">Your document is scoring below executive thresholds.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 rounded-xl bg-red-50 border border-red-100 space-y-1.5 md:space-y-2">
                    <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600" />
                    <h5 className="text-[10px] md:text-xs font-bold text-red-900">Keyword Gaps</h5>
                    <p className="text-[9px] md:text-[10px] text-red-700/80 font-medium">Missing critical P&L anchors.</p>
                  </div>
                  <div className="p-3 md:p-4 rounded-xl bg-yellow-50 border border-yellow-200 space-y-1.5 md:space-y-2">
                    <Target className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-600" />
                    <h5 className="text-[10px] md:text-xs font-bold text-yellow-900">Format Issues</h5>
                    <p className="text-[9px] md:text-[10px] text-yellow-700/80 font-medium">Complex tables causing parsing failure.</p>
                  </div>
                </div>

                <div className="p-5 md:p-6 rounded-2xl bg-black border border-black text-center space-y-2 md:space-y-3 shadow-xl">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-[#34D399] mx-auto" />
                  <p className="text-xs md:text-sm text-white font-bold">Ready for the Re-Architecture?</p>
                  <p className="text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4">Map out the exact strategy required to push your score into the 95th percentile.</p>
                  <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-accent w-full justify-center text-[10px] md:text-xs py-3 shadow-none border border-[#C9A84C]/50">
                    Discuss Strategy (Calendly)
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
