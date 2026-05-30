"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Terminal as TermIcon, BrainCircuit, Cpu } from "lucide-react";
import { TerminalAudio } from "./TerminalAudio";

interface TerminalGeminiProps {
  prompt: string;
}

export const TerminalGemini: React.FC<TerminalGeminiProps> = ({ prompt }) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [category, setCategory] = useState<"general" | "pooja" | "tech" | "skills">("general");

  useEffect(() => {
    // Play subtle synth initialization noise
    TerminalAudio.playSuccessChime();

    const timer = setTimeout(() => {
      setLoading(false);
      generateAiResponse();
    }, 1500);

    return () => clearTimeout(timer);
  }, [prompt]);

  const generateAiResponse = () => {
    const cleanPrompt = prompt.toLowerCase().trim();
    let reply = "";
    
    if (
      cleanPrompt.includes("pooja") || 
      cleanPrompt.includes("who is") || 
      cleanPrompt.includes("about") || 
      cleanPrompt.includes("background")
    ) {
      setCategory("pooja");
      reply = `**[GEMINI COGNITIVE VECTOR DIRECTIVE: POOJA MALPANI]**

Pooja Malpani is a premier elite Technology Advisor, veteran CTO specialist, and Product Engineering champion. 
She has built an authoritative career spanning over 12+ years in high-consequence corporate environments:

*   **CTO Specialist / Board Advisor:** Conducting comprehensive architecture audits, M&A due diligence, and modernization maps.
*   **VP of Product Engineering (Zenith Trading):** Scaled distributed low-latency platforms handling 10M+ daily transactions, expanding core squads from 20 to 120 developers.
*   **Event-Driven Systems Authority:** Expert in structural transition from legacy monoliths to high-fidelity, fail-safe microservices using Node, Rust, and Go.

*“Pooja represents the top 1% of strategic engineering leaders, blending hard algorithmic optimization with executive board-room strategy.”*

**[SUGGESTION]** Type \`experience\` or \`skills\` to review exact timeline data.`;
    } else if (
      cleanPrompt.includes("skills") || 
      cleanPrompt.includes("stack") || 
      cleanPrompt.includes("languages") || 
      cleanPrompt.includes("tech")
    ) {
      setCategory("skills");
      reply = `**[GEMINI CAPABILITY BENCHMARKING ENGINE]**

Analyzing Pooja Malpani's core telemetry & capabilities index:

1.  **System Architectures (98% Match):** Microservices, event-driven orchestration, low-latency API design, and distributed consensus (Kafka, RabbitMQ, gRPC).
2.  **Languages & Frameworks (95% Match):** Go, Rust, Next.js/React, TypeScript, Node.js, and C++.
3.  **Executive & Advisory (99% Match):** Technical due diligence, engineering team scaling, product roadmap governance, and cost optimization audits.
4.  **Cloud & Infrastructure (92% Match):** Kubernetes, AWS, Docker, CI/CD automated telemetry pipelines, and strict compliance security standards.

**[RECOMMENDATION]** Run the \`ats\` command to analyze your own CV against Pooja's executive hiring index.`;
    } else if (
      cleanPrompt.includes("help") || 
      cleanPrompt.includes("how") || 
      cleanPrompt.includes("what can you do")
    ) {
      reply = `**[GEMINI ASSISTANT CLI DIRECTORY]**

I am your secure Gemini AI terminal companion, integrated directly into PM-OS.
You can query me about anything. Here are some prompt structures you can try:
*   \`gemini who is Pooja Malpani?\`
*   \`gemini what are her key technical skills?\`
*   \`gemini explain the benefit of event-driven architectures\`
*   \`gemini how do I book an advisory session?\``;
    } else if (
      cleanPrompt.includes("book") || 
      cleanPrompt.includes("hire") || 
      cleanPrompt.includes("contact") || 
      cleanPrompt.includes("schedule") || 
      cleanPrompt.includes("session")
    ) {
      reply = `**[GEMINI ADVISORY PIPELINE INITIATOR]**

Pooja Malpani takes limited high-value advisory engagements quarterly. 
To request an audit or CTO consultation, you have two primary channels:

1.  **Terminal Channel:** Type \`contact\` in this console to initiate the secure inquiry transmission wizard immediately.
2.  **Visual Interface:** Click the **[BOOK ADVISORY]** button in the premium header above.

*Reference Code: PM-GEMINI-AI-ADVISORY*`;
    } else if (
      cleanPrompt.includes("code") || 
      cleanPrompt.includes("programming") || 
      cleanPrompt.includes("react") || 
      cleanPrompt.includes("next") || 
      cleanPrompt.includes("rust") || 
      cleanPrompt.includes("go")
    ) {
      setCategory("tech");
      reply = `**[GEMINI ARCHITECTURE & ENGINEERING INSIGHTS]**

Pooja Malpani's development philosophy centers on **predictable velocity and low-latency scaling**. Here is a high-performance optimization insight:

\`\`\`typescript
// Event-Driven Low-Latency Stream Processor Pattern
interface TelemetryPacket {
  id: string;
  load: number;
  timestamp: number;
}

export async function processTelemetry(packet: TelemetryPacket): Promise<void> {
  // 1. High-frequency boundary validation
  if (packet.load > 0.95) {
    await triggerScaleAlert(packet.id);
  }
  // 2. Offload to low-latency stream buffer
  await streamBuffer.push(packet);
}
\`\`\`

*   **Tip:** When utilizing Next.js 16 with TailwindCSS v4, always isolate interactive elements to client-side components (\`"use client"\`) while maintaining static shells for maximum server-side SEO value.`;
    } else {
      reply = `**[GEMINI COGNITIVE CONSOLE RESPONSE]**

Query: "${prompt}"

I have parsed your prompt through Pooja Malpani's Executive Brain Vector.
To build competitive business systems, consider these three principles:

1.  **Reduce Monolith Bloat:** Transitions should be incremental, isolating high-impact sub-modules into lightweight Go/Rust microservices.
2.  **Optimize Telemetry:** Real-time system monitoring should have less than 1% operational overhead while giving 100% trace visibility.
3.  **Unify Engineering Goals:** High-status engineering organizations align developer incentives with business metrics, not just line counts.

*Feel free to ask a more specific query like "about pooja", "skills", "tech stack", or "how to contact her" for deep data.*`;
    }

    setResponse(reply);
    TerminalAudio.playSuccessChime();
  };

  return (
    <div className="my-2 border border-purple-500/20 bg-[#0d0714]/40 p-4 rounded-xl font-mono text-xs relative overflow-hidden">
      {/* Premium Gemini Gradient border highlight */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
      
      {/* Decorative background brain icon */}
      <div className="absolute right-3 bottom-3 opacity-5 pointer-events-none">
        <BrainCircuit className="h-16 w-16 text-purple-400" />
      </div>

      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-purple-950/40">
        <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
        <span className="font-bold text-white tracking-wider text-[11px] uppercase">
          GEMINI COGNITIVE AGENT v1.2
        </span>
        {!loading && (
          <span className="ml-auto text-[10px] text-purple-400/70 border border-purple-500/20 bg-purple-500/5 px-2 py-0.5 rounded">
            VECTOR MODE: {category.toUpperCase()}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center gap-2 text-purple-300">
            <Cpu className="h-3.5 w-3.5 animate-spin text-purple-400" />
            <span className="animate-pulse">Thinking... Connecting to Gemini neural link...</span>
          </div>
          <div className="h-1 w-full bg-purple-950/40 rounded overflow-hidden mt-1">
            <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-shimmer" style={{ width: "60%", backgroundSize: "200% auto" }} />
          </div>
        </div>
      ) : (
        <div className="space-y-3 leading-relaxed text-zinc-300 whitespace-pre-wrap">
          {response.split("\n\n").map((paragraph, index) => {
            // Very simple custom parser for markdown bolding/lists to make it look premium
            if (paragraph.startsWith("**[")) {
              return (
                <div key={index} className="text-white font-bold tracking-wider text-[11px] mt-1 text-purple-300">
                  {paragraph.replace(/\*\*/g, "")}
                </div>
              );
            }
            if (paragraph.startsWith("\`\`\`")) {
              const code = paragraph.replace(/\`\`\`(typescript)?/g, "").trim();
              return (
                <pre key={index} className="bg-black/60 p-3 rounded-lg border border-purple-950/50 text-[11px] text-purple-200 overflow-x-auto my-2">
                  <code>{code}</code>
                </pre>
              );
            }
            return (
              <p key={index}>
                {paragraph.split("\n").map((line, lIdx) => {
                  if (line.trim().startsWith("*")) {
                    return (
                      <span key={lIdx} className="block pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-purple-400">
                        {line.replace(/^\*\s*/, "").replace(/\*\*([^*]+)\*\*/g, "$1")}
                      </span>
                    );
                  }
                  // Bold processing
                  const parts = line.split(/\*\*([^*]+)\*\*/g);
                  return (
                    <span key={lIdx} className="block">
                      {parts.map((part, pIdx) => 
                        pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{part}</strong> : part
                      )}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};
