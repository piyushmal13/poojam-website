export interface MockReview {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  text: string;
  result: string;
  source: string;
  featured: boolean;
}

export interface MockCaseStudy {
  id: string;
  name: string;
  industry: string;
  timeline: string;
  before_ctc: string;
  after_ctc: string;
  story: string;
  resume_before: string;
  resume_after: string;
  linkedin_growth: string;
  tags: string[];
  featured: boolean;
}

export interface MockService {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  price_note: string;
  description: string;
  features: string[];
  outcome: string;
  methodology: string;
  deliverables: string[];
  timeline: string;
}

export interface MockBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  cover_image: string;
  read_time: number;
  published: boolean;
  featured: boolean;
  created_at: string;
}

export const MOCK_REVIEWS: MockReview[] = [
  {
    id: "r1",
    name: "Vikram Sen",
    role: "VP of Product",
    company: "Razorpay",
    location: "Bangalore",
    rating: 5,
    text: "Pooja's approach is analytical, audit-driven, and highly strategic. She didn't just touch up my resume; she completely rebuilt my career narrative for the executive level. Within 4 weeks, I went from getting zero recruiter inbound messages to securing 3 final-round interviews. The final accepted offer yielded a 115% CTC jump.",
    result: "₹28L → ₹60L",
    source: "linkedin",
    featured: true
  },
  {
    id: "r2",
    name: "Ananya Nair",
    role: "Director of Operations",
    company: "Delhivery",
    location: "Mumbai",
    rating: 5,
    text: "As an operations leader with 15+ years of experience, my profile was extremely dense. Pooja audited my documentation like an financial auditor. She pulled out cost-saving metrics I didn't even realize were key positioning points. The impact was immediate: Lever and Workday parsers score me at 95% now. Reached shortlists at two top-tier international logistics firms.",
    result: "₹22L → ₹45L",
    source: "google",
    featured: true
  },
  {
    id: "r3",
    name: "Aditya Hegde",
    role: "Senior Engineering Manager",
    company: "PhonePe",
    location: "Pune",
    rating: 5,
    text: "The LinkedIn re-architecture alone was worth the investment. My Social Selling Index (SSI) shot up to 86, and recruiters from premium startups started reaching out directly. The interview preparation framework Pooja provides is incredibly robust. It taught me how to present high-stress technical scale challenges as executive business successes.",
    result: "₹32L → ₹68L",
    source: "google",
    featured: true
  },
  {
    id: "r4",
    name: "Meera Deshmukh",
    role: "VP HRBP",
    company: "Wipro",
    location: "Hyderabad",
    rating: 5,
    text: "Being in HR, I know exactly what recruiters search for, but applying those strategies to my own profile was difficult. Pooja brought standard objective clarity. She reframed my experience from standard task oversight to strategic corporate board alignment.",
    result: "Internal Promotion",
    source: "linkedin",
    featured: false
  },
  {
    id: "r5",
    name: "Siddharth Mehta",
    role: "Head of Analytics",
    company: "Bajaj Finance",
    location: "Pune",
    rating: 5,
    text: "Highly recommended for C-Suite candidates. She understands corporate language across diverse verticals (IT, Finance, Supply Chain) intimately. Her audit method is rigorous and execution is flawless.",
    result: "₹24L → ₹52L",
    source: "google",
    featured: false
  }
];

export const MOCK_CASE_STUDIES: MockCaseStudy[] = [
  {
    id: "cs1",
    name: "Case Dossier: Ananya S.",
    industry: "Fintech · Product Management",
    timeline: "45 Days",
    before_ctc: "₹12 LPA",
    after_ctc: "₹26 LPA",
    story: "Stuck in a mid-level PM role applying blindly to 60+ portals with zero replies. The diagnostic audit revealed critical keyword gaps and a failure to frame outcomes with P&L context. Rebuilt from scratch.",
    resume_before: "Responsible for managing fintech product lifecycle, collaborating with engineering team, drafting PRDs, and monitoring KPI metrics daily.",
    resume_after: "Led cross-functional team of 14 engineers to build core micro-lending API, driving ₹4.2Cr in new transaction volume; slashed onboarding drop-offs by 34%.",
    linkedin_growth: "SSI Score: 42 → 84; Recruiter profile search views increased by 450% in 14 days.",
    tags: ["Resume Overhaul", "ATS Keyword Tuning", "LinkedIn SSI Rebuild"],
    featured: true
  },
  {
    id: "cs2",
    name: "Case Dossier: Rohan M.",
    industry: "Supply Chain & Operations",
    timeline: "60 Days",
    before_ctc: "₹18 LPA",
    after_ctc: "₹38 LPA",
    story: "Rohan had strong corporate expertise but his documentation read like a standard manual. We analyzed warehouse data and restructured his bullet points to showcase bottom-line savings.",
    resume_before: "Managed warehouse inventory schedules, supervised logistics vendor contracts, and ensured timely delivery of goods across regional hubs.",
    resume_after: "Optimized inventory turnover by 22%; restructured logistics routes to secure ₹1.8Cr in annual bottom-line vendor savings.",
    linkedin_growth: "Inbound VP shortlists: 0 → 4; 5 interview calls within the first month.",
    tags: ["Operations Auditing", "P&L Re-Alignment", "Interview Frameworks"],
    featured: true
  }
];

export const MOCK_SERVICES: MockService[] = [
  {
    id: "s1",
    name: "Career Visibility Audit™",
    subtitle: "Complete Invisible Friction Diagnosis",
    price: "₹3,500",
    price_note: "One-Time Strategy Investment",
    description: "A comprehensive diagnostic audit mapping out the exact bottlenecks in your current resume, LinkedIn presence, and application conversion pipelines.",
    features: [
      "ATS Parsing Compatibility Test",
      "Keyword gap comparison against 3 target JD profiles",
      "LinkedIn SSI (Social Selling Index) diagnostic review",
      "30-Minute 1-on-1 feedback and alignment meeting"
    ],
    outcome: "Identify precisely why your profile is getting filtered and establish a clear execution roadmap to unlock inbound shortlists.",
    methodology: "Double-blind testing using Taleo/Workday simulators + human recruiter evaluation criteria.",
    deliverables: [
      "12-Page Visibility Scorecard Report",
      "ATS Parser raw feedback logs",
      "Profile Action Plan Roadmap document"
    ],
    timeline: "Delivered within 3 business days."
  },
  {
    id: "s2",
    name: "ATS Positioning Framework™",
    subtitle: "Algorithm-Mastery Resume Architecture",
    price: "₹9,500",
    price_note: "High-Impact Rebuild",
    description: "A total first-principles overhaul of your professional resume, converting technical responsibilities into high-leverage business outcomes that rank at the top of recruiter searches.",
    features: [
      "Complete custom rewrite of all professional experiences",
      "Integration of exact-match ATS keyword taxonomies",
      "Metrics discovery auditing to surface financial/business ROI",
      "Clean, modern, ATS-proof single-page luxury layout design"
    ],
    outcome: "A high-performance resume scoring 90%+ in Workday/Taleo systems that immediately grabs hiring manager attention in 6 seconds.",
    methodology: "Corporate narrative restructuring applying financial cooperative audit metrics.",
    deliverables: [
      "ATS-Optimized Master Resume (PDF & DOC)",
      "Targeted Keyword Reference matrix list",
      "Tailoring Guide instructions for rapid application tuning"
    ],
    timeline: "Delivered in 5–7 business days."
  },
  {
    id: "s3",
    name: "Executive LinkedIn Optimization™",
    subtitle: "Inbound Recruiter Magnetization",
    price: "₹8,000",
    price_note: "Inbound Authority Rebuild",
    description: "Re-architecting your entire LinkedIn profile into a premium personal brand hub that attracts C-Suite search parameters and drives executive inbounds.",
    features: [
      "Search-optimized headline, summary, and experience sections",
      "Custom high-conversion featured banner design assets",
      "Skills taxonomy restructure to rank in recruiter recruiter tools",
      "LinkedIn SSI score boost strategy training"
    ],
    outcome: "Substantial increase in direct inbound recruiter connections and profile search appearances for executive-tier roles.",
    methodology: "Reverse-engineering the LinkedIn Recruiter seat search filters.",
    deliverables: [
      "Complete Profile Copy Template document",
      "Professional Profile Banner graphic asset",
      "Outbound Recruiter messaging template kit"
    ],
    timeline: "Delivered in 4 business days."
  },
  {
    id: "s4",
    name: "Professional Brand Transformation™",
    subtitle: "Elite End-to-End Rebranding Package",
    price: "Custom",
    price_note: "Full Strategic Advisory",
    description: "Our comprehensive, high-stakes signature program combining Resume, LinkedIn, Cover Letter, and custom consulting calls to completely reposition you for executive pivots.",
    features: [
      "Everything in ATS Positioning & LinkedIn Optimization",
      "Premium targeted Cover Letter strategy framework",
      "Two 60-Minute private video consulting calls with Pooja",
      "Direct email/WhatsApp support for 30 days"
    ],
    outcome: "A unified, elite corporate brand that positions you as the absolute obvious choice for VP, Director, and C-Suite career transitions.",
    methodology: "Complete personal-brand consultation and positioning overhaul.",
    deliverables: [
      "ATS Resume, LinkedIn Master Copy, and Cover Letter assets",
      "Recorded video strategy coaching sessions",
      "Executive Biography one-sheet document"
    ],
    timeline: "Completed over 10–14 days."
  }
];

export const MOCK_BLOGS: MockBlog[] = [
  {
    id: "b1",
    title: "Inside Workday & Taleo: Re-Engineering Resume Parsing Behaviors",
    slug: "reengineering-resume-parsing",
    excerpt: "Most resumes fail before a human recruiter even sees them. We reverse-engineer the underlying algorithms of Workday and Taleo to see what triggers top-tier shortlists.",
    content: `
# Inside Workday & Taleo: Re-Engineering Resume Parsing Behaviors

Over 75% of executive-level resumes are filtered out before reaching a human recruiter. To survive this digital gatekeeper, you must understand how systems like **Workday, Taleo, Greenhouse, and Lever** parse and rank your data.

## 1. The Parser’s Anatomy
When you upload a resume, the Applicant Tracking System (ATS) doesn't see a pretty page layout. It strips the document into a raw text string, categorizing data into key fields:
*   **Contact Information**
*   **Work History**
*   **Skills Taxonomies**
*   **Education Credentials**

If you use complex two-column layouts, floating text boxes, or embedded images, the parser will fail, resulting in scrambled text and automatic rejection.

## 2. Keyword Matching vs. Contextual Scoring
Modern parsers do not just check for basic keyword appearances; they evaluate **Contextual Density**:
*   *Legacy Matching:* Simply typing "Product Manager" 15 times.
*   *Contextual Scoring:* Analyzing *where* the term appears and what words surround it (e.g., "Led GTM product strategy, managing ₹4Cr product roadmap").

To rank in the top 5% of searches, keywords must be coupled with measurable business outcomes and placed directly in your most recent career bullets.

## 3. Re-Engineering Your Bullets
Instead of writing tactical duties, structure achievements applying the **Context-Action-Result (CAR)** framework:
*   *Unoptimized:* "Responsible for managing server deployments and leading a team of engineers."
*   *Optimized:* "Led team of 12 DevOps engineers to deploy containerized scaling architecture, reducing server latency by 45% and saving ₹18L in monthly AWS compute costs."

By shifting responsibilities into metrics, you satisfy both the computer's algorithms and the hiring manager's eyes.
    `,
    category: "ATS Systems",
    tags: ["Workday", "Taleo", "Algorithms", "Resume Optimization"],
    cover_image: "/blog/ats-parsing.jpg",
    read_time: 6,
    published: true,
    featured: true,
    created_at: "2026-05-28T10:00:00Z"
  },
  {
    id: "b2",
    title: "The Recruiter Search Matrix: How LinkedIn Recruiter Seat Really Works",
    slug: "recruiter-search-matrix",
    excerpt: "LinkedIn is not a social network; it is a premium search engine. Learn how recruiters filter millions of profiles to find top-tier executive talent.",
    content: `
# The Recruiter Search Matrix: How LinkedIn Recruiter Seat Really Works

Recruiters do not browse LinkedIn like normal users. They operate from a premium subscription tier called the **LinkedIn Recruiter Seat**, which provides advanced search parameters and filtering grids.

## 1. The Core Filter Parameters
A recruiter looking for a VP of Finance in Mumbai will narrow down the search matrix using four mandatory fields:
1.  **Exact Job Title** (current or past)
2.  **Location Coordinates** (e.g., Mumbai Metropolitan Area)
3.  **Skills Tags** (specifically validated skills in the tags cloud)
4.  **Years of Experience**

If your headline does not match these exact search parameters, your profile is completely invisible in their search results.

## 2. The Power of the SSI (Social Selling Index)
LinkedIn prioritizes active, highly aligned profiles. Your **Social Selling Index (SSI)** score represents your profile's authority. Profiles with an SSI score above 75 are boosted in recruiter search results by up to 3x.

To optimize your SSI score:
*   Ensure a fully complete, star-rated profile.
*   Incorporate high-value industry keywords into your "About" and "Headline" sections.
*   Secure recommendations containing targeted skill terms.
    `,
    category: "LinkedIn Strategy",
    tags: ["LinkedIn Recruiter", "SSI Score", "Executive Branding"],
    cover_image: "/blog/linkedin-seat.jpg",
    read_time: 5,
    published: true,
    featured: false,
    created_at: "2026-05-25T11:00:00Z"
  }
];
