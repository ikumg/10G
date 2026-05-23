import React from "react";
import { Zap, Target, BookOpen, MessageSquareCode, Award, Code, CheckCircle2, ChevronRight, CornerDownRight } from "lucide-react";
import { Course, CodingChallenge, UserStats } from "../types";

interface HomeTabProps {
  stats: UserStats;
  courses: Course[];
  challenges: CodingChallenge[];
  onResumeCourse: (courseId: string, lessonId: string) => void;
  onNavigateToTab: (tab: "home" | "learn" | "practice" | "ai" | "profile") => void;
  onQuickAiPrompt: (prompt: string) => void;
  onSelectChallenge: (challenge: CodingChallenge) => void;
}

export default function HomeTab({
  stats,
  courses,
  challenges,
  onResumeCourse,
  onNavigateToTab,
  onQuickAiPrompt,
  onSelectChallenge
}: HomeTabProps) {
  
  // Custom quick prompting prompts
  const quickAiPrompts = [
    { label: "Explain Promises", query: "explain promises", desc: "JS Asynchronous logic" },
    { label: "Python Decorators", query: "python decorators", desc: "Meta-programming basics" },
    { label: "Cybersecurity Basics", query: "cybersecurity basics", desc: "Port defensive networks" },
  ];

  const currentCourse = courses[0]; // Continue learning Python Core
  const nextLesson = currentCourse?.lessons.find(l => !l.completed) || currentCourse?.lessons[0];
  const urgentChallenge = challenges[0]; // Let's highlight python-square node

  return (
    <div id="home-dashboard-panel" className="flex-1 overflow-y-auto px-5 pb-24 space-y-6 pt-2">
      {/* 1. Header: Status Node & Daily Streak XP HUD */}
      <div className="flex items-center justify-between p-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-500 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-sm font-black font-mono bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Lvl{stats.level}
              </span>
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">OPERATOR PROFILE</div>
            <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              NEO_OPERATOR <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Streak HUD Widget */}
        <button 
          onClick={() => onNavigateToTab("profile")} 
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl hover:bg-amber-500/25 transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 text-amber-400 fill-amber-500 animate-bounce" />
          <span className="font-mono text-sm font-black">{stats.streak} DAY STREAK</span>
        </button>
      </div>

      {/* 2. Micro XP HUD Bar */}
      <div className="space-y-1.5 p-3.5 bg-slate-900/40 rounded-xl border border-slate-800/40">
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
          <span>COGNITIVE MATRIX XP</span>
          <span className="text-cyan-400">{stats.xp} / {stats.nextLevelXp} XP</span>
        </div>
        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.6)] transition-all duration-700" 
            style={{ width: `${(stats.xp / stats.nextLevelXp) * 100}%` }}
          />
        </div>
      </div>

      {/* 3. Continue Learning Panel */}
      {currentCourse && nextLesson && (
        <div className="relative group overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-950 p-5 shadow-[0_8px_20px_-10px_rgba(6,182,212,0.3)]">
          {/* Decorative neon background particle */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
          
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] uppercase font-mono bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">
              ACTIVE LESSON UNLOCKED
            </span>
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
              <BookOpen className="w-3 h-3 text-cyan-400" />
              <span>{currentCourse.title}</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-white mb-2 leading-tight">
            {nextLesson.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-[85%] mb-4">
            Master the core variables in this module. Gain +{nextLesson.xp} XP to unlock Level {stats.level + 1} indicators.
          </p>

          <button 
            onClick={() => onResumeCourse(currentCourse.id, nextLesson.id)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition-all shadow-[0_4px_15px_rgba(6,182,212,0.4)] cursor-pointer"
          >
            <span className="tracking-wide">BOOT CYBER-LESSON NOW</span>
            <ChevronRight className="w-4 h-4 text-slate-950 stroke-[3px]" />
          </button>
        </div>
      )}

      {/* 4. AI Core Quick Tuning Chips */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-slate-400">
          <MessageSquareCode className="w-4 h-4 text-purple-400" />
          <span>AI TUTOR INSTANT BOOT CORES</span>
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {quickAiPrompts.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => onQuickAiPrompt(chip.query)}
              className="flex items-center justify-between p-3 bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-800/80 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                  {chip.label}
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {chip.desc}
                </span>
              </div>
              <CornerDownRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* 5. Daily Challenge Widget */}
      {urgentChallenge && (
        <div className="p-5 rounded-2xl border border-purple-500/20 bg-slate-900/60 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-purple-500/5 rounded-full blur-xl" />
          <div className="flex justify-between items-center mb-3">
            <span className="flex items-center gap-1 text-[10px] font-mono text-purple-400">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              DAILY HACKATHON
            </span>
            <span className="text-[10px] text-slate-500 font-mono">XP MULTIPLIER x2</span>
          </div>

          <h3 className="text-sm font-bold text-white mb-2">
            {urgentChallenge.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {urgentChallenge.instructions}
          </p>

          <button
            onClick={() => onSelectChallenge(urgentChallenge)}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-purple-500/40 hover:bg-purple-500/10 text-purple-300 text-xs font-bold transition-all cursor-pointer"
          >
            <Code className="w-4 h-4" />
            <span>SOLVE IN HIGH-CONTRAST EDITOR</span>
          </button>
        </div>
      )}

      {/* 6. Dynamic Cybernetic Statistics & Weekly Progress Vectors */}
      <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-slate-400">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>QUANTUM COGNITIVE PROGRESS</span>
          </div>
          <span className="text-[10px] text-green-400 font-mono">ACTIVE DECK DEPLOYED</span>
        </div>

        {/* Custom vector chart representing fintech analytics styling */}
        <div className="relative h-28 bg-slate-950/60 rounded-lg p-2 flex flex-col justify-between border border-slate-800/40">
          <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none opacity-20 text-[8px] font-mono text-slate-600">
            <div>1000 XP</div>
            <div>500 XP</div>
            <div>0 XP</div>
          </div>
          
          {/* Animated SVG line chart with gradients */}
          <div className="flex-1 w-full relative mt-3">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="#1e293b" strokeDasharray="3,3" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="#1e293b" strokeDasharray="3,3" strokeWidth="0.5" />
              {/* Path area */}
              <path 
                d="M 0 75 Q 50 60 100 45 T 150 15 T 200 40 T 250 8 T 300 20 L 300 80 L 0 80 Z" 
                fill="url(#chartGradient)" 
              />
              {/* Main line */}
              <path 
                d="M 0 75 Q 50 60 100 45 T 150 15 T 200 40 T 250 8 T 300 20" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                className="animate-pulse"
              />
              {/* Scatter Node points */}
              <circle cx="100" cy="45" r="3.5" fill="#06b6d4" stroke="#020617" strokeWidth="1" />
              <circle cx="150" cy="15" r="3.5" fill="#a855f7" stroke="#020617" strokeWidth="1" />
              <circle cx="250" cy="8" r="4" fill="#22c55e" stroke="#020617" strokeWidth="1" />
            </svg>
          </div>

          <div className="flex justify-between text-[9px] font-mono text-slate-500 px-1 pt-1 border-t border-slate-900">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span className="text-cyan-400 font-bold">THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span className="text-purple-400 font-bold">SUN</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/50">
            <div className="text-[10px] text-slate-500 font-mono">HOURS CODED</div>
            <div className="text-base font-black font-mono mt-0.5 text-white">{stats.totalHours} hrs</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/50">
            <div className="text-[10px] text-slate-500 font-mono">SCRIPTS COMPILED</div>
            <div className="text-base font-black font-mono mt-0.5 text-cyan-400">{stats.codesCompiled} nodes</div>
          </div>
        </div>
      </div>

      {/* 7. Trending Course Modules */}
      <div className="space-y-3.5">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="font-bold tracking-wider text-slate-400">TRENDING TECH TRAINING</span>
          <button onClick={() => onNavigateToTab("learn")} className="text-purple-400 hover:underline">VIEW CORE DECK</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {courses.slice(1).map((course) => (
            <div 
              key={course.id}
              onClick={() => onNavigateToTab("learn")}
              className="min-w-[240px] w-[240px] snap-center p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all cursor-pointer space-y-3"
            >
              <div className={`h-24 rounded-lg bg-gradient-to-tr ${course.thumbnail} p-3 flex flex-col justify-between relative overflow-hidden shadow-inner`}>
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1.5px]" />
                <span className="text-[8px] tracking-widest font-mono uppercase bg-slate-950/70 text-cyan-400 px-2 py-0.5 rounded-md border border-cyan-500/20 w-max z-10 self-end">
                  {course.difficulty}
                </span>
                <span className="text-xs font-black tracking-tight text-white drop-shadow-md z-10">
                  {course.title}
                </span>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {course.subtitle}
                </p>
                <div className="flex justify-between items-center mt-2.5 text-[9px] font-mono text-slate-500">
                  <span>{course.lessons.length} STAGES</span>
                  <span className="text-cyan-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                    + {course.lessons.reduce((acc, l) => acc + l.xp, 0)} XP
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
