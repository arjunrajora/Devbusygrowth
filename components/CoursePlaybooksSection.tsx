"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, GraduationCap, Clock, Award, BookOpen, Check } from "lucide-react";

interface PlaybookModule {
  num: string;
  id: string;
  title: string;
  subtitle: string;
  topics: string[];
  img: string;
  accentColor: string;
  badge: string;
}

const PLAYBOOK_MODULES: PlaybookModule[] = [
  {
    num: "M1",
    id: "m1",
    title: "Foundation & AI Mindset",
    subtitle: "Websites, conversion funnels & AI planning",
    topics: ["Digital ecosystem mappings", "ICP & persona creation", "WordPress setup", "AI funnel planning"],
    img: "/images/courses/foundation-ai.webp",
    accentColor: "#00a651",
    badge: "Playbook 01: Core Architecture",
  },
  {
    num: "M2",
    id: "m2",
    title: "SEO & AEO Dominance",
    subtitle: "Search rankings in the AI answer engine era",
    topics: ["Keyword intent strategy", "Technical & on-page SEO", "AI-search mapping", "AEO optimization"],
    img: "/images/courses/seo-aeo.webp",
    accentColor: "#0d60c4",
    badge: "Playbook 02: Search & Indexing",
  },
  {
    num: "M3",
    id: "m3",
    title: "Social & Content Engine",
    subtitle: "Short-form video hooks & platform scaling",
    topics: ["Viral hook formulas", "Short-form video scripting", "Content planning", "Influencer deals"],
    img: "/images/courses/social-content.webp",
    accentColor: "#00a651",
    badge: "Playbook 03: Audience Engine",
  },
  {
    num: "M4",
    id: "m4",
    title: "Meta & Google Ads",
    subtitle: "Performance marketing & budget scaling",
    topics: ["Meta ad structures", "Search & PMax campaigns", "A/B creative testing", "CAPI & ROAS scaling"],
    img: "/images/courses/meta-google-ads.webp",
    accentColor: "#0d60c4",
    badge: "Playbook 04: Paid Traffic Scaling",
  },
  {
    num: "M5",
    id: "m5",
    title: "Automation & AI Nodes",
    subtitle: "Workflows, CRM sync & WhatsApp funnels",
    topics: ["n8n workflow nodes", "WhatsApp Business API", "Email automation", "CRM auto-triggers"],
    img: "/images/courses/automation-ai.webp",
    accentColor: "#00a651",
    badge: "Playbook 05: Autopilot Operations",
  },
];

export default function CoursePlaybooksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollableHeight));

      setScrollProgress(rawProgress);

      const stepCount = PLAYBOOK_MODULES.length;
      const stepIndex = Math.min(
        stepCount - 1,
        Math.floor(rawProgress * stepCount)
      );

      setActiveStepIndex(stepIndex);
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeModule = PLAYBOOK_MODULES[activeStepIndex];

  return (
    /* Controlled section scroll height: 150vh on mobile, 170vh on desktop (No 300vh/400vh spacers) */
    <div
      ref={containerRef}
      className="relative w-full h-[150vh] md:h-[170vh] bg-[#050c1a] text-white select-none overflow-visible"
    >
      {/* Sticky Pinned Stage Container */}
      <div className="sticky top-20 z-20 h-[calc(100vh-6rem)] max-h-[820px] w-full max-w-7xl mx-auto flex flex-col justify-between p-4 md:p-6 overflow-hidden rounded-3xl border border-slate-800/90 bg-[#071a3d]/90 shadow-2xl backdrop-blur-2xl">

        {/* Ambient Background Glow Effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00a651]/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0d60c4]/15 rounded-full blur-[110px] pointer-events-none" />

        {/* 1. Header: Section Titles + Interactive Module Switcher Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-3">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a651]/10 border border-[#00a651]/30 text-[#00a651] text-xs font-extrabold uppercase tracking-widest">
              <Sparkles size={13} />
              <span>20+ Week Mentorship Program</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Learn the same playbooks we run on client accounts.
            </h2>
          </div>

          {/* Module Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-[#050c1a]/90 border border-slate-800 rounded-full p-1.5 backdrop-blur-xl">
            {PLAYBOOK_MODULES.map((mod, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={mod.num}
                  onClick={() => {
                    if (!containerRef.current) return;
                    const rect = containerRef.current.getBoundingClientRect();
                    const targetTop =
                      window.scrollY +
                      rect.top +
                      (idx / PLAYBOOK_MODULES.length) * (rect.height - window.innerHeight);
                    window.scrollTo({ top: targetTop, behavior: "smooth" });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-md shadow-[#00a651]/20 scale-105"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  aria-label={`Jump to Module ${mod.num}`}
                >
                  <span>{mod.num}</span>
                  <span className="hidden md:inline">{mod.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Stage (12-Cols Layout): Left Module Details + Right Playbook Visual */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-3 overflow-hidden">
          
          {/* Left Column: Module Content Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              key={activeModule.num}
              className="space-y-4 p-5 rounded-2xl bg-[#050c1a]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#071a3d] border border-slate-700 text-xs font-extrabold text-[#00a651]">
                  <GraduationCap size={16} />
                  <span>Module {activeModule.num}</span>
                </div>
                <span className="text-[11px] font-extrabold text-[#0d60c4] dark:text-[#00a651]">
                  {activeModule.badge}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
                {activeModule.title}
              </h3>

              <p className="text-xs font-bold text-[#0d60c4] dark:text-[#00a651]">
                {activeModule.subtitle}
              </p>

              {/* Module Topics List */}
              <div className="space-y-2 pt-1 border-t border-slate-800/80">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Curriculum Topics
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeModule.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-[#071a3d] border border-slate-700 px-3 py-1 text-xs text-slate-200 font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Link */}
              <div className="pt-2">
                <Link
                  href="/course"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-105 btn-shimmer"
                >
                  <span>Explore Full Curriculum</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Real Photography Playbook Visual (7 Cols) */}
          <div className="lg:col-span-7 h-full flex flex-col justify-center">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-700/80 bg-[#050c1a] shadow-2xl group">
              
              {/* Module Real Photograph */}
              <img
                key={activeModule.img}
                src={activeModule.img}
                alt={activeModule.title}
                className="w-full h-full object-cover transition-transform duration-700 transform scale-105"
                style={{
                  transform: `scale(${1 + (scrollProgress % 0.2) * 0.15})`,
                }}
              />

              {/* Floating Module Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-[#050c1a]/90 border border-slate-700/90 backdrop-blur-md text-xs font-extrabold text-[#00a651] shadow-lg">
                {activeModule.badge}
              </div>

              {/* Bottom Tag Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-[#050c1a]/85 backdrop-blur-md flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00a651] animate-ping" />
                  <span className="text-sm font-extrabold text-white">{activeModule.title}</span>
                </div>
                <span className="text-xs font-bold text-slate-300">
                  {Math.round(scrollProgress * 100)}% Curriculum Scrolled
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* 3. Bottom Mini Stats + Progress Bar */}
        <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Course Mini Stats */}
          <div className="flex items-center gap-4 text-xs font-extrabold">
            <span className="text-[#00a651]">47+ Live Sessions</span>
            <span className="text-slate-600">•</span>
            <span className="text-white">20+ Real Projects</span>
            <span className="text-slate-600">•</span>
            <span className="text-[#0d60c4] dark:text-[#00a651]">Lifetime Access</span>
          </div>

          {/* Progress Indicator Bar */}
          <div className="w-full sm:w-64 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] transition-all duration-150"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-extrabold text-[#00a651] shrink-0">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
