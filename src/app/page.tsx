"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FloatingParticles } from "../components/FloatingParticles";
import { AtsScanner } from "../components/AtsScanner";
import { 
  FileText, 
  Linkedin, 
  Layers, 
  Activity, 
  ArrowUpRight, 
  Award,
  Zap, 
  CheckCircle,
  MessageSquare,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MapPin,
  GraduationCap
} from "lucide-react";

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [uptimeIndex, setUptimeIndex] = useState("99.9% ATS Pass");
  const [radarLoad, setRadarLoad] = useState("0.04% Error Rate");

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Rajat Thakur",
      role: "Sr Magento Architect",
      keywords: "Php | Magento | Laravel | Shopify",
      quote: "It was an exceptionally great experience while working with Pooja. She has an elite understanding of executive tech keywords and structure.",
      rating: "5.0 / 5.0 Rated",
    },
    {
      name: "Amit M.",
      role: "Lighting Sales & Channel Management",
      keywords: "B2B Market | Security Systems | Team Building",
      quote: "Recruiting agencies prefer resumes designed properly which their softwares can read. For ATS enabled or supported Resumes Pooja can help you in the same. Pooja is a good Resume Maker and has experience in making your resume more meaningful!",
      rating: "5.0 / 5.0 Rated",
    }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToGrader = () => {
    const element = document.getElementById("ats-grader-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getWhatsAppAdvisoryLink = () => {
    const message = encodeURIComponent("Hi Pooja! I visited your website and would love to book a professional career branding & ATS resume consultation session with you.");
    return `https://wa.me/919923649723?text=${message}`;
  };

  return (
    <>
      <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col font-sans relative overflow-hidden selection:bg-emerald-500/30 selection:text-white">
        
        {/* Animated Particles background */}
        <FloatingParticles />

        {/* Ambient Spots */}
        <div className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] rounded-full ambient-glow-1 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-15%] w-[60%] h-[60%] rounded-full ambient-glow-2 blur-[130px] pointer-events-none" />
        <div className="absolute top-[50%] left-[20%] w-[50%] h-[50%] rounded-full ambient-glow-3 blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 apple-grid opacity-35 pointer-events-none z-0" />

        {/* Apple-Style Navigation Bar */}
        <header className="relative z-30 border-b border-white/5 bg-black/40 backdrop-blur-xl px-6 py-4 animate-header">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center font-bold text-emerald-400 font-serif text-lg select-none hover:bg-emerald-500/10 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                PC
              </div>
              <div>
                <span className="font-bold text-sm tracking-wider text-white block uppercase">POOJA CHANDAK</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-mono font-bold">Career Branding Platform</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 bg-zinc-900/40 px-3 py-1 rounded-full border border-white/5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ACTIVE AUDITS: LIVE
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900/40 px-3 py-1 rounded-full border border-white/5">
                SCORE RATIO: <span className="text-zinc-200">{uptimeIndex}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900/40 px-3 py-1 rounded-full border border-white/5">
                SCAN LIMIT: <span className="text-zinc-200">Unlimited</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/pooja-chandak-0b409a52/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex h-8 w-8 rounded-lg border border-white/10 hover:border-emerald-500/30 items-center justify-center bg-zinc-950/40 text-zinc-400 hover:text-emerald-400 transition-all"
                title="LinkedIn Profile"
                id="header-linkedin"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={scrollToGrader}
                id="header-cta"
                className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 px-4 py-2 text-xs font-mono font-bold text-emerald-400 cursor-pointer transition-all whatsapp-glow"
              >
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                <span>FREE RESUME SCAN</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 relative z-20 space-y-24">
          
          {/* Section 1: Apple-style Hero */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4 sm:pt-8">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="reveal-scroll inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-bold">
                <Award className="h-3.5 w-3.5" />
                <span>13+ Years of Resume Strategy</span>
              </div>

              <h1 className="reveal-scroll text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08] font-serif">
                Elevate Your <br />
                <span className="text-gradient-emerald-cyan">Professional Identity.</span> <br />
                Pass Every ATS Scan.
              </h1>

              <p className="reveal-scroll text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                In high-velocity recruitment markets, simple achievements get filtered out by AI scanner models. 
                Pooja Chandak crafts premium, keyword-optimized, metric-driven resumes that bypass automated filters 
                and seize the absolute attention of executive decision makers.
              </p>

              <div className="reveal-scroll flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={scrollToGrader}
                  className="px-6 py-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 font-mono text-xs font-bold text-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_5px_25px_-5px_rgba(16,185,129,0.4)]"
                >
                  <Zap className="h-4 w-4" />
                  <span>Scan Resume Free</span>
                </button>
                <a
                  href={getWhatsAppAdvisoryLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 font-mono text-xs font-bold text-zinc-300 hover:text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Direct Consultation</span>
                </a>
              </div>
            </div>

            {/* Right Side: Animated Mockup Array (Apple Floating Mockup) */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              <div className="absolute w-[120%] h-[120%] bg-radial from-emerald-500/5 to-transparent blur-[100px] pointer-events-none" />
              
              <div className="relative w-full max-w-sm space-y-4">
                
                {/* Floating Mockup Card 1 */}
                <div className="animate-float p-5 rounded-2xl apple-glass border border-white/10 shadow-2xl relative z-10">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-zinc-400">ATS COMPLIANT MODEL</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">98% MATCH</span>
                  </div>
                  <div className="space-y-2 text-[10.5px] font-mono text-zinc-500">
                    <div className="text-white font-bold font-sans text-sm">Rajat Thakur — Sr Magento Architect</div>
                    <div className="flex gap-2 text-[9px] text-emerald-400 mt-1">
                      <span>✓ Php / Laravel</span>
                      <span>✓ API Optimization</span>
                      <span>✓ Metric Scale</span>
                    </div>
                    <p className="mt-2 text-zinc-400 leading-relaxed font-sans">Optimized complex core database streams resulting in a 35% performance enhancement under high load limits.</p>
                  </div>
                </div>

                {/* Floating Mockup Card 2 (Offset/Delayed) */}
                <div className="animate-float-delayed p-5 rounded-2xl apple-glass border border-white/5 shadow-2xl relative translate-x-4 sm:translate-x-8 z-0">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-zinc-400">EXECUTIVE BIO MATRIX</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">SWOT COMPLIANT</span>
                  </div>
                  <div className="space-y-2 text-[10.5px] font-mono text-zinc-500">
                    <div className="text-white font-bold font-sans text-sm">Amit M. — Lighting Channel Director</div>
                    <div className="flex gap-2 text-[9px] text-cyan-400 mt-1">
                      <span>✓ B2B Sales</span>
                      <span>✓ Team Re-Scaling</span>
                      <span>✓ Multi-Region Channels</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 2: Pooja's Executive Profile Card */}
          <section className="reveal-scroll max-w-4xl mx-auto apple-glass rounded-3xl p-6 sm:p-8 border border-white/5 relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-transparent" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative h-32 w-32 shrink-0 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                {/* Visual Placeholder for headshot with high-end abstract initial ring */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-zinc-950 to-cyan-500/20 flex items-center justify-center text-white font-serif text-4xl font-bold select-none">
                  PC
                </div>
              </div>

              <div className="space-y-4 text-center md:text-left flex-1">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Pooja Chandak</h2>
                  <p className="text-emerald-400 font-mono text-xs mt-1 uppercase tracking-wider font-bold">
                    ATS Resume Writer · Career Branding Expert · Cover Letter Specialist
                  </p>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                  With over <strong>13+ years of professional freelance experience</strong>, I specialize in transforming raw professional histories into highly focused, machine-readable career stories. Having studied Master of Management Studies (Finance) and holding certificates in Cooperative Audits from the Government of Maharashtra, I apply strict analytical methodologies to optimize resumes across diverse sectors including IT, Finance, Operations, Sales, Marketing, and Healthcare.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-zinc-300">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Mumbai, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <GraduationCap className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>MMS Finance · NCRD Sterling Institute</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Interactive Grader Embed */}
          <section id="ats-grader-section" className="reveal-scroll py-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">Core Telemetry Audit</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif tracking-tight">Scan Your Resume Plain Text</h2>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-lg mx-auto">
                Bypass recruiter filters. Our scanner calculates your match index in 10 seconds and identifies critical structural alignment gaps.
              </p>
            </div>

            <AtsScanner />
          </section>

          {/* Section 4: Stats Grid */}
          <section className="reveal-scroll grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { val: "13+ Years", label: "FREELANCE EXPERIENCE", desc: "Crafting optimized CVs since Dec 2012" },
              { val: "Hundreds", label: "CAREERS ELEVATED", desc: "From entry freshers to C-Suite directors" },
              { val: "5.0 / 5.0", label: "CLIENT RATING INDEX", desc: "100% satisfactory keyword optimization" }
            ].map((stat, i) => (
              <div key={i} className="apple-glass rounded-2xl p-6 border border-white/5 hover:border-emerald-500/10 transition-all flex flex-col justify-between h-36">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">{stat.label}</span>
                  <Activity className="h-4 w-4 text-emerald-500/60" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white tracking-tight leading-none mb-1.5">{stat.val}</div>
                  <p className="text-zinc-400 text-[11px] font-sans leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Section 5: Services */}
          <section className="reveal-scroll space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">Signature Advisory Protocols</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif tracking-tight">Elite Career Branding Tiers</h2>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-lg mx-auto">
                Tailored systems to elevate your professional presence, build powerful networks, and land target corporate interviews.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "ATS Resume Writing",
                  desc: "Drafting optimized resumes with strict keywords, results-oriented action verbs, and customizable formatting that softwares can read seamlessly.",
                  badge: "Core Service",
                  color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
                },
                {
                  title: "LinkedIn Optimization",
                  desc: "Reconstructing headlines, about profiles, and experience listings to trigger recruiter search algorithms and drive direct inbound job opportunities.",
                  badge: "Highly Requested",
                  color: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10"
                },
                {
                  title: "Cover Letter Structuring",
                  desc: "Creating high-impact personalized value propositions targeted specifically to company needs, ensuring high response rates.",
                  badge: "Conversion Booster",
                  color: "text-amber-400 bg-amber-500/5 border-amber-500/10"
                },
                {
                  title: "Google Business Verification",
                  desc: "Assisting entrepreneurs and business owners to successfully register, set up, verify, and index their localized Google Business parameters.",
                  badge: "Bonus Service",
                  color: "text-purple-400 bg-purple-500/5 border-purple-500/10"
                }
              ].map((serv, i) => (
                <div key={i} className="apple-glass rounded-2xl p-6 border border-white/5 hover:border-emerald-500/10 transition-all flex flex-col justify-between h-64 scale-hover apple-glass-hover">
                  <div className="space-y-3">
                    <span className={`inline-block text-[9px] font-mono px-2 py-0.5 rounded-full border ${serv.color}`}>
                      {serv.badge}
                    </span>
                    <h3 className="text-white font-bold text-base tracking-tight">{serv.title}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans">{serv.desc}</p>
                  </div>
                  <a
                    href={getWhatsAppAdvisoryLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 uppercase hover:text-emerald-300 transition-colors"
                  >
                    <span>Request Tier</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Interactive Testimonials Slider */}
          <section className="reveal-scroll max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">Client Endorsements</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">Shortlisted Success Stories</h2>
            </div>

            <div className="relative apple-glass rounded-3xl p-6 sm:p-8 border border-white/5 min-h-64 flex flex-col justify-between">
              <div className="absolute top-2 left-6 h-1 w-12 bg-zinc-900 rounded-full border border-white/5" />
              
              <div className="py-4 space-y-4 animate-fade-in" key={activeTestimonial}>
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-0.5 rounded-full inline-block">
                  {testimonials[activeTestimonial].rating}
                </div>
                <blockquote className="text-white font-serif text-base sm:text-lg italic leading-relaxed">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </blockquote>
                <div className="space-y-1">
                  <div className="font-bold text-sm text-white">{testimonials[activeTestimonial].name}</div>
                  <div className="text-[11px] text-zinc-500 font-mono">
                    {testimonials[activeTestimonial].role} · <span className="text-zinc-600">{testimonials[activeTestimonial].keywords}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                <div className="flex gap-1.5">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`h-1.5 w-6 rounded-full transition-all cursor-pointer ${
                        idx === activeTestimonial ? "bg-emerald-400" : "bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevTestimonial}
                    className="h-8 w-8 rounded-lg border border-white/5 hover:border-white/15 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer bg-zinc-950/40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNextTestimonial}
                    className="h-8 w-8 rounded-lg border border-white/5 hover:border-white/15 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer bg-zinc-950/40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Conversational Closing Call to Action Banner */}
          <section className="reveal-scroll max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent border border-white/5 p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <h2 className="text-3xl font-bold text-white tracking-tight font-serif leading-tight">
                Ready to Stop Waiting <br />
                and Start Getting Shortlisted?
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Connect with professional resume writer Pooja Chandak. Get diagnostic SWOT evaluations, custom MS Word editable ATS designs, and professional career story mapping.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto justify-center">
              <a
                href={getWhatsAppAdvisoryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg whatsapp-glow"
              >
                <MessageSquare className="h-4 w-4 fill-black" />
                <span>Book Advisory Session</span>
              </a>
              <button
                onClick={scrollToGrader}
                className="px-6 py-4 rounded-xl border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 font-mono text-xs font-bold text-zinc-300 hover:text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Zap className="h-4 w-4" />
                <span>Scan Resume</span>
              </button>
            </div>
          </section>

        </main>

        {/* Apple-Style Elegant Footer */}
        <footer className="relative z-30 border-t border-white/5 bg-zinc-950/20 py-8 px-6 text-center text-xs font-mono text-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Pooja Chandak Career Advisory. Made with precision in Mumbai, Maharashtra, India.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <a
                href="https://wa.me/919923649723"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                WhatsApp: 9923649723
              </a>
              <span>●</span>
              <a
                href="https://www.linkedin.com/in/pooja-chandak-0b409a52/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
