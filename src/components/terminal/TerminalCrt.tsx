"use client";

import React, { useState, useEffect } from "react";
import { TerminalAudio } from "./TerminalAudio";
import { Volume2, VolumeX, Eye, EyeOff, Radio, MonitorDot } from "lucide-react";

interface TerminalCrtProps {
  children: React.ReactNode;
}

export const TerminalCrt: React.FC<TerminalCrtProps> = ({ children }) => {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [cpuUsage, setCpuUsage] = useState("0.02%");
  const [time, setTime] = useState("");

  // Sync mute state with our audio synthesizer singleton
  useEffect(() => {
    TerminalAudio.setMute(isMuted);
  }, [isMuted]);

  // Update hardware telemetry metrics every few seconds
  useEffect(() => {
    const cpuInterval = setInterval(() => {
      const usage = (0.01 + Math.random() * 0.08).toFixed(2);
      setCpuUsage(`${usage}%`);
    }, 4000);

    const timeInterval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour12: false }));
    }, 1000);

    // Initial values
    setTime(new Date().toLocaleTimeString([], { hour12: false }));

    return () => {
      clearInterval(cpuInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
    // Play a click sound after updating mute state if unmuted
    setTimeout(() => {
      if (isMuted) {
        TerminalAudio.playKeyClick();
      }
    }, 50);
  };

  const handleToggleEffects = () => {
    setEffectsEnabled((prev) => !prev);
    TerminalAudio.playKeyClick();
  };

  return (
    <div className="relative w-full rounded-2xl border border-zinc-800 bg-[#070709] p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)] sm:p-5">
      {/* Visual bezel border simulating the screen housing */}
      <div className="absolute inset-x-0 -top-3 flex justify-center">
        <div className="flex items-center gap-6 rounded-full border border-zinc-800 bg-[#0d0d12] px-6 py-1 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600"></span>
            </span>
            MAINFRAME CO-LOCATION: NY4
          </span>
          <span className="hidden sm:inline">●</span>
          <span className="hidden sm:inline">BAUD: 9600</span>
        </div>
      </div>

      {/* Screen container */}
      <div
        className={`relative overflow-hidden rounded-xl bg-[#090a0e] transition-all duration-300 ${
          effectsEnabled ? "crt-screen" : ""
        } border border-zinc-900 shadow-inner`}
      >
        {/* Animated Scanline & Laser Scan Overlays */}
        {effectsEnabled && (
          <>
            <div className="crt-scanlines pointer-events-none" />
            <div className="crt-laser-beam pointer-events-none" />
          </>
        )}

        {/* Hardware Status Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-zinc-900 bg-[#040406] px-4 py-2 text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <MonitorDot className="h-3.5 w-3.5 text-zinc-600" />
            <span className="font-semibold text-zinc-400">PM-OS v2.0.0</span>
            <span className="hidden text-zinc-700 sm:inline">|</span>
            <span className="hidden sm:inline">SYS: SECURE</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-zinc-600">CPU:</span>
              <span className="w-12 text-right font-semibold text-zinc-400">{cpuUsage}</span>
            </div>
            <div className="hidden items-center gap-1 sm:flex">
              <span className="text-[10px] text-zinc-600">MEM:</span>
              <span className="font-semibold text-zinc-400">64.0 MB</span>
            </div>
            <span className="text-zinc-700">|</span>
            <span className="font-semibold text-zinc-400">{time}</span>
          </div>
        </div>

        {/* Screen Content Wrapper */}
        <div
          className={`min-h-[480px] p-4 sm:p-6 font-mono text-sm leading-relaxed ${
            effectsEnabled ? "crt-flicker" : ""
          }`}
        >
          {children}
        </div>
      </div>

      {/* Monitor Base Control Panel Buttons */}
      <div className="mt-4 flex items-center justify-between border-t border-zinc-900/60 pt-3">
        <div className="flex gap-2">
          {/* Mute button */}
          <button
            onClick={handleToggleMute}
            className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-mono transition-all duration-200 ${
              isMuted
                ? "border-amber-500/20 bg-amber-500/5 text-amber-500"
                : "border-zinc-800 bg-[#0d0d12] text-zinc-400 hover:border-zinc-700 hover:text-white"
            }`}
            title={isMuted ? "Unmute Audio Synths" : "Mute Audio Synths"}
          >
            {isMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5" />
                <span>MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>SOUND ON</span>
              </>
            )}
          </button>

          {/* CRT Screen Effects toggle button */}
          <button
            onClick={handleToggleEffects}
            className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-mono transition-all duration-200 ${
              effectsEnabled
                ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:border-emerald-400/40"
                : "border-zinc-800 bg-[#0d0d12] text-zinc-500 hover:border-zinc-700 hover:text-white"
            }`}
            title={effectsEnabled ? "Disable Screen Overlays" : "Enable Screen Overlays"}
          >
            {effectsEnabled ? (
              <>
                <Eye className="h-3.5 w-3.5 text-emerald-400" />
                <span>CRT ON</span>
              </>
            ) : (
              <>
                <EyeOff className="h-3.5 w-3.5" />
                <span>CRT OFF</span>
              </>
            )}
          </button>
        </div>

        {/* Vintage Hardware Logo Branding */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-zinc-600">
          <Radio className="h-3.5 w-3.5 text-zinc-700" />
          <span>MALPANI TECHNOLOGIES</span>
        </div>
      </div>
    </div>
  );
};
