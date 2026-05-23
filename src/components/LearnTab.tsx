import React, { useState } from "react";
import { BookOpen, Award, CheckCircle2, ChevronRight, Play, Eye, BookOpenCheck, Bookmark, Lock, HelpCircle, Trophy } from "lucide-react";
import { Course, Lesson } from "../types";

interface LearnTabProps {
  courses: Course[];
  activeCourseId: string | null;
  activeLessonId: string | null;
  onSelectLesson: (courseId: string, lessonId: string) => void;
  onCompleteLesson: (courseId: string, lessonId: string, xpEarned: number) => void;
  completedLessons: string[]; // List of completed lesson IDs
}

export default function LearnTab({
  courses,
  activeCourseId,
  activeLessonId,
  onSelectLesson,
  onCompleteLesson,
  completedLessons
}: LearnTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  
  // Quiz state for the active reading lesson
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState<boolean | null>(null);

  const categories = [
    { id: "all", label: "All Sectors" },
    { id: "programming", label: "Programming" },
    { id: "cybersecurity", label: "SecOps / Cyber" },
    { id: "artificial-intelligence", label: "AI Core Networks" }
  ];

  const filteredCourses = courses.filter(course => {
    const matchCat = selectedCategory === "all" || course.category === selectedCategory;
    const matchDiff = selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
    return matchCat && matchDiff;
  });

  // Find currently active course and lesson for display
  const activeCourse = courses.find(c => c.id === activeCourseId);
  const activeLesson = activeCourse?.lessons.find(l => l.id === activeLessonId);

  // Reset quiz states when a new lesson is loaded
  React.useEffect(() => {
    setSelectedQuizIndex(null);
    setQuizChecked(false);
    setQuizIsCorrect(null);
  }, [activeLessonId]);

  const handleCheckQuizAnswer = () => {
    if (!activeLesson?.quiz || selectedQuizIndex === null) return;
    const isCorrect = selectedQuizIndex === activeLesson.quiz.correctIndex;
    setQuizIsCorrect(isCorrect);
    setQuizChecked(true);
  };

  const handleFinishLesson = () => {
    if (activeCourseId && activeLessonId && activeLesson) {
      onCompleteLesson(activeCourseId, activeLessonId, activeLesson.xp);
    }
  };

  return (
    <div id="learn-panel-view" className="flex-1 flex flex-col overflow-hidden pb-16">
      
      {/* If an active lesson is loaded to learn, render the immersive terminal style step reader */}
      {activeCourse && activeLesson ? (
        <div className="flex-1 flex flex-col overflow-y-auto px-5 py-4 space-y-6">
          
          {/* Back button to course catalog lists */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onSelectLesson("", "")}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800"
            >
              ← RETURN TO CATALOG
            </button>
            <span className="text-[10px] font-mono text-slate-500">
              {activeCourse.title}
            </span>
          </div>

          {/* Lesson Header Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-1.5">
              <span>ESTIMATED DURATION: {activeLesson.duration}</span>
              <span className="text-cyan-400 font-bold">+{activeLesson.xp} XP AWARD</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">{activeLesson.title}</h2>
          </div>

          {/* Interactive Lesson Content (Rendered markdown layout) */}
          <div className="text-sm text-slate-300 space-y-4 leading-relaxed font-sans bg-slate-950/40 p-4 rounded-xl border border-slate-900">
            {/* Split paragraphs manually/safely */}
            {activeLesson.content.split("\n\n").map((block, idx) => {
              // Simple check for titles or code blocks
              if (block.startsWith("###")) {
                return (
                  <h3 key={idx} className="text-sm font-bold text-white tracking-wide border-l-2 border-cyan-500 pl-2 mt-4 uppercase">
                    {block.replace("###", "").trim()}
                  </h3>
                );
              }
              if (block.startsWith("```")) {
                // Code blocks formatter
                const cleanCode = block.replace(/```[a-zA-Z]*/g, "").replace(/```/g, "").trim();
                return (
                  <pre key={idx} className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 overflow-x-auto text-[11px] font-mono text-cyan-300">
                    <code>{cleanCode}</code>
                  </pre>
                );
              }
              return <p key={idx}>{block}</p>;
            })}
          </div>

          {/* Interactive Lesson Quiz Section */}
          {activeLesson.quiz && (
            <div className="p-5 rounded-2xl border border-purple-500/20 bg-slate-900/60 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span>SECTION ASSESSMENTS PROTOCOL</span>
              </div>
              
              <h4 className="text-sm font-bold text-white leading-snug">
                {activeLesson.quiz.question}
              </h4>

              <div className="space-y-2">
                {activeLesson.quiz.options.map((opt, oIdx) => {
                  const isSelected = selectedQuizIndex === oIdx;
                  const isCorrectAnswer = oIdx === activeLesson?.quiz?.correctIndex;
                  let optionStyle = "border-slate-800 hover:border-slate-700 hover:bg-slate-900/40";
                  
                  if (isSelected) {
                    optionStyle = "border-purple-500 bg-purple-500/10 text-purple-300";
                  }
                  if (quizChecked) {
                    if (isCorrectAnswer) {
                      optionStyle = "border-green-500 bg-green-500/10 text-green-300";
                    } else if (isSelected) {
                      optionStyle = "border-red-500 bg-red-500/10 text-red-300";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={quizChecked}
                      onClick={() => setSelectedQuizIndex(oIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px]">
                        {isSelected && <span className="w-2 h-2 rounded-full bg-purple-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {quizChecked ? (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className={`text-xs font-bold leading-none ${quizIsCorrect ? "text-green-400" : "text-red-400"}`}>
                    {quizIsCorrect ? "✓ QUANTUM VERIFICATION SUCCESSFUL" : "✗ EXCEPTION DETECTED"}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal pt-1">
                    {activeLesson.quiz.explanation}
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleCheckQuizAnswer}
                  disabled={selectedQuizIndex === null}
                  className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 transition-all text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  DECOMPILE & SUBMIT ANSWER
                </button>
              )}
            </div>
          )}

          {/* Complete course lesson action */}
          <div className="pt-4 pb-8">
            <button
              onClick={handleFinishLesson}
              disabled={activeLesson.quiz && !quizChecked}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 rounded-xl font-bold text-xs tracking-wider shadow-[0_4px_15px_rgba(16,185,129,0.35)] disabled:opacity-50 transition-all cursor-pointer"
            >
              {completedLessons.includes(activeLesson.id) 
                ? "LESSON ALREADY COMPILED (EXIT)" 
                : "COMPLETE MODULE & EARN XP +150"
              }
            </button>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-y-auto px-5 space-y-6 pt-2">
          
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">CODE DECKS</h2>
            <p className="text-xs text-slate-400">Select an instructional gateway pipeline to expand your engineering skills.</p>
          </div>

          {/* Category Scrollers */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-none px-3 py-1.5 rounded-full text-[11px] font-mono border transition-all cursor-pointer ${
                  selectedCategory === cat.id 
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400 text-cyan-400 font-bold" 
                    : "bg-slate-900/60 border-slate-800 text-slate-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active Course Grid */}
          <div className="space-y-4">
            {filteredCourses.map(course => {
              // Calculate completions
              const completedInCourse = course.lessons.filter(l => completedLessons.includes(l.id)).length;
              const percent = course.lessons.length > 0 ? (completedInCourse / course.lessons.length) * 100 : 0;

              return (
                <div 
                  key={course.id} 
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/80 transition-all duration-200 overflow-hidden shadow-lg"
                >
                  {/* Banner header for course */}
                  <div className={`h-28 bg-gradient-to-tr ${course.thumbnail} p-4 flex flex-col justify-between relative`}>
                    <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]" />
                    <div className="flex justify-between items-start z-10">
                      <span className="text-[9px] font-mono tracking-widest uppercase bg-slate-950/70 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                        {course.difficulty}
                      </span>
                      {percent === 100 && (
                        <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          VERIFIED CERTIFICATE
                        </span>
                      )}
                    </div>
                    <div className="z-10">
                      <h3 className="text-sm font-bold text-white tracking-tight drop-shadow">{course.title}</h3>
                      <p className="text-[10px] text-slate-300 drop-shadow line-clamp-1 mt-0.5">{course.subtitle}</p>
                    </div>
                  </div>

                  {/* Lessons list dropdown panel */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>MODULE COMPLETIONS</span>
                      <span className="text-slate-200">{completedInCourse} / {course.lessons.length} STAGES ({Math.round(percent)}%)</span>
                    </div>

                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden p-[1px] border border-slate-800/60">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="mt-3.5 space-y-1.5 border-t border-slate-800 pt-3">
                      {course.lessons.map((lesson, idx) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        return (
                          <div 
                            key={lesson.id}
                            onClick={() => onSelectLesson(course.id, lesson.id)}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 hover:bg-slate-950 border border-slate-800/40 hover:border-slate-800 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] ${
                                isCompleted 
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                  : "bg-slate-900 text-slate-400 border border-slate-800"
                              }`}>
                                {isCompleted ? "✓" : idx + 1}
                              </div>
                              <div className="text-left">
                                <div className={`text-xs font-bold transition-colors ${isCompleted ? "text-slate-400 line-through" : "text-white group-hover:text-cyan-400"}`}>
                                  {lesson.title}
                                </div>
                                <div className="text-[9px] text-slate-500 font-mono">
                                  {lesson.duration} • +{lesson.xp} XP
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
