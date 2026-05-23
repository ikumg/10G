export interface Lesson {
  id: string;
  title: string;
  duration: string;
  xp: number;
  completed: boolean;
  content: string; // Markdown text or description
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: "programming" | "webdev" | "cybersecurity" | "artificial-intelligence";
  icon: string; // Lucide icon identifier
  thumbnail: string; // Linear gradient design properties
  difficulty: "Beginner" | "Intermediate" | "Quantum Operator";
  lessons: Lesson[];
  color: string; // Accent styling
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Expert";
  language: string;
  instructions: string;
  starterCode: string;
  expectedOutput: string;
  testCases: { input: string; output: string }[];
}

export interface UserStats {
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
  lastActive: string;
  totalHours: number;
  codesCompiled: number;
  certificatesUnlocked: string[];
}

export interface CommunityPost {
  id: string;
  user: string;
  avatar: string;
  role: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  category: string;
  hasLiked?: boolean;
}

export interface LeaderboardLeader {
  rank: number;
  name: string;
  level: number;
  xp: number;
  streak: number;
  badge: string;
  online: boolean;
}
