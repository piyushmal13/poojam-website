"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Star, CheckCircle, X, ArrowRight, MessageSquare, Calendar, Shield,
  Users, Zap, FileText, Linkedin, Phone, MapPin, Clock, Quote, Menu,
  BarChart2, Target, Sparkles, Check, ChevronDown, UserCheck, ArrowUpRight
} from "lucide-react";

import {
  MOCK_REVIEWS,
  MOCK_CASE_STUDIES,
  MOCK_SERVICES,
  MOCK_BLOGS,
  MockService,
  MockCaseStudy
} from "@/lib/mockDb";

import { parseAtsMatch, ParseResult } from "@/lib/atsEngine";

const WA = "919923649723";
const LINKEDIN = "https://www.linkedin.com/in/pooja-chandak-0b409a52/";
const wa = (msg?: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hi Pooja! I'd like to discuss my career strategy.")}`;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<MockService | null>(null);
  const [activeDossier, setActiveDossier] = useState<MockCaseStudy>(MOCK_CASE_STUDIES[0]);
  const [selectedBlog, setSelectedBlog] = useState<typeof MOCK_BLOGS[0] | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Real ATS Scanner Tool state
  const [resumeInput, setResumeInput] = useState("");
  const [jdInput, setJdInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ParseResult | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAtsAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeInput.trim() || !jdInput.trim()) return;

    setScanning(true);
    // Simulate high-tech parsing lag for realistic feedback
    setTimeout(() => {
      const result = parseAtsMatch(resumeInput, jdInput);
      setScanResult(result);
      setScanning(false);
      // Scroll smoothly to results
      const resultsSection = document.getElementById("ats-results");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 1200);
  };

  const loadExampleInputs = () => {
    setResumeInput(
      "Senior Product Manager. Responsible for managing fintech product lifecycles, collaborating with engineering teams, drafting PRDs, and monitoring KPI metrics daily. Supervised QA testing cycles and verified standard documentation processes."
    );
    setJdInput(
      "Requirements: Lead GTM product strategy, manage P&L boundaries, and drive cross-functional engineering execution. Establish technical roadmap priorities, track MAU scaling, and optimize ROI bottom-line metrics."
    );
  };

  return (
    <div className="relative min-h-screen bg-[#040714] text-[#F0EDE6] selection:bg-champagne/20 font-body select-text">
      
      {/* Volumetric ambient background noise / light cone grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--color-graphite-light),_transparent)]" />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_bottom,_var(--color-obsidian),_transparent)]" />

      {/* ═══════════════════════════════════════════
          NAVIGATION HEADER
          ═══════════════════════════════════════════ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#040714]/92 backdrop-blur-2xl border-b border-graphite-light/35 py-3" : "py-6 bg-transparent"}`}>
        <div className="container-wide flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 select-none group">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center font-display text-sm text-champagne font-bold" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>PM</div>
            <div className="text-[12px] font-bold tracking-[0.2em] text-white uppercase transition-colors group-hover:text-champagne">Pooja Malpani Advisory</div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              ["#matcher", "ATS Keyword Matcher"],
              ["#services", "Consulting Programs"],
              ["#stories", "Placement Dossiers"],
              ["#reviews", "Verifiable Reviews"],
              ["#faq", "FAQ"]
            ].map(([h, l]) => (
              <a key={h} href={h} className="text-[11px] font-mono tracking-widest text-text-secondary hover:text-white transition-colors">{l.toUpperCase()}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="hidden sm:flex btn-outline" style={{ padding: "0.5rem 1.25rem", fontSize: "0.7rem" }}>
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <button onClick={() => setBookOpen(true)} className="btn-gold" style={{ padding: "0.5rem 1.25rem", fontSize: "0.7rem" }}>
              <Calendar className="w-3.5 h-3.5" /> Book Consultation
            </button>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-text-secondary hover:text-white" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#040714]/98 backdrop-blur-2xl flex flex-col">
          <div className="container-wide flex justify-between items-center py-5">
            <span className="t-overline">Advisory Menu</span>
            <button onClick={() => setMenuOpen(false)} className="p-2 text-text-secondary hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <nav className="flex-1 flex flex-col justify-center container-wide gap-8">
            {[
              ["#matcher", "ATS Keyword Matcher"],
              ["#services", "Consulting Programs"],
              ["#stories", "Placement Dossiers"],
              ["#reviews", "Verifiable Reviews"],
              ["#faq", "FAQ"]
            ].map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)} className="text-3xl text-white hover:text-champagne transition-colors font-display">{l}</a>
            ))}
          </nav>
          <div className="container-wide pb-10 flex flex-col gap-3">
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center"><MessageSquare className="w-4 h-4" /> WhatsApp</a>
            <button onClick={() => { setBookOpen(true); setMenuOpen(false); }} className="btn-gold w-full justify-center"><Calendar className="w-4 h-4" /> Book Consultation</button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          HERO SECTION (Clarity, Value, Professionalism)
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden">
        <div className="container-wide relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Premium Value Prop */}
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-4">
                <span className="badge-gold tracking-widest text-[9px] uppercase">Executive Career Architect</span>
                <h1 className="t-display leading-tight text-white">
                  Tailor your career <br />
                  <span className="gradient-gold">positioning</span>. Command <br />
                  the shortlists.
                </h1>
                <p className="t-body-lg text-text-secondary max-w-lg">
                  I help mid-to-senior executives re-architect their resumes and LinkedIn profiles into algorithm-proof, high-authority brand assets that secure elite shortlists.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#matcher" className="btn-gold"><Target className="w-4 h-4" /> Try Live ATS Scanner</a>
                <button onClick={() => setBookOpen(true)} className="btn-outline"><Calendar className="w-4 h-4" /> Book Discovery Call</button>
              </div>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-graphite-light/50">
                {[
                  { label: "5.0 ★ Google Rating", sub: "Verifiable Client Audits" },
                  { label: "13+ Years Advisory", sub: "Cooperative Auditing Rigor" },
                  { label: "500+ Placements", sub: "IT, Finance, Operations" }
                ].map((badge, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[12px] font-bold text-white block">{badge.label}</span>
                    <span className="t-label text-[8px] text-text-secondary block">{badge.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: High-end Professional Portrait */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-sm" style={{ filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.85))" }}>
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--color-champagne-light),_transparent)] opacity-10 blur-xl scale-110" />
                <div className="relative z-10 rounded-3xl overflow-hidden border border-champagne/15" style={{ aspectRatio: "4/5", background: "linear-gradient(135deg, #0A0E23, #040714)" }}>
                  <Image src="/pooja-headshot.png" alt="Pooja Malpani" fill priority sizes="(max-width: 768px) 100vw, 400px" className="object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 glass-elevated rounded-2xl p-4 border border-champagne/15 text-center">
                    <span className="text-[9px] font-mono text-champagne tracking-widest block">EXECUTIVE CAREER STRATEGIST</span>
                    <span className="text-sm font-bold text-white font-display mt-0.5 block">Pooja Malpani</span>
                    <span className="text-[10px] text-text-secondary mt-0.5 block">MMS Finance · Ex-Maharashtra Cooperative Auditor</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          REAL INTERACTIVE ATS KEYWORD MATCHER (Teal / SkillSyncer Style)
          ═══════════════════════════════════════════ */}
      <section id="matcher" className="section-spacing relative z-10 border-t border-graphite-light/50 bg-midnight/30">
        <div className="container-narrow space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="t-overline text-champagne">Algorithmic Diagnostic Tool</span>
            <h2 className="t-headline">ATS Resume <span className="gradient-gold">Keyword Matcher</span>.</h2>
            <p className="t-body text-xs">
              SkillSyncer & TealHQ inspired side-by-side keyword parser. Verify how well your resume matches your target job description in real-time.
            </p>
          </div>

          <form onSubmit={handleAtsAnalysis} className="space-y-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={loadExampleInputs}
                className="text-[10px] font-mono text-champagne hover:text-white border border-champagne/25 hover:border-champagne rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
              >
                ⚡ LOAD SENIOR PM AUDIT EXAMPLE
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel: Resume */}
              <div className="glass rounded-2xl p-5 border border-graphite-light/50 space-y-3">
                <label className="t-label text-white flex justify-between">
                  <span>1. Your Current Resume text</span>
                  <span className="text-text-secondary text-[8px]">PASTE EXPERIENCE OR BULLET POINTS</span>
                </label>
                <textarea
                  required
                  placeholder="Paste your resume experience section or selected bullet points here..."
                  className="w-full rounded-xl p-4 text-[12px] text-white bg-midnight/65 border border-graphite-light/45 focus:outline-none focus:border-champagne/40 h-64 resize-none font-mono"
                  value={resumeInput}
                  onChange={(e) => setResumeInput(e.target.value)}
                />
              </div>

              {/* Right Panel: Job Description */}
              <div className="glass rounded-2xl p-5 border border-graphite-light/50 space-y-3">
                <label className="t-label text-white flex justify-between">
                  <span>2. Target Job Description</span>
                  <span className="text-text-secondary text-[8px]">PASTE JD REQUIREMENTS OR SKILLS</span>
                </label>
                <textarea
                  required
                  placeholder="Paste the target job description or core requirements here..."
                  className="w-full rounded-xl p-4 text-[12px] text-white bg-midnight/65 border border-graphite-light/45 focus:outline-none focus:border-champagne/40 h-64 resize-none font-mono"
                  value={jdInput}
                  onChange={(e) => setJdInput(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={scanning}
                className="btn-gold px-10 py-4 justify-center text-xs tracking-wider"
              >
                {scanning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-midnight border-t-transparent rounded-full animate-spin mr-2" />
                    RUNNING AUDIT DIAGNOSTICS...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4" /> RUN ATS DIAGNOSTIC MATCH
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Real-time Diagnostics Output Section */}
          {scanResult && (
            <div id="ats-results" className="glass-elevated rounded-3xl p-8 border border-champagne/25 space-y-8 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-graphite-light/50">
                <div>
                  <span className="text-[10px] font-mono text-champagne tracking-widest uppercase">Diagnostic Results</span>
                  <h3 className="text-2xl font-bold font-display text-white mt-1">Audit Scorecard</h3>
                </div>
                <div className="flex items-center gap-4 bg-midnight/65 border border-graphite-light/50 rounded-2xl px-6 py-4">
                  <div>
                    <span className="text-[9px] font-mono text-text-secondary block uppercase">Keyword Match</span>
                    <span className="text-3xl font-bold font-display text-white mt-0.5 block">{scanResult.score}%</span>
                  </div>
                  <div className="w-px h-10 bg-graphite-light/50" />
                  <div>
                    <span className="text-[9px] font-mono text-text-secondary block uppercase">Verdict</span>
                    <span className={`text-[10px] font-mono font-bold tracking-widest mt-0.5 block ${scanResult.score >= 70 ? "text-success" : "text-danger"}`}>
                      {scanResult.score >= 70 ? "OPTIMIZED PROFILE" : "CRITICAL KEYWORD GAP"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills Overlap Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Matching Skills */}
                <div className="space-y-3">
                  <span className="t-overline text-success flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Matching Keywords ({scanResult.matchingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {scanResult.matchingSkills.length > 0 ? (
                      scanResult.matchingSkills.map((skill, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg bg-success/5 border border-success/20 text-success uppercase">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-text-secondary italic">No matching keywords found.</span>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="space-y-3">
                  <span className="t-overline text-danger flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5" /> Missing Keyword Gaps ({scanResult.missingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {scanResult.missingSkills.length > 0 ? (
                      scanResult.missingSkills.map((skill, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg bg-danger/5 border border-danger/25 text-danger uppercase">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-success italic">No critical missing keywords identified!</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actionable recommendations */}
              <div className="bg-midnight/55 rounded-2xl p-6 border border-graphite-light/50 space-y-4">
                <span className="text-[10px] font-mono text-champagne block uppercase tracking-widest">Tactical Audit Suggestions</span>
                <ul className="space-y-3 text-[12px] font-mono leading-relaxed">
                  {scanResult.advice.map((adv, i) => (
                    <li key={i} className={adv.startsWith("✓") ? "text-success" : adv.startsWith("✗") || adv.startsWith("⚠") ? "text-danger" : "text-text-secondary"}>
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pre-filled WhatsApp CTA */}
              <div className="pt-6 border-t border-graphite-light/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[11px] text-text-secondary">
                  Send your match scorecard directly to Pooja to discuss a strategic resume rewrite.
                </span>
                <a
                  href={wa(
                    `Hi Pooja! I ran your ATS Matcher. My score is ${scanResult.score}%. My missing keyword gaps are: ${scanResult.missingSkills.join(", ")}. I'd like to discuss an optimization strategy.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-xs tracking-wider justify-center w-full sm:w-auto"
                >
                  <MessageSquare className="w-4 h-4" /> Forward Scorecard to Pooja
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GENUINE CORPORATE ADVISORY SERVICES
          ═══════════════════════════════════════════ */}
      <section id="services" className="section-spacing relative z-10">
        <div className="container-narrow space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="t-overline text-champagne">Consulting Programs</span>
            <h2 className="t-headline">Corporate Positioning <span className="gradient-gold">Services</span>.</h2>
            <p className="t-body text-xs">
              Rigorous, audit-backed re-branding packages tailored for Director, VP, and C-Suite career pivots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_SERVICES.map((svc) => (
              <div
                key={svc.id}
                onClick={() => setSelectedService(svc)}
                className="glass rounded-3xl p-6 border border-graphite-light/50 flex flex-col justify-between hover:border-champagne/45 transition-all cursor-pointer group glass-interactive"
              >
                <div className="space-y-4">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-champagne/5 text-champagne border border-champagne/15 group-hover:bg-champagne/10 transition-colors">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display truncate">{svc.name}</h3>
                    <p className="text-[10px] font-mono text-text-secondary mt-1">{svc.subtitle}</p>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    {svc.description.slice(0, 85)}...
                  </p>
                </div>

                <div className="pt-6 border-t border-graphite-light/50 mt-6 flex items-center justify-between">
                  <span className="text-sm font-bold font-mono text-champagne">{svc.price}</span>
                  <span className="text-[10px] font-mono text-text-muted hover:text-white flex items-center gap-1 transition-colors">
                    EXPLORE <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PLACEMENT DOSSIERS (Zepto, PhonePe, Salesforce)
          ═══════════════════════════════════════════ */}
      <section id="stories" className="section-spacing relative z-10 border-t border-graphite-light/35 bg-midnight/10">
        <div className="container-narrow space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="t-overline text-champagne">Verified Outcomes</span>
            <h2 className="t-headline">Executive Placement <span className="gradient-gold">Dossiers</span>.</h2>
            <p className="t-body text-xs">
              Examine the exact side-by-side CAR outcome translations executed for our C-Suite clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Selection Column */}
            <div className="space-y-2">
              {MOCK_CASE_STUDIES.map((cs) => (
                <button
                  key={cs.id}
                  onClick={() => setActiveDossier(cs)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${activeDossier.id === cs.id ? "bg-graphite/45 border-champagne" : "bg-transparent border-graphite-light/45 hover:border-white/20"}`}
                >
                  <span className="text-[9px] font-mono text-champagne block">{cs.industry}</span>
                  <span className="text-sm font-semibold text-white font-display mt-1 block">{cs.name}</span>
                </button>
              ))}
            </div>

            {/* Comparison detail card */}
            <div className="lg:col-span-2 glass-elevated rounded-3xl p-8 border border-champagne/15 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono text-text-muted block">CTC TRANSFORMATION</span>
                  <span className="text-2xl font-bold font-display text-success mt-1 block">
                    {activeDossier.before_ctc} → {activeDossier.after_ctc}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-y border-graphite-light/50 py-4">
                  <div>
                    <span className="text-[9px] font-mono text-text-muted block">TIMELINE</span>
                    <span className="text-[12px] font-semibold text-white mt-0.5 block">{activeDossier.timeline}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-text-muted block">LINKEDIN LINK</span>
                    <span className="text-[12px] font-semibold text-champagne mt-0.5 block">SSI Score: 84+</span>
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-text-muted block">OUTCOME OVERVIEW</span>
                  <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
                    {activeDossier.story}
                  </p>
                </div>
              </div>

              {/* Before and After resume comparison details */}
              <div className="space-y-4 bg-midnight/55 rounded-2xl p-5 border border-graphite-light/50">
                <div>
                  <span className="text-[9px] font-mono text-danger uppercase tracking-wider block">✗ Before Audit (Tactical description)</span>
                  <p className="text-[11px] font-mono text-danger/80 leading-relaxed mt-1">
                    "{activeDossier.resume_before}"
                  </p>
                </div>
                <div className="h-[1px] bg-graphite-light/50" />
                <div>
                  <span className="text-[9px] font-mono text-success uppercase tracking-wider block">✓ After Audit (Strategic Outcome)</span>
                  <p className="text-[11px] font-mono text-success leading-relaxed mt-1">
                    "{activeDossier.resume_after}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VERIFIABLE GOOGLE & LINKEDIN REVIEWS WALL
          ═══════════════════════════════════════════ */}
      <section id="reviews" className="section-spacing relative z-10">
        <div className="container-narrow space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="t-overline text-champagne">Client Testimonials</span>
            <h2 className="t-headline">Google & LinkedIn <br /><span className="gradient-gold">Advisory Reviews Wall</span>.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_REVIEWS.map((rev) => (
              <div key={rev.id} className="glass rounded-3xl p-6 border border-graphite-light/45 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 star-gold" />
                    ))}
                  </div>
                  <span className="badge-success text-[8px]">{rev.result}</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed italic">
                  "{rev.text}"
                </p>
                <div className="flex gap-3 items-center pt-4 border-t border-graphite-light/50">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs bg-graphite text-champagne border border-champagne/15">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{rev.name}</h4>
                    <p className="text-[9px] font-mono text-text-muted mt-0.5">{rev.role} · {rev.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ SECTION
          ═══════════════════════════════════════════ */}
      <section id="faq" className="section-spacing relative z-10 border-t border-graphite-light/35 bg-[#030512]">
        <div className="container-reading space-y-8">
          <div className="text-center space-y-3">
            <span className="t-overline text-champagne">Common Enquiries</span>
            <h2 className="t-headline">Frequently Asked <span className="gradient-gold">Aspects</span>.</h2>
          </div>

          <div className="space-y-3">
            {[
              { q: "What makes your positioning methodology different from standard writing services?", a: "Standard services focus on formatting and passive descriptions. I focus on strategic auditing. I analyze exact search parameters, structure achievements applying financial auditing rigor, and translate simple task columns into metric-backed outcomes." },
              { q: "Can I speak to you before booking a consulting program?", a: "Yes. I offer a free 15-minute discovery consultation. We review your current CV keyword alignment and map out the exact visible friction points." },
              { q: "What is your standard turnaround window?", a: "Typically, LinkedIn optimization takes 4 business days, and a full executive brand rewrite is completed within 10–14 days." }
            ].map((faq, idx) => (
              <div key={idx} className="glass rounded-2xl overflow-hidden border border-graphite-light/50">
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-[13px] font-semibold text-white leading-snug">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-champagne flex-shrink-0 transition-transform duration-300 ${faqOpen === idx ? "rotate-180" : ""}`} />
                </button>
                <div className={`accordion-body ${faqOpen === idx ? "open" : ""}`}>
                  <div>
                    <div className="px-6 pb-5">
                      <div className="h-px bg-graphite-light/50 mb-4" />
                      <p className="text-[12px] text-text-secondary leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CALL TO ACTION
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative z-10 overflow-hidden bg-[#030512]">
        <div className="container-narrow">
          <div
            className="relative rounded-3xl text-center px-8 py-16 md:py-24 overflow-hidden border border-champagne/20"
            style={{ background: "linear-gradient(135deg, #0A0E23, #141B3A 50%, #0A0E23)", boxShadow: "0 0 100px rgba(201,168,76,0.05)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-champagne-light),_transparent)] opacity-5 blur-2xl" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="badge-gold mx-auto">EXCLUSIVE PROGRAM SPOTS</span>
              <h2 className="t-headline">Ready to stop being <span className="gradient-gold">invisible</span>?</h2>
              <p className="t-body max-w-lg mx-auto text-xs">
                Every day you apply with unoptimized documentation is another high-value opportunity lost. Book a strategy session today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <button onClick={() => setBookOpen(true)} className="btn-gold" style={{ padding: "1rem 2.5rem" }}>
                  <Calendar className="w-5 h-5" /> Book Free Strategy Call
                </button>
                <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "1rem 2.5rem" }}>
                  <MessageSquare className="w-5 h-5" /> Inquire via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-champagne/10 section-spacing-sm bg-[#040714]">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center font-display text-sm text-champagne font-bold" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>PM</div>
                <div className="font-bold text-white uppercase tracking-wider text-xs">Pooja Malpani Advisory</div>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed max-w-xs">
                Executive Career Strategist. Applying cooperative auditing rigor to executive personal branding in IT, Finance, and Operations across India.
              </p>
            </div>
            <div>
              <div className="t-overline mb-4 text-[9px]">Navigational Links</div>
              <div className="space-y-2.5">
                {[
                  ["#matcher", "ATS Matcher"],
                  ["#services", "Consulting Programs"],
                  ["#stories", "Placement Dossiers"],
                  ["#reviews", "Verifiable Reviews"]
                ].map(([h, l]) => (
                  <a key={h} href={h} className="block text-[11px] text-text-secondary hover:text-white transition-colors">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="t-overline mb-4 text-[9px]">Contact Advisory</div>
              <div className="space-y-3 text-[11px]">
                <a href={wa()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4 text-champagne" /> +91 99236 49723
                </a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4 text-champagne" /> LinkedIn Profile
                </a>
                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin className="w-4 h-4 text-champagne" /> Mumbai Metropolitan, India
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-graphite-light/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="t-label text-[9px]">© 2026 Pooja Malpani Career Advisory · All Rights Reserved</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 star-gold" />
              ))}
              <span className="t-label text-[9px] ml-2">5.0 · Google Verified Client Reviews</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════
          MODAL: SERVICE ECOSYSTEM DRAWER
          ═══════════════════════════════════════════ */}
        {selectedService && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(3,5,18,0.85)", backdropFilter: "blur(20px)" }} onClick={(e) => e.target === e.currentTarget && setSelectedService(null)}>
            <div className="w-full max-w-2xl glass-elevated rounded-3xl p-8 relative border border-champagne/20 max-h-[90vh] overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-white bg-graphite/40 border border-graphite-light/45 cursor-pointer">
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6 space-y-2">
                <span className="t-overline text-champagne">{selectedService.subtitle}</span>
                <h3 className="t-title text-3xl font-bold">{selectedService.name}</h3>
                <span className="text-xl font-bold font-mono text-champagne block pt-2">{selectedService.price}</span>
              </div>

              <div className="space-y-6 text-sm leading-relaxed">
                <div>
                  <span className="text-[10px] font-mono text-text-muted block uppercase">Program Overview</span>
                  <p className="text-text-secondary mt-1">{selectedService.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-text-muted block uppercase">Strategic Outcomes</span>
                    <p className="text-text-secondary mt-1">{selectedService.outcome}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-text-muted block uppercase">Turnaround Timeline</span>
                    <p className="text-text-secondary mt-1">{selectedService.timeline}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-text-muted block uppercase">Program Deliverables</span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {selectedService.deliverables.map((del, i) => (
                      <li key={i} className="flex gap-2 items-center text-text-secondary">
                        <Check className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                        <span className="text-xs">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-graphite-light/50 mt-8 flex flex-col sm:flex-row gap-3">
                <a href={wa(`Hi Pooja! I'm interested in the ${selectedService.name} consulting program (${selectedService.price}).`)} target="_blank" rel="noopener noreferrer" className="btn-gold justify-center flex-1">
                  Secure Program Spot <ArrowRight className="w-4 h-4" />
                </a>
                <button onClick={() => setSelectedService(null)} className="btn-outline justify-center">
                  Close Program Review
                </button>
              </div>
            </div>
          </div>
        )}

      {/* ═══════════════════════════════════════════
          MODAL: BOOKING SCHEDULER
          ═══════════════════════════════════════════ */}
        {bookOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(3,5,18,0.85)", backdropFilter: "blur(20px)" }} onClick={(e) => e.target === e.currentTarget && setBookOpen(false)}>
            <div className="w-full max-w-md glass-elevated rounded-3xl p-8 relative border border-champagne/20" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setBookOpen(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-white bg-graphite/40 border border-graphite-light/45 cursor-pointer">
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6 space-y-2">
                <span className="t-overline text-champagne">Free Strategy Call</span>
                <h3 className="t-title text-2xl font-bold">Secure Discovery Slot</h3>
                <p className="text-[12px] text-text-secondary">Direct 15-Minute diagnostic assessment. No sales pitch. Just strategy.</p>
              </div>

              <div className="space-y-2 mb-6">
                {[
                  { d: "Monday", t: "10:00 AM IST", type: "Executive PM Review" },
                  { d: "Wednesday", t: "3:30 PM IST", type: "ATS Audit & Rebuild" },
                  { d: "Friday", t: "11:00 AM IST", type: "LinkedIn Inbound Review" },
                  { d: "Saturday", t: "12:00 PM IST", type: "General Career Pivot" }
                ].map((slot, i) => (
                  <a
                    key={i}
                    href={wa(`Hi Pooja! I'd like to book a free ${slot.type} discovery call on ${slot.d} at ${slot.t}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-4 rounded-xl bg-midnight/65 border border-graphite-light/45 hover:border-champagne/45 transition-colors group"
                  >
                    <div>
                      <span className="text-[12px] font-semibold text-white block">{slot.d} · {slot.t}</span>
                      <span className="text-[10px] font-mono text-text-muted mt-0.5 block">{slot.type}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-champagne opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>

              <a href={wa("Hi Pooja! I'd like to book a free discovery call.")} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center">
                <MessageSquare className="w-4 h-4" /> Confirm Booking on WhatsApp
              </a>
            </div>
          </div>
        )}

    </div>
  );
}
