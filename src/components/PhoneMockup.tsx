import React, { useState, useEffect } from "react";
import { Wifi, Battery, Shield, Cpu, Activity } from "lucide-react";

interface PhoneMockupProps {
  children: React.ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // key 12 hour parameter
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10002);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="deck-smartphone-wrapper" className="relative flex items-center justify-center p-4 lg:p-8 min-h-screen bg-slate-950 font-sans text-slate-100 overflow-hidden">
      {/* Dynamic Quantum Cyberpunk Visual Background Enhancements */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* Cyber Desk Shell - Only visible on high resolution screens to provide desktop-first prestige */}
      <div className="hidden xl:flex absolute left-8 top-12 bottom-12 w-80 flex-col justify-between p-6 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl pointer-events-none">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="text-lg font-bold tracking-widest bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">10G SYSTEM</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            Connecting operators globally under ultra low latency virtual instruction nodes. Code is Compiled inside fully isolated sandbox containers.
          </p>
          <div className="space-y-4">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-mono mb-1">COMPILATION SPEED</div>
              <div className="text-xl font-mono font-bold">0.02 ms</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-purple-400 uppercase tracking-widest font-mono mb-1">IP ADDR PROTOCOL</div>
              <div className="text-xs font-mono text-slate-300">QUANTUM::GATEWAY:10G</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            <span>SECURE SANDBOX CORE_LIVE</span>
          </div>
        </div>
      </div>

      {/* Hardware Smartphone Frame Container / Outer Bezel Mockup */}
      <div 
        id="phone-frame-container" 
        className="relative w-full max-w-[430px] h-[860px] rounded-[52px] p-3.5 bg-slate-900 border-[3.5px] border-slate-800 shadow-[0_0_80px_-15px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden transition-all duration-300"
      >
        {/* Sleek Inner Screen Glow Overlay */}
        <div className="absolute inset-x-4 top-4 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-[1px] pointer-events-none" />

        {/* Smartphone Camera Notch & Virtual Sensor Header */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-44 h-7 bg-slate-950 rounded-full z-50 flex items-center justify-between px-4 border border-slate-800/40 shadow-inner">
          <div className="w-3 h-3 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center">
            <div className="w-1 h-1 bg-blue-500/80 rounded-full animate-pulse" />
          </div>
          <div className="w-2.5 h-2.5 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-red-500/60 rounded-full" />
          </div>
          <div className="w-12 h-1 bg-slate-800 rounded-full" />
        </div>

        {/* Smartphone Active Inner OS Area */}
        <div className="relative w-full h-full rounded-[38px] bg-slate-950 flex flex-col overflow-hidden border border-slate-800/70">
          
          {/* Virtual OS Status Header Bar */}
          <div className="h-10 px-6 pt-3 flex items-center justify-between z-40 bg-slate-950/80 backdrop-blur-md text-xs font-medium text-slate-400 select-none">
            {/* Time Indicator */}
            <div className="font-mono tracking-tight text-slate-300 transform -translate-y-0.5 font-bold">
              {time || "10G:AM"}
            </div>
            
            {/* Connection Status Node & Network Glyphs */}
            <div className="flex items-center gap-2 text-slate-400">
              <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800/40 text-[10px] text-cyan-400 font-mono tracking-widest">
                <Shield className="w-2.5 h-2.5" />
                <span>10G</span>
              </div>
              <Wifi className="w-3.5 h-3.5 text-slate-300" />
              <div className="flex items-center gap-0.5 text-xs text-slate-300">
                <Battery className="w-4 h-4" />
                <span className="text-[10px] font-mono leading-none">99%</span>
              </div>
            </div>
          </div>

          {/* Interactive Screen Children Port */}
          <div className="flex-1 w-full flex flex-col overflow-y-auto relative bg-slate-950">
            {children}
          </div>
        </div>
      </div>

      {/* Side Control panel - Quick hints info panel for instructions */}
      <div className="hidden xl:flex absolute right-8 top-12 bottom-12 w-80 flex-col justify-between p-6 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl pointer-events-none">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-bold tracking-widest bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">GAMIFIED LABS</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Analyze networks, build object trees, and query simulated machine intelligence. Earn XP, achieve streaks, and unlock digital developer credentials.
          </p>
          <div className="space-y-3 font-mono text-[10px]">
            <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-500">SYSTEM HEALTH</span>
              <span className="text-green-400">OPTIMAL</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-500">SECURE SHELL</span>
              <span className="text-cyan-400">PORT 22 STATUS ON</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-500">COGNITIVE COMPONENT</span>
              <span className="text-purple-400">GEMINI CORE</span>
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] text-slate-500 font-mono leading-relaxed">
          10G Quantum Simulator v3.5F<br />
          All Rights Secured
        </div>
      </div>
    </div>
  );
}
