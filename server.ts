import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("10G Gemini AI Client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini Client:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined. AI tutor is running in sandbox mode.");
}

// API Routes
app.post("/api/tutor", async (req, res) => {
  const { messages, currentPrompt, language, topic } = req.body;

  if (!currentPrompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  // Fallback / System instruction
  const systemInstruction = `You are "10G AI Core", an ultra-advanced quantum AI programming tutor, cybersecurity analyst, and software engineering mentor for the "10G" coding platform.
Your persona: Cool, witty, highly smart, professional, encouraging, and futuristic. Use subtle cyberpunk style elements (e.g., terms like "Quantum compilations", "Cyber-deck", "Decompile", "0x-sec", "Mainframe").
Respond with clear Explanations, interactive steps, and elegantly formatted, highly detailed code snippets in markdown.
Focus on teaching: Python, JavaScript, C++, Java, React, SQL, HTML/CSS, Node.js, PHP, AI concepts, Ethical Hacking, or general Computer Science depending on context.
Current context: User is studying ${language || "General Programming"} focus on ${topic || "General Concepts"}.`;

  // Check if real Gemini live API can be requested
  if (ai) {
    try {
      // Reconstitute query for generateContent
      // Let's summarize the conversation history for context in a single text block
      let promptBuilder = "";
      if (messages && Array.isArray(messages) && messages.length > 0) {
        promptBuilder += "Previous conversation historical log:\n";
        messages.slice(-6).forEach((m: any) => {
          promptBuilder += `${m.role === 'user' ? 'User' : '10G AI Core'}: ${m.content}\n`;
        });
        promptBuilder += "\n";
      }
      promptBuilder += `Current Active Prompt: ${currentPrompt}\n`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptBuilder,
        config: {
          systemInstruction,
          temperature: 0.75,
        }
      });

      const replyText = response.text || "Diagnostic alert: Gemini API did not yield a textual transmission.";
      return res.json({ response: replyText, mode: "QUANTUM_LIVE" });
    } catch (err: any) {
      console.error("Gemini live API invocation failure:", err);
      // Fallback response with beautiful, helpful simulation
      return res.json({
        response: `⚠️ **Connection Interface Alert**: The Quantum live link returned a response delay. Running on sandbox cache protocols.\n\nHere is an interactive educational solution to your query:\n\n**Response:**\nTo learn or solve \`${currentPrompt}\` inside the ${language || "virtual deck"}:\n1. Ensure you verify syntax, dependencies, and logical parameters.\n2. Write structured scripts with exception handling.\n\n*System Info: Check your AI Studio Settings/Secrets configuration to fully restore the live link!*`,
        mode: "SANDBOX_CACHE_FALLBACK"
      });
    }
  } else {
    // Elegant fully simulated AI Core for seamless offline or default preview experience
    const mockResponses: { [key: string]: string } = {
      "hello": `### Welcome to 10G AI Core! 👾
I am your quantum coding tutor. I see we have a connection established in Sandbox Mode.

To activate the real live API, specify a \`GEMINI_API_KEY\` in your **Settings > Secrets** panel in the AI Studio environment.

How can I help you hack into high-performance web development, Python algorithm optimization, or cyber defenses today? Select a preset below or type a custom sequence!`,
      "explain promises": `### Understanding JavaScript Promises 🚀

In javascript, a **Promise** represents an operation that hasn't completed yet, but is expected to in the future. It's the core of asynchronous programming.

#### Statuses of a Promise:
- **Pending**: Initial state, neither fulfilled nor rejected.
- **Fulfilled**: Operation completed successfully.
- **Rejected**: Operation failed.

\`\`\`javascript
// Decoupling async actions in 10G-space
const fetchQuantumData = () => {
  return new Promise((resolve, reject) => {
    const success = true; 
    setTimeout(() => {
      if (success) {
        resolve({ data: "Mainframe Link Active" });
      } else {
        reject("0x404 Connection Error");
      }
    }, 1500);
  });
};

fetchQuantumData()
  .then(response => console.log("Success:", response.data))
  .catch(error => console.error("Alert:", error));
\`\`\`

*Tutor Tip*: Use \`async/await\` for even cleaner syntax!`,
      "python decorators": `### Python Decorators Decoded 🐍

A **decorator** allows you to modify or extend the behavior of a function or class without permanently modifying its structure.

Think of it like adding custom futuristic armor onto your original laser weapon!

#### Cyberpunk Example:
\`\`\`python
# Decorator wrapping the laser firing function
def override_booster(func):
    def wrapper():
        print("[Boost Node] Initiating quantum damage multiplier...")
        func()
        print("[Boost Node] Laser weapon cooling down.")
    return wrapper

@override_booster
def fire_laser():
    print(">>> Firing core beam: 10,000 Terawatts <<<")

# Execution
fire_laser()
\`\`\`

#### Console Output:
\`\`\`text
[Boost Node] Initiating quantum damage multiplier...
>>> Firing core beam: 10,000 Terawatts <<<
[Boost Node] Laser weapon cooling down.
\`\`\``,
      "cybersecurity basics": `### Quantum Cybersecurity Protocol: The Triad 🔒

Every cybersecurity defense core is built on the **CIA Triad** (Confidentiality, Integrity, Availability):

1. **Confidentiality**: Keeping critical system data hidden from unauthorized eyes (e.g., using robust aes-256 cipher streams).
2. **Integrity**: Guaranteeing that files and configurations are never modified or compromised in transit (validated via SHA-256 checksum tags).
3. **Availability**: Ensuring data channels remain accessible to authenticated operators despite high DDoS grid traffic.

*Lesson Core Exercises:*
- Try implementing a basic Caeser Cypher in the **Practice** tab!
- Practice analyzing SQL injection threats in our interactive labs.`
    };

    const lowercasePrompt = currentPrompt.toLowerCase().trim();
    let bestSimulatedReply = `### 10G AI Core Sandbox Console 🧠

You requested information on: **"${currentPrompt}"** 

To enable live intelligence queries on ANY topic, please hook up your \`GEMINI_API_KEY\` inside the developer tools **Settings > Secrets**.

#### Interactive Tutoring Lesson:
- **Topic Focus**: ${language || "Full Stack Mastery"}
- **Core Concept**: To build clean modular programming systems, remember the DRY principle (Don't Repeat Yourself) & always separate your concerns into helper functions.

\`\`\`typescript
// Sandbox interactive code sample
function optimizeAlgorithm(data: any[]): any[] {
  console.log("Boosting dataset in the 10G-mainframe...");
  return [...new Set(data)]; // Decouples duplicates instantly!
}
\`\`\`

Would you like to try running this template code right now inside the **Practice** tab? Select lessons under the **Learn** deck to master specific languages!`;

    // See if any mock keywords match
    for (const key of Object.keys(mockResponses)) {
      if (lowercasePrompt.includes(key)) {
        bestSimulatedReply = mockResponses[key];
        break;
      }
    }

    return res.json({ response: bestSimulatedReply, mode: "SANDBOX_PRESET" });
  }
});

// Configure Vite or Static File Delivery
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev server middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Production static files server configured.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`10G Cyber-Academy Server running at http://0.0.0.0:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Critical server failure on startup:", error);
});
