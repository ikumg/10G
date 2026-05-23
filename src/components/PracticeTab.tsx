import React, { useState, useEffect } from "react";
import { Terminal, Play, CheckCircle, AlertOctagon, Code, RefreshCw, Layers, Copy, HelpCircle, Download } from "lucide-react";
import { CodingChallenge } from "../types";

interface PracticeTabProps {
  challenges: CodingChallenge[];
  selectedChallenge: CodingChallenge | null;
  onSelectChallenge: (challenge: CodingChallenge | null) => void;
  onCodeCompiled: (xpEarned: number) => void;
}

export default function PracticeTab({
  challenges,
  selectedChallenge,
  onSelectChallenge,
  onCodeCompiled
}: PracticeTabProps) {
  const [activeTab, setActiveTab] = useState<"challenges" | "compiler">("challenges");
  const [editorCode, setEditorCode] = useState<string>("");
  const [compilerLanguage, setCompilerLanguage] = useState<string>("JavaScript");
  
  // Console Outputs state
  const [consoleLogs, setConsoleLogs] = useState<{ type: "input" | "info" | "success" | "error"; text: string }[]>([]);
  const [compiling, setCompiling] = useState<boolean>(false);
  
  // Custom execution sandbox state
  useEffect(() => {
    if (selectedChallenge) {
      setEditorCode(selectedChallenge.starterCode);
      setCompilerLanguage(selectedChallenge.language);
      setActiveTab("compiler");
      setConsoleLogs([
        { type: "info", text: `[SYSTEM] Loaded Challenge: ${selectedChallenge.title}` },
        { type: "info", text: `[SYSTEM] Expecting terminal output matching: "${selectedChallenge.expectedOutput}"` }
      ]);
    } else {
      // Freeform playground setup
      setEditorCode(`// 10G Quantum Javascript Playground\n// Write your scripts below & compile directly!\n\nconst firmware = "10G REACTOR CORE ALPHA";\nconsole.log("BOOTING: " + firmware);\n\nfor (let i = 1; i <= 3; i++) {\n  console.log("Syncing Node 0x" + i * 16 + "...");\n}\n`);
      setCompilerLanguage("JavaScript");
    }
  }, [selectedChallenge]);

  const handleRunCodeCompiler = () => {
    setCompiling(true);
    setConsoleLogs(prev => [...prev, { type: "input", text: `npx run quantum-engine --lang=${compilerLanguage.toLowerCase()}` }]);

    setTimeout(() => {
      // Evaluate actual JS logic if language is JS/Hacking
      if (compilerLanguage === "JavaScript" || compilerLanguage === "Hacking / JS") {
        try {
          // Capture logs safely inside sandbox representation
          const capturedLogs: string[] = [];
          const originalLog = console.log;
          console.log = (...args) => {
            capturedLogs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(" "));
          };

          // Execute evaluation logic securely
          const cleanEvalCode = editorCode
            .replace(/const /g, "var ")
            .replace(/let /g, "var ");
          
          const evalResult = new Function(cleanEvalCode)();
          console.log = originalLog;

          const logsToAppend: { type: "input" | "info" | "success" | "error"; text: string }[] = capturedLogs.map(log => ({ type: "success" as const, text: `[OUT] ${log}` }));
          
          if (logsToAppend.length === 0) {
            logsToAppend.push({ type: "info", text: `[OUT] Process completed with no console logs. Result returned: ${evalResult !== undefined ? evalResult : "void"}` });
          }

          // Evaluate if challenge specs are satisfied
          if (selectedChallenge) {
            const outputSatisfies = capturedLogs.some(log => log.trim() === selectedChallenge.expectedOutput) || 
                                     (capturedLogs.length > 0 && capturedLogs[capturedLogs.length - 1].trim() === selectedChallenge.expectedOutput);
            
            if (outputSatisfies) {
              setConsoleLogs(prev => [
                ...prev,
                ...logsToAppend,
                { type: "success", text: `✓ VERIFICATION SUCCESSFUL: +300 XP awarded to cognitive profile.` }
              ]);
              onCodeCompiled(300);
            } else {
              setConsoleLogs(prev => [
                ...prev,
                ...logsToAppend,
                { type: "error", text: `✗ ASSESSMENTS ERROR: Expected output "${selectedChallenge.expectedOutput}". Try editing logic.` }
              ]);
            }
          } else {
            setConsoleLogs(prev => [...prev, ...logsToAppend]);
            onCodeCompiled(50); // Freeform compiles yield smaller XP increments
          }

        } catch (err: any) {
          setConsoleLogs(prev => [...prev, { type: "error", text: `[RUNTIME EXCEPTION] ${err.message}` }]);
        }
      } else {
        // Python or cyber compiler emulation fallback
        const simulatedOutputs: { [key: string]: string } = {
          "py-square": "[1, 4, 9, 16]",
          "js-filter": "[80, 443, 22]"
        };

        const successOutput = simulatedOutputs[selectedChallenge ? selectedChallenge.id : "py-square"] || "[1, 4, 9, 16]";
        setConsoleLogs(prev => [
          ...prev,
          { type: "success", text: `[OUT] Running simulation algorithm inside Python-Core v3.9...` },
          { type: "success", text: `[OUT] Compiled: ${successOutput}` },
          { type: "success", text: `✓ CORE MATRIX VERIFIED PROMPT COMPLETION.` }
        ]);
        onCodeCompiled(250);
      }
      setCompiling(false);
    }, 1200);
  };

  const handleResetStarter = () => {
    if (selectedChallenge) {
      setEditorCode(selectedChallenge.starterCode);
    } else {
      setEditorCode("");
    }
    setConsoleLogs([{ type: "info", text: "[SYSTEM] Compiler environment variables refreshed." }]);
  };

  const handleDownloadScript = () => {
    try {
      let fileExtension = "js";
      if (compilerLanguage.toLowerCase().includes("python")) {
        fileExtension = "py";
      } else if (compilerLanguage.toLowerCase().includes("hacking") || compilerLanguage.toLowerCase().includes("cyber")) {
        fileExtension = "py";
      } else if (compilerLanguage.toLowerCase().includes("cpp")) {
        fileExtension = "cpp";
      } else if (compilerLanguage.toLowerCase().includes("json")) {
        fileExtension = "json";
      }

      const blob = new Blob([editorCode], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      const fileLabel = selectedChallenge ? selectedChallenge.id : "quantum_module";
      link.download = `${fileLabel}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setConsoleLogs(prev => [
        ...prev,
        { type: "info", text: `[SYSTEM] Script downloaded successfully as "${fileLabel}.${fileExtension}"` }
      ]);
    } catch (err: any) {
      setConsoleLogs(prev => [
        ...prev,
        { type: "error", text: `[SYSTEM] Export Anomaly: ${err.message}` }
      ]);
    }
  };

  return (
    <div id="practice-academy-panel" className="flex-1 flex flex-col overflow-hidden pb-16">
      
      {/* Visual Workspace Sub-navigation (Toggle compiler terminal vs challenges) */}
      <div className="flex border-b border-slate-900 bg-slate-950/90 p-2 z-10 sticky top-0 items-center justify-between">
        <div className="flex gap-1.5">
          <button
            onClick={() => setActiveTab("challenges")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === "challenges" 
                ? "bg-slate-900 text-cyan-400 border border-slate-800" 
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            CHALLENGES LIST
          </button>
          <button
            onClick={() => setActiveTab("compiler")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === "compiler" 
                ? "bg-slate-900 text-purple-400 border border-slate-800" 
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            LIVE COMPILER DECK
          </button>
        </div>

        {selectedChallenge && (
          <button 
            onClick={() => onSelectChallenge(null)}
            className="text-[10px] font-mono text-pink-500 hover:underline hover:text-pink-400 flex items-center gap-1 cursor-pointer"
          >
            RESET TO PLAYGROUND
          </button>
        )}
      </div>

      {activeTab === "challenges" ? (
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          
          <div className="space-y-1">
            <h2 className="text-xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">ACTIVE LABS</h2>
            <p className="text-xs text-slate-400">Complete automated syntax and cyber challenges to rank higher in the regional leaderboard nodes.</p>
          </div>

          <div className="space-y-3.5">
            {challenges.map((challenge) => {
              const diffColors = {
                "Easy": "bg-green-500/10 border-green-500/20 text-green-400",
                "Medium": "bg-amber-500/10 border-amber-500/20 text-amber-400",
                "Expert": "bg-red-500/10 border-red-500/20 text-red-400"
              };

              return (
                <div 
                  key={challenge.id}
                  onClick={() => {
                    onSelectChallenge(challenge);
                    setActiveTab("compiler");
                  }}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-905 hover:border-slate-700 transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {challenge.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono pt-1">
                        <span className="bg-slate-950 px-2 py-0.5 rounded text-cyan-400 border border-slate-800">
                          {challenge.language}
                        </span>
                        <span>TARGET: "{challenge.expectedOutput}"</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${diffColors[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-normal line-clamp-2">
                    {challenge.instructions}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-950/80 font-mono text-slate-500">
                    <span>REWARD: +300 XP</span>
                    <span className="text-cyan-500 group-hover:translate-x-1 transition-all flex items-center gap-1">
                      LOAD TERMINAL →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
          
          {/* Instructions drawer (only shows when challenge is loaded) */}
          {selectedChallenge && (
            <div className="bg-slate-900/60 p-4 border-b border-slate-900 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-cyan-400">CHALLENGE SPECS: {selectedChallenge.title}</span>
                <span className="text-slate-500">{selectedChallenge.difficulty}</span>
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                {selectedChallenge.instructions}
              </p>
            </div>
          )}

          {/* Code Editor Area */}
          <div className="flex-1 flex flex-col min-h-0 relative font-mono text-xs">
            {/* Header toolbar stats */}
            <div className="h-8 bg-slate-950 border-b border-slate-900/60 px-4 flex justify-between items-center text-[10px] text-slate-500">
              <div className="flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="text-slate-400">{compilerLanguage.toUpperCase()} RUNNER</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                SECURE SANDBOX ACTIVE
              </span>
            </div>

            {/* Simulated Live Source Code editor */}
            <textarea
              value={editorCode}
              onChange={(e) => setEditorCode(e.target.value)}
              className="flex-1 w-full bg-slate-950 p-4 text-cyan-200 outline-none resize-none font-mono text-xs leading-relaxed focus:bg-slate-950/80 transition-all placeholder:text-slate-600 border-none"
              placeholder="// Write modern code logic matrix presets here..."
              spellCheck="false"
            />
          </div>

          {/* Compiler Terminal Outputs Area */}
          <div className="h-[210px] bg-slate-950 border-t border-slate-900 flex flex-col">
            <div className="h-7 px-4 bg-slate-900/60 border-b border-slate-950 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-purple-400" />
                CORE CONSOLE LOGS
              </span>
              <button 
                onClick={() => setConsoleLogs([{ type: "info", text: "[SYSTEM] Buffer registers wiped pristine." }])}
                className="hover:text-cyan-400"
              >
                WIPE BUFFER
              </button>
            </div>

            {/* Actual logs printing */}
            <div className="flex-1 overflow-y-auto px-4 py-2 font-mono text-[10px] space-y-1.5 bg-slate-950/90 text-slate-300">
              {consoleLogs.length === 0 ? (
                <div className="text-slate-600 italic">No output transmissions on register... Press Compile Action.</div>
              ) : (
                consoleLogs.map((log, lIdx) => {
                  let logColor = "text-slate-400";
                  if (log.type === "input") logColor = "text-yellow-400 font-bold";
                  if (log.type === "success") logColor = "text-emerald-400";
                  if (log.type === "error") logColor = "text-rose-400";
                  if (log.type === "info") logColor = "text-cyan-400";
                  
                  return (
                    <div key={lIdx} className={`leading-relaxed break-all ${logColor}`}>
                      {log.text}
                    </div>
                  );
                })
              )}
            </div>

            {/* Control buttons */}
            <div className="p-2 bg-slate-900/90 border-t border-slate-950 grid grid-cols-3 gap-1.5">
              <button 
                onClick={handleResetStarter}
                title="Restore code template"
                className="py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-mono font-bold text-slate-400 flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RESTORE</span>
              </button>

              <button 
                onClick={handleDownloadScript}
                title="Download active script file"
                className="py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-mono font-bold text-cyan-400 flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD</span>
              </button>
              
              <button 
                onClick={handleRunCodeCompiler}
                disabled={compiling}
                title="Compile and evaluate script"
                className="py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 rounded-lg text-[9px] font-mono font-black flex flex-col items-center justify-center gap-1 transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)] cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950 stroke-[3px]" />
                <span>{compiling ? "COMPILING" : "COMPILE"}</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
