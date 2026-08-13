"use client";

import React, { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { BUSINESS_CONFIG } from "@/components/businessConfig";
import JSONLD from "@/components/JSONLD";
import { GraduationCap, ArrowRight, Check, Clock } from "lucide-react";

const MODULES_DATA = [
  {
    num: "M1",
    id: "m1",
    title: "Foundation & AI Mindset",
    duration: "Weeks 1-2",
    sessions: "6 Sessions",
    projects: "2 Projects",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    desc: "Understand digital ecosystems, landing pages, and funnel thinking. Design audience personas and integrate AI brainstorming into copy structures.",
    topics: ["Digital ecosystem mappings", "ICP & Persona creations", "WordPress configuration", "AI brainstorming nodes"],
    color: "border-[#071a3d]/20 text-[#071a3d] bg-[#071a3d]/5",
  },
  {
    num: "M2",
    id: "m2",
    title: "SEO & AEO dominance",
    duration: "Weeks 3-7",
    sessions: "15 Sessions",
    projects: "5 Projects",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    desc: "Master keyword architectures, indexation, schema mappings, and semantic search. Prepare websites for AI answer engines (ChatGPT Search, Perplexity).",
    topics: ["Keyword research & structure", "On-page & technical SEO", "Semantic content generation", "AEO & LLM index optimizations"],
    color: "border-[#00a651]/20 text-[#00a651] bg-[#00a651]/5",
  },
  {
    num: "M3",
    id: "m3",
    title: "Social & Content Engine",
    duration: "Weeks 8-11",
    sessions: "12 Sessions",
    projects: "4 Projects",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
    desc: "Short-form video hook formulas, scripting, post-production schedules, organic SEO overrides for TikTok/Instagram/YouTube, and influencer campaigns.",
    topics: ["Video editing workflows", "Platform algorithm variables", "Social SEO setups", "Influencer pipeline funnels"],
    color: "border-[#0d60c4]/20 text-[#0d60c4] bg-[#0d60c4]/5",
  },
  {
    num: "M4",
    id: "m4",
    title: "Meta & Google Ads",
    duration: "Weeks 12-18",
    sessions: "10 Sessions",
    projects: "7 Projects",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
    desc: "Deep-dive campaign structure, conversion tracking APIs, copywriting, interest stacks, and budget scaling nodes for massive return on ad spend.",
    topics: ["Campaign structures & rules", "Pixel & Conversions API (CAPI)", "Ad copywriting & creatives", "Budget optimization scaling"],
    color: "border-[#0b2857]/20 text-[#0b2857] bg-[#0b2857]/5",
  },
  {
    num: "M5",
    id: "m5",
    title: "Automation & AI Nodes",
    duration: "Weeks 19-20",
    sessions: "4 Sessions",
    projects: "2 Projects",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
    desc: "Construct lead trigger nodes with n8n, automated follow-up matrices via WhatsApp API, custom CRM triggers, and automated report templates.",
    topics: ["n8n workflow nodes", "WhatsApp Business APIs", "Auto-responders & chatbots", "CRM automation mapping"],
    color: "border-[#00a651]/20 text-[#00a651] bg-[#00a651]/5",
  },
];

const COMPARISON_COURSES = [
  {
    name: "Full Digital Marketing",
    color: "border-[#071a3d]/30 bg-white dark:bg-[#0b1c3d]",
    accent: "text-[#071a3d] dark:text-white",
    linkText: "Enroll Now",
    link: "/contact?interest=course",
    duration: "20 Weeks • 47+ Sessions • All 5 Milestones",
    bullets: [
      "SEO, Social, Content, Ads, Automation",
      "Complete end-to-end marketing stack",
      "Best for beginners & career transitions",
    ],
  },
  {
    name: "Performance Marketing",
    color: "border-[#00a651]/30 bg-white dark:bg-[#0b1c3d]",
    accent: "text-[#00a651]",
    linkText: "Compare Course",
    link: "/performance-course",
    duration: "12 Weeks • 24+ Sessions • Ads Focused",
    bullets: [
      "Meta Ads + Google Ads deep dive",
      "Campaign optimization & budget scaling",
      "Best for media buyers & ad specialists",
    ],
  },
  {
    name: "Social Media Mastery",
    color: "border-[#0d60c4]/30 bg-white dark:bg-[#0b1c3d]",
    accent: "text-[#0d60c4]",
    linkText: "Enquire Now",
    link: "/contact?interest=content",
    duration: "8 Weeks • 24+ Sessions • Content Focused",
    bullets: [
      "Instagram, YouTube, LinkedIn mastery",
      "Content creation & influencer systems",
      "Best for creators & brand managers",
    ],
  },
  {
    name: "WordPress Website",
    color: "border-[#00a651]/30 bg-white dark:bg-[#0b1c3d]",
    accent: "text-[#00a651]",
    linkText: "Enquire Now",
    link: "/contact?interest=web-development",
    duration: "8 Weeks • 20+ Sessions • 3+ Projects",
    bullets: [
      "No-coding website setups",
      "WooCommerce stores & layouts",
      "Best for freelancers & owners",
    ],
  },
];

export default function CoursePage() {
  const [selectedModIndex, setSelectedModIndex] = useState(0);
  const activeMod = MODULES_DATA[selectedModIndex];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/course" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050c1a] text-slate-800 dark:text-slate-100 px-4 py-16 sm:px-6 lg:px-8 transition-colors duration-300">
      <JSONLD type="Breadcrumb" data={{ items: breadcrumbs }} />
      <JSONLD
        type="Course"
        data={{
          title: `${BUSINESS_CONFIG.name} Digital Marketing Course`,
          description: "Learn SEO, paid advertisements, Reels production, and AI integrations with active performance operators in Jaipur.",
        }}
      />
      
      {/* Background lights */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-[#00a651]/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-[#0d60c4]/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl">
        
        {/* Course Header */}
        <div className="mb-16 text-center">
          <ScrollReveal direction="fade" delay={100}>
            <span className="inline-flex items-center rounded-full border border-[#00a651]/30 bg-[#00a651]/10 px-3.5 py-1 text-xs font-bold text-[#00a651] mb-4 animate-pulse gap-1.5">
              <GraduationCap size={14} className="text-[#00a651] shrink-0" />
              <span>20+ Weeks Mentorship</span>
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <h1 className="text-4xl font-extrabold text-[#071a3d] dark:text-white sm:text-5xl lg:text-6xl">
              TheBusyGrowth{" "}
              <span className="bg-gradient-to-r from-[#0d60c4] via-[#00a651] to-[#0d60c4] bg-clip-text text-transparent">
                Digital Marketing
              </span>{" "}
              Course
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={300}>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              Learn the exact playbooks we run on client accounts. Build real funnels, direct real budgets, and implement AI automation workflows.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={400}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?interest=course"
                className="group rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#0d60c4]/20 transition-all duration-300 hover:scale-105 gap-1.5"
              >
                <span>Enroll for Next Batch</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/performance-course"
                className="rounded-full border border-[#071a3d] dark:border-slate-700 bg-white dark:bg-slate-800 px-8 py-3 text-sm font-semibold text-[#071a3d] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                Performance Course
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Big Statistics Bar */}
        <ScrollReveal direction="scale" delay={300}>
          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a651]/40">
              <p className="text-3xl font-extrabold text-[#00a651]">20+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Weeks Mentorship</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a651]/40">
              <p className="text-3xl font-extrabold text-[#071a3d] dark:text-white">47+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Live Sessions</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a651]/40">
              <p className="text-3xl font-extrabold text-[#0d60c4]">20+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real Projects</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a651]/40">
              <p className="text-3xl font-extrabold text-[#00a651]">Lifetime</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Access</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Curriculum Viewer (Interactive tab structure) */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Module Select list left */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Select Curriculum Modules</h2>
            
            {MODULES_DATA.map((mod, i) => (
              <ScrollReveal direction="left" delay={i * 80} key={mod.id}>
                <button
                  onClick={() => setSelectedModIndex(i)}
                  className={`w-full rounded-2xl border p-5 text-left transition-all duration-500 ${
                    selectedModIndex === i
                      ? "bg-[#071a3d] border-[#00a651] text-white shadow-xl -translate-y-1"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-bold ${selectedModIndex === i ? 'text-white' : 'text-[#071a3d] dark:text-white'}`}>
                      {mod.num}: {mod.title.split(" ")[0]}
                    </span>
                    <span className={`text-[10px] font-semibold ${selectedModIndex === i ? 'text-[#00a651]' : 'text-slate-400'}`}>{mod.duration}</span>
                  </div>
                  <div className={`flex gap-2 text-[10px] ${selectedModIndex === i ? 'text-slate-300' : 'text-slate-500'}`}>
                    <span>{mod.sessions}</span>
                    <span>•</span>
                    <span>{mod.projects}</span>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* Module Detail right */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="right" delay={150}>
              <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] shadow-sm transition-all duration-500 hover:border-[#00a651]/40">
                
                {/* Image Banner */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={activeMod.image}
                    alt={activeMod.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a3d] via-[#071a3d]/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-lg bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-3 py-1 text-xs font-bold text-white shadow-md">
                      {activeMod.num}
                    </span>
                  </div>
                </div>

                {/* Module Info Content */}
                <div className="p-6 sm:p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">
                    Milestone Details
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold text-[#071a3d] dark:text-white sm:text-3xl">
                    {activeMod.title}
                  </h3>
                  
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span>{activeMod.duration}</span>
                    <span>•</span>
                    <span>{activeMod.sessions}</span>
                    <span>•</span>
                    <span>{activeMod.projects}</span>
                  </div>

                  <p className="my-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {activeMod.desc}
                  </p>

                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#071a3d] dark:text-white">
                    Key Skills You'll Implement:
                  </h4>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {activeMod.topics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 transition-transform duration-300 hover:translate-x-1">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00a651]"></span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6 text-center sm:text-left">
                    <Link
                      href="/contact?interest=course&detail=curriculum"
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#00a651] hover:underline"
                    >
                      <span>Request Detailed Course Document (PDF)</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* ====================================================
            COMPARE PROGRAMS
            ==================================================== */}
        <section className="mt-28">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Program Finder</span>
              <h2 className="mt-2 text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl">
                Which Course is Right for You?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                Pick a mentorship program based on your goals and baseline skills.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPARISON_COURSES.map((cc, i) => (
              <ScrollReveal direction="up" delay={i * 100} key={cc.name}>
                <div
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#00a651]/40 hover:shadow-md"
                >
                  <div>
                    <h3 className={`text-lg font-bold ${cc.accent}`}>{cc.name}</h3>
                    <p className="mt-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                      {cc.duration}
                    </p>
                    
                    <ul className="my-5 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                      {cc.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                          <Check size={12} className={`${cc.accent} shrink-0 mt-0.5`} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={cc.link}
                    className="group mt-4 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 py-2.5 text-xs font-bold text-white hover:bg-[#071a3d] dark:hover:bg-[#00a651] transition-all hover:scale-[1.02]"
                  >
                    <span>{cc.linkText}</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
