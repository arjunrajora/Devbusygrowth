"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { Sparkles, CheckCircle2, Zap, Target, Layers, Rocket, TrendingUp, ChevronRight, ChevronLeft } from "lucide-react";

interface BlueprintStep {
  num: string;
  name: string;
  badge: string;
  desc: string;
  deliverables: string[];
  icon: React.ReactNode;
  focusPoint: string;
  image: string;
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
    image: "/images/blueprint/step-01-discover.svg",
  },
  {
    num: "02",
    name: "Strategize",
    badge: "Offer Hooks & Channel Maps",
    desc: "Map exact traffic channels, high-converting offer hooks, pricing psychology, and automated lead routing funnels.",
    deliverables: ["Offer Hook Wireframes", "Channel Allocation Plan", "Funnel Mapping Node"],
    icon: <Layers className="h-5 w-5 text-[#0d60c4]" />,
    focusPoint: "Phase 2: Growth Strategy Roadmap",
    image: "/images/blueprint/step-02-strategize.svg",
  },
  {
    num: "03",
    name: "Build",
    badge: "Creatives & Automation Nodes",
    desc: "Produce short-form video creatives, configure ad account structures, build WhatsApp APIs, and setup n8n nodes.",
    deliverables: ["Reels & Ad Video Assets", "Meta & Google Ad Accounts", "n8n Workflow Setup"],
    icon: <Zap className="h-5 w-5 text-[#00a651]" />,
    focusPoint: "Phase 3: Production & Integration",
    image: "/images/blueprint/step-03-build.svg",
  },
  {
    num: "04",
    name: "Launch",
    badge: "A/B Testing & Pixel Tracking",
    desc: "Go live with structured A/B creative matrix tests, Meta CAPI pixel tracking, GA4 conversion events, and instant lead alerts.",
    deliverables: ["A/B Creative Test Matrix", "Pixel CAPI Integration", "Instant Lead Alerts"],
    icon: <Rocket className="h-5 w-5 text-[#0d60c4]" />,
    focusPoint: "Phase 4: Live Campaign Activation",
    image: "/images/blueprint/step-04-launch.svg",
  },
  {
    num: "05",
    name: "Scale",
    badge: "Hourly Optimization & Budgeting",
    desc: "Analyze campaign snapshots hourly, prune underperforming ads, and allocate ad spend to winning high-ROAS creatives.",
    deliverables: ["Hourly Performance Audits", "Winning Creative Scaling", "Weekly Growth Reports"],
    icon: <TrendingUp className="h-5 w-5 text-[#00a651]" />,
    focusPoint: "Phase 5: High-ROAS Budget Scaling",
    image: "/images/blueprint/step-05-scale.svg",
  },
];

export default function BlueprintSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth auto-cycle between steps
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % BLUEPRINT_STEPS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeStep = BLUEPRINT_STEPS[activeStepIndex];

  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:px-8 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ScrollReveal direction="up">
        <div className="rounded-3xl border border-white/10 bg-[#071a3d]/90 p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-2xl backdrop-blur-xl">
          
          {/* Ambient Background Glow Effects */}
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#00a651]/15 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0d60c4]/15 rounded-full blur-[110px] pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a651]/10 border border-[#00a651]/30 text-[#00a651] text-xs font-extrabold uppercase tracking-widest">
                <Sparkles size={13} />
                <span>Our Blueprint</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 tracking-tight font-sans">
                The growth pipeline. Step by step.
              </h2>
            </div>

            {/* Interactive Step Switcher Bar */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#050c1a]/90 border border-white/10 rounded-full p-1.5 backdrop-blur-xl">
              {BLUEPRINT_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                return (
                  <button
                    key={step.num}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-[#00a651] text-white shadow-[0_0_15px_rgba(0,166,81,0.4)] scale-105"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                    aria-label={`Jump to Step ${step.num} ${step.name}`}
                  >
                    <span>{step.num}</span>
                    <span>{step.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Stage Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6 sm:mt-8">
            
            {/* Left Column: Step Details Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.num}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-4 p-6 rounded-2xl bg-[#050c1a]/90 border border-white/10 backdrop-blur-xl shadow-xl"
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

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                    {activeStep.name}: {activeStep.badge}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {activeStep.desc}
                  </p>

                  {/* Key Deliverables */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Key Deliverables
                    </span>
                    {activeStep.deliverables.map((del, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                        <CheckCircle2 size={14} className="text-[#00a651] shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Unique Visual Stage Per Step (7 Cols) */}
            <div className="lg:col-span-7 h-full flex flex-col justify-center">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#050c1a] shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep.num}
                    initial={{ opacity: 0.5, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.5, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    src={activeStep.image}
                    alt={`TheBusyGrowth Blueprint Step ${activeStep.num} - ${activeStep.name}`}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Dynamic Step Focus Overlay */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-[#050c1a]/95 border border-white/10 backdrop-blur-md text-xs font-extrabold text-[#00a651] shadow-lg">
                  {activeStep.focusPoint}
                </div>

                {/* Bottom Tag Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-[#050c1a]/85 backdrop-blur-md flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00a651] animate-ping" />
                    <span className="text-xs sm:text-sm font-extrabold text-white">Active Step {activeStep.num}: {activeStep.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-300">
                    Step {activeStepIndex + 1} of {BLUEPRINT_STEPS.length}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Progress Bar & Navigation Controls */}
          <div className="relative z-10 border-t border-white/10 pt-4 mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-[11px] font-bold text-slate-400 shrink-0">
                Pipeline Progress
              </span>
              <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0d60c4] to-[#00a651]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((activeStepIndex + 1) / BLUEPRINT_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[11px] font-extrabold text-[#00a651] shrink-0">
                {Math.round(((activeStepIndex + 1) / BLUEPRINT_STEPS.length) * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStepIndex((prev) => (prev === 0 ? BLUEPRINT_STEPS.length - 1 : prev - 1))}
                className="p-1.5 rounded-full bg-[#050c1a] border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Previous step"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActiveStepIndex((prev) => (prev + 1) % BLUEPRINT_STEPS.length)}
                className="p-1.5 rounded-full bg-[#050c1a] border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Next step"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}


