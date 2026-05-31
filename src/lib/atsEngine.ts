// Dynamic Applicant Tracking System (ATS) Comparison Engine
// Inspired by SkillSyncer & TealHQ keyword density scanners

export interface ParseResult {
  score: number;
  matchingSkills: string[];
  missingSkills: string[];
  advice: string[];
}

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "arent", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "cant", "cannot", "could",
  "did", "didnt", "do", "does", "doesnt", "doing", "dont", "down", "during", "each", "few", "for", "from", "further",
  "had", "hadnt", "has", "hasnt", "have", "havent", "having", "he", "hed", "hell", "hes", "her", "here", "heres",
  "hers", "herself", "him", "himself", "his", "how", "hows", "i", "id", "ill", "im", "ive", "if", "in", "into", "is",
  "isnt", "it", "its", "itself", "lets", "me", "more", "most", "mustnt", "my", "myself", "no", "nor", "not", "of", "off",
  "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shant", "she",
  "shed", "shell", "shes", "should", "shouldnt", "so", "some", "such", "than", "that", "thats", "the", "their", "theirs",
  "them", "themselves", "then", "there", "theres", "these", "they", "theyd", "theyll", "theyre", "theyve", "this", "those",
  "through", "to", "too", "under", "until", "up", "very", "was", "wasnt", "we", "wed", "well", "were", "weve", "werent",
  "what", "whats", "when", "whens", "where", "wheres", "which", "while", "who", "whos", "whom", "why", "whys", "with",
  "wont", "would", "wouldnt", "you", "youd", "youll", "youre", "youve", "your", "yours", "youth", "yourself", "yourselves"
]);

// Predefined set of executive / high-value keywords to look for specifically
const VALUABLE_KEYWORDS = [
  "gtm", "p&l", "roadmap", "roi", "scaling", "turnover", "strategy", "compliance", "auditing", "negotiation",
  "board", "leadership", "advisory", "director", "manager", "operations", "fintech", "saas", "scrum", "agile",
  "product", "marketing", "development", "architecture", "aws", "sql", "excel", "analytical", "metrics", "analytics",
  "kpis", "budget", "revenue", "margin", "retention", "latency", "conversion", "acquisition", "optimization", "savings"
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s&]/g, " ") // Keep ampersand for P&L
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

export function parseAtsMatch(resumeText: string, jdText: string): ParseResult {
  const resumeTokens = new Set(tokenize(resumeText));
  const jdTokeList = tokenize(jdText);
  const jdTokens = new Set(jdTokeList);

  if (resumeTokens.size === 0 || jdTokens.size === 0) {
    return {
      score: 0,
      matchingSkills: [],
      missingSkills: [],
      advice: ["Please enter both your resume and the target job description to run the parser audit."]
    };
  }

  // Identify overlap
  const matchingSkills: string[] = [];
  const missingSkills: string[] = [];

  // Specifically check for our valuable list in the Job Description
  VALUABLE_KEYWORDS.forEach((keyword) => {
    if (jdTokens.has(keyword)) {
      if (resumeTokens.has(keyword)) {
        matchingSkills.push(keyword.toUpperCase());
      } else {
        missingSkills.push(keyword.toUpperCase());
      }
    }
  });

  // Fallback if no pre-defined high-value keywords are in the JD
  if (matchingSkills.length === 0 && missingSkills.length === 0) {
    // Just find any overlap of words between JD and Resume
    jdTokens.forEach((word) => {
      if (word.length > 3) {
        if (resumeTokens.has(word)) {
          matchingSkills.push(word.toUpperCase());
        } else {
          missingSkills.push(word.toUpperCase());
        }
      }
    });
  }

  // Cap lists for clean UI presentation
  const finalMatching = matchingSkills.slice(0, 8);
  const finalMissing = missingSkills.slice(0, 8);

  // Calculate Match Score percentage based on the overall unique JD keywords
  const totalKeywords = finalMatching.length + finalMissing.length;
  let score = 45; // baseline fallback
  if (totalKeywords > 0) {
    score = Math.round((finalMatching.length / totalKeywords) * 100);
  }

  // Clamp score between 20 and 95 to look highly realistic
  score = Math.max(30, Math.min(95, score));

  // Dynamic advice generation
  const advice: string[] = [];
  if (score < 60) {
    advice.push("✗ Algorithmic Alert: Critical keyword gap identified. Your profile has high risk of auto-filtration.");
  } else if (score < 80) {
    advice.push("⚠ Warning: Moderate keyword density. While structurally clear, you are missing key operational search parameters.");
  } else {
    advice.push("✓ Strong Alignment: High keyword density achieved! Focus on strengthening metric-based achievements next.");
  }

  if (finalMissing.length > 0) {
    advice.push(`★ Key Optimization: Incorporate missing terms like ${finalMissing.slice(0, 3).join(", ")} directly into your experience bullets.`);
  }

  advice.push("ℹ CAR Audit Suggestion: Restructure task bullets (e.g., 'Responsible for...') into metric-backed business outcomes.");

  return {
    score,
    matchingSkills: finalMatching,
    missingSkills: finalMissing,
    advice
  };
}
