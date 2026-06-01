"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  CheckCircle,
  X,
  ArrowRight,
  Calendar,
  MessageSquare,
  Zap,
  Target,
  BarChart2,
  Phone,
  Linkedin,
  TrendingUp,
  Award,
  Users,
  Send,
  Mail,
  Network
} from "lucide-react";

import { PLACEMENT_DOSSIERS } from "@/lib/mockDb";
import { IphoneMockup } from "@/components/IphoneMockup";
import { ReviewCarousel } from "@/components/ReviewCarousel";

const LINKEDIN_PROFILE = "https://www.linkedin.com/in/pooja-chandak-0b409a52/";
const WA_PHONE = "919923649723";
const waLink = (msg?: string) =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg || "Hi Pooja! Let's discuss my executive career strategy.")}`;
const CALENDLY_LINK = "https://calendly.com/your-calendly-link"; 

const COMPANIES = ["Google", "Microsoft", "Salesforce", "Zepto", "PhonePe", "Amazon", "Meta", "Goldman Sachs", "McKinsey", "Razorpay"];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDossier, setActiveDossier] = useState<any>(PLACEMENT_DOSSIERS[0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-[#111827] selection:bg-[#C9A84C]/20 font-sans">
      
      {/* Light Abstract Background Elements */}
      <div className="blur-blob w-[300px] h-[300px] bg-[#C9A84C]/15 top-[-50px] right-[-50px] anim-pulse hidden md:block" />
      <div className="blur-blob w-[300px] h-[300px] bg-[#34D399]/10 bottom-[20%] left-[-50px] anim-float delay-2 hidden md:block" />

      {/* ═══════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-black/5 py-3 shadow-xs" : "py-4 md:py-6 bg-transparent"
      }`}>
        <div className="container-main flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group relative z-10">
            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-white text-xs tracking-wider">PM</span>
            </div>
            <span className="font-black tracking-tight text-sm md:text-base hidden sm:block">Pooja Malpani</span>
          </a>

          <div className="flex items-center gap-2 md:gap-3">
            <a href="/ats-audit" className="btn-secondary text-xs md:text-sm py-2 px-3.5 border-black/15 text-black flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#C9A84C]" /> ATS Auditor
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-secondary hidden sm:flex text-xs md:text-sm py-2 px-4">
              <MessageSquare className="w-4 h-4 text-emerald-600" /> WhatsApp
            </a>
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs md:text-sm py-2 px-4 shadow-md shadow-black/10">
              <Calendar className="w-4 h-4" /> Book Strategy Call
            </a>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          HERO & 3D INTERACTIVE LINKEDIN SHOWCASE
          ═══════════════════════════════════════════ */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 section-padding z-10 overflow-hidden">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Left Column: Assertive Direct Pitch */}
            <div className="lg:col-span-7 text-left space-y-6 md:space-y-8">
              
              <div>
                <span className="tag-accent border border-[#C9A84C]/30 shadow-xs bg-white text-[#B29440] font-black uppercase tracking-wider py-1 px-3">
                  <Star className="w-3.5 h-3.5 fill-current text-[#C9A84C]" /> Top 1% Executive Advisor
                </span>
              </div>
              
              <h1 className="heading-xl text-3d text-black tracking-tight">
                Command the C-Suite <br />
                <span className="accent-text">Shortlists You Deserve.</span>
              </h1>
              
              <p className="text-body-lg text-gray-700 max-w-xl leading-relaxed text-sm sm:text-base md:text-lg">
                Stop applying blindly to black-hole job boards. Bypass parsing filters and recruit inbound headhunters with custom **audit-backed narratives** and **high-traction LinkedIn optimization**. 🚀
              </p>

              {/* Instant Conversion Bullets */}
              <ul className="space-y-2.5 font-bold text-xs sm:text-sm text-black">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-600" /> 100% Custom Narrative. Zero AI-sounding text templates.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-600" /> Hard P&L Optimization (CAR Achievements focused).
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-600" /> Direct Routing into Pooja's Private Recruiter Networks.
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary text-base py-3 px-6 shadow-lg shadow-black/20">
                  <Zap className="w-4.5 h-4.5 text-[#C9A84C] fill-current" /> Lock in Your Strategy
                </a>
                <a href="#dossiers" className="btn-secondary text-base py-3 px-6 bg-white hover:bg-gray-50 border-gray-200 font-bold">
                  View Placements Outcome <ArrowRight className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Hero Right Column: High-wow Interactive iPhone Mockup */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <IphoneMockup />
            </div>

          </div>

          {/* Aggressive Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-10 md:pt-16">
            {[
              { value: "4.2X", label: "Inbound Jumps", icon: <TrendingUp className="w-4 h-4 text-emerald-600" /> },
              { value: "500+", label: "Careers Rebuilt", icon: <Users className="w-4 h-4 text-blue-600" /> },
              { value: "115%", label: "Average CTC Gain", icon: <BarChart2 className="w-4 h-4 text-purple-600" /> },
              { value: "5.0★", label: "Executive Trust", icon: <Award className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" /> }
            ].map((stat, i) => (
              <div key={i} className="bento-card !p-4 md:!p-6 flex flex-col items-center justify-center space-y-1 border-gray-100 shadow-xs bg-white">
                <div className="text-metric accent-text font-black">{stat.value}</div>
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-wider">
                  {stat.icon} {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPANIES MARQUEE
          ═══════════════════════════════════════════ */}
      <section className="py-6 md:py-8 border-y border-gray-100 bg-[#FAFAFA] overflow-hidden">
        <div className="container-main mb-4 text-center">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            PLACEMENTS ROUTED INTO PREMIUM GLOBAL ORGS
          </p>
        </div>

        {/* Marquee Ticker */}
        <div className="marquee-container mask-edges">
          <div className="marquee-content gap-12 md:gap-20 items-center px-4">
            {[...COMPANIES, ...COMPANIES].map((company, idx) => (
              <span key={idx} className="text-lg md:text-xl font-black text-gray-300 uppercase tracking-tight">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BENTO GRID SERVICES (Aggressive Selling copy)
          ═══════════════════════════════════════════ */}
      <section className="section-padding z-10 relative bg-white border-b border-gray-50">
        <div className="container-main space-y-8 md:space-y-12">
          
          <div className="space-y-2 max-w-2xl text-left">
            <h2 className="heading-lg text-black">Direct Placement <span className="accent-text">Advisory Services</span>.</h2>
            <p className="text-body font-semibold">We don't sell text edits. We re-engineer positioning metrics to attract maximum CTC conversions. 📈</p>
          </div>

          <div className="bento-grid">
            
            {/* Service 1 */}
            <div className="bento-card bento-card-interactive col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-black border border-gray-100">
                  <Target className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <h3 className="heading-md text-black">ATS Diagnostic Resume Rewrite</h3>
                <p className="text-body text-xs sm:text-sm">
                  We rewrite operations text entirely. We structure achievements into heavy-impact CAR models (Context-Action-Result) that bypass Workday/Taleo filter protocols.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag-success">Avg. Score: 95%+</span>
                </div>
              </div>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full mt-6 justify-between group font-bold">
                Scan Resume First <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Service 2 */}
            <div className="bento-card bento-card-interactive col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                  <Linkedin className="w-6 h-6" />
                </div>
                <h3 className="heading-md text-black">LinkedIn Inbound Growth Engine</h3>
                <p className="text-body text-xs sm:text-sm">
                  Optimize high-yield keywords to attract inbound C-Suite headhunters. We boost your SSI (Social Selling Index) above 85, placing your profile in the absolute top searches.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag-accent border-[#C9A84C]/20 bg-white">+300% Views Guaranteed</span>
                </div>
              </div>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full mt-6 justify-between group font-bold">
                Attract Recruiter Inbounds <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Service 3 */}
            <div className="bento-card bento-card-interactive col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-100">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="heading-md text-black">Post-Application Follow-ups & Recruiter DMs</h3>
                <p className="text-body text-xs sm:text-sm">
                  Applying is only 10% of the game. We script aggressive follow-up email campaigns, custom recruiter outreach pitches, and executive cover letters that convert cold targets.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag-success !bg-emerald-50 !text-emerald-700">50%+ Recruiter Response</span>
                </div>
              </div>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full mt-6 justify-between group font-bold">
                Get Campaign Scripts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Premium Program Box (Full C-Suite Overhaul) */}
            <div className="bento-card col-span-12 lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center bg-black text-white border-black shadow-2xl p-6 sm:p-10 gap-6">
              <div className="space-y-4 max-w-2xl text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C] flex items-center justify-center text-black">
                    <Zap className="w-6 h-6 fill-current" />
                  </div>
                  <span className="tag-accent !bg-white/10 !text-white !border-white/20 uppercase tracking-widest font-black text-[10px]">
                    Signature Advisory 🔥
                  </span>
                </div>
                <h3 className="heading-lg text-white font-extrabold">Ultimate Boardroom & C-Suite Positioning</h3>
                <p className="text-sm text-gray-300">
                  Full-scope career re-engineering. We rebuild your professional narrative from the ground up, manage private routing to tech founders and venture partners, and supply custom mock pipelines.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs font-mono font-bold text-gray-400">
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Executive Mock Interviews</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> 1-on-1 Strategy Lock</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Recruiter DM routing</span>
                </div>
              </div>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-accent py-4 px-8 justify-between group shadow-none w-full md:w-auto text-center font-bold">
                Apply for Cohort <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DOSSIERS / PLACEMENTS UPLIFTS
          ═══════════════════════════════════════════ */}
      <section id="dossiers" className="section-padding relative z-10 bg-[#FAFAFA] border-t border-gray-100">
        <div className="container-main space-y-8 md:space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="heading-lg text-black">Verified Executive <span className="accent-text">CTC Uplifts</span>.</h2>
            <p className="text-body font-bold text-gray-500">Real outcomes. Numbers talk. 💸</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            
            {/* Nav */}
            <div className="lg:col-span-4 flex flex-col gap-2 md:gap-3">
              {PLACEMENT_DOSSIERS.map((cs) => (
                <button
                  key={cs.id}
                  onClick={() => setActiveDossier(cs)}
                  className={`text-left p-4 md:p-5 rounded-2xl border transition-all cursor-pointer ${
                    activeDossier.id === cs.id 
                      ? "bg-white border-[#C9A84C] shadow-md shadow-[#C9A84C]/10" 
                      : "bg-white border-gray-200/60 hover:border-gray-400"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">{cs.industry}</span>
                    <span className="text-xs font-bold text-emerald-600">{cs.after_ctc}</span>
                  </div>
                  <span className="font-extrabold text-sm sm:text-base text-black">{cs.name}</span>
                </button>
              ))}
            </div>

            {/* Content Card */}
            <div className="lg:col-span-8 bento-card border-gray-200 bg-white shadow-xs">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-left">
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <span className="text-[10px] font-bold font-mono text-gray-400 block mb-1">MONETARY MULTIPLIER</span>
                    <div className="text-2xl md:text-3xl font-black text-emerald-600 tracking-tight">
                      {activeDossier.before_ctc} <span className="text-gray-300 text-lg font-normal mx-1">→</span> {activeDossier.after_ctc}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-[9px] font-bold font-mono text-gray-400 block mb-1">TIMELINE</span>
                      <span className="text-xs font-black text-black">{activeDossier.timeline}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#C9A84C]/5 border border-[#C9A84C]/20">
                      <span className="text-[9px] font-bold font-mono text-[#B29440] block mb-1">LINKEDIN SSI</span>
                      <span className="text-xs font-black text-black">{activeDossier.id === 'cs1' ? '88 Score' : '84 Score'}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
                    {activeDossier.story}
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                    <span className="text-[9px] font-bold font-mono text-red-700 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5" /> Diluted Operations Narrative (Before)
                    </span>
                    <p className="text-[11px] font-mono text-red-900/80 leading-relaxed">
                      "{activeDossier.resume_before}"
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[9px] font-bold font-mono text-emerald-700 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> High-Impact Boardroom Narrative (After)
                    </span>
                    <p className="text-[11px] font-mono text-emerald-900 leading-relaxed font-bold">
                      "{activeDossier.resume_after}"
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SWIPEABLE REVIEWS / WALL OF LOVE
          ═══════════════════════════════════════════ */}
      <section className="section-padding z-10 relative bg-white border-t border-gray-100">
        <div className="container-main space-y-8 md:space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2 text-left">
            <div>
              <h2 className="heading-lg text-black">Executive <span className="accent-text">Social Proof</span>.</h2>
              <p className="text-body font-bold text-gray-500">Draggable & swipeable Wall of Love.</p>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold bg-yellow-50 px-3 py-1.5 rounded-full text-yellow-800 border border-yellow-200">
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
              5.0 Google & LinkedIn Rating
            </div>
          </div>

          {/* Draggable Swipeable Carousel */}
          <ReviewCarousel />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          AGGRESSIVE CALL TO ACTION
          ═══════════════════════════════════════════ */}
      <section className="section-padding z-10 relative bg-[#FAFAFA] border-t border-gray-100">
        <div className="container-main">
          <div className="bento-card bg-black text-white border-black text-center p-8 md:p-20 space-y-6 md:space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent-glow),_transparent)] opacity-40" />
            
            <div className="relative z-10 space-y-4 md:space-y-6 max-w-2xl mx-auto">
              <span className="tag-accent !bg-white/10 !text-white border border-white/20"><Zap className="w-3.5 h-3.5 fill-current" /> Fast Track Your Inbound</span>
              <h2 className="heading-xl text-white">Stop being <span className="accent-text">invisible</span>.</h2>
              <p className="text-body-lg text-gray-300 text-sm md:text-base font-bold">
                Unoptimized narratives and dry LinkedIn profiles cost you premium interviews daily. Secure your strategy lock on my calendar now.
              </p>
              <div className="flex justify-center pt-2">
                <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-accent text-base py-3 px-8 shadow-[0_0_40px_rgba(201,168,76,0.25)] font-bold">
                  <Calendar className="w-5 h-5 text-white" /> Secure Discovery Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="border-t border-gray-200 bg-white py-8 md:py-10 relative z-10 text-left">
        <div className="container-main flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <span className="font-extrabold text-white text-xs">PM</span>
            </div>
            <span className="text-xs md:text-sm font-black text-black">Pooja Malpani Advisory</span>
          </div>
          
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-gray-700 font-bold">
            <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] flex items-center gap-1.5 transition-colors">
              <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center gap-1.5 transition-colors">
              <Phone className="w-4 h-4 text-emerald-600" /> +91 99236 49723
            </a>
          </div>
          
          <div className="text-[10px] sm:text-xs text-gray-400 font-mono">
            © 2026 PM Advisory. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
