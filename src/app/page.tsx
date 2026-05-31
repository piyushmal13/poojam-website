"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Star, CheckCircle, X, ArrowRight, MessageSquare, Calendar, Shield,
  Users, Zap, FileText, Linkedin, Phone, MapPin, Clock, Quote, Menu,
  BarChart2, Target, Sparkles, Check, ChevronDown, UserCheck, ArrowUpRight
} from "lucide-react";

import {
  EXECUTIVE_LEADS,
  PLACEMENT_DOSSIERS,
  POSITIONING_PROGRAMS,
  INSIGHT_JOURNAL,
  PositioningProgram,
  PlacementDossier
} from "@/lib/mockDb";
import WebGLHeroScene from "@/components/WebGLHeroScene";
import WebGLScannerScene from "@/components/WebGLScannerScene";
import ParallaxDashboard from "@/components/ParallaxDashboard";
import GlobalCorridorScene from "@/components/GlobalCorridorScene";
import CinematicDoors from "@/components/CinematicDoors";

const WA = "919923649723";
const LINKEDIN = "https://www.linkedin.com/in/pooja-chandak-0b409a52/";
const wa = (msg?: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hi Pooja! I'd like to discuss my career strategy.")}`;



export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [activeDossier, setActiveDossier] = useState<any>(PLACEMENT_DOSSIERS[0]);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <a href="#" className="flex items-center gap-3 group relative z-10">
            <div className="w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center bg-midnight/80 group-hover:border-champagne transition-colors">
              <Star className="w-4 h-4 text-champagne" />
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              ["#stories", "Success Stories"],
              ["#reviews", "Reviews"],
              ["#services", "Services"],
              ["/ats-audit", "ATS Audit"],
              ["#contact", "Contact"]
            ].map(([h, l]) => (
              <a key={l} href={h} className="text-[10px] font-mono tracking-widest text-text-secondary hover:text-white transition-colors">{l.toUpperCase()}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="hidden sm:flex btn-outline" style={{ padding: "0.5rem 1.25rem", fontSize: "0.7rem" }}>
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <button onClick={() => setBookOpen(true)} className="btn-gold" style={{ padding: "0.5rem 1.25rem", fontSize: "0.7rem" }}>
              <Calendar className="w-3.5 h-3.5" /> Book Consultation
            </button>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-text-secondary hover:text-white animate-pulse" aria-label="Menu">
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
              ["#stories", "Success Stories"],
              ["#reviews", "Reviews"],
              ["#services", "Services"],
              ["/ats-audit", "ATS Audit"],
              ["#contact", "Contact"]
            ].map(([h, l]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} className="text-3xl text-white hover:text-champagne transition-colors font-display">{l}</a>
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
        <WebGLHeroScene />
        <div className="container-wide relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Premium Value Prop */}
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-4">
                <span className="badge-gold tracking-widest text-[9px] uppercase">Executive Career Strategist</span>
                <h1 className="t-display leading-tight text-white">
                  Command the C-Suite <br />
                  <span className="gradient-gold">shortlists</span> you deserve.
                </h1>
                <p className="t-body-lg text-text-secondary max-w-lg">
                  I help mid-to-senior executives re-architect their resumes and LinkedIn profiles into high-authority, audit-proof brand assets that attract elite shortlists.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#services" className="btn-gold"><Target className="w-4 h-4" /> Explore Services</a>
                <button onClick={() => setBookOpen(true)} className="btn-outline"><Calendar className="w-4 h-4" /> Book Discovery Call</button>
              </div>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-graphite-light/50">
                {[
                  { label: "5.0 ★ Google Rating", sub: "Verifiable Client Audits" },
                  { label: "13+ Years Experience", sub: "Cooperative Auditing Rigor" },
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
          CINEMATIC DOORS SCROLL EFFECT
          ═══════════════════════════════════════════ */}
      <CinematicDoors />

      {/* ═══════════════════════════════════════════
          GENUINE CORPORATE ADVISORY SERVICES
          ═══════════════════════════════════════════ */}
      <section id="services" className="section-spacing relative z-10 border-t border-graphite-light/50 bg-midnight/10 overflow-hidden">
        <WebGLScannerScene />
        <div className="container-narrow space-y-12 relative z-10">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="t-overline text-champagne">Premium Services</span>
            <h2 className="t-headline">Corporate Positioning <span className="gradient-gold">Services</span>.</h2>
            <p className="t-body text-xs">
              Bespoke, audit-backed professional branding and positioning programs. No automated templates. 100% human expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Service 1: ATS Resume Writing */}
            <div className="glass rounded-3xl p-6 border border-graphite-light/50 flex flex-col justify-between hover:border-champagne/45 transition-all">
              <div className="space-y-4">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-champagne/5 text-champagne border border-champagne/15">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Bespoke ATS-Approved Resume Writing</h3>
                  <p className="text-[10px] font-mono text-text-secondary mt-1">First-Principles Architecture</p>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  First-principles rebuild of your professional resume, converting dense operational duties into high-impact, ATS-approved Context-Action-Result (CAR) achievements.
                </p>
                <ul className="space-y-2 text-[11px] text-text-secondary">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Structural ATS compliance audits</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Context-Action-Result (CAR) bullets</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Hand-crafted executive layouts</li>
                </ul>
              </div>
              <div className="pt-6 border-t border-graphite-light/50 mt-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-text-muted">INVESTMENT</span>
                  <span className="text-sm font-bold font-mono text-champagne">Starts at ₹2,000</span>
                </div>
                <a href={wa("Hi Pooja! I'm interested in your Bespoke ATS-Approved Resume Writing service (starts at ₹2,000).")} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-text-muted hover:text-white flex items-center gap-1 transition-colors">
                  INQUIRE NOW <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Service 2: LinkedIn Profile Management */}
            <div className="glass rounded-3xl p-6 border border-graphite-light/50 flex flex-col justify-between hover:border-champagne/45 transition-all">
              <div className="space-y-4">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-champagne/5 text-champagne border border-champagne/15">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">LinkedIn Profile Management</h3>
                  <p className="text-[10px] font-mono text-text-secondary mt-1">Inbound Recruiter Draw</p>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Total optimization of your LinkedIn presence to attract C-Suite search parameters. I structure headlines, summaries, and experience fields to maximize profile indexation.
                </p>
                <ul className="space-y-2 text-[11px] text-text-secondary">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Algorithmic keyword parameter tuning</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> High-authority profile summaries</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Premium banner graphic asset</li>
                </ul>
              </div>
              <div className="pt-6 border-t border-graphite-light/50 mt-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-text-muted">INVESTMENT</span>
                  <span className="text-sm font-bold font-mono text-champagne">WhatsApp Inquiry</span>
                </div>
                <a href={wa("Hi Pooja! I'm interested in your LinkedIn Profile Management service.")} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-text-muted hover:text-white flex items-center gap-1 transition-colors">
                  INQUIRE NOW <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Service 3: Placement Assistance */}
            <div className="glass rounded-3xl p-6 border border-graphite-light/50 flex flex-col justify-between hover:border-champagne/45 transition-all">
              <div className="space-y-4">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-champagne/5 text-champagne border border-champagne/15">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Executive Placement Assistance</h3>
                  <p className="text-[10px] font-mono text-text-secondary mt-1">Corridor Networking & Leads</p>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Proactive routing of your optimized credentials to direct recruiter hiring pools across major tech, operations, and finance organizations in India and international corridors.
                </p>
                <ul className="space-y-2 text-[11px] text-text-secondary">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Recruiter matchmaking routing</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Direct resume pushes to hiring managers</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Exclusive placement lead alerts</li>
                </ul>
              </div>
              <div className="pt-6 border-t border-graphite-light/50 mt-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-text-muted">INVESTMENT</span>
                  <span className="text-sm font-bold font-mono text-champagne">WhatsApp Inquiry</span>
                </div>
                <a href={wa("Hi Pooja! I'm interested in your Executive Placement Assistance program.")} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-text-muted hover:text-white flex items-center gap-1 transition-colors">
                  INQUIRE NOW <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Service 4: Google Profile Management */}
            <div className="glass rounded-3xl p-6 border border-graphite-light/50 flex flex-col justify-between hover:border-champagne/45 transition-all">
              <div className="space-y-4">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-champagne/5 text-champagne border border-champagne/15">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Google Profile Management</h3>
                  <p className="text-[10px] font-mono text-text-secondary mt-1">Search Engine Authority</p>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Establish dominant organic search authority. I help senior executives and independent consultants configure and audit their Google Business Profile (GBP) for maximum local search validation.
                </p>
                <ul className="space-y-2 text-[11px] text-text-secondary">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Local search verification strategy</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Curation workflows for Google reviews</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> High-authority profile search setup</li>
                </ul>
              </div>
              <div className="pt-6 border-t border-graphite-light/50 mt-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-text-muted">INVESTMENT</span>
                  <span className="text-sm font-bold font-mono text-champagne">WhatsApp Inquiry</span>
                </div>
                <a href={wa("Hi Pooja! I'm interested in your Google Profile Management service.")} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-text-muted hover:text-white flex items-center gap-1 transition-colors">
                  INQUIRE NOW <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Service 5: Elite C-Suite Program */}
            <div className="glass rounded-3xl p-6 border border-graphite-light/50 flex flex-col justify-between hover:border-champagne/45 transition-all lg:col-span-2">
              <div className="space-y-4">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-champagne/5 text-champagne border border-champagne/15">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-white font-display">Bespoke C-Suite Transformation Program</h3>
                    <span className="badge-gold text-[8px] py-0.5 px-1.5">SIGNATURE</span>
                  </div>
                  <p className="text-[10px] font-mono text-text-secondary mt-1">LinkedIn + ATS + Placement + Interview Preparation</p>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Our comprehensive executive career pivot program. I personally oversee and execute your entire positioning lifecycle—re-architecting your ATS-approved CV, managing your LinkedIn search optimizations, routing files to placement leads, providing structured interview prep, and strategizing C-Suite salary negotiations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-text-secondary pt-2">
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Hand-crafted ATS resume rewrite</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Total LinkedIn profile transformation</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Structured mock interviews & positioning</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-champagne" /> Direct WhatsApp advisory channel</div>
                </div>
              </div>
              <div className="pt-6 border-t border-graphite-light/50 mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[8px] font-mono text-text-muted block uppercase">EXECUTIVE LEVEL INVESTMENT</span>
                  <span className="text-xs font-semibold text-white font-mono">Quotes Customized to Scope</span>
                </div>
                <a href={wa("Hi Pooja! I want to inquire about your comprehensive C-Suite Transformation Program (managing my LinkedIn + ATS + Placements + Interview Prep).")} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs tracking-wider w-full sm:w-auto text-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5" /> INQUIRE ON WHATSAPP
                </a>
              </div>
            </div>

          </div>

          {/* Pricing Advisory Disclaimer Card */}
          <div className="glass rounded-3xl p-6 border border-champagne/15 max-w-3xl mx-auto" style={{ background: "rgba(201,168,76,0.02)" }}>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Shield className="w-5 h-5 text-champagne flex-shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-left">
                <span className="text-[10px] font-mono text-champagne tracking-wider uppercase block">Corporate Advisory Notice</span>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Bespoke ATS Resumes are available starting at a low-friction entry tier of **₹2,000**. For complete executive positioning solutions—managing your LinkedIn profile, configuring ATS-approved credentials, routing files to direct placement networks, and running personalized interview preparation—we quote customized packages aligned directly with your seniority.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE LINKEDIN AUTHORITY CORE
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative z-10 border-t border-graphite-light/50 bg-[#0A0E23] overflow-hidden">
        <div className="container-wide">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
            <span className="t-overline text-champagne">Algorithm Mastery</span>
            <h2 className="t-headline">The LinkedIn <span className="gradient-gold">Authority</span> Core.</h2>
            <p className="t-body text-xs">
              We reverse-engineer the LinkedIn Recruiter Seat search filters to ensure your profile ranks in the top 1% of your industry.
            </p>
          </div>
          <ParallaxDashboard />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PLACEMENT DOSSIERS (Zepto, PhonePe, Salesforce)
          ═══════════════════════════════════════════ */}
      <section id="stories" className="section-spacing relative z-10 border-t border-graphite-light/35 bg-[#030512] overflow-hidden">
        <GlobalCorridorScene />
        <div className="container-narrow space-y-12 relative z-10">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="t-overline text-champagne">Verified Placements</span>
            <h2 className="t-headline">Executive Placement <span className="gradient-gold">Dossiers</span>.</h2>
            <p className="t-body text-xs">
              Examine the exact side-by-side CAR outcome translations executed for our C-Suite clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Selection Column */}
            <div className="space-y-2">
              {PLACEMENT_DOSSIERS.map((cs) => (
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

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide">
            {EXECUTIVE_LEADS.map((rev) => (
              <div key={rev.id} className="min-w-[85vw] sm:min-w-[400px] snap-center glass rounded-3xl p-6 border border-graphite-light/45 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
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
                </div>
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
              { q: "What is your standard turnaround window?", a: "Typical delivery times range from 4 business days for LinkedIn optimization up to 10–14 days for the full Bespoke C-Suite Coaching & Rebrand." }
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
      <section id="contact" className="section-spacing relative z-10 overflow-hidden bg-[#030512]">
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
                <div className="font-bold text-white uppercase tracking-wider text-xs">PM Executive Strategy</div>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed max-w-xs">
                Executive Career Advisory. Hand-crafted, outcome-driven personal branding and strategic positioning for Director, VP, and C-Suite career transitions.
              </p>
            </div>
            <div>
              <div className="t-overline mb-4 text-[9px]">Navigational Links</div>
              <div className="space-y-2.5">
                {[
                  ["#stories", "Success Stories"],
                  ["#reviews", "Reviews"],
                  ["#services", "Services"],
                  ["#services", "ATS Audit"]
                ].map(([h, l]) => (
                  <a key={l} href={h} className="block text-[11px] text-text-secondary hover:text-white transition-colors">{l}</a>
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
