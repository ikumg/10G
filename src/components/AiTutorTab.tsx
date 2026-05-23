import React, { useState, useRef, useEffect } from "react";
import { MessageSquareCode, Send, Sparkles, AlertCircle, Bot, Share2, CornerDownRight, Zap } from "lucide-react";

interface AiTutorTabProps {
  onAddXp: (xp: number) => void;
  quickPrompt: string;
  onClearQuickPrompt: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function AiTutorTab({ onAddXp, quickPrompt, onClearQuickPrompt }: AiTutorTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `### Welcome to 10G AI Core! 👾

I am your quantum coding tutor. How can I help you hack into high-performance web development, Python algorithm optimization, or cyber defenses today?

Select a preset or ask me any coding query.
*Note: To query live non-simulated neural networks, ensure you activate a \`GEMINI_API_KEY\` inside settings secrets.*`,
      timestamp: "System Initialized"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiMode, setApiMode] = useState<string>("LOCAL_PRESET");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested chips
  const suggestions = [
    { label: "SQL Injection Threats", query: "explain SQL injection" },
    { label: "Understand Async/Await", query: "explain promises vs async await" },
    { label: "Python decorator uses", query: "python decorators" },
    { label: "Caesar Cryptography", query: "explain cybersecurity basics" }
  ];

  // Load quick-prompts when triggered from main dashboard
  useEffect(() => {
    if (quickPrompt) {
      handleSendPrompt(quickPrompt);
      onClearQuickPrompt();
    }
  }, [quickPrompt]);

  // Keep logs scrolled down
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendPrompt = async (forcedPrompt?: string) => {
    const activeText = forcedPrompt || inputText;
    if (!activeText.trim()) return;

    // Clear main input
    if (!forcedPrompt) setInputText("");

    const userMsg: Message = {
      role: "user",
      content: activeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMsg),
          currentPrompt: activeText,
          language: "General Sandbox Deck",
          topic: "Computer Science"
        })
      });

      if (!response.ok) {
        throw new Error("Transmissions link anomaly");
      }

      const data = await response.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setApiMode(data.mode);
      setMessages(prev => [...prev, assistantMsg]);
      onAddXp(60); // +60 XP award per cognitive query!
    } catch (error) {
      console.error(error);
      const errMsg: Message = {
        role: "assistant",
        content: `⚠️ **Cybernetic Sync Failure**: The AI core compiler did not return a response log.\n\n*Suggestion*: Run local preset algorithms, verify your server files state or activate a real API key inside AI Studio secrets block.`,
        timestamp: "Diagnostic Alert"
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-tutor-panel" className="flex-1 flex flex-col overflow-hidden bg-slate-950 pb-16">
      
      {/* 1. System Header Status Indicator */}
      <div className="p-3 px-4 bg-slate-900/80 border-b border-slate-900 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            10G AI TUTOR CORE
          </span>
        </div>
        <div className="text-[10px] uppercase font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
          {apiMode === "QUANTUM_LIVE" ? "⚡ SECURE LIVE LINK" : "🤖 SIMULATED SYNAPSE"}
        </div>
      </div>

      {/* 2. Chat history container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, idx) => {
          const isUser = m.role === "user";
          return (
            <div 
              key={idx}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {!isUser && <Bot className="w-3.5 h-3.5 text-purple-400" />}
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                  {isUser ? "OPERATOR NODE" : "10G AI TUTOR"} • {m.timestamp}
                </span>
              </div>

              <div 
                className={`max-w-[90%] p-4 rounded-2xl border text-xs leading-relaxed space-y-3 ${
                  isUser 
                    ? "bg-slate-900 border-slate-800 text-cyan-200 rounded-tr-none" 
                    : "bg-slate-900/40 border-slate-800/80 text-slate-300 rounded-tl-none shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                }`}
              >
                {/* Parse Markdown representation elements simply & safely */}
                {m.content.split("\n\n").map((chunk, cIdx) => {
                  if (chunk.startsWith("###")) {
                    return (
                      <h4 key={cIdx} className="text-sm font-bold text-white tracking-tight uppercase border-l-2 border-purple-500 pl-2 mt-2">
                        {chunk.replace("###", "").trim()}
                      </h4>
                    );
                  }
                  if (chunk.startsWith("```")) {
                    const cleanCode = chunk.replace(/```[a-zA-Z]*/g, "").replace(/```/g, "").trim();
                    return (
                      <pre key={cIdx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 overflow-x-auto text-[10px] font-mono text-cyan-400 mt-2">
                        <code>{cleanCode}</code>
                      </pre>
                    );
                  }
                  return <p key={cIdx} className="whitespace-pre-wrap">{chunk}</p>;
                })}
              </div>
            </div>
          );
        })}

        {/* Typing loading indicators */}
        {loading && (
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 mb-1">
              SYSTEM IS THINKING...
            </span>
            <div className="p-4 bg-slate-900/20 border border-slate-900 rounded-2xl rounded-tl-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Quick suggestions area */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-900/60 overflow-x-auto whitespace-nowrap select-none scrollbar-none">
        <div className="flex gap-2">
          {suggestions.map((s, sIdx) => (
            <button
              key={sIdx}
              onClick={() => handleSendPrompt(s.query)}
              className="flex-none px-3 py-1.5 rounded-xl bg-slate-900 text-[10px] font-mono text-slate-400 hover:text-white border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Fields */}
      <div className="p-3 bg-slate-900 border-t border-slate-950/80 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendPrompt()}
          placeholder="Query quantum coder console... (e.g. explain variables)"
          className="flex-1 bg-slate-950 outline-none text-xs border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:border-cyan-500/40"
        />
        <button
          onClick={() => handleSendPrompt()}
          className="p-3.5 bg-gradient-to-tr from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-xl text-slate-950 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
        >
          <Send className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>

    </div>
  );
}
