import React, { useState } from "react";
import { Award, Trophy, Users, ShieldAlert, Sparkles, Flame, CheckCircle2, TrendingUp, ThumbsUp, MessageSquare, Plus, Check } from "lucide-react";
import { UserStats, LeaderboardLeader, CommunityPost } from "../types";

interface ProfileTabProps {
  stats: UserStats;
  leaderboard: LeaderboardLeader[];
  posts: CommunityPost[];
  onAddPost: (content: string, category: string) => void;
  onLikePost: (postId: string) => void;
}

export default function ProfileTab({
  stats,
  leaderboard,
  posts,
  onAddPost,
  onLikePost
}: ProfileTabProps) {
  const [profileSubTab, setProfileSubTab] = useState<"stats" | "leaderboard" | "community">("stats");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General Operations");
  const [postFormOpen, setPostFormOpen] = useState(false);

  // Hardcoded certification list based on statistics
  const digitalCertificates = [
    { title: "Python Scripting Cert", hash: "SHA-256::0x99281A", desc: "Dynamic matrices & control buffers", courseId: "python-core" },
    { title: "SecOps Core Protocol", hash: "SHA-256::0xBB2716", desc: "Cryptography & firewall defense", courseId: "ethical-hacking" },
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    onAddPost(newPostContent, newPostCategory);
    setNewPostContent("");
    setPostFormOpen(false);
  };

  return (
    <div id="profile-panel-view" className="flex-1 flex flex-col overflow-hidden pb-16">
      
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-900 bg-slate-950/90 p-2 z-10 select-none">
        <button
          onClick={() => setProfileSubTab("stats")}
          className={`flex-1 py-1.5 text-center text-xs font-mono font-bold transition-all rounded-lg cursor-pointer ${
            profileSubTab === "stats" 
              ? "bg-slate-900 border border-slate-800 text-cyan-400" 
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          CREDENTIALS
        </button>
        <button
          onClick={() => setProfileSubTab("leaderboard")}
          className={`flex-1 py-1.5 text-center text-xs font-mono font-bold transition-all rounded-lg cursor-pointer ${
            profileSubTab === "leaderboard" 
              ? "bg-slate-900 border border-slate-800 text-purple-400" 
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          RANKINGS
        </button>
        <button
          onClick={() => setProfileSubTab("community")}
          className={`flex-1 py-1.5 text-center text-xs font-mono font-bold transition-all rounded-lg cursor-pointer ${
            profileSubTab === "community" 
              ? "bg-slate-900 border border-slate-800 text-pink-400" 
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          COMMUNITY
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

        {profileSubTab === "stats" && (
          <div className="space-y-6">
            
            {/* HUD Profile metrics card */}
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 relative overflow-hidden">
              <div className="absolute top-[-40px] right-[-40px] w-24 h-24 bg-cyan-500/10 rounded-full blur-xl" />
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500">OPERATOR STATUS</span>
                  <h3 className="text-base font-bold text-white leading-tight">NEO_OPERATOR</h3>
                  <p className="text-xs text-slate-400">Class: ML / Cybersecurity Expert Core</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-500 font-mono">LEVEL</span>
                  <span className="text-2xl font-black font-mono text-cyan-400">{stats.level}</span>
                </div>
              </div>

              {/* Grid attributes */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-900">
                <div className="flex items-center gap-2.5">
                  <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
                  <div>
                    <div className="text-[9px] text-slate-500">STREAK LOGS</div>
                    <div className="text-xs font-bold text-white font-mono">{stats.streak} DAYS ACTIVE</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-cyan-500Width" style={{ color: '#06b6d4' }} />
                  <div>
                    <div className="text-[9px] text-slate-500">TOTAL SCORE</div>
                    <div className="text-xs font-bold text-white font-mono">{stats.xp} XP INDEX</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements unlocking indicators */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">UNLOCKED DIGITAL CERTIFICATES</div>
              
              <div className="space-y-3">
                {digitalCertificates.map((cert, cIdx) => (
                  <div 
                    key={cIdx} 
                    className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 relative overflow-hidden group hover:border-cyan-500/30 transition-all"
                  >
                    {/* Security stamp overlay */}
                    <div className="absolute -right-8 -bottom-8 w-24 h-24 border border-violet-500/10 rounded-full flex items-center justify-center text-[10px] font-mono select-none text-violet-500/15 font-black uppercase rotate-12">
                      10G UNLOCKED
                    </div>

                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                          {cert.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-1">{cert.desc}</p>
                      </div>
                      <span className="text-[8px] font-mono text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded uppercase font-bold tracking-widest">
                        SECURE LOG
                      </span>
                    </div>

                    <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-900 mt-2.5">
                      <div className="text-[8px] text-slate-500 font-mono">CRYPTOGRAPHIC VERIFICATION KEY</div>
                      <div className="text-[9px] font-mono text-slate-400 break-all">{cert.hash}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {profileSubTab === "leaderboard" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-md font-bold text-white">REGIONAL SHIELDS</h3>
              <p className="text-xs text-slate-400">Competing against regional developer nodes for priority server allocation pipelines.</p>
            </div>

            <div className="space-y-2">
              {leaderboard.map((user) => {
                const isUser = user.name === "operatorNext"; // mock matching user active level
                return (
                  <div 
                    key={user.rank}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isUser 
                        ? "bg-cyan-500/10 border-cyan-500/40" 
                        : "bg-slate-900/40 border-slate-800/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg font-mono text-xs font-black flex items-center justify-center ${
                        user.rank === 1 ? "bg-amber-500 text-slate-950" : 
                        user.rank === 2 ? "bg-slate-300 text-slate-950" : 
                        user.rank === 3 ? "bg-orange-600 text-slate-950" : "text-slate-400 font-mono"
                      }`}>
                        {user.rank}
                      </div>

                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          {user.name}
                          {user.online && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
                        </div>
                        <div className="text-[9px] text-slate-500 font-mono">
                          {user.badge} • Lvl {user.level}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-cyan-400 font-mono">{user.xp} XP</div>
                      <div className="text-[9px] text-slate-500 font-mono">{user.streak}d active</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {profileSubTab === "community" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-md font-bold text-white">OPERATOR BULLETINS</h3>
                <p className="text-xs text-slate-500">Ask tips on encryption, neural patterns and logic optimization.</p>
              </div>

              <button 
                onClick={() => setPostFormOpen(!postFormOpen)}
                className="p-2 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-slate-950 hover:bg-pink-400 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>POST BULLETIN</span>
              </button>
            </div>

            {/* Simulated bulletin edit tool form */}
            {postFormOpen && (
              <form onSubmit={handlePostSubmit} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white">CONSTRUCT NEW TRANSMISSION</div>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Query community operators..."
                  className="w-full h-20 bg-slate-950 text-xs text-slate-200 p-2.5 rounded-lg border border-slate-800/80 outline-none resize-none focus:border-pink-500"
                />

                <div className="flex justify-between items-center gap-2">
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] text-slate-400 focus:outline-none"
                  >
                    <option>General Operations</option>
                    <option>Web Development</option>
                    <option>AI & Neural Networks</option>
                    <option>Ethical Hacking</option>
                  </select>

                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>EMIT</span>
                  </button>
                </div>
              </form>
            )}

            {/* Bulletins listing feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={post.avatar} 
                        alt="Avatar" 
                        className="w-8 h-8 rounded-full border border-slate-800 object-cover" 
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{post.user}</div>
                        <div className="text-[9px] text-slate-500 font-mono uppercase">{post.role}</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                      {post.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-4 text-xs pt-1.5 border-t border-slate-900 text-slate-500 font-mono">
                    <button 
                      onClick={() => onLikePost(post.id)}
                      className={`flex items-center gap-1.5 hover:text-pink-400 ${post.hasLiked ? "text-pink-400 font-bold" : ""}`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.likes}</span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.replies} responses</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
