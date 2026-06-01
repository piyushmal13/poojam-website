"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { EXECUTIVE_LEADS } from "@/lib/mockDb";

export function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % EXECUTIVE_LEADS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + EXECUTIVE_LEADS.length) % EXECUTIVE_LEADS.length);
  };

  // Variants for sliding animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 180 : -180,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 180 : -180,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  const activeReview = EXECUTIVE_LEADS[index];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8 select-none">
      
      {/* Outer Drag Box Container */}
      <div 
        ref={carouselRef} 
        className="relative min-h-[340px] sm:min-h-[290px] flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(e, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                handleNext();
              } else if (info.offset.x > swipeThreshold) {
                handlePrev();
              }
            }}
            className="w-full max-w-2xl px-4 sm:px-6 cursor-grab active:cursor-grabbing"
          >
            {/* The Main High-End Review Card */}
            <div className="bento-card !p-6 sm:!p-10 border-[#C9A84C]/30 shadow-xl bg-white relative overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[220px]">
              
              {/* Gold light burst inside card */}
              <div className="absolute inset-0 bg-radial-gradient(circle_at_top_right,_var(--color-accent-glow),_transparent)] opacity-40 pointer-events-none" />

              <div className="space-y-4 md:space-y-6 z-10 text-left">
                
                {/* Score & Stars */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <span className="tag-success !bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider py-1 px-3">
                    {activeReview.result} verified
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed font-semibold tracking-tight italic">
                  "{activeReview.text}"
                </p>
              </div>

              {/* Reviewer Meta Information */}
              <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-100 mt-6 z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#111827] text-white flex items-center justify-center font-black text-sm sm:text-base border border-gray-200 shadow-sm relative overflow-hidden">
                    <span>{activeReview.name.charAt(0)}</span>
                    <div className="absolute inset-0 bg-[#C9A84C]/20" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-black flex items-center gap-1.5">
                      {activeReview.name}
                      <Check className="w-3.5 h-3.5 text-blue-600 bg-blue-50 rounded-full p-0.5 border border-blue-200" />
                    </h4>
                    <p className="text-[10px] sm:text-xs font-bold font-mono text-gray-500 uppercase tracking-wide">
                      {activeReview.role} · {activeReview.company}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-mono font-bold text-gray-400 block uppercase">Channel</span>
                  <span className="text-xs font-bold text-black capitalize">{activeReview.source} Inbound</span>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav Controls & Pagination Indicators */}
      <div className="flex items-center justify-between max-w-2xl mx-auto px-6">
        
        {/* Navigation Dot Indicators */}
        <div className="flex gap-2">
          {EXECUTIVE_LEADS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === i ? "w-8 bg-[#C9A84C]" : "w-2.5 bg-gray-200 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50 flex items-center justify-center text-black transition-all shadow-xs cursor-pointer"
            aria-label="Previous Review"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50 flex items-center justify-center text-black transition-all shadow-xs cursor-pointer"
            aria-label="Next Review"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
