import React, { useState } from "react";
import PhoneMockup from "./components/PhoneMockup";
import HomeTab from "./components/HomeTab";
import LearnTab from "./components/LearnTab";
import PracticeTab from "./components/PracticeTab";
import AiTutorTab from "./components/AiTutorTab";
import ProfileTab from "./components/ProfileTab";

import { COURSES, CODING_CHALLENGES, LEADERBOARD, COMMUNITY_POSTS } from "./data/courses";
import { UserStats, Course, Lesson, CodingChallenge, CommunityPost, LeaderboardLeader } from "./types";
import { Home, BookOpen, Terminal, Sparkles, User, HelpCircle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "learn" | "practice" | "ai" | "profile">("home");
  
  // HUD state indicators
  const [stats, setStats] = useState<UserStats>({
    level: 3,
    xp: 450,
    nextLevelXp: 1200,
    streak: 8,
    lastActive: "Today",
    totalHours: 14.5,
    codesCompiled: 42,
    certificatesUnlocked: []
  });

  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  
  const [challenges] = useState<CodingChallenge[]>(CODING_CHALLENGES);
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge | null>(null);
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardLeader[]>(LEADERBOARD);
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  
  const [quickAiPrompt, setQuickAiPrompt] = useState<string>("");

  // Handler functions for stats
  const handleAddXp = (amount: number) => {
    setStats(prev => {
      const incrementedXp = prev.xp + amount;
      if (incrementedXp >= prev.nextLevelXp) {
        // level up!
        const leftoverXp = incrementedXp - prev.nextLevelXp;
        return {
          ...prev,
          level: prev.level + 1,
          xp: leftoverXp,
          nextLevelXp: prev.nextLevelXp + 450,
          streak: prev.streak + 1
        };
      }
      return {
        ...prev,
        xp: incrementedXp
      };
    });
  };

  const handleCompleteLesson = (courseId: string, lessonId: string, xpEarned: number) => {
    // Collect stats increments
    handleAddXp(xpEarned);
    
    // Register completion logs inside storage stats lists
    setStats(prev => ({
      ...prev,
      certificatesUnlocked: [...prev.certificatesUnlocked, lessonId]
    }));

    // Alert completion
    alert(`⚡ Transmissions Completed! You earned +${xpEarned} XP towards engineering level ${stats.level + 1}`);
    
    // Reset selection indicators to go back to course list catalog
    setActiveCourseId(null);
    setActiveLessonId(null);
  };

  const handleCodeCompiled = (xpEarned: number) => {
    handleAddXp(xpEarned);
    setStats(prev => ({
      ...prev,
      codesCompiled: prev.codesCompiled + 1,
      totalHours: Math.round((prev.totalHours + 0.1) * 10) / 10
    }));
  };

  // Quick navigation helpers
  const handleResumeCourse = (courseId: string, lessonId: string) => {
    setActiveCourseId(courseId);
    setActiveLessonId(lessonId);
    setActiveTab("learn");
  };

  const handleQuickAiPrompt = (prompt: string) => {
    setQuickAiPrompt(prompt);
    setActiveTab("ai");
  };

  const handleSelectChallenge = (challenge: CodingChallenge) => {
    setSelectedChallenge(challenge);
    setActiveTab("practice");
  };

  // Community action helpers
  const handleAddPost = (content: string, category: string) => {
    const newPost: CommunityPost = {
      id: `p-${posts.length + 1}`,
      user: "NEO_OPERATOR",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      role: "Class ML Operator",
      content,
      timestamp: "Just Now",
      likes: 1,
      replies: 0,
      category,
      hasLiked: true
    };
    setPosts(prev => [newPost, ...prev]);
    handleAddXp(50); // Small XP gain for posting!
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = !p.hasLiked;
        return {
          ...p,
          likes: liked ? p.likes + 1 : p.likes - 1,
          hasLiked: liked
        };
      }
      return p;
    }));
  };

  return (
    <PhoneMockup>
      
      {/* 10G Brand Header inside Screen */}
      <div id="deck-logo-ribbon" className="px-5 py-4 flex items-center justify-between border-b border-slate-900 bg-slate-950/70 backdrop-blur-md select-none">
        <div className="flex items-center gap-1.5 focus:scale-95 transition-all">
          <div className="w-6 h-6 rounded bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 p-0.5 flex items-center justify-center">
            <span className="text-[10px] font-black text-slate-950 font-mono tracking-tighter">10G</span>
          </div>
          <span className="text-sm font-black tracking-[0.2em] bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
            CYBER_DECK
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono font-bold text-slate-500 truncate max-w-28 uppercase">REGION::GATEWAY</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* Main Tab Render Space */}
      <div id="rendering-deck-wrapper" className="flex-1 flex flex-col min-h-0 bg-slate-950">
        {activeTab === "home" && (
          <HomeTab
            stats={stats}
            courses={courses}
            challenges={challenges}
            onResumeCourse={handleResumeCourse}
            onNavigateToTab={setActiveTab}
            onQuickAiPrompt={handleQuickAiPrompt}
            onSelectChallenge={handleSelectChallenge}
          />
        )}

        {activeTab === "learn" && (
          <LearnTab
            courses={courses}
            activeCourseId={activeCourseId}
            activeLessonId={activeLessonId}
            onSelectLesson={(courseId, lessonId) => {
              setActiveCourseId(courseId);
              setActiveLessonId(lessonId);
            }}
            onCompleteLesson={handleCompleteLesson}
            completedLessons={stats.certificatesUnlocked}
          />
        )}

        {activeTab === "practice" && (
          <PracticeTab
            challenges={challenges}
            selectedChallenge={selectedChallenge}
            onSelectChallenge={setSelectedChallenge}
            onCodeCompiled={handleCodeCompiled}
          />
        )}

        {activeTab === "ai" && (
          <AiTutorTab
            onAddXp={handleAddXp}
            quickPrompt={quickAiPrompt}
            onClearQuickPrompt={() => setQuickAiPrompt("")}
          />
        )}

        {activeTab === "profile" && (
          <ProfileTab
            stats={stats}
            leaderboard={leaderboard}
            posts={posts}
            onAddPost={handleAddPost}
            onLikePost={handleLikePost}
          />
        )}
      </div>

      {/* Modern bottom navigation bar */}
      <nav id="bottom-tabs-nav" className="absolute bottom-0 left-0 right-0 h-16 bg-slate-950/90 backdrop-blur-lg border-t border-slate-900/80 px-4 flex items-center justify-between z-40 select-none">
        
        {/* Home */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all outline-none cursor-pointer ${
            activeTab === "home" ? "text-cyan-400 scale-105" : "text-slate-500 hover:text-slate-400"
          }`}
        >
          <Home className="w-4 h-4 mb-1" />
          <span className="text-[9px] font-black font-mono uppercase tracking-widest leading-none">HOME</span>
          {activeTab === "home" && <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1 animate-pulse" />}
        </button>

        {/* Learn */}
        <button
          onClick={() => setActiveTab("learn")}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all outline-none cursor-pointer ${
            activeTab === "learn" ? "text-cyan-400 scale-105" : "text-slate-500 hover:text-slate-400"
          }`}
        >
          <BookOpen className="w-4 h-4 mb-1" />
          <span className="text-[9px] font-black font-mono uppercase tracking-widest leading-none">LEARN</span>
          {activeTab === "learn" && <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1 animate-pulse" />}
        </button>

        {/* Practice */}
        <button
          onClick={() => setActiveTab("practice")}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all outline-none cursor-pointer ${
            activeTab === "practice" ? "text-purple-400 scale-105" : "text-slate-500 hover:text-slate-400"
          }`}
        >
          <Terminal className="w-4 h-4 mb-1" />
          <span className="text-[9px] font-black font-mono uppercase tracking-widest leading-none">PRACTICE</span>
          {activeTab === "practice" && <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1 animate-pulse" />}
        </button>

        {/* AI Tutor */}
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all outline-none cursor-pointer ${
            activeTab === "ai" ? "text-purple-400 scale-105" : "text-slate-500 hover:text-slate-400"
          }`}
        >
          <Sparkles className="w-4 h-4 mb-1" />
          <span className="text-[9px] font-black font-mono uppercase tracking-widest leading-none">AI CORE</span>
          {activeTab === "ai" && <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1 animate-pulse" />}
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all outline-none cursor-pointer ${
            activeTab === "profile" ? "text-pink-400 scale-105" : "text-slate-500 hover:text-slate-400"
          }`}
        >
          <User className="w-4 h-4 mb-1" />
          <span className="text-[9px] font-black font-mono uppercase tracking-widest leading-none">PROFILE</span>
          {activeTab === "profile" && <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-1 animate-pulse" />}
        </button>

      </nav>

    </PhoneMockup>
  );
}
