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
  Users
} from "lucide-react";

import {
  PLACEMENT_DOSSIERS,
  EXECUTIVE_LEADS
} from "@/lib/mockDb";

const LINKEDIN = "https://www.linkedin.com/in/pooja-chandak-0b409a52/";
const WA = "919923649723";
const wa = (msg?: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hi Pooja! Let's discuss my career strategy.")}`;
const CALENDLY_LINK = "https://calendly.com/your-calendly-link"; 

// Top Company Logos (Using simple text/SVGs for marquee)
const COMPANIES = ["Google", "Microsoft", "Salesforce", "Zepto", "PhonePe", "Amazon", "Meta", "Goldman Sachs", "McKinsey", "Bain"];

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
      <div className="blur-blob w-[300px] h-[300px] bg-[#C9A84C]/20 top-[-50px] right-[-50px] anim-pulse hidden md:block" />
      <div className="blur-blob w-[300px] h-[300px] bg-[#34D399]/15 bottom-[20%] left-[-50px] anim-float delay-2 hidden md:block" />

      {/* ═══════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-3" : "py-4 md:py-6 bg-transparent"}`}>
        <div className="container-main flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group relative z-10">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="font-bold text-white text-xs md:text-sm">PM</span>
            </div>
            <span className="font-bold tracking-tight text-sm md:text-base hidden sm:block">Pooja Malpani</span>
          </a>

          <div className="flex items-center gap-2 md:gap-3">
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="btn-secondary hidden sm:flex text-xs md:text-sm py-2 px-3 md:px-4">
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </a>
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs md:text-sm py-2 px-4 shadow-md shadow-black/10">
              <Calendar className="w-4 h-4" /> Book Call
            </a>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 section-padding z-10">
        <div className="container-main text-center max-w-4xl mx-auto space-y-6 md:space-y-8">
          
          <div className="flex justify-center anim-fade-up">
            <span className="tag-accent border border-[#C9A84C]/30 shadow-sm bg-white text-[#B29440]"><Star className="w-3.5 h-3.5 fill-current" /> Top 1% Executive Strategist</span>
          </div>
          
          <h1 className="heading-xl anim-fade-up delay-1 text-3d text-black">
            Command the C-Suite <br />
            <span className="accent-text">Shortlists You Deserve.</span>
          </h1>
          
          <p className="text-body-lg max-w-2xl mx-auto anim-fade-up delay-2">
            Stop applying blindly. Land elite interviews with audit-backed resumes & high-traction LinkedIn profiles. 🚀
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 md:pt-4 anim-fade-up delay-3">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary text-base md:text-lg py-3 md:py-4 px-6 md:px-8 shadow-lg shadow-black/20">
              <Target className="w-5 h-5" /> Strategize Now
            </a>
            <a href="#dossiers" className="btn-secondary text-base md:text-lg py-3 md:py-4 px-6 md:px-8 bg-white hover:bg-gray-50 border-gray-200">
              See the Results <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Aggressive Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-10 md:pt-16 anim-fade-up delay-4">
            {[
              { value: "4X", label: "Interviews", icon: <TrendingUp className="w-4 h-4 text-gray-400" /> },
              { value: "500+", label: "Placements", icon: <Users className="w-4 h-4 text-gray-400" /> },
              { value: "13%", label: "Uplift", icon: <BarChart2 className="w-4 h-4 text-gray-400" /> },
              { value: "5.0", label: "Rating", icon: <Award className="w-4 h-4 text-[#C9A84C]" /> }
            ].map((stat, i) => (
              <div key={i} className="bento-card !p-4 md:!p-6 flex flex-col items-center justify-center space-y-1 md:space-y-2 border-gray-100 shadow-sm bg-white">
                <div className="text-metric accent-text">{stat.value}</div>
                <div className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wide">
                  {stat.icon} {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LINKEDIN GROWTH & COMPANY MARQUEE
          ═══════════════════════════════════════════ */}
      <section className="py-6 md:py-10 border-y border-gray-100 bg-[#FAFAFA] overflow-hidden">
        <div className="container-main mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* LinkedIn Growth Component */}
          <div className="bento-card border-gray-200 shadow-sm bg-white flex items-center gap-4 p-4 md:p-6 w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Linkedin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm md:text-base">Profile Traction</h4>
                <span className="tag-success !text-[10px] !py-0.5">Highly Active</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">+314% Views</span>
                <span className="text-xs text-gray-400">in last 30 days</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Placements Made Possible By Me</p>
          </div>
        </div>

        {/* Marquee */}
        <div className="marquee-container mask-edges">
          <div className="marquee-content gap-8 md:gap-16 items-center px-4">
            {[...COMPANIES, ...COMPANIES].map((company, idx) => (
              <span key={idx} className="text-xl md:text-2xl font-bold text-gray-300 uppercase tracking-tighter">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BENTO GRID SERVICES (Cut text, high impact)
          ═══════════════════════════════════════════ */}
      <section className="section-padding z-10 relative bg-white">
        <div className="container-main space-y-8 md:space-y-12">
          
          <div className="space-y-2 md:space-y-4 max-w-2xl">
            <h2 className="heading-lg text-black">Premium <span className="accent-text">Advisory</span>.</h2>
            <p className="text-body">Stop applying blindly. Leverage audit-backed systems for instant ROI. 📈</p>
          </div>

          <div className="bento-grid">
            
            {/* Service 1 */}
            <div className="bento-card bento-card-interactive col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-3 md:space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center text-black border border-gray-100">
                  <Target className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="heading-md">ATS Resume Audit</h3>
                <p className="text-body text-xs md:text-sm">Bypass parsing bots. We rewrite operations into high-impact CAR achievements.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="tag-success">High Conversion</span>
                </div>
              </div>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full mt-6 md:mt-8 justify-between group">
                Book Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Service 2 */}
            <div className="bento-card bento-card-interactive col-span-12 md:col-span-6 lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-3 md:space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="heading-md">LinkedIn Algorithmic Growth</h3>
                <p className="text-body text-xs md:text-sm">Attract C-Suite parameters. Maximize indexation to draw inbound recruiters.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="tag-accent border-[#C9A84C]/20 bg-white">Instant Inbound</span>
                </div>
              </div>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full mt-6 md:mt-8 justify-between group">
                Optimize Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Service 3 */}
            <div className="bento-card bento-card-interactive col-span-12 lg:col-span-4 flex flex-col justify-between bg-black text-white border-black shadow-xl">
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#C9A84C] flex items-center justify-center text-black">
                    <Zap className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                  </div>
                  <span className="tag-accent !bg-white/10 !text-white !border-white/20">Signature 🔥</span>
                </div>
                <h3 className="heading-md text-white">C-Suite Transformation</h3>
                <p className="text-xs md:text-sm text-gray-300">Full lifecycle: Resume, LinkedIn, Interview Prep, and direct placement routing.</p>
                <ul className="text-[10px] md:text-xs text-gray-300 space-y-1.5 pt-2 font-mono">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[#34D399]" /> 1-on-1 Mock Interviews</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[#34D399]" /> Custom Network Routing</li>
                </ul>
              </div>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-accent w-full mt-6 md:mt-8 justify-between group shadow-none">
                Apply for Program <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DOSSIERS / RESULTS
          ═══════════════════════════════════════════ */}
      <section id="dossiers" className="section-padding relative z-10 bg-[#FAFAFA] border-t border-gray-100">
        <div className="container-main space-y-8 md:space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 md:space-y-4">
            <h2 className="heading-lg text-black">Verified <span className="accent-text">Uplifts</span>.</h2>
            <p className="text-body text-sm md:text-base">Real outcomes. Numbers talk. 💸</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            
            {/* Nav */}
            <div className="lg:col-span-4 flex flex-col gap-2 md:gap-3">
              {PLACEMENT_DOSSIERS.map((cs) => (
                <button
                  key={cs.id}
                  onClick={() => setActiveDossier(cs)}
                  className={`text-left p-4 md:p-5 rounded-2xl border transition-all ${
                    activeDossier.id === cs.id 
                      ? "bg-white border-[#C9A84C] shadow-md shadow-[#C9A84C]/10" 
                      : "bg-white border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-wider">{cs.industry}</span>
                    <span className="text-[10px] md:text-xs font-bold font-mono text-green-600">{cs.after_ctc}</span>
                  </div>
                  <span className="font-bold text-sm md:text-base text-black">{cs.name}</span>
                </button>
              ))}
            </div>

            {/* Content Card */}
            <div className="lg:col-span-8 bento-card border-gray-200 bg-white shadow-sm">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <span className="text-[10px] md:text-xs font-bold font-mono text-gray-400 block mb-1">SALARY UPLIFT</span>
                    <div className="text-2xl md:text-3xl font-bold text-green-600 tracking-tight">
                      {activeDossier.before_ctc} <span className="text-gray-300 text-lg md:text-xl font-normal mx-1">→</span> {activeDossier.after_ctc}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="p-3 md:p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-[9px] md:text-[10px] font-bold font-mono text-gray-400 block mb-1">TIMELINE</span>
                      <span className="text-xs md:text-sm font-bold text-black">{activeDossier.timeline}</span>
                    </div>
                    <div className="p-3 md:p-4 rounded-xl bg-[#C9A84C]/5 border border-[#C9A84C]/20">
                      <span className="text-[9px] md:text-[10px] font-bold font-mono text-[#B29440] block mb-1">LINKEDIN SSI</span>
                      <span className="text-xs md:text-sm font-bold text-black">84+ Score</span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {activeDossier.story}
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="p-4 md:p-5 rounded-xl bg-red-50 border border-red-100">
                    <span className="text-[9px] md:text-[10px] font-bold font-mono text-red-600 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                      <X className="w-3 h-3" /> Tactical (Before)
                    </span>
                    <p className="text-[10px] md:text-xs font-mono text-red-800/70 leading-relaxed">
                      "{activeDossier.resume_before}"
                    </p>
                  </div>
                  
                  <div className="p-4 md:p-5 rounded-xl bg-green-50 border border-green-200">
                    <span className="text-[9px] md:text-[10px] font-bold font-mono text-green-700 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3" /> Strategic (After)
                    </span>
                    <p className="text-[10px] md:text-xs font-mono text-green-800 leading-relaxed">
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
          REVIEWS
          ═══════════════════════════════════════════ */}
      <section className="section-padding z-10 relative bg-white border-t border-gray-100">
        <div className="container-main space-y-8 md:space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4 md:mb-8">
            <h2 className="heading-lg text-black">Wall of <span className="accent-text">Love</span>.</h2>
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold bg-yellow-50 px-3 py-1.5 rounded-full text-yellow-800 border border-yellow-200">
              <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-500 text-yellow-500" />
              5.0 Google Rating
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {EXECUTIVE_LEADS.map((rev) => (
              <div key={rev.id} className="bento-card !p-5 md:!p-6 flex flex-col justify-between gap-4 md:gap-6 border-gray-100 shadow-sm bg-white">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 md:w-3.5 md:h-3.5 fill-yellow-500 text-yellow-500" />)}
                    </div>
                    <span className="tag-success !bg-green-100 !text-green-800 border-none">{rev.result}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">"{rev.text}"</p>
                </div>
                
                <div className="flex items-center gap-3 pt-3 md:pt-4 border-t border-gray-50">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-bold text-black">{rev.name}</h4>
                    <p className="text-[9px] md:text-[10px] font-mono text-gray-500 uppercase">{rev.role} · {rev.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <section className="section-padding z-10 relative bg-[#FAFAFA] border-t border-gray-100">
        <div className="container-main">
          <div className="bento-card bg-black text-white border-black text-center p-8 md:p-20 space-y-6 md:space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent-glow),_transparent)] opacity-40" />
            
            <div className="relative z-10 space-y-4 md:space-y-6 max-w-2xl mx-auto">
              <span className="tag-accent !bg-white/10 !text-white border border-white/20"><Zap className="w-3.5 h-3.5 fill-current" /> Fast Track Your Career</span>
              <h2 className="heading-xl text-white">Stop being <span className="accent-text">invisible</span>.</h2>
              <p className="text-body-lg text-gray-300 text-sm md:text-base">
                Unoptimized documentation costs you opportunities daily. Grab a slot on my calendar.
              </p>
              <div className="flex justify-center pt-2 md:pt-4">
                <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-accent text-base md:text-lg py-3 md:py-4 px-6 md:px-10 shadow-[0_0_40px_rgba(201,168,76,0.2)]">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" /> Book Discovery Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="border-t border-gray-200 bg-white py-8 md:py-10 relative z-10">
        <div className="container-main flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black flex items-center justify-center">
              <span className="font-bold text-white text-[10px] md:text-xs">PM</span>
            </div>
            <span className="text-xs md:text-sm font-bold text-black">Pooja Malpani Advisory</span>
          </div>
          
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-gray-500 font-semibold">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-black flex items-center gap-1.5 md:gap-2 transition-colors">
              <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" /> LinkedIn
            </a>
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="hover:text-black flex items-center gap-1.5 md:gap-2 transition-colors">
              <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" /> +91 99236 49723
            </a>
          </div>
          
          <div className="text-[10px] md:text-xs text-gray-400 font-mono">
            © 2026 PM Advisory. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
