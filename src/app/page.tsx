"use client";

import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

/* ── Lazy-load all 3D WebGL canvases for optimal performance ── */
const SceneHiddenProfessional = lazy(() => import("@/components/scenes/SceneHiddenProfessional"));
const SceneIndiaNetwork = lazy(() => import("@/components/scenes/SceneIndiaNetwork"));
const SceneAtsCenter = lazy(() => import("@/components/scenes/SceneAtsCenter"));
const SceneLinkedInEngine = lazy(() => import("@/components/scenes/SceneLinkedInEngine"));

const WA = "919923649723";
const LINKEDIN = "https://www.linkedin.com/in/pooja-chandak-0b409a52/";
const wa = (msg?: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hi Pooja! I'd like to discuss my career strategy.")}`;

/* 3D Scene Loading Fallback Skeleton */
function SceneSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center scene-skeleton rounded-3xl">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-2 border-champagne border-t-transparent rounded-full mx-auto animate-spin" />
        <p className="t-label text-[10px]">Assembling 3D Experience...</p>
      </div>
    </div>
  );
}

/* ── Scroll progress calculation hook ── */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      const rawProgress = currentScroll / totalHeight;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<MockService | null>(null);
  const [activeDossier, setActiveDossier] = useState<MockCaseStudy>(MOCK_CASE_STUDIES[0]);
  const [selectedBlog, setSelectedBlog] = useState<typeof MOCK_BLOGS[0] | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // ATS scanner simulation state
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanScore, setScanScore] = useState(45);

  // Define section references for scroll triggers
  const sec1Ref = useRef<HTMLDivElement>(null);
  const sec2Ref = useRef<HTMLDivElement>(null);
  const sec3Ref = useRef<HTMLDivElement>(null);
  const sec6Ref = useRef<HTMLDivElement>(null);

  const sec1Progress = useScrollProgress(sec1Ref);
  const sec2Progress = useScrollProgress(sec2Ref);
  const sec3Progress = useScrollProgress(sec3Ref);
  const sec6Progress = useScrollProgress(sec6Ref);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerScan = () => {
    if (scanning) return;
    setScanning(true);
    setScanStep(1);
    setScanScore(45);

    let step = 1;
    const interval = setInterval(() => {
      step++;
      setScanStep(step);
      setScanScore((prev) => Math.min(prev + Math.floor(Math.random() * 12) + 5, 92));

      if (step >= 5) {
        clearInterval(interval);
        setScanning(false);
      }
    }, 900);
  };

  return (
    <div className="relative min-h-screen bg-[#030512] text-[#F0EDE6] overflow-x-hidden selection:bg-champagne/20 select-none">
      
      {/* Volumetric ambient background noise / light cone grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--color-graphite-light),_transparent)]" />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_bottom,_var(--color-obsidian),_transparent)]" />

      {/* ═══════════════════════════════════════════
          NAVIGATION HEADER
          ═══════════════════════════════════════════ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#030512]/90 backdrop-blur-2xl border-b border-graphite-light/35 py-3" : "py-6 bg-transparent"}`}>
        <div className="container-wide flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 select-none">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center font-display text-sm text-champagne font-bold" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.25)" }}>PM</div>
            <div>
              <div className="text-[11px] font-bold tracking-[0.25em] text-white uppercase">Pooja Malpani</div>
              <div className="t-label text-[8px] mt-0.5">Executive Career Strategist</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {[["#invisible", "Filtration"], ["#network", "Placement Network"], ["#grader", "ATS Grader"], ["#dossier", "Transformation Archive"], ["#services", "Consulting Programs"], ["#faq", "Advisory FAQ"]].map(([h, l]) => (
              <a key={h} href={h} className="text-[12px] font-mono tracking-widest text-text-secondary hover:text-white transition-colors">{l.toUpperCase()}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="hidden sm:flex btn-outline" style={{ padding: "0.55rem 1.35rem", fontSize: "0.7rem" }}>
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <button onClick={() => setBookOpen(true)} className="btn-gold" style={{ padding: "0.55rem 1.35rem", fontSize: "0.7rem" }}>
              <Calendar className="w-3.5 h-3.5" /> Discovery Call
            </button>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-text-secondary hover:text-white" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#030512]/98 backdrop-blur-2xl flex flex-col" data-lenis-prevent>
            <div className="container-wide flex justify-between items-center py-5">
              <span className="t-overline">Advisory Menu</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 text-text-secondary hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 flex flex-col justify-center container-wide gap-8">
              {[["#invisible", "Filtration"], ["#network", "Placement Network"], ["#grader", "ATS Grader"], ["#dossier", "Transformation Archive"], ["#services", "Consulting Programs"], ["#faq", "Advisory FAQ"]].map(([h, l], i) => (
                <motion.a key={h} href={h} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }} onClick={() => setMenuOpen(false)} className="text-3xl text-white hover:text-champagne transition-colors font-display">{l}</motion.a>
              ))}
            </nav>
            <div className="container-wide pb-10 flex flex-col gap-3">
              <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center"><MessageSquare className="w-4 h-4" /> WhatsApp</a>
              <button onClick={() => { setBookOpen(true); setMenuOpen(false); }} className="btn-gold w-full justify-center"><Calendar className="w-4 h-4" /> Discovery Call</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          SECTION 01: THE INVISIBLE PROFESSIONAL (150vh)
          ═══════════════════════════════════════════ */}
      <section id="invisible" ref={sec1Ref} className="relative min-h-[150vh] overflow-hidden bg-transparent">
        {/* Sticky WebGL Canvas Container */}
        <div className="absolute inset-0 sticky top-0 h-screen z-0 pointer-events-none">
          <Suspense fallback={<SceneSkeleton />}>
            <SceneHiddenProfessional scrollProgress={sec1Progress} />
          </Suspense>
        </div>

        {/* Cinematic Content Overlays */}
        <div className="relative z-10 min-h-[150vh] flex flex-col justify-between pointer-events-none">
          {/* Headline Stage */}
          <div className="h-screen flex items-center justify-center container-narrow text-center">
            <div className="space-y-6 max-w-4xl">
              <span className="badge-gold tracking-widest text-[9px]">PROJECT BLACK DIAMOND</span>
              <h1 className="t-display leading-none">
                You are not <br />
                being rejected. <br />
                <span className="gradient-gold">You are being filtered.</span>
              </h1>
              <p className="t-body max-w-xl mx-auto text-text-secondary">
                Over 75% of executive-tier resumes are automatically dropped by Taleo & Workday before a single human laying eyes on them. Re-align your positioning.
              </p>
            </div>
          </div>

          {/* Dissolve State Indicator */}
          <div className="h-[50vh] flex items-center justify-center text-center pb-20">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-danger tracking-widest uppercase">95% Profiles Extinguished</span>
              <div className="w-32 h-[1px] bg-danger/30 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 02: INDIA SUCCESS NETWORK (3D MAP)
          ═══════════════════════════════════════════ */}
      <section id="network" ref={sec2Ref} className="relative min-h-screen bg-transparent section-spacing">
        <div className="absolute inset-0 sticky top-0 h-screen z-0">
          <Suspense fallback={<SceneSkeleton />}>
            <SceneIndiaNetwork scrollProgress={sec2Progress} />
          </Suspense>
        </div>

        <div className="container-wide relative z-10 pointer-events-none min-h-screen flex items-center">
          <div className="max-w-md space-y-6">
            <span className="t-overline text-champagne">Success Networks</span>
            <h2 className="t-headline">Mumbai to <span className="gradient-gold">Global Nodes</span>.</h2>
            <p className="t-body leading-relaxed">
              Every gold line represents a complete career transition. From local hubs to sovereign international consulting centers like Dubai, Singapore, and London.
            </p>
            <div className="pt-4 pointer-events-auto">
              <a href={wa("Hi Pooja! I'm interested in discussing executive transitions.")} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
                Trace Your Route <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 03: THE CAREER INTELLIGENCE ENGINE (HUD Scanner)
          ═══════════════════════════════════════════ */}
      <section id="grader" ref={sec3Ref} className="relative min-h-screen bg-transparent section-spacing">
        <div className="absolute inset-0 sticky top-0 h-screen z-0 pointer-events-none">
          <Suspense fallback={<SceneSkeleton />}>
            <SceneAtsCenter scrollProgress={sec3Progress} />
          </Suspense>
        </div>

        <div className="container-wide relative z-10 min-h-screen flex items-center justify-end">
          <div className="w-full max-w-lg glass-elevated rounded-3xl p-8 border border-champagne/15 space-y-6">
            <span className="t-overline">ATS Grader Terminal</span>
            <h3 className="t-title text-2xl font-bold">Simulate Algorithm Parsing</h3>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              Watch how automated parsing translation converts passive descriptions into structured corporate ROI impact bullets.
            </p>

            <div className="space-y-4">
              {/* Score Display */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-midnight/65 border border-graphite-light/50">
                <div>
                  <span className="text-[9px] font-mono text-text-muted block">ALGORITHM SCORE</span>
                  <span className="text-2xl font-bold font-display text-white mt-1 block">
                    {scanScore}%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-text-muted block">PARSING STATUS</span>
                  <span className={`text-[10px] font-mono font-bold tracking-widest mt-1 block ${scanScore > 80 ? "text-success" : "text-danger"}`}>
                    {scanning ? "SCANNING..." : scanScore > 80 ? "PASSED SHORTLIST" : "FILTERED/REJECTED"}
                  </span>
                </div>
              </div>

              {/* Red-to-Gold Translation logs */}
              <div className="rounded-xl border border-graphite-light/50 p-4 min-h-[120px] bg-midnight/50 text-[11px] font-mono leading-relaxed space-y-3">
                {scanStep === 0 && (
                  <p className="text-text-muted italic">Click 'Trigger Audit Simulation' to verify parsing translations...</p>
                )}
                {scanStep >= 1 && (
                  <p className="text-danger">✗ [FAILED] Unoptimized phrasing: "Responsible for managing software deployments and leading teams."</p>
                )}
                {scanStep >= 3 && (
                  <p className="text-champagne-light">⚡ [PARSING] Analyzing business parameters...</p>
                )}
                {scanStep >= 4 && (
                  <p className="text-success">✓ [TRANSLATED] Optimized outcome: "Led GTM platform re-architecture, improving server latency by 45% and saving ₹18L in AWS compute costs."</p>
                )}
              </div>

              <button
                onClick={triggerScan}
                disabled={scanning}
                className="btn-gold w-full justify-center text-xs tracking-widest"
              >
                {scanning ? "Processing Audit..." : "Trigger Audit Simulation"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 04: FOUNDER CINEMATIC REVEAL
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative z-10" style={{ background: "linear-gradient(to bottom, transparent, #030512 80%)" }}>
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Volumetric portrait */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-sm" style={{ filter: "drop-shadow(0 40px 100px rgba(0,0,0,0.85))" }}>
                {/* Spotlight background behind portrait */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--color-champagne-light),_transparent)] opacity-10 blur-xl scale-125" />
                <div className="relative z-10 rounded-3xl overflow-hidden" style={{ aspectRatio: "3/4", border: "1.5px solid rgba(201,168,76,0.25)", background: "linear-gradient(135deg, #0A0E23, #030512)" }}>
                  <Image src="/pooja-headshot.png" alt="Pooja Malpani" fill priority className="object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030512] via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-6 left-6 right-6 glass-elevated rounded-2xl p-4 border border-champagne/15">
                    <span className="text-[9px] font-mono text-champagne tracking-wider block">EXECUTIVE ADVISOR</span>
                    <span className="text-base font-bold text-white font-display block">Pooja Malpani</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating glass credentials */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="t-overline text-champagne">Founder Credentials</span>
                <h2 className="t-headline">The Auditing <br /><span className="gradient-gold">Precision</span>.</h2>
                <p className="t-body">
                  For 13+ years, I have studied how automated filters parse candidates. I bring standard cooperative auditing metrics to career documentation — translating tasks into high-leverage outcomes.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { title: "MMS Finance", desc: "Masters in Management Studies, specialized in Finance." },
                  { title: "Certified Cooperative Auditor", desc: "Cooperative Auditing discipline applied to corporate positioning." },
                  { title: "500+ Transitions", desc: "Executive shortlists secured across major tech and finance hubs." },
                  { title: "5.0★ Google Stars", desc: "Consistent, audit-backed career results." }
                ].map((cred, i) => (
                  <div key={i} className="glass rounded-xl p-4 flex gap-4 items-start hover:border-champagne/20 transition-colors border border-graphite-light/50">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-champagne/5 text-champagne font-mono text-[11px] border border-champagne/15">0{i+1}</div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-wide">{cred.title}</h4>
                      <p className="text-[11px] text-text-secondary mt-1">{cred.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 05: THE TRANSFORMATION ARCHIVE (Comparative Cabinets)
          ═══════════════════════════════════════════ */}
      <section id="dossier" className="section-spacing relative z-10">
        <div className="container-narrow space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="t-overline text-champagne">Proven Transformations</span>
            <h2 className="t-headline">Transformation <span className="gradient-gold">Dossiers</span>.</h2>
            <p className="t-body text-xs">Side-by-side comparative audits of real mid-to-senior placements.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cabinet selector */}
            <div className="space-y-2">
              {MOCK_CASE_STUDIES.map((cs) => (
                <button
                  key={cs.id}
                  onClick={() => setActiveDossier(cs)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all ${activeDossier.id === cs.id ? "bg-graphite/45 border-champagne" : "bg-transparent border-graphite-light/45 hover:border-white/20"}`}
                >
                  <span className="text-[9px] font-mono text-champagne block">{cs.industry}</span>
                  <span className="text-sm font-semibold text-white font-display mt-1 block">{cs.name}</span>
                </button>
              ))}
            </div>

            {/* Cabinet dossier card */}
            <div className="lg:col-span-2 glass-elevated rounded-3xl p-6 border border-champagne/15 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-text-muted block">CTC ESCALATION</span>
                  <span className="text-xl font-bold font-display text-success mt-1 block">
                    {activeDossier.before_ctc} → {activeDossier.after_ctc}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-text-muted block">TIMELINE BIND</span>
                  <span className="text-[11px] font-semibold text-white mt-1 block">
                    {activeDossier.timeline} Rebuild Window
                  </span>
                </div>
                <div className="h-[1px] bg-graphite-light/50" />
                <div>
                  <span className="text-[9px] font-mono text-text-muted block">TRANSFORMATION STORY</span>
                  <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
                    {activeDossier.story}
                  </p>
                </div>
              </div>

              {/* Side by side resume translation */}
              <div className="space-y-4 bg-midnight/55 rounded-2xl p-4 border border-graphite-light/50">
                <div>
                  <span className="text-[9px] font-mono text-danger uppercase tracking-wider block">✗ Before Audit</span>
                  <p className="text-[10px] font-mono text-danger/80 leading-relaxed mt-1">
                    "{activeDossier.resume_before}"
                  </p>
                </div>
                <div className="h-[1px] bg-graphite-light/50" />
                <div>
                  <span className="text-[9px] font-mono text-success uppercase tracking-wider block">✓ After Audit</span>
                  <p className="text-[10px] font-mono text-success leading-relaxed mt-1">
                    "{activeDossier.resume_after}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 06: LINKEDIN AUTHORITY VISUALIZATION
          ═══════════════════════════════════════════ */}
      <section ref={sec6Ref} className="relative min-h-[120vh] bg-transparent">
        <div className="absolute inset-0 sticky top-0 h-screen z-0 pointer-events-none">
          <Suspense fallback={<SceneSkeleton />}>
            <SceneLinkedInEngine scrollProgress={sec6Progress} />
          </Suspense>
        </div>

        <div className="container-wide relative z-10 min-h-[120vh] flex flex-col justify-between pointer-events-none">
          <div className="h-screen flex items-center justify-start max-w-md">
            <div className="space-y-4">
              <span className="t-overline text-champagne">Profile Re-assembly</span>
              <h2 className="t-headline">LinkedIn <br /><span className="gradient-gold">Structure Assembly</span>.</h2>
              <p className="t-body">
                Watch how disconnected modules—headlines, skill clouds, recommendations—glide together on scroll, interlocking like blocks to charge your SSI score up to 88%.
              </p>
            </div>
          </div>
          <div className="h-[20vh]" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 07: THE SERVICE ECOSYSTEM
          ═══════════════════════════════════════════ */}
      <section id="services" className="section-spacing relative z-10" style={{ background: "linear-gradient(to bottom, #030512, transparent 50%, #030512)" }}>
        <div className="container-narrow space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="t-overline text-champagne">Elite Programs</span>
            <h2 className="t-headline">Consulting <br /><span className="gradient-gold">Ecosystem</span>.</h2>
            <p className="t-body text-xs">Trademark visibility frameworks for mid-to-senior professionals.</p>
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
                    {svc.description.slice(0, 80)}...
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
          REVIEWS WALL & TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative z-10">
        <div className="container-narrow space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="t-overline text-champagne">Verified Endorsements</span>
            <h2 className="t-headline">Google & LinkedIn <br /><span className="gradient-gold">Authority Wall</span>.</h2>
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
          FORBES-LEVEL EDITORIAL CENTER
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative z-10">
        <div className="container-narrow space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="t-overline text-champagne">Advisory Publications</span>
            <h2 className="t-headline">The Career <br /><span className="gradient-gold">Intelligence Center</span>.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_BLOGS.map((blog) => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="glass rounded-3xl p-6 border border-graphite-light/50 flex flex-col justify-between hover:border-champagne/45 transition-colors cursor-pointer"
              >
                <div className="space-y-4">
                  <span className="badge-gold text-[9px]">{blog.category}</span>
                  <h3 className="text-lg font-bold text-white font-display hover:text-champagne transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-[12px] text-text-secondary leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="pt-6 border-t border-graphite-light/50 mt-6 flex items-center justify-between text-[10px] font-mono text-text-muted">
                  <span>{blog.read_time} MIN READ</span>
                  <span className="text-champagne flex items-center gap-1">
                    READ PUBLICATION <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ADVISORY FAQ
          ═══════════════════════════════════════════ */}
      <section id="faq" className="section-spacing relative z-10">
        <div className="container-reading space-y-8">
          <div className="text-center space-y-3">
            <span className="t-overline text-champagne">Common Enquiries</span>
            <h2 className="t-headline">Frequently Asked <span className="gradient-gold">Aspects</span>.</h2>
          </div>

          <div className="space-y-3">
            {[
              { q: "What makes your positioning method different from standard writing services?", a: "Standard services focus on vocabulary and templates. I focus on strategic auditing. I analyze structural JD parsing parameters and reverse-engineer recruiter search variables to position your experience for maximum bottom-line P&L impact." },
              { q: "Do you offer discovery consultations?", a: "Yes. I offer a free 15-minute diagnostic call to review your current CV and discuss invisible friction points before you commit to any program." },
              { q: "What is your standard turnaround window?", a: "Typical delivery times range from 4 business days for LinkedIn optimization up to 10-14 days for the full Professional Brand Transformation." }
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
          FINAL CONVERSION PANEL
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative z-10 overflow-hidden">
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
      <footer className="relative z-10 border-t border-champagne/10 section-spacing-sm bg-[#030512]">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center font-display text-sm text-champagne font-bold" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>PM</div>
                <div className="font-bold text-white uppercase tracking-wider text-xs">Pooja Malpani</div>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed max-w-xs">
                Executive Career Strategist. Applying cooperative auditing rigor to executive personal branding in IT, Finance, and Operations across India.
              </p>
            </div>
            <div>
              <div className="t-overline mb-4 text-[9px]">Navigational Links</div>
              <div className="space-y-2.5">
                {[["#invisible", "Filtration"], ["#network", "Placement Network"], ["#grader", "ATS Grader"], ["#dossier", "Transformation Archive"], ["#services", "Consulting Programs"]].map(([h, l]) => (
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
              <span className="t-label text-[9px] ml-2">5.0 · verified Client Audits</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════
          MODAL: SERVICE ECOSYSTEM DRAWER
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(3,5,18,0.85)", backdropFilter: "blur(20px)" }} onClick={(e) => e.target === e.currentTarget && setSelectedService(null)} data-lenis-prevent>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-2xl glass-elevated rounded-3xl p-8 relative border border-champagne/20 max-h-[90vh] overflow-y-auto scrollbar-none">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          MODAL: EDITORIAL ARTICLE DRAWER
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(3,5,18,0.85)", backdropFilter: "blur(20px)" }} onClick={(e) => e.target === e.currentTarget && setSelectedBlog(null)} data-lenis-prevent>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-2xl glass-elevated rounded-3xl p-8 relative border border-champagne/20 max-h-[90vh] overflow-y-auto scrollbar-none">
              <button onClick={() => setSelectedBlog(null)} className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-white bg-graphite/40 border border-graphite-light/45 cursor-pointer">
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6 space-y-2">
                <span className="badge-gold text-[9px]">{selectedBlog.category}</span>
                <h3 className="t-title text-2xl md:text-3xl font-bold">{selectedBlog.title}</h3>
                <span className="text-[10px] font-mono text-text-muted block pt-2">{selectedBlog.read_time} MIN READ</span>
              </div>

              <div className="prose prose-invert max-w-none text-sm text-text-secondary leading-relaxed space-y-4">
                {/* Parse Markdown content */}
                {selectedBlog.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("# ")) {
                    return null; // Skip duplicate title
                  }
                  if (para.startsWith("## ")) {
                    return (
                      <h4 key={i} className="text-base font-bold text-white font-display pt-4">
                        {para.replace("## ", "")}
                      </h4>
                    );
                  }
                  if (para.startsWith("* ")) {
                    return (
                      <ul key={i} className="space-y-1 pl-4">
                        {para.split("\n").map((li, liIdx) => (
                          <li key={liIdx} className="list-disc list-outside text-text-secondary">
                            {li.replace("* ", "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>

              <div className="pt-8 border-t border-graphite-light/50 mt-8">
                <button onClick={() => setSelectedBlog(null)} className="btn-gold w-full justify-center">
                  Close Article Reading
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          MODAL: BOOKING SCHEDULER
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {bookOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(3,5,18,0.85)", backdropFilter: "blur(20px)" }} onClick={(e) => e.target === e.currentTarget && setBookOpen(false)} data-lenis-prevent>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-md glass-elevated rounded-3xl p-8 relative border border-champagne/20" data-lenis-prevent>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
