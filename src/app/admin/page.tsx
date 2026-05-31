"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText, Star, Briefcase, Plus, Trash2, Edit3, Shield,
  ArrowLeft, Download, Check, Key, Eye, UserCheck, MessageSquare
} from "lucide-react";

import {
  MOCK_REVIEWS,
  MOCK_CASE_STUDIES,
  MOCK_SERVICES,
  MOCK_BLOGS,
  MockReview,
  MockCaseStudy,
  MockBlog
} from "@/lib/mockDb";

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // CMS state loaded from mockDb
  const [blogs, setBlogs] = useState<MockBlog[]>([]);
  const [caseStudies, setCaseStudies] = useState<MockCaseStudy[]>([]);
  const [reviews, setReviews] = useState<MockReview[]>([]);
  const [leads, setLeads] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<"blogs" | "cases" | "reviews" | "leads">("blogs");

  // Form states
  const [newBlog, setNewBlog] = useState({ title: "", category: "", excerpt: "", content: "" });
  const [newCase, setNewCase] = useState({ name: "", industry: "", timeline: "", before: "", after: "", story: "" });
  const [newReview, setNewReview] = useState({ name: "", role: "", company: "", text: "", result: "" });

  useEffect(() => {
    // Initialise lists
    setBlogs(MOCK_BLOGS);
    setCaseStudies(MOCK_CASE_STUDIES);
    setReviews(MOCK_REVIEWS);

    // Mock Leads List
    setLeads([
      { name: "Rahul Sharma", email: "rahul@zepto.com", role: "Senior PM", target: "Director of Product", ats: 87, date: "2026-05-31" },
      { name: "Priya Nair", email: "priya@delhivery.com", role: "Operations Mgr", target: "VP Supply Chain", ats: 82, date: "2026-05-30" },
      { name: "Aditya Mehta", email: "aditya@phonepe.com", role: "Data Analyst", target: "Analytics Lead", ats: 91, date: "2026-05-29" }
    ]);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "blackdiamond2026" || password === "admin") {
      setAuthorized(true);
      setAuthError("");
    } else {
      setAuthError("Unauthorized: Invalid administrative credentials.");
    }
  };

  // CRUD actions
  const addBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) return;
    const blog: MockBlog = {
      id: `b_new_${Date.now()}`,
      title: newBlog.title,
      slug: newBlog.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
      excerpt: newBlog.excerpt,
      content: newBlog.content,
      category: newBlog.category || "General",
      tags: ["New", "Advisory"],
      cover_image: "/blog/default.jpg",
      read_time: Math.ceil(newBlog.content.split(" ").length / 200),
      published: true,
      featured: false,
      created_at: new Date().toISOString()
    } as any;
    setBlogs([blog, ...blogs]);
    setNewBlog({ title: "", category: "", excerpt: "", content: "" });
  };

  const deleteBlog = (id: string) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  const addCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCase.name || !newCase.story) return;
    const cs: MockCaseStudy = {
      id: `cs_new_${Date.now()}`,
      name: newCase.name,
      industry: newCase.industry || "General Consulting",
      timeline: newCase.timeline || "45 Days",
      before_ctc: newCase.before,
      after_ctc: newCase.after,
      story: newCase.story,
      resume_before: "Unoptimized candidate resume.",
      resume_after: "Optimized corporate outcome alignment.",
      linkedin_growth: "SSI Score: 45 → 82",
      tags: ["Rebuild", "Strategic Advisory"],
      featured: false
    };
    setCaseStudies([cs, ...caseStudies]);
    setNewCase({ name: "", industry: "", timeline: "", before: "", after: "", story: "" });
  };

  const deleteCase = (id: string) => {
    setCaseStudies(caseStudies.filter((cs) => cs.id !== id));
  };

  const addReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    const rev: MockReview = {
      id: `rev_new_${Date.now()}`,
      name: newReview.name,
      role: newReview.role,
      company: newReview.company || "Corporate",
      location: "India",
      rating: 5,
      text: newReview.text,
      result: newReview.result || "Outcomes Secured",
      source: "direct",
      featured: false
    };
    setReviews([rev, ...reviews]);
    setNewReview({ name: "", role: "", company: "", text: "", result: "" });
  };

  const deleteReview = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const exportConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ blogs, caseStudies, reviews }));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "poojam_brand_database.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#030512] flex items-center justify-center p-4">
        <div className="w-full max-w-sm glass-elevated rounded-3xl p-8 border border-champagne/20 space-y-6">
          <div className="text-center space-y-2">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-champagne/5 border border-champagne/25 mx-auto">
              <Shield className="w-5 h-5 text-champagne" />
            </div>
            <h1 className="text-xl font-bold font-display text-white">Administrative Portal</h1>
            <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Project Black Diamond CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="t-label block mb-1.5">Gateway Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-[13px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none focus:border-champagne/40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Key className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
              </div>
              {authError && (
                <span className="text-[10px] font-mono text-danger mt-1.5 block">{authError}</span>
              )}
            </div>

            <button type="submit" className="btn-gold w-full justify-center text-xs tracking-wider">
              Authorize Credentials
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-[10px] font-mono text-text-muted hover:text-white flex items-center justify-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Return to Platform
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030512] text-[#F0EDE6] py-12 select-text">
      <div className="container-wide space-y-10">
        
        {/* Header strip */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-graphite-light/50">
          <div>
            <span className="t-overline text-champagne">Advisory Console</span>
            <h1 className="text-3xl font-bold font-display text-white">Enterprise CMS Control</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportConfig}
              className="btn-outline text-xs tracking-widest"
            >
              <Download className="w-4 h-4" /> Export DB Schema
            </button>
            <Link href="/" className="btn-gold text-xs tracking-widest">
              View Platform
            </Link>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-graphite-light/35 gap-6">
          {[
            { id: "blogs", label: "Blog Publications", icon: <FileText className="w-4 h-4" /> },
            { id: "cases", label: "Dossier Archives", icon: <Briefcase className="w-4 h-4" /> },
            { id: "reviews", label: "Client Testimonials", icon: <Star className="w-4 h-4" /> },
            { id: "leads", label: "Submitted Audit Leads", icon: <UserCheck className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-4 text-xs font-mono tracking-wider transition-colors border-b-2 -mb-[2px] cursor-pointer ${activeTab === tab.id ? "border-champagne text-champagne font-bold" : "border-transparent text-text-secondary hover:text-white"}`}
            >
              {tab.icon} {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Blogs Tab Panel */}
        {activeTab === "blogs" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="t-title text-xl font-bold">Active Publications ({blogs.length})</h3>
              <div className="space-y-3">
                {blogs.map((b) => (
                  <div key={b.id} className="glass rounded-2xl p-5 border border-graphite-light/50 flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <span className="badge-gold text-[8px]">{b.category}</span>
                      <h4 className="text-sm font-bold text-white tracking-wide">{b.title}</h4>
                      <p className="text-[11px] text-text-secondary">{b.excerpt}</p>
                    </div>
                    <button
                      onClick={() => deleteBlog(b.id)}
                      className="p-2 rounded-lg text-danger/60 hover:text-danger hover:bg-danger/5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Blog Form */}
            <div className="glass-elevated rounded-3xl p-6 border border-champagne/15 space-y-4 h-fit">
              <h3 className="t-title text-base font-bold">Publish New Advisory</h3>
              <form onSubmit={addBlog} className="space-y-4">
                <div>
                  <label className="t-label block mb-1.5">Article Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Inside Taleo Resume Parsers"
                    className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="t-label block mb-1.5">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. ATS Systems"
                    className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="t-label block mb-1.5">Excerpt</label>
                  <textarea
                    placeholder="Brief summary sentence..."
                    className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none h-16 resize-none"
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  />
                </div>
                <div>
                  <label className="t-label block mb-1.5">Article Content (Markdown)</label>
                  <textarea
                    required
                    placeholder="Markdown content..."
                    className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none h-44 resize-none"
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-gold w-full justify-center text-xs tracking-wider">
                  <Plus className="w-4 h-4" /> Publish Publication
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Case Studies Tab Panel */}
        {activeTab === "cases" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="t-title text-xl font-bold">Active Dossiers ({caseStudies.length})</h3>
              <div className="space-y-3">
                {caseStudies.map((cs) => (
                  <div key={cs.id} className="glass rounded-2xl p-5 border border-graphite-light/50 flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <span className="badge-gold text-[8px]">{cs.industry}</span>
                      <h4 className="text-sm font-bold text-white tracking-wide">{cs.name}</h4>
                      <p className="text-[11px] text-text-secondary">{cs.story}</p>
                      <div className="text-[10px] font-mono text-success">{cs.before_ctc} → {cs.after_ctc} ({cs.timeline})</div>
                    </div>
                    <button
                      onClick={() => deleteCase(cs.id)}
                      className="p-2 rounded-lg text-danger/60 hover:text-danger hover:bg-danger/5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Case Form */}
            <div className="glass-elevated rounded-3xl p-6 border border-champagne/15 space-y-4 h-fit">
              <h3 className="t-title text-base font-bold">Log New Dossier</h3>
              <form onSubmit={addCase} className="space-y-4">
                <div>
                  <label className="t-label block mb-1.5">Candidate Label Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Case Dossier: Vikram S."
                    className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                    value={newCase.name}
                    onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="t-label block mb-1.5">Industry Sector</label>
                    <input
                      type="text"
                      placeholder="e.g. Fintech"
                      className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                      value={newCase.industry}
                      onChange={(e) => setNewCase({ ...newCase, industry: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="t-label block mb-1.5">Timeline Window</label>
                    <input
                      type="text"
                      placeholder="e.g. 45 Days"
                      className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                      value={newCase.timeline}
                      onChange={(e) => setNewCase({ ...newCase, timeline: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="t-label block mb-1.5">CTC Before</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹12 LPA"
                      className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                      value={newCase.before}
                      onChange={(e) => setNewCase({ ...newCase, before: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="t-label block mb-1.5">CTC After</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹28 LPA"
                      className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                      value={newCase.after}
                      onChange={(e) => setNewCase({ ...newCase, after: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="t-label block mb-1.5">Dossier Narrative</label>
                  <textarea
                    required
                    placeholder="Describe the candidate struggle and key positioning changes made..."
                    className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none h-28 resize-none"
                    value={newCase.story}
                    onChange={(e) => setNewCase({ ...newCase, story: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-gold w-full justify-center text-xs tracking-wider">
                  <Plus className="w-4 h-4" /> Save Dossier
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Reviews Tab Panel */}
        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="t-title text-xl font-bold">Active Testimonials ({reviews.length})</h3>
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className="glass rounded-2xl p-5 border border-graphite-light/50 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex gap-0.5 mb-1">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 star-gold" />
                        ))}
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-wide">{r.name}</h4>
                      <p className="text-[10px] font-mono text-text-secondary">{r.role} · {r.company}</p>
                      <p className="text-[11px] text-text-secondary mt-2 italic">"{r.text.slice(0, 150)}..."</p>
                      <span className="badge-success text-[8px] inline-block mt-2">{r.result}</span>
                    </div>
                    <button
                      onClick={() => deleteReview(r.id)}
                      className="p-2 rounded-lg text-danger/60 hover:text-danger hover:bg-danger/5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Review Form */}
            <div className="glass-elevated rounded-3xl p-6 border border-champagne/15 space-y-4 h-fit">
              <h3 className="t-title text-base font-bold">Log Client Testimonial</h3>
              <form onSubmit={addReview} className="space-y-4">
                <div>
                  <label className="t-label block mb-1.5">Client Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="t-label block mb-1.5">Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior PM"
                      className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="t-label block mb-1.5">Company</label>
                    <input
                      type="text"
                      placeholder="e.g. Razorpay"
                      className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                      value={newReview.company}
                      onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="t-label block mb-1.5">Outcomes Secured</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹12L → ₹28L"
                    className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none"
                    value={newReview.result}
                    onChange={(e) => setNewReview({ ...newReview, result: e.target.value })}
                  />
                </div>
                <div>
                  <label className="t-label block mb-1.5">Testimonial Review</label>
                  <textarea
                    required
                    placeholder="Paste client copy exactly..."
                    className="w-full rounded-xl px-4 py-3 text-[12px] text-white bg-midnight/80 border border-graphite-light/50 focus:outline-none h-28 resize-none"
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-gold w-full justify-center text-xs tracking-wider">
                  <Plus className="w-4 h-4" /> Save Testimonial
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Leads Tab Panel */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            <h3 className="t-title text-xl font-bold">Grader Audit Submissions ({leads.length})</h3>
            <div className="glass-elevated rounded-3xl overflow-hidden border border-graphite-light/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="bg-graphite/60 border-b border-graphite-light/50 text-text-secondary text-[10px] uppercase tracking-wider">
                      <th className="p-4 font-semibold">Date Logged</th>
                      <th className="p-4 font-semibold">Candidate Name</th>
                      <th className="p-4 font-semibold">Email Target</th>
                      <th className="p-4 font-semibold">Current Role</th>
                      <th className="p-4 font-semibold">Target Position</th>
                      <th className="p-4 font-semibold text-center">ATS Match</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-graphite-light/35 bg-midnight/35">
                    {leads.map((l, idx) => (
                      <tr key={idx} className="hover:bg-graphite/20 transition-colors">
                        <td className="p-4 text-text-muted">{l.date}</td>
                        <td className="p-4 font-semibold text-white">{l.name}</td>
                        <td className="p-4 text-text-secondary">{l.email}</td>
                        <td className="p-4 text-text-secondary">{l.role}</td>
                        <td className="p-4 text-text-secondary">{l.target}</td>
                        <td className="p-4 text-center font-bold text-success">{l.ats}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
