"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, TrendingUp, Search, Eye, Sparkles, MessageSquare, Briefcase, Plus, Menu } from "lucide-react";

export function IphoneMockup() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize coordinates between -0.5 and 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const tiltStyle = isHovered
    ? {
        transform: `perspective(1000px) rotateY(${coords.x * 24}deg) rotateX(${coords.y * -24}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: "transform 0.1s ease-out",
      }
    : {
        transform: `perspective(1000px) rotateY(-8deg) rotateX(12deg) rotateZ(1.5deg)`,
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      };

  return (
    <div className="relative w-full max-w-[340px] mx-auto py-10 md:py-16 perspective-1000">
      
      {/* Background Decorative Glow (Matches luxury gold theme) */}
      <div className="absolute inset-0 bg-[#C9A84C]/10 rounded-full blur-[80px] -z-10" />

      {/* Floating Success Card 1 (Top Left) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: [0, -10, 0], opacity: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-12 top-16 z-30 bg-white/95 backdrop-blur-md border border-[#C9A84C]/30 rounded-2xl p-3.5 shadow-xl max-w-[170px] hidden sm:block pointer-events-none"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 anim-pulse" />
          <span className="text-[9px] font-bold font-mono tracking-widest text-[#B29440] uppercase">Positioning Verified</span>
        </div>
        <p className="text-[11px] font-extrabold text-black leading-tight">Razorpay CFO Track Shortlist secured.</p>
        <span className="text-[10px] font-mono font-bold text-green-600 block mt-1">₹32L → ₹68L CTC</span>
      </motion.div>

      {/* Floating Success Card 2 (Bottom Right) */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: [0, 10, 0], opacity: 1 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-16 bottom-20 z-30 bg-black text-white rounded-2xl p-4 shadow-2xl max-w-[180px] hidden sm:block pointer-events-none border border-white/10"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A84C] fill-current" />
          <span className="text-[9px] font-bold font-mono tracking-widest text-[#C9A84C] uppercase">Outreach Engaged</span>
        </div>
        <p className="text-[11px] font-bold text-gray-200 leading-tight">Automated recruiter follow-up converted in 48 hrs.</p>
        <span className="text-[9px] font-mono text-gray-400 block mt-1.5">Parsed via Workday @ 97%</span>
      </motion.div>

      {/* Main 3D Phone Container */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCoords({ x: 0, y: 0 });
        }}
        style={tiltStyle}
        className="relative mx-auto w-[290px] h-[580px] bg-black rounded-[48px] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-[3.5px] border-[#C9A84C] transition-all cursor-grab active:cursor-grabbing preserve-3d"
      >
        {/* Phone Case Frame Inner Rim */}
        <div className="absolute inset-0.5 rounded-[44px] border border-white/10 pointer-events-none" />

        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
        </div>

        {/* Screen Wrapper */}
        <div className="w-full h-full rounded-[38px] bg-white overflow-hidden relative flex flex-col select-none border border-gray-100 shadow-inner">
          
          {/* 1. Phone Header Status Bar */}
          <div className="h-10 pt-4 px-6 flex justify-between items-center text-[10px] font-bold text-black z-30 bg-white">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-5 h-2.5 border border-black rounded-sm p-0.5 flex items-center">
                <div className="w-3.5 h-full bg-black rounded-2xs" />
              </div>
            </div>
          </div>

          {/* 2. Simulated LinkedIn Interface Header */}
          <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between gap-3 bg-white z-30 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[10px] text-gray-600 border border-gray-200">
              VS
            </div>
            <div className="flex-1 h-7 bg-gray-100 rounded-full flex items-center px-3 gap-2 border border-gray-200/50">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] text-gray-400 font-semibold">Search LinkedIn</span>
            </div>
            <MessageSquare className="w-5 h-5 text-gray-500" />
          </div>

          {/* 3. Screen Scrollable Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50 scrollbar-none pb-4 text-left">
            
            {/* Cover and Avatar Background */}
            <div className="relative h-20 bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-100">
              <div className="absolute -bottom-8 left-4">
                <div className="w-16 h-16 rounded-full bg-white p-1 shadow-md">
                  <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center border border-gray-200 text-white font-extrabold text-lg relative overflow-hidden">
                    {/* Abstract profile placeholder */}
                    <span>VS</span>
                    <div className="absolute inset-0 bg-[#C9A84C]/25" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info Details */}
            <div className="px-4 pt-10 pb-3 bg-white border-b border-gray-200/60">
              <div className="flex items-center gap-1.5">
                <h4 className="font-extrabold text-sm text-black">V***** S**</h4>
                <div className="w-3 h-3 rounded-full bg-blue-600 flex items-center justify-center text-white p-0.5">
                  <span className="text-[6px] font-black">✔</span>
                </div>
                <span className="tag-accent !py-0.5 !px-1.5 !text-[8px] !bg-[#C9A84C]/10">C-Suite Client</span>
              </div>
              <p className="text-[10px] font-bold text-black mt-1 leading-tight">
                Senior Director of Engineering @ Top-Tier Tech
              </p>
              <p className="text-[9px] text-gray-400 mt-1 font-semibold">
                Bengaluru, Karnataka · <span className="text-blue-600 font-bold">500+ connections</span>
              </p>

              <div className="flex gap-1.5 mt-3">
                <button className="flex-1 py-1.5 rounded-full bg-blue-600 text-white font-bold text-[9px] shadow-sm flex items-center justify-center gap-1">
                  Open to work
                </button>
                <button className="flex-1 py-1.5 rounded-full border border-gray-200 text-gray-700 font-bold text-[9px] flex items-center justify-center">
                  More
                </button>
              </div>
            </div>

            {/* 4. The Showcase: High-Growth Professional Dashboard */}
            <div className="mx-3 mt-3 p-3.5 bg-white rounded-2xl border border-[#C9A84C]/30 shadow-xs">
              <div className="flex justify-between items-start mb-2.5">
                <div>
                  <span className="text-[8px] font-bold font-mono tracking-widest text-[#B29440] uppercase">Professional Dashboard</span>
                  <h5 className="font-black text-[11px] text-black mt-0.5">C-Suite Algorithm Active</h5>
                </div>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>

              {/* Views Metric Block */}
              <div className="flex items-baseline gap-2 mb-2 bg-[#FAFAFA] p-2.5 rounded-xl border border-gray-100">
                <div className="text-lg font-black text-black">124,532</div>
                <div className="text-[9px] font-bold text-green-600 flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> +314%
                </div>
                <div className="text-[8px] text-gray-400 font-bold ml-auto">Profile Views</div>
              </div>

              {/* Search Appearances Block with custom SVG Line Graph */}
              <div className="p-2.5 rounded-xl border border-gray-100 bg-[#FAFAFA] space-y-1.5">
                <div className="flex justify-between items-center text-[9px]">
                  <span className="font-bold text-gray-500">Recruiter Inbound Queries</span>
                  <span className="font-black text-green-600 font-mono">+480% Growth</span>
                </div>
                
                {/* SVG Mini Graph */}
                <div className="h-10 w-full pt-1">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="glow" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0"/>
                        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.3"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,25 Q15,22 30,23 T60,12 T90,2 T100,0"
                      fill="none"
                      stroke="#C9A84C"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,25 Q15,22 30,23 T60,12 T90,2 T100,0 L100,30 L0,30 Z"
                      fill="url(#glow)"
                    />
                    <circle cx="90" cy="2" r="2" fill="#B29440" />
                  </svg>
                </div>
              </div>

              {/* Dashboard Sub-Stats Grid */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex flex-col">
                  <span className="text-[7px] font-bold text-gray-400 uppercase">Search Appearances</span>
                  <span className="text-[10px] font-black text-black mt-0.5">9,240</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex flex-col">
                  <span className="text-[7px] font-bold text-gray-400 uppercase">Executive Indexation</span>
                  <span className="text-[10px] font-black text-green-600 mt-0.5">Top 1% Rank</span>
                </div>
              </div>
            </div>

            {/* Simulated Post Activity Block */}
            <div className="mx-3 mt-3 p-3 bg-white rounded-2xl border border-gray-200/60 shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-[8px] font-bold text-white">
                  VS
                </div>
                <div>
                  <h6 className="text-[9px] font-extrabold text-black">V***** S** posted this · 2d</h6>
                  <p className="text-[7px] text-gray-400 font-bold uppercase">1.2M impressions online</p>
                </div>
              </div>
              <p className="text-[9px] text-gray-700 leading-tight font-medium">
                "We just optimized our core architecture. Slashed cloud computing metrics by 40%..."
              </p>
              <div className="mt-2.5 pt-2 border-t border-gray-100 flex justify-between text-[8px] font-bold text-gray-500">
                <span>👍 Like</span>
                <span>💬 Comment</span>
                <span>🔄 Repost</span>
                <span>📤 Send</span>
              </div>
            </div>

          </div>

          {/* 5. LinkedIn Navigation Dock */}
          <div className="h-12 border-t border-gray-100 flex justify-between items-center px-4 bg-white z-30">
            {[Briefcase, Eye, Plus, TrendingUp, Menu].map((Icon, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                  idx === 0 ? "text-[#C9A84C]" : "text-gray-400"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span className="text-[7px] font-bold">
                  {idx === 0 ? "Home" : idx === 1 ? "My Network" : idx === 2 ? "Post" : idx === 3 ? "Jobs" : "Notifications"}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
