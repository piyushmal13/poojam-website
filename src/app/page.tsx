"use client";

import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Star, CheckCircle, ChevronDown, ChevronRight, X, ArrowRight,
  MessageSquare, Calendar, Shield, Award, TrendingUp, Users, Zap,
  FileText, Linkedin, Phone, Mail, MapPin, Clock, Quote, Menu,
  BarChart2, Target, Sparkles, Check, ExternalLink, Globe,
  Briefcase, GraduationCap, Search, BookOpen, UserCheck
} from "lucide-react";

/* ── Lazy-load 3D scenes for performance ── */
const SceneHiddenProfessional = lazy(() => import("@/components/scenes/SceneHiddenProfessional"));
const SceneIndiaNetwork = lazy(() => import("@/components/scenes/SceneIndiaNetwork"));
const SceneAtsCenter = lazy(() => import("@/components/scenes/SceneAtsCenter"));

/* ============================================================
   DATA
   ============================================================ */
const WA = "919923649723";
const LINKEDIN = "https://www.linkedin.com/in/pooja-chandak-0b409a52/";
const wa = (msg?: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hi Pooja! I'd like to discuss my career strategy.")}`;

const REVIEWS = [
  { name: "Rahul Sharma", role: "Senior PM", co: "Zepto", loc: "Bangalore", stars: 5, init: "RS", bg: "#7C3AED", result: "₹12L → ₹28L", text: "Pooja completely transformed how I present myself. Within 7 weeks I had 4 interview calls from companies I never thought would notice me. Her keyword strategy is deeply researched — not generic." },
  { name: "Priya Nair", role: "Operations Mgr", co: "Delhivery", loc: "Mumbai", stars: 5, init: "PN", bg: "#059669", result: "0 → 9 Interviews", text: "I had a strong background but my resume was invisible. Pooja's ATS audit showed me exactly why — and fixed it. 9 interview calls in 6 weeks. I accepted an offer 40% above my previous CTC." },
  { name: "Aditya Mehta", role: "Data Analyst", co: "PhonePe", loc: "Pune", stars: 5, init: "AM", bg: "#DC2626", result: "₹9L → ₹21L", text: "The LinkedIn optimization alone brought 3 inbound recruiter messages in the first week. Her understanding of how ATS systems parse content is exceptional. I recommended Pooja to my entire team." },
  { name: "Sneha Kulkarni", role: "Sr HRBP", co: "Wipro", loc: "Hyderabad", stars: 5, init: "SK", bg: "#D97706", result: "Promoted in role", text: "I was stuck at the same level for 3 years. Pooja helped me reframe my experience from 'HR tasks' to 'business impact.' Got promoted within the same company after sharing the new resume." },
  { name: "Vikram Joshi", role: "Sales Director", co: "Salesforce IN", loc: "Delhi", stars: 5, init: "VJ", bg: "#0284C7", result: "₹24L → ₹52L", text: "She made my 15 years of sales leadership visible in ways I didn't know were possible. The cover letter she wrote literally echoed back in my interview — the hiring manager quoted it." },
  { name: "Kavya Reddy", role: "Finance Mgr", co: "Bajaj Finance", loc: "Pune", stars: 5, init: "KR", bg: "#BE185D", result: "₹14L → ₹27L", text: "I was skeptical that a resume rewrite would make that much difference. Pooja asked deep questions about my actual work and turned them into powerful impact statements. It made a massive difference." },
];

const CASES = [
  { name: "Ananya S.", ind: "Fintech · Product", time: "68 days", before: "₹12 LPA", after: "₹26 LPA", bLabel: "CTC Before", aLabel: "CTC After", story: "Stuck applying to 50+ roles with zero callbacks. After ATS overhaul and LinkedIn rebuild — 4 interviews in week one, offer accepted at 116% salary jump.", tags: ["Resume Overhaul", "ATS Strategy", "LinkedIn Rebuild"] },
  { name: "Rohan M.", ind: "Logistics · Ops", time: "90 days", before: "₹9 LPA", after: "₹21 LPA", bLabel: "Previous CTC", aLabel: "New Package", story: "Operations background, but resume read like a job description manual. Pooja extracted cost-saving data, reframed each role with P&L context. Interview conversion went from 0% to 60%.", tags: ["P&L Framing", "Interview Prep", "Career Positioning"] },
  { name: "Meera T.", ind: "Analytics · Tech", time: "45 days", before: "0 calls", after: "11 interviews", bLabel: "Before", aLabel: "After", story: "Had strong technical skills but was invisible. After SQL/Python repositioning and headline rewrite, received 11 interview calls in 45 days. Joined a Series B startup as Lead Analyst.", tags: ["Technical Positioning", "Keyword Strategy", "LinkedIn SSI"] },
];

const SERVICES = [
  { name: "Career Foundation", sub: "Early to mid-career", price: "₹2,000", note: "One-time", desc: "Complete ATS-optimized resume with targeted keyword integration.", features: ["ATS Keyword Audit", "Resume Rewrite (1 role)", "Achievement-based bullets", "ATS-compatible format", "2 revisions", "5–7 day delivery"], hl: false },
  { name: "Career Accelerator", sub: "Mid-level & senior", price: "₹4,500", note: "Most Popular", desc: "Full career rebrand — resume, LinkedIn, and cover letter — for senior-level opportunities.", features: ["Everything in Foundation", "LinkedIn Optimization", "Custom Cover Letter", "LinkedIn Headline & Summary", "Recruiter outreach messaging", "3 revisions", "7–10 day delivery"], hl: true },
  { name: "Executive Advantage", sub: "Director / VP / C-Suite", price: "Custom", note: "Strategy call first", desc: "White-glove positioning for Director+ professionals navigating high-stakes career moves.", features: ["Everything in Accelerator", "Executive Biography", "Board-level narrative", "Brand strategy session", "Salary negotiation frameworks", "Unlimited revisions (30 days)", "Google Meet sessions"], hl: false },
];

const FAQS = [
  { q: "How is your approach different from regular resume writers?", a: "Most writers focus on formatting. I focus on strategic positioning. Every resume starts with deep analysis of your target roles, the ATS systems those companies use, and hiring manager psychology. I reverse-engineer your experience to match what systems and humans are looking for." },
  { q: "How long does the process take?", a: "Career Foundation: 5–7 business days. Career Accelerator: 7–10 days. Executive packages: 10–14 days. Rush delivery available for an additional fee." },
  { q: "Will your resume actually get past ATS systems?", a: "Yes — this is the core of my methodology. I've analyzed parsing behavior of Taleo, Workday, Greenhouse, and Lever. I know which formatting causes failures, which keyword placements trigger ranking boosts, and how to structure achievements compellingly." },
  { q: "What industries do you specialize in?", a: "IT, Finance, Sales, Operations, Product Management, HR, and Analytics. My MMS Finance background and cooperative auditing experience give me deep familiarity with corporate language across these domains." },
  { q: "Can I speak to you before purchasing?", a: "Absolutely. I offer a free 15-minute discovery call for all potential clients. WhatsApp me or book via the calendar — I respond within 24 hours." },
];

const TICKER = [
  "Rahul S. — ₹12L → ₹28L in 68 days",
  "Priya N. — Zero calls → 9 interviews",
  "Aditya M. — 3 recruiter inbounds in week one",
  "Vikram J. — ₹24L → ₹52L CTC",
  "Sneha K. — Promoted to Senior HRBP",
  "Meera T. — 11 interviews in 45 days",
];

const INDUSTRIES = [
  { emoji: "💻", name: "Information Technology", roles: "SDE · DevOps · Cloud" },
  { emoji: "💰", name: "Finance & Banking", roles: "FP&A · Risk · Audit" },
  { emoji: "📦", name: "Operations", roles: "SCM · Process · Quality" },
  { emoji: "📊", name: "Product & Analytics", roles: "PM · Data · Strategy" },
  { emoji: "🤝", name: "Sales & BD", roles: "Accounts · GTM · Partners" },
  { emoji: "🧠", name: "Human Resources", roles: "HRBP · TA · L&D" },
];

/* ============================================================
   SMALL COMPONENTS
   ============================================================ */
function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < n ? "star-gold" : "text-text-faint"}`} />
      ))}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="gold-rule" />
      <span className="t-overline">{children}</span>
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let c = 0;
    const step = to / 50;
    const t = setInterval(() => { c += step; if (c >= to) { setN(to); clearInterval(t); } else setN(Math.floor(c)); }, 20);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* 3D loading fallback */
function SceneSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center scene-skeleton rounded-3xl">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-2 border-champagne border-t-transparent rounded-full mx-auto anim-spin-slow" />
        <p className="t-label">Loading 3D Experience</p>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [reviewIdx, setReviewIdx] = useState(0);

  // ATS Grader
  const [graderForm, setGraderForm] = useState({ name: "", email: "", role: "", target: "", exp: "5" });
  const [graderLoading, setGraderLoading] = useState(false);
  const [graderStep, setGraderStep] = useState(0);
  const [scores, setScores] = useState<{ ats: number; li: number; vis: number; ready: number } | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroO = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % REVIEWS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const runGrader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!graderForm.name || !graderForm.role || !graderForm.target) return;
    setGraderLoading(true); setGraderStep(1);
    let s = 1;
    const iv = setInterval(() => {
      s++; setGraderStep(s);
      if (s >= 5) {
        clearInterval(iv);
        const exp = parseInt(graderForm.exp) || 5;
        setScores({
          ats: Math.min(Math.round(58 + exp * 1.6 + Math.random() * 8), 92),
          li: Math.min(Math.round(60 + Math.random() * 14), 94),
          vis: Math.min(Math.round(55 + exp * 1.2 + Math.random() * 10), 90),
          ready: Math.min(Math.round(52 + exp * 2 + Math.random() * 10), 95),
        });
        setGraderLoading(false);
      }
    }, 700);
  };

  return (
    <div className="relative min-h-screen grain">

      {/* ═══════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-midnight/92 backdrop-blur-2xl border-b border-graphite-light/50 py-3" : "py-5"}`}>
        <div className="container-wide flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group select-none">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center font-display text-sm text-champagne" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>PM</div>
            <div className="hidden sm:block">
              <div className="text-[11px] font-bold tracking-[0.2em] text-white uppercase" style={{ fontFamily: "var(--font-body)" }}>Pooja Malpani</div>
              <div className="t-label" style={{ fontSize: "8px" }}>Executive Career Strategist</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {[["#stories", "Success Stories"], ["#services", "Services"], ["#reviews", "Reviews"], ["#audit", "ATS Audit"], ["#faq", "FAQ"]].map(([h, l]) => (
              <a key={h} href={h} className="text-[13px] font-medium text-text-secondary hover:text-white transition-colors">{l}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="hidden sm:flex btn-outline" style={{ padding: "0.5rem 1.25rem", fontSize: "0.75rem" }}>
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <button onClick={() => setBookOpen(true)} className="btn-gold" style={{ padding: "0.5rem 1.25rem", fontSize: "0.75rem" }}>
              <Calendar className="w-3.5 h-3.5" /> Book Free Call
            </button>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-text-secondary hover:text-white" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-midnight/98 backdrop-blur-2xl flex flex-col" data-lenis-prevent>
            <div className="container-wide flex justify-between items-center py-5">
              <span className="t-title">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 text-text-secondary hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 flex flex-col justify-center container-wide gap-7">
              {[["#stories", "Success Stories"], ["#services", "Services"], ["#reviews", "Reviews"], ["#audit", "ATS Audit"], ["#faq", "FAQ"]].map(([h, l], i) => (
                <motion.a key={h} href={h} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06 } }} onClick={() => setMenuOpen(false)} className="text-3xl text-white hover:text-champagne transition-colors" style={{ fontFamily: "var(--font-display)" }}>{l}</motion.a>
              ))}
            </nav>
            <div className="container-wide pb-10 flex flex-col gap-3">
              <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center"><MessageSquare className="w-4 h-4" /> WhatsApp</a>
              <button onClick={() => { setBookOpen(true); setMenuOpen(false); }} className="btn-gold w-full justify-center"><Calendar className="w-4 h-4" /> Book Free Call</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          SCENE 01 — HERO + HIDDEN PROFESSIONAL 3D
          ═══════════════════════════════════════════ */}
      <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* 3D Background */}
        <div className="canvas-container">
          <Suspense fallback={<SceneSkeleton />}>
            <SceneHiddenProfessional />
          </Suspense>
        </div>

        {/* Content Overlay */}
        <motion.div style={{ opacity: heroO, y: heroY }} className="scene-overlay relative z-10 min-h-screen flex items-center">
          <div className="container-wide pt-28 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left — Editorial Typography */}
              <div className="space-y-8 max-w-2xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                  <span className="badge-gold">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" style={{ animation: "pulse-ring 2s infinite" }} />
                    Accepting New Clients · Mumbai
                  </span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="space-y-5">
                  <h1 className="t-display">
                    Your career <br />
                    <span className="gradient-gold">deserves</span> to <br />
                    be seen.
                  </h1>
                  <p className="t-body-lg max-w-lg">
                    I help mid-senior professionals across India get shortlisted faster — through 
                    strategic resumes, LinkedIn optimization, and interview positioning that works.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-4">
                  <button onClick={() => setBookOpen(true)} className="btn-gold"><Calendar className="w-4 h-4" /> Free 15-min Call</button>
                  <a href="#stories" className="btn-outline"><ChevronRight className="w-4 h-4" /> See Results</a>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6 pt-2">
                  {[{ e: "⭐", l: "5.0 Rating", s: "Google Reviews" }, { e: "🏆", l: "13+ Years", s: "Career Consulting" }, { e: "✅", l: "500+", s: "Careers Transformed" }].map(i => (
                    <div key={i.l} className="flex items-center gap-2.5">
                      <span className="text-lg">{i.e}</span>
                      <div><div className="text-[11px] font-bold text-white">{i.l}</div><div className="t-label">{i.s}</div></div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — Portrait */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative flex justify-center">
                <div className="relative w-full max-w-sm" style={{ filter: "drop-shadow(0 40px 100px rgba(0,0,0,0.8))" }}>
                  <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "3/4", border: "1px solid rgba(201,168,76,0.15)", background: "linear-gradient(135deg, #0A0E23, #040714)" }}>
                    <Image src="/pooja-headshot.png" alt="Pooja Malpani — Executive Career Strategist" fill priority sizes="(max-width: 768px) 100vw, 400px" className="object-cover" style={{ objectPosition: "center top" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #040714 0%, rgba(4,7,20,0.4) 40%, transparent 100%)" }} />
                    <div className="absolute bottom-5 left-5 right-5 glass-elevated rounded-2xl p-4">
                      <div className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Pooja Malpani</div>
                      <div className="t-label mt-0.5">MMS Finance · Executive Career Strategist</div>
                    </div>
                  </div>
                  <motion.div className="anim-float absolute -top-5 -right-5 glass-elevated rounded-2xl px-4 py-3 shadow-2xl" style={{ animationDelay: "0.5s" }}>
                    <div className="t-label">Latest Result</div>
                    <div className="text-sm font-bold text-white mt-0.5" style={{ fontFamily: "var(--font-display)" }}>₹12L → ₹28L</div>
                    <div className="text-[10px] font-mono text-success mt-0.5">+133% CTC · 68 Days</div>
                  </motion.div>
                  <motion.div className="anim-float absolute -bottom-4 -left-5 glass-elevated rounded-2xl px-4 py-3 shadow-2xl" style={{ animationDelay: "1.2s" }}>
                    <Stars />
                    <div className="t-label mt-1.5">500+ clients served</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Stat row */}
            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ n: 500, s: "+", l: "Resumes Transformed" }, { n: 87, s: "%", l: "Interview Rate Increase" }, { n: 13, s: "+", l: "Years Experience" }, { n: 5, s: ".0★", l: "Average Rating" }].map(i => (
                <div key={i.l} className="stat-block glass rounded-2xl glass-interactive">
                  <span className="stat-value"><Counter to={i.n} suffix={i.s} /></span>
                  <span className="stat-label">{i.l}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="t-label">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-champagne/30 flex justify-center pt-2">
            <div className="w-0.5 h-2.5 rounded-full bg-champagne anim-float" />
          </div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="relative z-10 py-4 border-y border-champagne/10" style={{ background: "rgba(10,14,35,0.6)" }}>
        <div className="ticker-track"><div className="ticker-belt">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-5 mx-10">
              <span className="text-[11px] font-mono text-text-secondary">★ {t}</span>
              <span className="text-champagne/30 text-xs">◆</span>
            </span>
          ))}
        </div></div>
      </div>

      {/* ═══════════════════════════════════════════
          SCENE 02 — INDIA CAREER NETWORK + 3D GLOBE
          ═══════════════════════════════════════════ */}
      <section className="relative section-spacing overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Label>Career Network</Label>
              <h2 className="t-headline mb-6">Mumbai to <span className="gradient-gold">everywhere</span>.</h2>
              <p className="t-body mb-8">From India's tech corridors to international markets — 500+ professionals placed across 10+ cities, spanning 6 industries. Every arc represents a career transformed.</p>
              <div className="grid grid-cols-2 gap-4">
                {[{ n: "10+", l: "Cities Served" }, { n: "6", l: "Industries" }, { n: "500+", l: "Professionals" }, { n: "87%", l: "Interview Rate" }].map(s => (
                  <div key={s.l} className="glass rounded-xl p-4 text-center glass-interactive">
                    <div className="t-stat text-xl">{s.n}</div>
                    <div className="t-label mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* 3D Globe */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.1)" }}>
              <Suspense fallback={<SceneSkeleton />}>
                <SceneIndiaNetwork />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY CANDIDATES GET IGNORED
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative z-10" style={{ background: "linear-gradient(180deg, transparent, rgba(10,14,35,0.5) 50%, transparent)" }}>
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Label>The Real Problem</Label>
              <h2 className="t-headline mb-6">Your resume is being <span className="gradient-gold">filtered</span> before a human sees it.</h2>
              <p className="t-body mb-8">Over 75% of resumes are rejected by ATS software before anyone reads a word. The problem isn't your experience — it's how it's presented.</p>
              <div className="space-y-4">
                {[
                  { icon: <Target className="w-4 h-4" />, t: "Wrong Keywords", d: "ATS scans for exact-match terms from job descriptions." },
                  { icon: <FileText className="w-4 h-4" />, t: "Chronological Descriptions", d: "Listing responsibilities instead of achievements destroys rank." },
                  { icon: <Search className="w-4 h-4" />, t: "Invisible LinkedIn", d: "Low SSI score means recruiters can't find you." },
                  { icon: <Zap className="w-4 h-4" />, t: "No Impact Narrative", d: "Hiring managers spend 6 seconds on first scan." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 p-4 rounded-2xl glass glass-interactive">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-champagne" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>{item.icon}</div>
                    <div><div className="text-[13px] font-semibold text-white mb-0.5">{item.t}</div><div className="text-[12px] text-text-secondary leading-relaxed">{item.d}</div></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ATS Stats */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-elevated rounded-3xl p-8 space-y-6">
              <div className="t-overline">ATS Rejection Reality</div>
              {[
                { l: "Resumes rejected by ATS before human review", p: 75, c: "#F87171" },
                { l: "Applications sent without ATS optimization", p: 68, c: "#FBBF24" },
                { l: "Increase in callbacks with optimized resumes", p: 87, c: "#34D399" },
              ].map((bar, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[12px] text-text-secondary max-w-[70%]">{bar.l}</span>
                    <span className="t-stat text-xl" style={{ color: bar.c }}>{bar.p}%</span>
                  </div>
                  <div className="progress-track">
                    <motion.div className="progress-fill" initial={{ width: "0%" }} whileInView={{ width: `${bar.p}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: i * 0.15 }} style={{ background: `linear-gradient(90deg, ${bar.c}66, ${bar.c})` }} />
                  </div>
                </div>
              ))}
              <p className="text-[10px] font-mono text-text-faint pt-2 border-t border-graphite-light/50">Source: Jobscan, LinkedIn Talent Insights, Harvard Business Review</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SUCCESS STORIES
          ═══════════════════════════════════════════ */}
      <section id="stories" className="section-spacing relative z-10">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Label>Verified Client Outcomes</Label>
            <h2 className="t-headline mb-4">Real people. Real results.</h2>
            <p className="t-body">Every number is from an actual client. No hypotheticals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {CASES.map((cs, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="glass-elevated rounded-3xl overflow-hidden glass-interactive flex flex-col">
                <div className="p-6 border-b border-graphite-light/50">
                  <div className="flex justify-between items-start mb-3">
                    <span className="badge-gold text-[9px]">{cs.ind}</span>
                    <span className="badge-success">{cs.time}</span>
                  </div>
                  <div className="t-title text-base">{cs.name}</div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-graphite-light/50">
                  <div className="p-5"><div className="t-label mb-1">{cs.bLabel}</div><div className="t-stat text-lg" style={{ color: "#F87171" }}>{cs.before}</div></div>
                  <div className="p-5"><div className="t-label mb-1">{cs.aLabel}</div><div className="t-stat text-lg" style={{ color: "#34D399" }}>{cs.after}</div></div>
                </div>
                <div className="p-6 flex-1"><p className="text-[12px] text-text-secondary leading-relaxed">{cs.story}</p></div>
                <div className="px-6 pb-6 flex flex-wrap gap-2">
                  {cs.tags.map(tag => (<span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded-lg" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.12)", color: "#C9A84C" }}>{tag}</span>))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <a href={wa("Hi Pooja! I saw your case studies and want to discuss my situation.")} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex"><MessageSquare className="w-4 h-4" /> Discuss My Situation</a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCENE 04 — ATS INTELLIGENCE + 3D
          ═══════════════════════════════════════════ */}
      <section id="audit" className="section-spacing relative z-10">
        <div className="container-narrow">
          <div className="glass-elevated rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* 3D ATS visualization */}
              <div className="relative h-[450px] lg:h-auto border-b lg:border-b-0 lg:border-r border-graphite-light/50">
                <Suspense fallback={<SceneSkeleton />}>
                  <SceneAtsCenter />
                </Suspense>
              </div>
              {/* Grader form */}
              <div className="p-8 md:p-10">
                <Label>Free ATS Score Check</Label>
                <h2 className="t-headline text-2xl mb-3">Is your resume ATS-ready?</h2>
                <p className="t-body text-sm mb-6">Get your career visibility scorecard in 30 seconds.</p>

                {!scores && !graderLoading && (
                  <form onSubmit={runGrader} className="space-y-4">
                    {[
                      { k: "name", l: "Your Name", p: "e.g. Rahul Sharma", t: "text" },
                      { k: "email", l: "Email", p: "your@email.com", t: "email" },
                      { k: "role", l: "Current Role", p: "e.g. Senior Engineer", t: "text" },
                      { k: "target", l: "Target Role", p: "e.g. Engineering Manager", t: "text" },
                    ].map(f => (
                      <div key={f.k}>
                        <label className="t-label block mb-1.5">{f.l}</label>
                        <input type={f.t} required placeholder={f.p} className="w-full rounded-xl px-4 py-3 text-[13px] text-white placeholder-text-faint bg-midnight/80 border border-graphite-light/50 focus:outline-none focus:border-champagne/40 transition-colors" value={(graderForm as Record<string, string>)[f.k]} onChange={e => setGraderForm({ ...graderForm, [f.k]: e.target.value })} />
                      </div>
                    ))}
                    <div>
                      <label className="t-label block mb-1.5">Experience</label>
                      <select className="w-full rounded-xl px-4 py-3 text-[13px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none" value={graderForm.exp} onChange={e => setGraderForm({ ...graderForm, exp: e.target.value })}>
                        <option value="2">0–2 Years</option><option value="5">3–6 Years</option><option value="9">7–12 Years</option><option value="15">13+ Years</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-gold w-full justify-center mt-2"><Zap className="w-4 h-4" /> Get My Scorecard</button>
                  </form>
                )}

                {graderLoading && (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="w-10 h-10 border-2 border-champagne border-t-transparent rounded-full anim-spin-slow" />
                    <p className="t-label anim-glow">Step {graderStep}/5: Analyzing...</p>
                  </div>
                )}

                {scores && !graderLoading && (
                  <div className="space-y-5">
                    <div className="flex justify-between"><div className="t-overline">Your Scorecard</div><button onClick={() => { setScores(null); setGraderStep(0); }} className="t-label hover:text-white transition-colors cursor-pointer">Reset →</button></div>
                    <div className="grid grid-cols-2 gap-3">
                      {[{ l: "ATS Score", v: scores.ats, c: scores.ats > 75 ? "#34D399" : "#F87171" }, { l: "LinkedIn", v: scores.li, c: "#C9A84C" }, { l: "Visibility", v: scores.vis, c: "#A78BFA" }, { l: "Readiness", v: scores.ready, c: "#38BDF8" }].map((s, i) => (
                        <div key={i} className="glass rounded-2xl p-4 text-center">
                          <div className="t-label mb-1">{s.l}</div>
                          <div className="t-stat text-2xl" style={{ color: s.c }}>{s.v}%</div>
                        </div>
                      ))}
                    </div>
                    <a href={wa(`Hi Pooja! My ATS score is ${scores.ats}% and LinkedIn is ${scores.li}%. I'd like to discuss improvement.`)} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center"><MessageSquare className="w-4 h-4" /> Discuss Results with Pooja</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT POOJA
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative z-10">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-elevated rounded-3xl p-8 space-y-6 order-2 lg:order-1">
              <div className="t-overline">Verified Credentials</div>
              {[
                { icon: <GraduationCap className="w-5 h-5" />, t: "MMS Finance", s: "Mumbai University", d: "Masters specializing in Finance" },
                { icon: <Shield className="w-5 h-5" />, t: "Govt Cooperative Auditor", s: "Maharashtra State", d: "Auditing discipline applied to career documentation" },
                { icon: <Users className="w-5 h-5" />, t: "13+ Years Consulting", s: "ATS & LinkedIn Specialist", d: "500+ professionals across India & international" },
                { icon: <Star className="w-5 h-5" />, t: "5.0 Star Rated", s: "Google Reviews", d: "Consistent measurable results" },
              ].map((c, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-champagne" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>{c.icon}</div>
                  <div><div className="text-[13px] font-semibold text-white">{c.t}</div><div className="text-[11px] font-mono text-champagne mt-0.5">{c.s}</div><div className="text-[11px] text-text-secondary mt-1">{c.d}</div></div>
                </div>
              ))}
            </motion.div>
            <div className="order-1 lg:order-2">
              <Label>About Pooja</Label>
              <h2 className="t-headline mb-6">I know why <span className="gradient-gold">exceptional people</span> get overlooked.</h2>
              <div className="space-y-4 t-body">
                <p>For 13 years, I've studied the intersection of corporate hiring systems and human psychology. I hold a Masters in Finance and am a certified Government Cooperative Auditor — I bring the same rigor to career documentation as an enterprise audit.</p>
                <p>I've seen brilliant engineers ignored because their resumes parsed at 60% ATS compliance. I've transformed those same people into candidates who get 5 interview calls in a week.</p>
                <p className="text-white italic" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>"Visibility isn't luck. It's positioning."</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                <button onClick={() => setBookOpen(true)} className="btn-gold text-sm"><Calendar className="w-4 h-4" /> Free Call</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES
          ═══════════════════════════════════════════ */}
      <section id="services" className="section-spacing relative z-10" style={{ background: "linear-gradient(180deg, transparent, rgba(10,14,35,0.4) 100%)" }}>
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Label>Investment in Your Career</Label>
            <h2 className="t-headline mb-4">Choose your trajectory.</h2>
            <p className="t-body">Every package is a complete transformation — not a template.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {SERVICES.map((svc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl flex flex-col glass-interactive ${svc.hl ? "border-2" : "glass border"}`}
                style={svc.hl ? { background: "linear-gradient(135deg, #0A0E23, #141B3A)", borderColor: "#C9A84C", boxShadow: "0 0 50px rgba(201,168,76,0.12), 0 20px 60px rgba(0,0,0,0.5)" } : { borderColor: "rgba(201,168,76,0.1)" }}>
                {svc.hl && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2"><span className="text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #C9A84C, #E8D5A0)", color: "#040714" }}>Most Popular</span></div>}
                <div className="p-7 flex-1 flex flex-col">
                  <div className="mb-6"><div className="t-title text-xl">{svc.name}</div><div className="t-label mt-1">{svc.sub}</div></div>
                  <div className="mb-6 pb-6 border-b border-graphite-light/50"><div className="t-stat">{svc.price}</div><div className="text-[10px] font-mono text-champagne uppercase tracking-widest mt-1">{svc.note}</div></div>
                  <p className="text-[12px] text-text-secondary leading-relaxed mb-6">{svc.desc}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {svc.features.map((f, fi) => (<li key={fi} className="flex items-start gap-2.5"><Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-champagne" /><span className="text-[12px] text-text-secondary">{f}</span></li>))}
                  </ul>
                  <a href={wa(`Hi Pooja! I'm interested in the ${svc.name} package (${svc.price}).`)} target="_blank" rel="noopener noreferrer" className={svc.hl ? "btn-gold w-full justify-center" : "btn-outline w-full justify-center"}>Get Started <ArrowRight className="w-4 h-4" /></a>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center text-[12px] text-text-secondary font-mono">💬 Not sure? <button onClick={() => setBookOpen(true)} className="text-champagne underline underline-offset-2 cursor-pointer">Book a free call</button> — no commitment.</div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INDUSTRY MATRIX
          ═══════════════════════════════════════════ */}
      <section className="section-spacing-sm relative z-10">
        <div className="container-narrow">
          <div className="text-center mb-10"><Label>Industry Coverage</Label><h2 className="t-headline mb-3">Deep expertise. Every domain.</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="glass rounded-2xl p-5 text-center glass-interactive">
                <div className="text-3xl mb-3">{ind.emoji}</div>
                <div className="text-[12px] font-semibold text-white mb-1">{ind.name}</div>
                <div className="t-label">{ind.roles}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          REVIEWS
          ═══════════════════════════════════════════ */}
      <section id="reviews" className="section-spacing relative z-10" style={{ background: "linear-gradient(180deg, transparent, rgba(10,14,35,0.5) 50%, transparent)" }}>
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-14"><Label>Client Testimonials</Label><h2 className="t-headline mb-4">What clients say.</h2></div>

          {/* Featured cycling review */}
          <AnimatePresence mode="wait">
            <motion.div key={reviewIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="glass-elevated rounded-3xl p-8 md:p-10 max-w-3xl mx-auto mb-8" style={{ border: "1px solid rgba(201,168,76,0.15)" }}>
              <Quote className="w-8 h-8 text-champagne/20 mb-4" />
              <p className="text-[15px] md:text-[17px] text-warm-white leading-relaxed mb-6 italic" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>"{REVIEWS[reviewIdx].text}"</p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: REVIEWS[reviewIdx].bg }}>{REVIEWS[reviewIdx].init}</div>
                  <div><div className="text-sm font-semibold text-white">{REVIEWS[reviewIdx].name}</div><div className="t-label">{REVIEWS[reviewIdx].role} · {REVIEWS[reviewIdx].co}</div></div>
                </div>
                <div className="flex flex-col items-end gap-1"><Stars /><span className="badge-success">{REVIEWS[reviewIdx].result}</span></div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mb-12">
            {REVIEWS.map((_, i) => (<button key={i} onClick={() => setReviewIdx(i)} className={`rounded-full transition-all duration-300 ${i === reviewIdx ? "w-6 h-2 bg-champagne" : "w-2 h-2 bg-white/15 hover:bg-white/30"}`} />))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-5 glass-interactive flex flex-col">
                <div className="flex justify-between items-start mb-3"><Stars /><span className="badge-success text-[8px]">{r.result}</span></div>
                <p className="text-[12px] text-text-secondary leading-relaxed flex-1 mb-4 italic">"{r.text.slice(0, 150)}..."</p>
                <div className="flex items-center gap-2.5 pt-3 border-t border-graphite-light/50">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: r.bg }}>{r.init}</div>
                  <div><div className="text-[12px] font-semibold text-white">{r.name}</div><div className="t-label">{r.role}</div></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════ */}
      <section id="faq" className="section-spacing relative z-10">
        <div className="container-reading">
          <div className="text-center mb-12"><Label>Common Questions</Label><h2 className="t-headline mb-4">Frequently asked.</h2></div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass rounded-2xl overflow-hidden glass-interactive">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer">
                  <span className="text-[14px] font-semibold text-white leading-snug">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-champagne flex-shrink-0 transition-transform duration-300 ${faqOpen === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`accordion-body ${faqOpen === i ? "open" : ""}`}><div><div className="px-6 pb-5"><div className="h-px bg-graphite-light/50 mb-4" /><p className="text-[13px] text-text-secondary leading-relaxed">{faq.a}</p></div></div></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════ */}
      <section className="section-spacing relative z-10 overflow-hidden">
        <div className="container-narrow">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl text-center px-8 py-16 md:py-24 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0A0E23, #141B3A 50%, #0A0E23)", border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 0 100px rgba(201,168,76,0.06), inset 0 1px 0 rgba(201,168,76,0.08)" }}>
            <div className="bloom" style={{ width: "60vw", maxWidth: 700, height: "60vw", maxHeight: 700, top: "-30%", left: "50%", transform: "translateX(-50%)" }} />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="badge-gold mx-auto">Limited Spots</span>
              <h2 className="t-headline">Ready to stop being <span className="gradient-gold">invisible</span>?</h2>
              <p className="t-body max-w-lg mx-auto">Every week with an unoptimized resume is a week of opportunities missed. Book your free call. No pressure.</p>
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <button onClick={() => setBookOpen(true)} className="btn-gold" style={{ padding: "1rem 2.5rem" }}><Calendar className="w-5 h-5" /> Free 15-min Call</button>
                <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "1rem 2.5rem" }}><MessageSquare className="w-5 h-5" /> WhatsApp</a>
              </div>
              <div className="t-label pt-2">Response within 24 hours · Free consultation · No obligation</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-champagne/10 section-spacing-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4"><div className="h-9 w-9 rounded-xl flex items-center justify-center font-display text-sm text-champagne" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>PM</div><div className="font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Pooja Malpani</div></div>
              <p className="text-[12px] text-text-secondary leading-relaxed max-w-xs">Executive Career Strategist. ATS Specialist. LinkedIn Expert. Helping professionals across India get the interviews they deserve.</p>
            </div>
            <div><div className="t-overline mb-4">Quick Links</div><div className="space-y-2.5">{[["#stories", "Success Stories"], ["#services", "Services"], ["#reviews", "Reviews"], ["#audit", "ATS Audit"], ["#faq", "FAQ"]].map(([h, l]) => (<a key={h} href={h} className="block text-[13px] text-text-secondary hover:text-white transition-colors">{l}</a>))}</div></div>
            <div><div className="t-overline mb-4">Contact</div><div className="space-y-3">
              <a href={wa()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[13px] text-text-secondary hover:text-white transition-colors"><MessageSquare className="w-4 h-4 text-champagne" /> +91 99236 49723</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[13px] text-text-secondary hover:text-white transition-colors"><Linkedin className="w-4 h-4 text-champagne" /> LinkedIn</a>
              <div className="flex items-center gap-2.5 text-[13px] text-text-secondary"><MapPin className="w-4 h-4 text-champagne" /> Mumbai, India</div>
            </div></div>
          </div>
          <div className="border-t border-graphite-light/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="t-label">© 2026 Pooja Malpani Career Advisory</span>
            <div className="flex items-center gap-1">{[1, 2, 3, 4, 5].map(s => (<Star key={s} className="w-3 h-3 star-gold" />))}<span className="t-label ml-2">5.0 · Google Reviews</span></div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════
          BOOKING MODAL
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {bookOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(16px)" }} onClick={e => e.target === e.currentTarget && setBookOpen(false)} data-lenis-prevent>
            <motion.div initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }} className="w-full max-w-lg glass-elevated rounded-3xl p-8 relative" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
              <button onClick={() => setBookOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-white bg-graphite/50"><X className="w-4 h-4" /></button>
              <div className="mb-6"><div className="t-overline mb-3">Free Discovery Call</div><h3 className="t-title text-2xl">Book Your 15-Minute Call</h3><p className="text-[13px] text-text-secondary mt-2">Quick conversation to understand your goals. No selling. Just strategy.</p></div>
              <div className="space-y-2.5 mb-6">
                <div className="t-label mb-3">Available This Week</div>
                {[{ d: "Monday", t: "10:00 AM IST", tp: "Career Review" }, { d: "Wednesday", t: "4:00 PM IST", tp: "ATS Strategy" }, { d: "Friday", t: "11:00 AM IST", tp: "LinkedIn Review" }, { d: "Saturday", t: "12:00 PM IST", tp: "General" }].map((slot, i) => (
                  <a key={i} href={wa(`Hi Pooja! I'd like to book a ${slot.tp} call on ${slot.d} at ${slot.t}.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-midnight/80 border border-graphite-light/50 hover:border-champagne/30 transition-all group">
                    <div><div className="text-[13px] font-semibold text-white">{slot.d} · {slot.t}</div><div className="t-label mt-0.5">{slot.tp}</div></div>
                    <ArrowRight className="w-4 h-4 text-champagne opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
              <a href={wa("Hi Pooja! I'd like to book a free discovery call.")} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center"><MessageSquare className="w-4 h-4" /> Confirm via WhatsApp</a>
              <button onClick={() => setBookOpen(false)} className="w-full text-center text-[12px] font-mono text-text-muted hover:text-white mt-3 py-2 transition-colors">Maybe later</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp */}
      <a href={wa()} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 anim-pulse-ring" style={{ background: "#25D366" }} aria-label="WhatsApp">
        <MessageSquare className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
