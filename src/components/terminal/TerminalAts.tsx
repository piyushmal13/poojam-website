"use client";

import React, { useState, useEffect } from "react";
import { TerminalAudio } from "./TerminalAudio";
import { ShieldCheck, AlertTriangle, Lightbulb, FileText } from "lucide-react";

interface TerminalAtsProps {
  resumeText: string;
}

export const TerminalAts: React.FC<TerminalAtsProps> = ({ resumeText }) => {
  const [scanStep, setScanStep] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{
    targetRole: string;
    strengths: string[];
    warnings: string[];
    tips: string[];
    keywordsFound: string[];
    keywordsMissing: string[];
  } | null>(null);

  useEffect(() => {
    // Stage 1: Initial parsing loader
    const t1 = setTimeout(() => {
      setScanStep(1);
      TerminalAudio.playSuccessChime();
    }, 1000);

    // Stage 2: Matching metrics loader
    const t2 = setTimeout(() => {
      setScanStep(2);
      TerminalAudio.playSuccessChime();
    }, 2000);

    // Stage 3: Audit compilation
    const t3 = setTimeout(() => {
      setScanStep(3);
      runAtsAudit();
      TerminalAudio.playSuccessChime();
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const runAtsAudit = () => {
    const isMock = resumeText.toLowerCase().trim() === "mock" || !resumeText;
    const text = isMock ? "" : resumeText;

    // Standard list of keywords to look for
    const techSkills = ["react", "next.js", "typescript", "go", "rust", "kubernetes", "aws", "docker", "apis", "microservices"];
    const leadershipKeywords = ["budget", "scaled", "director", "manager", "vp", "executive", "head of", "roadmap", "strategy", "deliver"];
    const activeVerbs = ["engineered", "spearheaded", "orchestrated", "restructured", "optimized", "managed", "designed", "architected"];

    // Count keywords
    const foundTech = techSkills.filter(k => text.toLowerCase().includes(k));
    const foundLead = leadershipKeywords.filter(k => text.toLowerCase().includes(k));
    const foundVerbs = activeVerbs.filter(k => text.toLowerCase().includes(k));

    let finalScore = 65; // Base score
    let target = "Senior Software Engineer / Tech Lead";
    let strengths: string[] = [];
    let warnings: string[] = [];
    let tips: string[] = [];
    let missingKeywords: string[] = [];

    if (isMock) {
      // High-status template feedback
      finalScore = 84;
      target = "VP of Product Engineering / Director of Core Infrastructure";
      strengths = [
        "Strong leadership verb usage (Spearheaded, Orchestrated)",
        "Clear quantitative metrics (Scaled throughput by 140%)",
        "Includes critical distributed architecture toolsets"
      ];
      warnings = [
        "Missing explicitly defined R&D budget size ($ value)",
        "Over-reliance on passive phrases in past experience descriptions",
        "ATS compliance issue: Double-column layout detected in mock scanning"
      ];
      tips = [
        "Include budget oversight statements, e.g. 'Managed $3.5M annual operations budget'",
        "Convert double columns into a single chronological vertical track",
        "Add key technical competencies like 'Web Architecture modernizations' directly in executive summaries"
      ];
      foundTech.push("React", "Next.js", "APIs", "Microservices");
      foundLead.push("Scaled", "Strategy", "Manager", "VP");
      missingKeywords = ["Rust", "Kubernetes", "Budget", "Diligence"];
    } else {
      // Dynamic parsing on custom text input
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      
      // Upgrade role target based on keywords
      if (foundLead.length > 3) {
        target = "Director of Engineering / VP of Product Tech";
        finalScore += 15;
      } else if (foundLead.length > 0) {
        target = "Senior Lead Architect";
        finalScore += 10;
      }

      // Add scores based on findings
      finalScore += Math.min(foundTech.length * 3, 15);
      finalScore += Math.min(foundVerbs.length * 3, 15);
      
      if (wordCount < 100) {
        finalScore = Math.max(finalScore - 30, 30);
        warnings.push("Extremely low word count. Detailed descriptions missing.");
        tips.push("Expand bullet lists detailing concrete project responsibilities and accomplishments.");
      }

      if (foundVerbs.length < 3) {
        warnings.push("Low utilization of high-impact engineering action verbs.");
        tips.push("Swap passive phrases like 'Responsible for' with active hooks like 'Orchestrated' or 'Engineered'.");
      } else {
        strengths.push("Excellent utilization of active technical impact verbs.");
      }

      if (!text.toLowerCase().includes("budget") && !text.toLowerCase().includes("$")) {
        warnings.push("No quantifiable financial or budget size indicators detected.");
        tips.push("Include project budget parameters ($ amounts or % scale) to demonstrate high-level business trust.");
      } else {
        strengths.push("Solid tracking of quantifiable financial scopes and team sizes.");
      }

      // Populate keywords missing list
      missingKeywords = techSkills
        .concat(leadershipKeywords)
        .filter(k => !text.toLowerCase().includes(k))
        .slice(0, 4);

      // Clean casing for list display
      strengths.push(`Identified ${foundTech.length} primary infrastructure tools.`);
      
      // Bound final score
      finalScore = Math.min(finalScore, 98);
    }

    setScore(finalScore);
    setResults({
      targetRole: target,
      strengths,
      warnings,
      tips,
      keywordsFound: foundTech.concat(foundLead).slice(0, 5),
      keywordsMissing: missingKeywords
    });
  };

  return (
    <div className="font-mono text-xs max-w-2xl my-3 p-4 border border-zinc-850 bg-[#060608] rounded-xl relative overflow-hidden">
      {/* Background visual highlight */}
      <div className="absolute top-0 right-0 p-3 opacity-10">
        <FileText className="h-16 w-16 text-emerald-500" />
      </div>

      {/* Loading scan step bars */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2">
          <span className={scanStep >= 1 ? "text-emerald-400 font-bold" : "text-zinc-650 animate-pulse"}>
            {scanStep >= 1 ? "✔" : "⚡"} [01/03] Checking layout structures & parsing headers...
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={scanStep >= 2 ? "text-emerald-400 font-bold" : scanStep === 1 ? "text-zinc-450 animate-pulse" : "text-zinc-700"}>
            {scanStep >= 2 ? "✔" : scanStep === 1 ? "⚡" : "☐"} [02/03] Benchmarking executive semantic keywords & tools...
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={scanStep >= 3 ? "text-emerald-400 font-bold" : scanStep === 2 ? "text-zinc-450 animate-pulse" : "text-zinc-750"}>
            {scanStep >= 3 ? "✔" : scanStep === 2 ? "⚡" : "☐"} [03/03] Compiling structural audits & compatibility indexes...
          </span>
        </div>
      </div>

      {/* Complete Audit Dashboard */}
      {scanStep === 3 && results && (
        <div className="space-y-4 pt-3 border-t border-zinc-900 animate-fade-in">
          
          {/* Target Role & Rating Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/40">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Identified Target Vector</div>
              <div className="text-white font-bold text-sm mt-0.5 glow-text uppercase">{results.targetRole}</div>
            </div>
            
            {/* Circular score gauge */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-zinc-500 uppercase font-bold">ATS MATCH RATE</span>
                <div className="font-mono text-emerald-400 font-extrabold text-lg mt-0.5">{score}%</div>
              </div>
              <div className="h-9 w-24 border border-zinc-800 bg-black rounded overflow-hidden p-0.5 flex items-center">
                <div 
                  className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-1000"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Audit Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths Column */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Structural Strengths</span>
              </div>
              <ul className="space-y-1.5 pl-1">
                {results.strengths.map((str, i) => (
                  <li key={i} className="flex gap-2 text-zinc-400 items-start">
                    <span className="text-emerald-500 shrink-0">✔</span>
                    <span className="leading-tight">{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warnings Column */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                <span>Compatibility Warnings</span>
              </div>
              <ul className="space-y-1.5 pl-1">
                {results.warnings.map((warn, i) => (
                  <li key={i} className="flex gap-2 text-zinc-400 items-start">
                    <span className="text-amber-500 shrink-0">▲</span>
                    <span className="leading-tight">{warn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optimization Guides */}
          <div className="space-y-2 bg-zinc-950/40 p-3 rounded-lg border border-zinc-800/40">
            <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <Lightbulb className="h-3.5 w-3.5 text-emerald-400" />
              <span>Recommended Optimization Tasks</span>
            </div>
            <ul className="space-y-2 pl-1 mt-1">
              {results.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-zinc-300 items-start">
                  <span className="text-emerald-500 shrink-0 font-bold">[{i+1}]</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Words Analytics */}
          <div className="flex flex-wrap gap-4 text-[10px] pt-1">
            <div className="flex items-center gap-1">
              <span className="text-zinc-500 font-bold uppercase">Competencies Found:</span>
              <div className="flex flex-wrap gap-1">
                {results.keywordsFound.map(k => (
                  <span key={k} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-sm px-1.5 py-0.5">{k}</span>
                ))}
              </div>
            </div>
            
            {results.keywordsMissing.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-zinc-500 font-bold uppercase">Target Gap Additions:</span>
                <div className="flex flex-wrap gap-1">
                  {results.keywordsMissing.map(k => (
                    <span key={k} className="bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-sm px-1.5 py-0.5">{k}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Call to action */}
          <div className="text-[10px] text-zinc-500 text-center border-t border-zinc-900/60 pt-2.5">
            Want to review these adjustments? Request an Executive Advising Session.
          </div>

        </div>
      )}
    </div>
  );
};
