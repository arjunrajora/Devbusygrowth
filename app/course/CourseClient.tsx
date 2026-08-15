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
    image: "/images/courses/foundation-ai.webp",
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
    image: "/images/courses/seo-aeo.webp",
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
    image: "/images/courses/social-content.webp",
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
    image: "/images/courses/meta-google-ads.webp",
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
    image: "/images/courses/automation-ai.webp",
    desc: "Build autonomous lead routing automations using n8n, Make, Webhooks, WhatsApp Business APIs, and automatic CRM update triggers.",
    topics: ["n8n & Webhooks setup", "WhatsApp Business APIs", "Auto lead routing", "CRM & Google Sheet sync"],
    color: "border-[#00a651]/20 text-[#00a651] bg-[#00a651]/5",
  },
];

const PROGRAM_HIGHLIGHTS = [
  { title: "Live Mentorship", desc: "Interactive weekly sessions with performance operators." },
  { title: "Hands-On Budget", desc: "Test ad campaigns with real ad spend guidance." },
  { title: "AI Integration", desc: "Master prompt engineering, n8n automations, & CAPI." },
  { title: "1-on-1 Audits", desc: "Individual campaign feedback and portfolio reviews." },
  { title: "Jaipur + Remote", desc: "Join physically in Jaipur or attend live online." },
  { title: "Lifetime Resources", desc: "Access updated SOPs, wireframe scripts, and templates." },
];

export default function CourseClient() {
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
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
              >
                <span>Apply for Next Cohort</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/performance-course"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 px-7 py-3.5 text-sm font-bold text-[#071a3d] dark:text-slate-100 shadow-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <span>View Performance Marketing Course (12 Wks)</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Highlights Grid */}
        <div className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAM_HIGHLIGHTS.map((item, idx) => (
            <ScrollReveal direction="up" delay={idx * 80} key={idx}>
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1c3d] p-6 shadow-sm">
                <div className="flex items-center gap-2.5 text-[#00a651] mb-2">
                  <Check size={18} className="shrink-0" />
                  <h3 className="text-base font-extrabold text-[#071a3d] dark:text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-7">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Course Interactive Curriculum Tabs */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a651]">Curriculum Roadmap</span>
            <h2 className="text-3xl font-extrabold text-[#071a3d] dark:text-white sm:text-4xl mt-1">
              5 Core Mastery Modules
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {MODULES_DATA.map((mod, idx) => {
              const isActive = idx === selectedModIndex;
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModIndex(idx)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-md shadow-[#00a651]/20 scale-105"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#00a651]/50"
                  }`}
                >
                  <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[10px]">{mod.num}</span>
                  <span>{mod.title}</span>
                </button>
              );
            })}
          </div>

          {/* Module Detailed Box */}
          <ScrollReveal direction="up">
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1c3d] p-8 shadow-md">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-[#071a3d] px-3 py-1 text-xs font-extrabold text-[#00a651]">
                      {activeMod.num}
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock size={12} />
                      {activeMod.duration} • {activeMod.sessions}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#071a3d] dark:text-white sm:text-3xl">
                    {activeMod.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeMod.desc}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#00a651] mb-2">
                      Key Topics Covered
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {activeMod.topics.map((t, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-semibold">
                          <Check size={14} className="text-[#00a651] shrink-0" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-[#050c1a] shadow-xl">
                    <img
                      src={activeMod.image}
                      alt={activeMod.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#050c1a]/90 border border-white/10 text-xs font-extrabold text-white flex justify-between items-center">
                      <span>Practical Project Focus</span>
                      <span className="text-[#00a651]">{activeMod.projects}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
