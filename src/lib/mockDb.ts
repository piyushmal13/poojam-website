export interface PlacementDossier {
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

export interface ExecutiveLead {
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

export interface PositioningProgram {
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

export interface InsightJournal {
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

export const EXECUTIVE_LEADS: ExecutiveLead[] = [
  {
    id: "r1",
    name: "Vikram Sen",
    role: "VP of Product",
    company: "Razorpay",
    location: "Bangalore",
    rating: 5,
    text: "Pooja's approach is analytical, audit-driven, and highly strategic. She completely rebuilt my career narrative for the executive level. Within 4 weeks, I went from getting zero recruiter inbound messages to securing 3 final-round interviews. The final accepted offer yielded a 115% CTC jump.",
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
    text: "Pooja audited my documentation like a financial auditor. She pulled out cost-saving metrics I didn't even realize were key positioning points. The impact was immediate: Lever and Workday parsers score me at 95% now. Reached shortlists at two top-tier international logistics firms.",
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
    text: "The LinkedIn re-architecture alone was worth the investment. My Social Selling Index (SSI) shot up to 86, and recruiters from premium startups started reaching out directly. The interview preparation framework Pooja provides is incredibly robust.",
    result: "₹32L → ₹68L",
    source: "google",
    featured: true
  }
];

export const PLACEMENT_DOSSIERS: PlacementDossier[] = [
  {
    id: "cs1",
    name: "Enterprise Architecture to VP of Engineering",
    industry: "Enterprise SaaS · Cloud Infrastructure",
    timeline: "45 Days",
    before_ctc: "₹28 LPA",
    after_ctc: "₹62 LPA",
    story: "Trapped in a 'Senior Developer' perception loop despite handling enterprise-scale deployments. The diagnostic audit uncovered severe keyword dilution and a failure to articulate P&L impact. By deploying a C-Suite executive positioning matrix, we recalibrated the narrative from 'code writer' to 'revenue-generating platform architect'.",
    resume_before: "Responsible for managing software deployments, writing backend code in Python, and leading a small team of developers for the company.",
    resume_after: "Architected fault-tolerant GTM cloud infrastructure, scaling server capacity by 300% while slashing AWS compute costs by ₹1.2Cr annually. Scaled engineering org from 4 to 18 high-performing engineers.",
    linkedin_growth: "SSI Score: 42 → 88; Exclusive Headhunter Inbounds spiked 600%.",
    tags: ["Executive Re-Positioning", "ATS Keyword Tuning", "LinkedIn SSI Rebuild"],
    featured: true
  },
  {
    id: "cs2",
    name: "Corporate Finance Manager to CFO Track",
    industry: "Global Fintech & Cooperative Auditing",
    timeline: "60 Days",
    before_ctc: "₹32 LPA",
    after_ctc: "₹68 LPA",
    story: "A brilliant financial operator who lacked the strategic brand presence required for executive board-level visibility. We initiated a rigorous cooperative auditing framework to extract hidden operational efficiencies. The resulting documentation positioned them as a transformational financial strategist.",
    resume_before: "Managed regional warehouse inventory lists, monitored logistics supply vendor contracts, and verified standard audit logs for compliance.",
    resume_after: "Engineered a consolidated corporate financial framework, optimizing enterprise capital allocation by 22% and securing ₹4.8Cr in bottom-line margin expansion across global operations.",
    linkedin_growth: "Shortlisted for 3 Director-level roles within 5 weeks of launch.",
    tags: ["P&L Re-Alignment", "Strategic Advisory", "Interview Frameworks"],
    featured: true
  }
];

export const POSITIONING_PROGRAMS: PositioningProgram[] = [
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
  }
];

export const INSIGHT_JOURNAL: InsightJournal[] = [];
