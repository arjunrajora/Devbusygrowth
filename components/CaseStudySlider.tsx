"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Target } from "lucide-react";

interface SlideData {
  category: string;
  title: string;
  desc: string;
  link: string;
  metrics: {
    label: string;
    targetVal: number;
    prefix?: string;
    suffix?: string;
  }[];
  chartColor: string;
  chartPath: string;
  colorTheme: string; // "green" or "blue"
}

const SLIDES_DATA: SlideData[] = [
  {
    category: "Performance Ads • D2C Marketing",
    title: "Scaling D2C Beauty Brand to 3.8x ROAS",
    desc: "Implemented a dynamic creative testing matrix combined with conversion-focused customer funnels, resulting in optimized ad spend and massive Shopify sales growth.",
    link: "/contact?interest=meta-ads",
    metrics: [
      { label: "ROAS achieved", targetVal: 3.8, suffix: "x" },
      { label: "Sales increase", targetVal: 184, prefix: "+", suffix: "%" },
    ],
    chartColor: "#00a651", // Brand Green
    chartPath: "M10,90 Q30,70 50,75 T90,20",
    colorTheme: "green",
  },
  {
    category: "Lead Routing • CRM Automation",
    title: "Qualified Real Estate Leads in Jaipur",
    desc: "Engineered local search ads connected via n8n automation nodes to push buyer leads directly to CRM databases and trigger WhatsApp notifications to sales leads within 3 minutes.",
    link: "/contact?interest=course",
    metrics: [
      { label: "High-intent Leads", targetVal: 850, suffix: "+" },
      { label: "Response Time", targetVal: 3, suffix: " min" },
    ],
    chartColor: "#0d60c4", // Brand Blue
    chartPath: "M10,80 L30,40 L50,60 L70,30 L90,10",
    colorTheme: "blue",
  },
  {
    category: "AI Integrations • Workflow Nodes",
    title: "Automated Operations for B2B Agencies",
    desc: "Constructed auto-scrapers and auto-responders that parse inbound queries, sync directories across Google Sheets & Notion, and deploy ChatGPT agents to support client inquiries.",
    link: "/contact?interest=ai-automation",
    metrics: [
      { label: "Hours saved weekly", targetVal: 40, suffix: "h" },
      { label: "CPL reduction", targetVal: 18, prefix: "-", suffix: "%" },
    ],
    chartColor: "#00a651", // Brand Green
    chartPath: "M10,60 Q40,30 60,50 T90,40",
    colorTheme: "green",
  },
];

export default function CaseStudySlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [counts, setCounts] = useState<number[]>([0, 0]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeSlide = SLIDES_DATA[activeIndex];

  // Auto-play timer logic
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // Update progress bar every 50ms
    const totalTime = 6000; // 6 seconds per slide
    const increment = (intervalTime / totalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  // Animate counters when slide changes
  useEffect(() => {
    setCounts(activeSlide.metrics.map(() => 0));

    const duration = 1200; // Counter animation length in ms
    const steps = 30;
    const intervalTime = duration / steps;
    let currentStep = 0;

    const counterTimer = setInterval(() => {
      currentStep++;
      setCounts(() => {
        return activeSlide.metrics.map((m) => {
          const increment = m.targetVal / steps;
          const currentVal = increment * currentStep;
          return currentStep >= steps ? m.targetVal : Number(currentVal.toFixed(1));
        });
      });

      if (currentStep >= steps) {
        clearInterval(counterTimer);
      }
    }, intervalTime);

    return () => clearInterval(counterTimer);
  }, [activeIndex]);

  const handleNext = () => {
    setProgress(0);
    setActiveIndex((prev) => (prev + 1) % SLIDES_DATA.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setActiveIndex((prev) => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDist = 50;

    if (diff > minSwipeDist) {
      handleNext(); // Swiped left
    } else if (diff < -minSwipeDist) {
      handlePrev(); // Swiped right
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1c3d] p-6 sm:p-10 shadow-lg overflow-hidden transition-all duration-500 hover:border-[#00a651]/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background decorations */}
      <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-[#00a651]/5 blur-2xl z-0 pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-[#0d60c4]/5 blur-2xl z-0 pointer-events-none"></div>

      {/* Progress Timeline bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 z-10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#0d60c4] to-[#00a651] transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 relative z-10">
        
        {/* Slide Info (Columns 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category Badge */}
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase border transition-all duration-500 transform translate-y-0 opacity-100 gap-1.5 ${
                activeSlide.colorTheme === "green"
                  ? "border-[#00a651]/30 bg-[#00a651]/10 text-[#00a651]"
                  : "border-[#0d60c4]/30 bg-[#0d60c4]/10 text-[#0d60c4]"
              }`}
            >
              <Target size={12} className="shrink-0" />
              <span>{activeSlide.category}</span>
            </span>

            {/* Slide Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071a3d] dark:text-white transition-all duration-700">
              {activeSlide.title}
            </h3>

            {/* Slide Description */}
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {activeSlide.desc}
            </p>
          </div>

          {/* Staggered Metrics Display */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
            {activeSlide.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl font-extrabold tracking-tight text-[#071a3d] dark:text-white font-mono flex items-baseline">
                  <span className="text-[#00a651] mr-0.5">{metric.prefix}</span>
                  {counts[idx] !== undefined ? counts[idx] : 0}
                  <span className="text-slate-400 text-lg font-bold ml-0.5">{metric.suffix}</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Slide CTA */}
          <div className="pt-2">
            <Link
              href={activeSlide.link}
              className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00a651] hover:underline"
            >
              <span>Get results like this</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Slide Visual Graph Representation (Columns 5) */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full aspect-[4/3] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6 flex flex-col justify-between overflow-hidden shadow-inner group">
            
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200/50 dark:border-slate-800 pb-2">
              <span>Performance Chart</span>
              <span className="flex h-2 w-2 rounded-full bg-[#00a651] animate-ping"></span>
            </div>

            {/* SVG Interactive Line Chart */}
            <div className="relative w-full h-32 my-4">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Gridlines */}
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                <line x1="0" y1="55" x2="100" y2="55" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                
                {/* Animated Path line */}
                <path
                  d={activeSlide.chartPath}
                  fill="none"
                  stroke={activeSlide.chartColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  style={{
                    strokeDasharray: 200,
                    strokeDashoffset: 0,
                  }}
                />
              </svg>
            </div>

            <div className="flex justify-between items-center text-[9px] text-slate-500 font-semibold pt-2 border-t border-slate-200/50 dark:border-slate-800">
              <span>Day 1</span>
              <span>Day 30</span>
              <span>Day 90</span>
            </div>
            
          </div>
        </div>

      </div>

      {/* Control Dots & Arrow Buttons */}
      <div className="mt-8 flex justify-between items-center border-t border-slate-100 dark:border-slate-800/80 pt-6 z-10 relative">
        {/* Nav dots */}
        <div className="flex gap-2">
          {SLIDES_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setProgress(0);
                setActiveIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-[#00a651]" : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>

        {/* Action Arrows */}
        <div className="flex gap-2.5">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-[#071a3d] hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <ArrowLeft size={16} className="shrink-0" />
          </button>
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-[#071a3d] hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <ArrowRight size={16} className="shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
