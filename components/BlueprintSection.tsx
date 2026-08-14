"use client";

import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, CheckCircle2, ArrowRight, Zap, Target, Layers, Rocket, TrendingUp } from "lucide-react";

interface BlueprintStep {
  num: string;
  name: string;
  badge: string;
  desc: string;
  deliverables: string[];
  icon: React.ReactNode;
  focusPoint: string;
}

const BLUEPRINT_STEPS: BlueprintStep[] = [
  {
    num: "01",
    name: "Discover",
    badge: "Audience & Unit Economics",
    desc: "Understand your unit economics, ideal customer personas (ICPs), and bottleneck areas before launching ad spend.",
    deliverables: ["Customer Persona Audit", "Unit Economics Calculation", "Bottleneck Diagnosis"],
    icon: <Target className="h-5 w-5 text-[#00a651]" />,
    focusPoint: "Phase 1: Market & Audience Audit",
  },
  {
    num: "02",
    name: "Strategize",
    badge: "Offer Hooks & Channel Maps",
    desc: "Map exact traffic channels, high-converting offer hooks, pricing psychology, and automated lead routing funnels.",
    deliverables: ["Offer Hook Wireframes", "Channel Allocation Plan", "Funnel Mapping Node"],
    icon: <Layers className="h-5 w-5 text-[#0d60c4]" />,
    focusPoint: "Phase 2: Growth Strategy Roadmap",
  },
  {
    num: "03",
    name: "Build",
    badge: "Creatives & Automation Nodes",
    desc: "Produce short-form video creatives, configure ad account structures, build WhatsApp APIs, and setup n8n nodes.",
    deliverables: ["Reels & Ad Video Assets", "Meta & Google Ad Accounts", "n8n Workflow Setup"],
    icon: <Zap className="h-5 w-5 text-[#00a651]" />,
    focusPoint: "Phase 3: Production & Integration",
  },
  {
    num: "04",
    name: "Launch",
    badge: "A/B Testing & Pixel Tracking",
    desc: "Go live with structured A/B creative matrix tests, Meta CAPI pixel tracking, GA4 conversion events, and instant lead alerts.",
    deliverables: ["A/B Creative Test Matrix", "Pixel CAPI Integration", "Instant Lead Alerts"],
    icon: <Rocket className="h-5 w-5 text-[#0d60c4]" />,
    focusPoint: "Phase 4: Live Campaign Activation",
  },
  {
    num: "05",
    name: "Scale",
    badge: "Hourly Optimization & Budgeting",
    desc: "Analyze campaign snapshots hourly, prune underperforming ads, and allocate ad spend to winning high-ROAS creatives.",
    deliverables: ["Hourly Performance Audits", "Winning Creative Scaling", "Weekly Growth Reports"],
    icon: <TrendingUp className="h-5 w-5 text-[#00a651]" />,
    focusPoint: "Phase 5: High-ROAS Budget Scaling",
  },
];

export default function BlueprintSection() {
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

      const stepCount = BLUEPRINT_STEPS.length;
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

  const activeStep = BLUEPRINT_STEPS[activeStepIndex];

  return (
    /* Controlled section scroll height: 150vh on mobile, 170vh on desktop (No 300vh/400vh spacers) */
    <div
      ref={containerRef}
      id="about"
      className="relative w-full h-[150vh] md:h-[170vh] bg-[#050c1a] text-white select-none overflow-visible"
    >
      {/* Sticky Pinned Stage Container */}
      <div className="sticky top-20 z-20 h-[calc(100vh-6rem)] max-h-[820px] w-full max-w-7xl mx-auto flex flex-col justify-between p-4 md:p-6 overflow-hidden rounded-3xl border border-white/10 bg-[#071a3d]/90 shadow-2xl backdrop-blur-2xl">

        {/* Ambient Background Glow Effects */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#00a651]/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0d60c4]/15 rounded-full blur-[110px] pointer-events-none" />

        {/* 1. Header: Section Titles + Modern Interactive Step Indicator Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a651]/10 border border-[#00a651]/30 text-[#00a651] text-xs font-extrabold uppercase tracking-widest">
              <Sparkles size={13} />
              <span>Our Blueprint</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              The growth pipeline. Step by step.
            </h2>
          </div>

          {/* Modern Step Indicator Bar */}
          <div className="flex items-center gap-1.5 bg-[#050c1a]/90 border border-white/10 rounded-full p-1.5 backdrop-blur-xl">
            {BLUEPRINT_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.num}
                  onClick={() => {
                    if (!containerRef.current) return;
                    const rect = containerRef.current.getBoundingClientRect();
                    const targetTop =
                      window.scrollY +
                      rect.top +
                      (idx / BLUEPRINT_STEPS.length) * (rect.height - window.innerHeight);
                    window.scrollTo({ top: targetTop, behavior: "smooth" });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#0d60c4] to-[#00a651] text-white shadow-md shadow-[#00a651]/20 scale-105"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  aria-label={`Jump to Step ${step.num}`}
                >
                  <span>{step.num}</span>
                  <span className="hidden md:inline">{step.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Stage (12-Cols Layout): Left Content + Right Real Photograph Visual */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-3 overflow-hidden">
          
          {/* Left Column: Step Details Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              key={activeStep.num}
              className="space-y-4 p-5 rounded-2xl bg-[#050c1a]/80 border border-white/10 backdrop-blur-xl shadow-xl animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#071a3d] border border-white/10 text-xs font-extrabold text-[#00a651]">
                  {activeStep.icon}
                  <span>Step {activeStep.num} • {activeStep.name}</span>
                </div>
                <span className="text-[11px] font-extrabold text-[#0d60c4] dark:text-[#00a651]">
                  {activeStep.badge}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
                {activeStep.name}: {activeStep.badge}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {activeStep.desc}
              </p>

              {/* Key Deliverables */}
              <div className="space-y-2 pt-1 border-t border-white/10">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Key Deliverables
                </span>
                {activeStep.deliverables.map((del, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle2 size={14} className="text-[#00a651] shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Provided Real Photograph Visual Stage (7 Cols) */}
          <div className="lg:col-span-7 h-full flex flex-col justify-center">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#050c1a] shadow-2xl group">
              
              {/* Provided Real Photograph Visual */}
              <img
                src="/images/blueprint/blueprint-pipeline.webp"
                alt="TheBusyGrowth Blueprint Pipeline"
                className="w-full h-full object-cover transition-transform duration-700 transform scale-100"
                style={{
                  transform: `scale(${1 + (scrollProgress % 0.2) * 0.2}) translateY(-${(activeStepIndex * 3)}%)`,
                }}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/40 to-transparent pointer-events-none" />

              {/* Dynamic Step Focus Overlay */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-[#050c1a]/90 border border-white/10/90 backdrop-blur-md text-xs font-extrabold text-[#00a651] shadow-lg">
                {activeStep.focusPoint}
              </div>

              {/* Bottom Tag Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#050c1a] via-[#050c1a]/80 to-transparent flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00a651] animate-ping" />
                  <span className="text-sm font-extrabold text-white">Active Step {activeStep.num}: {activeStep.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-300">
                  {Math.round(scrollProgress * 100)}% Blueprint Complete
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* 3. Bottom Progress Bar */}
        <div className="relative z-10 border-t border-white/10 pt-2 flex items-center gap-3">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">
            Pipeline Progress
          </span>
          <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
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
  );
}
