import { Course, CodingChallenge, LeaderboardLeader, CommunityPost } from "../types";

export const COURSES: Course[] = [
  {
    id: "python-core",
    title: "Python Cyber-Metrics",
    subtitle: "Unlock analytical scripting and automated operations.",
    category: "programming",
    icon: "Terminal",
    color: "#EAB308", // Yellow
    thumbnail: "from-yellow-600 to-amber-900",
    difficulty: "Beginner",
    lessons: [
      {
        id: "py-1",
        title: "Variables and Quantum Input",
        duration: "5 mins",
        xp: 150,
        completed: false,
        content: `### Welcome to Python Operations! 🐍
In Python, variables are initialized dynamically. You don't need to specify types.

\`\`\`python
# Declaring string variables
grid_id = "0x-998A"
pulse_frequency = 8.5
active_link = True

print(f"Node: {grid_id} Frequency: {pulse_frequency} State: {active_link}")
\`\`\`

Variables are names bounded to memory cells. Use snake_case structure for variables name references.`,
        quiz: {
          question: "Which expression correctly defines a Python variable reference?",
          options: ["let node = 10", "node_index = 10", "nodeIndex := 10", "define node = 10"],
          correctIndex: 1,
          explanation: "Python declares variables using dynamic assignment assignments directly with the variable name and value with standard snake_case naming conventions."
        }
      },
      {
        id: "py-2",
        title: "Micro-Cyber Control Structures",
        duration: "8 mins",
        xp: 200,
        completed: false,
        content: `### Flow Control in Python Matrices
Python uses indentation instead of curly braces to establish code logic blocks!

\`\`\`python
def scan_firewall(security_level):
    if security_level > 90:
        return "CRITICAL STATUS"
    elif security_level > 50:
        return "WARNING LOGGED"
    else:
        return "MAIN DECK SECURED"
\`\`\`

Always indent properly using exactly 4 spaces to avoid syntax alignment compile errors.`,
        quiz: {
          question: "How are distinct logical blocks of code grouped in Python?",
          options: ["Semicolons", "Curly tabs {}", "Whitespace Indentation", "End Statements"],
          correctIndex: 2,
          explanation: "Whitespace indentation is the standard syntactic approach to identify nested coding blocks inside Python modules."
        }
      }
    ]
  },
  {
    id: "js-neuro",
    title: "JavaScript Neuro-GRID",
    subtitle: "Create dynamic logic, asynchronous protocols and DOM pipelines.",
    category: "programming",
    icon: "Flame",
    color: "#FACC15", // Lime/Yellow
    thumbnail: "from-yellow-500 to-amber-700",
    difficulty: "Beginner",
    lessons: [
      {
        id: "js-1",
        title: "Variables and Cyber Arrow Functions",
        duration: "6 mins",
        xp: 150,
        completed: false,
        content: `### Modern Asynchronous JavaScript
In modern ES6+ JS, clean functions can be written using arrow syntax.

\`\`\`javascript
// High speed cyber arrow function
const computeCyberDrive = (power, speed) => {
  const payload = power * speed;
  return \`Hyper Quantum Drive active at \${payload} Megawatts\`;
};

console.log(computeCyberDrive(45, 12));
\`\`\`

Arrow functions provide lexical scope binding for \`this\` references.`,
        quiz: {
          question: "Which keyword declares block-scoped re-assignable variables in modern JS?",
          options: ["var", "let", "const", "def"],
          correctIndex: 1,
          explanation: "The 'let' keyword defines block-scoped variables that can be modified or updated in place, while 'const' prevents re-assignment."
        }
      }
    ]
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking: Hackerspace-I",
    subtitle: "Deconstruct pen-testing payloads, firewalls, and buffer structures.",
    category: "cybersecurity",
    icon: "ShieldAlert",
    color: "#06B6D4", // Cyan
    thumbnail: "from-cyan-600 to-blue-950",
    difficulty: "Intermediate",
    lessons: [
      {
        id: "eh-1",
        title: "Caesar Cryptography and Shift Cyphers",
        duration: "10 mins",
        xp: 300,
        completed: false,
        content: `### Shift Algorithms (Caesar Cypher)
A fundamental cryptographic technique shifting alphabetical values down a regular key indices:

\`\`\`python
# Caeser shift simulator
def cipher_encode(text, shift_value):
    cipher_payload = ""
    for char in text:
        if char.isalpha():
            start_offset = ord('A') if char.isupper() else ord('a')
            cipher_payload += chr((ord(char) - start_offset + shift_value) % 26 + start_offset)
        else:
            cipher_payload += char
    return cipher_payload

print(cipher_encode("CYBERGRID", 4)) # GCBIVKVMH
\`\`\`

Shifting algorithm wraps modularly around alphabetical caps.`,
        quiz: {
          question: "With shift = 3, what is 'ABC' ciphered to?",
          options: ["XYZ", "DEF", "GHI", "BCD"],
          correctIndex: 1,
          explanation: "Shifting characters 'A', 'B', 'C' rightwards by 3 offsets yields 'D', 'E', 'F'."
        }
      }
    ]
  },
  {
    id: "ai-quantum",
    title: "Cognitive Neural Networks & AI",
    subtitle: "Synthesize weights, learning rates, and gradient calculations.",
    category: "artificial-intelligence",
    icon: "Brain",
    color: "#A855F7", // Purple
    thumbnail: "from-purple-600 to-violet-950",
    difficulty: "Quantum Operator",
    lessons: [
      {
        id: "ai-1",
        title: "Gradient Descent and Core Weights",
        duration: "12 mins",
        xp: 400,
        completed: false,
        content: `### Deep Neural Networks Weight Correction
Neural networks modify active weights using cost gradients to scale down error factors dynamically.

\`\`\`python
# Hyper gradient descent updates
def adjust_weights(current_weight, cost_gradient, learning_rate=0.01):
    updated_weight = current_weight - (learning_rate * cost_gradient)
    return updated_weight

print(adjust_weights(2.5, 0.45))
\`\`\`

Gradient steps must be carefully tracked. A highly elevated learning level triggers exploding gradient instabilities.`,
        quiz: {
          question: "What failure can happen when the training learning rate is too large?",
          options: ["Underfitting", "Model Overheating", "Gradient Explosion / Overshooting", "Loss of Network Memory"],
          correctIndex: 2,
          explanation: "If learning rates are excessively large, gradient descent will overshoot minimum points repeatedly, causing explosion or failure to find convergence."
        }
      }
    ]
  },
  {
    id: "cpp-reactor",
    title: "C++ High Performance Reactor",
    subtitle: "Low level memory optimization, pointers, and memory blocks.",
    category: "programming",
    icon: "FileCode",
    color: "#EC4899", // Pink
    thumbnail: "from-pink-600 to-rose-950",
    difficulty: "Quantum Operator",
    lessons: [
      {
        id: "cpp-1",
        title: "Pointers and Sector Allocation",
        duration: "10 mins",
        xp: 350,
        completed: false,
        content: `### C++ Pointer Address Protocols
A pointer stores the actual hex hexadecimal memory address parameters of a variables object.

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int core_damage = 95;
    int* address_ptr = &core_damage; // Pointer initialization

    cout << "Direct Value: " << core_damage << endl;
    cout << "Memory Sector Address: " << address_ptr << endl;
    cout << "De-referenced Register Payload: " << *address_ptr << endl;
    
    return 0;
}
\`\`\`

De-referencing pointers retrieves the exact primitive data referenced.`,
        quiz: {
          question: "Which symbol denotes the address-of operator to extract memory targets in C++?",
          options: ["*", "ptr", "&&", "&"],
          correctIndex: 3,
          explanation: "The ampersand symbol '&' retrieves the hexadecimal memory address of variables in C++."
        }
      }
    ]
  },
  {
    id: "cyber-tactics",
    title: "Incident Response and Defense Core",
    subtitle: "Lockdown ports, verify SSH fingerprints, and isolate threats.",
    category: "cybersecurity",
    icon: "Shield",
    color: "#22C55E", // Green
    thumbnail: "from-teal-600 to-green-950",
    difficulty: "Intermediate",
    lessons: [
      {
        id: "tactics-1",
        title: "Malicious Packet Vector Analyses",
        duration: "7 mins",
        xp: 180,
        completed: false,
        content: `### Port Scanning and Packet Deflection
To protect modern mainframes against security injection vectors:
- Ensure unneeded TCP/UDP ports are closed immediately.
- Use stateless firewalls to filter standard ports like 22 (SSH), 80 (HTTP) and 443 (HTTPS).

\`\`\`text
[Network Diagnostics Alert]
Suspicious ICMP requests detected on Port 445 -> Active Blocked instantly.
\`\`\``,
        quiz: {
          question: "Which TCP port is traditionally configured for secure remote shell (SSH) connections?",
          options: ["Port 80", "Port 22", "Port 21", "Port 443"],
          correctIndex: 1,
          explanation: "Port 22 is standard default listening port for secure shell SSH operations."
        }
      }
    ]
  }
];

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: "py-square",
    title: "Python Algorithm: Array Square Node",
    difficulty: "Easy",
    language: "Python",
    instructions: "Complete the function `square_elements(nums)` that takes a list of integer nodes and returns a new list containing all integers squared. Perfect python dynamic iteration exercise.",
    starterCode: `def square_elements(nums):
    # Enter quantum code block
    result = []
    for n in nums:
        result.append(n * n)
    return result

# Core system verification
print(square_elements([1, 2, 3, 4]))`,
    expectedOutput: "[1, 4, 9, 16]",
    testCases: [
      { input: "[1, 2, 3, 4]", output: "[1, 4, 9, 16]" },
      { input: "[0, -2, 5]", output: "[0, 4, 25]" }
    ]
  },
  {
    id: "js-filter",
    title: "JavaScript Core: Secure String Sanitizer",
    difficulty: "Medium",
    language: "JavaScript",
    instructions: "Create a function `sanitizePorts(ports, limit)` which filters out network port elements that are strictly above the `limit` threshold parameter constraint. Return the filtered numeric array.",
    starterCode: `function sanitizePorts(ports, limit) {
  // Filter active cyber ports
  return ports.filter(port => port <= limit);
}

// System terminal execution
console.log(sanitizePorts([80, 443, 22, 3000, 8080], 500));`,
    expectedOutput: "[80, 443, 22]",
    testCases: [
      { input: "([80, 443, 22, 3000, 8080], 500)", output: "[80, 443, 22]" },
      { input: "([21, 22, 23, 25], 23)", output: "[21, 22, 23]" }
    ]
  },
  {
    id: "caeser-dec",
    title: "Cyber Shield: Caesar Cipher Encoder",
    difficulty: "Expert",
    language: "Hacking / JS",
    instructions: "Complete an interactive Caesar shift function `shiftEncrypt(msg, offset)` shifting alphabetical lowercase characters. Non-alphabetic blocks are locked intact.",
    starterCode: `function shiftEncrypt(msg, offset) {
  // Cipher transmission payload
  let result = "";
  for (let i = 0; i < msg.length; i++) {
    let code = msg.charCodeAt(i);
    if (code >= 97 && code <= 122) { // a-z
      result += String.fromCharCode(((code - 97 + offset) % 26) + 97);
    } else {
      result += msg[i];
    }
  }
  return result;
}

console.log(shiftEncrypt("cyber", 3));`,
    expectedOutput: "fbehu",
    testCases: [
      { input: "('cyber', 3)", output: "fbehu" },
      { input: "('hack', 5)", output: "mfrp" }
    ]
  }
];

export const LEADERBOARD: LeaderboardLeader[] = [
  { rank: 1, name: "Vesper_0xSec", level: 42, xp: 14240, streak: 31, badge: "Master Cryptex", online: true },
  { rank: 2, name: "Kael_NodeRunner", level: 38, xp: 11980, streak: 12, badge: "Hacker Supreme", online: true },
  { rank: 3, name: "CyberGlow_JS", level: 35, xp: 9800, streak: 26, badge: "AI Archon", online: false },
  { rank: 4, name: "operatorNext", level: 31, xp: 8750, streak: 5, badge: "Web Overlord", online: true },
  { rank: 5, name: "neon_buffer", level: 25, xp: 7200, streak: 8, badge: "Byte Slicer", online: false },
  { rank: 6, name: "C++_CoreDump", level: 24, xp: 6850, streak: 15, badge: "Memory Core", online: true },
  { rank: 7, name: "pyQuantum", level: 19, xp: 4500, streak: 3, badge: "Script Cadet", online: false }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "p-1",
    user: "Hacker_Viper_09",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    role: "SecOps Engineer",
    content: "Just managed to solve the shiftEncrypt Caesars cryptographic Expert puzzle in exactly 4 lines of clean recursive Javascript logic! 🚀 My deck compile time was less than 4ms. Loving the 10G interface ecosystem.",
    timestamp: "2 hours ago",
    likes: 38,
    replies: 12,
    category: "Ethical Hacking",
    hasLiked: false
  },
  {
    id: "p-2",
    user: "QuantumAI_Optimist",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    role: "ML Specialist",
    content: "If you are struggling with neural network weight gradient overshooting, try configuring your initial learning values lower (like 0.001 or 0.005) or activate an Adam optimization algorithm matrix. Helps bypass local saddle points immediately!",
    timestamp: "4 hours ago",
    likes: 54,
    replies: 7,
    category: "AI & Neural Networks",
    hasLiked: true
  },
  {
    id: "p-3",
    user: "ByteWranglerJS",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    role: "Senior Deck Lead",
    content: "Can someone help clarify why Arrow Functions in JS do not preserve their own context constructor bindings? Trying to define interactive state callbacks on standard objects, but keep getting undefined pointers.",
    timestamp: "1 day ago",
    likes: 19,
    replies: 23,
    category: "Web Development",
    hasLiked: false
  }
];
